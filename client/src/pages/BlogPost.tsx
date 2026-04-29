import { Layout } from "@/components/Layout";
import { useParams, Redirect } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Link } from "@/lib/i18n/LocalizedLink";
import { BlogComments } from "@/components/BlogComments";
import { BannerAd } from "@/components/BannerAd";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { useJsonLd, buildBreadcrumbList } from "@/lib/useJsonLd";
import { blogPosts } from "@shared/blog";
import { getLocalizedBlogContent } from "@/lib/i18n/blogContent";

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

export default function BlogPost() {
  const { id } = useParams();
  const { t, language } = useLanguage();

  const postId = parseInt(id || "1");
  const meta = blogPosts.find(p => p.id === postId);
  const post = meta ? { ...meta, categoryKey: meta.categoryLabelKey, content: getLocalizedBlogContent(language, postId) ?? getLocalizedBlogContent("en", postId) ?? "" } : undefined;

  const postTitle = post ? t(post.titleKey) : undefined;
  const postExcerpt = post ? t(post.excerptKey) : undefined;
  useDocumentMeta({
    title: postTitle ? `${postTitle} | All Things XRPL` : undefined,
    description: postExcerpt,
    canonicalPath: post ? `/blog/${post.id}` : undefined,
    image: post?.image,
  });

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const jsonLdNodes = post && postTitle
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: postTitle,
          description: postExcerpt,
          image: post.image,
          datePublished: post.dateIso,
          dateModified: post.dateIso,
          author: {
            "@type": "Person",
            name: post.author,
            jobTitle: post.authorRole,
          },
          publisher: {
            "@type": "Organization",
            name: "All Things XRPL",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${origin}/blog/${post.id}`,
          },
        },
        buildBreadcrumbList([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: postTitle, path: `/blog/${post.id}` },
        ]),
      ]
    : null;
  useJsonLd(`blog-post:${post?.id ?? "none"}`, jsonLdNodes);

  if (!post) {
    return <Redirect to="/blog" />;
  }

  return (
    <Layout>
      <article className="min-h-screen pb-24">
        <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-background/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20" />
          <img 
            src={post.image} 
            alt={t(post.titleKey)} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-30">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("blog.backToInsights") || "Back to Knowledge Hub"}
            </Link>
            
            <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">
                  {t(post.categoryKey)}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  {post.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-8 text-white">
                {t(post.titleKey)}
              </h1>

              <div className="flex items-center justify-between border-y border-white/10 py-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{post.author}</div>
                    <div className="text-xs text-muted-foreground">{post.authorRole}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="hover:text-primary hover:bg-white/5"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t(post.titleKey))}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    title="Share on X"
                    data-testid="share-twitter"
                  >
                    <TwitterIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="hover:text-primary hover:bg-white/5"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    title="Share on Facebook"
                    data-testid="share-facebook"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="hover:text-primary hover:bg-white/5"
                    onClick={() => window.open(`https://www.tiktok.com/share?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    title="Share on TikTok"
                    data-testid="share-tiktok"
                  >
                    <TikTokIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="hover:text-primary hover:bg-white/5"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    title="Copy Link"
                    data-testid="share-copy"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-8">
                <BannerAd variant="horizontal" />
              </div>

              <BlogComments postId={postId} />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
