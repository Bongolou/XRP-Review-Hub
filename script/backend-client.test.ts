import { afterEach, describe, expect, it, vi } from "vitest";
import { apiRequest } from "../client/src/lib/queryClient";
import { fetchAllNews } from "../client/src/lib/fetchNews";
import { insertContactSchema, insertSubscriberSchema } from "../shared/schema";

afterEach(() => vi.unstubAllGlobals());

describe("live backend clients", () => {
  it("never treats a Bluehost SPA fallback as a successful form submission", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<html>SPA</html>", {
      status: 200, headers: { "Content-Type": "text/html" },
    })));
    await expect(apiRequest("POST", "/api/subscribe", { email: "test@example.com" }))
      .rejects.toThrow("unexpected response");
  });

  it("loads the backend-filtered news, not a separate browser RSS service", async () => {
    const items = [{ title: "XRPL headline" }];
    const request = vi.fn().mockResolvedValue(new Response(JSON.stringify({ items }), {
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", request);
    expect(await fetchAllNews()).toEqual(items);
    expect(request).toHaveBeenCalledWith("/api/news?limit=50", expect.anything());
  });

  it("rejects malformed news responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", {
      headers: { "Content-Type": "application/json" },
    })));
    await expect(fetchAllNews()).rejects.toThrow("Invalid news");
  });

  it("requests an upstream refresh when the visitor refreshes news", async () => {
    const request = vi.fn().mockResolvedValue(new Response('{"items":[]}', {
      headers: { "Content-Type": "application/json" },
    }));
    vi.stubGlobal("fetch", request);
    await fetchAllNews({ refresh: true });
    expect(request).toHaveBeenCalledWith("/api/news?limit=50&refresh=1", expect.anything());
  });

  it("validates subscriber email and required contact fields before writing", () => {
    expect(insertSubscriberSchema.safeParse({ email: "not-an-email" }).success).toBe(false);
    expect(insertSubscriberSchema.parse({ email: "TEST@example.com" }).email).toBe("test@example.com");
    expect(insertContactSchema.safeParse({ name: "", email: "invalid", subject: "", message: "" }).success).toBe(false);
  });
});
