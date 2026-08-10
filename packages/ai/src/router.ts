import { generateText } from "ai";
import { orderedCandidates, providerConfigured, type ModelIntent, type RoutingMode, splitProvider } from "./policy";
import { registry } from "./registry";

export function resolveModelId(intent: ModelIntent, mode = (process.env.AI_ROUTING_MODE as RoutingMode | undefined) ?? "free-first") {
  const id = orderedCandidates(intent, mode).find((candidate) => providerConfigured(splitProvider(candidate)));
  if (!id) throw new Error(`No configured provider can satisfy intent: ${intent}`);
  return id;
}

export function getModel(intent: ModelIntent, mode?: RoutingMode) { return registry.languageModel(resolveModelId(intent, mode)); }

export async function generateWithPolicy(input: { prompt: string; intent: ModelIntent }) {
  const modelId = resolveModelId(input.intent);
  const result = await generateText({ model: registry.languageModel(modelId), prompt: input.prompt });
  return { text: result.text, usage: result.usage, modelId };
}

export function providerStatus() {
  return Object.fromEntries(["ollama", "openrouter", "groq", "google", "openai"].map((p) => [p, providerConfigured(p)]));
}
