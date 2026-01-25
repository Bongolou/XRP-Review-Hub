import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { Check, X, ExternalLink, ArrowLeft, Trophy } from "lucide-react";

type ComparisonData = {
  wallet1: {
    name: string;
    slug: string;
    type: string;
    price: string;
    link: string;
  };
  wallet2: {
    name: string;
    slug: string;
    type: string;
    price: string;
    link: string;
  };
  winner: string;
  winnerReason: string;
  features: {
    name: string;
    wallet1: boolean | string;
    wallet2: boolean | string;
  }[];
};

const comparisons: Record<string, ComparisonData> = {
  "xaman-vs-ledger": {
    wallet1: {
      name: "Xaman (XUMM)",
      slug: "xaman",
      type: "Software",
      price: "Free",
      link: "https://xaman.app/?ref=allthingsxrpl"
    },
    wallet2: {
      name: "Ledger Nano X",
      slug: "ledger",
      type: "Hardware",
      price: "$149",
      link: "https://shop.ledger.com/?r=allthingsxrpl"
    },
    winner: "Both",
    winnerReason: "Use Xaman for daily transactions and DeFi, pair with Ledger for cold storage of larger holdings.",
    features: [
      { name: "Price", wallet1: "Free", wallet2: "$149" },
      { name: "Platform", wallet1: "iOS, Android", wallet2: "Desktop, Mobile" },
      { name: "Security Type", wallet1: "Software", wallet2: "Hardware (Secure Element)" },
      { name: "XRPL DEX", wallet1: true, wallet2: false },
      { name: "NFT Support", wallet1: true, wallet2: true },
      { name: "AMM/DeFi", wallet1: true, wallet2: false },
      { name: "Multi-Currency", wallet1: false, wallet2: true },
      { name: "Cold Storage", wallet1: false, wallet2: true },
      { name: "Bluetooth", wallet1: false, wallet2: true },
      { name: "xApp Ecosystem", wallet1: true, wallet2: false },
      { name: "Best For", wallet1: "Daily use, DeFi", wallet2: "Long-term storage" }
    ]
  },
  "xaman-vs-tangem": {
    wallet1: {
      name: "Xaman (XUMM)",
      slug: "xaman",
      type: "Software",
      price: "Free",
      link: "https://xaman.app/?ref=allthingsxrpl"
    },
    wallet2: {
      name: "Tangem",
      slug: "tangem",
      type: "Hardware Card",
      price: "$54.90",
      link: "https://tangem.com/?ref=allthingsxrpl"
    },
    winner: "Xaman",
    winnerReason: "For XRPL-specific features like DEX and DeFi, Xaman is unmatched. Tangem is great as a backup or for portable cold storage.",
    features: [
      { name: "Price", wallet1: "Free", wallet2: "$54.90" },
      { name: "Platform", wallet1: "iOS, Android", wallet2: "NFC Card + App" },
      { name: "Security Type", wallet1: "Software", wallet2: "Hardware Card" },
      { name: "XRPL DEX", wallet1: true, wallet2: false },
      { name: "NFT Support", wallet1: true, wallet2: false },
      { name: "AMM/DeFi", wallet1: true, wallet2: false },
      { name: "Multi-Currency", wallet1: false, wallet2: true },
      { name: "Portability", wallet1: "Phone App", wallet2: "Credit Card Size" },
      { name: "Battery Required", wallet1: "Phone", wallet2: "No battery" },
      { name: "Water Resistant", wallet1: false, wallet2: true },
      { name: "Best For", wallet1: "Full XRPL experience", wallet2: "Portable backup" }
    ]
  },
  "ledger-vs-tangem": {
    wallet1: {
      name: "Ledger Nano X",
      slug: "ledger",
      type: "Hardware",
      price: "$149",
      link: "https://shop.ledger.com/?r=allthingsxrpl"
    },
    wallet2: {
      name: "Tangem",
      slug: "tangem",
      type: "Hardware Card",
      price: "$54.90",
      link: "https://tangem.com/?ref=allthingsxrpl"
    },
    winner: "Ledger",
    winnerReason: "For maximum security and multi-coin support, Ledger wins. Tangem is more portable and affordable for XRP-only storage.",
    features: [
      { name: "Price", wallet1: "$149", wallet2: "$54.90" },
      { name: "Form Factor", wallet1: "USB Device", wallet2: "Credit Card" },
      { name: "Security Chip", wallet1: "CC EAL5+", wallet2: "EAL6+" },
      { name: "Screen", wallet1: "Yes", wallet2: "No (phone app)" },
      { name: "Supported Coins", wallet1: "5,500+", wallet2: "Limited" },
      { name: "Bluetooth", wallet1: true, wallet2: false },
      { name: "NFC", wallet1: false, wallet2: true },
      { name: "Water Resistant", wallet1: false, wallet2: true },
      { name: "Battery", wallet1: "Rechargeable", wallet2: "None needed" },
      { name: "Portability", wallet1: "Good", wallet2: "Excellent" },
      { name: "Best For", wallet1: "Multi-coin, high value", wallet2: "Portable, simple" }
    ]
  }
};

