import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { Check, X, ExternalLink, ArrowLeft, Trophy, Shield, Zap, Users, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";

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
  metaDescription: string;
  introduction: string;
  winner: string;
  winnerReason: string;
  detailedVerdict: string;
  securityAnalysis: {
    title: string;
    content: string;
    wallet1Security: string;
    wallet2Security: string;
  };
  useCases: {
    scenario: string;
    recommendation: string;
    winner: string;
  }[];
  wallet1Pros: string[];
  wallet1Cons: string[];
  wallet2Pros: string[];
  wallet2Cons: string[];
  features: {
    name: string;
    wallet1: boolean | string;
    wallet2: boolean | string;
    explanation?: string;
  }[];
  bottomLine: string;
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
      link: "https://shop.ledger.com/?r=5d81f18905fe"
    },
    metaDescription: "Detailed comparison of Xaman vs Ledger for XRP storage. Discover which wallet suits your needs based on security, features, and use cases.",
    introduction: "Choosing between Xaman and Ledger is one of the most common dilemmas for XRP holders. These two wallets represent fundamentally different approaches to cryptocurrency storage: Xaman offers a feature-rich software experience built specifically for the XRP Ledger, while Ledger provides hardware-based cold storage for maximum security across thousands of cryptocurrencies.",
    winner: "Both",
    winnerReason: "Use Xaman for daily transactions and DeFi, pair with Ledger for cold storage of larger holdings.",
    detailedVerdict: "This isn't a case of one wallet being better than the other—it's about understanding that they serve complementary purposes. Xaman excels at providing full access to the XRP Ledger ecosystem, including DEX trading, NFT management, and DeFi protocols. Ledger, on the other hand, is designed for one thing: keeping your assets safe in cold storage. The ideal setup for serious XRP investors is to use both: keep your long-term holdings on Ledger and use Xaman for active trading and ecosystem participation.",
    securityAnalysis: {
      title: "Security: Software vs Hardware",
      content: "The fundamental security difference comes down to where your private keys are stored. Xaman stores encrypted keys on your mobile device, protected by biometrics and PIN. While this is secure for most users, it's still connected to the internet. Ledger's Secure Element chip (CC EAL5+ certified) keeps your keys completely offline, making it virtually immune to remote attacks.",
      wallet1Security: "Xaman uses military-grade encryption with biometric authentication. Your keys never leave your device, and all transactions require explicit approval. However, as a hot wallet, it's theoretically vulnerable to sophisticated mobile malware.",
      wallet2Security: "Ledger's Secure Element chip is the same technology used in credit cards and passports. Your private keys are generated and stored in an isolated environment that never connects to the internet directly. Even if your computer is compromised, attackers cannot access your keys."
    },
    useCases: [
      { scenario: "Daily XRP transactions and payments", recommendation: "Xaman's mobile-first design makes it perfect for quick payments and everyday use.", winner: "Xaman" },
      { scenario: "Long-term holding of significant amounts", recommendation: "For amounts you can't afford to lose, Ledger's cold storage is essential.", winner: "Ledger" },
      { scenario: "Trading on the XRPL DEX", recommendation: "Xaman has native DEX integration; Ledger doesn't support XRPL DEX.", winner: "Xaman" },
      { scenario: "NFT collecting and trading", recommendation: "Both support NFTs, but Xaman offers a better browsing experience.", winner: "Xaman" },
      { scenario: "Multi-currency portfolio", recommendation: "Ledger supports 5,500+ coins; Xaman is XRPL-focused.", winner: "Ledger" }
    ],
    wallet1Pros: [
      "Completely free to use with no hidden costs",
      "Best-in-class XRPL feature support including DEX, AMM, and NFTs",
      "Regular updates from XRPL Labs (core protocol contributors)",
      "Large ecosystem of xApps for extended functionality",
      "Intuitive interface suitable for beginners and experts"
    ],
    wallet1Cons: [
      "Mobile-only with no desktop version available",
      "Hot wallet means keys are on an internet-connected device",
      "Limited to XRP Ledger assets only"
    ],
    wallet2Pros: [
      "Industry-leading hardware security with Secure Element chip",
      "Supports 5,500+ cryptocurrencies for diverse portfolios",
      "Bluetooth connectivity for mobile use without cables",
      "Physical transaction confirmation prevents remote attacks",
      "Established company with strong security track record"
    ],
    wallet2Cons: [
      "Significant upfront cost of $149",
      "No support for XRPL DEX or native DeFi features",
      "Requires Ledger Live software which some find cumbersome",
      "Physical device can be lost or damaged"
    ],
    features: [
      { name: "Price", wallet1: "Free", wallet2: "$149", explanation: "Xaman is completely free; Ledger requires hardware purchase." },
      { name: "Platform", wallet1: "iOS, Android", wallet2: "Desktop, Mobile", explanation: "Xaman is mobile-only; Ledger works with desktop and mobile via Bluetooth." },
      { name: "Security Type", wallet1: "Software", wallet2: "Hardware (Secure Element)", explanation: "Fundamental difference in how private keys are protected." },
      { name: "XRPL DEX", wallet1: true, wallet2: false, explanation: "Xaman has full DEX integration; Ledger cannot access XRPL DEX." },
      { name: "NFT Support", wallet1: true, wallet2: true, explanation: "Both support XLS-20 NFTs, though Xaman offers better UX." },
      { name: "AMM/DeFi", wallet1: true, wallet2: false, explanation: "Xaman supports XRPL AMM; Ledger is storage-focused." },
      { name: "Multi-Currency", wallet1: false, wallet2: true, explanation: "Ledger supports thousands of coins; Xaman is XRPL-only." },
      { name: "Cold Storage", wallet1: false, wallet2: true, explanation: "Ledger keeps keys offline; Xaman is a hot wallet." },
      { name: "Bluetooth", wallet1: false, wallet2: true, explanation: "Ledger Nano X has Bluetooth for mobile connectivity." },
      { name: "xApp Ecosystem", wallet1: true, wallet2: false, explanation: "Xaman has a growing ecosystem of integrated applications." }
    ],
    bottomLine: "If you're actively using the XRP Ledger for trading, DeFi, or NFTs, Xaman is indispensable. If you're holding significant amounts long-term, add a Ledger for cold storage. Most serious XRP investors use both."
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
    metaDescription: "Compare Xaman and Tangem wallets for XRP storage. Full feature analysis, security comparison, and recommendations for different use cases.",
    introduction: "Xaman and Tangem represent two innovative but very different approaches to XRP wallet design. Xaman is the premier software wallet built by XRPL Labs with deep protocol integration, while Tangem offers a unique credit-card-sized hardware wallet that uses NFC technology.",
    winner: "Xaman",
    winnerReason: "For XRPL-specific features like DEX and DeFi, Xaman is unmatched. Tangem is great as a backup or for portable cold storage.",
    detailedVerdict: "Xaman is the clear winner for anyone who wants to actively participate in the XRP Ledger ecosystem. Its integration with the DEX, AMM, and NFT marketplace is unparalleled. However, Tangem serves an excellent purpose as a physical backup or for users who prioritize simplicity and portability over features. Consider using Tangem as a secure backup for your Xaman wallet's recovery phrase.",
    securityAnalysis: {
      title: "Security: App-Based vs Card-Based",
      content: "Both wallets take security seriously but use completely different approaches. Xaman relies on your phone's security features plus its own encryption, while Tangem stores keys in a dedicated secure chip inside a physical card.",
      wallet1Security: "Xaman uses AES-256 encryption with biometric locks. Keys never leave your device and are not backed up to any cloud. The app has undergone security audits and is developed by XRPL Labs.",
      wallet2Security: "Tangem uses an EAL6+ certified secure element—even higher rated than Ledger's chip. The card has no battery and is waterproof, dustproof, and resistant to extreme temperatures. Keys cannot be extracted even if you lose the card."
    },
    useCases: [
      { scenario: "Active XRPL trading and DeFi", recommendation: "Xaman is the only choice with full DEX and AMM support.", winner: "Xaman" },
      { scenario: "Portable cold storage", recommendation: "Tangem fits in your wallet like a credit card.", winner: "Tangem" },
      { scenario: "Backup wallet solution", recommendation: "Tangem is perfect as a physical backup device.", winner: "Tangem" },
      { scenario: "NFT collecting", recommendation: "Xaman has native NFT gallery and marketplace access.", winner: "Xaman" },
      { scenario: "Simple XRP storage", recommendation: "Both work well, but Tangem is simpler to set up.", winner: "Tie" }
    ],
    wallet1Pros: [
      "Full access to XRPL DEX, AMM, and DeFi protocols",
      "Native NFT support with gallery view",
      "xApp ecosystem for extended functionality",
      "Free with no hardware to purchase",
      "Regular updates and active development"
    ],
    wallet1Cons: [
      "Requires smartphone with internet connection",
      "Software wallet security (hot wallet)",
      "Limited to XRP Ledger assets"
    ],
    wallet2Pros: [
      "Credit-card form factor fits anywhere",
      "EAL6+ security—higher than most hardware wallets",
      "No battery required, waterproof and durable",
      "Simple tap-to-sign transactions via NFC",
      "Affordable hardware security option"
    ],
    wallet2Cons: [
      "No DEX, AMM, or DeFi functionality",
      "Limited cryptocurrency support",
      "Requires companion app for transactions",
      "No screen for transaction verification"
    ],
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
      { name: "Water Resistant", wallet1: false, wallet2: true }
    ],
    bottomLine: "Xaman is essential for anyone actively using the XRP Ledger. Tangem makes an excellent physical backup or simple storage solution for those who want hardware security without complexity."
  },
  "ledger-vs-tangem": {
    wallet1: {
      name: "Ledger Nano X",
      slug: "ledger",
      type: "Hardware",
      price: "$149",
      link: "https://shop.ledger.com/?r=5d81f18905fe"
    },
    wallet2: {
      name: "Tangem",
      slug: "tangem",
      type: "Hardware Card",
      price: "$54.90",
      link: "https://tangem.com/?ref=allthingsxrpl"
    },
    metaDescription: "Ledger vs Tangem hardware wallet comparison. Detailed analysis of security, features, and which is better for XRP storage.",
    introduction: "Two hardware wallets, two very different designs. Ledger Nano X is the industry-standard USB device with a screen and button controls, while Tangem is a credit-card-sized NFC card. Both keep your keys offline, but they differ significantly in features, price, and user experience.",
    winner: "Ledger",
    winnerReason: "For maximum security and multi-coin support, Ledger wins. Tangem is more portable and affordable for XRP-only storage.",
    detailedVerdict: "Ledger is the better choice for serious cryptocurrency investors managing diverse portfolios. Its screen provides crucial transaction verification, and it supports over 5,500 cryptocurrencies. Tangem, however, is underrated for its simplicity and portability—it's perfect for XRP-focused users who want hardware security without the complexity of managing a USB device.",
    securityAnalysis: {
      title: "Security: Traditional vs Card Hardware",
      content: "Both are legitimate hardware wallets with certified secure elements. The difference lies in form factor and verification methods.",
      wallet1Security: "Ledger uses a CC EAL5+ Secure Element with an OLED screen for transaction verification. You physically confirm every transaction on the device itself, which protects against malicious software attacks.",
      wallet2Security: "Tangem's EAL6+ chip is actually higher-rated than Ledger's. However, transaction verification happens on your phone screen, not the card itself. The card is more durable—waterproof and temperature resistant."
    },
    useCases: [
      { scenario: "Multi-cryptocurrency portfolio", recommendation: "Ledger supports 5,500+ coins; essential for diverse holdings.", winner: "Ledger" },
      { scenario: "XRP-only storage", recommendation: "Either works, but Tangem is simpler and cheaper.", winner: "Tangem" },
      { scenario: "Maximum transaction security", recommendation: "Ledger's screen verification is more secure.", winner: "Ledger" },
      { scenario: "Everyday carry", recommendation: "Tangem fits in your physical wallet effortlessly.", winner: "Tangem" },
      { scenario: "Harsh environment use", recommendation: "Tangem is waterproof; Ledger is not.", winner: "Tangem" }
    ],
    wallet1Pros: [
      "Supports 5,500+ cryptocurrencies",
      "On-device screen for transaction verification",
      "Bluetooth for mobile connectivity",
      "Established brand with proven security track record",
      "Regular firmware updates and improvements"
    ],
    wallet1Cons: [
      "Higher price point at $149",
      "Requires charging (rechargeable battery)",
      "Bulkier form factor than Tangem",
      "Not water resistant"
    ],
    wallet2Pros: [
      "Extremely portable credit-card form factor",
      "Higher security certification (EAL6+)",
      "No battery—never needs charging",
      "Waterproof and temperature resistant",
      "More affordable at $54.90"
    ],
    wallet2Cons: [
      "Limited cryptocurrency support",
      "No on-device screen for verification",
      "Relies on companion app for transactions",
      "Less established brand than Ledger"
    ],
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
      { name: "Portability", wallet1: "Good", wallet2: "Excellent" }
    ],
    bottomLine: "Choose Ledger if you manage multiple cryptocurrencies or prioritize on-device verification. Choose Tangem if you want affordable, ultra-portable XRP storage with minimal complexity."
  },
  "ellipal-vs-ledger": {
    wallet1: {
      name: "ELLIPAL Titan",
      slug: "ellipal",
      type: "Air-Gapped Hardware",
      price: "$169",
      link: "https://www.ellipal.com/?rfsn=8973243.bbfab69"
    },
    wallet2: {
      name: "Ledger Nano X",
      slug: "ledger",
      type: "Hardware",
      price: "$149",
      link: "https://shop.ledger.com/?r=5d81f18905fe"
    },
    metaDescription: "ELLIPAL Titan vs Ledger Nano X: Air-gapped vs traditional hardware wallet. In-depth security analysis, feature comparison, and expert recommendations.",
    introduction: "This is a battle between two philosophies of hardware wallet security. ELLIPAL Titan represents the air-gapped approach—a device with absolutely no physical connection to any network. Ledger Nano X uses a more traditional approach with USB and Bluetooth connectivity but compensates with a proven Secure Element chip. Both are legitimate hardware wallets, but they make very different tradeoffs between security and convenience.",
    winner: "Depends on Priority",
    winnerReason: "ELLIPAL for maximum security paranoia; Ledger for balance of security and usability. Both are excellent choices.",
    detailedVerdict: "If you lose sleep worrying about sophisticated supply chain attacks, remote exploits, or state-level adversaries, ELLIPAL's air-gapped design offers peace of mind that no connected device can match. The complete absence of USB, Bluetooth, WiFi, and NFC means there's literally no attack surface for remote hackers. However, for the vast majority of users, Ledger's Secure Element provides more than adequate security while offering a smoother user experience with Bluetooth connectivity and broader ecosystem support. The 'right' choice depends entirely on your threat model.",
    securityAnalysis: {
      title: "The Air-Gap Debate: Isolation vs Integration",
      content: "This is the core philosophical difference between these wallets. An air-gapped device has zero electronic connectivity, making remote attacks impossible by design. A connected device like Ledger relies on secure architecture to prevent attacks despite having connectivity. Both approaches have merit, and security experts disagree on which is superior.",
      wallet1Security: "ELLIPAL Titan has NO USB port, NO Bluetooth, NO WiFi, NO NFC—nothing. All communication happens via QR codes scanned between the device and your phone. Even if an attacker had physical access to your phone and the ELLIPAL app, they cannot extract private keys without the physical device. The large touchscreen allows you to verify transaction details on the device itself. The metal body includes anti-tamper protection that wipes the device if someone tries to open it.",
      wallet2Security: "Ledger's CC EAL5+ Secure Element is the same technology used in banking and government ID cards. While the device connects via USB or Bluetooth, the Secure Element is architecturally isolated—your keys never leave this chip, and the connection is only used for data transfer. Ledger has processed billions of dollars in transactions without a single breach of its security model. The OLED screen provides transaction verification, and physical button presses are required to confirm operations."
    },
    useCases: [
      { scenario: "High-value long-term storage ($100k+)", recommendation: "ELLIPAL's air-gap provides maximum paranoia-level security.", winner: "ELLIPAL" },
      { scenario: "Regular transaction signing", recommendation: "Ledger's Bluetooth makes frequent use more practical.", winner: "Ledger" },
      { scenario: "Multi-cryptocurrency portfolio", recommendation: "Ledger supports more coins and has better app ecosystem.", winner: "Ledger" },
      { scenario: "Protection against sophisticated attacks", recommendation: "Air-gap eliminates entire categories of remote attack vectors.", winner: "ELLIPAL" },
      { scenario: "Mobile-friendly usage", recommendation: "Ledger's Bluetooth works seamlessly; ELLIPAL requires QR scanning.", winner: "Ledger" },
      { scenario: "Inheritance/succession planning", recommendation: "ELLIPAL's simple QR system is easier for non-technical heirs to understand.", winner: "ELLIPAL" }
    ],
    wallet1Pros: [
      "100% air-gapped with zero connectivity—impossible to hack remotely",
      "Large 4-inch touchscreen for easy transaction verification",
      "Metal body with anti-tamper self-destruct mechanism",
      "QR-only communication is intuitive once learned",
      "No firmware updates required via connected computer",
      "Supports 10,000+ tokens across 51 blockchains"
    ],
    wallet1Cons: [
      "QR code scanning adds friction to every transaction",
      "Larger form factor—not as portable as Ledger",
      "Smaller community and ecosystem than Ledger",
      "Higher price at $169",
      "Battery needs charging (unlike some hardware wallets)",
      "Less extensive dApp integration"
    ],
    wallet2Pros: [
      "Proven security model with billions secured without breach",
      "Bluetooth connectivity for seamless mobile use",
      "Compact, portable USB stick form factor",
      "Ledger Live app provides excellent user experience",
      "Massive ecosystem with extensive dApp support",
      "Regular firmware updates and security improvements",
      "Established brand trusted by institutions"
    ],
    wallet2Cons: [
      "Connectivity (USB/Bluetooth) is a theoretical attack surface",
      "Small screen can be hard to read for long addresses",
      "Requires Ledger Live software for full functionality",
      "Past data breach exposed customer information (not funds)",
      "Firmware updates require connecting to computer"
    ],
    features: [
      { name: "Price", wallet1: "$169", wallet2: "$149", explanation: "ELLIPAL is slightly more expensive for the air-gap technology." },
      { name: "Connectivity", wallet1: "None (QR only)", wallet2: "USB, Bluetooth", explanation: "This is the fundamental difference between these devices." },
      { name: "Security Certification", wallet1: "IP65 + Anti-tamper", wallet2: "CC EAL5+", explanation: "Different security standards; both are hardware-secured." },
      { name: "Screen Size", wallet1: "4-inch touchscreen", wallet2: "Small OLED", explanation: "ELLIPAL's large screen is much easier to verify transactions." },
      { name: "Supported Cryptocurrencies", wallet1: "10,000+", wallet2: "5,500+", explanation: "Both support XRP and major cryptocurrencies." },
      { name: "Mobile App Quality", wallet1: "Good", wallet2: "Excellent", explanation: "Ledger Live is more polished and feature-rich." },
      { name: "Transaction Speed", wallet1: "Slower (QR scanning)", wallet2: "Fast (Bluetooth)", explanation: "Air-gap security comes at the cost of convenience." },
      { name: "Firmware Updates", wallet1: "SD card (air-gapped)", wallet2: "USB connection", explanation: "ELLIPAL updates without ever connecting to a computer." },
      { name: "Physical Durability", wallet1: "Metal, anti-tamper", wallet2: "Plastic, standard", explanation: "ELLIPAL is built like a tank." },
      { name: "Portability", wallet1: "Larger device", wallet2: "USB stick size", explanation: "Ledger wins on portability." }
    ],
    bottomLine: "For most users, Ledger offers the best balance of security and usability. But if you're securing life-changing amounts or have specific concerns about remote attacks, ELLIPAL's air-gapped architecture provides an extra layer of paranoid security that connected devices simply cannot match. Consider your threat model and choose accordingly."
  },
  "trezor-vs-ledger": {
    wallet1: {
      name: "Trezor Safe 3",
      slug: "trezor",
      type: "Hardware",
      price: "$79",
      link: "https://trezor.io/?ref=allthingsxrpl"
    },
    wallet2: {
      name: "Ledger Nano X",
      slug: "ledger",
      type: "Hardware",
      price: "$149",
      link: "https://shop.ledger.com/?r=5d81f18905fe"
    },
    metaDescription: "Trezor Safe 3 vs Ledger Nano X: Open source vs closed source hardware wallets. Complete comparison of security, features, price, and which is better for XRP.",
    introduction: "Trezor and Ledger are the two titans of the hardware wallet industry, and the debate between them has raged for years. This isn't just about features—it's about fundamental philosophies. Trezor champions open-source transparency, while Ledger relies on a secure element with proprietary firmware. Both approaches have passionate advocates and valid arguments.",
    winner: "Ledger",
    winnerReason: "Ledger's Secure Element and Bluetooth offer better security and convenience for most users, though Trezor's open-source approach has merit for transparency advocates.",
    detailedVerdict: "For the average XRP holder, Ledger Nano X is the better choice. The Secure Element chip provides hardware-level protection that Trezor has only recently adopted, and Bluetooth connectivity makes mobile use seamless. However, Trezor Safe 3 is an excellent budget option at nearly half the price, and its open-source philosophy appeals to those who believe security through transparency is superior to security through obscurity. The Trezor Safe 3 now includes a Secure Element, addressing its historical security disadvantage.",
    securityAnalysis: {
      title: "Open Source vs Secure Element: The Great Debate",
      content: "For years, Trezor's open-source software ran on general-purpose chips, while Ledger used proprietary firmware on banking-grade Secure Elements. Critics argued Trezor's approach was vulnerable to physical attacks (requiring just 15 minutes of device access), while Ledger's closed source couldn't be independently verified. The Trezor Safe 3 now includes a Secure Element, blurring this distinction.",
      wallet1Security: "Trezor Safe 3 combines open-source firmware with a new Secure Element chip, offering the best of both worlds. The firmware can be audited by anyone, while the Secure Element protects against physical extraction attacks. Trezor Suite (their companion software) is fully open-source and can be verified by the community.",
      wallet2Security: "Ledger's dual-chip architecture (Secure Element + general processor) has protected billions in assets. The proprietary BOLOS operating system runs in the Secure Element, keeping keys isolated even if the general processor is compromised. While not open-source, Ledger's security model has been tested by countless attackers with no successful breaches."
    },
    useCases: [
      { scenario: "Budget-conscious security", recommendation: "Trezor Safe 3 at $79 offers excellent value.", winner: "Trezor" },
      { scenario: "Mobile-first usage", recommendation: "Ledger's Bluetooth enables seamless smartphone transactions.", winner: "Ledger" },
      { scenario: "Open-source verification", recommendation: "Trezor's transparent codebase can be audited.", winner: "Trezor" },
      { scenario: "Broad cryptocurrency support", recommendation: "Both support thousands of coins; slight edge to Ledger.", winner: "Ledger" },
      { scenario: "dApp and DeFi interaction", recommendation: "Ledger Live has more integrations and partners.", winner: "Ledger" },
      { scenario: "XRP-specific use", recommendation: "Both handle XRP well; no significant difference.", winner: "Tie" }
    ],
    wallet1Pros: [
      "Significantly cheaper at $79 vs $149",
      "Fully open-source firmware enables community auditing",
      "New Secure Element addresses historical physical attack concerns",
      "Trezor Suite is clean, intuitive, and open-source",
      "No Bluetooth reduces potential attack surface",
      "Strong privacy stance—less personal data collection",
      "Excellent customer support reputation"
    ],
    wallet1Cons: [
      "No Bluetooth—requires USB connection",
      "Smaller ecosystem than Ledger",
      "Newer Secure Element has less track record than Ledger's",
      "Fewer native integrations with DeFi protocols",
      "Plastic body feels less premium"
    ],
    wallet2Pros: [
      "Proven Secure Element with years of real-world security",
      "Bluetooth connectivity for mobile use without cables",
      "Ledger Live provides excellent user experience",
      "Massive ecosystem with extensive dApp support",
      "More native integrations and partnerships",
      "Sleek, premium metal design"
    ],
    wallet2Cons: [
      "Nearly double the price at $149",
      "Closed-source firmware cannot be independently verified",
      "Past customer data breach (though no funds were stolen)",
      "Bluetooth is a potential (theoretical) attack vector",
      "Ledger Live can feel bloated with excessive features"
    ],
    features: [
      { name: "Price", wallet1: "$79", wallet2: "$149", explanation: "Trezor is significantly more affordable." },
      { name: "Open Source", wallet1: "Yes (firmware)", wallet2: "No", explanation: "Philosophical difference in security approach." },
      { name: "Secure Element", wallet1: "Yes (new)", wallet2: "Yes (proven)", explanation: "Both now use hardware security chips." },
      { name: "Bluetooth", wallet1: false, wallet2: true, explanation: "Ledger offers wireless connectivity." },
      { name: "Supported Coins", wallet1: "8,000+", wallet2: "5,500+", explanation: "Both support XRP and major cryptocurrencies." },
      { name: "Companion Software", wallet1: "Trezor Suite", wallet2: "Ledger Live", explanation: "Both have dedicated desktop/mobile apps." },
      { name: "Screen", wallet1: "Color touchscreen", wallet2: "Small OLED", explanation: "Trezor Safe 3 has a larger, color display." },
      { name: "Build Quality", wallet1: "Plastic", wallet2: "Metal", explanation: "Ledger feels more premium." },
      { name: "Privacy Stance", wallet1: "Strong", wallet2: "Moderate", explanation: "Trezor collects less user data." },
      { name: "DeFi Integrations", wallet1: "Growing", wallet2: "Extensive", explanation: "Ledger has more partnerships." }
    ],
    bottomLine: "Ledger Nano X is the premium choice with Bluetooth convenience and an extensive ecosystem. Trezor Safe 3 is the value champion, offering nearly equivalent security at half the price with the added benefit of open-source transparency. Your choice depends on budget, whether you need Bluetooth, and how much you value open-source verification."
  },
  "bifrost-vs-xaman": {
    wallet1: {
      name: "Bifrost Wallet",
      slug: "bifrost",
      type: "Mobile App",
      price: "Free",
      link: "https://bifrostwallet.com/?ref=allthingsxrpl"
    },
    wallet2: {
      name: "Xaman (XUMM)",
      slug: "xaman",
      type: "Mobile App",
      price: "Free",
      link: "https://xaman.app/?ref=allthingsxrpl"
    },
    metaDescription: "Bifrost Wallet vs Xaman: Privacy-focused vs feature-rich XRPL wallets. Detailed comparison of features, security, and which mobile wallet is better for XRP.",
    introduction: "Both Bifrost and Xaman are excellent free mobile wallets for the XRP Ledger, but they're designed for different priorities. Bifrost emphasizes privacy and multi-chain support, while Xaman (formerly XUMM) offers the deepest integration with XRPL features. This comparison helps you understand which philosophy aligns with your needs.",
    winner: "Xaman",
    winnerReason: "For pure XRPL functionality, Xaman is unmatched. Bifrost is better for privacy-conscious users or those managing multiple blockchain assets.",
    detailedVerdict: "Xaman remains the gold standard for XRP Ledger users who want to access every feature the protocol offers—DEX trading, AMM liquidity provision, NFT management, and the growing xApp ecosystem. It's built by XRPL Labs, the team that contributes to the core protocol, which means new XRPL features arrive in Xaman first. Bifrost, however, carves out a valuable niche for users who prioritize privacy (no tracking, no analytics) and need multi-chain support beyond just the XRP Ledger. If you're a privacy purist or manage assets across multiple blockchains, Bifrost deserves serious consideration.",
    securityAnalysis: {
      title: "Security and Privacy: Different Emphases",
      content: "Both wallets take security seriously, but Bifrost goes further on privacy. Both store keys locally and never on servers, but they differ in how much data they collect about your usage.",
      wallet1Security: "Bifrost is built with a privacy-first philosophy. The app collects zero analytics, doesn't track your transactions, and doesn't phone home with usage data. Your keys are encrypted locally, and the app includes a dApp browser for interacting with decentralized applications across multiple chains.",
      wallet2Security: "Xaman uses military-grade encryption with biometric authentication. Keys never leave your device and aren't backed up to any cloud. The app has undergone security audits. However, Xaman does collect some anonymous analytics to improve the product, which privacy purists may not appreciate."
    },
    useCases: [
      { scenario: "XRPL DEX trading", recommendation: "Xaman has the best DEX integration available.", winner: "Xaman" },
      { scenario: "Maximum privacy", recommendation: "Bifrost's zero-tracking policy is unmatched.", winner: "Bifrost" },
      { scenario: "NFT collecting on XRPL", recommendation: "Xaman's NFT gallery and marketplace access is superior.", winner: "Xaman" },
      { scenario: "Multi-chain portfolio", recommendation: "Bifrost supports multiple blockchains beyond XRPL.", winner: "Bifrost" },
      { scenario: "AMM liquidity provision", recommendation: "Xaman has native AMM support.", winner: "Xaman" },
      { scenario: "Using xApps ecosystem", recommendation: "xApps are exclusive to Xaman.", winner: "Xaman" }
    ],
    wallet1Pros: [
      "Zero tracking and analytics—complete privacy",
      "Multi-chain support beyond just XRP Ledger",
      "Built-in dApp browser for decentralized applications",
      "Clean, modern interface design",
      "No account registration required",
      "Growing feature set with active development"
    ],
    wallet1Cons: [
      "Smaller user community than Xaman",
      "Fewer XRPL-specific features than Xaman",
      "No xApp ecosystem integration",
      "Less frequent updates than Xaman",
      "Limited customer support compared to XRPL Labs"
    ],
    wallet2Pros: [
      "Best-in-class XRPL feature support",
      "Native DEX, AMM, and NFT integration",
      "Growing xApp ecosystem for extended functionality",
      "Built by XRPL Labs—core protocol contributors",
      "Large, active community and support",
      "First to receive new XRPL feature support",
      "PayString integration for simple payments"
    ],
    wallet2Cons: [
      "XRP Ledger only—no other blockchains",
      "Collects anonymous usage analytics",
      "Can feel complex for simple storage needs",
      "No desktop version available"
    ],
    features: [
      { name: "Price", wallet1: "Free", wallet2: "Free", explanation: "Both are completely free to use." },
      { name: "Platform", wallet1: "iOS, Android", wallet2: "iOS, Android", explanation: "Both are mobile-only applications." },
      { name: "Privacy Policy", wallet1: "Zero tracking", wallet2: "Anonymous analytics", explanation: "Bifrost is more privacy-focused." },
      { name: "Multi-Chain", wallet1: true, wallet2: false, explanation: "Bifrost supports multiple blockchains." },
      { name: "XRPL DEX", wallet1: "Basic", wallet2: "Full Integration", explanation: "Xaman's DEX support is more comprehensive." },
      { name: "NFT Support", wallet1: "Basic", wallet2: "Full Gallery", explanation: "Xaman offers better NFT experience." },
      { name: "AMM Support", wallet1: false, wallet2: true, explanation: "Xaman supports XRPL's native AMM." },
      { name: "xApps", wallet1: false, wallet2: true, explanation: "xApp ecosystem is exclusive to Xaman." },
      { name: "dApp Browser", wallet1: true, wallet2: "Via xApps", explanation: "Bifrost has a more traditional dApp browser." },
      { name: "Development Team", wallet1: "Independent", wallet2: "XRPL Labs", explanation: "Xaman is backed by protocol contributors." }
    ],
    bottomLine: "If you're primarily an XRPL user who wants access to every feature the ledger offers, Xaman is the clear choice. If privacy is your top priority or you manage assets across multiple blockchains, Bifrost is an excellent alternative that respects your data."
  },
  "coinbase-vs-kraken": {
    wallet1: {
      name: "Coinbase",
      slug: "coinbase",
      type: "Exchange",
      price: "Free to join",
      link: "https://www.coinbase.com/join?ref=allthingsxrpl"
    },
    wallet2: {
      name: "Kraken",
      slug: "kraken",
      type: "Exchange",
      price: "Free to join",
      link: "https://kraken.com/sign-up?r=allthingsxrpl"
    },
    metaDescription: "Coinbase vs Kraken exchange comparison: Beginner-friendly vs professional trading. Complete analysis of fees, security, features, and which is better for buying XRP.",
    introduction: "Coinbase and Kraken are two of the most respected cryptocurrency exchanges in the world, but they cater to different audiences. Coinbase has built its reputation on making crypto accessible to beginners, while Kraken offers professional-grade tools and some of the lowest fees in the industry. For XRP buyers, both are excellent choices with important differences.",
    winner: "Depends on Experience",
    winnerReason: "Coinbase for beginners who value simplicity; Kraken for experienced traders who want lower fees and more features.",
    detailedVerdict: "If you're new to cryptocurrency and want the easiest possible experience, Coinbase is hard to beat. The interface is intuitive, the mobile app is excellent, and the learning resources help you understand what you're buying. However, this convenience comes at a cost—literally. Coinbase's fees are among the highest in the industry. Kraken offers significantly lower fees and more sophisticated trading tools, but the learning curve is steeper. For buying and holding XRP long-term, both work well, but your choice of fee structure will compound over time.",
    securityAnalysis: {
      title: "Security: Both Institutional-Grade",
      content: "Both Coinbase and Kraken are regulated, publicly-known companies with excellent security track records. Neither has ever lost customer funds to a hack. Your choice here should be based on features and fees, not security concerns.",
      wallet1Security: "Coinbase is a publicly-traded company (NASDAQ: COIN) with institutional-grade security. They store 98% of customer assets in cold storage, offer two-factor authentication, and provide up to $250,000 FDIC insurance on USD balances. They've never suffered a security breach resulting in lost customer funds.",
      wallet2Security: "Kraken has operated since 2011 without a single security incident. They use cold storage for 95% of deposits, require proof of reserves audits, and offer extensive security features including Master Key, Global Settings Lock, and PGP-encrypted email. Their security practices are considered industry-leading."
    },
    useCases: [
      { scenario: "First-time crypto buyer", recommendation: "Coinbase's simple interface and educational content win here.", winner: "Coinbase" },
      { scenario: "Regular XRP purchases", recommendation: "Kraken's lower fees save money on recurring buys.", winner: "Kraken" },
      { scenario: "Active trading", recommendation: "Kraken Pro offers advanced charts and order types.", winner: "Kraken" },
      { scenario: "Mobile-first experience", recommendation: "Coinbase's app is more polished and intuitive.", winner: "Coinbase" },
      { scenario: "Fiat deposits/withdrawals", recommendation: "Both support bank transfers; Coinbase has more options.", winner: "Coinbase" },
      { scenario: "Cost-conscious investing", recommendation: "Kraken fees are 40-60% lower than Coinbase.", winner: "Kraken" }
    ],
    wallet1Pros: [
      "Extremely beginner-friendly interface",
      "Excellent mobile app experience",
      "Publicly-traded company with regulatory oversight",
      "Coinbase Earn lets you earn crypto while learning",
      "Largest user base provides high liquidity",
      "Strong brand recognition and trust",
      "Simple recurring buy features"
    ],
    wallet1Cons: [
      "Among the highest fees in the industry (up to 4%)",
      "Coinbase Pro with lower fees is being merged/changed",
      "Customer support can be slow and frustrating",
      "Limited advanced trading features",
      "Spread markup on 'simple' purchases adds hidden costs"
    ],
    wallet2Pros: [
      "Significantly lower trading fees (0.16%-0.26%)",
      "Kraken Pro offers institutional-grade trading tools",
      "Excellent security track record since 2011",
      "Proof of reserves audits for transparency",
      "Strong customer support reputation",
      "No hidden spread markups",
      "Staking available for some assets"
    ],
    wallet2Cons: [
      "Steeper learning curve than Coinbase",
      "Mobile app less polished than Coinbase",
      "Fewer payment methods for fiat deposits",
      "Interface can feel overwhelming for beginners",
      "Less brand recognition outside crypto circles"
    ],
    features: [
      { name: "Trading Fees", wallet1: "0.5% - 4%", wallet2: "0.16% - 0.26%", explanation: "Kraken is significantly cheaper for trading." },
      { name: "Beginner Friendly", wallet1: "Excellent", wallet2: "Moderate", explanation: "Coinbase is designed for newcomers." },
      { name: "Mobile App", wallet1: "Excellent", wallet2: "Good", explanation: "Coinbase's app is more polished." },
      { name: "Security", wallet1: "Excellent", wallet2: "Excellent", explanation: "Both have spotless security records." },
      { name: "Advanced Trading", wallet1: "Limited", wallet2: "Extensive", explanation: "Kraken Pro is built for professionals." },
      { name: "Regulatory Status", wallet1: "Publicly traded", wallet2: "Registered MSB", explanation: "Both are fully regulated in the US." },
      { name: "Customer Support", wallet1: "Mixed reviews", wallet2: "Generally positive", explanation: "Kraken has better support reputation." },
      { name: "XRP Availability", wallet1: true, wallet2: true, explanation: "Both list XRP for trading." },
      { name: "Staking Options", wallet1: "Limited", wallet2: "Available", explanation: "Kraken offers staking on eligible assets." },
      { name: "Fiat Options", wallet1: "Many", wallet2: "Several", explanation: "Coinbase supports more deposit methods." }
    ],
    bottomLine: "New to crypto? Start with Coinbase for the smoothest onboarding experience, but consider migrating to Kraken once you're comfortable—the fee savings add up quickly. Experienced traders should go straight to Kraken for professional tools and lower costs."
  },
  "trustwallet-vs-xaman": {
    wallet1: {
      name: "Trust Wallet",
      slug: "trustwallet",
      type: "Mobile App",
      price: "Free",
      link: "https://trustwallet.com/?ref=allthingsxrpl"
    },
    wallet2: {
      name: "Xaman (XUMM)",
      slug: "xaman",
      type: "Mobile App",
      price: "Free",
      link: "https://xaman.app/?ref=allthingsxrpl"
    },
    metaDescription: "Trust Wallet vs Xaman comparison: Multi-chain giant vs XRPL specialist. In-depth analysis of which wallet is better for XRP holders.",
    introduction: "This comparison pits a giant against a specialist. Trust Wallet, backed by Binance, serves over 70 million users across hundreds of blockchains. Xaman is the definitive XRP Ledger wallet, built by the team that contributes to the core protocol. If you're choosing a wallet for XRP, understanding these different approaches is essential.",
    winner: "Xaman for XRP",
    winnerReason: "For dedicated XRP users, Xaman offers unmatched XRPL functionality. Trust Wallet is better for multi-chain portfolios that happen to include XRP.",
    detailedVerdict: "If XRP is your primary cryptocurrency and you want to participate in the XRPL ecosystem (DEX trading, AMM, NFTs, DeFi), Xaman is the obvious choice. It's purpose-built for the XRP Ledger with features no other wallet can match. However, if XRP is just one part of a diverse portfolio spanning Ethereum, BSC, Solana, and other chains, Trust Wallet's multi-chain approach makes managing everything in one place much more convenient. The tradeoff is that Trust Wallet treats XRP as just another token, while Xaman treats the XRP Ledger as a complete ecosystem.",
    securityAnalysis: {
      title: "Security: Corporate Giant vs Protocol Experts",
      content: "Both wallets are non-custodial, meaning you control your private keys. The security implementations differ in approach but both are considered safe for self-custody.",
      wallet1Security: "Trust Wallet is backed by Binance, the world's largest cryptocurrency exchange. The wallet is non-custodial—your keys are encrypted on your device. Trust Wallet's open-source code allows community verification, and the Binance security team provides resources and expertise. With 70+ million users, it's been battle-tested at scale.",
      wallet2Security: "Xaman is developed by XRPL Labs, core contributors to the XRP Ledger protocol itself. They understand XRPL security at the deepest level. Keys are encrypted locally with biometric authentication, never backed up to any cloud, and the app has undergone independent security audits."
    },
    useCases: [
      { scenario: "XRPL DEX trading", recommendation: "Xaman has native, full-featured DEX integration.", winner: "Xaman" },
      { scenario: "Multi-chain portfolio management", recommendation: "Trust Wallet supports 100+ blockchains.", winner: "Trust Wallet" },
      { scenario: "XRP NFT collecting", recommendation: "Xaman's NFT gallery is built for XRPL NFTs.", winner: "Xaman" },
      { scenario: "DeFi across multiple chains", recommendation: "Trust Wallet's dApp browser works everywhere.", winner: "Trust Wallet" },
      { scenario: "XRPL AMM participation", recommendation: "Xaman has native AMM support.", winner: "Xaman" },
      { scenario: "Staking various assets", recommendation: "Trust Wallet offers staking for many tokens.", winner: "Trust Wallet" }
    ],
    wallet1Pros: [
      "Supports 100+ blockchains and millions of tokens",
      "70+ million users provide proven reliability",
      "Backed by Binance—significant resources and security expertise",
      "Built-in dApp browser for Web3 interaction",
      "Staking available for various assets",
      "NFT support across multiple chains",
      "Regular updates and active development"
    ],
    wallet1Cons: [
      "No XRPL DEX integration—just basic send/receive",
      "No XRPL AMM support",
      "XRP NFTs not fully supported",
      "Generic XRP experience vs specialized features",
      "No xApp ecosystem access"
    ],
    wallet2Pros: [
      "Built by XRPL Labs—core protocol contributors",
      "Full DEX integration with limit orders and advanced trading",
      "Native AMM liquidity provision",
      "XRP NFT gallery with marketplace access",
      "xApp ecosystem for extended XRPL functionality",
      "First wallet to support new XRPL features",
      "PayString integration for simple payments"
    ],
    wallet2Cons: [
      "XRP Ledger only—no other blockchains",
      "Cannot manage ETH, BTC, or other assets",
      "Overkill if you just want to hold XRP",
      "No desktop version available"
    ],
    features: [
      { name: "Price", wallet1: "Free", wallet2: "Free", explanation: "Both are completely free to use." },
      { name: "Supported Blockchains", wallet1: "100+", wallet2: "XRP Ledger only", explanation: "Fundamental difference in scope." },
      { name: "User Base", wallet1: "70+ million", wallet2: "Millions", explanation: "Trust Wallet has broader adoption." },
      { name: "XRPL DEX", wallet1: false, wallet2: true, explanation: "Xaman offers full DEX functionality." },
      { name: "XRPL AMM", wallet1: false, wallet2: true, explanation: "Only Xaman supports native AMM." },
      { name: "XRP NFTs", wallet1: "Partial", wallet2: "Full Support", explanation: "Xaman has dedicated NFT gallery." },
      { name: "dApp Browser", wallet1: true, wallet2: "Via xApps", explanation: "Trust Wallet has traditional dApp browser." },
      { name: "Staking", wallet1: "Multiple assets", wallet2: "None", explanation: "Trust Wallet offers broader staking." },
      { name: "Corporate Backing", wallet1: "Binance", wallet2: "XRPL Labs", explanation: "Different but both reputable." },
      { name: "xApps Ecosystem", wallet1: false, wallet2: true, explanation: "xApps are exclusive to Xaman." }
    ],
    bottomLine: "Are you an XRP enthusiast who wants full access to everything the XRP Ledger offers? Xaman is your wallet. Do you hold XRP alongside Bitcoin, Ethereum, and other assets? Trust Wallet's multi-chain convenience makes more sense. The best choice depends on whether XRP is your focus or just part of a larger portfolio."
  }
};

