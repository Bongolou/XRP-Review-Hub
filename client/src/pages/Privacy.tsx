import { Layout } from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 25, 2026</p>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you subscribe to our 
                newsletter, submit a contact form, or interact with our website.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-white">Email Address:</strong> When you subscribe to our newsletter</li>
                <li><strong className="text-white">Contact Information:</strong> Name, email, and message content when you use our contact form</li>
                <li><strong className="text-white">Usage Data:</strong> Information about how you interact with our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Send you our newsletter with XRPL updates, reviews, and educational content</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and content based on user behavior</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                except as described in this policy. We may share information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Service providers who assist in operating our website</li>
                <li>Analytics providers to understand website usage</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">4. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and 
                hold certain information. Cookies are files with small amounts of data that may include 
                an anonymous unique identifier.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                being sent. However, if you do not accept cookies, you may not be able to use some 
                portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">5. Affiliate Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website contains affiliate links to third-party products and services. When you 
                click on these links, the third-party may place cookies on your device to track 
                referrals. Please refer to each third party's privacy policy for information about 
                their data practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% 
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Unsubscribe from our newsletter at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-display mb-4 text-white">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@allthingsxrpl.com" className="text-primary hover:underline">
                  privacy@allthingsxrpl.com
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
