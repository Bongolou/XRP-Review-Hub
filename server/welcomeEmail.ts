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

interface WelcomeTemplate {
  subject: string;
  greeting: string;
  intro: string;
  ctaLabel: string;
  closing: string;
  signOff: string;
}

const SHORTLIST_PATH_BY_LANGUAGE: Record<SubscriberLanguage, string> = {
  en: "/downloads/xrpl-wallet-shortlist.pdf",
  es: "/downloads/xrpl-wallet-shortlist.es.pdf",
  zh: "/downloads/xrpl-wallet-shortlist.zh.pdf",
  ja: "/downloads/xrpl-wallet-shortlist.ja.pdf",
  ko: "/downloads/xrpl-wallet-shortlist.ko.pdf",
  pt: "/downloads/xrpl-wallet-shortlist.pt.pdf",
  de: "/downloads/xrpl-wallet-shortlist.de.pdf",
  fr: "/downloads/xrpl-wallet-shortlist.fr.pdf",
};

// One welcome-email template per supported language for the wallet_shortlist
// lead magnet. Kept inline (rather than loaded from disk) so the bundled
// server has no extra runtime file dependency and so each translation is
// reviewable in a single diff.
const WALLET_SHORTLIST_TEMPLATES: Record<SubscriberLanguage, WelcomeTemplate> = {
  en: {
    subject: "Your XRPL Wallet Shortlist is ready",
    greeting: "Welcome to All Things XRPL,",
    intro:
      "Thanks for grabbing the XRPL Wallet Shortlist. It's a one-page PDF with our top picks, what each wallet is best for, and the gotchas to avoid.",
    ctaLabel: "Download your shortlist",
    closing:
      "If the link ever expires, you can also download it any time from the success screen on our site.",
    signOff: "— The All Things XRPL editorial team",
  },
  es: {
    subject: "Tu lista corta de carteras XRPL ya está lista",
    greeting: "Bienvenido a All Things XRPL,",
    intro:
      "Gracias por descargar la lista corta de carteras XRPL. Es un PDF de una página con nuestras mejores opciones, para qué destaca cada cartera y los detalles a evitar.",
    ctaLabel: "Descarga tu lista corta",
    closing:
      "Si el enlace caduca, también puedes descargarla en cualquier momento desde la pantalla de confirmación en nuestro sitio.",
    signOff: "— El equipo editorial de All Things XRPL",
  },
  zh: {
    subject: "您的 XRPL 钱包精选清单已准备好",
    greeting: "欢迎来到 All Things XRPL,",
    intro:
      "感谢您下载 XRPL 钱包精选清单。这是一份一页的 PDF,包含我们推荐的钱包、每款钱包最适合的用途以及需要注意的坑。",
    ctaLabel: "下载您的精选清单",
    closing:
      "如果链接过期了,您也可以随时在我们网站的成功页面再次下载。",
    signOff: "— All Things XRPL 编辑团队",
  },
  ja: {
    subject: "XRPL ウォレット厳選リストの準備ができました",
    greeting: "All Things XRPL へようこそ。",
    intro:
      "XRPL ウォレット厳選リストをダウンロードいただきありがとうございます。おすすめのウォレット、それぞれの得意分野、注意すべき落とし穴をまとめた 1 ページの PDF です。",
    ctaLabel: "厳選リストをダウンロード",
    closing:
      "リンクの有効期限が切れた場合も、サイトの完了画面からいつでも再ダウンロードできます。",
    signOff: "— All Things XRPL 編集チーム",
  },
  ko: {
    subject: "XRPL 지갑 추천 리스트가 준비되었습니다",
    greeting: "All Things XRPL에 오신 것을 환영합니다.",
    intro:
      "XRPL 지갑 추천 리스트를 받아주셔서 감사합니다. 저희가 엄선한 지갑, 각 지갑의 장점, 그리고 피해야 할 함정을 한 페이지 PDF에 담았습니다.",
    ctaLabel: "추천 리스트 다운로드",
    closing:
      "링크가 만료되더라도 사이트의 완료 화면에서 언제든 다시 다운로드할 수 있습니다.",
    signOff: "— All Things XRPL 편집팀",
  },
  pt: {
    subject: "A sua shortlist de carteiras XRPL está pronta",
    greeting: "Bem-vindo ao All Things XRPL,",
    intro:
      "Obrigado por descarregar a shortlist de carteiras XRPL. É um PDF de uma página com as nossas escolhas, para que cada carteira é melhor e os detalhes a evitar.",
    ctaLabel: "Descarregar a sua shortlist",
    closing:
      "Se o link expirar, também pode descarregá-la a qualquer momento no ecrã de confirmação do nosso site.",
    signOff: "— A equipa editorial do All Things XRPL",
  },
  de: {
    subject: "Deine XRPL-Wallet-Shortlist ist bereit",
    greeting: "Willkommen bei All Things XRPL,",
    intro:
      "Danke, dass du dir die XRPL-Wallet-Shortlist geholt hast. Eine einseitige PDF mit unseren Top-Wallets, wofür jede am besten geeignet ist und welche Stolperfallen du vermeiden solltest.",
    ctaLabel: "Shortlist herunterladen",
    closing:
      "Falls der Link abläuft, kannst du die PDF jederzeit auch über den Erfolgs-Screen auf unserer Seite erneut laden.",
    signOff: "— Das All Things XRPL Redaktionsteam",
  },
  fr: {
    subject: "Votre shortlist de portefeuilles XRPL est prête",
    greeting: "Bienvenue sur All Things XRPL,",
    intro:
      "Merci d'avoir téléchargé la shortlist des portefeuilles XRPL. Un PDF d'une page avec nos meilleurs choix, à quoi chaque portefeuille convient le mieux et les pièges à éviter.",
    ctaLabel: "Télécharger votre shortlist",
    closing:
      "Si le lien expire, vous pouvez aussi la retélécharger à tout moment depuis l'écran de confirmation sur notre site.",
    signOff: "— L'équipe éditoriale d'All Things XRPL",
  },
};

