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
import { TwitterIcon, FacebookIcon, TikTokIcon } from "@/components/icons/SocialIcons";

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
