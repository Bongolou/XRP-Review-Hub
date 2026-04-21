import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  FastCompareTable,
  VerdictBox,
  FAQAccordion,
  LastUpdated,
  EmailCaptureBlock,
  ReviewSummaryCard,
  type FastCompareRow,
} from "@/components/conversion";

const rows: FastCompareRow[] = [
  {
    id: "xaman",
    name: "Xaman (XUMM)",
    type: "Mobile · Software",
    price: "Free",
    bestFor: "Daily XRP use, DeFi, NFTs",
    rating: "9.9",
    reviewSlug: "xaman",
    affiliateUrl: "https://xumm.app/?ref=allthingsxrpl",
    highlight: true,
  },
  {
    id: "ledger",
    name: "Ledger Nano X",
    type: "Hardware",
    price: "$149",
    bestFor: "Cold storage of larger holdings",
    rating: "9.9",
    reviewSlug: "ledger",
    affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe",
  },
  {
    id: "tangem",
    name: "Tangem",
    type: "Hardware (Card)",
    price: "$54.90",
    bestFor: "Portable hardware security",
    rating: "9.4",
    reviewSlug: "tangem",
    affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL",
  },
  {
    id: "trezor",
    name: "Trezor Safe 5",
    type: "Hardware",
    price: "$169",
    bestFor: "Open-source hardware purists",
    rating: "9.3",
    reviewSlug: "trezor",
    affiliateUrl: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959",
  },
  {
    id: "ellipal",
    name: "ELLIPAL Titan",
    type: "Hardware (Air-gapped)",
    price: "$169",
    bestFor: "Air-gapped cold storage",
    rating: "9.0",
    reviewSlug: "ellipal",
    affiliateUrl: "https://www.ellipal.com/?ref=allthingsxrpl",
  },
  {
    id: "crossmark",
    name: "Crossmark",
    type: "Browser extension",
    price: "Free",
    bestFor: "Web3 / dApp logins",
    rating: "9.5",
    reviewSlug: "crossmark",
    affiliateUrl: "https://crossmark.io/?ref=allthingsxrpl",
  },
  {
    id: "bifrost",
    name: "Bifrost Wallet",
    type: "Mobile · Software",
    price: "Free",
    bestFor: "Multi-chain XRPL users",
    rating: "9.0",
    reviewSlug: "bifrost",
    affiliateUrl: "https://bifrostwallet.com/?ref=allthingsxrpl",
  },
];

const summaryWallets = [
  {
    name: "Xaman (XUMM)",
    rating: "9.9",
    type: "Mobile · Software · XRPL-native",
    bestFor: "Anyone using the XRPL day-to-day — DEX, AMMs, NFTs and payments.",
    pros: [
      "Free, built by XRPL Labs (core protocol contributors)",
      "Full XRPL DEX, AMM, and NFT support out of the box",
      "Biometric auth and large xApp ecosystem",
    ],
    affiliateUrl: "https://xumm.app/?ref=allthingsxrpl",
    reviewSlug: "xaman",
  },
  {
    name: "Ledger Nano X",
    rating: "9.9",
    type: "Hardware · Cold storage",
    bestFor: "Holders with $1k+ in XRP who want offline, certified-secure storage.",
    pros: [
      "CC EAL5+ Secure Element keeps keys fully offline",
      "5,500+ assets supported, not just XRP",
      "Bluetooth + Ledger Live for everyday use",
    ],
    affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe",
    reviewSlug: "ledger",
  },
  {
    name: "Tangem",
    rating: "9.4",
    type: "Hardware · Card",
    bestFor: "Hardware security in a wallet-card form factor that taps to your phone.",
    pros: [
      "No batteries, no cables — just NFC tap",
      "Waterproof and durable, fits in a wallet",
      "Set up in under 3 minutes",
    ],
    affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL",
    reviewSlug: "tangem",
  },
];

