export const freeApiRegistry = {
  tavily: { env: "TAVILY_API_KEY", purpose: "agent web search", cacheSeconds: 900 },
  brave: { env: "BRAVE_SEARCH_API_KEY", purpose: "independent web search", cacheSeconds: 900 },
  pexels: { env: "PEXELS_API_KEY", purpose: "licensed editorial photos/video", cacheSeconds: 86400 },
} as const;

export type FreeApiId = keyof typeof freeApiRegistry;
export function toolConfigured(id: FreeApiId) { return Boolean(process.env[freeApiRegistry[id].env]); }
