# All Things XRPL

## Overview
All Things XRPL is an affiliate review website dedicated to the XRP Ledger (XRPL) ecosystem. Its primary purpose is to provide users with comprehensive reviews and comparisons of XRPL wallets, decentralized applications (dApps), and DeFi platforms. The site aims to be a central resource for educational content about XRPL, fostering user engagement through a newsletter and contact forms, and generating revenue via affiliate links. The project envisions becoming the go-to platform for anyone looking to navigate the XRPL space, offering unbiased information and facilitating informed decisions for users.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript.
- **Routing**: Wouter.
- **Styling**: Tailwind CSS v4 with CSS variables for theming, utilizing shadcn/ui (New York style) built on Radix UI primitives.
- **State Management**: TanStack React Query.
- **Animations**: Framer Motion for page transitions.
- **Design System**: Dark theme with a crypto/tech-focused color palette, using Orbitron (display) and Inter (sans-serif) fonts.
- **UI/UX**: Emphasis on accessible components, smooth scrolling, and an intuitive multilingual interface. Image optimization (WebP, resized) and SEO best practices (robots.txt, meta tags) are implemented for performance and discoverability.

### Backend
- **Runtime**: Node.js with Express 5, written in TypeScript with ESM modules.
- **API Design**: RESTful endpoints under `/api`.
- **Development**: Vite dev server with HMR proxied through Express.
- **Production**: Static file serving of built assets.
- **Maintenance**: Automated affiliate link auditing, review notification system (Slack/Discord), welcome email service for new subscribers, dynamic sitemap generation, and spam heuristics for user reviews (including Akismet integration).

### Data Storage
- **Database**: PostgreSQL.
- **ORM**: Drizzle ORM with Zod schema validation.
- **Schema**: `shared/schema.ts` defines `subscribers`, `contactSubmissions`, and `productReviews` tables.
- **Migrations**: Drizzle Kit.

### Internationalization (i18n)
- **Supported Languages**: English, Spanish, Chinese, Japanese, Korean, Portuguese, German, and French.
- **System**: Custom `LanguageContext` and `useLanguage` hook, `translations.ts` for all keys.
- **Translated Sections**: Comprehensive translation across navigation, hero, wallet/exchange sections (including features and badges), Knowledge Hub articles, features, newsletter CTA, footer, About, Contact, FAQ, Getting Started pages, and detail page UI elements.
- **Locale-aware affiliate links**: `client/src/lib/affiliateLinks.ts` rewrites the bare-host Tangem and Crypto.com referral URLs at render time based on the visitor's selected i18n language (e.g. DE viewers get `tangem.com/de/`, KO viewers get `crypto.com/kr`). Stored URLs in page data are kept as the bare host on purpose so the destination's own geo-redirect handles languages that have no localized path (currently JA on crypto.com). The `FastCompareTable`, `VerdictBox`, `ReviewSummaryCard`, and `CTABlock` components in `conversion.tsx` apply the helper automatically; inline `<a href>` affiliate links wrap it themselves.

### News Feed
- **Architecture**: Backend `/api/news` endpoint fetches and caches (15-minute TTL) RSS feeds from Google News, CoinTelegraph, and CryptoSlate, filtering by XRPL keywords.
- **Presentation**: Frontend displays news in a 3-column grid on the `/news` page and a preview on the homepage.

## External Dependencies

### Database
- PostgreSQL (via `DATABASE_URL`).
- `connect-pg-simple` for session storage.

### UI/Component Libraries
- Radix UI (primitives).
- Lucide React (icons).
- Embla Carousel.
- Vaul (drawer components).
- cmdk (command palette).

### Development Tools
- Replit-specific plugins (runtime error overlay, cartographer, dev banner).
- Custom Vite plugin for OpenGraph image meta tags.

### Fonts
- Google Fonts: Inter and Orbitron.

### Third-Party Services
- Akismet (optional, for review spam detection).
- Resend (for welcome emails).
- Slack/Discord (for review notifications).

## Deployment

The live site at allthingsxrpl.com is hosted on Bluehost shared hosting,
which only serves static files. The Express backend in `server/` does
**not** run in production — `/api/*`, `/og/*.png`, the dynamic
`/sitemap*.xml`, `/rss.xml`, the contact form, the newsletter signup,
and review submissions only work in the Replit dev environment.

### Auto-deploy from GitHub to Bluehost
- **Workflow**: `.github/workflows/deploy.yml`
- **Triggers**: every push to `main`, plus manual runs via the
  *Actions → Deploy to Bluehost → Run workflow* button.
- **What it does**: checks out the repo, runs `npm ci` and
  `npm run build` (which produces `dist/public/`), then syncs the
  contents of `dist/public/` to Bluehost over FTPS using
  `SamKirkland/FTP-Deploy-Action`. The action syncs changed files
  (and may remove previously deployed bundle files that disappear
  from the new build) but does **not** wipe the destination, so
  hand-placed files in `public_html/` (e.g. `.htaccess`) that were
  never part of `dist/public/` survive.
- **Secrets required** (Settings → Secrets and variables → Actions):
  `BLUEHOST_FTP_SERVER`, `BLUEHOST_FTP_USERNAME`,
  `BLUEHOST_FTP_PASSWORD`, `BLUEHOST_FTP_SERVER_DIR` (the path on
  the FTP server, typically `/public_html/` or
  `/public_html/<subfolder>/`).
- **Logs**: GitHub repo → *Actions* → "Deploy to Bluehost" → pick a
  run. Each run posts a short summary with the deployed commit SHA.
- **Replit OAuth caveat**: Replit's GitHub OAuth app does not request
  the `workflow` scope, so changes to files under `.github/workflows/`
  cannot be pushed via the in-Replit Git pane. Edit those files on
  github.com directly, or push from a local clone using a Personal
  Access Token that has both `repo` and `workflow` scopes.