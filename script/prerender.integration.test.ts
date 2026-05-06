import { describe, it, expect, beforeAll } from "vitest";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { spawnSync } from "child_process";
import { prerenderAll } from "./prerender";

// End-to-end integration test: build a minimal SPA fixture in a temp
// dir, run the real prerender pipeline (Playwright + sirv + post-
// processing) against it, and assert that route-specific HTML files
// land on disk with the expected content. This guarantees CI catches
// regressions in the actual rendering pipeline — not just the
// deterministic helpers.
//
// Skips only when neither a system `chromium` binary nor the
// PLAYWRIGHT_CHROMIUM_PATH env var is available; in CI the workflow
// installs Playwright's bundled chromium before running tests, in
// Replit dev the Nix `chromium` is on PATH.

function chromiumAvailable(): boolean {
  if (process.env.PLAYWRIGHT_CHROMIUM_PATH) return true;
  const r = spawnSync("which", ["chromium"], { encoding: "utf-8" });
  return r.status === 0 && !!r.stdout.trim();
}

const FIXTURE_SHELL = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Fixture Shell</title>
<script>
  // Tiny "router" that mimics what the real SPA does: when the page
  // loads, look at window.location.pathname, write a route-specific
  // <h1> + <title> + <link rel=canonical>, then drop the
  // prerender-ready meta so the snapshotter knows to capture.
  window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    document.title = "Route " + path;
    const root = document.getElementById("root");
    root.innerHTML = "<h1>" + path + " content</h1>";
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = window.location.origin + path;
    document.head.appendChild(canonical);
    const ready = document.createElement("meta");
    ready.name = "prerender-ready";
    ready.content = "true";
    document.head.appendChild(ready);
  });
</script>
</head>
<body>
<div class="initial-loader" id="initial-loader"></div>
<div id="root"></div>
<script type="module" src="/assets/index-FIXTURE.js"></script>
</body>
</html>`;

describe.skipIf(!chromiumAvailable())("prerender integration", () => {
  let distDir: string;

  beforeAll(async () => {
    distDir = await mkdtemp(join(tmpdir(), "prerender-fixture-"));
    await mkdir(join(distDir, "assets"), { recursive: true });
    await writeFile(join(distDir, "index.html"), FIXTURE_SHELL, "utf-8");
    // Empty bundle file so the shell's <script src> doesn't 404 (404s
    // would still let the page render but pollute the test logs).
    await writeFile(
      join(distDir, "assets", "index-FIXTURE.js"),
      "// fixture bundle\n",
      "utf-8",
    );
  }, 30_000);

  it("renders multiple routes into per-route index.html files with route-specific content", async () => {
    const routes = ["/wallet/ledger", "/exchange/kraken", "/blog/1"];
    const written = await prerenderAll(distDir, routes);
    expect(written).toHaveLength(routes.length);

    for (const route of routes) {
      const file = join(distDir, route.slice(1), "index.html");
      const html = await readFile(file, "utf-8");

      // Route-specific content the fixture's "router" injected
      expect(html).toContain(`${route} content`);
      expect(html).toContain(`<title>Route ${route}</title>`);

      // Post-processing must have rewritten the localhost canonical
      // to the production origin
      expect(html).toContain(`href="https://allthingsxrpl.com${route}"`);
      expect(html).not.toContain("127.0.0.1");

      // Initial-loader removed, prerendered-route annotation added,
      // bundle script preserved so hydration still works in production
      expect(html).not.toContain("initial-loader");
      expect(html).toContain(`data-prerendered-route="${route}"`);
      expect(html).toContain("/assets/index-FIXTURE.js");
    }

    await rm(distDir, { recursive: true, force: true });
  }, 60_000);
});
