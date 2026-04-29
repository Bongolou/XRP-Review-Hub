// Server-side metadata used by /og/wallet.png and /og/exchange.png to render
// 1200x630 share cards. `screenshot` (optional) names a file under
// client/public/screenshots/<file> composed inside a device frame on the
// right of the card; if missing, the card falls back to the logo-only layout.

export type CardEntry = {
  name: string;
  tagline: string;
  rating: string;
  screenshot?: string;
};

export const walletCards: Record<string, CardEntry> = {
  xaman: {
    name: "Xaman (XUMM)",
    tagline: "Best mobile wallet for XRPL DEX, AMM and NFTs",
    rating: "9.9",
    screenshot: "xaman.jpg",
  },
  ledger: {
    name: "Ledger Nano X",
    tagline: "Industry-standard cold storage for XRP",
    rating: "9.9",
    screenshot: "ledger.jpg",
  },
  crossmark: {
    name: "Crossmark",
    tagline: "Browser-extension wallet for the XRP Ledger",
    rating: "9.5",
    screenshot: "crossmark.png",
  },
  tangem: {
    name: "Tangem",
    tagline: "NFC tap-to-sign hardware card",
    rating: "9.4",
    screenshot: "tangem.jpg",
  },
  bifrost: {
    name: "Bifrost Wallet",
    tagline: "Multi-chain XRPL DEX mobile wallet",
    rating: "9.2",
    screenshot: "bifrost.png",
  },
  trustwallet: {
    name: "Trust Wallet",
    tagline: "70M-user multi-chain mobile wallet",
    rating: "9.0",
    screenshot: "trustwallet.webp",
  },
  gatehub: {
    name: "GateHub",
    tagline: "Web wallet with built-in fiat gateway",
    rating: "8.8",
    screenshot: "gatehub.webp",
  },
  ellipal: {
    name: "ELLIPAL Titan",
    tagline: "Air-gapped, QR-only cold storage",
    rating: "9.4",
    screenshot: "ellipal.webp",
  },
  trezor: {
    name: "Trezor Safe 3",
    tagline: "Open-source hardware wallet for XRP",
    rating: "9.2",
    screenshot: "trezor.webp",
  },
};

export const exchangeCards: Record<string, CardEntry> = {
  uphold: {
    name: "Uphold",
    tagline: "Best XRP-friendly exchange — $20 BTC bonus",
    rating: "4.5",
    screenshot: "uphold.png",
  },
  bitrue: {
    name: "Bitrue",
    tagline: "XRP base pairs and Power Piggy yield",
    rating: "4.3",
    screenshot: "bitrue.webp",
  },
  kraken: {
    name: "Kraken",
    tagline: "Pro tools, deep liquidity, high security",
    rating: "4.6",
    screenshot: "kraken.png",
  },
  coinbase: {
    name: "Coinbase",
    tagline: "Most trusted US-based exchange",
    rating: "4.5",
    screenshot: "coinbase.png",
  },
  bitstamp: {
    name: "Bitstamp",
    tagline: "EU-regulated since 2011, deep liquidity",
    rating: "4.4",
    screenshot: "bitstamp.png",
  },
  cryptocom: {
    name: "Crypto.com",
    tagline: "250+ coins, Visa card, earn interest",
    rating: "4.3",
    screenshot: "cryptocom.webp",
  },
  kucoin: {
    name: "KuCoin",
    tagline: "800+ coins, trading bots, low fees",
    rating: "4.4",
    screenshot: "kucoin.webp",
  },
};
