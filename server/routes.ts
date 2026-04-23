import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { blogPosts } from "@shared/blog";
import { z } from "zod";

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

const walletSlugs = [
  "xaman", "ledger", "crossmark", "tangem", "bifrost",
  "trustwallet", "gatehub", "ellipal", "trezor",
];

const exchangeSlugs = [
  "uphold", "bitrue", "kraken", "coinbase", "bitstamp", "cryptocom", "kucoin",
];

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
      route: "/downloads/xrpl-defi-starter-kit.pdf",
      filename: "downloads/xrpl-defi-starter-kit.pdf",
      contentType: "application/pdf",
    },
  ];

  for (const lang of ["es", "zh", "ja", "ko", "pt", "de", "fr"]) {
    const fname = `xrpl-defi-starter-kit.${lang}.md`;
    leadMagnets.push({
      route: `/downloads/${fname}`,
      filename: fname,
      contentType: "text/markdown; charset=utf-8",
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

  // Sitemap XML — generated dynamically from the route source of truth so it
  // stays in sync with App.tsx as new wallets, exchanges, comparisons, best-for
  // hubs and blog posts are added.
  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = "https://allthingsxrpl.com";
    const today = new Date().toISOString().slice(0, 10);

    type Entry = { url: string; priority: string; changefreq: string; lastmod?: string };

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

    const walletPages: Entry[] = walletSlugs.map(slug => ({
      url: `/wallet/${slug}`, priority: "0.8", changefreq: "weekly",
    }));
    const exchangePages: Entry[] = exchangeSlugs.map(slug => ({
      url: `/exchange/${slug}`, priority: "0.8", changefreq: "weekly",
    }));
    const comparePages: Entry[] = compareSlugs.map(slug => ({
      url: `/compare/${slug}`, priority: "0.7", changefreq: "monthly",
    }));
    const bestForPages: Entry[] = bestForSlugs.map(slug => ({
      url: `/best-for/${slug}`, priority: "0.8", changefreq: "weekly",
    }));
    const blogPages: Entry[] = blogPosts.map(p => ({
      url: `/blog/${p.id}`, priority: "0.6", changefreq: "monthly", lastmod: p.dateIso,
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

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${p.lastmod ?? today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${buildAlternates(p.url)}
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
