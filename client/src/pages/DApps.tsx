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
import { Link } from "@/lib/i18n/LocalizedLink";
import {
  VerdictBox,
  BestForCallout,
  EmailCaptureBlock,
  getDefiLeadMagnetAssetUrl,
  FastCompareTable,
  FAQAccordion,
  LastUpdated,
  type FastCompareRow,
} from "@/components/conversion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { getStaticPageSeo } from "@/lib/i18n/pageSeo";
import { buildPageOgImage } from "@/lib/ogImage";

type TopPick = {
  name: string;
  typeKey: string;
  rating: string;
  bestForKey: string;
  proKeys: string[];
  affiliateUrl: string;
  pairedWalletSlug: string;
  pairedWalletLabelKey: string;
};

const topPicks: TopPick[] = [
  {
    name: "Magnetic",
    typeKey: "dapps.pick.magnetic.type",
    rating: "9.4",
    bestForKey: "dapps.pick.magnetic.bestFor",
    proKeys: [
      "dapps.pick.magnetic.pro1",
      "dapps.pick.magnetic.pro2",
      "dapps.pick.magnetic.pro3",
    ],
    affiliateUrl: "https://www.magnetic.app/?ref=allthingsxrpl",
    pairedWalletSlug: "xaman",
    pairedWalletLabelKey: "dapps.pairs.xaman",
  },
  {
    name: "Sologenic",
    typeKey: "dapps.pick.sologenic.type",
    rating: "9.2",
    bestForKey: "dapps.pick.sologenic.bestFor",
    proKeys: [
      "dapps.pick.sologenic.pro1",
      "dapps.pick.sologenic.pro2",
      "dapps.pick.sologenic.pro3",
    ],
    affiliateUrl: "https://www.sologenic.com/?ref=allthingsxrpl",
    pairedWalletSlug: "crossmark",
    pairedWalletLabelKey: "dapps.pairs.crossmark",
  },
  {
    name: "XRPL DEX",
    typeKey: "dapps.pick.xrplDex.type",
    rating: "9.3",
    bestForKey: "dapps.pick.xrplDex.bestFor",
    proKeys: [
      "dapps.pick.xrplDex.pro1",
      "dapps.pick.xrplDex.pro2",
      "dapps.pick.xrplDex.pro3",
    ],
    affiliateUrl: "https://xrpl.services/?ref=allthingsxrpl",
    pairedWalletSlug: "xaman",
    pairedWalletLabelKey: "dapps.pairs.tradeXaman",
  },
  {
    name: "Anodos Finance",
    typeKey: "dapps.pick.anodos.type",
    rating: "9.1",
    bestForKey: "dapps.pick.anodos.bestFor",
    proKeys: [
      "dapps.pick.anodos.pro1",
      "dapps.pick.anodos.pro2",
      "dapps.pick.anodos.pro3",
    ],
    affiliateUrl: "https://anodos.finance/?ref=allthingsxrpl",
    pairedWalletSlug: "crossmark",
    pairedWalletLabelKey: "dapps.pairs.crossmark",
  },
];

type DApp = {
  id: number;
  name: string;
  taglineKey: string;
  descriptionKey: string;
  categoryKey: string;
  featureKeys: string[];
  affiliate: string;
  color: string;
  icon: typeof Sparkles;
  verified: boolean;
};

