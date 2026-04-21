# All Things XRPL

Affiliate review site for XRP Ledger wallets, exchanges, and dApps. React + Vite frontend, Express + Drizzle (PostgreSQL) backend, 8-language i18n.

## Requirements

- Node.js 20 LTS (Node 18+ minimum)
- PostgreSQL 14+
- npm 10+

## Local development

```bash
npm install
cp .env.example .env       # then fill in DATABASE_URL
npm run db:push            # create / sync the database schema
npm run dev                # starts Express + Vite on http://localhost:5000
```

## Production build

```bash
npm install
npm run build              # outputs client to dist/public and server to dist/index.cjs
npm start                  # runs the bundled server in production mode
```

`npm start` serves the static client and the `/api/*` routes from a single Express process.

## Environment variables

See [`.env.example`](./.env.example). At minimum you must set:

- `DATABASE_URL` – PostgreSQL connection string
- `NODE_ENV` – `production` on the live server
- `PORT` – optional; defaults to `5000`

## Deploying to Bluehost

1. **Provision PostgreSQL** in cPanel (or use an external provider such as Neon, Supabase, or Render).
2. **Upload the repo** via Git or SFTP. Do not upload `node_modules` or `dist` — they are rebuilt on the server.
3. **Set environment variables** in Bluehost's Node.js Selector (`DATABASE_URL`, `NODE_ENV=production`).
4. **Install and build** on the server:
   ```bash
   npm install
   npm run build
   npm run db:push
   ```
5. **Start the app** with `npm start` (or have Bluehost's Node app manager run it).
6. **Point `allthingsxrpl.com`** to the app and enable Let's Encrypt SSL.

### Post-deploy smoke test

- Home page loads in all 8 languages
- `/api/news` returns articles
- Newsletter signup writes to the `subscribers` table
- A few `/wallet/{slug}`, `/exchange/{slug}`, `/compare/{slug}`, and `/best-for/{slug}` routes render correctly

## Project structure

```
client/        React + Vite frontend
server/        Express API and SSR entry
shared/        Drizzle schema + shared TypeScript types
script/        Build scripts
dist/          Production build output (gitignored)
```

See [`replit.md`](./replit.md) for a deeper architectural overview.
