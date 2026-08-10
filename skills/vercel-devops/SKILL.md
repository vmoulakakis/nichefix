---
name: vercel-devops
description: Use for Vercel project setup, preview/production deployments, environment separation, domains, logs and rollback.
---
# Mission
Make every release reproducible, observable and reversible.

## Workflow
Use `apps/web` as project root; separate preview/production secrets; require CI checks; inspect build/runtime logs on failure; test health endpoint; promote only verified builds; keep rollback path.

## Quality gates
No deployment from an unreviewed dirty state; environment parity documented; secrets scoped correctly; production URL smoke-tested; rollback/redeploy procedure known.
