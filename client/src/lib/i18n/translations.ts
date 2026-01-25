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
    "hero.badge": "Your Trusted XRPL Resource",
    "hero.title1": "Your Gateway to",
    "hero.title2": "XRP Ledger",
    "hero.subtitle": "Discover the best wallets, exchanges, and DeFi opportunities in the XRP Ledger ecosystem. Unbiased reviews and expert insights to help you navigate the world of XRP.",
    "hero.cta.start": "Get Started",
    "hero.cta.compare": "Compare Wallets",
    
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
    "common.affiliate": "Affiliate Disclosure"
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
    "hero.badge": "Tu Recurso XRPL de Confianza",
    "hero.title1": "Tu Puerta de Entrada a",
    "hero.title2": "XRP Ledger",
    "hero.subtitle": "Descubre las mejores billeteras, exchanges y oportunidades DeFi en el ecosistema XRP Ledger. Reseñas imparciales y opiniones expertas para ayudarte a navegar el mundo de XRP.",
    "hero.cta.start": "Comenzar",
    "hero.cta.compare": "Comparar Billeteras",
    
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
    "common.affiliate": "Divulgación de Afiliados"
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
    "hero.badge": "您信赖的XRPL资源",
    "hero.title1": "您通往",
    "hero.title2": "XRP Ledger的门户",
    "hero.subtitle": "发现XRP Ledger生态系统中最好的钱包、交易所和DeFi机会。公正的评论和专家见解，帮助您在XRP世界中导航。",
    "hero.cta.start": "开始使用",
    "hero.cta.compare": "比较钱包",
    
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
    "common.affiliate": "联盟披露"
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
    "hero.badge": "信頼のXRPLリソース",
    "hero.title1": "あなたの",
    "hero.title2": "XRP Ledgerへのゲートウェイ",
    "hero.subtitle": "XRP Ledgerエコシステムで最高のウォレット、取引所、DeFi機会を発見。公平なレビューと専門家の洞察で、XRPの世界をナビゲート。",
    "hero.cta.start": "始める",
    "hero.cta.compare": "ウォレットを比較",
    
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
    "common.affiliate": "アフィリエイト開示"
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
    "hero.badge": "신뢰할 수 있는 XRPL 리소스",
    "hero.title1": "당신의",
    "hero.title2": "XRP Ledger 게이트웨이",
    "hero.subtitle": "XRP Ledger 생태계에서 최고의 지갑, 거래소, DeFi 기회를 발견하세요. 공정한 리뷰와 전문가 인사이트로 XRP 세계를 탐색하세요.",
    "hero.cta.start": "시작하기",
    "hero.cta.compare": "지갑 비교",
    
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
    "common.affiliate": "제휴 공개"
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
    "hero.badge": "Seu Recurso XRPL Confiável",
    "hero.title1": "Sua Porta de Entrada para",
    "hero.title2": "XRP Ledger",
    "hero.subtitle": "Descubra as melhores carteiras, exchanges e oportunidades DeFi no ecossistema XRP Ledger. Avaliações imparciais e insights especializados para navegar no mundo do XRP.",
    "hero.cta.start": "Começar",
    "hero.cta.compare": "Comparar Carteiras",
    
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
    "common.affiliate": "Divulgação de Afiliados"
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
    "hero.badge": "Ihre vertrauenswürdige XRPL-Ressource",
    "hero.title1": "Ihr Tor zum",
    "hero.title2": "XRP Ledger",
    "hero.subtitle": "Entdecken Sie die besten Wallets, Börsen und DeFi-Möglichkeiten im XRP Ledger-Ökosystem. Unvoreingenommene Bewertungen und Experteneinblicke.",
    "hero.cta.start": "Loslegen",
    "hero.cta.compare": "Wallets vergleichen",
    
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
    "common.affiliate": "Affiliate-Offenlegung"
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
    "hero.badge": "Votre ressource XRPL de confiance",
    "hero.title1": "Votre portail vers",
    "hero.title2": "XRP Ledger",
    "hero.subtitle": "Découvrez les meilleurs portefeuilles, échanges et opportunités DeFi dans l'écosystème XRP Ledger. Avis impartiaux et conseils d'experts.",
    "hero.cta.start": "Commencer",
    "hero.cta.compare": "Comparer les portefeuilles",
    
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
    "common.affiliate": "Divulgation d'affiliation"
  }
};
