export const modelIntents = ["fast", "general", "reasoning", "vision", "local", "premium"] as const;
export type ModelIntent = (typeof modelIntents)[number];
export type RoutingMode = "free-first" | "quality-first" | "local-only";

export const providerIds = ["openai", "google", "groq", "openrouter", "ollama"] as const;
export type ProviderId = (typeof providerIds)[number];
export type RegistryModelId = `${ProviderId}:${string}`;

const defaults: Record<ModelIntent, RegistryModelId[]> = {
  fast: ["groq:openai/gpt-oss-20b", "openrouter:openrouter/free", "google:gemini-2.5-flash", "ollama:qwen3:8b"],
  general: ["openrouter:openrouter/free", "google:gemini-2.5-flash", "groq:openai/gpt-oss-20b", "ollama:qwen3:8b"],
  reasoning: ["groq:openai/gpt-oss-120b", "openrouter:openrouter/free", "google:gemini-2.5-pro", "openai:gpt-5-mini"],
  vision: ["openrouter:openrouter/free", "google:gemini-2.5-flash", "openai:gpt-5-mini"],
  local: ["ollama:qwen3:8b"],
  premium: ["openai:gpt-5-mini", "google:gemini-2.5-pro", "openrouter:openai/gpt-5-mini"],
};

const qualityRank: Record<ProviderId, number> = {
  openai: 0,
  google: 1,
  groq: 2,
  openrouter: 3,
  ollama: 4,
};

export function isProviderId(value: string): value is ProviderId {
  return (providerIds as readonly string[]).includes(value);
}

export function isRegistryModelId(value: string): value is RegistryModelId {
  const separator = value.indexOf(":");
  if (separator <= 0 || separator === value.length - 1) return false;
  return isProviderId(value.slice(0, separator));
}

export function splitProvider(modelId: RegistryModelId): ProviderId {
  return modelId.slice(0, modelId.indexOf(":")) as ProviderId;
}

export function providerConfigured(provider: ProviderId) {
  return {
    openai: !!process.env.OPENAI_API_KEY,
    google: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    groq: !!process.env.GROQ_API_KEY,
    openrouter: !!process.env.OPENROUTER_API_KEY,
    ollama: !!process.env.OLLAMA_BASE_URL,
  }[provider];
}

export function orderedCandidates(intent: ModelIntent, mode: RoutingMode = "free-first"): RegistryModelId[] {
  const rawOverride = process.env[`MODEL_${intent.toUpperCase()}`];
  if (rawOverride && !isRegistryModelId(rawOverride)) {
    throw new Error(`Invalid MODEL_${intent.toUpperCase()} value. Expected provider:model.`);
  }
  const base: RegistryModelId[] = rawOverride ? [rawOverride, ...defaults[intent]] : [...defaults[intent]];
  if (mode === "local-only") return base.filter((id) => id.startsWith("ollama:"));
  if (mode === "quality-first") {
    return [...base].sort((a, b) => qualityRank[splitProvider(a)] - qualityRank[splitProvider(b)]);
  }
  return base;
}
