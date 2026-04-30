import test from "node:test";
import assert from "node:assert/strict";

import {
  registrableDomain,
  isBrandChange,
  classify,
  hostOf,
} from "./audit-affiliate-links.mjs";

test("registrableDomain strips subdomains for plain TLDs", () => {
  assert.equal(registrableDomain("www.tangem.com"), "tangem.com");
  assert.equal(registrableDomain("tangem.com"), "tangem.com");
  assert.equal(registrableDomain("wallet.uphold.com"), "uphold.com");
  assert.equal(registrableDomain("a.b.c.kraken.com"), "kraken.com");
});

test("registrableDomain handles multi-label public suffixes (eTLD+1)", () => {
  assert.equal(registrableDomain("example.co.uk"), "example.co.uk");
  assert.equal(registrableDomain("www.example.co.uk"), "example.co.uk");
  assert.equal(registrableDomain("foo.bar.co.uk"), "bar.co.uk");
  assert.equal(registrableDomain("shop.example.com.au"), "example.com.au");
  assert.equal(registrableDomain("example.co.jp"), "example.co.jp");
});

test("registrableDomain falls back conservatively for hosts with no eTLD+1", () => {
  assert.equal(registrableDomain(""), "");
  assert.equal(registrableDomain("localhost"), "localhost");
  assert.equal(registrableDomain("192.168.1.1"), "192.168.1.1");
  // IPv6 literals contain `:` and should be returned as-is.
  assert.equal(registrableDomain("::1"), "::1");
  assert.equal(
    registrableDomain("2001:db8::1"),
    "2001:db8::1",
  );
});

test("registrableDomain is case-insensitive", () => {
  assert.equal(registrableDomain("WWW.Tangem.COM"), "tangem.com");
});

test("isBrandChange flags a true brand swap", () => {
  // The original motivating regression: xrplorer.com now silently lands on
  // inftf.org. That must read as a brand change, not a benign redirect.
  assert.equal(
    isBrandChange("https://xrplorer.com/", "https://inftf.org/"),
    true,
  );
});

test("isBrandChange treats subdomain / trailing-slash redirects as same brand", () => {
  assert.equal(
    isBrandChange("https://tangem.com/", "https://tangem.com/en/"),
    false,
  );
  assert.equal(
    isBrandChange("https://kraken.com/", "https://www.kraken.com/"),
    false,
  );
  assert.equal(
    isBrandChange("https://uphold.com/", "https://wallet.uphold.com/"),
    false,
  );
});

test("isBrandChange respects multi-label public suffixes", () => {
  assert.equal(
    isBrandChange("https://example.co.uk/", "https://www.example.co.uk/"),
    false,
  );
  assert.equal(
    isBrandChange("https://foo.co.uk/", "https://bar.co.uk/"),
    true,
  );
});

test("isBrandChange returns false when either host can't be parsed", () => {
  assert.equal(isBrandChange("not a url", "https://example.com/"), false);
  assert.equal(isBrandChange("https://example.com/", "also not a url"), false);
});

test("hostOf returns hostname or empty string", () => {
  assert.equal(hostOf("https://www.tangem.com/en/"), "www.tangem.com");
  assert.equal(hostOf("not a url"), "");
});

// classify is the function that decides whether a result is OK / redirected /
// brand-change / broken / ignored. The tests below construct probe-result
// shapes by hand instead of doing real network calls.

function probeResult({ url, finalUrl, finalStatus, chain, ...rest }) {
  return {
    url,
    finalUrl: finalUrl ?? url,
    finalStatus,
    chain: chain ?? [{ url: finalUrl ?? url, status: finalStatus }],
    ...rest,
  };
}

test("classify: 200 with no redirect is ok", () => {
  const r = probeResult({
    url: "https://tangem.com/",
    finalStatus: 200,
  });
  assert.equal(classify(r), "ok");
});

test("classify: 200 after a same-brand redirect is redirected", () => {
  const r = probeResult({
    url: "https://tangem.com/",
    finalUrl: "https://tangem.com/en/",
    finalStatus: 200,
    chain: [
      { url: "https://tangem.com/", status: 301 },
      { url: "https://tangem.com/en/", status: 200 },
    ],
  });
  assert.equal(classify(r), "redirected");
});

test("classify: 200 after a brand-change redirect is brand-change", () => {
  const r = probeResult({
    url: "https://xrplorer.com/",
    finalUrl: "https://inftf.org/",
    finalStatus: 200,
    chain: [
      { url: "https://xrplorer.com/", status: 301 },
      { url: "https://inftf.org/", status: 200 },
    ],
  });
  assert.equal(classify(r), "brand-change");
});

test("classify: subdomain redirect on the same brand is not brand-change", () => {
  const r = probeResult({
    url: "https://uphold.com/",
    finalUrl: "https://wallet.uphold.com/",
    finalStatus: 200,
    chain: [
      { url: "https://uphold.com/", status: 302 },
      { url: "https://wallet.uphold.com/", status: 200 },
    ],
  });
  assert.equal(classify(r), "redirected");
});

test("classify: same-brand redirect under a multi-label TLD is not brand-change", () => {
  const r = probeResult({
    url: "https://example.co.uk/",
    finalUrl: "https://www.example.co.uk/",
    finalStatus: 200,
    chain: [
      { url: "https://example.co.uk/", status: 301 },
      { url: "https://www.example.co.uk/", status: 200 },
    ],
  });
  assert.equal(classify(r), "redirected");
});

test("classify: brand-change under a multi-label TLD is brand-change", () => {
  const r = probeResult({
    url: "https://foo.co.uk/",
    finalUrl: "https://bar.co.uk/",
    finalStatus: 200,
    chain: [
      { url: "https://foo.co.uk/", status: 301 },
      { url: "https://bar.co.uk/", status: 200 },
    ],
  });
  assert.equal(classify(r), "brand-change");
});

test("classify: 4xx is broken", () => {
  const r = probeResult({
    url: "https://example.com/missing",
    finalStatus: 404,
  });
  assert.equal(classify(r), "broken");
});

test("classify: 403 from a known anti-bot host is ignored", () => {
  const r = probeResult({
    url: "https://tangem.com/",
    finalStatus: 403,
  });
  assert.equal(classify(r), "ignored");
});

test("classify: 403 from an unknown host is broken", () => {
  const r = probeResult({
    url: "https://example.com/",
    finalStatus: 403,
  });
  assert.equal(classify(r), "broken");
});

test("classify: network error is broken", () => {
  const r = probeResult({
    url: "https://example.com/",
    finalStatus: 0,
    chain: [],
    error: "ECONNRESET",
  });
  assert.equal(classify(r), "broken");
});

test("classify: too many redirects is broken", () => {
  const r = probeResult({
    url: "https://example.com/",
    finalStatus: 301,
    tooManyRedirects: true,
  });
  assert.equal(classify(r), "broken");
});
