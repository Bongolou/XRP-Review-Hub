import { walletCards, exchangeCards } from "../server/cardData";
import {
  compareSlugs,
  bestForSlugs,
  staticPagePaths,
} from "../server/sitemap";
import { blogPosts } from "../shared/blog";

// The list of static (non-parameterized) routes the SPA serves. Imported
// directly from server/sitemap.ts so the sitemap and the prerenderer
// share a single source of truth — adding a new static page only
// requires editing `staticPagePaths`. `/admin/reviews` is intentionally
// absent from `staticPagePaths` (must not be indexed); `/news` and
// `/wallet-quiz` are included because they still benefit from a
// prerendered shell + meta even though their dynamic content fills in
// client-side.
export const PRERENDER_STATIC_ROUTES: ReadonlyArray<string> = staticPagePaths;

// Languages the SPA supports. Mirrors `availableLanguages` in
// LanguageContext and the hreflang map in server/sitemap.ts. Each route
// gets snapshotted once per language so Google can index every
// translation independently with its own <title>/<meta>/canonical.
export const PRERENDER_LANGUAGES = [
  "en",
  "es",
  "zh",
  "ja",
  "ko",
  "pt",
  "de",
  "fr",
] as const;
export type PrerenderLang = (typeof PRERENDER_LANGUAGES)[number];

export type PrerenderJob = { route: string; lang: PrerenderLang };

// Build the full list of routes to prerender from the same source data the
// sitemap uses, so a new wallet/exchange/comparison/blog post automatically
// gets a prerendered HTML file the next time the build runs.
export function enumeratePrerenderRoutes(): string[] {
  const routes: string[] = [...PRERENDER_STATIC_ROUTES];
  for (const slug of Object.keys(walletCards)) routes.push(`/wallet/${slug}`);
  for (const slug of Object.keys(exchangeCards)) routes.push(`/exchange/${slug}`);
  for (const slug of compareSlugs) routes.push(`/compare/${slug}`);
  for (const slug of bestForSlugs) routes.push(`/best-for/${slug}`);
  for (const post of blogPosts) routes.push(`/blog/${post.id}`);
  return routes;
}

// Cartesian product of routes × languages — one snapshot job per
// (route, language) pair. Returned in route-major order so log output
// stays readable even when concurrency reorders completion.
export function enumeratePrerenderJobs(): PrerenderJob[] {
  const routes = enumeratePrerenderRoutes();
  const jobs: PrerenderJob[] = [];
  for (const route of routes) {
    for (const lang of PRERENDER_LANGUAGES) {
      jobs.push({ route, lang });
    }
  }
  return jobs;
}

// Map a route path to the on-disk filename Apache will serve for that URL.
// `/` → `index.html`, `/wallet/ledger` → `wallet/ledger/index.html`.
export function routeToFilePath(route: string): string {
  if (route === "/") return "index.html";
  const trimmed = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${trimmed}/index.html`;
}

// Map a (route, lang) job to its on-disk filename. English keeps the
// bare `index.html` path so it remains the default DirectoryIndex Apache
// serves; non-English languages get a `index.<lang>.html` sibling that
// the .htaccess RewriteRule selects when `?lang=<lang>` is in the
// query string.
//
// Example:
//   { route: "/wallet/ledger", lang: "en" } → wallet/ledger/index.html
//   { route: "/wallet/ledger", lang: "de" } → wallet/ledger/index.de.html
//   { route: "/",              lang: "fr" } → index.fr.html
export function jobToFilePath(job: PrerenderJob): string {
  const base = routeToFilePath(job.route);
  if (job.lang === "en") return base;
  return base.replace(/index\.html$/, `index.${job.lang}.html`);
}
