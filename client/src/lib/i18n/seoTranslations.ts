import type { Language } from "./translations";

export type SeoEntry = { title: string; description: string };

type SeoBundle = {
  home: SeoEntry;
  wallet: Record<string, SeoEntry>;
  compare: Record<string, SeoEntry>;
};

export const seoTranslations: Record<Language, SeoBundle> = {
  en: {
    home: {
      title: "Best XRP Wallets 2026 | Compare Xaman, Ledger, Tangem & More",
      description:
        "The XRP wallets we trust with our own coins in 2026. Hands-on picks for daily use, DeFi, hardware and cold storage — verdict inside, updated April 2026.",
    },
    wallet: {
      xaman: {
        title: "Xaman (XUMM) Review 2026 | Best Mobile XRP Wallet for XRPL DeFi",
        description:
          "Hands-on Xaman (XUMM) review for 2026. The best mobile XRP wallet for XRPL DEX, AMM and NFTs — features, security, fees and how it compares to Ledger.",
      },
      ledger: {
        title: "Ledger Nano X Review for XRP Holders (2026) | All Things XRPL",
        description:
          "Hands-on Ledger Nano X review for XRP holders: XRPL compatibility, security, ease of use, DeFi limitations, and who should buy it in 2026.",
      },
      tangem: {
        title: "Tangem Wallet Review for XRP (2026) | Card-Style Cold Storage | All Things XRPL",
        description:
          "Is Tangem a safe XRP wallet? Our hands-on Tangem review covers XRPL support, NFC tap-to-sign UX, security trade-offs, and who it's best for.",
      },
      trezor: {
        title: "Trezor Safe 3 Review 2026 | Open-Source Hardware Wallet for XRP",
        description:
          "Trezor Safe 3 review for 2026. Open-source hardware wallet with secure element — XRP support, fees, security model and head-to-head with Ledger Nano X.",
      },
      "trezor-safe-5": {
        title: "Trezor Safe 5 Review 2026 | Premium Touchscreen Hardware Wallet for XRP",
        description:
          "Trezor Safe 5 for XRP in 2026: premium open-source hardware wallet with color touchscreen and EAL6+ secure element. Verdict and Ledger Nano X comparison inside.",
      },
      ellipal: {
        title: "ELLIPAL Titan Review 2026 | Air-Gapped Cold Storage for XRP",
        description:
          "ELLIPAL Titan review for 2026. Fully air-gapped, QR-only XRP cold storage — security model, setup, fees and how it compares to Ledger and Trezor.",
      },
      crossmark: {
        title: "Crossmark Wallet Review 2026 | Browser Extension Wallet for XRPL",
        description:
          "Crossmark review for 2026. A MetaMask-style browser extension wallet for the XRP Ledger — DEX access, security, and how it compares to Xaman and Bifrost.",
      },
      bifrost: {
        title: "Bifrost Wallet Review 2026 | Multi-Chain XRPL DEX Mobile Wallet",
        description:
          "Bifrost Wallet review for 2026. Multi-chain mobile wallet with native XRPL DEX support — features, security, fees and how it compares to Xaman.",
      },
      gatehub: {
        title: "GateHub Review 2026 | EU-Regulated XRP Web Wallet & Fiat On-Ramp",
        description:
          "GateHub review for 2026. EU-regulated XRP web wallet with SEPA fiat on-ramp — fees, custody model, security, and how it compares to Xaman and Ledger.",
      },
      trustwallet: {
        title: "Trust Wallet XRP Review 2026 | Multi-Chain Mobile Wallet",
        description:
          "Trust Wallet XRP review for 2026. The Binance-backed multi-chain mobile wallet with basic XRP support — features, limitations, and Xaman alternatives.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X for XRP (2026) | Side-by-Side Comparison",
        description:
          "Xaman vs Ledger Nano X for XRP holders: fees, security, XRPL features, DeFi/AMM access, and which wallet wins for beginners vs long-term storage.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPL Mobile Wallet vs NFC Hardware Card",
        description:
          "Xaman vs Tangem for XRP in 2026. Compare mobile XRPL DeFi access vs an NFC hardware card — features, security, fees and which combo we recommend.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | XRP Hardware Wallet Comparison",
        description:
          "Ledger Nano X vs Tangem for XRP cold storage in 2026. Secure Element vs EAL6+ NFC card — security, price, portability and the verdict for XRP holders.",
      },
    },
  },

  es: {
    home: {
      title: "Mejores carteras XRP 2026 | Compara Xaman, Ledger, Tangem y más",
      description:
        "Las carteras XRP en las que confiamos en 2026. Selección práctica para uso diario, DeFi, hardware y cold storage — veredicto dentro, abril 2026.",
    },
    wallet: {
      xaman: {
        title: "Reseña de Xaman (XUMM) 2026 | La mejor cartera XRP móvil para DeFi en XRPL",
        description:
          "Reseña práctica de Xaman (XUMM) para 2026. La mejor cartera XRP móvil para el DEX, AMM y NFTs de XRPL — funciones, seguridad, comisiones y cómo se compara con Ledger.",
      },
      ledger: {
        title: "Reseña de Ledger Nano X para holders de XRP (2026) | All Things XRPL",
        description:
          "Reseña práctica del Ledger Nano X para holders de XRP: compatibilidad con XRPL, seguridad, facilidad de uso, limitaciones en DeFi y a quién le conviene en 2026.",
      },
      tangem: {
        title: "Reseña de Tangem para XRP (2026) | Almacenamiento en frío tipo tarjeta | All Things XRPL",
        description:
          "¿Es Tangem una cartera XRP segura? Nuestra reseña práctica de Tangem cubre compatibilidad con XRPL, la experiencia NFC tap-to-sign, las concesiones de seguridad y a quién le conviene.",
      },
      trezor: {
        title: "Reseña de Trezor Safe 3 2026 | Cartera hardware open source para XRP",
        description:
          "Reseña del Trezor Safe 3 para 2026. Cartera hardware open source con elemento seguro — soporte de XRP, comisiones, modelo de seguridad y cara a cara con el Ledger Nano X.",
      },
      ellipal: {
        title: "Reseña de ELLIPAL Titan 2026 | Almacenamiento en frío air-gapped para XRP",
        description:
          "Reseña del ELLIPAL Titan para 2026. Almacenamiento en frío de XRP totalmente air-gapped y solo por QR — modelo de seguridad, configuración, comisiones y comparativa con Ledger y Trezor.",
      },
      crossmark: {
        title: "Reseña de Crossmark 2026 | Cartera de extensión de navegador para XRPL",
        description:
          "Reseña de Crossmark para 2026. Una cartera estilo MetaMask en extensión de navegador para el XRP Ledger — acceso al DEX, seguridad y cómo se compara con Xaman y Bifrost.",
      },
      bifrost: {
        title: "Reseña de Bifrost Wallet 2026 | Cartera móvil multi-cadena con DEX XRPL",
        description:
          "Reseña de Bifrost Wallet para 2026. Cartera móvil multi-cadena con soporte nativo del DEX de XRPL — funciones, seguridad, comisiones y cómo se compara con Xaman.",
      },
      gatehub: {
        title: "Reseña de GateHub 2026 | Cartera web XRP regulada en la UE con on-ramp fiat",
        description:
          "Reseña de GateHub para 2026. Cartera web XRP regulada en la UE con on-ramp fiat por SEPA — comisiones, modelo de custodia, seguridad y comparativa con Xaman y Ledger.",
      },
      trustwallet: {
        title: "Reseña de Trust Wallet XRP 2026 | Cartera móvil multi-cadena",
        description:
          "Reseña de Trust Wallet XRP para 2026. La cartera móvil multi-cadena respaldada por Binance con soporte básico de XRP — funciones, limitaciones y alternativas a Xaman.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X para XRP (2026) | Comparativa lado a lado",
        description:
          "Xaman vs Ledger Nano X para holders de XRP: comisiones, seguridad, funciones de XRPL, acceso a DeFi/AMM y qué cartera gana para principiantes frente a almacenamiento a largo plazo.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | Cartera móvil XRPL vs tarjeta hardware NFC",
        description:
          "Xaman vs Tangem para XRP en 2026. Compara el acceso móvil a DeFi en XRPL frente a una tarjeta hardware NFC — funciones, seguridad, comisiones y qué combinación recomendamos.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Comparativa de carteras hardware para XRP",
        description:
          "Ledger Nano X vs Tangem para almacenamiento en frío de XRP en 2026. Elemento seguro vs tarjeta NFC EAL6+ — seguridad, precio, portabilidad y veredicto para holders de XRP.",
      },
    },
  },

  zh: {
    home: {
      title: "2026 年最佳 XRP 钱包 | 比较 Xaman、Ledger、Tangem 等",
      description:
        "2026 年我们愿意托付自己 XRP 的钱包。日常使用、DeFi、硬件与冷存储的实测推荐——内含结论,2026 年 4 月更新。",
    },
    wallet: {
      xaman: {
        title: "Xaman (XUMM) 评测 2026 | XRPL DeFi 最佳移动 XRP 钱包",
        description:
          "2026 年 Xaman (XUMM) 的实测评测。最适合 XRPL DEX、AMM 和 NFT 的移动 XRP 钱包——功能、安全性、费用,以及与 Ledger 的对比。",
      },
      ledger: {
        title: "Ledger Nano X XRP 持有者评测 (2026) | All Things XRPL",
        description:
          "面向 XRP 持有者的 Ledger Nano X 实测评测:XRPL 兼容性、安全性、易用性、DeFi 限制,以及 2026 年谁适合购买。",
      },
      tangem: {
        title: "Tangem 钱包 XRP 评测 (2026) | 卡片式冷存储 | All Things XRPL",
        description:
          "Tangem 是安全的 XRP 钱包吗?我们的实测评测涵盖 XRPL 支持、NFC 触碰签名体验、安全性权衡,以及最适合谁。",
      },
      trezor: {
        title: "Trezor Safe 3 评测 2026 | 面向 XRP 的开源硬件钱包",
        description:
          "2026 年 Trezor Safe 3 评测。带安全芯片的开源硬件钱包——XRP 支持、费用、安全模型,以及与 Ledger Nano X 的正面对比。",
      },
      ellipal: {
        title: "ELLIPAL Titan 评测 2026 | XRP 完全离线冷存储",
        description:
          "2026 年 ELLIPAL Titan 评测。完全空气隔离、仅二维码的 XRP 冷存储——安全模型、设置、费用,以及与 Ledger 和 Trezor 的对比。",
      },
      crossmark: {
        title: "Crossmark 钱包评测 2026 | XRPL 浏览器扩展钱包",
        description:
          "2026 年 Crossmark 评测。一款类似 MetaMask 的 XRP Ledger 浏览器扩展钱包——DEX 访问、安全性,以及与 Xaman 和 Bifrost 的对比。",
      },
      bifrost: {
        title: "Bifrost 钱包评测 2026 | 多链 XRPL DEX 移动钱包",
        description:
          "2026 年 Bifrost 钱包评测。原生支持 XRPL DEX 的多链移动钱包——功能、安全性、费用,以及与 Xaman 的对比。",
      },
      gatehub: {
        title: "GateHub 评测 2026 | 受欧盟监管的 XRP 网页钱包与法币入金通道",
        description:
          "2026 年 GateHub 评测。受欧盟监管、支持 SEPA 法币入金的 XRP 网页钱包——费用、托管模式、安全性,以及与 Xaman 和 Ledger 的对比。",
      },
      trustwallet: {
        title: "Trust Wallet XRP 评测 2026 | 多链移动钱包",
        description:
          "2026 年 Trust Wallet XRP 评测。Binance 支持的多链移动钱包,具备基础 XRP 支持——功能、局限性,以及 Xaman 替代方案。",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman 对比 Ledger Nano X (2026) | XRP 钱包并排对比",
        description:
          "面向 XRP 持有者的 Xaman 与 Ledger Nano X 对比:费用、安全性、XRPL 功能、DeFi/AMM 访问,以及新手与长期存储分别更适合哪款。",
      },
      "xaman-vs-tangem": {
        title: "Xaman 对比 Tangem 2026 | XRPL 移动钱包对比 NFC 硬件卡",
        description:
          "2026 年 Xaman 与 Tangem 对比 XRP。比较移动端 XRPL DeFi 访问与 NFC 硬件卡——功能、安全性、费用,以及我们推荐的组合方案。",
      },
      "ledger-vs-tangem": {
        title: "Ledger 对比 Tangem 2026 | XRP 硬件钱包对比",
        description:
          "2026 年 Ledger Nano X 与 Tangem XRP 冷存储对比。安全芯片对比 EAL6+ NFC 卡——安全性、价格、便携性,以及面向 XRP 持有者的结论。",
      },
    },
  },

  ja: {
    home: {
      title: "2026年版 おすすめXRPウォレット | Xaman・Ledger・Tangemほかを比較",
      description:
        "2026年に自分のXRPを任せているウォレット。日常使い・DeFi・ハードウェア・コールドストレージ向けの実機厳選 — 結論を中で公開、2026年4月更新。",
    },
    wallet: {
      xaman: {
        title: "Xaman (XUMM) レビュー 2026 | XRPL DeFi向け最強モバイルXRPウォレット",
        description:
          "2026年版 Xaman (XUMM) の実機レビュー。XRPL DEX・AMM・NFTに最適なモバイルXRPウォレット — 機能、セキュリティ、手数料、Ledgerとの比較を解説。",
      },
      ledger: {
        title: "Ledger Nano X レビュー(XRPホルダー向け / 2026) | All Things XRPL",
        description:
          "XRPホルダー向けLedger Nano Xの実機レビュー:XRPL対応、セキュリティ、使いやすさ、DeFiの制約、2026年に誰が買うべきかを解説。",
      },
      tangem: {
        title: "Tangem ウォレット XRPレビュー(2026) | カード型コールドストレージ | All Things XRPL",
        description:
          "TangemはXRPに安全か?XRPL対応、NFCタップ署名のUX、セキュリティのトレードオフ、最適なユーザー像を実機レビューで解説。",
      },
      trezor: {
        title: "Trezor Safe 3 レビュー 2026 | XRP向けオープンソース・ハードウェアウォレット",
        description:
          "2026年版 Trezor Safe 3 レビュー。セキュアエレメント搭載のオープンソース・ハードウェアウォレット — XRP対応、手数料、セキュリティモデル、Ledger Nano Xとの直接比較。",
      },
      ellipal: {
        title: "ELLIPAL Titan レビュー 2026 | 完全エアギャップのXRPコールドストレージ",
        description:
          "2026年版 ELLIPAL Titan レビュー。完全エアギャップ・QRオンリーのXRPコールドストレージ — セキュリティモデル、設定、手数料、LedgerやTrezorとの比較。",
      },
      crossmark: {
        title: "Crossmark ウォレットレビュー 2026 | XRPL向けブラウザ拡張ウォレット",
        description:
          "2026年版 Crossmark レビュー。XRP Ledger向けのMetaMask風ブラウザ拡張ウォレット — DEXアクセス、セキュリティ、XamanやBifrostとの比較。",
      },
      bifrost: {
        title: "Bifrost ウォレットレビュー 2026 | マルチチェーンXRPL DEX対応モバイルウォレット",
        description:
          "2026年版 Bifrost ウォレットレビュー。XRPL DEXをネイティブサポートするマルチチェーン・モバイルウォレット — 機能、セキュリティ、手数料、Xamanとの比較。",
      },
      gatehub: {
        title: "GateHub レビュー 2026 | EU規制下のXRPウェブウォレット&法定通貨オンランプ",
        description:
          "2026年版 GateHub レビュー。EU規制下、SEPA法定通貨オンランプ対応のXRPウェブウォレット — 手数料、カストディモデル、セキュリティ、XamanやLedgerとの比較。",
      },
      trustwallet: {
        title: "Trust Wallet XRPレビュー 2026 | マルチチェーン・モバイルウォレット",
        description:
          "2026年版 Trust Wallet XRPレビュー。Binance系列のマルチチェーン・モバイルウォレットによる基本的なXRP対応 — 機能、制約、Xamanの代替案。",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X(XRP / 2026) | 横並び比較",
        description:
          "XRPホルダー向けXaman対Ledger Nano X:手数料、セキュリティ、XRPL機能、DeFi/AMMアクセス、初心者と長期保管それぞれの勝者を解説。",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPLモバイルウォレット対NFCハードウェアカード",
        description:
          "2026年のXRPでXaman対Tangem。モバイルXRPL DeFiアクセスとNFCハードウェアカードを比較 — 機能、セキュリティ、手数料、おすすめの組み合わせ。",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | XRPハードウェアウォレット比較",
        description:
          "2026年のXRPコールドストレージ向けLedger Nano X対Tangem。セキュアエレメント対EAL6+ NFCカード — セキュリティ、価格、携帯性、XRPホルダーへの結論。",
      },
    },
  },

  ko: {
    home: {
      title: "2026년 최고의 XRP 지갑 | Xaman, Ledger, Tangem 등 비교",
      description:
        "2026년 우리가 직접 사용하는 XRP 지갑. 일상 사용, DeFi, 하드웨어, 콜드 스토리지를 위한 실사용 추천 — 평가 내장, 2026년 4월 업데이트.",
    },
    wallet: {
      xaman: {
        title: "Xaman (XUMM) 리뷰 2026 | XRPL DeFi에 최적인 모바일 XRP 지갑",
        description:
          "2026년 Xaman (XUMM) 실사용 리뷰. XRPL DEX·AMM·NFT에 최적인 모바일 XRP 지갑 — 기능, 보안, 수수료, Ledger와의 비교.",
      },
      ledger: {
        title: "XRP 보유자를 위한 Ledger Nano X 리뷰 (2026) | All Things XRPL",
        description:
          "XRP 보유자를 위한 Ledger Nano X 실사용 리뷰: XRPL 호환성, 보안, 사용 편의성, DeFi 한계, 2026년에 누구에게 적합한지 정리.",
      },
      tangem: {
        title: "XRP용 Tangem 지갑 리뷰 (2026) | 카드형 콜드 스토리지 | All Things XRPL",
        description:
          "Tangem은 안전한 XRP 지갑일까? 실사용 리뷰로 XRPL 지원, NFC 탭-투-사인 UX, 보안 트레이드오프, 적합한 사용자를 살펴봅니다.",
      },
      trezor: {
        title: "Trezor Safe 3 리뷰 2026 | XRP를 위한 오픈소스 하드웨어 지갑",
        description:
          "2026년 Trezor Safe 3 리뷰. 시큐어 엘리먼트가 탑재된 오픈소스 하드웨어 지갑 — XRP 지원, 수수료, 보안 모델, Ledger Nano X와의 정면 비교.",
      },
      ellipal: {
        title: "ELLIPAL Titan 리뷰 2026 | XRP를 위한 완전 에어갭 콜드 스토리지",
        description:
          "2026년 ELLIPAL Titan 리뷰. 완전 에어갭, QR 전용 XRP 콜드 스토리지 — 보안 모델, 설정, 수수료, Ledger 및 Trezor와의 비교.",
      },
      crossmark: {
        title: "Crossmark 지갑 리뷰 2026 | XRPL용 브라우저 확장 지갑",
        description:
          "2026년 Crossmark 리뷰. MetaMask 스타일의 XRP Ledger 브라우저 확장 지갑 — DEX 접근, 보안, Xaman 및 Bifrost와의 비교.",
      },
      bifrost: {
        title: "Bifrost 지갑 리뷰 2026 | 멀티체인 XRPL DEX 모바일 지갑",
        description:
          "2026년 Bifrost 지갑 리뷰. XRPL DEX를 네이티브로 지원하는 멀티체인 모바일 지갑 — 기능, 보안, 수수료, Xaman과의 비교.",
      },
      gatehub: {
        title: "GateHub 리뷰 2026 | EU 규제 XRP 웹 지갑 & 법정화폐 온램프",
        description:
          "2026년 GateHub 리뷰. SEPA 법정화폐 온램프를 갖춘 EU 규제 XRP 웹 지갑 — 수수료, 커스터디 모델, 보안, Xaman 및 Ledger와의 비교.",
      },
      trustwallet: {
        title: "Trust Wallet XRP 리뷰 2026 | 멀티체인 모바일 지갑",
        description:
          "2026년 Trust Wallet XRP 리뷰. Binance가 후원하는 멀티체인 모바일 지갑의 기본적인 XRP 지원 — 기능, 한계, Xaman 대안.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "XRP를 위한 Xaman vs Ledger Nano X (2026) | 나란히 비교",
        description:
          "XRP 보유자를 위한 Xaman vs Ledger Nano X: 수수료, 보안, XRPL 기능, DeFi/AMM 접근, 초보자 대 장기 보관에서 각각의 승자를 정리.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPL 모바일 지갑 대 NFC 하드웨어 카드",
        description:
          "2026년 XRP에서 Xaman vs Tangem. 모바일 XRPL DeFi 접근과 NFC 하드웨어 카드를 비교 — 기능, 보안, 수수료, 추천 조합.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | XRP 하드웨어 지갑 비교",
        description:
          "2026년 XRP 콜드 스토리지를 위한 Ledger Nano X vs Tangem. 시큐어 엘리먼트 대 EAL6+ NFC 카드 — 보안, 가격, 휴대성, XRP 보유자에 대한 결론.",
      },
    },
  },

  pt: {
    home: {
      title: "Melhores Carteiras XRP 2026 | Compare Xaman, Ledger, Tangem e mais",
      description:
        "As carteiras XRP nas quais confiamos nossos próprios coins em 2026. Escolhas práticas para uso diário, DeFi, hardware e cold storage — veredicto dentro.",
    },
    wallet: {
      xaman: {
        title: "Análise da Xaman (XUMM) 2026 | Melhor carteira XRP mobile para DeFi na XRPL",
        description:
          "Análise prática da Xaman (XUMM) para 2026. A melhor carteira XRP mobile para DEX, AMM e NFTs da XRPL — recursos, segurança, taxas e comparação com a Ledger.",
      },
      ledger: {
        title: "Análise da Ledger Nano X para holders de XRP (2026) | All Things XRPL",
        description:
          "Análise prática da Ledger Nano X para holders de XRP: compatibilidade com a XRPL, segurança, facilidade de uso, limitações em DeFi e para quem vale a pena em 2026.",
      },
      tangem: {
        title: "Análise da Tangem para XRP (2026) | Cold storage em formato de cartão | All Things XRPL",
        description:
          "A Tangem é uma carteira XRP segura? Nossa análise prática cobre suporte à XRPL, a UX de assinar com toque NFC, trade-offs de segurança e para quem é mais indicada.",
      },
      trezor: {
        title: "Análise da Trezor Safe 3 2026 | Carteira hardware open source para XRP",
        description:
          "Análise da Trezor Safe 3 para 2026. Carteira hardware open source com secure element — suporte a XRP, taxas, modelo de segurança e duelo com a Ledger Nano X.",
      },
      ellipal: {
        title: "Análise da ELLIPAL Titan 2026 | Cold storage 100% air-gapped para XRP",
        description:
          "Análise da ELLIPAL Titan para 2026. Cold storage de XRP totalmente air-gapped, apenas por QR — modelo de segurança, configuração, taxas e comparação com Ledger e Trezor.",
      },
      crossmark: {
        title: "Análise da Crossmark 2026 | Carteira em extensão de navegador para a XRPL",
        description:
          "Análise da Crossmark para 2026. Uma carteira em extensão de navegador no estilo MetaMask para o XRP Ledger — acesso ao DEX, segurança e comparação com Xaman e Bifrost.",
      },
      bifrost: {
        title: "Análise da Bifrost Wallet 2026 | Carteira mobile multichain com DEX da XRPL",
        description:
          "Análise da Bifrost Wallet para 2026. Carteira mobile multichain com suporte nativo ao DEX da XRPL — recursos, segurança, taxas e comparação com a Xaman.",
      },
      gatehub: {
        title: "Análise da GateHub 2026 | Carteira web XRP regulada na UE com on-ramp fiat",
        description:
          "Análise da GateHub para 2026. Carteira web XRP regulada na UE com on-ramp fiat via SEPA — taxas, modelo de custódia, segurança e comparação com Xaman e Ledger.",
      },
      trustwallet: {
        title: "Análise da Trust Wallet XRP 2026 | Carteira mobile multichain",
        description:
          "Análise da Trust Wallet XRP para 2026. A carteira mobile multichain apoiada pela Binance, com suporte básico a XRP — recursos, limitações e alternativas à Xaman.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X para XRP (2026) | Comparativo lado a lado",
        description:
          "Xaman vs Ledger Nano X para holders de XRP: taxas, segurança, recursos da XRPL, acesso a DeFi/AMM e qual carteira ganha para iniciantes vs guarda de longo prazo.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | Carteira mobile XRPL vs cartão hardware NFC",
        description:
          "Xaman vs Tangem para XRP em 2026. Compare o acesso mobile à DeFi da XRPL com um cartão hardware NFC — recursos, segurança, taxas e a combinação que recomendamos.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Comparativo de carteiras hardware para XRP",
        description:
          "Ledger Nano X vs Tangem para cold storage de XRP em 2026. Secure element vs cartão NFC EAL6+ — segurança, preço, portabilidade e veredicto para holders de XRP.",
      },
    },
  },

  de: {
    home: {
      title: "Beste XRP-Wallets 2026 | Xaman, Ledger, Tangem & mehr im Vergleich",
      description:
        "Die XRP-Wallets, denen wir 2026 unsere eigenen Coins anvertrauen. Praxis-Picks für Alltag, DeFi, Hardware und Cold Storage — Fazit inklusive, Stand April 2026.",
    },
    wallet: {
      xaman: {
        title: "Xaman (XUMM) Test 2026 | Beste mobile XRP-Wallet für XRPL-DeFi",
        description:
          "Praxis-Test der Xaman (XUMM) für 2026. Die beste mobile XRP-Wallet für XRPL-DEX, AMM und NFTs — Funktionen, Sicherheit, Gebühren und Vergleich mit Ledger.",
      },
      ledger: {
        title: "Ledger Nano X Test für XRP-Holder (2026) | All Things XRPL",
        description:
          "Praxis-Test der Ledger Nano X für XRP-Holder: XRPL-Kompatibilität, Sicherheit, Bedienkomfort, DeFi-Limits und für wen sich der Kauf 2026 lohnt.",
      },
      tangem: {
        title: "Tangem Wallet Test für XRP (2026) | Karten-Cold-Storage | All Things XRPL",
        description:
          "Ist Tangem eine sichere XRP-Wallet? Unser Praxis-Test deckt XRPL-Support, NFC-Tap-to-Sign-UX, Sicherheits-Trade-offs und die ideale Zielgruppe ab.",
      },
      trezor: {
        title: "Trezor Safe 3 Test 2026 | Open-Source-Hardware-Wallet für XRP",
        description:
          "Trezor Safe 3 Test für 2026. Open-Source-Hardware-Wallet mit Secure Element — XRP-Support, Gebühren, Sicherheitsmodell und direkter Vergleich mit der Ledger Nano X.",
      },
      ellipal: {
        title: "ELLIPAL Titan Test 2026 | Komplett air-gapped Cold-Storage für XRP",
        description:
          "ELLIPAL Titan Test für 2026. Vollständig air-gapped, ausschließlich QR-basierte XRP-Cold-Storage — Sicherheitsmodell, Setup, Gebühren und Vergleich mit Ledger und Trezor.",
      },
      crossmark: {
        title: "Crossmark Wallet Test 2026 | Browser-Extension-Wallet für XRPL",
        description:
          "Crossmark Test für 2026. Eine Browser-Extension-Wallet im MetaMask-Stil für das XRP Ledger — DEX-Zugang, Sicherheit und Vergleich mit Xaman und Bifrost.",
      },
      bifrost: {
        title: "Bifrost Wallet Test 2026 | Multichain-Mobile-Wallet mit XRPL-DEX",
        description:
          "Bifrost Wallet Test für 2026. Multichain-Mobile-Wallet mit nativer XRPL-DEX-Unterstützung — Funktionen, Sicherheit, Gebühren und Vergleich mit Xaman.",
      },
      gatehub: {
        title: "GateHub Test 2026 | EU-regulierte XRP-Web-Wallet & Fiat-On-Ramp",
        description:
          "GateHub Test für 2026. EU-regulierte XRP-Web-Wallet mit SEPA-Fiat-On-Ramp — Gebühren, Custody-Modell, Sicherheit und Vergleich mit Xaman und Ledger.",
      },
      trustwallet: {
        title: "Trust Wallet XRP Test 2026 | Multichain-Mobile-Wallet",
        description:
          "Trust Wallet XRP Test für 2026. Die von Binance unterstützte Multichain-Mobile-Wallet mit grundlegender XRP-Unterstützung — Funktionen, Grenzen und Xaman-Alternativen.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X für XRP (2026) | Direktvergleich",
        description:
          "Xaman vs Ledger Nano X für XRP-Holder: Gebühren, Sicherheit, XRPL-Funktionen, DeFi/AMM-Zugang und welche Wallet für Einsteiger vs Langzeit-Storage gewinnt.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPL-Mobile-Wallet vs NFC-Hardware-Karte",
        description:
          "Xaman vs Tangem für XRP 2026. Vergleiche mobilen XRPL-DeFi-Zugang mit einer NFC-Hardware-Karte — Funktionen, Sicherheit, Gebühren und unsere empfohlene Kombination.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Vergleich der XRP-Hardware-Wallets",
        description:
          "Ledger Nano X vs Tangem für XRP-Cold-Storage 2026. Secure Element vs EAL6+ NFC-Karte — Sicherheit, Preis, Mobilität und das Fazit für XRP-Holder.",
      },
    },
  },

  fr: {
    home: {
      title: "Meilleurs portefeuilles XRP 2026 | Comparez Xaman, Ledger, Tangem et plus",
      description:
        "Les portefeuilles XRP en lesquels nous avons confiance en 2026. Sélection pratique pour le quotidien, la DeFi, le matériel et le cold storage — verdict inclus.",
    },
    wallet: {
      xaman: {
        title: "Test Xaman (XUMM) 2026 | Meilleur portefeuille XRP mobile pour la DeFi XRPL",
        description:
          "Test pratique de Xaman (XUMM) pour 2026. Le meilleur portefeuille XRP mobile pour le DEX, l'AMM et les NFT XRPL — fonctionnalités, sécurité, frais et comparaison avec Ledger.",
      },
      ledger: {
        title: "Test Ledger Nano X pour les détenteurs de XRP (2026) | All Things XRPL",
        description:
          "Test pratique de la Ledger Nano X pour les détenteurs de XRP : compatibilité XRPL, sécurité, ergonomie, limites en DeFi et pour qui c'est fait en 2026.",
      },
      tangem: {
        title: "Test Tangem pour XRP (2026) | Cold storage au format carte | All Things XRPL",
        description:
          "Tangem est-il un portefeuille XRP sûr ? Notre test pratique couvre le support XRPL, l'UX de signature NFC, les compromis de sécurité et le profil idéal d'utilisateur.",
      },
      trezor: {
        title: "Test Trezor Safe 3 2026 | Portefeuille hardware open source pour XRP",
        description:
          "Test du Trezor Safe 3 pour 2026. Portefeuille hardware open source avec secure element — support XRP, frais, modèle de sécurité et duel avec la Ledger Nano X.",
      },
      ellipal: {
        title: "Test ELLIPAL Titan 2026 | Cold storage 100 % air-gapped pour XRP",
        description:
          "Test de l'ELLIPAL Titan pour 2026. Cold storage XRP entièrement air-gapped, en QR uniquement — modèle de sécurité, configuration, frais et comparaison avec Ledger et Trezor.",
      },
      crossmark: {
        title: "Test Crossmark 2026 | Portefeuille extension de navigateur pour XRPL",
        description:
          "Test de Crossmark pour 2026. Un portefeuille en extension de navigateur façon MetaMask pour le XRP Ledger — accès DEX, sécurité et comparaison avec Xaman et Bifrost.",
      },
      bifrost: {
        title: "Test Bifrost Wallet 2026 | Portefeuille mobile multichain avec DEX XRPL",
        description:
          "Test de Bifrost Wallet pour 2026. Portefeuille mobile multichain avec support natif du DEX XRPL — fonctionnalités, sécurité, frais et comparaison avec Xaman.",
      },
      gatehub: {
        title: "Test GateHub 2026 | Portefeuille web XRP régulé en UE & on-ramp fiat",
        description:
          "Test de GateHub pour 2026. Portefeuille web XRP régulé en UE avec on-ramp fiat SEPA — frais, modèle de conservation, sécurité et comparaison avec Xaman et Ledger.",
      },
      trustwallet: {
        title: "Test Trust Wallet XRP 2026 | Portefeuille mobile multichain",
        description:
          "Test de Trust Wallet XRP pour 2026. Le portefeuille mobile multichain soutenu par Binance avec un support XRP basique — fonctionnalités, limites et alternatives à Xaman.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X pour XRP (2026) | Comparatif côte à côte",
        description:
          "Xaman vs Ledger Nano X pour les détenteurs de XRP : frais, sécurité, fonctionnalités XRPL, accès DeFi/AMM et quel portefeuille gagne pour les débutants vs le stockage long terme.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | Portefeuille mobile XRPL vs carte hardware NFC",
        description:
          "Xaman vs Tangem pour XRP en 2026. Comparez l'accès mobile à la DeFi XRPL et une carte hardware NFC — fonctionnalités, sécurité, frais et la combinaison que nous recommandons.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Comparatif des portefeuilles hardware pour XRP",
        description:
          "Ledger Nano X vs Tangem pour le cold storage XRP en 2026. Secure element vs carte NFC EAL6+ — sécurité, prix, portabilité et verdict pour les détenteurs de XRP.",
      },
    },
  },
};

export function getSeoEntry(
  language: Language,
  section: "wallet" | "compare",
  slug: string,
): SeoEntry | undefined {
  return (
    seoTranslations[language]?.[section]?.[slug] ??
    seoTranslations.en[section][slug]
  );
}

export function getHomeSeo(language: Language): SeoEntry {
  return seoTranslations[language]?.home ?? seoTranslations.en.home;
}
