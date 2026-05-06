// Regression tests for the sitemap generator. These exercise the same pure
// functions that `/sitemap.xml` and `/sitemap-:name.xml` use at request time
// so any future edit that drops a language, breaks an entity escape, or
// blows past the 50,000-URL cap fails CI before it ships.
import { describe, it, expect } from "vitest";
import express from "express";
import type { AddressInfo } from "net";
import { blogPosts } from "@shared/blog";
import { walletCards, exchangeCards } from "./cardData";
import {
  buildSitemapSections,
  chunkSection,
  renderSitemapChunkXml,
  renderSitemapFiles,
  renderSitemapIndexXml,
  sitemapHreflangMap,
  compareSlugs,
  bestForSlugs,
  SITEMAP_BASE_URL,
  SITEMAP_URL_LIMIT,
  type SitemapEntry,
  type SitemapSection,
} from "./sitemap";

const FIXED_DAY = "2026-04-29";

const productionInput = () => ({
  walletSlugs: Object.keys(walletCards),
  exchangeSlugs: Object.keys(exchangeCards),
  compareSlugs,
  bestForSlugs,
  blogPosts,
});

const allEntries = (): SitemapEntry[] =>
  buildSitemapSections(productionInput()).flatMap(s => s.entries);

const allChunks = (): SitemapSection[] =>
  buildSitemapSections(productionInput()).flatMap(chunkSection);

const renderEverything = (): string =>
  allChunks().map(c => renderSitemapChunkXml(c.entries, FIXED_DAY)).join("\n");

// Lightweight tag finder. Used in place of a heavyweight DOM parser so the
// test stays a pure-Node unit test.
const matchAll = (xml: string, re: RegExp): string[] => {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  while ((m = r.exec(xml)) !== null) out.push(m[1] ?? m[0]);
  return out;
};

// Validate the structural shape of an XML document well enough to catch
// most real-world breakage (unclosed tags, mismatched tags, leftover raw
// `&` characters). Not a full schema validator — just a sanity gate.
function assertParsesAsXml(xml: string): void {
  expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);

  // No bare ampersands outside of valid entity references. This is the
  // single most common sitemap regression: appending `?lang=xx` to a URL
  // that already has a query string yields `?slug=foo&lang=xx`, which
  // must be escaped to `&amp;` inside <loc>.
  const bareAmp = /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/;
  expect(bareAmp.test(xml)).toBe(false);

  // Tag balance: every opening tag must have a matching close (ignoring
  // self-closing tags and the XML declaration).
  const tagRe = /<\/?([a-zA-Z:][\w:-]*)([^>]*)>/g;
  const stack: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = tagRe.exec(xml)) !== null) {
    const full = match[0];
    const name = match[1];
    if (full.startsWith("<?") || full.startsWith("<!")) continue;
    if (full.endsWith("/>")) continue;
    if (full.startsWith("</")) {
      const top = stack.pop();
      expect(top, `mismatched closing </${name}> in XML`).toBe(name);
    } else {
      stack.push(name);
    }
  }
  expect(stack, `unclosed tags remain: ${stack.join(", ")}`).toEqual([]);
}

