import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Shield,
  Zap,
  ArrowRight,
  Droplets,
  BarChart3,
  Coins,
  Sparkles,
  Globe,
  LineChart,
  Search,
  Layers,
  Repeat,
  Code,
  Check,
} from "lucide-react";
import { Link } from "wouter";
import {
  VerdictBox,
  BestForCallout,
  EmailCaptureBlock,
  FastCompareTable,
  FAQAccordion,
  LastUpdated,
  type FastCompareRow,
} from "@/components/conversion";

const dappCompareRows: FastCompareRow[] = [
  { id: "magnetic", name: "Magnetic", type: "Yield optimizer", price: "Free", bestFor: "Passive XRPL yield", rating: "9.4", affiliateUrl: "https://www.magnetic.app/?ref=allthingsxrpl", highlight: true },
  { id: "xrpl-dex", name: "XRPL DEX", type: "Native on-chain DEX", price: "Free", bestFor: "Direct on-ledger trading", rating: "9.3", affiliateUrl: "https://xrpl.services/?ref=allthingsxrpl" },
  { id: "sologenic", name: "Sologenic", type: "Tokenized assets DEX", price: "Free", bestFor: "Trading tokenized stocks", rating: "9.2", affiliateUrl: "https://sologenic.com/?ref=allthingsxrpl" },
  { id: "anodos", name: "Anodos Finance", type: "XRPL lending & RWA", price: "Free", bestFor: "Lending and real-world assets", rating: "9.1", affiliateUrl: "https://anodos.finance/?ref=allthingsxrpl" },
  { id: "bitrue-pools", name: "Bitrue XRPL Pools", type: "Exchange-hosted pools", price: "Free", bestFor: "Beginner-friendly XRPL yield", rating: "9.0", affiliateUrl: "https://www.bitrue.com/activity/landing-page/?cn=900000&_channel=allthingsxrpl" },
  { id: "xpmarket", name: "XPMarket", type: "NFT & token marketplace", price: "Free", bestFor: "XRPL NFTs", rating: "9.0", affiliateUrl: "https://xpmarket.com/?ref=allthingsxrpl" },
  { id: "orchestra", name: "Orchestra Finance", type: "Cross-chain DeFi hub", price: "Free", bestFor: "Bridging + multi-chain yield", rating: "8.8", affiliateUrl: "https://orchestra.finance/?ref=allthingsxrpl" },
];

type TopPick = {
  name: string;
  type: string;
  rating: string;
  bestFor: string;
  pros: string[];
  affiliateUrl: string;
  pairedWalletSlug: string;
  pairedWalletLabel: string;
};

const topPicks: TopPick[] = [
  {
    name: "Magnetic",
    type: "Yield optimizer",
    rating: "9.4",
    bestFor: "Passive XRPL yield",
    pros: [
      "Auto-compounding XRPL pools",
      "Clear APY breakdowns",
      "Audited contracts",
    ],
    affiliateUrl: "https://www.magnetic.app/?ref=allthingsxrpl",
    pairedWalletSlug: "xaman",
    pairedWalletLabel: "Pairs with Xaman",
  },
  {
    name: "Sologenic",
    type: "Tokenized assets DEX",
    rating: "9.2",
    bestFor: "Trading tokenized stocks & ETFs",
    pros: [
      "Real-world assets on XRPL",
      "On-chain settlement",
      "SOLO rewards built in",
    ],
    affiliateUrl: "https://sologenic.com/?ref=allthingsxrpl",
    pairedWalletSlug: "crossmark",
    pairedWalletLabel: "Pairs with Crossmark",
  },
  {
    name: "XRPL DEX",
    type: "Native on-chain DEX",
    rating: "9.3",
    bestFor: "Direct on-ledger token trading",
    pros: [
      "Built into the ledger — no smart-contract risk",
      "Sub-second settlement and tiny fees",
      "Accessible from Xaman, Crossmark, GateHub",
    ],
    affiliateUrl: "https://xrpl.services/?ref=allthingsxrpl",
    pairedWalletSlug: "xaman",
    pairedWalletLabel: "Trade via Xaman",
  },
  {
    name: "Anodos Finance",
    type: "XRPL lending & RWA",
    rating: "9.1",
    bestFor: "Lending and tokenized real-world assets",
    pros: [
      "On-chain lending markets on XRPL",
      "Real-world asset issuance",
      "Designed around XRPL trustlines",
    ],
    affiliateUrl: "https://anodos.finance/?ref=allthingsxrpl",
    pairedWalletSlug: "crossmark",
    pairedWalletLabel: "Pairs with Crossmark",
  },
];

