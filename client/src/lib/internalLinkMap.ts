export type RelatedLink = {
  href: string;
  title: string;
  description?: string;
  badge?: string;
};

type RelatedSet = RelatedLink[];

export const RELATED_BY_WALLET: Record<string, RelatedSet> = {
  xaman: [
    { href: "/best-for/defi", title: "Best XRP wallets for DeFi", description: "Wallets built for the XRPL DEX, AMM and dApps.", badge: "Best-for guide" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "The hardware wallet most XRP holders pair with Xaman.", badge: "Companion review" },
    { href: "/compare/xaman-vs-ledger", title: "Xaman vs Ledger", description: "Software vs hardware: which one (or both) for XRP?", badge: "Comparison" },
    { href: "/blog/15", title: "Your first XRPL trustline", description: "Set up trustlines and unlock XRPL token trading.", badge: "Guide" },
  ],
  ledger: [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "Cold-storage picks ranked by editor.", badge: "Best-for guide" },
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Multi-device strategies for serious holdings.", badge: "Best-for guide" },
    { href: "/compare/xaman-vs-ledger", title: "Xaman vs Ledger", description: "Pair Ledger with Xaman for the best of both worlds.", badge: "Comparison" },
    { href: "/blog/16", title: "Hardware wallet buying guide", description: "How to choose a hardware wallet for XRP in 2026.", badge: "Guide" },
  ],
  tangem: [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "Where Tangem ranks against Ledger and Trezor.", badge: "Best-for guide" },
    { href: "/compare/ledger-vs-tangem", title: "Ledger vs Tangem", description: "Two very different cold-storage philosophies.", badge: "Comparison" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "The benchmark hardware wallet for XRP.", badge: "Alternative" },
    { href: "/blog/16", title: "Hardware wallet buying guide", description: "Card vs USB vs air-gapped — which is right for you?", badge: "Guide" },
  ],
  trezor: [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "How Trezor stacks up against Ledger and Tangem.", badge: "Best-for guide" },
    { href: "/wallet/trezor-safe-5", title: "Trezor Safe 5 review", description: "The flagship Trezor with a colour touchscreen.", badge: "Companion review" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "Trezor's main hardware competitor for XRP.", badge: "Alternative" },
    { href: "/blog/16", title: "Hardware wallet buying guide", description: "Open-source vs Secure Element trade-offs explained.", badge: "Guide" },
  ],
  "trezor-safe-5": [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "Where the Safe 5 ranks against Ledger and Tangem.", badge: "Best-for guide" },
    { href: "/wallet/trezor", title: "Trezor Safe 3 review", description: "The cheaper Trezor — same security, simpler screen.", badge: "Companion review" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "The closest direct rival to the Safe 5.", badge: "Alternative" },
    { href: "/blog/16", title: "Hardware wallet buying guide", description: "Choosing between flagship hardware wallets in 2026.", badge: "Guide" },
  ],
  ellipal: [
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Air-gapped and multi-device strategies.", badge: "Best-for guide" },
    { href: "/compare/ellipal-vs-ledger", title: "ELLIPAL vs Ledger", description: "Air-gapped Titan vs Bluetooth Nano X.", badge: "Comparison" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "ELLIPAL's main cold-storage competitor.", badge: "Alternative" },
    { href: "/blog/3", title: "Self-custody security best practices", description: "Operational security for cold-storage holders.", badge: "Guide" },
  ],
  crossmark: [
    { href: "/best-for/defi", title: "Best XRP wallets for DeFi", description: "Browser-extension picks for desktop XRPL DeFi.", badge: "Best-for guide" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The mobile counterpart most Crossmark users pair with.", badge: "Companion review" },
    { href: "/dapps", title: "XRPL dApps directory", description: "All the dApps you can sign with Crossmark.", badge: "Hub" },
    { href: "/blog/13", title: "XRPL Hooks explained", description: "Smart-contract-style logic Crossmark users care about.", badge: "Guide" },
  ],
  bifrost: [
    { href: "/best-for/defi", title: "Best XRP wallets for DeFi", description: "Where Bifrost ranks against Xaman and Crossmark.", badge: "Best-for guide" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The XRPL-native alternative to Bifrost.", badge: "Alternative" },
    { href: "/compare/bifrost-vs-xaman", title: "Bifrost vs Xaman", description: "Multi-chain mobile vs XRPL-native flagship.", badge: "Comparison" },
    { href: "/dapps", title: "XRPL dApps directory", description: "All the XRPL dApps Bifrost can connect to.", badge: "Hub" },
  ],
  gatehub: [
    { href: "/best-for/beginners", title: "Best XRP wallets for beginners", description: "GateHub's place in the easiest-to-use rankings.", badge: "Best-for guide" },
    { href: "/getting-started", title: "How to buy XRP", description: "Pair GateHub with the right on-ramp for you.", badge: "Guide" },
    { href: "/exchange/bitstamp", title: "Bitstamp review", description: "GateHub integrates with Bitstamp for fiat funding.", badge: "Exchange" },
    { href: "/compare/gatehub-vs-xaman", title: "GateHub vs Xaman", description: "Web wallet vs mobile XRPL flagship.", badge: "Comparison" },
  ],
  trustwallet: [
    { href: "/best-for/beginners", title: "Best XRP wallets for beginners", description: "How Trust Wallet compares for newcomers.", badge: "Best-for guide" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The XRPL-native alternative for serious users.", badge: "Alternative" },
    { href: "/compare/trustwallet-vs-xaman", title: "Trust Wallet vs Xaman", description: "Multi-chain breadth vs XRPL depth.", badge: "Comparison" },
    { href: "/dapps", title: "XRPL dApps directory", description: "Curated XRPL dApps you can use with Trust Wallet.", badge: "Hub" },
  ],
};

export const RELATED_BY_EXCHANGE: Record<string, RelatedSet> = {
  uphold: [
    { href: "/getting-started", title: "How to buy XRP", description: "Step-by-step Uphold walkthrough for new buyers.", badge: "Guide" },
    { href: "/best-for/safest", title: "Best exchanges for buy-and-hold", description: "Where Uphold ranks against Kraken and Bitstamp.", badge: "Best-for guide" },
    { href: "/yield", title: "Compare XRP yield options", description: "Uphold's earn rates vs Bitrue and Kraken.", badge: "Hub" },
    { href: "/exchange/kraken", title: "Kraken review", description: "Uphold's main US-friendly competitor.", badge: "Alternative" },
  ],
  bitrue: [
    { href: "/yield", title: "Compare XRP yield options", description: "How Bitrue's Power Piggy compares to other earn products.", badge: "Hub" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Pair Bitrue with the right on-chain wallet.", badge: "Best-for guide" },
    { href: "/exchange/kraken", title: "Kraken review", description: "Higher-trust alternative for buy-and-hold investors.", badge: "Alternative" },
    { href: "/blog/2", title: "AMM staking rewards explained", description: "Why XRPL AMMs often beat exchange earn rates.", badge: "Guide" },
  ],
  kraken: [
    { href: "/best-for/safest", title: "Best exchanges for buy-and-hold", description: "Kraken's spot among the most trusted venues.", badge: "Best-for guide" },
    { href: "/compare/coinbase-vs-kraken", title: "Coinbase vs Kraken", description: "The two biggest US-friendly XRP exchanges, ranked.", badge: "Comparison" },
    { href: "/exchange/uphold", title: "Uphold review", description: "Kraken's main fiat-on-ramp competitor.", badge: "Alternative" },
    { href: "/getting-started", title: "How to buy XRP", description: "Step-by-step XRP purchase walkthrough.", badge: "Guide" },
  ],
  bitstamp: [
    { href: "/best-for/safest", title: "Best exchanges for buy-and-hold", description: "Where Bitstamp ranks among EU-regulated venues.", badge: "Best-for guide" },
    { href: "/wallet/gatehub", title: "GateHub review", description: "GateHub integrates directly with Bitstamp.", badge: "Companion" },
    { href: "/exchange/kraken", title: "Kraken review", description: "Bitstamp's main higher-volume alternative.", badge: "Alternative" },
    { href: "/getting-started", title: "How to buy XRP", description: "Walkthrough for first-time XRP buyers.", badge: "Guide" },
  ],
  coinbase: [
    { href: "/best-for/beginners", title: "Best XRP wallets for beginners", description: "Pair Coinbase with the easiest XRPL wallets.", badge: "Best-for guide" },
    { href: "/compare/coinbase-vs-kraken", title: "Coinbase vs Kraken", description: "Beginner-friendly vs power-user XRP exchange.", badge: "Comparison" },
    { href: "/exchange/kraken", title: "Kraken review", description: "Lower-fee alternative once you outgrow Coinbase.", badge: "Alternative" },
    { href: "/getting-started", title: "How to buy XRP", description: "Step-by-step XRP purchase walkthrough.", badge: "Guide" },
  ],
  cryptocom: [
    { href: "/best-for/beginners", title: "Best XRP wallets for beginners", description: "Mobile-first wallets that pair with Crypto.com.", badge: "Best-for guide" },
    { href: "/exchange/coinbase", title: "Coinbase review", description: "Crypto.com's biggest beginner-friendly competitor.", badge: "Alternative" },
    { href: "/yield", title: "Compare XRP yield options", description: "How Crypto.com Earn stacks up.", badge: "Hub" },
    { href: "/getting-started", title: "How to buy XRP", description: "First-buyer walkthrough for Crypto.com users.", badge: "Guide" },
  ],
  kucoin: [
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Take XRP off KuCoin and into XRPL DeFi.", badge: "Best-for guide" },
    { href: "/dapps", title: "XRPL dApps directory", description: "All the dApps that match KuCoin's altcoin breadth.", badge: "Hub" },
    { href: "/exchange/bitrue", title: "Bitrue review", description: "Bitrue is the closest XRP-focused KuCoin alternative.", badge: "Alternative" },
    { href: "/yield", title: "Compare XRP yield options", description: "Stack KuCoin's earn against Bitrue and Uphold.", badge: "Hub" },
  ],
};

export const RELATED_BY_BLOG: Record<number, RelatedSet> = {
  1: [
    { href: "/dapps", title: "XRPL dApps directory", description: "Browse every dApp covered in the post.", badge: "Hub" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Wallets that unlock these dApps.", badge: "Best-for guide" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The XRPL-native wallet powering most of these apps.", badge: "Wallet review" },
  ],
  2: [
    { href: "/yield", title: "Compare XRP yield options", description: "Where AMMs sit against exchange staking.", badge: "Hub" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The mobile wallet most LPs use to manage AMMs.", badge: "Wallet review" },
    { href: "/blog/10", title: "AMM LP deep dive", description: "Step-by-step on providing liquidity to XRPL AMMs.", badge: "Related guide" },
  ],
  3: [
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Operational security for serious holdings.", badge: "Best-for guide" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "The most-recommended hardware wallet in this guide.", badge: "Wallet review" },
    { href: "/wallet/ellipal", title: "ELLIPAL Titan review", description: "Air-gapped alternative for max isolation.", badge: "Wallet review" },
  ],
  4: [
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The flagship wallet for XRPL NFTs.", badge: "Wallet review" },
    { href: "/dapps", title: "XRPL dApps directory", description: "NFT marketplaces and trading dApps.", badge: "Hub" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Wallets that handle NFTs and DeFi together.", badge: "Best-for guide" },
  ],
  5: [
    { href: "/dapps", title: "XRPL dApps directory", description: "All the apps that run on XRPL sidechains.", badge: "Hub" },
    { href: "/blog/13", title: "XRPL Hooks explained", description: "How Hooks add smart-contract logic to XRPL.", badge: "Related guide" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The wallet that handles most XRPL bridging.", badge: "Wallet review" },
  ],
  6: [
    { href: "/blog/14", title: "XRP cross-border payments", description: "Companion deep-dive on RWA and corridors.", badge: "Related guide" },
    { href: "/wallet/gatehub", title: "GateHub review", description: "The wallet most institutional XRP users default to.", badge: "Wallet review" },
    { href: "/exchange/bitstamp", title: "Bitstamp review", description: "RWA-friendly EU-regulated exchange.", badge: "Exchange review" },
  ],
  7: [
    { href: "/yield", title: "Compare XRP yield options", description: "Side-by-side comparison of every staking venue.", badge: "Hub" },
    { href: "/exchange/bitrue", title: "Bitrue review", description: "The exchange behind Power Piggy XRP staking.", badge: "Exchange review" },
    { href: "/best-for/safest", title: "Safest XRP exchanges", description: "Where to stake without taking on extra venue risk.", badge: "Best-for guide" },
  ],
  8: [
    { href: "/dapps", title: "XRPL dApps directory", description: "See the XRPL dApps mentioned in this comparison.", badge: "Hub" },
    { href: "/blog/13", title: "XRPL Hooks explained", description: "How Hooks close the smart-contract gap.", badge: "Related guide" },
    { href: "/best-xrp-wallets", title: "Best XRP wallets ranked", description: "Wallets that match XRPL's developer story.", badge: "Hub" },
  ],
  9: [
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Cold side of the hot vs cold debate.", badge: "Best-for guide" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "The hardware wallet behind most cold setups.", badge: "Wallet review" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The hot wallet behind most active XRPL workflows.", badge: "Wallet review" },
  ],
  10: [
    { href: "/yield", title: "Compare XRP yield options", description: "Stack AMM yield against exchange staking.", badge: "Hub" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The wallet most LPs use to manage AMM positions.", badge: "Wallet review" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Wallets that fully expose AMM tooling.", badge: "Best-for guide" },
  ],
  11: [
    { href: "/getting-started", title: "How to buy XRP", description: "Walkthrough that pairs with this post.", badge: "Guide" },
    { href: "/exchange/uphold", title: "Uphold review", description: "Our pick for first-time XRP buyers.", badge: "Exchange review" },
    { href: "/best-for/beginners", title: "Best XRP wallets for beginners", description: "Where to send your first XRP.", badge: "Best-for guide" },
  ],
  12: [
    { href: "/yield", title: "Compare XRP yield options", description: "Yield events you'll need to track for tax.", badge: "Hub" },
    { href: "/blog/19", title: "Track wallet activity", description: "How to export XRPL transaction history for tax.", badge: "Related guide" },
    { href: "/exchange/bitrue", title: "Bitrue review", description: "The exchange where most XRP staking events originate.", badge: "Exchange review" },
  ],
  13: [
    { href: "/blog/5", title: "XRPL sidechains", description: "Hooks complement sidechains — see how.", badge: "Related guide" },
    { href: "/dapps", title: "XRPL dApps directory", description: "The dApps already using Hooks-style logic.", badge: "Hub" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The wallet that surfaces Hooks-enabled transactions.", badge: "Wallet review" },
  ],
  14: [
    { href: "/blog/6", title: "RWA tokenization on XRPL", description: "RWA powers many cross-border use cases.", badge: "Related guide" },
    { href: "/exchange/bitstamp", title: "Bitstamp review", description: "The EU-regulated venue behind most XRP corridors.", badge: "Exchange review" },
    { href: "/wallet/gatehub", title: "GateHub review", description: "The wallet of choice for institutional XRP users.", badge: "Wallet review" },
  ],
  15: [
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The mobile wallet with the cleanest trustline UX.", badge: "Wallet review" },
    { href: "/dapps", title: "XRPL dApps directory", description: "DApps that need a trustline to work.", badge: "Hub" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Wallets that fully expose trustline management.", badge: "Best-for guide" },
  ],
  16: [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "The companion best-for ranking.", badge: "Best-for guide" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "Our top hardware pick for XRP.", badge: "Wallet review" },
    { href: "/wallet/trezor-safe-5", title: "Trezor Safe 5 review", description: "The flagship Trezor option.", badge: "Wallet review" },
  ],
  17: [
    { href: "/blog/3", title: "Self-custody security best practices", description: "Companion deep-dive on operational security.", badge: "Related guide" },
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Cold storage is the strongest defence against phishing.", badge: "Best-for guide" },
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "Hardware confirmation defeats most phishing flows.", badge: "Wallet review" },
  ],
  18: [
    { href: "/blog/5", title: "XRPL sidechains", description: "How sidechains use validator networks.", badge: "Related guide" },
    { href: "/dapps", title: "XRPL dApps directory", description: "DApps that depend on the validator network.", badge: "Hub" },
    { href: "/best-xrp-wallets", title: "Best XRP wallets ranked", description: "Wallets that connect to a healthy XRPL.", badge: "Hub" },
  ],
  19: [
    { href: "/blog/12", title: "XRP tax tools", description: "Activity tracking is the foundation of accurate tax filings.", badge: "Related guide" },
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "Wallet with the cleanest activity export.", badge: "Wallet review" },
    { href: "/getting-started", title: "How to buy XRP", description: "First-buyer walkthrough for new XRP holders.", badge: "Guide" },
  ],
};

export const RELATED_BY_BEST_FOR: Record<string, RelatedSet> = {
  beginners: [
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "Our top mobile pick for beginners.", badge: "Wallet review" },
    { href: "/getting-started", title: "How to buy XRP", description: "Step-by-step XRP purchase walkthrough.", badge: "Guide" },
    { href: "/exchange/coinbase", title: "Coinbase review", description: "The most beginner-friendly XRP exchange.", badge: "Exchange review" },
  ],
  hardware: [
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "Our #1 hardware pick for XRP.", badge: "Wallet review" },
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Multi-device strategies that build on hardware.", badge: "Best-for guide" },
    { href: "/blog/16", title: "Hardware wallet buying guide", description: "How to choose between Ledger, Trezor and Tangem.", badge: "Guide" },
  ],
  "cold-storage": [
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "Our most-recommended cold-storage device.", badge: "Wallet review" },
    { href: "/wallet/ellipal", title: "ELLIPAL Titan review", description: "Air-gapped alternative for max isolation.", badge: "Wallet review" },
    { href: "/blog/3", title: "Self-custody security best practices", description: "Operational security playbook for cold storage.", badge: "Guide" },
  ],
  defi: [
    { href: "/wallet/xaman", title: "Xaman (XUMM) review", description: "The flagship XRPL DeFi wallet.", badge: "Wallet review" },
    { href: "/dapps", title: "XRPL dApps directory", description: "Every dApp these wallets unlock.", badge: "Hub" },
    { href: "/yield", title: "Compare XRP yield options", description: "Where to put XRP DeFi capital to work.", badge: "Hub" },
  ],
  safest: [
    { href: "/wallet/ledger", title: "Ledger Nano X review", description: "Hardware-first cold storage for safety-conscious holders.", badge: "Wallet review" },
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Companion best-for guide for serious holdings.", badge: "Best-for guide" },
    { href: "/blog/3", title: "Self-custody security best practices", description: "Operational security checklist for safety-first holders.", badge: "Guide" },
  ],
};

export const RELATED_BY_COMPARE: Record<string, RelatedSet> = {
  "xaman-vs-ledger": [
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Pair Xaman with Ledger for the best of both worlds.", badge: "Best-for guide" },
    { href: "/compare/xaman-vs-tangem", title: "Xaman vs Tangem", description: "How Tangem compares to Ledger as Xaman's hardware partner.", badge: "Comparison" },
    { href: "/best-xrp-wallets", title: "Best XRP wallets ranked", description: "See where Xaman and Ledger sit in the full ranking.", badge: "Hub" },
  ],
  "xaman-vs-tangem": [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "Where Tangem ranks among hardware picks.", badge: "Best-for guide" },
    { href: "/compare/ledger-vs-tangem", title: "Ledger vs Tangem", description: "Tangem's main hardware competitor.", badge: "Comparison" },
    { href: "/blog/9", title: "Hot vs cold wallets", description: "The deeper hot-vs-cold framework.", badge: "Guide" },
  ],
  "ledger-vs-tangem": [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "Both rank in our top hardware picks.", badge: "Best-for guide" },
    { href: "/compare/xaman-vs-ledger", title: "Xaman vs Ledger", description: "Pairing Ledger with a software wallet.", badge: "Comparison" },
    { href: "/best-xrp-wallets", title: "Best XRP wallets ranked", description: "The full XRP wallet ranking.", badge: "Hub" },
  ],
  "ellipal-vs-ledger": [
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Where these two rank for cold storage.", badge: "Best-for guide" },
    { href: "/compare/ellipal-vs-trezor", title: "ELLIPAL vs Trezor", description: "ELLIPAL's other big air-gapped competitor.", badge: "Comparison" },
    { href: "/blog/3", title: "Self-custody security best practices", description: "Operational security for hardware wallet owners.", badge: "Guide" },
  ],
  "trezor-vs-ledger": [
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "How Trezor and Ledger compare in the rankings.", badge: "Best-for guide" },
    { href: "/compare/trezor-vs-tangem", title: "Trezor vs Tangem", description: "Trezor's other main hardware competitor.", badge: "Comparison" },
    { href: "/blog/16", title: "Hardware wallet buying guide", description: "Open-source vs Secure Element trade-offs.", badge: "Guide" },
  ],
  "bifrost-vs-xaman": [
    { href: "/compare/bifrost-vs-crossmark", title: "Bifrost vs Crossmark", description: "Bifrost's other big multi-chain rival.", badge: "Comparison" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Where both wallets sit for XRPL DeFi.", badge: "Best-for guide" },
    { href: "/dapps", title: "XRPL dApps directory", description: "DApps both wallets can connect to.", badge: "Hub" },
  ],
  "coinbase-vs-kraken": [
    { href: "/best-for/safest", title: "Best exchanges for buy-and-hold", description: "Both rank among the safest XRP venues.", badge: "Best-for guide" },
    { href: "/getting-started", title: "How to buy XRP", description: "Walkthrough for first-time XRP buyers.", badge: "Guide" },
    { href: "/exchange/uphold", title: "Uphold review", description: "Third major US-friendly XRP exchange.", badge: "Alternative" },
  ],
  "trustwallet-vs-xaman": [
    { href: "/best-for/beginners", title: "Best XRP wallets for beginners", description: "Both wallets show up in beginner picks.", badge: "Best-for guide" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Where each wallet ranks for DeFi power-users.", badge: "Best-for guide" },
    { href: "/dapps", title: "XRPL dApps directory", description: "DApps both wallets can connect to.", badge: "Hub" },
  ],
  "trezor-vs-tangem": [
    { href: "/compare/trezor-vs-ledger", title: "Trezor vs Ledger", description: "Trezor's biggest hardware competitor.", badge: "Comparison" },
    { href: "/best-for/hardware", title: "Best hardware XRP wallets", description: "Where both devices rank.", badge: "Best-for guide" },
    { href: "/blog/16", title: "Hardware wallet buying guide", description: "Card vs USB vs touchscreen — which is right for you?", badge: "Guide" },
  ],
  "ellipal-vs-trezor": [
    { href: "/compare/ellipal-vs-ledger", title: "ELLIPAL vs Ledger", description: "ELLIPAL's other main rival.", badge: "Comparison" },
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Where both devices rank for cold storage.", badge: "Best-for guide" },
    { href: "/blog/3", title: "Self-custody security best practices", description: "Operational security for hardware wallet owners.", badge: "Guide" },
  ],
  "bifrost-vs-crossmark": [
    { href: "/compare/bifrost-vs-xaman", title: "Bifrost vs Xaman", description: "Bifrost's other XRPL rival.", badge: "Comparison" },
    { href: "/best-for/defi", title: "Best wallets for XRPL DeFi", description: "Where both wallets sit in DeFi rankings.", badge: "Best-for guide" },
    { href: "/dapps", title: "XRPL dApps directory", description: "DApps that work with both wallets.", badge: "Hub" },
  ],
  "gatehub-vs-xaman": [
    { href: "/compare/gatehub-vs-ledger", title: "GateHub vs Ledger", description: "GateHub's other main XRPL rival.", badge: "Comparison" },
    { href: "/best-for/beginners", title: "Best XRP wallets for beginners", description: "Where both wallets rank for newcomers.", badge: "Best-for guide" },
    { href: "/exchange/bitstamp", title: "Bitstamp review", description: "The exchange GateHub integrates with.", badge: "Exchange review" },
  ],
  "gatehub-vs-ledger": [
    { href: "/compare/gatehub-vs-xaman", title: "GateHub vs Xaman", description: "GateHub's other big XRPL rival.", badge: "Comparison" },
    { href: "/best-for/cold-storage", title: "Best XRP cold storage setups", description: "Pair GateHub with Ledger for cold storage.", badge: "Best-for guide" },
    { href: "/getting-started", title: "How to buy XRP", description: "Walkthrough that pairs with both wallets.", badge: "Guide" },
  ],
};
