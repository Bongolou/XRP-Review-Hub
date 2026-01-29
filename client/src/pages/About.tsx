import { Layout } from "@/components/Layout";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Shield, Users, Target, Heart } from "lucide-react";

export default function About() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t("about.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="prose prose-invert max-w-none mb-16">
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold font-display mb-6 text-white">{t("about.mission.title")}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t("about.mission.p1")}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("about.mission.p2")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-primary/30">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{t("about.feature1.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("about.feature1.desc")}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-secondary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-secondary/30">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{t("about.feature2.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("about.feature2.desc")}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-purple-500/30">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{t("about.feature3.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("about.feature3.desc")}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-green-500/30">
              <Heart className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{t("about.feature4.title")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("about.feature4.desc")}
            </p>
          </div>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold font-display mb-6">{t("about.disclosure.title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("about.disclosure.desc")}
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold font-display mb-4">{t("about.cta")}</h2>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
          >
            {t("contact.title")}
          </a>
        </div>
      </div>
    </Layout>
  );
}
