import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Ecosystem", "Guides", "Security", "NFTs", "Technology", "Institutional"];

const blogPosts = [
  {
    id: 1,
    title: "Top 5 DeFi dApps on XRPL in 2026",
    excerpt: "Discover the leading decentralized finance protocols bringing yield and liquidity to the XRP Ledger this year.",
    category: "Ecosystem",
    date: "Jan 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Understanding AMM Staking Rewards",
    excerpt: "A comprehensive guide to the Automated Market Maker (AMM) functionality on XRPL and how to earn passive income.",
    category: "Guides",
    date: "Jan 20, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Security Best Practices for Self-Custody",
    excerpt: "Protect your digital assets with these essential security tips for hardware and software wallet users.",
    category: "Security",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "NFT Marketplaces on XRPL: Complete Guide",
    excerpt: "Explore the growing NFT ecosystem on the XRP Ledger, including top marketplaces and how to mint your first NFT.",
    category: "NFTs",
    date: "Jan 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1646463535635-74ac0e2f5a20?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "XRPL Sidechains Explained",
    excerpt: "Learn how sidechains extend the capabilities of the XRP Ledger and enable new use cases like smart contracts.",
    category: "Technology",
    date: "Jan 8, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Tokenizing Real World Assets on XRPL",
    excerpt: "How institutions are bringing real estate, stocks, and commodities to the XRP Ledger through tokenization.",
    category: "Institutional",
    date: "Jan 5, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "XRPL Hooks: Programmable Smart Logic",
    excerpt: "An introduction to Hooks, the XRPL's native smart contract-like functionality for custom transaction logic.",
    category: "Technology",
    date: "Jan 2, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Choosing Between Hot and Cold Wallets",
    excerpt: "When to use software wallets vs hardware wallets, and how to balance convenience with security.",
    category: "Security",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Cross-Border Payments with XRP",
    excerpt: "How Ripple and other companies are using XRP to revolutionize international money transfers.",
    category: "Institutional",
    date: "Dec 22, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "How to Set Up Trustlines on XRPL",
    excerpt: "A step-by-step guide to enabling trustlines and holding issued tokens on the XRP Ledger.",
    category: "Guides",
    date: "Dec 18, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
  },
  {
    id: 11,
    title: "Protecting Against Phishing Attacks",
    excerpt: "Learn how to identify and avoid common crypto scams targeting XRP holders and XRPL users.",
    category: "Security",
    date: "Dec 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop"
  },
  {
    id: 12,
    title: "XRP Ledger vs Ethereum: Key Differences",
    excerpt: "A detailed comparison of XRPL and Ethereum, from consensus mechanisms to transaction costs.",
    category: "Technology",
    date: "Dec 10, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&auto=format&fit=crop"
  },
  {
    id: 13,
    title: "The Rise of XRPL Gaming",
    excerpt: "Exploring the growing gaming ecosystem on XRPL, from play-to-earn to NFT-based games.",
    category: "Ecosystem",
    date: "Dec 5, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop"
  },
  {
    id: 14,
    title: "Minting Your First NFT on XRPL",
    excerpt: "A beginner-friendly tutorial on creating and listing your own NFTs on the XRP Ledger.",
    category: "NFTs",
    date: "Dec 1, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop"
  },
  {
    id: 15,
    title: "XRP Tax Guide for 2026",
    excerpt: "Everything you need to know about reporting XRP gains, losses, and staking rewards on your taxes.",
    category: "Guides",
    date: "Nov 28, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop"
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">XRPL Insights</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Guides, news, and analysis from the XRP Ledger ecosystem
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase()}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-white"
              )}
            >
              {category}
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
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{post.date}</span>
                    <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
