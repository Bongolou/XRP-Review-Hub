// Build-time prerenderer: snapshots every public route to static HTML so
// Bluehost (which only serves static files) ships fully-populated pages
// to Googlebot. React still hydrates on top of the prerendered HTML at
// runtime, so client-side behavior (routing, language switching, modals,
// affiliate-link rewriting) is unchanged.
//
// Each route is snapshotted once per supported language. The English
// snapshot lands at `<route>/index.html` (the bare DirectoryIndex Apache
// serves by default); each non-English snapshot lands at
// `<route>/index.<lang>.html`, which the .htaccess rewrites map to
// `?lang=<lang>` request URLs. That way Google can index the German /
// Spanish / etc. versions of every page independently with their own
// translated <title>/<meta>/canonical, while the URL the visitor sees
// stays the existing `?lang=de` shape (which the SPA already understands
// for language switching, share links, and hreflang annotations).
//
// The actual rendering is done by a real headless browser (Chromium via
// Playwright) so the SPA's browser-only APIs (window, localStorage,
// navigator, useDocumentMeta DOM mutations) all behave exactly like they
// do in production. Trying to renderToString from Node would land us in
// dependency hell.
import { spawnSync } from "child_process";
import { createServer, type Server } from "http";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import sirv from "sirv";
import { chromium, type Browser } from "playwright";
import {
  enumeratePrerenderJobs,
  jobToFilePath,
  type PrerenderJob,
  type PrerenderLang,
} from "./prerenderRoutes";

const PRERENDER_TIMEOUT_MS = 20_000;
const PRERENDER_READY_SELECTOR = 'meta[name="prerender-ready"][content="true"]';
// Production origin baked into prerendered canonical/og/twitter URLs.
// Override per-environment with PRERENDER_PROD_ORIGIN if needed (e.g. a
// staging deploy at a different domain).
const PROD_ORIGIN =
  process.env.PRERENDER_PROD_ORIGIN || "https://allthingsxrpl.com";

// Resolve the chromium executable. Order of preference:
//   1. PLAYWRIGHT_CHROMIUM_PATH env var (explicit override)
//   2. `chromium` discoverable on PATH (the Nix-provided system
//      chromium installed in the Replit dev container — Playwright's
//      bundled binary on Replit is missing several glibc/X11 libs and
//      crashes with exit 127, but the system chromium has every shared
//      library it needs)
//   3. Fall back to Playwright's bundled chromium (this is what runs in
//      GitHub Actions, where `npx playwright install --with-deps
//      chromium` provisions both the binary and its system deps)
function resolveChromiumPath(): string | undefined {
  const envPath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
  if (envPath && envPath.trim()) {
    console.log(`  chromium: using PLAYWRIGHT_CHROMIUM_PATH=${envPath.trim()}`);
    return envPath.trim();
  }
  // `which` exits 0 and prints the absolute path if found, non-zero
  // otherwise. Use spawnSync to avoid pulling in shell semantics. ESM-
  // safe: spawnSync is imported at module top.
  try {
    const r = spawnSync("which", ["chromium"], { encoding: "utf-8" });
    if (r.status === 0) {
      const found = r.stdout.trim();
      if (found) {
        console.log(`  chromium: detected on PATH at ${found}`);
        return found;
      }
    }
  } catch {
    // ignore — fall through to bundled
  }
  console.log("  chromium: falling back to Playwright's bundled binary");
  return undefined;
}

// Boot a tiny static server that serves dist/public/ assets and falls
// back to the *original* SPA shell (passed in as `shellHtml`) for every
// unknown path — including `/`. We deliberately don't use sirv's
// `single: true` because we'll be writing prerendered HTML files to
// disk on the same routes (e.g. `/wallet/ledger/index.html`), and we
// want every snapshot to start from the same untouched SPA shell so the
// React router renders the right route regardless of whether a
// prerendered file already exists.
function startStaticServer(
  distPublicDir: string,
  shellHtml: string,
): Promise<{ server: Server; port: number }> {
  const handler = sirv(distPublicDir, { single: false, dev: false, etag: false });
  const server = createServer((req, res) => {
    handler(req, res, () => {
      res.statusCode = 200;
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.end(shellHtml);
    });
  });
  return new Promise((resolveFn, rejectFn) => {
    server.on("error", rejectFn);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (typeof addr === "object" && addr) resolveFn({ server, port: addr.port });
      else rejectFn(new Error("static server failed to bind"));
    });
  });
}

