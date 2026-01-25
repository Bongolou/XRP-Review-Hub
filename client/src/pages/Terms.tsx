import { Layout } from "@/components/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 25, 2026</p>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using All Things XRPL ("the Website"), you accept and agree to be 
                bound by these Terms of Service. If you do not agree to these terms, please do not 
                use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">2. Educational Content Only</h2>
              <p className="text-muted-foreground leading-relaxed">
                The content on this website is for educational and informational purposes only. 
                Nothing on this website constitutes financial, investment, legal, or tax advice. 
                We are not financial advisors, and you should consult with qualified professionals 
                before making any financial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">3. No Investment Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                All opinions, analyses, reviews, and recommendations expressed on this website are 
                solely those of the authors and do not constitute investment advice. Cryptocurrency 
                investments are highly volatile and risky. You could lose some or all of your investment. 
                Always do your own research (DYOR) before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">4. Affiliate Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website contains affiliate links. When you click on these links and make a purchase 
                or sign up for a service, we may receive a commission at no additional cost to you. 
                This helps us maintain and improve our website. For full details, please read our{" "}
                <a href="/disclosure" className="text-primary hover:underline">Affiliate Disclosure</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">5. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website contains links to third-party websites, products, and services. We are not 
                responsible for the content, accuracy, or practices of these third-party sites. Your 
                use of third-party websites is at your own risk and subject to their terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">6. Accuracy of Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide accurate and up-to-date information, the cryptocurrency 
                space evolves rapidly. We make no warranties or representations about the accuracy, 
                completeness, or reliability of any content on this website. Information may become 
                outdated, and features or pricing of products we review may change.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by law, All Things XRPL shall not be liable for any 
                direct, indirect, incidental, special, consequential, or punitive damages arising 
                from your use of this website or reliance on any information provided herein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the 
                property of All Things XRPL or its content suppliers and is protected by copyright 
                and other intellectual property laws. You may not reproduce, distribute, or create 
                derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">9. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Use the website for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Submit false information through our forms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be 
                effective immediately upon posting. Your continued use of the website after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">11. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@allthingsxrpl.com" className="text-primary hover:underline">
                  legal@allthingsxrpl.com
                </a>{" "}
                or through our <a href="/contact" className="text-primary hover:underline">contact form</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
