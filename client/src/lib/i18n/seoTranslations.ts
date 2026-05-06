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
          "Hands-on Xaman (XUMM) review for 2026 — the best mobile XRP wallet for XRPL DEX, AMM and NFTs. Features, security, fees and Ledger comparison inside.",
      },
      ledger: {
        title: "Ledger Nano X Review for XRP Holders (2026) | All Things XRPL",
        description:
          "Hands-on Ledger Nano X review for XRP holders in 2026 — XRPL compatibility, security, ease of use, DeFi limitations and who should buy it. Verdict inside.",
      },
      tangem: {
        title: "Tangem Wallet Review for XRP (2026) | Card-Style Cold Storage | All Things XRPL",
        description:
          "Is Tangem a safe XRP wallet? Hands-on review covering XRPL support, NFC tap-to-sign UX, security trade-offs and who it's best for in 2026. Verdict inside.",
      },
      trezor: {
        title: "Trezor Safe 3 Review 2026 | Open-Source Hardware Wallet for XRP",
        description:
          "Trezor Safe 3 for XRP in 2026 — open-source hardware wallet with secure element. XRP support, fees, security model and Ledger Nano X comparison inside.",
      },
      "trezor-safe-5": {
        title: "Trezor Safe 5 Review 2026 | Premium Touchscreen Hardware Wallet for XRP",
        description:
          "Trezor Safe 5 for XRP in 2026: premium open-source hardware wallet with color touchscreen and EAL6+ secure element. Verdict and Ledger Nano X comparison inside.",
      },
      ellipal: {
        title: "ELLIPAL Titan Review 2026 | Air-Gapped Cold Storage for XRP",
        description:
          "ELLIPAL Titan for XRP in 2026 — fully air-gapped, QR-only cold storage. Security model, setup, fees and how it compares to Ledger and Trezor. Verdict inside.",
      },
      crossmark: {
        title: "Crossmark Wallet Review 2026 | Browser Extension Wallet for XRPL",
        description:
          "Crossmark for 2026 — a MetaMask-style browser extension wallet for the XRP Ledger. DEX access, security and how it compares to Xaman and Bifrost inside.",
      },
      bifrost: {
        title: "Bifrost Wallet Review 2026 | Multi-Chain XRPL DEX Mobile Wallet",
        description:
          "Bifrost Wallet for 2026 — multi-chain mobile wallet with native XRPL DEX support. Features, security, fees and how it compares to Xaman inside.",
      },
      gatehub: {
        title: "GateHub Review 2026 | EU-Regulated XRP Web Wallet & Fiat On-Ramp",
        description:
          "GateHub for 2026 — EU-regulated XRP web wallet with SEPA fiat on-ramp. Fees, custody model, security and Xaman / Ledger comparison inside.",
      },
      trustwallet: {
        title: "Trust Wallet XRP Review 2026 | Multi-Chain Mobile Wallet",
        description:
          "Trust Wallet XRP review for 2026 — the Binance-backed multi-chain mobile wallet with basic XRP support. Features, limits and Xaman alternatives inside.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X for XRP (2026) | Side-by-Side Comparison",
        description:
          "Xaman vs Ledger Nano X for XRP holders in 2026 — fees, security, XRPL features, DeFi/AMM access and which wins for beginners vs cold storage. Verdict inside.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPL Mobile Wallet vs NFC Hardware Card",
        description:
          "Xaman vs Tangem for XRP in 2026 — mobile XRPL DeFi access vs an NFC hardware card. Features, security, fees and the combo we recommend inside.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | XRP Hardware Wallet Comparison",
        description:
          "Ledger Nano X vs Tangem for XRP cold storage in 2026 — Secure Element vs EAL6+ NFC card. Security, price, portability and the verdict inside.",
      },
      "ellipal-vs-ledger": {
        title: "ELLIPAL vs Ledger for XRP 2026 — Air-Gap Verdict",
        description:
          "ELLIPAL Titan vs Ledger Nano X for XRP in 2026: air-gapped QR-only vs Bluetooth Secure Element. Security, price and the right pick by use case.",
      },
      "trezor-vs-ledger": {
        title: "Trezor vs Ledger for XRP 2026 — Hardware Showdown",
        description:
          "Trezor Safe vs Ledger Nano X for XRP in 2026: open-source firmware vs proprietary Secure Element. Security, fees, ease of use and the verdict.",
      },
      "bifrost-vs-xaman": {
        title: "Bifrost vs Xaman for XRP 2026 — Mobile Wallet Pick",
        description:
          "Bifrost vs Xaman for XRP in 2026: multi-chain mobile wallet vs the XRPL-native XUMM app. DEX access, NFTs, security and the right pick.",
      },
      "coinbase-vs-kraken": {
        title: "Coinbase vs Kraken for XRP 2026 — US Exchange Pick",
        description:
          "Coinbase vs Kraken for buying XRP in 2026: fees, security, custody, supported features. Which US exchange is the better fit for XRP buyers?",
      },
      "trustwallet-vs-xaman": {
        title: "Trust Wallet vs Xaman for XRP 2026 — Mobile Verdict",
        description:
          "Trust Wallet vs Xaman for XRP in 2026: Binance-backed multi-chain wallet vs the XRPL-native XUMM app. Features, security and the right pick.",
      },
      "trezor-vs-tangem": {
        title: "Trezor vs Tangem for XRP 2026 — Hardware Picks",
        description:
          "Trezor Safe vs Tangem for XRP in 2026: open-source hardware vs EAL6+ NFC card. Security, price and the verdict for XRP cold storage.",
      },
      "ellipal-vs-trezor": {
        title: "ELLIPAL vs Trezor for XRP 2026 — Cold Storage Pick",
        description:
          "ELLIPAL Titan vs Trezor Safe for XRP in 2026: air-gapped QR-only vs open-source hardware. Security, price and the right pick by threat model.",
      },
      "bifrost-vs-crossmark": {
        title: "Bifrost vs Crossmark for XRP 2026 — Mobile vs Browser",
        description:
          "Bifrost vs Crossmark for XRP in 2026: multi-chain mobile vs XRPL browser extension. DEX, dApp access, security and which to use when.",
      },
      "gatehub-vs-xaman": {
        title: "GateHub vs Xaman for XRP 2026 — Web vs Mobile Pick",
        description:
          "GateHub vs Xaman for XRP in 2026: EU-regulated web wallet with SEPA on-ramp vs the XRPL-native mobile XUMM app. Custody, fees, security.",
      },
      "gatehub-vs-ledger": {
        title: "GateHub vs Ledger for XRP 2026 — Web vs Hardware",
        description:
          "GateHub vs Ledger Nano X for XRP in 2026: EU-regulated custodial web wallet vs hardware Secure Element cold storage. Custody, fees and verdict.",
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
          "Reseña práctica de Xaman (XUMM) 2026 — la mejor cartera XRP móvil para DEX, AMM y NFTs de XRPL. Funciones, seguridad, comisiones y comparativa con Ledger.",
      },
      ledger: {
        title: "Reseña de Ledger Nano X para holders de XRP (2026) | All Things XRPL",
        description:
          "Reseña práctica del Ledger Nano X para holders de XRP en 2026 — compatibilidad XRPL, seguridad, uso, límites en DeFi y a quién le conviene. Veredicto dentro.",
      },
      tangem: {
        title: "Reseña de Tangem para XRP (2026) | Almacenamiento en frío tipo tarjeta | All Things XRPL",
        description:
          "¿Tangem es seguro para XRP? Reseña 2026: compatibilidad XRPL, UX NFC tap-to-sign, concesiones de seguridad y para quién es ideal. Veredicto dentro.",
      },
      trezor: {
        title: "Reseña de Trezor Safe 3 2026 | Cartera hardware open source para XRP",
        description:
          "Trezor Safe 3 para XRP 2026 — cartera hardware open source con elemento seguro. Soporte XRP, comisiones, seguridad y comparativa con Ledger Nano X dentro.",
      },
      "trezor-safe-5": {
        title:
          "Reseña de Trezor Safe 5 2026 | Cartera hardware premium con pantalla táctil para XRP",
        description:
          "Trezor Safe 5 para XRP 2026 — hardware premium open source con pantalla táctil a color y elemento seguro EAL6+. Veredicto y comparativa con Ledger Nano X.",
      },
      ellipal: {
        title: "Reseña de ELLIPAL Titan 2026 | Almacenamiento en frío air-gapped para XRP",
        description:
          "ELLIPAL Titan para XRP 2026 — almacenamiento en frío air-gapped, solo por QR. Seguridad, configuración, comisiones y comparativa con Ledger y Trezor.",
      },
      crossmark: {
        title: "Reseña de Crossmark 2026 | Cartera de extensión de navegador para XRPL",
        description:
          "Crossmark para 2026 — cartera tipo MetaMask en extensión de navegador para el XRP Ledger. Acceso al DEX, seguridad y comparativa con Xaman y Bifrost dentro.",
      },
      bifrost: {
        title: "Reseña de Bifrost Wallet 2026 | Cartera móvil multi-cadena con DEX XRPL",
        description:
          "Bifrost Wallet para 2026 — cartera móvil multi-cadena con soporte nativo del DEX XRPL. Funciones, seguridad, comisiones y comparativa con Xaman dentro.",
      },
      gatehub: {
        title: "Reseña de GateHub 2026 | Cartera web XRP regulada en la UE con on-ramp fiat",
        description:
          "GateHub para 2026 — cartera web XRP regulada en la UE con on-ramp fiat SEPA. Comisiones, modelo de custodia, seguridad y comparativa con Xaman y Ledger dentro.",
      },
      trustwallet: {
        title: "Reseña de Trust Wallet XRP 2026 | Cartera móvil multi-cadena",
        description:
          "Reseña de Trust Wallet XRP 2026 — cartera móvil multi-cadena respaldada por Binance con soporte XRP básico. Funciones, límites y alternativas a Xaman dentro.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X para XRP (2026) | Comparativa lado a lado",
        description:
          "Xaman vs Ledger Nano X para XRP en 2026 — comisiones, seguridad, XRPL, DeFi/AMM y quién gana entre principiantes vs frío. Veredicto dentro.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | Cartera móvil XRPL vs tarjeta hardware NFC",
        description:
          "Xaman vs Tangem para XRP en 2026 — acceso móvil a DeFi XRPL vs tarjeta hardware NFC. Funciones, seguridad, comisiones y la combinación que recomendamos dentro.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Comparativa de carteras hardware para XRP",
        description:
          "Ledger Nano X vs Tangem para almacenamiento en frío XRP en 2026 — Elemento Seguro vs tarjeta NFC EAL6+. Seguridad, precio, portabilidad y veredicto dentro.",
      },
      "ellipal-vs-ledger": {
        title: "ELLIPAL vs Ledger para XRP 2026 | Veredicto air-gapped",
        description:
          "ELLIPAL Titan vs Ledger Nano X para XRP en 2026 — air-gapped solo por QR vs Secure Element con Bluetooth. Seguridad, precio y la elección por uso dentro.",
      },
      "trezor-vs-ledger": {
        title: "Trezor vs Ledger para XRP 2026 | Duelo de hardware wallets",
        description:
          "Trezor Safe vs Ledger Nano X para XRP en 2026 — firmware open source vs Secure Element propietario. Seguridad, comisiones, uso y veredicto dentro.",
      },
      "bifrost-vs-xaman": {
        title: "Bifrost vs Xaman para XRP 2026 | Cartera móvil ganadora",
        description:
          "Bifrost vs Xaman para XRP en 2026 — cartera móvil multi-cadena vs la app XUMM nativa de XRPL. Acceso al DEX, NFTs, seguridad y veredicto dentro.",
      },
      "coinbase-vs-kraken": {
        title: "Coinbase vs Kraken para XRP 2026 | Mejor exchange en EE.UU.",
        description:
          "Coinbase vs Kraken para comprar XRP en 2026 — comisiones, seguridad, custodia y funciones. Qué exchange estadounidense conviene más a holders de XRP.",
      },
      "trustwallet-vs-xaman": {
        title: "Trust Wallet vs Xaman para XRP 2026 | Veredicto móvil",
        description:
          "Trust Wallet vs Xaman para XRP en 2026 — cartera multi-cadena de Binance vs la app XUMM nativa de XRPL. Funciones, seguridad y veredicto dentro.",
      },
      "trezor-vs-tangem": {
        title: "Trezor vs Tangem XRP 2026 | Hardware wallets cara a cara",
        description:
          "Trezor Safe vs Tangem para XRP en 2026 — hardware open source vs tarjeta NFC EAL6+. Seguridad, precio y veredicto para cold storage de XRP.",
      },
      "ellipal-vs-trezor": {
        title: "ELLIPAL vs Trezor para XRP 2026 | Mejor cold storage",
        description:
          "ELLIPAL Titan vs Trezor Safe para XRP en 2026 — air-gapped solo por QR vs hardware open source. Seguridad, precio y elección por modelo de amenazas.",
      },
      "bifrost-vs-crossmark": {
        title: "Bifrost vs Crossmark para XRP 2026 | Móvil vs navegador",
        description:
          "Bifrost vs Crossmark para XRP en 2026 — móvil multi-cadena vs extensión de navegador XRPL. DEX, dApps, seguridad y cuándo usar cada una.",
      },
      "gatehub-vs-xaman": {
        title: "GateHub vs Xaman para XRP 2026 | Web vs móvil",
        description:
          "GateHub vs Xaman para XRP en 2026 — cartera web regulada en la UE con on-ramp SEPA vs la app móvil XUMM nativa de XRPL. Custodia, comisiones y seguridad.",
      },
      "gatehub-vs-ledger": {
        title: "GateHub vs Ledger para XRP 2026 | Web vs hardware",
        description:
          "GateHub vs Ledger Nano X para XRP en 2026 — cartera web custodial regulada en la UE vs cold storage hardware con Secure Element. Custodia, costes y veredicto.",
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
          "2026 年 Xaman (XUMM) 实测评测——最适合 XRPL DEX、AMM 和 NFT 的移动 XRP 钱包。功能、安全、费用与 Ledger 对比尽在文中。",
      },
      ledger: {
        title: "Ledger Nano X XRP 持有者评测 (2026) | All Things XRPL",
        description:
          "2026 年面向 XRP 持有者的 Ledger Nano X 实测评测——XRPL 兼容性、安全性、易用性、DeFi 限制,以及谁该买。结论内含。",
      },
      tangem: {
        title: "Tangem 钱包 XRP 评测 (2026) | 卡片式冷存储 | All Things XRPL",
        description:
          "Tangem 是安全的 XRP 钱包吗?2026 年实测评测,涵盖 XRPL 支持、NFC 触碰签名体验、安全权衡与适用人群。结论内含。",
      },
      trezor: {
        title: "Trezor Safe 3 评测 2026 | 面向 XRP 的开源硬件钱包",
        description:
          "2026 年 Trezor Safe 3 评测——带安全芯片的开源硬件钱包。XRP 支持、费用、安全模型与 Ledger Nano X 对比尽在文中。",
      },
      "trezor-safe-5": {
        title:
          "Trezor Safe 5 评测 2026 | 面向 XRP 的高端触屏硬件钱包",
        description:
          "2026 年 Trezor Safe 5 评测。带彩色触摸屏与 EAL6+ 安全芯片的高端开源 XRP 硬件钱包。结论与 Ledger Nano X 对比尽在文中。",
      },
      ellipal: {
        title: "ELLIPAL Titan 评测 2026 | XRP 完全离线冷存储",
        description:
          "2026 年 ELLIPAL Titan 评测——完全空气隔离、仅二维码的 XRP 冷存储。安全模型、设置、费用及与 Ledger、Trezor 对比。结论内含。",
      },
      crossmark: {
        title: "Crossmark 钱包评测 2026 | XRPL 浏览器扩展钱包",
        description:
          "2026 年 Crossmark 评测——一款类似 MetaMask 的 XRP Ledger 浏览器扩展钱包。DEX 访问、安全性,以及与 Xaman、Bifrost 的对比。结论内含。",
      },
      bifrost: {
        title: "Bifrost 钱包评测 2026 | 多链 XRPL DEX 移动钱包",
        description:
          "2026 年 Bifrost 钱包评测——原生支持 XRPL DEX 的多链移动钱包。功能、安全、费用与 Xaman 对比尽在文中。",
      },
      gatehub: {
        title: "GateHub 评测 2026 | 受欧盟监管的 XRP 网页钱包与法币入金通道",
        description:
          "2026 年 GateHub 评测——受欧盟监管、支持 SEPA 法币入金的 XRP 网页钱包。费用、托管、安全与 Xaman、Ledger 对比。结论内含。",
      },
      trustwallet: {
        title: "Trust Wallet XRP 评测 2026 | 多链移动钱包",
        description:
          "2026 年 Trust Wallet XRP 评测——Binance 支持、具备基础 XRP 支持的多链移动钱包。功能、局限与 Xaman 替代方案。结论内含。",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman 对比 Ledger Nano X (2026) | XRP 钱包并排对比",
        description:
          "2026 年 XRP 持有者的 Xaman 与 Ledger Nano X 对比——费用、安全、XRPL 功能、DeFi/AMM,新手与冷存储分别更适合哪款。结论内含。",
      },
      "xaman-vs-tangem": {
        title: "Xaman 对比 Tangem 2026 | XRPL 移动钱包对比 NFC 硬件卡",
        description:
          "2026 年 Xaman 与 Tangem 对比——XRPL 移动 DeFi 访问 vs NFC 硬件卡。功能、安全、费用与我们推荐的组合方案。结论内含。",
      },
      "ledger-vs-tangem": {
        title: "Ledger 对比 Tangem 2026 | XRP 硬件钱包对比",
        description:
          "2026 年 XRP 冷存储:Ledger Nano X 与 Tangem 对比——安全芯片 vs EAL6+ NFC 卡。安全、价格、便携与结论尽在文中。",
      },
      "ellipal-vs-ledger": {
        title: "ELLIPAL 对比 Ledger XRP 钱包 2026 | 离线冷存储对决",
        description:
          "2026 年 XRP 持有者的 ELLIPAL Titan 与 Ledger Nano X 对比——空气隔离仅二维码 vs 蓝牙安全芯片。安全性、价格与按使用场景的最佳选择。",
      },
      "trezor-vs-ledger": {
        title: "Trezor 对比 Ledger XRP 2026 | 硬件钱包对决",
        description:
          "2026 年 XRP 持有者的 Trezor Safe 与 Ledger Nano X 对比——开源固件 vs 专有安全芯片。安全、费用、易用性与最终结论尽在文中。",
      },
      "bifrost-vs-xaman": {
        title: "Bifrost 对比 Xaman XRP 2026 | 移动钱包推荐",
        description:
          "2026 年 Bifrost 与 Xaman 对比——多链移动钱包 vs XRPL 原生 XUMM 应用。DEX 访问、NFT、安全性与正确选择尽在文中。",
      },
      "coinbase-vs-kraken": {
        title: "Coinbase 对比 Kraken XRP 2026 | 美国交易所首选",
        description:
          "2026 年购买 XRP 的 Coinbase 与 Kraken 对比——费用、安全、托管与功能。哪个美国交易所更适合 XRP 买家?结论尽在文中。",
      },
      "trustwallet-vs-xaman": {
        title: "Trust Wallet 对比 Xaman XRP 2026 | 移动钱包结论",
        description:
          "2026 年 Trust Wallet 与 Xaman 对比——Binance 旗下多链钱包 vs XRPL 原生 XUMM 应用。功能、安全与正确选择尽在文中。",
      },
      "trezor-vs-tangem": {
        title: "Trezor 对比 Tangem XRP 2026 | 硬件钱包推荐",
        description:
          "2026 年 XRP 持有者的 Trezor Safe 与 Tangem 对比——开源硬件 vs EAL6+ NFC 卡。安全、价格与冷存储结论尽在文中。",
      },
      "ellipal-vs-trezor": {
        title: "ELLIPAL 对比 Trezor XRP 2026 | 冷存储推荐",
        description:
          "2026 年 ELLIPAL Titan 与 Trezor Safe 对比——空气隔离仅二维码 vs 开源硬件。安全、价格与按威胁模型的最佳选择尽在文中。",
      },
      "bifrost-vs-crossmark": {
        title: "Bifrost 对比 Crossmark XRP 2026 | 移动 vs 浏览器",
        description:
          "2026 年 Bifrost 与 Crossmark 对比——多链移动钱包 vs XRPL 浏览器扩展。DEX、dApp 访问、安全与适用场景尽在文中。",
      },
      "gatehub-vs-xaman": {
        title: "GateHub 对比 Xaman XRP 2026 | 网页 vs 移动",
        description:
          "2026 年 GateHub 与 Xaman 对比——受欧盟监管的 SEPA 法币入金网页钱包 vs XRPL 原生移动 XUMM 应用。托管、费用与安全尽在文中。",
      },
      "gatehub-vs-ledger": {
        title: "GateHub 对比 Ledger XRP 2026 | 网页 vs 硬件",
        description:
          "2026 年 GateHub 与 Ledger Nano X 对比——受欧盟监管的托管网页钱包 vs 硬件安全芯片冷存储。托管、费用与结论尽在文中。",
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
          "2026年版 Xaman (XUMM) 実機レビュー — XRPL DEX・AMM・NFT向け最強モバイルXRPウォレット。機能・セキュリティ・手数料、Ledgerとの比較を本文で公開。",
      },
      ledger: {
        title: "Ledger Nano X レビュー(XRPホルダー向け / 2026) | All Things XRPL",
        description:
          "2026年版 XRPホルダー向けLedger Nano X実機レビュー — XRPL対応、セキュリティ、使いやすさ、DeFiの制約、買うべき人を本文で結論。",
      },
      tangem: {
        title: "Tangem ウォレット XRPレビュー(2026) | カード型コールドストレージ | All Things XRPL",
        description:
          "TangemはXRPに安全か?2026年版実機レビュー — XRPL対応、NFCタップ署名UX、セキュリティのトレードオフ、最適なユーザーを本文で結論。",
      },
      trezor: {
        title: "Trezor Safe 3 レビュー 2026 | XRP向けオープンソース・ハードウェアウォレット",
        description:
          "2026年版 Trezor Safe 3 レビュー — セキュアエレメント搭載のオープンソース・ハードウェアウォレット。XRP対応、手数料、セキュリティ、Ledger Nano X比較を本文で。",
      },
      "trezor-safe-5": {
        title:
          "Trezor Safe 5 レビュー 2026 | XRP向けプレミアム・タッチスクリーン・ハードウェアウォレット",
        description:
          "2026年版 Trezor Safe 5 XRPレビュー — カラータッチスクリーンとEAL6+セキュアエレメントを備えたプレミアムなオープンソース・ハードウェアウォレット。Ledger Nano X比較を本文で。",
      },
      ellipal: {
        title: "ELLIPAL Titan レビュー 2026 | 完全エアギャップのXRPコールドストレージ",
        description:
          "2026年版 ELLIPAL Titan レビュー — 完全エアギャップ・QRオンリーのXRPコールドストレージ。セキュリティ、設定、手数料、Ledger・Trezor比較を本文で。",
      },
      crossmark: {
        title: "Crossmark ウォレットレビュー 2026 | XRPL向けブラウザ拡張ウォレット",
        description:
          "2026年版 Crossmark レビュー — XRP Ledger向けMetaMask風ブラウザ拡張ウォレット。DEXアクセス、セキュリティ、Xaman・Bifrostとの比較を本文で。",
      },
      bifrost: {
        title: "Bifrost ウォレットレビュー 2026 | マルチチェーンXRPL DEX対応モバイルウォレット",
        description:
          "2026年版 Bifrost ウォレットレビュー — XRPL DEXをネイティブサポートするマルチチェーン・モバイルウォレット。機能・セキュリティ・手数料、Xaman比較を本文で。",
      },
      gatehub: {
        title: "GateHub レビュー 2026 | EU規制下のXRPウェブウォレット&法定通貨オンランプ",
        description:
          "2026年版 GateHub レビュー — EU規制下、SEPA法定通貨オンランプ対応のXRPウェブウォレット。手数料・カストディ・セキュリティ、Xaman/Ledger比較を本文で。",
      },
      trustwallet: {
        title: "Trust Wallet XRPレビュー 2026 | マルチチェーン・モバイルウォレット",
        description:
          "2026年版 Trust Wallet XRP レビュー — Binance系列の基本的なXRP対応マルチチェーン・モバイルウォレット。機能、制約、Xaman代替案を本文で。",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X(XRP / 2026) | 横並び比較",
        description:
          "2026年のXRPホルダー向けXaman対Ledger Nano X — 手数料、セキュリティ、XRPL機能、DeFi/AMM、初心者と長期保管それぞれの勝者を本文で結論。",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPLモバイルウォレット対NFCハードウェアカード",
        description:
          "2026年のXaman対Tangem — モバイルXRPL DeFiアクセス対NFCハードウェアカード。機能、セキュリティ、手数料、推奨の組み合わせを本文で。",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | XRPハードウェアウォレット比較",
        description:
          "2026年のXRPコールドストレージ:Ledger Nano X対Tangem — セキュアエレメント対EAL6+ NFCカード。セキュリティ・価格・携帯性、結論を本文で。",
      },
      "ellipal-vs-ledger": {
        title: "ELLIPAL vs Ledger(XRP / 2026) | エアギャップ判定",
        description:
          "2026年のXRPホルダー向けELLIPAL Titan対Ledger Nano X — エアギャップQRオンリー対BluetoothセキュアエレメントXRP。セキュリティ・価格・用途別の最適解を本文で。",
      },
      "trezor-vs-ledger": {
        title: "Trezor vs Ledger(XRP / 2026) | ハードウェア対決",
        description:
          "2026年のXRPホルダー向けTrezor Safe対Ledger Nano X — オープンソースファームウェア対独自セキュアエレメント。セキュリティ・手数料・使い勝手と結論を本文で。",
      },
      "bifrost-vs-xaman": {
        title: "Bifrost vs Xaman(XRP / 2026) | モバイルウォレット選定",
        description:
          "2026年のBifrost対Xaman — マルチチェーン・モバイル対XRPLネイティブのXUMM。DEXアクセス、NFT、セキュリティと最適解を本文で。",
      },
      "coinbase-vs-kraken": {
        title: "Coinbase vs Kraken(XRP / 2026) | 米国取引所選び",
        description:
          "2026年にXRPを買う際のCoinbase対Kraken — 手数料、セキュリティ、カストディ、機能。XRPバイヤーに合う米国取引所はどちらか本文で。",
      },
      "trustwallet-vs-xaman": {
        title: "Trust Wallet vs Xaman(XRP / 2026) | モバイル判定",
        description:
          "2026年のTrust Wallet対Xaman — Binance系列のマルチチェーン対XRPLネイティブのXUMM。機能、セキュリティと最適解を本文で。",
      },
      "trezor-vs-tangem": {
        title: "Trezor vs Tangem(XRP / 2026) | ハードウェア選定",
        description:
          "2026年のXRPホルダー向けTrezor Safe対Tangem — オープンソースハードウェア対EAL6+ NFCカード。セキュリティ・価格とコールドストレージ結論を本文で。",
      },
      "ellipal-vs-trezor": {
        title: "ELLIPAL vs Trezor(XRP / 2026) | コールドストレージ",
        description:
          "2026年のELLIPAL Titan対Trezor Safe — エアギャップQRオンリー対オープンソースハードウェア。セキュリティ・価格・脅威モデル別の最適解を本文で。",
      },
      "bifrost-vs-crossmark": {
        title: "Bifrost vs Crossmark(XRP / 2026) | モバイル対拡張",
        description:
          "2026年のBifrost対Crossmark — マルチチェーン・モバイル対XRPLブラウザ拡張。DEX、dAppアクセス、セキュリティと使い分けを本文で。",
      },
      "gatehub-vs-xaman": {
        title: "GateHub vs Xaman(XRP / 2026) | ウェブ対モバイル",
        description:
          "2026年のGateHub対Xaman — EU規制下SEPA対応のXRPウェブウォレット対XRPLネイティブのモバイルXUMM。カストディ・手数料・セキュリティを本文で。",
      },
      "gatehub-vs-ledger": {
        title: "GateHub vs Ledger(XRP / 2026) | ウェブ対ハードウェア",
        description:
          "2026年のGateHub対Ledger Nano X — EU規制下の保管型ウェブウォレット対セキュアエレメント搭載ハードウェアコールドストレージ。手数料と結論を本文で。",
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
          "2026년 Xaman (XUMM) 실사용 리뷰 — XRPL DEX·AMM·NFT에 최적인 모바일 XRP 지갑. 기능, 보안, 수수료, Ledger 비교까지 본문 공개.",
      },
      ledger: {
        title: "XRP 보유자를 위한 Ledger Nano X 리뷰 (2026) | All Things XRPL",
        description:
          "2026년 XRP 보유자를 위한 Ledger Nano X 실사용 리뷰 — XRPL 호환성, 보안, 사용 편의성, DeFi 한계와 적합 사용자. 평가는 본문에서.",
      },
      tangem: {
        title: "XRP용 Tangem 지갑 리뷰 (2026) | 카드형 콜드 스토리지 | All Things XRPL",
        description:
          "Tangem은 안전한 XRP 지갑일까? 2026년 실사용 리뷰 — XRPL 지원, NFC 탭-투-사인 UX, 보안 트레이드오프, 적합 사용자. 평가는 본문에서.",
      },
      trezor: {
        title: "Trezor Safe 3 리뷰 2026 | XRP를 위한 오픈소스 하드웨어 지갑",
        description:
          "2026년 Trezor Safe 3 리뷰 — 시큐어 엘리먼트 탑재 오픈소스 하드웨어 지갑. XRP 지원, 수수료, 보안 모델, Ledger Nano X 비교까지 본문 공개.",
      },
      "trezor-safe-5": {
        title:
          "Trezor Safe 5 리뷰 2026 | XRP를 위한 프리미엄 터치스크린 하드웨어 지갑",
        description:
          "2026년 XRP용 Trezor Safe 5 리뷰 — 컬러 터치스크린과 EAL6+ 시큐어 엘리먼트를 갖춘 프리미엄 오픈소스 하드웨어 지갑. Ledger Nano X 비교까지 본문 공개.",
      },
      ellipal: {
        title: "ELLIPAL Titan 리뷰 2026 | XRP를 위한 완전 에어갭 콜드 스토리지",
        description:
          "2026년 ELLIPAL Titan 리뷰 — 완전 에어갭, QR 전용 XRP 콜드 스토리지. 보안 모델, 설정, 수수료, Ledger·Trezor 비교까지 본문 공개.",
      },
      crossmark: {
        title: "Crossmark 지갑 리뷰 2026 | XRPL용 브라우저 확장 지갑",
        description:
          "2026년 Crossmark 리뷰 — MetaMask 스타일 XRP Ledger 브라우저 확장 지갑. DEX 접근, 보안, Xaman·Bifrost 비교까지 본문 공개.",
      },
      bifrost: {
        title: "Bifrost 지갑 리뷰 2026 | 멀티체인 XRPL DEX 모바일 지갑",
        description:
          "2026년 Bifrost 지갑 리뷰 — XRPL DEX를 네이티브 지원하는 멀티체인 모바일 지갑. 기능, 보안, 수수료, Xaman 비교까지 본문 공개.",
      },
      gatehub: {
        title: "GateHub 리뷰 2026 | EU 규제 XRP 웹 지갑 & 법정화폐 온램프",
        description:
          "2026년 GateHub 리뷰 — SEPA 법정화폐 온램프를 갖춘 EU 규제 XRP 웹 지갑. 수수료, 커스터디, 보안, Xaman·Ledger 비교까지 본문 공개.",
      },
      trustwallet: {
        title: "Trust Wallet XRP 리뷰 2026 | 멀티체인 모바일 지갑",
        description:
          "2026년 Trust Wallet XRP 리뷰 — Binance가 후원하는 기본 XRP 지원의 멀티체인 모바일 지갑. 기능, 한계, Xaman 대안까지 본문 공개.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "XRP를 위한 Xaman vs Ledger Nano X (2026) | 나란히 비교",
        description:
          "2026년 XRP 보유자를 위한 Xaman vs Ledger Nano X — 수수료, 보안, XRPL 기능, DeFi/AMM, 초보자 대 콜드 스토리지 각 승자를 본문에서.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPL 모바일 지갑 대 NFC 하드웨어 카드",
        description:
          "2026년 Xaman vs Tangem — 모바일 XRPL DeFi 접근 vs NFC 하드웨어 카드. 기능, 보안, 수수료와 추천 조합까지 본문 공개.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | XRP 하드웨어 지갑 비교",
        description:
          "2026년 XRP 콜드 스토리지: Ledger Nano X vs Tangem — 시큐어 엘리먼트 대 EAL6+ NFC 카드. 보안, 가격, 휴대성, 결론까지 본문 공개.",
      },
      "ellipal-vs-ledger": {
        title: "XRP용 ELLIPAL vs Ledger 2026 | 에어갭 평가",
        description:
          "2026년 XRP 보유자를 위한 ELLIPAL Titan vs Ledger Nano X — 에어갭 QR 전용 vs 블루투스 시큐어 엘리먼트. 보안·가격·용도별 최적 선택을 본문에서.",
      },
      "trezor-vs-ledger": {
        title: "XRP용 Trezor vs Ledger 2026 | 하드웨어 대결",
        description:
          "2026년 Trezor Safe vs Ledger Nano X — 오픈소스 펌웨어 vs 독자 시큐어 엘리먼트. 보안, 수수료, 사용성과 결론을 본문에서.",
      },
      "bifrost-vs-xaman": {
        title: "XRP용 Bifrost vs Xaman 2026 | 모바일 지갑 선택",
        description:
          "2026년 Bifrost vs Xaman — 멀티체인 모바일 지갑 vs XRPL 네이티브 XUMM 앱. DEX 접근, NFT, 보안과 최적 선택을 본문에서.",
      },
      "coinbase-vs-kraken": {
        title: "XRP용 Coinbase vs Kraken 2026 | 미국 거래소 선택",
        description:
          "2026년 XRP 매수를 위한 Coinbase vs Kraken — 수수료, 보안, 커스터디, 기능. 어떤 미국 거래소가 XRP 매수자에게 더 적합한지 본문에서.",
      },
      "trustwallet-vs-xaman": {
        title: "XRP용 Trust Wallet vs Xaman 2026 | 모바일 평가",
        description:
          "2026년 Trust Wallet vs Xaman — Binance 후원 멀티체인 지갑 vs XRPL 네이티브 XUMM 앱. 기능, 보안과 최적 선택을 본문에서.",
      },
      "trezor-vs-tangem": {
        title: "XRP용 Trezor vs Tangem 2026 | 하드웨어 선택",
        description:
          "2026년 Trezor Safe vs Tangem — 오픈소스 하드웨어 vs EAL6+ NFC 카드. 보안, 가격과 XRP 콜드 스토리지 결론을 본문에서.",
      },
      "ellipal-vs-trezor": {
        title: "XRP용 ELLIPAL vs Trezor 2026 | 콜드 스토리지 선택",
        description:
          "2026년 ELLIPAL Titan vs Trezor Safe — 에어갭 QR 전용 vs 오픈소스 하드웨어. 보안, 가격과 위협 모델별 최적 선택을 본문에서.",
      },
      "bifrost-vs-crossmark": {
        title: "XRP용 Bifrost vs Crossmark 2026 | 모바일 vs 브라우저",
        description:
          "2026년 Bifrost vs Crossmark — 멀티체인 모바일 vs XRPL 브라우저 확장. DEX, dApp 접근, 보안과 용도별 선택을 본문에서.",
      },
      "gatehub-vs-xaman": {
        title: "XRP용 GateHub vs Xaman 2026 | 웹 vs 모바일",
        description:
          "2026년 GateHub vs Xaman — SEPA 온램프를 갖춘 EU 규제 웹 지갑 vs XRPL 네이티브 모바일 XUMM 앱. 커스터디, 수수료, 보안 비교.",
      },
      "gatehub-vs-ledger": {
        title: "XRP용 GateHub vs Ledger 2026 | 웹 vs 하드웨어",
        description:
          "2026년 GateHub vs Ledger Nano X — EU 규제 커스터디 웹 지갑 vs 하드웨어 시큐어 엘리먼트 콜드 스토리지. 커스터디, 수수료, 결론을 본문에서.",
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
          "Análise prática da Xaman (XUMM) 2026 — a melhor carteira XRP mobile para DEX, AMM e NFTs da XRPL. Recursos, segurança, taxas e duelo com Ledger.",
      },
      ledger: {
        title: "Análise da Ledger Nano X para holders de XRP (2026) | All Things XRPL",
        description:
          "Análise prática da Ledger Nano X para holders de XRP em 2026 — compatibilidade XRPL, segurança, uso, limites em DeFi e para quem vale. Veredicto dentro.",
      },
      tangem: {
        title: "Análise da Tangem para XRP (2026) | Cold storage em formato de cartão | All Things XRPL",
        description:
          "A Tangem é uma carteira XRP segura? Análise prática com suporte XRPL, UX de NFC tap-to-sign, trade-offs de segurança e para quem vale em 2026. Veredicto dentro.",
      },
      trezor: {
        title: "Análise da Trezor Safe 3 2026 | Carteira hardware open source para XRP",
        description:
          "Trezor Safe 3 para XRP 2026 — carteira hardware open source com secure element. Suporte XRP, taxas, segurança e comparação com Ledger Nano X dentro.",
      },
      "trezor-safe-5": {
        title:
          "Análise da Trezor Safe 5 2026 | Carteira hardware premium com tela touch para XRP",
        description:
          "Trezor Safe 5 para XRP 2026 — hardware premium open source com tela touch colorida e secure element EAL6+. Veredicto e comparação com Ledger Nano X.",
      },
      ellipal: {
        title: "Análise da ELLIPAL Titan 2026 | Cold storage 100% air-gapped para XRP",
        description:
          "ELLIPAL Titan para XRP em 2026 — cold storage 100% air-gapped, apenas por QR. Modelo de segurança, configuração, taxas e comparação com Ledger e Trezor dentro.",
      },
      crossmark: {
        title: "Análise da Crossmark 2026 | Carteira em extensão de navegador para a XRPL",
        description:
          "Crossmark para 2026 — carteira em extensão de navegador no estilo MetaMask para o XRP Ledger. Acesso ao DEX, segurança e comparação com Xaman e Bifrost dentro.",
      },
      bifrost: {
        title: "Análise da Bifrost Wallet 2026 | Carteira mobile multichain com DEX da XRPL",
        description:
          "Bifrost Wallet para 2026 — carteira mobile multichain com suporte nativo ao DEX da XRPL. Recursos, segurança, taxas e comparação com Xaman dentro.",
      },
      gatehub: {
        title: "Análise da GateHub 2026 | Carteira web XRP regulada na UE com on-ramp fiat",
        description:
          "GateHub para 2026 — carteira web XRP regulada na UE com on-ramp fiat via SEPA. Taxas, modelo de custódia, segurança e comparação com Xaman e Ledger dentro.",
      },
      trustwallet: {
        title: "Análise da Trust Wallet XRP 2026 | Carteira mobile multichain",
        description:
          "Análise da Trust Wallet XRP para 2026 — carteira mobile multichain apoiada pela Binance com suporte XRP básico. Recursos, limites e alternativas à Xaman dentro.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X para XRP (2026) | Comparativo lado a lado",
        description:
          "Xaman vs Ledger Nano X para holders de XRP em 2026 — taxas, segurança, XRPL, DeFi/AMM e quem ganha para iniciantes vs cold storage. Veredicto dentro.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | Carteira mobile XRPL vs cartão hardware NFC",
        description:
          "Xaman vs Tangem para XRP em 2026 — acesso mobile à DeFi XRPL vs cartão hardware NFC. Recursos, segurança, taxas e a combinação que recomendamos dentro.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Comparativo de carteiras hardware para XRP",
        description:
          "Ledger Nano X vs Tangem para cold storage XRP em 2026 — Secure Element vs cartão NFC EAL6+. Segurança, preço, portabilidade e veredicto dentro.",
      },
      "ellipal-vs-ledger": {
        title: "ELLIPAL vs Ledger para XRP 2026 | Veredicto air-gapped",
        description:
          "ELLIPAL Titan vs Ledger Nano X para XRP em 2026 — air-gapped só por QR vs Secure Element por Bluetooth. Segurança, preço e a escolha por uso dentro.",
      },
      "trezor-vs-ledger": {
        title: "Trezor vs Ledger para XRP 2026 | Duelo de hardware wallets",
        description:
          "Trezor Safe vs Ledger Nano X para XRP em 2026 — firmware open source vs Secure Element proprietário. Segurança, taxas, uso e veredicto dentro.",
      },
      "bifrost-vs-xaman": {
        title: "Bifrost vs Xaman para XRP 2026 | Carteira mobile vencedora",
        description:
          "Bifrost vs Xaman para XRP em 2026 — carteira mobile multichain vs o app XUMM nativo da XRPL. Acesso ao DEX, NFTs, segurança e escolha certa dentro.",
      },
      "coinbase-vs-kraken": {
        title: "Coinbase vs Kraken para XRP 2026 | Melhor exchange nos EUA",
        description:
          "Coinbase vs Kraken para comprar XRP em 2026 — taxas, segurança, custódia e recursos. Qual exchange dos EUA combina mais com holders de XRP?",
      },
      "trustwallet-vs-xaman": {
        title: "Trust Wallet vs Xaman para XRP 2026 | Veredicto mobile",
        description:
          "Trust Wallet vs Xaman para XRP em 2026 — carteira multichain apoiada pela Binance vs o app XUMM nativo da XRPL. Recursos, segurança e escolha certa.",
      },
      "trezor-vs-tangem": {
        title: "Trezor vs Tangem XRP 2026 | Hardware wallets cara a cara",
        description:
          "Trezor Safe vs Tangem para XRP em 2026 — hardware open source vs cartão NFC EAL6+. Segurança, preço e veredicto para cold storage de XRP.",
      },
      "ellipal-vs-trezor": {
        title: "ELLIPAL vs Trezor para XRP 2026 | Melhor cold storage",
        description:
          "ELLIPAL Titan vs Trezor Safe para XRP em 2026 — air-gapped só por QR vs hardware open source. Segurança, preço e escolha por modelo de ameaça dentro.",
      },
      "bifrost-vs-crossmark": {
        title: "Bifrost vs Crossmark para XRP 2026 | Mobile vs navegador",
        description:
          "Bifrost vs Crossmark para XRP em 2026 — mobile multichain vs extensão de navegador XRPL. DEX, dApps, segurança e quando usar cada uma.",
      },
      "gatehub-vs-xaman": {
        title: "GateHub vs Xaman para XRP 2026 | Web vs mobile",
        description:
          "GateHub vs Xaman para XRP em 2026 — carteira web regulada na UE com on-ramp SEPA vs o app mobile XUMM nativo da XRPL. Custódia, taxas e segurança.",
      },
      "gatehub-vs-ledger": {
        title: "GateHub vs Ledger para XRP 2026 | Web vs hardware",
        description:
          "GateHub vs Ledger Nano X para XRP em 2026 — carteira web custodial regulada na UE vs cold storage hardware com Secure Element. Custódia, taxas e veredicto.",
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
          "Praxis-Test der Xaman (XUMM) für 2026 — die beste mobile XRP-Wallet für XRPL-DEX, AMM und NFTs. Funktionen, Sicherheit, Gebühren und Ledger-Vergleich inklusive.",
      },
      ledger: {
        title: "Ledger Nano X Test für XRP-Holder (2026) | All Things XRPL",
        description:
          "Praxis-Test der Ledger Nano X für XRP-Holder 2026 — XRPL-Kompatibilität, Sicherheit, Bedienkomfort, DeFi-Limits und Kaufempfehlung. Fazit inklusive.",
      },
      tangem: {
        title: "Tangem Wallet Test für XRP (2026) | Karten-Cold-Storage | All Things XRPL",
        description:
          "Ist Tangem eine sichere XRP-Wallet? Praxis-Test 2026: XRPL-Support, NFC-Tap-to-Sign-UX, Sicherheits-Trade-offs und Zielgruppe. Fazit inklusive.",
      },
      trezor: {
        title: "Trezor Safe 3 Test 2026 | Open-Source-Hardware-Wallet für XRP",
        description:
          "Trezor Safe 3 für XRP 2026 — Open-Source-Hardware-Wallet mit Secure Element. XRP-Support, Gebühren, Sicherheitsmodell und Ledger-Nano-X-Vergleich inklusive.",
      },
      "trezor-safe-5": {
        title:
          "Trezor Safe 5 Test 2026 | Premium-Hardware-Wallet mit Touchscreen für XRP",
        description:
          "Trezor Safe 5 für XRP 2026 — Premium-Open-Source-Hardware-Wallet mit Farb-Touchscreen und EAL6+ Secure Element. Fazit und Ledger-Nano-X-Vergleich inklusive.",
      },
      ellipal: {
        title: "ELLIPAL Titan Test 2026 | Komplett air-gapped Cold-Storage für XRP",
        description:
          "ELLIPAL Titan für XRP 2026 — vollständig air-gapped, ausschließlich QR-basierte Cold-Storage. Sicherheit, Setup, Gebühren und Ledger/Trezor-Vergleich inklusive.",
      },
      crossmark: {
        title: "Crossmark Wallet Test 2026 | Browser-Extension-Wallet für XRPL",
        description:
          "Crossmark für 2026 — Browser-Extension-Wallet im MetaMask-Stil für das XRP Ledger. DEX-Zugang, Sicherheit und Vergleich mit Xaman und Bifrost inklusive.",
      },
      bifrost: {
        title: "Bifrost Wallet Test 2026 | Multichain-Mobile-Wallet mit XRPL-DEX",
        description:
          "Bifrost Wallet für 2026 — Multichain-Mobile-Wallet mit nativem XRPL-DEX-Support. Funktionen, Sicherheit, Gebühren und Xaman-Vergleich inklusive.",
      },
      gatehub: {
        title: "GateHub Test 2026 | EU-regulierte XRP-Web-Wallet & Fiat-On-Ramp",
        description:
          "GateHub für 2026 — EU-regulierte XRP-Web-Wallet mit SEPA-Fiat-On-Ramp. Gebühren, Custody-Modell, Sicherheit und Xaman/Ledger-Vergleich inklusive.",
      },
      trustwallet: {
        title: "Trust Wallet XRP Test 2026 | Multichain-Mobile-Wallet",
        description:
          "Trust Wallet XRP Test 2026 — die von Binance unterstützte Multichain-Mobile-Wallet mit XRP-Grundsupport. Funktionen, Grenzen und Xaman-Alternativen inklusive.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X für XRP (2026) | Direktvergleich",
        description:
          "Xaman vs Ledger Nano X für XRP-Holder 2026 — Gebühren, Sicherheit, XRPL-Funktionen, DeFi/AMM, Sieger für Einsteiger vs Langzeit-Storage. Fazit inklusive.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | XRPL-Mobile-Wallet vs NFC-Hardware-Karte",
        description:
          "Xaman vs Tangem für XRP 2026 — mobiler XRPL-DeFi-Zugang vs NFC-Hardware-Karte. Funktionen, Sicherheit, Gebühren und unsere empfohlene Kombination inklusive.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Vergleich der XRP-Hardware-Wallets",
        description:
          "Ledger Nano X vs Tangem für XRP-Cold-Storage 2026 — Secure Element vs EAL6+ NFC-Karte. Sicherheit, Preis, Mobilität und Fazit inklusive.",
      },
      "ellipal-vs-ledger": {
        title: "ELLIPAL vs Ledger für XRP 2026 | Air-Gap-Fazit",
        description:
          "ELLIPAL Titan vs Ledger Nano X für XRP 2026 — air-gapped nur per QR vs Secure Element mit Bluetooth. Sicherheit, Preis und die richtige Wahl je Use Case.",
      },
      "trezor-vs-ledger": {
        title: "Trezor vs Ledger für XRP 2026 | Hardware-Wallet-Duell",
        description:
          "Trezor Safe vs Ledger Nano X für XRP 2026 — Open-Source-Firmware vs proprietäres Secure Element. Sicherheit, Gebühren, Bedienung und Fazit inklusive.",
      },
      "bifrost-vs-xaman": {
        title: "Bifrost vs Xaman für XRP 2026 | Beste mobile Wallet",
        description:
          "Bifrost vs Xaman für XRP 2026 — Multichain-Mobile-Wallet vs die XRPL-native XUMM-App. DEX-Zugang, NFTs, Sicherheit und die richtige Wahl inklusive.",
      },
      "coinbase-vs-kraken": {
        title: "Coinbase vs Kraken für XRP 2026 | Beste US-Börse",
        description:
          "Coinbase vs Kraken zum XRP-Kauf 2026 — Gebühren, Sicherheit, Custody und Funktionen. Welche US-Börse passt besser zu XRP-Käufern? Fazit inklusive.",
      },
      "trustwallet-vs-xaman": {
        title: "Trust Wallet vs Xaman für XRP 2026 | Mobiles Fazit",
        description:
          "Trust Wallet vs Xaman für XRP 2026 — Binance-gestützte Multichain-Wallet vs die XRPL-native XUMM-App. Funktionen, Sicherheit und richtige Wahl inklusive.",
      },
      "trezor-vs-tangem": {
        title: "Trezor vs Tangem für XRP 2026 | Hardware-Wallets im Test",
        description:
          "Trezor Safe vs Tangem für XRP 2026 — Open-Source-Hardware vs EAL6+ NFC-Karte. Sicherheit, Preis und Fazit für XRP-Cold-Storage inklusive.",
      },
      "ellipal-vs-trezor": {
        title: "ELLIPAL vs Trezor für XRP 2026 | Bestes Cold-Storage",
        description:
          "ELLIPAL Titan vs Trezor Safe für XRP 2026 — air-gapped nur per QR vs Open-Source-Hardware. Sicherheit, Preis und Wahl je nach Threat Model inklusive.",
      },
      "bifrost-vs-crossmark": {
        title: "Bifrost vs Crossmark für XRP 2026 | Mobile vs Browser",
        description:
          "Bifrost vs Crossmark für XRP 2026 — Multichain-Mobile vs XRPL-Browser-Extension. DEX, dApps, Sicherheit und wann welche zum Einsatz kommt.",
      },
      "gatehub-vs-xaman": {
        title: "GateHub vs Xaman für XRP 2026 | Web vs Mobile",
        description:
          "GateHub vs Xaman für XRP 2026 — EU-regulierte Web-Wallet mit SEPA-On-Ramp vs die XRPL-native mobile XUMM-App. Custody, Gebühren, Sicherheit.",
      },
      "gatehub-vs-ledger": {
        title: "GateHub vs Ledger für XRP 2026 | Web vs Hardware",
        description:
          "GateHub vs Ledger Nano X für XRP 2026 — EU-regulierte custodial Web-Wallet vs Hardware-Secure-Element-Cold-Storage. Custody, Gebühren und Fazit inklusive.",
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
          "Test pratique de Xaman (XUMM) 2026 — meilleur portefeuille XRP mobile pour DEX, AMM et NFT XRPL. Fonctionnalités, sécurité, frais et duel Ledger.",
      },
      ledger: {
        title: "Test Ledger Nano X pour les détenteurs de XRP (2026) | All Things XRPL",
        description:
          "Test pratique de la Ledger Nano X pour détenteurs de XRP en 2026 — compatibilité XRPL, sécurité, ergonomie, limites DeFi et pour qui c'est fait. Verdict inclus.",
      },
      tangem: {
        title: "Test Tangem pour XRP (2026) | Cold storage au format carte | All Things XRPL",
        description:
          "Tangem est-il sûr pour XRP ? Test pratique 2026 : support XRPL, UX signature NFC, compromis de sécurité et profil idéal d'utilisateur. Verdict inclus.",
      },
      trezor: {
        title: "Test Trezor Safe 3 2026 | Portefeuille hardware open source pour XRP",
        description:
          "Trezor Safe 3 pour XRP 2026 — portefeuille hardware open source avec secure element. Support XRP, frais, sécurité et comparaison Ledger Nano X inclus.",
      },
      "trezor-safe-5": {
        title:
          "Test Trezor Safe 5 2026 | Portefeuille hardware premium à écran tactile pour XRP",
        description:
          "Trezor Safe 5 pour XRP 2026 — hardware premium open source avec écran tactile couleur et secure element EAL6+. Verdict et comparaison Ledger Nano X inclus.",
      },
      ellipal: {
        title: "Test ELLIPAL Titan 2026 | Cold storage 100 % air-gapped pour XRP",
        description:
          "ELLIPAL Titan pour XRP en 2026 — cold storage 100 % air-gapped, en QR uniquement. Sécurité, configuration, frais et comparaison Ledger/Trezor inclus.",
      },
      crossmark: {
        title: "Test Crossmark 2026 | Portefeuille extension de navigateur pour XRPL",
        description:
          "Crossmark pour 2026 — un portefeuille extension navigateur façon MetaMask pour le XRP Ledger. Accès DEX, sécurité et comparaison Xaman/Bifrost inclus.",
      },
      bifrost: {
        title: "Test Bifrost Wallet 2026 | Portefeuille mobile multichain avec DEX XRPL",
        description:
          "Bifrost Wallet pour 2026 — portefeuille mobile multichain avec support natif du DEX XRPL. Fonctionnalités, sécurité, frais et comparaison Xaman inclus.",
      },
      gatehub: {
        title: "Test GateHub 2026 | Portefeuille web XRP régulé en UE & on-ramp fiat",
        description:
          "GateHub pour 2026 — portefeuille web XRP régulé en UE avec on-ramp fiat SEPA. Frais, modèle de conservation, sécurité et comparaison Xaman/Ledger inclus.",
      },
      trustwallet: {
        title: "Test Trust Wallet XRP 2026 | Portefeuille mobile multichain",
        description:
          "Test Trust Wallet XRP 2026 — portefeuille mobile multichain soutenu par Binance avec support XRP basique. Fonctionnalités, limites et alternatives Xaman.",
      },
    },
    compare: {
      "xaman-vs-ledger": {
        title: "Xaman vs Ledger Nano X pour XRP (2026) | Comparatif côte à côte",
        description:
          "Xaman vs Ledger Nano X pour les détenteurs de XRP en 2026 — frais, sécurité, XRPL, DeFi/AMM et qui gagne pour débutants vs cold storage. Verdict inclus.",
      },
      "xaman-vs-tangem": {
        title: "Xaman vs Tangem 2026 | Portefeuille mobile XRPL vs carte hardware NFC",
        description:
          "Xaman vs Tangem pour XRP en 2026 — accès mobile à la DeFi XRPL vs carte hardware NFC. Fonctionnalités, sécurité, frais et la combinaison recommandée incluse.",
      },
      "ledger-vs-tangem": {
        title: "Ledger vs Tangem 2026 | Comparatif des portefeuilles hardware pour XRP",
        description:
          "Ledger Nano X vs Tangem pour le cold storage XRP en 2026 — Secure Element vs carte NFC EAL6+. Sécurité, prix, portabilité et verdict inclus.",
      },
      "ellipal-vs-ledger": {
        title: "ELLIPAL vs Ledger pour XRP 2026 | Verdict air-gapped",
        description:
          "ELLIPAL Titan vs Ledger Nano X pour XRP en 2026 — air-gapped en QR uniquement vs Secure Element Bluetooth. Sécurité, prix et le bon choix selon l'usage.",
      },
      "trezor-vs-ledger": {
        title: "Trezor vs Ledger pour XRP 2026 | Duel des hardware wallets",
        description:
          "Trezor Safe vs Ledger Nano X pour XRP en 2026 — firmware open source vs Secure Element propriétaire. Sécurité, frais, ergonomie et verdict inclus.",
      },
      "bifrost-vs-xaman": {
        title: "Bifrost vs Xaman XRP 2026 | Meilleur portefeuille mobile",
        description:
          "Bifrost vs Xaman pour XRP en 2026 — portefeuille mobile multichain vs l'app XUMM native XRPL. Accès DEX, NFT, sécurité et bon choix inclus.",
      },
      "coinbase-vs-kraken": {
        title: "Coinbase vs Kraken pour XRP 2026 | Meilleur exchange US",
        description:
          "Coinbase vs Kraken pour acheter XRP en 2026 — frais, sécurité, conservation et fonctions. Quel exchange américain convient mieux aux acheteurs XRP ?",
      },
      "trustwallet-vs-xaman": {
        title: "Trust Wallet vs Xaman pour XRP 2026 | Verdict mobile",
        description:
          "Trust Wallet vs Xaman pour XRP en 2026 — portefeuille multichain soutenu par Binance vs l'app XUMM native XRPL. Fonctions, sécurité et bon choix.",
      },
      "trezor-vs-tangem": {
        title: "Trezor vs Tangem XRP 2026 | Hardware wallets face à face",
        description:
          "Trezor Safe vs Tangem pour XRP en 2026 — hardware open source vs carte NFC EAL6+. Sécurité, prix et verdict pour le cold storage XRP.",
      },
      "ellipal-vs-trezor": {
        title: "ELLIPAL vs Trezor pour XRP 2026 | Meilleur cold storage",
        description:
          "ELLIPAL Titan vs Trezor Safe pour XRP en 2026 — air-gapped en QR uniquement vs hardware open source. Sécurité, prix et choix selon le modèle de menace.",
      },
      "bifrost-vs-crossmark": {
        title: "Bifrost vs Crossmark pour XRP 2026 | Mobile vs navigateur",
        description:
          "Bifrost vs Crossmark pour XRP en 2026 — mobile multichain vs extension de navigateur XRPL. DEX, dApps, sécurité et quand utiliser laquelle.",
      },
      "gatehub-vs-xaman": {
        title: "GateHub vs Xaman pour XRP 2026 | Web vs mobile",
        description:
          "GateHub vs Xaman pour XRP en 2026 — portefeuille web régulé en UE avec on-ramp SEPA vs l'app mobile XUMM native XRPL. Conservation, frais, sécurité.",
      },
      "gatehub-vs-ledger": {
        title: "GateHub vs Ledger pour XRP 2026 | Web vs hardware",
        description:
          "GateHub vs Ledger Nano X pour XRP en 2026 — portefeuille web custodial régulé en UE vs cold storage hardware Secure Element. Conservation, frais et verdict.",
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
