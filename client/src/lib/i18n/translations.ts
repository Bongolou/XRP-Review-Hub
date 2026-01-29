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
    "footer.rssFeed": "RSS Feed"
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
    "footer.rssFeed": "Canal RSS"
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
    "footer.rssFeed": "RSS订阅"
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
    "footer.rssFeed": "RSSフィード"
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
    "footer.rssFeed": "RSS 피드"
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
    "footer.rssFeed": "Feed RSS"
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
    "footer.rssFeed": "RSS-Feed"
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
    "footer.rssFeed": "Flux RSS"
  }
};
