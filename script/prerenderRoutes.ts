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

// Map a route path to the on-disk filename Apache will serve for that URL.
// `/` → `index.html`, `/wallet/ledger` → `wallet/ledger/index.html`.
export function routeToFilePath(route: string): string {
  if (route === "/") return "index.html";
  const trimmed = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${trimmed}/index.html`;
}
