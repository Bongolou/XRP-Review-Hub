// Curated app-UI screenshots used both by the OG share-card renderer
// (server/cardData.ts -> /og/wallet.png, /og/exchange.png) and the
// wallet/exchange review hero in the React app. Filenames live under
// client/public/screenshots/<file>.

export const walletScreenshots: Record<string, string> = {
  xaman: "xaman.jpg",
  ledger: "ledger.jpg",
  crossmark: "crossmark.png",
  tangem: "tangem.jpg",
  bifrost: "bifrost.png",
  trustwallet: "trustwallet.webp",
  gatehub: "gatehub.webp",
  ellipal: "ellipal.webp",
  trezor: "trezor.webp",
};

export const exchangeScreenshots: Record<string, string> = {
  uphold: "uphold.png",
  bitrue: "bitrue.webp",
  kraken: "kraken.png",
  coinbase: "coinbase.png",
  bitstamp: "bitstamp.png",
  cryptocom: "cryptocom.webp",
  kucoin: "kucoin.webp",
};

export function walletScreenshotUrl(slug: string): string | null {
  const file = walletScreenshots[slug];
  return file ? `/screenshots/${file}` : null;
}

export function exchangeScreenshotUrl(slug: string): string | null {
  const file = exchangeScreenshots[slug];
  return file ? `/screenshots/${file}` : null;
}
