import { afterEach, describe, expect, it, vi } from "vitest";

const proxy = vi.hoisted(() => vi.fn());
vi.mock("@replit/connectors-sdk", () => ({
  ReplitConnectors: class { proxy = proxy; },
}));
import { renderWelcomeEmail, sendWelcomeEmail } from "./welcomeEmail";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("welcome email delivery", () => {
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
