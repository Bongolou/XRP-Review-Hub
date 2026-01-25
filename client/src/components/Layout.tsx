import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Wallet } from "lucide-react";
import { useEffect } from "react";
import { PriceTicker } from "./PriceTicker";
import { SocialLinks } from "./SocialLinks";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      <div className="bg-primary/10 border-b border-primary/20 py-1.5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <PriceTicker />
          <SocialLinks />
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors border border-primary/50">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              ALL THINGS XRPL
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Home
            </Link>
            <Link href="/#wallets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Wallets
            </Link>
            <Link href="/getting-started" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/getting-started' ? 'text-primary' : 'text-muted-foreground'}`}>
              Get Started
            </Link>
            <Link href="/blog" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/blog' ? 'text-primary' : 'text-muted-foreground'}`}>
              Blog
            </Link>
            <Link href="/wallet-quiz" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/wallet-quiz' ? 'text-primary' : 'text-muted-foreground'}`}>
              Wallet Quiz
            </Link>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-l border-white/10">
              <nav className="flex flex-col gap-4 mt-10">
                <Link href="/" className="text-lg font-medium hover:text-primary">Home</Link>
                <Link href="/#wallets" className="text-lg font-medium hover:text-primary">Wallets</Link>
                <Link href="/getting-started" className="text-lg font-medium hover:text-primary">Get Started</Link>
                <Link href="/blog" className="text-lg font-medium hover:text-primary">Blog</Link>
                <Link href="/wallet-quiz" className="text-lg font-medium hover:text-primary">Wallet Quiz</Link>
                <Link href="/faq" className="text-lg font-medium hover:text-primary">FAQ</Link>
                <Link href="/contact" className="text-lg font-medium hover:text-primary">Contact</Link>
                <Link href="/disclosure" className="text-lg font-medium hover:text-primary">Disclosure</Link>
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
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold font-display">ALL THINGS XRPL</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted guide to the XRP Ledger ecosystem.
              </p>
              <SocialLinks />
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">Wallets</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/wallet/xaman" className="hover:text-primary transition-colors">Xaman Review</Link></li>
                <li><Link href="/wallet/tangem" className="hover:text-primary transition-colors">Tangem Review</Link></li>
                <li><Link href="/wallet/ledger" className="hover:text-primary transition-colors">Ledger Review</Link></li>
                <li><Link href="/wallet-quiz" className="hover:text-primary transition-colors">Wallet Quiz</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">Exchanges</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/exchange/uphold" className="hover:text-primary transition-colors">Uphold Review</Link></li>
                <li><Link href="/exchange/bitrue" className="hover:text-primary transition-colors">Bitrue Review</Link></li>
                <li><Link href="/exchange/kraken" className="hover:text-primary transition-colors">Kraken Review</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/getting-started" className="hover:text-primary transition-colors">Getting Started</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/disclosure" className="hover:text-primary transition-colors">Affiliate Disclosure</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} All Things XRPL. All rights reserved.</p>
            <p>Not financial advice. Do your own research.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
