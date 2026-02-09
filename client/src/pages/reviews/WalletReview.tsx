import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { 
  Star, 
  Shield, 
  Smartphone, 
  Globe,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import xamanLogo from "@/assets/logos/xaman-logo.webp";
import ledgerLogo from "@/assets/logos/ledger-logo.webp";
import crossmarkLogo from "@/assets/logos/crossmark-logo.webp";
import bifrostLogo from "@/assets/logos/bifrost-logo.webp";
import gatehubLogo from "@/assets/logos/gatehub-logo.webp";
import trustwalletLogo from "@/assets/logos/trustwallet-logo.webp";
import ellipalLogo from "@/assets/logos/ellipal-logo.webp";
import trezorLogo from "@/assets/logos/trezor-logo.webp";

const logoMap: Record<string, string> = {
  xaman: xamanLogo,
  ledger: ledgerLogo,
  crossmark: crossmarkLogo,
  bifrost: bifrostLogo,
  gatehub: gatehubLogo,
  trustwallet: trustwalletLogo,
  ellipal: ellipalLogo,
  trezor: trezorLogo
};

const walletData: Record<string, {
  name: string;
  taglineKey: string;
  rating: number;
  typeKey: string;
  price: string;
  platforms: string[];
  website: string;
  affiliateLink: string;
  descriptionKey: string;
  featureKeys: string[];
  proKeys: string[];
  conKeys: string[];
  bestForKey: string;
  securityFeatureKeys: string[];
}> = {
  xaman: {
    name: "Xaman (XUMM)",
    taglineKey: "walletDetail.xaman.tagline",
    rating: 4.9,
    typeKey: "wallet.type.mobileApp",
    price: "Free",
    platforms: ["iOS", "Android"],
    website: "xaman.app",
    affiliateLink: "https://xaman.app/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.xaman.description",
    featureKeys: [
      "walletDetail.xaman.feature1",
      "walletDetail.xaman.feature2",
      "walletDetail.xaman.feature3",
      "walletDetail.xaman.feature4",
      "walletDetail.xaman.feature5",
      "walletDetail.xaman.feature6",
      "walletDetail.xaman.feature7",
      "walletDetail.xaman.feature8"
    ],
    proKeys: [
      "walletDetail.xaman.pro1",
      "walletDetail.xaman.pro2",
      "walletDetail.xaman.pro3",
      "walletDetail.xaman.pro4",
      "walletDetail.xaman.pro5",
      "walletDetail.xaman.pro6",
      "walletDetail.xaman.pro7"
    ],
    conKeys: [
      "walletDetail.xaman.con1",
      "walletDetail.xaman.con2",
      "walletDetail.xaman.con3"
    ],
    bestForKey: "walletDetail.xaman.bestFor",
    securityFeatureKeys: [
      "walletDetail.xaman.security1",
      "walletDetail.xaman.security2",
      "walletDetail.xaman.security3",
      "walletDetail.xaman.security4",
      "walletDetail.xaman.security5",
      "walletDetail.xaman.security6"
    ]
  },
  tangem: {
    name: "Tangem",
    taglineKey: "walletDetail.tangem.tagline",
    rating: 4.7,
    typeKey: "wallet.type.hardware",
    price: "$54.90",
    platforms: ["iOS", "Android", "NFC Card"],
    website: "tangem.com",
    affiliateLink: "https://tangem.com/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.tangem.description",
    featureKeys: [
      "walletDetail.tangem.feature1",
      "walletDetail.tangem.feature2",
      "walletDetail.tangem.feature3",
      "walletDetail.tangem.feature4",
      "walletDetail.tangem.feature5",
      "walletDetail.tangem.feature6",
      "walletDetail.tangem.feature7",
      "walletDetail.tangem.feature8"
    ],
    proKeys: [
      "walletDetail.tangem.pro1",
      "walletDetail.tangem.pro2",
      "walletDetail.tangem.pro3",
      "walletDetail.tangem.pro4",
      "walletDetail.tangem.pro5",
      "walletDetail.tangem.pro6"
    ],
    conKeys: [
      "walletDetail.tangem.con1",
      "walletDetail.tangem.con2",
      "walletDetail.tangem.con3",
      "walletDetail.tangem.con4"
    ],
    bestForKey: "walletDetail.tangem.bestFor",
    securityFeatureKeys: [
      "walletDetail.tangem.security1",
      "walletDetail.tangem.security2",
      "walletDetail.tangem.security3",
      "walletDetail.tangem.security4",
      "walletDetail.tangem.security5",
      "walletDetail.tangem.security6"
    ]
  },
  ledger: {
    name: "Ledger Nano X",
    taglineKey: "walletDetail.ledger.tagline",
    rating: 4.8,
    typeKey: "wallet.type.hardware",
    price: "$149",
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android"],
    website: "ledger.com",
    affiliateLink: "https://shop.ledger.com/?r=5d81f18905fe",
    descriptionKey: "walletDetail.ledger.description",
    featureKeys: [
      "walletDetail.ledger.feature1",
      "walletDetail.ledger.feature2",
      "walletDetail.ledger.feature3",
      "walletDetail.ledger.feature4",
      "walletDetail.ledger.feature5",
      "walletDetail.ledger.feature6",
      "walletDetail.ledger.feature7",
      "walletDetail.ledger.feature8"
    ],
    proKeys: [
      "walletDetail.ledger.pro1",
      "walletDetail.ledger.pro2",
      "walletDetail.ledger.pro3",
      "walletDetail.ledger.pro4",
      "walletDetail.ledger.pro5",
      "walletDetail.ledger.pro6"
    ],
    conKeys: [
      "walletDetail.ledger.con1",
      "walletDetail.ledger.con2",
      "walletDetail.ledger.con3",
      "walletDetail.ledger.con4"
    ],
    bestForKey: "walletDetail.ledger.bestFor",
    securityFeatureKeys: [
      "walletDetail.ledger.security1",
      "walletDetail.ledger.security2",
      "walletDetail.ledger.security3",
      "walletDetail.ledger.security4",
      "walletDetail.ledger.security5",
      "walletDetail.ledger.security6"
    ]
  },
  crossmark: {
    name: "Crossmark",
    taglineKey: "walletDetail.crossmark.tagline",
    rating: 4.7,
    typeKey: "wallet.type.browserExt",
    price: "Free",
    platforms: ["Chrome", "Firefox", "Brave", "Edge"],
    website: "crossmark.io",
    affiliateLink: "https://crossmark.io/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.crossmark.description",
    featureKeys: [
      "walletDetail.crossmark.feature1",
      "walletDetail.crossmark.feature2",
      "walletDetail.crossmark.feature3",
      "walletDetail.crossmark.feature4",
      "walletDetail.crossmark.feature5",
      "walletDetail.crossmark.feature6",
      "walletDetail.crossmark.feature7",
      "walletDetail.crossmark.feature8"
    ],
    proKeys: [
      "walletDetail.crossmark.pro1",
      "walletDetail.crossmark.pro2",
      "walletDetail.crossmark.pro3",
      "walletDetail.crossmark.pro4",
      "walletDetail.crossmark.pro5",
      "walletDetail.crossmark.pro6"
    ],
    conKeys: [
      "walletDetail.crossmark.con1",
      "walletDetail.crossmark.con2",
      "walletDetail.crossmark.con3",
      "walletDetail.crossmark.con4"
    ],
    bestForKey: "walletDetail.crossmark.bestFor",
    securityFeatureKeys: [
      "walletDetail.crossmark.security1",
      "walletDetail.crossmark.security2",
      "walletDetail.crossmark.security3",
      "walletDetail.crossmark.security4",
      "walletDetail.crossmark.security5",
      "walletDetail.crossmark.security6"
    ]
  },
  bifrost: {
    name: "Bifrost Wallet",
    taglineKey: "walletDetail.bifrost.tagline",
    rating: 4.6,
    typeKey: "wallet.type.mobileApp",
    price: "Free",
    platforms: ["iOS", "Android"],
    website: "bifrostwallet.com",
    affiliateLink: "https://bifrostwallet.com/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.bifrost.description",
    featureKeys: [
      "walletDetail.bifrost.feature1",
      "walletDetail.bifrost.feature2",
      "walletDetail.bifrost.feature3",
      "walletDetail.bifrost.feature4",
      "walletDetail.bifrost.feature5",
      "walletDetail.bifrost.feature6",
      "walletDetail.bifrost.feature7",
      "walletDetail.bifrost.feature8"
    ],
    proKeys: [
      "walletDetail.bifrost.pro1",
      "walletDetail.bifrost.pro2",
      "walletDetail.bifrost.pro3",
      "walletDetail.bifrost.pro4",
      "walletDetail.bifrost.pro5",
      "walletDetail.bifrost.pro6"
    ],
    conKeys: [
      "walletDetail.bifrost.con1",
      "walletDetail.bifrost.con2",
      "walletDetail.bifrost.con3",
      "walletDetail.bifrost.con4"
    ],
    bestForKey: "walletDetail.bifrost.bestFor",
    securityFeatureKeys: [
      "walletDetail.bifrost.security1",
      "walletDetail.bifrost.security2",
      "walletDetail.bifrost.security3",
      "walletDetail.bifrost.security4",
      "walletDetail.bifrost.security5",
      "walletDetail.bifrost.security6"
    ]
  },
  gatehub: {
    name: "GateHub",
    taglineKey: "walletDetail.gatehub.tagline",
    rating: 4.4,
    typeKey: "wallet.type.webWallet",
    price: "Free",
    platforms: ["Web", "iOS", "Android"],
    website: "gatehub.net",
    affiliateLink: "https://gatehub.net/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.gatehub.description",
    featureKeys: [
      "walletDetail.gatehub.feature1",
      "walletDetail.gatehub.feature2",
      "walletDetail.gatehub.feature3",
      "walletDetail.gatehub.feature4",
      "walletDetail.gatehub.feature5",
      "walletDetail.gatehub.feature6",
      "walletDetail.gatehub.feature7",
      "walletDetail.gatehub.feature8"
    ],
    proKeys: [
      "walletDetail.gatehub.pro1",
      "walletDetail.gatehub.pro2",
      "walletDetail.gatehub.pro3",
      "walletDetail.gatehub.pro4",
      "walletDetail.gatehub.pro5",
      "walletDetail.gatehub.pro6"
    ],
    conKeys: [
      "walletDetail.gatehub.con1",
      "walletDetail.gatehub.con2",
      "walletDetail.gatehub.con3",
      "walletDetail.gatehub.con4"
    ],
    bestForKey: "walletDetail.gatehub.bestFor",
    securityFeatureKeys: [
      "walletDetail.gatehub.security1",
      "walletDetail.gatehub.security2",
      "walletDetail.gatehub.security3",
      "walletDetail.gatehub.security4",
      "walletDetail.gatehub.security5",
      "walletDetail.gatehub.security6"
    ]
  },
  trustwallet: {
    name: "Trust Wallet",
    taglineKey: "walletDetail.trustwallet.tagline",
    rating: 4.5,
    typeKey: "wallet.type.mobileApp",
    price: "Free",
    platforms: ["iOS", "Android", "Browser Extension"],
    website: "trustwallet.com",
    affiliateLink: "https://trustwallet.com/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.trustwallet.description",
    featureKeys: [
      "walletDetail.trustwallet.feature1",
      "walletDetail.trustwallet.feature2",
      "walletDetail.trustwallet.feature3",
      "walletDetail.trustwallet.feature4",
      "walletDetail.trustwallet.feature5",
      "walletDetail.trustwallet.feature6",
      "walletDetail.trustwallet.feature7",
      "walletDetail.trustwallet.feature8"
    ],
    proKeys: [
      "walletDetail.trustwallet.pro1",
      "walletDetail.trustwallet.pro2",
      "walletDetail.trustwallet.pro3",
      "walletDetail.trustwallet.pro4",
      "walletDetail.trustwallet.pro5",
      "walletDetail.trustwallet.pro6"
    ],
    conKeys: [
      "walletDetail.trustwallet.con1",
      "walletDetail.trustwallet.con2",
      "walletDetail.trustwallet.con3",
      "walletDetail.trustwallet.con4"
    ],
    bestForKey: "walletDetail.trustwallet.bestFor",
    securityFeatureKeys: [
      "walletDetail.trustwallet.security1",
      "walletDetail.trustwallet.security2",
      "walletDetail.trustwallet.security3",
      "walletDetail.trustwallet.security4",
      "walletDetail.trustwallet.security5",
      "walletDetail.trustwallet.security6"
    ]
  },
  ellipal: {
    name: "ELLIPAL Titan",
    taglineKey: "walletDetail.ellipal.tagline",
    rating: 4.7,
    typeKey: "wallet.type.hardware",
    price: "$169",
    platforms: ["iOS", "Android", "Air-Gapped Device"],
    website: "ellipal.com",
    affiliateLink: "https://www.ellipal.com/?rfsn=8973243.bbfab69",
    descriptionKey: "walletDetail.ellipal.description",
    featureKeys: [
      "walletDetail.ellipal.feature1",
      "walletDetail.ellipal.feature2",
      "walletDetail.ellipal.feature3",
      "walletDetail.ellipal.feature4",
      "walletDetail.ellipal.feature5",
      "walletDetail.ellipal.feature6",
      "walletDetail.ellipal.feature7",
      "walletDetail.ellipal.feature8"
    ],
    proKeys: [
      "walletDetail.ellipal.pro1",
      "walletDetail.ellipal.pro2",
      "walletDetail.ellipal.pro3",
      "walletDetail.ellipal.pro4",
      "walletDetail.ellipal.pro5",
      "walletDetail.ellipal.pro6"
    ],
    conKeys: [
      "walletDetail.ellipal.con1",
      "walletDetail.ellipal.con2",
      "walletDetail.ellipal.con3",
      "walletDetail.ellipal.con4"
    ],
    bestForKey: "walletDetail.ellipal.bestFor",
    securityFeatureKeys: [
      "walletDetail.ellipal.security1",
      "walletDetail.ellipal.security2",
      "walletDetail.ellipal.security3",
      "walletDetail.ellipal.security4",
      "walletDetail.ellipal.security5",
      "walletDetail.ellipal.security6"
    ]
  },
  trezor: {
    name: "Trezor Safe 3",
    taglineKey: "walletDetail.trezor.tagline",
    rating: 4.6,
    typeKey: "wallet.type.hardware",
    price: "$79",
    platforms: ["Windows", "macOS", "Linux"],
    website: "trezor.io",
    affiliateLink: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959",
    descriptionKey: "walletDetail.trezor.description",
    featureKeys: [
      "walletDetail.trezor.feature1",
      "walletDetail.trezor.feature2",
      "walletDetail.trezor.feature3",
      "walletDetail.trezor.feature4",
      "walletDetail.trezor.feature5",
      "walletDetail.trezor.feature6",
      "walletDetail.trezor.feature7",
      "walletDetail.trezor.feature8"
    ],
    proKeys: [
      "walletDetail.trezor.pro1",
      "walletDetail.trezor.pro2",
      "walletDetail.trezor.pro3",
      "walletDetail.trezor.pro4",
      "walletDetail.trezor.pro5",
      "walletDetail.trezor.pro6"
    ],
    conKeys: [
      "walletDetail.trezor.con1",
      "walletDetail.trezor.con2",
      "walletDetail.trezor.con3",
      "walletDetail.trezor.con4"
    ],
    bestForKey: "walletDetail.trezor.bestFor",
    securityFeatureKeys: [
      "walletDetail.trezor.security1",
      "walletDetail.trezor.security2",
      "walletDetail.trezor.security3",
      "walletDetail.trezor.security4",
      "walletDetail.trezor.security5",
      "walletDetail.trezor.security6"
    ]
  }
};

export default function WalletReview() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const wallet = walletData[slug || ""];

  if (!wallet) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("walletReview.notFound")}</h1>
          <p className="text-muted-foreground mb-8">{t("walletReview.notFoundDesc")}</p>
          <Button asChild>
            <Link href="/#wallets">{t("walletReview.viewAll")}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <Link href="/#wallets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t("walletReview.backToComparison")}
        </Link>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-5">
              {logoMap[slug || ""] && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 bg-black/40 flex-shrink-0 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]">
                  <img src={logoMap[slug || ""]} alt={wallet.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <div className="text-sm text-primary font-display mb-2">{t(wallet.typeKey)}</div>
                <h1 className="text-3xl md:text-4xl font-black font-display mb-2">{wallet.name}</h1>
                <p className="text-xl text-muted-foreground">{t(wallet.taglineKey)}</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{wallet.rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="text-2xl font-bold text-primary">{wallet.price}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {wallet.platforms.map((platform) => (
              <span key={platform} className="px-3 py-1 rounded-full bg-white/10 text-sm">
                {platform}
              </span>
            ))}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {t(wallet.descriptionKey)}
          </p>

          <a 
            href={wallet.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 !px-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
            data-testid={`button-get-${slug}`}
          >
            {t("walletReview.get")} {wallet.name} <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-4">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              {t("walletReview.pros")}
            </h2>
            <ul className="space-y-2">
              {wallet.proKeys.map((proKey) => (
                <li key={proKey} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-1" />
                  {t(proKey)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              {t("walletReview.cons")}
            </h2>
            <ul className="space-y-2">
              {wallet.conKeys.map((conKey) => (
                <li key={conKey} className="flex items-start gap-2 text-muted-foreground">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-1" />
                  {t(conKey)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t("walletReview.keyFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {wallet.featureKeys.map((featureKey) => (
              <div key={featureKey} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {t(featureKey)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            {t("walletReview.securityFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {wallet.securityFeatureKeys.map((featureKey) => (
              <div key={featureKey} className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 text-secondary shrink-0" />
                {t(featureKey)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold font-display mb-2">{t("walletReview.bestFor")}</h2>
          <p className="text-muted-foreground">{t(wallet.bestForKey)}</p>
        </div>

        <div className="text-center pb-8">
          <a 
            href={wallet.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 !px-12 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-lg transition-colors"
          >
            {t("walletReview.get")} {wallet.name} {t("walletReview.getToday")} <ExternalLink className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("walletReview.affiliateDisclaimer")}
          </p>
        </div>
      </div>
    </Layout>
  );
}