const dapps = [
  {
    id: 1,
    name: "Magnetic",
    tagline: "DeFi Yield Optimizer",
    description: "Magnetic is a leading DeFi protocol on XRPL offering automated yield optimization, liquidity pools, and innovative earning strategies. Earn passive income through their streamlined DeFi products.",
    category: "Yield",
    features: [
      "Automated yield farming",
      "Multiple liquidity pools",
      "Native XRPL integration",
      "Competitive APY rates",
    ],
    website: "https://www.magnetic.app",
    affiliate: "https://www.magnetic.app/?ref=allthingsxrpl",
    color: "from-purple-500 to-pink-500",
    icon: Sparkles,
    verified: true,
  },
  {
    id: 2,
    name: "Orchestra Finance",
    tagline: "Cross-Chain DeFi Hub",
    description: "Orchestra Finance provides cross-chain DeFi solutions on XRPL, enabling users to bridge assets and access yield opportunities across multiple blockchain networks.",
    category: "DeFi",
    features: [
      "Cross-chain bridging",
      "Multi-chain yield",
      "Portfolio management",
      "DEX aggregation",
    ],
    website: "https://orchestra.finance",
    affiliate: "https://orchestra.finance/?ref=allthingsxrpl",
    color: "from-blue-500 to-cyan-500",
    icon: Globe,
    verified: true,
  },
  {
    id: 3,
    name: "XPMarket",
    tagline: "NFT & Token Marketplace",
    description: "XPMarket is the premier NFT and token marketplace on XRPL. Trade NFTs, discover new tokens, and participate in the growing XRPL digital asset ecosystem.",
    category: "NFT/Trading",
    features: [
      "NFT marketplace",
      "Token trading",
      "Collection analytics",
      "Low fees on XRPL",
    ],
    website: "https://xpmarket.com",
    affiliate: "https://xpmarket.com/?ref=allthingsxrpl",
    color: "from-green-500 to-emerald-500",
    icon: BarChart3,
    verified: true,
  },
  {
    id: 4,
    name: "Sologenic",
    tagline: "Tokenized Assets DEX",
    description: "Sologenic enables trading of tokenized stocks, ETFs, and commodities directly on the XRP Ledger. Access traditional financial markets through blockchain technology.",
    category: "DEX",
    features: [
      "Tokenized securities",
      "Stock & ETF trading",
      "On-chain settlement",
      "SOLO token rewards",
    ],
    website: "https://sologenic.org",
    affiliate: "https://sologenic.org/?ref=allthingsxrpl",
    color: "from-orange-500 to-red-500",
    icon: Coins,
    verified: true,
  },
  {
    id: 5,
    name: "First Ledger",
    tagline: "XRPL Analytics & Tools",
    description: "First Ledger provides comprehensive analytics, portfolio tracking, and DeFi tools for XRPL users. Monitor your holdings and discover new opportunities.",
    category: "Analytics",
    features: [
      "Portfolio tracking",
      "Real-time analytics",
      "Airdrop tracker",
      "DEX insights",
    ],
    website: "https://firstledger.net",
    affiliate: "https://firstledger.net/?ref=allthingsxrpl",
    color: "from-indigo-500 to-purple-500",
    icon: BarChart3,
    verified: true,
  },
  {
    id: 6,
    name: "XRPL.services",
    tagline: "AMM & DEX Tools",
    description: "XRPL.services offers essential tools for interacting with the XRP Ledger's native AMM and DEX features. Swap tokens, provide liquidity, and explore XRPL DeFi.",
    category: "DeFi Tools",
    features: [
      "AMM liquidity provision",
      "Token swaps",
      "Trustline management",
      "Account tools",
    ],
    website: "https://xrpl.services",
    affiliate: "https://xrpl.services/?ref=allthingsxrpl",
    color: "from-cyan-500 to-blue-500",
    icon: Droplets,
    verified: true,
  },
  {
    id: 7,
    name: "OnTheDex.live",
    tagline: "Real-Time XRPL Token Data",
    description: "OnTheDex.live provides real-time token data, price charts, trading volume, and market cap for all tokens on the XRP Ledger. Essential for XRPL traders and researchers.",
    category: "Analytics",
    features: [
      "Real-time token prices",
      "Trading volume tracking",
      "Market cap data",
      "Historical charts",
    ],
    website: "https://onthedex.live",
    affiliate: "https://onthedex.live/?ref=allthingsxrpl",
    color: "from-green-500 to-teal-500",
    icon: LineChart,
    verified: true,
  },
  {
    id: 8,
    name: "XRPLWin",
    tagline: "XRPL & Xahau Explorer",
    description: "XRPLWin is a comprehensive explorer for both XRPL and Xahau networks. View account details, transactions, hooks, and network metrics with detailed analytics.",
    category: "Explorer",
    features: [
      "Account explorer",
      "Transaction details",
      "Hooks monitoring",
      "Network metrics",
    ],
    website: "https://xrplwin.com",
    affiliate: "https://xrplwin.com/?ref=allthingsxrpl",
    color: "from-yellow-500 to-orange-500",
    icon: Search,
    verified: true,
  },
  {
    id: 9,
    name: "XRPLORER",
    tagline: "Forensics-Focused Explorer",
    description: "XRPLORER specializes in transaction tracing and forensic analysis on the XRP Ledger. Used by researchers and compliance teams to follow fund flows and investigate transactions.",
    category: "Explorer",
    features: [
      "Transaction tracing",
      "Fund flow analysis",
      "Compliance tools",
      "Account forensics",
    ],
    website: "https://xrplorer.com",
    affiliate: "https://xrplorer.com/?ref=allthingsxrpl",
    color: "from-red-500 to-pink-500",
    icon: Search,
    verified: true,
  },
  {
    id: 10,
    name: "GateHub Trade",
    tagline: "Web-Based XRPL Trading",
    description: "GateHub Trade offers a browser-based trading interface for the XRPL DEX. Trade tokens directly on-chain with an intuitive web interface and fiat gateway access.",
    category: "DEX",
    features: [
      "Web-based trading",
      "XRPL DEX access",
      "Fiat on/off ramps",
      "Multiple wallets",
    ],
    website: "https://gatehub.net/trade",
    affiliate: "https://gatehub.net/?ref=allthingsxrpl",
    color: "from-blue-500 to-indigo-500",
    icon: Repeat,
    verified: true,
  },
  {
    id: 11,
    name: "SOLO DEX",
    tagline: "Advanced XRPL Trading",
    description: "SOLO DEX provides advanced charting, trading pairs, and analytics for XRPL traders. Part of the Sologenic ecosystem with integrated rewards and staking.",
    category: "DEX",
    features: [
      "Advanced charting",
      "Custom trading pairs",
      "SOLO rewards",
      "Integrated staking",
    ],
    website: "https://sologenic.org/trade",
    affiliate: "https://sologenic.org/trade?ref=allthingsxrpl",
    color: "from-orange-500 to-yellow-500",
    icon: BarChart3,
    verified: true,
  },
  {
    id: 12,
    name: "Xahau",
    tagline: "Smart Contract Sidechain",
    description: "Xahau is a hooks-enabled sidechain of XRPL, allowing smart contract functionality while maintaining compatibility. Build and deploy hooks for automated on-chain logic.",
    category: "Sidechain",
    features: [
      "Hooks (smart contracts)",
      "XRPL compatible",
      "Native XAH token",
      "Developer tools",
    ],
    website: "https://xahau.network",
    affiliate: "https://xahau.network/?ref=allthingsxrpl",
    color: "from-purple-500 to-indigo-500",
    icon: Code,
    verified: true,
  },
  {
    id: 14,
    name: "XRPL DEX",
    tagline: "The Native On-Chain DEX",
    description: "The XRP Ledger has a built-in decentralized exchange that lets any wallet trade tokens peer-to-peer with sub-second settlement. No smart contracts, no wrapped assets — just on-ledger order books.",
    category: "DEX",
    features: [
      "Native to the ledger — no smart contracts",
      "Sub-second settlement",
      "Tiny fees (~0.00001 XRP)",
      "Open to every XRPL wallet",
    ],
    website: "https://xrpl.services",
    affiliate: "https://xrpl.services/?ref=allthingsxrpl",
    color: "from-sky-500 to-blue-500",
    icon: Repeat,
    verified: true,
  },
  {
    id: 15,
    name: "Anodos Finance",
    tagline: "Lending & Real-World Assets",
    description: "Anodos Finance brings on-chain lending and tokenized real-world assets to the XRPL. Borrow, lend, and access RWA yield using native XRPL trustlines.",
    category: "DeFi",
    features: [
      "On-chain lending markets",
      "Tokenized real-world assets",
      "Trustline-based architecture",
      "XRPL-native settlement",
    ],
    website: "https://anodos.finance",
    affiliate: "https://anodos.finance/?ref=allthingsxrpl",
    color: "from-violet-500 to-fuchsia-500",
    icon: Coins,
    verified: true,
  },
  {
    id: 16,
    name: "Bitrue XRPL Pools",
    tagline: "Exchange-Hosted XRPL Pools",
    description: "Bitrue hosts curated XRPL liquidity pools and yield products that let beginners earn on XRP and XRPL tokens without managing on-chain trustlines themselves.",
    category: "Yield",
    features: [
      "Beginner-friendly XRPL yield",
      "No trustlines to manage",
      "Multiple XRPL token pools",
      "Familiar exchange UI",
    ],
    website: "https://www.bitrue.com",
    affiliate: "https://www.bitrue.com/activity/landing-page/?cn=900000&_channel=allthingsxrpl",
    color: "from-amber-500 to-orange-500",
    icon: Droplets,
    verified: true,
  },
  {
    id: 13,
    name: "XRPL EVM",
    tagline: "Ethereum-Compatible Sidechain",
    description: "XRPL EVM is an Ethereum-compatible sidechain launched in 2025. Deploy Solidity smart contracts and use familiar EVM tools while benefiting from XRPL's speed and low fees.",
    category: "Sidechain",
    features: [
      "EVM compatibility",
      "Solidity support",
      "Axelar bridge",
      "DeFi capabilities",
    ],
    website: "https://www.xrplevm.org",
    affiliate: "https://www.xrplevm.org/?ref=allthingsxrpl",
    color: "from-emerald-500 to-green-500",
    icon: Layers,
    verified: true,
  },
];

