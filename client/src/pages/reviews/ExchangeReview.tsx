import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/lib/i18n/LanguageContext";
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
  taglineKey: string;
  rating: number;
  typeKey: string;
  founded: string;
  headquarters: string;
  website: string;
  affiliateLink: string;
  bonusKey: string;
  descriptionKey: string;
  featureKeys: string[];
  proKeys: string[];
  conKeys: string[];
  bestForKey: string;
  fees: {
    trading: string;
    deposit: string;
    withdrawal: string;
  };
  paymentMethodKeys: string[];
  supportedCountriesKey: string;
}> = {
  uphold: {
    name: "Uphold",
    taglineKey: "exchangeDetail.uphold.tagline",
    rating: 4.5,
    typeKey: "exchangeDetail.uphold.type",
    founded: "2015",
    headquarters: "New York, USA",
    website: "uphold.com",
    affiliateLink: "https://uphold.com/sign-up?referral=allthingsxrpl",
    bonusKey: "exchangeDetail.uphold.bonus",
    descriptionKey: "exchangeDetail.uphold.description",
    featureKeys: [
      "exchangeDetail.uphold.feature1",
      "exchangeDetail.uphold.feature2",
      "exchangeDetail.uphold.feature3",
      "exchangeDetail.uphold.feature4",
      "exchangeDetail.uphold.feature5",
      "exchangeDetail.uphold.feature6",
      "exchangeDetail.uphold.feature7",
      "exchangeDetail.uphold.feature8"
    ],
    proKeys: [
      "exchangeDetail.uphold.pro1",
      "exchangeDetail.uphold.pro2",
      "exchangeDetail.uphold.pro3",
      "exchangeDetail.uphold.pro4",
      "exchangeDetail.uphold.pro5",
      "exchangeDetail.uphold.pro6"
    ],
    conKeys: [
      "exchangeDetail.uphold.con1",
      "exchangeDetail.uphold.con2",
      "exchangeDetail.uphold.con3",
      "exchangeDetail.uphold.con4"
    ],
    bestForKey: "exchangeDetail.uphold.bestFor",
    fees: {
      trading: "0% (spread only, ~1-2%)",
      deposit: "Free (ACH), 3.99% (card)",
      withdrawal: "Network fees only"
    },
    paymentMethodKeys: ["exchangeDetail.payment.bankTransfer", "exchangeDetail.payment.debitCard", "exchangeDetail.payment.wire", "exchangeDetail.payment.crypto"],
    supportedCountriesKey: "exchangeDetail.uphold.countries"
  },
  bitrue: {
    name: "Bitrue",
    taglineKey: "exchangeDetail.bitrue.tagline",
    rating: 4.3,
    typeKey: "exchangeDetail.bitrue.type",
    founded: "2018",
    headquarters: "Singapore",
    website: "bitrue.com",
    affiliateLink: "https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL",
    bonusKey: "exchangeDetail.bitrue.bonus",
    descriptionKey: "exchangeDetail.bitrue.description",
    featureKeys: [
      "exchangeDetail.bitrue.feature1",
      "exchangeDetail.bitrue.feature2",
      "exchangeDetail.bitrue.feature3",
      "exchangeDetail.bitrue.feature4",
      "exchangeDetail.bitrue.feature5",
      "exchangeDetail.bitrue.feature6",
      "exchangeDetail.bitrue.feature7",
      "exchangeDetail.bitrue.feature8"
    ],
    proKeys: [
      "exchangeDetail.bitrue.pro1",
      "exchangeDetail.bitrue.pro2",
      "exchangeDetail.bitrue.pro3",
      "exchangeDetail.bitrue.pro4",
      "exchangeDetail.bitrue.pro5",
      "exchangeDetail.bitrue.pro6"
    ],
    conKeys: [
      "exchangeDetail.bitrue.con1",
      "exchangeDetail.bitrue.con2",
      "exchangeDetail.bitrue.con3",
      "exchangeDetail.bitrue.con4"
    ],
    bestForKey: "exchangeDetail.bitrue.bestFor",
    fees: {
      trading: "0.098% maker/taker",
      deposit: "Free",
      withdrawal: "0.25 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.crypto", "exchangeDetail.payment.creditCard", "exchangeDetail.payment.p2p"],
    supportedCountriesKey: "exchangeDetail.bitrue.countries"
  },
  kraken: {
    name: "Kraken",
    taglineKey: "exchangeDetail.kraken.tagline",
    rating: 4.6,
    typeKey: "exchangeDetail.kraken.type",
    founded: "2011",
    headquarters: "San Francisco, USA",
    website: "kraken.com",
    affiliateLink: "https://www.kraken.com/sign-up?clickid=allthingsxrpl",
    bonusKey: "exchangeDetail.kraken.bonus",
    descriptionKey: "exchangeDetail.kraken.description",
    featureKeys: [
      "exchangeDetail.kraken.feature1",
      "exchangeDetail.kraken.feature2",
      "exchangeDetail.kraken.feature3",
      "exchangeDetail.kraken.feature4",
      "exchangeDetail.kraken.feature5",
      "exchangeDetail.kraken.feature6",
      "exchangeDetail.kraken.feature7",
      "exchangeDetail.kraken.feature8"
    ],
    proKeys: [
      "exchangeDetail.kraken.pro1",
      "exchangeDetail.kraken.pro2",
      "exchangeDetail.kraken.pro3",
      "exchangeDetail.kraken.pro4",
      "exchangeDetail.kraken.pro5",
      "exchangeDetail.kraken.pro6"
    ],
    conKeys: [
      "exchangeDetail.kraken.con1",
      "exchangeDetail.kraken.con2",
      "exchangeDetail.kraken.con3",
      "exchangeDetail.kraken.con4"
    ],
    bestForKey: "exchangeDetail.kraken.bestFor",
    fees: {
      trading: "0.16% maker / 0.26% taker",
      deposit: "Free (crypto), varies (fiat)",
      withdrawal: "0.02 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.wire", "exchangeDetail.payment.ach", "exchangeDetail.payment.sepa", "exchangeDetail.payment.crypto", "exchangeDetail.payment.applePay", "exchangeDetail.payment.googlePay"],
    supportedCountriesKey: "exchangeDetail.kraken.countries"
  },
  bitstamp: {
    name: "Bitstamp",
    taglineKey: "exchangeDetail.bitstamp.tagline",
    rating: 4.5,
    typeKey: "exchangeDetail.bitstamp.type",
    founded: "2011",
    headquarters: "Luxembourg",
    website: "bitstamp.net",
    affiliateLink: "https://www.bitstamp.net/?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.bitstamp.bonus",
    descriptionKey: "exchangeDetail.bitstamp.description",
    featureKeys: [
      "exchangeDetail.bitstamp.feature1",
      "exchangeDetail.bitstamp.feature2",
      "exchangeDetail.bitstamp.feature3",
      "exchangeDetail.bitstamp.feature4",
      "exchangeDetail.bitstamp.feature5",
      "exchangeDetail.bitstamp.feature6",
      "exchangeDetail.bitstamp.feature7",
      "exchangeDetail.bitstamp.feature8"
    ],
    proKeys: [
      "exchangeDetail.bitstamp.pro1",
      "exchangeDetail.bitstamp.pro2",
      "exchangeDetail.bitstamp.pro3",
      "exchangeDetail.bitstamp.pro4",
      "exchangeDetail.bitstamp.pro5",
      "exchangeDetail.bitstamp.pro6"
    ],
    conKeys: [
      "exchangeDetail.bitstamp.con1",
      "exchangeDetail.bitstamp.con2",
      "exchangeDetail.bitstamp.con3",
      "exchangeDetail.bitstamp.con4"
    ],
    bestForKey: "exchangeDetail.bitstamp.bestFor",
    fees: {
      trading: "0.30% - 0.00% (volume-based)",
      deposit: "Free (SEPA), 5% (card)",
      withdrawal: "0.02 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.sepa", "exchangeDetail.payment.wire", "exchangeDetail.payment.creditCard", "exchangeDetail.payment.crypto"],
    supportedCountriesKey: "exchangeDetail.bitstamp.countries"
  },
  coinbase: {
    name: "Coinbase",
    taglineKey: "exchangeDetail.coinbase.tagline",
    rating: 4.4,
    typeKey: "exchangeDetail.coinbase.type",
    founded: "2012",
    headquarters: "San Francisco, USA",
    website: "coinbase.com",
    affiliateLink: "https://www.coinbase.com/join?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.coinbase.bonus",
    descriptionKey: "exchangeDetail.coinbase.description",
    featureKeys: [
      "exchangeDetail.coinbase.feature1",
      "exchangeDetail.coinbase.feature2",
      "exchangeDetail.coinbase.feature3",
      "exchangeDetail.coinbase.feature4",
      "exchangeDetail.coinbase.feature5",
      "exchangeDetail.coinbase.feature6",
      "exchangeDetail.coinbase.feature7",
      "exchangeDetail.coinbase.feature8"
    ],
    proKeys: [
      "exchangeDetail.coinbase.pro1",
      "exchangeDetail.coinbase.pro2",
      "exchangeDetail.coinbase.pro3",
      "exchangeDetail.coinbase.pro4",
      "exchangeDetail.coinbase.pro5",
      "exchangeDetail.coinbase.pro6"
    ],
    conKeys: [
      "exchangeDetail.coinbase.con1",
      "exchangeDetail.coinbase.con2",
      "exchangeDetail.coinbase.con3",
      "exchangeDetail.coinbase.con4"
    ],
    bestForKey: "exchangeDetail.coinbase.bestFor",
    fees: {
      trading: "0.5% spread + flat fee",
      deposit: "Free (ACH), 3.99% (card)",
      withdrawal: "Network fees"
    },
    paymentMethodKeys: ["exchangeDetail.payment.ach", "exchangeDetail.payment.wire", "exchangeDetail.payment.debitCard", "exchangeDetail.payment.paypal", "exchangeDetail.payment.crypto"],
    supportedCountriesKey: "exchangeDetail.coinbase.countries"
  },
  cryptocom: {
    name: "Crypto.com",
    taglineKey: "exchangeDetail.cryptocom.tagline",
    rating: 4.3,
    typeKey: "exchangeDetail.cryptocom.type",
    founded: "2016",
    headquarters: "Singapore",
    website: "crypto.com",
    affiliateLink: "https://crypto.com/app?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.cryptocom.bonus",
    descriptionKey: "exchangeDetail.cryptocom.description",
    featureKeys: [
      "exchangeDetail.cryptocom.feature1",
      "exchangeDetail.cryptocom.feature2",
      "exchangeDetail.cryptocom.feature3",
      "exchangeDetail.cryptocom.feature4",
      "exchangeDetail.cryptocom.feature5",
      "exchangeDetail.cryptocom.feature6",
      "exchangeDetail.cryptocom.feature7",
      "exchangeDetail.cryptocom.feature8"
    ],
    proKeys: [
      "exchangeDetail.cryptocom.pro1",
      "exchangeDetail.cryptocom.pro2",
      "exchangeDetail.cryptocom.pro3",
      "exchangeDetail.cryptocom.pro4",
      "exchangeDetail.cryptocom.pro5",
      "exchangeDetail.cryptocom.pro6"
    ],
    conKeys: [
      "exchangeDetail.cryptocom.con1",
      "exchangeDetail.cryptocom.con2",
      "exchangeDetail.cryptocom.con3",
      "exchangeDetail.cryptocom.con4"
    ],
    bestForKey: "exchangeDetail.cryptocom.bestFor",
    fees: {
      trading: "0.075% maker / 0.075% taker",
      deposit: "Free (crypto), 2.99% (card)",
      withdrawal: "0.25 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.creditCard", "exchangeDetail.payment.bankTransfer", "exchangeDetail.payment.crypto", "exchangeDetail.payment.applePay", "exchangeDetail.payment.googlePay"],
    supportedCountriesKey: "exchangeDetail.cryptocom.countries"
  },
  kucoin: {
    name: "KuCoin",
    taglineKey: "exchangeDetail.kucoin.tagline",
    rating: 4.4,
    typeKey: "exchangeDetail.kucoin.type",
    founded: "2017",
    headquarters: "Seychelles",
    website: "kucoin.com",
    affiliateLink: "https://www.kucoin.com/r?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.kucoin.bonus",
    descriptionKey: "exchangeDetail.kucoin.description",
    featureKeys: [
      "exchangeDetail.kucoin.feature1",
      "exchangeDetail.kucoin.feature2",
      "exchangeDetail.kucoin.feature3",
      "exchangeDetail.kucoin.feature4",
      "exchangeDetail.kucoin.feature5",
      "exchangeDetail.kucoin.feature6",
      "exchangeDetail.kucoin.feature7",
      "exchangeDetail.kucoin.feature8"
    ],
    proKeys: [
      "exchangeDetail.kucoin.pro1",
      "exchangeDetail.kucoin.pro2",
      "exchangeDetail.kucoin.pro3",
      "exchangeDetail.kucoin.pro4",
      "exchangeDetail.kucoin.pro5",
      "exchangeDetail.kucoin.pro6"
    ],
    conKeys: [
      "exchangeDetail.kucoin.con1",
      "exchangeDetail.kucoin.con2",
      "exchangeDetail.kucoin.con3",
      "exchangeDetail.kucoin.con4"
    ],
    bestForKey: "exchangeDetail.kucoin.bestFor",
    fees: {
      trading: "0.1% maker / 0.1% taker",
      deposit: "Free (crypto)",
      withdrawal: "0.25 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.creditCard", "exchangeDetail.payment.bankTransfer", "exchangeDetail.payment.p2p", "exchangeDetail.payment.crypto", "exchangeDetail.payment.applePay"],
    supportedCountriesKey: "exchangeDetail.kucoin.countries"
  }
};

