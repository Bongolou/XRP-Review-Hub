import type { InsertProductReview } from "@shared/schema";

// Single source of truth for the auto-flag layer that runs on every visitor
// review submission. Each heuristic returns either:
//   - "reject": the request is refused with `reason` shown to the user
//   - "hide":   the review is still saved, but with hiddenAt set so it
//               defaults to invisible and only shows up in the admin
//               "Hidden" tab for an editor to look at later
//   - "ok":     nothing matched, the review goes through normally
//
// To extend the layer, either add to one of the word lists below or push a
// new function into `HEURISTICS`. Order matters — the first non-"ok" verdict
// wins, with "reject" outranking "hide".

export type SpamVerdict =
  | { verdict: "ok" }
  | { verdict: "reject"; reason: string }
  | { verdict: "hide"; reason: string };

// Hard reject: blatantly off-topic / unsafe content. Matched as whole words
// (case-insensitive) so substrings inside legitimate words don't trigger.
export const HARD_BANNED_WORDS: string[] = [
  "viagra",
  "cialis",
  "porn",
  "pornhub",
  "xxx",
  "casino",
  "escort",
  "escorts",
  "nude",
  "nudes",
  "betting",
  "loan offer",
  "sex chat",
];

// Soft flag: words that very often show up in crypto-review spam ("DM me on
// telegram for a 100x signal"). They sometimes appear in legitimate reviews
// too, so we hide rather than reject and let an editor decide.
export const SOFT_FLAG_WORDS: string[] = [
  "telegram",
  "whatsapp",
  "wechat",
  "skype",
  "signal group",
  "pump",
  "pump and dump",
  "airdrop",
  "giveaway",
  "double your",
  "guaranteed profit",
  "guaranteed return",
  "guaranteed returns",
  "send me your",
  "dm me",
  "contact me at",
  "100x",
  "1000x",
  "moonshot",
  "elon musk",
  "free crypto",
  "claim your",
  "private key",
  "seed phrase",
];

function buildWordRegex(words: string[]): RegExp {
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(`(?<![\\w])(?:${escaped.join("|")})(?![\\w])`, "i");
}

const HARD_BANNED_RE = buildWordRegex(HARD_BANNED_WORDS);
const SOFT_FLAG_RE = buildWordRegex(SOFT_FLAG_WORDS);