const categories = ["All", "Yield", "DeFi", "DEX", "NFT/Trading", "Analytics", "DeFi Tools", "Explorer", "Sidechain"];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is the best XRPL DeFi app right now?",
    a: (
      <span>
        For passive yield, <strong>Magnetic</strong> is our top pick — it&apos;s the most polished
        yield optimizer on XRPL with audited contracts. For trading tokenized
        stocks and ETFs, <strong>Sologenic</strong> is the leader. NFT collectors
        should head to <strong>XPMarket</strong>.
      </span>
    ),
  },
  {
    q: "Do I need a special wallet for XRPL DeFi?",
    a: (
      <span>
        You need an XRPL wallet that supports trustlines and can sign DeFi
        transactions. <Link href="/wallet/xaman" className="text-primary underline">Xaman</Link>{" "}
        and <Link href="/wallet/crossmark" className="text-primary underline">Crossmark</Link>{" "}
        are the two most widely supported by XRPL dApps. See our{" "}
        <Link href="/best-xrp-wallets" className="text-primary underline">best XRP wallets guide</Link>{" "}
        if you don&apos;t have one yet.
      </span>
    ),
  },
  {
    q: "Is XRPL DeFi safe?",
    a: (
      <span>
        XRPL DeFi carries the same smart-contract and liquidity risks as any
        other chain. The XRPL native AMM is audited and battle-tested, but
        third-party protocols vary. Stick to projects with public audits, never
        deposit more than you can afford to lose, and confirm contract
        addresses inside your wallet before signing.
      </span>
    ),
  },
  {
    q: "What yields can I expect on XRPL?",
    a: (
      <span>
        Native AMM pools typically pay <strong>2–8% APY</strong> from trading
        fees, depending on the pair. Yield optimizers like Magnetic can stack
        rewards on top, pushing returns higher for active LPs. Be aware that
        APYs are variable, not fixed products.
      </span>
    ),
  },
  {
    q: "Can I use Ethereum-style DeFi on XRPL?",
    a: (
      <span>
        Yes — the <strong>XRPL EVM sidechain</strong> launched in 2025 lets you
        deploy Solidity contracts and use MetaMask-style tooling while bridging
        liquidity from XRPL mainnet via Axelar. <strong>Xahau</strong> offers a
        different approach with native Hooks for lightweight smart-contract
        logic.
      </span>
    ),
  },
  {
    q: "Where do I trade XRPL tokens?",
    a: (
      <span>
        The XRPL has a built-in DEX, so any decent XRPL wallet can trade
        on-chain. For a richer interface use <strong>Sologenic</strong>,{" "}
        <strong>SOLO DEX</strong>, or <strong>GateHub Trade</strong>. For real-time
        token data and analytics, <strong>OnTheDex.live</strong> is the go-to.
      </span>
    ),
  },
];

