import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { useEffect } from "react";
import { PriceTicker } from "./PriceTicker";
import { SocialLinks } from "./SocialLinks";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { useSearch } from "./SearchDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import siteLogo from "@/assets/logos/allthingsxrpl-logo.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const search = useSearch();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      
      <div className="bg-primary/10 border-b border-primary/20 py-1.5 relative z-[60]">
        <div className="container mx-auto px-4 flex items-center justify-between overflow-visible">
          <PriceTicker />
          <div className="flex items-center gap-2 overflow-visible">
            <SocialLinks />
            <div className="hidden sm:block h-4 w-px bg-white/20 mx-2" />
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform shadow-[0_0_20px_-3px_rgba(59,130,246,0.6)] border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-transparent">
              <img src={siteLogo} alt="All Things XRPL" className="w-full h-full object-cover scale-150" />
            </div>
            <span className="text-2xl md:text-3xl tracking-wider text-white uppercase" style={{ fontFamily: "'Michroma', sans-serif" }}>
              All Things <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">XRPL</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              {t("nav.home")}
            </Link>
            <Link href="/#wallets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {t("nav.wallets")}
            </Link>
            <Link href="/getting-started" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/getting-started' ? 'text-primary' : 'text-muted-foreground'}`}>
              {t("nav.gettingStarted")}
            </Link>
            <Link href="/blog" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/blog' ? 'text-primary' : 'text-muted-foreground'}`}>
              {t("nav.blog")}
            </Link>
            <Link href="/wallet-quiz" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/wallet-quiz' ? 'text-primary' : 'text-muted-foreground'}`}>
              {t("footer.walletQuiz")}
            </Link>
            <button 
              onClick={search.open}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Search (⌘K)"
              data-testid="search-button"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-l border-white/10">
              <nav className="flex flex-col gap-4 mt-10">
                <Link href="/" className="text-lg font-medium hover:text-primary">{t("nav.home")}</Link>
                <Link href="/#wallets" className="text-lg font-medium hover:text-primary">{t("nav.wallets")}</Link>
                <Link href="/getting-started" className="text-lg font-medium hover:text-primary">{t("nav.gettingStarted")}</Link>
                <Link href="/blog" className="text-lg font-medium hover:text-primary">{t("nav.blog")}</Link>
                <Link href="/wallet-quiz" className="text-lg font-medium hover:text-primary">{t("footer.walletQuiz")}</Link>
                <Link href="/faq" className="text-lg font-medium hover:text-primary">{t("footer.faq")}</Link>
                <Link href="/contact" className="text-lg font-medium hover:text-primary">{t("nav.contact")}</Link>
                <Link href="/disclosure" className="text-lg font-medium hover:text-primary">{t("common.affiliate")}</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 relative">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_-3px_rgba(59,130,246,0.6)] border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-transparent">
                  <img src={siteLogo} alt="All Things XRPL" className="w-full h-full object-cover scale-150" />
                </div>
                <span className="text-xl tracking-wider text-white uppercase" style={{ fontFamily: "'Michroma', sans-serif" }}>All Things <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">XRPL</span></span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("footer.tagline")}
              </p>
              <SocialLinks />
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">{t("nav.wallets")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/wallet/xaman" className="hover:text-primary transition-colors">Xaman {t("common.review")}</Link></li>
                <li><Link href="/wallet/tangem" className="hover:text-primary transition-colors">Tangem {t("common.review")}</Link></li>
                <li><Link href="/wallet/ledger" className="hover:text-primary transition-colors">Ledger {t("common.review")}</Link></li>
                <li><Link href="/wallet/bifrost" className="hover:text-primary transition-colors">Bifrost {t("common.review")}</Link></li>
                <li><Link href="/wallet/trezor" className="hover:text-primary transition-colors">Trezor {t("common.review")}</Link></li>
                <li><Link href="/wallet-quiz" className="hover:text-primary transition-colors">{t("footer.walletQuiz")}</Link></li>
                <li><Link href="/#wallets" className="hover:text-primary transition-colors font-medium text-primary">{t("footer.viewAllWallets")} →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">{t("nav.exchanges")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/exchange/uphold" className="hover:text-primary transition-colors">Uphold {t("common.review")}</Link></li>
                <li><Link href="/exchange/coinbase" className="hover:text-primary transition-colors">Coinbase {t("common.review")}</Link></li>
                <li><Link href="/exchange/kraken" className="hover:text-primary transition-colors">Kraken {t("common.review")}</Link></li>
                <li><Link href="/exchange/bitstamp" className="hover:text-primary transition-colors">Bitstamp {t("common.review")}</Link></li>
                <li><Link href="/exchange/cryptocom" className="hover:text-primary transition-colors">Crypto.com {t("common.review")}</Link></li>
                <li><Link href="/#exchanges" className="hover:text-primary transition-colors font-medium text-primary">{t("footer.viewAllExchanges")} →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">{t("footer.resources")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/getting-started" className="hover:text-primary transition-colors">{t("nav.gettingStarted")}</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">{t("nav.blog")}</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">{t("footer.faq")}</Link></li>
                <li><a href="/rss.xml" className="hover:text-primary transition-colors">{t("footer.rssFeed")}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">{t("footer.company")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">{t("nav.about")}</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
                <li><Link href="/disclosure" className="hover:text-primary transition-colors">{t("common.affiliate")}</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">{t("footer.terms")}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} All Things XRPL. {t("footer.rights")}</p>
            <p>{t("footer.disclaimer")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
