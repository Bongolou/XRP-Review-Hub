// Regression tests for the per-page hreflang block injected by
// injectSocialMeta.
import { describe, it, expect } from "vitest";
import { blogPosts } from "@shared/blog";
import { walletCards, exchangeCards } from "./cardData";
import { compareSlugs, bestForSlugs, sitemapHreflangMap } from "./sitemap";
import {
  injectSocialMeta,
  buildHreflangLinkTags,
  socialMetaHreflangMap,
} from "./socialMeta";

const HOST = "allthingsxrpl.com";
const PROTOCOL = "https";

const TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>placeholder</title>
    <meta name="title" content="placeholder" />
    <meta name="description" content="placeholder" />
    <meta property="og:title" content="placeholder" />
    <meta property="og:description" content="placeholder" />
    <meta property="og:url" content="placeholder" />
    <meta name="twitter:title" content="placeholder" />
    <meta name="twitter:description" content="placeholder" />
    <meta name="twitter:url" content="placeholder" />
    <meta property="og:image" content="placeholder" />
    <meta name="twitter:image" content="placeholder" />
  </head>
  <body><div id="root"></div></body>
</html>`;

function pickRepresentativePaths(): string[] {
  const walletSlug = Object.keys(walletCards)[0];
  const exchangeSlug = Object.keys(exchangeCards)[0];
  return [
    "/",
    "/about",
    "/best-xrp-wallets",
    `/wallet/${walletSlug}`,
    `/exchange/${exchangeSlug}`,
    `/compare/${compareSlugs[0]}`,
    `/blog/${blogPosts[0].id}`,
    `/best-for/${bestForSlugs[0]}`,
  ];
}

function extractHreflangLinks(html: string): string[] {
  const out: string[] = [];
  const re = /<link\b[^>]*\bdata-hreflang-injected\b[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(m[0]);
  return out;
}

const extractHreflangAttr = (tag: string) => tag.match(/\bhreflang="([^"]+)"/)?.[1] ?? null;
const extractHrefAttr = (tag: string) => tag.match(/\bhref="([^"]+)"/)?.[1] ?? null;

describe("socialMeta hreflang injector", () => {
  it("exposes the same 8 languages plus x-default the sitemap uses", () => {
    expect(socialMetaHreflangMap).toHaveLength(8);
    expect(socialMetaHreflangMap.map((h) => h.hreflang)).toEqual([
      "en", "es", "zh-Hans", "ja", "ko", "pt", "de", "fr",
    ]);
  });

  it("emits one hreflang link per language plus x-default for every representative path", () => {
    for (const path of pickRepresentativePaths()) {
      const out = injectSocialMeta(TEMPLATE, path, HOST, PROTOCOL);
      const links = extractHreflangLinks(out);
      expect(links.length, `path ${path}`).toBe(socialMetaHreflangMap.length + 1);
      const codes = links.map(extractHreflangAttr);
      for (const { hreflang } of socialMetaHreflangMap) {
        expect(codes.filter((c) => c === hreflang).length).toBe(1);
      }
      expect(codes.filter((c) => c === "x-default").length).toBe(1);
    }
  });

  it("encodes localized URLs with absolute origin and the right ?lang= suffix", () => {
    const path = "/wallet/" + Object.keys(walletCards)[0];
    const links = extractHreflangLinks(injectSocialMeta(TEMPLATE, path, HOST, PROTOCOL));
    const byCode = new Map<string, string>();
    for (const tag of links) {
      const code = extractHreflangAttr(tag);
      const href = extractHrefAttr(tag);
      if (code && href) byCode.set(code, href);
    }
    expect(byCode.get("en")).toBe(`https://${HOST}${path}`);
    expect(byCode.get("x-default")).toBe(`https://${HOST}${path}`);
    expect(byCode.get("es")).toBe(`https://${HOST}${path}?lang=es`);
    expect(byCode.get("zh-Hans")).toBe(`https://${HOST}${path}?lang=zh`);
    expect(byCode.get("ja")).toBe(`https://${HOST}${path}?lang=ja`);
    expect(byCode.get("ko")).toBe(`https://${HOST}${path}?lang=ko`);
    expect(byCode.get("pt")).toBe(`https://${HOST}${path}?lang=pt`);
    expect(byCode.get("de")).toBe(`https://${HOST}${path}?lang=de`);
    expect(byCode.get("fr")).toBe(`https://${HOST}${path}?lang=fr`);
  });

  it("escapes attribute values so HTML stays valid for normal paths", () => {
    const html = buildHreflangLinkTags(`/compare/${compareSlugs[0]}`, HOST, PROTOCOL);
    const bareAmp = /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/;
    expect(bareAmp.test(html)).toBe(false);
  });

  it("HTML-escapes &, <, >, and \" in pathname and host so attribute values stay safe", () => {
    // Synthetic input: real routes don't contain these characters, but
    // the helper must escape them defensively so a future route or
    // dynamic slug can't break out of the href attribute.
    const html = buildHreflangLinkTags(
      `/compare/foo?bar=1&baz=<x>"y"`,
      `evil&host"<x>`,
      PROTOCOL,
    );
    expect(html).toContain("&amp;");
    expect(html).toContain("&lt;");
    expect(html).toContain("&gt;");
    expect(html).toContain("&quot;");
    const hrefValues = Array.from(html.matchAll(/href="([^"]*)"/g)).map((m) => m[1]);
    expect(hrefValues.length).toBeGreaterThan(0);
    for (const v of hrefValues) {
      expect(v).not.toMatch(/[<>"]/);
      const bareAmp = /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/;
      expect(bareAmp.test(v)).toBe(false);
    }
  });

  it("stays in lockstep with sitemapHreflangMap (same languages, same hreflang codes)", () => {
    // Both maps must agree so a page's <head> alternates and its
    // sitemap entries advertise the exact same set of language URLs.
    expect(socialMetaHreflangMap.length).toBe(sitemapHreflangMap.length);
    const social = socialMetaHreflangMap.map((h) => `${h.lang}->${h.hreflang}`).sort();
    const sitemap = sitemapHreflangMap.map((h) => `${h.lang}->${h.hreflang}`).sort();
    expect(social).toEqual(sitemap);
  });

  it("places injected hreflang links inside <head>", () => {
    const out = injectSocialMeta(TEMPLATE, `/blog/${blogPosts[0].id}`, HOST, PROTOCOL);
    const headEnd = out.indexOf("</head>");
    expect(headEnd).toBeGreaterThan(-1);
    const links = extractHreflangLinks(out);
    expect(links.length).toBeGreaterThan(0);
    for (const tag of links) {
      expect(out.indexOf(tag)).toBeLessThan(headEnd);
    }
  });

  it("is idempotent: a second injection does not duplicate the hreflang block", () => {
    const path = `/exchange/${Object.keys(exchangeCards)[0]}`;
    const once = injectSocialMeta(TEMPLATE, path, HOST, PROTOCOL);
    const twice = injectSocialMeta(once, path, HOST, PROTOCOL);
    expect(extractHreflangLinks(twice).length).toBe(socialMetaHreflangMap.length + 1);
  });

  it("ignores request query params: en + x-default stay on the canonical path even with ?lang=es", () => {
    // Hreflang alternates describe canonical language variants, so we
    // ignore the inbound ?lang= and emit en/x-default on the bare path.
    const slug = Object.keys(walletCards)[0];
    const path = `/wallet/${slug}`;
    const out = injectSocialMeta(TEMPLATE, `${path}?lang=es`, HOST, PROTOCOL);
    const links = extractHreflangLinks(out);
    const byCode = new Map<string, string>();
    for (const tag of links) {
      const c = extractHreflangAttr(tag);
      const h = extractHrefAttr(tag);
      if (c && h) byCode.set(c, h);
    }
    expect(byCode.get("en")).toBe(`https://${HOST}${path}`);
    expect(byCode.get("x-default")).toBe(`https://${HOST}${path}`);
    expect(byCode.get("es")).toBe(`https://${HOST}${path}?lang=es`);
    for (const href of byCode.values()) {
      const langCount = (href.match(/[?&]lang=/g) ?? []).length;
      expect(langCount).toBeLessThanOrEqual(1);
    }
  });

  it("strips request-only params (utm, etc.) from canonical alternate URLs", () => {
    // utm/session params describe a single request, not a canonical
    // language variant — they must not appear in hreflang alternates.
    const slug = Object.keys(walletCards)[0];
    const path = `/wallet/${slug}`;
    const out = injectSocialMeta(
      TEMPLATE,
      `${path}?utm_source=newsletter&utm_medium=email`,
      HOST,
      PROTOCOL,
    );
    const links = extractHreflangLinks(out);
    expect(links.length).toBeGreaterThan(0);
    for (const tag of links) {
      expect(tag).not.toContain("utm_source");
      expect(tag).not.toContain("utm_medium");
    }
  });

  it("does not inject anything for paths the meta resolver doesn't recognize", () => {
    const out = injectSocialMeta(TEMPLATE, "/totally-unknown-route-xyzzy", HOST, PROTOCOL);
    expect(out).toBe(TEMPLATE);
    expect(extractHreflangLinks(out)).toEqual([]);
  });
});
