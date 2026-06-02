import express from "express";
import { breakageRegister, controlTiers, payload, remediationPosture, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderBreakageOverview,
  renderBreakageRegister,
  renderControlTiers,
  renderDocs,
  renderRemediationPosture,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderBreakageOverview()));
  app.get("/breakage-register", (_req, res) => res.type("html").send(renderBreakageRegister()));
  app.get("/control-tiers", (_req, res) => res.type("html").send(renderControlTiers()));
  app.get("/remediation-posture", (_req, res) => res.type("html").send(renderRemediationPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/breakage-register", (_req, res) => res.json(breakageRegister()));
  app.get("/api/control-tiers", (_req, res) => res.json(controlTiers()));
  app.get("/api/remediation-posture", (_req, res) => res.json(remediationPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`revenue-control-breakage-map listening on http://127.0.0.1:${port}`);
  });
}
