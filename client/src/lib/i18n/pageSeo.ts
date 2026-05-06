import type { Language } from "./translations";
import type { SeoEntry } from "./seoTranslations";

export type StaticPageKey =
  | "news"
  | "blog"
  | "about"
  | "contact"
  | "faq"
  | "gettingStarted"
  | "disclosure"
  | "bestXrpWallets"
  | "yield"
  | "walletQuiz"
  | "privacy"
  | "terms"
  | "dapps";

export type BestForSlug =
  | "beginners"
  | "hardware"
  | "cold-storage"
  | "defi"
  | "safest";

type ExchangeSeoMap = Record<string, SeoEntry>;
type StaticSeoMap = Record<StaticPageKey, SeoEntry>;
type BestForSeoMap = Record<BestForSlug, SeoEntry>;

export const exchangeSeo: Record<Language, ExchangeSeoMap> = {
  en: {
    uphold: {
      title: "Uphold Review for XRP (2026) | US-Friendly Multi-Asset Exchange",
      description:
        "Hands-on Uphold review for 2026. The US-friendly multi-asset platform that kept XRP listed through the SEC suit — fees, security and how it compares to Kraken.",
    },
    bitrue: {
      title: "Bitrue Review for XRP (2026) | XRPL Yield, Power Piggy & Deep Listings",
      description:
        "Bitrue for 2026: the XRP-focused exchange with Power Piggy yield, deep XRPL listings and 0.098% spot fees. Security history and trade-offs inside.",
    },
    kraken: {
      title: "Kraken Review for XRP (2026) | Top-Tier Exchange with Deep Liquidity",
      description:
        "Hands-on Kraken review for 2026. A top-tier US exchange with deep XRP liquidity, low maker-taker fees and 12+ years without a major hack.",
    },
    bitstamp: {
      title: "Bitstamp Review for XRP (2026) | EU-Regulated Veteran Exchange",
      description:
        "Hands-on Bitstamp review for 2026. The EU-regulated veteran with SEPA on-ramp and BitGo cold storage — XRP fees, security model and who it's for.",
    },
    coinbase: {
      title: "Coinbase Review for XRP (2026) | Easiest US On-Ramp for XRP",
      description:
        "Hands-on Coinbase review for 2026. The easiest beginner-friendly US on-ramp for XRP — fees, custody, security and how it compares to Kraken and Uphold.",
    },
    cryptocom: {
      title: "Crypto.com Review for XRP (2026) | Mobile-First App with Visa Card",
      description:
        "Hands-on Crypto.com review for 2026. A mobile-first app with Visa Card cashback and broad XRP support — fees, security and beginner trade-offs.",
    },
    kucoin: {
      title: "KuCoin Review for XRP (2026) | Altcoin-Heavy Exchange with XRPL Pairs",
      description:
        "Hands-on KuCoin review for 2026. The altcoin-heavy exchange with deep XRPL pairs, 0.1% spot fees and KCS rewards — security and trade-offs explained.",
    },
  },
  es: {
    uphold: {
      title: "Reseña de Uphold para XRP (2026) | Plataforma multi-activo amigable con EE. UU.",
      description:
        "Reseña práctica de Uphold para 2026. La plataforma multi-activo amigable con EE. UU. que mantuvo XRP listado durante la demanda de la SEC — comisiones, seguridad y comparación con Kraken.",
    },
    bitrue: {
      title: "Reseña de Bitrue para XRP (2026) | Yield XRPL, Power Piggy y listados profundos",
      description:
        "Bitrue 2026: exchange centrado en XRP con yield Power Piggy, listados XRPL profundos y comisiones spot del 0,098 %. Historial de seguridad y compromisos dentro.",
    },
    kraken: {
      title: "Reseña de Kraken para XRP (2026) | Exchange de primer nivel con liquidez profunda",
      description:
        "Reseña práctica de Kraken para 2026. Un exchange estadounidense de primer nivel con liquidez XRP profunda, bajas comisiones maker-taker y más de 12 años sin un hackeo importante.",
    },
    bitstamp: {
      title: "Reseña de Bitstamp para XRP (2026) | Exchange veterano regulado en la UE",
      description:
        "Reseña práctica de Bitstamp para 2026. El veterano regulado en la UE con on-ramp SEPA y custodia en frío con BitGo — comisiones de XRP, modelo de seguridad y a quién le conviene.",
    },
    coinbase: {
      title: "Reseña de Coinbase para XRP (2026) | El on-ramp más fácil de EE. UU. para XRP",
      description:
        "Reseña práctica de Coinbase para 2026. El on-ramp más fácil y amigable para principiantes en EE. UU. para XRP — comisiones, custodia, seguridad y comparación con Kraken y Uphold.",
    },
    cryptocom: {
      title: "Reseña de Crypto.com para XRP (2026) | App mobile-first con tarjeta Visa",
      description:
        "Reseña práctica de Crypto.com para 2026. Una app mobile-first con cashback de tarjeta Visa y amplio soporte de XRP — comisiones, seguridad y compromisos para principiantes.",
    },
    kucoin: {
      title: "Reseña de KuCoin para XRP (2026) | Exchange con muchas altcoins y pares XRPL",
      description:
        "Reseña práctica de KuCoin para 2026. El exchange con muchas altcoins y pares XRPL profundos, comisiones spot de 0,1 % y recompensas KCS — seguridad y compromisos explicados.",
    },
  },
  zh: {
    uphold: {
      title: "Uphold XRP 评测 (2026) | 美国友好的多资产交易所",
      description:
        "2026 年 Uphold 实测评测。在 SEC 诉讼期间始终保留 XRP 的美国友好多资产平台——费用、安全性,以及与 Kraken 的对比。",
    },
    bitrue: {
      title: "Bitrue XRP 评测 (2026) | XRPL 收益、Power Piggy 与丰富币对",
      description:
        "2026 年 Bitrue:专注 XRP 的交易所,提供 Power Piggy 收益、丰富的 XRPL 上币与 0.098% 现货费率。安全历史与权衡尽在文中。",
    },
    kraken: {
      title: "Kraken XRP 评测 (2026) | 流动性深厚的顶级交易所",
      description:
        "2026 年 Kraken 实测评测。深度 XRP 流动性、低 maker-taker 费率、12 年以上无重大被黑记录的美国一线交易所。",
    },
    bitstamp: {
      title: "Bitstamp XRP 评测 (2026) | 受欧盟监管的老牌交易所",
      description:
        "2026 年 Bitstamp 实测评测。受欧盟监管的老牌平台,支持 SEPA 入金并采用 BitGo 冷存储——XRP 费率、安全模型与适用人群。",
    },
    coinbase: {
      title: "Coinbase XRP 评测 (2026) | 美国最简单的 XRP 入金通道",
      description:
        "2026 年 Coinbase 实测评测。面向美国新手最简单的 XRP 入金通道——费用、托管、安全性,以及与 Kraken 和 Uphold 的对比。",
    },
    cryptocom: {
      title: "Crypto.com XRP 评测 (2026) | 主打移动端的 App,附 Visa 卡返现",
      description:
        "2026 年 Crypto.com 实测评测。一款主打移动端、带 Visa 卡返现并广泛支持 XRP 的应用——费用、安全性以及新手的权衡。",
    },
    kucoin: {
      title: "KuCoin XRP 评测 (2026) | 山寨币丰富、XRPL 币对深厚的交易所",
      description:
        "2026 年 KuCoin 实测评测。山寨币丰富、XRPL 币对深厚、0.1% 现货费率并提供 KCS 奖励的交易所——附安全性与权衡。",
    },
  },
  ja: {
    uphold: {
      title: "Uphold XRPレビュー(2026) | 米国向けマルチアセット取引所",
      description:
        "2026年版 Upholdの実機レビュー。SEC訴訟中もXRPを上場し続けた米国向けマルチアセット・プラットフォーム — 手数料、セキュリティ、Krakenとの比較。",
    },
    bitrue: {
      title: "Bitrue XRPレビュー(2026) | XRPLイールド・Power Piggy・豊富な上場",
      description:
        "2026年のBitrue:Power Piggyイールド、XRPL豊富な上場、0.098%スポット手数料を備えるXRP特化型取引所。セキュリティ履歴とトレードオフも本文で解説。",
    },
    kraken: {
      title: "Kraken XRPレビュー(2026) | 流動性の高い一流取引所",
      description:
        "2026年版 Krakenの実機レビュー。深いXRP流動性、低いメイカー・テイカー手数料、12年以上重大なハック歴のない米国一流取引所。",
    },
    bitstamp: {
      title: "Bitstamp XRPレビュー(2026) | EU規制下のベテラン取引所",
      description:
        "2026年版 Bitstampの実機レビュー。SEPA入金とBitGoコールドストレージを備えるEU規制下のベテラン — XRP手数料、セキュリティモデル、想定ユーザー。",
    },
    coinbase: {
      title: "Coinbase XRPレビュー(2026) | 米国で最も簡単なXRPオンランプ",
      description:
        "2026年版 Coinbaseの実機レビュー。初心者でも使いやすい米国で最も簡単なXRPオンランプ — 手数料、カストディ、セキュリティ、KrakenやUpholdとの比較。",
    },
    cryptocom: {
      title: "Crypto.com XRPレビュー(2026) | モバイル特化アプリ&Visaカード",
      description:
        "2026年版 Crypto.comの実機レビュー。Visaカードのキャッシュバックと幅広いXRPサポートを備えたモバイル特化アプリ — 手数料、セキュリティ、初心者向けトレードオフ。",
    },
    kucoin: {
      title: "KuCoin XRPレビュー(2026) | アルトコインとXRPLペアが豊富な取引所",
      description:
        "2026年版 KuCoinの実機レビュー。アルトコインが豊富でXRPLペアも厚く、0.1%のスポット手数料とKCSリワードを提供 — セキュリティとトレードオフを解説。",
    },
  },
  ko: {
    uphold: {
      title: "Uphold XRP 리뷰 (2026) | 미국 친화적인 멀티에셋 거래소",
      description:
        "2026년 Uphold 실사용 리뷰. SEC 소송 동안에도 XRP 상장을 유지한 미국 친화적인 멀티에셋 플랫폼 — 수수료, 보안, Kraken과의 비교.",
    },
    bitrue: {
      title: "Bitrue XRP 리뷰 (2026) | XRPL 수익, Power Piggy와 풍부한 상장",
      description:
        "2026년 Bitrue: Power Piggy 수익, 풍부한 XRPL 상장, 0.098% 현물 수수료를 갖춘 XRP 특화 거래소. 보안 이력과 트레이드오프까지 정리.",
    },
    kraken: {
      title: "Kraken XRP 리뷰 (2026) | 유동성이 깊은 최상위 거래소",
      description:
        "2026년 Kraken 실사용 리뷰. 깊은 XRP 유동성, 낮은 메이커-테이커 수수료, 12년 이상 주요 해킹 이력이 없는 미국 최상위 거래소.",
    },
    bitstamp: {
      title: "Bitstamp XRP 리뷰 (2026) | EU 규제 베테랑 거래소",
      description:
        "2026년 Bitstamp 실사용 리뷰. SEPA 온램프와 BitGo 콜드 스토리지를 갖춘 EU 규제 베테랑 — XRP 수수료, 보안 모델, 적합한 사용자.",
    },
    coinbase: {
      title: "Coinbase XRP 리뷰 (2026) | 미국에서 가장 쉬운 XRP 온램프",
      description:
        "2026년 Coinbase 실사용 리뷰. 초보자에게 가장 친근한 미국 XRP 온램프 — 수수료, 커스터디, 보안, Kraken 및 Uphold와의 비교.",
    },
    cryptocom: {
      title: "Crypto.com XRP 리뷰 (2026) | 모바일 중심 앱과 Visa 카드",
      description:
        "2026년 Crypto.com 실사용 리뷰. Visa 카드 캐시백과 폭넓은 XRP 지원을 갖춘 모바일 중심 앱 — 수수료, 보안, 초보자 트레이드오프.",
    },
    kucoin: {
      title: "KuCoin XRP 리뷰 (2026) | 알트코인과 XRPL 페어가 풍부한 거래소",
      description:
        "2026년 KuCoin 실사용 리뷰. 알트코인과 XRPL 페어가 풍부하고 0.1% 현물 수수료, KCS 리워드를 제공 — 보안과 트레이드오프 정리.",
    },
  },
  pt: {
    uphold: {
      title: "Análise da Uphold para XRP (2026) | Plataforma multi-ativos amigável aos EUA",
      description:
        "Análise prática da Uphold para 2026. A plataforma multi-ativos amigável aos EUA que manteve XRP listada durante o processo da SEC — taxas, segurança e comparação com a Kraken.",
    },
    bitrue: {
      title: "Análise da Bitrue para XRP (2026) | Yield XRPL, Power Piggy e listagens profundas",
      description:
        "Bitrue para 2026: a exchange focada em XRP com yield Power Piggy, listagens XRPL profundas e taxas spot de 0,098%. Histórico de segurança e trade-offs dentro.",
    },
    kraken: {
      title: "Análise da Kraken para XRP (2026) | Exchange de primeira linha com liquidez profunda",
      description:
        "Análise prática da Kraken para 2026. Uma exchange dos EUA de primeira linha com liquidez profunda em XRP, taxas maker-taker baixas e mais de 12 anos sem um grande hack.",
    },
    bitstamp: {
      title: "Análise da Bitstamp para XRP (2026) | Exchange veterana regulada na UE",
      description:
        "Análise prática da Bitstamp para 2026. A veterana regulada na UE com on-ramp SEPA e cold storage com BitGo — taxas de XRP, modelo de segurança e para quem ela é.",
    },
    coinbase: {
      title: "Análise da Coinbase para XRP (2026) | O on-ramp mais fácil dos EUA para XRP",
      description:
        "Análise prática da Coinbase para 2026. O on-ramp mais fácil e amigável para iniciantes nos EUA para XRP — taxas, custódia, segurança e comparação com Kraken e Uphold.",
    },
    cryptocom: {
      title: "Análise da Crypto.com para XRP (2026) | App mobile-first com Visa Card",
      description:
        "Análise prática da Crypto.com para 2026. Um app mobile-first com cashback do Visa Card e amplo suporte a XRP — taxas, segurança e trade-offs para iniciantes.",
    },
    kucoin: {
      title: "Análise da KuCoin para XRP (2026) | Exchange cheia de altcoins com pares XRPL",
      description:
        "Análise prática da KuCoin para 2026. A exchange cheia de altcoins com pares XRPL profundos, taxas spot de 0,1% e recompensas KCS — segurança e trade-offs explicados.",
    },
  },
  de: {
    uphold: {
      title: "Uphold Review für XRP (2026) | US-freundliche Multi-Asset-Plattform",
      description:
        "Praxistest von Uphold für 2026. Die US-freundliche Multi-Asset-Plattform, die XRP während der SEC-Klage gelistet hielt — Gebühren, Sicherheit und Vergleich mit Kraken.",
    },
    bitrue: {
      title: "Bitrue Review für XRP (2026) | XRPL-Yield, Power Piggy und tiefe Listings",
      description:
        "Bitrue 2026: die XRP-fokussierte Börse mit Power-Piggy-Yield, tiefen XRPL-Listings und 0,098 % Spot-Gebühren. Sicherheitshistorie und Trade-offs im Test.",
    },
    kraken: {
      title: "Kraken Review für XRP (2026) | Top-Börse mit tiefer Liquidität",
      description:
        "Praxistest von Kraken für 2026. Eine US-Top-Börse mit tiefer XRP-Liquidität, niedrigen Maker-Taker-Gebühren und über 12 Jahren ohne größeren Hack.",
    },
    bitstamp: {
      title: "Bitstamp Review für XRP (2026) | EU-regulierte Veteranenbörse",
      description:
        "Praxistest von Bitstamp für 2026. Die EU-regulierte Veteranenbörse mit SEPA-On-Ramp und BitGo-Cold-Storage — XRP-Gebühren, Sicherheitsmodell und Zielgruppe.",
    },
    coinbase: {
      title: "Coinbase Review für XRP (2026) | Einfachster US-On-Ramp für XRP",
      description:
        "Praxistest von Coinbase für 2026. Der einfachste, einsteigerfreundliche US-On-Ramp für XRP — Gebühren, Verwahrung, Sicherheit und Vergleich mit Kraken und Uphold.",
    },
    cryptocom: {
      title: "Crypto.com Review für XRP (2026) | Mobile-first App mit Visa Card",
      description:
        "Praxistest von Crypto.com für 2026. Eine mobile-first App mit Visa-Card-Cashback und breiter XRP-Unterstützung — Gebühren, Sicherheit und Einsteiger-Trade-offs.",
    },
    kucoin: {
      title: "KuCoin Review für XRP (2026) | Altcoin-starke Börse mit XRPL-Paaren",
      description:
        "Praxistest von KuCoin für 2026. Die altcoin-starke Börse mit tiefen XRPL-Paaren, 0,1 % Spot-Gebühren und KCS-Rewards — Sicherheit und Trade-offs erklärt.",
    },
  },
  fr: {
    uphold: {
      title: "Avis Uphold pour XRP (2026) | Plateforme multi-actifs adaptée aux États-Unis",
      description:
        "Avis pratique d'Uphold pour 2026. La plateforme multi-actifs adaptée aux États-Unis qui a gardé XRP coté pendant le procès SEC — frais, sécurité et comparaison avec Kraken.",
    },
    bitrue: {
      title: "Avis Bitrue pour XRP (2026) | Yield XRPL, Power Piggy et listings approfondis",
      description:
        "Bitrue en 2026 : plateforme axée XRP avec yield Power Piggy, listings XRPL approfondis et frais spot de 0,098 %. Historique de sécurité et compromis détaillés.",
    },
    kraken: {
      title: "Avis Kraken pour XRP (2026) | Plateforme de premier plan avec une liquidité profonde",
      description:
        "Avis pratique de Kraken pour 2026. Une plateforme américaine de premier plan avec une liquidité XRP profonde, des frais maker-taker bas et plus de 12 ans sans piratage majeur.",
    },
    bitstamp: {
      title: "Avis Bitstamp pour XRP (2026) | Plateforme vétéran régulée dans l'UE",
      description:
        "Avis pratique de Bitstamp pour 2026. La vétéran régulée dans l'UE avec on-ramp SEPA et cold storage BitGo — frais XRP, modèle de sécurité et public visé.",
    },
    coinbase: {
      title: "Avis Coinbase pour XRP (2026) | Le on-ramp américain le plus simple pour XRP",
      description:
        "Avis pratique de Coinbase pour 2026. Le on-ramp américain le plus simple et accessible aux débutants pour XRP — frais, conservation, sécurité et comparaison avec Kraken et Uphold.",
    },
    cryptocom: {
      title: "Avis Crypto.com pour XRP (2026) | Application mobile-first avec carte Visa",
      description:
        "Avis pratique de Crypto.com pour 2026. Une application mobile-first avec cashback de carte Visa et un large support XRP — frais, sécurité et compromis pour débutants.",
    },
    kucoin: {
      title: "Avis KuCoin pour XRP (2026) | Plateforme riche en altcoins avec paires XRPL",
      description:
        "Avis pratique de KuCoin pour 2026. La plateforme riche en altcoins avec des paires XRPL approfondies, des frais spot de 0,1 % et des récompenses KCS — sécurité et compromis expliqués.",
    },
  },
};

