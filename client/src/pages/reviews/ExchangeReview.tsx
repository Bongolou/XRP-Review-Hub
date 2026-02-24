import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { 
  Star, 
  Shield, 
  DollarSign,
  Globe,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowLeft,
  Gift
} from "lucide-react";
import upholdLogo from "@/assets/logos/uphold-logo.webp";
import bitrueLogo from "@/assets/logos/bitrue-logo.webp";
import krakenLogo from "@/assets/logos/kraken-logo.webp";
import bitstampLogo from "@/assets/logos/bitstamp-logo.webp";
import coinbaseLogo from "@/assets/logos/coinbase-logo.webp";
import cryptocomLogo from "@/assets/logos/cryptocom-logo.webp";
import kucoinLogo from "@/assets/logos/kucoin-logo.webp";

const logoMap: Record<string, string> = {
  uphold: upholdLogo,
  bitrue: bitrueLogo,
  kraken: krakenLogo,
  bitstamp: bitstampLogo,
  coinbase: coinbaseLogo,
  cryptocom: cryptocomLogo,
  kucoin: kucoinLogo
};

const exchangeData: Record<string, {
  name: string;
  taglineKey: string;
  rating: number;
  typeKey: string;
  founded: string;
  headquarters: string;
  website: string;
  affiliateLink: string;
  bonusKey: string;
  descriptionKey: string;
  featureKeys: string[];
  proKeys: string[];
  conKeys: string[];
  bestForKey: string;
  fees: {
    trading: string;
    deposit: string;
    withdrawal: string;
  };
  paymentMethodKeys: string[];
  supportedCountriesKey: string;
  review: { heading: string; paragraphs: string[] }[];
}> = {
  uphold: {
    name: "Uphold",
    taglineKey: "exchangeDetail.uphold.tagline",
    rating: 4.5,
    typeKey: "exchangeDetail.uphold.type",
    founded: "2015",
    headquarters: "New York, USA",
    website: "uphold.com",
    affiliateLink: "https://uphold.com/sign-up?referral=allthingsxrpl",
    bonusKey: "exchangeDetail.uphold.bonus",
    descriptionKey: "exchangeDetail.uphold.description",
    featureKeys: [
      "exchangeDetail.uphold.feature1",
      "exchangeDetail.uphold.feature2",
      "exchangeDetail.uphold.feature3",
      "exchangeDetail.uphold.feature4",
      "exchangeDetail.uphold.feature5",
      "exchangeDetail.uphold.feature6",
      "exchangeDetail.uphold.feature7",
      "exchangeDetail.uphold.feature8"
    ],
    proKeys: [
      "exchangeDetail.uphold.pro1",
      "exchangeDetail.uphold.pro2",
      "exchangeDetail.uphold.pro3",
      "exchangeDetail.uphold.pro4",
      "exchangeDetail.uphold.pro5",
      "exchangeDetail.uphold.pro6"
    ],
    conKeys: [
      "exchangeDetail.uphold.con1",
      "exchangeDetail.uphold.con2",
      "exchangeDetail.uphold.con3",
      "exchangeDetail.uphold.con4"
    ],
    bestForKey: "exchangeDetail.uphold.bestFor",
    fees: {
      trading: "0% (spread only, ~1-2%)",
      deposit: "Free (ACH), 3.99% (card)",
      withdrawal: "Network fees only"
    },
    paymentMethodKeys: ["exchangeDetail.payment.bankTransfer", "exchangeDetail.payment.debitCard", "exchangeDetail.payment.wire", "exchangeDetail.payment.crypto"],
    supportedCountriesKey: "exchangeDetail.uphold.countries",
    review: [
      {
        heading: "Overview and Platform History",
        paragraphs: [
          "Uphold has carved out a unique position in the cryptocurrency exchange landscape, particularly for XRP holders in the United States. While many US-based exchanges delisted XRP during the SEC lawsuit against Ripple, Uphold maintained continuous XRP trading throughout — a decision that earned it significant loyalty from the XRP community. Founded in 2015 and headquartered in New York, Uphold operates as a regulated money services business and holds licenses in multiple US states and international jurisdictions.",
          "The platform positions itself as a multi-asset platform rather than a pure cryptocurrency exchange. In addition to over 250 cryptocurrencies, Uphold supports trading in precious metals, US equities, and environmental assets. This breadth makes it appealing for users who want a single platform for diversified investing, though the core user base remains primarily cryptocurrency-focused."
        ]
      },
      {
        heading: "Trading Experience and Fees",
        paragraphs: [
          "Uphold's trading interface takes an unconventional approach: instead of traditional order books with maker-taker fees, the platform uses a spread-based pricing model. When you buy or sell XRP, the quoted price includes a spread that serves as Uphold's fee. This spread typically ranges from 0.8% to 1.2% for XRP, which is higher than the maker-taker fees on exchanges like Kraken or Coinbase Pro, but the simplicity appeals to users who prefer knowing the exact cost upfront.",
          "One of Uphold's standout features is the Anything-to-Anything trading engine. You can convert directly between any two supported assets without needing to go through a base pair. This means you can swap XRP for gold, or Bitcoin for Apple stock, in a single transaction. For XRP traders, the platform also supports automated recurring purchases and price alerts, making it easy to dollar-cost-average into your position over time."
        ]
      },
      {
        heading: "Security and Regulation",
        paragraphs: [
          "Uphold maintains a transparent reserve model, publishing quarterly attestations that verify the platform holds sufficient assets to cover all customer balances. This level of transparency is uncommon among exchanges and addresses one of the primary concerns users have about centralized platforms. The company implements industry-standard security practices including cold storage for the majority of assets, two-factor authentication, and regular third-party security audits.",
          "As a US-regulated entity, Uphold complies with KYC and AML requirements, which means you will need to verify your identity before trading. The platform also offers a debit card in select regions that allows you to spend your crypto holdings directly, though availability varies by jurisdiction. Customer support has historically been a point of criticism, with some users reporting slow response times during peak periods."
        ]
      },
      {
        heading: "Who Should Use Uphold",
        paragraphs: [
          "Uphold is the strongest choice for US-based XRP buyers who want a straightforward, regulated platform that has consistently supported XRP. If your primary goal is to buy and hold XRP with fiat currency, Uphold makes the process simple and transparent. The multi-asset support is a bonus for users interested in diversifying beyond cryptocurrency. The platform's $20 BTC welcome bonus for new users provides a small incentive to try the service.",
          "Where Uphold falls short is for advanced traders who want low fees, deep liquidity, and traditional order book functionality. The spread-based pricing model costs more than competitors like Kraken or Coinbase for frequent trading. If you plan to actively trade XRP rather than buy and hold, you may find better pricing elsewhere. For buy-and-hold investors, however, Uphold's simplicity, regulation, and XRP loyalty make it a compelling choice."
        ]
      }
    ]
  },
  bitrue: {
    name: "Bitrue",
    taglineKey: "exchangeDetail.bitrue.tagline",
    rating: 4.3,
    typeKey: "exchangeDetail.bitrue.type",
    founded: "2018",
    headquarters: "Singapore",
    website: "bitrue.com",
    affiliateLink: "https://www.bitrue.com/activity/task/task-landing?inviteCode=ALLTHINGSXRPL",
    bonusKey: "exchangeDetail.bitrue.bonus",
    descriptionKey: "exchangeDetail.bitrue.description",
    featureKeys: [
      "exchangeDetail.bitrue.feature1",
      "exchangeDetail.bitrue.feature2",
      "exchangeDetail.bitrue.feature3",
      "exchangeDetail.bitrue.feature4",
      "exchangeDetail.bitrue.feature5",
      "exchangeDetail.bitrue.feature6",
      "exchangeDetail.bitrue.feature7",
      "exchangeDetail.bitrue.feature8"
    ],
    proKeys: [
      "exchangeDetail.bitrue.pro1",
      "exchangeDetail.bitrue.pro2",
      "exchangeDetail.bitrue.pro3",
      "exchangeDetail.bitrue.pro4",
      "exchangeDetail.bitrue.pro5",
      "exchangeDetail.bitrue.pro6"
    ],
    conKeys: [
      "exchangeDetail.bitrue.con1",
      "exchangeDetail.bitrue.con2",
      "exchangeDetail.bitrue.con3",
      "exchangeDetail.bitrue.con4"
    ],
    bestForKey: "exchangeDetail.bitrue.bestFor",
    fees: {
      trading: "0.098% maker/taker",
      deposit: "Free",
      withdrawal: "0.25 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.crypto", "exchangeDetail.payment.creditCard", "exchangeDetail.payment.p2p"],
    supportedCountriesKey: "exchangeDetail.bitrue.countries",
    review: [
      {
        heading: "Overview and XRP Community Ties",
        paragraphs: [
          "Bitrue has built its reputation squarely around the XRP community. Based in Singapore with operations since 2018, Bitrue was among the earliest exchanges to aggressively support XRP and XRPL-based tokens, offering trading pairs and staking rewards that few other platforms matched. This early commitment earned Bitrue a dedicated following among XRP enthusiasts, and the platform continues to position itself as the most XRP-friendly exchange in the market.",
          "The exchange lists over 700 cryptocurrencies with more than 800 trading pairs, but its XRP offerings are the headline act. Bitrue supports a wide range of XRPL-issued tokens and has historically been quick to list new XRPL projects. The platform also ran a significant XRP airdrop program and offers yield farming products specifically designed for XRP holders, giving the community additional reasons to choose Bitrue over larger but less XRP-focused competitors."
        ]
      },
      {
        heading: "Trading Features and Yield Products",
        paragraphs: [
          "Bitrue offers a full-featured trading experience with spot markets, futures trading (up to 150x leverage), and an OTC desk for large orders. The trading interface is functional and well-organized, with real-time order books, charting tools powered by TradingView, and multiple order types including limit, market, and stop-loss orders. Fees start at 0.098% for spot trading, which is competitive with major exchanges.",
          "The platform's yield products are a major draw. Power Piggy, Bitrue's flexible staking service, offers daily interest payments on XRP and other supported assets. Yield farming pools provide higher returns in exchange for locking tokens for specified periods. While the APY rates have fluctuated over time, Bitrue consistently offers some of the most attractive XRP yield opportunities in the centralized exchange space. It is important to understand that staking on a centralized exchange means trusting the platform with custody of your assets."
        ]
      },
      {
        heading: "Security and Reliability",
        paragraphs: [
          "Bitrue experienced a security breach in 2019 where approximately $4.2 million in XRP and ADA was stolen. Since that incident, the platform has invested significantly in its security infrastructure, implementing multi-signature cold storage, real-time risk monitoring, and enhanced withdrawal security protocols. The exchange now maintains insurance coverage for digital assets and publishes regular security updates.",
          "As a Singapore-based exchange, Bitrue operates under the Monetary Authority of Singapore's regulatory framework. The platform requires KYC verification for full access to trading and withdrawal features. Customer support is available via ticket system and social media, though response times can vary during high-volume periods."
        ]
      },
      {
        heading: "Who Should Use Bitrue",
        paragraphs: [
          "Bitrue is the natural choice for XRP enthusiasts who want an exchange that actively supports the XRPL ecosystem. The combination of extensive XRP trading pairs, yield products, and early token listings makes it a hub for the XRP community. If you want to earn yield on your XRP holdings or get early access to new XRPL tokens, Bitrue offers opportunities that larger exchanges typically do not.",
          "The trade-offs include being a smaller platform with less liquidity than Tier 1 exchanges, the history of a security breach (though remediated), and the counterparty risk inherent in staking on a centralized platform. For users who prioritize yield and ecosystem support over absolute security, Bitrue fills a valuable niche."
        ]
      }
    ]
  },
  kraken: {
    name: "Kraken",
    taglineKey: "exchangeDetail.kraken.tagline",
    rating: 4.6,
    typeKey: "exchangeDetail.kraken.type",
    founded: "2011",
    headquarters: "San Francisco, USA",
    website: "kraken.com",
    affiliateLink: "https://www.kraken.com/sign-up?clickid=allthingsxrpl",
    bonusKey: "exchangeDetail.kraken.bonus",
    descriptionKey: "exchangeDetail.kraken.description",
    featureKeys: [
      "exchangeDetail.kraken.feature1",
      "exchangeDetail.kraken.feature2",
      "exchangeDetail.kraken.feature3",
      "exchangeDetail.kraken.feature4",
      "exchangeDetail.kraken.feature5",
      "exchangeDetail.kraken.feature6",
      "exchangeDetail.kraken.feature7",
      "exchangeDetail.kraken.feature8"
    ],
    proKeys: [
      "exchangeDetail.kraken.pro1",
      "exchangeDetail.kraken.pro2",
      "exchangeDetail.kraken.pro3",
      "exchangeDetail.kraken.pro4",
      "exchangeDetail.kraken.pro5",
      "exchangeDetail.kraken.pro6"
    ],
    conKeys: [
      "exchangeDetail.kraken.con1",
      "exchangeDetail.kraken.con2",
      "exchangeDetail.kraken.con3",
      "exchangeDetail.kraken.con4"
    ],
    bestForKey: "exchangeDetail.kraken.bestFor",
    fees: {
      trading: "0.16% maker / 0.26% taker",
      deposit: "Free (crypto), varies (fiat)",
      withdrawal: "0.02 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.wire", "exchangeDetail.payment.ach", "exchangeDetail.payment.sepa", "exchangeDetail.payment.crypto", "exchangeDetail.payment.applePay", "exchangeDetail.payment.googlePay"],
    supportedCountriesKey: "exchangeDetail.kraken.countries",
    review: [
      {
        heading: "Overview and Industry Standing",
        paragraphs: [
          "Kraken is one of the most established and respected cryptocurrency exchanges in the world. Founded in 2011 by Jesse Powell in San Francisco, Kraken has operated continuously for over a decade without a major security breach — a remarkable track record in an industry plagued by exchange hacks. The platform serves millions of users across more than 190 countries and has been consistently rated among the top exchanges for security, reliability, and trading volume.",
          "For XRP traders, Kraken offers deep liquidity, competitive fees, and a professional-grade trading environment. The exchange maintained XRP trading in many jurisdictions throughout the Ripple-SEC dispute and has been a reliable venue for XRP price discovery. Kraken's combination of institutional-grade infrastructure and retail-friendly features makes it a strong all-around choice for serious cryptocurrency traders."
        ]
      },
      {
        heading: "Trading Platform and Features",
        paragraphs: [
          "Kraken offers two main trading interfaces: a simple buy/sell screen for beginners and Kraken Pro for advanced traders. The Pro interface features full order book visibility, TradingView-powered charting, multiple order types (market, limit, stop-loss, take-profit, trailing stop), and margin trading with up to 5x leverage on XRP. The platform also supports futures trading through a dedicated derivatives platform for institutional and professional users.",
          "Fee-wise, Kraken uses a maker-taker model with rates starting at 0.16% maker and 0.26% taker for most users, with volume discounts available up to 0.00% maker for high-volume traders. These rates are competitive with the industry's best, and significantly lower than spread-based platforms like Uphold. Kraken also offers staking services for select cryptocurrencies, though regulatory constraints have limited this feature in some jurisdictions."
        ]
      },
      {
        heading: "Security and Compliance",
        paragraphs: [
          "Security is Kraken's defining characteristic. The exchange stores 95% of deposits in air-gapped cold storage, employs full-reserve accounting, and undergoes regular proof-of-reserves audits. The platform supports comprehensive two-factor authentication options, address whitelisting, configurable account lock timers, and a dedicated security team that monitors for suspicious activity around the clock.",
          "Kraken holds licenses and registrations in multiple jurisdictions, including FinCEN registration in the United States, FCA registration in the United Kingdom, and various state money transmitter licenses. The platform's compliance infrastructure is built for institutional-grade requirements, which adds friction through KYC verification but provides legal certainty that smaller exchanges cannot match."
        ]
      },
      {
        heading: "Who Should Use Kraken",
        paragraphs: [
          "Kraken is the ideal exchange for users who prioritize security, low fees, and a mature trading platform. If you are a frequent XRP trader who wants reliable execution, deep order books, and professional charting tools, Kraken delivers an institutional-quality experience at competitive prices. The platform's decade-long security track record provides confidence that few exchanges can match.",
          "The main drawbacks are the verification process (which can take time), the less intuitive interface for complete beginners, and the limited availability of some features in certain regions due to regulatory compliance. If you want the simplest possible buying experience and are willing to pay higher fees for it, Uphold may be more suitable. For everyone else, Kraken represents one of the best risk-adjusted choices in the exchange market."
        ]
      }
    ]
  },
  bitstamp: {
    name: "Bitstamp",
    taglineKey: "exchangeDetail.bitstamp.tagline",
    rating: 4.5,
    typeKey: "exchangeDetail.bitstamp.type",
    founded: "2011",
    headquarters: "Luxembourg",
    website: "bitstamp.net",
    affiliateLink: "https://www.bitstamp.net/?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.bitstamp.bonus",
    descriptionKey: "exchangeDetail.bitstamp.description",
    featureKeys: [
      "exchangeDetail.bitstamp.feature1",
      "exchangeDetail.bitstamp.feature2",
      "exchangeDetail.bitstamp.feature3",
      "exchangeDetail.bitstamp.feature4",
      "exchangeDetail.bitstamp.feature5",
      "exchangeDetail.bitstamp.feature6",
      "exchangeDetail.bitstamp.feature7",
      "exchangeDetail.bitstamp.feature8"
    ],
    proKeys: [
      "exchangeDetail.bitstamp.pro1",
      "exchangeDetail.bitstamp.pro2",
      "exchangeDetail.bitstamp.pro3",
      "exchangeDetail.bitstamp.pro4",
      "exchangeDetail.bitstamp.pro5",
      "exchangeDetail.bitstamp.pro6"
    ],
    conKeys: [
      "exchangeDetail.bitstamp.con1",
      "exchangeDetail.bitstamp.con2",
      "exchangeDetail.bitstamp.con3",
      "exchangeDetail.bitstamp.con4"
    ],
    bestForKey: "exchangeDetail.bitstamp.bestFor",
    fees: {
      trading: "0.30% - 0.00% (volume-based)",
      deposit: "Free (SEPA), 5% (card)",
      withdrawal: "0.02 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.sepa", "exchangeDetail.payment.wire", "exchangeDetail.payment.creditCard", "exchangeDetail.payment.crypto"],
    supportedCountriesKey: "exchangeDetail.bitstamp.countries",
    review: [
      {
        heading: "Overview and Heritage",
        paragraphs: [
          "Bitstamp holds the distinction of being one of the oldest cryptocurrency exchanges still in operation. Founded in 2011 in Slovenia and now headquartered in Luxembourg, Bitstamp has weathered multiple market cycles, regulatory changes, and industry upheavals while maintaining a reputation for reliability and compliance. The exchange was one of the first to obtain a Payment Institution license under EU regulations, setting a standard for regulatory legitimacy that many newer exchanges have tried to follow.",
          "Bitstamp's approach has always been conservative and compliance-first, which appeals to institutional investors and security-conscious retail users. The exchange supports a curated selection of major cryptocurrencies including XRP, focusing on quality and regulatory clarity rather than listing every token that appears. This selectivity means fewer options but greater confidence in the legitimacy and compliance of each listed asset."
        ]
      },
      {
        heading: "Trading and Platform Experience",
        paragraphs: [
          "Bitstamp's trading interface strikes a balance between professional functionality and accessibility. The platform offers both a simplified buy/sell interface and an advanced trading view with TradingView charting, full order book visibility, and multiple order types. Trading fees follow a volume-based schedule starting at 0.30% for spot trades, decreasing to 0.00% for monthly volumes exceeding $20 billion — competitive for institutional traders though slightly higher than some competitors at lower volumes.",
          "For XRP specifically, Bitstamp provides multiple trading pairs including XRP/USD, XRP/EUR, and XRP/BTC. The platform's liquidity is solid for major pairs, and the execution quality is consistent. Bitstamp also supports automated trading via a well-documented API, making it popular with algorithmic traders and institutional desks. The mobile app mirrors the desktop experience with a clean, functional design."
        ]
      },
      {
        heading: "Security Track Record",
        paragraphs: [
          "Bitstamp suffered a notable security breach in 2015 when 19,000 BTC were stolen due to a social engineering attack targeting employees. Since then, the exchange completely overhauled its security infrastructure, partnering with BitGo for institutional-grade cold storage and implementing comprehensive security protocols. The platform now stores the vast majority of assets in multi-signature cold storage and maintains insurance coverage for digital assets held on the platform.",
          "The exchange's EU licensing requires compliance with strict data protection, capital adequacy, and operational security standards. Bitstamp regularly undergoes SOC 2 Type II audits, providing independent verification of its security controls. For users who value institutional-grade security and regulatory oversight, Bitstamp's post-2015 security posture is among the strongest in the industry."
        ]
      },
      {
        heading: "Who Should Use Bitstamp",
        paragraphs: [
          "Bitstamp is best suited for users who prioritize regulatory compliance, institutional security, and a proven track record over cutting-edge features or the lowest possible fees. European users benefit from SEPA integration and EU regulatory protections, while institutional investors appreciate the platform's API, OTC desk, and compliance infrastructure.",
          "Bitstamp is less suitable for users who want a wide variety of altcoins, advanced DeFi features, or the lowest possible trading fees. Its conservative listing approach means many smaller tokens are not available. For XRP holders specifically, Bitstamp provides a reliable, well-regulated venue for buying, selling, and holding — but with fewer community-specific features than platforms like Bitrue."
        ]
      }
    ]
  },
  coinbase: {
    name: "Coinbase",
    taglineKey: "exchangeDetail.coinbase.tagline",
    rating: 4.4,
    typeKey: "exchangeDetail.coinbase.type",
    founded: "2012",
    headquarters: "San Francisco, USA",
    website: "coinbase.com",
    affiliateLink: "https://www.coinbase.com/join?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.coinbase.bonus",
    descriptionKey: "exchangeDetail.coinbase.description",
    featureKeys: [
      "exchangeDetail.coinbase.feature1",
      "exchangeDetail.coinbase.feature2",
      "exchangeDetail.coinbase.feature3",
      "exchangeDetail.coinbase.feature4",
      "exchangeDetail.coinbase.feature5",
      "exchangeDetail.coinbase.feature6",
      "exchangeDetail.coinbase.feature7",
      "exchangeDetail.coinbase.feature8"
    ],
    proKeys: [
      "exchangeDetail.coinbase.pro1",
      "exchangeDetail.coinbase.pro2",
      "exchangeDetail.coinbase.pro3",
      "exchangeDetail.coinbase.pro4",
      "exchangeDetail.coinbase.pro5",
      "exchangeDetail.coinbase.pro6"
    ],
    conKeys: [
      "exchangeDetail.coinbase.con1",
      "exchangeDetail.coinbase.con2",
      "exchangeDetail.coinbase.con3",
      "exchangeDetail.coinbase.con4"
    ],
    bestForKey: "exchangeDetail.coinbase.bestFor",
    fees: {
      trading: "0.5% spread + flat fee",
      deposit: "Free (ACH), 3.99% (card)",
      withdrawal: "Network fees"
    },
    paymentMethodKeys: ["exchangeDetail.payment.ach", "exchangeDetail.payment.wire", "exchangeDetail.payment.debitCard", "exchangeDetail.payment.paypal", "exchangeDetail.payment.crypto"],
    supportedCountriesKey: "exchangeDetail.coinbase.countries",
    review: [
      {
        heading: "Overview and Market Position",
        paragraphs: [
          "Coinbase is the largest publicly traded cryptocurrency exchange in the United States and one of the most recognizable names in the industry. Founded in 2012 by Brian Armstrong and Fred Ehrsam, the platform went public on NASDAQ in April 2021 and serves as many investors' first introduction to cryptocurrency. With over 110 million verified users and a presence in over 100 countries, Coinbase's scale and brand recognition are unmatched in the US market.",
          "Coinbase's relationship with XRP has been complicated. The exchange delisted XRP in January 2021 in response to the SEC's lawsuit against Ripple, and did not relist it until the case reached a favorable resolution. This period left many XRP holders frustrated with the platform. Now that XRP is back on Coinbase, the exchange offers a familiar, highly accessible way to buy and sell XRP — though the trust deficit from the delisting period remains a consideration for some community members."
        ]
      },
      {
        heading: "User Experience and Product Suite",
        paragraphs: [
          "Coinbase's primary interface is designed for simplicity above all else. Buying XRP takes just a few taps: link a bank account or card, enter an amount, and confirm the purchase. This ease of use is Coinbase's greatest strength and the reason it continues to attract new users. For more sophisticated traders, Coinbase Advanced Trade (which replaced the separate Coinbase Pro platform) offers real-time order books, TradingView charting, and advanced order types within the main Coinbase app.",
          "Beyond trading, Coinbase offers a broad ecosystem: Coinbase Wallet (a separate self-custody app), Coinbase NFT marketplace, staking services, a Visa debit card for spending crypto, and educational rewards programs that pay users in cryptocurrency for watching short videos. The Coinbase Learn program is particularly valuable for newcomers who want to understand the basics of blockchain and cryptocurrency before investing."
        ]
      },
      {
        heading: "Fees and Cost Considerations",
        paragraphs: [
          "Coinbase's fee structure has been a persistent point of criticism. The simple buy/sell interface charges a spread of approximately 0.50% plus a flat transaction fee that varies by payment method and region. These costs can add up significantly for frequent traders. The Advanced Trade interface offers lower fees starting at 0.40% maker and 0.60% taker, decreasing with volume — still higher than Kraken's rates but more competitive than the simple interface.",
          "Payment method costs also vary: ACH bank transfers are typically free for deposits, debit card purchases incur a 3.99% fee, and wire transfers carry flat fees. For XRP buyers who plan to make regular purchases, the difference between Coinbase's fees and a lower-cost exchange like Kraken can amount to meaningful savings over time. The trade-off is Coinbase's unmatched ease of use and brand trust."
        ]
      },
      {
        heading: "Who Should Use Coinbase",
        paragraphs: [
          "Coinbase is the right exchange for users who value simplicity, brand trust, and regulatory certainty above all else. As a publicly traded company subject to SEC oversight and quarterly financial reporting, Coinbase operates with a level of transparency and accountability that private exchanges cannot match. For first-time crypto buyers, the platform's intuitive interface and educational resources provide a gentle on-ramp to the XRP ecosystem.",
          "Coinbase is less suitable for cost-sensitive frequent traders, XRP community loyalists who remember the delisting, or users who want access to a wide range of XRPL tokens beyond XRP itself. If keeping fees low is your priority, Kraken or Bitrue will save you money. If community alignment matters, Uphold or Bitrue have stronger track records of XRP support. But for mainstream accessibility and institutional credibility, Coinbase remains difficult to beat."
        ]
      }
    ]
  },
  cryptocom: {
    name: "Crypto.com",
    taglineKey: "exchangeDetail.cryptocom.tagline",
    rating: 4.3,
    typeKey: "exchangeDetail.cryptocom.type",
    founded: "2016",
    headquarters: "Singapore",
    website: "crypto.com",
    affiliateLink: "https://crypto.com/app?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.cryptocom.bonus",
    descriptionKey: "exchangeDetail.cryptocom.description",
    featureKeys: [
      "exchangeDetail.cryptocom.feature1",
      "exchangeDetail.cryptocom.feature2",
      "exchangeDetail.cryptocom.feature3",
      "exchangeDetail.cryptocom.feature4",
      "exchangeDetail.cryptocom.feature5",
      "exchangeDetail.cryptocom.feature6",
      "exchangeDetail.cryptocom.feature7",
      "exchangeDetail.cryptocom.feature8"
    ],
    proKeys: [
      "exchangeDetail.cryptocom.pro1",
      "exchangeDetail.cryptocom.pro2",
      "exchangeDetail.cryptocom.pro3",
      "exchangeDetail.cryptocom.pro4",
      "exchangeDetail.cryptocom.pro5",
      "exchangeDetail.cryptocom.pro6"
    ],
    conKeys: [
      "exchangeDetail.cryptocom.con1",
      "exchangeDetail.cryptocom.con2",
      "exchangeDetail.cryptocom.con3",
      "exchangeDetail.cryptocom.con4"
    ],
    bestForKey: "exchangeDetail.cryptocom.bestFor",
    fees: {
      trading: "0.075% maker / 0.075% taker",
      deposit: "Free (crypto), 2.99% (card)",
      withdrawal: "0.25 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.creditCard", "exchangeDetail.payment.bankTransfer", "exchangeDetail.payment.crypto", "exchangeDetail.payment.applePay", "exchangeDetail.payment.googlePay"],
    supportedCountriesKey: "exchangeDetail.cryptocom.countries",
    review: [
      {
        heading: "Overview and Brand Growth",
        paragraphs: [
          "Crypto.com has grown from a relatively unknown startup to one of the most visible brands in cryptocurrency, largely through aggressive marketing campaigns including naming rights to the former Staples Center in Los Angeles (now Crypto.com Arena) and partnerships with major sports leagues. Founded in 2016 and headquartered in Singapore, the platform serves over 80 million users worldwide and offers a comprehensive suite of products that extends well beyond basic exchange services.",
          "For XRP holders, Crypto.com provides a full-featured experience with spot trading, staking, a Visa debit card that can be loaded with XRP, and DeFi wallet integration. The platform's breadth of services makes it appealing for users who want an all-in-one crypto ecosystem rather than using separate platforms for trading, storing, and spending their assets."
        ]
      },
      {
        heading: "Product Ecosystem",
        paragraphs: [
          "Crypto.com's product lineup is one of the most extensive in the industry. The main app provides simple buy/sell functionality, while the Crypto.com Exchange offers professional trading features with real-time order books, margin trading, and derivatives. The Crypto.com Visa Card is a standout product — users can stake CRO (the platform's native token) to earn cashback on purchases at rates ranging from 1% to 5% depending on the stake tier. XRP can be loaded onto the card and spent anywhere Visa is accepted.",
          "Additional products include Crypto Earn (where you can deposit XRP and other assets to earn interest), a DeFi wallet for self-custody with cross-chain access, an NFT marketplace, and crypto-backed lending. The sheer scope of the ecosystem means you can buy XRP, earn yield on it, spend it with a card, and manage it in a self-custody wallet — all within the Crypto.com family of products."
        ]
      },
      {
        heading: "Fee Structure and CRO Token",
        paragraphs: [
          "Crypto.com's fee structure is intertwined with its CRO token staking system. Base trading fees start at 0.075% maker and 0.075% taker on the exchange — very competitive rates — but achieving the best fee tiers and card benefits requires staking significant amounts of CRO. This creates an incentive loop that benefits heavy platform users but adds complexity for those who simply want to buy and sell XRP.",
          "The main app's buy/sell spread is less transparent than the exchange's order book fees, and can be higher for smaller transactions. Crypto withdrawal fees vary by network and asset. For XRP users who want competitive trading fees without the CRO staking commitment, the exchange platform offers reasonable rates even at the base tier. The card's cashback rewards can partially offset trading costs for users who spend crypto regularly."
        ]
      },
      {
        heading: "Who Should Use Crypto.com",
        paragraphs: [
          "Crypto.com is ideal for users who want a complete crypto ecosystem in one place — trading, earning, spending, and self-custody. The Visa card integration is particularly compelling for users who want to use their XRP for everyday purchases. The platform's global reach and multi-product approach make it suitable for users who plan to engage deeply with the cryptocurrency economy rather than simply buying and holding.",
          "The platform is less suitable for users who want the simplest possible experience or those who are uncomfortable with the CRO staking mechanics that underpin many of the best benefits. The complexity of the product ecosystem can be overwhelming for newcomers, and some users have reported customer support challenges during peak periods. For straightforward XRP purchases, simpler platforms like Uphold or Coinbase may be easier starting points."
        ]
      }
    ]
  },
  kucoin: {
    name: "KuCoin",
    taglineKey: "exchangeDetail.kucoin.tagline",
    rating: 4.4,
    typeKey: "exchangeDetail.kucoin.type",
    founded: "2017",
    headquarters: "Seychelles",
    website: "kucoin.com",
    affiliateLink: "https://www.kucoin.com/r?ref=allthingsxrpl",
    bonusKey: "exchangeDetail.kucoin.bonus",
    descriptionKey: "exchangeDetail.kucoin.description",
    featureKeys: [
      "exchangeDetail.kucoin.feature1",
      "exchangeDetail.kucoin.feature2",
      "exchangeDetail.kucoin.feature3",
      "exchangeDetail.kucoin.feature4",
      "exchangeDetail.kucoin.feature5",
      "exchangeDetail.kucoin.feature6",
      "exchangeDetail.kucoin.feature7",
      "exchangeDetail.kucoin.feature8"
    ],
    proKeys: [
      "exchangeDetail.kucoin.pro1",
      "exchangeDetail.kucoin.pro2",
      "exchangeDetail.kucoin.pro3",
      "exchangeDetail.kucoin.pro4",
      "exchangeDetail.kucoin.pro5",
      "exchangeDetail.kucoin.pro6"
    ],
    conKeys: [
      "exchangeDetail.kucoin.con1",
      "exchangeDetail.kucoin.con2",
      "exchangeDetail.kucoin.con3",
      "exchangeDetail.kucoin.con4"
    ],
    bestForKey: "exchangeDetail.kucoin.bestFor",
    fees: {
      trading: "0.1% maker / 0.1% taker",
      deposit: "Free (crypto)",
      withdrawal: "0.25 XRP"
    },
    paymentMethodKeys: ["exchangeDetail.payment.creditCard", "exchangeDetail.payment.bankTransfer", "exchangeDetail.payment.p2p", "exchangeDetail.payment.crypto", "exchangeDetail.payment.applePay"],
    supportedCountriesKey: "exchangeDetail.kucoin.countries",
    review: [
      {
        heading: "Overview and Market Niche",
        paragraphs: [
          "KuCoin has earned the nickname 'The People's Exchange' by focusing on listing a vast array of cryptocurrencies — over 800 coins and 1,200 trading pairs — that often appear on KuCoin before they are available on larger platforms like Coinbase or Kraken. Founded in 2017 and based in the Seychelles, KuCoin has grown to serve over 30 million users in more than 200 countries and territories. The exchange's willingness to list emerging projects early has made it a go-to platform for crypto enthusiasts looking for the next opportunity.",
          "For XRP users, KuCoin provides a comprehensive trading experience with multiple XRP trading pairs, competitive fees, and advanced features including margin trading, futures, and lending. The platform's strength lies in its combination of deep feature sets and broad asset selection, offering capabilities that rival major exchanges while providing access to a much wider range of tokens."
        ]
      },
      {
        heading: "Trading Features and Innovation",
        paragraphs: [
          "KuCoin's trading platform is feature-rich. The spot exchange offers a professional interface with TradingView charts, multiple order types, and real-time depth visualization. Beyond spot trading, KuCoin provides futures contracts with up to 100x leverage, margin trading, crypto lending (where you can earn interest by lending your idle assets), and a trading bot marketplace where you can deploy automated strategies including grid trading, DCA bots, and smart rebalancing.",
          "The KuCoin trading bot feature deserves special mention — it is one of the few exchanges that offers built-in, free automated trading tools. For XRP holders who want to implement strategies like buying dips automatically or maintaining a balanced portfolio, these bots provide functionality that would otherwise require third-party software. The exchange also runs regular trading competitions and promotions that offer bonus rewards for active traders."
        ]
      },
      {
        heading: "Security and Considerations",
        paragraphs: [
          "KuCoin experienced a significant security breach in September 2020 when hackers compromised hot wallets containing approximately $280 million in various cryptocurrencies. The exchange responded effectively, recovering the majority of stolen funds through collaboration with law enforcement, blockchain analysis firms, and partner exchanges that froze the stolen assets. KuCoin's insurance fund covered user losses, and no customer funds were permanently lost.",
          "Since the breach, KuCoin has implemented enhanced security measures including improved hot wallet architecture, micro-withdrawal monitoring, and advanced risk management systems. The exchange supports Google Authenticator and SMS-based two-factor authentication, trading passwords, and anti-phishing codes. One important consideration is that KuCoin operates without licenses in some jurisdictions, which means regulatory protections may be limited depending on your location."
        ]
      },
      {
        heading: "Who Should Use KuCoin",
        paragraphs: [
          "KuCoin is best for experienced crypto users who want access to a wide range of assets and advanced trading features at competitive prices. The platform's low fees (starting at 0.1% for spot trades), extensive altcoin listings, and built-in trading bots make it appealing for active traders who want professional tools without the fee premiums of US-regulated exchanges.",
          "KuCoin is less suitable for beginners who might be overwhelmed by the feature density, or for US users who prefer the regulatory clarity of licensed platforms like Coinbase or Kraken. The exchange's offshore registration means fewer formal protections in case of disputes. For XRP specifically, KuCoin offers a solid trading experience, but the community-specific benefits of platforms like Bitrue (XRP staking, XRPL token listings) may be more compelling for dedicated XRP holders."
        ]
      }
    ]
  }
};

