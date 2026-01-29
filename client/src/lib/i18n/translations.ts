export type Language = "en" | "es" | "zh" | "ja" | "ko" | "pt" | "de" | "fr";

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  pt: "Português",
  de: "Deutsch",
  fr: "Français"
};

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.wallets": "Wallets",
    "nav.exchanges": "Exchanges",
    "nav.dapps": "DApps",
    "nav.yield": "Yield",
    "nav.blog": "Blog",
    "nav.gettingStarted": "Getting Started",
    "nav.compare": "Compare",
    "nav.about": "About",
    "nav.contact": "Contact",
    
    // Hero Section
    "hero.badge": "XRPL Ecosystem Intelligence",
    "hero.title1": "NAVIGATE THE",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "Your definitive guide to the best wallets, dApps, and DeFi tools on the XRPL. Secure your assets and maximize your yield with our expert reviews.",
    "hero.cta.start": "Get Started",
    "hero.cta.compare": "Compare Wallets",
    "hero.cta.quiz": "Find Your Perfect Wallet",
    
    // Features
    "features.security.title": "Security First",
    "features.security.desc": "Detailed security analyses of every wallet and exchange we review, so you can make informed decisions about your assets.",
    "features.yield.title": "Yield Opportunities",
    "features.yield.desc": "Discover the best places to stake your XRP and participate in AMM pools to earn passive income on your holdings.",
    "features.deep.title": "Deep Dives",
    "features.deep.desc": "Comprehensive guides and tutorials on XRPL features, from setting up your first wallet to advanced DeFi strategies.",
    
    // Wallet Section
    "wallets.title": "Top XRPL Wallets",
    "wallets.subtitle": "Expertly reviewed and compared for security, features, and ease of use",
    "wallets.viewAll": "View All Wallets",
    "wallets.topPick": "Top Pick",
    "wallets.free": "Free",
    "wallets.viewReview": "View Full Review",
    
    // Newsletter
    "newsletter.title": "Stay Updated",
    "newsletter.subtitle": "Get the latest XRPL news, reviews, and exclusive deals delivered to your inbox.",
    "newsletter.placeholder": "Enter your email",
    "newsletter.button": "Subscribe",
    "newsletter.privacy": "We respect your privacy. Unsubscribe at any time.",
    
    // Footer
    "footer.tagline": "Your trusted source for XRP Ledger wallet reviews, exchange comparisons, and DeFi insights.",
    "footer.resources": "Resources",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.rights": "All rights reserved.",
    
    // Common
    "common.learnMore": "Learn More",
    "common.readMore": "Read More",
    "common.viewAll": "View All",
    "common.getStarted": "Get Started",
    "common.compare": "Compare",
    "common.review": "Review",
    "common.affiliate": "Affiliate Disclosure",
    
    // Deal of the Week
    "deal.title": "Deal of the Week",
    "deal.off": "OFF",
    "deal.expires": "Expires in",
    "deal.days": "days",
    "deal.claimDeal": "Claim Deal",
    "deal.tangem.title": "Tangem Hardware Wallet",
    "deal.tangem.description": "Get the most portable hardware wallet with our exclusive discount. Perfect for secure XRP storage on the go.",
    
    // Wallet Cards
    "wallets.wallet": "Wallet",
    "wallets.fees": "Fees",
    "wallets.visitSite": "Visit Site",
    "wallets.readReview": "Read Review",
    "wallets.score": "Score",
    "wallets.maximizeSecurity": "Maximize Security with:",
    "wallets.takeQuiz": "Not sure which wallet? Take the Quiz",
    
    // Exchange Section
    "exchanges.badge": "Partner Offers",
    "exchanges.title": "Top Exchanges for XRP",
    "exchanges.subtitle": "Get the best sign-up bonuses and lowest fees with our partner exchanges.",
    "exchanges.claimBonus": "Claim Bonus",
    "exchanges.readReview": "Read Review",
    "exchanges.partnerTitle": "Partner with All Things XRPL",
    "exchanges.partnerDesc": "Are you a project builder or service provider? Connect with our audience.",
    "exchanges.becomePartner": "Become a Partner",
    
    // Features Section
    "features.security.link": "Learn about wallet security",
    "features.yield.link": "Explore staking options",
    "features.deep.link": "Read our articles",
    
    // Blog Section
    "blog.title": "Latest Insights",
    "blog.subtitle": "Stay ahead of the curve with our latest research on the XRP Ledger ecosystem.",
    "blog.viewAll": "View All Articles",
    "blog.readArticle": "Read Article",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "Join All Things XRPL",
    "newsletter.ctaSubtitle": "Get the latest wallet reviews, security alerts, and dApp opportunities delivered straight to your inbox.",
    
    // Footer Links
    "footer.viewAllWallets": "View All Wallets",
    "footer.viewAllExchanges": "View All Exchanges",
    "footer.walletQuiz": "Wallet Quiz",
    "footer.faq": "FAQ",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.disclaimer": "Not financial advice. Do your own research.",
    "footer.rssFeed": "RSS Feed",
    
    // Wallet Section Header
    "wallets.sectionTitle": "Top XRP Wallets",
    "wallets.sectionSubtitle": "Secure your XRP with the most trusted wallets in the industry. We've tested them all so you don't have to.",
    
    // Wallet Types
    "wallet.type.mobileApp": "Mobile App",
    "wallet.type.hardware": "Hardware",
    "wallet.type.browserExt": "Browser Ext",
    "wallet.type.hardwareCard": "Hardware Card",
    "wallet.type.webWallet": "Web Wallet",
    
    // Wallet Fees
    "wallet.fees.free": "Free",
    "wallet.fees.standard": "Standard",
    "wallet.fees.low": "Low",
    "wallet.fees.none": "None",
    
    // Wallet Features
    "wallet.feature.selfCustody": "Self-Custody",
    "wallet.feature.dappBrowser": "dApp Browser",
    "wallet.feature.biometricAuth": "Biometric Auth",
    "wallet.feature.fiatOnramp": "Fiat On-ramp",
    "wallet.feature.coldStorage": "Cold Storage",
    "wallet.feature.bluetooth": "Bluetooth",
    "wallet.feature.multiCurrency": "Multi-Currency",
    "wallet.feature.highSecurity": "High Security",
    "wallet.feature.web3Auth": "Web3 Auth",
    "wallet.feature.multiNetwork": "Multi-Network",
    "wallet.feature.developerFriendly": "Developer Friendly",
    "wallet.feature.lightweight": "Lightweight",
    "wallet.feature.nfcSupport": "NFC Support",
    "wallet.feature.waterproof": "Waterproof",
    "wallet.feature.noBattery": "No Battery",
    "wallet.feature.easySetup": "Easy Setup",
    "wallet.feature.privacyFocused": "Privacy-Focused",
    "wallet.feature.noTracking": "No Tracking",
    "wallet.feature.multiChain": "Multi-Chain",
    "wallet.feature.users70m": "70M+ Users",
    "wallet.feature.staking": "Staking",
    "wallet.feature.fiatGateway": "Fiat Gateway",
    "wallet.feature.multisig": "Multisig",
    "wallet.feature.trading": "Trading",
    "wallet.feature.theftCover": "Theft Cover",
    "wallet.feature.airGapped": "Air-Gapped",
    "wallet.feature.qrOnly": "QR Only",
    "wallet.feature.militaryGrade": "Military-Grade",
    "wallet.feature.antiTamper": "Anti-Tamper",
    "wallet.feature.openSource": "Open Source",
    "wallet.feature.secureElement": "Secure Element",
    "wallet.feature.budgetFriendly": "Budget-Friendly",
    "wallet.feature.trusted": "Trusted",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "Top Free XRPL Wallet",
    "wallet.badge.topChoice": "Top Choice",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Tangem Card (Backup)",
    "wallet.complementary.ledgerCold": "Ledger (Cold Storage)",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "$20 BTC Bonus",
    "exchange.bonus.xrp1000": "1000 XRP Airdrop",
    "exchange.bonus.lowFee": "Low Fee Trading",
    "exchange.bonus.crypto10": "$10 Free Crypto",
    "exchange.bonus.volume": "Volume Discounts",
    "exchange.bonus.signup25": "$25 Signup Bonus",
    "exchange.bonus.welcome": "Welcome Bonus",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "Best for XRP",
    "exchange.feature.fiatOnRamp": "Fiat On-Ramp",
    "exchange.feature.instantTrade": "Instant Trade",
    "exchange.feature.xrpBasePairs": "XRP Base Pairs",
    "exchange.feature.powerPiggy": "Power Piggy Staking",
    "exchange.feature.lowFees": "Low Fees",
    "exchange.feature.highSecurity": "High Security",
    "exchange.feature.deepLiquidity": "Deep Liquidity",
    "exchange.feature.proTools": "Pro Tools",
    "exchange.feature.mostTrusted": "Most Trusted",
    "exchange.feature.beginnerFriendly": "Beginner-Friendly",
    "exchange.feature.usBased": "US Based",
    "exchange.feature.since2011": "Since 2011",
    "exchange.feature.euRegulated": "EU Regulated",
    "exchange.feature.highLiquidity": "High Liquidity",
    "exchange.feature.visaCard": "Visa Card",
    "exchange.feature.earnInterest": "Earn Interest",
    "exchange.feature.coins250": "250+ Coins",
    "exchange.feature.coins800": "800+ Coins",
    "exchange.feature.tradingBots": "Trading Bots",
    
    // Blog Posts
    "blog.post1.title": "Top 5 DeFi dApps on XRPL in 2026",
    "blog.post1.excerpt": "Discover the leading decentralized finance protocols bringing yield and liquidity to the XRP Ledger this year.",
    "blog.post1.category": "Ecosystem",
    "blog.post2.title": "Understanding AMM Staking Rewards",
    "blog.post2.excerpt": "A comprehensive guide to the Automated Market Maker (AMM) functionality on XRPL and how to earn passive income.",
    "blog.post2.category": "Guides",
    "blog.post3.title": "Security Best Practices for Self-Custody",
    "blog.post3.excerpt": "Protect your digital assets with these essential security tips for hardware and software wallet users.",
    "blog.post3.category": "Security",
    "blog.post4.title": "NFT Marketplaces on XRPL: Complete Guide",
    "blog.post4.excerpt": "Explore the growing NFT ecosystem on the XRP Ledger, including top marketplaces and how to mint your first NFT.",
    "blog.post4.category": "NFTs",
    "blog.post5.title": "XRPL Sidechains Explained",
    "blog.post5.excerpt": "Learn how sidechains extend the capabilities of the XRP Ledger and enable new use cases like smart contracts.",
    "blog.post5.category": "Technology",
    "blog.post6.title": "Tokenizing Real World Assets on XRPL",
    "blog.post6.excerpt": "How institutions are bringing real estate, stocks, and commodities to the XRP Ledger through tokenization.",
    "blog.post6.category": "Institutional",
    
    // Date/Time Labels
    "blog.minRead": "min read"
  },
  
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.wallets": "Billeteras",
    "nav.exchanges": "Exchanges",
    "nav.dapps": "DApps",
    "nav.yield": "Rendimiento",
    "nav.blog": "Blog",
    "nav.gettingStarted": "Comenzar",
    "nav.compare": "Comparar",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    
    // Hero Section
    "hero.badge": "Inteligencia del Ecosistema XRPL",
    "hero.title1": "NAVEGA EL",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "Tu guía definitiva para las mejores billeteras, dApps y herramientas DeFi en XRPL. Asegura tus activos y maximiza tu rendimiento con nuestras reseñas expertas.",
    "hero.cta.start": "Comenzar",
    "hero.cta.compare": "Comparar Billeteras",
    "hero.cta.quiz": "Encuentra Tu Billetera Ideal",
    
    // Features
    "features.security.title": "Seguridad Primero",
    "features.security.desc": "Análisis de seguridad detallados de cada billetera y exchange que revisamos, para que puedas tomar decisiones informadas.",
    "features.yield.title": "Oportunidades de Rendimiento",
    "features.yield.desc": "Descubre los mejores lugares para hacer staking de tu XRP y participar en pools AMM para obtener ingresos pasivos.",
    "features.deep.title": "Guías Profundas",
    "features.deep.desc": "Guías y tutoriales completos sobre características de XRPL, desde configurar tu primera billetera hasta estrategias DeFi avanzadas.",
    
    // Wallet Section
    "wallets.title": "Mejores Billeteras XRPL",
    "wallets.subtitle": "Revisadas y comparadas por seguridad, características y facilidad de uso",
    "wallets.viewAll": "Ver Todas",
    "wallets.topPick": "Mejor Opción",
    "wallets.free": "Gratis",
    "wallets.viewReview": "Ver Reseña Completa",
    
    // Newsletter
    "newsletter.title": "Mantente Actualizado",
    "newsletter.subtitle": "Recibe las últimas noticias de XRPL, reseñas y ofertas exclusivas en tu correo.",
    "newsletter.placeholder": "Ingresa tu email",
    "newsletter.button": "Suscribirse",
    "newsletter.privacy": "Respetamos tu privacidad. Cancela cuando quieras.",
    
    // Footer
    "footer.tagline": "Tu fuente confiable para reseñas de billeteras XRP Ledger, comparaciones de exchanges e insights DeFi.",
    "footer.resources": "Recursos",
    "footer.company": "Empresa",
    "footer.legal": "Legal",
    "footer.rights": "Todos los derechos reservados.",
    
    // Common
    "common.learnMore": "Más Información",
    "common.readMore": "Leer Más",
    "common.viewAll": "Ver Todo",
    "common.getStarted": "Comenzar",
    "common.compare": "Comparar",
    "common.review": "Reseña",
    "common.affiliate": "Divulgación de Afiliados",
    
    // Deal of the Week
    "deal.title": "Oferta de la Semana",
    "deal.off": "DESC.",
    "deal.expires": "Expira en",
    "deal.days": "días",
    "deal.claimDeal": "Obtener Oferta",
    "deal.tangem.title": "Billetera Tangem",
    "deal.tangem.description": "Obtén la billetera hardware más portátil con nuestro descuento exclusivo. Perfecta para almacenar XRP de forma segura.",
    
    // Wallet Cards
    "wallets.wallet": "Billetera",
    "wallets.fees": "Comisiones",
    "wallets.visitSite": "Visitar Sitio",
    "wallets.readReview": "Leer Reseña",
    "wallets.score": "Puntaje",
    "wallets.maximizeSecurity": "Maximiza tu Seguridad con:",
    "wallets.takeQuiz": "¿No sabes cuál elegir? Haz el Quiz",
    
    // Exchange Section
    "exchanges.badge": "Ofertas de Partners",
    "exchanges.title": "Mejores Exchanges para XRP",
    "exchanges.subtitle": "Obtén los mejores bonos de registro y las comisiones más bajas con nuestros exchanges asociados.",
    "exchanges.claimBonus": "Obtener Bono",
    "exchanges.readReview": "Leer Reseña",
    "exchanges.partnerTitle": "Asóciate con All Things XRPL",
    "exchanges.partnerDesc": "¿Eres desarrollador o proveedor de servicios? Conecta con nuestra audiencia.",
    "exchanges.becomePartner": "Ser Partner",
    
    // Features Section
    "features.security.link": "Aprende sobre seguridad de billeteras",
    "features.yield.link": "Explora opciones de staking",
    "features.deep.link": "Lee nuestros artículos",
    
    // Blog Section
    "blog.title": "Últimos Insights",
    "blog.subtitle": "Mantente al día con nuestra investigación sobre el ecosistema XRP Ledger.",
    "blog.viewAll": "Ver Todos los Artículos",
    "blog.readArticle": "Leer Artículo",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "Únete a All Things XRPL",
    "newsletter.ctaSubtitle": "Recibe las últimas reseñas de billeteras, alertas de seguridad y oportunidades dApp directamente en tu correo.",
    
    // Footer Links
    "footer.viewAllWallets": "Ver Todas las Billeteras",
    "footer.viewAllExchanges": "Ver Todos los Exchanges",
    "footer.walletQuiz": "Quiz de Billeteras",
    "footer.faq": "Preguntas Frecuentes",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",
    "footer.disclaimer": "No es consejo financiero. Haz tu propia investigación.",
    "footer.rssFeed": "Canal RSS",
    
    // Wallet Section Header
    "wallets.sectionTitle": "Mejores Billeteras XRP",
    "wallets.sectionSubtitle": "Protege tu XRP con las billeteras más confiables de la industria. Las hemos probado todas para ti.",
    
    // Wallet Types
    "wallet.type.mobileApp": "App Móvil",
    "wallet.type.hardware": "Hardware",
    "wallet.type.browserExt": "Extensión",
    "wallet.type.hardwareCard": "Tarjeta Hardware",
    "wallet.type.webWallet": "Billetera Web",
    
    // Wallet Fees
    "wallet.fees.free": "Gratis",
    "wallet.fees.standard": "Estándar",
    "wallet.fees.low": "Bajo",
    "wallet.fees.none": "Sin comisión",
    
    // Wallet Features
    "wallet.feature.selfCustody": "Auto-Custodia",
    "wallet.feature.dappBrowser": "Navegador dApp",
    "wallet.feature.biometricAuth": "Auth Biométrica",
    "wallet.feature.fiatOnramp": "Compra con Fiat",
    "wallet.feature.coldStorage": "Almacenamiento Frío",
    "wallet.feature.bluetooth": "Bluetooth",
    "wallet.feature.multiCurrency": "Multi-Moneda",
    "wallet.feature.highSecurity": "Alta Seguridad",
    "wallet.feature.web3Auth": "Auth Web3",
    "wallet.feature.multiNetwork": "Multi-Red",
    "wallet.feature.developerFriendly": "Para Desarrolladores",
    "wallet.feature.lightweight": "Ligero",
    "wallet.feature.nfcSupport": "Soporte NFC",
    "wallet.feature.waterproof": "Resistente al Agua",
    "wallet.feature.noBattery": "Sin Batería",
    "wallet.feature.easySetup": "Fácil Configuración",
    "wallet.feature.privacyFocused": "Enfocado en Privacidad",
    "wallet.feature.noTracking": "Sin Rastreo",
    "wallet.feature.multiChain": "Multi-Cadena",
    "wallet.feature.users70m": "70M+ Usuarios",
    "wallet.feature.staking": "Staking",
    "wallet.feature.fiatGateway": "Pasarela Fiat",
    "wallet.feature.multisig": "Multifirma",
    "wallet.feature.trading": "Trading",
    "wallet.feature.theftCover": "Seguro Antirrobo",
    "wallet.feature.airGapped": "Sin Conexión",
    "wallet.feature.qrOnly": "Solo QR",
    "wallet.feature.militaryGrade": "Grado Militar",
    "wallet.feature.antiTamper": "Anti-Manipulación",
    "wallet.feature.openSource": "Código Abierto",
    "wallet.feature.secureElement": "Elemento Seguro",
    "wallet.feature.budgetFriendly": "Económico",
    "wallet.feature.trusted": "Confiable",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "Mejor Billetera XRPL Gratis",
    "wallet.badge.topChoice": "Mejor Opción",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Tangem Card (Respaldo)",
    "wallet.complementary.ledgerCold": "Ledger (Almacenamiento Frío)",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "$20 Bono BTC",
    "exchange.bonus.xrp1000": "1000 XRP Airdrop",
    "exchange.bonus.lowFee": "Trading con Bajas Comisiones",
    "exchange.bonus.crypto10": "$10 Cripto Gratis",
    "exchange.bonus.volume": "Descuentos por Volumen",
    "exchange.bonus.signup25": "$25 Bono de Registro",
    "exchange.bonus.welcome": "Bono de Bienvenida",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "Mejor para XRP",
    "exchange.feature.fiatOnRamp": "Compra con Fiat",
    "exchange.feature.instantTrade": "Trading Instantáneo",
    "exchange.feature.xrpBasePairs": "Pares Base XRP",
    "exchange.feature.powerPiggy": "Staking Power Piggy",
    "exchange.feature.lowFees": "Bajas Comisiones",
    "exchange.feature.highSecurity": "Alta Seguridad",
    "exchange.feature.deepLiquidity": "Alta Liquidez",
    "exchange.feature.proTools": "Herramientas Pro",
    "exchange.feature.mostTrusted": "Más Confiable",
    "exchange.feature.beginnerFriendly": "Fácil para Principiantes",
    "exchange.feature.usBased": "Con Base en EE.UU.",
    "exchange.feature.since2011": "Desde 2011",
    "exchange.feature.euRegulated": "Regulado en UE",
    "exchange.feature.highLiquidity": "Alta Liquidez",
    "exchange.feature.visaCard": "Tarjeta Visa",
    "exchange.feature.earnInterest": "Gana Intereses",
    "exchange.feature.coins250": "250+ Monedas",
    "exchange.feature.coins800": "800+ Monedas",
    "exchange.feature.tradingBots": "Bots de Trading",
    
    // Blog Posts
    "blog.post1.title": "Los 5 Mejores dApps DeFi en XRPL en 2026",
    "blog.post1.excerpt": "Descubre los principales protocolos de finanzas descentralizadas que traen rendimiento y liquidez al XRP Ledger este año.",
    "blog.post1.category": "Ecosistema",
    "blog.post2.title": "Entendiendo las Recompensas de Staking AMM",
    "blog.post2.excerpt": "Una guía completa sobre la funcionalidad del Automated Market Maker (AMM) en XRPL y cómo ganar ingresos pasivos.",
    "blog.post2.category": "Guías",
    "blog.post3.title": "Mejores Prácticas de Seguridad para Auto-Custodia",
    "blog.post3.excerpt": "Protege tus activos digitales con estos consejos esenciales de seguridad para usuarios de billeteras hardware y software.",
    "blog.post3.category": "Seguridad",
    "blog.post4.title": "Mercados NFT en XRPL: Guía Completa",
    "blog.post4.excerpt": "Explora el creciente ecosistema NFT en el XRP Ledger, incluyendo los mejores mercados y cómo crear tu primer NFT.",
    "blog.post4.category": "NFTs",
    "blog.post5.title": "Sidechains de XRPL Explicadas",
    "blog.post5.excerpt": "Aprende cómo las sidechains extienden las capacidades del XRP Ledger y habilitan nuevos casos de uso como contratos inteligentes.",
    "blog.post5.category": "Tecnología",
    "blog.post6.title": "Tokenización de Activos Reales en XRPL",
    "blog.post6.excerpt": "Cómo las instituciones están trayendo bienes raíces, acciones y commodities al XRP Ledger a través de la tokenización.",
    "blog.post6.category": "Institucional",
    
    // Date/Time Labels
    "blog.minRead": "min de lectura"
  },
  
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.wallets": "钱包",
    "nav.exchanges": "交易所",
    "nav.dapps": "DApps",
    "nav.yield": "收益",
    "nav.blog": "博客",
    "nav.gettingStarted": "入门指南",
    "nav.compare": "比较",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    
    // Hero Section
    "hero.badge": "XRPL生态系统情报",
    "hero.title1": "导航",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "您的XRPL最佳钱包、dApps和DeFi工具权威指南。通过我们的专业评测保护您的资产并最大化收益。",
    "hero.cta.start": "开始使用",
    "hero.cta.compare": "比较钱包",
    "hero.cta.quiz": "找到您的理想钱包",
    
    // Features
    "features.security.title": "安全第一",
    "features.security.desc": "我们评测的每个钱包和交易所都有详细的安全分析，让您能够做出明智的资产决策。",
    "features.yield.title": "收益机会",
    "features.yield.desc": "发现质押XRP和参与AMM池赚取被动收入的最佳场所。",
    "features.deep.title": "深度指南",
    "features.deep.desc": "关于XRPL功能的全面指南和教程，从设置您的第一个钱包到高级DeFi策略。",
    
    // Wallet Section
    "wallets.title": "顶级XRPL钱包",
    "wallets.subtitle": "专业评测和比较安全性、功能和易用性",
    "wallets.viewAll": "查看全部",
    "wallets.topPick": "首选",
    "wallets.free": "免费",
    "wallets.viewReview": "查看完整评测",
    
    // Newsletter
    "newsletter.title": "保持更新",
    "newsletter.subtitle": "获取最新的XRPL新闻、评测和独家优惠。",
    "newsletter.placeholder": "输入您的邮箱",
    "newsletter.button": "订阅",
    "newsletter.privacy": "我们尊重您的隐私。随时可以退订。",
    
    // Footer
    "footer.tagline": "您信赖的XRP Ledger钱包评测、交易所比较和DeFi见解来源。",
    "footer.resources": "资源",
    "footer.company": "公司",
    "footer.legal": "法律",
    "footer.rights": "保留所有权利。",
    
    // Common
    "common.learnMore": "了解更多",
    "common.readMore": "阅读更多",
    "common.viewAll": "查看全部",
    "common.getStarted": "开始使用",
    "common.compare": "比较",
    "common.review": "评测",
    "common.affiliate": "联盟披露",
    
    // Deal of the Week
    "deal.title": "本周优惠",
    "deal.off": "折扣",
    "deal.expires": "剩余",
    "deal.days": "天",
    "deal.claimDeal": "领取优惠",
    "deal.tangem.title": "Tangem硬件钱包",
    "deal.tangem.description": "使用我们的独家折扣获取最便携的硬件钱包。非常适合安全存储XRP。",
    
    // Wallet Cards
    "wallets.wallet": "钱包",
    "wallets.fees": "费用",
    "wallets.visitSite": "访问网站",
    "wallets.readReview": "阅读评测",
    "wallets.score": "评分",
    "wallets.maximizeSecurity": "最大化安全性：",
    "wallets.takeQuiz": "不确定选哪个？参加测验",
    
    // Exchange Section
    "exchanges.badge": "合作伙伴优惠",
    "exchanges.title": "XRP最佳交易所",
    "exchanges.subtitle": "通过我们的合作交易所获取最佳注册奖励和最低费用。",
    "exchanges.claimBonus": "领取奖励",
    "exchanges.readReview": "阅读评测",
    "exchanges.partnerTitle": "与All Things XRPL合作",
    "exchanges.partnerDesc": "您是项目开发者或服务提供商吗？与我们的受众建立联系。",
    "exchanges.becomePartner": "成为合作伙伴",
    
    // Features Section
    "features.security.link": "了解钱包安全",
    "features.yield.link": "探索质押选项",
    "features.deep.link": "阅读我们的文章",
    
    // Blog Section
    "blog.title": "最新洞察",
    "blog.subtitle": "通过我们对XRP Ledger生态系统的最新研究保持领先。",
    "blog.viewAll": "查看所有文章",
    "blog.readArticle": "阅读文章",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "加入All Things XRPL",
    "newsletter.ctaSubtitle": "将最新的钱包评测、安全警报和dApp机会直接发送到您的邮箱。",
    
    // Footer Links
    "footer.viewAllWallets": "查看所有钱包",
    "footer.viewAllExchanges": "查看所有交易所",
    "footer.walletQuiz": "钱包测验",
    "footer.faq": "常见问题",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
    "footer.disclaimer": "非财务建议。请自行研究。",
    "footer.rssFeed": "RSS订阅",
    
    // Wallet Section Header
    "wallets.sectionTitle": "顶级XRP钱包",
    "wallets.sectionSubtitle": "使用行业内最受信赖的钱包保护您的XRP。我们已经为您测试了所有钱包。",
    
    // Wallet Types
    "wallet.type.mobileApp": "手机应用",
    "wallet.type.hardware": "硬件",
    "wallet.type.browserExt": "浏览器扩展",
    "wallet.type.hardwareCard": "硬件卡",
    "wallet.type.webWallet": "网页钱包",
    
    // Wallet Fees
    "wallet.fees.free": "免费",
    "wallet.fees.standard": "标准",
    "wallet.fees.low": "低",
    "wallet.fees.none": "无",
    
    // Wallet Features
    "wallet.feature.selfCustody": "自托管",
    "wallet.feature.dappBrowser": "dApp浏览器",
    "wallet.feature.biometricAuth": "生物识别",
    "wallet.feature.fiatOnramp": "法币入金",
    "wallet.feature.coldStorage": "冷存储",
    "wallet.feature.bluetooth": "蓝牙",
    "wallet.feature.multiCurrency": "多币种",
    "wallet.feature.highSecurity": "高安全性",
    "wallet.feature.web3Auth": "Web3认证",
    "wallet.feature.multiNetwork": "多网络",
    "wallet.feature.developerFriendly": "开发者友好",
    "wallet.feature.lightweight": "轻量级",
    "wallet.feature.nfcSupport": "NFC支持",
    "wallet.feature.waterproof": "防水",
    "wallet.feature.noBattery": "无需电池",
    "wallet.feature.easySetup": "简易设置",
    "wallet.feature.privacyFocused": "注重隐私",
    "wallet.feature.noTracking": "无追踪",
    "wallet.feature.multiChain": "多链",
    "wallet.feature.users70m": "7000万+用户",
    "wallet.feature.staking": "质押",
    "wallet.feature.fiatGateway": "法币通道",
    "wallet.feature.multisig": "多签",
    "wallet.feature.trading": "交易",
    "wallet.feature.theftCover": "防盗保障",
    "wallet.feature.airGapped": "气隙隔离",
    "wallet.feature.qrOnly": "仅QR码",
    "wallet.feature.militaryGrade": "军用级别",
    "wallet.feature.antiTamper": "防篡改",
    "wallet.feature.openSource": "开源",
    "wallet.feature.secureElement": "安全元件",
    "wallet.feature.budgetFriendly": "经济实惠",
    "wallet.feature.trusted": "可信赖",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "最佳免费XRPL钱包",
    "wallet.badge.topChoice": "首选",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Tangem卡（备份）",
    "wallet.complementary.ledgerCold": "Ledger（冷存储）",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "$20 BTC奖励",
    "exchange.bonus.xrp1000": "1000 XRP空投",
    "exchange.bonus.lowFee": "低手续费交易",
    "exchange.bonus.crypto10": "$10免费加密货币",
    "exchange.bonus.volume": "交易量折扣",
    "exchange.bonus.signup25": "$25注册奖励",
    "exchange.bonus.welcome": "欢迎奖励",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "最适合XRP",
    "exchange.feature.fiatOnRamp": "法币入金",
    "exchange.feature.instantTrade": "即时交易",
    "exchange.feature.xrpBasePairs": "XRP交易对",
    "exchange.feature.powerPiggy": "Power Piggy质押",
    "exchange.feature.lowFees": "低手续费",
    "exchange.feature.highSecurity": "高安全性",
    "exchange.feature.deepLiquidity": "深度流动性",
    "exchange.feature.proTools": "专业工具",
    "exchange.feature.mostTrusted": "最受信赖",
    "exchange.feature.beginnerFriendly": "新手友好",
    "exchange.feature.usBased": "美国公司",
    "exchange.feature.since2011": "始于2011",
    "exchange.feature.euRegulated": "欧盟监管",
    "exchange.feature.highLiquidity": "高流动性",
    "exchange.feature.visaCard": "Visa卡",
    "exchange.feature.earnInterest": "赚取利息",
    "exchange.feature.coins250": "250+币种",
    "exchange.feature.coins800": "800+币种",
    "exchange.feature.tradingBots": "交易机器人",
    
    // Blog Posts
    "blog.post1.title": "2026年XRPL上的5大DeFi dApp",
    "blog.post1.excerpt": "发现今年为XRP Ledger带来收益和流动性的领先去中心化金融协议。",
    "blog.post1.category": "生态系统",
    "blog.post2.title": "了解AMM质押奖励",
    "blog.post2.excerpt": "关于XRPL上自动化做市商（AMM）功能以及如何赚取被动收入的全面指南。",
    "blog.post2.category": "指南",
    "blog.post3.title": "自托管最佳安全实践",
    "blog.post3.excerpt": "使用这些必要的安全技巧保护您的数字资产，适用于硬件和软件钱包用户。",
    "blog.post3.category": "安全",
    "blog.post4.title": "XRPL上的NFT市场：完整指南",
    "blog.post4.excerpt": "探索XRP Ledger上不断增长的NFT生态系统，包括顶级市场以及如何铸造您的第一个NFT。",
    "blog.post4.category": "NFT",
    "blog.post5.title": "XRPL侧链解析",
    "blog.post5.excerpt": "了解侧链如何扩展XRP Ledger的功能并实现智能合约等新用例。",
    "blog.post5.category": "技术",
    "blog.post6.title": "在XRPL上代币化实体资产",
    "blog.post6.excerpt": "机构如何通过代币化将房地产、股票和大宗商品带入XRP Ledger。",
    "blog.post6.category": "机构",
    
    // Date/Time Labels
    "blog.minRead": "分钟阅读"
  },
  
  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.wallets": "ウォレット",
    "nav.exchanges": "取引所",
    "nav.dapps": "DApps",
    "nav.yield": "利回り",
    "nav.blog": "ブログ",
    "nav.gettingStarted": "はじめに",
    "nav.compare": "比較",
    "nav.about": "について",
    "nav.contact": "お問い合わせ",
    
    // Hero Section
    "hero.badge": "XRPLエコシステム・インテリジェンス",
    "hero.title1": "ナビゲート",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "XRPLの最高のウォレット、dApps、DeFiツールへの決定版ガイド。専門家のレビューで資産を守り、収益を最大化。",
    "hero.cta.start": "始める",
    "hero.cta.compare": "ウォレットを比較",
    "hero.cta.quiz": "最適なウォレットを見つける",
    
    // Features
    "features.security.title": "セキュリティ第一",
    "features.security.desc": "レビューするすべてのウォレットと取引所の詳細なセキュリティ分析で、資産について情報に基づいた決定ができます。",
    "features.yield.title": "利回り機会",
    "features.yield.desc": "XRPをステークしてAMMプールに参加し、パッシブインカムを得る最適な場所を発見。",
    "features.deep.title": "詳細ガイド",
    "features.deep.desc": "最初のウォレット設定から高度なDeFi戦略まで、XRPL機能に関する包括的なガイドとチュートリアル。",
    
    // Wallet Section
    "wallets.title": "トップXRPLウォレット",
    "wallets.subtitle": "セキュリティ、機能、使いやすさを専門家がレビュー・比較",
    "wallets.viewAll": "すべて表示",
    "wallets.topPick": "おすすめ",
    "wallets.free": "無料",
    "wallets.viewReview": "詳細レビューを見る",
    
    // Newsletter
    "newsletter.title": "最新情報を入手",
    "newsletter.subtitle": "最新のXRPLニュース、レビュー、限定情報をお届けします。",
    "newsletter.placeholder": "メールアドレス",
    "newsletter.button": "購読",
    "newsletter.privacy": "プライバシーを尊重します。いつでも解除できます。",
    
    // Footer
    "footer.tagline": "XRP Ledgerウォレットレビュー、取引所比較、DeFiインサイトの信頼できる情報源。",
    "footer.resources": "リソース",
    "footer.company": "会社",
    "footer.legal": "法的情報",
    "footer.rights": "全著作権所有。",
    
    // Common
    "common.learnMore": "詳細",
    "common.readMore": "続きを読む",
    "common.viewAll": "すべて表示",
    "common.getStarted": "始める",
    "common.compare": "比較",
    "common.review": "レビュー",
    "common.affiliate": "アフィリエイト開示",
    
    // Deal of the Week
    "deal.title": "今週のお得情報",
    "deal.off": "オフ",
    "deal.expires": "残り",
    "deal.days": "日",
    "deal.claimDeal": "特典を獲得",
    "deal.tangem.title": "Tangemハードウェアウォレット",
    "deal.tangem.description": "限定割引で最もポータブルなハードウェアウォレットを手に入れましょう。安全なXRP保管に最適。",
    
    // Wallet Cards
    "wallets.wallet": "ウォレット",
    "wallets.fees": "手数料",
    "wallets.visitSite": "サイトを訪問",
    "wallets.readReview": "レビューを読む",
    "wallets.score": "スコア",
    "wallets.maximizeSecurity": "セキュリティを最大化:",
    "wallets.takeQuiz": "どれが最適？クイズに挑戦",
    
    // Exchange Section
    "exchanges.badge": "パートナー特典",
    "exchanges.title": "XRP取引所トップ",
    "exchanges.subtitle": "パートナー取引所で最高のサインアップボーナスと最低手数料を獲得。",
    "exchanges.claimBonus": "ボーナスを獲得",
    "exchanges.readReview": "レビューを読む",
    "exchanges.partnerTitle": "All Things XRPLと提携",
    "exchanges.partnerDesc": "プロジェクト開発者またはサービスプロバイダーですか？当社のオーディエンスとつながりましょう。",
    "exchanges.becomePartner": "パートナーになる",
    
    // Features Section
    "features.security.link": "ウォレットセキュリティについて学ぶ",
    "features.yield.link": "ステーキングオプションを探る",
    "features.deep.link": "記事を読む",
    
    // Blog Section
    "blog.title": "最新インサイト",
    "blog.subtitle": "XRP Ledgerエコシステムに関する最新の調査で先を行く。",
    "blog.viewAll": "すべての記事を見る",
    "blog.readArticle": "記事を読む",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "All Things XRPLに参加",
    "newsletter.ctaSubtitle": "最新のウォレットレビュー、セキュリティアラート、dApp機会をメールでお届け。",
    
    // Footer Links
    "footer.viewAllWallets": "すべてのウォレットを見る",
    "footer.viewAllExchanges": "すべての取引所を見る",
    "footer.walletQuiz": "ウォレットクイズ",
    "footer.faq": "よくある質問",
    "footer.privacy": "プライバシーポリシー",
    "footer.terms": "利用規約",
    "footer.disclaimer": "投資アドバイスではありません。ご自身で調査してください。",
    "footer.rssFeed": "RSSフィード",
    
    // Wallet Section Header
    "wallets.sectionTitle": "トップXRPウォレット",
    "wallets.sectionSubtitle": "業界で最も信頼されるウォレットでXRPを保護。すべてテスト済みです。",
    
    // Wallet Types
    "wallet.type.mobileApp": "モバイルアプリ",
    "wallet.type.hardware": "ハードウェア",
    "wallet.type.browserExt": "ブラウザ拡張",
    "wallet.type.hardwareCard": "ハードウェアカード",
    "wallet.type.webWallet": "ウェブウォレット",
    
    // Wallet Fees
    "wallet.fees.free": "無料",
    "wallet.fees.standard": "標準",
    "wallet.fees.low": "低",
    "wallet.fees.none": "なし",
    
    // Wallet Features
    "wallet.feature.selfCustody": "自己管理",
    "wallet.feature.dappBrowser": "dAppブラウザ",
    "wallet.feature.biometricAuth": "生体認証",
    "wallet.feature.fiatOnramp": "法定通貨入金",
    "wallet.feature.coldStorage": "コールドストレージ",
    "wallet.feature.bluetooth": "Bluetooth",
    "wallet.feature.multiCurrency": "マルチ通貨",
    "wallet.feature.highSecurity": "高セキュリティ",
    "wallet.feature.web3Auth": "Web3認証",
    "wallet.feature.multiNetwork": "マルチネットワーク",
    "wallet.feature.developerFriendly": "開発者向け",
    "wallet.feature.lightweight": "軽量",
    "wallet.feature.nfcSupport": "NFC対応",
    "wallet.feature.waterproof": "防水",
    "wallet.feature.noBattery": "電池不要",
    "wallet.feature.easySetup": "簡単設定",
    "wallet.feature.privacyFocused": "プライバシー重視",
    "wallet.feature.noTracking": "追跡なし",
    "wallet.feature.multiChain": "マルチチェーン",
    "wallet.feature.users70m": "7000万+ユーザー",
    "wallet.feature.staking": "ステーキング",
    "wallet.feature.fiatGateway": "法定通貨ゲートウェイ",
    "wallet.feature.multisig": "マルチシグ",
    "wallet.feature.trading": "取引",
    "wallet.feature.theftCover": "盗難補償",
    "wallet.feature.airGapped": "エアギャップ",
    "wallet.feature.qrOnly": "QRのみ",
    "wallet.feature.militaryGrade": "軍用グレード",
    "wallet.feature.antiTamper": "改ざん防止",
    "wallet.feature.openSource": "オープンソース",
    "wallet.feature.secureElement": "セキュアエレメント",
    "wallet.feature.budgetFriendly": "お手頃価格",
    "wallet.feature.trusted": "信頼性",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "トップ無料XRPLウォレット",
    "wallet.badge.topChoice": "トップチョイス",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Tangemカード（バックアップ）",
    "wallet.complementary.ledgerCold": "Ledger（コールドストレージ）",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "$20 BTCボーナス",
    "exchange.bonus.xrp1000": "1000 XRPエアドロップ",
    "exchange.bonus.lowFee": "低手数料取引",
    "exchange.bonus.crypto10": "$10無料暗号通貨",
    "exchange.bonus.volume": "ボリューム割引",
    "exchange.bonus.signup25": "$25登録ボーナス",
    "exchange.bonus.welcome": "ウェルカムボーナス",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "XRPに最適",
    "exchange.feature.fiatOnRamp": "法定通貨入金",
    "exchange.feature.instantTrade": "即時取引",
    "exchange.feature.xrpBasePairs": "XRPベースペア",
    "exchange.feature.powerPiggy": "Power Piggyステーキング",
    "exchange.feature.lowFees": "低手数料",
    "exchange.feature.highSecurity": "高セキュリティ",
    "exchange.feature.deepLiquidity": "深い流動性",
    "exchange.feature.proTools": "プロツール",
    "exchange.feature.mostTrusted": "最も信頼",
    "exchange.feature.beginnerFriendly": "初心者向け",
    "exchange.feature.usBased": "米国拠点",
    "exchange.feature.since2011": "2011年から",
    "exchange.feature.euRegulated": "EU規制",
    "exchange.feature.highLiquidity": "高流動性",
    "exchange.feature.visaCard": "Visaカード",
    "exchange.feature.earnInterest": "利息を稼ぐ",
    "exchange.feature.coins250": "250+コイン",
    "exchange.feature.coins800": "800+コイン",
    "exchange.feature.tradingBots": "取引ボット",
    
    // Blog Posts
    "blog.post1.title": "2026年XRPLのトップ5 DeFi dApp",
    "blog.post1.excerpt": "今年XRP Ledgerに収益と流動性をもたらす主要な分散型金融プロトコルを発見。",
    "blog.post1.category": "エコシステム",
    "blog.post2.title": "AMMステーキング報酬の理解",
    "blog.post2.excerpt": "XRPLのAMM機能とパッシブインカムの稼ぎ方についての包括的ガイド。",
    "blog.post2.category": "ガイド",
    "blog.post3.title": "自己管理のセキュリティベストプラクティス",
    "blog.post3.excerpt": "ハードウェアおよびソフトウェアウォレットユーザー向けの必須セキュリティヒントで資産を保護。",
    "blog.post3.category": "セキュリティ",
    "blog.post4.title": "XRPLのNFTマーケットプレイス：完全ガイド",
    "blog.post4.excerpt": "XRP Ledgerの成長するNFTエコシステムを探索、トップマーケットプレイスと初NFTの作成方法を含む。",
    "blog.post4.category": "NFT",
    "blog.post5.title": "XRPLサイドチェーン解説",
    "blog.post5.excerpt": "サイドチェーンがXRP Ledgerの機能を拡張し、スマートコントラクトなどの新しいユースケースを可能にする方法を学ぶ。",
    "blog.post5.category": "テクノロジー",
    "blog.post6.title": "XRPLでの実物資産のトークン化",
    "blog.post6.excerpt": "機関がトークン化を通じて不動産、株式、商品をXRP Ledgerに導入する方法。",
    "blog.post6.category": "機関投資家",
    
    // Date/Time Labels
    "blog.minRead": "分で読める"
  },
  
  ko: {
    // Navigation
    "nav.home": "홈",
    "nav.wallets": "지갑",
    "nav.exchanges": "거래소",
    "nav.dapps": "DApps",
    "nav.yield": "수익",
    "nav.blog": "블로그",
    "nav.gettingStarted": "시작하기",
    "nav.compare": "비교",
    "nav.about": "소개",
    "nav.contact": "문의",
    
    // Hero Section
    "hero.badge": "XRPL 생태계 인텔리전스",
    "hero.title1": "탐색하세요",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "XRPL 최고의 지갑, dApps, DeFi 도구에 대한 결정적 가이드. 전문가 리뷰로 자산을 보호하고 수익을 극대화하세요.",
    "hero.cta.start": "시작하기",
    "hero.cta.compare": "지갑 비교",
    "hero.cta.quiz": "나만의 완벽한 지갑 찾기",
    
    // Features
    "features.security.title": "보안 우선",
    "features.security.desc": "리뷰하는 모든 지갑과 거래소에 대한 상세한 보안 분석으로 자산에 대해 정보에 입각한 결정을 내릴 수 있습니다.",
    "features.yield.title": "수익 기회",
    "features.yield.desc": "XRP를 스테이킹하고 AMM 풀에 참여하여 패시브 인컴을 얻을 수 있는 최적의 장소를 발견하세요.",
    "features.deep.title": "심층 가이드",
    "features.deep.desc": "첫 번째 지갑 설정부터 고급 DeFi 전략까지 XRPL 기능에 대한 종합 가이드와 튜토리얼.",
    
    // Wallet Section
    "wallets.title": "최고의 XRPL 지갑",
    "wallets.subtitle": "보안, 기능, 사용 편의성을 전문적으로 검토 및 비교",
    "wallets.viewAll": "모두 보기",
    "wallets.topPick": "추천",
    "wallets.free": "무료",
    "wallets.viewReview": "전체 리뷰 보기",
    
    // Newsletter
    "newsletter.title": "최신 정보 받기",
    "newsletter.subtitle": "최신 XRPL 뉴스, 리뷰, 독점 혜택을 받아보세요.",
    "newsletter.placeholder": "이메일 입력",
    "newsletter.button": "구독",
    "newsletter.privacy": "개인정보를 존중합니다. 언제든 구독 취소 가능.",
    
    // Footer
    "footer.tagline": "XRP Ledger 지갑 리뷰, 거래소 비교, DeFi 인사이트의 신뢰할 수 있는 소스.",
    "footer.resources": "리소스",
    "footer.company": "회사",
    "footer.legal": "법적 정보",
    "footer.rights": "모든 권리 보유.",
    
    // Common
    "common.learnMore": "자세히 보기",
    "common.readMore": "더 읽기",
    "common.viewAll": "모두 보기",
    "common.getStarted": "시작하기",
    "common.compare": "비교",
    "common.review": "리뷰",
    "common.affiliate": "제휴 공개",
    
    // Deal of the Week
    "deal.title": "이번 주 특가",
    "deal.off": "할인",
    "deal.expires": "남은 기간",
    "deal.days": "일",
    "deal.claimDeal": "특가 받기",
    "deal.tangem.title": "Tangem 하드웨어 지갑",
    "deal.tangem.description": "독점 할인으로 가장 휴대하기 좋은 하드웨어 지갑을 받으세요. 안전한 XRP 보관에 완벽합니다.",
    
    // Wallet Cards
    "wallets.wallet": "지갑",
    "wallets.fees": "수수료",
    "wallets.visitSite": "사이트 방문",
    "wallets.readReview": "리뷰 읽기",
    "wallets.score": "점수",
    "wallets.maximizeSecurity": "보안 극대화:",
    "wallets.takeQuiz": "어떤 지갑이 좋을지 모르겠나요? 퀴즈 풀기",
    
    // Exchange Section
    "exchanges.badge": "파트너 혜택",
    "exchanges.title": "XRP 최고 거래소",
    "exchanges.subtitle": "파트너 거래소에서 최고의 가입 보너스와 최저 수수료를 받으세요.",
    "exchanges.claimBonus": "보너스 받기",
    "exchanges.readReview": "리뷰 읽기",
    "exchanges.partnerTitle": "All Things XRPL과 파트너 되기",
    "exchanges.partnerDesc": "프로젝트 개발자나 서비스 제공자인가요? 저희 청중과 연결하세요.",
    "exchanges.becomePartner": "파트너 되기",
    
    // Features Section
    "features.security.link": "지갑 보안에 대해 알아보기",
    "features.yield.link": "스테이킹 옵션 살펴보기",
    "features.deep.link": "기사 읽기",
    
    // Blog Section
    "blog.title": "최신 인사이트",
    "blog.subtitle": "XRP Ledger 생태계에 대한 최신 연구로 앞서가세요.",
    "blog.viewAll": "모든 기사 보기",
    "blog.readArticle": "기사 읽기",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "All Things XRPL 가입하기",
    "newsletter.ctaSubtitle": "최신 지갑 리뷰, 보안 알림, dApp 기회를 이메일로 받아보세요.",
    
    // Footer Links
    "footer.viewAllWallets": "모든 지갑 보기",
    "footer.viewAllExchanges": "모든 거래소 보기",
    "footer.walletQuiz": "지갑 퀴즈",
    "footer.faq": "자주 묻는 질문",
    "footer.privacy": "개인정보 처리방침",
    "footer.terms": "이용약관",
    "footer.disclaimer": "투자 조언이 아닙니다. 직접 조사하세요.",
    "footer.rssFeed": "RSS 피드",
    
    // Wallet Section Header
    "wallets.sectionTitle": "최고의 XRP 지갑",
    "wallets.sectionSubtitle": "업계에서 가장 신뢰받는 지갑으로 XRP를 보호하세요. 모든 것을 테스트했습니다.",
    
    // Wallet Types
    "wallet.type.mobileApp": "모바일 앱",
    "wallet.type.hardware": "하드웨어",
    "wallet.type.browserExt": "브라우저 확장",
    "wallet.type.hardwareCard": "하드웨어 카드",
    "wallet.type.webWallet": "웹 지갑",
    
    // Wallet Fees
    "wallet.fees.free": "무료",
    "wallet.fees.standard": "표준",
    "wallet.fees.low": "낮음",
    "wallet.fees.none": "없음",
    
    // Wallet Features
    "wallet.feature.selfCustody": "자체 보관",
    "wallet.feature.dappBrowser": "dApp 브라우저",
    "wallet.feature.biometricAuth": "생체 인증",
    "wallet.feature.fiatOnramp": "법정화폐 입금",
    "wallet.feature.coldStorage": "콜드 스토리지",
    "wallet.feature.bluetooth": "블루투스",
    "wallet.feature.multiCurrency": "다중 통화",
    "wallet.feature.highSecurity": "높은 보안",
    "wallet.feature.web3Auth": "Web3 인증",
    "wallet.feature.multiNetwork": "다중 네트워크",
    "wallet.feature.developerFriendly": "개발자 친화적",
    "wallet.feature.lightweight": "경량",
    "wallet.feature.nfcSupport": "NFC 지원",
    "wallet.feature.waterproof": "방수",
    "wallet.feature.noBattery": "배터리 불필요",
    "wallet.feature.easySetup": "쉬운 설정",
    "wallet.feature.privacyFocused": "프라이버시 중심",
    "wallet.feature.noTracking": "추적 없음",
    "wallet.feature.multiChain": "다중 체인",
    "wallet.feature.users70m": "7천만+ 사용자",
    "wallet.feature.staking": "스테이킹",
    "wallet.feature.fiatGateway": "법정화폐 게이트웨이",
    "wallet.feature.multisig": "다중 서명",
    "wallet.feature.trading": "거래",
    "wallet.feature.theftCover": "도난 보상",
    "wallet.feature.airGapped": "에어갭",
    "wallet.feature.qrOnly": "QR만",
    "wallet.feature.militaryGrade": "군용 등급",
    "wallet.feature.antiTamper": "변조 방지",
    "wallet.feature.openSource": "오픈 소스",
    "wallet.feature.secureElement": "보안 요소",
    "wallet.feature.budgetFriendly": "저예산",
    "wallet.feature.trusted": "신뢰성",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "최고의 무료 XRPL 지갑",
    "wallet.badge.topChoice": "최고의 선택",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Tangem 카드 (백업)",
    "wallet.complementary.ledgerCold": "Ledger (콜드 스토리지)",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "$20 BTC 보너스",
    "exchange.bonus.xrp1000": "1000 XRP 에어드롭",
    "exchange.bonus.lowFee": "낮은 수수료 거래",
    "exchange.bonus.crypto10": "$10 무료 암호화폐",
    "exchange.bonus.volume": "거래량 할인",
    "exchange.bonus.signup25": "$25 가입 보너스",
    "exchange.bonus.welcome": "웰컴 보너스",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "XRP에 최적",
    "exchange.feature.fiatOnRamp": "법정화폐 입금",
    "exchange.feature.instantTrade": "즉시 거래",
    "exchange.feature.xrpBasePairs": "XRP 기반 페어",
    "exchange.feature.powerPiggy": "Power Piggy 스테이킹",
    "exchange.feature.lowFees": "낮은 수수료",
    "exchange.feature.highSecurity": "높은 보안",
    "exchange.feature.deepLiquidity": "깊은 유동성",
    "exchange.feature.proTools": "전문 도구",
    "exchange.feature.mostTrusted": "가장 신뢰받는",
    "exchange.feature.beginnerFriendly": "초보자 친화적",
    "exchange.feature.usBased": "미국 기반",
    "exchange.feature.since2011": "2011년부터",
    "exchange.feature.euRegulated": "EU 규제",
    "exchange.feature.highLiquidity": "높은 유동성",
    "exchange.feature.visaCard": "Visa 카드",
    "exchange.feature.earnInterest": "이자 수익",
    "exchange.feature.coins250": "250+ 코인",
    "exchange.feature.coins800": "800+ 코인",
    "exchange.feature.tradingBots": "거래 봇",
    
    // Blog Posts
    "blog.post1.title": "2026년 XRPL 최고의 DeFi dApp 5개",
    "blog.post1.excerpt": "올해 XRP Ledger에 수익과 유동성을 가져다주는 주요 분산 금융 프로토콜을 발견하세요.",
    "blog.post1.category": "생태계",
    "blog.post2.title": "AMM 스테이킹 보상 이해하기",
    "blog.post2.excerpt": "XRPL의 AMM 기능과 수동 소득을 얻는 방법에 대한 포괄적인 가이드.",
    "blog.post2.category": "가이드",
    "blog.post3.title": "자체 보관 보안 모범 사례",
    "blog.post3.excerpt": "하드웨어 및 소프트웨어 지갑 사용자를 위한 필수 보안 팁으로 디지털 자산을 보호하세요.",
    "blog.post3.category": "보안",
    "blog.post4.title": "XRPL의 NFT 마켓플레이스: 완전 가이드",
    "blog.post4.excerpt": "XRP Ledger의 성장하는 NFT 생태계를 탐색하고, 최고의 마켓플레이스와 첫 NFT를 발행하는 방법을 알아보세요.",
    "blog.post4.category": "NFT",
    "blog.post5.title": "XRPL 사이드체인 설명",
    "blog.post5.excerpt": "사이드체인이 XRP Ledger의 기능을 확장하고 스마트 계약과 같은 새로운 사용 사례를 가능하게 하는 방법을 알아보세요.",
    "blog.post5.category": "기술",
    "blog.post6.title": "XRPL에서 실물 자산 토큰화",
    "blog.post6.excerpt": "기관들이 토큰화를 통해 부동산, 주식, 상품을 XRP Ledger에 가져오는 방법.",
    "blog.post6.category": "기관",
    
    // Date/Time Labels
    "blog.minRead": "분 읽기"
  },
  
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.wallets": "Carteiras",
    "nav.exchanges": "Exchanges",
    "nav.dapps": "DApps",
    "nav.yield": "Rendimento",
    "nav.blog": "Blog",
    "nav.gettingStarted": "Começar",
    "nav.compare": "Comparar",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    
    // Hero Section
    "hero.badge": "Inteligência do Ecossistema XRPL",
    "hero.title1": "NAVEGUE O",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "Seu guia definitivo para as melhores carteiras, dApps e ferramentas DeFi no XRPL. Proteja seus ativos e maximize seus rendimentos com nossas avaliações especializadas.",
    "hero.cta.start": "Começar",
    "hero.cta.compare": "Comparar Carteiras",
    "hero.cta.quiz": "Encontre Sua Carteira Ideal",
    
    // Features
    "features.security.title": "Segurança em Primeiro",
    "features.security.desc": "Análises de segurança detalhadas de cada carteira e exchange que avaliamos, para decisões informadas sobre seus ativos.",
    "features.yield.title": "Oportunidades de Rendimento",
    "features.yield.desc": "Descubra os melhores lugares para fazer staking de XRP e participar de pools AMM para renda passiva.",
    "features.deep.title": "Guias Aprofundados",
    "features.deep.desc": "Guias e tutoriais completos sobre recursos XRPL, da configuração da primeira carteira a estratégias DeFi avançadas.",
    
    // Wallet Section
    "wallets.title": "Melhores Carteiras XRPL",
    "wallets.subtitle": "Avaliadas e comparadas por segurança, recursos e facilidade de uso",
    "wallets.viewAll": "Ver Todas",
    "wallets.topPick": "Melhor Escolha",
    "wallets.free": "Grátis",
    "wallets.viewReview": "Ver Avaliação Completa",
    
    // Newsletter
    "newsletter.title": "Fique Atualizado",
    "newsletter.subtitle": "Receba as últimas notícias XRPL, avaliações e ofertas exclusivas.",
    "newsletter.placeholder": "Seu email",
    "newsletter.button": "Inscrever",
    "newsletter.privacy": "Respeitamos sua privacidade. Cancele quando quiser.",
    
    // Footer
    "footer.tagline": "Sua fonte confiável para avaliações de carteiras XRP Ledger, comparações de exchanges e insights DeFi.",
    "footer.resources": "Recursos",
    "footer.company": "Empresa",
    "footer.legal": "Legal",
    "footer.rights": "Todos os direitos reservados.",
    
    // Common
    "common.learnMore": "Saiba Mais",
    "common.readMore": "Ler Mais",
    "common.viewAll": "Ver Tudo",
    "common.getStarted": "Começar",
    "common.compare": "Comparar",
    "common.review": "Avaliação",
    "common.affiliate": "Divulgação de Afiliados",
    
    // Deal of the Week
    "deal.title": "Oferta da Semana",
    "deal.off": "DESC.",
    "deal.expires": "Expira em",
    "deal.days": "dias",
    "deal.claimDeal": "Obter Oferta",
    "deal.tangem.title": "Carteira Tangem",
    "deal.tangem.description": "Obtenha a carteira hardware mais portátil com nosso desconto exclusivo. Perfeita para armazenar XRP com segurança.",
    
    // Wallet Cards
    "wallets.wallet": "Carteira",
    "wallets.fees": "Taxas",
    "wallets.visitSite": "Visitar Site",
    "wallets.readReview": "Ler Avaliação",
    "wallets.score": "Pontuação",
    "wallets.maximizeSecurity": "Maximize sua Segurança com:",
    "wallets.takeQuiz": "Não sabe qual escolher? Faça o Quiz",
    
    // Exchange Section
    "exchanges.badge": "Ofertas de Parceiros",
    "exchanges.title": "Melhores Exchanges para XRP",
    "exchanges.subtitle": "Obtenha os melhores bônus de cadastro e taxas mais baixas com nossas exchanges parceiras.",
    "exchanges.claimBonus": "Obter Bônus",
    "exchanges.readReview": "Ler Avaliação",
    "exchanges.partnerTitle": "Seja Parceiro do All Things XRPL",
    "exchanges.partnerDesc": "Você é desenvolvedor ou prestador de serviços? Conecte-se com nossa audiência.",
    "exchanges.becomePartner": "Ser Parceiro",
    
    // Features Section
    "features.security.link": "Saiba sobre segurança de carteiras",
    "features.yield.link": "Explore opções de staking",
    "features.deep.link": "Leia nossos artigos",
    
    // Blog Section
    "blog.title": "Últimos Insights",
    "blog.subtitle": "Fique à frente com nossa pesquisa sobre o ecossistema XRP Ledger.",
    "blog.viewAll": "Ver Todos os Artigos",
    "blog.readArticle": "Ler Artigo",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "Junte-se ao All Things XRPL",
    "newsletter.ctaSubtitle": "Receba as últimas avaliações de carteiras, alertas de segurança e oportunidades dApp direto no seu email.",
    
    // Footer Links
    "footer.viewAllWallets": "Ver Todas as Carteiras",
    "footer.viewAllExchanges": "Ver Todas as Exchanges",
    "footer.walletQuiz": "Quiz de Carteiras",
    "footer.faq": "Perguntas Frequentes",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",
    "footer.disclaimer": "Não é aconselhamento financeiro. Faça sua própria pesquisa.",
    "footer.rssFeed": "Feed RSS",
    
    // Wallet Section Header
    "wallets.sectionTitle": "Melhores Carteiras XRP",
    "wallets.sectionSubtitle": "Proteja seu XRP com as carteiras mais confiáveis da indústria. Testamos todas para você.",
    
    // Wallet Types
    "wallet.type.mobileApp": "App Móvel",
    "wallet.type.hardware": "Hardware",
    "wallet.type.browserExt": "Extensão",
    "wallet.type.hardwareCard": "Cartão Hardware",
    "wallet.type.webWallet": "Carteira Web",
    
    // Wallet Fees
    "wallet.fees.free": "Grátis",
    "wallet.fees.standard": "Padrão",
    "wallet.fees.low": "Baixo",
    "wallet.fees.none": "Nenhum",
    
    // Wallet Features
    "wallet.feature.selfCustody": "Auto-Custódia",
    "wallet.feature.dappBrowser": "Navegador dApp",
    "wallet.feature.biometricAuth": "Auth Biométrica",
    "wallet.feature.fiatOnramp": "Compra com Fiat",
    "wallet.feature.coldStorage": "Armazenamento Frio",
    "wallet.feature.bluetooth": "Bluetooth",
    "wallet.feature.multiCurrency": "Multi-Moeda",
    "wallet.feature.highSecurity": "Alta Segurança",
    "wallet.feature.web3Auth": "Auth Web3",
    "wallet.feature.multiNetwork": "Multi-Rede",
    "wallet.feature.developerFriendly": "Para Desenvolvedores",
    "wallet.feature.lightweight": "Leve",
    "wallet.feature.nfcSupport": "Suporte NFC",
    "wallet.feature.waterproof": "À Prova d'Água",
    "wallet.feature.noBattery": "Sem Bateria",
    "wallet.feature.easySetup": "Fácil Configuração",
    "wallet.feature.privacyFocused": "Foco em Privacidade",
    "wallet.feature.noTracking": "Sem Rastreamento",
    "wallet.feature.multiChain": "Multi-Chain",
    "wallet.feature.users70m": "70M+ Usuários",
    "wallet.feature.staking": "Staking",
    "wallet.feature.fiatGateway": "Gateway Fiat",
    "wallet.feature.multisig": "Multisig",
    "wallet.feature.trading": "Trading",
    "wallet.feature.theftCover": "Cobertura Antifurto",
    "wallet.feature.airGapped": "Air-Gapped",
    "wallet.feature.qrOnly": "Apenas QR",
    "wallet.feature.militaryGrade": "Grau Militar",
    "wallet.feature.antiTamper": "Anti-Adulteração",
    "wallet.feature.openSource": "Código Aberto",
    "wallet.feature.secureElement": "Elemento Seguro",
    "wallet.feature.budgetFriendly": "Econômico",
    "wallet.feature.trusted": "Confiável",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "Melhor Carteira XRPL Grátis",
    "wallet.badge.topChoice": "Melhor Escolha",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Tangem Card (Backup)",
    "wallet.complementary.ledgerCold": "Ledger (Armazenamento Frio)",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "$20 Bônus BTC",
    "exchange.bonus.xrp1000": "1000 XRP Airdrop",
    "exchange.bonus.lowFee": "Trading com Taxas Baixas",
    "exchange.bonus.crypto10": "$10 Cripto Grátis",
    "exchange.bonus.volume": "Descontos por Volume",
    "exchange.bonus.signup25": "$25 Bônus de Cadastro",
    "exchange.bonus.welcome": "Bônus de Boas-vindas",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "Melhor para XRP",
    "exchange.feature.fiatOnRamp": "Compra com Fiat",
    "exchange.feature.instantTrade": "Trading Instantâneo",
    "exchange.feature.xrpBasePairs": "Pares Base XRP",
    "exchange.feature.powerPiggy": "Staking Power Piggy",
    "exchange.feature.lowFees": "Taxas Baixas",
    "exchange.feature.highSecurity": "Alta Segurança",
    "exchange.feature.deepLiquidity": "Alta Liquidez",
    "exchange.feature.proTools": "Ferramentas Pro",
    "exchange.feature.mostTrusted": "Mais Confiável",
    "exchange.feature.beginnerFriendly": "Fácil para Iniciantes",
    "exchange.feature.usBased": "Sediada nos EUA",
    "exchange.feature.since2011": "Desde 2011",
    "exchange.feature.euRegulated": "Regulada na UE",
    "exchange.feature.highLiquidity": "Alta Liquidez",
    "exchange.feature.visaCard": "Cartão Visa",
    "exchange.feature.earnInterest": "Ganhe Juros",
    "exchange.feature.coins250": "250+ Moedas",
    "exchange.feature.coins800": "800+ Moedas",
    "exchange.feature.tradingBots": "Bots de Trading",
    
    // Blog Posts
    "blog.post1.title": "Top 5 dApps DeFi no XRPL em 2026",
    "blog.post1.excerpt": "Descubra os principais protocolos de finanças descentralizadas trazendo rendimento e liquidez ao XRP Ledger este ano.",
    "blog.post1.category": "Ecossistema",
    "blog.post2.title": "Entendendo Recompensas de Staking AMM",
    "blog.post2.excerpt": "Um guia completo sobre a funcionalidade do AMM no XRPL e como ganhar renda passiva.",
    "blog.post2.category": "Guias",
    "blog.post3.title": "Melhores Práticas de Segurança para Auto-Custódia",
    "blog.post3.excerpt": "Proteja seus ativos digitais com estas dicas essenciais de segurança para usuários de carteiras hardware e software.",
    "blog.post3.category": "Segurança",
    "blog.post4.title": "Marketplaces NFT no XRPL: Guia Completo",
    "blog.post4.excerpt": "Explore o crescente ecossistema NFT no XRP Ledger, incluindo os melhores marketplaces e como criar seu primeiro NFT.",
    "blog.post4.category": "NFTs",
    "blog.post5.title": "Sidechains XRPL Explicadas",
    "blog.post5.excerpt": "Aprenda como sidechains estendem as capacidades do XRP Ledger e permitem novos casos de uso como smart contracts.",
    "blog.post5.category": "Tecnologia",
    "blog.post6.title": "Tokenização de Ativos Reais no XRPL",
    "blog.post6.excerpt": "Como instituições estão trazendo imóveis, ações e commodities para o XRP Ledger através da tokenização.",
    "blog.post6.category": "Institucional",
    
    // Date/Time Labels
    "blog.minRead": "min de leitura"
  },
  
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.wallets": "Wallets",
    "nav.exchanges": "Börsen",
    "nav.dapps": "DApps",
    "nav.yield": "Rendite",
    "nav.blog": "Blog",
    "nav.gettingStarted": "Erste Schritte",
    "nav.compare": "Vergleichen",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    
    // Hero Section
    "hero.badge": "XRPL-Ökosystem-Intelligenz",
    "hero.title1": "NAVIGIEREN SIE DAS",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "Ihr definitiver Leitfaden zu den besten Wallets, dApps und DeFi-Tools im XRPL. Sichern Sie Ihre Assets und maximieren Sie Ihre Rendite mit unseren Expertenbewertungen.",
    "hero.cta.start": "Loslegen",
    "hero.cta.compare": "Wallets vergleichen",
    "hero.cta.quiz": "Finden Sie Ihre perfekte Wallet",
    
    // Features
    "features.security.title": "Sicherheit zuerst",
    "features.security.desc": "Detaillierte Sicherheitsanalysen jeder Wallet und Börse, die wir bewerten, für fundierte Entscheidungen.",
    "features.yield.title": "Renditemöglichkeiten",
    "features.yield.desc": "Entdecken Sie die besten Orte zum Staken Ihrer XRP und zur Teilnahme an AMM-Pools für passives Einkommen.",
    "features.deep.title": "Tiefgehende Anleitungen",
    "features.deep.desc": "Umfassende Anleitungen zu XRPL-Funktionen, von der Einrichtung Ihrer ersten Wallet bis zu fortgeschrittenen DeFi-Strategien.",
    
    // Wallet Section
    "wallets.title": "Top XRPL Wallets",
    "wallets.subtitle": "Fachmännisch bewertet und verglichen nach Sicherheit, Funktionen und Benutzerfreundlichkeit",
    "wallets.viewAll": "Alle anzeigen",
    "wallets.topPick": "Top-Wahl",
    "wallets.free": "Kostenlos",
    "wallets.viewReview": "Vollständige Bewertung",
    
    // Newsletter
    "newsletter.title": "Bleiben Sie informiert",
    "newsletter.subtitle": "Erhalten Sie die neuesten XRPL-Nachrichten, Bewertungen und exklusive Angebote.",
    "newsletter.placeholder": "Ihre E-Mail",
    "newsletter.button": "Abonnieren",
    "newsletter.privacy": "Wir respektieren Ihre Privatsphäre. Jederzeit abmelden.",
    
    // Footer
    "footer.tagline": "Ihre vertrauenswürdige Quelle für XRP Ledger Wallet-Bewertungen, Börsenvergleiche und DeFi-Einblicke.",
    "footer.resources": "Ressourcen",
    "footer.company": "Unternehmen",
    "footer.legal": "Rechtliches",
    "footer.rights": "Alle Rechte vorbehalten.",
    
    // Common
    "common.learnMore": "Mehr erfahren",
    "common.readMore": "Weiterlesen",
    "common.viewAll": "Alle anzeigen",
    "common.getStarted": "Loslegen",
    "common.compare": "Vergleichen",
    "common.review": "Bewertung",
    "common.affiliate": "Affiliate-Offenlegung",
    
    // Deal of the Week
    "deal.title": "Angebot der Woche",
    "deal.off": "RABATT",
    "deal.expires": "Läuft ab in",
    "deal.days": "Tagen",
    "deal.claimDeal": "Angebot sichern",
    "deal.tangem.title": "Tangem Hardware Wallet",
    "deal.tangem.description": "Holen Sie sich die tragbarste Hardware-Wallet mit unserem exklusiven Rabatt. Perfekt für sichere XRP-Speicherung.",
    
    // Wallet Cards
    "wallets.wallet": "Wallet",
    "wallets.fees": "Gebühren",
    "wallets.visitSite": "Website besuchen",
    "wallets.readReview": "Bewertung lesen",
    "wallets.score": "Bewertung",
    "wallets.maximizeSecurity": "Sicherheit maximieren mit:",
    "wallets.takeQuiz": "Unsicher welche Wallet? Quiz machen",
    
    // Exchange Section
    "exchanges.badge": "Partner-Angebote",
    "exchanges.title": "Top-Börsen für XRP",
    "exchanges.subtitle": "Erhalten Sie die besten Anmeldeboni und niedrigsten Gebühren bei unseren Partner-Börsen.",
    "exchanges.claimBonus": "Bonus sichern",
    "exchanges.readReview": "Bewertung lesen",
    "exchanges.partnerTitle": "Partner von All Things XRPL werden",
    "exchanges.partnerDesc": "Sind Sie Projektentwickler oder Dienstleister? Verbinden Sie sich mit unserem Publikum.",
    "exchanges.becomePartner": "Partner werden",
    
    // Features Section
    "features.security.link": "Über Wallet-Sicherheit lernen",
    "features.yield.link": "Staking-Optionen erkunden",
    "features.deep.link": "Unsere Artikel lesen",
    
    // Blog Section
    "blog.title": "Neueste Einblicke",
    "blog.subtitle": "Bleiben Sie mit unserer aktuellen XRP Ledger Ökosystem-Forschung voraus.",
    "blog.viewAll": "Alle Artikel anzeigen",
    "blog.readArticle": "Artikel lesen",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "All Things XRPL beitreten",
    "newsletter.ctaSubtitle": "Erhalten Sie die neuesten Wallet-Bewertungen, Sicherheitswarnungen und dApp-Möglichkeiten direkt in Ihr Postfach.",
    
    // Footer Links
    "footer.viewAllWallets": "Alle Wallets anzeigen",
    "footer.viewAllExchanges": "Alle Börsen anzeigen",
    "footer.walletQuiz": "Wallet Quiz",
    "footer.faq": "Häufige Fragen",
    "footer.privacy": "Datenschutzrichtlinie",
    "footer.terms": "Nutzungsbedingungen",
    "footer.disclaimer": "Keine Finanzberatung. Recherchieren Sie selbst.",
    "footer.rssFeed": "RSS-Feed",
    
    // Wallet Section Header
    "wallets.sectionTitle": "Top XRP Wallets",
    "wallets.sectionSubtitle": "Sichern Sie Ihr XRP mit den vertrauenswürdigsten Wallets der Branche. Wir haben alle getestet.",
    
    // Wallet Types
    "wallet.type.mobileApp": "Mobile App",
    "wallet.type.hardware": "Hardware",
    "wallet.type.browserExt": "Browser-Erw.",
    "wallet.type.hardwareCard": "Hardware-Karte",
    "wallet.type.webWallet": "Web Wallet",
    
    // Wallet Fees
    "wallet.fees.free": "Kostenlos",
    "wallet.fees.standard": "Standard",
    "wallet.fees.low": "Niedrig",
    "wallet.fees.none": "Keine",
    
    // Wallet Features
    "wallet.feature.selfCustody": "Selbstverwahrung",
    "wallet.feature.dappBrowser": "dApp Browser",
    "wallet.feature.biometricAuth": "Biometrisch",
    "wallet.feature.fiatOnramp": "Fiat-Einzahlung",
    "wallet.feature.coldStorage": "Cold Storage",
    "wallet.feature.bluetooth": "Bluetooth",
    "wallet.feature.multiCurrency": "Multi-Währung",
    "wallet.feature.highSecurity": "Hohe Sicherheit",
    "wallet.feature.web3Auth": "Web3 Auth",
    "wallet.feature.multiNetwork": "Multi-Netzwerk",
    "wallet.feature.developerFriendly": "Entwicklerfreundlich",
    "wallet.feature.lightweight": "Leichtgewichtig",
    "wallet.feature.nfcSupport": "NFC-Unterstützung",
    "wallet.feature.waterproof": "Wasserdicht",
    "wallet.feature.noBattery": "Ohne Batterie",
    "wallet.feature.easySetup": "Einfache Einrichtung",
    "wallet.feature.privacyFocused": "Datenschutz-fokussiert",
    "wallet.feature.noTracking": "Kein Tracking",
    "wallet.feature.multiChain": "Multi-Chain",
    "wallet.feature.users70m": "70M+ Nutzer",
    "wallet.feature.staking": "Staking",
    "wallet.feature.fiatGateway": "Fiat Gateway",
    "wallet.feature.multisig": "Multisig",
    "wallet.feature.trading": "Trading",
    "wallet.feature.theftCover": "Diebstahlschutz",
    "wallet.feature.airGapped": "Air-Gapped",
    "wallet.feature.qrOnly": "Nur QR",
    "wallet.feature.militaryGrade": "Militärqualität",
    "wallet.feature.antiTamper": "Manipulationsschutz",
    "wallet.feature.openSource": "Open Source",
    "wallet.feature.secureElement": "Sicheres Element",
    "wallet.feature.budgetFriendly": "Budgetfreundlich",
    "wallet.feature.trusted": "Vertrauenswürdig",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "Beste kostenlose XRPL Wallet",
    "wallet.badge.topChoice": "Beste Wahl",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Tangem Karte (Backup)",
    "wallet.complementary.ledgerCold": "Ledger (Cold Storage)",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "$20 BTC Bonus",
    "exchange.bonus.xrp1000": "1000 XRP Airdrop",
    "exchange.bonus.lowFee": "Niedrige Handelsgebühren",
    "exchange.bonus.crypto10": "$10 Gratis Krypto",
    "exchange.bonus.volume": "Volumenrabatte",
    "exchange.bonus.signup25": "$25 Anmeldebonus",
    "exchange.bonus.welcome": "Willkommensbonus",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "Beste für XRP",
    "exchange.feature.fiatOnRamp": "Fiat-Einzahlung",
    "exchange.feature.instantTrade": "Sofortiger Handel",
    "exchange.feature.xrpBasePairs": "XRP Basispaare",
    "exchange.feature.powerPiggy": "Power Piggy Staking",
    "exchange.feature.lowFees": "Niedrige Gebühren",
    "exchange.feature.highSecurity": "Hohe Sicherheit",
    "exchange.feature.deepLiquidity": "Tiefe Liquidität",
    "exchange.feature.proTools": "Profi-Tools",
    "exchange.feature.mostTrusted": "Am vertrauenswürdigsten",
    "exchange.feature.beginnerFriendly": "Anfängerfreundlich",
    "exchange.feature.usBased": "US-basiert",
    "exchange.feature.since2011": "Seit 2011",
    "exchange.feature.euRegulated": "EU reguliert",
    "exchange.feature.highLiquidity": "Hohe Liquidität",
    "exchange.feature.visaCard": "Visa Karte",
    "exchange.feature.earnInterest": "Zinsen verdienen",
    "exchange.feature.coins250": "250+ Coins",
    "exchange.feature.coins800": "800+ Coins",
    "exchange.feature.tradingBots": "Trading Bots",
    
    // Blog Posts
    "blog.post1.title": "Top 5 DeFi dApps auf XRPL 2026",
    "blog.post1.excerpt": "Entdecken Sie die führenden dezentralen Finanzprotokolle, die Rendite und Liquidität zum XRP Ledger bringen.",
    "blog.post1.category": "Ökosystem",
    "blog.post2.title": "AMM Staking Rewards verstehen",
    "blog.post2.excerpt": "Ein umfassender Leitfaden zur AMM-Funktionalität auf XRPL und wie man passives Einkommen verdient.",
    "blog.post2.category": "Anleitungen",
    "blog.post3.title": "Sicherheits-Best Practices für Selbstverwahrung",
    "blog.post3.excerpt": "Schützen Sie Ihre digitalen Assets mit diesen essentiellen Sicherheitstipps für Hardware- und Software-Wallet-Nutzer.",
    "blog.post3.category": "Sicherheit",
    "blog.post4.title": "NFT-Marktplätze auf XRPL: Kompletter Leitfaden",
    "blog.post4.excerpt": "Erkunden Sie das wachsende NFT-Ökosystem auf dem XRP Ledger, einschließlich Top-Marktplätze und wie Sie Ihr erstes NFT erstellen.",
    "blog.post4.category": "NFTs",
    "blog.post5.title": "XRPL Sidechains erklärt",
    "blog.post5.excerpt": "Erfahren Sie, wie Sidechains die Fähigkeiten des XRP Ledgers erweitern und neue Anwendungsfälle wie Smart Contracts ermöglichen.",
    "blog.post5.category": "Technologie",
    "blog.post6.title": "Tokenisierung realer Vermögenswerte auf XRPL",
    "blog.post6.excerpt": "Wie Institutionen Immobilien, Aktien und Rohstoffe durch Tokenisierung auf das XRP Ledger bringen.",
    "blog.post6.category": "Institutionell",
    
    // Date/Time Labels
    "blog.minRead": "Min. Lesezeit"
  },
  
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.wallets": "Portefeuilles",
    "nav.exchanges": "Échanges",
    "nav.dapps": "DApps",
    "nav.yield": "Rendement",
    "nav.blog": "Blog",
    "nav.gettingStarted": "Commencer",
    "nav.compare": "Comparer",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    
    // Hero Section
    "hero.badge": "Intelligence de l'écosystème XRPL",
    "hero.title1": "NAVIGUEZ LE",
    "hero.title2": "XRP LEDGER",
    "hero.subtitle": "Votre guide définitif des meilleurs portefeuilles, dApps et outils DeFi sur XRPL. Sécurisez vos actifs et maximisez vos rendements avec nos avis d'experts.",
    "hero.cta.start": "Commencer",
    "hero.cta.compare": "Comparer les portefeuilles",
    "hero.cta.quiz": "Trouvez votre portefeuille idéal",
    
    // Features
    "features.security.title": "Sécurité d'abord",
    "features.security.desc": "Analyses de sécurité détaillées de chaque portefeuille et échange que nous évaluons, pour des décisions éclairées.",
    "features.yield.title": "Opportunités de rendement",
    "features.yield.desc": "Découvrez les meilleurs endroits pour staker votre XRP et participer aux pools AMM pour un revenu passif.",
    "features.deep.title": "Guides approfondis",
    "features.deep.desc": "Guides et tutoriels complets sur les fonctionnalités XRPL, de la configuration de votre premier portefeuille aux stratégies DeFi avancées.",
    
    // Wallet Section
    "wallets.title": "Meilleurs portefeuilles XRPL",
    "wallets.subtitle": "Évalués et comparés par des experts en sécurité, fonctionnalités et facilité d'utilisation",
    "wallets.viewAll": "Voir tout",
    "wallets.topPick": "Meilleur choix",
    "wallets.free": "Gratuit",
    "wallets.viewReview": "Voir l'avis complet",
    
    // Newsletter
    "newsletter.title": "Restez informé",
    "newsletter.subtitle": "Recevez les dernières nouvelles XRPL, avis et offres exclusives.",
    "newsletter.placeholder": "Votre email",
    "newsletter.button": "S'abonner",
    "newsletter.privacy": "Nous respectons votre vie privée. Désabonnez-vous à tout moment.",
    
    // Footer
    "footer.tagline": "Votre source de confiance pour les avis sur les portefeuilles XRP Ledger, comparaisons d'échanges et insights DeFi.",
    "footer.resources": "Ressources",
    "footer.company": "Entreprise",
    "footer.legal": "Légal",
    "footer.rights": "Tous droits réservés.",
    
    // Common
    "common.learnMore": "En savoir plus",
    "common.readMore": "Lire la suite",
    "common.viewAll": "Voir tout",
    "common.getStarted": "Commencer",
    "common.compare": "Comparer",
    "common.review": "Avis",
    "common.affiliate": "Divulgation d'affiliation",
    
    // Deal of the Week
    "deal.title": "Offre de la Semaine",
    "deal.off": "RÉDUC.",
    "deal.expires": "Expire dans",
    "deal.days": "jours",
    "deal.claimDeal": "Obtenir l'offre",
    "deal.tangem.title": "Portefeuille Tangem",
    "deal.tangem.description": "Obtenez le portefeuille matériel le plus portable avec notre réduction exclusive. Parfait pour stocker vos XRP en toute sécurité.",
    
    // Wallet Cards
    "wallets.wallet": "Portefeuille",
    "wallets.fees": "Frais",
    "wallets.visitSite": "Visiter le site",
    "wallets.readReview": "Lire l'avis",
    "wallets.score": "Note",
    "wallets.maximizeSecurity": "Maximisez votre sécurité avec :",
    "wallets.takeQuiz": "Pas sûr du choix ? Faites le Quiz",
    
    // Exchange Section
    "exchanges.badge": "Offres Partenaires",
    "exchanges.title": "Meilleures Plateformes pour XRP",
    "exchanges.subtitle": "Obtenez les meilleurs bonus d'inscription et les frais les plus bas avec nos plateformes partenaires.",
    "exchanges.claimBonus": "Obtenir le bonus",
    "exchanges.readReview": "Lire l'avis",
    "exchanges.partnerTitle": "Devenez partenaire de All Things XRPL",
    "exchanges.partnerDesc": "Êtes-vous développeur de projet ou fournisseur de services ? Connectez-vous avec notre audience.",
    "exchanges.becomePartner": "Devenir partenaire",
    
    // Features Section
    "features.security.link": "En savoir plus sur la sécurité des portefeuilles",
    "features.yield.link": "Explorer les options de staking",
    "features.deep.link": "Lire nos articles",
    
    // Blog Section
    "blog.title": "Dernières Analyses",
    "blog.subtitle": "Restez en avance avec nos dernières recherches sur l'écosystème XRP Ledger.",
    "blog.viewAll": "Voir tous les articles",
    "blog.readArticle": "Lire l'article",
    
    // Newsletter CTA
    "newsletter.ctaTitle": "Rejoignez All Things XRPL",
    "newsletter.ctaSubtitle": "Recevez les derniers avis sur les portefeuilles, alertes de sécurité et opportunités dApp directement dans votre boîte mail.",
    
    // Footer Links
    "footer.viewAllWallets": "Voir tous les portefeuilles",
    "footer.viewAllExchanges": "Voir toutes les plateformes",
    "footer.walletQuiz": "Quiz Portefeuille",
    "footer.faq": "FAQ",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.disclaimer": "Ce n'est pas un conseil financier. Faites vos propres recherches.",
    "footer.rssFeed": "Flux RSS",
    
    // Wallet Section Header
    "wallets.sectionTitle": "Meilleurs Portefeuilles XRP",
    "wallets.sectionSubtitle": "Sécurisez votre XRP avec les portefeuilles les plus fiables de l'industrie. Nous les avons tous testés pour vous.",
    
    // Wallet Types
    "wallet.type.mobileApp": "App Mobile",
    "wallet.type.hardware": "Hardware",
    "wallet.type.browserExt": "Extension",
    "wallet.type.hardwareCard": "Carte Hardware",
    "wallet.type.webWallet": "Portefeuille Web",
    
    // Wallet Fees
    "wallet.fees.free": "Gratuit",
    "wallet.fees.standard": "Standard",
    "wallet.fees.low": "Bas",
    "wallet.fees.none": "Aucun",
    
    // Wallet Features
    "wallet.feature.selfCustody": "Auto-Garde",
    "wallet.feature.dappBrowser": "Navigateur dApp",
    "wallet.feature.biometricAuth": "Auth Biométrique",
    "wallet.feature.fiatOnramp": "Achat en Fiat",
    "wallet.feature.coldStorage": "Stockage Froid",
    "wallet.feature.bluetooth": "Bluetooth",
    "wallet.feature.multiCurrency": "Multi-Devise",
    "wallet.feature.highSecurity": "Haute Sécurité",
    "wallet.feature.web3Auth": "Auth Web3",
    "wallet.feature.multiNetwork": "Multi-Réseau",
    "wallet.feature.developerFriendly": "Pour Développeurs",
    "wallet.feature.lightweight": "Léger",
    "wallet.feature.nfcSupport": "Support NFC",
    "wallet.feature.waterproof": "Étanche",
    "wallet.feature.noBattery": "Sans Batterie",
    "wallet.feature.easySetup": "Configuration Facile",
    "wallet.feature.privacyFocused": "Axé sur la Vie Privée",
    "wallet.feature.noTracking": "Sans Traçage",
    "wallet.feature.multiChain": "Multi-Chain",
    "wallet.feature.users70m": "70M+ Utilisateurs",
    "wallet.feature.staking": "Staking",
    "wallet.feature.fiatGateway": "Passerelle Fiat",
    "wallet.feature.multisig": "Multisig",
    "wallet.feature.trading": "Trading",
    "wallet.feature.theftCover": "Protection Vol",
    "wallet.feature.airGapped": "Air-Gapped",
    "wallet.feature.qrOnly": "QR Uniquement",
    "wallet.feature.militaryGrade": "Qualité Militaire",
    "wallet.feature.antiTamper": "Anti-Falsification",
    "wallet.feature.openSource": "Open Source",
    "wallet.feature.secureElement": "Élément Sécurisé",
    "wallet.feature.budgetFriendly": "Économique",
    "wallet.feature.trusted": "Fiable",
    
    // Wallet Badges
    "wallet.badge.topFreeXRPL": "Meilleur Portefeuille XRPL Gratuit",
    "wallet.badge.topChoice": "Meilleur Choix",
    
    // Complementary Wallets
    "wallet.complementary.tangemBackup": "Carte Tangem (Sauvegarde)",
    "wallet.complementary.ledgerCold": "Ledger (Stockage Froid)",
    
    // Exchange Bonuses
    "exchange.bonus.btc20": "Bonus $20 BTC",
    "exchange.bonus.xrp1000": "Airdrop 1000 XRP",
    "exchange.bonus.lowFee": "Trading à Frais Réduits",
    "exchange.bonus.crypto10": "$10 Crypto Gratuit",
    "exchange.bonus.volume": "Remises Volume",
    "exchange.bonus.signup25": "Bonus Inscription $25",
    "exchange.bonus.welcome": "Bonus de Bienvenue",
    
    // Exchange Features
    "exchange.feature.bestForXRP": "Meilleur pour XRP",
    "exchange.feature.fiatOnRamp": "Achat en Fiat",
    "exchange.feature.instantTrade": "Trading Instantané",
    "exchange.feature.xrpBasePairs": "Paires Base XRP",
    "exchange.feature.powerPiggy": "Staking Power Piggy",
    "exchange.feature.lowFees": "Frais Bas",
    "exchange.feature.highSecurity": "Haute Sécurité",
    "exchange.feature.deepLiquidity": "Liquidité Profonde",
    "exchange.feature.proTools": "Outils Pro",
    "exchange.feature.mostTrusted": "Le Plus Fiable",
    "exchange.feature.beginnerFriendly": "Facile pour Débutants",
    "exchange.feature.usBased": "Basé aux USA",
    "exchange.feature.since2011": "Depuis 2011",
    "exchange.feature.euRegulated": "Régulé UE",
    "exchange.feature.highLiquidity": "Haute Liquidité",
    "exchange.feature.visaCard": "Carte Visa",
    "exchange.feature.earnInterest": "Gagnez des Intérêts",
    "exchange.feature.coins250": "250+ Coins",
    "exchange.feature.coins800": "800+ Coins",
    "exchange.feature.tradingBots": "Bots de Trading",
    
    // Blog Posts
    "blog.post1.title": "Top 5 dApps DeFi sur XRPL en 2026",
    "blog.post1.excerpt": "Découvrez les principaux protocoles de finance décentralisée apportant rendement et liquidité au XRP Ledger cette année.",
    "blog.post1.category": "Écosystème",
    "blog.post2.title": "Comprendre les Récompenses de Staking AMM",
    "blog.post2.excerpt": "Un guide complet sur la fonctionnalité AMM sur XRPL et comment gagner un revenu passif.",
    "blog.post2.category": "Guides",
    "blog.post3.title": "Meilleures Pratiques de Sécurité pour l'Auto-Garde",
    "blog.post3.excerpt": "Protégez vos actifs numériques avec ces conseils de sécurité essentiels pour les utilisateurs de portefeuilles hardware et logiciels.",
    "blog.post3.category": "Sécurité",
    "blog.post4.title": "Marketplaces NFT sur XRPL : Guide Complet",
    "blog.post4.excerpt": "Explorez l'écosystème NFT en croissance sur le XRP Ledger, incluant les meilleures marketplaces et comment créer votre premier NFT.",
    "blog.post4.category": "NFTs",
    "blog.post5.title": "Sidechains XRPL Expliquées",
    "blog.post5.excerpt": "Apprenez comment les sidechains étendent les capacités du XRP Ledger et permettent de nouveaux cas d'usage comme les smart contracts.",
    "blog.post5.category": "Technologie",
    "blog.post6.title": "Tokenisation d'Actifs Réels sur XRPL",
    "blog.post6.excerpt": "Comment les institutions apportent l'immobilier, les actions et les matières premières au XRP Ledger via la tokenisation.",
    "blog.post6.category": "Institutionnel",
    
    // Date/Time Labels
    "blog.minRead": "min de lecture"
  }
};
