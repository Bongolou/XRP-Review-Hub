import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { 
  Star, 
  Shield, 
  Smartphone, 
  Globe,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowLeft
} from "lucide-react";

const walletData: Record<string, {
  name: string;
  tagline: string;
  rating: number;
  type: string;
  price: string;
  platforms: string[];
  website: string;
  affiliateLink: string;
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  securityFeatures: string[];
}> = {
  xaman: {
    name: "Xaman (XUMM)",
    tagline: "The Top Free XRPL Wallet",
    rating: 4.9,
    type: "Software Wallet",
    price: "Free",
    platforms: ["iOS", "Android"],
    website: "xaman.app",
    affiliateLink: "https://xaman.app/?ref=allthingsxrpl",
    description: "Xaman (formerly XUMM) is the premier mobile wallet for the XRP Ledger. Built by XRPL Labs, it offers the most comprehensive XRPL experience with support for all native features including the DEX, NFTs, AMM, and trustlines. It's completely free and designed specifically for the XRP Ledger ecosystem.",
    features: [
      "Full XRPL DEX integration",
      "Native NFT support (XLS-20)",
      "AMM liquidity provision",
      "Trustline management",
      "xApp ecosystem",
      "Multi-account support",
      "Transaction signing for web apps",
      "PayString support"
    ],
    pros: [
      "Completely free to use",
      "Best-in-class XRPL feature support",
      "Regular updates and active development",
      "Strong security with biometrics",
      "Large ecosystem of xApps",
      "User-friendly interface",
      "Built by XRPL Labs (core contributors)"
    ],
    cons: [
      "Mobile only (no desktop version)",
      "No hardware wallet functionality",
      "Learning curve for advanced features"
    ],
    bestFor: "Anyone looking for a free, full-featured XRPL wallet. Perfect for beginners and advanced users alike.",
    securityFeatures: [
      "Biometric authentication (Face ID/fingerprint)",
      "PIN protection",
      "Encrypted local storage",
      "No private key cloud backup",
      "Transaction signing confirmation",
      "Security audit completed"
    ]
  },
  tangem: {
    name: "Tangem",
    tagline: "Tap-to-Sign Hardware Security",
    rating: 4.7,
    type: "Hardware Wallet",
    price: "$54.90",
    platforms: ["iOS", "Android", "NFC Card"],
    website: "tangem.com",
    affiliateLink: "https://tangem.com/?ref=allthingsxrpl",
    description: "Tangem is a unique hardware wallet in the form of a credit card. It uses NFC technology to sign transactions through your smartphone, combining the security of hardware wallets with the convenience of mobile apps. The cards are water-resistant, durable, and have a 25-year lifespan.",
    features: [
      "NFC card form factor",
      "Tap-to-sign transactions",
      "Multi-card backup system",
      "No battery required",
      "Water and dust resistant",
      "25-year chip lifespan",
      "Multi-currency support",
      "Works with mobile app"
    ],
    pros: [
      "Extremely portable card design",
      "No battery or charging needed",
      "Very durable and water-resistant",
      "Easy backup with multiple cards",
      "Works seamlessly with phones",
      "Affordable for hardware wallet"
    ],
    cons: [
      "Requires smartphone to use",
      "Newer company than Ledger",
      "Limited advanced features",
      "No screen on the card itself"
    ],
    bestFor: "Users who want hardware security without the bulk. Great for those always on the go.",
    securityFeatures: [
      "EAL6+ certified secure element",
      "Private keys never leave card",
      "NFC communication only",
      "Multi-card backup option",
      "No firmware updates needed",
      "Independently audited"
    ]
  },
  ledger: {
    name: "Ledger Nano X",
    tagline: "Industry-Leading Hardware Security",
    rating: 4.8,
    type: "Hardware Wallet",
    price: "$149",
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android"],
    website: "ledger.com",
    affiliateLink: "https://shop.ledger.com/?r=allthingsxrpl",
    description: "Ledger is the most trusted name in hardware wallets. The Nano X offers Bluetooth connectivity for mobile use, a secure element chip for key storage, and supports over 5,500 cryptocurrencies including XRP. It's the gold standard for securing significant crypto holdings.",
    features: [
      "Bluetooth connectivity",
      "Secure Element chip (CC EAL5+)",
      "Built-in screen for verification",
      "5,500+ supported assets",
      "Ledger Live app integration",
      "Staking support",
      "NFT management",
      "DeFi access via Ledger Live"
    ],
    pros: [
      "Industry-leading security reputation",
      "Large screen for transaction verification",
      "Bluetooth for mobile convenience",
      "Massive cryptocurrency support",
      "Active development and updates",
      "Strong community and support"
    ],
    cons: [
      "Higher price point",
      "Bluetooth adds complexity",
      "Ledger Live required for full features",
      "Past data breach concerns"
    ],
    bestFor: "Serious investors with significant holdings who want maximum security and multi-coin support.",
    securityFeatures: [
      "CC EAL5+ certified Secure Element",
      "On-device transaction verification",
      "24-word recovery phrase",
      "PIN protection",
      "Genuine check via Ledger Live",
      "Regular security audits"
    ]
  },
  crossmark: {
    name: "Crossmark",
    tagline: "The Developer-Friendly Browser Wallet",
    rating: 4.7,
    type: "Browser Extension",
    price: "Free",
    platforms: ["Chrome", "Firefox", "Brave", "Edge"],
    website: "crossmark.io",
    affiliateLink: "https://crossmark.io/?ref=allthingsxrpl",
    description: "Crossmark is a powerful browser extension wallet built for the XRP Ledger. It's designed with developers in mind, offering seamless Web3 authentication and multi-network support. Lightweight yet feature-rich, it's perfect for users who prefer browser-based crypto management.",
    features: [
      "Web3 authentication",
      "Multi-network support",
      "Developer-friendly APIs",
      "Lightweight design",
      "Transaction signing",
      "dApp connectivity",
      "Trustline management",
      "Cross-browser compatibility"
    ],
    pros: [
      "Completely free to use",
      "Fast and lightweight",
      "Great developer documentation",
      "Easy Web3 integration",
      "Works across major browsers",
      "Clean, intuitive interface"
    ],
    cons: [
      "Browser-only (no mobile app)",
      "Smaller community than Xaman",
      "Fewer xApp integrations",
      "Less beginner-focused tutorials"
    ],
    bestFor: "Developers and power users who prefer browser-based wallet access with seamless dApp integration.",
    securityFeatures: [
      "Encrypted local storage",
      "Password protection",
      "Transaction confirmation prompts",
      "No private key cloud storage",
      "Open-source codebase",
      "Regular security updates"
    ]
  }
};

