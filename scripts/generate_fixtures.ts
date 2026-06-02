import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleRevenueControlBreakageMap } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "revenue-control-breakage-map.json"), { force: true });
rmSync(path.join(fixturesDir, "revenue-control-breakage-map-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "revenue-control-breakage-map.json"),
  JSON.stringify(sampleRevenueControlBreakageMap, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "revenue-control-breakage-map-clean.json"),
  JSON.stringify(
    sampleRevenueControlBreakageMap.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
