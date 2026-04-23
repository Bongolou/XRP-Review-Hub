import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations, languageNames } from "./translations";
import { dappsTranslations } from "./dappsTranslations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageNames: Record<Language, string>;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "allthingsxrpl_language";
const DEFAULT_LANG: Language = "en";

function readLangFromUrl(): Language | null {
  if (typeof window === "undefined") return null;
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang && urlLang in translations) {
    return urlLang as Language;
  }
  return null;
}

function syncLangInUrl(lang: Language, mode: "push" | "replace") {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const currentParam = url.searchParams.get("lang");
  if (lang === DEFAULT_LANG) {
    if (currentParam === null) return;
    url.searchParams.delete("lang");
  } else {
    if (currentParam === lang) return;
    url.searchParams.set("lang", lang);
  }
  const newUrl = `${url.pathname}${url.search}${url.hash}`;
  if (mode === "push") {
    window.history.pushState(window.history.state, "", newUrl);
  } else {
    window.history.replaceState(window.history.state, "", newUrl);
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const urlLang = readLangFromUrl();
      if (urlLang) return urlLang;
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored in translations) {
        return stored as Language;
      }
      const browserLang = navigator.language.split("-")[0];
      if (browserLang in translations) {
        return browserLang as Language;
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    syncLangInUrl(lang, "push");
  };

  useEffect(() => {
    document.documentElement.lang = language;
    // Ensure the URL reflects the language chosen at first render (e.g. from
    // localStorage or browser locale) so shareable links carry the signal.
    syncLangInUrl(language, "replace");
  }, [language]);

  useEffect(() => {
    const handlePopState = () => {
      const urlLang = readLangFromUrl() ?? DEFAULT_LANG;
      setLanguageState((prev) => (prev === urlLang ? prev : urlLang));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const t = (key: string): string => {
    return (
      translations[language][key] ||
      dappsTranslations[language]?.[key] ||
      translations["en"][key] ||
      dappsTranslations["en"]?.[key] ||
      key
    );
  };

  const availableLanguages: Language[] = ["en", "es", "zh", "ja", "ko", "pt", "de", "fr"];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageNames, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
