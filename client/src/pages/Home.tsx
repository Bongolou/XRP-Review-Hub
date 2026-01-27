import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Check, 
  ArrowRight, 
  ExternalLink,
  Lock,
  Zap,
  Layers,
  TrendingUp
} from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import xamanLogo from "@/assets/logos/xaman-logo.png";
import ledgerLogo from "@/assets/logos/ledger-logo.png";
import crossmarkLogo from "@/assets/logos/crossmark-logo.png";
import tangemLogo from "@/assets/logos/tangem-logo.png";
import upholdLogo from "@/assets/logos/uphold-logo.png";
import bitrueLogo from "@/assets/logos/bitrue-logo.png";
import krakenLogo from "@/assets/logos/kraken-logo.png";
import bifrostLogo from "@/assets/logos/bifrost-logo.png";
import gatehubLogo from "@/assets/logos/gatehub-logo.png";
import trustwalletLogo from "@/assets/logos/trustwallet-logo.png";
import ellipalLogo from "@/assets/logos/ellipal-logo.png";
import trezorLogo from "@/assets/logos/trezor-logo.png";
import bitstampLogo from "@/assets/logos/bitstamp-logo.png";
import coinbaseLogo from "@/assets/logos/coinbase-logo.png";
import cryptocomLogo from "@/assets/logos/cryptocom-logo.png";
import kucoinLogo from "@/assets/logos/kucoin-logo.png";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { NewsletterForm } from "@/components/NewsletterForm";
import { DealOfTheWeek } from "@/components/DealOfTheWeek";
import { BannerAd } from "@/components/BannerAd";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Mock Data
const wallets = [
  {
    id: 1,
    name: "Xaman (Xumm)",
    slug: "xaman",
    type: "Mobile App",
    rating: 9.9,
    fees: "Free",
    features: ["Self-Custody", "dApp Browser", "Biometric Auth", "Fiat On-ramp"],
    popular: true,
    badgeText: "Top Free XRPL Wallet",
    link: "https://xumm.app/?ref=allthingsxrpl",
    logo: xamanLogo,
    complementary: [
      { name: "Tangem Card (Backup)", link: "https://tangem.com/?promocode=ALLTHINGSXRPL" },
      { name: "Ledger (Cold Storage)", link: "https://shop.ledger.com/?r=5d81f18905fe" }
    ]
  },
  {
    id: 2,
    name: "Ledger Nano X",
    slug: "ledger",
    type: "Hardware",
    rating: 9.9,
    fees: "Standard",
    features: ["Cold Storage", "Bluetooth", "Multi-Currency", "High Security"],
    popular: false,
    link: "https://shop.ledger.com/?r=5d81f18905fe",
    logo: ledgerLogo
  },
  {
    id: 3,
    name: "Crossmark",
    slug: "crossmark",
    type: "Browser Ext",
    rating: 9.5,
    fees: "Low",
    features: ["Web3 Auth", "Multi-Network", "Developer Friendly", "Lightweight"],
    popular: false,
    link: "https://crossmark.io/?ref=allthingsxrpl",
    logo: crossmarkLogo
  },
  {
    id: 4,
    name: "Tangem",
    slug: "tangem",
    type: "Hardware Card",
    rating: 9.4,
    fees: "None",
    features: ["NFC Support", "Waterproof", "No Battery", "Easy Setup"],
    popular: false,
    link: "https://tangem.com/?promocode=ALLTHINGSXRPL",
    logo: tangemLogo
  },
  {
    id: 5,
    name: "Bifrost Wallet",
    slug: "bifrost",
    type: "Mobile App",
    rating: 9.2,
    fees: "Free",
    features: ["Privacy-Focused", "dApp Browser", "No Tracking", "Multi-Chain"],
    popular: false,
    link: "https://bifrostwallet.com/?ref=allthingsxrpl",
    logo: bifrostLogo
  },
  {
    id: 6,
    name: "Trust Wallet",
    slug: "trustwallet",
    type: "Mobile App",
    rating: 9.0,
    fees: "Free",
    features: ["70M+ Users", "Multi-Chain", "dApp Browser", "Staking"],
    popular: false,
    link: "https://trustwallet.com/?ref=allthingsxrpl",
    logo: trustwalletLogo
  },
  {
    id: 7,
    name: "GateHub",
    slug: "gatehub",
    type: "Web Wallet",
    rating: 8.8,
    fees: "Low",
    features: ["Fiat Gateway", "Multisig", "Trading", "Theft Cover"],
    popular: false,
    link: "https://gatehub.net/?ref=allthingsxrpl",
    logo: gatehubLogo
  },
  {
    id: 8,
    name: "ELLIPAL Titan",
    slug: "ellipal",
    type: "Hardware",
    rating: 9.4,
    fees: "$169",
    features: ["Air-Gapped", "QR Only", "Military-Grade", "Anti-Tamper"],
    popular: false,
    link: "https://www.ellipal.com/?rfsn=8973243.bbfab69",
    logo: ellipalLogo
  },
  {
    id: 9,
    name: "Trezor Safe 3",
    slug: "trezor",
    type: "Hardware",
    rating: 9.2,
    fees: "$79",
    features: ["Open Source", "Secure Element", "Budget-Friendly", "Trusted"],
    popular: false,
    link: "https://trezor.io/?ref=allthingsxrpl",
    logo: trezorLogo
  }
];

