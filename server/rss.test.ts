// Regression tests for /rss.xml. Exercises the pure renderer plus the
// real route handler (registerRssRoute) so the wiring in routes.ts is
// covered too.
import { describe, it, expect } from "vitest";
import express from "express";
import type { AddressInfo } from "net";
import { blogPosts, type BlogPostMeta } from "@shared/blog";
import {
  renderRssXml,
  resolveRssItemDescription,
  registerRssRoute,
  RSS_BASE_URL,
  RSS_CHANNEL_TITLE,
  RSS_CHANNEL_DESCRIPTION,
} from "./rss";

const FIXED_NOW = new Date("2026-04-29T12:00:00Z");

const matchAll = (xml: string, re: RegExp): string[] => {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  while ((m = r.exec(xml)) !== null) out.push(m[1] ?? m[0]);
  return out;
};

// Catches unclosed tags, mismatched tags, and bare ampersands. Mirrors
// the helper in sitemap.test.ts.
function assertParsesAsXml(xml: string): void {
  expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
  const bareAmp = /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/;
  expect(bareAmp.test(xml)).toBe(false);
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
      expect(top, `mismatched closing </${name}>`).toBe(name);
    } else {
      stack.push(name);
    }
  }
  expect(stack, `unclosed tags: ${stack.join(", ")}`).toEqual([]);
}

