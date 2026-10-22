import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chromium, type Browser, type Page } from "playwright";
import { createServer, type ViteDevServer } from "vite";
import { spawnSync } from "node:child_process";
import { translations, type Language } from "../client/src/lib/i18n/translations";

const templates = [
  { path: "/wallet/xaman", key: "nav.wallets", parent: "/#wallets", leaf: "Xaman (XUMM)" },
  { path: "/exchange/kraken", key: "nav.exchanges", parent: "/#exchanges", leaf: "Kraken" },
  { path: "/compare/xaman-vs-ledger", key: "nav.compare", parent: "/best-xrp-wallets", leaf: "compare.breadcrumbTitle" },
  { path: "/best-for/beginners", key: "bxw.title", parent: "/best-xrp-wallets", leaf: "bf.beginners.title" },
];
const languages: Language[] = ["en", "es", "zh", "ja", "ko", "pt", "de", "fr"];

async function breadcrumbs(page: Page) {
  return page.locator('script[type="application/ld+json"][data-jsonld-hook]').evaluateAll(
    scripts => scripts.map(s => JSON.parse(s.textContent || "{}"))
      .filter(node => node["@type"] === "BreadcrumbList"),
  );
}

describe("localized template breadcrumbs", () => {
  let server: ViteDevServer;
  let browser: Browser;
  let baseURL: string;

  beforeAll(async () => {
    server = await createServer({ server: { host: "127.0.0.1", port: 0, open: false } });
    await server.listen();
    const address = server.httpServer!.address();
    if (!address || typeof address === "string") throw new Error("Missing test port");
    baseURL = `http://127.0.0.1:${address.port}`;
    const system = spawnSync("which", ["chromium"], { encoding: "utf8" });
    browser = await chromium.launch({
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH?.trim() ||
        (system.status === 0 ? system.stdout.trim() : undefined),
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  }, 60_000);

  afterAll(async () => {
    await browser?.close();
    await server?.close();
  });

  it.each(languages)("emits one valid localized chain per template in %s", async language => {
    const context = await browser.newContext();
    // The review API is unrelated to breadcrumb generation.
    await context.route("**/api/**", route => route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ reviews: [], stats: { count: 0, average: null }, items: [] }),
    }));
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    try {
      for (const template of templates) {
        await page.goto(`${baseURL}${template.path}?lang=${language}`);
        await page.waitForFunction(() =>
          [...document.querySelectorAll('script[data-jsonld-hook]')]
            .some(s => JSON.parse(s.textContent || "{}")["@type"] === "BreadcrumbList"));
        const nodes = await breadcrumbs(page);
        expect(nodes).toHaveLength(1);
        const names = [
          translations[language]["nav.home"],
          translations[language][template.key],
          template.leaf === "compare.breadcrumbTitle"
            ? translations[language][template.leaf]
              .replace("{first}", "Xaman (XUMM)").replace("{second}", "Ledger Nano X")
            : template.leaf.startsWith("bf.") ? translations[language][template.leaf] : template.leaf,
        ];
        const paths = ["/", template.parent, template.path];
        expect(nodes[0]["@context"]).toBe("https://schema.org");
        expect(nodes[0].itemListElement).toEqual(paths.map((path, index) => {
          const url = new URL(path, baseURL);
          if (language !== "en") url.searchParams.set("lang", language);
          expect(names[index]).toBeTruthy();
          return { "@type": "ListItem", position: index + 1, name: names[index], item: url.href };
        }));
        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        expect(nodes[0].itemListElement[2].item).toBe(canonical);
      }
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  }, 60_000);

  it("replaces breadcrumbs on SPA navigation and removes them for invalid slugs", async () => {
    const page = await browser.newPage();
    try {
      await page.goto(`${baseURL}/best-for/beginners?lang=es`);
      await page.waitForSelector('script[data-jsonld-hook^="best-for:"]', { state: "attached" });
      for (const path of ["/best-for/hardware", "/best-for/does-not-exist", "/wallet/does-not-exist", "/exchange/does-not-exist", "/compare/does-not-exist"]) {
        await page.evaluate(path => {
          window.history.pushState({}, "", `${path}?lang=es`);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }, path);
        if (path === "/best-for/hardware") {
          await page.waitForSelector('script[data-jsonld-hook^="best-for:hardware:"]', { state: "attached" });
          expect(await breadcrumbs(page)).toHaveLength(1);
        } else {
          await page.waitForFunction(() =>
            !document.querySelector('script[data-jsonld-hook^="best-for:"]'));
          expect(await breadcrumbs(page)).toHaveLength(0);
        }
      }
    } finally {
      await page.close();
    }
  }, 30_000);
});
