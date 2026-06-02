# Architecture

Revenue Control Breakage Map is a static-friendly TypeScript executive-intelligence surface for exposing attribution drift, reporting fragmentation, control gaps, payment leakage, and recoverable revenue across the broader Kinetic Gain suite.

## Routes

- `/`
- `/breakage-register`
- `/control-tiers`
- `/remediation-posture`
- `/verification`
- `/docs`

## Flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic commercial lanes with breakage tiers, blocking issues, and recoverable-revenue signals.
2. `src/analyze.ts` converts those signals into board-readable breakage assessments and a composite recovery score.
3. `src/services/verticalBriefService.ts` shapes the breakage register, control tiers, remediation posture, and JSON payload routes.
4. `src/services/render.ts` turns those outputs into the static HTML views used in the published surface.

## Output contract

The surface publishes:

- board-readable HTML routes for overview, breakage register, control tiers, remediation posture, verification, and docs
- JSON routes for summary, breakage register, control tiers, remediation posture, verification, and full payload export
- generated screenshots and fixtures for README packaging and safe product proof
