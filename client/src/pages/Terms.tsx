import { Layout } from "@/components/Layout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { buildPageOgImage } from "@/lib/ogImage";
import { getStaticPageSeo } from "@/lib/i18n/pageSeo";

export default function Terms() {
  const { language, t } = useLanguage();
  const seo = getStaticPageSeo(language, "terms");
  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    canonicalPath: "/terms",
    image: buildPageOgImage(seo.title),
  });
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl py-20 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4" data-testid="text-terms-title">{t("terms.title")}</h1>
          <p className="text-muted-foreground" data-testid="text-terms-last-updated">{t("terms.lastUpdated")}</p>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s1.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s1.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s2.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s2.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s3.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s3.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s4.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s4.p1.intro")}{" "}
                <a href="/disclosure" className="text-primary hover:underline">{t("terms.s4.disclosureLink")}</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s5.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s5.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s6.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s6.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s7.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s7.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s8.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s8.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s9.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s9.p1")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>{t("terms.s9.li1")}</li>
                <li>{t("terms.s9.li2")}</li>
                <li>{t("terms.s9.li3")}</li>
                <li>{t("terms.s9.li4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s10.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s10.p1")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">{t("terms.s11.h")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.s11.p1.intro")}{" "}
                <a href="mailto:legal@allthingsxrpl.com" className="text-primary hover:underline">
                  legal@allthingsxrpl.com
                </a>{" "}
                {t("terms.s11.p1.via")} <a href="/contact" className="text-primary hover:underline">{t("terms.s11.contactForm")}</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
