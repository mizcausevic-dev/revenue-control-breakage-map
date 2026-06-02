import type { RevenueControlBreakageMapSummary } from "./types.js";

export function formatSummary(
  summary: RevenueControlBreakageMapSummary,
  title = "Revenue Control Breakage Map"
) {
  return [
    title,
    `Systems tracked: ${summary.systemsTracked}`,
    `High-breakage lanes: ${summary.highBreakageLanes}`,
    `Reset-required lanes: ${summary.resetRequiredLanes}`,
    `Severe leakage hotspots: ${summary.severeLeakageHotspots}`,
    `Average breakage score: ${summary.averageBreakageScore}`,
    `Recoverable revenue: $${summary.recoverableRevenueMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
