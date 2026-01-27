import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { 
  Star, 
  Shield, 
  DollarSign,
  Globe,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowLeft,
  Gift
} from "lucide-react";
import upholdLogo from "@/assets/logos/uphold-logo.png";
import bitrueLogo from "@/assets/logos/bitrue-logo.png";
import krakenLogo from "@/assets/logos/kraken-logo.png";
import bitstampLogo from "@/assets/logos/bitstamp-logo.png";
import coinbaseLogo from "@/assets/logos/coinbase-logo.png";
import cryptocomLogo from "@/assets/logos/cryptocom-logo.png";
import kucoinLogo from "@/assets/logos/kucoin-logo.png";

const logoMap: Record<string, string> = {
  uphold: upholdLogo,
  bitrue: bitrueLogo,
  kraken: krakenLogo,
  bitstamp: bitstampLogo,
  coinbase: coinbaseLogo,
  cryptocom: cryptocomLogo,
  kucoin: kucoinLogo
};

const exchangeData: Record<string, {
  name: string;
  tagline: string;
  rating: number;
  type: string;
  founded: string;
  headquarters: string;
  website: string;
  affiliateLink: string;
  bonus: string;
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  fees: {
    trading: string;
    deposit: string;
    withdrawal: string;
  };
  paymentMethods: string[];
  supportedCountries: string;
}> = {
  uphold: {
    name: "Uphold",
    tagline: "Buy XRP Directly with Fiat",
    rating: 4.5,
    type: "Multi-Asset Platform",
    founded: "2015",
    headquarters: "New York, USA",
    website: "uphold.com",
    affiliateLink: "https://uphold.com/sign-up?referral=allthingsxrpl",
    bonus: "$20 in XRP for new users",
    description: "Uphold is a multi-asset digital money platform that makes it easy to buy, hold, and trade XRP directly with fiat currency. Unlike many US exchanges that delisted XRP, Uphold has continued to support XRP trading, making it one of the most accessible options for American users.",
    features: [
      "Direct XRP purchases with USD/EUR",
      "Debit card for spending crypto",
      "Recurring buy feature",
      "64+ cryptocurrencies",
      "Precious metals trading",
      "US equities access",
      "Instant withdrawals to external wallets",
      "AutoPilot (dollar-cost averaging)"
    ],
    pros: [
      "One of few US platforms with XRP",
      "Buy XRP directly with bank/card",
      "No trading fees (spread only)",
      "Easy-to-use interface",
      "Uphold card for spending",
      "Fast external withdrawals"
    ],
    cons: [
      "Spreads can be 1-2%",
      "Limited advanced trading features",
      "No margin trading",
      "Customer support can be slow"
    ],
    bestFor: "US residents who want a simple way to buy XRP with a bank account or debit card.",
    fees: {
      trading: "0% (spread only, ~1-2%)",
      deposit: "Free (ACH), 3.99% (card)",
      withdrawal: "Network fees only"
    },
    paymentMethods: ["Bank Transfer (ACH)", "Debit/Credit Card", "Wire Transfer", "Crypto Deposit"],
    supportedCountries: "Available in 180+ countries including USA (most states)"
  },
  bitrue: {
    name: "Bitrue",
    tagline: "XRP-Focused Trading Platform",
    rating: 4.3,
    type: "Cryptocurrency Exchange",
    founded: "2018",
    headquarters: "Singapore",
    website: "bitrue.com",
    affiliateLink: "https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL",
    bonus: "Up to $3,000 welcome bonus",
    description: "Bitrue is a Singapore-based cryptocurrency exchange that has positioned itself as an XRP-friendly platform. It offers extensive XRP trading pairs, staking rewards, and was one of the first exchanges to support various XRPL tokens. It's popular among XRP enthusiasts for its strong ecosystem support.",
    features: [
      "100+ XRP trading pairs",
      "XRP staking/yield programs",
      "XRPL token support",
      "Futures trading",
      "Bitrue Earn (interest)",
      "Power Piggy savings",
      "NFT marketplace",
      "Mobile app"
    ],
    pros: [
      "Excellent XRP pair selection",
      "Strong XRPL ecosystem support",
      "Competitive trading fees",
      "Yield opportunities on XRP",
      "Active promotions and bonuses",
      "Good liquidity"
    ],
    cons: [
      "Not available in some countries",
      "Less regulated than US exchanges",
      "Interface can be overwhelming",
      "Past security incident (2019)"
    ],
    bestFor: "XRP traders who want maximum trading pairs and yield opportunities.",
    fees: {
      trading: "0.098% maker/taker",
      deposit: "Free",
      withdrawal: "0.25 XRP"
    },
    paymentMethods: ["Crypto Deposit", "Credit Card (via partners)", "P2P Trading"],
    supportedCountries: "Available globally (restrictions in USA, some EU countries)"
  },
  kraken: {
    name: "Kraken",
    tagline: "Trusted Security & Liquidity",
    rating: 4.6,
    type: "Cryptocurrency Exchange",
    founded: "2011",
    headquarters: "San Francisco, USA",
    website: "kraken.com",
    affiliateLink: "https://www.kraken.com/sign-up?clickid=allthingsxrpl",
    bonus: "Competitive trading fees",
    description: "Kraken is one of the oldest and most trusted cryptocurrency exchanges in the world. Founded in 2011, it has built a reputation for security and reliability. Kraken offers XRP trading in many jurisdictions and provides professional-grade trading features alongside a beginner-friendly interface.",
    features: [
      "Kraken Pro for advanced trading",
      "Staking rewards",
      "Futures trading",
      "Margin trading (up to 5x)",
      "OTC desk for large trades",
      "24/7 live support",
      "Bank funding (ACH/wire)",
      "API for automated trading"
    ],
    pros: [
      "Excellent security track record",
      "Never been hacked",
      "Strong regulatory compliance",
      "Deep liquidity",
      "Professional trading tools",
      "Good customer support"
    ],
    cons: [
      "Verification can take time",
      "Higher fees for instant buy",
      "XRP not available in all US states",
      "Interface learning curve"
    ],
    bestFor: "Traders who prioritize security and want professional-grade trading features.",
    fees: {
      trading: "0.16% maker / 0.26% taker",
      deposit: "Free (crypto), varies (fiat)",
      withdrawal: "0.02 XRP"
    },
    paymentMethods: ["Bank Wire", "ACH (USA)", "SEPA (EU)", "Crypto Deposit", "Apple Pay", "Google Pay"],
    supportedCountries: "Available in most countries (some US state restrictions)"
  },
  bitstamp: {
    name: "Bitstamp",
    tagline: "Europe's Oldest Crypto Exchange",
    rating: 4.5,
    type: "Cryptocurrency Exchange",
    founded: "2011",
    headquarters: "Luxembourg",
    website: "bitstamp.net",
    affiliateLink: "https://www.bitstamp.net/?ref=allthingsxrpl",
    bonus: "Low trading fees for high volume",
    description: "Bitstamp is one of the oldest and most reputable cryptocurrency exchanges, founded in 2011 in Europe. It's known for its strong regulatory compliance, reliable service, and straightforward fee structure. Bitstamp offers XRP trading with deep liquidity and a user-friendly interface.",
    features: [
      "Established since 2011",
      "Full regulatory compliance",
      "Tradeview Pro platform",
      "Instant buy with card",
      "Staking rewards",
      "Mobile trading app",
      "API for automated trading",
      "Institutional services"
    ],
    pros: [
      "One of the oldest exchanges",
      "Strong regulatory standing",
      "Reliable uptime",
      "Simple fee structure",
      "Good liquidity for XRP",
      "Trusted reputation"
    ],
    cons: [
      "Fewer coins than competitors",
      "Higher fees for small trades",
      "Limited advanced features",
      "Slower verification process"
    ],
    bestFor: "European traders who want a reliable, regulated exchange with a strong track record.",
    fees: {
      trading: "0.30% - 0.00% (volume-based)",
      deposit: "Free (SEPA), 5% (card)",
      withdrawal: "0.02 XRP"
    },
    paymentMethods: ["SEPA", "Bank Wire", "Credit/Debit Card", "Crypto Deposit"],
    supportedCountries: "Available in 100+ countries including EU and most US states"
  },
  coinbase: {
    name: "Coinbase",
    tagline: "America's Largest Crypto Exchange",
    rating: 4.4,
    type: "Cryptocurrency Exchange",
    founded: "2012",
    headquarters: "San Francisco, USA",
    website: "coinbase.com",
    affiliateLink: "https://www.coinbase.com/join?ref=allthingsxrpl",
    bonus: "$10 in free crypto for new users",
    description: "Coinbase is the largest cryptocurrency exchange in the United States and is publicly traded on NASDAQ. After the SEC case resolution, XRP trading was restored. Known for its beginner-friendly interface, strong security, and regulatory compliance, it's the go-to choice for millions of Americans.",
    features: [
      "Publicly traded (NASDAQ: COIN)",
      "Coinbase Pro for advanced trading",
      "Coinbase Wallet integration",
      "Coinbase Card (spend crypto)",
      "Staking rewards",
      "Learn & Earn program",
      "Vault for secure storage",
      "Recurring buys"
    ],
    pros: [
      "Most trusted US exchange",
      "Very beginner-friendly",
      "Strong security record",
      "Publicly traded company",
      "Great mobile app",
      "Educational resources"
    ],
    cons: [
      "Higher fees than competitors",
      "Limited customer support",
      "Some coins not available",
      "Complex fee structure"
    ],
    bestFor: "US beginners who want the most trusted, easy-to-use platform for buying XRP.",
    fees: {
      trading: "0.5% spread + flat fee",
      deposit: "Free (ACH), 3.99% (card)",
      withdrawal: "Network fees"
    },
    paymentMethods: ["ACH Bank Transfer", "Wire Transfer", "Debit Card", "PayPal", "Crypto Deposit"],
    supportedCountries: "Available in 100+ countries with full US support"
  },
  cryptocom: {
    name: "Crypto.com",
    tagline: "All-in-One Crypto Super App",
    rating: 4.3,
    type: "Cryptocurrency Exchange",
    founded: "2016",
    headquarters: "Singapore",
    website: "crypto.com",
    affiliateLink: "https://crypto.com/app?ref=allthingsxrpl",
    bonus: "Up to $25 signup bonus",
    description: "Crypto.com is a comprehensive cryptocurrency platform offering an exchange, Visa card, DeFi wallet, and NFT marketplace. With aggressive marketing and a user-friendly app, it has grown rapidly. XRP holders can earn staking rewards and spend XRP with their metal Visa card.",
    features: [
      "Crypto.com Visa Card",
      "Earn interest on XRP",
      "DeFi Wallet",
      "NFT marketplace",
      "250+ cryptocurrencies",
      "Supercharger events",
      "Pay merchants with crypto",
      "Margin trading"
    ],
    pros: [
      "Metal Visa cards with cashback",
      "Good staking/earn rates",
      "All-in-one platform",
      "Sleek mobile app",
      "Wide coin selection",
      "Good promotions"
    ],
    cons: [
      "Confusing tier system",
      "Staking lockups required",
      "CRO token requirements",
      "Spread fees on trades"
    ],
    bestFor: "Users who want a crypto lifestyle with cards, earn features, and an all-in-one app.",
    fees: {
      trading: "0.075% maker / 0.075% taker",
      deposit: "Free (crypto), 2.99% (card)",
      withdrawal: "0.25 XRP"
    },
    paymentMethods: ["Credit/Debit Card", "Bank Transfer", "Crypto Deposit", "Apple Pay", "Google Pay"],
    supportedCountries: "Available in 90+ countries"
  },
  kucoin: {
    name: "KuCoin",
    tagline: "The People's Exchange",
    rating: 4.4,
    type: "Cryptocurrency Exchange",
    founded: "2017",
    headquarters: "Seychelles",
    website: "kucoin.com",
    affiliateLink: "https://www.kucoin.com/r?ref=allthingsxrpl",
    bonus: "Welcome bonus for new users",
    description: "KuCoin is known for its vast selection of altcoins and trading pairs, making it a favorite among crypto enthusiasts looking for variety. It offers XRP with numerous trading pairs, competitive fees, and features like trading bots, futures, and margin trading.",
    features: [
      "800+ cryptocurrencies",
      "Trading bots",
      "Futures trading",
      "Margin trading (10x)",
      "Lending & earning",
      "NFT marketplace",
      "KuCoin Spotlight (new tokens)",
      "Low trading fees"
    ],
    pros: [
      "Huge coin selection",
      "Very low trading fees",
      "Many XRP pairs available",
      "Built-in trading bots",
      "Good liquidity",
      "Active promotions"
    ],
    cons: [
      "Not licensed in US",
      "Less regulatory oversight",
      "Can be overwhelming",
      "Withdrawal fees vary"
    ],
    bestFor: "Experienced traders who want access to many altcoins and trading features.",
    fees: {
      trading: "0.1% maker / 0.1% taker",
      deposit: "Free (crypto)",
      withdrawal: "0.25 XRP"
    },
    paymentMethods: ["Credit/Debit Card", "Bank Transfer", "P2P Trading", "Crypto Deposit", "Apple Pay"],
    supportedCountries: "Available globally (some restrictions apply)"
  }
};

