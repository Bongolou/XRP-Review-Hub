import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/tracking";
import upholdLogo from "@/assets/logos/uphold-logo.webp";
import ledgerLogo from "@/assets/logos/ledger-logo.webp";

interface BannerAdProps {
  variant?: "horizontal" | "sidebar" | "inline";
  partner?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  link?: string;
}

const defaultAds = {
  horizontal: {
    partner: "uphold",
    title: "Buy XRP with Uphold",
    description: "Get $20 bonus when you sign up and trade",
    ctaText: "Sign Up Free",
    link: "https://wallet.uphold.com/signup?referral=allthingsxrpl"
  },
  sidebar: {
    partner: "ledger",
    title: "Secure Your XRP",
    description: "Get a Ledger hardware wallet",
    ctaText: "Shop Now",
    link: "https://shop.ledger.com/?r=5d81f18905fe"
  },
  inline: {
    partner: "ledger",
    title: "Ledger Nano S Plus",
    description: "Hardware wallet for XRP",
    ctaText: "Shop Now",
    link: "https://shop.ledger.com/pages/ledger-nano-s-plus/?r=5d81f18905fe"
  }
};

export function BannerAd({ 
  variant = "horizontal",
  partner,
  title,
  description,
  ctaText,
  link
}: BannerAdProps) {
  const defaults = defaultAds[variant];
  const adPartner = partner || defaults.partner;
  const adTitle = title || defaults.title;
  const adDescription = description || defaults.description;
  const adCta = ctaText || defaults.ctaText;
  const adLink = link || defaults.link;

  const handleClick = () => {
    if (variant === "inline") {
      trackAffiliateClick(adPartner, "inline_300x250");
    } else {
      trackAffiliateClick(adPartner, `banner_${variant}`);
    }
  };

  if (variant === "inline") {
    return (
      <div className="my-8 flex flex-col items-center" data-testid={`banner-ad-${variant}`}>
        <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Sponsored</div>
        <a
          href={adLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="block rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-colors"
          style={{ width: "min(300px, 100%)", aspectRatio: "6 / 5" }}
          data-testid={`banner-ad-${variant}-link`}
        >
          <img
            src="https://affiliate.ledger.com/image/300/250/Default"
            alt={adTitle}
            width={300}
            height={250}
            loading="lazy"
            decoding="async"
            className="block"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </a>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <a
        href={adLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block p-4 rounded-xl border border-white/10 bg-card/30 hover:border-primary/50 transition-colors group"
        data-testid={`banner-ad-${variant}`}
      >
        <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Sponsored</div>
        <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{adTitle}</h4>
        <p className="text-sm text-muted-foreground mb-3">{adDescription}</p>
        <span className="text-primary text-sm font-medium flex items-center gap-1">
          {adCta} <ExternalLink className="h-3 w-3" />
        </span>
      </a>
    );
  }

  const logoMap: Record<string, string> = {
    uphold: upholdLogo,
    ledger: ledgerLogo
  };

  return (
    <a
      href={adLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block p-4 rounded-xl border border-white/10 bg-gradient-to-r from-card/50 to-primary/5 hover:border-primary/50 transition-colors group"
      data-testid={`banner-ad-${variant}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap">Sponsored</div>
          {logoMap[adPartner] && (
            <img src={logoMap[adPartner]} alt={adPartner} className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="font-bold group-hover:text-primary transition-colors">{adTitle}</div>
            <div className="text-muted-foreground text-sm">{adDescription}</div>
          </div>
        </div>
        <span className="text-primary font-medium flex items-center gap-1 shrink-0 whitespace-nowrap">
          {adCta} <ExternalLink className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}
