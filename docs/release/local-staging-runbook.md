# Iraq Digital Gateway: Local and Staging Runbook

This runbook describes how to build, orchestrate, verify, and monitor the IDG multi-zone gateway platform.

---

## 1. Local and Staging Development Scripts

From the root project directory, use the following commands to orchestrate your workspace:

### Start Services
- **Dev (Frontend & Mock Integrations)**: `npm run dev`
- **Dev (Only Frontend Single Page App)**: `npm run dev:frontend`
- **Dev (Only Pilot Backend Scaffold)**: `npm run dev:backend`
- **Dev (Both simultaneously)**: `npm run dev:all`

### Build Pipeline
- **Build Full Platform**: `npm run build && npm run backend:build`
- **Frontend Assets**: `npm run build:frontend`
- **Backend Scaffold**: `npm run build:backend`

### Compliance & Verification
- **Run Multi-Check Production Gate**: `npm run qa:production-gate`
- **Run Backend Safety Scans**: `npm run backend:qa`
- **Run All Verification Steps (Frontend + Backend)**: `npm run qa:all`
- **Run Local Smoke Test Suite**: `npm run smoke:local`
- **Staging Release Dry Run**: `npm run release:staging-check`

---

## 2. Interpreting the Status "CONDITIONALLY_READY — PROVIDERS REQUIRED"

The decision engine outputs **"CONDITIONALLY_READY — PROVIDERS REQUIRED"** when:
1. The frontend, backend, routes, boundaries, and validation scripts are fully compiled and valid.
2. Safe, unconfigured fallbacks are in use.
3. Live production-grade databases (Federal Oracle clusters, regional Erbil KRG Postgres, and joint interoperability tunnels) have not yet been plugged into the environment.

---

## 3. Advancing to PILOT_READY

To transition from `CONDITIONALLY_READY` to `PILOT_READY`:
1. Deploy real, sovereign-isolated transactional databases for each segment.
2. Feed your database connection URIs into your execution variables inside `.env`:
   - `FEDERAL_DB_URL=postgresql://federal-operational-user@db.gov.iq/idg_federal`
   - `KRG_DB_URL=postgresql://krg-operational-user@db.gov.krd/idg_krg`
   - `JOINT_METADATA_DB_URL=postgresql://reconciliation-ledger@db.joint.gov.iq/idg_joint`
3. Flip the provider environment toggle:
   - `PROVIDER_MODE=OPERATIONAL`
4. Re-run `npm run smoke:local`. Once real endpoint handshakes return successful query responses and live db table reads succeed, the system will elevate automatically to `PILOT_READY` on the governance control center.
