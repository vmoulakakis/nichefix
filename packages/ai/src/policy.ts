export const modelIntents = ["fast", "general", "reasoning", "vision", "local", "premium"] as const;
export type ModelIntent = (typeof modelIntents)[number];
export type RoutingMode = "free-first" | "quality-first" | "local-only";

const defaults: Record<ModelIntent, string[]> = {
  fast: ["groq:openai/gpt-oss-20b", "openrouter:openrouter/free", "google:gemini-2.5-flash", "ollama:qwen3:8b"],
  general: ["openrouter:openrouter/free", "google:gemini-2.5-flash", "groq:openai/gpt-oss-20b", "ollama:qwen3:8b"],
  reasoning: ["groq:openai/gpt-oss-120b", "openrouter:openrouter/free", "google:gemini-2.5-pro", "openai:gpt-5-mini"],
  vision: ["openrouter:openrouter/free", "google:gemini-2.5-flash", "openai:gpt-5-mini"],
  local: ["ollama:qwen3:8b"],
  premium: ["openai:gpt-5-mini", "google:gemini-2.5-pro", "openrouter:openai/gpt-5-mini"],
};

const qualityRank: Record<string, number> = {
  openai: 0,
  google: 1,
  groq: 2,
  openrouter: 3,
  ollama: 4,
};

export function splitProvider(modelId: string) {
  const separator = modelId.indexOf(":");
  return separator === -1 ? "" : modelId.slice(0, separator);
}

export function providerConfigured(provider: string) {
  return ({
    openai: !!process.env.OPENAI_API_KEY,
    google: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    groq: !!process.env.GROQ_API_KEY,
    openrouter: !!process.env.OPENROUTER_API_KEY,
    ollama: !!process.env.OLLAMA_BASE_URL,
  } as Record<string, boolean>)[provider] ?? false;
}

export function orderedCandidates(intent: ModelIntent, mode: RoutingMode = "free-first") {
  const override = process.env[`MODEL_${intent.toUpperCase()}`];
  const base = override ? [override, ...defaults[intent]] : [...defaults[intent]];
  if (mode === "local-only") return base.filter((id) => id.startsWith("ollama:"));
  if (mode === "quality-first") {
    return [...base].sort((a, b) => (qualityRank[splitProvider(a)] ?? 99) - (qualityRank[splitProvider(b)] ?? 99));
  }
  return base;
}
