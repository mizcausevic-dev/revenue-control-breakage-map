import type {
  BreakageAssessment,
  BreakageSeverity,
  RevenueControlBreakageMapExport,
  RevenueControlBreakageMapItem,
  RevenueControlBreakageMapReportItem
} from "./types.js";

function assessHigh(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): BreakageAssessment {
  let severity: BreakageSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: RevenueControlBreakageMapItem[],
  options: { now?: string } = {}
): RevenueControlBreakageMapExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: RevenueControlBreakageMapReportItem[] = items.map((item) => {
    const breakageAssessment = assessHigh(
      item.breakageScore,
      60,
      74,
      "Revenue controls are holding tightly enough in this lane.",
      "Revenue-control breakage is visible and should be tightened before it compounds.",
      "Breakage is high enough to distort board confidence, reporting, or recovery logic."
    );

    const reconciliationAssessment = assessHigh(
      item.reconciliationLoadScore,
      56,
      70,
      "Reconciliation load is controlled enough to support repeatable reporting.",
      "Reconciliation work is rising and should be simplified.",
      "Too much reconciliation work is leaking time and trust."
    );

    const instrumentationAssessment = assessHigh(
      item.instrumentationGapScore,
      44,
      62,
      "Instrumentation coverage is healthy enough to support executive reporting.",
      "Instrumentation gaps are visible and should be narrowed.",
      "Instrumentation gaps are too wide for clean board-ready reporting."
    );

    const latencyAssessment = assessHigh(
      item.reportingLatencyScore,
      52,
      67,
      "Reporting latency is low enough to keep the lane decision-ready.",
      "Reporting latency is slowing confidence and should be reduced.",
      "Reporting latency is high enough to damage the revenue story."
    );

    const controlAssessment = assessHigh(
      item.controlGapScore,
      48,
      66,
      "Control coverage is strong enough to support current revenue claims.",
      "Control gaps are visible and should be tightened.",
      "Control gaps are materially weakening the revenue and diligence posture."
    );

    const compositeRecoveryScore =
      Math.round(
        ((item.breakageScore +
          item.reconciliationLoadScore +
          item.instrumentationGapScore +
          item.reportingLatencyScore +
          item.controlGapScore) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      breakageAssessment,
      reconciliationAssessment,
      instrumentationAssessment,
      latencyAssessment,
      controlAssessment,
      compositeRecoveryScore
    };
  });

  const highBreakageLanes = reportItems.filter((item) => item.breakageAssessment.severity !== "LOW").length;
  const resetRequiredLanes = reportItems.filter(
    (item) => item.controlAssessment.severity === "HIGH" || item.instrumentationAssessment.severity === "HIGH"
  ).length;
  const severeLeakageHotspots = reportItems.filter(
    (item) => item.breakageAssessment.severity === "HIGH" || item.latencyAssessment.severity === "HIGH"
  ).length;
  const averageBreakageScore =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.breakageScore, 0) / reportItems.length) * 10) / 10;
  const recoverableRevenueMillions = reportItems.reduce((sum, item) => sum + item.recoverableRevenueMillions, 0);

  const leadingMessage =
    resetRequiredLanes >= 2
      ? "Revenue demand exists, but too many lanes still lose trust and recoverable value to control gaps, reporting fragmentation, and instrumentation drift."
      : severeLeakageHotspots >= 3
        ? "The revenue story is directionally strong, but breakage and reporting latency are still eroding confidence across too many lanes."
        : "The revenue-control posture is mostly contained, though a few lanes still need tighter reporting, cleaner reconciliation, and better control coverage."
  ;

  return {
    generatedAt,
    summary: {
      systemsTracked: reportItems.length,
      highBreakageLanes,
      resetRequiredLanes,
      severeLeakageHotspots,
      averageBreakageScore,
      recoverableRevenueMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: RevenueControlBreakageMapItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
