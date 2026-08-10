# AGENTS.md

This repository is operated as an AI SaaS engineering system, not a prompt playground.

## Operating order

1. Understand the user/business outcome.
2. Load only the relevant skill(s) from `skills/`.
3. Inspect existing code and contracts before editing.
4. Prefer deterministic code/tools over LLM calls where possible.
5. Use `@foundation/ai` instead of calling providers directly.
6. Validate all untrusted inputs with Zod or database constraints.
7. Keep secrets server-side and out of source control/logs.
8. Add tests for deterministic logic and evals for model behavior.
9. Run `pnpm check` and `pnpm build` before promotion.
10. Record material architecture decisions in `docs/`.

## AI rules

- Application features request an intent (`fast`, `general`, `reasoning`, `vision`, `local`, `premium`) rather than a vendor model.
- Free models are development/low-volume tools, not an SLA.
- Paid fallback must be explicit and observable.
- No agent loop unless a deterministic workflow is insufficient.
- Tools must have narrow schemas and bounded side effects.
- Never let an LLM construct unrestricted SQL, shell, URLs, or authorization decisions.

## Data rules

- Supabase/Postgres is the default durable system of record.
- RLS is required for user-owned tables.
- Service-role keys are server-only.
- Store the minimum personal data required for the product.
- Do not put secrets or raw credentials in traces.

## Skill loading

Every skill has a `SKILL.md` with mission, workflow, output contract and quality gates. Use the smallest set of skills that covers the task. If skills conflict, security/privacy and architecture constraints win.

## Definition of done

A feature is not done because it renders. It is done when the user flow works, error states are handled, accessibility/security basics are satisfied, deterministic tests pass, AI behavior has an eval when applicable, and deployment configuration is documented.
