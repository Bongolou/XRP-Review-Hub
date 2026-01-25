import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Wallet, Shield, FileText } from "lucide-react";
import { useEffect } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors border border-primary/50">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-display tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              XRP NEXUS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Home
            </Link>
            <Link href="/#wallets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Wallets
            </Link>
            <Link href="/#blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Insights
            </Link>
            <Link href="/disclosure" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/disclosure' ? 'text-primary' : 'text-muted-foreground'}`}>
              Disclosure
            </Link>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-display uppercase tracking-widest text-xs">
              Connect Wallet
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-l border-white/10">
              <nav className="flex flex-col gap-6 mt-10">
                <Link href="/" className="text-lg font-medium hover:text-primary">
                  Home
                </Link>
                <Link href="/#wallets" className="text-lg font-medium hover:text-primary">
                  Wallets
                </Link>
                <Link href="/#blog" className="text-lg font-medium hover:text-primary">
                  Insights
                </Link>
                <Link href="/disclosure" className="text-lg font-medium hover:text-primary">
                  Disclosure
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold font-display">XRP NEXUS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The premier destination for XRP Ledger ecosystem reviews, wallet comparisons, and dApp insights.
              </p>
            </div>
            
            <div>
              <h3 className="font-display font-bold mb-4">Ecosystem</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">XRPL.org</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">XRP Ledger</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ripple</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">DeFi Tools</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/#wallets" className="hover:text-primary transition-colors">Best Wallets</Link></li>
                <li><Link href="/#blog" className="hover:text-primary transition-colors">Staking Guides</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security Tips</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/disclosure" className="hover:text-primary transition-colors">Affiliate Disclosure</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} XRP Nexus. All rights reserved.</p>
            <p>Not financial advice. Do your own research.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
