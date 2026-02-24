import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/lib/i18n/LanguageContext";
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
import xamanLogo from "@/assets/logos/xaman-logo.webp";
import ledgerLogo from "@/assets/logos/ledger-logo.webp";
import crossmarkLogo from "@/assets/logos/crossmark-logo.webp";
import bifrostLogo from "@/assets/logos/bifrost-logo.webp";
import gatehubLogo from "@/assets/logos/gatehub-logo.webp";
import trustwalletLogo from "@/assets/logos/trustwallet-logo.webp";
import ellipalLogo from "@/assets/logos/ellipal-logo.webp";
import trezorLogo from "@/assets/logos/trezor-logo.webp";

const logoMap: Record<string, string> = {
  xaman: xamanLogo,
  ledger: ledgerLogo,
  crossmark: crossmarkLogo,
  bifrost: bifrostLogo,
  gatehub: gatehubLogo,
  trustwallet: trustwalletLogo,
  ellipal: ellipalLogo,
  trezor: trezorLogo
};

const walletData: Record<string, {
  name: string;
  taglineKey: string;
  rating: number;
  typeKey: string;
  price: string;
  platforms: string[];
  website: string;
  affiliateLink: string;
  descriptionKey: string;
  featureKeys: string[];
  proKeys: string[];
  conKeys: string[];
  bestForKey: string;
  securityFeatureKeys: string[];
  review: { heading: string; paragraphs: string[] }[];
}> = {
  xaman: {
    name: "Xaman (XUMM)",
    taglineKey: "walletDetail.xaman.tagline",
    rating: 4.9,
    typeKey: "wallet.type.mobileApp",
    price: "Free",
    platforms: ["iOS", "Android"],
    website: "xaman.app",
    affiliateLink: "https://xaman.app/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.xaman.description",
    featureKeys: [
      "walletDetail.xaman.feature1",
      "walletDetail.xaman.feature2",
      "walletDetail.xaman.feature3",
      "walletDetail.xaman.feature4",
      "walletDetail.xaman.feature5",
      "walletDetail.xaman.feature6",
      "walletDetail.xaman.feature7",
      "walletDetail.xaman.feature8"
    ],
    proKeys: [
      "walletDetail.xaman.pro1",
      "walletDetail.xaman.pro2",
      "walletDetail.xaman.pro3",
      "walletDetail.xaman.pro4",
      "walletDetail.xaman.pro5",
      "walletDetail.xaman.pro6",
      "walletDetail.xaman.pro7"
    ],
    conKeys: [
      "walletDetail.xaman.con1",
      "walletDetail.xaman.con2",
      "walletDetail.xaman.con3"
    ],
    bestForKey: "walletDetail.xaman.bestFor",
    securityFeatureKeys: [
      "walletDetail.xaman.security1",
      "walletDetail.xaman.security2",
      "walletDetail.xaman.security3",
      "walletDetail.xaman.security4",
      "walletDetail.xaman.security5",
      "walletDetail.xaman.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "Xaman, formerly known as XUMM, is the flagship mobile wallet for the XRP Ledger and arguably the most important piece of software in the entire XRPL ecosystem. Developed by XRPL Labs — a team with deep ties to the ledger's core development — Xaman was purpose-built from day one to give users full, native access to every feature the XRP Ledger offers. Unlike multi-chain wallets that bolt on XRP support as an afterthought, Xaman treats the XRPL as its sole focus, and the difference in quality is immediately apparent.",
          "From the moment you open the app, the interface feels polished and intentional. The onboarding flow walks you through creating or importing an account, setting up biometric authentication, and understanding your secret numbers — all without overwhelming newcomers. Seasoned XRPL users will appreciate the depth of control available just below the surface, including raw transaction signing, custom trustline management, and direct DEX access."
        ]
      },
      {
        heading: "User Experience and Daily Use",
        paragraphs: [
          "Where Xaman truly shines is in its role as the gateway to the broader XRPL ecosystem. The built-in xApp browser lets you interact with decentralized applications directly from the wallet — whether you are trading tokens on the XRPL DEX, minting NFTs, or participating in AMM liquidity pools. The sign-in flow uses QR codes and deep links, meaning you never have to copy-paste your private key or seed phrase into a third-party website.",
          "The payment experience is smooth and intuitive. Sending XRP or issued tokens takes just a few taps, and the app clearly displays destination tags, memo fields, and network fees before you confirm. For merchants and developers, Xaman offers PayID integration and xApp development tools that make it easy to build payment experiences on top of the XRPL. The wallet also supports multiple accounts, so you can separate your main holdings from a trading account or NFT collection."
        ]
      },
      {
        heading: "Security Architecture",
        paragraphs: [
          "Security in Xaman follows a thoughtful, layered approach. Your private keys are encrypted and stored locally on your device — they never leave your phone and are never transmitted to XRPL Labs' servers. The app supports biometric unlock (Face ID and fingerprint), PIN protection, and a unique tangem card integration for hardware-level signing. The secret numbers backup system is an innovative alternative to traditional seed phrases, offering a way to recover your account that is resistant to common phishing attacks.",
          "XRPL Labs has also implemented transaction-level security features. Every transaction request shows a clear breakdown of what you are signing, with warnings for unusual amounts, unknown destinations, or missing destination tags. The app's open-source xApp framework means that third-party dApps interact with your wallet through a sandboxed environment, reducing the risk of malicious code accessing your keys."
        ]
      },
      {
        heading: "Who Should Use Xaman",
        paragraphs: [
          "Xaman is the ideal wallet for anyone who is serious about the XRP Ledger. If you hold XRP and want to participate in the XRPL ecosystem — whether that means trading on the decentralized exchange, collecting NFTs, providing AMM liquidity, or simply sending payments — Xaman is the tool that gives you the most complete access. It is free, regularly updated, and backed by a development team that is deeply invested in the ledger's long-term success.",
          "The only users who might want to look elsewhere are those who need cold storage for very large holdings (in which case pairing Xaman with a Tangem card or using a dedicated hardware wallet is recommended) or those who prefer a desktop-first experience. For everyone else, Xaman is the gold standard for XRPL wallets and the first app we recommend to anyone entering the ecosystem."
        ]
      }
    ]
  },
  tangem: {
    name: "Tangem",
    taglineKey: "walletDetail.tangem.tagline",
    rating: 4.7,
    typeKey: "wallet.type.hardware",
    price: "$54.90",
    platforms: ["iOS", "Android", "NFC Card"],
    website: "tangem.com",
    affiliateLink: "https://tangem.com/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.tangem.description",
    featureKeys: [
      "walletDetail.tangem.feature1",
      "walletDetail.tangem.feature2",
      "walletDetail.tangem.feature3",
      "walletDetail.tangem.feature4",
      "walletDetail.tangem.feature5",
      "walletDetail.tangem.feature6",
      "walletDetail.tangem.feature7",
      "walletDetail.tangem.feature8"
    ],
    proKeys: [
      "walletDetail.tangem.pro1",
      "walletDetail.tangem.pro2",
      "walletDetail.tangem.pro3",
      "walletDetail.tangem.pro4",
      "walletDetail.tangem.pro5",
      "walletDetail.tangem.pro6"
    ],
    conKeys: [
      "walletDetail.tangem.con1",
      "walletDetail.tangem.con2",
      "walletDetail.tangem.con3",
      "walletDetail.tangem.con4"
    ],
    bestForKey: "walletDetail.tangem.bestFor",
    securityFeatureKeys: [
      "walletDetail.tangem.security1",
      "walletDetail.tangem.security2",
      "walletDetail.tangem.security3",
      "walletDetail.tangem.security4",
      "walletDetail.tangem.security5",
      "walletDetail.tangem.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "Tangem has done something genuinely novel in the hardware wallet space: it took the security of cold storage and compressed it into a device the size and shape of a credit card. There is no screen, no battery, no USB port, and no Bluetooth radio. Instead, the Tangem card communicates with your smartphone via NFC — you simply tap the card against your phone to sign transactions. The result is a hardware wallet that you can carry in your physical wallet alongside your bank cards, making it one of the most portable secure storage solutions available.",
          "The card itself is built to last. Tangem rates its chip lifespan at 25 years and the card body is IP68 water-resistant, dust-proof, and resistant to extreme temperatures. Each order comes with either two or three cards that share the same wallet, providing built-in redundancy. If you lose one card, the others still grant full access to your funds — and if someone finds your lost card, they cannot use it without your phone and PIN."
        ]
      },
      {
        heading: "User Experience and Daily Use",
        paragraphs: [
          "Setting up Tangem is refreshingly simple. Download the Tangem app on iOS or Android, tap your card to your phone, set a PIN, and you are ready to go. There is no seed phrase to write down — the private key is generated on the card's secure element chip and never leaves the hardware. This is a deliberate design choice that eliminates the most common attack vector in crypto: compromised seed phrase backups. Your backup is the second (or third) physical card in your set.",
          "Day-to-day use revolves around the companion app. The interface is clean and supports XRP along with thousands of other cryptocurrencies. To send a transaction, you enter the details in the app and then tap your Tangem card to physically authorize the signing. The NFC tap takes about one second and provides a satisfying confirmation that your keys are being used in a secure, air-gapped manner. For XRP holders specifically, Tangem supports native XRPL transactions including trustlines and token management, though it does not provide access to the XRPL DEX or xApps the way Xaman does."
        ]
      },
      {
        heading: "Security Deep Dive",
        paragraphs: [
          "The security model of Tangem is fundamentally different from traditional hardware wallets. Because there is no screen on the card, transaction details are displayed on your phone — which means you are trusting the Tangem app to accurately show what you are signing. Tangem mitigates this by keeping the app open-source and undergoing regular third-party security audits. The card's chip is a Samsung S3D350A secure element, the same class of chip used in banking cards and passports, certified to EAL6+ on the Common Criteria scale.",
          "The lack of a seed phrase is both Tangem's greatest strength and a point of concern for some users. If you lose all your cards, there is no way to recover your funds — period. This makes the multi-card backup system essential, and we strongly recommend storing at least one backup card in a separate physical location. For users who are disciplined about physical security but struggle with seed phrase management, Tangem's approach is arguably more secure in practice than a seed phrase written on paper."
        ]
      },
      {
        heading: "Who Should Use Tangem",
        paragraphs: [
          "Tangem is ideal for users who want hardware wallet security without the bulk and complexity of a traditional device. It is particularly well-suited for people who travel frequently, want a backup cold storage solution alongside a software wallet, or are buying their first hardware wallet and want something that does not feel intimidating. The price point — starting at $54.90 for a two-card set — is also significantly lower than competing hardware wallets, making it an accessible entry point into self-custody.",
          "Where Tangem falls short is for power users who want a complete XRPL ecosystem experience. It does not support dApp browsing, NFT management, or AMM participation the way Xaman does. For many users, the best setup is actually a combination of both: Xaman for daily XRPL interaction and Tangem for long-term secure storage of larger holdings."
        ]
      }
    ]
  },
  ledger: {
    name: "Ledger Nano X",
    taglineKey: "walletDetail.ledger.tagline",
    rating: 4.8,
    typeKey: "wallet.type.hardware",
    price: "$149",
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android"],
    website: "ledger.com",
    affiliateLink: "https://shop.ledger.com/?r=5d81f18905fe",
    descriptionKey: "walletDetail.ledger.description",
    featureKeys: [
      "walletDetail.ledger.feature1",
      "walletDetail.ledger.feature2",
      "walletDetail.ledger.feature3",
      "walletDetail.ledger.feature4",
      "walletDetail.ledger.feature5",
      "walletDetail.ledger.feature6",
      "walletDetail.ledger.feature7",
      "walletDetail.ledger.feature8"
    ],
    proKeys: [
      "walletDetail.ledger.pro1",
      "walletDetail.ledger.pro2",
      "walletDetail.ledger.pro3",
      "walletDetail.ledger.pro4",
      "walletDetail.ledger.pro5",
      "walletDetail.ledger.pro6"
    ],
    conKeys: [
      "walletDetail.ledger.con1",
      "walletDetail.ledger.con2",
      "walletDetail.ledger.con3",
      "walletDetail.ledger.con4"
    ],
    bestForKey: "walletDetail.ledger.bestFor",
    securityFeatureKeys: [
      "walletDetail.ledger.security1",
      "walletDetail.ledger.security2",
      "walletDetail.ledger.security3",
      "walletDetail.ledger.security4",
      "walletDetail.ledger.security5",
      "walletDetail.ledger.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "The Ledger Nano X has earned its reputation as the industry's most trusted hardware wallet, and for good reason. With over six million units sold worldwide and a track record stretching back to 2014, Ledger has become synonymous with secure cryptocurrency storage. The Nano X represents the company's premium offering, adding Bluetooth connectivity and expanded storage capacity over the more affordable Nano S Plus, making it the go-to choice for serious investors who want to manage their portfolio on the move.",
          "Unboxing the Nano X reveals a compact, well-built device that resembles a USB flash drive. The matte black finish and brushed metal swivel cover give it a professional feel. The small OLED screen and two physical buttons are deliberately simple — every interaction requires you to physically verify transaction details on the device itself, which is the cornerstone of hardware wallet security."
        ]
      },
      {
        heading: "User Experience and Daily Use",
        paragraphs: [
          "Setting up the Ledger Nano X involves installing the Ledger Live desktop or mobile application, initializing the device, writing down your 24-word recovery phrase, and installing apps for each cryptocurrency you want to manage. The Nano X supports over 5,500 coins and tokens, and its expanded storage means you can have up to 100 apps installed simultaneously. For XRP holders, the XRP app provides full support for sending, receiving, and managing your account on the ledger.",
          "The Bluetooth feature is what sets the Nano X apart from its cheaper sibling. You can pair it with your smartphone and manage transactions through the Ledger Live mobile app without needing a USB cable. In practice, this means you can sign XRP transactions from your phone while your Nano X sits in your pocket or bag. The Bluetooth connection is encrypted and the device still requires physical button presses to confirm transactions, so the wireless connection does not compromise security."
        ]
      },
      {
        heading: "Security Architecture",
        paragraphs: [
          "Ledger's security model is built around a certified secure element chip (ST33J2M0) — the same type of chip found in credit cards and passports. This chip stores your private keys in a tamper-resistant environment that is designed to withstand physical attacks, side-channel attacks, and fault injection. The device runs Ledger's proprietary operating system (BOLOS), which isolates each cryptocurrency app in its own sandbox, preventing one compromised app from accessing another's data.",
          "The 24-word recovery phrase is generated on the device during setup and is the sole backup for your funds. Ledger also supports an optional passphrase (sometimes called the 25th word) for plausible deniability and additional security layers. It is worth noting that in 2020, Ledger experienced a data breach of its e-commerce database — customer names and addresses were exposed, though no device keys or funds were compromised. The incident highlighted the importance of operational security beyond just the hardware itself."
        ]
      },
      {
        heading: "Who Should Use Ledger Nano X",
        paragraphs: [
          "The Ledger Nano X is the right choice for users who hold significant cryptocurrency portfolios across multiple blockchains and want a single, battle-tested device to secure them all. Its multi-chain support is unmatched, its security track record is extensive, and the Bluetooth connectivity makes it practical for regular use. For XRP holders specifically, the Nano X pairs well with Xaman for day-to-day XRPL interaction while serving as the secure vault for your larger holdings.",
          "The main drawbacks are the price — at $149 it is one of the more expensive hardware wallets — and the reliance on Ledger Live software, which some privacy-focused users find concerning due to its closed-source nature. If you are looking for maximum XRPL ecosystem access (DEX, NFTs, AMM), you will need to pair the Nano X with a software wallet like Xaman, as Ledger Live does not support these features natively."
        ]
      }
    ]
  },
  crossmark: {
    name: "Crossmark",
    taglineKey: "walletDetail.crossmark.tagline",
    rating: 4.7,
    typeKey: "wallet.type.browserExt",
    price: "Free",
    platforms: ["Chrome", "Firefox", "Brave", "Edge"],
    website: "crossmark.io",
    affiliateLink: "https://crossmark.io/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.crossmark.description",
    featureKeys: [
      "walletDetail.crossmark.feature1",
      "walletDetail.crossmark.feature2",
      "walletDetail.crossmark.feature3",
      "walletDetail.crossmark.feature4",
      "walletDetail.crossmark.feature5",
      "walletDetail.crossmark.feature6",
      "walletDetail.crossmark.feature7",
      "walletDetail.crossmark.feature8"
    ],
    proKeys: [
      "walletDetail.crossmark.pro1",
      "walletDetail.crossmark.pro2",
      "walletDetail.crossmark.pro3",
      "walletDetail.crossmark.pro4",
      "walletDetail.crossmark.pro5",
      "walletDetail.crossmark.pro6"
    ],
    conKeys: [
      "walletDetail.crossmark.con1",
      "walletDetail.crossmark.con2",
      "walletDetail.crossmark.con3",
      "walletDetail.crossmark.con4"
    ],
    bestForKey: "walletDetail.crossmark.bestFor",
    securityFeatureKeys: [
      "walletDetail.crossmark.security1",
      "walletDetail.crossmark.security2",
      "walletDetail.crossmark.security3",
      "walletDetail.crossmark.security4",
      "walletDetail.crossmark.security5",
      "walletDetail.crossmark.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "Crossmark fills an important gap in the XRPL wallet landscape: a browser extension wallet that brings the convenience of MetaMask-style interaction to the XRP Ledger. For users who spend most of their time on desktop browsers and want to interact with XRPL-based web applications without reaching for their phone, Crossmark provides a seamless, purpose-built experience. It supports Chrome, Firefox, Brave, and Edge, covering the vast majority of desktop users.",
          "The extension installs in seconds and the setup process is straightforward. You can create a new XRPL account or import an existing one using a seed phrase or secret key. The interface is compact but well-organized, showing your XRP balance, token holdings, and recent transaction history in a clean, modern layout that avoids the cluttered feel of some competing extensions."
        ]
      },
      {
        heading: "User Experience and Daily Use",
        paragraphs: [
          "Crossmark's primary strength is its integration with XRPL web applications. When you visit a compatible dApp or DEX, Crossmark injects the necessary connection layer automatically, allowing the website to request transaction signatures just as MetaMask does for Ethereum. This makes interacting with XRPL-based DEXs, NFT marketplaces, and token platforms feel natural for anyone who has used browser-based wallets on other chains.",
          "The wallet supports multiple accounts, trustline management, and token operations. Sending XRP or tokens is quick — the popup interface handles destination addresses, tags, and memo fields clearly. For developers and power users, Crossmark also exposes an API that makes it easy to integrate XRPL functionality into web projects, which has helped it gain adoption among XRPL application builders."
        ]
      },
      {
        heading: "Security Considerations",
        paragraphs: [
          "As a browser extension wallet, Crossmark operates in a different security context than hardware wallets or dedicated mobile apps. Your encrypted keys are stored within the browser's extension storage, protected by your password. This means your security is directly tied to the security of your browser and computer. If your machine is compromised by malware, a browser extension wallet is more vulnerable than a hardware wallet.",
          "Crossmark mitigates these risks through encrypted local storage, automatic locking after periods of inactivity, and clear transaction confirmation screens that display all details before you sign. The wallet does not transmit your keys to any external servers. For users managing smaller amounts for active trading and dApp interaction, this security level is appropriate and practical. For larger holdings, we recommend pairing Crossmark with a hardware wallet for cold storage."
        ]
      },
      {
        heading: "Who Should Use Crossmark",
        paragraphs: [
          "Crossmark is the right wallet for desktop-first users who want to interact with XRPL web applications without switching to a mobile device. It is especially valuable for developers building on the XRPL, active DEX traders who prefer a browser-based workflow, and users coming from Ethereum or other EVM chains who are familiar with the browser extension wallet pattern.",
          "It is not ideal as a sole wallet for large holdings due to the inherent security trade-offs of browser extensions, and it lacks some of the mobile-specific features that Xaman provides. The best approach for most users is to use Crossmark alongside a mobile or hardware wallet — Crossmark for desktop dApp interaction and DEX trading, and a more secure wallet for long-term storage."
        ]
      }
    ]
  },
  bifrost: {
    name: "Bifrost Wallet",
    taglineKey: "walletDetail.bifrost.tagline",
    rating: 4.6,
    typeKey: "wallet.type.mobileApp",
    price: "Free",
    platforms: ["iOS", "Android"],
    website: "bifrostwallet.com",
    affiliateLink: "https://bifrostwallet.com/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.bifrost.description",
    featureKeys: [
      "walletDetail.bifrost.feature1",
      "walletDetail.bifrost.feature2",
      "walletDetail.bifrost.feature3",
      "walletDetail.bifrost.feature4",
      "walletDetail.bifrost.feature5",
      "walletDetail.bifrost.feature6",
      "walletDetail.bifrost.feature7",
      "walletDetail.bifrost.feature8"
    ],
    proKeys: [
      "walletDetail.bifrost.pro1",
      "walletDetail.bifrost.pro2",
      "walletDetail.bifrost.pro3",
      "walletDetail.bifrost.pro4",
      "walletDetail.bifrost.pro5",
      "walletDetail.bifrost.pro6"
    ],
    conKeys: [
      "walletDetail.bifrost.con1",
      "walletDetail.bifrost.con2",
      "walletDetail.bifrost.con3",
      "walletDetail.bifrost.con4"
    ],
    bestForKey: "walletDetail.bifrost.bestFor",
    securityFeatureKeys: [
      "walletDetail.bifrost.security1",
      "walletDetail.bifrost.security2",
      "walletDetail.bifrost.security3",
      "walletDetail.bifrost.security4",
      "walletDetail.bifrost.security5",
      "walletDetail.bifrost.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "Bifrost Wallet positions itself as a multi-chain mobile wallet that gives the XRPL ecosystem first-class treatment alongside other major blockchains. Available on both iOS and Android, Bifrost supports XRP, Ethereum, Polygon, Solana, and several other chains — but its XRPL integration goes well beyond simple send-and-receive. The wallet provides native access to the XRPL decentralized exchange, trustline management, and token swaps, making it one of the most feature-rich multi-chain options for XRP holders.",
          "The app's interface is modern and polished, with a dark theme and smooth animations that make managing your portfolio feel premium. Unlike some multi-chain wallets that treat every chain identically with a bare-bones interface, Bifrost has clearly invested in understanding and supporting the unique features of each blockchain it connects to."
        ]
      },
      {
        heading: "User Experience and Daily Use",
        paragraphs: [
          "Bifrost's onboarding is standard for a self-custody mobile wallet: create a new wallet, write down your seed phrase, and set up biometric or PIN authentication. What sets it apart is the built-in DEX aggregator that lets you swap tokens across supported chains directly from the wallet. For XRPL users specifically, you can trade on the native XRPL DEX without needing a separate application, view your trustlines, and manage issued tokens — features that many competing multi-chain wallets simply do not offer.",
          "The portfolio view aggregates your holdings across all connected chains into a single dashboard with real-time price data. Transaction history is well-organized by chain, and the wallet provides clear network fee estimates before you confirm any transaction. For users who hold assets on both the XRPL and EVM-compatible chains, Bifrost eliminates the need to juggle multiple wallet apps."
        ]
      },
      {
        heading: "Security and Privacy",
        paragraphs: [
          "Bifrost is a non-custodial wallet, meaning your private keys are generated on your device and never shared with Bifrost's servers. The wallet encrypts stored keys and supports both biometric unlock and PIN codes. Like other mobile software wallets, the security ultimately depends on the security of your device itself — a compromised phone could potentially expose your keys.",
          "The wallet does not require KYC or account registration, which is a plus for privacy-conscious users. However, because Bifrost is a closed-source application, you are placing trust in the development team to handle your keys responsibly. This is a trade-off worth considering, particularly if you are managing large holdings. For significant amounts, pairing Bifrost with a hardware wallet for cold storage remains the prudent approach."
        ]
      },
      {
        heading: "Who Should Use Bifrost",
        paragraphs: [
          "Bifrost is ideal for users who hold assets across multiple blockchains and want a single mobile app to manage everything. Its strong XRPL support — including native DEX trading and trustline management — makes it a standout among multi-chain wallets. If you regularly move between XRP and tokens on Ethereum, Solana, or Polygon, Bifrost provides a unified experience that saves you from switching between separate wallet apps.",
          "Where it falls short is in XRPL-specific depth compared to Xaman. Bifrost does not support xApps, the XRPL NFT ecosystem, or some of the more advanced ledger features that Xaman provides. It is best used as a complementary wallet for users who need multi-chain access, rather than as a replacement for a dedicated XRPL wallet."
        ]
      }
    ]
  },
  gatehub: {
    name: "GateHub",
    taglineKey: "walletDetail.gatehub.tagline",
    rating: 4.4,
    typeKey: "wallet.type.webWallet",
    price: "Free",
    platforms: ["Web", "iOS", "Android"],
    website: "gatehub.net",
    affiliateLink: "https://gatehub.net/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.gatehub.description",
    featureKeys: [
      "walletDetail.gatehub.feature1",
      "walletDetail.gatehub.feature2",
      "walletDetail.gatehub.feature3",
      "walletDetail.gatehub.feature4",
      "walletDetail.gatehub.feature5",
      "walletDetail.gatehub.feature6",
      "walletDetail.gatehub.feature7",
      "walletDetail.gatehub.feature8"
    ],
    proKeys: [
      "walletDetail.gatehub.pro1",
      "walletDetail.gatehub.pro2",
      "walletDetail.gatehub.pro3",
      "walletDetail.gatehub.pro4",
      "walletDetail.gatehub.pro5",
      "walletDetail.gatehub.pro6"
    ],
    conKeys: [
      "walletDetail.gatehub.con1",
      "walletDetail.gatehub.con2",
      "walletDetail.gatehub.con3",
      "walletDetail.gatehub.con4"
    ],
    bestForKey: "walletDetail.gatehub.bestFor",
    securityFeatureKeys: [
      "walletDetail.gatehub.security1",
      "walletDetail.gatehub.security2",
      "walletDetail.gatehub.security3",
      "walletDetail.gatehub.security4",
      "walletDetail.gatehub.security5",
      "walletDetail.gatehub.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "GateHub occupies a unique position in the XRPL ecosystem as both a web-based wallet and a regulated gateway service. Founded in 2014 in Ljubljana, Slovenia, GateHub is one of the longest-running platforms connected to the XRP Ledger and has been a licensed Virtual Asset Service Provider under EU regulations. Unlike pure self-custody wallets, GateHub offers a hybrid experience that combines the accessibility of a web wallet with integrated trading, fiat on-ramp, and gateway services that let users interact with issued currencies on the XRPL.",
          "Accessing GateHub requires creating an account through their website, completing KYC verification, and setting up two-factor authentication. The web-based interface loads in any modern browser and presents your wallets, balances, and transaction history in a dashboard layout that will feel familiar to anyone who has used online banking or exchange platforms."
        ]
      },
      {
        heading: "User Experience and Trading Features",
        paragraphs: [
          "GateHub's strongest feature is its role as a gateway to issued currencies on the XRPL. Through GateHub, you can hold and trade tokenized versions of fiat currencies, Bitcoin, Ethereum, and other assets — all settled on the XRP Ledger. This makes GateHub one of the few platforms where you can truly experience the XRPL's original vision as a multi-currency payment network. The built-in trading interface connects directly to the XRPL DEX, showing live order books and allowing limit and market orders.",
          "The platform also supports fiat deposits and withdrawals in several currencies, making it possible to move money between traditional banking and the XRPL without using a separate exchange. For European users in particular, GateHub's SEPA integration provides a convenient fiat on-ramp. The wallet supports multiple XRPL accounts and provides clear views of trustlines, issued tokens, and payment paths."
        ]
      },
      {
        heading: "Security and Regulatory Compliance",
        paragraphs: [
          "GateHub's security model differs from self-custody wallets. While GateHub accounts can be configured as hosted or managed wallets, the platform holds encryption keys on its servers — meaning you are trusting GateHub with custody of your funds to some degree. The platform implements two-factor authentication, encryption at rest, and regular security audits. GateHub's EU regulatory license also means it is subject to anti-money-laundering and consumer protection requirements.",
          "It is important to note that GateHub experienced a security incident in 2019 where approximately 23 million XRP was stolen from user accounts. The platform has since significantly upgraded its security infrastructure. However, the incident serves as a reminder that web-based custodial wallets carry counterparty risk that self-custody wallets do not. For users holding significant amounts, we recommend using GateHub primarily for trading and gateway services while keeping long-term holdings in a self-custody wallet."
        ]
      },
      {
        heading: "Who Should Use GateHub",
        paragraphs: [
          "GateHub is best suited for users who want to experience the full breadth of the XRPL as a multi-currency payment network. If you want to trade issued currencies on the XRPL DEX, move money between fiat and crypto, or explore the gateway system that makes the XRPL unique among blockchains, GateHub provides access that few other platforms match. Its regulatory compliance also makes it appealing for users who prefer to work with licensed, accountable platforms.",
          "It is not the right choice for users who prioritize self-custody above all else, or for those who want a lightweight mobile wallet experience. GateHub is a web-based platform with KYC requirements — it trades the privacy and autonomy of self-custody wallets for convenience, regulatory clarity, and fiat integration."
        ]
      }
    ]
  },
  trustwallet: {
    name: "Trust Wallet",
    taglineKey: "walletDetail.trustwallet.tagline",
    rating: 4.5,
    typeKey: "wallet.type.mobileApp",
    price: "Free",
    platforms: ["iOS", "Android", "Browser Extension"],
    website: "trustwallet.com",
    affiliateLink: "https://trustwallet.com/?ref=allthingsxrpl",
    descriptionKey: "walletDetail.trustwallet.description",
    featureKeys: [
      "walletDetail.trustwallet.feature1",
      "walletDetail.trustwallet.feature2",
      "walletDetail.trustwallet.feature3",
      "walletDetail.trustwallet.feature4",
      "walletDetail.trustwallet.feature5",
      "walletDetail.trustwallet.feature6",
      "walletDetail.trustwallet.feature7",
      "walletDetail.trustwallet.feature8"
    ],
    proKeys: [
      "walletDetail.trustwallet.pro1",
      "walletDetail.trustwallet.pro2",
      "walletDetail.trustwallet.pro3",
      "walletDetail.trustwallet.pro4",
      "walletDetail.trustwallet.pro5",
      "walletDetail.trustwallet.pro6"
    ],
    conKeys: [
      "walletDetail.trustwallet.con1",
      "walletDetail.trustwallet.con2",
      "walletDetail.trustwallet.con3",
      "walletDetail.trustwallet.con4"
    ],
    bestForKey: "walletDetail.trustwallet.bestFor",
    securityFeatureKeys: [
      "walletDetail.trustwallet.security1",
      "walletDetail.trustwallet.security2",
      "walletDetail.trustwallet.security3",
      "walletDetail.trustwallet.security4",
      "walletDetail.trustwallet.security5",
      "walletDetail.trustwallet.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "Trust Wallet is one of the most widely used mobile cryptocurrency wallets in the world, with over 60 million active users across iOS and Android. Originally acquired by Binance in 2018, Trust Wallet has since operated as an independent, open-source project while benefiting from the resources and integrations that come with the Binance ecosystem. The wallet supports a staggering number of blockchains and tokens — over 100 chains and millions of assets — making it one of the broadest multi-chain wallets available.",
          "For XRP holders, Trust Wallet provides basic but reliable support: you can send, receive, and store XRP with a straightforward interface. The app's design is clean and approachable, with a portfolio overview that shows real-time values and price charts for each asset. While it does not offer the XRPL-specific depth of wallets like Xaman or Bifrost, its sheer breadth of chain support and massive user community make it a practical choice for users with diversified portfolios."
        ]
      },
      {
        heading: "User Experience and Ecosystem",
        paragraphs: [
          "Trust Wallet's onboarding is among the simplest in the industry. Download the app, create a wallet, back up your 12-word seed phrase, and you are ready to go. Adding XRP requires no special configuration — the wallet automatically supports it alongside your other assets. The built-in swap feature allows you to trade between supported tokens, and the integrated dApp browser provides access to DeFi applications primarily on EVM-compatible chains.",
          "The wallet also features a built-in staking mechanism for certain assets, a token discovery tool for finding new projects, and push notifications for incoming transactions. The UI scales well whether you hold two coins or two hundred, with search and filtering options that keep things manageable. For XRP specifically, Trust Wallet handles destination tags and basic transaction parameters, though it does not support advanced XRPL features like trustlines, the native DEX, or NFTs."
        ]
      },
      {
        heading: "Security Model",
        paragraphs: [
          "Trust Wallet is fully non-custodial and open-source, meaning anyone can audit the code that handles your private keys. Keys are generated on your device and encrypted locally — Trust Wallet's servers never see them. The wallet supports biometric authentication (Face ID, fingerprint) and a separate passphrase for additional protection. The open-source nature of the project provides transparency that many competing wallets do not offer.",
          "The primary security consideration with Trust Wallet is the same as with any software wallet: your keys are only as secure as your device. If your phone is compromised by malware, a software wallet can be vulnerable. Trust Wallet's popularity also makes it a frequent target for phishing scams — fake versions of the app and fraudulent support accounts are common. Always download Trust Wallet from official app stores and never share your seed phrase with anyone."
        ]
      },
      {
        heading: "Who Should Use Trust Wallet",
        paragraphs: [
          "Trust Wallet is the right choice for users who hold a diverse portfolio across many different blockchains and want a single, free, well-established app to manage everything. Its massive user base means the app is thoroughly tested, frequently updated, and backed by an active community. For XRP holders who also participate in the Ethereum, BNB Chain, or Solana ecosystems, Trust Wallet provides convenient cross-chain access.",
          "However, Trust Wallet is not the best wallet if the XRPL is your primary focus. It lacks support for the XRPL DEX, trustlines, AMM, NFTs, and xApps — features that dedicated XRPL wallets like Xaman provide. If you want the full XRPL experience, Trust Wallet works best as a supplementary wallet for managing non-XRP assets while using a dedicated XRPL wallet for your XRP-related activities."
        ]
      }
    ]
  },
  ellipal: {
    name: "ELLIPAL Titan",
    taglineKey: "walletDetail.ellipal.tagline",
    rating: 4.7,
    typeKey: "wallet.type.hardware",
    price: "$169",
    platforms: ["iOS", "Android", "Air-Gapped Device"],
    website: "ellipal.com",
    affiliateLink: "https://www.ellipal.com/?rfsn=8973243.bbfab69",
    descriptionKey: "walletDetail.ellipal.description",
    featureKeys: [
      "walletDetail.ellipal.feature1",
      "walletDetail.ellipal.feature2",
      "walletDetail.ellipal.feature3",
      "walletDetail.ellipal.feature4",
      "walletDetail.ellipal.feature5",
      "walletDetail.ellipal.feature6",
      "walletDetail.ellipal.feature7",
      "walletDetail.ellipal.feature8"
    ],
    proKeys: [
      "walletDetail.ellipal.pro1",
      "walletDetail.ellipal.pro2",
      "walletDetail.ellipal.pro3",
      "walletDetail.ellipal.pro4",
      "walletDetail.ellipal.pro5",
      "walletDetail.ellipal.pro6"
    ],
    conKeys: [
      "walletDetail.ellipal.con1",
      "walletDetail.ellipal.con2",
      "walletDetail.ellipal.con3",
      "walletDetail.ellipal.con4"
    ],
    bestForKey: "walletDetail.ellipal.bestFor",
    securityFeatureKeys: [
      "walletDetail.ellipal.security1",
      "walletDetail.ellipal.security2",
      "walletDetail.ellipal.security3",
      "walletDetail.ellipal.security4",
      "walletDetail.ellipal.security5",
      "walletDetail.ellipal.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "The ELLIPAL Titan takes a radically different approach to hardware wallet security: it is completely air-gapped, with no USB port, no Bluetooth, no Wi-Fi, and no NFC. The only way to communicate with the device is through QR codes displayed on its large touchscreen. This means there is no physical or wireless connection between the Titan and any internet-connected device, eliminating an entire class of attack vectors that other hardware wallets must defend against.",
          "The Titan is a substantial device — roughly the size of a smartphone with a full-color touchscreen. It feels more like a dedicated crypto device than a USB dongle, and the build quality reflects its premium price point. The metal casing includes anti-tamper protection that will permanently destroy the device's data if someone attempts to physically open it. First impressions are that this is a serious piece of security hardware designed for users who prioritize protection above all else."
        ]
      },
      {
        heading: "User Experience and QR Code Workflow",
        paragraphs: [
          "Using the ELLIPAL Titan requires a companion app on your smartphone. The workflow goes like this: compose a transaction in the ELLIPAL mobile app, generate a QR code, scan the QR code with the Titan's camera, review and confirm the transaction on the Titan's screen, and then scan the Titan's response QR code with your phone to broadcast the signed transaction. This two-way QR code dance takes a few seconds and becomes second nature after a few uses.",
          "The touchscreen interface on the Titan itself is responsive and well-designed. Setting up the device, managing accounts, and reviewing transaction details are all done directly on the Titan's screen. The device supports over 10,000 tokens across 51 blockchains, including full XRP support. For XRPL users, the wallet handles standard send-and-receive operations cleanly, though it does not support XRPL-specific features like the DEX, trustlines, or NFTs."
        ]
      },
      {
        heading: "Security Analysis",
        paragraphs: [
          "The air-gapped design is the Titan's defining security feature. Because there is no electronic connection to any other device, remote attacks are essentially impossible. A hacker would need physical possession of both your Titan device and your PIN to access your funds — and even then, the anti-tamper protection would destroy the data if they tried to disassemble the hardware. The private keys are generated offline and never leave the device.",
          "The QR code-only communication channel is both a strength and a limitation. On the security side, QR codes can only contain a limited, well-defined set of data, making it extremely difficult for malicious code to be transmitted to the device. On the usability side, the QR scanning process adds steps compared to USB or Bluetooth wallets. The Titan also supports seed phrase backup (12 or 24 words) and an optional passphrase for additional protection."
        ]
      },
      {
        heading: "Who Should Use ELLIPAL Titan",
        paragraphs: [
          "The ELLIPAL Titan is designed for security-conscious investors who want the highest level of protection for their crypto holdings. If you are concerned about sophisticated remote attacks, supply chain compromises, or malware on your computer, the Titan's air-gapped design provides peace of mind that no USB-connected or Bluetooth-enabled wallet can match. It is particularly well-suited for long-term holders who transact infrequently and want their assets stored in the most isolated manner possible.",
          "The trade-offs are real: the device is bulkier than a Ledger or Trezor, the QR code workflow is slower than plugging in a USB cable, and the $169 price point is at the higher end of the hardware wallet market. Users who transact frequently or want deep XRPL ecosystem access will find the Titan too cumbersome for daily use. For cold storage of significant holdings, however, the ELLIPAL Titan's security model is among the most robust available."
        ]
      }
    ]
  },
  trezor: {
    name: "Trezor Safe 3",
    taglineKey: "walletDetail.trezor.tagline",
    rating: 4.6,
    typeKey: "wallet.type.hardware",
    price: "$79",
    platforms: ["Windows", "macOS", "Linux"],
    website: "trezor.io",
    affiliateLink: "https://affil.trezor.io/aff_c?offer_id=169&aff_id=36959",
    descriptionKey: "walletDetail.trezor.description",
    featureKeys: [
      "walletDetail.trezor.feature1",
      "walletDetail.trezor.feature2",
      "walletDetail.trezor.feature3",
      "walletDetail.trezor.feature4",
      "walletDetail.trezor.feature5",
      "walletDetail.trezor.feature6",
      "walletDetail.trezor.feature7",
      "walletDetail.trezor.feature8"
    ],
    proKeys: [
      "walletDetail.trezor.pro1",
      "walletDetail.trezor.pro2",
      "walletDetail.trezor.pro3",
      "walletDetail.trezor.pro4",
      "walletDetail.trezor.pro5",
      "walletDetail.trezor.pro6"
    ],
    conKeys: [
      "walletDetail.trezor.con1",
      "walletDetail.trezor.con2",
      "walletDetail.trezor.con3",
      "walletDetail.trezor.con4"
    ],
    bestForKey: "walletDetail.trezor.bestFor",
    securityFeatureKeys: [
      "walletDetail.trezor.security1",
      "walletDetail.trezor.security2",
      "walletDetail.trezor.security3",
      "walletDetail.trezor.security4",
      "walletDetail.trezor.security5",
      "walletDetail.trezor.security6"
    ],
    review: [
      {
        heading: "Overview and First Impressions",
        paragraphs: [
          "The Trezor Safe 3 represents the latest evolution from SatoshiLabs, the Czech company that invented the hardware wallet category back in 2013. As the successor to the beloved Trezor One, the Safe 3 adds a secure element chip (Optiga Trust M) while maintaining Trezor's commitment to open-source firmware and transparent security practices. It is a compact, affordable device that strikes a careful balance between security, usability, and price.",
          "The Safe 3 is smaller than a USB flash drive, with a simple monochrome display and a single button for navigation. It connects to your computer via USB-C, which is a welcome upgrade from the micro-USB ports on older Trezor models. The build quality is solid plastic — functional rather than premium, but lightweight and easy to carry. The device works with Trezor Suite, an open-source desktop and web application that serves as your command center for managing accounts and transactions."
        ]
      },
      {
        heading: "User Experience and Trezor Suite",
        paragraphs: [
          "Setting up the Trezor Safe 3 is straightforward: install Trezor Suite, connect the device, follow the firmware initialization process, and write down your 12 or 24-word seed phrase. The setup wizard is clear and well-paced, with helpful explanations at each step. Trezor Suite itself is one of the best hardware wallet companion applications available — clean, responsive, and packed with features including portfolio tracking, transaction history, built-in exchange integration, and coin management.",
          "For XRP holders, the Trezor Safe 3 provides solid support through Trezor Suite. You can send and receive XRP, view your balance and transaction history, and manage your account directly from the desktop app. The device displays transaction details on its screen for physical verification before signing. While Trezor supports over 9,000 coins and tokens, it does not natively support XRPL-specific features like the DEX, trustlines, or NFTs — for those, you would need a dedicated XRPL wallet."
        ]
      },
      {
        heading: "Security Philosophy",
        paragraphs: [
          "Trezor's approach to security is distinctive in the hardware wallet industry: the firmware is fully open-source. Anyone can inspect, audit, or compile the code running on the device. This transparency is a significant advantage for users who want to verify exactly how their keys are being handled, and it has allowed the security community to identify and help fix vulnerabilities over the years. The Safe 3's addition of a secure element chip addresses one of the main criticisms of earlier Trezor models, which relied solely on a general-purpose microcontroller.",
          "The seed phrase is your sole backup, and Trezor provides Shamir Backup (SLIP-39) support for advanced users who want to split their seed into multiple shares distributed across different locations. The device supports passphrase protection, PIN entry with randomized keypad, and wipe-after-failed-attempts policies. One trade-off to be aware of: because the firmware is open-source, sophisticated physical attacks against older Trezor models have been demonstrated by security researchers — though the Safe 3's secure element chip significantly raises the bar."
        ]
      },
      {
        heading: "Who Should Use Trezor Safe 3",
        paragraphs: [
          "The Trezor Safe 3 is an excellent choice for users who value transparency and open-source principles in their security tools. At $79, it is one of the most affordable hardware wallets with a secure element chip, making it accessible for users who want cold storage without the premium price of a Ledger Nano X or ELLIPAL Titan. The Trezor Suite software is a genuine pleasure to use, and the device's long track record provides confidence in its reliability.",
          "The main limitations for XRP users are similar to other multi-chain hardware wallets: no XRPL DEX access, no trustline management, and no xApp compatibility. If the XRPL ecosystem is your focus, the Trezor Safe 3 works best as a cold storage companion to a dedicated XRPL wallet. For users who primarily want to secure their XRP holdings long-term and occasionally send transactions, it is a trustworthy, affordable option backed by the team that pioneered the entire hardware wallet category."
        ]
      }
    ]
  }
};

