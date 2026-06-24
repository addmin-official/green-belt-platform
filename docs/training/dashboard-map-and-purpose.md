# Platform Dashboard Map and System Guide

**Document Reference:** IDG-TRN-MAP-002  
**Classification:** RESTRICTED TRAINING DOCUMENT  
**Topic:** UI Layouts, Panel Mappings, and Access Credentials  

---

## 1. Classification Framework
This map defines the system dashboards and panels within the **Iraq Digital Gateway (IDG)** platform, charting their purposes, intended audiences, and restrictive guidelines.

---

## 2. Dashboard Map Registry

### 1. National Command Center (Executive Dashboard)
- **Dashboard Name:** National Command Center & Strategic Consolidation Console
- **Purpose:** Monitor aggregates of trade flows, transit speed KPIs, overall revenue targets, and regional border coordination indexes.
- **Intended Audience:** Federal Ministers, KRG Cabinet Advisors, Joint Transit Directors.
- **Allowed Roles:** `Federal Executive Viewer`, `KRG Executive Viewer`, `Joint Auditor`.
- **Blocked Roles:** `Federal Customs Officer`, `KRG Customs Officer`, `Border Operator`.
- **Data Sensitivity:** MED-LOW. Shows only aggregated statistics, charts, and SHA-256 state tracking indicators.
- **Jurisdiction Context:** Joint (Metadata-only model, Federal and Regional viewpoints separated via access tokens).
- **Demo Talking Point:** *"This dashboard aggregates performance metrics from both jurisdictions instantly, preserving trust by showing macro-coordination trends without listing high-sensitivity demographic data."*
- **Access Level:** User-facing.
- **Readiness Dependency:** Sandbox-ready. Needs executive clearance before production credentials.

### 2. Border Point Controller (Operational Dashboard)
- **Dashboard Name:** Border Operations & Manifest Clearing Hub
- **Purpose:** Field operators manage actual custom receipts, manifest filings, and physical clearance confirmations.
- **Intended Audience:** On-site customs personnel, border checkpoint officers.
- **Allowed Roles:** `Federal Customs Officer`, `KRG Customs Officer`, `Border Operator`.
- **Blocked Roles:** `Federal Executive Viewer`, `KRG Executive Viewer`.
- **Data Sensitivity:** HIGH (contains cargo inventories, transport details, and regional tariff filings).
- **Jurisdiction Context:** Isolated. Federal Operators see only Federal posts; KRG Operators see only KRG posts.
- **Demo Talking Point:** *"This workspace allows local border operators to execute validations in real-time, instantly logging clearance tokens into the gate ledger."*
- **Access Level:** User-facing (operator workspace).
- **Readiness Dependency:** Local network availability. Operating in sandbox.

### 3. Production Gate Controller (Readiness / QA Dashboard)
- **Dashboard Name:** Production QA Gate & National Compliance Monitor
- **Purpose:** Executes automated code checks, verifying that zero mock adapters exist, that sovereign directories are clean, and that localization coverage is safe.
- **Intended Audience:** Technical auditors, DevOps engineers, compliance supervisors.
- **Allowed Roles:** `Technical Administrator`, `Security Analyst`.
- **Blocked Roles:** `Federal Customs Officer`, `KRG Customs Officer`, `Border Operator`, `Federal Executive Viewer`, `KRG Executive Viewer`.
- **Data Sensitivity:** LOW (system metadata and QA results).
- **Jurisdiction Context:** Universal Joint (Metadata-only model, Technical oversight).
- **Demo Talking Point:** *"This panel represents our built-in compliance guard. It runs real-time integrity scans to ensure that the platform software meets strict data protection and sovereign rules before staging keys are issued."*
- **Access Level:** Admin-only.
- **Readiness Dependency:** Core local compilation passes. Unlocked by system building.

### 4. Integration Hub & Wiring Console (Provider / Integration Dashboard)
- **Dashboard Name:** Backend Provider Wiring & Schema Registry
- **Purpose:** Confirms API connection status, displays unconfigured fallbacks, and tracks the reachability of external OIDC provider networks.
- **Intended Audience:** Technical integrations managers, API administrators.
- **Allowed Roles:** `Technical Administrator`.
- **Blocked Roles:** `Federal Customs Officer`, `KRG Customs Officer`, `Border Operator`, `Joint Auditor`.
- **Data Sensitivity:** MED-HIGH (contains backend server routing definitions and schema layouts).
- **Jurisdiction Context:** Universal Joint (Metadata-only model, Technical wiring).
- **Demo Talking Point:** *"This console monitors external integration hooks. It safely lists regional systems like KRDPASS or BRS as NOT_CONFIGURED until official ministries provide physical client secrets."*
- **Access Level:** Admin-only.
- **Readiness Dependency:** Ministry API key staging. Always offline in staging mode.

### 5. Simulator Setup Board (Presentation / Demo Dashboard)
- **Dashboard Name:** Presentation Control Board & Live Demo Workshop
- **Purpose:** Configures simulation flags, triggers UAT scenario dry-runs, and changes interface languages for stakeholder evaluation.
- **Intended Audience:** Strategic presenters, pilot sponsors, trainers.
- **Allowed Roles:** `Technical Administrator`, `Security Analyst`.
- **Blocked Roles:** None (governed by presentation session key).
- **Data Sensitivity:** LOW (whitelisted test scenarios and variables).
- **Jurisdiction Context:** Joint (Metadata-only model, Demo environment).
- **Demo Talking Point:** *"This workspace acts as our testing lab. We can swap simulated languages or inject test clearances here to show other agencies how the platform responds under load."*
- **Access Level:** Admin-only / User-facing (Demo-isolated).
- **Readiness Dependency:** Safe UI mock-isolation verification.

### 6. System Policies Registry (Admin-only Dashboard)
- **Dashboard Name:** Sovereignty & Access Policy Engine
- **Purpose:** Configures route-guards, maps user roles to specific permission rules, and maintains physical database isolation directories.
- **Intended Audience:** Technical Directors, Lead System Architects.
- **Allowed Roles:** `Technical Administrator`.
- **Blocked Roles:** `Federal Executive Viewer`, `Joint Auditor`, `Border Operator`, `Security Analyst`.
- **Data Sensitivity:** HIGH (system configurations and access routes).
- **Jurisdiction Context:** Joint (Metadata-only model, Governs separation mechanisms).
- **Demo Talking Point:** *"This engine forces the system to drop raw-record queries across boundaries at the kernel level, ensuring compliance is system-mandated."*
- **Access Level:** Admin-only.
- **Readiness Dependency:** Decoupled kernel routes initialization.

### 7. Border Transit Monitor (User/operator Dashboard)
- **Dashboard Name:** Transit Manifest Monitor
- **Purpose:** Real-time visibility into manifest arrivals, container tracking queues, and verification status codes.
- **Intended Audience:** Local border terminal coordinators, transit managers.
- **Allowed Roles:** `Federal Customs Officer`, `KRG Customs Officer`, `Border Operator`.
- **Blocked Roles:** `Federal Executive Viewer`, `KRG Executive Viewer`.
- **Data Sensitivity:** MED-HIGH (shipment manifests and clearance states).
- **Jurisdiction Context:** Isolated.
- **Demo Talking Point:** *"A simplified operator dashboard that provides real-time visibility of local shipments awaiting verification."*
- **Access Level:** User-facing.
- **Readiness Dependency:** Local station connectivity.