export default function ExchangeReview() {
  const { slug } = useParams<{ slug: string }>();
  const exchange = exchangeData[slug || ""];

  if (!exchange) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Exchange Not Found</h1>
          <p className="text-muted-foreground mb-8">The exchange you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/#exchanges">View All Exchanges</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Link href="/#exchanges" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Exchange Partners
        </Link>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-5">
              {logoMap[slug || ""] && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 bg-black/40 flex-shrink-0 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]">
                  <img src={logoMap[slug || ""]} alt={exchange.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <div className="text-sm text-primary font-display mb-2">{exchange.type}</div>
                <h1 className="text-3xl md:text-4xl font-black font-display mb-2">{exchange.name}</h1>
                <p className="text-xl text-muted-foreground">{exchange.tagline}</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{exchange.rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="text-sm text-muted-foreground">Est. {exchange.founded}</div>
            </div>
          </div>

          {exchange.bonus && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20 mb-8">
              <Gift className="h-5 w-5 text-green-400" />
              <span className="text-green-200">{exchange.bonus}</span>
            </div>
          )}

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {exchange.description}
          </p>

          <a 
            href={exchange.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
            data-testid={`button-signup-${slug}`}
          >
            Sign Up for {exchange.name} <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Pros
            </h2>
            <ul className="space-y-2">
              {exchange.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-1" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              Cons
            </h2>
            <ul className="space-y-2">
              {exchange.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-muted-foreground">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-1" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-400" />
            Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">Trading Fee</div>
              <div className="font-bold">{exchange.fees.trading}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">Deposit Fee</div>
              <div className="font-bold">{exchange.fees.deposit}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">XRP Withdrawal</div>
              <div className="font-bold">{exchange.fees.withdrawal}</div>
            </div>
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exchange.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-display mb-4">Payment Methods</h2>
            <ul className="space-y-2">
              {exchange.paymentMethods.map((method) => (
                <li key={method} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                  {method}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-display mb-4">Availability</h2>
            <p className="text-muted-foreground">{exchange.supportedCountries}</p>
            <div className="mt-4 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 inline mr-2" />
              Headquarters: {exchange.headquarters}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-2">Best For</h2>
          <p className="text-muted-foreground">{exchange.bestFor}</p>
        </div>

        <div className="text-center">
          <a 
            href={exchange.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 px-10 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-lg transition-colors"
          >
            Sign Up for {exchange.name} <ExternalLink className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            Affiliate link - we may earn a commission at no extra cost to you
          </p>
        </div>
      </div>
    </Layout>
  );
}
