// Server-side metadata used by /og/wallet.png and /og/exchange.png to render
// 1200x630 share cards. `screenshot` (optional) names a file under
// client/public/screenshots/<file> composed inside a device frame on the
// right of the card; if missing, the card falls back to the logo-only layout.
//
// The slug -> screenshot filename map lives in shared/screenshots.ts so it can
// also be consumed by the wallet/exchange review pages on the client.

import { walletScreenshots, exchangeScreenshots } from "@shared/screenshots";

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
    screenshot: walletScreenshots.xaman,
  },
  ledger: {
    name: "Ledger Nano X",
    tagline: "Industry-standard cold storage for XRP",
    rating: "9.9",
    screenshot: walletScreenshots.ledger,
  },
  crossmark: {
    name: "Crossmark",
    tagline: "Browser-extension wallet for the XRP Ledger",
    rating: "9.5",
    screenshot: walletScreenshots.crossmark,
  },
  tangem: {
    name: "Tangem",
    tagline: "NFC tap-to-sign hardware card",
    rating: "9.4",
    screenshot: walletScreenshots.tangem,
  },
  bifrost: {
    name: "Bifrost Wallet",
    tagline: "Multi-chain XRPL DEX mobile wallet",
    rating: "9.2",
    screenshot: walletScreenshots.bifrost,
  },
  trustwallet: {
    name: "Trust Wallet",
    tagline: "70M-user multi-chain mobile wallet",
    rating: "9.0",
    screenshot: walletScreenshots.trustwallet,
  },
  gatehub: {
    name: "GateHub",
    tagline: "Web wallet with built-in fiat gateway",
    rating: "8.8",
    screenshot: walletScreenshots.gatehub,
  },
  ellipal: {
    name: "ELLIPAL Titan",
    tagline: "Air-gapped, QR-only cold storage",
    rating: "9.4",
    screenshot: walletScreenshots.ellipal,
  },
  trezor: {
    name: "Trezor Safe 3",
    tagline: "Open-source hardware wallet for XRP",
    rating: "9.2",
    screenshot: walletScreenshots.trezor,
  },
  "trezor-safe-5": {
    name: "Trezor Safe 5",
    tagline: "Premium color-touchscreen hardware wallet for XRP",
    rating: "9.5",
    screenshot: walletScreenshots.trezor,
  },
};

export const exchangeCards: Record<string, CardEntry> = {
  uphold: {
    name: "Uphold",
    tagline: "Best XRP-friendly exchange — $20 BTC bonus",
    rating: "4.5",
    screenshot: exchangeScreenshots.uphold,
  },
  bitrue: {
    name: "Bitrue",
    tagline: "XRP base pairs and Power Piggy yield",
    rating: "4.3",
    screenshot: exchangeScreenshots.bitrue,
  },
  kraken: {
    name: "Kraken",
    tagline: "Pro tools, deep liquidity, high security",
    rating: "4.6",
    screenshot: exchangeScreenshots.kraken,
  },
  coinbase: {
    name: "Coinbase",
    tagline: "Most trusted US-based exchange",
    rating: "4.5",
    screenshot: exchangeScreenshots.coinbase,
  },
  bitstamp: {
    name: "Bitstamp",
    tagline: "EU-regulated since 2011, deep liquidity",
    rating: "4.4",
    screenshot: exchangeScreenshots.bitstamp,
  },
  cryptocom: {
    name: "Crypto.com",
    tagline: "250+ coins, Visa card, earn interest",
    rating: "4.3",
    screenshot: exchangeScreenshots.cryptocom,
  },
  kucoin: {
    name: "KuCoin",
    tagline: "800+ coins, trading bots, low fees",
    rating: "4.4",
    screenshot: exchangeScreenshots.kucoin,
  },
};
