import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations, languageNames } from "./translations";
import { dappsTranslations } from "./dappsTranslations";
import { detectVisitorCountry } from "../visitorCountry";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageNames: Record<Language, string>;
  availableLanguages: Language[];
  /** Auto-detected country, only used until a visitor explicitly chooses a language. */
  country: string | undefined;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "allthingsxrpl_language";
const DEFAULT_LANG: Language = "en";

function isSupportedLanguage(value: string | null): value is Language {
  return value !== null && Object.prototype.hasOwnProperty.call(translations, value);
}

function readLangFromUrl(): Language | null {
  if (typeof window === "undefined") return null;
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (isSupportedLanguage(urlLang)) {
    return urlLang;
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
  const [hasLanguagePreference, setHasLanguagePreference] = useState(() => {
    if (readLangFromUrl()) return true;
    try {
      return typeof window !== "undefined" &&
        isSupportedLanguage(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const [detectedCountry, setDetectedCountry] = useState<string>();
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const urlLang = readLangFromUrl();
      if (urlLang) return urlLang;
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (isSupportedLanguage(stored)) {
          return stored;
        }
      } catch {
        // Storage is optional; denied access falls back to English.
      }
    }
    return DEFAULT_LANG;
  });

  const setLanguage = (lang: Language) => {
    setHasLanguagePreference(true);
    setLanguageState(lang);
    try {
      // English is also an explicit preference: do not re-enable geo routing
      // on the next visit merely because English has no URL parameter.
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Keep in-memory state and URL switching working without persistence.
    }
    document.documentElement.lang = lang;
    syncLangInUrl(lang, "push");
  };

  useEffect(() => {
    if (hasLanguagePreference) return;
    let active = true;
    void detectVisitorCountry().then(country => {
      if (active) setDetectedCountry(country);
    });
    return () => { active = false; };
  }, [hasLanguagePreference]);

  useEffect(() => {
    document.documentElement.lang = language;
    // Ensure the URL reflects the language chosen at first render (resolved
    // from the URL param, then localStorage, otherwise English) so shareable
    // links carry the signal.
    syncLangInUrl(language, "replace");
  }, [language]);

  useEffect(() => {
    const handlePopState = () => {
      // History navigation is an explicit locale navigation, including English.
      setHasLanguagePreference(true);
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
    <LanguageContext.Provider value={{
      language, setLanguage, t, languageNames, availableLanguages,
      country: hasLanguagePreference ? undefined : detectedCountry,
    }}>
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
