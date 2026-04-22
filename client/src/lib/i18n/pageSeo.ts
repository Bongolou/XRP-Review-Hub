import type { Language } from "./translations";
import type { SeoEntry } from "./seoTranslations";

export type StaticPageKey =
  | "news"
  | "blog"
  | "about"
  | "contact"
  | "faq"
  | "gettingStarted"
  | "disclosure";

type ExchangeSeoMap = Record<string, SeoEntry>;
type StaticSeoMap = Record<StaticPageKey, SeoEntry>;

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
        "Hands-on Bitrue review for 2026. The XRP-focused exchange with Power Piggy yield, deep XRPL listings and 0.098% spot fees — plus security history and trade-offs.",
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
        "Reseña práctica de Bitrue para 2026. El exchange enfocado en XRP con yield Power Piggy, listados XRPL profundos y comisiones spot de 0,098 % — más historial de seguridad y compromisos.",
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
        "2026 年 Bitrue 实测评测。专注 XRP 的交易所,提供 Power Piggy 收益、丰富的 XRPL 上币以及 0.098% 现货费率——附安全历史与权衡。",
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
        "2026年版 Bitrueの実機レビュー。Power Piggyイールド、XRPLの豊富な上場、0.098%のスポット手数料を提供するXRP特化型取引所 — セキュリティ履歴とトレードオフも解説。",
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
        "2026년 Bitrue 실사용 리뷰. Power Piggy 수익, 풍부한 XRPL 상장, 0.098% 현물 수수료를 제공하는 XRP 특화 거래소 — 보안 이력과 트레이드오프 정리.",
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
        "Análise prática da Bitrue para 2026. A exchange focada em XRP com yield Power Piggy, listagens XRPL profundas e taxas spot de 0,098% — mais histórico de segurança e trade-offs.",
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
        "Praxistest von Bitrue für 2026. Die XRP-fokussierte Börse mit Power-Piggy-Yield, tiefen XRPL-Listings und 0,098 % Spot-Gebühren — plus Sicherheitshistorie und Trade-offs.",
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
        "Avis pratique de Bitrue pour 2026. La plateforme axée XRP avec le yield Power Piggy, des listings XRPL approfondis et des frais spot de 0,098 % — plus historique de sécurité et compromis.",
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
  },
};

export function getExchangeSeo(language: Language, slug: string): SeoEntry | undefined {
  return exchangeSeo[language]?.[slug] ?? exchangeSeo.en[slug];
}

export function getStaticPageSeo(language: Language, key: StaticPageKey): SeoEntry {
  return staticPageSeo[language]?.[key] ?? staticPageSeo.en[key];
}
