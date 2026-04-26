import { blogPosts } from "@shared/blog";
import {
  seoTranslations,
  getSeoEntry,
  getHomeSeo,
} from "../client/src/lib/i18n/seoTranslations";
import {
  exchangeSeo,
  staticPageSeo,
  bestForSeo,
  type StaticPageKey,
  type BestForSlug,
} from "../client/src/lib/i18n/pageSeo";
import { translations, type Language } from "../client/src/lib/i18n/translations";
import { dappsTranslations } from "../client/src/lib/i18n/dappsTranslations";

type Meta = { title: string; description: string; image?: string };

const LANGS: ReadonlyArray<Language> = [
  "en",
  "es",
  "zh",
  "ja",
  "ko",
  "pt",
  "de",
  "fr",
];

function pickLanguage(query: URLSearchParams): Language {
  const raw = (query.get("lang") || "").toLowerCase();
  return (LANGS as ReadonlyArray<string>).includes(raw)
    ? (raw as Language)
    : "en";
}

const STATIC_ROUTES: Record<string, StaticPageKey> = {
  "/about": "about",
  "/faq": "faq",
  "/contact": "contact",
  "/getting-started": "gettingStarted",
  "/disclosure": "disclosure",
  "/news": "news",
  "/blog": "blog",
  "/yield": "yield",
  "/wallet-quiz": "walletQuiz",
  "/best-xrp-wallets": "bestXrpWallets",
  "/privacy": "privacy",
  "/terms": "terms",
};

function pageOg(title: string): string {
  const params = new URLSearchParams({ title });
  return `/og/page.png?${params.toString()}`;
}

function walletOg(slug: string): string {
  const params = new URLSearchParams({ slug });
  return `/og/wallet.png?${params.toString()}`;
}

function exchangeOg(slug: string): string {
  const params = new URLSearchParams({ slug });
  return `/og/exchange.png?${params.toString()}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function resolveMetaForPath(
  pathname: string,
  query: URLSearchParams,
): Meta | undefined {
  const clean = (pathname.split("?")[0].split("#")[0] || "/").replace(
    /\/+$/,
    "",
  ) || "/";
  const lang = pickLanguage(query);

  if (clean === "/") {
    const seo = getHomeSeo(lang);
    return { title: seo.title, description: seo.description, image: pageOg(seo.title) };
  }

  const walletMatch = clean.match(/^\/wallet\/([^/]+)$/);
  if (walletMatch) {
    const slug = walletMatch[1];
    const seo = getSeoEntry(lang, "wallet", slug);
    if (seo) {
      return { title: seo.title, description: seo.description, image: walletOg(slug) };
    }
  }

  const exchangeMatch = clean.match(/^\/exchange\/([^/]+)$/);
  if (exchangeMatch) {
    const slug = exchangeMatch[1];
    const seo =
      exchangeSeo[lang]?.[slug] ?? exchangeSeo.en[slug];
    if (seo) {
      return { title: seo.title, description: seo.description, image: exchangeOg(slug) };
    }
  }

  const compareMatch = clean.match(/^\/compare\/([^/]+)$/);
  if (compareMatch) {
    const slug = compareMatch[1];
    const seo = getSeoEntry(lang, "compare", slug);
    const parts = slug.split("-vs-");
    let image: string | undefined;
    if (parts.length === 2) {
      // Pass the raw slugs alongside the capitalized display names so
      // /og/compare can embed each wallet's brand logo on the share card.
      const params = new URLSearchParams({
        w1: capitalize(parts[0]),
        w2: capitalize(parts[1]),
        slug1: parts[0],
        slug2: parts[1],
      });
      image = `/og/compare.png?${params.toString()}`;
    }
    if (seo) return { title: seo.title, description: seo.description, image };
  }

  const blogMatch = clean.match(/^\/blog\/(\d+)$/);
  if (blogMatch) {
    const id = parseInt(blogMatch[1], 10);
    const post = blogPosts.find((p) => p.id === id);
    if (post) {
      const dict = translations[lang] ?? translations.en;
      const enDict = translations.en;
      const translatedTitle =
        dict[post.titleKey] ?? enDict[post.titleKey] ?? post.title;
      const translatedExcerpt =
        dict[post.excerptKey] ?? enDict[post.excerptKey];
      const description =
        lang === "en" || !translatedExcerpt
          ? `${translatedTitle} — read this XRPL guide on All Things XRPL.`
          : translatedExcerpt;
      return {
        title: `${translatedTitle} | All Things XRPL`,
        description,
        image: post.image,
      };
    }
  }

  const bestForMatch = clean.match(/^\/best-for\/([^/]+)$/);
  if (bestForMatch) {
    const slug = bestForMatch[1] as BestForSlug;
    const seo = bestForSeo[lang]?.[slug] ?? bestForSeo.en[slug];
    if (seo) return { title: seo.title, description: seo.description, image: pageOg(seo.title) };
  }

  if (clean === "/dapps") {
    const dict = dappsTranslations[lang] ?? dappsTranslations.en;
    const enDict = dappsTranslations.en;
    const title = dict["dapps.metaTitle"] ?? enDict["dapps.metaTitle"];
    const description =
      dict["dapps.metaDescription"] ?? enDict["dapps.metaDescription"];
    return { title, description, image: pageOg(title) };
  }

  if (clean in STATIC_ROUTES) {
    const key = STATIC_ROUTES[clean];
    const seo = staticPageSeo[lang]?.[key] ?? staticPageSeo.en[key];
    if (seo) return { title: seo.title, description: seo.description, image: pageOg(seo.title) };
  }

  return undefined;
}

// Backwards-compatible helper kept for any external callers.
export function resolveOgImageForPath(pathname: string): string | undefined {
  const url = new URL(pathname, "http://x");
  return resolveMetaForPath(url.pathname, url.searchParams)?.image;
}

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function toAbsolute(image: string, host: string, protocol: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  return `${protocol}://${host}${image}`;
}

