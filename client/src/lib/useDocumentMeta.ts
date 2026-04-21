import { useEffect } from "react";

type Meta = {
  title?: string;
  description?: string;
  canonicalPath?: string;
};

function setMetaTag(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useDocumentMeta({ title, description, canonicalPath }: Meta) {
  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.head
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.getAttribute("content");
    const prevOgTitle = document.head
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.getAttribute("content");
    const prevOgDesc = document.head
      .querySelector<HTMLMetaElement>('meta[property="og:description"]')
      ?.getAttribute("content");
    const prevTwTitle = document.head
      .querySelector<HTMLMetaElement>('meta[name="twitter:title"]')
      ?.getAttribute("content");
    const prevTwDesc = document.head
      .querySelector<HTMLMetaElement>('meta[name="twitter:description"]')
      ?.getAttribute("content");
    const prevCanonical = document.head
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.getAttribute("href");

    if (title) {
      document.title = title;
      setMetaTag('meta[name="title"]', "name", "title", title);
      setMetaTag('meta[property="og:title"]', "property", "og:title", title);
      setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    }
    if (description) {
      setMetaTag('meta[name="description"]', "name", "description", description);
      setMetaTag('meta[property="og:description"]', "property", "og:description", description);
      setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    }
    if (canonicalPath) {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      setLink("canonical", `${origin}${canonicalPath}`);
    }

    return () => {
      if (title) document.title = prevTitle;
      if (description && prevDesc) {
        setMetaTag('meta[name="description"]', "name", "description", prevDesc);
      }
      if (title && prevOgTitle) {
        setMetaTag('meta[property="og:title"]', "property", "og:title", prevOgTitle);
      }
      if (description && prevOgDesc) {
        setMetaTag(
          'meta[property="og:description"]',
          "property",
          "og:description",
          prevOgDesc,
        );
      }
      if (title && prevTwTitle) {
        setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", prevTwTitle);
      }
      if (description && prevTwDesc) {
        setMetaTag(
          'meta[name="twitter:description"]',
          "name",
          "twitter:description",
          prevTwDesc,
        );
      }
      if (canonicalPath && prevCanonical) {
        setLink("canonical", prevCanonical);
      }
    };
  }, [title, description, canonicalPath]);
}