export const staticPageSeo: Record<Language, StaticSeoMap> = {
  en: {
    news: {
      title: "XRPL News & Market Updates (Live) | All Things XRPL",
      description:
        "Live XRP and XRPL news aggregated from CoinDesk, Cointelegraph, Decrypt, U.Today and more — refreshed continuously so you never miss a market move.",
    },
    blog: {
      title: "XRPL Blog & Knowledge Hub | Guides, AMM, NFTs & Security",
      description:
        "In-depth guides and analysis on the XRP Ledger — DeFi, AMM strategy, NFTs, security and ecosystem updates from the All Things XRPL team.",
    },
    about: {
      title: "About All Things XRPL | Independent XRP Wallet & Exchange Reviews",
      description:
        "Meet the team behind All Things XRPL. Our mission, methodology, and how we keep our XRP wallet and exchange reviews independent and up to date.",
    },
    contact: {
      title: "Contact All Things XRPL | Tips, Corrections & Partnerships",
      description:
        "Get in touch with All Things XRPL — send tips, suggest corrections, or reach out about partnerships, listings and editorial inquiries.",
    },
    faq: {
      title: "XRP Wallet & Exchange FAQ (2026) | All Things XRPL",
      description:
        "Answers to the most common questions about XRP wallets, exchanges, fees, security and the XRP Ledger — curated by the All Things XRPL editors.",
    },
    gettingStarted: {
      title: "How to Buy XRP — Step-by-Step Beginner Guide (2026)",
      description:
        "A simple, step-by-step guide to buying, storing and securing your first XRP in 2026. Pick the right exchange, set up a wallet and avoid common mistakes.",
    },
    disclosure: {
      title: "Editorial Standards & Affiliate Disclosure | All Things XRPL",
      description:
        "How All Things XRPL is funded, our editorial standards, affiliate-link policy and the methodology behind our XRP wallet and exchange reviews.",
    },
    bestXrpWallets: {
      title: "Best XRP Wallets 2026 | Software, Hardware & Cold Storage Picks",
      description:
        "Independent reviews of the best XRP wallets in 2026 — software, hardware, browser and air-gapped picks for daily use, cold storage and XRPL DeFi.",
    },
    yield: {
      title: "XRP Yield Opportunities 2026 | Staking, AMM & Airdrops",
      description:
        "Compare the best ways to earn yield on XRP in 2026 — exchange staking with Bitrue, Uphold and Kraken plus the native XRPL AMM and trustline airdrops.",
    },
    walletQuiz: {
      title: "XRP Wallet Quiz | Find Your Perfect XRP Wallet in 60 Seconds",
      description:
        "Answer a few quick questions and we'll match you to the best XRP wallet for your needs — beginner, hardware, DeFi or cold storage.",
    },
    privacy: {
      title: "Privacy Policy | All Things XRPL",
      description:
        "How All Things XRPL collects, uses and protects your data — cookies, analytics, email signups and your rights under GDPR and CCPA.",
    },
    dapps: {
      title: "Best XRPL DeFi & dApps 2026 | AMM, NFT & Yield Picks",
      description:
        "The XRPL DeFi protocols, AMM pools and NFT marketplaces actually worth your time and capital in 2026 — hands-on picks with editor's verdict inside.",
    },
    terms: {
      title: "Terms of Service | All Things XRPL",
      description:
        "The terms governing your use of All Things XRPL — content disclaimers, affiliate links, intellectual property and limitation of liability.",
    },
  },
  es: {
    news: {
      title: "Noticias y actualizaciones XRPL (en vivo) | All Things XRPL",
      description:
        "Noticias en vivo de XRP y XRPL agregadas de CoinDesk, Cointelegraph, Decrypt, U.Today y más — actualizadas continuamente para que no te pierdas ningún movimiento del mercado.",
    },
    blog: {
      title: "Blog y centro de conocimiento XRPL | Guías, AMM, NFTs y seguridad",
      description:
        "Guías y análisis a fondo sobre el XRP Ledger — DeFi, estrategia AMM, NFTs, seguridad y novedades del ecosistema, por el equipo de All Things XRPL.",
    },
    about: {
      title: "Sobre All Things XRPL | Reseñas independientes de carteras y exchanges XRP",
      description:
        "Conoce al equipo detrás de All Things XRPL. Nuestra misión, metodología y cómo mantenemos nuestras reseñas de carteras y exchanges XRP independientes y actualizadas.",
    },
    contact: {
      title: "Contacta a All Things XRPL | Avisos, correcciones y colaboraciones",
      description:
        "Ponte en contacto con All Things XRPL — envía avisos, sugiere correcciones o escríbenos sobre colaboraciones, listados y consultas editoriales.",
    },
    faq: {
      title: "Preguntas frecuentes sobre carteras y exchanges XRP (2026) | All Things XRPL",
      description:
        "Respuestas a las preguntas más frecuentes sobre carteras XRP, exchanges, comisiones, seguridad y el XRP Ledger — curadas por los editores de All Things XRPL.",
    },
    gettingStarted: {
      title: "Cómo comprar XRP — Guía paso a paso para principiantes (2026)",
      description:
        "Una guía simple y paso a paso para comprar, guardar y proteger tu primer XRP en 2026. Elige el exchange adecuado, configura una cartera y evita errores comunes.",
    },
    disclosure: {
      title: "Estándares editoriales y divulgación de afiliados | All Things XRPL",
      description:
        "Cómo se financia All Things XRPL, nuestros estándares editoriales, política de enlaces de afiliados y metodología detrás de nuestras reseñas de carteras y exchanges XRP.",
    },
    bestXrpWallets: {
      title: "Mejores carteras XRP 2026 | Software, hardware y almacenamiento en frío",
      description:
        "Reseñas independientes de las mejores carteras XRP en 2026 — opciones de software, hardware, navegador y air-gapped para uso diario, almacenamiento en frío y DeFi en XRPL.",
    },
    yield: {
      title: "Oportunidades de yield en XRP 2026 | Staking, AMM y airdrops",
      description:
        "Compara las mejores formas de generar rendimiento con XRP en 2026 — staking en exchanges como Bitrue, Uphold y Kraken, además del AMM nativo de XRPL y airdrops por trustline.",
    },
    walletQuiz: {
      title: "Quiz de carteras XRP | Encuentra tu cartera XRP ideal en 60 segundos",
      description:
        "Responde unas preguntas rápidas y te asignaremos la mejor cartera XRP para tus necesidades — principiante, hardware, DeFi o almacenamiento en frío.",
    },
    privacy: {
      title: "Política de privacidad | All Things XRPL",
      description:
        "Cómo All Things XRPL recopila, utiliza y protege tus datos — cookies, analítica, suscripciones por email y tus derechos bajo el RGPD y la CCPA.",
    },
    dapps: {
      title: "Mejores DeFi y dApps de XRPL 2026 | AMM, NFT y yield",
      description:
        "Los protocolos DeFi, pools AMM y mercados NFT de XRPL que de verdad merecen tu tiempo y capital en 2026 — selección práctica con veredicto editorial dentro.",
    },
    terms: {
      title: "Términos del servicio | All Things XRPL",
      description:
        "Los términos que rigen tu uso de All Things XRPL — exenciones de contenido, enlaces de afiliados, propiedad intelectual y limitación de responsabilidad.",
    },
  },
  zh: {
    news: {
      title: "XRPL 新闻与市场动态(实时)| All Things XRPL",
      description:
        "汇总自 CoinDesk、Cointelegraph、Decrypt、U.Today 等来源的实时 XRP 和 XRPL 新闻——持续刷新,助你不错过任何行情。",
    },
    blog: {
      title: "XRPL 博客与知识中心 | 指南、AMM、NFT 与安全",
      description:
        "由 All Things XRPL 团队撰写的 XRP Ledger 深度指南与分析——DeFi、AMM 策略、NFT、安全与生态系统更新。",
    },
    about: {
      title: "关于 All Things XRPL | 独立的 XRP 钱包与交易所评测",
      description:
        "了解 All Things XRPL 背后的团队。我们的使命、方法论,以及如何保持 XRP 钱包与交易所评测独立、与时俱进。",
    },
    contact: {
      title: "联系 All Things XRPL | 线索、勘误与合作",
      description:
        "联系 All Things XRPL——提供线索、建议勘误,或就合作、上线与编辑事宜与我们沟通。",
    },
    faq: {
      title: "XRP 钱包与交易所常见问题(2026)| All Things XRPL",
      description:
        "由 All Things XRPL 编辑团队整理的关于 XRP 钱包、交易所、费用、安全与 XRP Ledger 的常见问题解答。",
    },
    gettingStarted: {
      title: "如何购买 XRP——新手分步指南(2026)",
      description:
        "2026 年购买、存储和保护你的第一笔 XRP 的简单分步指南。选择合适的交易所、设置钱包并避开常见错误。",
    },
    disclosure: {
      title: "编辑准则与联盟披露 | All Things XRPL",
      description:
        "All Things XRPL 的资金来源、编辑准则、联盟链接政策,以及我们 XRP 钱包与交易所评测背后的方法论。",
    },
    bestXrpWallets: {
      title: "2026 年最佳 XRP 钱包 | 软件、硬件与冷存储推荐",
      description:
        "2026 年最佳 XRP 钱包的独立评测——软件、硬件、浏览器与气隙钱包,覆盖日常使用、冷存储与 XRPL DeFi。",
    },
    yield: {
      title: "2026 年 XRP 收益机会 | 质押、AMM 与空投",
      description:
        "比较 2026 年通过 XRP 赚取收益的最佳方式——Bitrue、Uphold 与 Kraken 的交易所质押,以及 XRPL 原生 AMM 与信任线空投。",
    },
    walletQuiz: {
      title: "XRP 钱包小测验 | 60 秒找到你的理想 XRP 钱包",
      description:
        "回答几个简短问题,我们将为你匹配最适合的 XRP 钱包——新手、硬件、DeFi 或冷存储。",
    },
    privacy: {
      title: "隐私政策 | All Things XRPL",
      description:
        "All Things XRPL 如何收集、使用与保护你的数据——Cookie、分析、邮件订阅,以及你在 GDPR 与 CCPA 下的权利。",
    },
    dapps: {
      title: "2026 年最佳 XRPL DeFi 与 dApp | AMM、NFT 与收益精选",
      description:
        "2026 年真正值得投入时间和资金的 XRPL DeFi 协议、AMM 资金池与 NFT 市场——实测精选,内含编辑结论。",
    },
    terms: {
      title: "服务条款 | All Things XRPL",
      description:
        "管理你使用 All Things XRPL 的条款——内容免责、联盟链接、知识产权与责任限制。",
    },
  },
  ja: {
    news: {
      title: "XRPLニュース&マーケット速報(ライブ)| All Things XRPL",
      description:
        "CoinDesk、Cointelegraph、Decrypt、U.Todayなどから集約したXRPおよびXRPLのライブニュース — 常時更新で相場の動きを見逃しません。",
    },
    blog: {
      title: "XRPLブログ&ナレッジハブ | ガイド、AMM、NFT、セキュリティ",
      description:
        "All Things XRPLチームによるXRP Ledgerの詳細ガイドと分析 — DeFi、AMM戦略、NFT、セキュリティ、エコシステムの最新情報。",
    },
    about: {
      title: "All Things XRPLについて | 独立系のXRPウォレット&取引所レビュー",
      description:
        "All Things XRPLのチームをご紹介。私たちのミッション、方法論、そしてXRPウォレットと取引所レビューを独立かつ最新に保つ取り組み。",
    },
    contact: {
      title: "All Things XRPLへのお問い合わせ | 情報提供・修正・提携",
      description:
        "All Things XRPLにご連絡ください — 情報提供、修正のご提案、提携・掲載・編集に関するお問い合わせを承ります。",
    },
    faq: {
      title: "XRPウォレット&取引所FAQ(2026)| All Things XRPL",
      description:
        "All Things XRPL編集部が厳選した、XRPウォレット、取引所、手数料、セキュリティ、XRP Ledgerに関するよくある質問への回答。",
    },
    gettingStarted: {
      title: "XRPの買い方 — 初心者向けステップバイステップガイド(2026)",
      description:
        "2026年に最初のXRPを購入・保管・保護するためのシンプルなステップバイステップガイド。最適な取引所選び、ウォレット設定、よくあるミスの回避法。",
    },
    disclosure: {
      title: "編集方針とアフィリエイト開示 | All Things XRPL",
      description:
        "All Things XRPLの収益源、編集方針、アフィリエイトリンクポリシー、そしてXRPウォレットと取引所レビューの方法論。",
    },
    bestXrpWallets: {
      title: "2026年版 おすすめXRPウォレット | ソフトウェア・ハードウェア・コールドストレージ",
      description:
        "2026年のおすすめXRPウォレットを独立レビュー — ソフトウェア、ハードウェア、ブラウザ、エアギャップから、日常使用・コールドストレージ・XRPL DeFi向けの厳選を紹介。",
    },
    yield: {
      title: "XRPの利回り機会 2026 | ステーキング、AMM、エアドロップ",
      description:
        "2026年にXRPで利回りを得る最良の方法を比較 — Bitrue、Uphold、Krakenでの取引所ステーキング、XRPLネイティブAMM、トラストラインエアドロップ。",
    },
    walletQuiz: {
      title: "XRPウォレット診断 | 60秒であなたに最適なXRPウォレットが分かる",
      description:
        "簡単な質問に答えるだけで、初心者・ハードウェア・DeFi・コールドストレージなど用途に合った最適なXRPウォレットをご提案します。",
    },
    privacy: {
      title: "プライバシーポリシー | All Things XRPL",
      description:
        "All Things XRPLによるデータの収集・利用・保護方針 — Cookie、解析、メール登録、GDPR・CCPAに基づくあなたの権利。",
    },
    dapps: {
      title: "2026年版 おすすめXRPL DeFi & dApp | AMM・NFT・利回り厳選",
      description:
        "2026年に本当に時間と資金を投じる価値のあるXRPL DeFiプロトコル、AMMプール、NFTマーケットプレイスを実機厳選 — 編集部の結論を本文で公開。",
    },
    terms: {
      title: "利用規約 | All Things XRPL",
      description:
        "All Things XRPLの利用に関する規約 — コンテンツの免責事項、アフィリエイトリンク、知的財産、責任の制限。",
    },
  },
  ko: {
    news: {
      title: "XRPL 뉴스 & 시장 업데이트 (실시간) | All Things XRPL",
      description:
        "CoinDesk, Cointelegraph, Decrypt, U.Today 등에서 모은 실시간 XRP 및 XRPL 뉴스 — 끊임없이 갱신되어 시장 흐름을 놓치지 않습니다.",
    },
    blog: {
      title: "XRPL 블로그 & 지식 허브 | 가이드, AMM, NFT, 보안",
      description:
        "All Things XRPL 팀이 작성하는 XRP Ledger 심층 가이드와 분석 — DeFi, AMM 전략, NFT, 보안, 생태계 업데이트.",
    },
    about: {
      title: "All Things XRPL 소개 | 독립적인 XRP 지갑 & 거래소 리뷰",
      description:
        "All Things XRPL 팀을 소개합니다. 우리의 미션, 방법론, 그리고 XRP 지갑과 거래소 리뷰를 독립적이고 최신 상태로 유지하는 방법.",
    },
    contact: {
      title: "All Things XRPL 연락처 | 제보, 정정, 제휴",
      description:
        "All Things XRPL에 연락하세요 — 제보, 정정 요청, 제휴·등재·편집 관련 문의를 환영합니다.",
    },
    faq: {
      title: "XRP 지갑 & 거래소 FAQ (2026) | All Things XRPL",
      description:
        "XRP 지갑, 거래소, 수수료, 보안, XRP Ledger에 대한 가장 흔한 질문에 대한 답변 — All Things XRPL 편집팀이 큐레이션.",
    },
    gettingStarted: {
      title: "XRP 구매 방법 — 초보자 단계별 가이드 (2026)",
      description:
        "2026년에 첫 XRP를 구매·보관·보호하는 간단한 단계별 가이드. 적합한 거래소 선택, 지갑 설정, 흔한 실수 피하기.",
    },
    disclosure: {
      title: "편집 기준 및 제휴 고지 | All Things XRPL",
      description:
        "All Things XRPL의 자금원, 편집 기준, 제휴 링크 정책, 그리고 XRP 지갑과 거래소 리뷰 뒤의 방법론.",
    },
    bestXrpWallets: {
      title: "2026년 최고의 XRP 지갑 | 소프트웨어, 하드웨어, 콜드 스토리지 추천",
      description:
        "2026년 최고의 XRP 지갑 독립 리뷰 — 소프트웨어, 하드웨어, 브라우저, 에어갭 옵션을 일상 사용, 콜드 스토리지, XRPL DeFi 기준으로 정리.",
    },
    yield: {
      title: "2026년 XRP 수익 기회 | 스테이킹, AMM, 에어드롭",
      description:
        "2026년 XRP로 수익을 얻는 최고의 방법 비교 — Bitrue, Uphold, Kraken 거래소 스테이킹과 XRPL 네이티브 AMM, 트러스트라인 에어드롭.",
    },
    walletQuiz: {
      title: "XRP 지갑 퀴즈 | 60초만에 나에게 맞는 XRP 지갑 찾기",
      description:
        "몇 가지 짧은 질문에 답하면 초보자, 하드웨어, DeFi, 콜드 스토리지 등 필요에 맞는 최고의 XRP 지갑을 추천해 드립니다.",
    },
    privacy: {
      title: "개인정보 처리방침 | All Things XRPL",
      description:
        "All Things XRPL이 데이터를 수집, 사용, 보호하는 방법 — 쿠키, 분석, 이메일 구독, GDPR 및 CCPA에 따른 권리.",
    },
    dapps: {
      title: "2026년 최고의 XRPL DeFi & dApp | AMM·NFT·수익 추천",
      description:
        "2026년 정말로 시간과 자본을 들일 가치가 있는 XRPL DeFi 프로토콜, AMM 풀, NFT 마켓플레이스를 실사용 큐레이션 — 편집팀의 추천을 본문에서 공개.",
    },
    terms: {
      title: "서비스 약관 | All Things XRPL",
      description:
        "All Things XRPL 이용을 규율하는 약관 — 콘텐츠 면책, 제휴 링크, 지적 재산권, 책임 제한.",
    },
  },
  pt: {
    news: {
      title: "Notícias e atualizações da XRPL (ao vivo) | All Things XRPL",
      description:
        "Notícias ao vivo de XRP e XRPL agregadas do CoinDesk, Cointelegraph, Decrypt, U.Today e outros — atualizadas continuamente para você não perder nenhum movimento de mercado.",
    },
    blog: {
      title: "Blog e Hub de Conhecimento XRPL | Guias, AMM, NFTs e Segurança",
      description:
        "Guias e análises aprofundadas sobre o XRP Ledger — DeFi, estratégia de AMM, NFTs, segurança e novidades do ecossistema pela equipe All Things XRPL.",
    },
    about: {
      title: "Sobre o All Things XRPL | Análises independentes de carteiras e exchanges XRP",
      description:
        "Conheça a equipe por trás do All Things XRPL. Nossa missão, metodologia e como mantemos nossas análises de carteiras e exchanges XRP independentes e atualizadas.",
    },
    contact: {
      title: "Fale com o All Things XRPL | Dicas, correções e parcerias",
      description:
        "Entre em contato com o All Things XRPL — envie dicas, sugira correções ou fale sobre parcerias, listagens e questões editoriais.",
    },
    faq: {
      title: "FAQ de Carteiras e Exchanges XRP (2026) | All Things XRPL",
      description:
        "Respostas para as dúvidas mais comuns sobre carteiras XRP, exchanges, taxas, segurança e o XRP Ledger — curadas pelos editores do All Things XRPL.",
    },
    gettingStarted: {
      title: "Como comprar XRP — Guia passo a passo para iniciantes (2026)",
      description:
        "Um guia simples e passo a passo para comprar, guardar e proteger seu primeiro XRP em 2026. Escolha a exchange certa, configure uma carteira e evite erros comuns.",
    },
    disclosure: {
      title: "Padrões editoriais e divulgação de afiliados | All Things XRPL",
      description:
        "Como o All Things XRPL é financiado, nossos padrões editoriais, política de links de afiliado e a metodologia por trás das nossas análises de carteiras e exchanges XRP.",
    },
    bestXrpWallets: {
      title: "Melhores carteiras XRP 2026 | Software, hardware e cold storage",
      description:
        "Análises independentes das melhores carteiras XRP em 2026 — software, hardware, navegador e air-gapped para uso diário, cold storage e DeFi na XRPL.",
    },
    yield: {
      title: "Oportunidades de yield em XRP 2026 | Staking, AMM e airdrops",
      description:
        "Compare as melhores formas de gerar yield com XRP em 2026 — staking em exchanges como Bitrue, Uphold e Kraken, além do AMM nativo da XRPL e airdrops por trustline.",
    },
    walletQuiz: {
      title: "Quiz de carteiras XRP | Encontre sua carteira XRP ideal em 60 segundos",
      description:
        "Responda algumas perguntas rápidas e indicaremos a melhor carteira XRP para você — iniciante, hardware, DeFi ou cold storage.",
    },
    privacy: {
      title: "Política de privacidade | All Things XRPL",
      description:
        "Como o All Things XRPL coleta, usa e protege seus dados — cookies, análise, inscrições por e-mail e seus direitos sob o GDPR e o CCPA.",
    },
    dapps: {
      title: "Melhores DeFi e dApps do XRPL 2026 | AMM, NFTs e yield",
      description:
        "Os protocolos DeFi, pools AMM e marketplaces NFT do XRPL que realmente valem seu tempo e capital em 2026 — escolhas práticas com veredicto editorial dentro.",
    },
    terms: {
      title: "Termos de uso | All Things XRPL",
      description:
        "Os termos que regem o uso do All Things XRPL — isenções de conteúdo, links de afiliados, propriedade intelectual e limitação de responsabilidade.",
    },
  },
  de: {
    news: {
      title: "XRPL-News & Marktupdates (Live) | All Things XRPL",
      description:
        "Live-News zu XRP und XRPL, aggregiert aus CoinDesk, Cointelegraph, Decrypt, U.Today und mehr — laufend aktualisiert, damit du keine Marktbewegung verpasst.",
    },
    blog: {
      title: "XRPL-Blog & Wissens-Hub | Guides, AMM, NFTs & Sicherheit",
      description:
        "Tiefgehende Guides und Analysen zum XRP Ledger — DeFi, AMM-Strategie, NFTs, Sicherheit und Ökosystem-Updates vom All-Things-XRPL-Team.",
    },
    about: {
      title: "Über All Things XRPL | Unabhängige XRP-Wallet- und Börsen-Reviews",
      description:
        "Lerne das Team hinter All Things XRPL kennen. Unsere Mission, Methodik und wie wir unsere XRP-Wallet- und Börsen-Reviews unabhängig und aktuell halten.",
    },
    contact: {
      title: "All Things XRPL kontaktieren | Tipps, Korrekturen & Kooperationen",
      description:
        "Kontaktiere All Things XRPL — sende Tipps, schlage Korrekturen vor oder melde dich zu Kooperationen, Listings und redaktionellen Anfragen.",
    },
    faq: {
      title: "XRP-Wallet- & Börsen-FAQ (2026) | All Things XRPL",
      description:
        "Antworten auf die häufigsten Fragen zu XRP-Wallets, Börsen, Gebühren, Sicherheit und dem XRP Ledger — kuratiert von der All-Things-XRPL-Redaktion.",
    },
    gettingStarted: {
      title: "XRP kaufen — Schritt-für-Schritt-Anleitung für Einsteiger (2026)",
      description:
        "Eine einfache Schritt-für-Schritt-Anleitung zum Kauf, zur Aufbewahrung und Sicherung deines ersten XRP im Jahr 2026. Die richtige Börse wählen, eine Wallet einrichten, typische Fehler vermeiden.",
    },
    disclosure: {
      title: "Redaktionelle Standards & Affiliate-Offenlegung | All Things XRPL",
      description:
        "Wie All Things XRPL finanziert wird, unsere redaktionellen Standards, Affiliate-Link-Richtlinie und Methodik hinter unseren XRP-Wallet- und Börsen-Reviews.",
    },
    bestXrpWallets: {
      title: "Beste XRP-Wallets 2026 | Software, Hardware und Cold Storage",
      description:
        "Unabhängige Reviews der besten XRP-Wallets 2026 — Software-, Hardware-, Browser- und Air-Gapped-Optionen für den täglichen Gebrauch, Cold Storage und XRPL-DeFi.",
    },
    yield: {
      title: "XRP-Yield-Möglichkeiten 2026 | Staking, AMM und Airdrops",
      description:
        "Vergleiche die besten Möglichkeiten, mit XRP 2026 Rendite zu erzielen — Börsen-Staking bei Bitrue, Uphold und Kraken sowie das native XRPL-AMM und Trustline-Airdrops.",
    },
    walletQuiz: {
      title: "XRP-Wallet-Quiz | Finde in 60 Sekunden deine perfekte XRP-Wallet",
      description:
        "Beantworte ein paar kurze Fragen und wir empfehlen dir die beste XRP-Wallet für dich — Einsteiger, Hardware, DeFi oder Cold Storage.",
    },
    privacy: {
      title: "Datenschutzerklärung | All Things XRPL",
      description:
        "Wie All Things XRPL deine Daten erhebt, nutzt und schützt — Cookies, Analyse, E-Mail-Anmeldungen und deine Rechte gemäß DSGVO und CCPA.",
    },
    dapps: {
      title: "Beste XRPL DeFi & dApps 2026 | AMM, NFT & Yield-Picks",
      description:
        "Die XRPL-DeFi-Protokolle, AMM-Pools und NFT-Marktplätze, die 2026 deine Zeit und dein Kapital wirklich wert sind — Praxis-Picks mit Editor's Verdict im Beitrag.",
    },
    terms: {
      title: "Nutzungsbedingungen | All Things XRPL",
      description:
        "Die Bedingungen für die Nutzung von All Things XRPL — Inhaltshaftungsausschluss, Affiliate-Links, geistiges Eigentum und Haftungsbeschränkung.",
    },
  },
  fr: {
    news: {
      title: "Actualités et mises à jour XRPL (en direct) | All Things XRPL",
      description:
        "Actualités XRP et XRPL en direct, agrégées depuis CoinDesk, Cointelegraph, Decrypt, U.Today et plus — actualisées en continu pour ne rien manquer du marché.",
    },
    blog: {
      title: "Blog XRPL & Hub de connaissances | Guides, AMM, NFTs et sécurité",
      description:
        "Guides et analyses approfondis sur le XRP Ledger — DeFi, stratégie AMM, NFTs, sécurité et nouveautés de l'écosystème par l'équipe All Things XRPL.",
    },
    about: {
      title: "À propos d'All Things XRPL | Avis indépendants sur les portefeuilles et plateformes XRP",
      description:
        "Découvrez l'équipe d'All Things XRPL. Notre mission, notre méthodologie et la façon dont nous gardons nos avis sur les portefeuilles et plateformes XRP indépendants et à jour.",
    },
    contact: {
      title: "Contacter All Things XRPL | Tuyaux, corrections et partenariats",
      description:
        "Contactez All Things XRPL — envoyez des tuyaux, proposez des corrections ou parlez-nous de partenariats, de listings et de demandes éditoriales.",
    },
    faq: {
      title: "FAQ portefeuilles et plateformes XRP (2026) | All Things XRPL",
      description:
        "Réponses aux questions les plus fréquentes sur les portefeuilles XRP, les plateformes, les frais, la sécurité et le XRP Ledger — sélectionnées par la rédaction All Things XRPL.",
    },
    gettingStarted: {
      title: "Comment acheter du XRP — Guide pas à pas pour débutants (2026)",
      description:
        "Un guide simple, pas à pas, pour acheter, stocker et sécuriser votre premier XRP en 2026. Choisir la bonne plateforme, configurer un portefeuille et éviter les erreurs classiques.",
    },
    disclosure: {
      title: "Normes éditoriales et divulgation d'affiliation | All Things XRPL",
      description:
        "Comment All Things XRPL est financé, nos normes éditoriales, notre politique de liens d'affiliation et la méthodologie derrière nos avis sur les portefeuilles et plateformes XRP.",
    },
    bestXrpWallets: {
      title: "Meilleurs portefeuilles XRP 2026 | Logiciel, matériel et cold storage",
      description:
        "Avis indépendants sur les meilleurs portefeuilles XRP en 2026 — logiciel, matériel, navigateur et air-gapped pour l'usage quotidien, le cold storage et la DeFi XRPL.",
    },
    yield: {
      title: "Opportunités de rendement XRP 2026 | Staking, AMM et airdrops",
      description:
        "Comparez les meilleures façons d'obtenir du rendement avec XRP en 2026 — staking sur Bitrue, Uphold et Kraken, plus l'AMM natif XRPL et les airdrops par trustline.",
    },
    walletQuiz: {
      title: "Quiz portefeuille XRP | Trouvez votre portefeuille XRP idéal en 60 secondes",
      description:
        "Répondez à quelques questions rapides et nous vous recommanderons le meilleur portefeuille XRP pour vous — débutant, matériel, DeFi ou cold storage.",
    },
    privacy: {
      title: "Politique de confidentialité | All Things XRPL",
      description:
        "Comment All Things XRPL collecte, utilise et protège vos données — cookies, analyse, inscriptions par e-mail et vos droits au titre du RGPD et du CCPA.",
    },
    dapps: {
      title: "Meilleurs DeFi & dApps XRPL 2026 | AMM, NFT et rendement",
      description:
        "Les protocoles DeFi, pools AMM et marketplaces NFT XRPL qui méritent vraiment votre temps en 2026 — sélection pratique, verdict éditorial inclus.",
    },
    terms: {
      title: "Conditions d'utilisation | All Things XRPL",
      description:
        "Les conditions régissant votre utilisation d'All Things XRPL — avertissements sur le contenu, liens d'affiliation, propriété intellectuelle et limitation de responsabilité.",
    },
  },
};

