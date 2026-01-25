import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is the XRP Ledger (XRPL)?",
        a: "The XRP Ledger is a decentralized, open-source blockchain technology that was launched in 2012. It's designed for fast, low-cost, and energy-efficient transactions. XRP is the native cryptocurrency of the XRPL and is used for transaction fees and as a bridge currency for cross-border payments."
      },
      {
        q: "How do I buy XRP?",
        a: 'You can buy XRP on cryptocurrency exchanges like <a href="https://uphold.com/signup?referral=allthingsxrpl" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Uphold</a>, <a href="https://bitrue.com/user/register?inviteCode=allthingsxrpl" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Bitrue</a>, or <a href="https://kraken.com/sign-up?r=allthingsxrpl" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Kraken</a>. First, create an account on a supported exchange, complete identity verification (KYC), deposit funds via bank transfer or card, then purchase XRP. We recommend transferring your XRP to a self-custody wallet like <a href="https://xumm.app/?ref=allthingsxrpl" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Xaman</a> for security.'
      },
      {
        q: "What's the difference between XRP and Ripple?",
        a: "XRP is the cryptocurrency, while Ripple is a technology company that uses XRP in its payment solutions. Ripple Labs created the XRP Ledger but the network is decentralized and operates independently. You can use XRP without any involvement with Ripple the company."
      }
    ]
  },
  {
    category: "Wallets",
    questions: [
      {
        q: "What is the best XRP wallet?",
        a: "For most users, we recommend Xaman (formerly XUMM) as the best free XRPL wallet. It's user-friendly, secure, and supports all XRPL features including NFTs and DeFi. For maximum security with larger holdings, consider pairing it with a hardware wallet like Ledger or Tangem."
      },
      {
        q: "What is self-custody and why does it matter?",
        a: "Self-custody means you control the private keys to your cryptocurrency wallet, rather than trusting an exchange or third party. The phrase 'not your keys, not your coins' emphasizes that if you don't control your keys, you don't truly own your crypto. Self-custody protects you from exchange hacks, freezes, or bankruptcies."
      },
      {
        q: "What is the 10 XRP reserve requirement?",
        a: "The XRPL requires a minimum of 10 XRP to be held in any wallet address. This 'base reserve' prevents spam on the network and can't be spent while the wallet is active. Additionally, each trustline or other object on your account requires a 2 XRP 'owner reserve'. These reserves may be reduced through future amendments."
      },
      {
        q: "Can I recover my wallet if I lose my phone?",
        a: "Yes, if you have your secret recovery phrase (seed phrase). When you create a wallet, you receive a 12-24 word recovery phrase that can restore access to your funds on any compatible wallet. Store this phrase securely offline - never digitally or in cloud storage. Without it, your funds are permanently lost."
      }
    ]
  },
  {
    category: "DeFi & Features",
    questions: [
      {
        q: "What is the XRPL DEX?",
        a: "The XRPL has a built-in decentralized exchange (DEX) at the protocol level. This means you can trade any tokens directly on the ledger without intermediaries. It's faster and cheaper than DEXs on other blockchains because it's native to the XRPL rather than running as a smart contract."
      },
      {
        q: "What are trustlines on XRPL?",
        a: "Trustlines are connections you create to hold tokens other than XRP on the XRPL. When you 'add' a token to your wallet, you're actually creating a trustline to the token issuer. Each trustline requires a 2 XRP owner reserve. You can remove trustlines and reclaim the reserve when you no longer hold that token."
      },
      {
        q: "How does AMM staking work on XRPL?",
        a: "XRPL's native Automated Market Maker (AMM) lets you deposit pairs of tokens into liquidity pools and earn fees from trades. When you provide liquidity, you receive LP tokens representing your share. You earn a portion of trading fees proportional to your pool share. Risks include impermanent loss if token prices diverge."
      },
      {
        q: "Are there NFTs on XRPL?",
        a: "Yes! The XRPL has native NFT support (XLS-20 standard) built into the protocol. This makes minting and trading NFTs extremely cheap compared to Ethereum. You can explore XRPL NFT marketplaces and mint your own NFTs using compatible wallets like Xaman."
      }
    ]
  },
  {
    category: "Security",
    questions: [
      {
        q: "How do I keep my XRP safe?",
        a: "Use a reputable self-custody wallet like Xaman, never share your secret recovery phrase with anyone, enable all available security features (biometrics, PIN), be cautious of phishing sites and scams, and consider a hardware wallet for larger amounts. Never store your recovery phrase digitally."
      },
      {
        q: "What are common crypto scams to avoid?",
        a: "Watch out for: giveaway scams (no one is doubling your XRP), phishing emails/DMs pretending to be support, fake wallet apps, romance scams, and 'guaranteed return' investment schemes. Legitimate projects never ask for your recovery phrase or promise guaranteed profits."
      },
      {
        q: "Should I use a hardware wallet?",
        a: "Hardware wallets like Ledger or Tangem provide the highest security by keeping your private keys on a physical device that never connects directly to the internet. They're recommended for holdings over $1,000 or for long-term storage. They work alongside software wallets like Xaman for convenience."
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-primary transition-colors"
        data-testid={`faq-toggle-${question.slice(0, 20).replace(/\s/g, '-').toLowerCase()}`}
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", isOpen && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all", isOpen ? "max-h-96 pb-4" : "max-h-0")}>
        <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about XRP, wallets, and the XRPL ecosystem
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category) => (
            <div key={category.category} className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-display mb-4 text-primary">{category.category}</h2>
              <div>
                {category.questions.map((faq) => (
                  <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold font-display mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
}