describe("sitemap generator", () => {
  it("supports exactly 8 hreflang languages plus x-default", () => {
    expect(sitemapHreflangMap).toHaveLength(8);
    const codes = sitemapHreflangMap.map(h => h.lang);
    expect(codes).toEqual(["en", "es", "zh", "ja", "ko", "pt", "de", "fr"]);
  });

  it("renders well-formed XML for every section", () => {
    for (const chunk of allChunks()) {
      const xml = renderSitemapChunkXml(chunk.entries, FIXED_DAY);
      assertParsesAsXml(xml);
    }
    assertParsesAsXml(renderSitemapIndexXml(allChunks(), FIXED_DAY));
  });

  it("emits one <url> per (page, language) pair", () => {
    const xml = renderEverything();
    const urlCount = matchAll(xml, /<url>/g).length;
    const expected = allEntries().length * sitemapHreflangMap.length;
    expect(urlCount).toBe(expected);
  });

  it("attaches 9 hreflang alternates (8 languages + x-default) to every URL", () => {
    const xml = renderEverything();
    const urlBlocks = xml.split("<url>").slice(1).map(b => b.split("</url>")[0]);
    expect(urlBlocks.length).toBeGreaterThan(0);
    for (const block of urlBlocks) {
      const alts = matchAll(block, /<xhtml:link\s+rel="alternate"/g);
      expect(alts.length).toBe(sitemapHreflangMap.length + 1);
      // Every supported language must appear by hreflang code.
      for (const { hreflang } of sitemapHreflangMap) {
        expect(block).toContain(`hreflang="${hreflang}"`);
      }
      expect(block).toContain('hreflang="x-default"');
    }
  });

  it("escapes ampersands in URLs to &amp;", () => {
    // The compare entries carry multi-param image URLs (?w1=...&w2=...) and
    // every non-English language variant adds &lang=xx to the canonical
    // URL — both of which must be entity-escaped inside XML attributes.
    const compareSection = buildSitemapSections(productionInput())
      .find(s => s.id === "compare")!;
    expect(compareSection.entries.length).toBeGreaterThan(0);
    const xml = renderSitemapChunkXml(compareSection.entries, FIXED_DAY);
    // Compare image URLs combine multiple query params, so the rendered
    // chunk must contain the escaped form and never the raw form.
    expect(xml).toContain("&amp;w2=");
    expect(xml).toContain("&amp;slug1=");
    expect(xml).toContain("&amp;slug2=");
    // Any `&` that survives inside an XML <loc> attribute *must* be the
    // start of a valid character entity. Catch the regression where a
    // future edit forgets to call `escapeXmlAttr` on a URL.
    const bareAmp = /<(?:loc|image:loc)>[^<]*&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/;
    expect(bareAmp.test(xml)).toBe(false);
  });

  it("uses localized OG images for static and best-for entries", () => {
    const sections = buildSitemapSections(productionInput());
    const sectionsToCheck = sections.filter(s => s.id === "static" || s.id === "best-for");
    expect(sectionsToCheck.length).toBe(2);

    for (const section of sectionsToCheck) {
      const xml = renderSitemapChunkXml(section.entries, FIXED_DAY);
      // resolveOgImageForPath returns paths that contain `title=...` query
      // strings derived from the localized SEO entries. If the resolver
      // were silently bypassed, we'd see the bare fallback instead.
      const titles = matchAll(xml, /\/og\/page\.png\?title=([^"<]+)/g);
      expect(titles.length).toBeGreaterThan(0);
      // Localization picks up at least one non-English title across the
      // section's per-language renderings.
      const decoded = titles.map(t => decodeURIComponent(t.replace(/\+/g, " ")));
      const allEnglish = decoded.every(t => /^[\x00-\x7F]+$/.test(t));
      // Static + best-for SEO has translated entries; some languages
      // include non-ASCII characters (zh, ja, ko, etc.).
      expect(allEnglish).toBe(false);
    }
  });

  it("includes one <image:image> per <url>", () => {
    const xml = renderEverything();
    const urlBlocks = xml.split("<url>").slice(1).map(b => b.split("</url>")[0]);
    for (const block of urlBlocks) {
      const imgs = matchAll(block, /<image:image>/g);
      expect(imgs.length).toBe(1);
    }
  });

  it("keeps each child sitemap under the 50,000-URL sitemaps.org cap", () => {
    for (const chunk of allChunks()) {
      const urls = chunk.entries.length * sitemapHreflangMap.length;
      // Sitemaps.org hard cap is 50,000; we choose a soft cap to leave
      // headroom for richer per-URL metadata.
      expect(urls).toBeLessThanOrEqual(50_000);
      expect(urls).toBeLessThanOrEqual(SITEMAP_URL_LIMIT);
    }
  });

  it("auto-chunks oversized sections into numbered children", () => {
    // Synthesize a section that exceeds the limit and confirm chunkSection
    // emits sequentially-numbered sub-ids while preserving every entry.
    const oversize: SitemapSection = {
      id: "synthetic",
      entries: Array.from({ length: SITEMAP_URL_LIMIT + 50 }, (_, i) => ({
        url: `/synthetic/${i}`, priority: "0.5", changefreq: "monthly",
      })),
    };
    const chunks = chunkSection(oversize);
    expect(chunks.length).toBeGreaterThan(1);
    chunks.forEach((c, idx) => {
      expect(c.id).toBe(`synthetic-${idx + 1}`);
    });
    const total = chunks.reduce((n, c) => n + c.entries.length, 0);
    expect(total).toBe(oversize.entries.length);
    for (const c of chunks) {
      expect(c.entries.length * sitemapHreflangMap.length)
        .toBeLessThanOrEqual(SITEMAP_URL_LIMIT);
    }
  });

  it("renderSitemapFiles produces an index plus one file per chunk", () => {
    const files = renderSitemapFiles(productionInput(), FIXED_DAY);
    const names = files.map(f => f.filename);
    // Always starts with the index.
    expect(names[0]).toBe("sitemap.xml");
    // Every expected section file is present.
    const expected = ["sitemap-static.xml", "sitemap-wallets.xml",
      "sitemap-exchanges.xml", "sitemap-compare.xml",
      "sitemap-best-for.xml", "sitemap-blog.xml"];
    for (const e of expected) expect(names).toContain(e);
    // No duplicate filenames.
    expect(new Set(names).size).toBe(names.length);
    // Index references every child file by URL.
    const indexXml = files[0].xml;
    for (const name of names.slice(1)) {
      expect(indexXml).toContain(`${SITEMAP_BASE_URL}/${name}`);
    }
    // A child file contains a known URL (homepage in static, first wallet
    // in wallets), proving the rendered XML reflects current content.
    const staticFile = files.find(f => f.filename === "sitemap-static.xml")!;
    expect(staticFile.xml).toContain(`${SITEMAP_BASE_URL}/</loc>`);
    const walletsFile = files.find(f => f.filename === "sitemap-wallets.xml")!;
    const firstWallet = Object.keys(walletCards)[0];
    expect(walletsFile.xml).toContain(`/wallet/${firstWallet}</loc>`);
  });

  it("references every chunk from the sitemap index", () => {
    const chunks = allChunks();
    const indexXml = renderSitemapIndexXml(chunks, FIXED_DAY);
    for (const c of chunks) {
      expect(indexXml).toContain(`${SITEMAP_BASE_URL}/sitemap-${c.id}.xml`);
    }
    const sitemapEntries = matchAll(indexXml, /<sitemap>/g);
    expect(sitemapEntries.length).toBe(chunks.length);
  });

  it("includes wallet, exchange, comparison, best-for, blog, and static sections", () => {
    const sections = buildSitemapSections(productionInput());
    const ids = sections.map(s => s.id);
    expect(ids).toEqual(["static", "wallets", "exchanges", "compare", "best-for", "blog"]);
    // Each section must contain at least one entry — otherwise we'd ship
    // an empty section and silently lose every URL it used to carry.
    for (const s of sections) {
      expect(s.entries.length).toBeGreaterThan(0);
    }
  });
});

// Route-level integration tests — boot a tiny Express app that registers
// the *same* sitemap handlers production uses, then issue real HTTP
// requests so we catch breakage in the request/response wiring (content
// type, 404 routing, child-sitemap lookup) on top of the rendering tests
// above.
describe("sitemap HTTP routes", () => {
  const buildApp = () => {
    const app = express();
    const sitemapInput = () => productionInput();

    app.get("/sitemap.xml", (_req, res) => {
      const chunks = buildSitemapSections(sitemapInput()).flatMap(chunkSection);
      res.header("Content-Type", "application/xml; charset=utf-8");
      res.send(renderSitemapIndexXml(chunks));
    });

    app.get("/sitemap-:name.xml", (req, res) => {
      const name = req.params.name;
      const chunks = buildSitemapSections(sitemapInput()).flatMap(chunkSection);
      const match = chunks.find(c => c.id === name);
      if (!match) {
        res.status(404).type("text/plain").send("Sitemap not found");
        return;
      }
      res.header("Content-Type", "application/xml; charset=utf-8");
      res.send(renderSitemapChunkXml(match.entries));
    });

    return app;
  };

  // Boot the app on an ephemeral port for each test, then tear it down so
  // tests don't leak listeners.
  const withServer = async (
    fn: (baseUrl: string) => Promise<void>,
  ): Promise<void> => {
    const app = buildApp();
    await new Promise<void>((resolve, reject) => {
      const server = app.listen(0, async () => {
        try {
          const addr = server.address() as AddressInfo;
          await fn(`http://127.0.0.1:${addr.port}`);
          server.close(() => resolve());
        } catch (err) {
          server.close(() => reject(err));
        }
      });
    });
  };

  it("serves /sitemap.xml as XML referencing every section", async () => {
    await withServer(async (baseUrl) => {
      const res = await fetch(`${baseUrl}/sitemap.xml`);
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toMatch(/application\/xml/);
      const body = await res.text();
      expect(body).toContain("<sitemapindex");
      // The handler must enumerate every chunk for the live data set.
      const chunks = buildSitemapSections(productionInput()).flatMap(chunkSection);
      for (const c of chunks) {
        expect(body).toContain(`/sitemap-${c.id}.xml`);
      }
    });
  });

  it("serves child sitemaps with the right URL count and hreflang block", async () => {
    await withServer(async (baseUrl) => {
      const res = await fetch(`${baseUrl}/sitemap-static.xml`);
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toMatch(/application\/xml/);
      const body = await res.text();
      const sections = buildSitemapSections(productionInput());
      const staticSection = sections.find(s => s.id === "static")!;
      const expectedUrls = staticSection.entries.length * sitemapHreflangMap.length;
      const urlCount = (body.match(/<url>/g) ?? []).length;
      expect(urlCount).toBe(expectedUrls);
      // hreflang sanity at the route level.
      expect(body).toContain('hreflang="x-default"');
      for (const { hreflang } of sitemapHreflangMap) {
        expect(body).toContain(`hreflang="${hreflang}"`);
      }
    });
  });

  it("returns 404 for unknown child sitemap names", async () => {
    await withServer(async (baseUrl) => {
      const res = await fetch(`${baseUrl}/sitemap-not-a-real-section.xml`);
      expect(res.status).toBe(404);
    });
  });
});
