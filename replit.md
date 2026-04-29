# All Things XRPL

## Overview

All Things XRPL is an affiliate review website focused on XRP Ledger (XRPL) wallets, dApps, and DeFi applications. The site provides wallet comparisons, reviews, and educational content about the XRPL ecosystem. It features a newsletter subscription system and contact form for user engagement, with affiliate links generating revenue.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for page transitions
- **Design System**: Dark theme with custom crypto/tech-focused color palette using Orbitron display font and Inter sans-serif

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api` prefix
- **Development**: Vite dev server with HMR proxied through Express
- **Production**: Static file serving from built assets

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with Zod schema validation
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Tables**: 
  - `subscribers` - Newsletter email subscriptions
  - `contactSubmissions` - Contact form submissions
  - `productReviews` - Visitor-submitted star ratings + reviews for wallets/exchanges (with `hiddenAt` for editorial moderation)
- **Migrations**: Drizzle Kit with `db:push` command

### Build System
- **Client Build**: Vite with React plugin, outputs to `dist/public`
- **Server Build**: esbuild bundling with selective dependency externalization
- **Path Aliases**: `@/` for client source, `@shared/` for shared code

## Maintenance Scripts

### Affiliate Link Audit
- **Script**: `scripts/audit-affiliate-links.mjs`
- **Run**: `node scripts/audit-affiliate-links.mjs`
- **What it does**: Recursively walks the entire `client/src` tree (every `.ts`/`.tsx`/`.js`/`.jsx` file — pages, components, libs, blog posts, FAQs, footers, banners, etc.) and extracts every outbound `http(s)` URL, then probes each one (HEAD with GET fallback) and writes `reports/affiliate-link-audit.txt`. Unsplash image URLs, `schema.org` JSON-LD contexts, localhost URLs, URLs containing template-literal interpolation (`${…}`), and known programmatic API endpoints (CoinGecko, rss2json, Formspree, RSS feeds) are skipped so they don't create noise. Known anti-bot 403 responses from `tangem.com`, `uphold.com`, and `coinbase.com` are filed under "Ignored". Exits non-zero when broken links are found, so it can be wired into a weekly cron / CI schedule.
- **Schedule**: A GitHub Actions workflow at `.github/workflows/affiliate-link-audit.yml` runs the audit every Monday at 12:00 UTC (and is also triggerable manually via `workflow_dispatch`). Every run does three things to surface the report: (1) renders the report contents into the GitHub Actions **job summary** so anyone visiting the run page sees it inline without downloading anything, (2) uploads `reports/affiliate-link-audit.txt` as a downloadable build artifact named `affiliate-link-audit-report`, and (3) when the script exits non-zero (broken links found) opens a GitHub issue labeled `affiliate-audit` (or comments on the existing open one) containing the report and a link to the failing run, then fails the job so the maintainer is actively notified.

### Review Notifications
- **Module**: `server/reviewNotify.ts` — fired from `POST /api/reviews` after a visitor review is saved.
- **Configure**: Set `REVIEW_NOTIFY_WEBHOOK_URL` to a Slack or Discord incoming webhook URL. The payload sends both `text` (Slack) and `content` (Discord) so a single env var works for either service. Set `PUBLIC_BASE_URL` to override the auto-detected host used in the `/admin/reviews` deep link.
- **Behaviour**: Fire-and-forget — failures (no env var, network error, non-2xx response) are logged but never block the review from being saved or the API response from being sent. Auto-hidden reviews (see Review Spam Heuristics) deliberately do **not** trigger this notification — that's the whole point of auto-flagging.

### Welcome Email
- **Module**: `server/welcomeEmail.ts` — fired from `POST /api/subscribe` after a subscriber is created (or re-engages with an existing email + leadMagnet).
- **Configure**: Set `RESEND_API_KEY` and `WELCOME_EMAIL_FROM` (verified Resend sender) to actually send mail. Without those, the module logs the localized subject + download URL via `[WelcomeEmail] (no transport) lang=… subject=…` so localization can still be verified pre-integration. Set `PUBLIC_BASE_URL` to override the canonical site URL embedded in the download link (defaults to `https://allthingsxrpl.com`). Host / `X-Forwarded-Host` headers are deliberately ignored when constructing email links so a poisoned header can't inject a phishing URL into outbound mail.
- **Anti-abuse**: The welcome email is only sent when a brand-new subscriber row is created. Re-engagement requests for an already-known email are intentionally a no-op on the email side, so the public, unauthenticated `/api/subscribe` endpoint can't be turned into a free spam-relay against existing subscribers.
- **Localization**: A `language` column (nullable) on `subscribers` records the visitor's UI language. The frontend `EmailCaptureBlock` (`client/src/components/conversion.tsx`) reads `useLanguage().language` and includes it in the POST body. The subscribe schema validates it against the 8 supported codes (`en, es, zh, ja, ko, pt, de, fr`).
- **Templates**: Per-language templates exist for the `wallet_shortlist` lead magnet only (the only magnet with a localized PDF set per language). Other lead magnets currently fall through with no email — extend `WALLET_SHORTLIST_TEMPLATES` / the `renderWelcomeEmail` switch when more magnets get localized assets.
- **Behaviour**: Fire-and-forget — failures (transport down, network error, non-2xx response) are logged but never block the subscribe response.

