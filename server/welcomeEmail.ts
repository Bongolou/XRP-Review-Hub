import {
  SUPPORTED_SUBSCRIBER_LANGUAGES,
  type SubscriberLanguage,
} from "@shared/schema";

// Hard-coded production canonical so welcome emails never embed a
// host-header-derived URL (mitigates host-header poisoning, where an
// attacker could otherwise control the link inside an outbound email by
// spoofing the Host / X-Forwarded-Host header on /api/subscribe).
// Override with the `PUBLIC_BASE_URL` env var for staging/dev sends.
const DEFAULT_PUBLIC_BASE_URL = "https://allthingsxrpl.com";

type LeadMagnetKey =
  | "wallet_shortlist"
  | "wallet_starter_kit"
  | "xrpl_defi_starter_kit";

interface MagnetMeta {
  // Display name embedded into subject + intro lines per language.
  // Kept identical across languages because the asset itself ships
  // with English titles.
  assetTitle: string;
  // What the asset *is* — used to fill the second sentence of the intro.
  // One short phrase per language.
  description: Record<SubscriberLanguage, string>;
  // Localised path on disk for the downloadable file.
  pathByLanguage: Record<SubscriberLanguage, string>;
}

const MAGNET_META: Record<LeadMagnetKey, MagnetMeta> = {
  wallet_shortlist: {
    assetTitle: "XRPL Wallet Shortlist",
    description: {
      en: "It's a one-page PDF with our top picks, what each wallet is best for, and the gotchas to avoid.",
      es: "Es un PDF de una página con nuestras mejores opciones, para qué destaca cada cartera y los detalles a evitar.",
      zh: "这是一份一页的 PDF,包含我们推荐的钱包、每款钱包最适合的用途以及需要注意的坑。",
      ja: "おすすめのウォレット、それぞれの得意分野、注意すべき落とし穴をまとめた 1 ページの PDF です。",
      ko: "저희가 엄선한 지갑, 각 지갑의 장점, 그리고 피해야 할 함정을 한 페이지 PDF에 담았습니다.",
      pt: "É um PDF de uma página com as nossas escolhas, para que cada carteira é melhor e os detalhes a evitar.",
      de: "Eine einseitige PDF mit unseren Top-Wallets, wofür jede am besten geeignet ist und welche Stolperfallen du vermeiden solltest.",
      fr: "Un PDF d'une page avec nos meilleurs choix, à quoi chaque portefeuille convient le mieux et les pièges à éviter.",
    },
    pathByLanguage: {
      en: "/downloads/xrpl-wallet-shortlist.pdf",
      es: "/downloads/xrpl-wallet-shortlist.es.pdf",
      zh: "/downloads/xrpl-wallet-shortlist.zh.pdf",
      ja: "/downloads/xrpl-wallet-shortlist.ja.pdf",
      ko: "/downloads/xrpl-wallet-shortlist.ko.pdf",
      pt: "/downloads/xrpl-wallet-shortlist.pt.pdf",
      de: "/downloads/xrpl-wallet-shortlist.de.pdf",
      fr: "/downloads/xrpl-wallet-shortlist.fr.pdf",
    },
  },
  wallet_starter_kit: {
    assetTitle: "XRPL Wallet Starter Kit",
    description: {
      en: "It's a step-by-step PDF guide that walks you through choosing a wallet, securing your seed phrase, and making your first XRPL transaction with confidence.",
      es: "Es una guía PDF paso a paso para elegir una cartera, proteger tu frase semilla y realizar tu primera transacción en XRPL con confianza.",
      zh: "这是一份循序渐进的 PDF 指南,带您选择钱包、保护助记词,并自信地完成您的首次 XRPL 交易。",
      ja: "ウォレットの選び方、シードフレーズの守り方、初めての XRPL 取引まで順を追って解説する PDF ガイドです。",
      ko: "지갑 선택, 시드 문구 보안, 그리고 첫 XRPL 거래까지 단계별로 안내하는 PDF 가이드입니다.",
      pt: "É um guia PDF passo a passo para escolher uma carteira, proteger a sua seed phrase e fazer a sua primeira transação XRPL com confiança.",
      de: "Eine Schritt-für-Schritt-PDF, die dich durch die Wallet-Auswahl, das Sichern deiner Seed-Phrase und deine erste XRPL-Transaktion führt.",
      fr: "Un guide PDF étape par étape pour choisir un portefeuille, sécuriser votre phrase de récupération et effectuer votre première transaction XRPL en toute confiance.",
    },
    pathByLanguage: {
      en: "/downloads/xrpl-wallet-starter-kit.pdf",
      es: "/downloads/xrpl-wallet-starter-kit.es.pdf",
      zh: "/downloads/xrpl-wallet-starter-kit.zh.pdf",
      ja: "/downloads/xrpl-wallet-starter-kit.ja.pdf",
      ko: "/downloads/xrpl-wallet-starter-kit.ko.pdf",
      pt: "/downloads/xrpl-wallet-starter-kit.pt.pdf",
      de: "/downloads/xrpl-wallet-starter-kit.de.pdf",
      fr: "/downloads/xrpl-wallet-starter-kit.fr.pdf",
    },
  },
  xrpl_defi_starter_kit: {
    assetTitle: "XRPL DeFi Starter Kit",
    description: {
      en: "It's a beginner-friendly PDF that explains how XRPL DeFi works, which dApps to try first, and the safety checks to do before connecting your wallet.",
      es: "Es un PDF para principiantes que explica cómo funciona DeFi en XRPL, qué dApps probar primero y los chequeos de seguridad antes de conectar tu cartera.",
      zh: "这是一份适合新手的 PDF,讲解 XRPL DeFi 的运作方式、值得先试的 dApp,以及连接钱包前的安全检查。",
      ja: "XRPL DeFi の仕組み、最初に試したい dApp、ウォレット接続前の安全チェックを初心者向けにまとめた PDF です。",
      ko: "XRPL DeFi의 작동 원리, 가장 먼저 시도해 볼 dApp, 그리고 지갑 연결 전 안전 점검을 초보자도 알기 쉽게 정리한 PDF입니다.",
      pt: "É um PDF para iniciantes que explica como funciona o DeFi no XRPL, que dApps experimentar primeiro e as verificações de segurança antes de ligar a tua carteira.",
      de: "Eine einsteigerfreundliche PDF, die erklärt, wie XRPL-DeFi funktioniert, welche dApps du zuerst ausprobieren solltest und welche Sicherheitschecks vor dem Verbinden deiner Wallet wichtig sind.",
      fr: "Un PDF accessible aux débutants qui explique le fonctionnement du DeFi XRPL, les dApps à essayer en premier et les vérifications de sécurité à faire avant de connecter votre portefeuille.",
    },
    pathByLanguage: {
      en: "/downloads/xrpl-defi-starter-kit.pdf",
      es: "/downloads/xrpl-defi-starter-kit.es.pdf",
      zh: "/downloads/xrpl-defi-starter-kit.zh.pdf",
      ja: "/downloads/xrpl-defi-starter-kit.ja.pdf",
      ko: "/downloads/xrpl-defi-starter-kit.ko.pdf",
      pt: "/downloads/xrpl-defi-starter-kit.pt.pdf",
      de: "/downloads/xrpl-defi-starter-kit.de.pdf",
      fr: "/downloads/xrpl-defi-starter-kit.fr.pdf",
    },
  },
};

