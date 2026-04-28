import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema, insertProductReviewSchema } from "@shared/schema";
import { blogPosts } from "@shared/blog";
import { resolveOgImageForPath } from "./socialMeta";
import { notifyNewReview } from "./reviewNotify";
import { walletCards, exchangeCards, type CardEntry } from "./cardData";
import { Resvg } from "@resvg/resvg-js";
import { z } from "zod";

const escapeOgXml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const truncateOg = (s: string, n: number): string =>
  s.length > n ? s.slice(0, n - 1) + "…" : s;

function buildPageOgSvg(rawTitle: string): string {
  const title = escapeOgXml(truncateOg(rawTitle, 40));
  const w = 1200;
  const h = 630;
  // Embed the All Things XRPL brand mark at top-left so social shares of
  // generic pages (About, FAQ, News, Disclosure, etc.) carry the brand
  // identity instead of plain text on a gradient.
  const brandUri = loadLogoDataUri("allthingsxrpl");
  const brandMark = brandUri
    ? `<image href="${escapeOgXml(brandUri)}" x="60" y="56" width="80" height="80" preserveAspectRatio="xMidYMid meet"/>`
    : "";
  const brandTextX = brandUri ? 160 : 60;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${brandMark}
  <text x="${brandTextX}" y="110" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="36" font-weight="700" fill="#60a5fa" letter-spacing="2">ALL THINGS XRPL</text>
  <text x="${w / 2}" y="${h / 2 + 30}" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="120" font-weight="800" fill="#ffffff">${title}</text>
  <text x="${w / 2}" y="${h - 60}" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="28" font-weight="500" fill="#94a3b8">Best XRP Wallets · XRPL DeFi · 2026</text>
</svg>`;
}

function buildCompareOgSvg(
  rawW1: string,
  rawW2: string,
  slug1?: string | null,
  slug2?: string | null,
): string {
  const w1 = escapeOgXml(truncateOg(rawW1, 18));
  const w2 = escapeOgXml(truncateOg(rawW2, 18));
  const w = 1200;
  const h = 630;
  const brandUri = loadLogoDataUri("allthingsxrpl");
  const brandMark = brandUri
    ? `<image href="${escapeOgXml(brandUri)}" x="60" y="56" width="80" height="80" preserveAspectRatio="xMidYMid meet"/>`
    : "";
  const brandTextX = brandUri ? 160 : 60;
  // Wallet logo blocks. When the slug is unknown (e.g. an arbitrary string
  // arrived via ?w1=…) we skip the logo and fall back to a subtle placeholder
  // square so the layout stays consistent.
  const logo1Uri = slug1 ? loadLogoDataUri(slug1) : null;
  const logo2Uri = slug2 ? loadLogoDataUri(slug2) : null;
  const logo1Block = logo1Uri
    ? `<image href="${escapeOgXml(logo1Uri)}" x="160" y="200" width="240" height="240" preserveAspectRatio="xMidYMid meet"/>`
    : `<rect x="160" y="200" width="240" height="240" rx="32" fill="#ffffff" opacity="0.06"/>`;
  const logo2Block = logo2Uri
    ? `<image href="${escapeOgXml(logo2Uri)}" x="800" y="200" width="240" height="240" preserveAspectRatio="xMidYMid meet"/>`
    : `<rect x="800" y="200" width="240" height="240" rx="32" fill="#ffffff" opacity="0.06"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${brandMark}
  <text x="${brandTextX}" y="110" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="36" font-weight="700" fill="#60a5fa" letter-spacing="2">ALL THINGS XRPL</text>
  ${logo1Block}
  ${logo2Block}
  <text x="280" y="510" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="56" font-weight="800" fill="#ffffff">${w1}</text>
  <text x="920" y="510" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="56" font-weight="800" fill="#ffffff">${w2}</text>
  <text x="${w / 2}" y="345" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="80" font-weight="800" fill="#fbbf24">vs</text>
  <text x="${w / 2}" y="${h - 60}" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="28" font-weight="500" fill="#94a3b8">XRP Wallet Comparison · 2026</text>
</svg>`;
}

function renderSvgToPng(svg: string): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true },
  });
  return resvg.render().asPng();
}

// In-memory cache of base64-encoded brand logos so each /og/wallet|exchange
// request doesn't re-read and re-encode the PNG from disk.
const logoDataUriCache = new Map<string, string | null>();

function loadLogoDataUri(slug: string): string | null {
  if (logoDataUriCache.has(slug)) return logoDataUriCache.get(slug) ?? null;
  // Match the lookup order used by resolveLeadMagnetPath so this works in
  // both dev (client/public) and prod (dist/public) builds.
  const candidates = [
    path.resolve(process.cwd(), `dist/public/logos/${slug}-logo.png`),
    path.resolve(process.cwd(), `client/public/logos/${slug}-logo.png`),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const buf = fs.readFileSync(p);
        const uri = `data:image/png;base64,${buf.toString("base64")}`;
        logoDataUriCache.set(slug, uri);
        return uri;
      }
    } catch {
      // try next candidate
    }
  }
  logoDataUriCache.set(slug, null);
  return null;
}

function capitalizeOg(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Brand-aligned card for a single wallet or exchange (1200x630). Embeds the
// brand logo as a data URI so resvg can render it without an external HTTP
// fetch. Used as the OG image for /wallet/<slug> and /exchange/<slug> as
// well as the per-page image entry in the sitemap, so Google Images and
// Discover can surface a richer visual than the small square logo alone.
function buildBrandCardSvg(
  entry: CardEntry,
  slug: string,
  kindLabel: string,
  ratingScale: 5 | 10,
): string {
  const w = 1200;
  const h = 630;
  const name = escapeOgXml(truncateOg(entry.name, 28));
  const tagline = escapeOgXml(truncateOg(entry.tagline, 64));
  const rating = escapeOgXml(entry.rating);
  const footer = escapeOgXml(`${kindLabel} · All Things XRPL · 2026`);
  const logoUri = loadLogoDataUri(slug);
  const logoBlock = logoUri
    ? `<image href="${escapeOgXml(logoUri)}" x="80" y="170" width="280" height="280" preserveAspectRatio="xMidYMid meet"/>`
    : `<rect x="80" y="170" width="280" height="280" rx="32" fill="#ffffff" opacity="0.06"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <text x="60" y="100" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="36" font-weight="700" fill="#60a5fa" letter-spacing="2">ALL THINGS XRPL</text>
  ${logoBlock}
  <text x="400" y="270" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="76" font-weight="800" fill="#ffffff">${name}</text>
  <text x="400" y="340" font-family="'Inter', system-ui, sans-serif" font-size="28" font-weight="500" fill="#cbd5e1">${tagline}</text>
  <g>
    <rect x="400" y="380" width="240" height="72" rx="36" fill="#fbbf24"/>
    <text x="520" y="430" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-size="36" font-weight="800" fill="#0b1220">★ ${rating}/${ratingScale}</text>
  </g>
  <text x="${w / 2}" y="${h - 60}" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="28" font-weight="500" fill="#94a3b8">${footer}</text>
</svg>`;
}

function buildWalletOgSvg(slug: string): string {
  const entry =
    walletCards[slug] ?? {
      name: capitalizeOg(slug),
      tagline: "XRP wallet review on All Things XRPL",
      rating: "9.0",
    };
  return buildBrandCardSvg(entry, slug, "XRP Wallet Review", 10);
}

function buildExchangeOgSvg(slug: string): string {
  const entry =
    exchangeCards[slug] ?? {
      name: capitalizeOg(slug),
      tagline: "XRP exchange review on All Things XRPL",
      rating: "4.5",
    };
  return buildBrandCardSvg(entry, slug, "XRP Exchange Review", 5);
}

// Cache the rendered PNG buffer per (kind, slug) so repeat crawler hits
// don't re-rasterize the SVG (which embeds a 600KB-1MB base64 logo) on
// every request. Slug callers are validated against walletCards/
// exchangeCards before reaching here, so the cache is bounded to the
// known wallet/exchange set (~16 entries) and cannot be polluted by
// arbitrary input.
const ogPngCache = new Map<string, Buffer>();

function getOgPng(kind: "wallet" | "exchange", slug: string): Buffer {
  const key = `${kind}:${slug}`;
  const cached = ogPngCache.get(key);
  if (cached) return cached;
  const svg = kind === "wallet" ? buildWalletOgSvg(slug) : buildExchangeOgSvg(slug);
  const png = renderSvgToPng(svg);
  ogPngCache.set(key, png);
  return png;
}

function resolveLeadMagnetPath(filename: string): string | null {
  const candidates = [
    path.resolve(process.cwd(), `dist/public/${filename}`),
    path.resolve(process.cwd(), `client/public/${filename}`),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  imageUrl?: string;
}

let newsCache: { items: NewsItem[]; lastFetched: number } = { items: [], lastFetched: 0 };
const NEWS_CACHE_TTL = 15 * 60 * 1000;

function extractTag(xml: string, tag: string): string {
  const cdataMatch = xml.match(new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`));
  if (cdataMatch) return cdataMatch[1].trim();
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim() : '';
}

