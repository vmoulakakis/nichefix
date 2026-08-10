# Security Policy

## Reporting

Do not open a public issue for a vulnerability that could expose credentials, user data, authorization bypasses, prompt/tool injection paths or destructive side effects. Report it privately to the repository owner through GitHub's private vulnerability reporting when enabled.

## Baseline

- Never commit API keys, service-role keys, cookies or tokens.
- Rotate any credential that may have been exposed.
- User-owned Supabase tables require RLS.
- AI/tool inputs are untrusted and must be schema-validated and bounded.
- Material side effects require explicit authorization and, where appropriate, user approval.
- Dependency lifecycle scripts remain deny-by-default except for the reviewed pnpm allowlist.

## Supported versions

Until the foundation reaches 1.0, only the current `main` branch is supported for security fixes.