interface CopyTemplate {
  // {asset} is replaced with MagnetMeta.assetTitle.
  subject: string;
  greeting: string;
  // {asset} replaced with assetTitle, {description} with localized
  // description sentence.
  intro: string;
  ctaLabel: string;
  closing: string;
  signOff: string;
}

const COPY_BY_LANGUAGE: Record<SubscriberLanguage, CopyTemplate> = {
  en: {
    subject: "Your {asset} is ready",
    greeting: "Welcome to All Things XRPL,",
    intro: "Thanks for grabbing the {asset}. {description}",
    ctaLabel: "Download your kit",
    closing:
      "If the link ever expires, you can also download it any time from the success screen on our site.",
    signOff: "— The All Things XRPL editorial team",
  },
  es: {
    subject: "Tu {asset} ya está listo",
    greeting: "Bienvenido a All Things XRPL,",
    intro: "Gracias por descargar el {asset}. {description}",
    ctaLabel: "Descarga tu kit",
    closing:
      "Si el enlace caduca, también puedes descargarlo en cualquier momento desde la pantalla de confirmación en nuestro sitio.",
    signOff: "— El equipo editorial de All Things XRPL",
  },
  zh: {
    subject: "您的 {asset} 已准备好",
    greeting: "欢迎来到 All Things XRPL,",
    intro: "感谢您下载 {asset}。{description}",
    ctaLabel: "下载您的资料包",
    closing: "如果链接过期了,您也可以随时在我们网站的成功页面再次下载。",
    signOff: "— All Things XRPL 编辑团队",
  },
  ja: {
    subject: "{asset} の準備ができました",
    greeting: "All Things XRPL へようこそ。",
    intro: "{asset} をダウンロードいただきありがとうございます。{description}",
    ctaLabel: "資料をダウンロード",
    closing:
      "リンクの有効期限が切れた場合も、サイトの完了画面からいつでも再ダウンロードできます。",
    signOff: "— All Things XRPL 編集チーム",
  },
  ko: {
    subject: "{asset}가 준비되었습니다",
    greeting: "All Things XRPL에 오신 것을 환영합니다.",
    intro: "{asset}를 받아주셔서 감사합니다. {description}",
    ctaLabel: "자료 다운로드",
    closing:
      "링크가 만료되더라도 사이트의 완료 화면에서 언제든 다시 다운로드할 수 있습니다.",
    signOff: "— All Things XRPL 편집팀",
  },
  pt: {
    subject: "O seu {asset} está pronto",
    greeting: "Bem-vindo ao All Things XRPL,",
    intro: "Obrigado por descarregar o {asset}. {description}",
    ctaLabel: "Descarregar o seu kit",
    closing:
      "Se o link expirar, também pode descarregá-lo a qualquer momento no ecrã de confirmação do nosso site.",
    signOff: "— A equipa editorial do All Things XRPL",
  },
  de: {
    subject: "Dein {asset} ist bereit",
    greeting: "Willkommen bei All Things XRPL,",
    intro: "Danke, dass du dir das {asset} geholt hast. {description}",
    ctaLabel: "Kit herunterladen",
    closing:
      "Falls der Link abläuft, kannst du die PDF jederzeit auch über den Erfolgs-Screen auf unserer Seite erneut laden.",
    signOff: "— Das All Things XRPL Redaktionsteam",
  },
  fr: {
    subject: "Votre {asset} est prêt",
    greeting: "Bienvenue sur All Things XRPL,",
    intro: "Merci d'avoir téléchargé le {asset}. {description}",
    ctaLabel: "Télécharger votre kit",
    closing:
      "Si le lien expire, vous pouvez aussi le retélécharger à tout moment depuis l'écran de confirmation sur notre site.",
    signOff: "— L'équipe éditoriale d'All Things XRPL",
  },
};