function extractImageFromDescription(desc: string): string | undefined {
  const imgMatch = desc.match(/<img[^>]+src=["']([^"']+)["']/);
  return imgMatch ? imgMatch[1] : undefined;
}

function extractSourceFromTitle(title: string): { cleanTitle: string; source: string } {
  const parts = title.split(' - ');
  if (parts.length > 1) {
    const source = parts.pop()!.trim();
    return { cleanTitle: parts.join(' - ').trim(), source };
  }
  return { cleanTitle: title, source: '' };
}

async function fetchNewsFromFeed(url: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'AllThingsXRPL/1.0' }
    });
    clearTimeout(timeout);
    if (!response.ok) return [];
    const xml = await response.text();
    const items: NewsItem[] = [];
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    for (const itemXml of itemMatches.slice(0, 30)) {
      const rawTitle = extractTag(itemXml, 'title');
      const link = extractTag(itemXml, 'link');
      const pubDate = extractTag(itemXml, 'pubDate');
      const description = extractTag(itemXml, 'description');
      const { cleanTitle, source } = extractSourceFromTitle(rawTitle);
      const imageUrl = extractImageFromDescription(description) ||
        (itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/)?.[1]) ||
        (itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/)?.[1]);
      const cleanDesc = description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 200);
      items.push({
        title: cleanTitle || rawTitle,
        link,
        pubDate,
        source: source || sourceName,
        description: cleanDesc,
        imageUrl: imageUrl || undefined
      });
    }
    return items;
  } catch (e) {
    console.error(`[News] Failed to fetch from ${sourceName}:`, e);
    return [];
  }
}

