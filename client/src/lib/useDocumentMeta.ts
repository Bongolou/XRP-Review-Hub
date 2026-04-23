import { useEffect } from "react";

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
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      el.setAttribute("href", `${origin}${canonicalPath}`);
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
    };
  }, [title, description, canonicalPath, image]);
}
