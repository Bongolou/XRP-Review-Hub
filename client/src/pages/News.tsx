import { Layout } from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ExternalLink, Clock, Newspaper, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  imageUrl?: string;
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getSourceColor(source: string): string {
  const s = source.toLowerCase();
  if (s.includes("cointelegraph")) return "border-yellow-500/50 text-yellow-400 bg-yellow-500/10";
  if (s.includes("coindesk")) return "border-blue-500/50 text-blue-400 bg-blue-500/10";
  if (s.includes("decrypt")) return "border-green-500/50 text-green-400 bg-green-500/10";
  if (s.includes("cryptoslate")) return "border-purple-500/50 text-purple-400 bg-purple-500/10";
  if (s.includes("u.today")) return "border-orange-500/50 text-orange-400 bg-orange-500/10";
  if (s.includes("daily hodl")) return "border-cyan-500/50 text-cyan-400 bg-cyan-500/10";
  if (s.includes("bitcoinist")) return "border-amber-500/50 text-amber-400 bg-amber-500/10";
  return "border-primary/50 text-primary bg-primary/10";
}

export default function News() {
  const { t } = useLanguage();

  const { data, isLoading, error, refetch, isFetching } = useQuery<{ items: NewsItem[] }>({
    queryKey: ["/api/news"],
    queryFn: async () => {
      const res = await fetch("/api/news?limit=30");
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const news = data?.items || [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary bg-primary/10">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            {t("news.live")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4" data-testid="text-news-title">
            {t("news.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {t("news.subtitle")}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="border-white/10 bg-white/5 hover:bg-white/10"
            data-testid="button-refresh-news"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            {t("news.refresh")}
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-card/30 rounded-xl border border-white/10 p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-20 mb-4"></div>
                <div className="h-5 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-5 bg-white/10 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">{t("news.error")}</p>
            <Button onClick={() => refetch()} variant="outline">
              {t("news.tryAgain")}
            </Button>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">{t("news.noArticles")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, idx) => (
              <motion.a
                key={`${item.link}-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className="group block"
                data-testid={`card-news-${idx}`}
              >
                <div className="h-full bg-card/30 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col">
                  {item.imageUrl && (
                    <div className="aspect-video overflow-hidden bg-white/5">
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className={`text-xs ${getSourceColor(item.source)}`}>
                        {item.source}
                      </Badge>
                      {item.pubDate && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(item.pubDate)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-primary font-medium mt-auto">
                      {t("news.readMore")} <ExternalLink className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
