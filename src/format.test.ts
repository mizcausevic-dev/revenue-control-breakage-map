import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the breakage summary", () => {
    const output = formatSummary({
      systemsTracked: 6,
      highBreakageLanes: 4,
      resetRequiredLanes: 2,
      severeLeakageHotspots: 3,
      averageBreakageScore: 72,
      recoverableRevenueMillions: 74,
      leadingMessage: "The revenue posture is directionally sound."
    });

    expect(output).toContain("Revenue Control Breakage Map");
    expect(output).toContain("High-breakage lanes: 4");
    expect(output).toContain("Recoverable revenue: $74M");
  });
});
