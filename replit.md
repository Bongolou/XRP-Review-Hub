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
- **One-time GitHub setup** (do this once per repo, in this order):
  1. Add the four repo secrets at *github.com → Settings → Secrets
     and variables → Actions → New repository secret*. Where to find
     each value in cPanel:
     - `BLUEHOST_FTP_SERVER` — cPanel → *Files → FTP Accounts*. Use
       the hostname shown for your account (typically `ftp.<your-
       domain>` or the server hostname like `boxXXXX.bluehost.com`).
       Do **not** include `ftp://`, port, or a path.
     - `BLUEHOST_FTP_USERNAME` — cPanel → *Files → FTP Accounts*. Use
       the full FTP login (often `user@yourdomain.com`). Either
       create a dedicated FTP user scoped to `public_html/` or use
       the main account.
     - `BLUEHOST_FTP_PASSWORD` — the password set on the FTP user
       above. If you forgot it, click *Change Password* on that
       account in cPanel.
     - `BLUEHOST_FTP_SERVER_DIR` — the absolute path on the FTP
       server to deploy into, with a trailing slash. Typically
       `/public_html/` for the root domain, or
       `/public_html/<subfolder>/` for a subfolder install.
  2. Create the workflow file on github.com directly: *Add file →
     Create new file*, name it `.github/workflows/deploy.yml`, paste
     the YAML body from the local `.github/workflows/deploy.yml` in
     this repo, and commit to `main`. (This step is needed because
     the Replit Git pane can't push files under `.github/workflows/`
     — see the OAuth caveat below.)
  3. Verify with a manual run: *Actions → Deploy to Bluehost → Run
     workflow → Run workflow*. After it finishes green, hard-reload
     the live site with cache disabled and confirm the latest
     content is showing.
- **Logs**: GitHub repo → *Actions* → "Deploy to Bluehost" → pick a
  run. Each run posts a short summary with the deployed commit SHA.
- **Replit OAuth caveat**: Replit's GitHub OAuth app does not request
  the `workflow` scope, so changes to files under `.github/workflows/`
  cannot be pushed via the in-Replit Git pane. Edit those files on
  github.com directly, or push from a local clone using a Personal
  Access Token that has both `repo` and `workflow` scopes.