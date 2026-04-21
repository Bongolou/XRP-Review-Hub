import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "wouter";
import { ReactNode } from "react";
import {
  VerdictBox,
  FastCompareTable,
  FAQAccordion,
  LastUpdated,
  EmailCaptureBlock,
  type FastCompareRow,
} from "@/components/conversion";

type BestForPage = {
  badge: string;
  title: string;
  intro: string;
  pickName: string;
  pickReason: string;
  pickAffiliate: string;
  pickReviewSlug: string;
  pickPros: string[];
  pickCons: string[];
  runnerUp: { name: string; reason: string; href: string };
  rows: FastCompareRow[];
  body: ReactNode;
  faqs: { q: string; a: ReactNode }[];
  emailSource: string;
};

const xaman: FastCompareRow = {
  id: "xaman",
  name: "Xaman (XUMM)",
  type: "Mobile · Software",
  price: "Free",
  bestFor: "Daily XRP use, DeFi, NFTs",
  rating: "9.9",
  reviewSlug: "xaman",
  affiliateUrl: "https://xumm.app/?ref=allthingsxrpl",
};
const ledger: FastCompareRow = {
  id: "ledger",
  name: "Ledger Nano X",
  type: "Hardware",
  price: "$149",
  bestFor: "Cold storage of larger holdings",
  rating: "9.9",
  reviewSlug: "ledger",
  affiliateUrl: "https://shop.ledger.com/?r=5d81f18905fe",
};
const tangem: FastCompareRow = {
  id: "tangem",
  name: "Tangem",
  type: "Hardware (Card)",
  price: "$54.90",
  bestFor: "Portable hardware security",
  rating: "9.4",
  reviewSlug: "tangem",
  affiliateUrl: "https://tangem.com/?promocode=ALLTHINGSXRPL",
};
const trezor: FastCompareRow = {
  id: "trezor",
  name: "Trezor Safe 5",
  type: "Hardware",
  price: "$169",
  bestFor: "Open-source hardware purists",
  rating: "9.3",
  reviewSlug: "trezor",
  affiliateUrl: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959",
};
const ellipal: FastCompareRow = {
  id: "ellipal",
  name: "ELLIPAL Titan",
  type: "Hardware (Air-gapped)",
  price: "$169",
  bestFor: "Air-gapped cold storage",
  rating: "9.0",
  reviewSlug: "ellipal",
  affiliateUrl: "https://www.ellipal.com/?ref=allthingsxrpl",
};
const crossmark: FastCompareRow = {
  id: "crossmark",
  name: "Crossmark",
  type: "Browser extension",
  price: "Free",
  bestFor: "Web3 / dApp logins",
  rating: "9.5",
  reviewSlug: "crossmark",
  affiliateUrl: "https://crossmark.io/?ref=allthingsxrpl",
};
const bifrost: FastCompareRow = {
  id: "bifrost",
  name: "Bifrost Wallet",
  type: "Mobile · Software",
  price: "Free",
  bestFor: "Multi-chain XRPL users",
  rating: "9.0",
  reviewSlug: "bifrost",
  affiliateUrl: "https://bifrostwallet.com/?ref=allthingsxrpl",
};

