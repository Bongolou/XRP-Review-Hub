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
import { Link } from "@/lib/i18n/LocalizedLink";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { buildPageOgImage } from "@/lib/ogImage";
import { getStaticPageSeo } from "@/lib/i18n/pageSeo";
import upholdLogo from "@/assets/logos/uphold-logo.webp";
import bitrueLogo from "@/assets/logos/bitrue-logo.webp";
import krakenLogo from "@/assets/logos/kraken-logo.webp";

type StakingOption = {
  id: number;
  nameKey: string;
  platform: string;
  logo: string;
  descKey: string;
  apy: string;
  lockPeriodKey: string;
  featureKeys: string[];
  riskKey: string;
  link: string;
  affiliate: string;
  color: string;
};

type NativeOption = {
  id: number;
  nameKey: string;
  descKey: string;
  apy: string;
  riskKey: string;
  featureKeys: string[];
  learnMoreLink: string;
  color: string;
};

const stakingOptions: StakingOption[] = [
  {
    id: 1,
    nameKey: "yield.option.bitrue.name",
    platform: "Bitrue",
    logo: bitrueLogo,
    descKey: "yield.option.bitrue.desc",
    apy: "6.5%",
    lockPeriodKey: "yield.lockPeriod.flexible",
    featureKeys: [
      "yield.option.bitrue.f1",
      "yield.option.bitrue.f2",
      "yield.option.bitrue.f3",
      "yield.option.bitrue.f4",
    ],
    riskKey: "yield.risk.low",
    link: "https://www.bitrue.com/activity/landing-page/?cn=900000&_channel=allthingsxrpl",
    affiliate: "https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    nameKey: "yield.option.uphold.name",
    platform: "Uphold",
    logo: upholdLogo,
    descKey: "yield.option.uphold.desc",
    apy: "12%",
    lockPeriodKey: "yield.lockPeriod.flexible",
    featureKeys: [
      "yield.option.uphold.f1",
      "yield.option.uphold.f2",
      "yield.option.uphold.f3",
      "yield.option.uphold.f4",
    ],
    riskKey: "yield.risk.low",
    link: "https://uphold.com/signup?referral=allthingsxrpl",
    affiliate: "https://uphold.com/signup?referral=allthingsxrpl",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    nameKey: "yield.option.kraken.name",
    platform: "Kraken",
    logo: krakenLogo,
    descKey: "yield.option.kraken.desc",
    apy: "8%",
    lockPeriodKey: "yield.lockPeriod.flexibleBonded",
    featureKeys: [
      "yield.option.kraken.f1",
      "yield.option.kraken.f2",
      "yield.option.kraken.f3",
      "yield.option.kraken.f4",
    ],
    riskKey: "yield.risk.low",
    link: "https://www.kraken.com/features/staking",
    affiliate: "https://www.kraken.com/sign-up?clickid=allthingsxrpl",
    color: "from-purple-500 to-violet-500",
  },
];

const xrplNativeOptions: NativeOption[] = [
  {
    id: 1,
    nameKey: "yield.native.amm.name",
    descKey: "yield.native.amm.desc",
    apy: "Variable (3-15%)",
    riskKey: "yield.risk.medium",
    featureKeys: [
      "yield.native.amm.f1",
      "yield.native.amm.f2",
      "yield.native.amm.f3",
      "yield.native.amm.f4",
    ],
    learnMoreLink: "/blog/2",
    color: "from-primary to-blue-400",
  },
  {
    id: 2,
    nameKey: "yield.native.trustline.name",
    descKey: "yield.native.trustline.desc",
    apy: "Variable",
    riskKey: "yield.risk.lowMedium",
    featureKeys: [
      "yield.native.trustline.f1",
      "yield.native.trustline.f2",
      "yield.native.trustline.f3",
      "yield.native.trustline.f4",
    ],
    learnMoreLink: "/blog/10",
    color: "from-secondary to-orange-400",
  },
];

export default function YieldOpportunities() {
  const { language, t } = useLanguage();
  const seo = getStaticPageSeo(language, "yield");
  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    canonicalPath: "/yield",
    image: buildPageOgImage(seo.title),
  });
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/20 text-secondary hover:bg-secondary/30 border-secondary/50">
            {t("yield.badge")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t("yield.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("yield.subtitle")}
          </p>
        </div>

        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-secondary/20 w-10 h-10 rounded-lg flex items-center justify-center border border-secondary/30">
              <Coins className="h-5 w-5 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold font-display">{t("yield.section.exchange")}</h2>
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
                    {t(option.riskKey)}{t("yield.risk.suffix")}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold font-display mb-2">{t(option.nameKey)}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{t(option.descKey)}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Percent className="h-3 w-3" />
                      {t("yield.label.apy")}
                    </div>
                    <div className="font-bold text-secondary">{t("yield.apy.upTo")} {option.apy}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      {t("yield.label.lockPeriod")}
                    </div>
                    <div className="font-bold">{t(option.lockPeriodKey)}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {option.featureKeys.map((fk, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-3 w-3 text-primary" />
                      {t(fk)}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <a href={option.affiliate} target="_blank" rel="noopener noreferrer">
                    <Button className={`w-full bg-gradient-to-r ${option.color} text-white font-bold`}>
                      {t("yield.cta.start")} <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href={option.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary">
                      {t("yield.cta.learnMore").replace("{platform}", option.platform)} <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="text-2xl font-bold font-display">{t("yield.section.native")}</h2>
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
                    {t(option.riskKey)}{t("yield.risk.suffix")}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold font-display mb-2">{t(option.nameKey)}</h3>
                <p className="text-muted-foreground mb-4">{t(option.descKey)}</p>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10 mb-4 inline-block">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Percent className="h-3 w-3" />
                    {t("yield.label.estApy")}
                  </div>
                  <div className="font-bold text-primary">{option.apy.replace(/^Variable/, t("yield.apy.variable"))}</div>
                </div>

                <div className="space-y-2 mb-6">
                  {option.featureKeys.map((fk, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-3 w-3 text-secondary" />
                      {t(fk)}
                    </div>
                  ))}
                </div>

                <Link href={option.learnMoreLink}>
                  <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10">
                    {t("yield.cta.guide")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-secondary/20 to-primary/20 border border-white/10 rounded-2xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">{t("yield.bottom.title")}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t("yield.bottom.desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-secondary to-orange-500 text-white font-bold">
                {t("yield.bottom.bitrue")} <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link href="/blog/2">
              <Button variant="outline" className="border-white/20">
                {t("yield.bottom.amm")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
