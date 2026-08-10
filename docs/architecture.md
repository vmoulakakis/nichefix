# Architecture

## Boundary rule

Product code may depend on foundation packages. Foundation packages must not depend on product domains.

```text
UI / API routes
      |
      v
@foundation/ai ---- @foundation/tools
      |                    |
      v                    v
model providers          external APIs / MCP
      |
      v
@foundation/db -> Supabase/Postgres
```

## Model decision

Features request an intent, not a model name. `packages/ai` resolves the model using configured providers and `AI_ROUTING_MODE`.

- `free-first`: development/default low-cost path
- `quality-first`: premium providers may be considered first
- `local-only`: never leaves the local Ollama endpoint

## Agent decision

Start deterministic. Add an agent loop only when the workflow genuinely requires iterative planning/tool use. Every side-effecting agent tool must have a narrow schema and an approval strategy.

## Delivery lifecycle

```text
problem -> product brief -> architecture -> implementation -> deterministic tests -> AI evals -> security/privacy review -> preview -> production
```

No stage may silently change the contracts of the previous stage.