const dapps: DApp[] = [
  {
    id: 1,
    name: "Magnetic",
    taglineKey: "dapps.d.1.tagline",
    descriptionKey: "dapps.d.1.description",
    categoryKey: "dapps.cat.yield",
    featureKeys: ["dapps.d.1.f1", "dapps.d.1.f2", "dapps.d.1.f3", "dapps.d.1.f4"],
    affiliate: "https://www.magnetic.app/?ref=allthingsxrpl",
    color: "from-purple-500 to-pink-500",
    icon: Sparkles,
    verified: true,
  },
  {
    id: 2,
    name: "Orchestra Finance",
    taglineKey: "dapps.d.2.tagline",
    descriptionKey: "dapps.d.2.description",
    categoryKey: "dapps.cat.defi",
    featureKeys: ["dapps.d.2.f1", "dapps.d.2.f2", "dapps.d.2.f3", "dapps.d.2.f4"],
    affiliate: "https://orchestra.finance/?ref=allthingsxrpl",
    color: "from-blue-500 to-cyan-500",
    icon: Globe,
    verified: true,
  },
  {
    id: 3,
    name: "XPMarket",
    taglineKey: "dapps.d.3.tagline",
    descriptionKey: "dapps.d.3.description",
    categoryKey: "dapps.cat.nftTrading",
    featureKeys: ["dapps.d.3.f1", "dapps.d.3.f2", "dapps.d.3.f3", "dapps.d.3.f4"],
    affiliate: "https://xpmarket.com/?ref=allthingsxrpl",
    color: "from-green-500 to-emerald-500",
    icon: BarChart3,
    verified: true,
  },
  {
    id: 4,
    name: "Sologenic",
    taglineKey: "dapps.d.4.tagline",
    descriptionKey: "dapps.d.4.description",
    categoryKey: "dapps.cat.dex",
    featureKeys: ["dapps.d.4.f1", "dapps.d.4.f2", "dapps.d.4.f3", "dapps.d.4.f4"],
    affiliate: "https://sologenic.org/?ref=allthingsxrpl",
    color: "from-orange-500 to-red-500",
    icon: Coins,
    verified: true,
  },
  {
    id: 5,
    name: "First Ledger",
    taglineKey: "dapps.d.5.tagline",
    descriptionKey: "dapps.d.5.description",
    categoryKey: "dapps.cat.analytics",
    featureKeys: ["dapps.d.5.f1", "dapps.d.5.f2", "dapps.d.5.f3", "dapps.d.5.f4"],
    affiliate: "https://firstledger.net/?ref=allthingsxrpl",
    color: "from-indigo-500 to-purple-500",
    icon: BarChart3,
    verified: true,
  },
  {
    id: 6,
    name: "XRPL.services",
    taglineKey: "dapps.d.6.tagline",
    descriptionKey: "dapps.d.6.description",
    categoryKey: "dapps.cat.defitools",
    featureKeys: ["dapps.d.6.f1", "dapps.d.6.f2", "dapps.d.6.f3", "dapps.d.6.f4"],
    affiliate: "https://xrpl.services/?ref=allthingsxrpl",
    color: "from-cyan-500 to-blue-500",
    icon: Droplets,
    verified: true,
  },
  {
    id: 7,
    name: "OnTheDex.live",
    taglineKey: "dapps.d.7.tagline",
    descriptionKey: "dapps.d.7.description",
    categoryKey: "dapps.cat.analytics",
    featureKeys: ["dapps.d.7.f1", "dapps.d.7.f2", "dapps.d.7.f3", "dapps.d.7.f4"],
    affiliate: "https://onthedex.live/?ref=allthingsxrpl",
    color: "from-green-500 to-teal-500",
    icon: LineChart,
    verified: true,
  },
  {
    id: 8,
    name: "XRPLWin",
    taglineKey: "dapps.d.8.tagline",
    descriptionKey: "dapps.d.8.description",
    categoryKey: "dapps.cat.explorer",
    featureKeys: ["dapps.d.8.f1", "dapps.d.8.f2", "dapps.d.8.f3", "dapps.d.8.f4"],
    affiliate: "https://xrplwin.com/?ref=allthingsxrpl",
    color: "from-yellow-500 to-orange-500",
    icon: Search,
    verified: true,
  },
  {
    id: 10,
    name: "GateHub Trade",
    taglineKey: "dapps.d.10.tagline",
    descriptionKey: "dapps.d.10.description",
    categoryKey: "dapps.cat.dex",
    featureKeys: ["dapps.d.10.f1", "dapps.d.10.f2", "dapps.d.10.f3", "dapps.d.10.f4"],
    affiliate: "https://gatehub.net/?ref=allthingsxrpl",
    color: "from-blue-500 to-indigo-500",
    icon: Repeat,
    verified: true,
  },
  {
    id: 11,
    name: "SOLO DEX",
    taglineKey: "dapps.d.11.tagline",
    descriptionKey: "dapps.d.11.description",
    categoryKey: "dapps.cat.dex",
    featureKeys: ["dapps.d.11.f1", "dapps.d.11.f2", "dapps.d.11.f3", "dapps.d.11.f4"],
    affiliate: "https://sologenic.org/trade?ref=allthingsxrpl",
    color: "from-orange-500 to-yellow-500",
    icon: BarChart3,
    verified: true,
  },
  {
    id: 12,
    name: "Xahau",
    taglineKey: "dapps.d.12.tagline",
    descriptionKey: "dapps.d.12.description",
    categoryKey: "dapps.cat.sidechain",
    featureKeys: ["dapps.d.12.f1", "dapps.d.12.f2", "dapps.d.12.f3", "dapps.d.12.f4"],
    affiliate: "https://xahau.network/?ref=allthingsxrpl",
    color: "from-purple-500 to-indigo-500",
    icon: Code,
    verified: true,
  },
  {
    id: 14,
    name: "XRPL DEX",
    taglineKey: "dapps.d.14.tagline",
    descriptionKey: "dapps.d.14.description",
    categoryKey: "dapps.cat.dex",
    featureKeys: ["dapps.d.14.f1", "dapps.d.14.f2", "dapps.d.14.f3", "dapps.d.14.f4"],
    affiliate: "https://xrpl.services/?ref=allthingsxrpl",
    color: "from-sky-500 to-blue-500",
    icon: Repeat,
    verified: true,
  },
  {
    id: 15,
    name: "Anodos Finance",
    taglineKey: "dapps.d.15.tagline",
    descriptionKey: "dapps.d.15.description",
    categoryKey: "dapps.cat.defi",
    featureKeys: ["dapps.d.15.f1", "dapps.d.15.f2", "dapps.d.15.f3", "dapps.d.15.f4"],
    affiliate: "https://anodos.finance/?ref=allthingsxrpl",
    color: "from-violet-500 to-fuchsia-500",
    icon: Coins,
    verified: true,
  },
  {
    id: 16,
    name: "Bitrue XRPL Pools",
    taglineKey: "dapps.d.16.tagline",
    descriptionKey: "dapps.d.16.description",
    categoryKey: "dapps.cat.yield",
    featureKeys: ["dapps.d.16.f1", "dapps.d.16.f2", "dapps.d.16.f3", "dapps.d.16.f4"],
    affiliate: "https://www.bitrue.com/activity/landing-page/?cn=900000&_channel=allthingsxrpl",
    color: "from-amber-500 to-orange-500",
    icon: Droplets,
    verified: true,
  },
  {
    id: 13,
    name: "XRPL EVM",
    taglineKey: "dapps.d.13.tagline",
    descriptionKey: "dapps.d.13.description",
    categoryKey: "dapps.cat.sidechain",
    featureKeys: ["dapps.d.13.f1", "dapps.d.13.f2", "dapps.d.13.f3", "dapps.d.13.f4"],
    affiliate: "https://www.xrplevm.org/?ref=allthingsxrpl",
    color: "from-emerald-500 to-green-500",
    icon: Layers,
    verified: true,
  },
];

