import * as React from "react";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { useParams } from "wouter";
import { Link } from "@/lib/i18n/LocalizedLink";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { buildPageOgImage } from "@/lib/ogImage";
import { getBestForSeo } from "@/lib/i18n/pageSeo";
import {
  VerdictBox,
  FastCompareTable,
  FAQAccordion,
  LastUpdated,
  EmailCaptureBlock,
  getLeadMagnetAssetUrl,
  type FastCompareRow,
} from "@/components/conversion";

const slugWalletRows: Record<string, { id: string; price: string; rating: string; reviewSlug: string; affiliateUrl: string; highlight?: boolean }[]> = {
  beginners: [
    { id: "xaman", price: "free", rating: "9.9", reviewSlug: "xaman", affiliateUrl: "https://xumm.app/?ref=allthingsxrpl", highlight: true },
    { id: "crossmark", price: "free", rating: "9.5", reviewSlug: "crossmark", affiliateUrl: "https://crossmark.io/?ref=allthingsxrpl" },
    { id: "bifrost", price: "free", rating: "9.0", reviewSlug: "bifrost", affiliateUrl: "https://bifrostwallet.com/?ref=allthingsxrpl" },
    { id: "tangem", price: "$54.90", rating: "9.4", reviewSlug: "tangem", affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL" },
  ],
  hardware: [
    { id: "ledger", price: "$149", rating: "9.9", reviewSlug: "ledger", affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe", highlight: true },
    { id: "tangem", price: "$54.90", rating: "9.4", reviewSlug: "tangem", affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL" },
    { id: "trezor", price: "$169", rating: "9.3", reviewSlug: "trezor", affiliateUrl: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959" },
    { id: "ellipal", price: "$169", rating: "9.0", reviewSlug: "ellipal", affiliateUrl: "https://www.ellipal.com/?ref=allthingsxrpl" },
  ],
  "cold-storage": [
    { id: "ledger", price: "$149", rating: "9.9", reviewSlug: "ledger", affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe", highlight: true },
    { id: "ellipal", price: "$169", rating: "9.0", reviewSlug: "ellipal", affiliateUrl: "https://www.ellipal.com/?ref=allthingsxrpl" },
    { id: "trezor", price: "$169", rating: "9.3", reviewSlug: "trezor", affiliateUrl: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959" },
    { id: "tangem", price: "$54.90", rating: "9.4", reviewSlug: "tangem", affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL" },
  ],
  defi: [
    { id: "xaman", price: "free", rating: "9.9", reviewSlug: "xaman", affiliateUrl: "https://xumm.app/?ref=allthingsxrpl", highlight: true },
    { id: "crossmark", price: "free", rating: "9.5", reviewSlug: "crossmark", affiliateUrl: "https://crossmark.io/?ref=allthingsxrpl" },
    { id: "bifrost", price: "free", rating: "9.0", reviewSlug: "bifrost", affiliateUrl: "https://bifrostwallet.com/?ref=allthingsxrpl" },
    { id: "gatehub", price: "free", rating: "8.6", reviewSlug: "gatehub", affiliateUrl: "https://gatehub.net/?ref=allthingsxrpl" },
  ],
  safest: [
    { id: "ledger", price: "$149", rating: "9.9", reviewSlug: "ledger", affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe", highlight: true },
    { id: "tangem", price: "$54.90", rating: "9.4", reviewSlug: "tangem", affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL" },
    { id: "ellipal", price: "$169", rating: "9.0", reviewSlug: "ellipal", affiliateUrl: "https://www.ellipal.com/?ref=allthingsxrpl" },
    { id: "xaman", price: "free", rating: "9.9", reviewSlug: "xaman", affiliateUrl: "https://xumm.app/?ref=allthingsxrpl" },
  ],
};

const walletDisplayName: Record<string, string> = {
  xaman: "Xaman (XUMM)",
  ledger: "Ledger Nano X",
  tangem: "Tangem",
  trezor: "Trezor Safe 5",
  ellipal: "ELLIPAL Titan",
  crossmark: "Crossmark",
  bifrost: "Bifrost Wallet",
  gatehub: "GateHub",
};

const runnerUpHrefs: Record<string, string> = {
  beginners: "/wallet/crossmark",
  hardware: "/wallet/tangem",
  "cold-storage": "/wallet/ellipal",
  defi: "/wallet/crossmark",
  safest: "/wallet/tangem",
};

const runnerUpNames: Record<string, string> = {
  beginners: "Crossmark",
  hardware: "Tangem",
  "cold-storage": "ELLIPAL Titan",
  defi: "Crossmark",
  safest: "Tangem",
};

const pickAffiliate: Record<string, string> = {
  beginners: "https://xumm.app/?ref=allthingsxrpl",
  hardware: "https://shop.ledger.com/?r=5d81f18905fe",
  "cold-storage": "https://shop.ledger.com/?r=5d81f18905fe",
  defi: "https://xumm.app/?ref=allthingsxrpl",
  safest: "https://shop.ledger.com/?r=5d81f18905fe",
};

const pickReviewSlug: Record<string, string> = {
  beginners: "xaman",
  hardware: "ledger",
  "cold-storage": "ledger",
  defi: "xaman",
  safest: "ledger",
};

const validSlugs = ["beginners", "hardware", "cold-storage", "defi", "safest"];

export default function BestFor() {
  const { t, language } = useLanguage();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const seo = slug && validSlugs.includes(slug) ? getBestForSeo(language, slug) : undefined;
  useDocumentMeta({
    title: seo?.title,
    description: seo?.description,
    canonicalPath: seo ? `/best-for/${slug}` : undefined,
    image: seo ? buildPageOgImage(seo.title) : undefined,
  });

  if (!slug || !validSlugs.includes(slug)) {
    return (
      <Layout>
        <div className="container mx-auto px-4 max-w-3xl text-center py-16">
          <h1 className="text-3xl font-bold font-display mb-4">{t("bf.notFoundTitle")}</h1>
          <p className="text-muted-foreground mb-6">{t("bf.notFoundDesc")}</p>
          <Link href="/best-xrp-wallets" className="text-primary hover:underline">
            {t("bf.notFoundLink")}
          </Link>
        </div>
      </Layout>
    );
  }

  const rows: FastCompareRow[] = slugWalletRows[slug].map((r) => ({
    id: r.id,
    name: walletDisplayName[r.id] || r.id,
    type: t(`bxw.row.${r.id}.type`),
    price: r.price === "free" ? t("wallet.fees.free") : r.price,
    bestFor: t(`bxw.row.${r.id}.bestFor`),
    rating: r.rating,
    reviewSlug: r.reviewSlug,
    affiliateUrl: r.affiliateUrl,
    highlight: r.highlight,
  }));

  const faqs = [1, 2, 3].map((i) => {
    const q = t(`bf.${slug}.faq${i}.q`);
    const a = t(`bf.${slug}.faq${i}.a`);
    if (!q || q === `bf.${slug}.faq${i}.q`) return null;
    return {
      q,
      a: <span dangerouslySetInnerHTML={{ __html: a }} />,
    };
  }).filter((x): x is { q: string; a: React.ReactElement } => x !== null);

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">{t(`bf.${slug}.badge`)}</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t(`bf.${slug}.title`)}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">{t(`bf.${slug}.intro`)}</p>
          <div className="mt-4">
            <LastUpdated date={t("bxw.lastUpdatedDate")} />
          </div>
        </div>

        <div className="my-10">
          <VerdictBox
            pickName={t(`bf.${slug}.pickName`)}
            pickReason={t(`bf.${slug}.pickReason`)}
            affiliateUrl={pickAffiliate[slug]}
            reviewSlug={pickReviewSlug[slug]}
            runnerUp={{
              name: runnerUpNames[slug],
              reason: t(`bf.${slug}.runnerUpReason`),
              href: runnerUpHrefs[slug],
            }}
            pros={[
              t(`bf.${slug}.pickPro1`),
              t(`bf.${slug}.pickPro2`),
              t(`bf.${slug}.pickPro3`),
            ]}
            cons={[
              t(`bf.${slug}.pickCon1`),
              t(`bf.${slug}.pickCon2`),
            ]}
          />
        </div>

        <FastCompareTable
          rows={rows}
          title={t("bf.shortlistTitle")}
          subtitle={t("bf.shortlistSubtitle")}
        />

        <section className="my-20 max-w-3xl">
          <h2 className="text-2xl font-bold font-display mb-4">{t("bf.whyHeading")}</h2>
          <div
            className="text-muted-foreground leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: t(`bf.${slug}.body`) }}
          />
        </section>

        <section className="my-20 grid md:grid-cols-3 gap-6 md:gap-8">
          <Link
            href="/best-xrp-wallets"
            className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-1">
              {t("bf.crossAllEyebrow")}
            </div>
            <div className="font-display font-bold">{t("bf.crossAllTitle")}</div>
          </Link>
          <Link
            href="/best-for/cold-storage"
            className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-1">
              {t("bf.crossColdEyebrow")}
            </div>
            <div className="font-display font-bold">{t("bf.crossColdTitle")}</div>
          </Link>
          <Link
            href="/best-for/defi"
            className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-1">
              {t("bf.crossDefiEyebrow")}
            </div>
            <div className="font-display font-bold">{t("bf.crossDefiTitle")}</div>
          </Link>
        </section>

        <section className="my-24">
          <EmailCaptureBlock source={`best-for-${slug}`} assetUrl={getLeadMagnetAssetUrl(language)} />
        </section>

        <section className="my-24">
          <h2 className="text-3xl font-bold font-display mb-6">{t("bf.faqHeading")}</h2>
          <FAQAccordion items={faqs} />
        </section>
      </div>
    </Layout>
  );
}
