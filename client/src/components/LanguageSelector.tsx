import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

const languageFlags: Record<Language, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  zh: "🇨🇳",
  ja: "🇯🇵",
  ko: "🇰🇷",
  pt: "🇧🇷",
  de: "🇩🇪",
  fr: "🇫🇷"
};

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, languageNames, availableLanguages } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm"
        data-testid="language-selector"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span>{languageFlags[language]}</span>
        <span className="hidden sm:inline">{language.toUpperCase()}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto">
            {availableLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors text-left text-sm",
                  language === lang && "bg-primary/20 text-primary"
                )}
                data-testid={`lang-${lang}`}
              >
                <span>{languageFlags[lang]}</span>
                <span>{languageNames[lang]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
