import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleRevenueControlBreakageMap } from "../src/data/sampleVerticalBrief.js";
import type { RevenueControlBreakageMapItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleRevenueControlBreakageMap, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleRevenueControlBreakageMap.length);
  });

  it("counts high-breakage lanes", () => {
    const report = analyze(sampleRevenueControlBreakageMap, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.highBreakageLanes).toBeGreaterThan(0);
  });

  it("counts reset-required lanes", () => {
    const report = analyze(sampleRevenueControlBreakageMap, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.resetRequiredLanes).toBeGreaterThan(0);
  });

  it("sums recoverable revenue", () => {
    const report = analyze(sampleRevenueControlBreakageMap, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.recoverableRevenueMillions).toBe(74);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleRevenueControlBreakageMap, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.systemsTracked).toBe(0);
    expect(report.summary.averageBreakageScore).toBe(0);
    expect(report.summary.leadingMessage).toContain("mostly contained");
  });

  it("hits low and medium branches explicitly", () => {
    const fixtures: RevenueControlBreakageMapItem[] = [
      {
        id: "low-branch",
        lane: "Stable lane",
        dimension: "ATTRIBUTION_DRIFT",
        action: "RECONCILE",
        operatingCluster: "AI governance",
        breakageTier: "CONTROLLED",
        boardQuestion: "Is this lane stable enough to keep moving?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Controlled.",
        breakageNarrative: "This lane is controlled.",
        operatingReality: "Healthy.",
        riskHeadline: "Low breakage risk.",
        breakageSignal: "Minimal drift.",
        blockingIssue: "None",
        evidenceArtifacts: ["memo"],
        opportunityMoves: ["leave it alone"],
        relatedSurfaces: ["scorecard.kineticgain.com"],
        companyTags: ["Google"],
        breakageScore: 50,
        reconciliationLoadScore: 48,
        instrumentationGapScore: 30,
        reportingLatencyScore: 51,
        controlGapScore: 32,
        recoverableRevenueMillions: 4,
        headline: "Stable lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the lane stable."
      },
      {
        id: "medium-branch",
        lane: "Pressured lane",
        dimension: "REPORTING_FRAGMENTATION",
        action: "STANDARDIZE",
        operatingCluster: "FinTech",
        breakageTier: "PRESSURED",
        boardQuestion: "Where is the breakage visible but not yet broken?",
        owner: "Revenue owner",
        audience: "Finance committee",
        currentPosture: "Watch state.",
        breakageNarrative: "The lane is pressured.",
        operatingReality: "Some fragmentation.",
        riskHeadline: "Moderate breakage risk.",
        breakageSignal: "A few reporting mismatches.",
        blockingIssue: "Workflow duplication",
        evidenceArtifacts: ["control audit"],
        opportunityMoves: ["collapse duplicate reporting"],
        relatedSurfaces: ["merchant.kineticgain.com"],
        companyTags: ["Tableau"],
        breakageScore: 70,
        reconciliationLoadScore: 68,
        instrumentationGapScore: 50,
        reportingLatencyScore: 63,
        controlGapScore: 54,
        recoverableRevenueMillions: 7,
        headline: "Pressured lane.",
        narrative: "Medium branch test.",
        nextMove: "Collapse duplicate reporting."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].breakageAssessment.severity).toBe("LOW");
    expect(report.items[0].reconciliationAssessment.severity).toBe("LOW");
    expect(report.items[1].breakageAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].reconciliationAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].instrumentationAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].latencyAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].controlAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("mostly contained");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleRevenueControlBreakageMap, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.systemsTracked).toBe(sampleRevenueControlBreakageMap.length);
  });
});
