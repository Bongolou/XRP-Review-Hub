// Pure RSS feed renderer plus the /rss.xml route registration.
// `registerRssRoute` is the single wiring point used by both `./routes`
// and the regression tests, so the unit and HTTP tests exercise the
// exact handler that ships in production.
import type { Express } from "express";
import type { BlogPostMeta } from "@shared/blog";
import { translations } from "../client/src/lib/i18n/translations";

export const RSS_BASE_URL = "https://allthingsxrpl.com";
export const RSS_CHANNEL_TITLE = "All Things XRPL";
export const RSS_CHANNEL_DESCRIPTION =
  "Your trusted source for XRP Ledger wallet comparisons, dApp reviews, and staking guides.";
export const RSS_LANGUAGE = "en-us";

// Escape the five XML predefined entities so blog metadata can sit safely
// inside element content or attribute values.
export function escapeXmlText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Resolve the per-item description: prefer the post's English excerpt,
// fall back to a one-line summary derived from the title.
export function resolveRssItemDescription(post: BlogPostMeta): string {
  const excerpt = translations.en?.[post.excerptKey];
  if (typeof excerpt === "string" && excerpt.trim().length > 0) return excerpt;
  return `${post.title} — read this XRPL guide on All Things XRPL.`;
}

export type RssRenderInput = {
  blogPosts: BlogPostMeta[];
  baseUrl?: string;
  now?: Date;
};

export function renderRssXml(input: RssRenderInput): string {
  const baseUrl = input.baseUrl ?? RSS_BASE_URL;
  const lastBuild = (input.now ?? new Date()).toUTCString();
  const items = input.blogPosts
    .map((post) => {
      const link = `${baseUrl}/blog/${post.id}`;
      const description = resolveRssItemDescription(post);
      return `    <item>
      <title>${escapeXmlText(post.title)}</title>
      <link>${escapeXmlText(link)}</link>
      <guid>${escapeXmlText(link)}</guid>
      <pubDate>${new Date(post.dateIso).toUTCString()}</pubDate>
      <category>${escapeXmlText(post.category)}</category>
      <description>${escapeXmlText(description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXmlText(RSS_CHANNEL_TITLE)}</title>
    <description>${escapeXmlText(RSS_CHANNEL_DESCRIPTION)}</description>
    <link>${escapeXmlText(baseUrl)}</link>
    <atom:link href="${escapeXmlText(`${baseUrl}/rss.xml`)}" rel="self" type="application/rss+xml"/>
    <language>${RSS_LANGUAGE}</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;
}

// Wire the /rss.xml handler onto an Express app. Lives here (rather than
// inline in routes.ts) so tests can register the same route on a bare
// express() app without dragging in the rest of the route stack.
export function registerRssRoute(app: Express, blogPosts: BlogPostMeta[]): void {
  app.get("/rss.xml", (_req, res) => {
    res.header("Content-Type", "application/rss+xml; charset=utf-8");
    res.send(renderRssXml({ blogPosts }));
  });
}
