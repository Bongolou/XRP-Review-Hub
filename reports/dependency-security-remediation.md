# Dependency security remediation

Verified on 2026-10-22.

## Inventory

A filesystem walk from the project root pruned dependency, VCS, cache, and
build-output directories before traversal. It found:

| Location | Dependency configuration | Action |
| --- | --- | --- |
| Project root | `package.json`, `package-lock.json`, `pnpm-lock.yaml` | Ran npm and pnpm automatic fixes; updated direct dependencies, regenerated both locks, and applied the esbuild override for both managers. |
| `artifacts/mockup-sandbox` | `package.json`, `package-lock.json` | Ran npm automatic fixes; regenerated the lock and removed the unpatched glob dependency chain. |
| `.local/skills/replit-auth/templates/lib/replit-auth-web` | `package.json` only | Inspected and attempted npm audit fix. npm reports `ENOLOCK`; this is a platform-supplied workspace/catalog template, not a standalone installable app. It pins none of the reported vulnerable packages, so it was left unchanged. |

No nested manifest was omitted because it was untracked or ignored by Git.

## Remediation

All 36 reported advisories, covering 19 distinct vulnerable package/version
pairs, are absent from the final manifests and lockfiles.

The root app now resolves:

| Package | Resolved version |
| --- | --- |
| ws | 8.22.0 |
| path-to-regexp | 8.4.2 |
| qs | 6.16.1 |
| vite | 7.3.7 |
| rollup | 4.65.0 |
| @vitest/mocker, vitest | 4.1.12 |
| source-map-js | 1.2.2 |
| esbuild | 0.25.12, 0.28.2 |
| nanoid | 3.3.20 |
| lodash | 4.18.1 |
| postcss | 8.5.31 |
| browserslist | 4.29.4 |
| picomatch | 4.0.7 |
| proxy-addr | 2.0.8 |
| baseline-browser-mapping | 2.11.31 |
| @babel/core | 7.29.7 |
| drizzle-orm | 0.45.4 |
| body-parser | 2.4.0 |

The current stable drizzle-kit still pulls the deprecated esbuild-kit loader.
A narrowly scoped override replaces its vulnerable esbuild with 0.25.12.
The pnpm override is maintained in `pnpm-workspace.yaml` as well as the npm
override in `package.json`. A clean npm resolution was necessary because the
existing lock retained the old nested esbuild even after declaring the override.

The scan additionally discovered GHSA-vfj7-8cjw-p6xm in braces 3.0.3, with no
patched release. Its sandbox-only caller used a fixed, trusted glob pattern,
not visitor input. Rather than retain the vulnerable dependency, native
filesystem traversal now discovers mockups without following symlinks.
Tests cover nested discovery, ordering, excluded hidden/private paths,
symlink cycles, missing directories, and unexpected filesystem errors.
The sandbox also isolates its PostCSS settings, as the app does, so its
Tailwind v4 Vite plugin does not load the legacy root PostCSS configuration.

Lockfile download URLs use public npm tarballs. Public tarball integrity was
verified against the approved dependency hashes before regenerating portable
locks; clean-cache npm installs succeeded.

## Verification

- Final Replit dependency scan: **zero findings at every severity**.
- Root npm audit and pnpm audit: **zero vulnerabilities**.
- Sandbox npm audit: **zero vulnerabilities**.
- Final filesystem walk: none of the 19 originally reported vulnerable
  package/version pairs remain in any discovered manifest or lockfile.
- No internal package-download URLs remain in either npm lockfile.
- Clean-cache `npm ci` succeeded in both npm projects.
- `npm run check` and sandbox `npm run typecheck` passed.
- `npx vitest run`: **13 files, 169 tests passed**, no skipped tests.
- Full `npm run build` passed, including **544 prerendered routes**.
- Sandbox build passed with its configured `BASE_PATH=/__mockup/`.
- Both development workflows restarted successfully.
- Homepage screenshot confirmed that the main application renders.

No production deployment was performed as part of this remediation.
