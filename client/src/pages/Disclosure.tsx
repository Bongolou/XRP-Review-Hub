import { Layout } from "@/components/Layout";
import { Link } from "wouter";

export default function Disclosure() {
  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-black font-display mb-8">Affiliate Disclosure</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
          <p className="lead text-xl text-white mb-8">
            Transparency is a core value at All Things XRPL. We believe in being open about how we fund our operations and content creation.
          </p>

          <div className="p-6 rounded-xl bg-card border border-white/10 mb-10">
            <h3 className="text-white font-display font-bold mt-0">In Short</h3>
            <p className="mb-0">
              Some of the links on this website are affiliate links. This means that if you click on a link and purchase a product or service, we may receive a small commission at no extra cost to you. This helps support our work in researching and reviewing the XRP ecosystem.
            </p>
          </div>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">How We Review</h2>
          <p>
            Our reviews are based on our own independent research and testing. We do not accept payments to write positive reviews. If a product has flaws or security risks, we will highlight them regardless of any affiliate relationship.
          </p>
          <p>
            We primarily review:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Hardware wallets (security, usability, build quality)</li>
            <li>Software wallets (interface, features, private key management)</li>
            <li>DeFi applications (smart contract safety, liquidity, utility)</li>
            <li>Exchange services (fees, speed, support)</li>
          </ul>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">Why We Use Affiliate Links</h2>
          <p>
            Running a high-quality review site requires time, effort, and resources. We need to purchase hardware wallets, pay for server hosting, and compensate our writers and researchers. Affiliate links allow us to earn revenue without cluttering the site with intrusive display ads or putting our content behind a paywall.
          </p>

          <h2 className="text-white font-display font-bold text-2xl mt-12 mb-4">Our Promise to You</h2>
          <p>
            We will never recommend a product that we wouldn't use ourselves or recommend to a friend. The safety of your assets is our top priority. If a wallet or service has a history of security breaches or poor business practices, we will not recommend it, period.
          </p>
          
          <div className="mt-12 pt-12 border-t border-white/10 text-sm">
            <p>
              If you have any questions about our affiliate relationships or review process, please don't hesitate to contact us.
            </p>
            <p className="mt-4">
              Last updated: January 25, 2026
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
