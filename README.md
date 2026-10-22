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

### Scheduled live route checks (read-only)

`.github/workflows/live-route-smoke.yml` runs **Live Route Health Check**
hourly at minute 17 UTC, independently of frontend or backend deployments.
It can also be run from **GitHub → Actions → Live Route Health Check → Run
workflow**. The schedule becomes active when the workflow is on the repository's
default branch; GitHub may delay scheduled runs, so this is not real-time monitoring.

It reuses `script/post_deploy_smoke.py` against `https://allthingsxrpl.com`,
checking news and review APIs, RSS, the sitemap index and every advertised child
sitemap, and an OG PNG. Response payloads are validated, so an HTML fallback
with HTTP 200 still fails. Each route gets at most four attempts with a
20-second request timeout and 10-second delay between attempts; the live-check
step is capped at 12 minutes.

Failures mark the GitHub Actions run failed. Open its summary and **Check live
Bluehost routes** logs to see the failing routes and attempts. GitHub Actions
notifications depend on your GitHub notification settings. No application
emails, submissions, records, DNS changes, or deployments are performed, and
no application credentials are needed.

To run the same checks manually: `python3 script/post_deploy_smoke.py`.
To test the checker offline:
`python3 -m unittest discover -s script -p 'post_deploy_smoke_test.py'`.

## Project structure

### Browser metadata regression tests

Run `npm run test:browser` to check `/dapps` metadata against the central
SEO map in all eight languages, including live language changes, browser
Back, and navigating to another page and back. These tests also run with
`npx vitest run` and before the deployment build.

The tests start their own Vite server on an ephemeral port and need no
database or running application workflow. On Replit they use the system
Chromium (including its Linux libraries). On other Linux machines, first run
`npx playwright install --with-deps chromium`. An explicit browser binary
can be selected with `PLAYWRIGHT_CHROMIUM_PATH`. Missing browser dependencies
fail the tests rather than silently skipping coverage.

```
client/        React + Vite frontend
server/        Express API and SSR entry
shared/        Drizzle schema + shared TypeScript types
script/        Build scripts
dist/          Production build output (gitignored)
```

See [`replit.md`](./replit.md) for a deeper architectural overview.
