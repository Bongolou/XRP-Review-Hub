import { describe, it, expect } from "vitest";
import { postProcessHtml } from "./prerender";

// These tests cover the deterministic, browser-free portion of the
// prerender pipeline — the post-processing step that turns Playwright's
// captured HTML into a Bluehost-ready static file. The Playwright
// capture itself is covered by the route-enumeration tests + a manual
// `npm run build` run; this guarantees the stripping/rewriting logic
// always behaves the same in CI without needing Chromium.
describe("postProcessHtml", () => {
  const baseUrl = "http://127.0.0.1:45091";

  it("rewrites the localhost origin to the production origin everywhere it appears", () => {
    const html = `<!doctype html><html><head>
<link rel="canonical" href="${baseUrl}/wallet/ledger">
<meta property="og:image" content="${baseUrl}/logos/ledger.png">
<link rel="alternate" hreflang="de" href="${baseUrl}/wallet/ledger?lang=de">
</head><body></body></html>`;
    const out = postProcessHtml(html, "/wallet/ledger", baseUrl);
    expect(out).not.toContain("127.0.0.1");
    expect(out).toContain('href="https://allthingsxrpl.com/wallet/ledger"');
    expect(out).toContain('content="https://allthingsxrpl.com/logos/ledger.png"');
    expect(out).toContain(
      'href="https://allthingsxrpl.com/wallet/ledger?lang=de"',
    );
  });

  it("strips the Vite dev-mode client script if it sneaks into the snapshot", () => {
    const html = `<!doctype html><html><head>
<script type="module" src="${baseUrl}/@vite/client"></script>
<script type="module" src="/assets/index-tHQKllpX.js"></script>
</head><body></body></html>`;
    const out = postProcessHtml(html, "/", baseUrl);
    expect(out).not.toContain("/@vite/client");
    // The hashed app bundle reference must survive — without it, no
    // hydration happens after Apache serves the static file.
    expect(out).toMatch(/\/assets\/index-[A-Za-z0-9_-]+\.js/);
  });

  it("strips the Replit cartographer dev script if present", () => {
    const html = `<html><head>
<script src="${baseUrl}/__replco/static/devtools/eruda/3.2.3/eruda.js"></script>
</head><body></body></html>`;
    const out = postProcessHtml(html, "/", baseUrl);
    expect(out).not.toContain("__replco");
  });

  it("removes the initial-loader spinner so it doesn't flash over real content", () => {
    const html = `<html><body>
<div id="root"><div class="initial-loader" id="initial-loader"></div><h1>Real content</h1></div>
</body></html>`;
    const out = postProcessHtml(html, "/", baseUrl);
    expect(out).not.toContain("initial-loader");
    expect(out).toContain("Real content");
  });

  it("annotates the <html> tag with the route it was prerendered for", () => {
    const html = `<!doctype html><html lang="en"><head></head><body></body></html>`;
    const out = postProcessHtml(html, "/wallet/ledger", baseUrl);
    expect(out).toContain('data-prerendered-route="/wallet/ledger"');
  });

  it("never duplicates the localhost origin into a recursive replacement loop", () => {
    // If the production origin happens to contain the baseUrl as a
    // substring (it doesn't here, but be defensive), the split/join
    // implementation must not produce a runaway string. This is mostly
    // a sanity check that the rewrite is one-pass and idempotent on
    // already-rewritten input.
    const html = `<a href="${baseUrl}/x">x</a>`;
    const onceRewritten = postProcessHtml(html, "/", baseUrl);
    const twiceRewritten = postProcessHtml(onceRewritten, "/", baseUrl);
    expect(twiceRewritten).toBe(onceRewritten);
  });
});
