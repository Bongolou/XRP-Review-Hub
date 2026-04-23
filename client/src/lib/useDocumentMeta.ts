import { useEffect } from "react";
import { useLanguage } from "./i18n/LanguageContext";
import type { Language } from "./i18n/translations";

type Meta = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
};

type SnapshotEntry = {
  selector: string;
  attr: "name" | "property";
  key: string;
  prevContent: string | null;
  createdByHook: boolean;
};

const HREFLANG_MAP: Array<{ lang: Language; hreflang: string }> = [
  { lang: "en", hreflang: "en" },
  { lang: "es", hreflang: "es" },
  { lang: "zh", hreflang: "zh-Hans" },
  { lang: "ja", hreflang: "ja" },
  { lang: "ko", hreflang: "ko" },
  { lang: "pt", hreflang: "pt" },
  { lang: "de", hreflang: "de" },
  { lang: "fr", hreflang: "fr" },
];

const HREFLANG_MARKER = "data-i18n-alternate";

function buildLocalizedHref(origin: string, path: string, lang: Language): string {
  if (lang === "en") return `${origin}${path}`;
  const sep = path.includes("?") ? "&" : "?";
  return `${origin}${path}${sep}lang=${lang}`;
}

function snapshotMetaTag(
  selector: string,
  attr: "name" | "property",
  key: string,
): SnapshotEntry {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  return {
    selector,
    attr,
    key,
    prevContent: el ? el.getAttribute("content") : null,
    createdByHook: false,
  };
}

function setMetaTagAndTrack(entry: SnapshotEntry, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(entry.selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(entry.attr, entry.key);
    document.head.appendChild(el);
    entry.createdByHook = true;
  }
  el.setAttribute("content", content);
}

function restoreMetaTag(entry: SnapshotEntry) {
  const el = document.head.querySelector<HTMLMetaElement>(entry.selector);
  if (!el) return;
  if (entry.createdByHook && entry.prevContent === null) {
    el.parentNode?.removeChild(el);
  } else if (entry.prevContent !== null) {
    el.setAttribute("content", entry.prevContent);
  }
}

export function useDocumentMeta({ title, description, canonicalPath, image }: Meta) {
  const { language } = useLanguage();

  useEffect(() => {
    const prevTitle = document.title;

    const titleSnaps: SnapshotEntry[] = title
      ? [
          snapshotMetaTag('meta[name="title"]', "name", "title"),
          snapshotMetaTag('meta[property="og:title"]', "property", "og:title"),
          snapshotMetaTag('meta[name="twitter:title"]', "name", "twitter:title"),
        ]
      : [];

    const imageSnaps: SnapshotEntry[] = image
      ? [
          snapshotMetaTag('meta[property="og:image"]', "property", "og:image"),
          snapshotMetaTag('meta[name="twitter:image"]', "name", "twitter:image"),
        ]
      : [];

    const descSnaps: SnapshotEntry[] = description
      ? [
          snapshotMetaTag('meta[name="description"]', "name", "description"),
          snapshotMetaTag(
            'meta[property="og:description"]',
            "property",
            "og:description",
          ),
          snapshotMetaTag(
            'meta[name="twitter:description"]',
            "name",
            "twitter:description",
          ),
        ]
      : [];

    let canonicalSnap: {
      prevHref: string | null;
      createdByHook: boolean;
    } | null = null;
    if (canonicalPath) {
      const existing = document.head.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      canonicalSnap = {
        prevHref: existing ? existing.getAttribute("href") : null,
        createdByHook: false,
      };
    }

    if (title) {
      document.title = title;
      titleSnaps.forEach((s) => setMetaTagAndTrack(s, title));
    }
    if (description) {
      descSnaps.forEach((s) => setMetaTagAndTrack(s, description));
    }
    if (image) {
      imageSnaps.forEach((s) => setMetaTagAndTrack(s, image));
    }

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";

    if (canonicalPath && canonicalSnap) {
      let el = document.head.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
        canonicalSnap.createdByHook = true;
      }
      el.setAttribute("href", buildLocalizedHref(origin, canonicalPath, language));
    }

    // Emit a self-referential set of hreflang alternates plus x-default so
    // search engines understand the relationship between every translated
    // version of this page. Mirrors the sitemap's alternate URL set.
    const alternateLinks: HTMLLinkElement[] = [];
    if (canonicalPath) {
      // Clean any leftover alternates from a previous render before adding
      // a fresh set so re-renders don't duplicate tags.
      document.head
        .querySelectorAll<HTMLLinkElement>(`link[${HREFLANG_MARKER}]`)
        .forEach((node) => node.parentNode?.removeChild(node));

      HREFLANG_MAP.forEach(({ lang, hreflang }) => {
        const link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", hreflang);
        link.setAttribute("href", buildLocalizedHref(origin, canonicalPath, lang));
        link.setAttribute(HREFLANG_MARKER, "true");
        document.head.appendChild(link);
        alternateLinks.push(link);
      });
      const xdefault = document.createElement("link");
      xdefault.setAttribute("rel", "alternate");
      xdefault.setAttribute("hreflang", "x-default");
      xdefault.setAttribute("href", `${origin}${canonicalPath}`);
      xdefault.setAttribute(HREFLANG_MARKER, "true");
      document.head.appendChild(xdefault);
      alternateLinks.push(xdefault);
    }

    return () => {
      if (title) document.title = prevTitle;
      titleSnaps.forEach(restoreMetaTag);
      descSnaps.forEach(restoreMetaTag);
      imageSnaps.forEach(restoreMetaTag);
      if (canonicalSnap) {
        const el = document.head.querySelector<HTMLLinkElement>(
          'link[rel="canonical"]',
        );
        if (el) {
          if (canonicalSnap.createdByHook && canonicalSnap.prevHref === null) {
            el.parentNode?.removeChild(el);
          } else if (canonicalSnap.prevHref !== null) {
            el.setAttribute("href", canonicalSnap.prevHref);
          }
        }
      }
      alternateLinks.forEach((link) => link.parentNode?.removeChild(link));
    };
  }, [title, description, canonicalPath, image, language]);
}