const exchanges = [
  {
    id: 1,
    name: "Uphold",
    slug: "uphold",
    bonus: "$20 BTC Bonus",
    features: ["Best for XRP", "Fiat On-Ramp", "Instant Trade"],
    link: "https://uphold.com/signup?referral=allthingsxrpl",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    logo: upholdLogo
  },
  {
    id: 2,
    name: "Bitrue",
    slug: "bitrue",
    bonus: "1000 XRP Airdrop",
    features: ["XRP Base Pairs", "Power Piggy Staking", "Low Fees"],
    link: "https://bitrue.com/user/register?inviteCode=allthingsxrpl",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    logo: bitrueLogo
  },
  {
    id: 3,
    name: "Kraken",
    slug: "kraken",
    bonus: "Low Fee Trading",
    features: ["High Security", "Deep Liquidity", "Pro Tools"],
    link: "https://kraken.com/sign-up?r=allthingsxrpl",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    logo: krakenLogo
  },
  {
    id: 4,
    name: "Coinbase",
    slug: "coinbase",
    bonus: "$10 Free Crypto",
    features: ["Most Trusted", "Beginner-Friendly", "US Based"],
    link: "https://www.coinbase.com/join?ref=allthingsxrpl",
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
    logo: coinbaseLogo
  },
  {
    id: 5,
    name: "Bitstamp",
    slug: "bitstamp",
    bonus: "Volume Discounts",
    features: ["Since 2011", "EU Regulated", "High Liquidity"],
    link: "https://www.bitstamp.net/?ref=allthingsxrpl",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
    logo: bitstampLogo
  },
  {
    id: 6,
    name: "Crypto.com",
    slug: "cryptocom",
    bonus: "$25 Signup Bonus",
    features: ["Visa Card", "Earn Interest", "250+ Coins"],
    link: "https://crypto.com/app?ref=allthingsxrpl",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/20",
    logo: cryptocomLogo
  },
  {
    id: 7,
    name: "KuCoin",
    slug: "kucoin",
    bonus: "Welcome Bonus",
    features: ["800+ Coins", "Trading Bots", "Low Fees"],
    link: "https://www.kucoin.com/r?ref=allthingsxrpl",
    color: "text-teal-500",
    bgColor: "bg-teal-500/20",
    logo: kucoinLogo
  }
];

