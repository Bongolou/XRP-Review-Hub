import { Layout } from "@/components/Layout";
import { useState } from "react";
import { ArrowRight, ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/i18n/LocalizedLink";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { localizeAffiliateUrl } from "@/lib/affiliateLinks";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { buildPageOgImage } from "@/lib/ogImage";
import { getStaticPageSeo } from "@/lib/i18n/pageSeo";

type Question = {
  id: number;
  questionKey: string;
  options: { textKey: string; value: string }[];
};

const questions: Question[] = [
  {
    id: 1,
    questionKey: "quiz.q1",
    options: [
      { textKey: "quiz.q1.opt1", value: "small" },
      { textKey: "quiz.q1.opt2", value: "medium" },
      { textKey: "quiz.q1.opt3", value: "large" },
    ],
  },
  {
    id: 2,
    questionKey: "quiz.q2",
    options: [
      { textKey: "quiz.q2.opt1", value: "hold" },
      { textKey: "quiz.q2.opt2", value: "defi" },
      { textKey: "quiz.q2.opt3", value: "daily" },
    ],
  },
  {
    id: 3,
    questionKey: "quiz.q3",
    options: [
      { textKey: "quiz.q3.opt1", value: "beginner" },
      { textKey: "quiz.q3.opt2", value: "intermediate" },
      { textKey: "quiz.q3.opt3", value: "advanced" },
    ],
  },
  {
    id: 4,
    questionKey: "quiz.q4",
    options: [
      { textKey: "quiz.q4.opt1", value: "hardware" },
      { textKey: "quiz.q4.opt2", value: "maybe" },
      { textKey: "quiz.q4.opt3", value: "software" },
    ],
  },
  {
    id: 5,
    questionKey: "quiz.q5",
    options: [
      { textKey: "quiz.q5.opt1", value: "features" },
      { textKey: "quiz.q5.opt2", value: "simple" },
      { textKey: "quiz.q5.opt3", value: "multi" },
    ],
  },
];

type Answers = Record<number, string>;

type Recommendation = {
  primary: { name: string; slug: string; descKey: string; link: string };
  secondary?: { name: string; slug: string; descKey: string };
};

function getRecommendation(answers: Answers): Recommendation {
  const values = Object.values(answers);

  const wantsHardware = values.includes("hardware") || values.includes("large");
  const wantsDefi = values.includes("defi") || values.includes("features");
  const wantsPortable = values.includes("daily");

  if (wantsHardware && !wantsPortable) {
    return {
      primary: {
        name: "Ledger Nano X",
        slug: "ledger",
        descKey: "quiz.rec.ledger.desc",
        link: "https://shop.ledger.com/?r=5d81f18905fe",
      },
      secondary: {
        name: "Xaman",
        slug: "xaman",
        descKey: "quiz.rec.sec.xamanDaily",
      },
    };
  }

  if (wantsHardware && wantsPortable) {
    return {
      primary: {
        name: "Tangem",
        slug: "tangem",
        descKey: "quiz.rec.tangem.desc",
        link: "https://tangem.com/?ref=allthingsxrpl",
      },
      secondary: {
        name: "Xaman",
        slug: "xaman",
        descKey: "quiz.rec.sec.xamanDex",
      },
    };
  }

  if (wantsDefi || values.includes("advanced")) {
    return {
      primary: {
        name: "Xaman (XUMM)",
        slug: "xaman",
        descKey: "quiz.rec.xamanDefi.desc",
        link: "https://xaman.app/?ref=allthingsxrpl",
      },
      secondary: values.includes("large")
        ? {
            name: "Ledger Nano X",
            slug: "ledger",
            descKey: "quiz.rec.sec.ledgerCold",
          }
        : undefined,
    };
  }

  return {
    primary: {
      name: "Xaman (XUMM)",
      slug: "xaman",
      descKey: "quiz.rec.xaman.desc",
      link: "https://xaman.app/?ref=allthingsxrpl",
    },
  };
}

export default function WalletQuiz() {
  const { language, t } = useLanguage();
  const seo = getStaticPageSeo(language, "walletQuiz");
  useDocumentMeta({
    title: seo.title,
    description: seo.description,
    canonicalPath: "/wallet-quiz",
    image: buildPageOgImage(seo.title),
  });
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
      <div className="container mx-auto px-4 max-w-2xl py-20 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t("quiz.title")}</h1>
          <p className="text-muted-foreground text-lg">
            {t("quiz.subtitle")}
          </p>
        </div>

        {!showResults ? (
          <div className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-muted-foreground">
                {`${t("quiz.progress.question")} ${currentQuestion + 1} ${t("quiz.progress.of")} ${questions.length}`}
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

            <h2 className="text-2xl font-bold mb-8">{t(questions[currentQuestion].questionKey)}</h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  data-testid={`quiz-option-${option.value}`}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all text-left flex items-center justify-between group"
                >
                  <span>{t(option.textKey)}</span>
                  <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                data-testid="button-quiz-back"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("quiz.back")}
              </button>
            )}
          </div>
        ) : recommendation && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl p-6 md:p-8">
              <div className="text-sm text-primary font-display mb-2">{t("quiz.recommendationLabel")}</div>
              <h2 className="text-3xl font-bold font-display mb-4">{recommendation.primary.name}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t(recommendation.primary.descKey)}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={localizeAffiliateUrl(recommendation.primary.link, language)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
                  data-testid="button-get-recommended"
                >
                  {`${t("quiz.cta.getPrefix")} ${recommendation.primary.name}`} <ExternalLink className="h-4 w-4" />
                </a>
                <Link 
                  href={`/wallet/${recommendation.primary.slug}`}
                  className="inline-flex items-center gap-2 h-12 px-8 border border-white/20 hover:bg-white/10 font-bold rounded-lg transition-colors"
                >
                  {t("quiz.cta.readReview")}
                </Link>
              </div>
            </div>

            {recommendation.secondary && (
              <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-muted-foreground mb-2">{t("quiz.alsoConsider")}</div>
                <h3 className="text-xl font-bold mb-2">{recommendation.secondary.name}</h3>
                <p className="text-muted-foreground mb-4">{t(recommendation.secondary.descKey)}</p>
                <Link 
                  href={`/wallet/${recommendation.secondary.slug}`}
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {t("quiz.cta.readReviewShort")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                data-testid="button-quiz-restart"
              >
                <RotateCcw className="h-4 w-4" />
                {t("quiz.startOver")}
              </button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {t("quiz.disclosure.text")}{" "}
              <Link href="/disclosure" className="text-primary hover:underline">{t("quiz.disclosure.linkText")}</Link>.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
