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
  TrendingUp,
  Clock,
  Newspaper
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import heroBg from "@/assets/hero-bg.webp";
import xamanLogo from "@/assets/logos/xaman-logo.webp";
import ledgerLogo from "@/assets/logos/ledger-logo.webp";
import crossmarkLogo from "@/assets/logos/crossmark-logo.webp";
import tangemLogo from "@/assets/logos/tangem-logo.webp";
import upholdLogo from "@/assets/logos/uphold-logo.webp";
import bitrueLogo from "@/assets/logos/bitrue-logo.webp";
import krakenLogo from "@/assets/logos/kraken-logo.webp";
import bifrostLogo from "@/assets/logos/bifrost-logo.webp";
import gatehubLogo from "@/assets/logos/gatehub-logo.webp";
import trustwalletLogo from "@/assets/logos/trustwallet-logo.webp";
import ellipalLogo from "@/assets/logos/ellipal-logo.webp";
import trezorLogo from "@/assets/logos/trezor-logo.webp";
import bitstampLogo from "@/assets/logos/bitstamp-logo.webp";
import coinbaseLogo from "@/assets/logos/coinbase-logo.webp";
import cryptocomLogo from "@/assets/logos/cryptocom-logo.webp";
import kucoinLogo from "@/assets/logos/kucoin-logo.webp";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { NewsletterForm } from "@/components/NewsletterForm";
import { DealOfTheWeek } from "@/components/DealOfTheWeek";
import { BannerAd } from "@/components/BannerAd";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Wallet data with translation keys
const walletsData = [
  {
    id: 1,
    name: "Xaman (Xumm)",
    slug: "xaman",
    typeKey: "wallet.type.mobileApp",
    rating: 9.9,
    feesKey: "wallet.fees.free",
    featureKeys: ["wallet.feature.selfCustody", "wallet.feature.dappBrowser", "wallet.feature.biometricAuth", "wallet.feature.fiatOnramp"],
    popular: true,
    badgeKey: "wallet.badge.topFreeXRPL",
    link: "https://xumm.app/?ref=allthingsxrpl",
    logo: xamanLogo,
    complementary: [
      { nameKey: "wallet.complementary.tangemBackup", link: "https://tangem.com/?promocode=ALLTHINGSXRPL" },
      { nameKey: "wallet.complementary.ledgerCold", link: "https://shop.ledger.com/?r=5d81f18905fe" }
    ]
  },
  {
    id: 2,
    name: "Ledger Nano X",
    slug: "ledger",
    typeKey: "wallet.type.hardware",
    rating: 9.9,
    feesKey: "wallet.fees.standard",
    featureKeys: ["wallet.feature.coldStorage", "wallet.feature.bluetooth", "wallet.feature.multiCurrency", "wallet.feature.highSecurity"],
    popular: false,
    link: "https://shop.ledger.com/?r=5d81f18905fe",
    logo: ledgerLogo
  },
  {
    id: 3,
    name: "Crossmark",
    slug: "crossmark",
    typeKey: "wallet.type.browserExt",
    rating: 9.5,
    feesKey: "wallet.fees.low",
    featureKeys: ["wallet.feature.web3Auth", "wallet.feature.multiNetwork", "wallet.feature.developerFriendly", "wallet.feature.lightweight"],
    popular: false,
    link: "https://crossmark.io/?ref=allthingsxrpl",
    logo: crossmarkLogo
  },
  {
    id: 4,
    name: "Tangem",
    slug: "tangem",
    typeKey: "wallet.type.hardwareCard",
    rating: 9.4,
    feesKey: "wallet.fees.none",
    featureKeys: ["wallet.feature.nfcSupport", "wallet.feature.waterproof", "wallet.feature.noBattery", "wallet.feature.easySetup"],
    popular: false,
    link: "https://tangem.com/?promocode=ALLTHINGSXRPL",
    logo: tangemLogo
  },
  {
    id: 5,
    name: "Bifrost Wallet",
    slug: "bifrost",
    typeKey: "wallet.type.mobileApp",
    rating: 9.2,
    feesKey: "wallet.fees.free",
    featureKeys: ["wallet.feature.privacyFocused", "wallet.feature.dappBrowser", "wallet.feature.noTracking", "wallet.feature.multiChain"],
    popular: false,
    link: "https://bifrostwallet.com/?ref=allthingsxrpl",
    logo: bifrostLogo
  },
  {
    id: 6,
    name: "Trust Wallet",
    slug: "trustwallet",
    typeKey: "wallet.type.mobileApp",
    rating: 9.0,
    feesKey: "wallet.fees.free",
    featureKeys: ["wallet.feature.users70m", "wallet.feature.multiChain", "wallet.feature.dappBrowser", "wallet.feature.staking"],
    popular: false,
    link: "https://trustwallet.com/?ref=allthingsxrpl",
    logo: trustwalletLogo
  },
  {
    id: 7,
    name: "GateHub",
    slug: "gatehub",
    typeKey: "wallet.type.webWallet",
    rating: 8.8,
    feesKey: "wallet.fees.low",
    featureKeys: ["wallet.feature.fiatGateway", "wallet.feature.multisig", "wallet.feature.trading", "wallet.feature.theftCover"],
    popular: false,
    link: "https://gatehub.net/?ref=allthingsxrpl",
    logo: gatehubLogo
  },
  {
    id: 8,
    name: "ELLIPAL Titan",
    slug: "ellipal",
    typeKey: "wallet.type.hardware",
    rating: 9.4,
    fees: "$169",
    featureKeys: ["wallet.feature.airGapped", "wallet.feature.qrOnly", "wallet.feature.militaryGrade", "wallet.feature.antiTamper"],
    popular: false,
    link: "https://www.ellipal.com/?rfsn=8973243.bbfab69",
    logo: ellipalLogo
  },
  {
    id: 9,
    name: "Trezor Safe 3",
    slug: "trezor",
    typeKey: "wallet.type.hardware",
    rating: 9.2,
    fees: "$79",
    featureKeys: ["wallet.feature.openSource", "wallet.feature.secureElement", "wallet.feature.budgetFriendly", "wallet.feature.trusted"],
    popular: false,
    link: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959",
    logo: trezorLogo
  }
];

