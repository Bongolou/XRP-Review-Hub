import { Layout } from "@/components/Layout";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Disclosure() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black font-display mb-8" data-testid="text-disclosure-title">{t("disclosure.title")}</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
          <p className="lead text-xl text-white mb-8" data-testid="text-disclosure-intro">
            {t("disclosure.intro")}
          </p>

          <div className="p-6 rounded-xl bg-card border border-white/10 mb-10">
            <h3 className="text-white font-display font-bold mt-0">{t("disclosure.summary.title")}</h3>
            <p className="mb-0" data-testid="text-disclosure-summary">
              {t("disclosure.summary.text")}
            </p>
          </div>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">{t("disclosure.methodology.title")}</h2>
          <p data-testid="text-disclosure-methodology-p1">
            {t("disclosure.methodology.p1")}
          </p>
          <p>
            {t("disclosure.methodology.p2")}
          </p>
          <p>
            {t("disclosure.methodology.p3")}
          </p>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">{t("disclosure.testing.title")}</h2>
          <p data-testid="text-disclosure-testing-p1">
            {t("disclosure.testing.p1")}
          </p>
          <p>
            {t("disclosure.testing.p2")}
          </p>
          <p>
            {t("disclosure.testing.p3")}
          </p>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">{t("disclosure.selection.title")}</h2>
          <p data-testid="text-disclosure-selection-p1">
            {t("disclosure.selection.p1")}
          </p>
          <p>
            {t("disclosure.selection.p2")}
          </p>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">{t("disclosure.conflict.title")}</h2>
          <p data-testid="text-disclosure-conflict-p1">
            {t("disclosure.conflict.p1")}
          </p>
          <p>
            {t("disclosure.conflict.p2")}
          </p>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">{t("disclosure.ftc.title")}</h2>
          <p data-testid="text-disclosure-ftc-p1">
            {t("disclosure.ftc.p1")}
          </p>
          <p>
            {t("disclosure.ftc.p2")}
          </p>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">{t("disclosure.whyaffiliate.title")}</h2>
          <p data-testid="text-disclosure-whyaffiliate">
            {t("disclosure.whyaffiliate.text")}
          </p>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">{t("disclosure.promise.title")}</h2>
          <p data-testid="text-disclosure-promise">
            {t("disclosure.promise.text")}
          </p>
          
          <div className="mt-12 pt-12 border-t border-white/10 text-sm">
            <p>
              {t("disclosure.contact")}
            </p>
            <p className="mt-4" data-testid="text-disclosure-updated">
              {t("disclosure.updated")}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
