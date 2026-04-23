#!/usr/bin/env node
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SOURCE_FILES = [
  "client/src/pages/Home.tsx",
  "client/src/pages/reviews/ExchangeReview.tsx",
  "client/src/pages/reviews/WalletReview.tsx",
  "client/src/components/SocialLinks.tsx",
];

const KEY_PATTERN =
  /(?:affiliateUrl|affiliateLink|url|link)\s*:\s*["'`](https?:\/\/[^"'`\s]+)["'`]/g;

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

async function collectUrls() {
  const map = new Map();
  for (const rel of SOURCE_FILES) {
    const full = path.join(root, rel);
    let body;
    try {
      body = await readFile(full, "utf8");
    } catch {
      console.warn(`! Skipping missing file: ${rel}`);
      continue;
    }
    for (const match of body.matchAll(KEY_PATTERN)) {
      const url = match[1];
      if (!/^https?:\/\//.test(url)) continue;
      if (url.includes("images.unsplash.com")) continue;
      if (!map.has(url)) map.set(url, new Set());
      map.get(url).add(rel);
    }
  }
  return [...map.entries()].map(([url, files]) => ({
    url,
    files: [...files],
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
