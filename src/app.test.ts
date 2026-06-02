import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("revenue-control-breakage-map app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Revenue Control Breakage Map");
  });

  it("serves the breakage register route", async () => {
    const response = await request(app).get("/breakage-register");
    expect(response.status).toBe(200);
  });

  it("serves the control tiers route", async () => {
    const response = await request(app).get("/control-tiers");
    expect(response.status).toBe(200);
  });

  it("serves the remediation posture route", async () => {
    const response = await request(app).get("/remediation-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.systemsTracked).toBeGreaterThan(0);
  });

  it("serves the breakage register API", async () => {
    const response = await request(app).get("/api/breakage-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the control tiers API", async () => {
    const response = await request(app).get("/api/control-tiers");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
