export type BreakageDimension =
  | "ATTRIBUTION_DRIFT"
  | "REPORTING_FRAGMENTATION"
  | "CONTROL_GAP"
  | "PAYMENT_LEAKAGE"
  | "FORECAST_MISMATCH"
  | "PIPELINE_BLIND_SPOT";

export type BreakageAction = "RECONCILE" | "STANDARDIZE" | "INSTRUMENT" | "ESCALATE" | "CONTAIN";

export type BreakageSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface RevenueControlBreakageMapItem {
  id: string;
  lane: string;
  dimension: BreakageDimension;
  action: BreakageAction;
  operatingCluster: string;
  breakageTier: "CONTROLLED" | "PRESSURED" | "CONSTRAINED" | "BROKEN";
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  breakageNarrative: string;
  operatingReality: string;
  riskHeadline: string;
  breakageSignal: string;
  blockingIssue: string;
  evidenceArtifacts: string[];
  opportunityMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  breakageScore: number;
  reconciliationLoadScore: number;
  instrumentationGapScore: number;
  reportingLatencyScore: number;
  controlGapScore: number;
  recoverableRevenueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface BreakageAssessment {
  severity: BreakageSeverity;
  ok: boolean;
  message: string;
}

export interface RevenueControlBreakageMapReportItem extends RevenueControlBreakageMapItem {
  breakageAssessment: BreakageAssessment;
  reconciliationAssessment: BreakageAssessment;
  instrumentationAssessment: BreakageAssessment;
  latencyAssessment: BreakageAssessment;
  controlAssessment: BreakageAssessment;
  compositeRecoveryScore: number;
}

export interface RevenueControlBreakageMapSummary {
  systemsTracked: number;
  highBreakageLanes: number;
  resetRequiredLanes: number;
  severeLeakageHotspots: number;
  averageBreakageScore: number;
  recoverableRevenueMillions: number;
  leadingMessage: string;
}

export interface RevenueControlBreakageMapExport {
  generatedAt: string;
  summary: RevenueControlBreakageMapSummary;
  items: RevenueControlBreakageMapReportItem[];
}

export interface RevenueControlBreakageMapPayload {
  report: RevenueControlBreakageMapExport;
  breakageRegister: ReturnType<typeof import("./services/verticalBriefService.js").breakageRegister>;
  controlTiers: ReturnType<typeof import("./services/verticalBriefService.js").controlTiers>;
  remediationPosture: ReturnType<typeof import("./services/verticalBriefService.js").remediationPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: RevenueControlBreakageMapItem[];
}
