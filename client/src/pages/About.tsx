import { Layout } from "@/components/Layout";
import { Shield, Users, Target, Heart } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">About All Things XRPL</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your trusted guide to navigating the XRP Ledger ecosystem
          </p>
        </div>

        <div className="prose prose-invert max-w-none mb-16">
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold font-display mb-6 text-white">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At All Things XRPL, we're passionate about making the XRP Ledger ecosystem accessible to everyone. 
              Whether you're a complete beginner looking to buy your first XRP or an experienced DeFi user 
              exploring advanced staking strategies, we're here to guide you every step of the way.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We believe in the transformative power of blockchain technology and the XRP Ledger's unique 
              capabilities for fast, low-cost, and sustainable transactions. Our goal is to help you make 
              informed decisions about wallets, exchanges, and dApps so you can confidently participate 
              in the future of finance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-primary/30">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Unbiased Reviews</h3>
            <p className="text-sm text-muted-foreground">
              We test every wallet and platform ourselves before recommending it. Our reviews are honest, 
              thorough, and focused on what matters most to users.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-secondary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-secondary/30">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Security First</h3>
            <p className="text-sm text-muted-foreground">
              Your security is our top priority. We only recommend platforms with proven security 
              track records and best practices for protecting your assets.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-purple-500/30">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Community Driven</h3>
            <p className="text-sm text-muted-foreground">
              We're active members of the XRPL community and stay up-to-date with the latest 
              developments, updates, and opportunities in the ecosystem.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-green-500/30">
              <Heart className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">Education Focused</h3>
            <p className="text-sm text-muted-foreground">
              We believe knowledge is power. Our guides and articles are designed to help you 
              understand the technology, not just use it.
            </p>
          </div>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold font-display mb-6">How We Make Money</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Transparency is important to us. All Things XRPL earns revenue through affiliate partnerships 
            with wallets, exchanges, and other platforms we recommend. When you sign up for a service 
            through our links, we may receive a commission at no extra cost to you.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            This affiliate model allows us to provide free, high-quality content while maintaining our 
            editorial independence. We never let affiliate relationships influence our reviews or 
            recommendations. For full details, please read our{" "}
            <a href="/disclosure" className="text-primary hover:underline">Affiliate Disclosure</a>.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold font-display mb-4">Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            We'd love to hear from you. Reach out anytime!
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
}