### Sitemap
- **Endpoint**: `GET /sitemap.xml` returns a `<sitemapindex>` that points at per-section child sitemaps (`/sitemap-static.xml`, `/sitemap-wallets.xml`, `/sitemap-exchanges.xml`, `/sitemap-compare.xml`, `/sitemap-best-for.xml`, `/sitemap-blog.xml`). Each child sitemap is served by `GET /sitemap-:name.xml`.
- **Auto-chunking**: Each section is split into chunks of at most `floor(25000 / 8) = 3125` entries (8 = supported language count) so every child sitemap stays under both sitemaps.org caps — 50,000 URLs *and* 50 MB uncompressed. (Each `<url>` block is ≈1.1 KB with the full hreflang alternates + image entry, so a 50k-URL file would already exceed the 50 MB size cap; the 25,000-URL soft cap keeps the worst case around 28 MB.) Single-chunk sections keep their bare id (e.g. `wallets`); sections that exceed the cap split into `-1.xml`, `-2.xml`, etc. and the index lists every chunk automatically — no manual intervention as the catalogue grows.
- **Per-language entries**: Each (path, language) pair becomes its own `<url>` entry with the full hreflang alternate block, preserving the prior behaviour where translated URLs are independently indexable.

### Review Spam Heuristics
- **Module**: `server/reviewSpamHeuristics.ts` — single source of truth for the auto-flag layer. `evaluateReviewSpam()` runs synchronously on every `POST /api/reviews` submission; `checkAkismet()` runs an optional async check after it.
- **Verdicts**: `"reject"` → 400 with a clear error; `"hide"` → review is saved with `hiddenAt` set so it stays out of the public list and aggregate rating, only visible in the admin "Hidden" tab; `"ok"` → goes through normally. To extend, add to `HARD_BANNED_WORDS` / `SOFT_FLAG_WORDS` or push a new function into the `HEURISTICS` array.
- **Heuristics shipped**: links/HTML (reject), hard banned words like casino/porn (reject), soft-flag contact-spam words like telegram/airdrop/100x (hide), repeated-character runs (hide), single long whitespace-free token (hide), shouting / >70% caps (hide), contact info in author name (hide), mostly-non-Latin script as a naive language guess (hide).
- **Akismet (optional)**: Set `AKISMET_API_KEY` and `AKISMET_BLOG_URL` to enable the third-party check. 3-second timeout, fails open so submissions are never blocked by Akismet downtime. The pro-tip `discard` header is treated as a hard reject.

## External Dependencies

### Database
- PostgreSQL database (required via `DATABASE_URL` environment variable)
- `connect-pg-simple` for session storage capability

### UI/Component Libraries
- Radix UI primitives for accessible components
- Lucide React for icons
- Embla Carousel for carousels
- Vaul for drawer components
- cmdk for command palette

### Development Tools
- Replit-specific plugins: runtime error overlay, cartographer, dev banner
- Custom Vite plugin for OpenGraph image meta tag updates

### Fonts (External)
- Google Fonts: Inter (body text) and Orbitron (display/headings)

## Internationalization (i18n)

### Language Support
The site supports 8 languages: English (en), Spanish (es), Chinese (zh), Japanese (ja), Korean (ko), Portuguese (pt), German (de), and French (fr).

### Translation System
- **Context Provider**: `client/src/lib/i18n/LanguageContext.tsx` provides the `useLanguage` hook
- **Translation Data**: `client/src/lib/i18n/translations.ts` contains all translation keys for all languages
- **Language Selector**: `client/src/components/LanguageSelector.tsx` allows users to switch languages
- **Usage Pattern**: Components use `const { t } = useLanguage()` and call `t("key.name")` for translated text