// Strip the Vite/Replit dev-mode runtime banner if present (it embeds a
// websocket script that's not appropriate for a static deploy). The
// production Vite build already omits it, but this is a defensive net.
export function postProcessHtml(html: string, route: string, baseUrl: string): string {
  let out = html;
  // Rewrite the localhost origin baked into canonical/og/twitter URLs
  // by useDocumentMeta and ogImage helpers (which read
  // window.location.origin at render time) to the real production
  // origin Bluehost serves from. Without this, Google would index
  // canonical URLs pointing at 127.0.0.1.
  out = out.split(baseUrl).join(PROD_ORIGIN);
  out = out.replace(
    /<script[^>]*src="[^"]*@vite\/client[^"]*"[^>]*><\/script>/g,
    "",
  );
  out = out.replace(
    /<script[^>]*src="[^"]*\/__replco[^"]*"[^>]*><\/script>/g,
    "",
  );
  // Drop the initial-loader spinner — it's only needed before React
  // hydrates, but the prerendered HTML already shows the real content.
  // Leaving it in would briefly flash a spinner over the prerendered
  // page on first paint.
  out = out.replace(
    /<div class="initial-loader" id="initial-loader"><\/div>\s*/g,
    "",
  );
  // Flag the served HTML so the client can tell it's hydrating on top
  // of a prerendered shell (useful for debugging and future cache
  // invalidation), and so we always know which route a file came from.
  out = out.replace(
    /<html\s+([^>]*)>/i,
    `<html $1 data-prerendered-route="${route}">`,
  );
  return out;
}

// Build the snapshot URL for a (route, lang) pair. English uses the
// bare path so the SPA renders in its default language; non-English
// appends `?lang=<lang>` so LanguageContext picks up the chosen
// language at first render and useDocumentMeta emits the translated
// title/description/canonical.
function jobUrl(baseUrl: string, job: PrerenderJob): string {
  if (job.lang === "en") return `${baseUrl}${job.route}`;
  const sep = job.route.includes("?") ? "&" : "?";
  return `${baseUrl}${job.route}${sep}lang=${job.lang}`;
}

