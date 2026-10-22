import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chromium, type Browser, type BrowserContext } from "playwright";
import { createServer, type ViteDevServer } from "vite";
import { spawnSync } from "node:child_process";

describe("visitor-country affiliate routing in the real client", () => {
  let server: ViteDevServer;
  let browser: Browser;
  let origin: string;
  const trace = "https://www.cloudflare.com/cdn-cgi/trace";
  const cryptoLinks = 'a[href^="https://crypto.com/"]';

  beforeAll(async () => {
    server = await createServer({ server: { host: "127.0.0.1", port: 0, open: false } });
    await server.listen();
    const address = server.httpServer!.address();
    if (!address || typeof address === "string") throw new Error("Missing client port");
    origin = `http://127.0.0.1:${address.port}`;
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

  async function context(stored?: string): Promise<BrowserContext> {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      storageState: { cookies: [], origins: [{
        origin, localStorage: stored ? [{ name: "allthingsxrpl_language", value: stored }] : [],
      }] },
    });
    await ctx.route("**/*", route =>
      new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    return ctx;
  }

  it("renders before lookup completes, then updates all Crypto.com links once", async () => {
    const ctx = await context();
    let finish!: () => Promise<void>;
    let requests = 0;
    await ctx.route(trace, route => {
      requests++;
      if (requests > 1) return route.fulfill({ body: "loc=GB\n", contentType: "text/plain" });
      finish = () => route.fulfill({ body: "loc=GB\n", contentType: "text/plain" });
    });
    try {
      const page = await ctx.newPage();
      await page.goto(`${origin}/`);
      await expect.poll(() => requests).toBe(1);
      await expect.poll(() => page.locator(cryptoLinks).first().getAttribute("href")).toBe("https://crypto.com/us");
      await finish();
      await expect.poll(() => page.locator(cryptoLinks).evaluateAll(links =>
        links.map(link => link.getAttribute("href")))).toEqual(["https://crypto.com/uk"]);
      expect(await page.locator("html").getAttribute("lang")).toBe("en");
      await page.goto(`${origin}/exchange/cryptocom`);
      await expect.poll(() => page.locator(cryptoLinks).count()).toBeGreaterThan(0);
      await expect.poll(() => page.locator(cryptoLinks).evaluateAll(links =>
        links.every(link => link.getAttribute("href") === "https://crypto.com/uk"))).toBe(true);
    } finally { await ctx.close(); }
  }, 30_000);

  it.each([
    { stored: "en", query: "", path: "us" },
    { stored: "de", query: "", path: "de" },
    { stored: undefined, query: "?lang=en", path: "us" },
    { stored: "de", query: "?lang=fr", path: "fr" },
  ])("skips lookup for explicit preference $stored $query", async ({ stored, query, path }) => {
    const ctx = await context(stored);
    let requests = 0;
    await ctx.route(trace, route => { requests++; return route.fulfill({ body: "loc=GB\n" }); });
    try {
      const page = await ctx.newPage();
      await page.goto(`${origin}/${query}`);
      await expect.poll(() => page.locator(cryptoLinks).first().getAttribute("href"))
        .toBe(`https://crypto.com/${path}`);
      expect(requests).toBe(0);
    } finally { await ctx.close(); }
  }, 30_000);

  it("ignores a late lookup after a language choice, including explicit English on reload", async () => {
    const ctx = await context();
    let finish!: () => Promise<void>;
    await ctx.route(trace, route => {
      finish = () => route.fulfill({ body: "loc=CA\n", contentType: "text/plain" });
    });
    try {
      const page = await ctx.newPage();
      await page.goto(`${origin}/`);
      await expect.poll(() => typeof finish).toBe("function");
      await page.getByTestId("language-selector").filter({ visible: true }).first().click();
      await page.getByTestId("lang-en").filter({ visible: true }).click();
      await finish();
      await expect.poll(() => page.evaluate(() => localStorage.getItem("allthingsxrpl_language"))).toBe("en");
      await expect.poll(() => page.locator(cryptoLinks).first().getAttribute("href")).toBe("https://crypto.com/us");
      await page.reload();
      await expect.poll(() => page.locator(cryptoLinks).first().getAttribute("href")).toBe("https://crypto.com/us");
    } finally { await ctx.close(); }
  }, 30_000);

  it("retains usable links when the optional lookup is blocked", async () => {
    const ctx = await context();
    try {
      const page = await ctx.newPage();
      await page.goto(`${origin}/`);
      await expect.poll(() => page.locator(cryptoLinks).first().getAttribute("href")).toBe("https://crypto.com/us");
    } finally { await ctx.close(); }
  }, 30_000);
});
