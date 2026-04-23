import { useEffect } from "react";

export type JsonLdNode = Record<string, unknown>;

const SCRIPT_TYPE = "application/ld+json";
const HOOK_ATTR = "data-jsonld-hook";

function setJsonLdScripts(id: string, nodes: JsonLdNode[]) {
  removeJsonLdScripts(id);
  nodes.forEach((node, index) => {
    const script = document.createElement("script");
    script.type = SCRIPT_TYPE;
    script.setAttribute(HOOK_ATTR, `${id}:${index}`);
    script.text = JSON.stringify(node);
    document.head.appendChild(script);
  });
}

function removeJsonLdScripts(id: string) {
  const existing = document.head.querySelectorAll<HTMLScriptElement>(
    `script[${HOOK_ATTR}^="${CSS.escape(id)}:"]`,
  );
  existing.forEach((el) => el.parentNode?.removeChild(el));
}

export function useJsonLd(id: string, nodes: JsonLdNode[] | null | undefined) {
  const serialized = nodes ? JSON.stringify(nodes) : "";

  useEffect(() => {
    if (!serialized) {
      removeJsonLdScripts(id);
      return;
    }
    let parsed: JsonLdNode[] = [];
    try {
      parsed = JSON.parse(serialized) as JsonLdNode[];
    } catch {
      return;
    }
    setJsonLdScripts(id, parsed);
    return () => removeJsonLdScripts(id);
  }, [id, serialized]);
}

export function buildBreadcrumbList(
  items: { name: string; path: string }[],
): JsonLdNode {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}