async function fetchAllNews(): Promise<NewsItem[]> {
  const now = Date.now();
  if (newsCache.items.length > 0 && now - newsCache.lastFetched < NEWS_CACHE_TTL) {
    return newsCache.items;
  }

  const feeds = [
    { url: 'https://news.google.com/rss/search?q=XRP+OR+XRPL+OR+%22XRP+Ledger%22+OR+Ripple+crypto&hl=en-US&gl=US&ceid=US:en', source: 'Google News' },
    { url: 'https://cointelegraph.com/rss/tag/xrp', source: 'CoinTelegraph' },
    { url: 'https://cryptoslate.com/feed/', source: 'CryptoSlate' },
  ];

  const results = await Promise.allSettled(
    feeds.map(f => fetchNewsFromFeed(f.url, f.source))
  );

  let allItems: NewsItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allItems = allItems.concat(result.value);
    }
  }

  const xrpKeywords = /xrp|xrpl|ripple|xumm|xaman|xrp\s*ledger/i;
  allItems = allItems.filter(item =>
    xrpKeywords.test(item.title) || xrpKeywords.test(item.description)
  );

  const seen = new Set<string>();
  allItems = allItems.filter(item => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  allItems = allItems.filter(item => item.imageUrl);

  allItems.sort((a, b) => {
    const da = new Date(a.pubDate).getTime();
    const db = new Date(b.pubDate).getTime();
    return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
  });

  allItems = allItems.slice(0, 50);

  newsCache = { items: allItems, lastFetched: now };
  console.log(`[News] Fetched ${allItems.length} XRP news articles`);
  return allItems;
}

// Single source of truth for the wallet/exchange slug sets — derived from
// cardData so the sitemap entries, OG-image allowlist, and card metadata
// can never drift out of sync.
const walletSlugs = Object.keys(walletCards);
const exchangeSlugs = Object.keys(exchangeCards);