export const bestForSeo: Record<Language, BestForSeoMap> = {
  en: {
    beginners: {
      title: "Best XRP Wallets for Beginners (2026) | All Things XRPL",
      description:
        "The easiest XRP wallets for first-time buyers in 2026 — free, well-built, beginner-friendly picks that won't trip you up. Verdict + 3 runners-up inside.",
    },
    hardware: {
      title: "Best Hardware Wallets for XRP (2026) | All Things XRPL",
      description:
        "The four hardware wallets we trust with our own XRP in 2026 — secure element, air-gapped and NFC options compared head-to-head. Verdict inside.",
    },
    "cold-storage": {
      title: "Best XRP Cold Storage Setups (2026) | All Things XRPL",
      description:
        "The cold storage setup we trust most for long-term XRP holdings in 2026 — fully offline keys, recovery and ops best practices. Editor's pick inside.",
    },
    defi: {
      title: "Best Wallets for XRPL DeFi (2026) | All Things XRPL",
      description:
        "The four wallets that actually let you sign DEX trades, AMM positions and dApp logins on the XRP Ledger in 2026. Verdict + 3 runners-up inside.",
    },
    safest: {
      title: "Safest XRP Wallet (2026) | All Things XRPL",
      description:
        "Our safest XRP wallet pick for 2026 — ranked by attack surface, hardware certification, recovery and ops risk. Editor's security verdict inside.",
    },
  },
  es: {
    beginners: {
      title: "Mejores carteras XRP para principiantes (2026) | All Things XRPL",
      description:
        "Las carteras XRP más fáciles para principiantes en 2026 — gratuitas, bien hechas y aptas para nuevos usuarios. Veredicto + 3 finalistas dentro.",
    },
    hardware: {
      title: "Mejores carteras hardware para XRP (2026) | All Things XRPL",
      description:
        "Las cuatro carteras hardware en las que confiamos nuestro propio XRP en 2026 — secure element, air-gapped y NFC cara a cara. Veredicto dentro.",
    },
    "cold-storage": {
      title: "Mejores configuraciones de almacenamiento en frío para XRP (2026) | All Things XRPL",
      description:
        "Nuestra configuración de cold storage más confiable para XRP a largo plazo en 2026 — claves offline, recuperación y prácticas operativas. Elección editorial.",
    },
    defi: {
      title: "Mejores carteras para XRPL DeFi (2026) | All Things XRPL",
      description:
        "Las cuatro carteras que sí firman operaciones en el DEX, posiciones AMM e inicios de sesión en dApps del XRP Ledger en 2026. Veredicto + 3 finalistas.",
    },
    safest: {
      title: "Cartera XRP más segura (2026) | All Things XRPL",
      description:
        "Nuestra cartera XRP más segura para 2026 — clasificada por superficie de ataque, certificación hardware, recuperación y riesgo operativo. Veredicto dentro.",
    },
  },
  zh: {
    beginners: {
      title: "新手最佳 XRP 钱包(2026)| All Things XRPL",
      description:
        "2026 年面向首次购买者最简单的 XRP 钱包——免费、做工出色、对新手友好。评测结论 + 3 款入围,尽在文中。",
    },
    hardware: {
      title: "最佳 XRP 硬件钱包(2026)| All Things XRPL",
      description:
        "2026 年我们愿意托付自己 XRP 的四款硬件钱包——安全芯片、气隙与 NFC 方案正面对比。评测结论尽在文中。",
    },
    "cold-storage": {
      title: "最佳 XRP 冷存储配置(2026)| All Things XRPL",
      description:
        "2026 年我们最信赖的长期 XRP 冷存储配置——完全离线密钥、恢复方案与运营最佳实践。编辑首选结论尽在文中。",
    },
    defi: {
      title: "XRPL DeFi 最佳钱包(2026)| All Things XRPL",
      description:
        "2026 年真正能在 XRP Ledger 上签署 DEX 交易、AMM 头寸与 dApp 登录的四款钱包。评测结论 + 3 款入围。",
    },
    safest: {
      title: "最安全的 XRP 钱包(2026)| All Things XRPL",
      description:
        "我们 2026 年评选的最安全 XRP 钱包——按攻击面、硬件认证、恢复方案与运营风险排名,而非按功能。安全结论尽在文中。",
    },
  },
  ja: {
    beginners: {
      title: "初心者向け最高のXRPウォレット(2026年)| All Things XRPL",
      description:
        "2026年に初めてXRPを買う人向けの、最もやさしいウォレット — 無料でしっかり作られた厳選。本命 + 3つの次点を本文で公開。",
    },
    hardware: {
      title: "XRPに最適なハードウェアウォレット(2026年)| All Things XRPL",
      description:
        "2026年に私たち自身のXRPを任せている4つのハードウェアウォレット — セキュアエレメント、エアギャップ、NFCを正面比較。本命を本文で公開。",
    },
    "cold-storage": {
      title: "XRPに最適なコールドストレージ構成(2026年)| All Things XRPL",
      description:
        "2026年の長期XRP保有に最も信頼している構成 — 完全オフラインの鍵、復旧、運用ベストプラクティス。編集部の本命を本文で公開。",
    },
    defi: {
      title: "XRPL DeFiに最適なウォレット(2026年)| All Things XRPL",
      description:
        "2026年にXRP Ledger上のDEX取引・AMMポジション・dAppログインに本当に署名できる4つのウォレット。本命 + 3つの次点を公開。",
    },
    safest: {
      title: "最も安全なXRPウォレット(2026年)| All Things XRPL",
      description:
        "2026年版の最も安全なXRPウォレット — 機能ではなく、攻撃面・ハードウェア認証・復旧・運用リスクで評価。編集部のセキュリティ本命を公開。",
    },
  },
  ko: {
    beginners: {
      title: "초보자를 위한 최고의 XRP 지갑 (2026) | All Things XRPL",
      description:
        "2026년 처음 XRP를 구매하는 사람을 위한 가장 쉬운 지갑 — 무료이고 잘 만들어진 엄선. 1위와 후보 3종을 본문에서 공개.",
    },
    hardware: {
      title: "XRP 최고의 하드웨어 지갑 (2026) | All Things XRPL",
      description:
        "2026년 저희 자산을 맡기는 네 가지 하드웨어 지갑 — 시큐어 엘리먼트, 에어갭, NFC를 정면 비교. 추천 1위를 본문에서 공개.",
    },
    "cold-storage": {
      title: "최고의 XRP 콜드 스토리지 구성 (2026) | All Things XRPL",
      description:
        "2026년 장기 XRP 보유에 가장 신뢰하는 구성 — 완전 오프라인 키, 복구, 운영 모범 사례. 에디터 추천을 본문에서 공개.",
    },
    defi: {
      title: "XRPL DeFi 최고의 지갑 (2026) | All Things XRPL",
      description:
        "2026년 XRP Ledger에서 DEX 거래, AMM 포지션, dApp 로그인에 실제로 서명할 수 있는 네 가지 지갑. 1위와 후보 3종까지 공개.",
    },
    safest: {
      title: "가장 안전한 XRP 지갑 (2026) | All Things XRPL",
      description:
        "2026년 가장 안전한 XRP 지갑 — 기능이 아닌 공격 표면, 하드웨어 인증, 복구, 운영 리스크 기준. 에디터의 보안 1위를 공개.",
    },
  },
  pt: {
    beginners: {
      title: "Melhores carteiras XRP para iniciantes (2026) | All Things XRPL",
      description:
        "As carteiras XRP mais fáceis para iniciantes em 2026 — gratuitas, bem feitas e amigáveis a novos usuários. Veredicto + 3 finalistas dentro.",
    },
    hardware: {
      title: "Melhores carteiras hardware para XRP (2026) | All Things XRPL",
      description:
        "As quatro carteiras hardware em que confiamos nossos próprios XRP em 2026 — secure element, air-gapped e NFC cara a cara. Veredicto dentro.",
    },
    "cold-storage": {
      title: "Melhores configurações de cold storage para XRP (2026) | All Things XRPL",
      description:
        "Nossa configuração de cold storage favorita para XRP de longo prazo em 2026 — chaves offline, recuperação e boas práticas operacionais. Escolha do editor.",
    },
    defi: {
      title: "Melhores carteiras para XRPL DeFi (2026) | All Things XRPL",
      description:
        "As quatro carteiras que de fato assinam trades DEX, posições AMM e logins dApp no XRP Ledger em 2026. Veredicto + 3 finalistas.",
    },
    safest: {
      title: "Carteira XRP mais segura (2026) | All Things XRPL",
      description:
        "Nossa carteira XRP mais segura para 2026 — classificada por superfície de ataque, certificação hardware, recuperação e risco operacional. Veredicto dentro.",
    },
  },
  de: {
    beginners: {
      title: "Beste XRP-Wallets für Einsteiger (2026) | All Things XRPL",
      description:
        "Die einfachsten XRP-Wallets für Erstkäufer 2026 — kostenlos, gut gebaut und einsteigerfreundlich. Fazit + 3 Finalisten im Beitrag.",
    },
    hardware: {
      title: "Beste Hardware-Wallets für XRP (2026) | All Things XRPL",
      description:
        "Die vier Hardware-Wallets, denen wir 2026 unsere eigenen XRP anvertrauen — Secure Element, Air-Gapped und NFC direkt verglichen. Fazit im Beitrag.",
    },
    "cold-storage": {
      title: "Beste XRP-Cold-Storage-Setups (2026) | All Things XRPL",
      description:
        "Unser bevorzugtes Cold-Storage-Setup für langfristige XRP-Bestände 2026 — vollständig offline, Wiederherstellung und Betriebs-Best-Practices. Editor's Pick.",
    },
    defi: {
      title: "Beste Wallets für XRPL-DeFi (2026) | All Things XRPL",
      description:
        "Die vier Wallets, mit denen du 2026 wirklich DEX-Trades, AMM-Positionen und dApp-Logins auf dem XRP Ledger signierst. Fazit + 3 Finalisten.",
    },
    safest: {
      title: "Sicherste XRP-Wallet (2026) | All Things XRPL",
      description:
        "Unsere sicherste XRP-Wallet für 2026 — bewertet nach Angriffsfläche, Hardware-Zertifizierung, Recovery und Betriebsrisiko. Sicherheits-Fazit im Beitrag.",
    },
  },
  fr: {
    beginners: {
      title: "Meilleurs portefeuilles XRP pour débutants (2026) | All Things XRPL",
      description:
        "Les portefeuilles XRP les plus faciles pour un premier achat en 2026 — gratuits, bien conçus et adaptés aux débutants. Verdict + 3 finalistes inclus.",
    },
    hardware: {
      title: "Meilleurs portefeuilles matériels pour XRP (2026) | All Things XRPL",
      description:
        "Les quatre portefeuilles matériels auxquels nous confions nos propres XRP en 2026 — secure element, air-gapped et NFC en face-à-face. Verdict inclus.",
    },
    "cold-storage": {
      title: "Meilleures configurations de cold storage XRP (2026) | All Things XRPL",
      description:
        "Notre cold storage préféré pour le XRP long terme en 2026 — clés hors ligne, récupération et bonnes pratiques. Choix de la rédaction inclus.",
    },
    defi: {
      title: "Meilleurs portefeuilles pour la DeFi XRPL (2026) | All Things XRPL",
      description:
        "Les quatre portefeuilles qui signent vraiment les trades DEX, positions AMM et connexions dApp sur le XRP Ledger en 2026. Verdict + 3 finalistes.",
    },
    safest: {
      title: "Portefeuille XRP le plus sûr (2026) | All Things XRPL",
      description:
        "Notre portefeuille XRP le plus sûr en 2026 — classé selon la surface d'attaque, la certification, la récupération et le risque opérationnel. Verdict inclus.",
    },
  },
};

export function getExchangeSeo(language: Language, slug: string): SeoEntry | undefined {
  return exchangeSeo[language]?.[slug] ?? exchangeSeo.en[slug];
}

export function getStaticPageSeo(language: Language, key: StaticPageKey): SeoEntry {
  return staticPageSeo[language]?.[key] ?? staticPageSeo.en[key];
}

export function getBestForSeo(language: Language, slug: string): SeoEntry | undefined {
  const map = bestForSeo[language] ?? bestForSeo.en;
  return map[slug as BestForSlug] ?? bestForSeo.en[slug as BestForSlug];
}
