import fs from 'node:fs';

// Source English review content for 7 exchanges, 4 sections each (h + 2 paragraphs)
const EN = {
  uphold: [
    { h: "Overview and Platform History",
      p: [
        "Uphold has carved out a unique position in the cryptocurrency exchange landscape, particularly for XRP holders in the United States. While many US-based exchanges delisted XRP during the SEC lawsuit against Ripple, Uphold maintained continuous XRP trading throughout — a decision that earned it significant loyalty from the XRP community. Founded in 2015 and headquartered in New York, Uphold operates as a regulated money services business and holds licenses in multiple US states and international jurisdictions.",
        "The platform positions itself as a multi-asset platform rather than a pure cryptocurrency exchange. In addition to over 250 cryptocurrencies, Uphold supports trading in precious metals, US equities, and environmental assets. This breadth makes it appealing for users who want a single platform for diversified investing, though the core user base remains primarily cryptocurrency-focused."
      ]},
    { h: "Trading Experience and Fees",
      p: [
        "Uphold's trading interface takes an unconventional approach: instead of traditional order books with maker-taker fees, the platform uses a spread-based pricing model. When you buy or sell XRP, the quoted price includes a spread that serves as Uphold's fee. This spread typically ranges from 0.8% to 1.2% for XRP, which is higher than the maker-taker fees on exchanges like Kraken or Coinbase Pro, but the simplicity appeals to users who prefer knowing the exact cost upfront.",
        "One of Uphold's standout features is the Anything-to-Anything trading engine. You can convert directly between any two supported assets without needing to go through a base pair. This means you can swap XRP for gold, or Bitcoin for Apple stock, in a single transaction. For XRP traders, the platform also supports automated recurring purchases and price alerts, making it easy to dollar-cost-average into your position over time."
      ]},
    { h: "Security and Regulation",
      p: [
        "Uphold maintains a transparent reserve model, publishing quarterly attestations that verify the platform holds sufficient assets to cover all customer balances. This level of transparency is uncommon among exchanges and addresses one of the primary concerns users have about centralized platforms. The company implements industry-standard security practices including cold storage for the majority of assets, two-factor authentication, and regular third-party security audits.",
        "As a US-regulated entity, Uphold complies with KYC and AML requirements, which means you will need to verify your identity before trading. The platform also offers a debit card in select regions that allows you to spend your crypto holdings directly, though availability varies by jurisdiction. Customer support has historically been a point of criticism, with some users reporting slow response times during peak periods."
      ]},
    { h: "Who Should Use Uphold",
      p: [
        "Uphold is the strongest choice for US-based XRP buyers who want a straightforward, regulated platform that has consistently supported XRP. If your primary goal is to buy and hold XRP with fiat currency, Uphold makes the process simple and transparent. The multi-asset support is a bonus for users interested in diversifying beyond cryptocurrency. The platform's $20 BTC welcome bonus for new users provides a small incentive to try the service.",
        "Where Uphold falls short is for advanced traders who want low fees, deep liquidity, and traditional order book functionality. The spread-based pricing model costs more than competitors like Kraken or Coinbase for frequent trading. If you plan to actively trade XRP rather than buy and hold, you may find better pricing elsewhere. For buy-and-hold investors, however, Uphold's simplicity, regulation, and XRP loyalty make it a compelling choice."
      ]},
  ],
  bitrue: [
    { h: "Overview and XRP Community Ties",
      p: [
        "Bitrue has built its reputation squarely around the XRP community. Based in Singapore with operations since 2018, Bitrue was among the earliest exchanges to aggressively support XRP and XRPL-based tokens, offering trading pairs and staking rewards that few other platforms matched. This early commitment earned Bitrue a dedicated following among XRP enthusiasts, and the platform continues to position itself as the most XRP-friendly exchange in the market.",
        "The exchange lists over 700 cryptocurrencies with more than 800 trading pairs, but its XRP offerings are the headline act. Bitrue supports a wide range of XRPL-issued tokens and has historically been quick to list new XRPL projects. The platform also ran a significant XRP airdrop program and offers yield farming products specifically designed for XRP holders, giving the community additional reasons to choose Bitrue over larger but less XRP-focused competitors."
      ]},
    { h: "Trading Features and Yield Products",
      p: [
        "Bitrue offers a full-featured trading experience with spot markets, futures trading (up to 150x leverage), and an OTC desk for large orders. The trading interface is functional and well-organized, with real-time order books, charting tools powered by TradingView, and multiple order types including limit, market, and stop-loss orders. Fees start at 0.098% for spot trading, which is competitive with major exchanges.",
        "The platform's yield products are a major draw. Power Piggy, Bitrue's flexible staking service, offers daily interest payments on XRP and other supported assets. Yield farming pools provide higher returns in exchange for locking tokens for specified periods. While the APY rates have fluctuated over time, Bitrue consistently offers some of the most attractive XRP yield opportunities in the centralized exchange space. It is important to understand that staking on a centralized exchange means trusting the platform with custody of your assets."
      ]},
    { h: "Security and Reliability",
      p: [
        "Bitrue experienced a security breach in 2019 where approximately $4.2 million in XRP and ADA was stolen. Since that incident, the platform has invested significantly in its security infrastructure, implementing multi-signature cold storage, real-time risk monitoring, and enhanced withdrawal security protocols. The exchange now maintains insurance coverage for digital assets and publishes regular security updates.",
        "As a Singapore-based exchange, Bitrue operates under the Monetary Authority of Singapore's regulatory framework. The platform requires KYC verification for full access to trading and withdrawal features. Customer support is available via ticket system and social media, though response times can vary during high-volume periods."
      ]},
    { h: "Who Should Use Bitrue",
      p: [
        "Bitrue is the natural choice for XRP enthusiasts who want an exchange that actively supports the XRPL ecosystem. The combination of extensive XRP trading pairs, yield products, and early token listings makes it a hub for the XRP community. If you want to earn yield on your XRP holdings or get early access to new XRPL tokens, Bitrue offers opportunities that larger exchanges typically do not.",
        "The trade-offs include being a smaller platform with less liquidity than Tier 1 exchanges, the history of a security breach (though remediated), and the counterparty risk inherent in staking on a centralized platform. For users who prioritize yield and ecosystem support over absolute security, Bitrue fills a valuable niche."
      ]},
  ],
  kraken: [
    { h: "Overview and Industry Standing",
      p: [
        "Kraken is one of the most established and respected cryptocurrency exchanges in the world. Founded in 2011 by Jesse Powell in San Francisco, Kraken has operated continuously for over a decade without a major security breach — a remarkable track record in an industry plagued by exchange hacks. The platform serves millions of users across more than 190 countries and has been consistently rated among the top exchanges for security, reliability, and trading volume.",
        "For XRP traders, Kraken offers deep liquidity, competitive fees, and a professional-grade trading environment. The exchange maintained XRP trading in many jurisdictions throughout the Ripple-SEC dispute and has been a reliable venue for XRP price discovery. Kraken's combination of institutional-grade infrastructure and retail-friendly features makes it a strong all-around choice for serious cryptocurrency traders."
      ]},
    { h: "Trading Platform and Features",
      p: [
        "Kraken offers two main trading interfaces: a simple buy/sell screen for beginners and Kraken Pro for advanced traders. The Pro interface features full order book visibility, TradingView-powered charting, multiple order types (market, limit, stop-loss, take-profit, trailing stop), and margin trading with up to 5x leverage on XRP. The platform also supports futures trading through a dedicated derivatives platform for institutional and professional users.",
        "Fee-wise, Kraken uses a maker-taker model with rates starting at 0.16% maker and 0.26% taker for most users, with volume discounts available up to 0.00% maker for high-volume traders. These rates are competitive with the industry's best, and significantly lower than spread-based platforms like Uphold. Kraken also offers staking services for select cryptocurrencies, though regulatory constraints have limited this feature in some jurisdictions."
      ]},
    { h: "Security and Compliance",
      p: [
        "Security is Kraken's defining characteristic. The exchange stores 95% of deposits in air-gapped cold storage, employs full-reserve accounting, and undergoes regular proof-of-reserves audits. The platform supports comprehensive two-factor authentication options, address whitelisting, configurable account lock timers, and a dedicated security team that monitors for suspicious activity around the clock.",
        "Kraken holds licenses and registrations in multiple jurisdictions, including FinCEN registration in the United States, FCA registration in the United Kingdom, and various state money transmitter licenses. The platform's compliance infrastructure is built for institutional-grade requirements, which adds friction through KYC verification but provides legal certainty that smaller exchanges cannot match."
      ]},
    { h: "Who Should Use Kraken",
      p: [
        "Kraken is the ideal exchange for users who prioritize security, low fees, and a mature trading platform. If you are a frequent XRP trader who wants reliable execution, deep order books, and professional charting tools, Kraken delivers an institutional-quality experience at competitive prices. The platform's decade-long security track record provides confidence that few exchanges can match.",
        "The main drawbacks are the verification process (which can take time), the less intuitive interface for complete beginners, and the limited availability of some features in certain regions due to regulatory compliance. If you want the simplest possible buying experience and are willing to pay higher fees for it, Uphold may be more suitable. For everyone else, Kraken represents one of the best risk-adjusted choices in the exchange market."
      ]},
  ],
  bitstamp: [
    { h: "Overview and Heritage",
      p: [
        "Bitstamp holds the distinction of being one of the oldest cryptocurrency exchanges still in operation. Founded in 2011 in Slovenia and now headquartered in Luxembourg, Bitstamp has weathered multiple market cycles, regulatory changes, and industry upheavals while maintaining a reputation for reliability and compliance. The exchange was one of the first to obtain a Payment Institution license under EU regulations, setting a standard for regulatory legitimacy that many newer exchanges have tried to follow.",
        "Bitstamp's approach has always been conservative and compliance-first, which appeals to institutional investors and security-conscious retail users. The exchange supports a curated selection of major cryptocurrencies including XRP, focusing on quality and regulatory clarity rather than listing every token that appears. This selectivity means fewer options but greater confidence in the legitimacy and compliance of each listed asset."
      ]},
    { h: "Trading and Platform Experience",
      p: [
        "Bitstamp's trading interface strikes a balance between professional functionality and accessibility. The platform offers both a simplified buy/sell interface and an advanced trading view with TradingView charting, full order book visibility, and multiple order types. Trading fees follow a volume-based schedule starting at 0.30% for spot trades, decreasing to 0.00% for monthly volumes exceeding $20 billion — competitive for institutional traders though slightly higher than some competitors at lower volumes.",
        "For XRP specifically, Bitstamp provides multiple trading pairs including XRP/USD, XRP/EUR, and XRP/BTC. The platform's liquidity is solid for major pairs, and the execution quality is consistent. Bitstamp also supports automated trading via a well-documented API, making it popular with algorithmic traders and institutional desks. The mobile app mirrors the desktop experience with a clean, functional design."
      ]},
    { h: "Security Track Record",
      p: [
        "Bitstamp suffered a notable security breach in 2015 when 19,000 BTC were stolen due to a social engineering attack targeting employees. Since then, the exchange completely overhauled its security infrastructure, partnering with BitGo for institutional-grade cold storage and implementing comprehensive security protocols. The platform now stores the vast majority of assets in multi-signature cold storage and maintains insurance coverage for digital assets held on the platform.",
        "The exchange's EU licensing requires compliance with strict data protection, capital adequacy, and operational security standards. Bitstamp regularly undergoes SOC 2 Type II audits, providing independent verification of its security controls. For users who value institutional-grade security and regulatory oversight, Bitstamp's post-2015 security posture is among the strongest in the industry."
      ]},
    { h: "Who Should Use Bitstamp",
      p: [
        "Bitstamp is best suited for users who prioritize regulatory compliance, institutional security, and a proven track record over cutting-edge features or the lowest possible fees. European users benefit from SEPA integration and EU regulatory protections, while institutional investors appreciate the platform's API, OTC desk, and compliance infrastructure.",
        "Bitstamp is less suitable for users who want a wide variety of altcoins, advanced DeFi features, or the lowest possible trading fees. Its conservative listing approach means many smaller tokens are not available. For XRP holders specifically, Bitstamp provides a reliable, well-regulated venue for buying, selling, and holding — but with fewer community-specific features than platforms like Bitrue."
      ]},
  ],
  coinbase: [
    { h: "Overview and Market Position",
      p: [
        "Coinbase is the largest publicly traded cryptocurrency exchange in the United States and one of the most recognizable names in the industry. Founded in 2012 by Brian Armstrong and Fred Ehrsam, the platform went public on NASDAQ in April 2021 and serves as many investors' first introduction to cryptocurrency. With over 110 million verified users and a presence in over 100 countries, Coinbase's scale and brand recognition are unmatched in the US market.",
        "Coinbase's relationship with XRP has been complicated. The exchange delisted XRP in January 2021 in response to the SEC's lawsuit against Ripple, and did not relist it until the case reached a favorable resolution. This period left many XRP holders frustrated with the platform. Now that XRP is back on Coinbase, the exchange offers a familiar, highly accessible way to buy and sell XRP — though the trust deficit from the delisting period remains a consideration for some community members."
      ]},
    { h: "User Experience and Product Suite",
      p: [
        "Coinbase's primary interface is designed for simplicity above all else. Buying XRP takes just a few taps: link a bank account or card, enter an amount, and confirm the purchase. This ease of use is Coinbase's greatest strength and the reason it continues to attract new users. For more sophisticated traders, Coinbase Advanced Trade (which replaced the separate Coinbase Pro platform) offers real-time order books, TradingView charting, and advanced order types within the main Coinbase app.",
        "Beyond trading, Coinbase offers a broad ecosystem: Coinbase Wallet (a separate self-custody app), Coinbase NFT marketplace, staking services, a Visa debit card for spending crypto, and educational rewards programs that pay users in cryptocurrency for watching short videos. The Coinbase Learn program is particularly valuable for newcomers who want to understand the basics of blockchain and cryptocurrency before investing."
      ]},
    { h: "Fees and Cost Considerations",
      p: [
        "Coinbase's fee structure has been a persistent point of criticism. The simple buy/sell interface charges a spread of approximately 0.50% plus a flat transaction fee that varies by payment method and region. These costs can add up significantly for frequent traders. The Advanced Trade interface offers lower fees starting at 0.40% maker and 0.60% taker, decreasing with volume — still higher than Kraken's rates but more competitive than the simple interface.",
        "Payment method costs also vary: ACH bank transfers are typically free for deposits, debit card purchases incur a 3.99% fee, and wire transfers carry flat fees. For XRP buyers who plan to make regular purchases, the difference between Coinbase's fees and a lower-cost exchange like Kraken can amount to meaningful savings over time. The trade-off is Coinbase's unmatched ease of use and brand trust."
      ]},
    { h: "Who Should Use Coinbase",
      p: [
        "Coinbase is the right exchange for users who value simplicity, brand trust, and regulatory certainty above all else. As a publicly traded company subject to SEC oversight and quarterly financial reporting, Coinbase operates with a level of transparency and accountability that private exchanges cannot match. For first-time crypto buyers, the platform's intuitive interface and educational resources provide a gentle on-ramp to the XRP ecosystem.",
        "Coinbase is less suitable for cost-sensitive frequent traders, XRP community loyalists who remember the delisting, or users who want access to a wide range of XRPL tokens beyond XRP itself. If keeping fees low is your priority, Kraken or Bitrue will save you money. If community alignment matters, Uphold or Bitrue have stronger track records of XRP support. But for mainstream accessibility and institutional credibility, Coinbase remains difficult to beat."
      ]},
  ],
  cryptocom: [
    { h: "Overview and Brand Growth",
      p: [
        "Crypto.com has grown from a relatively unknown startup to one of the most visible brands in cryptocurrency, largely through aggressive marketing campaigns including naming rights to the former Staples Center in Los Angeles (now Crypto.com Arena) and partnerships with major sports leagues. Founded in 2016 and headquartered in Singapore, the platform serves over 80 million users worldwide and offers a comprehensive suite of products that extends well beyond basic exchange services.",
        "For XRP holders, Crypto.com provides a full-featured experience with spot trading, staking, a Visa debit card that can be loaded with XRP, and DeFi wallet integration. The platform's breadth of services makes it appealing for users who want an all-in-one crypto ecosystem rather than using separate platforms for trading, storing, and spending their assets."
      ]},
    { h: "Product Ecosystem",
      p: [
        "Crypto.com's product lineup is one of the most extensive in the industry. The main app provides simple buy/sell functionality, while the Crypto.com Exchange offers professional trading features with real-time order books, margin trading, and derivatives. The Crypto.com Visa Card is a standout product — users can stake CRO (the platform's native token) to earn cashback on purchases at rates ranging from 1% to 5% depending on the stake tier. XRP can be loaded onto the card and spent anywhere Visa is accepted.",
        "Additional products include Crypto Earn (where you can deposit XRP and other assets to earn interest), a DeFi wallet for self-custody with cross-chain access, an NFT marketplace, and crypto-backed lending. The sheer scope of the ecosystem means you can buy XRP, earn yield on it, spend it with a card, and manage it in a self-custody wallet — all within the Crypto.com family of products."
      ]},
    { h: "Fee Structure and CRO Token",
      p: [
        "Crypto.com's fee structure is intertwined with its CRO token staking system. Base trading fees start at 0.075% maker and 0.075% taker on the exchange — very competitive rates — but achieving the best fee tiers and card benefits requires staking significant amounts of CRO. This creates an incentive loop that benefits heavy platform users but adds complexity for those who simply want to buy and sell XRP.",
        "The main app's buy/sell spread is less transparent than the exchange's order book fees, and can be higher for smaller transactions. Crypto withdrawal fees vary by network and asset. For XRP users who want competitive trading fees without the CRO staking commitment, the exchange platform offers reasonable rates even at the base tier. The card's cashback rewards can partially offset trading costs for users who spend crypto regularly."
      ]},
    { h: "Who Should Use Crypto.com",
      p: [
        "Crypto.com is ideal for users who want a complete crypto ecosystem in one place — trading, earning, spending, and self-custody. The Visa card integration is particularly compelling for users who want to use their XRP for everyday purchases. The platform's global reach and multi-product approach make it suitable for users who plan to engage deeply with the cryptocurrency economy rather than simply buying and holding.",
        "The platform is less suitable for users who want the simplest possible experience or those who are uncomfortable with the CRO staking mechanics that underpin many of the best benefits. The complexity of the product ecosystem can be overwhelming for newcomers, and some users have reported customer support challenges during peak periods. For straightforward XRP purchases, simpler platforms like Uphold or Coinbase may be easier starting points."
      ]},
  ],
  kucoin: [
    { h: "Overview and Market Niche",
      p: [
        "KuCoin has earned the nickname 'The People's Exchange' by focusing on listing a vast array of cryptocurrencies — over 800 coins and 1,200 trading pairs — that often appear on KuCoin before they are available on larger platforms like Coinbase or Kraken. Founded in 2017 and based in the Seychelles, KuCoin has grown to serve over 30 million users in more than 200 countries and territories. The exchange's willingness to list emerging projects early has made it a go-to platform for crypto enthusiasts looking for the next opportunity.",
        "For XRP users, KuCoin provides a comprehensive trading experience with multiple XRP trading pairs, competitive fees, and advanced features including margin trading, futures, and lending. The platform's strength lies in its combination of deep feature sets and broad asset selection, offering capabilities that rival major exchanges while providing access to a much wider range of tokens."
      ]},
    { h: "Trading Features and Innovation",
      p: [
        "KuCoin's trading platform is feature-rich. The spot exchange offers a professional interface with TradingView charts, multiple order types, and real-time depth visualization. Beyond spot trading, KuCoin provides futures contracts with up to 100x leverage, margin trading, crypto lending (where you can earn interest by lending your idle assets), and a trading bot marketplace where you can deploy automated strategies including grid trading, DCA bots, and smart rebalancing.",
        "The KuCoin trading bot feature deserves special mention — it is one of the few exchanges that offers built-in, free automated trading tools. For XRP holders who want to implement strategies like buying dips automatically or maintaining a balanced portfolio, these bots provide functionality that would otherwise require third-party software. The exchange also runs regular trading competitions and promotions that offer bonus rewards for active traders."
      ]},
    { h: "Security and Considerations",
      p: [
        "KuCoin experienced a significant security breach in September 2020 when hackers compromised hot wallets containing approximately $280 million in various cryptocurrencies. The exchange responded effectively, recovering the majority of stolen funds through collaboration with law enforcement, blockchain analysis firms, and partner exchanges that froze the stolen assets. KuCoin's insurance fund covered user losses, and no customer funds were permanently lost.",
        "Since the breach, KuCoin has implemented enhanced security measures including improved hot wallet architecture, micro-withdrawal monitoring, and advanced risk management systems. The exchange supports Google Authenticator and SMS-based two-factor authentication, trading passwords, and anti-phishing codes. One important consideration is that KuCoin operates without licenses in some jurisdictions, which means regulatory protections may be limited depending on your location."
      ]},
    { h: "Who Should Use KuCoin",
      p: [
        "KuCoin is best for experienced crypto users who want access to a wide range of assets and advanced trading features at competitive prices. The platform's low fees (starting at 0.1% for spot trades), extensive altcoin listings, and built-in trading bots make it appealing for active traders who want professional tools without the fee premiums of US-regulated exchanges.",
        "KuCoin is less suitable for beginners who might be overwhelmed by the feature density, or for US users who prefer the regulatory clarity of licensed platforms like Coinbase or Kraken. The exchange's offshore registration means fewer formal protections in case of disputes. For XRP specifically, KuCoin offers a solid trading experience, but the community-specific benefits of platforms like Bitrue (XRP staking, XRPL token listings) may be more compelling for dedicated XRP holders."
      ]},
  ],
};