export default function ExchangeReview() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const exchange = exchangeData[slug || ""];

  if (!exchange) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("exchangeReview.notFound")}</h1>
          <p className="text-muted-foreground mb-8">{t("exchangeReview.notFoundDesc")}</p>
          <Button asChild>
            <Link href="/#exchanges">{t("exchangeReview.viewAll")}</Link>
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
          {t("exchangeReview.backToPartners")}
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
                <div className="text-sm text-primary font-display mb-2">{t(exchange.typeKey)}</div>
                <h1 className="text-3xl md:text-4xl font-black font-display mb-2">{exchange.name}</h1>
                <p className="text-xl text-muted-foreground">{t(exchange.taglineKey)}</p>
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

          {exchange.bonusKey && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20 mb-8">
              <Gift className="h-5 w-5 text-green-400" />
              <span className="text-green-200">{t(exchange.bonusKey)}</span>
            </div>
          )}

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {t(exchange.descriptionKey)}
          </p>

          <a 
            href={exchange.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
            data-testid={`button-signup-${slug}`}
          >
            {t("exchangeReview.signUp")} {exchange.name} <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              {t("exchangeReview.pros")}
            </h2>
            <ul className="space-y-2">
              {exchange.proKeys.map((proKey) => (
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
              {t("exchangeReview.cons")}
            </h2>
            <ul className="space-y-2">
              {exchange.conKeys.map((conKey) => (
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
            <DollarSign className="h-5 w-5 text-green-400" />
            {t("exchangeReview.fees")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">{t("exchangeReview.tradingFee")}</div>
              <div className="font-bold">{exchange.fees.trading}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">{t("exchangeReview.depositFee")}</div>
              <div className="font-bold">{exchange.fees.deposit}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">{t("exchangeReview.withdrawalFee")}</div>
              <div className="font-bold">{exchange.fees.withdrawal}</div>
            </div>
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t("exchangeReview.keyFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exchange.featureKeys.map((featureKey) => (
              <div key={featureKey} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {t(featureKey)}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-display mb-4">{t("exchangeReview.paymentMethods")}</h2>
            <ul className="space-y-2">
              {exchange.paymentMethodKeys.map((methodKey) => (
                <li key={methodKey} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                  {t(methodKey)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-display mb-4">{t("exchangeReview.availability")}</h2>
            <p className="text-muted-foreground">{t(exchange.supportedCountriesKey)}</p>
            <div className="mt-4 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 inline mr-2" />
              {t("exchangeReview.headquarters")}: {exchange.headquarters}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-2">{t("exchangeReview.bestFor")}</h2>
          <p className="text-muted-foreground">{t(exchange.bestForKey)}</p>
        </div>

        <div className="text-center">
          <a 
            href={exchange.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 px-10 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-lg transition-colors"
          >
            {t("exchangeReview.signUp")} {exchange.name} <ExternalLink className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("exchangeReview.affiliateDisclaimer")}
          </p>
        </div>
      </div>
    </Layout>
  );
}
