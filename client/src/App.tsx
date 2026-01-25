import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Disclosure from "@/pages/Disclosure";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import FAQ from "@/pages/FAQ";
import GettingStarted from "@/pages/GettingStarted";
import Blog from "@/pages/Blog";
import WalletQuiz from "@/pages/WalletQuiz";
import WalletReview from "@/pages/reviews/WalletReview";
import ExchangeReview from "@/pages/reviews/ExchangeReview";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/disclosure" component={Disclosure} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/faq" component={FAQ} />
      <Route path="/getting-started" component={GettingStarted} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/wallet-quiz" component={WalletQuiz} />
      <Route path="/wallet/:slug" component={WalletReview} />
      <Route path="/exchange/:slug" component={ExchangeReview} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