// Translation files will be loaded individually
const langFiles = {
  es: 'scripts/exchange_reviews_es.json',
  zh: 'scripts/exchange_reviews_zh.json',
  ja: 'scripts/exchange_reviews_ja.json',
  ko: 'scripts/exchange_reviews_ko.json',
  pt: 'scripts/exchange_reviews_pt.json',
  de: 'scripts/exchange_reviews_de.json',
  fr: 'scripts/exchange_reviews_fr.json',
};

const slugs = ['uphold','bitrue','kraken','bitstamp','coinbase','cryptocom','kucoin'];

function buildBlock(slug, secs, indent='    ') {
  const lines = [];
  for (let s = 0; s < secs.length; s++) {
    const sec = secs[s];
    lines.push(`${indent}"exchangeDetail.${slug}.review.s${s}.h": ${JSON.stringify(sec.h)},`);
    for (let p = 0; p < sec.p.length; p++) {
      lines.push(`${indent}"exchangeDetail.${slug}.review.s${s}.p${p}": ${JSON.stringify(sec.p[p])},`);
    }
  }
  return lines.join('\n');
}

function buildLangBlock(data, indent='    ') {
  return slugs.map(s => buildBlock(s, data[s], indent)).join('\n');
}

const TARGET = 'client/src/lib/i18n/translations.ts';
const file = fs.readFileSync(TARGET, 'utf8');
const lines = file.split('\n');

