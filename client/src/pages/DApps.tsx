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
  Globe
} from "lucide-react";
import { Link } from "wouter";

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
      "Competitive APY rates"
    ],
    website: "https://www.magnetic.app",
    affiliate: "https://www.magnetic.app/?ref=allthingsxrpl",
    color: "from-purple-500 to-pink-500",
    icon: Sparkles,
    verified: true
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
      "DEX aggregation"
    ],
    website: "https://orchestra.finance",
    affiliate: "https://orchestra.finance/?ref=allthingsxrpl",
    color: "from-blue-500 to-cyan-500",
    icon: Globe,
    verified: true
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
      "Low fees on XRPL"
    ],
    website: "https://xpmarket.com",
    affiliate: "https://xpmarket.com/?ref=allthingsxrpl",
    color: "from-green-500 to-emerald-500",
    icon: BarChart3,
    verified: true
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
      "SOLO token rewards"
    ],
    website: "https://sologenic.org",
    affiliate: "https://sologenic.org/?ref=allthingsxrpl",
    color: "from-orange-500 to-red-500",
    icon: Coins,
    verified: true
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
      "DEX insights"
    ],
    website: "https://firstledger.net",
    affiliate: "https://firstledger.net/?ref=allthingsxrpl",
    color: "from-indigo-500 to-purple-500",
    icon: BarChart3,
    verified: true
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
      "Account tools"
    ],
    website: "https://xrpl.services",
    affiliate: "https://xrpl.services/?ref=allthingsxrpl",
    color: "from-cyan-500 to-blue-500",
    icon: Droplets,
    verified: true
  }
];

const categories = ["All", "Yield", "DeFi", "DEX", "NFT/Trading", "Analytics", "DeFi Tools"];

export default function DApps() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/50">
            Decentralized Applications
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">XRPL DApps</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the best decentralized applications built on the XRP Ledger. From DeFi yield opportunities to NFT marketplaces, discover the XRPL ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {dapps.map((dapp) => {
            const IconComponent = dapp.icon;
            return (
              <div 
                key={dapp.id}
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
                  <a href={dapp.affiliate} target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full bg-gradient-to-r ${dapp.color} text-white font-bold`}>
                      Visit {dapp.name} <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <section className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold font-display mb-4">Want Your DApp Listed?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Are you building on the XRP Ledger? We'd love to feature your project. Reach out to discuss partnership opportunities.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>

        <section className="text-center">
          <h2 className="text-xl font-bold font-display mb-4">Looking for Staking Options?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our yield opportunities page for exchange staking and more passive income options.
          </p>
          <Link href="/yield">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              View Yield Opportunities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
