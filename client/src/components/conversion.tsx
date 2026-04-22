import { ReactNode, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/translations";

export const LEAD_MAGNET_ASSET_URL = "/downloads/xrpl-wallet-starter-kit.md";
export const DEFI_LEAD_MAGNET_ASSET_URL = "/downloads/xrpl-defi-starter-kit.pdf";

const DEFI_LEAD_MAGNET_LOCALIZED: Record<Language, string> = {
  en: "/downloads/xrpl-defi-starter-kit.pdf",
  es: "/downloads/xrpl-defi-starter-kit.es.md",
  zh: "/downloads/xrpl-defi-starter-kit.zh.md",
  ja: "/downloads/xrpl-defi-starter-kit.ja.md",
  ko: "/downloads/xrpl-defi-starter-kit.ko.md",
  pt: "/downloads/xrpl-defi-starter-kit.pt.md",
  de: "/downloads/xrpl-defi-starter-kit.de.md",
  fr: "/downloads/xrpl-defi-starter-kit.fr.md",
};

export function getDefiLeadMagnetAssetUrl(language: Language): string {
  return DEFI_LEAD_MAGNET_LOCALIZED[language] ?? DEFI_LEAD_MAGNET_ASSET_URL;
}
import {
  ArrowRight,
  ExternalLink,
  Check,
  X,
  Trophy,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Lock,
  Zap,
  Sparkles,
  Target,
  Wallet,
  TrendingUp,
} from "lucide-react";

export type WalletId =
  | "xaman"
  | "ledger"
  | "tangem"
  | "trezor"
  | "ellipal"
  | "crossmark"
  | "bifrost"
  | "gatehub"
  | "trustwallet";

export type FastCompareRow = {
  id: WalletId | string;
  name: string;
  type: string;
  price: string;
  bestFor: string;
  rating: string;
  reviewSlug?: string;
  affiliateUrl: string;
  highlight?: boolean;
};

export function TrustStrip() {
  const { t } = useLanguage();
  const items = [
    { icon: Shield, label: t("trustStrip.editorial"), key: "editorial" },
    { icon: Star, label: t("trustStrip.tested"), key: "tested" },
    { icon: Clock, label: t("trustStrip.updated"), key: "updated" },
    { icon: Users, label: t("trustStrip.trusted"), key: "trusted" },
  ];
  return (
    <div className="border-y border-white/10 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.key}
                className="flex items-center gap-3 text-sm text-muted-foreground"
                data-testid={`trust-${it.key}`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-white/90">{it.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type UseCase = {
  id: string;
  title: string;
  description: string;
  icon: typeof Wallet;
  href: string;
  cta: string;
  accent: string;
};

const defaultUseCases: UseCase[] = [
  {
    id: "beginner",
    title: "I'm new to XRP",
    description: "Start with a free, simple wallet built for the XRPL.",
    icon: Sparkles,
    href: "/best-for/beginners",
    cta: "Best wallets for beginners",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: "hardware",
    title: "I want maximum security",
    description: "Hardware wallets keep your XRP offline and safe.",
    icon: Shield,
    href: "/best-for/hardware",
    cta: "Best hardware wallets",
    accent: "from-emerald-500 to-green-500",
  },
  {
    id: "cold",
    title: "I'm storing for the long term",
    description: "Cold-storage setups for serious XRP holders.",
    icon: Lock,
    href: "/best-for/cold-storage",
    cta: "Best cold-storage setup",
    accent: "from-purple-500 to-indigo-500",
  },
  {
    id: "defi",
    title: "I want to use XRPL DeFi",
    description: "Wallets and dApps for AMMs, NFTs and the DEX.",
    icon: Zap,
    href: "/best-for/defi",
    cta: "Best wallets for DeFi",
    accent: "from-orange-500 to-pink-500",
  },
  {
    id: "safest",
    title: "I just want the safest pick",
    description: "The single wallet we recommend most often.",
    icon: Target,
    href: "/best-for/safest",
    cta: "See our top pick",
    accent: "from-primary to-blue-400",
  },
];

export function UseCaseSelector({
  title,
  subtitle,
  cases = defaultUseCases,
}: {
  title?: string;
  subtitle?: string;
  cases?: UseCase[];
}) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? t("useCase.title");
  const resolvedSubtitle = subtitle ?? t("useCase.subtitle");
  return (
    <section className="container mx-auto px-4 py-20 md:py-24" data-testid="section-use-case-selector">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{resolvedTitle}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{resolvedSubtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.id}
              href={c.href}
              className="group block"
              data-testid={`usecase-${c.id}`}
            >
              <div className="h-full p-8 md:p-10 rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex flex-col hover:-translate-y-0.5">
                <div
                  className={`bg-gradient-to-br ${c.accent} w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors leading-tight">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{c.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  {c.cta} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function FastCompareTable({
  title,
  subtitle,
  rows,
  ctaLabel,
}: {
  title?: string;
  subtitle?: string;
  rows: FastCompareRow[];
  ctaLabel?: string;
}) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? t("fastCompare.title");
  const resolvedSubtitle = subtitle ?? t("fastCompare.subtitle");
  const resolvedCta = ctaLabel ?? t("fastCompare.get");
  return (
    <section className="container mx-auto px-4 py-20 md:py-24" data-testid="section-fast-compare">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{resolvedTitle}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{resolvedSubtitle}</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-card/30 backdrop-blur-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-white/10">
              <th className="pl-12 pr-6 py-6 font-semibold">{t("fastCompare.colWallet") || "Wallet"}</th>
              <th className="px-6 py-6 font-semibold">{t("fastCompare.colType") || "Type"}</th>
              <th className="px-6 py-6 font-semibold">{t("fastCompare.colPrice") || "Price"}</th>
              <th className="px-6 py-6 font-semibold">{t("fastCompare.colBestFor") || "Best for"}</th>
              <th className="px-6 py-6 font-semibold">{t("fastCompare.colRating") || "Score"}</th>
              <th className="pl-6 pr-12 py-6 font-semibold text-right">{t("fastCompare.colAction") || "Action"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${
                  r.highlight ? "bg-primary/5" : ""
                }`}
                data-testid={`compare-row-${r.id}`}
              >
                <td className="pl-12 pr-6 py-6">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-white">{r.name}</span>
                    {r.highlight && (
                      <Badge className="bg-secondary/20 text-secondary border-secondary/50">
                        {t("verdict.ourPick") || "Top pick"}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6 text-muted-foreground">{r.type}</td>
                <td className="px-6 py-6 text-muted-foreground">{r.price}</td>
                <td className="px-6 py-6 text-muted-foreground">{r.bestFor}</td>
                <td className="px-6 py-6 font-display font-bold text-primary">{r.rating}</td>
                <td className="pl-6 pr-12 py-6">
                  <div className="flex items-center justify-end gap-3">
                    {r.reviewSlug && (
                      <Link href={`/wallet/${r.reviewSlug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-sm hover:text-primary h-10 px-4"
                        >
                          {t("fastCompare.review") || "Review"}
                        </Button>
                      </Link>
                    )}
                    <a href={r.affiliateUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white text-sm h-10 px-5"
                      >
                        {resolvedCta} <ExternalLink className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {rows.map((r) => (
          <div
            key={r.id}
            className={`p-5 rounded-xl border bg-card/40 backdrop-blur-md ${
              r.highlight ? "border-primary/40" : "border-white/10"
            }`}
            data-testid={`compare-card-${r.id}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-display font-bold">{r.name}</div>
                <div className="text-xs text-muted-foreground">
                  {r.type} • {r.price}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold text-primary">{r.rating}</div>
                <div className="text-[10px] uppercase text-muted-foreground tracking-widest">
                  {t("fastCompare.score") || "Score"}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">{t("fastCompare.bestForLabel") || "Best for"}: {r.bestFor}</p>
            <div className="flex gap-3">
              {r.reviewSlug && (
                <Link href={`/wallet/${r.reviewSlug}`} className="flex-1">
                  <Button variant="outline" className="w-full border-white/10 text-xs h-9">
                    {t("fastCompare.review") || "Review"}
                  </Button>
                </Link>
              )}
              <a
                href={r.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-primary text-white text-xs h-9">
                  {resolvedCta} <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VerdictBox({
  pickName,
  pickReason,
  affiliateUrl,
  reviewSlug,
  reviewKind = "wallet",
  reviewHref,
  runnerUp,
  pros,
  cons,
}: {
  pickName: string;
  pickReason: string;
  affiliateUrl: string;
  reviewSlug?: string;
  reviewKind?: "wallet" | "exchange";
  reviewHref?: string;
  runnerUp?: { name: string; reason: string; href: string };
  pros?: string[];
  cons?: string[];
}) {
  const computedReviewHref = reviewHref ?? (reviewSlug ? `/${reviewKind}/${reviewSlug}` : undefined);
  const { t: tT } = useLanguage();
  const tVerdict = (k: string) => tT(`verdict.${k}`);
  return (
    <div
      className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-7 md:p-10"
      data-testid="verdict-box"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-display">
            {tVerdict("ourPick")}
          </div>
          <h3 className="text-2xl font-bold font-display">{pickName}</h3>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-8">{pickReason}</p>

      {(pros || cons) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {pros && (
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 md:p-6">
              <div className="text-xs uppercase tracking-widest text-green-400 font-display mb-4">
                {tVerdict("whyItWins")}
              </div>
              <ul className="space-y-3">
                {pros.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cons && (
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 md:p-6">
              <div className="text-xs uppercase tracking-widest text-orange-400 font-display mb-4">
                {tVerdict("watchOutFor")}
              </div>
              <ul className="space-y-3">
                {cons.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <X className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold"
            data-testid="button-verdict-cta"
          >
            {tVerdict("get")} {pickName} <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
        {computedReviewHref && (
          <Link href={computedReviewHref}>
            <Button variant="outline" size="lg" className="border-white/20">
              {tVerdict("readReview")}
            </Button>
          </Link>
        )}
      </div>

      {runnerUp && (
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-display mb-3">
            {tVerdict("alsoGreat")}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-bold text-white">{runnerUp.name}</span> — {runnerUp.reason}
          </p>
          <Link
            href={runnerUp.href}
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            {tVerdict("see")} {runnerUp.name} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

export function BestForCallout({
  label,
  href,
  description,
}: {
  label: string;
  href: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
      data-testid={`callout-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display font-bold text-white group-hover:text-primary transition-colors">
            {label}
          </div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}

export function CTABlock({
  title,
  description,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryUrl: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-primary/15 to-secondary/15 p-8 md:p-10 text-center">
      <h3 className="text-xl md:text-2xl font-bold font-display mb-3">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">{description}</p>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        <a href={primaryUrl} target="_blank" rel="noopener noreferrer">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
            {primaryLabel} <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
        {secondaryLabel && secondaryHref && (
          <Link href={secondaryHref}>
            <Button variant="outline" className="border-white/20">
              {secondaryLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export function FAQAccordion({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4" data-testid="faq-accordion">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        const panelId = `faq-panel-${idx}`;
        const buttonId = `faq-button-${idx}`;
        return (
          <div
            key={idx}
            className="rounded-xl border border-white/10 bg-card/30 overflow-hidden"
          >
            <button
              id={buttonId}
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              data-testid={`faq-question-${idx}`}
            >
              <span className="font-display font-bold pr-4">{item.q}</span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-6 pb-6 pt-1 text-muted-foreground leading-relaxed text-sm"
                data-testid={`faq-answer-${idx}`}
              >
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function LastUpdated({ date }: { date: string }) {
  const { t } = useLanguage();
  return (
    <div
      className="inline-flex items-center gap-2 text-xs text-muted-foreground"
      data-testid="last-updated"
    >
      <Clock className="h-3 w-3" />
      <span>
        {t("lastUpdated.prefix") || "Last updated"}{" "}
        <span className="text-white/80 font-medium">{date}</span>{" "}
        {t("lastUpdated.suffix") || "by the All Things XRPL editorial team"}
      </span>
    </div>
  );
}

export function EmailCaptureBlock({
  source = "site",
  title,
  description,
  bullets,
  cta,
  leadMagnet,
  assetUrl = LEAD_MAGNET_ASSET_URL,
}: {
  source?: string;
  title?: string;
  description?: string;
  bullets?: string[];
  cta?: string;
  leadMagnet?: string;
  assetUrl?: string;
}) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? t("emailCapture.title");
  const resolvedCta = cta ?? t("emailCapture.cta");
  const resolvedBullets = bullets ?? [
    t("emailCapture.bullet1"),
    t("emailCapture.bullet2"),
    t("emailCapture.bullet3"),
  ];
  const resolvedLeadMagnet = leadMagnet ?? "wallet_starter_kit";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source, leadMagnet: resolvedLeadMagnet }),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setEmail("");
    } catch {
      setStatus("err");
    }
  };

  return (
    <div
      className="rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/15 via-card/40 to-transparent p-10 md:p-12"
      data-testid={`email-capture-${source}`}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-secondary font-display mb-3">
            <Sparkles className="h-3 w-3" /> {t("emailCapture.badge") || "Free download"}
          </div>
          <h3 className="text-2xl font-bold font-display mb-4">{resolvedTitle}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{description}</p>
          )}
          <ul className="space-y-3">
            {resolvedBullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        {status === "ok" ? (
          <div
            className="rounded-xl bg-green-500/10 border border-green-500/30 p-5 text-center"
            data-testid={`email-capture-success-${source}`}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-display font-bold text-lg mb-1">
              {t("emailCapture.successTitle") || "You're in!"}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {t("emailCapture.successBody") ||
                "We've sent the kit to your inbox. You can also download it now."}
            </p>
            <a href={assetUrl} download data-testid={`button-lead-download-${source}`}>
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold">
                {t("emailCapture.download") || "Download your kit"}
              </Button>
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <label htmlFor={`lead-email-${source}`} className="sr-only">
              {t("emailCapture.emailLabel") || "Email address"}
            </label>
            <input
              id={`lead-email-${source}`}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailCapture.emailPlaceholder") || "you@example.com"}
              aria-label={t("emailCapture.emailLabel") || "Email address"}
              data-testid={`input-lead-email-${source}`}
              className="w-full h-12 px-4 rounded-lg bg-background/60 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              data-testid={`button-lead-submit-${source}`}
              className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold"
            >
              {status === "loading"
                ? t("emailCapture.sending") || "Sending..."
                : resolvedCta}
            </Button>
            <div role="status" aria-live="polite" className="min-h-[1rem]">
              {status === "err" && (
                <p className="text-xs text-red-400">
                  {t("emailCapture.error") || "Something went wrong. Try again."}
                </p>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {t("emailCapture.privacy") ||
                "No spam. Unsubscribe anytime. We never sell your email."}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export function ReviewSummaryCard({
  name,
  rating,
  bestFor,
  pros,
  affiliateUrl,
  reviewSlug,
  type,
}: {
  name: string;
  rating: string;
  bestFor: string;
  pros: string[];
  affiliateUrl: string;
  reviewSlug: string;
  type: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-md p-6 hover:border-primary/40 transition-all flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-xl">{name}</h3>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-bold text-primary">{rating}</div>
          <div className="text-[10px] uppercase text-muted-foreground tracking-widest">{t("fastCompare.score") || "Score"}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        <span className="text-white font-medium">{t("fastCompare.bestForLabel") || "Best for"}: </span>
        {bestFor}
      </p>
      <ul className="space-y-2 mb-5 flex-1">
        {pros.map((p, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
            {p}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2">
        <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
            {t("verdict.get") || "Get"} {name} <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
        <Link href={`/wallet/${reviewSlug}`}>
          <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-primary">
            {t("walletReview.readReview") || "Read review"} <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