export default function ExchangeReview() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const exchange = exchangeData[slug || ""];

  if (!exchange) {
    return (
      <Layout>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("exchangeReview.notFound")}</h1>
          <p className="text-muted-foreground mb-8">{t("exchangeReview.notFoundDesc")}</p>
          <Button asChild>
            <Link href="/#exchanges">{t("exchangeReview.viewAll")}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/#exchanges" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          {t("exchangeReview.backToPartners")}
        </Link>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-start gap-5">
              {logoMap[slug || ""] && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 bg-black/40 flex-shrink-0 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]">
                  <img src={logoMap[slug || ""]} alt={exchange.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <div className="text-sm text-primary font-display mb-2">{t(exchange.typeKey)}</div>
                <h1 className="text-3xl md:text-4xl font-black font-display mb-2">{exchange.name}</h1>
                <p className="text-xl text-muted-foreground">{t(exchange.taglineKey)}</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-2xl font-bold">{exchange.rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="text-sm text-muted-foreground">Est. {exchange.founded}</div>
            </div>
          </div>

          {exchange.bonusKey && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20 mb-8">
              <Gift className="h-5 w-5 text-green-400" />
              <span className="text-green-200">{t(exchange.bonusKey)}</span>
            </div>
          )}

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {t(exchange.descriptionKey)}
          </p>

          <a 
            href={exchange.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 !px-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
            data-testid={`button-signup-${slug}`}
          >
            {t("exchangeReview.signUp")} {exchange.name} <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {exchange.review && exchange.review.length > 0 && (
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-8" data-testid={`section-review-${slug}`}>
            <h2 className="text-2xl font-bold font-display mb-8">In-Depth Review</h2>
            {exchange.review.map((section, idx) => (
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
              {t("exchangeReview.pros")}
            </h2>
            <ul className="space-y-2">
              {exchange.proKeys.map((proKey) => (
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
              {t("exchangeReview.cons")}
            </h2>
            <ul className="space-y-2">
              {exchange.conKeys.map((conKey) => (
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
            <DollarSign className="h-5 w-5 text-green-400" />
            {t("exchangeReview.fees")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">{t("exchangeReview.tradingFee")}</div>
              <div className="font-bold">{exchange.fees.trading}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">{t("exchangeReview.depositFee")}</div>
              <div className="font-bold">{exchange.fees.deposit}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <div className="text-sm text-muted-foreground mb-1">{t("exchangeReview.withdrawalFee")}</div>
              <div className="font-bold">{exchange.fees.withdrawal}</div>
            </div>
          </div>
        </div>

        <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t("exchangeReview.keyFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exchange.featureKeys.map((featureKey) => (
              <div key={featureKey} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {t(featureKey)}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-display mb-4">{t("exchangeReview.paymentMethods")}</h2>
            <ul className="space-y-2">
              {exchange.paymentMethodKeys.map((methodKey) => (
                <li key={methodKey} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
                  {t(methodKey)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold font-display mb-4">{t("exchangeReview.availability")}</h2>
            <p className="text-muted-foreground">{t(exchange.supportedCountriesKey)}</p>
            <div className="mt-4 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 inline mr-2" />
              {t("exchangeReview.headquarters")}: {exchange.headquarters}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-bold font-display mb-2">{t("exchangeReview.bestFor")}</h2>
          <p className="text-muted-foreground">{t(exchange.bestForKey)}</p>
        </div>

        <div className="text-center pb-8">
          <a 
            href={exchange.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 !px-12 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-lg transition-colors"
          >
            {t("exchangeReview.signUp")} {exchange.name} <ExternalLink className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("exchangeReview.affiliateDisclaimer")}
          </p>
        </div>
      </div>
    </Layout>
  );
}
