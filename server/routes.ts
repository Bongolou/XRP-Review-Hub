import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";

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

const blogPosts = [
  { id: 1, title: "Top 5 DeFi dApps on XRPL in 2026", date: "2026-01-24", category: "Ecosystem" },
  { id: 2, title: "Understanding AMM Staking Rewards", date: "2026-01-20", category: "Guides" },
  { id: 3, title: "Security Best Practices for Self-Custody", date: "2026-01-15", category: "Security" },
  { id: 4, title: "NFT Marketplaces on XRPL: Complete Guide", date: "2026-01-12", category: "NFTs" },
  { id: 5, title: "XRPL Sidechains Explained", date: "2026-01-08", category: "Technology" },
  { id: 6, title: "Tokenizing Real World Assets on XRPL", date: "2026-01-05", category: "Institutional" },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Sitemap XML
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://allthingsxrpl.com";
    const pages = [
      { url: "/", priority: "1.0", changefreq: "daily" },
      { url: "/getting-started", priority: "0.9", changefreq: "weekly" },
      { url: "/wallet-quiz", priority: "0.9", changefreq: "weekly" },
      { url: "/blog", priority: "0.8", changefreq: "daily" },
      { url: "/news", priority: "0.8", changefreq: "hourly" },
      { url: "/faq", priority: "0.7", changefreq: "weekly" },
      { url: "/wallet/xaman", priority: "0.8", changefreq: "weekly" },
      { url: "/wallet/ledger", priority: "0.8", changefreq: "weekly" },
      { url: "/wallet/tangem", priority: "0.8", changefreq: "weekly" },
      { url: "/exchange/uphold", priority: "0.8", changefreq: "weekly" },
      { url: "/exchange/bitrue", priority: "0.8", changefreq: "weekly" },
      { url: "/exchange/kraken", priority: "0.8", changefreq: "weekly" },
      { url: "/compare/xaman-vs-ledger", priority: "0.7", changefreq: "weekly" },
      { url: "/about", priority: "0.5", changefreq: "monthly" },
      { url: "/contact", priority: "0.5", changefreq: "monthly" },
      { url: "/disclosure", priority: "0.3", changefreq: "yearly" },
      { url: "/privacy", priority: "0.3", changefreq: "yearly" },
      { url: "/terms", priority: "0.3", changefreq: "yearly" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
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
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
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
      
      // Check if email already exists
      const existing = await storage.getSubscriberByEmail(data.email);
      if (existing) {
        return res.status(400).json({ error: "Email already subscribed" });
      }
      
      const subscriber = await storage.createSubscriber(data);
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