describe("RSS feed renderer", () => {
  it("renders a well-formed RSS 2.0 envelope", () => {
    const xml = renderRssXml({ blogPosts, now: FIXED_NOW });
    assertParsesAsXml(xml);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
    expect(xml).toContain(`<title>${RSS_CHANNEL_TITLE}</title>`);
    expect(xml).toContain(`<description>${RSS_CHANNEL_DESCRIPTION}</description>`);
    expect(xml).toContain(
      `<atom:link href="${RSS_BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>`,
    );
    expect(xml).toContain(`<lastBuildDate>${FIXED_NOW.toUTCString()}</lastBuildDate>`);
  });

  it("emits exactly one <item> per blog post and references every post", () => {
    const xml = renderRssXml({ blogPosts, now: FIXED_NOW });
    expect(matchAll(xml, /<item>/g).length).toBe(blogPosts.length);
    for (const post of blogPosts) {
      const link = `${RSS_BASE_URL}/blog/${post.id}`;
      expect(xml).toContain(`<link>${link}</link>`);
      expect(xml).toContain(`<guid>${link}</guid>`);
      expect(xml).toContain(`<pubDate>${new Date(post.dateIso).toUTCString()}</pubDate>`);
    }
  });

  it("emits one non-empty, XML-clean <description> per item", () => {
    const xml = renderRssXml({ blogPosts, now: FIXED_NOW });
    const blocks = xml.split("<item>").slice(1).map((b) => b.split("</item>")[0]);
    expect(blocks.length).toBe(blogPosts.length);
    for (let i = 0; i < blocks.length; i++) {
      const m = blocks[i].match(/<description>([\s\S]*?)<\/description>/);
      expect(m, `item ${blogPosts[i].id} missing <description>`).not.toBeNull();
      const desc = m![1];
      expect(desc.trim().length).toBeGreaterThan(0);
      const bareAmp = /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/;
      expect(bareAmp.test(desc)).toBe(false);
      expect(desc.includes("<")).toBe(false);
      expect(desc.includes(">")).toBe(false);
    }
  });

  it("escapes XML special characters in titles, categories, and descriptions", () => {
    const fixtures: BlogPostMeta[] = [
      {
        id: 9001,
        title: "AT&T <em>buys</em> Ripple? \"Speculation\" & 'rumour'",
        category: "News & Rumours",
        date: "Apr 1, 2026",
        dateIso: "2026-04-01",
        titleKey: "x", excerptKey: "x", categoryKey: "x",
        categoryLabelKey: "x", readTimeKey: "x",
        readTime: "1 min", author: "T", authorRole: "QA", image: "",
      },
      {
        id: 9002,
        title: "<script>alert('xss')</script>",
        category: "<bad>",
        date: "Apr 2, 2026",
        dateIso: "2026-04-02",
        titleKey: "x", excerptKey: "x", categoryKey: "x",
        categoryLabelKey: "x", readTimeKey: "x",
        readTime: "1 min", author: "T", authorRole: "QA", image: "",
      },
    ];

    const xml = renderRssXml({ blogPosts: fixtures, now: FIXED_NOW });
    assertParsesAsXml(xml);
    expect(xml).not.toContain("<script>");
    expect(xml).not.toContain("AT&T");
    expect(xml).toContain("AT&amp;T &lt;em&gt;buys&lt;/em&gt; Ripple?");
    expect(xml).toContain("&quot;Speculation&quot;");
    expect(xml).toContain("&apos;rumour&apos;");
    expect(xml).toContain("News &amp; Rumours");
    expect(xml).toContain("&lt;script&gt;alert(&apos;xss&apos;)&lt;/script&gt;");
    expect(xml).toContain("<category>&lt;bad&gt;</category>");
  });

  it("escapes hostile characters in fallback descriptions", () => {
    // resolveRssItemDescription falls back to "<title> — read this XRPL
    // guide…" when no excerpt is wired up. A hostile title must still
    // produce valid XML inside <description>.
    const fixture: BlogPostMeta = {
      ...blogPosts[0],
      id: 9100,
      excerptKey: "this.key.does.not.exist.in.translations",
      title: "AT&T <em>buys</em> \"Ripple\" & more",
    };
    expect(resolveRssItemDescription(fixture)).toContain("AT&T");
    const xml = renderRssXml({ blogPosts: [fixture], now: FIXED_NOW });
    assertParsesAsXml(xml);
    expect(xml).toContain(
      "<description>AT&amp;T &lt;em&gt;buys&lt;/em&gt; &quot;Ripple&quot; &amp; more — read this XRPL guide on All Things XRPL.</description>",
    );
  });

  it("escapes ampersands in link/guid when the base URL carries query params", () => {
    const xml = renderRssXml({
      blogPosts: [blogPosts[0]],
      baseUrl: "https://example.com/feeds?utm=rss&trk=site",
      now: FIXED_NOW,
    });
    assertParsesAsXml(xml);
    expect(xml).toContain("utm=rss&amp;trk=site");
    expect(xml).not.toMatch(/utm=rss&trk/);
  });

  it("uses the supplied lastBuildDate so the channel envelope is deterministic", () => {
    const xml1 = renderRssXml({ blogPosts, now: new Date("2026-01-01T00:00:00Z") });
    const xml2 = renderRssXml({ blogPosts, now: new Date("2026-12-31T23:59:59Z") });
    expect(xml1).toContain(
      `<lastBuildDate>${new Date("2026-01-01T00:00:00Z").toUTCString()}</lastBuildDate>`,
    );
    expect(xml2).toContain(
      `<lastBuildDate>${new Date("2026-12-31T23:59:59Z").toUTCString()}</lastBuildDate>`,
    );
  });
});

describe("RSS HTTP route (registerRssRoute)", () => {
  // Boots the *exact* handler routes.ts uses (registerRssRoute is the
  // single source of truth). Catches regressions in content type and
  // payload shape on top of the renderer tests above.
  const withServer = async (
    fn: (baseUrl: string) => Promise<void>,
  ): Promise<void> => {
    const app = express();
    registerRssRoute(app, blogPosts);
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

  it("serves /rss.xml as application/rss+xml referencing every post", async () => {
    await withServer(async (baseUrl) => {
      const res = await fetch(`${baseUrl}/rss.xml`);
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toMatch(/application\/rss\+xml/);
      const body = await res.text();
      assertParsesAsXml(body);
      expect(body).toContain("<rss");
      for (const post of blogPosts) {
        expect(body).toContain(`/blog/${post.id}`);
      }
    });
  });
});
