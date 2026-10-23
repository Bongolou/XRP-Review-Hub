# Live affiliate browser audit — 2026-10-22

## Scope and method

This was a read-only Playwright audit of `https://allthingsxrpl.com` (not the local app). The browser used page navigation and local quiz answer selections only. No lead/newsletter form was filled or submitted, no signup or purchase was started, no quiz recommendation link was clicked, and no bot challenge was bypassed.

The durable compact observations are in [`live-affiliate-browser-2026-10-22.json`](./live-affiliate-browser-2026-10-22.json). No IP, cookie values, or secret values are included.

## Verified

- Fresh English homepage GET returned **200** and title `Best XRP Wallets 2026 | Compare Xaman, Ledger, Tangem & More`.
- English quiz rendered all four supplied sequences:
  - Ledger → **Ledger Nano X**, `https://shop.ledger.com/?r=5d81f18905fe`
  - Tangem → **Tangem**, `https://tangem.com/en/?ref=allthingsxrpl`
  - Xaman DeFi → **Xaman (XUMM)**, `https://xaman.app/?ref=allthingsxrpl`
  - default → **Xaman (XUMM)**, `https://xaman.app/?ref=allthingsxrpl`
- Spanish quiz rendered all four supplied sequences:
  - Ledger → **Ledger Nano X**, `https://shop.ledger.com/?r=5d81f18905fe`
  - Tangem → **Tangem**, `https://tangem.com/es/?ref=allthingsxrpl`
  - Xaman DeFi and default → **Xaman (XUMM)**, `https://xaman.app/?ref=allthingsxrpl`
- German quiz rendered all four supplied sequences: Ledger Nano X, Tangem, Xaman DeFi, and default Xaman. The result-specific URLs were captured; Tangem was `https://tangem.com/de/?ref=allthingsxrpl`.
- Tangem quiz sequence was independently run in French, Japanese, Korean, Portuguese, and Chinese. The localized ref URLs were respectively `/fr/`, `/ja/`, `/ko/`, `/pt/`, and `/zh-Hans/` on `https://tangem.com`, each with `?ref=allthingsxrpl`. Other outcomes (Ledger and both Xaman paths) were not run in those five locales.
- The homepage was hydrated and fully scrolled in all eight languages (English, Spanish, German, French, Japanese, Korean, Portuguese, Chinese). Each translated homepage showed sticky navigation, seven `usecase-*` placements, five `compare-row-*` IDs, `deal-cta`, and `banner-ad-horizontal`. A localization gap was consistently visible: the hero H1 `Best XRP Wallets 2026` and supporting description remained English while navigation, CTAs, and most sections were localized.
- Spanish homepage document height was 16,579 px. Its sticky navigation, hero quiz/compare CTAs, use-case cards, comparison rows, and `deal-cta` were observed. German, French, Japanese, Korean, Portuguese, and Chinese locale titles, heights, placement IDs, and Tangem promo URLs are listed in the JSON.
- Homepage links observed include Tangem promo and ref variants, ELLIPAL `ref` and `rfsn` variants, both requested Trezor offer IDs, and Ledger. See JSON for the exact URLs and placements.
- `/compare/ledger-vs-tangem/?lang=es` returned **200**, hydrated with H1 `Ledger Nano X vs Tangem` and a `verdict-box` selecting Ledger. Spanish navigation/update text coexists with English comparison copy and CTA labels.
- Chinese Tangem mobile review `/wallet/tangem/?lang=zh` returned **200** at 390×844. It exposed `sticky-cta-tangem` and `button-sticky-cta-tangem` fixed at the bottom, linking to `https://tangem.com/zh-Hans/?ref=allthingsxrpl`; the purchase button and review form were not activated.
- One-page GET-only partner confirmations:
  - Coinbase returned **200** at the requested URL but rendered `Can’t find this promotion.` and `We are looking into it now, apologies for the inconvenience.` (`invalid-referral-code` state). No “sign up without reward” action was taken.
  - Magnetic returned **200** but showed PSA software for consulting firms/agencies, not an XRPL DEX; UTM fields were logged as null.
  - KuCoin returned **404** at the supplied referral URL and displayed “Page Not Found.”
  - Sologenic returned **525**, titled `sologenic.com | 525: SSL handshake failed`. Cloudflare reported browser and edge working, but the origin host failed its SSL/TLS handshake.
- The public Cloudflare trace endpoint returned **200** and `loc=US`. Only this country code was retained. The source `client/src/lib/visitorCountry.ts` was read: it requests Cloudflare trace with credentials omitted, no-store, no-referrer, and a 2.5-second abort, and parses the country field only.

## Remaining gaps

- Quiz outcomes Ledger, Xaman DeFi, and default Xaman in French/Japanese/Korean/Portuguese/Chinese were not tested; Tangem was independently verified in all those locales. English, Spanish, and German had all four outcomes verified.
- Merchant navigations not completed: Orchestra, Trezor offers 169/235, Uphold, Kraken, Bitrue, Tangem promo/ref links, and ELLIPAL `ref`/`rfsn`. Their destinations remain unclassified; earlier multi-URL runs hit the browser action cap, and no dead-link conclusion is made.
- The dedicated desktop Tangem review route was not separately inspected; the Chinese mobile review was.
- Automatic country simulation was not performed (optional).

## Runtime notes

The consent manager logged `TypeError: window.__gpp is not a function`, followed by consent initialization/restoration messages. A newsletter overlay appeared during quiz testing and was closed using its close control; no email was entered or submitted. No bot challenge was bypassed. The production app was not edited; the only files changed were the requested JSON and Markdown reports.
