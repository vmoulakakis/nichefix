import { afterEach, describe, expect, it, vi } from "vitest";
import { isRegistryModelId, orderedCandidates, providerConfigured } from "./policy";

afterEach(() => vi.unstubAllEnvs());

describe("model policy", () => {
  it("keeps a free provider first for general development", () => {
    expect(orderedCandidates("general", "free-first")[0]).toContain("openrouter:");
  });

  it("detects configured providers from env", () => {
    vi.stubEnv("GROQ_API_KEY", "test");
    expect(providerConfigured("groq")).toBe(true);
  });

  it("can force local-only routing", () => {
    expect(orderedCandidates("general", "local-only").every((id) => id.startsWith("ollama:"))).toBe(
      true,
    );
  });

  it("rejects malformed registry model identifiers", () => {
    expect(isRegistryModelId("not-a-model-id")).toBe(false);
    expect(isRegistryModelId("groq:model-name")).toBe(true);
  });
});
