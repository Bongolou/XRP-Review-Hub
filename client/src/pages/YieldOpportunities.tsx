import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  ExternalLink, 
  Shield, 
  Clock, 
  Percent,
  ArrowRight,
  Coins,
  Waves
} from "lucide-react";
import { Link } from "wouter";
import upholdLogo from "@/assets/logos/uphold-logo.webp";
import bitrueLogo from "@/assets/logos/bitrue-logo.webp";
import krakenLogo from "@/assets/logos/kraken-logo.webp";

const stakingOptions = [
  {
    id: 1,
    name: "Bitrue Power Piggy",
    platform: "Bitrue",
    logo: bitrueLogo,
    description: "Bitrue's flagship staking product lets you earn daily interest on your XRP and other crypto holdings. No lock-up period required - withdraw anytime.",
    apy: "Up to 6.5%",
    minDeposit: "10 XRP",
    lockPeriod: "Flexible",
    features: [
      "Daily interest payouts",
      "No lock-up required",
      "Compound earnings automatically",
      "Multiple asset support"
    ],
    risk: "Low",
    link: "https://www.bitrue.com/staking",
    affiliate: "https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Uphold Staking",
    platform: "Uphold",
    logo: upholdLogo,
    description: "Uphold offers simple, beginner-friendly staking for various cryptocurrencies. While XRP staking isn't available, you can earn on other assets and swap easily.",
    apy: "Up to 12%",
    minDeposit: "Varies",
    lockPeriod: "Flexible",
    features: [
      "User-friendly interface",
      "No minimum for most assets",
      "Easy fiat on-ramp",
      "Regulated platform"
    ],
    risk: "Low",
    link: "https://uphold.com/earn",
    affiliate: "https://uphold.com/signup?referral=allthingsxrpl",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    name: "Kraken Staking",
    platform: "Kraken",
    logo: krakenLogo,
    description: "Kraken provides institutional-grade staking services with competitive rates. Known for security and reliability, it's trusted by serious investors.",
    apy: "Up to 8%",
    minDeposit: "Varies by asset",
    lockPeriod: "Flexible/Bonded",
    features: [
      "High security standards",
      "Multiple staking options",
      "On-chain and off-chain",
      "Professional trading tools"
    ],
    risk: "Low",
    link: "https://www.kraken.com/features/staking-coins",
    affiliate: "https://www.kraken.com/sign-up?clickid=allthingsxrpl",
    color: "from-purple-500 to-violet-500"
  }
];

const xrplNativeOptions = [
  {
    id: 1,
    name: "XRPL AMM Liquidity Provision",
    description: "Provide liquidity to the native Automated Market Maker (AMM) on the XRP Ledger. Earn trading fees from swaps between token pairs.",
    apy: "Variable (3-15%)",
    risk: "Medium",
    features: [
      "Native on-chain yield",
      "No custodial risk",
      "Earn trading fees",
      "Support multiple pairs"
    ],
    learnMoreLink: "/blog/2",
    color: "from-primary to-blue-400"
  },
  {
    id: 2,
    name: "Trustline Airdrops",
    description: "Set trustlines for new tokens on XRPL and potentially receive airdrops. Many projects reward early supporters with free tokens.",
    apy: "Variable",
    risk: "Low-Medium",
    features: [
      "Free token distributions",
      "Low barrier to entry",
      "Support new projects",
      "Only costs reserve (2 XRP)"
    ],
    learnMoreLink: "/blog/10",
    color: "from-secondary to-orange-400"
  }
];

export default function YieldOpportunities() {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/20 text-secondary hover:bg-secondary/30 border-secondary/50">
            Earn Passive Income
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">Yield Opportunities</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the best ways to earn passive income on your XRP and other crypto holdings through staking, liquidity provision, and more.
          </p>
        </div>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-secondary/20 w-10 h-10 rounded-lg flex items-center justify-center border border-secondary/30">
              <Coins className="h-5 w-5 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold font-display">Exchange Staking</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {stakingOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10">
                    <img src={option.logo} alt={option.platform} className="w-full h-full object-cover" />
                  </div>
                  <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                    {option.risk} Risk
                  </Badge>
                </div>

                <h3 className="text-xl font-bold font-display mb-2">{option.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{option.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Percent className="h-3 w-3" />
                      APY
                    </div>
                    <div className="font-bold text-secondary">{option.apy}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      Lock Period
                    </div>
                    <div className="font-bold">{option.lockPeriod}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-3 w-3 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <a href={option.affiliate} target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full bg-gradient-to-r ${option.color} text-white font-bold`}>
                      Start Earning <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href={option.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary">
                      Learn More About {option.platform} Staking <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/20 w-10 h-10 rounded-lg flex items-center justify-center border border-primary/30">
              <Waves className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-display">XRPL Native Yield</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {xrplNativeOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-r ${option.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                    {option.risk} Risk
                  </Badge>
                </div>

                <h3 className="text-xl font-bold font-display mb-2">{option.name}</h3>
                <p className="text-muted-foreground mb-4">{option.description}</p>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10 mb-4 inline-block">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Percent className="h-3 w-3" />
                    Estimated APY
                  </div>
                  <div className="font-bold text-primary">{option.apy}</div>
                </div>

                <div className="space-y-2 mb-6">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-3 w-3 text-secondary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link href={option.learnMoreLink}>
                  <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">
                    Read Our Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-secondary/20 to-primary/20 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">Not Sure Where to Start?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            New to staking? We recommend starting with Bitrue Power Piggy for its flexibility and ease of use. 
            No lock-up means you can withdraw anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-secondary to-orange-500 text-white font-bold">
                Try Bitrue Power Piggy <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link href="/blog/2">
              <Button variant="outline" className="border-white/20">
                Learn About AMM Staking <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