// Exchange data with translation keys
const exchangesData = [
  {
    id: 1,
    name: "Uphold",
    slug: "uphold",
    bonusKey: "exchange.bonus.btc20",
    featureKeys: ["exchange.feature.bestForXRP", "exchange.feature.fiatOnRamp", "exchange.feature.instantTrade"],
    link: "https://uphold.com/signup?referral=allthingsxrpl",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    logo: upholdLogo
  },
  {
    id: 2,
    name: "Bitrue",
    slug: "bitrue",
    bonusKey: "exchange.bonus.xrp1000",
    featureKeys: ["exchange.feature.xrpBasePairs", "exchange.feature.powerPiggy", "exchange.feature.lowFees"],
    link: "https://bitrue.com/user/register?inviteCode=allthingsxrpl",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    logo: bitrueLogo
  },
  {
    id: 3,
    name: "Kraken",
    slug: "kraken",
    bonusKey: "exchange.bonus.lowFee",
    featureKeys: ["exchange.feature.highSecurity", "exchange.feature.deepLiquidity", "exchange.feature.proTools"],
    link: "https://kraken.com/sign-up?r=allthingsxrpl",
    color: "text-purple-500",
    bgColor: "bg-purple-500/20",
    logo: krakenLogo
  },
  {
    id: 4,
    name: "Coinbase",
    slug: "coinbase",
    bonusKey: "exchange.bonus.crypto10",
    featureKeys: ["exchange.feature.mostTrusted", "exchange.feature.beginnerFriendly", "exchange.feature.usBased"],
    link: "https://www.coinbase.com/join?ref=allthingsxrpl",
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
    logo: coinbaseLogo
  },
  {
    id: 5,
    name: "Bitstamp",
    slug: "bitstamp",
    bonusKey: "exchange.bonus.volume",
    featureKeys: ["exchange.feature.since2011", "exchange.feature.euRegulated", "exchange.feature.highLiquidity"],
    link: "https://www.bitstamp.net/?ref=allthingsxrpl",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/20",
    logo: bitstampLogo
  },
  {
    id: 6,
    name: "Crypto.com",
    slug: "cryptocom",
    bonusKey: "exchange.bonus.signup25",
    featureKeys: ["exchange.feature.visaCard", "exchange.feature.earnInterest", "exchange.feature.coins250"],
    link: "https://crypto.com/app?ref=allthingsxrpl",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/20",
    logo: cryptocomLogo
  },
  {
    id: 7,
    name: "KuCoin",
    slug: "kucoin",
    bonusKey: "exchange.bonus.welcome",
    featureKeys: ["exchange.feature.coins800", "exchange.feature.tradingBots", "exchange.feature.lowFees"],
    link: "https://www.kucoin.com/r?ref=allthingsxrpl",
    color: "text-teal-500",
    bgColor: "bg-teal-500/20",
    logo: kucoinLogo
  }
];