function normalizeLanguage(lang?: string | null): SubscriberLanguage {
  if (lang && (SUPPORTED_SUBSCRIBER_LANGUAGES as readonly string[]).includes(lang)) {
    return lang as SubscriberLanguage;
  }
  return "en";
}

function isSupportedMagnet(magnet: string): magnet is LeadMagnetKey {
  return magnet in MAGNET_META;
}

function buildBaseUrl(): string {
  const override = process.env.PUBLIC_BASE_URL?.trim();
  if (override) {
    return override.replace(/\/+$/, "");
  }
  // Deliberately ignore the request's Host / X-Forwarded-Host headers — those
  // are attacker-controlled and would let a poisoned header inject a phishing
  // URL into every outbound welcome email.
  return DEFAULT_PUBLIC_BASE_URL;
}

interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
  downloadUrl: string;
  language: SubscriberLanguage;
}

export function renderWelcomeEmail(opts: {
  leadMagnet: string;
  language?: string | null;
  baseUrl: string;
}): RenderedEmail | null {
  if (!isSupportedMagnet(opts.leadMagnet)) {
    // Unknown magnet (e.g. plain "newsletter" signups) — no welcome email.
    return null;
  }
  const language = normalizeLanguage(opts.language);
  const meta = MAGNET_META[opts.leadMagnet];
  const copy = COPY_BY_LANGUAGE[language];
  const description = meta.description[language];
  const downloadPath = meta.pathByLanguage[language];
  const downloadUrl = `${opts.baseUrl.replace(/\/+$/, "")}${downloadPath}`;

  const subject = copy.subject.replace("{asset}", meta.assetTitle);
  const intro = copy.intro
    .replace("{asset}", meta.assetTitle)
    .replace("{description}", description);

  const text = [
    copy.greeting,
    "",
    intro,
    "",
    `${copy.ctaLabel}: ${downloadUrl}`,
    "",
    copy.closing,
    "",
    copy.signOff,
  ].join("\n");

  const html = `<!doctype html>
<html lang="${language}">
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#0b1220; line-height:1.55; padding:24px;">
    <p style="margin:0 0 16px;">${escapeHtml(copy.greeting)}</p>
    <p style="margin:0 0 16px;">${escapeHtml(intro)}</p>
    <p style="margin:0 0 24px;">
      <a href="${escapeHtml(downloadUrl)}" style="display:inline-block; background:#1e3a8a; color:#ffffff; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:600;">
        ${escapeHtml(copy.ctaLabel)}
      </a>
    </p>
    <p style="margin:0 0 16px; color:#475569; font-size:14px;">${escapeHtml(copy.closing)}</p>
    <p style="margin:0; color:#475569; font-size:14px;">${escapeHtml(copy.signOff)}</p>
  </body>
</html>`;

  return {
    subject,
    text,
    html,
    downloadUrl,
    language,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendViaResend(opts: {
  to: string;
  from: string;
  apiKey: string;
  email: RenderedEmail;
}): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify({
        from: opts.from,
        to: opts.to,
        subject: opts.email.subject,
        html: opts.email.html,
        text: opts.email.text,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        `[WelcomeEmail] Resend responded ${res.status}: ${detail.slice(0, 200)}`,
      );
    }
  } finally {
    clearTimeout(timer);
  }
}

export function sendWelcomeEmail(opts: {
  to: string;
  leadMagnet: string;
  language?: string | null;
}): void {
  const baseUrl = buildBaseUrl();
  const email = renderWelcomeEmail({
    leadMagnet: opts.leadMagnet,
    language: opts.language,
    baseUrl,
  });
  if (!email) return;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.WELCOME_EMAIL_FROM?.trim();

  // No transport configured: log the localized subject + download link so
  // operators can verify the language is being honoured even before the
  // sending integration is wired up. Body is intentionally not logged to
  // keep PII out of the logs.
  if (!apiKey || !from) {
    console.log(
      `[WelcomeEmail] (no transport) lang=${email.language} to=${opts.to} subject="${email.subject}" download=${email.downloadUrl}`,
    );
    return;
  }

  setImmediate(() => {
    sendViaResend({ to: opts.to, from, apiKey, email }).catch((err) => {
      console.error("[WelcomeEmail] Failed to send:", err);
    });
  });
}