export default function Compare() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = comparisons[slug || ""];

  if (!comparison) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Wallet Comparisons</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            In-depth, side-by-side comparisons to help you choose the right wallet or exchange for your needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {Object.entries(comparisons).map(([key, comp]) => (
              <Link key={key} href={`/compare/${key}`}>
                <div className="p-6 rounded-xl bg-card/30 border border-white/10 hover:border-primary/50 transition-colors text-left">
                  <h3 className="font-bold mb-2">{comp.wallet1.name} vs {comp.wallet2.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{comp.metaDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-32 max-w-5xl">
        <Link href="/#wallets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Wallets
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black font-display mb-4">
            {comparison.wallet1.name} vs {comparison.wallet2.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {comparison.metaDescription}
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {comparison.introduction}
          </p>
        </div>

        {/* Quick Verdict */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-white/10 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="font-display font-bold text-xl">Our Verdict: {comparison.winner}</span>
          </div>
          <p className="text-muted-foreground mb-4">{comparison.winnerReason}</p>
          <p className="text-sm leading-relaxed">{comparison.detailedVerdict}</p>
        </div>

        {/* Security Analysis */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold font-display">{comparison.securityAnalysis.title}</h2>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {comparison.securityAnalysis.content}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card/30 border border-white/10 rounded-xl p-6">
              <h3 className="font-bold mb-3">{comparison.wallet1.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {comparison.securityAnalysis.wallet1Security}
              </p>
            </div>
            <div className="bg-card/30 border border-white/10 rounded-xl p-6">
              <h3 className="font-bold mb-3">{comparison.wallet2.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {comparison.securityAnalysis.wallet2Security}
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold font-display">Use Case Recommendations</h2>
          </div>
          <div className="space-y-4">
            {comparison.useCases.map((useCase, idx) => (
              <div key={idx} className="bg-card/30 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{useCase.scenario}</h4>
                    <p className="text-sm text-muted-foreground">{useCase.recommendation}</p>
                  </div>
                  <span className={`shrink-0 px-3 py-1 rounded-full text-sm font-medium ${
                    useCase.winner === comparison.wallet1.name ? 'bg-primary/20 text-primary' :
                    useCase.winner === comparison.wallet2.name ? 'bg-secondary/20 text-secondary' :
                    'bg-white/10 text-muted-foreground'
                  }`}>
                    {useCase.winner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold font-display mb-6 text-center">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wallet 1 Pros/Cons */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-center">{comparison.wallet1.name}</h3>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsUp className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-400">Pros</span>
                </div>
                <ul className="space-y-2">
                  {comparison.wallet1Pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsDown className="h-5 w-5 text-red-400" />
                  <span className="font-medium text-red-400">Cons</span>
                </div>
                <ul className="space-y-2">
                  {comparison.wallet1Cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Wallet 2 Pros/Cons */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-center">{comparison.wallet2.name}</h3>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsUp className="h-5 w-5 text-green-400" />
                  <span className="font-medium text-green-400">Pros</span>
                </div>
                <ul className="space-y-2">
                  {comparison.wallet2Pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ThumbsDown className="h-5 w-5 text-red-400" />
                  <span className="font-medium text-red-400">Cons</span>
                </div>
                <ul className="space-y-2">
                  {comparison.wallet2Cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold font-display">Feature Comparison</h2>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl overflow-hidden">
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
        </div>

        {/* Bottom Line */}
        <div className="bg-gradient-to-r from-card/50 to-primary/5 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold font-display">The Bottom Line</h2>
          </div>
          <p className="text-lg leading-relaxed">{comparison.bottomLine}</p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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

        {/* More Comparisons */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Explore more comparisons</p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(comparisons)
              .filter(([key]) => key !== slug)
              .slice(0, 4)
              .map(([key, comp]) => (
                <Link key={key} href={`/compare/${key}`}>
                  <Button variant="outline" size="sm">
                    {comp.wallet1.name.split(' ')[0]} vs {comp.wallet2.name.split(' ')[0]}
                  </Button>
                </Link>
              ))}
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
