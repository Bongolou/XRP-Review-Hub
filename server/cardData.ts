// Lightweight server-side metadata used to render wallet/exchange OG share
// cards (1200x630) for Google Images, Discover, Twitter/X and Facebook
// previews. The data here is intentionally short — taglines are designed to
// fit the card layout — and matches the slugs declared in server/routes.ts
// (walletSlugs, exchangeSlugs) and the brand logos shipped under
// client/public/logos/<slug>-logo.png.

export type CardEntry = {
  name: string;
  tagline: string;
  rating: string;
};

export const walletCards: Record<string, CardEntry> = {
  xaman: {
    name: "Xaman (XUMM)",
    tagline: "Best mobile wallet for XRPL DEX, AMM and NFTs",
    rating: "9.9",
  },
  ledger: {
    name: "Ledger Nano X",
    tagline: "Industry-standard cold storage for XRP",
    rating: "9.9",
  },
  crossmark: {
    name: "Crossmark",
    tagline: "Browser-extension wallet for the XRP Ledger",
    rating: "9.5",
  },
  tangem: {
    name: "Tangem",
    tagline: "NFC tap-to-sign hardware card",
    rating: "9.4",
  },
  bifrost: {
    name: "Bifrost Wallet",
    tagline: "Multi-chain XRPL DEX mobile wallet",
    rating: "9.2",
  },
  trustwallet: {
    name: "Trust Wallet",
    tagline: "70M-user multi-chain mobile wallet",
    rating: "9.0",
  },
  gatehub: {
    name: "GateHub",
    tagline: "Web wallet with built-in fiat gateway",
    rating: "8.8",
  },
  ellipal: {
    name: "ELLIPAL Titan",
    tagline: "Air-gapped, QR-only cold storage",
    rating: "9.4",
  },
  trezor: {
    name: "Trezor Safe 3",
    tagline: "Open-source hardware wallet for XRP",
    rating: "9.2",
  },
};

export const exchangeCards: Record<string, CardEntry> = {
  uphold: {
    name: "Uphold",
    tagline: "Best XRP-friendly exchange — $20 BTC bonus",
    rating: "4.5",
  },
  bitrue: {
    name: "Bitrue",
    tagline: "XRP base pairs and Power Piggy yield",
    rating: "4.3",
  },
  kraken: {
    name: "Kraken",
    tagline: "Pro tools, deep liquidity, high security",
    rating: "4.6",
  },
  coinbase: {
    name: "Coinbase",
    tagline: "Most trusted US-based exchange",
    rating: "4.5",
  },
  bitstamp: {
    name: "Bitstamp",
    tagline: "EU-regulated since 2011, deep liquidity",
    rating: "4.4",
  },
  cryptocom: {
    name: "Crypto.com",
    tagline: "250+ coins, Visa card, earn interest",
    rating: "4.3",
  },
  kucoin: {
    name: "KuCoin",
    tagline: "800+ coins, trading bots, low fees",
    rating: "4.4",
  },
};
