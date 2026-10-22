/**
 * One lookup per page lifetime, shared across provider/StrictMode remounts.
 * Uses the browser's IP, not the backend/Bluehost relay's IP. Cloudflare's
 * public trace endpoint supports CORS; no cookies, coordinates, or IPs are
 * stored or sent to our server. Only its country field is retained in memory.
 */
let countryRequest: Promise<string | undefined> | undefined;

export function detectVisitorCountry(): Promise<string | undefined> {
  return countryRequest ??= (async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    try {
      const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
        signal: controller.signal,
        credentials: "omit",
        cache: "no-store",
        referrerPolicy: "no-referrer",
      });
      if (!response.ok) throw new Error(`Country lookup returned ${response.status}`);
      const country = (await response.text()).match(/^loc=([A-Z]{2})\r?$/m)?.[1];
      // Cloudflare uses XX for unknown and T1 for Tor (not a country).
      if (!country || country === "XX") throw new Error("Country lookup unavailable");
      return country;
    } catch {
      // Optional enhancement: blocked/offline/timed-out lookups retain the
      // existing language-based URLs, without delaying rendering or navigation.
      return undefined;
    } finally {
      clearTimeout(timeout);
    }
  })();
}
