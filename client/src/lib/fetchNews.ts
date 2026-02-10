interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  imageUrl?: string;
}

const RSS2JSON_API = "https://api.rss2json.com/v1/api.json";

const FEEDS = [
  {
    url: "https://cointelegraph.com/rss/tag/xrp",
    source: "CoinTelegraph",
  },
  {
    url: "https://cryptoslate.com/feed/",
    source: "CryptoSlate",
  },
  {
    url: "https://news.google.com/rss/search?q=XRP+OR+XRPL+OR+%22XRP+Ledger%22+OR+Ripple+crypto&hl=en-US&gl=US&ceid=US:en",
    source: "Google News",
  },
];

function extractSourceFromTitle(title: string): { cleanTitle: string; source: string } {
  const parts = title.split(" - ");
  if (parts.length > 1) {
    const source = parts.pop()!.trim();
    return { cleanTitle: parts.join(" - ").trim(), source };
  }
  return { cleanTitle: title, source: "" };
}

function extractImageFromHtml(html: string): string | undefined {
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/);
  return imgMatch ? imgMatch[1] : undefined;
}

async function fetchFeed(feedUrl: string, sourceName: string): Promise<NewsItem[]> {
  try {
    const apiUrl = `${RSS2JSON_API}?rss_url=${encodeURIComponent(feedUrl)}&count=30`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) return [];

    return data.items.map((item: any) => {
      const { cleanTitle, source } = extractSourceFromTitle(item.title || "");
      const imageUrl =
        item.thumbnail ||
        item.enclosure?.link ||
        extractImageFromHtml(item.description || "") ||
        undefined;
      const cleanDesc = (item.description || "")
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 200);

      return {
        title: cleanTitle || item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        source: source || sourceName,
        description: cleanDesc,
        imageUrl,
      };
    });
  } catch {
    return [];
  }
}

let cache: { items: NewsItem[]; ts: number } = { items: [], ts: 0 };
const CACHE_TTL = 5 * 60 * 1000;

export async function fetchAllNews(): Promise<NewsItem[]> {
  const now = Date.now();
  if (cache.items.length > 0 && now - cache.ts < CACHE_TTL) {
    return cache.items;
  }

  const results = await Promise.allSettled(
    FEEDS.map((f) => fetchFeed(f.url, f.source))
  );

  let allItems: NewsItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems = allItems.concat(result.value);
    }
  }

  const xrpKeywords = /xrp|xrpl|ripple|xumm|xaman|xrp\s*ledger/i;
  allItems = allItems.filter(
    (item) => xrpKeywords.test(item.title) || xrpKeywords.test(item.description)
  );

  const seen = new Set<string>();
  allItems = allItems.filter((item) => {
    const key = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  allItems = allItems.filter((item) => item.imageUrl);

  allItems.sort((a, b) => {
    const da = new Date(a.pubDate).getTime();
    const db = new Date(b.pubDate).getTime();
    return (isNaN(db) ? 0 : db) - (isNaN(da) ? 0 : da);
  });

  allItems = allItems.slice(0, 50);

  cache = { items: allItems, ts: now };
  return allItems;
}
