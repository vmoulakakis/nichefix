export { Agent, run, tool } from "@openai/agents";

export const agentPolicy = {
  rule: "Use an agent loop only when a bounded deterministic workflow is insufficient.",
  requirements: ["narrow tools", "bounded turns", "structured state", "human approval for material side effects", "eval coverage"],
} as const;
