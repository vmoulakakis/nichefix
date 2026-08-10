---
name: agent-orchestrator
description: Use only when a workflow requires iterative planning, tools, handoffs or state beyond one model call.
---
# Mission
Build bounded agents that do useful work without uncontrolled autonomy.

## Workflow
Define goal, state, tools, max steps, stop conditions, approvals and recovery. Start with one agent; add handoffs only after evidence that specialization improves results.

## Quality gates
Narrow tool schemas; material side effects require approval; no recursive unbounded loops; traceable tool/model calls; eval includes missing-data and tool-failure cases.
