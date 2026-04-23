import { Layout } from "@/components/Layout";
import { Link } from "@/lib/i18n/LocalizedLink";
import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { buildPageOgImage } from "@/lib/ogImage";
import { getStaticPageSeo } from "@/lib/i18n/pageSeo";
import { blogPosts } from "@shared/blog";

const categoryKeys = [
  { key: "all", labelKey: "blog.category.all" },
  { key: "ecosystem", labelKey: "blog.category.ecosystem" },
  { key: "guides", labelKey: "blog.category.guides" },
  { key: "security", labelKey: "blog.category.security" },
  { key: "nfts", labelKey: "blog.category.nfts" },
  { key: "technology", labelKey: "blog.category.technology" },
  { key: "institutional", labelKey: "blog.category.institutional" },
  { key: "defi", labelKey: "blog.category.defi" },
  { key: "analysis", labelKey: "blog.category.analysis" },
  { key: "use-cases", labelKey: "blog.category.useCases" },
  { key: "hardware", labelKey: "blog.category.hardware" }
];

export default function Blog() {
  const { t, language } = useLanguage();
  const seo = getStaticPageSeo(language, "blog");
  useDocumentMeta({ title: seo.title, description: seo.description, canonicalPath: "/blog", image: buildPageOgImage(seo.title) });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.categoryKey === selectedCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t("blog.pageTitle")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("blog.pageSubtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryKeys.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              data-testid={`filter-${cat.key}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === cat.key
                  ? "bg-primary text-white"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-white"
              )}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="group"
              data-testid={`blog-card-${post.id}`}
            >
              <div className="h-full bg-card/30 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={t(post.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {t(post.categoryLabelKey)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t(post.readTimeKey)}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {t(post.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {t(post.excerptKey)}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-muted-foreground">{post.author}</span>
                    </div>
                    <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("blog.readMore")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("blog.noArticles")}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
