import { describe, it, expect } from "vitest";
import { localizeAffiliateUrl } from "./affiliateLinks";
import { languageNames, type Language } from "./i18n/translations";

// Keep expectations independent of the implementation's merchant mappings.
const destinations: Record<Language, { tangem: string; crypto: string | null }> = {
  en: { tangem: "en", crypto: "us" },
  es: { tangem: "es", crypto: "es" },
  zh: { tangem: "zh-Hans", crypto: "zh" },
  ja: { tangem: "ja", crypto: null },
  ko: { tangem: "ko", crypto: "kr" },
  pt: { tangem: "pt", crypto: "pt" },
  de: { tangem: "de", crypto: "de" },
  fr: { tangem: "fr", crypto: "fr" },
};
const languages = Object.keys(destinations) as Language[];
const tracking = "?ref=partner%2F123&campaign=wallets#buy";

describe("localizeAffiliateUrl", () => {
  it("covers every supported UI language", () => {
    expect([...languages].sort()).toEqual(Object.keys(languageNames).sort());
  });

  describe.each(languages)("%s language", (language) => {
    const { tangem, crypto } = destinations[language];

    it.each([
      "https://tangem.com/",
      "https://www.tangem.com/",
      "https://tangem.com/en/",
      "https://www.tangem.com/en",
    ])("localizes Tangem source %s without losing tracking or fragments", (source) => {
      expect(localizeAffiliateUrl(`${source}${tracking}`, language))
        .toBe(`https://tangem.com/${tangem}/${tracking}`);
    });

    it.each([
      "https://crypto.com",
      "https://crypto.com/",
      "https://www.crypto.com/",
    ])("localizes Crypto.com source %s, or retains the JA fallback", (source) => {
      const url = `${source}${tracking}`;
      expect(localizeAffiliateUrl(url, language))
        .toBe(crypto ? `https://crypto.com/${crypto}${tracking}` : url);
    });
  });

  it.each([
    ["https://tangem.com/", "https://tangem.com/de/"],
    ["https://tangem.com/en/", "https://tangem.com/de/"],
    ["https://crypto.com/", "https://crypto.com/de"],
  ])("handles %s without query or fragment", (source, expected) => {
    expect(localizeAffiliateUrl(source, "de")).toBe(expected);
  });

  it.each([
    ["https://tangem.com/#buy", "https://tangem.com/fr/#buy"],
    ["https://crypto.com/#buy", "https://crypto.com/fr#buy"],
  ])("preserves a fragment without a query in %s", (source, expected) => {
    expect(localizeAffiliateUrl(source, "fr")).toBe(expected);
  });

  it.each([
    "https://tangem.com/de/",
    "https://www.tangem.com/zh-Hans/",
    "https://crypto.com/us",
    "https://www.crypto.com/kr/",
    "https://crypto.com/en-de",
  ])("leaves an already-localized URL unchanged: %s", (source) => {
    const url = `${source}${tracking}`;
    expect(localizeAffiliateUrl(url, "es", "GB")).toBe(url);
  });

  it.each([
    "https://ledger.com/",
    "https://example.com/",
    "https://tangem.com.example.com/",
    "https://crypto.com.example.com/",
    "https://tangem.com/shop/",
    "https://crypto.com/exchange",
    "/wallet/tangem",
    "not-a-url",
  ])("passes unrelated URLs and non-landing paths through unchanged: %s", (source) => {
    const url = `${source}${tracking}`;
    expect(localizeAffiliateUrl(url, "de")).toBe(url);
  });

  describe("country overrides", () => {
    it.each([
      ["GB", "uk"],
      [" de ", "en-de"],
      ["KR", "en-kr"],
      ["GR", "el"],
      ["BE", "eea"],
    ])("uses the advertised Crypto.com region for %s", (country, region) => {
      expect(localizeAffiliateUrl(`https://crypto.com/${tracking}`, "en", country))
        .toBe(`https://crypto.com/${region}${tracking}`);
    });

    it.each([undefined, null, "", "JP", "ZZ", "constructor", "__proto__"])(
      "keeps the language mapping when country %s has no override",
      (country) => {
        expect(localizeAffiliateUrl(`https://crypto.com/${tracking}`, "ko", country))
          .toBe(`https://crypto.com/kr${tracking}`);
      },
    );

    it("retains the Japanese bare-host fallback for an unsupported country", () => {
      const url = `https://www.crypto.com/${tracking}`;
      expect(localizeAffiliateUrl(url, "ja", "JP")).toBe(url);
    });

    it("does not let a country override Tangem's selected language", () => {
      expect(localizeAffiliateUrl(`https://tangem.com/${tracking}`, "ja", "GB"))
        .toBe(`https://tangem.com/ja/${tracking}`);
    });
  });
});
