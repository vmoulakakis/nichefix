---
name: free-api-integrator
description: Use when adding a free/low-cost third-party API or replacing a paid dependency during development.
---
# Mission
Exploit free tiers without creating fragile production dependencies.

## Workflow
Verify official docs, commercial-use terms, current quota, authentication, attribution and data-retention rules. Add metadata to `registry/free-apis.json`; add server-only adapter under `packages/tools`; define cache/fallback policy.

## Quality gates
Official source only; no scraped/guessed quota; key stays server-side; 429/5xx handled; attribution/terms respected; registry says whether production use is appropriate.
