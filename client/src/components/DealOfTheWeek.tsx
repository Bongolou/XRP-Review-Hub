import { ExternalLink, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackAffiliateClick } from "@/lib/tracking";
import tangemLogo from "@/assets/logos/tangem-logo.png";

interface Deal {
  title: string;
  description: string;
  discount: string;
  link: string;
  partner: string;
  expiresIn: string;
  logo: string;
}

const currentDeal: Deal = {
  title: "Tangem Hardware Wallet",
  description: "Get the most portable hardware wallet with our exclusive discount. Perfect for secure XRP storage on the go.",
  discount: "10% OFF",
  link: "https://tangem.com/?promocode=ALLTHINGSXRPL",
  partner: "tangem",
  expiresIn: "3 days",
  logo: tangemLogo
};

export function DealOfTheWeek() {
  const handleClick = () => {
    trackAffiliateClick(currentDeal.partner, "deal_of_week");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 p-6 md:p-8">
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          <span className="text-sm font-display font-bold text-yellow-400 uppercase tracking-wider">
            Deal of the Week
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-black/40 border-2 border-yellow-500/30 flex-shrink-0 shadow-[0_0_25px_-5px_rgba(234,179,8,0.4)]">
            <img src={currentDeal.logo} alt={currentDeal.partner} className="w-full h-full object-cover scale-150" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-2xl font-bold font-display">{currentDeal.title}</h3>
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold border border-yellow-500/30 animate-pulse">
                {currentDeal.discount}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{currentDeal.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Expires in {currentDeal.expiresIn}</span>
            </div>
          </div>

          <a
            href={currentDeal.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            data-testid="deal-cta"
            className="flex-shrink-0"
          >
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 h-12 shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)]">
              Claim Deal <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