export default function Compare() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = comparisons[slug || ""];

  if (!comparison) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Comparison Not Found</h1>
          <p className="text-muted-foreground mb-8">The comparison you're looking for doesn't exist.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(comparisons).map(key => (
              <Link key={key} href={`/compare/${key}`}>
                <Button variant="outline">{key.replace(/-/g, " ").replace(/vs/g, "vs.")}</Button>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <Link href="/#wallets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Wallets
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black font-display mb-4">
            {comparison.wallet1.name} vs {comparison.wallet2.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Side-by-side comparison to help you choose the right wallet
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="font-display font-bold text-lg">Our Verdict: {comparison.winner}</span>
          </div>
          <p className="text-muted-foreground">{comparison.winnerReason}</p>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl overflow-hidden mb-8">
          <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-white/5">
            <div className="text-sm text-muted-foreground font-medium">Feature</div>
            <div className="text-center font-bold">{comparison.wallet1.name}</div>
            <div className="text-center font-bold">{comparison.wallet2.name}</div>
          </div>

          {comparison.features.map((feature, idx) => (
            <div 
              key={feature.name} 
              className={`grid grid-cols-3 gap-4 p-4 ${idx % 2 === 0 ? 'bg-white/5' : ''}`}
            >
              <div className="text-sm text-muted-foreground">{feature.name}</div>
              <div className="text-center">
                {typeof feature.wallet1 === "boolean" ? (
                  feature.wallet1 ? 
                    <Check className="h-5 w-5 text-green-400 mx-auto" /> : 
                    <X className="h-5 w-5 text-red-400 mx-auto" />
                ) : (
                  <span className="text-sm">{feature.wallet1}</span>
                )}
              </div>
              <div className="text-center">
                {typeof feature.wallet2 === "boolean" ? (
                  feature.wallet2 ? 
                    <Check className="h-5 w-5 text-green-400 mx-auto" /> : 
                    <X className="h-5 w-5 text-red-400 mx-auto" />
                ) : (
                  <span className="text-sm">{feature.wallet2}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card/30 border border-white/10 rounded-xl p-6 text-center">
            <h3 className="font-bold text-xl mb-2">{comparison.wallet1.name}</h3>
            <p className="text-muted-foreground mb-4">{comparison.wallet1.type} • {comparison.wallet1.price}</p>
            <div className="flex flex-col gap-2">
              <a href={comparison.wallet1.link} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get {comparison.wallet1.name} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href={`/wallet/${comparison.wallet1.slug}`}>
                <Button variant="outline" className="w-full">Read Full Review</Button>
              </Link>
            </div>
          </div>

          <div className="bg-card/30 border border-white/10 rounded-xl p-6 text-center">
            <h3 className="font-bold text-xl mb-2">{comparison.wallet2.name}</h3>
            <p className="text-muted-foreground mb-4">{comparison.wallet2.type} • {comparison.wallet2.price}</p>
            <div className="flex flex-col gap-2">
              <a href={comparison.wallet2.link} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get {comparison.wallet2.name} <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <Link href={`/wallet/${comparison.wallet2.slug}`}>
                <Button variant="outline" className="w-full">Read Full Review</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Not sure which to choose?</p>
          <Link href="/wallet-quiz">
            <Button variant="outline" className="border-primary/50 text-primary">
              Take Our Wallet Quiz
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
