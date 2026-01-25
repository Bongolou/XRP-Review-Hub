import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, languageNames, availableLanguages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" data-testid="language-switcher">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-white/10">
        {availableLanguages.map((lang: Language) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`cursor-pointer ${language === lang ? "bg-primary/20 text-primary" : ""}`}
            data-testid={`language-option-${lang}`}
          >
            <span className="mr-2">{getFlagEmoji(lang)}</span>
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getFlagEmoji(lang: Language): string {
  const flags: Record<Language, string> = {
    en: "🇺🇸",
    es: "🇪🇸",
    zh: "🇨🇳",
    ja: "🇯🇵",
    ko: "🇰🇷",
    pt: "🇧🇷",
    de: "🇩🇪",
    fr: "🇫🇷"
  };
  return flags[lang] || "🌐";
}
