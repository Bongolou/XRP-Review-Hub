export function buildPageOgImage(title: string): string {
  const params = new URLSearchParams({ title });
  if (typeof window !== "undefined") {
    return `${window.location.origin}/og/page.png?${params.toString()}`;
  }
  return `/og/page.png?${params.toString()}`;
}
