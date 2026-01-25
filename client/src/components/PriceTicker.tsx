import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceData {
  price: number;
  change24h: number;
}

export function PriceTicker() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();
        if (data.ripple) {
          setPriceData({
            price: data.ripple.usd,
            change24h: data.ripple.usd_24h_change || 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch XRP price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">XRP:</span>
        <span className="animate-pulse bg-white/10 rounded w-16 h-4" />
      </div>
    );
  }

  if (!priceData) {
    return null;
  }

  const isPositive = priceData.change24h >= 0;

  return (
    <div className="flex items-center gap-2 text-sm" data-testid="price-ticker">
      <span className="font-bold">XRP:</span>
      <span className="font-mono">${priceData.price.toFixed(4)}</span>
      <span className={`flex items-center gap-0.5 ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {Math.abs(priceData.change24h).toFixed(2)}%
      </span>
    </div>
  );
}