const compareSlugs = [
  "xaman-vs-ledger", "xaman-vs-tangem", "ledger-vs-tangem",
  "ellipal-vs-ledger", "trezor-vs-ledger", "bifrost-vs-xaman",
  "coinbase-vs-kraken", "trustwallet-vs-xaman", "trezor-vs-tangem",
  "ellipal-vs-trezor", "bifrost-vs-crossmark", "gatehub-vs-xaman",
  "gatehub-vs-ledger",
];

const bestForSlugs = ["beginners", "hardware", "cold-storage", "defi", "safest"];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Lead magnet download — explicit headers so browsers always save the file
  // with the correct name and MIME type instead of falling through to the SPA
  // fallback (which would return index.html and cause Safari to save it as
  // "xrpl-wallet-starter-kit.md.html").
  const leadMagnets: Array<{ route: string; filename: string; contentType: string }> = [
    {
      route: "/downloads/xrpl-wallet-starter-kit.md",
      filename: "xrpl-wallet-starter-kit.md",
      contentType: "text/markdown; charset=utf-8",
    },
    {
      route: "/downloads/xrpl-wallet-starter-kit.pdf",
      filename: "downloads/xrpl-wallet-starter-kit.pdf",
      contentType: "application/pdf",
    },
    {
      route: "/downloads/xrpl-defi-starter-kit.pdf",
      filename: "downloads/xrpl-defi-starter-kit.pdf",
      contentType: "application/pdf",
    },
    {
      route: "/downloads/xrpl-wallet-shortlist.pdf",
      filename: "downloads/xrpl-wallet-shortlist.pdf",
      contentType: "application/pdf",
    },
  ];

  for (const lang of ["es", "zh", "ja", "ko", "pt", "de", "fr"]) {
    const defiMdName = `xrpl-defi-starter-kit.${lang}.md`;
    leadMagnets.push({
      route: `/downloads/${defiMdName}`,
      filename: defiMdName,
      contentType: "text/markdown; charset=utf-8",
    });
    const defiPdfName = `xrpl-defi-starter-kit.${lang}.pdf`;
    leadMagnets.push({
      route: `/downloads/${defiPdfName}`,
      filename: `downloads/${defiPdfName}`,
      contentType: "application/pdf",
    });
    const walletMdName = `xrpl-wallet-starter-kit.${lang}.md`;
    leadMagnets.push({
      route: `/downloads/${walletMdName}`,
      filename: walletMdName,
      contentType: "text/markdown; charset=utf-8",
    });
    const walletPdfName = `xrpl-wallet-starter-kit.${lang}.pdf`;
    leadMagnets.push({
      route: `/downloads/${walletPdfName}`,
      filename: `downloads/${walletPdfName}`,
      contentType: "application/pdf",
    });
    const shortlistPdfName = `xrpl-wallet-shortlist.${lang}.pdf`;
    leadMagnets.push({
      route: `/downloads/${shortlistPdfName}`,
      filename: `downloads/${shortlistPdfName}`,
      contentType: "application/pdf",
    });
  }
  for (const { route, filename, contentType } of leadMagnets) {
    app.get(route, (_req, res) => {
      const filePath = resolveLeadMagnetPath(filename);
      if (!filePath) {
        res.status(404).type("text/plain").send("Starter kit file not found");
        return;
      }
      const downloadName = filename.split("/").pop() ?? filename;
      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${downloadName}"`
      );
      res.setHeader("Cache-Control", "public, max-age=300");
      res.sendFile(filePath);
    });
  }

  // Brand-aligned Open Graph image for static pages (About, FAQ, Contact,
  // Getting Started, Disclosure, News, etc.). The page title comes from the
  // ?title= query param so we don't have to keep two copies of the title list.
  app.get("/og/page.svg", (req, res) => {
    const svg = buildPageOgSvg(String(req.query.title ?? "All Things XRPL"));
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(svg);
  });

  // PNG version of the page card so Twitter/X and Facebook (which don't render
  // SVG OG images) can show the branded share card instead of the fallback.
  app.get("/og/page.png", (req, res) => {
    try {
      const svg = buildPageOgSvg(String(req.query.title ?? "All Things XRPL"));
      const png = renderSvgToPng(svg);
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(png);
    } catch (err) {
      console.error("Failed to render /og/page.png:", err);
      res.status(500).type("text/plain").send("Failed to render OG image");
    }
  });

  // Validate a slug coming in via the compare card's query string against
  // the known wallet/exchange set so the logo lookup can never be steered
  // toward arbitrary filesystem paths and the in-memory logo cache cannot
  // be polluted by attacker input.
  const resolveCompareSlug = (raw: unknown): string | null => {
    if (typeof raw !== "string" || raw.length === 0) return null;
    const slug = raw.toLowerCase();
    if (
      Object.prototype.hasOwnProperty.call(walletCards, slug) ||
      Object.prototype.hasOwnProperty.call(exchangeCards, slug)
    ) {
      return slug;
    }
    return null;
  };

  // Open Graph image for comparison pages — generated as a real SVG URL so
  // social-media crawlers (Facebook, X, LinkedIn, Slack, Discord) can fetch
  // it. Names come from query params so we don't duplicate the comparison
  // data on the server. Optional ?slug1= / ?slug2= drive the per-wallet logo
  // embed; if missing or unknown, the card falls back to a placeholder.
  app.get("/og/compare.svg", (req, res) => {
    const svg = buildCompareOgSvg(
      String(req.query.w1 ?? "Wallet 1"),
      String(req.query.w2 ?? "Wallet 2"),
      resolveCompareSlug(req.query.slug1),
      resolveCompareSlug(req.query.slug2),
    );
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(svg);
  });

  // PNG version of the compare card for Twitter/X and Facebook crawlers.
  app.get("/og/compare.png", (req, res) => {
    try {
      const svg = buildCompareOgSvg(
        String(req.query.w1 ?? "Wallet 1"),
        String(req.query.w2 ?? "Wallet 2"),
        resolveCompareSlug(req.query.slug1),
        resolveCompareSlug(req.query.slug2),
      );
      const png = renderSvgToPng(svg);
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(png);
    } catch (err) {
      console.error("Failed to render /og/compare.png:", err);
      res.status(500).type("text/plain").send("Failed to render OG image");
    }
  });

  // Per-wallet branded OG card (1200x630) — used as the image for
  // /wallet/<slug> in the sitemap and social-meta tags so search engines and
  // social crawlers surface a richer, contextual visual instead of the small
  // square brand logo on its own. Slugs are strictly allowlisted against
  // walletCards/exchangeCards so unknown slugs cannot influence the
  // logo-file lookup or balloon the in-memory cache.
  app.get("/og/wallet.svg", (req, res) => {
    const slug = String(req.query.slug ?? "xaman");
    if (!Object.prototype.hasOwnProperty.call(walletCards, slug)) {
      res.status(404).type("text/plain").send("Unknown wallet slug");
      return;
    }
    const svg = buildWalletOgSvg(slug);
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(svg);
  });

  app.get("/og/wallet.png", (req, res) => {
    const slug = String(req.query.slug ?? "xaman");
    if (!Object.prototype.hasOwnProperty.call(walletCards, slug)) {
      res.status(404).type("text/plain").send("Unknown wallet slug");
      return;
    }
    try {
      const png = getOgPng("wallet", slug);
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(png);
    } catch (err) {
      console.error("Failed to render /og/wallet.png:", err);
      res.status(500).type("text/plain").send("Failed to render OG image");
    }
  });

  // Per-exchange branded OG card — same role as /og/wallet but with the
  // 5-point exchange rating scale.
  app.get("/og/exchange.svg", (req, res) => {
    const slug = String(req.query.slug ?? "uphold");
    if (!Object.prototype.hasOwnProperty.call(exchangeCards, slug)) {
      res.status(404).type("text/plain").send("Unknown exchange slug");
      return;
    }
    const svg = buildExchangeOgSvg(slug);
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(svg);
  });

  app.get("/og/exchange.png", (req, res) => {
    const slug = String(req.query.slug ?? "uphold");
    if (!Object.prototype.hasOwnProperty.call(exchangeCards, slug)) {
      res.status(404).type("text/plain").send("Unknown exchange slug");
      return;
    }
    try {
      const png = getOgPng("exchange", slug);
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(png);
    } catch (err) {
      console.error("Failed to render /og/exchange.png:", err);
      res.status(500).type("text/plain").send("Failed to render OG image");
    }
  });

  // Sitemap XML — generated dynamically from the route source of truth so it
  // stays in sync with App.tsx as new wallets, exchanges, comparisons, best-for
  // hubs and blog posts are added.
  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = "https://allthingsxrpl.com";
    const today = new Date().toISOString().slice(0, 10);

    type Entry = { url: string; priority: string; changefreq: string; lastmod?: string; image?: string };

    const staticPages: Entry[] = [
      { url: "/", priority: "1.0", changefreq: "daily" },
      { url: "/best-xrp-wallets", priority: "0.9", changefreq: "weekly" },
      { url: "/getting-started", priority: "0.9", changefreq: "weekly" },
      { url: "/wallet-quiz", priority: "0.9", changefreq: "weekly" },
      { url: "/blog", priority: "0.8", changefreq: "daily" },
      { url: "/news", priority: "0.8", changefreq: "hourly" },
      { url: "/dapps", priority: "0.7", changefreq: "weekly" },
      { url: "/yield", priority: "0.7", changefreq: "weekly" },
      { url: "/faq", priority: "0.7", changefreq: "weekly" },
      { url: "/about", priority: "0.5", changefreq: "monthly" },
      { url: "/contact", priority: "0.5", changefreq: "monthly" },
      { url: "/disclosure", priority: "0.3", changefreq: "yearly" },
      { url: "/privacy", priority: "0.3", changefreq: "yearly" },
      { url: "/terms", priority: "0.3", changefreq: "yearly" },
    ];

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const walletPages: Entry[] = walletSlugs.map(slug => ({
      url: `/wallet/${slug}`, priority: "0.8", changefreq: "weekly",
      image: `/og/wallet.png?slug=${encodeURIComponent(slug)}`,
    }));
    const exchangePages: Entry[] = exchangeSlugs.map(slug => ({
      url: `/exchange/${slug}`, priority: "0.8", changefreq: "weekly",
      image: `/og/exchange.png?slug=${encodeURIComponent(slug)}`,
    }));
    const comparePages: Entry[] = compareSlugs.map(slug => {
      const parts = slug.split("-vs-");
      // Pass slug1/slug2 alongside w1/w2 so the compare share card embeds
      // each wallet's brand logo (matches the URL shape produced by
      // socialMeta.ts for live page shares).
      const image =
        parts.length === 2
          ? `/og/compare.png?w1=${encodeURIComponent(capitalize(parts[0]))}&w2=${encodeURIComponent(capitalize(parts[1]))}&slug1=${encodeURIComponent(parts[0])}&slug2=${encodeURIComponent(parts[1])}`
          : undefined;
      return { url: `/compare/${slug}`, priority: "0.7", changefreq: "monthly", image };
    });
    const bestForPages: Entry[] = bestForSlugs.map(slug => ({
      url: `/best-for/${slug}`, priority: "0.8", changefreq: "weekly",
    }));
    const blogPages: Entry[] = blogPosts.map(p => ({
      url: `/blog/${p.id}`, priority: "0.6", changefreq: "monthly", lastmod: p.dateIso,
      image: p.image,
    }));

    const allPages: Entry[] = [
      ...staticPages,
      ...walletPages,
      ...exchangePages,
      ...comparePages,
      ...bestForPages,
      ...blogPages,
    ];

    // hreflang annotations — tell search engines about every language
    // version of each URL so the right translation surfaces per region.
    // Languages map to ISO codes Google expects (e.g. zh -> zh-Hans).
    const hreflangMap: Array<{ lang: string; hreflang: string }> = [
      { lang: "en", hreflang: "en" },
      { lang: "es", hreflang: "es" },
      { lang: "zh", hreflang: "zh-Hans" },
      { lang: "ja", hreflang: "ja" },
      { lang: "ko", hreflang: "ko" },
      { lang: "pt", hreflang: "pt" },
      { lang: "de", hreflang: "de" },
      { lang: "fr", hreflang: "fr" },
    ];

    const buildAlternates = (urlPath: string): string => {
      const lines = hreflangMap.map(({ lang, hreflang }) => {
        const href = lang === "en"
          ? `${baseUrl}${urlPath}`
          : `${baseUrl}${urlPath}${urlPath.includes("?") ? "&" : "?"}lang=${lang}`;
        return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
      });
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${urlPath}"/>`);
      return lines.join("\n");
    };

    // Escape XML entities in URLs (notably & in query strings) so the sitemap
    // remains valid against the sitemaps.org schema.
    const escapeXmlAttr = (s: string): string =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

    // Resolve the page's primary image (Open Graph hero) so Google Images and
    // Discover can surface our wallet/exchange/comparison/blog visuals next to
    // organic results. Wallet/exchange/comparison/blog entries already carry a
    // page-specific image; static and best-for pages fall back to the shared
    // page.svg generator keyed by their resolved SEO title.
    const buildImage = (entry: Entry): string => {
      const img =
        entry.image ?? resolveOgImageForPath(entry.url) ?? "/og/page.png?title=All%20Things%20XRPL";
      const absolute = /^https?:\/\//i.test(img) ? img : `${baseUrl}${img}`;
      return `    <image:image><image:loc>${escapeXmlAttr(absolute)}</image:loc></image:image>`;
    };

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${p.lastmod ?? today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${buildAlternates(p.url)}
${buildImage(p)}
  </url>`).join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  });

  // RSS Feed
  app.get("/rss.xml", (req, res) => {
    const baseUrl = "https://allthingsxrpl.com";
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>All Things XRPL</title>
    <description>Your trusted source for XRP Ledger wallet comparisons, dApp reviews, and staking guides.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${blogPosts.map(post => `    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.id}</link>
      <guid>${baseUrl}/blog/${post.id}</guid>
      <pubDate>${new Date(post.dateIso).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`).join("\n")}
  </channel>
</rss>`;

    res.header("Content-Type", "application/rss+xml");
    res.send(xml);
  });

  // XRP News feed API
  app.get("/api/news", async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
      const items = await fetchAllNews();
      res.json({ items: items.slice(0, limit) });
    } catch (error) {
      console.error("[News] Error:", error);
      res.status(500).json({ items: [], error: "Failed to fetch news" });
    }
  });

  // Affiliate click tracking
  app.post("/api/track-click", (req, res) => {
    const { partner, placement, timestamp, page } = req.body;
    console.log(`[Affiliate Click] Partner: ${partner}, Placement: ${placement}, Page: ${page}`);
    res.json({ success: true });
  });

  // Product reviews — visitor-submitted ratings + reviews for wallets/exchanges.
  // Light spam guard: per-IP throttle keyed by (kind, slug, ip) over a short window.
  const reviewSubmissions = new Map<string, number>();
  const REVIEW_THROTTLE_MS = 60 * 1000;

  app.get("/api/reviews/:kind/:slug", async (req, res) => {
    try {
      const kind = String(req.params.kind);
      const slug = String(req.params.slug);
      if (!["wallet", "exchange"].includes(kind) || !/^[a-z0-9-]{1,64}$/.test(slug)) {
        return res.status(400).json({ error: "Invalid review target" });
      }
      const limit = Math.min(parseInt(String(req.query.limit ?? "")) || 5, 20);
      const [reviews, summary] = await Promise.all([
        storage.getProductReviews(kind, slug, limit),
        storage.getProductReviewSummary(kind, slug),
      ]);
      res.json({
        reviews,
        count: summary.count,
        average: summary.average,
      });
    } catch (error) {
      console.error("[Reviews] Get error:", error);
      res.status(500).json({ error: "Failed to load reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const data = insertProductReviewSchema.parse(req.body);

      // Spam guard 1: very basic URL/HTML rejection
      if (/(https?:\/\/|<\s*a\b|<\s*script\b)/i.test(data.body)) {
        return res
          .status(400)
          .json({ error: "Links and HTML aren't allowed in reviews." });
      }

      // Spam guard 2: per-IP per-target throttle
      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "unknown";
      const throttleKey = `${data.targetKind}:${data.targetSlug}:${ip}`;
      const last = reviewSubmissions.get(throttleKey);
      const now = Date.now();
      if (last && now - last < REVIEW_THROTTLE_MS) {
        return res
          .status(429)
          .json({ error: "You just submitted a review — please wait a moment before sending another." });
      }
      reviewSubmissions.set(throttleKey, now);

      const review = await storage.createProductReview(data);
      console.log(
        `[Reviews] New review for ${data.targetKind}:${data.targetSlug} (${data.rating}★) by ${data.authorName}`,
      );
      notifyNewReview(review, req);
      res.status(201).json({ success: true, review });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors[0]?.message || "Invalid review";
        return res.status(400).json({ error: message });
      }
      console.error("[Reviews] Create error:", error);
      res.status(500).json({ error: "Failed to submit review" });
    }
  });

  // Admin moderation — requires ADMIN_TOKEN as Bearer token (or x-admin-token).
  // Lets editors list every visitor review (including hidden ones), hide a
  // review (excluded from the public list and aggregateRating), unhide it, or
  // delete it permanently.
  function requireAdmin(req: Request, res: Response): boolean {
    const expected = process.env.ADMIN_TOKEN;
    if (!expected) {
      res.status(503).json({ error: "Admin moderation is not configured (missing ADMIN_TOKEN)." });
      return false;
    }
    const header = String(req.headers["authorization"] ?? "");
    const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
    const fallback = String(req.headers["x-admin-token"] ?? "").trim();
    const provided = bearer || fallback;
    if (!provided || provided !== expected) {
      res.status(401).json({ error: "Unauthorized" });
      return false;
    }
    return true;
  }

  app.get("/api/admin/reviews", async (req, res) => {
    if (!requireAdmin(req, res)) return;
    try {
      const limit = Math.min(parseInt(String(req.query.limit ?? "")) || 100, 500);
      const reviews = await storage.listAllProductReviews(limit);
      res.json({ reviews });
    } catch (error) {
      console.error("[Admin Reviews] List error:", error);
      res.status(500).json({ error: "Failed to load reviews" });
    }
  });

  app.post("/api/admin/reviews/:id/hide", async (req, res) => {
    if (!requireAdmin(req, res)) return;
    try {
      const id = parseInt(req.params.id, 10);
      if (!Number.isFinite(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid review id" });
      }
      const review = await storage.hideProductReview(id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      console.log(`[Admin Reviews] Hidden review #${id}`);
      res.json({ success: true, review });
    } catch (error) {
      console.error("[Admin Reviews] Hide error:", error);
      res.status(500).json({ error: "Failed to hide review" });
    }
  });

  app.post("/api/admin/reviews/:id/unhide", async (req, res) => {
    if (!requireAdmin(req, res)) return;
    try {
      const id = parseInt(req.params.id, 10);
      if (!Number.isFinite(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid review id" });
      }
      const review = await storage.unhideProductReview(id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      console.log(`[Admin Reviews] Restored review #${id}`);
      res.json({ success: true, review });
    } catch (error) {
      console.error("[Admin Reviews] Unhide error:", error);
      res.status(500).json({ error: "Failed to restore review" });
    }
  });

  app.delete("/api/admin/reviews/:id", async (req, res) => {
    if (!requireAdmin(req, res)) return;
    try {
      const id = parseInt(req.params.id, 10);
      if (!Number.isFinite(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid review id" });
      }
      const ok = await storage.deleteProductReview(id);
      if (!ok) return res.status(404).json({ error: "Review not found" });
      console.log(`[Admin Reviews] Deleted review #${id}`);
      res.json({ success: true });
    } catch (error) {
      console.error("[Admin Reviews] Delete error:", error);
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // Newsletter subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse(req.body);

      // Check if email already exists — log re-engagement source if present
      const existing = await storage.getSubscriberByEmail(data.email);
      if (existing) {
        if (data.source || data.leadMagnet) {
          console.log(`[Subscribe] Existing subscriber re-engaged: ${data.email} via source=${data.source || "n/a"} magnet=${data.leadMagnet || "n/a"}`);
        }
        return res.status(200).json({ success: true, message: "You're already subscribed — thanks!" });
      }

      const subscriber = await storage.createSubscriber(data);
      console.log(`[Subscribe] New subscriber: ${data.email} source=${data.source || "n/a"} magnet=${data.leadMagnet || "n/a"}`);
      res.status(201).json({ success: true, message: "Successfully subscribed!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      console.error("Subscribe error:", error);
      res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);
      res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Please fill in all required fields" });
      }
      console.error("Contact error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  return httpServer;
}
