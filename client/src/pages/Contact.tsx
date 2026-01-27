import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send, HelpCircle, Newspaper } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mqeqgeqk", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question about the XRP Ledger ecosystem? Want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-card/30 border border-white/10 text-center">
            <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 border border-primary/30">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display font-bold mb-2">General Inquiries</h3>
            <p className="text-sm text-muted-foreground">hello@allthingsxrpl.com</p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10 text-center">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-500/30">
              <HelpCircle className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-display font-bold mb-2">Support</h3>
            <p className="text-sm text-muted-foreground">support@allthingsxrpl.com</p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10 text-center">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
              <Send className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-display font-bold mb-2">Partnerships</h3>
            <p className="text-sm text-muted-foreground">partners@allthingsxrpl.com</p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10 text-center">
            <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
              <Newspaper className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="font-display font-bold mb-2">Newsletter</h3>
            <p className="text-sm text-muted-foreground">newsletter@allthingsxrpl.com</p>
          </div>
          <div className="p-6 rounded-xl bg-card/30 border border-white/10 text-center">
            <div className="bg-secondary/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 border border-secondary/30">
              <MessageSquare className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-display font-bold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">Join our Discord server</p>
          </div>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold font-display mb-8">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-contact-name"
                  className="w-full h-12 px-4 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  data-testid="input-contact-email"
                  className="w-full h-12 px-4 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                data-testid="input-contact-subject"
                className="w-full h-12 px-4 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                data-testid="input-contact-message"
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70 resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              data-testid="button-submit-contact"
              className="w-full md:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
