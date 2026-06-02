import { analyze } from "../analyze.js";
import { sampleRevenueControlBreakageMap } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleRevenueControlBreakageMap, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Reconcile AI attribution, instrument procurement drag, standardize biotech reporting, contain FinTech payment leakage, tighten nonprofit renewal forecasting, and narrow robotics revenue claims until the control packet is stronger."
  };
}

export function breakageRegister() {
  return sampleRevenueControlBreakageMap.map((item) => ({
    lane: item.lane,
    operatingCluster: item.operatingCluster,
    breakageTier: item.breakageTier,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    breakageNarrative: item.breakageNarrative,
    breakageScore: item.breakageScore,
    nextMove: item.nextMove
  }));
}

export function controlTiers() {
  return sampleRevenueControlBreakageMap.map((item) => ({
    lane: item.lane,
    breakageTier: item.breakageTier,
    dimension: item.dimension,
    riskHeadline: item.riskHeadline,
    breakageSignal: item.breakageSignal,
    blockingIssue: item.blockingIssue,
    evidenceArtifacts: item.evidenceArtifacts,
    breakageScore: item.breakageScore,
    reconciliationLoadScore: item.reconciliationLoadScore,
    instrumentationGapScore: item.instrumentationGapScore,
    reportingLatencyScore: item.reportingLatencyScore,
    controlGapScore: item.controlGapScore
  }));
}

export function remediationPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeRecoveryScore: item.compositeRecoveryScore,
    owner: item.owner,
    recoverableRevenueMillions: item.recoverableRevenueMillions,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    dimension: item.dimension,
    compositeRecoveryScore: item.compositeRecoveryScore,
    recoverableRevenueMillions: item.recoverableRevenueMillions,
    breakageScore: item.breakageScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic revenue-control data only - no live customer contracts, CRM exports, billing records, or board materials are included.",
    "Scores are modeled to show how Kinetic Gain can expose attribution drift, reporting fragmentation, control gaps, and leakage risk in one board-readable revenue surface.",
    "All routes are read-only and demonstrate executive revenue diagnosis, not production finance advice, accounting treatment, or live forecasting instructions."
  ];
}

export function payload() {
  return {
    report,
    breakageRegister: breakageRegister(),
    controlTiers: controlTiers(),
    remediationPosture: remediationPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleRevenueControlBreakageMap
  };
}
