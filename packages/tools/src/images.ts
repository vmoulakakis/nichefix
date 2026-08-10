import { z } from "zod";

const ImageInput = z.object({ query: z.string().min(2).max(200), perPage: z.number().int().min(1).max(30).default(12) });

export async function searchPexels(raw: z.input<typeof ImageInput>) {
  const input = ImageInput.parse(raw);
  if (!process.env.PEXELS_API_KEY) throw new Error("Configure PEXELS_API_KEY");
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", input.query);
  url.searchParams.set("per_page", String(input.perPage));
  const response = await fetch(url, { headers: { Authorization: process.env.PEXELS_API_KEY } });
  if (!response.ok) throw new Error(`Pexels search failed: ${response.status}`);
  return response.json();
}
