import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

const questions = [
  {
    id: 1,
    question: "How much XRP do you plan to hold?",
    options: [
      { text: "Less than $500", value: "small" },
      { text: "$500 - $5,000", value: "medium" },
      { text: "More than $5,000", value: "large" }
    ]
  },
  {
    id: 2,
    question: "What's your primary use case?",
    options: [
      { text: "Long-term holding (HODL)", value: "hold" },
      { text: "Trading & DeFi", value: "defi" },
      { text: "Everyday transactions", value: "daily" }
    ]
  },
  {
    id: 3,
    question: "How important is ease of use?",
    options: [
      { text: "I'm a beginner, keep it simple", value: "beginner" },
      { text: "I can handle some complexity", value: "intermediate" },
      { text: "I want full control and features", value: "advanced" }
    ]
  },
  {
    id: 4,
    question: "Do you want a hardware wallet?",
    options: [
      { text: "Yes, maximum security", value: "hardware" },
      { text: "Maybe, if needed", value: "maybe" },
      { text: "No, mobile/software is fine", value: "software" }
    ]
  },
  {
    id: 5,
    question: "Which features matter most?",
    options: [
      { text: "NFT support & DeFi", value: "features" },
      { text: "Simple & secure storage", value: "simple" },
      { text: "Multi-currency support", value: "multi" }
    ]
  }
];

type Answers = Record<number, string>;

function getRecommendation(answers: Answers): {
  primary: { name: string; slug: string; description: string; link: string };
  secondary?: { name: string; slug: string; description: string };
} {
  const values = Object.values(answers);
  
  const wantsHardware = values.includes("hardware") || values.includes("large");
  const wantsSimple = values.includes("beginner") || values.includes("simple");
  const wantsDefi = values.includes("defi") || values.includes("features");
  const wantsPortable = values.includes("daily");
  
  if (wantsHardware && !wantsPortable) {
    return {
      primary: {
        name: "Ledger Nano X",
        slug: "ledger",
        description: "For your holding size, we recommend hardware security. The Ledger Nano X offers industry-leading protection with Bluetooth convenience.",
        link: "https://shop.ledger.com/?r=5d81f18905fe"
      },
      secondary: {
        name: "Xaman",
        slug: "xaman",
        description: "Pair with Xaman for day-to-day transactions and DeFi access."
      }
    };
  }
  
  if (wantsHardware && wantsPortable) {
    return {
      primary: {
        name: "Tangem",
        slug: "tangem",
        description: "For everyday use with hardware security, Tangem's card format is perfect. It's portable, durable, and taps with your phone.",
        link: "https://tangem.com/?ref=allthingsxrpl"
      },
      secondary: {
        name: "Xaman",
        slug: "xaman",
        description: "Use Xaman for advanced XRPL features like DEX trading."
      }
    };
  }
  
  if (wantsDefi || values.includes("advanced")) {
    return {
      primary: {
        name: "Xaman (XUMM)",
        slug: "xaman",
        description: "For DeFi and advanced features, Xaman is the clear winner. It's the most feature-complete XRPL wallet with full DEX, AMM, and NFT support.",
        link: "https://xaman.app/?ref=allthingsxrpl"
      },
      secondary: values.includes("large") ? {
        name: "Ledger Nano X",
        slug: "ledger",
        description: "Consider adding a Ledger for cold storage of larger holdings."
      } : undefined
    };
  }
  
  return {
    primary: {
      name: "Xaman (XUMM)",
      slug: "xaman",
      description: "For most users, Xaman is the best choice. It's free, user-friendly, and supports all XRPL features. Start here and add hardware later if needed.",
      link: "https://xaman.app/?ref=allthingsxrpl"
    }
  };
}

export default function WalletQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const recommendation = showResults ? getRecommendation(answers) : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-32 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">Find Your Perfect Wallet</h1>
          <p className="text-muted-foreground text-lg">
            Answer a few questions to get a personalized wallet recommendation
          </p>
        </div>

        {!showResults ? (
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-8 h-1 rounded-full",
                      index <= currentQuestion ? "bg-primary" : "bg-white/10"
                    )}
                  />
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-8">{questions[currentQuestion].question}</h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  data-testid={`quiz-option-${option.value}`}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all text-left flex items-center justify-between group"
                >
                  <span>{option.text}</span>
                  <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
          </div>
        ) : recommendation && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl p-8">
              <div className="text-sm text-primary font-display mb-2">Our Recommendation</div>
              <h2 className="text-3xl font-bold font-display mb-4">{recommendation.primary.name}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {recommendation.primary.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={recommendation.primary.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
                  data-testid="button-get-recommended"
                >
                  Get {recommendation.primary.name} <ExternalLink className="h-4 w-4" />
                </a>
                <Link 
                  href={`/wallet/${recommendation.primary.slug}`}
                  className="inline-flex items-center gap-2 h-12 px-8 border border-white/20 hover:bg-white/10 font-bold rounded-lg transition-colors"
                >
                  Read Full Review
                </Link>
              </div>
            </div>

            {recommendation.secondary && (
              <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-muted-foreground mb-2">Also Consider</div>
                <h3 className="text-xl font-bold mb-2">{recommendation.secondary.name}</h3>
                <p className="text-muted-foreground mb-4">{recommendation.secondary.description}</p>
                <Link 
                  href={`/wallet/${recommendation.secondary.slug}`}
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Read Review <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Links include affiliate tracking. See our{" "}
              <Link href="/disclosure" className="text-primary hover:underline">disclosure</Link>.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