const pages: Record<string, BestForPage> = {
  beginners: {
    badge: "For beginners",
    title: "Best XRP Wallets for Beginners (2026)",
    intro:
      "If you've just bought your first XRP, you don't need a hardware device or a complicated setup yet. You need a free, well-built wallet that won't trip you up. These three are what we recommend to anyone starting out.",
    pickName: "Xaman (XUMM)",
    pickReason:
      "Xaman is free, downloads in under a minute and is built by the same team that contributes to the XRP Ledger itself. The interface is friendly enough for a complete beginner but powerful enough that you won't outgrow it. Set up biometric login, write down your recovery phrase, and you have a wallet that handles XRP, NFTs and the XRPL DEX out of the box.",
    pickAffiliate: "https://xumm.app/?ref=allthingsxrpl",
    pickReviewSlug: "xaman",
    pickPros: [
      "100% free, no premium tier or hidden fees",
      "Beginner-friendly setup with clear backup steps",
      "Works on iOS and Android",
    ],
    pickCons: [
      "Mobile only — no desktop version",
      "Still a hot wallet; don't store huge amounts long-term",
    ],
    runnerUp: {
      name: "Crossmark",
      reason: "If you'd rather log into XRPL dApps from your laptop, Crossmark is the easy on-ramp.",
      href: "/wallet/crossmark",
    },
    rows: [{ ...xaman, highlight: true }, crossmark, bifrost, tangem],
    body: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          New holders almost always overcomplicate their first wallet. The right starter setup is
          simple: one free, well-supported software wallet on your phone. From there you can add a
          hardware wallet once your XRP holdings grow large enough to justify the $50–$150 cost.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We recommend <strong>Xaman</strong> first because it's the most actively maintained XRPL
          wallet, free forever, and gives you instant access to the entire XRP Ledger ecosystem —
          DEX trading, NFTs, AMM positions and xApps. <strong>Crossmark</strong> is a great
          companion if you spend time on XRPL dApps in your browser, and <strong>Tangem</strong> is
          the simplest first hardware wallet if you want to upgrade later without learning Ledger
          Live.
        </p>
      </>
    ),
    faqs: [
      {
        q: "Is Xaman free?",
        a: "Yes. Xaman is fully free and there is no paid tier. The team is funded by xApp partnerships and protocol-level revenue, not by charging users.",
      },
      {
        q: "Do I need a hardware wallet to start?",
        a: "No. For amounts under a few hundred dollars, a properly configured software wallet like Xaman is enough. Add hardware once you're holding more than you'd be comfortable losing.",
      },
      {
        q: "Where do I buy XRP first?",
        a: (
          <>
            Most beginners buy through <Link href="/exchange/uphold" className="text-primary hover:underline">Uphold</Link>, <Link href="/exchange/coinbase" className="text-primary hover:underline">Coinbase</Link> or <Link href="/exchange/kraken" className="text-primary hover:underline">Kraken</Link>, then withdraw to their wallet. Our <Link href="/getting-started" className="text-primary hover:underline">Getting Started guide</Link> walks through it step by step.
          </>
        ),
      },
    ],
    emailSource: "best-for-beginners",
  },

  hardware: {
    badge: "Hardware wallets",
    title: "Best Hardware Wallets for XRP (2026)",
    intro:
      "A hardware wallet keeps your XRP private keys completely offline, even when your computer is compromised. These are the four we trust with our own holdings.",
    pickName: "Ledger Nano X",
    pickReason:
      "Ledger remains the benchmark hardware wallet for XRP. The CC EAL5+ Secure Element is the same chip family used in passports and bank cards, and Ledger has the longest production track record of any consumer crypto hardware brand. Bluetooth pairing makes day-to-day use painless on mobile, and the Nano X handles 5,500+ assets if you ever expand beyond XRP.",
    pickAffiliate: "https://shop.ledger.com/?r=5d81f18905fe",
    pickReviewSlug: "ledger",
    pickPros: [
      "Certified Secure Element (CC EAL5+) keeps keys offline",
      "Multi-asset: XRP plus thousands of others",
      "Bluetooth + USB-C, works with Ledger Live",
    ],
    pickCons: [
      "Closed-source firmware (some users prefer Trezor)",
      "$149 upfront — overkill for very small holdings",
    ],
    runnerUp: {
      name: "Tangem",
      reason: "Cheaper, simpler, card-shaped hardware wallet — great if Ledger feels overengineered.",
      href: "/wallet/tangem",
    },
    rows: [{ ...ledger, highlight: true }, tangem, trezor, ellipal],
    body: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          All four wallets here will keep your XRP keys offline. The choice between them comes down
          to form factor, philosophy and budget. <strong>Ledger</strong> is the safe default — the
          most polished software, the largest user base, and the strongest commercial security
          posture. <strong>Tangem</strong> is the easiest to live with day-to-day: a card you tap
          to your phone with no batteries to manage. <strong>Trezor</strong> wins on open-source
          philosophy. <strong>ELLIPAL</strong> is for users who want a fully air-gapped device that
          never touches a USB port.
        </p>
      </>
    ),
    faqs: [
      {
        q: "Are hardware wallets really necessary for XRP?",
        a: "If you'd be upset to lose your XRP, yes. Hot wallets are fine for everyday spending, but for any meaningful long-term holding, a hardware wallet eliminates an entire category of attacks (malware, browser exploits, drained software wallets).",
      },
      {
        q: "Ledger vs Trezor for XRP?",
        a: (
          <>
            Both are great. Ledger has more polish and broader exchange/dApp integration; Trezor is fully open-source. See our <Link href="/compare/trezor-vs-ledger" className="text-primary hover:underline">Trezor vs Ledger comparison</Link> for the detailed breakdown.
          </>
        ),
      },
      {
        q: "Can I use a hardware wallet with Xaman?",
        a: "Not directly today, but you can pair the two by holding most of your XRP on a Ledger or Tangem and only keeping a small spending balance on Xaman for DEX/AMM activity. This is the setup we recommend.",
      },
    ],
    emailSource: "best-for-hardware",
  },

  "cold-storage": {
    badge: "Cold storage",
    title: "Best Cold-Storage Setup for XRP (2026)",
    intro:
      "Cold storage means your XRP keys never touch the internet. For holdings worth more than a few thousand dollars, this isn't optional — it's the difference between you owning your XRP and someone else owning it.",
    pickName: "Ledger Nano X + steel backup",
    pickReason:
      "The cleanest cold-storage setup for XRP today is a Ledger Nano X holding the bulk of your stack, with the 24-word recovery phrase stamped onto a steel backup plate kept in a separate physical location. Ledger's Secure Element protects the device itself; the steel backup protects you against fire, water and a lost device. We pair this with a small amount of XRP on Xaman for everyday on-chain activity.",
    pickAffiliate: "https://shop.ledger.com/?r=5d81f18905fe",
    pickReviewSlug: "ledger",
    pickPros: [
      "Keys generated and stored entirely offline",
      "Steel backup survives house fires and floods",
      "Bluetooth means you can still use it daily",
    ],
    pickCons: [
      "Two-device setup costs $200+ all in",
      "You are 100% responsible for the recovery phrase",
    ],
    runnerUp: {
      name: "ELLIPAL Titan",
      reason: "Fully air-gapped — no USB, no Bluetooth — for users who want zero attack surface.",
      href: "/wallet/ellipal",
    },
    rows: [{ ...ledger, highlight: true }, ellipal, trezor, tangem],
    body: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A cold-storage setup has three parts: a hardware wallet, a backup of the recovery phrase,
          and a clear plan for how you'll actually access funds when you need them. The hardware
          wallet handles signing offline; the backup makes sure you're not one lost device away
          from losing everything; the plan stops you from doing something stupid in a panic.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Whichever device you choose, never type your recovery phrase into a phone, computer or
          screenshot. Stamp it onto a steel plate, store it somewhere physically separate from the
          device, and consider a second copy in a bank safety deposit box for larger holdings.
        </p>
      </>
    ),
    faqs: [
      {
        q: "How much XRP justifies cold storage?",
        a: "There's no hard rule, but as soon as your holdings exceed roughly $1,000–$2,000 USD, the math favors a hardware wallet. Below that, a well-secured Xaman install is reasonable.",
      },
      {
        q: "What if I lose my hardware wallet?",
        a: "You restore from your 24-word recovery phrase onto a new device. This is exactly why the steel backup matters — your XRP is tied to the seed phrase, not the physical device.",
      },
    ],
    emailSource: "best-for-cold-storage",
  },

  defi: {
    badge: "XRPL DeFi",
    title: "Best XRP Wallets for DeFi & XRPL DEX (2026)",
    intro:
      "Hardware wallets are great for storage but useless for DeFi. To trade on the XRPL DEX, provide AMM liquidity or use xApps you need a wallet that natively speaks XRPL. These are the picks that actually work.",
    pickName: "Xaman (XUMM)",
    pickReason:
      "Xaman is the only wallet that gives you complete native access to every XRPL feature: the on-chain DEX, AMMs, NFTs (XLS-20), trustlines, payment paths and the entire xApp ecosystem. Nothing else in the XRPL space comes close on feature parity, and because XRPL Labs builds it, new ledger features land in Xaman first.",
    pickAffiliate: "https://xumm.app/?ref=allthingsxrpl",
    pickReviewSlug: "xaman",
    pickPros: [
      "Full XRPL DEX, AMM and trustline support",
      "xApp ecosystem keeps growing",
      "Built by core XRPL contributors",
    ],
    pickCons: [
      "Hot wallet — keep your DeFi balance modest",
      "Mobile only",
    ],
    runnerUp: {
      name: "Crossmark",
      reason: "Browser-extension wallet that lets XRPL dApps connect like MetaMask does on Ethereum.",
      href: "/wallet/crossmark",
    },
    rows: [{ ...xaman, highlight: true }, crossmark, bifrost, gateHubRow()],
    body: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          XRPL DeFi has matured fast — the native AMM is live, NFT trading is real, and there's a
          growing list of dApps worth interacting with. None of that is accessible from a Ledger
          alone. To participate you need a wallet that signs XRPL transactions natively. Xaman is
          the default; Crossmark is the desktop equivalent for browser dApps; Bifrost is a solid
          choice if you straddle XRPL and other chains.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A safer pattern: keep the bulk of your XRP cold (Ledger or Tangem), and only fund your
          DeFi wallet with what you actually need to deploy. Treat the DeFi balance like a
          checking account — convenient, replenishable, never your life savings.
        </p>
      </>
    ),
    faqs: [
      {
        q: "Can I use Ledger for XRPL DeFi?",
        a: "Not really. Ledger Live doesn't support the XRPL DEX, AMM or NFTs. You'd need to bridge or move XRP to a software wallet anyway.",
      },
      {
        q: "What's the safest way to do XRPL DeFi?",
        a: "Hold most of your XRP on hardware, fund a separate DeFi-only wallet with what you need, and never approve transactions you don't fully understand. Bookmark trusted dApps from our DeFi roundup rather than typing URLs.",
      },
    ],
    emailSource: "best-for-defi",
  },

  safest: {
    badge: "Top pick",
    title: "The Safest XRP Wallet (2026)",
    intro:
      "Skip the analysis paralysis. If you just want the single safest setup we'd recommend to a friend, this is it.",
    pickName: "Ledger Nano X",
    pickReason:
      "For pure safety — protecting XRP you don't plan to touch — nothing beats a Ledger Nano X with a stamped steel backup of the recovery phrase. The CC EAL5+ Secure Element keeps your private keys fully offline. The 24-word seed gives you a complete recovery path even if the device is lost or destroyed. And Ledger's track record across millions of devices is the longest in consumer crypto hardware.",
    pickAffiliate: "https://shop.ledger.com/?r=5d81f18905fe",
    pickReviewSlug: "ledger",
    pickPros: [
      "Industry-standard certified secure hardware",
      "Offline keys = immune to remote attacks",
      "Multi-asset, future-proof",
    ],
    pickCons: [
      "$149 upfront",
      "Not ideal for active DeFi use — pair with Xaman for that",
    ],
    runnerUp: {
      name: "Tangem",
      reason: "If $149 is too much, a Tangem 3-card pack at ~$55 still gives you offline storage.",
      href: "/wallet/tangem",
    },
    rows: [{ ...ledger, highlight: true }, tangem, ellipal, xaman],
    body: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-4">
          "Safest" depends on threat model, but for the average XRP holder the answer is the same:
          a hardware wallet with a properly stored recovery phrase. Ledger is our top pick because
          it does the security part well and is the easiest to actually live with — Bluetooth, a
          competent companion app, and broad asset support means you're more likely to use it
          properly rather than abandon it in a drawer.
        </p>
      </>
    ),
    faqs: [
      {
        q: "What about Trezor or ELLIPAL?",
        a: (
          <>
            Both are excellent. Trezor is more open-source-friendly; ELLIPAL is fully air-gapped. See <Link href="/compare/trezor-vs-ledger" className="text-primary hover:underline">Trezor vs Ledger</Link> and <Link href="/compare/ellipal-vs-ledger" className="text-primary hover:underline">ELLIPAL vs Ledger</Link>.
          </>
        ),
      },
      {
        q: "Where do I buy a Ledger safely?",
        a: "Always buy direct from Ledger.com (or via our affiliate link, which goes to Ledger's official store). Never buy from Amazon or eBay — there's a real risk of tampered devices.",
      },
    ],
    emailSource: "best-for-safest",
  },
};

