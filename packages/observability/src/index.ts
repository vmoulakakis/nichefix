export type RunKind = "request" | "agent" | "model" | "tool";

export type RunEvent = {
  traceId: string;
  kind: RunKind;
  name: string;
  startedAt: string;
  completedAt?: string;
  success?: boolean;
  latencyMs?: number;
  provider?: string;
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
  costUsd?: number;
  fallbackCount?: number;
  metadata?: Record<string, string | number | boolean | null>;
};

export interface ObservabilitySink {
  emit(event: RunEvent): void | Promise<void>;
}

export const noopObservability: ObservabilitySink = { emit: () => undefined };

export function createTraceId() {
  return crypto.randomUUID();
}

export async function safeEmit(sink: ObservabilitySink, event: RunEvent) {
  try {
    await sink.emit(event);
  } catch {
    // Telemetry must never fail the user request.
  }
}
