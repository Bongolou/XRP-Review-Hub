import type { Language } from "./i18n/translations";

/**
 * Locale-aware affiliate URL rewriter.
 *
 * Background: the link audit (reports/affiliate-link-audit.txt) flags the
 * bare-host Tangem and Crypto.com referral URLs because both destinations
 * 301/302 to a region-specific path. Hard-coding `/en/` or `/us` would force
 * every visitor to English/US regardless of their actual language preference,
 * which is worse for our DE/ES/FR/JA/KO/PT/ZH readers than the current
 * single-hop redirect.
 *
 * Instead, when we render one of these links we look at the visitor's
 * currently-selected i18n language and rewrite to the matching localized path
 * — but only when that path is known to exist on the destination (verified
 * 200 OK). Languages with no matching destination path fall back to the bare
 * host URL so the destination's own geo-redirect can take over.
 *
 * Verified destinations:
 *   - Tangem: en, de, es, fr, ja, ko, pt all serve 200 at `/<lang>/`. The
 *     Chinese site lives at `/zh-Hans/` (the bare `/zh/` 301s there).
 *   - Crypto.com: us, de, es, fr, pt, kr, zh all serve 200. There is no
 *     working Japanese region path (`/jp`, `/ja`, `/jpn` all 404 as of
 *     2026-04-29), so JA visitors fall through to the bare host.
 */

const TANGEM_LANG_PATH: Record<Language, string> = {
  en: "en",
  es: "es",
  de: "de",
  fr: "fr",
  ja: "ja",
  ko: "ko",
  pt: "pt",
  zh: "zh-Hans",
};

const CRYPTOCOM_REGION_PATH: Record<Language, string | null> = {
  en: "us",
  es: "es",
  de: "de",
  fr: "fr",
  pt: "pt",
  ko: "kr",
  zh: "zh",
  // crypto.com has no working Japanese region path; fall back to the bare host
  // so its own geo-redirect handles JA visitors.
  ja: null,
};

const TANGEM_BARE_HOST = /^https:\/\/(?:www\.)?tangem\.com\/(\?[^#]*)?(#.*)?$/;
const CRYPTOCOM_BARE_HOST = /^https:\/\/(?:www\.)?crypto\.com\/?(\?[^#]*)?(#.*)?$/;

export function localizeAffiliateUrl(url: string, language: Language): string {
  const tangem = url.match(TANGEM_BARE_HOST);
  if (tangem) {
    const lang = TANGEM_LANG_PATH[language] ?? "en";
    const query = tangem[1] ?? "";
    const hash = tangem[2] ?? "";
    return `https://tangem.com/${lang}/${query}${hash}`;
  }

  const crypto = url.match(CRYPTOCOM_BARE_HOST);
  if (crypto) {
    const region = CRYPTOCOM_REGION_PATH[language];
    const query = crypto[1] ?? "";
    const hash = crypto[2] ?? "";
    if (region) return `https://crypto.com/${region}${query}${hash}`;
    return url;
  }

  return url;
}
