import { afterEach, describe, expect, it, vi } from "vitest";
import { localizeAffiliateUrl } from "../client/src/lib/affiliateLinks";

describe("country-aware Crypto.com URLs", () => {
  it.each([
    ["US", "us"], ["GB", "uk"], ["ca", "ca"], [" AU ", "au"],
    ["SG", "sg"], ["DE", "en-de"], ["BR", "en-br"], ["AE", "en-ae"],
    ["KR", "en-kr"], ["AT", "at"], ["PT", "pt"], ["GR", "el"],
    ["IE", "eea"], ["SE", "eea"],
  ])("routes %s to /%s and preserves referral data", (country, path) => {
    expect(localizeAffiliateUrl("https://crypto.com/?ref=a%2Bb&utm_source=x#signup", "fr", country))
      .toBe(`https://crypto.com/${path}?ref=a%2Bb&utm_source=x#signup`);
  });

  it.each([undefined, null, "", "XX", "T1", "JP", "ZZ", "__proto__", "constructor"])(
    "retains language fallback for unsupported country %s", country => {
      expect(localizeAffiliateUrl("https://crypto.com/?ref=123", "de", country))
        .toBe("https://crypto.com/de?ref=123");
      expect(localizeAffiliateUrl("https://crypto.com/?ref=123", "ja", country))
        .toBe("https://crypto.com/?ref=123");
    },
  );

  it("leaves Tangem language-based and unrelated/already-localized URLs untouched", () => {
    expect(localizeAffiliateUrl("https://tangem.com/en/?ref=a#b", "zh", "GB"))
      .toBe("https://tangem.com/zh-Hans/?ref=a#b");
    for (const url of ["https://crypto.com/ca?ref=a", "https://crypto.com.evil.test/", "https://ledger.com/"]) {
      expect(localizeAffiliateUrl(url, "fr", "GB")).toBe(url);
    }
  });
});

describe("optional one-shot visitor country lookup", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
    vi.resetModules();
  });

  it("shares a request and retains only the country field", async () => {
    const request = vi.fn().mockResolvedValue(new Response("ip=not-retained\nloc=GB\ncolo=LHR\n"));
    vi.stubGlobal("fetch", request);
    const { detectVisitorCountry } = await import("../client/src/lib/visitorCountry");
    expect(await Promise.all([detectVisitorCountry(), detectVisitorCountry()])).toEqual(["GB", "GB"]);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith("https://www.cloudflare.com/cdn-cgi/trace", expect.objectContaining({
      credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer",
    }));
  });

  it.each(["loc=XX\n", "loc=T1\n", "<html>SPA</html>", "loc=us\n"])(
    "ignores unknown or malformed responses: %s", async body => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(body)));
      const { detectVisitorCountry } = await import("../client/src/lib/visitorCountry");
      expect(await detectVisitorCountry()).toBeUndefined();
    },
  );

  it("does not retry a blocked lookup", async () => {
    const request = vi.fn().mockRejectedValue(new TypeError("Network blocked"));
    vi.stubGlobal("fetch", request);
    const { detectVisitorCountry } = await import("../client/src/lib/visitorCountry");
    expect(await detectVisitorCountry()).toBeUndefined();
    expect(await detectVisitorCountry()).toBeUndefined();
    expect(request).toHaveBeenCalledTimes(1);
  });

  it("aborts a stalled lookup after 2.5 seconds", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_url, { signal }: RequestInit) =>
      new Promise((_resolve, reject) => signal?.addEventListener("abort", () => reject(new Error("aborted"))))));
    const { detectVisitorCountry } = await import("../client/src/lib/visitorCountry");
    const result = detectVisitorCountry();
    await vi.advanceTimersByTimeAsync(2500);
    expect(await result).toBeUndefined();
  });
});
