export function buildPageOgImage(title: string): string {
  const params = new URLSearchParams({ title });
  if (typeof window !== "undefined") {
    return `${window.location.origin}/og/page.svg?${params.toString()}`;
  }
  return `/og/page.svg?${params.toString()}`;
}
