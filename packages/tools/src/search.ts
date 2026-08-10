import { z } from "zod";

const SearchInput = z.object({ query: z.string().min(2).max(500), maxResults: z.number().int().min(1).max(10).default(5) });

export async function searchWeb(raw: z.input<typeof SearchInput>) {
  const input = SearchInput.parse(raw);
  if (process.env.TAVILY_API_KEY) return searchTavily(input.query, input.maxResults);
  if (process.env.BRAVE_SEARCH_API_KEY) return searchBrave(input.query, input.maxResults);
  throw new Error("Configure TAVILY_API_KEY or BRAVE_SEARCH_API_KEY");
}

async function searchTavily(query: string, maxResults: number) {
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.TAVILY_API_KEY}` },
    body: JSON.stringify({ query, max_results: maxResults, search_depth: "basic" }),
  });
  if (!response.ok) throw new Error(`Tavily search failed: ${response.status}`);
  return { provider: "tavily" as const, data: await response.json() };
}

async function searchBrave(query: string, maxResults: number) {
  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(maxResults));
  const response = await fetch(url, { headers: { Accept: "application/json", "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY ?? "" } });
  if (!response.ok) throw new Error(`Brave search failed: ${response.status}`);
  return { provider: "brave" as const, data: await response.json() };
}