const categoryKeys = [
  "dapps.cat.all",
  "dapps.cat.yield",
  "dapps.cat.defi",
  "dapps.cat.dex",
  "dapps.cat.nftTrading",
  "dapps.cat.analytics",
  "dapps.cat.defitools",
  "dapps.cat.explorer",
  "dapps.cat.sidechain",
];

export default function DApps() {
  const { t, language } = useLanguage();
  const dappsSeo = getStaticPageSeo(language, "dapps");

  useDocumentMeta({
    title: dappsSeo.title,
    description: dappsSeo.description,
    canonicalPath: "/dapps",
    image: buildPageOgImage(dappsSeo.title),
  });

  const dappCompareRows: FastCompareRow[] = [
    { id: "magnetic", name: "Magnetic", type: t("dapps.row.magnetic.type"), price: t("dapps.row.priceFree"), bestFor: t("dapps.row.magnetic.bestFor"), rating: "9.4", affiliateUrl: "https://www.magnetic.app/?ref=allthingsxrpl", highlight: true },
    { id: "xrpl-dex", name: "XRPL DEX", type: t("dapps.row.xrplDex.type"), price: t("dapps.row.priceFree"), bestFor: t("dapps.row.xrplDex.bestFor"), rating: "9.3", affiliateUrl: "https://xrpl.services/?ref=allthingsxrpl" },
    { id: "sologenic", name: "Sologenic", type: t("dapps.row.sologenic.type"), price: t("dapps.row.priceFree"), bestFor: t("dapps.row.sologenic.bestFor"), rating: "9.2", affiliateUrl: "https://www.sologenic.com/?ref=allthingsxrpl" },
    { id: "anodos", name: "Anodos Finance", type: t("dapps.row.anodos.type"), price: t("dapps.row.priceFree"), bestFor: t("dapps.row.anodos.bestFor"), rating: "9.1", affiliateUrl: "https://anodos.finance/?ref=allthingsxrpl" },
    { id: "bitrue-pools", name: "Bitrue XRPL Pools", type: t("dapps.row.bitruePools.type"), price: t("dapps.row.priceFree"), bestFor: t("dapps.row.bitruePools.bestFor"), rating: "9.0", affiliateUrl: "https://www.bitrue.com/activity/landing-page/?cn=900000&_channel=allthingsxrpl" },
    { id: "xpmarket", name: "XPMarket", type: t("dapps.row.xpmarket.type"), price: t("dapps.row.priceFree"), bestFor: t("dapps.row.xpmarket.bestFor"), rating: "9.0", affiliateUrl: "https://xpmarket.com/?ref=allthingsxrpl" },
    { id: "orchestra", name: "Orchestra Finance", type: t("dapps.row.orchestra.type"), price: t("dapps.row.priceFree"), bestFor: t("dapps.row.orchestra.bestFor"), rating: "8.8", affiliateUrl: "https://orchestra.finance/?ref=allthingsxrpl" },
  ];

  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: t("dapps.faq1.q"),
      a: <span dangerouslySetInnerHTML={{ __html: t("dapps.faq1.a") }} />,
    },
    {
      q: t("dapps.faq2.q"),
      a: (
        <span>
          {t("dapps.faq2.a.part1")}
          <Link href="/wallet/xaman" className="text-primary underline">Xaman</Link>
          {t("dapps.faq2.a.part2")}
          <Link href="/wallet/crossmark" className="text-primary underline">Crossmark</Link>
          {t("dapps.faq2.a.part3")}
          <Link href="/best-xrp-wallets" className="text-primary underline">{t("dapps.faq2.a.guideText")}</Link>
          {t("dapps.faq2.a.part4")}
        </span>
      ),
    },
    {
      q: t("dapps.faq3.q"),
      a: <span dangerouslySetInnerHTML={{ __html: t("dapps.faq3.a") }} />,
    },
    {
      q: t("dapps.faq4.q"),
      a: <span dangerouslySetInnerHTML={{ __html: t("dapps.faq4.a") }} />,
    },
    {
      q: t("dapps.faq5.q"),
      a: <span dangerouslySetInnerHTML={{ __html: t("dapps.faq5.a") }} />,
    },
    {
      q: t("dapps.faq6.q"),
      a: <span dangerouslySetInnerHTML={{ __html: t("dapps.faq6.a") }} />,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-5xl py-20 md:py-24">
        <div className="mb-6">
          <Badge className="mb-4 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/50">
            {t("dapps.badge")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4" data-testid="text-dapps-title">
            {t("dapps.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t("dapps.subtitle")}
          </p>
          <div className="mt-4">
            <LastUpdated date={t("dapps.lastUpdated")} />
          </div>
        </div>

        <div className="my-10">
          <VerdictBox
            pickName="Magnetic"
            pickReason={t("dapps.verdict.pickReason")}
            affiliateUrl="https://www.magnetic.app/?ref=allthingsxrpl"
            runnerUp={{
              name: "Sologenic",
              reason: t("dapps.verdict.runnerUp.reason"),
              href: "https://www.sologenic.com/?ref=allthingsxrpl",
            }}
            pros={[
              t("dapps.verdict.pro1"),
              t("dapps.verdict.pro2"),
              t("dapps.verdict.pro3"),
            ]}
            cons={[
              t("dapps.verdict.con1"),
              t("dapps.verdict.con2"),
            ]}
          />
        </div>

        <FastCompareTable rows={dappCompareRows} />

        <section className="my-24">
          <h2 className="text-3xl font-bold font-display mb-2">{t("dapps.topPicks.title")}</h2>
          <p className="text-muted-foreground mb-8">
            {t("dapps.topPicks.subtitle")}
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
                    <p className="text-xs text-muted-foreground">{t(p.typeKey)}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-display font-bold text-primary">{p.rating}</div>
                    <div className="text-[10px] uppercase text-muted-foreground tracking-widest">{t("dapps.score")}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="text-white font-medium">{t("dapps.bestForLabel")}</span>
                  {t(p.bestForKey)}
                </p>
                <ul className="space-y-2 mb-5 flex-1">
                  {p.proKeys.map((proKey, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {t(proKey)}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <a href={p.affiliateUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-toppick-visit-${p.name.toLowerCase()}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                      {t("dapps.visit")} {p.name} <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <Link href={`/wallet/${p.pairedWalletSlug}`} data-testid={`link-toppick-wallet-${p.pairedWalletSlug}`}>
                    <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary">
                      {t(p.pairedWalletLabelKey)} <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-24 grid md:grid-cols-2 gap-6">
          <BestForCallout
            label={t("dapps.callout.walletLabel")}
            href="/best-xrp-wallets"
            description={t("dapps.callout.walletDesc")}
          />
          <BestForCallout
            label={t("dapps.callout.defiLabel")}
            href="/best-for/defi"
            description={t("dapps.callout.defiDesc")}
          />
        </section>

        <section className="my-24 -mx-4">
          <div className="px-4">
            <h2 className="text-3xl font-bold font-display mb-2">{t("dapps.all.title")}</h2>
            <p className="text-muted-foreground mb-8">
              {t("dapps.all.subtitle")}
            </p>
          </div>

          <div className="px-4 flex flex-wrap gap-2 mb-8">
            {categoryKeys.map((catKey) => (
              <Badge
                key={catKey}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors"
              >
                {t(catKey)}
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
                          <Shield className="h-3 w-3 mr-1" /> {t("dapps.verified")}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs bg-white/5">
                      {t(dapp.categoryKey)}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-display mb-1 group-hover:text-primary transition-colors">{dapp.name}</h3>
                  <p className="text-sm text-primary mb-3">{t(dapp.taglineKey)}</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{t(dapp.descriptionKey)}</p>

                  <div className="space-y-2 mb-6">
                    {dapp.featureKeys.map((featureKey, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="h-3 w-3 text-secondary" />
                        {t(featureKey)}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <a href={dapp.affiliate} target="_blank" rel="noopener noreferrer" data-testid={`link-dapp-visit-${dapp.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button className={`w-full bg-gradient-to-r ${dapp.color} text-white font-bold`}>
                        {t("dapps.visit")} {dapp.name} <ExternalLink className="ml-2 h-4 w-4" />
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
            title={t("dapps.email.title")}
            description={t("dapps.email.description")}
            bullets={[
              t("dapps.email.bullet1"),
              t("dapps.email.bullet2"),
              t("dapps.email.bullet3"),
            ]}
            cta={t("dapps.email.cta")}
            leadMagnet="xrpl_defi_starter_kit"
            assetUrl={getDefiLeadMagnetAssetUrl(language)}
          />
        </section>

        <section className="my-24">
          <h2 className="text-3xl font-bold font-display mb-6">{t("dapps.faq.title")}</h2>
          <FAQAccordion items={faqs} />
        </section>

        <section className="my-24 grid md:grid-cols-2 gap-6">
          <Link
            href="/"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
            data-testid="link-home-usecase"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              {t("dapps.cross.notSure")}
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              {t("dapps.cross.pickByUseCase")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("dapps.cross.useCaseDesc")}
            </p>
          </Link>
          <Link
            href="/yield"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
            data-testid="link-yield"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              {t("dapps.cross.passive")}
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              {t("dapps.cross.allYield")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("dapps.cross.yieldDesc")}
            </p>
          </Link>
        </section>

        <section className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 rounded-2xl p-6 md:p-8 text-center mb-12">
          <h2 className="text-2xl font-bold font-display mb-4">{t("dapps.partner.title")}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t("dapps.partner.desc")}
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
              {t("dapps.partner.cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
