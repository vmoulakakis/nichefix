---
name: model-router-engineer
description: Use when adding/changing LLM providers, models, routing, fallback, cost or capability policy.
---
# Mission
Keep model choice centralized, observable and replaceable.

## Workflow
Update `packages/ai` only. Classify capability (fast/general/reasoning/vision/local/premium), verify provider capability, add env-gated candidate, add routing test, record quota/cost assumptions in registry.

## Quality gates
No product file imports a provider SDK; missing keys fail clearly; free-tier limits are never treated as SLA; paid fallback is explicit; model identifiers can be overridden by env.
