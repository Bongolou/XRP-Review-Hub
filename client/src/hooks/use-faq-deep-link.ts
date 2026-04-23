import { useCallback, useEffect, useState } from "react";

function parseFaqHash(hash: string, slug?: string): string | null {
  if (!hash) return null;
  const raw = hash.replace(/^#/, "");
  if (!raw) return null;

  let m = raw.match(/^faq-(?:question-|answer-|q-|a-)?(\d+)$/);
  if (m) return `faq-${m[1]}`;

  m = raw.match(/^faq-(?:item|question|answer|q|a)-.+-(\d+)$/);
  if (m) return `faq-${m[1]}`;

  if (slug) {
    const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
      `^faq-(?:item-|question-|answer-|q-|a-)?${escaped}-(\\d+)$`,
    );
    m = raw.match(re);
    if (m) return `faq-${m[1]}`;
  }

  return null;
}

export function useFaqDeepLink(slug?: string) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const onValueChange = useCallback((value: string[]) => {
    setOpenItems(value);
  }, []);

  useEffect(() => {
    const timeouts = new Set<ReturnType<typeof setTimeout>>();
    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timeouts.delete(id);
        fn();
      }, ms);
      timeouts.add(id);
    };

    const apply = () => {
      const target = parseFaqHash(window.location.hash, slug);
      if (!target) return;

      setOpenItems((prev) => (prev.includes(target) ? prev : [...prev, target]));

      const idx = target.replace(/^faq-/, "");
      const selector = slug
        ? `[data-testid="faq-item-${slug}-${idx}"]`
        : `[data-testid^="faq-item-"][data-testid$="-${idx}"]`;

      const tryScroll = (attempt = 0) => {
        const el = document.querySelector(selector);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempt < 15) {
          schedule(() => tryScroll(attempt + 1), 100);
        }
      };
      schedule(() => tryScroll(), 80);
    };

    apply();
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
    };
  }, [slug]);

  return { openItems, onValueChange };
}
