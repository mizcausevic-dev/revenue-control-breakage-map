import { describe, expect, it } from "vitest";
import {
  renderBreakageOverview,
  renderBreakageRegister,
  renderControlTiers,
  renderDocs,
  renderRemediationPosture,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderBreakageOverview()).toContain("Revenue Control Breakage Map");
  });

  it("renders the breakage register route", () => {
    expect(renderBreakageRegister()).toContain("/breakage-register");
  });

  it("renders the control tiers route", () => {
    expect(renderControlTiers()).toContain("/control-tiers");
  });

  it("renders the remediation posture route", () => {
    expect(renderRemediationPosture()).toContain("/remediation-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic revenue-control data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