function normalizeLanguage(lang?: string | null): SubscriberLanguage {
  if (lang && (SUPPORTED_SUBSCRIBER_LANGUAGES as readonly string[]).includes(lang)) {
    return lang as SubscriberLanguage;
  }
  return "en";
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
  if (opts.leadMagnet !== "wallet_shortlist") {
    // Templates only exist for the wallet_shortlist lead magnet today. Other
    // magnets should fall back to whatever delivery the rest of the funnel
    // is doing (currently: no email at all).
    return null;
  }
  const language = normalizeLanguage(opts.language);
  const tpl = WALLET_SHORTLIST_TEMPLATES[language];
  const downloadPath = SHORTLIST_PATH_BY_LANGUAGE[language];
  const downloadUrl = `${opts.baseUrl.replace(/\/+$/, "")}${downloadPath}`;

  const text = [
    tpl.greeting,
    "",
    tpl.intro,
    "",
    `${tpl.ctaLabel}: ${downloadUrl}`,
    "",
    tpl.closing,
    "",
    tpl.signOff,
  ].join("\n");

  const html = `<!doctype html>
<html lang="${language}">
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#0b1220; line-height:1.55; padding:24px;">
    <p style="margin:0 0 16px;">${escapeHtml(tpl.greeting)}</p>
    <p style="margin:0 0 16px;">${escapeHtml(tpl.intro)}</p>
    <p style="margin:0 0 24px;">
      <a href="${escapeHtml(downloadUrl)}" style="display:inline-block; background:#1e3a8a; color:#ffffff; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:600;">
        ${escapeHtml(tpl.ctaLabel)}
      </a>
    </p>
    <p style="margin:0 0 16px; color:#475569; font-size:14px;">${escapeHtml(tpl.closing)}</p>
    <p style="margin:0; color:#475569; font-size:14px;">${escapeHtml(tpl.signOff)}</p>
  </body>
</html>`;

  return {
    subject: tpl.subject,
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
