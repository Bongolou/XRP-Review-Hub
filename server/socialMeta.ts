import { blogPosts } from "@shared/blog";

const WALLET_SLUGS = new Set([
  "xaman",
  "ledger",
  "crossmark",
  "bifrost",
  "gatehub",
  "trustwallet",
  "ellipal",
  "trezor",
  "tangem",
]);

const STATIC_PAGE_TITLES: Record<string, string> = {
  "/": "All Things XRPL",
  "/about": "About",
  "/faq": "FAQ",
  "/contact": "Contact",
  "/getting-started": "Getting Started with XRP",
  "/disclosure": "Disclosure",
  "/news": "XRPL News",
  "/blog": "Blog",
  "/dapps": "XRPL DApps",
  "/yield": "Yield Opportunities",
  "/wallet-quiz": "Wallet Quiz",
  "/best-xrp-wallets": "Best XRP Wallets",
  "/privacy": "Privacy Policy",
  "/terms": "Terms",
};

const EXCHANGE_SLUGS = new Set([
  "uphold",
  "bitrue",
  "kraken",
  "bitstamp",
  "coinbase",
  "cryptocom",
  "kucoin",
]);

function logoUrl(slug: string): string {
  return `/logos/${slug}-logo.png`;
}

export function resolveOgImageForPath(pathname: string): string | undefined {
  const clean = pathname.split("?")[0].split("#")[0];

  const walletMatch = clean.match(/^\/wallet\/([^/]+)\/?$/);
  if (walletMatch && WALLET_SLUGS.has(walletMatch[1])) {
    return logoUrl(walletMatch[1]);
  }

  const exchangeMatch = clean.match(/^\/exchange\/([^/]+)\/?$/);
  if (exchangeMatch && EXCHANGE_SLUGS.has(exchangeMatch[1])) {
    return logoUrl(exchangeMatch[1]);
  }

  const compareMatch = clean.match(/^\/compare\/([^/]+)\/?$/);
  if (compareMatch) {
    const slug = compareMatch[1];
    const parts = slug.split("-vs-");
    if (parts.length === 2) {
      const params = new URLSearchParams({
        w1: capitalize(parts[0]),
        w2: capitalize(parts[1]),
      });
      return `/og/compare.svg?${params.toString()}`;
    }
  }

  const blogMatch = clean.match(/^\/blog\/(\d+)\/?$/);
  if (blogMatch) {
    const id = parseInt(blogMatch[1], 10);
    const post = blogPosts.find((p) => p.id === id);
    if (post?.image) return post.image;
  }

  const staticTitle = STATIC_PAGE_TITLES[clean.replace(/\/$/, "") || "/"];
  if (staticTitle) {
    const params = new URLSearchParams({ title: staticTitle });
    return `/og/page.svg?${params.toString()}`;
  }

  return undefined;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toAbsolute(image: string, host: string, protocol: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  return `${protocol}://${host}${image}`;
}

export function injectSocialMeta(
  html: string,
  pathname: string,
  host: string,
  protocol: string,
): string {
  const image = resolveOgImageForPath(pathname);
  if (!image) return html;
  const absolute = escapeHtmlAttr(toAbsolute(image, host, protocol));
  return html
    .replace(
      /<meta property="og:image" content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${absolute}" />`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${absolute}" />`,
    );
}