function replaceMetaByName(
  html: string,
  name: string,
  content: string,
): string {
  const re = new RegExp(
    `<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`,
    "i",
  );
  const tag = `<meta name="${name}" content="${content}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

function replaceMetaByProperty(
  html: string,
  property: string,
  content: string,
): string {
  const re = new RegExp(
    `<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`,
    "i",
  );
  const tag = `<meta property="${property}" content="${content}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
}

export function injectSocialMeta(
  html: string,
  originalUrl: string,
  host: string,
  protocol: string,
): string {
  const url = new URL(originalUrl, `${protocol}://${host}`);
  const meta = resolveMetaForPath(url.pathname, url.searchParams);
  if (!meta) return html;

  const title = escapeHtmlAttr(meta.title);
  const description = escapeHtmlAttr(meta.description);
  const canonical = escapeHtmlAttr(`${protocol}://${host}${url.pathname}${url.search}`);

  let out = html;
  out = out.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`,
  );
  out = replaceMetaByName(out, "title", title);
  out = replaceMetaByName(out, "description", description);
  out = replaceMetaByProperty(out, "og:title", title);
  out = replaceMetaByProperty(out, "og:description", description);
  out = replaceMetaByProperty(out, "og:url", canonical);
  out = replaceMetaByName(out, "twitter:title", title);
  out = replaceMetaByName(out, "twitter:description", description);
  out = replaceMetaByName(out, "twitter:url", canonical);

  if (meta.image) {
    const absolute = escapeHtmlAttr(toAbsolute(meta.image, host, protocol));
    out = replaceMetaByProperty(out, "og:image", absolute);
    out = replaceMetaByName(out, "twitter:image", absolute);
  }

  return out;
}

// Re-export so existing tests / imports keep working.
export { seoTranslations };
