# Iraq Digital Gateway (IDG) — Executive One-Page Brief

**Document Reference:** IDG-EXEC-001  
**Classification:** RESTRICTED - STAKEHOLDER DEBRIEF  

---

## 1. Vision & Purpose
The **Iraq Digital Gateway (IDG)** is a secure, cloud-native coordination portal designed to serve as the unified customs validation, transit verification, and transaction reconciliation bridge for international trade. 

By implementing strict, cryptographically isolated zones, IDG facilitates digital modernization and customs clearance auditing without centralizing database records.

---

## 2. Core Problem Solved
Historically, bi-directional border crossings suffer from manual validation delays, divergent cargo manifest protocols, and high auditing workloads. Attempts to resolve these issues with single centralized servers fail due to sovereign data policies.

**IDG solves this with a split-perimeter gateway:**
- **Federal Iraq Zone:** Private, isolated records managing central customs rules.
- **Kurdistan Region (KRG) Zone:** Private, isolated records managing regional customs posts.
- **Joint Operations Layer:** A shared, metadata-only coordination ledger.

---

## 3. Strict Sovereign Data Isolation
IDG enforces a zero-raw-data-sharing policy:
- **KRG Data Sovereignty:** Raw identity registers (including OIDC claims via KRDPASS) and corporate registration dossiers (via BRS) remain strictly constrained inside KRG database pools.
- **No Cross-Jurisdictional Reads:** Federal systems cannot directly query KRG databases, and KRG operators cannot traverse Federal environments.
- **Cryptographic Trust:** The Joint Operations Layer never receives raw financial ledger lines or workforce dossiers. It exchanges exclusively SHA-256 validation fingerprints and audited workflow states (e.g., `VERIFIED`, `DECLINED`) to reconcile transit logs.

---

## 4. Current Deployment Phase & Sincerity State
*IDG is currently in the following state:*  
`CONDITIONALLY_READY — EXECUTIVE PITCH PACKAGE READY, PROVIDERS REQUIRED`

- **Dry-Run Readiness:** The visual styling, directional layouts (English LTR, Arabic/Kurdish RTL), API contracts, and sovereignty guards are fully coded and pass standard lint pipelines.
- **Provider Approval Loop:** Physical production connection strings remain offline as we await administrative directives from the KRG Department of IT (DIT).
- **The Staging Pilot Strategy:** Engagement starts with a zero-data dry-run simulation using isolation checkers to prove that our code filters out forbidden records before a single actual channel is opened.
