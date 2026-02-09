import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { 
  Wallet, 
  ShoppingCart, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import upholdLogo from "@/assets/logos/uphold-logo.webp";
import bitrueLogo from "@/assets/logos/bitrue-logo.webp";
import krakenLogo from "@/assets/logos/kraken-logo.webp";
import xamanLogo from "@/assets/logos/xaman-logo.webp";

export default function GettingStarted() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t("gettingStarted.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("gettingStarted.subtitle")}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Step 1: Choose an Exchange */}
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center border border-primary/30 shrink-0">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-primary font-display mb-1">{t("gettingStarted.step")} 1</div>
                <h2 className="text-xl font-bold font-display">{t("gettingStarted.step1.title")}</h2>
                <p className="text-muted-foreground mt-1">{t("gettingStarted.step1.desc")}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("gettingStarted.step1.content")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="https://uphold.com/sign-up?referral=allthingsxrpl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-card/50 border border-white/10 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={upholdLogo} alt="Uphold" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold group-hover:text-primary transition-colors">Uphold</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{t("gettingStarted.step1.upholdDesc")}</div>
                </a>
                <a 
                  href="https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-card/50 border border-white/10 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={bitrueLogo} alt="Bitrue" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold group-hover:text-primary transition-colors">Bitrue</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{t("gettingStarted.step1.bitrueDesc")}</div>
                </a>
                <a 
                  href="https://www.kraken.com/sign-up?clickid=allthingsxrpl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-card/50 border border-white/10 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={krakenLogo} alt="Kraken" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold group-hover:text-primary transition-colors">Kraken</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{t("gettingStarted.step1.krakenDesc")}</div>
                </a>
              </div>
              <div className="flex items-start gap-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200/80">
                  {t("gettingStarted.step1.warning")}
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Verify Your Identity */}
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center border border-primary/30 shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-primary font-display mb-1">{t("gettingStarted.step")} 2</div>
                <h2 className="text-xl font-bold font-display">{t("gettingStarted.step2.title")}</h2>
                <p className="text-muted-foreground mt-1">{t("gettingStarted.step2.desc")}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("gettingStarted.step2.content")}
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  {t("gettingStarted.step2.id")}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  {t("gettingStarted.step2.address")}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  {t("gettingStarted.step2.selfie")}
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                {t("gettingStarted.step2.time")}
              </p>
            </div>
          </div>

          {/* Step 3: Buy XRP */}
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center border border-primary/30 shrink-0">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-primary font-display mb-1">{t("gettingStarted.step")} 3</div>
                <h2 className="text-xl font-bold font-display">{t("gettingStarted.step3.title")}</h2>
                <p className="text-muted-foreground mt-1">{t("gettingStarted.step3.desc")}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("gettingStarted.step3.content")}
              </p>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
                  <span>{t("gettingStarted.step3.deposit")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
                  <span>{t("gettingStarted.step3.navigate")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
                  <span>{t("gettingStarted.step3.confirm")}</span>
                </li>
              </ol>
              <p className="text-sm text-muted-foreground">
                {t("gettingStarted.step3.tip")}
              </p>
            </div>
          </div>

          {/* Step 4: Set Up a Wallet */}
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center border border-primary/30 shrink-0">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-primary font-display mb-1">{t("gettingStarted.step")} 4</div>
                <h2 className="text-xl font-bold font-display">{t("gettingStarted.step4.title")}</h2>
                <p className="text-muted-foreground mt-1">{t("gettingStarted.step4.desc")}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("gettingStarted.step4.content")} <strong className="text-white">Xaman</strong> (formerly XUMM):
              </p>
              <a 
                href="https://xaman.app/?ref=allthingsxrpl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-primary/30">
                  <img src={xamanLogo} alt="Xaman" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-primary">{t("gettingStarted.step4.download")}</div>
                  <div className="text-sm text-muted-foreground">{t("gettingStarted.step4.downloadDesc")}</div>
                </div>
                <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
              </a>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
                  <span>{t("gettingStarted.step4.instructions1")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
                  <span>{t("gettingStarted.step4.instructions2")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
                  <span><strong className="text-white">{t("gettingStarted.step4.instructions3")}</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">4</span>
                  <span>{t("gettingStarted.step4.instructions4")}</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Step 5: Transfer Your XRP */}
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center border border-primary/30 shrink-0">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-primary font-display mb-1">{t("gettingStarted.step")} 5</div>
                <h2 className="text-xl font-bold font-display">{t("gettingStarted.step5.title")}</h2>
                <p className="text-muted-foreground mt-1">{t("gettingStarted.step5.desc")}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {t("gettingStarted.step5.content")}
              </p>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
                  <span>{t("gettingStarted.step5.instructions1")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
                  <span>{t("gettingStarted.step5.instructions2")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
                  <span>{t("gettingStarted.step5.instructions3")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">4</span>
                  <span>{t("gettingStarted.step5.instructions4")}</span>
                </li>
              </ol>
              <div className="flex items-start gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <p className="text-sm text-green-200/80">
                  {t("gettingStarted.step5.success")}
                </p>
              </div>
              <div className="flex items-start gap-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-200/80">
                  {t("gettingStarted.step5.warning")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">{t("gettingStarted.readyTitle")}</h2>
          <p className="text-muted-foreground mb-6">
            {t("gettingStarted.readyDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="/#wallets">{t("gettingStarted.compareWallets")}</a>
            </Button>
            <Button asChild variant="outline" className="border-white/20">
              <a href="/faq">{t("gettingStarted.readFAQ")}</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
