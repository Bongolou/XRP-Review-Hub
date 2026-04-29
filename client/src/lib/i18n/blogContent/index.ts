import type { Language } from "../translations";
import { en } from "./en";
import { es } from "./es";
import { zh } from "./zh";
import { ja } from "./ja";
import { ko } from "./ko";
import { pt } from "./pt";
import { de } from "./de";
import { fr } from "./fr";

export type LocalizedBlogContent = Partial<Record<Language, Record<number, string>>>;

export const blogContent: LocalizedBlogContent = {
  en,
  es,
  zh,
  ja,
  ko,
  pt,
  de,
  fr,
};

export function getLocalizedBlogContent(language: Language, postId: number): string | undefined {
  return blogContent[language]?.[postId];
}
