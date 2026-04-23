import { Link as WouterLink, useLocation as useWouterLocation, useRouter } from "wouter";
import type { ComponentProps, ReactElement } from "react";
import { useCallback } from "react";
import { useLanguage } from "./LanguageContext";
import type { Language } from "./translations";

const DEFAULT_LANG: Language = "en";

export function appendLangToHref(href: string, language: Language): string {
  if (typeof href !== "string") return href;
  if (!href.startsWith("/")) return href;
  if (language === DEFAULT_LANG) return href;

  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const url = new URL(href, origin);
  if (!url.searchParams.has("lang")) {
    url.searchParams.set("lang", language);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

type WouterLinkProps = ComponentProps<typeof WouterLink> & { href?: string; to?: string };

export function Link(props: WouterLinkProps) {
  const { language } = useLanguage();
  const { href, to, ...rest } = props as WouterLinkProps;
  const target = href ?? to;
  const finalHref = typeof target === "string" ? appendLangToHref(target, language) : target;
  const Anchor = WouterLink as unknown as (p: { href: string } & typeof rest) => ReactElement;
  return <Anchor href={finalHref as string} {...rest} />;
}

export function useLocation(): [string, (to: string, options?: { replace?: boolean }) => void] {
  const [location, setLocation] = useWouterLocation();
  const { language } = useLanguage();

  const navigate = useCallback(
    (to: string, options?: { replace?: boolean }) => {
      const next = typeof to === "string" ? appendLangToHref(to, language) : to;
      setLocation(next, options);
    },
    [setLocation, language]
  );

  return [location, navigate];
}

export { useRouter };