async function snapshotJob(
  browser: Browser,
  baseUrl: string,
  job: PrerenderJob,
): Promise<string> {
  // Use a fresh browser context per snapshot so localStorage from one
  // job (e.g. the German `allthingsxrpl_language=de` value the SPA
  // writes on first render) can never leak into a later job that
  // happens to share the same browser. Without isolation, snapshot
  // ordering would silently change which language each page rendered
  // in.
  const context = await browser.newContext();
  const page = await context.newPage();
  // Intercept /api/* requests — they 404 in the prerender environment
  // (the static server doesn't proxy to Express), and React Query's
  // default retry behavior would slow the snapshot down. Returning a
  // shaped empty response per known endpoint keeps each page rendering
  // its real shell quickly. Pages are responsible for handling empty
  // data states (they already do, since /api/news and /api/reviews can
  // realistically return zero items in production too).
  // Single catch-all handler (Playwright runs handlers in reverse
  // registration order and short-circuits on the first one that
  // resolves the request, so combining everything here avoids ordering
  // surprises).
  await page.route("**/*", (intercepted) => {
    const url = intercepted.request().url();
    // Stub /api/* so React Query resolves immediately with an empty
    // shape — every page already handles empty data states because
    // these endpoints can realistically be empty in production too.
    if (/\/api\//.test(url)) {
      intercepted.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [], reviews: [] }),
      });
      return;
    }
    // Block analytics/ads scripts — they slow down the snapshot and
    // would bake consent-banner state into the captured HTML. They
    // re-load normally in production from the index.html script tags.
    if (
      /googletagmanager|google-analytics|googlesyndication|ezojs|gatekeeperconsent|doubleclick/i
        .test(url)
    ) {
      intercepted.abort();
      return;
    }
    intercepted.continue();
  });

  try {
    await page.goto(jobUrl(baseUrl, job), {
      waitUntil: "domcontentloaded",
      timeout: PRERENDER_TIMEOUT_MS,
    });
    // Wait for the SPA to render the page and call useDocumentMeta,
    // which sets <meta name="prerender-ready" content="true">. Wrap
    // the timeout in a clearer error so a failure points at exactly
    // which route is broken (instead of a generic Playwright timeout).
    try {
      await page.waitForSelector(PRERENDER_READY_SELECTOR, {
        timeout: PRERENDER_TIMEOUT_MS,
        state: "attached",
      });
    } catch (err) {
      throw new Error(
        `prerender-ready signal never appeared for route ${job.route} ` +
          `(lang=${job.lang}, ${PRERENDER_TIMEOUT_MS}ms). ` +
          `Does the page call useDocumentMeta()?`,
        { cause: err as Error },
      );
    }
    const html = await page.content();
    return postProcessHtml(html, job.route, baseUrl);
  } finally {
    await page.close();
    await context.close();
  }
}

export async function prerenderAll(
  distPublicDir: string,
  jobs: PrerenderJob[] = enumeratePrerenderJobs(),
): Promise<string[]> {
  const shellHtml = await readFile(join(distPublicDir, "index.html"), "utf-8");
  const { server, port } = await startStaticServer(distPublicDir, shellHtml);
  const baseUrl = `http://127.0.0.1:${port}`;
  let browser: Browser | undefined;
  try {
    browser = await chromium.launch({
      executablePath: resolveChromiumPath(),
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
    // Snapshot every job into memory first; only after all snapshots
    // finish do we write to disk. This guarantees every page is
    // rendered against the same untouched SPA shell — if we wrote
    // /wallet/ledger/index.html mid-loop, a later route that
    // accidentally requested /wallet/ledger as a sub-resource would
    // pick up the already-prerendered HTML and the snapshot would be
    // wrong.
    const snapshots: Array<{ job: PrerenderJob; html: string }> = [];
    // Run a small worker pool — Playwright handles multiple pages
    // sharing one browser cheaply, and the per-page work is mostly
    // wait-on-React-render, not CPU. 4 parallel pages cuts wall-clock
    // time roughly 4x without hitting memory limits in CI.
    const CONCURRENCY = 4;
    let cursor = 0;
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (true) {
        const idx = cursor++;
        if (idx >= jobs.length) return;
        const job = jobs[idx];
        const html = await snapshotJob(browser!, baseUrl, job);
        snapshots.push({ job, html });
        console.log(
          `  snapshot ${job.route} [${job.lang}] (${html.length} bytes)`,
        );
      }
    });
    await Promise.all(workers);
    const written: string[] = [];
    for (const { job, html } of snapshots) {
      const target = join(distPublicDir, jobToFilePath(job));
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, html, "utf-8");
      written.push(target);
    }
    return written;
  } finally {
    if (browser) await browser.close();
    await new Promise<void>((res) => server.close(() => res()));
  }
}

// Allow the script to be invoked directly (`tsx script/prerender.ts`) for
// debugging, in addition to being imported by script/build.ts.
const isDirectInvocation = process.argv[1] && process.argv[1].endsWith("prerender.ts");
if (isDirectInvocation) {
  const dir = resolve("dist/public");
  prerenderAll(dir)
    .then((files) => console.log(`prerendered ${files.length} files`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

// Re-export for callers/tests that want the type without depending on
// prerenderRoutes directly.
export type { PrerenderJob, PrerenderLang };
