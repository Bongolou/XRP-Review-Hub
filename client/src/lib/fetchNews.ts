import { apiRequest } from "./queryClient";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  imageUrl?: string;
}

// Use the same XRPL-filtered, cached feed as the published backend.
// Bluehost relays this same-origin URL; development serves it directly.
export async function fetchAllNews(options?: { refresh?: boolean }): Promise<NewsItem[]> {
  const response = await apiRequest("GET", `/api/news?limit=50${options?.refresh ? "&refresh=1" : ""}`);
  const data = await response.json();
  if (!Array.isArray(data.items)) throw new Error("Invalid news response");
  return data.items;
}
