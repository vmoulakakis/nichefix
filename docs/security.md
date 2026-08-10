# Security & Privacy Baseline

- Deny by default; grant the minimum database/tool permission.
- User-owned Supabase tables require RLS.
- Service-role keys and provider keys are server-only.
- Treat prompts, retrieved web content and tool results as untrusted input.
- Validate tool arguments with schemas and cap sizes, timeouts, result counts and retries.
- Never execute LLM-generated SQL/shell/URLs without deterministic validation.
- Strip secrets, tokens and sensitive personal data from traces.
- Require explicit user approval for purchases, sends, deletes, publishing and other material side effects.
- Do not infer protected/sensitive traits unless the product genuinely requires and lawfully permits it.
- Add rate limiting and abuse controls before exposing AI endpoints publicly.
- Maintain dependency and upstream-skill review as part of the release process.
- pnpm lifecycle scripts are deny-by-default; `onlyBuiltDependencies` is an explicit reviewed allowlist and must not be replaced by `dangerouslyAllowAllBuilds`.
