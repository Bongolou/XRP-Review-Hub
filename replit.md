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