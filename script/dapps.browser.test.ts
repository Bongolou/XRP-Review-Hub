import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chromium, type Browser, type Page } from "playwright";
import { createServer, type ViteDevServer } from "vite";
import { spawnSync } from "node:child_process";
import { getStaticPageSeo, type StaticPageKey } from "../client/src/lib/i18n/pageSeo";
import type { Language } from "../client/src/lib/i18n/translations";

const languages: Language[] = ["en", "es", "zh", "ja", "ko", "pt", "de", "fr"];

// Use Nix's fully provisioned Chromium on Replit. Elsewhere install the
// Playwright runtime with: npx playwright install --with-deps chromium.
// Deliberately fail (rather than skip coverage) if the browser cannot launch.
function executablePath() {
  const override = process.env.PLAYWRIGHT_CHROMIUM_PATH?.trim();
  if (override) return override;
  const system = spawnSync("which", ["chromium"], { encoding: "utf8" });
  return system.status === 0 ? system.stdout.trim() : undefined;
}

async function expectMetadata(page: Page, language: Language, key: StaticPageKey = "dapps") {
  const seo = getStaticPageSeo(language, key);
  // Read all matching tags, not just the first: duplicate stale tags are a
  // regression too. Poll the DOM because React effects run asynchronously.
  await expect.poll(() => page.evaluate(() => {
    const contents = (selector: string) =>
      Array.from(document.head.querySelectorAll(selector), el => el.getAttribute("content"));
    return {
      title: document.title,
      metaTitle: contents('meta[name="title"]'),
      description: contents('meta[name="description"]'),
      ogTitle: contents('meta[property="og:title"]'),
      ogDescription: contents('meta[property="og:description"]'),
      twitterTitle: contents('meta[name="twitter:title"]'),
      twitterDescription: contents('meta[name="twitter:description"]'),
    };
  }), { timeout: 10_000 }).toEqual({
    title: seo.title,
    metaTitle: [seo.title],
    description: [seo.description],
    ogTitle: [seo.title],
    ogDescription: [seo.description],
    twitterTitle: [seo.title],
    twitterDescription: [seo.description],
  });
}

describe("DApps rendered browser metadata", () => {
  let server: ViteDevServer | undefined;
  let browser: Browser | undefined;
  let baseURL: string;

  beforeAll(async () => {
    // Serve the actual client and its real context/hooks, not a mock fixture.
    // An isolated ephemeral port avoids depending on a running dev workflow.
    server = await createServer({
      server: { host: "127.0.0.1", port: 0, open: false },
    });
    await server.listen();
    const address = server.httpServer!.address();
    if (!address || typeof address === "string") throw new Error("Missing browser-test port");
    baseURL = `http://127.0.0.1:${address.port}`;
    browser = await chromium.launch({
      executablePath: executablePath(),
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  }, 60_000);

  afterAll(async () => {
    await browser?.close();
    await server?.close();
  });

  it.each(languages)("%s: initial render, live language switch, and browser back", async (language) => {
    const context = await browser!.newContext({ viewport: { width: 1440, height: 1000 } });
    try {
      // Fonts, analytics and third-party widgets are irrelevant to these tests.
      await context.route("**/*", route =>
        new URL(route.request().url()).origin === baseURL ? route.continue() : route.abort());
      const page = await context.newPage();
      const path = language === "en" ? "/dapps" : `/dapps?lang=${language}`;
      await page.goto(`${baseURL}${path}`);
      await page.getByTestId("text-dapps-title").waitFor();
      await expectMetadata(page, language);

      // A document-scoped marker proves every subsequent action stays in the
      // same SPA document; a full navigation would lose this property.
      await page.evaluate(() => Reflect.set(window, "__metadataTestDocument", "original"));
      const expectSameDocument = async () =>
        expect(await page.evaluate(() => Reflect.get(window, "__metadataTestDocument"))).toBe("original");

      const nextLanguage = languages[(languages.indexOf(language) + 1) % languages.length];
      await page.getByTestId("language-selector").filter({ visible: true }).first().click();
      await page.getByTestId(`lang-${nextLanguage}`).filter({ visible: true }).click();
      await expectMetadata(page, nextLanguage);
      expect(new URL(page.url()).searchParams.get("lang")).toBe(nextLanguage === "en" ? null : nextLanguage);
      await expectSameDocument();

      // Back through a language-only history entry, including back to English
      // with no query parameter, must restore the original SEO map entry.
      await page.goBack();
      await expectMetadata(page, language);
      expect(new URL(page.url()).pathname + new URL(page.url()).search).toBe(path);
      await expectSameDocument();

      // Also exercise hook cleanup/unmount and re-mount across actual routes.
      await page.getByTestId("link-yield").click();
      await expect.poll(() => new URL(page.url()).pathname).toBe("/yield");
      await expectMetadata(page, language, "yield");
      await expectSameDocument();
      await page.goBack();
      await page.getByTestId("text-dapps-title").waitFor();
      await expectMetadata(page, language);
      expect(new URL(page.url()).pathname).toBe("/dapps");
      await expectSameDocument();
    } finally {
      await context.close();
    }
  }, 60_000);
});
