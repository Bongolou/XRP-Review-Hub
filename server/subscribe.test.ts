import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import express from "express";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { SUPPORTED_SUBSCRIBER_LANGUAGES } from "@shared/schema";

const { proxy, getSubscriberByEmail, createSubscriber } = vi.hoisted(() => ({
  proxy: vi.fn(),
  getSubscriberByEmail: vi.fn(),
  createSubscriber: vi.fn(),
}));
vi.mock("@replit/connectors-sdk", () => ({
  ReplitConnectors: class { proxy = proxy; },
}));
vi.mock("./storage", () => ({
  storage: { getSubscriberByEmail, createSubscriber },
}));
import { registerRoutes } from "./routes";

describe("localized subscription delivery", () => {
  const app = express();
  const server = createServer(app);
  let baseUrl: string;

  beforeAll(async () => {
    app.use(express.json());
    await registerRoutes(server, app);
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  beforeEach(() => {
    vi.stubEnv("WELCOME_EMAIL_FROM", "newsletter@example.com");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("PUBLIC_BASE_URL", baseUrl);
    getSubscriberByEmail.mockResolvedValue(undefined);
    createSubscriber.mockResolvedValue({ id: 1 });
    proxy.mockImplementation(async () => new Response('{"id":"test"}', { status: 200 }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  });

  const cases = [
    ["wallet_starter_kit", "xrpl-wallet-starter-kit"],
    ["xrpl_defi_starter_kit", "xrpl-defi-starter-kit"],
    ["xrpl-defi-starter-kit", "xrpl-defi-starter-kit"],
    ["wallet_shortlist", "xrpl-wallet-shortlist"],
  ].flatMap(([leadMagnet, filename]) => SUPPORTED_SUBSCRIBER_LANGUAGES.map(language => ({
    leadMagnet, filename, language,
  })));

  it.each(cases)("subscribes and emails $leadMagnet in $language with a working download", async ({ leadMagnet, filename, language }) => {
    const data = { email: "test@example.com", source: "lead-magnet-form", leadMagnet, language };
    const response = await fetch(`${baseUrl}/api/subscribe`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ success: true, emailStatus: "sent" });
    expect(createSubscriber).toHaveBeenCalledWith(data);
    expect(proxy).toHaveBeenCalledTimes(1);
    const sent = JSON.parse(proxy.mock.calls[0][2].body);
    const path = `/downloads/${filename}${language === "en" ? "" : `.${language}`}.pdf`;
    expect(sent.to).toBe(data.email);
    expect(sent.html).toContain(`<html lang="${language}">`);
    expect(sent.html).toContain(`href="${baseUrl}${path}"`);
    expect(sent.text).toContain(`${baseUrl}${path}`);
    const download = await fetch(`${baseUrl}${path}`);
    expect(download.status).toBe(200);
    expect(download.headers.get("content-type")).toContain("application/pdf");
    const bytes = Buffer.from(await download.arrayBuffer());
    expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  });

  it("does not resend to existing subscribers", async () => {
    getSubscriberByEmail.mockResolvedValue({ id: 1 });
    const response = await fetch(`${baseUrl}/api/subscribe`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", leadMagnet: "wallet_starter_kit", language: "ja" }),
    });
    expect(response.status).toBe(200);
    expect(proxy).not.toHaveBeenCalled();
    expect(createSubscriber).not.toHaveBeenCalled();
  });
});
