// Sitemap generation — extracted from routes.ts so the same primitives can be
// exercised by automated tests without standing up the whole Express app.
//
// `/sitemap.xml` is a sitemap *index* that points at per-section child
// sitemaps (`/sitemap-wallets.xml`, `/sitemap-blog.xml`, etc.). Each child
// sitemap is auto-chunked so it stays under both sitemaps.org caps:
//   - 50,000 URLs per file
//   - 50 MB per file (uncompressed)
// Each `<url>` block today is ≈1.1 KB once you include the 8-language
// hreflang alternate block plus the image entry, so 50,000 URLs would
// already exceed the 50 MB size cap. We pick a 25,000-URL soft cap to keep
// the worst-case file size around 28 MB (and still leave room for adding
// more languages or richer per-URL metadata in the future). Sections that
// exceed the cap split into `-1.xml`, `-2.xml`, etc. without any manual
// intervention.
import type { BlogPostMeta } from "@shared/blog";
import { resolveOgImageForPath } from "./socialMeta";

export const SITEMAP_BASE_URL = "https://allthingsxrpl.com";
export const SITEMAP_URL_LIMIT = 25000;

// Static slug lists used by the sitemap. Kept here (rather than in
// routes.ts) so tests can import them without dragging in the rest of the
// Express + storage stack.
export const compareSlugs: string[] = [
  "xaman-vs-ledger", "xaman-vs-tangem", "ledger-vs-tangem",
  "ellipal-vs-ledger", "trezor-vs-ledger", "bifrost-vs-xaman",
  "coinbase-vs-kraken", "trustwallet-vs-xaman", "trezor-vs-tangem",
  "ellipal-vs-trezor", "bifrost-vs-crossmark", "gatehub-vs-xaman",
  "gatehub-vs-ledger",
];

export const bestForSlugs: string[] = [
  "beginners", "hardware", "cold-storage", "defi", "safest",
];

// Single source of truth for the static (non-parameterized) public pages
// the SPA exposes. Both the sitemap and the build-time prerenderer
// import this list, so adding a new static page only requires editing
// one place. `/admin/reviews` is intentionally absent — admin routes
// must not be indexed.
export const staticPagePaths: ReadonlyArray<string> = [
  "/",
  "/best-xrp-wallets",
  "/getting-started",
  "/wallet-quiz",
  "/blog",
  "/news",
  "/dapps",
  "/yield",
  "/faq",
  "/about",
  "/contact",
  "/disclosure",
  "/privacy",
  "/terms",
];

// Per-page sitemap metadata, keyed by the path in `staticPagePaths`.
// Kept alongside the path list so it stays trivially in sync.
const staticPageMetadata: Record<string, { priority: string; changefreq: string }> = {
  "/": { priority: "1.0", changefreq: "daily" },
  "/best-xrp-wallets": { priority: "0.9", changefreq: "weekly" },
  "/getting-started": { priority: "0.9", changefreq: "weekly" },
  "/wallet-quiz": { priority: "0.9", changefreq: "weekly" },
  "/blog": { priority: "0.8", changefreq: "daily" },
  "/news": { priority: "0.8", changefreq: "hourly" },
  "/dapps": { priority: "0.7", changefreq: "weekly" },
  "/yield": { priority: "0.7", changefreq: "weekly" },
  "/faq": { priority: "0.7", changefreq: "weekly" },
  "/about": { priority: "0.5", changefreq: "monthly" },
  "/contact": { priority: "0.5", changefreq: "monthly" },
  "/disclosure": { priority: "0.3", changefreq: "yearly" },
  "/privacy": { priority: "0.3", changefreq: "yearly" },
  "/terms": { priority: "0.3", changefreq: "yearly" },
};

export type SitemapEntry = {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
  image?: string;
};

export type SitemapSection = {
  id: string;
  entries: SitemapEntry[];
};

export type SitemapInput = {
  walletSlugs: string[];
  exchangeSlugs: string[];
  compareSlugs: string[];
  bestForSlugs: string[];
  blogPosts: BlogPostMeta[];
};

