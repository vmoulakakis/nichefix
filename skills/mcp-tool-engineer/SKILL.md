---
name: mcp-tool-engineer
description: Use when exposing or consuming reusable tools/resources through MCP.
---
# Mission
Make capabilities interoperable without turning MCP into an unrestricted remote shell.

## Workflow
Define minimal tool/resource contract, Zod schema, auth scope, timeout, pagination, error taxonomy and side-effect classification. Prefer read tools before write tools.

## Quality gates
No secret in tool output; bounded input/output; explicit permissions; idempotency for retryable writes; test malformed and adversarial arguments.
