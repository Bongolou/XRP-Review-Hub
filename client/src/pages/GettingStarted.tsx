import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  ShoppingCart, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import upholdLogo from "@/assets/logos/uphold-logo.png";
import bitrueLogo from "@/assets/logos/bitrue-logo.png";
import krakenLogo from "@/assets/logos/kraken-logo.png";
import xamanLogo from "@/assets/logos/xaman-logo.png";

const steps = [
  {
    number: 1,
    title: "Choose an Exchange",
    icon: ShoppingCart,
    description: "Select a reputable cryptocurrency exchange that supports XRP and serves your region.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          To buy XRP, you'll need to create an account on a cryptocurrency exchange. We recommend these trusted platforms:
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
            <div className="text-sm text-muted-foreground">Best for beginners, direct XRP purchases</div>
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
            <div className="text-sm text-muted-foreground">XRP-focused, great for trading</div>
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
            <div className="text-sm text-muted-foreground">Established, secure, good liquidity</div>
          </a>
        </div>
        <div className="flex items-start gap-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-200/80">
            XRP is not available on some US exchanges (like Coinbase) due to regulatory issues. 
            Check availability in your region before signing up.
          </p>
        </div>
      </div>
    )
  },
  {
    number: 2,
    title: "Verify Your Identity",
    icon: Shield,
    description: "Complete KYC (Know Your Customer) verification to enable deposits and trading.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Regulated exchanges require identity verification. Have these ready:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Government-issued ID (passport, driver's license)
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Proof of address (utility bill, bank statement)
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Selfie for facial verification
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Verification typically takes 10 minutes to 24 hours depending on the exchange.
        </p>
      </div>
    )
  },
  {
    number: 3,
    title: "Buy XRP",
    icon: ShoppingCart,
    description: "Deposit funds and purchase your first XRP.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Once verified, you can deposit funds and buy XRP:
        </p>
        <ol className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
            <span>Deposit funds via bank transfer, debit card, or other payment methods</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
            <span>Navigate to the XRP trading pair (e.g., XRP/USD)</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
            <span>Enter the amount you want to buy and confirm the purchase</span>
          </li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Start small while you learn. You can always buy more later.
        </p>
      </div>
    )
  },
  {
    number: 4,
    title: "Set Up a Wallet",
    icon: Wallet,
    description: "Download and configure a self-custody wallet for secure storage.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          For security, transfer your XRP from the exchange to a self-custody wallet. 
          We recommend <strong className="text-white">Xaman</strong> (formerly XUMM):
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
            <div className="font-bold text-primary">Download Xaman</div>
            <div className="text-sm text-muted-foreground">Free • iOS & Android • Full XRPL support</div>
          </div>
          <ExternalLink className="h-5 w-5 text-primary flex-shrink-0" />
        </a>
        <ol className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
            <span>Download from official app store (not third-party sites)</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
            <span>Create a new wallet and set a strong password</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
            <span><strong className="text-white">Write down your recovery phrase</strong> on paper (not digitally!)</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-secondary/20 text-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">4</span>
            <span>Store the recovery phrase in a safe, secure location</span>
          </li>
        </ol>
      </div>
    )
  },
  {
    number: 5,
    title: "Transfer Your XRP",
    icon: ArrowRight,
    description: "Send your XRP from the exchange to your wallet for safe keeping.",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Move your XRP to self-custody for maximum security:
        </p>
        <ol className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">1</span>
            <span>In your Xaman wallet, tap to copy your XRP address (starts with 'r')</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">2</span>
            <span>On the exchange, go to Withdraw and select XRP</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">3</span>
            <span>Paste your wallet address and enter the amount</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">4</span>
            <span>Double-check the address and confirm the withdrawal</span>
          </li>
        </ol>
        <div className="flex items-start gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-green-200/80">
            XRP transfers are fast! Your funds should arrive in seconds to minutes. 
            Always send a small test amount first.
          </p>
        </div>
        <div className="flex items-start gap-2 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-200/80">
            Remember: New XRPL wallets require a 10 XRP minimum balance (base reserve). 
            This XRP is locked while the wallet is active.
          </p>
        </div>
      </div>
    )
  }
];

export default function GettingStarted() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">Getting Started with XRP</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A beginner's guide to buying your first XRP and storing it safely
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/20 w-12 h-12 rounded-xl flex items-center justify-center border border-primary/30 shrink-0">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-primary font-display mb-1">Step {step.number}</div>
                  <h2 className="text-xl font-bold font-display">{step.title}</h2>
                  <p className="text-muted-foreground mt-1">{step.description}</p>
                </div>
              </div>
              {step.content}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold font-display mb-4">Ready to Explore More?</h2>
          <p className="text-muted-foreground mb-6">
            Now that you own XRP, discover the wider XRPL ecosystem including DeFi, NFTs, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="/#wallets">Compare Wallets</a>
            </Button>
            <Button asChild variant="outline" className="border-white/20">
              <a href="/faq">Read FAQ</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