// Find anchor lines per language: the line with walletDetail.trezor.review.s3.p1
const anchors = {};
const langs = ['en','es','zh','ja','ko','pt','de','fr'];
let langOrderIdx = 0;
const langStartLine = {};
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^  ([a-z]{2}): \{$/);
  if (m && langs.includes(m[1])) langStartLine[m[1]] = i;
}
for (const l of langs) {
  // Find the trezor.review.s3.p1 line within this language block
  const start = langStartLine[l];
  const nextLangStart = langs.map(x => langStartLine[x]).filter(x => x > start).sort((a,b)=>a-b)[0] ?? lines.length;
  for (let i = start; i < nextLangStart; i++) {
    if (lines[i].includes('"walletDetail.trezor.review.s3.p1"')) {
      anchors[l] = i;
      break;
    }
  }
}

// Translation data per language
const translationData = { en: EN };
for (const [lang, path] of Object.entries(langFiles)) {
  if (fs.existsSync(path)) {
    translationData[lang] = JSON.parse(fs.readFileSync(path, 'utf8'));
  } else {
    console.warn(`Missing translation file: ${path}`);
  }
}

// Verify
for (const lang of langs) {
  if (!translationData[lang]) { console.error(`No data for ${lang}`); process.exit(1); }
  for (const s of slugs) {
    if (!translationData[lang][s] || translationData[lang][s].length !== 4) {
      console.error(`Incomplete data for ${lang}/${s}`); process.exit(1);
    }
  }
}

// Insert from bottom up to keep line numbers valid
const sortedLangs = langs.slice().sort((a,b) => anchors[b]-anchors[a]);
let outLines = lines.slice();
for (const lang of sortedLangs) {
  const anchor = anchors[lang];
  const insertion = buildLangBlock(translationData[lang]);
  // Insert AFTER the anchor line
  outLines = [...outLines.slice(0, anchor + 1), insertion, ...outLines.slice(anchor + 1)];
}

fs.writeFileSync(TARGET, outLines.join('\n'));
console.log('Done');