### Translated Sections
- Navigation (header and mobile menu)
- Hero section
- Deal of the Week
- **Wallet section**: Section headers, wallet type labels (Mobile App, Hardware, etc.), fees (Free, Standard, Low, None), 30+ feature badges (Self-Custody, dApp Browser, Biometric Auth, etc.), complementary wallet suggestions
- **Exchange section**: Section headers, bonus text (e.g., "$20 BTC Bonus", "1000 XRP Airdrop"), 20+ feature badges (Best for XRP, Low Fees, High Security, etc.)
- **Knowledge Hub (formerly Blog)**: Full translation of 19 article titles, excerpts, and categories across all languages. Social sharing buttons (X, Facebook, TikTok, Copy Link) on all articles.
- Features section (security, yield, guides)
- Newsletter CTA
- Footer (all links, disclaimers, RSS feed)
- **About page**: Full content translated (mission statement, 4 feature cards, affiliate disclosure) across all 8 languages
- **Contact page**: All form labels, success/error messages, and contact info sections translated across all 8 languages
- **FAQ page**: Section headers, 14 Q&A pairs, category labels, and CTA translated across all 8 languages
- **Getting Started page**: 5-step guide with titles, descriptions, tips, warnings, and CTA buttons translated across all 8 languages
- **Wallet detail pages**: UI elements (buttons, labels, section headers) translated; detailed content in English with UI fallback pattern
- **Exchange detail pages**: UI elements translated; detailed content in English with UI fallback pattern
- **News page**: Page title, subtitle, live feed badge, refresh button, read more, error/empty states, and home page preview section translated across all 8 languages

### Translation Key Structure
- `wallets.sectionTitle/sectionSubtitle`: Wallet section headers
- `wallet.type.*`: Wallet types (mobileApp, hardware, browserExt, hardwareCard, webWallet)
- `wallet.fees.*`: Fee labels (free, standard, low, none)
- `wallet.feature.*`: Feature badges (30+ keys like selfCustody, dappBrowser, etc.)
- `wallet.badge.*`: Badge text (topFreeXRPL, topChoice)
- `exchange.bonus.*`: Exchange bonus text (btc20, xrp1000, lowFee, etc.)
- `exchange.feature.*`: Exchange features (bestForXRP, fiatOnRamp, etc.)
- `blog.post[1-19].*`: Knowledge Hub content (title, excerpt, category for each post)
- `blog.minRead`: Read time label
- `news.*`: News page content (title, subtitle, live, refresh, readMore, error, tryAgain, noArticles, latestTitle, latestSubtitle, viewAll)

### Content Notes
- Brand names (wallet/exchange names like "Xaman", "Ledger", "Uphold") remain untranslated as proper nouns
- Prices with dollar amounts (e.g., "$169", "$79") remain in original format
- Dates remain in English format ("Jan 24, 2026") - could be localized in future if needed
- Data structures in Home.tsx use translation keys (typeKey, feesKey, featureKeys, bonusKey, titleKey, etc.) for dynamic content

## Performance Optimizations (Feb 2026)

### Image Optimization
- All logo images converted from PNG (700KB-1.1MB each) to WebP format (2-10KB each) - 99%+ size reduction
- Images resized from 1024x1024 to 256x256 for web display
- WebP files located in `client/src/assets/logos/` with `.webp` extension

### SEO
- robots.txt added at `client/public/robots.txt` with "Allow: /" and sitemap reference
- Comprehensive meta tags in `client/index.html` for social sharing

### Navigation
- ScrollToSection component in Layout.tsx handles smooth scrolling to anchor sections
- Hero CTA button scrolls to wallets section via onClick handler

## News Feed (Feb 2026)

### Architecture
- **Backend**: `/api/news` endpoint in `server/routes.ts` fetches RSS feeds from Google News, CoinTelegraph, and CryptoSlate
- **Filtering**: Articles filtered by XRP/XRPL/Ripple keywords, deduplicated by title similarity
- **Caching**: 15-minute TTL server-side cache to avoid excessive upstream requests
- **Parsing**: Regex-based XML parsing (no external RSS library dependency)
- **Timeout**: 8-second fetch timeout per feed source

### Frontend
- **News Page**: `client/src/pages/News.tsx` - Full news feed with 3-column grid, source badges, time-ago formatting, thumbnails, loading skeletons, error states
- **Home Preview**: `LatestNewsPreview` component in `Home.tsx` showing 4 latest headlines in 2-column grid with "View All News" CTA
- **Route**: `/news` registered in `App.tsx`
- **Navigation**: News link in header nav, mobile menu, and footer Resources section