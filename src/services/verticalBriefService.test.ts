import { describe, expect, it } from "vitest";
import { breakageRegister, controlTiers, payload, remediationPosture, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the breakage summary", () => {
    expect(summary().systemsTracked).toBeGreaterThan(0);
  });

  it("returns the breakage register view", () => {
    expect(breakageRegister().length).toBeGreaterThan(0);
  });

  it("returns the control tiers view", () => {
    expect(controlTiers().length).toBeGreaterThan(0);
  });

  it("returns the remediation posture view", () => {
    expect(remediationPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.systemsTracked).toBeGreaterThan(0);
  });
});
