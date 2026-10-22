import { afterEach, describe, expect, it, vi } from "vitest";
import { existsSync } from "node:fs";
import { SUPPORTED_SUBSCRIBER_LANGUAGES } from "@shared/schema";

const proxy = vi.hoisted(() => vi.fn());
vi.mock("@replit/connectors-sdk", () => ({
  ReplitConnectors: class { proxy = proxy; },
}));
import { renderWelcomeEmail, sendWelcomeEmail } from "./welcomeEmail";

const magnets = [
  { leadMagnet: "wallet_shortlist", filename: "xrpl-wallet-shortlist", title: "XRPL Wallet Shortlist" },
  { leadMagnet: "wallet_starter_kit", filename: "xrpl-wallet-starter-kit", title: "XRPL Wallet Starter Kit" },
  { leadMagnet: "xrpl_defi_starter_kit", filename: "xrpl-defi-starter-kit", title: "XRPL DeFi Starter Kit" },
  { leadMagnet: "xrpl-defi-starter-kit", filename: "xrpl-defi-starter-kit", title: "XRPL DeFi Starter Kit" },
];
const localizedCases = magnets.flatMap(magnet =>
  SUPPORTED_SUBSCRIBER_LANGUAGES.map(language => ({
    ...magnet,
    language,
    // English PDFs deliberately use the existing unsuffixed filename.
    path: `/downloads/${magnet.filename}${language === "en" ? "" : `.${language}`}.pdf`,
  })),
);
const greetings = {
  en: "Welcome to All Things XRPL",
  es: "Bienvenido a All Things XRPL",
  zh: "欢迎来到 All Things XRPL",
  ja: "All Things XRPL へようこそ",
  ko: "All Things XRPL에 오신 것을 환영합니다",
  pt: "Bem-vindo ao All Things XRPL",
  de: "Willkommen bei All Things XRPL",
  fr: "Bienvenue sur All Things XRPL",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("welcome email delivery", () => {
  it.each(localizedCases)("renders $leadMagnet in $language with its real PDF", ({ leadMagnet, language, path, title }) => {
    const email = renderWelcomeEmail({ leadMagnet, language, baseUrl: "https://example.com///" });
    expect(email).not.toBeNull();
    expect(email?.language).toBe(language);
    expect(email?.subject).toContain(title);
    expect(email?.downloadUrl).toBe(`https://example.com${path}`);
    expect(email?.text).toContain(greetings[language]);
    expect(email?.html).toContain(greetings[language]);
    expect(email?.html).toContain(`<html lang="${language}">`);
    expect(email?.html).toContain(`href="https://example.com${path}"`);
    expect(email?.text).toContain(`https://example.com${path}`);
    expect(email?.text).not.toMatch(/\{(?:asset|description)\}/);
    expect(email?.html).not.toMatch(/\{(?:asset|description)\}/);
    expect(existsSync(`client/public${path}`)).toBe(true);
    if (language !== "en") {
      const english = renderWelcomeEmail({ leadMagnet, language: "en", baseUrl: "https://example.com" });
      expect(email?.subject).not.toBe(english?.subject);
      expect(email?.text).not.toContain("Thanks for grabbing");
    }
  });

  it.each(localizedCases)("sends $leadMagnet in $language through the connected service", async ({ leadMagnet, language, path }) => {
    vi.stubEnv("WELCOME_EMAIL_FROM", "newsletter@example.com");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("PUBLIC_BASE_URL", "https://example.com/");
    proxy.mockResolvedValue(new Response('{"id":"test"}', { status: 200 }));
    expect(await sendWelcomeEmail({ to: "test@example.com", leadMagnet, language })).toBe("sent");
    const payload = JSON.parse(proxy.mock.calls[0][2].body);
    expect(payload.to).toBe("test@example.com");
    expect(payload.text).toContain(greetings[language]);
    expect(payload.html).toContain(`href="https://example.com${path}"`);
  });

  it.each(magnets)("$leadMagnet falls back to English for missing or unsupported languages", ({ leadMagnet, filename }) => {
    for (const language of [undefined, null, "", "xx", "constructor"]) {
      const email = renderWelcomeEmail({ leadMagnet, language, baseUrl: "https://example.com" });
      expect(email?.language).toBe("en");
      expect(email?.downloadUrl).toBe(`https://example.com/downloads/${filename}.pdf`);
    }
  });

  it.each(["unknown", "", "__proto__", "constructor", "toString"])("ignores unsupported magnet %s safely", async leadMagnet => {
    expect(renderWelcomeEmail({ leadMagnet, baseUrl: "https://example.com" })).toBeNull();
    expect(await sendWelcomeEmail({ to: "test@example.com", leadMagnet })).toBe("not_applicable");
    expect(proxy).not.toHaveBeenCalled();
  });

  it("welcomes plain newsletter subscribers without an invented download", () => {
    const email = renderWelcomeEmail({ leadMagnet: "newsletter", baseUrl: "https://allthingsxrpl.com" });
    expect(email?.subject).toBe("Welcome to All Things XRPL");
    expect(email?.text).toContain("Thanks for subscribing");
    expect(email?.text).not.toContain("/downloads/");
  });

  it("retains localized lead-magnet emails", () => {
    const email = renderWelcomeEmail({
      leadMagnet: "wallet_starter_kit", language: "de", baseUrl: "https://allthingsxrpl.com",
    });
    expect(email?.downloadUrl).toContain("starter-kit.de.pdf");
    expect(email?.subject).toContain("bereit");
  });

  it("awaits the connected sending service before reporting sent", async () => {
    vi.stubEnv("WELCOME_EMAIL_FROM", "All Things XRPL <newsletter@example.com>");
    vi.stubEnv("RESEND_API_KEY", "");
    let finish!: (response: Response) => void;
    proxy.mockReturnValue(new Promise<Response>((resolve) => { finish = resolve; }));
    let settled = false;
    const sending = sendWelcomeEmail({ to: "test@example.com", leadMagnet: "newsletter" })
      .then((status) => { settled = true; return status; });
    await Promise.resolve();
    expect(settled).toBe(false);
    expect(proxy).toHaveBeenCalledWith("resend", "/emails", expect.objectContaining({ method: "POST" }));
    finish(new Response('{"id":"test"}', { status: 200 }));
    expect(await sending).toBe("sent");
  });

  it("reports missing sender configuration explicitly", async () => {
    vi.stubEnv("WELCOME_EMAIL_FROM", "");
    expect(await sendWelcomeEmail({ to: "test@example.com", leadMagnet: "newsletter" })).toBe("not_configured");
    expect(proxy).not.toHaveBeenCalled();
  });

  it("reports a provider rejection without losing the signup", async () => {
    vi.stubEnv("WELCOME_EMAIL_FROM", "newsletter@example.com");
    vi.stubEnv("RESEND_API_KEY", "");
    proxy.mockResolvedValue(new Response("rejected", { status: 403 }));
    expect(await sendWelcomeEmail({ to: "test@example.com", leadMagnet: "newsletter" })).toBe("failed");
  });
});
