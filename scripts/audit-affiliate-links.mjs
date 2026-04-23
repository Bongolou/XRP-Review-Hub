#!/usr/bin/env node
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Scan both client-side code and the server-rendered surfaces (route handlers,
// sitemap/RSS generators, social-meta resolver) plus shared data files like the
// blog index. This way the weekly audit covers every place we can ship a URL to
// a visitor, not just the React tree.
const SCAN_ROOTS = ["client/src", "server", "shared"];
const SOURCE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
]);

// Extra individual files to scan even though they live outside SCAN_ROOTS or
// use non-source extensions. These are static assets we still ship to
// visitors/search engines and that can embed outbound URLs (e.g. the static
// fallback sitemap, robots files, raw HTML entry points).
const EXTRA_FILES = [
  "sitemap.xml",
  "robots.txt",
  "index.html",
  "client/index.html",
  "client/public/robots.txt",
];

const URL_PATTERN = /https?:\/\/[^\s"'`<>)]+/g;

const SKIP_URL_SUBSTRINGS = [
  "images.unsplash.com",
  "schema.org",
  "localhost",
  "127.0.0.1",
  // Backend/API endpoints that the app calls programmatically — not
  // visitor-clickable outbound links, and they intentionally 4xx on a bare
  // GET/HEAD.
  "api.coingecko.com",
  "api.rss2json.com",
  "formspree.io",
  "news.google.com/rss",
  "cointelegraph.com/rss",
  "cryptoslate.com/feed",
  // XML/spec namespace URIs that show up in server-rendered SVG, sitemap and
  // RSS output. They are identifiers, not visitor-clickable links, and several
  // of them either 404 or have no canonical landing page.
  "www.w3.org/",
  "www.sitemaps.org/",
  "www.google.com/schemas/",
  // `new URL(path, "http://x")` is a parsing helper inside socialMeta — not a
  // real outbound link.
  "http://x",
];

const BOT_BLOCK_HOSTS = new Set([
  "tangem.com",
  "www.tangem.com",
  "uphold.com",
  "www.uphold.com",
  "coinbase.com",
  "www.coinbase.com",
]);

const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;
const MAX_REDIRECT_HOPS = 5;
const USER_AGENT =
  "Mozilla/5.0 (compatible; AllThingsXRPL-LinkAudit/1.0; +https://allthingsxrpl.com)";

async function walkSources(dir, acc) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkSources(full, acc);
    } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      acc.push(full);
    }
  }
  return acc;
}

function cleanUrl(raw) {
  // Strip trailing punctuation that the regex may have captured.
  let url = raw.replace(/[),.;:!?]+$/, "");
  // Skip URLs that contain template-literal interpolation — they are dynamic
  // and not a real, checkable URL.
  if (url.includes("${")) return null;
  for (const skip of SKIP_URL_SUBSTRINGS) {
    if (url.includes(skip)) return null;
  }
  return url;
}

async function collectUrls() {
  const files = [];
  for (const rel of SCAN_ROOTS) {
    await walkSources(path.join(root, rel), files);
  }
  for (const rel of EXTRA_FILES) {
    files.push(path.join(root, rel));
  }
  files.sort();

  const map = new Map();
  for (const full of files) {
    const rel = path.relative(root, full);
    let body;
    try {
      body = await readFile(full, "utf8");
    } catch {
      console.warn(`! Skipping unreadable file: ${rel}`);
      continue;
    }
    for (const match of body.matchAll(URL_PATTERN)) {
      const url = cleanUrl(match[0]);
      if (!url) continue;
      if (!map.has(url)) map.set(url, new Set());
      map.get(url).add(rel);
    }
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, files]) => ({
      url,
      files: [...files].sort(),
    }));
}

function buildHeaders() {
  return {
    "user-agent": USER_AGENT,
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "accept-language": "en-US,en;q=0.9",
  };
}

async function fetchOnce(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method,
      redirect: "manual",
      headers: buildHeaders(),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function probe(url, method) {
  const chain = [];
  let current = url;
  for (let hop = 0; hop <= MAX_REDIRECT_HOPS; hop++) {
    const res = await fetchOnce(current, method);
    chain.push({ url: current, status: res.status });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) {
        return { chain, finalStatus: res.status, finalUrl: current };
      }
      const next = new URL(loc, current).toString();
      if (hop === MAX_REDIRECT_HOPS) {
        return { chain, finalStatus: res.status, finalUrl: next, tooManyRedirects: true };
      }
      current = next;
      continue;
    }
    return { chain, finalStatus: res.status, finalUrl: current };
  }
  return { chain, finalStatus: 0, finalUrl: current };
}

