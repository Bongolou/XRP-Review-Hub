import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description: "You've been added to our mailing list.",
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to subscribe",
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        data-testid="input-newsletter-email"
        className="flex-1 h-12 px-4 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white placeholder:text-muted-foreground/70"
      />
      <Button
        type="submit"
        disabled={isLoading}
        data-testid="button-subscribe"
        className="h-12 px-8 bg-white text-black hover:bg-white/90 font-bold"
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