const faqs = [
  {
    q: "What is the best XRP wallet overall in 2026?",
    a: (
      <>
        For most XRP holders, the best setup is <strong>Xaman</strong> for daily use combined with a{" "}
        <strong>Ledger Nano X</strong> for cold storage of any holdings you can't afford to lose.
        Xaman is free, built by XRPL Labs and gives you full DEX/AMM/NFT access. Ledger keeps your
        long-term stack offline behind a certified Secure Element.
      </>
    ),
  },
  {
    q: "Do I really need a hardware wallet for XRP?",
    a: "If your XRP holdings are worth more than a few hundred dollars, yes. Software wallets are convenient and secure for everyday amounts, but they live on internet-connected devices. A hardware wallet keeps your keys completely offline so even a fully compromised computer can't move your funds.",
  },
  {
    q: "Is Xaman safe?",
    a: "Yes. Xaman is built and maintained by XRPL Labs — the team behind much of the XRP Ledger's core tooling. It's non-custodial (you hold the keys), uses biometric authentication and never sends your secrets off-device. The main caveat is that it is still a hot wallet, so the device it lives on matters.",
  },
  {
    q: "Can I store XRP on Coinbase, Kraken or another exchange?",
    a: "You can — but you don't really own that XRP, the exchange does. For active trading, exchanges are fine. For anything you plan to hold for more than a few weeks, move it to a wallet you control. See our exchange reviews for the safest options.",
  },
  {
    q: "How do I move XRP from an exchange to my wallet?",
    a: (
      <>
        Step-by-step instructions are in our <Link href="/getting-started" className="text-primary hover:underline">Getting Started</Link> guide. The short version: get your wallet's XRP address (and destination tag if needed), withdraw a small test amount first, confirm it arrives, then send the rest.
      </>
    ),
  },
  {
    q: "Are these affiliate links?",
    a: (
      <>
        Yes — when you sign up via the buttons on this page we may earn a commission at no extra cost to you. It never affects which wallets we recommend; our editorial scoring is independent. Full details on our <Link href="/disclosure" className="text-primary hover:underline">disclosure page</Link>.
      </>
    ),
  },
];

export default function BestXRPWallets() {
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">XRPL Wallets</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">
            Best XRP Wallets in 2026
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            We tested every major XRPL wallet — software, hardware, browser, and air-gapped — to find
            the best picks for daily use, cold storage and DeFi. This is the shortlist we'd recommend
            to a friend.
          </p>
          <div className="mt-4">
            <LastUpdated date="April 2026" />
          </div>
        </div>

        <div className="my-10">
          <VerdictBox
            pickName="Xaman (XUMM)"
            pickReason="Built by XRPL Labs, free, and the only wallet with full native access to the XRP Ledger DEX, AMMs and xApp ecosystem. If you're only going to install one XRPL wallet, install this one — then add a hardware wallet on top once your stack grows."
            affiliateUrl="https://xumm.app/?ref=allthingsxrpl"
            reviewSlug="xaman"
            pros={[
              "Free with no premium tier",
              "Native XRPL DEX, AMM and NFT support",
              "Maintained by core XRP Ledger contributors",
            ]}
            cons={[
              "Mobile only — no desktop app",
              "Hot wallet, so device security matters",
            ]}
            runnerUp={{
              name: "Ledger Nano X",
              reason:
                "Best cold storage for serious holders. Pair with Xaman for the strongest setup.",
              href: "/wallet/ledger",
            }}
          />
        </div>

        <FastCompareTable rows={rows} />

        <section className="my-16">
          <h2 className="text-3xl font-bold font-display mb-8">Top 3 in detail</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryWallets.map((w) => (
              <ReviewSummaryCard key={w.name} {...w} />
            ))}
          </div>
        </section>

        <section className="my-16 grid md:grid-cols-2 gap-6">
          <Link
            href="/best-for/beginners"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              For beginners
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              Best XRP Wallets for Beginners →
            </h3>
            <p className="text-sm text-muted-foreground">
              The simplest, free wallets to start with — no hardware purchase required.
            </p>
          </Link>
          <Link
            href="/best-for/cold-storage"
            className="p-6 rounded-2xl border border-white/10 bg-card/40 hover:border-primary/40 transition-all group"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-2">
              For long-term holders
            </div>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              Best Cold-Storage Setup for XRP →
            </h3>
            <p className="text-sm text-muted-foreground">
              Our recommended hardware wallet pairing for protecting larger XRP holdings.
            </p>
          </Link>
        </section>

        <section className="my-16">
          <EmailCaptureBlock source="best-xrp-wallets" />
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold font-display mb-6">FAQ</h2>
          <FAQAccordion items={faqs} />
        </section>
      </div>
    </Layout>
  );
}
