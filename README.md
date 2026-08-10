# AI SaaS Foundation

Reusable, provider-neutral foundation for building production AI SaaS products.

## Principles

- **Product first:** solve a user problem before adding AI.
- **Provider neutral:** application code asks for capabilities, not vendor model names.
- **Free-first development:** Ollama/OpenRouter/Groq/Google can power development; production routing is explicit.
- **Skill-driven execution:** repeatable engineering practices live in `skills/`.
- **Supabase as the default data plane:** Postgres, Auth, Storage, Realtime and pgvector when needed.
- **Vercel-ready:** `apps/web` is a Next.js App Router application.
- **Evals before promotion:** AI behavior changes need tests/evals before production.
- **Secrets never enter Git.**

## Stack

- Node.js 24 LTS
- pnpm 11 workspaces
- Next.js 16 / React 19 / TypeScript 7
- Vercel AI SDK 7 provider registry
- OpenAI Agents SDK (opt-in for agent loops)
- MCP TypeScript SDK for interoperable tools
- Supabase
- Vitest + Promptfoo
- Biome
- Langfuse-ready observability contract

## Structure

```text
apps/web/          Next.js UI + route handlers
packages/ai/       provider registry, capability routing, model policy
packages/agents/   opt-in agent orchestration primitives
packages/tools/    free API/tool adapters and registry
packages/db/       Supabase clients
registry/          reviewed provider/API/upstream metadata
skills/            operational skills for the AI development team
supabase/          migrations
evals/             behavioral evaluation assets
docs/              architecture, deployment and security
```

## Bootstrap

```bash
corepack enable
corepack prepare pnpm@11.17.0 --activate
pnpm install
cp .env.example .env.local
pnpm dev
```

The web shell works without AI credentials. `/api/ai` returns a clear configuration error until at least one model provider is configured.

## Free-first provider order

Set `AI_ROUTING_MODE=free-first` and configure one or more of:

- `OLLAMA_BASE_URL` for local inference
- `OPENROUTER_API_KEY` for `openrouter/free`
- `GROQ_API_KEY`
- `GOOGLE_GENERATIVE_AI_API_KEY`

`OPENAI_API_KEY` is optional and reserved for tasks where a paid/premium model is explicitly justified.

## Quality gate

Before merging a feature:

```bash
pnpm check
pnpm build
```

For AI behavior changes, add or update eval cases as well.