export default function WalletReview() {
  const { slug } = useParams<{ slug: string }>();
  const wallet = walletData[slug || ""];

  if (!wallet) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Wallet Not Found</h1>
          <p className="text-muted-foreground mb-8">The wallet you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/#wallets">View All Wallets</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <Link href="/#wallets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Wallet Comparison
        </Link>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <div className="text-sm text-primary font-display mb-2">{wallet.type}</div>
              <h1 className="text-3xl md:text-4xl font-black font-display mb-2">{wallet.name}</h1>
              <p className="text-xl text-muted-foreground">{wallet.tagline}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{wallet.rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="text-2xl font-bold text-primary">{wallet.price}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {wallet.platforms.map((platform) => (
              <span key={platform} className="px-3 py-1 rounded-full bg-white/10 text-sm">
                {platform}
              </span>
            ))}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {wallet.description}
          </p>

          <a 
            href={wallet.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
            data-testid={`button-get-${slug}`}
          >
            Get {wallet.name} <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Pros
            </h2>
            <ul className="space-y-2">
              {wallet.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-1" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              Cons
            </h2>
            <ul className="space-y-2">
              {wallet.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-muted-foreground">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-1" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {wallet.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            Security Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {wallet.securityFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 text-secondary shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-2">Best For</h2>
          <p className="text-muted-foreground">{wallet.bestFor}</p>
        </div>

        <div className="text-center">
          <a 
            href={wallet.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 px-10 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-lg transition-colors"
          >
            Get {wallet.name} Today <ExternalLink className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            Affiliate link - we may earn a commission at no extra cost to you
          </p>
        </div>
      </div>
    </Layout>
  );
}