// hreflang annotations — tell search engines about every language version
// of each URL so the right translation surfaces per region. Languages map
// to ISO codes Google expects (e.g. zh -> zh-Hans).
export const sitemapHreflangMap: ReadonlyArray<{ lang: string; hreflang: string }> = [
  { lang: "en", hreflang: "en" },
  { lang: "es", hreflang: "es" },
  { lang: "zh", hreflang: "zh-Hans" },
  { lang: "ja", hreflang: "ja" },
  { lang: "ko", hreflang: "ko" },
  { lang: "pt", hreflang: "pt" },
  { lang: "de", hreflang: "de" },
  { lang: "fr", hreflang: "fr" },
];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Build the entry list for each section. Returned as a fresh object per
// request so `lastmod` reflects the current day for entries that don't
// carry their own date.
export function buildSitemapSections(input: SitemapInput): SitemapSection[] {
  const { walletSlugs, exchangeSlugs, compareSlugs, bestForSlugs, blogPosts } = input;

  const staticPages: SitemapEntry[] = staticPagePaths.map((url) => ({
    url,
    ...staticPageMetadata[url],
  }));

  const walletPages: SitemapEntry[] = walletSlugs.map(slug => ({
    url: `/wallet/${slug}`, priority: "0.8", changefreq: "weekly",
    image: `/og/wallet.png?slug=${encodeURIComponent(slug)}`,
  }));
  const exchangePages: SitemapEntry[] = exchangeSlugs.map(slug => ({
    url: `/exchange/${slug}`, priority: "0.8", changefreq: "weekly",
    image: `/og/exchange.png?slug=${encodeURIComponent(slug)}`,
  }));
  const comparePages: SitemapEntry[] = compareSlugs.map(slug => {
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
  const bestForPages: SitemapEntry[] = bestForSlugs.map(slug => ({
    url: `/best-for/${slug}`, priority: "0.8", changefreq: "weekly",
  }));
  const blogPages: SitemapEntry[] = blogPosts.map(p => ({
    url: `/blog/${p.id}`, priority: "0.6", changefreq: "monthly", lastmod: p.dateIso,
    // Point at the generated branded share card (instead of the static
    // Unsplash hero) so Google Images and Discover surface the same
    // All Things XRPL-branded preview that social crawlers will fetch.
    image: `/og/blog.png?id=${p.id}`,
  }));

  return [
    { id: "static", entries: staticPages },
    { id: "wallets", entries: walletPages },
    { id: "exchanges", entries: exchangePages },
    { id: "compare", entries: comparePages },
    { id: "best-for", entries: bestForPages },
    { id: "blog", entries: blogPages },
  ];
}

// Append ?lang=xx to a base URL path (no-op for English, which uses the
// bare path as its canonical form).
export function localizedSitemapPath(urlPath: string, lang: string): string {
  if (lang === "en") return urlPath;
  const sep = urlPath.includes("?") ? "&" : "?";
  return `${urlPath}${sep}lang=${lang}`;
}

// Escape XML entities in URLs (notably & in query strings) so the sitemap
// remains valid against the sitemaps.org schema.
export function escapeXmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Split a section's entries into chunks small enough that, after multiplying
// by the language count, the resulting child sitemap stays under
// SITEMAP_URL_LIMIT URLs. Each chunk gets a stable id: single-chunk sections
// keep their bare id (e.g. `wallets`), multi-chunk sections gain a 1-based
// suffix (e.g. `blog-1`, `blog-2`).
export function chunkSection(section: SitemapSection): SitemapSection[] {
  const langCount = sitemapHreflangMap.length;
  const maxEntriesPerChunk = Math.max(1, Math.floor(SITEMAP_URL_LIMIT / langCount));
  if (section.entries.length === 0) return [];
  if (section.entries.length <= maxEntriesPerChunk) {
    return [{ id: section.id, entries: section.entries }];
  }
  const chunks: SitemapSection[] = [];
  for (let i = 0; i < section.entries.length; i += maxEntriesPerChunk) {
    const slice = section.entries.slice(i, i + maxEntriesPerChunk);
    chunks.push({ id: `${section.id}-${chunks.length + 1}`, entries: slice });
  }
  return chunks;
}

// The hreflang block is identical for every language variant of a given
// base path: it advertises all 8 language versions plus x-default so each
// translated <url> entry references its siblings (and itself) per Google's
// hreflang spec.
export function buildSitemapAlternates(urlPath: string): string {
  const lines = sitemapHreflangMap.map(({ lang, hreflang }) => {
    const href = `${SITEMAP_BASE_URL}${localizedSitemapPath(urlPath, lang)}`;
    return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXmlAttr(href)}"/>`;
  });
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXmlAttr(`${SITEMAP_BASE_URL}${urlPath}`)}"/>`);
  return lines.join("\n");
}

