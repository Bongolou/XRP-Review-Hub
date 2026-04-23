import { Layout } from "@/components/Layout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { buildPageOgImage } from "@/lib/ogImage";
import { getStaticPageSeo } from "@/lib/i18n/pageSeo";

export default function Privacy() {
  const { language, t } = useLanguage();
  const seo = getStaticPageSeo(language, "privacy");
  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    canonicalPath: "/privacy",
    image: buildPageOgImage(seo.title),
  });
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl py-20 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4" data-testid="text-privacy-title">{t("privacy.title")}</h1>
          <p className="text-muted-foreground" data-testid="text-privacy-last-updated">{t("privacy.lastUpdated")}</p>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s1.h")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("privacy.s1.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-white">{t("privacy.s1.li1.label")}</strong> {t("privacy.s1.li1.text")}</li>
                <li><strong className="text-white">{t("privacy.s1.li2.label")}</strong> {t("privacy.s1.li2.text")}</li>
                <li><strong className="text-white">{t("privacy.s1.li3.label")}</strong> {t("privacy.s1.li3.text")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s2.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.s2.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>{t("privacy.s2.li1")}</li>
                <li>{t("privacy.s2.li2")}</li>
                <li>{t("privacy.s2.li3")}</li>
                <li>{t("privacy.s2.li4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s3.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.s3.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>{t("privacy.s3.li1")}</li>
                <li>{t("privacy.s3.li2")}</li>
                <li>{t("privacy.s3.li3")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s4.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.s4.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t("privacy.s4.p2")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s5.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.s5.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s6.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.s6.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s7.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.s7.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>{t("privacy.s7.li1")}</li>
                <li>{t("privacy.s7.li2")}</li>
                <li>{t("privacy.s7.li3")}</li>
                <li>{t("privacy.s7.li4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("privacy.s8.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.s8.p1.intro")}{" "}
                <a href="mailto:privacy@allthingsxrpl.com" className="text-primary hover:underline">
                  privacy@allthingsxrpl.com
                </a>{" "}
                {t("privacy.s8.p1.via")} <a href="/contact" className="text-primary hover:underline">{t("privacy.s8.contactForm")}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
