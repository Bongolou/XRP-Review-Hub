import { ExternalLink } from "lucide-react";
import { trackAffiliateClick } from "@/lib/tracking";
import upholdLogo from "@/assets/logos/uphold-logo.png";
import ledgerLogo from "@/assets/logos/ledger-logo.png";

interface BannerAdProps {
  variant?: "horizontal" | "sidebar";
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
    link: "https://uphold.com/signup?referral=allthingsxrpl"
  },
  sidebar: {
    partner: "ledger",
    title: "Secure Your XRP",
    description: "Get a Ledger hardware wallet",
    ctaText: "Shop Now",
    link: "https://shop.ledger.com/?r=allthingsxrpl"
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
    trackAffiliateClick(adPartner, `banner_${variant}`);
  };

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
