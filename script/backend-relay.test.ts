import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { spawn, execFileSync, type ChildProcess } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { AddressInfo } from "node:net";

// Execute the actual PHP relay through HTTP. CI must have PHP with cURL;
// a missing runtime is a failure, not a silently skipped production check.
describe("Bluehost backend relay", () => {
  let directory: string;
  let upstream: Server;
  let php: ChildProcess;
  let origin: string;
  let seen: { path?: string; method?: string; body?: string; authorization?: string; ip?: string };

  beforeAll(async () => {
    execFileSync("php", ["-l", "deployment/bluehost/backend-relay.php"]);
    execFileSync("php", ["-r", "exit(function_exists('curl_init') ? 0 : 1);"]);
    directory = await mkdtemp(join(tmpdir(), "backend-relay-"));
    upstream = createServer(async (req, res) => {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(Buffer.from(chunk));
      seen = {
        path: req.url,
        method: req.method,
        body: Buffer.concat(chunks).toString(),
        authorization: req.headers.authorization,
        ip: req.headers["x-forwarded-for"] as string,
      };
      const url = new URL(req.url!, "http://upstream");
      if (url.searchParams.has("html")) {
        res.setHeader("Content-Type", "text/html");
        return res.end("<html>SPA fallback</html>");
      }
      if (url.searchParams.has("redirect")) {
        res.writeHead(302, { Location: "https://example.com/" });
        return res.end();
      }
      if (url.searchParams.has("unavailable")) {
        res.writeHead(503, { "Content-Type": "application/json", "Retry-After": "30" });
        return res.end('{"error":"unavailable"}');
      }
      if (url.pathname.startsWith("/og/")) {
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Cache-Control", "public, max-age=3600");
        return res.end(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 255]));
      }
      if (url.pathname.endsWith(".xml")) {
        res.setHeader("Content-Type", "application/xml");
        return res.end('<?xml version="1.0"?><feed/>');
      }
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.statusCode = req.method === "POST" ? 201 : 200;
      res.end('{"success":true,"items":[]}');
    });
    await new Promise<void>((resolve) => upstream.listen(0, "127.0.0.1", resolve));
    const port = (upstream.address() as AddressInfo).port;
    const source = await readFile("deployment/bluehost/backend-relay.php", "utf8");
    // Only the temporary test fixture allows HTTP. Shipped PHP requires TLS.
    await writeFile(join(directory, "router.php"), source
      .replace("https://xrp-review-hub.replit.app", `http://127.0.0.1:${port}`)
      .replace("CURLPROTO_HTTPS", "CURLPROTO_HTTP"));
    const reserved = createServer();
    await new Promise<void>((resolve) => reserved.listen(0, "127.0.0.1", resolve));
    const phpPort = (reserved.address() as AddressInfo).port;
    await new Promise<void>((resolve) => reserved.close(() => resolve()));
    origin = `http://127.0.0.1:${phpPort}`;
    php = spawn("php", ["-S", `127.0.0.1:${phpPort}`, join(directory, "router.php")], {
      stdio: "ignore",
    });
    for (let attempt = 0; attempt < 50; attempt++) {
      try {
        await fetch(origin + "/api/news");
        return;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    throw new Error("PHP relay failed to start");
  }, 15000);

  afterAll(async () => {
    php?.kill();
    if (upstream) {
      upstream.closeAllConnections();
      await new Promise<void>((resolve) => upstream.close(() => resolve()));
    }
    if (directory) await rm(directory, { recursive: true, force: true });
  });

  it.each(["contact", "subscribe", "reviews"])("preserves real %s submissions and upstream status", async (route) => {
    const body = JSON.stringify({ email: "test@example.com", message: "test submission" });
    const response = await fetch(`${origin}/api/${route}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body,
    });
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ success: true, items: [] });
    expect(seen.body).toBe(body);
    expect(seen.method).toBe("POST");
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("preserves query parameters and ignores destination injection", async () => {
    await fetch(origin + "/api/news?limit=5&url=https%3A%2F%2Fevil.example");
    expect(seen.path).toBe("/api/news?limit=5&url=https%3A%2F%2Fevil.example");
  });

  it("forwards moderation auth and overwrites spoofed visitor addresses", async () => {
    const response = await fetch(origin + "/api/admin/reviews/1", {
      method: "DELETE",
      headers: { Authorization: "Bearer test-only", "X-Forwarded-For": "spoofed" },
    });
    expect(response.status).toBe(200);
    expect(seen.authorization).toBe("Bearer test-only");
    expect(seen.ip).toBe("127.0.0.1");
  });

  it.each(["sitemap.xml", "sitemap-wallets.xml", "rss.xml"])("serves %s as XML", async (path) => {
    const response = await fetch(`${origin}/${path}`);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("xml");
    expect(await response.text()).toContain("<feed/>");
  });

  it("preserves PNG bytes, image headers and localized query parameters", async () => {
    const response = await fetch(origin + "/og/wallet.png?slug=ledger&lang=de");
    expect(response.status).toBe(200);
    expect(seen.path).toBe("/og/wallet.png?slug=ledger&lang=de");
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(Buffer.from(await response.arrayBuffer())).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 255]));
  });

  it("supports HEAD without a body", async () => {
    const response = await fetch(origin + "/rss.xml", { method: "HEAD" });
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("");
  });

  it.each(["/api/news?html=1", "/rss.xml?html=1", "/og/page.png?html=1", "/api/news?redirect=1"])(
    "rejects unexpected upstream content at %s", async (path) => {
      const response = await fetch(origin + path);
      expect(response.status).toBe(502);
      expect((await response.json()).error).toMatch(/unexpected/);
    },
  );

  it("preserves backend errors and retry hints", async () => {
    const response = await fetch(origin + "/api/news?unavailable=1");
    expect(response.status).toBe(503);
    expect(response.headers.get("retry-after")).toBe("30");
  });

  it("rejects arbitrary paths and unsupported methods", async () => {
    expect((await fetch(origin + "/backend-relay.php?url=https://example.com")).status).toBe(404);
    expect((await fetch(origin + "/api/news", { method: "POST" })).status).toBe(405);
    expect((await fetch(origin + "/api/contact", { method: "GET" })).status).toBe(405);
  });

  it("limits bodies and requires JSON", async () => {
    expect((await fetch(origin + "/api/contact", {
      method: "POST", body: "x".repeat(65537), headers: { "Content-Type": "application/json" },
    })).status).toBe(413);
    expect((await fetch(origin + "/api/contact", { method: "POST", body: "not JSON" })).status).toBe(415);
  });

  it("keeps the relay before sitemap files and SPA rewrites", async () => {
    const rules = await readFile("client/public/.htaccess", "utf8");
    expect(rules.indexOf("/backend-relay.php [END]")).toBeLessThan(rules.indexOf("RewriteCond %{REQUEST_FILENAME} -f"));
    const build = await readFile("script/build.ts", "utf8");
    expect(build).toContain('process.env.BLUEHOST_DEPLOY === "1"');
  });
});
