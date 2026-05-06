import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { walletCards, exchangeCards } from "../server/cardData";
import {
  renderSitemapFiles,
  compareSlugs,
  bestForSlugs,
} from "../server/sitemap";
import { blogPosts } from "../shared/blog";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

// Render every sitemap file (index + per-section chunks) and write it
// into dist/public/ so the static Bluehost deploy ships a fresh sitemap
// on every push to main. The pure rendering lives in server/sitemap.ts —
// this is just the file-writing wrapper.
async function writeSitemapFilesToDist() {
  const files = renderSitemapFiles({
    walletSlugs: Object.keys(walletCards),
    exchangeSlugs: Object.keys(exchangeCards),
    compareSlugs,
    bestForSlugs,
    blogPosts,
  });
  const outDir = join("dist", "public");
  await Promise.all(
    files.map((f) => writeFile(join(outDir, f.filename), f.xml, "utf-8")),
  );
  console.log(`  wrote ${files.length} sitemap files to ${outDir}/`);
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("writing sitemap files...");
  await writeSitemapFilesToDist();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