async function checkUrl(url) {
  try {
    let result = await probe(url, "HEAD");
    const last = result.chain[result.chain.length - 1];
    const headFailed =
      last.status === 405 || last.status === 403 || last.status === 0 || last.status >= 500;
    if (headFailed) {
      try {
        const getResult = await probe(url, "GET");
        result = getResult;
      } catch {
        // keep HEAD result
      }
    }
    return result;
  } catch (err) {
    return { chain: [], finalStatus: 0, finalUrl: url, error: err?.message ?? String(err) };
  }
}

function hostOf(u) {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
}

function classify(entry) {
  const { url, finalStatus, finalUrl, chain, tooManyRedirects, error } = entry;
  if (error || finalStatus === 0) return "broken";
  if (tooManyRedirects) return "broken";

  const redirected = chain.length > 1 || (finalUrl && finalUrl !== url);

  if (finalStatus >= 200 && finalStatus < 300) {
    return redirected ? "redirected" : "ok";
  }
  if (finalStatus === 403 && BOT_BLOCK_HOSTS.has(hostOf(finalUrl || url))) {
    return "ignored";
  }
  return "broken";
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

function reasonFor(r) {
  if (r.error) return `network: ${r.error}`;
  if (r.tooManyRedirects) return `too many redirects (>${MAX_REDIRECT_HOPS})`;
  return `HTTP ${r.finalStatus}`;
}

function chainSummary(r) {
  if (!r.chain || r.chain.length <= 1) return "";
  const hops = r.chain.map((h) => `${h.status} ${h.url}`).join("\n      -> ");
  return `\n      hops: ${hops}`;
}

function formatReport(results) {
  const ok = results.filter((r) => r.kind === "ok");
  const redirected = results.filter((r) => r.kind === "redirected");
  const ignored = results.filter((r) => r.kind === "ignored");
  const broken = results.filter((r) => r.kind === "broken");

  const lines = [];
  lines.push(`Affiliate Link Audit — ${new Date().toISOString()}`);
  lines.push("=".repeat(64));
  lines.push(`Scanned roots: ${SCAN_ROOTS.join(", ")}`);
  lines.push(`Total checked: ${results.length}`);
  lines.push(`OK (200, no redirect):     ${ok.length}`);
  lines.push(`Redirected (3xx -> 2xx):   ${redirected.length}`);
  lines.push(`Broken / non-2xx:          ${broken.length}`);
  lines.push(`Ignored (known bot block): ${ignored.length}`);
  lines.push("");

  if (broken.length) {
    lines.push("BROKEN / NEEDS ATTENTION (non-2xx, network errors)");
    lines.push("-".repeat(64));
    for (const r of broken) {
      lines.push(`[${reasonFor(r)}] ${r.url}${chainSummary(r)}`);
      for (const f of r.files) lines.push(`    in ${f}`);
    }
    lines.push("");
  }

  if (redirected.length) {
    lines.push("REDIRECTED (lands on 2xx after a 3xx — verify destination)");
    lines.push("-".repeat(64));
    for (const r of redirected) {
      lines.push(`[${r.finalStatus}] ${r.url}`);
      lines.push(`    -> ${r.finalUrl}`);
      for (const f of r.files) lines.push(`    in ${f}`);
    }
    lines.push("");
  }

  if (ignored.length) {
    lines.push("IGNORED (known anti-bot 403)");
    lines.push("-".repeat(64));
    for (const r of ignored) lines.push(`[${r.finalStatus}] ${r.url}`);
    lines.push("");
  }

  lines.push("OK");
  lines.push("-".repeat(64));
  for (const r of ok) lines.push(`[${r.finalStatus}] ${r.url}`);
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const entries = await collectUrls();
  console.log(`Found ${entries.length} unique outbound URLs. Checking…`);

  const checked = await runPool(
    entries,
    async ({ url, files }) => {
      const probed = await checkUrl(url);
      const partial = { url, files, ...probed };
      partial.kind = classify(partial);
      const tag =
        partial.kind === "ok"
          ? "OK "
          : partial.kind === "redirected"
            ? ">> "
            : partial.kind === "ignored"
              ? "-- "
              : "!! ";
      console.log(`${tag}${probed.finalStatus || "ERR"}  ${url}`);
      return partial;
    },
    CONCURRENCY,
  );

  const report = formatReport(checked);
  const outDir = path.join(root, "reports");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "affiliate-link-audit.txt");
  await writeFile(outPath, report, "utf8");
  console.log(`\nReport written to ${path.relative(root, outPath)}`);

  const broken = checked.filter((r) => r.kind === "broken").length;
  if (broken > 0) {
    console.error(`\n${broken} broken link(s) found. See report.`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(2);
});
