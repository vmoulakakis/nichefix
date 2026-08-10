# Skill System

Skills are operational playbooks for the AI development team. They are intentionally vendor-neutral and live in the repository so engineering behavior is versioned with the code.

## Loading rule

Load the smallest set of skills required by the task. `security-privacy-reviewer` can override convenience decisions. `solution-architect` owns cross-package boundaries.

## Catalog

- solution-architect
- product-strategist
- ai-system-designer
- model-router-engineer
- agent-orchestrator
- mcp-tool-engineer
- free-api-integrator
- supabase-engineer
- frontend-engineer
- backend-engineer
- ui-ux-guru
- qa-evals-engineer
- observability-engineer
- security-privacy-reviewer
- vercel-devops

Upstream references are pinned in `registry/upstream-skills.lock.json`; they are references, not silently vendored dependencies.