export default function WalletReview() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const wallet = walletData[slug || ""];

  if (!wallet) {
    return (
      <Layout>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("walletReview.notFound")}</h1>
          <p className="text-muted-foreground mb-8">{t("walletReview.notFoundDesc")}</p>
          <Button asChild>
            <Link href="/#wallets">{t("walletReview.viewAll")}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/#wallets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t("walletReview.backToComparison")}
        </Link>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-5">
              {logoMap[slug || ""] && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 bg-black/40 flex-shrink-0 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]">
                  <img src={logoMap[slug || ""]} alt={wallet.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <div className="text-sm text-primary font-display mb-2">{t(wallet.typeKey)}</div>
                <h1 className="text-3xl md:text-4xl font-black font-display mb-2">{wallet.name}</h1>
                <p className="text-xl text-muted-foreground">{t(wallet.taglineKey)}</p>
              </div>
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
            {t(wallet.descriptionKey)}
          </p>

          <a 
            href={wallet.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 !px-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
            data-testid={`button-get-${slug}`}
          >
            {t("walletReview.get")} {wallet.name} <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {wallet.review && wallet.review.length > 0 && (
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8" data-testid={`section-review-${slug}`}>
            <h2 className="text-2xl font-bold font-display mb-8">In-Depth Review</h2>
            {wallet.review.map((section, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <h3 className="text-xl font-bold font-display mb-4 text-primary">{section.heading}</h3>
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-4">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              {t("walletReview.pros")}
            </h2>
            <ul className="space-y-2">
              {wallet.proKeys.map((proKey) => (
                <li key={proKey} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-1" />
                  {t(proKey)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              {t("walletReview.cons")}
            </h2>
            <ul className="space-y-2">
              {wallet.conKeys.map((conKey) => (
                <li key={conKey} className="flex items-start gap-2 text-muted-foreground">
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-1" />
                  {t(conKey)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t("walletReview.keyFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {wallet.featureKeys.map((featureKey) => (
              <div key={featureKey} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {t(featureKey)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            {t("walletReview.securityFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {wallet.securityFeatureKeys.map((featureKey) => (
              <div key={featureKey} className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 text-secondary shrink-0" />
                {t(featureKey)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold font-display mb-2">{t("walletReview.bestFor")}</h2>
          <p className="text-muted-foreground">{t(wallet.bestForKey)}</p>
        </div>

        <div className="text-center pb-8">
          <a 
            href={wallet.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 !px-12 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-lg transition-colors"
          >
            {t("walletReview.get")} {wallet.name} {t("walletReview.getToday")} <ExternalLink className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("walletReview.affiliateDisclaimer")}
          </p>
        </div>
      </div>
    </Layout>
  );
}
