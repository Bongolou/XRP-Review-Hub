#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = { apply: false, report: "reports/affiliate-link-audit.txt" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--apply") args.apply = true;
    else if (a === "--report") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) {
        console.error("--report requires a path argument");
        process.exit(2);
      }
      args.report = value;
    } else if (a.startsWith("--report=")) {
      const value = a.slice("--report=".length);
      if (!value) {
        console.error("--report requires a path argument");
        process.exit(2);
      }
      args.report = value;
    } else if (a === "-h" || a === "--help") args.help = true;
    else {
      console.error(`Unknown argument: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/canonicalize-affiliate-links.mjs [options]

Reads a fresh affiliate-link audit report and rewrites source files so trivially
canonicalized outbound URLs (e.g. bare host -> www. host) point at the URL the
live site already redirects to. Non-trivial redirects (locale paths, geo
redirects, content moves, subdomain swaps) are reported but never auto-applied;
they need a human to decide.

Options:
  --report <path>   Path to the audit report. Default: reports/affiliate-link-audit.txt
  --apply           Actually rewrite the source files. Without this, runs as a dry run.
  -h, --help        Show this help.
`);
}

// Parse the REDIRECTED section of an affiliate-link-audit.txt report into a
// list of { from, to, files } entries. The audit script writes blocks like:
//
//   [200] https://kraken.com/sign-up?r=allthingsxrpl
//       -> https://www.kraken.com/sign-up?r=allthingsxrpl
//       in client/src/pages/Compare.tsx
//       in client/src/pages/Home.tsx
//
// Only the REDIRECTED section is parsed — brand-change and broken sections are
// intentionally ignored because those are never trivial canonicalizations.
function parseRedirectedSection(report) {
  const lines = report.split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith("REDIRECTED "));
  if (startIdx === -1) return [];
  const entries = [];
  let current = null;
  for (let i = startIdx + 2; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("IGNORED ") || line.startsWith("OK") || line.startsWith("BROKEN ") || line.startsWith("BRAND-CHANGE ")) {
      break;
    }
    const fromMatch = line.match(/^\[\d+\]\s+(\S+)\s*$/);
    if (fromMatch) {
      if (current) entries.push(current);
      current = { from: fromMatch[1], to: null, files: [] };
      continue;
    }
    const toMatch = line.match(/^\s+->\s+(\S+)\s*$/);
    if (toMatch && current) {
      current.to = toMatch[1];
      continue;
    }
    const inMatch = line.match(/^\s+in\s+(.+?)\s*$/);
    if (inMatch && current) {
      current.files.push(inMatch[1]);
    }
  }
  if (current) entries.push(current);
  return entries.filter((e) => e.to && e.files.length > 0);
}

// Decide whether the redirect from `originalUrl` to `finalUrl` is a trivial
// host canonicalization that we can apply without human review. The only
// difference must be adding or removing a leading `www.` on the hostname —
// path, query, hash and protocol must all match exactly. This intentionally
// excludes locale path additions (`/` -> `/en/`), geo redirects (`/` -> `/us`),
// content moves (`/foo-bar` -> `/foo`) and subdomain swaps (`uphold.com` ->
// `wallet.uphold.com`), all of which can change the destination meaningfully.
function isTrivialCanonicalization(originalUrl, finalUrl) {
  let a;
  let b;
  try {
    a = new URL(originalUrl);
    b = new URL(finalUrl);
  } catch {
    return false;
  }
  if (a.protocol !== b.protocol) return false;
  if (a.pathname !== b.pathname) return false;
  if (a.search !== b.search) return false;
  if (a.hash !== b.hash) return false;
  const aHost = a.hostname.toLowerCase();
  const bHost = b.hostname.toLowerCase();
  if (aHost === bHost) return false;
  if (`www.${aHost}` === bHost) return true;
  if (aHost === `www.${bHost}`) return true;
  return false;
}

async function rewriteFile(absPath, from, to, apply) {
  let body;
  try {
    body = await readFile(absPath, "utf8");
  } catch (err) {
    return { ok: false, count: 0, error: err?.message ?? String(err) };
  }
  if (!body.includes(from)) {
    return { ok: true, count: 0 };
  }
  const parts = body.split(from);
  const occurrences = parts.length - 1;
  if (apply) {
    await writeFile(absPath, parts.join(to), "utf8");
  }
  return { ok: true, count: occurrences };
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }
  const reportPath = path.isAbsolute(args.report) ? args.report : path.join(root, args.report);
  let report;
  try {
    report = await readFile(reportPath, "utf8");
  } catch (err) {
    console.error(`Could not read report at ${reportPath}: ${err?.message ?? err}`);
    console.error(`Run scripts/audit-affiliate-links.mjs first to generate one.`);
    process.exit(2);
  }

  const entries = parseRedirectedSection(report);
  if (entries.length === 0) {
    console.log("No REDIRECTED entries found in report. Nothing to do.");
    return;
  }

  const trivial = [];
  const skipped = [];
  for (const e of entries) {
    if (isTrivialCanonicalization(e.from, e.to)) trivial.push(e);
    else skipped.push(e);
  }

  console.log(
    args.apply
      ? `Applying ${trivial.length} trivial canonicalization(s)…`
      : `Dry run: ${trivial.length} trivial canonicalization(s) would be applied. Re-run with --apply to write changes.`,
  );
  console.log("");

  let totalReplacements = 0;
  let touchedFiles = 0;
  for (const entry of trivial) {
    console.log(`${entry.from}`);
    console.log(`  -> ${entry.to}`);
    for (const rel of entry.files) {
      const abs = path.isAbsolute(rel) ? rel : path.join(root, rel);
      const result = await rewriteFile(abs, entry.from, entry.to, args.apply);
      if (!result.ok) {
        console.log(`    !! ${rel}: ${result.error}`);
        continue;
      }
      if (result.count === 0) {
        console.log(`    -- ${rel} (no occurrences found — already updated?)`);
      } else {
        const verb = args.apply ? "rewrote" : "would rewrite";
        console.log(`    ${verb} ${result.count} occurrence(s) in ${rel}`);
        totalReplacements += result.count;
        touchedFiles += 1;
      }
    }
    console.log("");
  }

  if (skipped.length) {
    console.log(
      `Skipped ${skipped.length} non-trivial redirect(s) — these change the path, query or registrable subdomain and need a human to confirm:`,
    );
    for (const entry of skipped) {
      console.log(`  ${entry.from}`);
      console.log(`    -> ${entry.to}`);
    }
    console.log("");
  }

  const summary = args.apply
    ? `Done. Replaced ${totalReplacements} occurrence(s) across ${touchedFiles} file edit(s).`
    : `Dry run complete. Would replace ${totalReplacements} occurrence(s) across ${touchedFiles} file edit(s).`;
  console.log(summary);
  if (args.apply && totalReplacements > 0) {
    console.log("Re-run scripts/audit-affiliate-links.mjs to confirm the rewritten URLs land on OK.");
  }
}

main().catch((err) => {
  console.error("Canonicalization failed:", err);
  process.exit(2);
});