const blogPosts = [
  {
    id: 1,
    title: "Top 5 DeFi dApps on XRPL in 2026",
    excerpt: "Discover the leading decentralized finance protocols bringing yield and liquidity to the XRP Ledger this year.",
    category: "Ecosystem",
    date: "Jan 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Understanding AMM Staking Rewards",
    excerpt: "A comprehensive guide to the Automated Market Maker (AMM) functionality on XRPL and how to earn passive income.",
    category: "Guides",
    date: "Jan 20, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Security Best Practices for Self-Custody",
    excerpt: "Protect your digital assets with these essential security tips for hardware and software wallet users.",
    category: "Security",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "NFT Marketplaces on XRPL: Complete Guide",
    excerpt: "Explore the growing NFT ecosystem on the XRP Ledger, including top marketplaces and how to mint your first NFT.",
    category: "NFTs",
    date: "Jan 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "XRPL Sidechains Explained",
    excerpt: "Learn how sidechains extend the capabilities of the XRP Ledger and enable new use cases like smart contracts.",
    category: "Technology",
    date: "Jan 8, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Tokenizing Real World Assets on XRPL",
    excerpt: "How institutions are bringing real estate, stocks, and commodities to the XRP Ledger through tokenization.",
    category: "Institutional",
    date: "Jan 5, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
  }
];

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-transparent to-background/50" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 grid-bg opacity-20 pointer-events-none" />

        <div className="container relative z-10 px-4 pt-20 pb-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              XRPL Ecosystem Intelligence
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 glow-text"
          >
            NAVIGATE THE<br/>XRP LEDGER
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Your definitive guide to the best wallets, dApps, and DeFi tools on the XRPL. 
            Secure your assets and maximize your yield with our expert reviews.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/#wallets">
              <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 text-white font-bold tracking-wide shadow-[0_0_30px_-10px_theme('colors.primary.DEFAULT')]">
                Compare Wallets
              </Button>
            </Link>
            <Link href="/wallet-quiz">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                Find Your Perfect Wallet
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating Stats/Elements for depth */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Deal of the Week */}
      <section className="container mx-auto px-4 py-12 -mt-12 relative z-20">
        <DealOfTheWeek />
      </section>

      {/* Wallet Comparison Section */}
      <section id="wallets" className="py-24 container mx-auto px-4 relative">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Top XRP Wallets</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Secure your XRP with the most trusted wallets in the industry. We've tested them all so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          {wallets.map((wallet, idx) => (
            <motion.div 
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/40 backdrop-blur-md p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                  <div className="flex-shrink-0 rounded-xl overflow-hidden self-center md:self-start">
                    <img src={wallet.logo} alt={`${wallet.name} logo`} className="w-14 h-14 object-cover rounded-xl" />
                  </div>
                  
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display">{wallet.name}</h3>
                      {wallet.popular && (
                        <Badge className="bg-secondary/20 text-secondary border-secondary/50">
                          {wallet.badgeText || "Top Choice"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{wallet.type} Wallet • {wallet.fees} Fees</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                      {wallet.features.map((feature, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {wallet.complementary && (
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs">
                        <span className="text-muted-foreground block mb-2 font-medium">Maximize Security with:</span>
                        <div className="flex flex-wrap gap-2">
                          {wallet.complementary.map((tool, tIdx) => (
                            <a 
                              key={tIdx} 
                              href={tool.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors bg-primary/10 px-2 py-1 rounded border border-primary/20"
                            >
                              {tool.name} <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-shrink-0 self-center md:self-start md:pt-1">
                    <div className="text-3xl font-black font-display text-primary">{wallet.rating}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Score</div>
                  </div>

                  <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-[140px] self-center md:self-start md:pt-1">
                    <Button asChild className="w-full relative group overflow-hidden bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white font-bold shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)] transition-all duration-300">
                      <a href={wallet.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <span className="relative z-10">Visit Site</span>
                        <ExternalLink className="ml-2 h-4 w-4 relative z-10" />
                      </a>
                    </Button>
                    {wallet.slug && (
                      <Link href={`/wallet/${wallet.slug}`}>
                        <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          Read Review <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-6">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/compare/xaman-vs-ledger">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 text-sm transition-all duration-300">
                Xaman vs Ledger
              </Button>
            </Link>
            <Link href="/compare/xaman-vs-tangem">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 text-sm transition-all duration-300">
                Xaman vs Tangem
              </Button>
            </Link>
            <Link href="/compare/ledger-vs-tangem">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 text-sm transition-all duration-300">
                Ledger vs Tangem
              </Button>
            </Link>
          </div>
          <Link href="/wallet-quiz">
            <Button size="lg" className="bg-gradient-to-r from-primary/20 to-blue-400/20 border border-primary/50 text-primary hover:from-primary/30 hover:to-blue-400/30 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] transition-all duration-300">
              Not sure which wallet? Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Sponsored Banner */}
      <section className="container mx-auto px-4 py-6">
        <BannerAd variant="horizontal" />
      </section>

      {/* Top Exchanges Section */}
      <section className="py-24 bg-card/10 border-y border-white/5 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30 border-primary/50">Partner Offers</Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Top Exchanges for XRP</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get the best sign-up bonuses and lowest fees with our partner exchanges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exchanges.map((exchange, idx) => (
              <motion.div
                key={exchange.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl -z-10" />
                <div className="p-8 rounded-2xl border border-white/10 bg-card/20 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-xl overflow-hidden">
                      <img src={exchange.logo} alt={`${exchange.name} logo`} className="w-full h-full object-cover" />
                    </div>
                    <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                      {exchange.bonus}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-display mb-4">{exchange.name}</h3>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {exchange.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-3">
                    <Button asChild className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white font-bold shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)] transition-all duration-300">
                      <a href={exchange.link} target="_blank" rel="noopener noreferrer">
                        Claim Bonus <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Link href={`/exchange/${exchange.slug}`}>
                      <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                        Read Review <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-card/50 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold font-display mb-2">Partner with All Things XRPL</h3>
              <p className="text-muted-foreground">Are you a project builder or service provider? Connect with our audience.</p>
            </div>
            <Link href="/contact">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-card/20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute -right-40 top-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/blog/3" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 cursor-pointer h-full hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">Security First</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We prioritize security above all else. Our reviews focus heavily on auditing standards, key management, and track records.
                </p>
                <span className="text-sm text-primary flex items-center gap-1">
                  Learn about wallet security <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link href="/yield" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 cursor-pointer h-full hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-green-500/30 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-green-400 transition-colors">Yield Opportunities</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Discover the best places to stake your XRP and participate in AMM pools to earn passive income on your holdings.
                </p>
                <span className="text-sm text-green-400 flex items-center gap-1">
                  Explore staking options <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link href="/blog" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 cursor-pointer h-full hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-purple-400 transition-colors">Deep Dives</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We go beyond surface-level features. Our team tests every dApp and wallet to give you the real user experience.
                </p>
                <span className="text-sm text-purple-400 flex items-center gap-1">
                  Read our articles <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog/Insights Section */}
      <section id="blog" className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Latest Insights</h2>
            <p className="text-muted-foreground text-lg">
              Stay ahead of the curve with our latest research on the XRP Ledger ecosystem.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="border-white/20 hover:bg-white/10">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block h-full">
              <div className="h-full bg-card/30 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                  <Badge className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur border-white/10 text-foreground hover:bg-background">
                    {post.category}
                  </Badge>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-primary font-medium mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {post.date} • {post.readTime}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 p-12 text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Join All Things XRPL</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Get the latest wallet reviews, security alerts, and dApp opportunities delivered straight to your inbox.
            </p>
            <NewsletterForm />
            <p className="mt-4 text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