export default function DApps() {
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Badge className="mb-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/50">
            XRPL DeFi & Tools
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4" data-testid="text-dapps-title">
            Best XRPL DeFi & dApps in 2026
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            We tested the leading XRPL DeFi protocols, AMM pools, NFT marketplaces, and developer tools to find the ones actually worth your time and capital.
          </p>
          <div className="mt-4">
            <LastUpdated date="April 2026" />
          </div>
        </div>

        <div className="my-10">
          <VerdictBox
            pickName="Magnetic"
            pickReason="The most polished yield optimizer on XRPL right now — real APYs, audited contracts, and a UI that hides the complexity."
            affiliateUrl="https://www.magnetic.app/?ref=allthingsxrpl"
            runnerUp={{
              name: "Sologenic",
              reason: "Best for trading tokenized real-world assets directly on the XRPL DEX.",
              href: "https://sologenic.com/?ref=allthingsxrpl",
            }}
            pros={[
              "Native XRPL — no bridges or wrapped tokens",
              "Auto-compounding pools and clear APY breakdowns",
              "Pairs cleanly with Xaman and Crossmark sign-in",
            ]}
            cons={[
              "Smart-contract risk applies — never deposit more than you can lose",
              "APYs vary with liquidity, not a fixed product",
            ]}
          />
        </div>

        <FastCompareTable rows={dappCompareRows} />

        <section className="my-24">
          <h2 className="text-3xl font-bold font-display mb-2">Our top XRPL dApp picks</h2>
          <p className="text-muted-foreground mb-8">
            The apps we&apos;d actually tell a friend to start with — each paired with the wallet that works best for it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPicks.map((p) => (
              <div
                key={p.name}
                data-testid={`card-toppick-${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md p-6 hover:border-primary/40 transition-all flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-xl" data-testid={`text-toppick-name-${p.name.toLowerCase()}`}>{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-display font-bold text-primary">{p.rating}</div>
                    <div className="text-[10px] uppercase text-muted-foreground tracking-widest">Score</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="text-white font-medium">Best for: </span>
                  {p.bestFor}
                </p>
                <ul className="space-y-2 mb-5 flex-1">
                  {p.pros.map((pro, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <a href={p.affiliateUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-toppick-visit-${p.name.toLowerCase()}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                      Visit {p.name} <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <Link href={`/wallet/${p.pairedWalletSlug}`} data-testid={`link-toppick-wallet-${p.pairedWalletSlug}`}>
                    <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary">
                      {p.pairedWalletLabel} <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-24 grid md:grid-cols-2 gap-6">
          <BestForCallout
            label="Need a wallet first?"
            href="/best-xrp-wallets"
            description="Our ranked guide to the best XRP wallets — Xaman and Crossmark are the two most XRPL-dApp-ready picks."
          />
          <BestForCallout
            label="Best wallet for DeFi"
            href="/best-for/defi"
            description="Curated wallet picks specifically for XRPL DeFi, AMM pools, and dApp sign-in."
          />
        </section>

        <section className="my-24 -mx-4">
          <div className="px-4">
            <h2 className="text-3xl font-bold font-display mb-2">Every XRPL dApp worth knowing</h2>
            <p className="text-muted-foreground mb-8">
              The full lineup — DeFi, DEXs, NFT markets, analytics, explorers, and sidechains.
            </p>
          </div>

          <div className="px-4 flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dapps.map((dapp) => {
              const IconComponent = dapp.icon;
              return (
                <div
                  key={dapp.id}
                  data-testid={`card-dapp-${dapp.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 flex flex-col group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-r ${dapp.color} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      {dapp.verified && (
                        <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                          <Shield className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs bg-white/5">
                      {dapp.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-display mb-1 group-hover:text-primary transition-colors">{dapp.name}</h3>
                  <p className="text-sm text-primary mb-3">{dapp.tagline}</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{dapp.description}</p>

                  <div className="space-y-2 mb-6">
                    {dapp.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 text-secondary" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <a href={dapp.affiliate} target="_blank" rel="noopener noreferrer" data-testid={`link-dapp-visit-${dapp.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button className={`w-full bg-gradient-to-r ${dapp.color} text-white font-bold`}>
                        Visit {dapp.name} <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="my-24">
          <EmailCaptureBlock
            source="best-xrpl-defi"
            title="Get the XRPL DeFi starter kit"
            description="A short PDF on which dApps to try first, how to manage trustlines safely, and the wallet setup that pairs best with XRPL DeFi."
            bullets={[
              "Which 3 dApps to try first (and which to skip)",
              "Trustline + AMM safety checklist",
              "The Xaman + Crossmark setup we use",
            ]}
            cta="Send me the kit"
          />
        </section>

        <section className="my-24">
          <h2 className="text-3xl font-bold font-display mb-6">XRPL DeFi & dApps FAQ</h2>
          <FAQAccordion items={faqs} />
        </section>

        <section className="my-24 grid md:grid-cols-2 gap-6">
          <Link
            href="/"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
            data-testid="link-home-usecase"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              Not sure where to start?
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              Pick by what you want to do
            </h3>
            <p className="text-sm text-muted-foreground">
              Use our use-case selector on the homepage to find the right wallet and dApp combo for staking, NFTs, trading, or cold storage.
            </p>
          </Link>
          <Link
            href="/yield"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
            data-testid="link-yield"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              Want passive income?
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              See all yield opportunities
            </h3>
            <p className="text-sm text-muted-foreground">
              Compare XRPL AMM pools, exchange staking, and DeFi yields side-by-side.
            </p>
          </Link>
        </section>

        <section className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold font-display mb-4">Want Your DApp Listed?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Are you building on the XRP Ledger? We&apos;d love to feature your project. Reach out to discuss partnership opportunities.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