const URL_OR_HTML_RE = /(https?:\/\/|www\.[a-z]|<\s*a\b|<\s*script\b)/i;
const REPEATED_CHAR_RE = /(.)\1{5,}/; // 6+ identical chars in a row
const CONTACT_IN_NAME_RE = /(https?:\/\/|www\.|@|\.com\b|\.io\b|\.xyz\b|t\.me\b)/i;
const NON_LATIN_LETTER_RE =
  /[\u0400-\u04FF\u0500-\u052F\u0370-\u03FF\u0590-\u05FF\u0600-\u06FF\u0900-\u097F\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/g;
const LATIN_LETTER_RE = /[A-Za-z]/g;

type Heuristic = (data: InsertProductReview) => SpamVerdict;

const containsLink: Heuristic = (data) => {
  if (URL_OR_HTML_RE.test(data.body)) {
    return {
      verdict: "reject",
      reason: "Links and HTML aren't allowed in reviews.",
    };
  }
  return { verdict: "ok" };
};

const containsHardBannedWord: Heuristic = (data) => {
  if (HARD_BANNED_RE.test(data.body) || HARD_BANNED_RE.test(data.authorName)) {
    return {
      verdict: "reject",
      reason: "Your review couldn't be posted. Please rewrite it and try again.",
    };
  }
  return { verdict: "ok" };
};

const containsSoftFlagWord: Heuristic = (data) => {
  if (SOFT_FLAG_RE.test(data.body) || SOFT_FLAG_RE.test(data.authorName)) {
    return { verdict: "hide", reason: "matched soft-flag keyword" };
  }
  return { verdict: "ok" };
};

const repeatedCharacters: Heuristic = (data) => {
  if (REPEATED_CHAR_RE.test(data.body) || REPEATED_CHAR_RE.test(data.authorName)) {
    return { verdict: "hide", reason: "repeated character run" };
  }
  return { verdict: "ok" };
};

const singleWordBody: Heuristic = (data) => {
  const trimmed = data.body.trim();
  if (trimmed.length >= 50 && !/\s/.test(trimmed)) {
    return { verdict: "hide", reason: "single long token (no whitespace)" };
  }
  return { verdict: "ok" };
};

const excessiveCaps: Heuristic = (data) => {
  const letters = data.body.match(/[A-Za-z]/g) ?? [];
  if (letters.length < 30) return { verdict: "ok" };
  const upper = letters.filter((c) => c >= "A" && c <= "Z").length;
  if (upper / letters.length >= 0.7) {
    return { verdict: "hide", reason: "shouting (mostly uppercase)" };
  }
  return { verdict: "ok" };
};

const contactInfoInName: Heuristic = (data) => {
  if (CONTACT_IN_NAME_RE.test(data.authorName)) {
    return { verdict: "hide", reason: "contact info in author name" };
  }
  return { verdict: "ok" };
};

// Naive language guess. The site is English; if the review body is mostly
// non-Latin script (Cyrillic, CJK, Hebrew, Arabic, Devanagari, Hangul), it's
// almost certainly off-topic spam — we hide rather than reject so that
// genuine bilingual feedback can still be reviewed by an editor.
const nonLatinHeavy: Heuristic = (data) => {
  const nonLatin = data.body.match(NON_LATIN_LETTER_RE)?.length ?? 0;
  const latin = data.body.match(LATIN_LETTER_RE)?.length ?? 0;
  const total = nonLatin + latin;
  if (total >= 20 && nonLatin / total >= 0.5) {
    return { verdict: "hide", reason: "mostly non-Latin script" };
  }
  return { verdict: "ok" };
};

const HEURISTICS: Heuristic[] = [
  containsLink,
  containsHardBannedWord,
  containsSoftFlagWord,
  repeatedCharacters,
  singleWordBody,
  excessiveCaps,
  contactInfoInName,
  nonLatinHeavy,
];

export function evaluateReviewSpam(data: InsertProductReview): SpamVerdict {
  let pendingHide: SpamVerdict | null = null;
  for (const h of HEURISTICS) {
    const result = h(data);
    if (result.verdict === "reject") return result;
    if (result.verdict === "hide" && !pendingHide) pendingHide = result;
  }
  return pendingHide ?? { verdict: "ok" };
}

// Optional Akismet check. Free for non-commercial use; opt-in via env vars.
// We keep this separate from the synchronous heuristics so a slow / failed
// Akismet call never delays a submission past a hard timeout — and so the
// site keeps working when no key is configured.
export interface AkismetContext {
  ip: string;
  userAgent: string;
  referrer: string;
  permalink: string;
}

export async function checkAkismet(
  data: InsertProductReview,
  ctx: AkismetContext,
): Promise<SpamVerdict> {
  const apiKey = process.env.AKISMET_API_KEY?.trim();
  const blog = process.env.AKISMET_BLOG_URL?.trim();
  if (!apiKey || !blog) return { verdict: "ok" };

  const params = new URLSearchParams({
    blog,
    user_ip: ctx.ip,
    user_agent: ctx.userAgent,
    referrer: ctx.referrer,
    permalink: ctx.permalink,
    comment_type: "review",
    comment_author: data.authorName,
    comment_content: data.body,
    blog_lang: "en",
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `https://${apiKey}.rest.akismet.com/1.1/comment-check`,
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: params.toString(),
        signal: controller.signal,
      },
    );
    const body = (await res.text()).trim();
    if (body === "true") {
      // "discard" header means Akismet is highly confident — we hard-reject.
      if (res.headers.get("x-akismet-pro-tip") === "discard") {
        return {
          verdict: "reject",
          reason: "Your review couldn't be posted. Please rewrite it and try again.",
        };
      }
      return { verdict: "hide", reason: "Akismet flagged as spam" };
    }
    return { verdict: "ok" };
  } catch (err) {
    console.error("[Reviews] Akismet check failed:", err);
    return { verdict: "ok" };
  } finally {
    clearTimeout(timer);
  }
}
