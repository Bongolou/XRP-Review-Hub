import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Shield, 
  Smartphone, 
  Globe, 
  Cpu, 
  Check, 
  ArrowRight, 
  ExternalLink,
  Lock,
  Zap,
  Layers,
  TrendingUp
} from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { Link } from "wouter";
import { motion } from "framer-motion";

// Mock Data
const wallets = [
  {
    id: 1,
    name: "Xaman (Xumm)",
    type: "Mobile App",
    rating: 9.9,
    fees: "Free",
    features: ["Self-Custody", "dApp Browser", "Biometric Auth", "Fiat On-ramp"],
    popular: true,
    badgeText: "Top Free XRPL Wallet",
    link: "https://xumm.app/?ref=allthingsxrpl",
    icon: <Smartphone className="h-6 w-6 text-blue-400" />,
    complementary: [
      { name: "Tangem Card (Backup)", link: "https://tangem.com/?promocode=ALLTHINGSXRPL" },
      { name: "Ledger (Cold Storage)", link: "https://shop.ledger.com/?r=allthingsxrpl" }
    ]
  },
  {
    id: 2,
    name: "Ledger Nano X",
    type: "Hardware",
    rating: 9.9,
    fees: "Standard",
    features: ["Cold Storage", "Bluetooth", "Multi-Currency", "High Security"],
    popular: false,
    link: "https://shop.ledger.com/?r=allthingsxrpl",
    icon: <Shield className="h-6 w-6 text-purple-400" />
  },
  {
    id: 3,
    name: "Crossmark",
    type: "Browser Ext",
    rating: 9.5,
    fees: "Low",
    features: ["Web3 Auth", "Multi-Network", "Developer Friendly", "Lightweight"],
    popular: false,
    link: "https://crossmark.io/?ref=allthingsxrpl",
    icon: <Globe className="h-6 w-6 text-orange-400" />
  },
  {
    id: 4,
    name: "Tangem",
    type: "Hardware Card",
    rating: 9.4,
    fees: "None",
    features: ["NFC Support", "Waterproof", "No Battery", "Easy Setup"],
    popular: false,
    link: "https://tangem.com/?promocode=ALLTHINGSXRPL",
    icon: <Cpu className="h-6 w-6 text-green-400" />
  }
];

const exchanges = [
  {
    id: 1,
    name: "Uphold",
    bonus: "$20 BTC Bonus",
    features: ["Best for XRP", "Fiat On-Ramp", "Instant Trade"],
    link: "https://uphold.com/signup?referral=allthingsxrpl",
    color: "text-green-500",
    bgColor: "bg-green-500/20"
  },
  {
    id: 2,
    name: "Bitrue",
    bonus: "1000 XRP Airdrop",
    features: ["XRP Base Pairs", "Power Piggy Staking", "Low Fees"],
    link: "https://bitrue.com/user/register?inviteCode=allthingsxrpl",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20"
  },
  {
    id: 3,
    name: "Kraken",
    bonus: "Low Fee Trading",
    features: ["High Security", "Deep Liquidity", "Pro Tools"],
    link: "https://kraken.com/sign-up?r=allthingsxrpl",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20"
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
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Understanding AMM Staking Rewards",
    excerpt: "A comprehensive guide to the Automated Market Maker (AMM) functionality on XRPL and how to earn passive income.",
    category: "Guides",
    date: "Jan 20, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fddadb3?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Security Best Practices for Self-Custody",
    excerpt: "Protect your digital assets with these essential security tips for hardware and software wallet users.",
    category: "Security",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2940&auto=format&fit=crop"
  }
];

export default function Home() {
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
            <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 text-white font-bold tracking-wide shadow-[0_0_30px_-10px_theme('colors.primary.DEFAULT')]">
              Compare Wallets
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm">
              Explore dApps
            </Button>
          </motion.div>
        </div>

        {/* Floating Stats/Elements for depth */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
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
                
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <div className="flex-shrink-0 bg-card p-4 rounded-xl border border-white/5 shadow-inner">
                    {wallet.icon}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display">{wallet.name}</h3>
                      {wallet.popular && (
                        <Badge className="bg-secondary/20 text-secondary border-secondary/50">
                          {wallet.badgeText || "Top Choice"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{wallet.type} Wallet • {wallet.fees} Fees</p>
                    
                    {/* Complementary Tools Section */}
                    {wallet.complementary && (
                      <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10 text-xs">
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

                  <div className="flex-1 w-full md:w-auto">
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {wallet.features.map((feature, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 min-w-[120px]">
                    <div className="text-3xl font-black font-display text-primary">{wallet.rating}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Score</div>
                  </div>

                  <div className="w-full md:w-auto">
                    <Button asChild className="w-full md:w-auto bg-white text-black hover:bg-white/90 font-bold">
                      <a href={wallet.link} target="_blank" rel="noopener noreferrer">
                        Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
                <div className="p-8 rounded-2xl border border-white/10 bg-card/20 backdrop-blur-sm hover:border-primary/50 transition-colors h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-lg ${exchange.bgColor} flex items-center justify-center border border-white/10`}>
                      <TrendingUp className={`h-6 w-6 ${exchange.color}`} />
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

                  <Button asChild className="w-full bg-white text-black hover:bg-white/90 font-bold group-hover:scale-105 transition-transform">
                    <a href={exchange.link} target="_blank" rel="noopener noreferrer">
                      Claim Bonus <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-card/50 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold font-display mb-2">Partner with All Things XRPL</h3>
              <p className="text-muted-foreground">Are you a project builder or service provider? Connect with our audience.</p>
            </div>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-card/20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute -right-40 top-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
              <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-primary/30">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Security First</h3>
              <p className="text-muted-foreground leading-relaxed">
                We prioritize security above all else. Our reviews focus heavily on auditing standards, key management, and track records.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
              <div className="bg-secondary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-secondary/30">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Yield Opportunities</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover the best places to stake your XRP and participate in AMM pools to earn passive income on your holdings.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-purple-500/30">
                <Layers className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Deep Dives</h3>
              <p className="text-muted-foreground leading-relaxed">
                We go beyond surface-level features. Our team tests every dApp and wallet to give you the real user experience.
              </p>
            </div>
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
          <Button variant="outline" className="border-white/20 hover:bg-white/10">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 h-12 px-4 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
              />
              <Button className="h-12 px-8 bg-white text-black hover:bg-white/90 font-bold">
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
