import { useCallback, type MouseEvent } from "react";
import { useLocation } from "@/lib/i18n/LocalizedLink";

interface SafeHtmlProps {
  html: string;
  className?: string;
  as?: "div" | "span" | "section" | "article" | "p";
}

/**
 * Renders trusted HTML and intercepts internal anchor clicks so they route
 * through wouter (preserving the active language prefix) instead of
 * triggering a full page reload. External links and links with target="_blank"
 * fall through to the browser's default behaviour.
 */
export function SafeHtml({ html, className, as: Tag = "div" }: SafeHtmlProps) {
  const [, navigate] = useLocation();

  const onClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // Skip modified clicks, new tabs, external links
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;
      if (!href.startsWith("/") || href.startsWith("//")) return;
      event.preventDefault();
      navigate(href);
    },
    [navigate]
  );

  return (
    <Tag
      className={className}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
