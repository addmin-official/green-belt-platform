# Iraq Digital Gateway (IDG) — Pilot Dry-Run & Role-Based UAT Guide

This guide describes how to execute the safe Pilot Dry-Run and Role-Based User Acceptance Testing (UAT) flow.

## 1. Objectives of the Dry-Run
The pilot dry-run validates the sovereign border, customs, and revenue system controls prior to connecting production government databases. 

To maintain total administrative security and respect international law, this simulation:
- **Never fabricates operational records.**
- **Does not leak or simulate sensitive government data.**
- **Prohibits fictitious personnel or political figures.**

It strictly tests security and layout architecture: User roles, access boundaries, localization directionality (RTL/LTR), regional boundaries, and connection state honesty.

---

## 2. How to Run the Dry-Run Simulators
1. Open the **Production Readiness Gate / Presentation Control Panel** in the system dashboard.
2. Scroll to the **Phase 5.11 — Pilot UAT Dry-Run Simulator** panel.
3. Click through the available **Active Simulative Roles** to swap user contexts on-the-fly.
4. Interact with different tabs:
   - **Test Scenarios**: Reviews non-data behavioral outcomes of active roles.
   - **Boundary Matrix**: Dynamically inputs targeted zones (e.g., Federal vs. KRG private zones) to inspect if the central guard blocks cross-border leakages. 
   - **Language Check**: Validates the application of local languages (`ar`, `ku`, `en`) and proper layout directions (Arabic & Kurdish RTL, English LTR) without resetting active security contexts.
   - **Provider Sincerity Check**: Assures that unconfigured databases show a clear, honest status instead of simulated success metrics.

---

## 3. Simulative Roles to Validate
- **Federal Executive Viewer** (FEDERAL_IRAQ): Only authorized to view national aggregates. Blocked from KRG raw regional data.
- **KRG Executive Viewer** (KRG): Authorized to view Kurdistan regional systems. Blocked from Federal raw central files.
- **Joint Auditor** (JOINT_OPERATIONS): Authorized to verify cross-border transaction aggregates and safe SHA-256 metadata hashes. **Strictly blocked from raw revenue, customs, workforce, identity, security, or intelligence logs on both sides.**
- **Federal Customs Officer** (FEDERAL_IRAQ): Manages border checkpoints under Federal mandate. Automatically barred from regional KRG systems.
- **KRG Customs Officer** (KRG): Operates KRG autonomous checkpoints. Barred from central Federal systems.
- **Border Operator** (JOINT_OPERATIONS): Works at joint checkpoints evaluating manifests. Prevented from browsing private databases.
- **Security Analyst** (JOINT_OPERATIONS): Monitores compliance certificate logs. Prevented from reading financial ledgers.
- **Technical Administrator** (ALL_SYSTEM): Manages routing tables and server configurations. **Unauthorized to view any sovereign raw financial or workforce records.**

---

## 4. Understanding Boundaries & Denials
- Any cross-border query or unauthorized access attempt by joint or regional operators does not return empty arrays or fake mock grids.
- Instead, the request is intercepted at the controller level and triggers an explicit, secure **BLOCKED** or **DENIED** response with a journal audit emit code (e.g., `BLOCK_FEDERAL_READING_KRG`, `ENFORCE_JOINT_SOVEREIGN_ISOLATION`).

---

## 5. Identifying Sincerity States (`NOT_CONFIGURED`)
- **NOT_CONFIGURED**: This state is shown honestly when backend database pools are unlinked. We do not use mock adapters to simulate database handshakes.
- **UNAVAILABLE**: Displays if a backend microservice scaffold is completely offline.
- **READY**: Only active when real, healthy, authenticated government servers are linked and pass the provider contract validation suite.

---

## 6. Why This is NOT Yet `PILOT_READY`
The gateway is currently in the state:
`CONDITIONALLY_READY — PILOT DRY-RUN READY, PROVIDERS REQUIRED`

It remains conditionally ready because the physical data conduits of the relevant ministries (Federal and KRG) have not yet been plugged in. 

### To achieve FULL `PILOT_READY`:
1. Physical VPN tunnels and mutual TLS handshake certificates must be completed.
2. Real PostgreSQL and Oracle database connection strings must replace placeholders.
3. Live health requests must pass the `ProviderReadinessReport` checks.
