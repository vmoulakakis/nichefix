import { describe, expect, it } from "vitest";
import { safeEmit, type ObservabilitySink } from "./index";

describe("observability", () => {
  it("never propagates sink failures", async () => {
    const sink: ObservabilitySink = { emit: () => { throw new Error("telemetry down"); } };
    await expect(safeEmit(sink, { traceId: "test", kind: "request", name: "smoke", startedAt: new Date().toISOString() })).resolves.toBeUndefined();
  });
});