// Resolve the page's primary image (Open Graph hero) so Google Images and
// Discover can surface our wallet/exchange/comparison/blog visuals next to
// organic results. Wallet/exchange/comparison/blog entries already carry a
// page-specific image (language-agnostic, keyed by slug); static and
// best-for pages fall back to the shared page.png generator keyed by the
// page's SEO title — so we pass the localized path so the image URL picks
// up the per-language title where one exists.
export function buildSitemapImage(entry: SitemapEntry, lang: string): string {
  const img =
    entry.image ??
    resolveOgImageForPath(localizedSitemapPath(entry.url, lang)) ??
    "/og/page.png?title=All%20Things%20XRPL";
  const absolute = /^https?:\/\//i.test(img) ? img : `${SITEMAP_BASE_URL}${img}`;
  return `    <image:image><image:loc>${escapeXmlAttr(absolute)}</image:loc></image:image>`;
}

// Emit one <url> entry per (path, language) pair. Listing translated URLs
// as their own top-level entries (instead of only as hreflang alternates
// of the English page) helps Google index them independently in their
// target locale.
export function renderSitemapUrl(p: SitemapEntry, lang: string, today: string): string {
  const loc = `${SITEMAP_BASE_URL}${localizedSitemapPath(p.url, lang)}`;
  return `  <url>
    <loc>${escapeXmlAttr(loc)}</loc>
    <lastmod>${p.lastmod ?? today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${buildSitemapAlternates(p.url)}
${buildSitemapImage(p, lang)}
  </url>`;
}

export function renderSitemapChunkXml(entries: SitemapEntry[], today?: string): string {
  const day = today ?? new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(p => sitemapHreflangMap.map(({ lang }) => renderSitemapUrl(p, lang, day)).join("\n")).join("\n")}
</urlset>`;
}

// Render the full set of sitemap files (index + every chunk) as
// { filename, xml } pairs. Used by both the build-time writer (so the
// static Bluehost deploy ships fresh sitemaps) and tests, so the same
// rendering pipeline is exercised from both sides.
export function renderSitemapFiles(
  input: SitemapInput,
  today?: string,
): Array<{ filename: string; xml: string }> {
  const day = today ?? new Date().toISOString().slice(0, 10);
  const chunks = buildSitemapSections(input).flatMap(chunkSection);
  const files: Array<{ filename: string; xml: string }> = [
    { filename: "sitemap.xml", xml: renderSitemapIndexXml(chunks, day) },
  ];
  for (const chunk of chunks) {
    files.push({
      filename: `sitemap-${chunk.id}.xml`,
      xml: renderSitemapChunkXml(chunk.entries, day),
    });
  }
  return files;
}

export function renderSitemapIndexXml(chunks: SitemapSection[], today?: string): string {
  const day = today ?? new Date().toISOString().slice(0, 10);
  const entries = chunks
    .map(({ id }) => `  <sitemap>
    <loc>${escapeXmlAttr(`${SITEMAP_BASE_URL}/sitemap-${id}.xml`)}</loc>
    <lastmod>${day}</lastmod>
  </sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}
