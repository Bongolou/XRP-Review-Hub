import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import {
  enumeratePrerenderRoutes,
  routeToFilePath,
  PRERENDER_STATIC_ROUTES,
} from "./prerenderRoutes";
import { buildSitemapSections } from "../server/sitemap";

describe("prerender route enumeration", () => {
  const routes = enumeratePrerenderRoutes();

  it("includes the home page as the first static route", () => {
    expect(routes[0]).toBe("/");
  });

  it("includes every static SPA page", () => {
    for (const r of PRERENDER_STATIC_ROUTES) {
      expect(routes).toContain(r);
    }
  });

  it("never enumerates the admin route (would be indexed by Google)", () => {
    expect(routes).not.toContain("/admin/reviews");
    expect(routes.find((r) => r.startsWith("/admin"))).toBeUndefined();
  });

  it("includes wallet, exchange, compare, best-for and blog routes", () => {
    expect(routes.some((r) => r.startsWith("/wallet/"))).toBe(true);
    expect(routes.some((r) => r.startsWith("/exchange/"))).toBe(true);
    expect(routes.some((r) => r.startsWith("/compare/"))).toBe(true);
    expect(routes.some((r) => r.startsWith("/best-for/"))).toBe(true);
    expect(routes.some((r) => r.startsWith("/blog/"))).toBe(true);
  });

  it("produces unique routes", () => {
    expect(new Set(routes).size).toBe(routes.length);
  });

  // Guard against drift: every static page in the sitemap must also be
  // prerendered, otherwise Google would discover a URL via sitemap.xml
  // that isn't backed by a static HTML file. (Dynamic routes are
  // generated from the same shared data, so they can't drift.)
  it("includes every static page that the sitemap advertises", () => {
    const sections = buildSitemapSections({
      walletSlugs: [],
      exchangeSlugs: [],
      compareSlugs: [],
      bestForSlugs: [],
      blogPosts: [],
    });
    const staticSection = sections.find((s) => s.id === "static");
    expect(staticSection).toBeDefined();
    const sitemapStatic = staticSection!.entries.map((e) => e.url);
    for (const url of sitemapStatic) {
      expect(PRERENDER_STATIC_ROUTES).toContain(url);
    }
  });
});

describe("routeToFilePath", () => {
  it("maps / to index.html", () => {
    expect(routeToFilePath("/")).toBe("index.html");
  });
  it("maps nested routes to <route>/index.html", () => {
    expect(routeToFilePath("/wallet/ledger")).toBe("wallet/ledger/index.html");
    expect(routeToFilePath("/blog/1")).toBe("blog/1/index.html");
  });
});

// When a build has been run locally (dist/public/ exists), assert that
// the prerender output is structurally what Google needs: real <title>
// in the HTML, the production canonical URL baked in, no localhost
// leakage, and a reference to the hashed JS bundle so React still
// hydrates after Apache serves the static file.
describe("prerendered HTML output (only runs after a local build)", () => {
  const distPublic = join(process.cwd(), "dist", "public");
  const ledgerHtmlPath = join(distPublic, "wallet", "ledger", "index.html");
  const hasBuild = existsSync(ledgerHtmlPath);

  it.skipIf(!hasBuild)("bakes the wallet/ledger title and canonical into static HTML", () => {
    const html = readFileSync(ledgerHtmlPath, "utf-8");
    expect(html).toMatch(/<title>[^<]*Ledger[^<]*<\/title>/);
    expect(html).toContain(
      '<link rel="canonical" href="https://allthingsxrpl.com/wallet/ledger"',
    );
    expect(html).not.toContain("127.0.0.1");
    expect(html).toMatch(/\/assets\/index-[A-Za-z0-9_-]+\.js/);
  });
});
