# Role-Based Navigation and Interface Guide

**Document Reference:** IDG-TRN-NAV-005  
**Classification:** RESTRICTED TRAINING DOCUMENT  
**Topic:** Identity Mapping, Navigation Rules, and RBAC Matrix  

---

## 1. Introduction
This directory maps the navigation visibility rules, blocked actions, and default landings for each supported role within the **Iraq Digital Gateway (IDG)** platform.

---

## 2. Role Index

### 1. Federal Executive Viewer
- **Admin/User Classification:** User Workspace
- **Visible Sections:** National Command Center, General Performance Audits, Federal Customs Metrics.
- **Hidden Sections:** Provider Configuration, Staging Release Controls, KRG local databases, QA Gate Internals.
- **Blocked Actions:** Modifying routes, changing API endpoints, accessing KRG registries.
- **Default Landing Page:** Federal Command Center Console.
- **Jurisdiction Restrictions:** Restricted to Federal-level data viewpoints.
- **Demo Explanation:** Represents a senior central decision-maker monitoring trade performance KPIs.

### 2. KRG Executive Viewer
- **Admin/User Classification:** User Workspace
- **Visible Sections:** KRG Command Center, regional customs aggregates, local border performance indexes.
- **Hidden Sections:** Federal private ledgers, Provider API connections, Joint security logs, System configurations.
- **Blocked Actions:** Adding user roles, altering central databases, reviewing raw Federal imports.
- **Default Landing Page:** KRG Command Hub.
- **Jurisdiction Restrictions:** Restricted to KRG-level data enclaves.
- **Demo Explanation:** Illustrates Regional cabinet members tracking trade and clearance metrics from local border assets.

### 3. Joint Auditor
- **Admin/User Classification:** User Workspace
- **Visible Sections:** National Consolidation Dashboard, SHA-256 fingerprint verification ledgers, clearance statistics.
- **Hidden Sections:** Raw citizen data, Raw company tax registers, Provider configuration keys.
- **Blocked Actions:** Modifying clearance states, changing platform environment variables.
- **Default Landing Page:** Joint Audit Consolidation Center.
- **Jurisdiction Restrictions:** Joint Viewpoint (Metadata-only).
- **Demo Explanation:** Shows how bi-partisan agencies verify trade transparency using SHA-256 hashes instead of raw folders.

### 4. Federal Customs Officer
- **Admin/User Classification:** User Workspace
- **Visible Sections:** Federal border checkpoint manifest desks, clearance confirm sheets.
- **Hidden Sections:** KRG internal dashboards, system policy engine, automated QA Gate, integration Hub.
- **Blocked Actions:** Triggering QA scans, viewing regional registries, changing API credentials.
- **Default Landing Page:** Federal Manifest Desk.
- **Jurisdiction Restrictions:** Restricted to Federal customs checkpoints (e.g., Safra).
- **Demo Explanation:** Shows an operational central customs controller checking arriving clearances.

### 5. KRG Customs Officer
- **Admin/User Classification:** User Workspace
- **Visible Sections:** KRG border point clearance desks, manifest matching applications.
- **Hidden Sections:** Federal Command Center, Joint audit ledger, provider endpoints list, QA checks.
- **Blocked Actions:** Adding/removing system components, accessing central registries.
- **Default Landing Page:** KRG Manifest Crossing Desk.
- **Jurisdiction Restrictions:** Restricted to KRG customs checkpoints (e.g., Ibrahim Khalil).
- **Demo Explanation:** Displays Regional customs operators processing incoming transits.

### 6. Border Operator
- **Admin/User Classification:** User Workspace
- **Visible Sections:** Local border entry terminal workspace, manifest registry log.
- **Hidden Sections:** All executive panels, integration wiring blocks, QA gate details, system settings.
- **Blocked Actions:** Viewing aggregates, altering configurations, checking external endpoint latency.
- **Default Landing Page:** Border Entry Console.
- **Jurisdiction Restrictions:** Restricted to their specific assigned border-point context.
- **Demo Explanation:** Highlights simplified workspace for physical gatekeepers processing transit manifests.

### 7. Security Analyst
- **Admin/User Classification:** Admin Center
- **Visible Sections:** Audit trail, system policy engine logs, automated QA checks, isolation boundaries monitoring.
- **Hidden Sections:** Operational customs desks, individual corporate ownership files.
- **Blocked Actions:** Committing financial clearances, changing commercial licensing modes.
- **Default Landing Page:** Security Policy Monitor.
- **Jurisdiction Restrictions:** Joint/Universal (Audits technical policies).
- **Demo Explanation:** Represents the risk auditor verifying that isolation boundaries are robust.

### 8. Technical Administrator
- **Admin/User Classification:** Admin Center
- **Visible Sections:** System Configuration Panel, Staging Sandbox settings, Integration Hub, QA Gate controls, Onboarding status.
- **Hidden Sections:** Raw operational customs manifest details (excluded to enforce minimum-privilege).
- **Blocked Actions:** Overriding physical datastore isolation enclaves (blocked by system kernel).
- **Default Landing Page:** System Administration Workspace.
- **Jurisdiction Restrictions:** Universal Technical (Enforces platform guardrails).
- **Demo Explanation:** Shows administrators managing keys, checking platform QA results, and reviewing deployment milestones.