// Blog posts data with translation keys
const blogPostsData = [
  {
    id: 1,
    titleKey: "blog.post1.title",
    excerptKey: "blog.post1.excerpt",
    categoryKey: "blog.post1.category",
    date: "Jan 24, 2026",
    readTimeNum: 5,
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    titleKey: "blog.post2.title",
    excerptKey: "blog.post2.excerpt",
    categoryKey: "blog.post2.category",
    date: "Jan 20, 2026",
    readTimeNum: 8,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    titleKey: "blog.post3.title",
    excerptKey: "blog.post3.excerpt",
    categoryKey: "blog.post3.category",
    date: "Jan 15, 2026",
    readTimeNum: 4,
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    titleKey: "blog.post4.title",
    excerptKey: "blog.post4.excerpt",
    categoryKey: "blog.post4.category",
    date: "Jan 12, 2026",
    readTimeNum: 6,
    image: "https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=400&auto=format&fit=crop"
  },
  {
    id: 5,
    titleKey: "blog.post5.title",
    excerptKey: "blog.post5.excerpt",
    categoryKey: "blog.post5.category",
    date: "Jan 8, 2026",
    readTimeNum: 7,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&auto=format&fit=crop"
  },
  {
    id: 6,
    titleKey: "blog.post6.title",
    excerptKey: "blog.post6.excerpt",
    categoryKey: "blog.post6.category",
    date: "Jan 5, 2026",
    readTimeNum: 9,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop"
  }
];

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function LatestNewsPreview({ t }: { t: (key: string) => string }) {
  const { data, isLoading } = useQuery<{ items: { title: string; link: string; pubDate: string; source: string }[] }>({
    queryKey: ["/api/news"],
    queryFn: async () => {
      const res = await fetch("/api/news?limit=4");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const news = data?.items?.slice(0, 4) || [];
  if (!isLoading && news.length === 0) return null;

  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary bg-primary/10">
          <Newspaper className="h-3.5 w-3.5 mr-2" />
          {t("news.live")}
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">{t("news.latestTitle")}</h2>
        <p className="text-muted-foreground text-lg">{t("news.latestSubtitle")}</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card/30 rounded-xl border border-white/10 p-5 animate-pulse">
              <div className="h-3 bg-white/10 rounded w-20 mb-3"></div>
              <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
            {news.map((item, idx) => (
              <motion.a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group block"
                data-testid={`card-home-news-${idx}`}
              >
                <div className="bg-card/30 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 p-5 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs text-primary font-medium">{item.source}</span>
                    {item.pubDate && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(item.pubDate)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 flex-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-xs text-primary/70 font-medium mt-3">
                    {t("news.readMore")} <ExternalLink className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="text-center">
            <Link href="/news">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" data-testid="button-view-all-news">
                {t("news.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Video Background - with mobile fallback */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Static image fallback for mobile/reduced motion */}
          <div 
            className="absolute inset-0 md:hidden opacity-50"
            style={{ 
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Video for desktop */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-50 hidden md:block"
            poster={heroBg}
            // @ts-ignore
            fetchpriority="high"
          >
            <source src="/videos/hero-crypto-flow.mp4" type="video/mp4" />
          </video>
        </div>
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
              {t("hero.badge")}
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 glow-text"
          >
            {t("hero.title1")}<br/>{t("hero.title2")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              className="h-14 !px-12 text-base bg-primary hover:bg-primary/90 text-white font-bold tracking-wide shadow-[0_0_30px_-10px_theme('colors.primary.DEFAULT')]"
              onClick={() => document.getElementById('wallets')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t("hero.cta.compare")}
            </Button>
            <Link href="/wallet-quiz">
              <Button size="lg" variant="outline" className="h-14 !px-12 text-base border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm">
                {t("hero.cta.quiz")}
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
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">{t("wallets.sectionTitle")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("wallets.sectionSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 relative z-10">
          {walletsData.map((wallet, idx) => (
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
                    <img src={wallet.logo} alt={`${wallet.name} logo`} className="w-14 h-14 object-cover rounded-xl" width={56} height={56} loading="lazy" />
                  </div>
                  
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display">{wallet.name}</h3>
                      {wallet.popular && wallet.badgeKey && (
                        <Badge className="bg-secondary/20 text-secondary border-secondary/50">
                          {t(wallet.badgeKey)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t(wallet.typeKey)} {t("wallets.wallet")} • {wallet.fees || t(wallet.feesKey)} {t("wallets.fees")}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                      {wallet.featureKeys.map((featureKey, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">
                          {t(featureKey)}
                        </span>
                      ))}
                    </div>
                    
                    {wallet.complementary && (
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs">
                        <span className="text-muted-foreground block mb-2 font-medium">{t("wallets.maximizeSecurity")}</span>
                        <div className="flex flex-wrap gap-2">
                          {wallet.complementary.map((tool, tIdx) => (
                            <a 
                              key={tIdx} 
                              href={tool.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors bg-primary/10 px-2 py-1 rounded border border-primary/20"
                            >
                              {t(tool.nameKey)} <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-2 flex-shrink-0 self-center md:self-start md:pt-1">
                    <div className="text-3xl font-black font-display text-primary">{wallet.rating}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{t("wallets.score")}</div>
                  </div>

                  <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-[140px] self-center md:self-start md:pt-1">
                    <Button asChild className="w-full relative group overflow-hidden bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white font-bold shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)] transition-all duration-300">
                      <a href={wallet.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" aria-label={`Visit ${wallet.name} website`}>
                        <span className="relative z-10">{t("wallets.visitSite")}</span>
                        <ExternalLink className="ml-2 h-4 w-4 relative z-10" />
                      </a>
                    </Button>
                    {wallet.slug && (
                      <Link href={`/wallet/${wallet.slug}`}>
                        <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          {t("wallets.readReview")} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-8">
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
              {t("wallets.takeQuiz")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Sponsored Banner */}
      <section className="container mx-auto px-4 py-12 mt-8">
        <BannerAd variant="horizontal" />
      </section>

      {/* Top Exchanges Section */}
      <section className="py-24 mt-8 bg-card/10 border-y border-white/5 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/20 text-white hover:bg-primary/30 border-primary/50">{t("exchanges.badge")}</Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">{t("exchanges.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("exchanges.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {exchangesData.map((exchange, idx) => (
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
                      <img src={exchange.logo} alt={`${exchange.name} logo`} className="w-full h-full object-cover" width={56} height={56} loading="lazy" />
                    </div>
                    <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                      {t(exchange.bonusKey)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold font-display mb-4">{exchange.name}</h3>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {exchange.featureKeys.map((featureKey, i) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        {t(featureKey)}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-3">
                    <Button asChild className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 text-white font-bold shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.7)] transition-all duration-300">
                      <a href={exchange.link} target="_blank" rel="noopener noreferrer" aria-label={`Claim bonus at ${exchange.name}`}>
                        {t("exchanges.claimBonus")} <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Link href={`/exchange/${exchange.slug}`}>
                      <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                        {t("exchanges.readReview")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-card/50 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold font-display mb-2">{t("exchanges.partnerTitle")}</h3>
              <p className="text-muted-foreground">{t("exchanges.partnerDesc")}</p>
            </div>
            <Link href="/contact">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                {t("exchanges.becomePartner")}
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
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">{t("features.security.title")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("features.security.desc")}
                </p>
                <span className="text-sm text-primary flex items-center gap-1">
                  {t("features.security.link")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link href="/yield" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 cursor-pointer h-full hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.3)]">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-green-500/30 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-green-400 transition-colors">{t("features.yield.title")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("features.yield.desc")}
                </p>
                <span className="text-sm text-green-400 flex items-center gap-1">
                  {t("features.yield.link")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            <Link href="/blog" className="group">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 cursor-pointer h-full hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)]">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-purple-400 transition-colors">{t("features.deep.title")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t("features.deep.desc")}
                </p>
                <span className="text-sm text-purple-400 flex items-center gap-1">
                  {t("features.deep.link")} <ArrowRight className="h-4 w-4" />
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
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">{t("blog.title")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("blog.subtitle")}
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="border-white/20 hover:bg-white/10">
              {t("blog.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post, idx) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block h-full">
              <div className="h-full bg-card/30 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={post.image} 
                    alt={t(post.titleKey)} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                  <Badge className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur border-white/10 text-foreground hover:bg-background">
                    {t(post.categoryKey)}
                  </Badge>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-primary font-medium mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {post.date} • {post.readTimeNum} {t("blog.minRead")}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors leading-tight">
                    {t(post.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {t(post.excerptKey)}
                  </p>
                  <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                    {t("blog.readArticle")} <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News Preview */}
      <LatestNewsPreview t={t} />

      {/* Newsletter CTA */}
      <section className="py-24 container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 p-12 text-center">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{t("newsletter.ctaTitle")}</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t("newsletter.ctaSubtitle")}
            </p>
            <NewsletterForm />
            <p className="mt-4 text-xs text-muted-foreground">
              {t("newsletter.privacy")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
