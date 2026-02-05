import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const categoryKeys = [
  { key: "all", labelKey: "blog.category.all" },
  { key: "ecosystem", labelKey: "blog.category.ecosystem" },
  { key: "guides", labelKey: "blog.category.guides" },
  { key: "security", labelKey: "blog.category.security" },
  { key: "nfts", labelKey: "blog.category.nfts" },
  { key: "technology", labelKey: "blog.category.technology" },
  { key: "institutional", labelKey: "blog.category.institutional" },
  { key: "defi", labelKey: "blog.category.defi" }
];

const blogPosts = [
  {
    id: 1,
    titleKey: "blog.post1.title",
    excerptKey: "blog.post1.excerpt",
    categoryKey: "ecosystem",
    categoryLabelKey: "blog.post1.category",
    date: "Jan 24, 2026",
    readTimeKey: "blog.readTime.5min",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    titleKey: "blog.post2.title",
    excerptKey: "blog.post2.excerpt",
    categoryKey: "guides",
    categoryLabelKey: "blog.post2.category",
    date: "Jan 20, 2026",
    readTimeKey: "blog.readTime.8min",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    titleKey: "blog.post3.title",
    excerptKey: "blog.post3.excerpt",
    categoryKey: "security",
    categoryLabelKey: "blog.post3.category",
    date: "Jan 15, 2026",
    readTimeKey: "blog.readTime.4min",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    titleKey: "blog.post4.title",
    excerptKey: "blog.post4.excerpt",
    categoryKey: "nfts",
    categoryLabelKey: "blog.post4.category",
    date: "Jan 12, 2026",
    readTimeKey: "blog.readTime.6min",
    image: "https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=400&auto=format&fit=crop"
  },
  {
    id: 5,
    titleKey: "blog.post5.title",
    excerptKey: "blog.post5.excerpt",
    categoryKey: "technology",
    categoryLabelKey: "blog.post5.category",
    date: "Jan 8, 2026",
    readTimeKey: "blog.readTime.7min",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&auto=format&fit=crop"
  },
  {
    id: 6,
    titleKey: "blog.post6.title",
    excerptKey: "blog.post6.excerpt",
    categoryKey: "institutional",
    categoryLabelKey: "blog.post6.category",
    date: "Jan 5, 2026",
    readTimeKey: "blog.readTime.9min",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop"
  },
  {
    id: 7,
    titleKey: "blog.post7.title",
    excerptKey: "blog.post7.excerpt",
    categoryKey: "technology",
    categoryLabelKey: "blog.post7.category",
    date: "Jan 2, 2026",
    readTimeKey: "blog.readTime.10min",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&auto=format&fit=crop"
  },
  {
    id: 8,
    titleKey: "blog.post8.title",
    excerptKey: "blog.post8.excerpt",
    categoryKey: "security",
    categoryLabelKey: "blog.post8.category",
    date: "Dec 28, 2025",
    readTimeKey: "blog.readTime.5min",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop"
  },
  {
    id: 9,
    titleKey: "blog.post9.title",
    excerptKey: "blog.post9.excerpt",
    categoryKey: "institutional",
    categoryLabelKey: "blog.post9.category",
    date: "Dec 22, 2025",
    readTimeKey: "blog.readTime.7min",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&auto=format&fit=crop"
  },
  {
    id: 10,
    titleKey: "blog.post10.title",
    excerptKey: "blog.post10.excerpt",
    categoryKey: "guides",
    categoryLabelKey: "blog.post10.category",
    date: "Dec 18, 2025",
    readTimeKey: "blog.readTime.6min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop"
  },
  {
    id: 11,
    titleKey: "blog.post11.title",
    excerptKey: "blog.post11.excerpt",
    categoryKey: "security",
    categoryLabelKey: "blog.post11.category",
    date: "Dec 15, 2025",
    readTimeKey: "blog.readTime.5min",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop"
  },
  {
    id: 12,
    titleKey: "blog.post12.title",
    excerptKey: "blog.post12.excerpt",
    categoryKey: "technology",
    categoryLabelKey: "blog.post12.category",
    date: "Dec 10, 2025",
    readTimeKey: "blog.readTime.8min",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&auto=format&fit=crop"
  },
  {
    id: 13,
    titleKey: "blog.post13.title",
    excerptKey: "blog.post13.excerpt",
    categoryKey: "ecosystem",
    categoryLabelKey: "blog.post13.category",
    date: "Dec 5, 2025",
    readTimeKey: "blog.readTime.6min",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&auto=format&fit=crop"
  },
  {
    id: 14,
    titleKey: "blog.post14.title",
    excerptKey: "blog.post14.excerpt",
    categoryKey: "nfts",
    categoryLabelKey: "blog.post14.category",
    date: "Dec 1, 2025",
    readTimeKey: "blog.readTime.7min",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop"
  },
  {
    id: 15,
    titleKey: "blog.post15.title",
    excerptKey: "blog.post15.excerpt",
    categoryKey: "guides",
    categoryLabelKey: "blog.post15.category",
    date: "Nov 28, 2025",
    readTimeKey: "blog.readTime.10min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop"
  },
  {
    id: 16,
    titleKey: "blog.post16.title",
    excerptKey: "blog.post16.excerpt",
    categoryKey: "technology",
    categoryLabelKey: "blog.post16.category",
    date: "Jan 26, 2026",
    readTimeKey: "blog.readTime.12min",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&auto=format&fit=crop"
  },
  {
    id: 17,
    titleKey: "blog.post17.title",
    excerptKey: "blog.post17.excerpt",
    categoryKey: "defi",
    categoryLabelKey: "blog.post17.category",
    date: "Jan 25, 2026",
    readTimeKey: "blog.readTime.9min",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop"
  },
  {
    id: 18,
    titleKey: "blog.post18.title",
    excerptKey: "blog.post18.excerpt",
    categoryKey: "technology",
    categoryLabelKey: "blog.post18.category",
    date: "Jan 24, 2026",
    readTimeKey: "blog.readTime.8min",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&auto=format&fit=crop"
  },
  {
    id: 19,
    titleKey: "blog.post19.title",
    excerptKey: "blog.post19.excerpt",
    categoryKey: "nfts",
    categoryLabelKey: "blog.post19.category",
    date: "Jan 23, 2026",
    readTimeKey: "blog.readTime.10min",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop"
  }
];

export default function Blog() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.categoryKey === selectedCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t("blog.pageTitle")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("blog.pageSubtitle")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className="text-muted-foreground">{post.date}</span>
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
