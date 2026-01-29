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
- **Migrations**: Drizzle Kit with `db:push` command

### Build System
- **Client Build**: Vite with React plugin, outputs to `dist/public`
- **Server Build**: esbuild bundling with selective dependency externalization
- **Path Aliases**: `@/` for client source, `@shared/` for shared code

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
- **Blog section**: Full translation of 6 blog post titles, excerpts, and categories across all languages
- Features section (security, yield, guides)
- Newsletter CTA
- Footer (all links, disclaimers, RSS feed)

### Translation Key Structure
- `wallets.sectionTitle/sectionSubtitle`: Wallet section headers
- `wallet.type.*`: Wallet types (mobileApp, hardware, browserExt, hardwareCard, webWallet)
- `wallet.fees.*`: Fee labels (free, standard, low, none)
- `wallet.feature.*`: Feature badges (30+ keys like selfCustody, dappBrowser, etc.)
- `wallet.badge.*`: Badge text (topFreeXRPL, topChoice)
- `exchange.bonus.*`: Exchange bonus text (btc20, xrp1000, lowFee, etc.)
- `exchange.feature.*`: Exchange features (bestForXRP, fiatOnRamp, etc.)
- `blog.post[1-6].*`: Blog content (title, excerpt, category for each post)
- `blog.minRead`: Read time label

### Content Notes
- Brand names (wallet/exchange names like "Xaman", "Ledger", "Uphold") remain untranslated as proper nouns
- Prices with dollar amounts (e.g., "$169", "$79") remain in original format
- Dates remain in English format ("Jan 24, 2026") - could be localized in future if needed
- Data structures in Home.tsx use translation keys (typeKey, feesKey, featureKeys, bonusKey, titleKey, etc.) for dynamic content