# Observability Contract

Business code must not depend directly on a tracing vendor. It emits normalized run events through `@foundation/observability`; deployment-specific adapters can forward those events to Langfuse/OpenTelemetry later.

## Required fields

Capture correlation/trace ID, kind, operation name, timing and success. Model calls may add provider/model, tokens, estimated cost and fallback count. Tools may add only non-sensitive metadata.

## Privacy

Do not record provider keys, cookies, authorization headers, payment data or raw sensitive personal data. Prompt/body capture is opt-in and should be redacted before export.

## Failure behavior

Telemetry is best-effort. An observability outage must never block a user request.
