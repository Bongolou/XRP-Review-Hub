import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    categoryKey: "faq.category.gettingStarted",
    questions: [
      {
        qKey: "faq.q1",
        aKey: "faq.a1"
      },
      {
        qKey: "faq.q2",
        aKey: "faq.a2"
      },
      {
        qKey: "faq.q3",
        aKey: "faq.a3"
      }
    ]
  },
  {
    categoryKey: "faq.category.wallets",
    questions: [
      {
        qKey: "faq.q4",
        aKey: "faq.a4"
      },
      {
        qKey: "faq.q5",
        aKey: "faq.a5"
      },
      {
        qKey: "faq.q6",
        aKey: "faq.a6"
      },
      {
        qKey: "faq.q7",
        aKey: "faq.a7"
      }
    ]
  },
  {
    categoryKey: "faq.category.defi",
    questions: [
      {
        qKey: "faq.q8",
        aKey: "faq.a8"
      },
      {
        qKey: "faq.q9",
        aKey: "faq.a9"
      },
      {
        qKey: "faq.q10",
        aKey: "faq.a10"
      },
      {
        qKey: "faq.q11",
        aKey: "faq.a11"
      }
    ]
  },
  {
    categoryKey: "faq.category.security",
    questions: [
      {
        qKey: "faq.q12",
        aKey: "faq.a12"
      },
      {
        qKey: "faq.q13",
        aKey: "faq.a13"
      },
      {
        qKey: "faq.q14",
        aKey: "faq.a14"
      }
    ]
  }
];

function FAQItem({ questionKey, answerKey, t }: { questionKey: string; answerKey: string; t: (key: string) => string }) {
  const [isOpen, setIsOpen] = useState(false);
  const question = t(questionKey);
  const answer = t(answerKey);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-primary transition-colors"
        data-testid={`faq-toggle-${questionKey}`}
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", isOpen && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all", isOpen ? "max-h-96 pb-4" : "max-h-0")}>
        <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">{t("faq.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category) => (
            <div key={category.categoryKey} className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-display mb-4 text-primary">{t(category.categoryKey)}</h2>
              <div>
                {category.questions.map((faq) => (
                  <FAQItem key={faq.qKey} questionKey={faq.qKey} answerKey={faq.aKey} t={t} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold font-display mb-4">{t("faq.stillHaveQuestions")}</h2>
          <p className="text-muted-foreground mb-6">
            {t("faq.stillHaveQuestionsDesc")}
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
          >
            {t("contact.title")}
          </a>
        </div>
      </div>
    </Layout>
  );
}