function gateHubRow(): FastCompareRow {
  return {
    id: "gatehub",
    name: "GateHub",
    type: "Web · XRPL-native",
    price: "Free",
    bestFor: "Web access to XRPL DEX",
    rating: "8.6",
    reviewSlug: "gatehub",
    affiliateUrl: "https://gatehub.net/?ref=allthingsxrpl",
  };
}

export default function BestFor() {
  const params = useParams<{ slug: string }>();
  const page = pages[params.slug];

  if (!page) {
    return (
      <Layout>
        <div className="container mx-auto px-4 max-w-3xl text-center py-16">
          <h1 className="text-3xl font-bold font-display mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find that "best for" guide. Try our main wallet roundup instead.
          </p>
          <Link href="/best-xrp-wallets" className="text-primary hover:underline">
            See the best XRP wallets →
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">{page.badge}</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{page.title}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">{page.intro}</p>
          <div className="mt-4">
            <LastUpdated date="April 2026" />
          </div>
        </div>

        <div className="my-10">
          <VerdictBox
            pickName={page.pickName}
            pickReason={page.pickReason}
            affiliateUrl={page.pickAffiliate}
            reviewSlug={page.pickReviewSlug}
            runnerUp={page.runnerUp}
            pros={page.pickPros}
            cons={page.pickCons}
          />
        </div>

        <FastCompareTable
          rows={page.rows}
          title="The shortlist"
          subtitle="Our top recommendations for this use case, ranked."
        />

        <section className="my-12 max-w-3xl">
          <h2 className="text-2xl font-bold font-display mb-4">Why these picks</h2>
          {page.body}
        </section>

        <section className="my-12 grid md:grid-cols-3 gap-4">
          <Link
            href="/best-xrp-wallets"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-1">
              All wallets
            </div>
            <div className="font-display font-bold">Best XRP Wallets 2026 →</div>
          </Link>
          <Link
            href="/best-for/cold-storage"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-1">
              Long-term holders
            </div>
            <div className="font-display font-bold">Best Cold-Storage Setup →</div>
          </Link>
          <Link
            href="/best-for/defi"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-display mb-1">
              For DeFi users
            </div>
            <div className="font-display font-bold">Best Wallets for XRPL DeFi →</div>
          </Link>
        </section>

        <section className="my-16">
          <EmailCaptureBlock source={page.emailSource} />
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold font-display mb-6">FAQ</h2>
          <FAQAccordion items={page.faqs} />
        </section>
      </div>
    </Layout>
  );
}
