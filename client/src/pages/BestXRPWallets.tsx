import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  FastCompareTable,
  VerdictBox,
  FAQAccordion,
  LastUpdated,
  EmailCaptureBlock,
  ReviewSummaryCard,
  type FastCompareRow,
} from "@/components/conversion";

export default function BestXRPWallets() {
  const { t } = useLanguage();

  const rows: FastCompareRow[] = [
    {
      id: "xaman",
      name: "Xaman (XUMM)",
      type: t("bxw.row.xaman.type"),
      price: t("wallet.fees.free"),
      bestFor: t("bxw.row.xaman.bestFor"),
      rating: "9.9",
      reviewSlug: "xaman",
      affiliateUrl: "https://xumm.app/?ref=allthingsxrpl",
      highlight: true,
    },
    {
      id: "ledger",
      name: "Ledger Nano X",
      type: t("bxw.row.ledger.type"),
      price: "$149",
      bestFor: t("bxw.row.ledger.bestFor"),
      rating: "9.9",
      reviewSlug: "ledger",
      affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe",
    },
    {
      id: "tangem",
      name: "Tangem",
      type: t("bxw.row.tangem.type"),
      price: "$54.90",
      bestFor: t("bxw.row.tangem.bestFor"),
      rating: "9.4",
      reviewSlug: "tangem",
      affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL",
    },
    {
      id: "trezor",
      name: "Trezor Safe 5",
      type: t("bxw.row.trezor.type"),
      price: "$169",
      bestFor: t("bxw.row.trezor.bestFor"),
      rating: "9.3",
      reviewSlug: "trezor",
      affiliateUrl: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959",
    },
    {
      id: "ellipal",
      name: "ELLIPAL Titan",
      type: t("bxw.row.ellipal.type"),
      price: "$169",
      bestFor: t("bxw.row.ellipal.bestFor"),
      rating: "9.0",
      reviewSlug: "ellipal",
      affiliateUrl: "https://www.ellipal.com/?ref=allthingsxrpl",
    },
    {
      id: "crossmark",
      name: "Crossmark",
      type: t("bxw.row.crossmark.type"),
      price: t("wallet.fees.free"),
      bestFor: t("bxw.row.crossmark.bestFor"),
      rating: "9.5",
      reviewSlug: "crossmark",
      affiliateUrl: "https://crossmark.io/?ref=allthingsxrpl",
    },
    {
      id: "bifrost",
      name: "Bifrost Wallet",
      type: t("bxw.row.bifrost.type"),
      price: t("wallet.fees.free"),
      bestFor: t("bxw.row.bifrost.bestFor"),
      rating: "9.0",
      reviewSlug: "bifrost",
      affiliateUrl: "https://bifrostwallet.com/?ref=allthingsxrpl",
    },
  ];

  const summaryWallets = [
    {
      name: "Xaman (XUMM)",
      rating: "9.9",
      type: t("bxw.summary.xaman.type"),
      bestFor: t("bxw.summary.xaman.bestFor"),
      pros: [
        t("bxw.summary.xaman.pro1"),
        t("bxw.summary.xaman.pro2"),
        t("bxw.summary.xaman.pro3"),
      ],
      affiliateUrl: "https://xumm.app/?ref=allthingsxrpl",
      reviewSlug: "xaman",
    },
    {
      name: "Ledger Nano X",
      rating: "9.9",
      type: t("bxw.summary.ledger.type"),
      bestFor: t("bxw.summary.ledger.bestFor"),
      pros: [
        t("bxw.summary.ledger.pro1"),
        t("bxw.summary.ledger.pro2"),
        t("bxw.summary.ledger.pro3"),
      ],
      affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe",
      reviewSlug: "ledger",
    },
    {
      name: "Tangem",
      rating: "9.4",
      type: t("bxw.summary.tangem.type"),
      bestFor: t("bxw.summary.tangem.bestFor"),
      pros: [
        t("bxw.summary.tangem.pro1"),
        t("bxw.summary.tangem.pro2"),
        t("bxw.summary.tangem.pro3"),
      ],
      affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL",
      reviewSlug: "tangem",
    },
  ];

  const faqs = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: t(`bxw.faq${i}.q`),
    a: <span dangerouslySetInnerHTML={{ __html: t(`bxw.faq${i}.a`) }} />,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">{t("bxw.badge")}</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">
            {t("bxw.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {t("bxw.subtitle")}
          </p>
          <div className="mt-4">
            <LastUpdated date={t("bxw.lastUpdatedDate")} />
          </div>
        </div>

        <div className="my-10">
          <VerdictBox
            pickName="Xaman (XUMM)"
            pickReason={t("bxw.verdictReason")}
            affiliateUrl="https://xumm.app/?ref=allthingsxrpl"
            reviewSlug="xaman"
            pros={[
              t("bxw.verdictPro1"),
              t("bxw.verdictPro2"),
              t("bxw.verdictPro3"),
            ]}
            cons={[
              t("bxw.verdictCon1"),
              t("bxw.verdictCon2"),
            ]}
            runnerUp={{
              name: "Ledger Nano X",
              reason: t("bxw.runnerUpReason"),
              href: "/wallet/ledger",
            }}
          />
        </div>

        <FastCompareTable rows={rows} />

        <section className="my-16">
          <h2 className="text-3xl font-bold font-display mb-8">{t("bxw.top3Heading")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryWallets.map((w) => (
              <ReviewSummaryCard key={w.name} {...w} />
            ))}
          </div>
        </section>

        <section className="mt-24 mb-20 grid md:grid-cols-2 gap-6">
          <Link
            href="/best-for/beginners"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              {t("bxw.callout.beginnersEyebrow")}
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              {t("bxw.callout.beginnersTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("bxw.callout.beginnersDesc")}
            </p>
          </Link>
          <Link
            href="/best-for/cold-storage"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              {t("bxw.callout.coldEyebrow")}
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              {t("bxw.callout.coldTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("bxw.callout.coldDesc")}
            </p>
          </Link>
        </section>

        <section className="my-20">
          <EmailCaptureBlock source="best-xrp-wallets" />
        </section>

        <section className="mt-24 mb-32">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-8">{t("bxw.faqHeading")}</h2>
          <FAQAccordion items={faqs} />
        </section>
      </div>
    </Layout>
  );
}
