# Admin-User Experience and Security Separation Policy

**Document Reference:** IDG-TRN-SEP-003  
**Classification:** RESTRICTED TRAINING DOCUMENT  
**Topic:** Permission Boundaries, Access Control List (ACL), and Policy Violations  

---

## 1. Objectives
This document establishes the strict administrative and user experience boundaries within the **Iraq Digital Gateway (IDG)** program. It defines what systems may be accessed, modified, or checked by distinct tiers of users and outlines the safety policies built into the codebase.

---

## 2. Administrator Access Policies

### Admin Can Access:
1. **System Configurations:** Track overall component orchestration parameters.
2. **Provider Configuration Status:** Monitor connection endpoints, response latencies, and reachability markers.
3. **Automated QA Results:** View linter output, code safety reports, and localization coverage audits.
4. **Deployment Readiness Scores:** Assess compliance metrics, UAT scenario outcomes, and onboarding progress.
5. **Onboarding Package Files:** Read raw compliance templates and verify required KRG/Federal documents.
6. **Role/Access Allocations:** Assign and audit role privileges and access levels.
7. **Environment Status logs:** Evaluate system health, process runtimes, and audit trail sizes (excluding payload data).

### Admin CANNOT:
- **Bypass Sovereignty Rules:** Admins do not have bypass privileges. Regional databases and data isolation structures are physically decoupled at the database connection pool layer.
- **Expose KRG Raw Data to Federal:** Admins have no tool or console to transfer unencrypted corporate indices or citizen credentials from KRG sandboxes to Federal terminals.
- **Expose Federal Raw Data to KRG:** Admins cannot route raw central tax databases or national security metadata to unauthorized regional users.
- **Expose Raw Data to Joint Operations:** Joint operations dashboards are metadata-only. Admins cannot alter database queries to bypass SHA-256 hash formatting.
- **Inject Fake Readiness:** Admins cannot fake QA audits or hardcode `READY` scores. Any override results in an immediate automated QA Gate failure.
- **Mark PILOT_READY without Providers:** The platform will fail build steps if an operator tries to declare the system fully operational with unconfigured connection endpoints.
- **Create Fake Government Records:** Admins have no tools or database overrides to seed mock registries, dummy company listings, or fake customs clearances into real operational schemas.

---

## 3. Standard User & Operator Access Policies

### Joint, Federal, and Regional Operators Can Access:
1. **Assigned Dashboard Workspace:** A customizable terminal matching their precise operational context (e.g., Border Operator, Executive Representative).
2. **Assigned Operational Workflows:** Manage specific manifest registrations, tax receipts approvals, or performance auditing queues.
3. **Assigned Language Enclave:** Work within a fully localized interface (Arabic, Kurdish, or English).
4. **Assigned Jurisdiction Context:** KRG operators receive regional tools; Federal operators receive central tools.
5. **Role-Based Reporting Views:** Track progress, transit KPIs, and logs matching their credentials.

### Joint, Federal, and Regional Operators CANNOT Access:
- **Provider API Configurations:** Physical IP routing sheets, gateway certificates, and cryptographic mTLS configs are fully protected from standard users.
- **QA Gate Management Controls:** Standard users have no control over automated compliance checks or unit tests.
- **Deployment & Sandbox Registers:** Standard operators are unable to alter staging rules, database locations, or release branch modes.
- **Onboarding Package Internals:** Regulatory draft templates and executive briefings are hidden from operational border screens.
- **Cross-Jurisdiction Raw Ledgers:** Standard users are blocked from querying raw corporate indices or raw border clearances from opposing jurisdictions.
- **Admin Configuration Tables:** Operator interfaces completely exclude system setup components, maintaining clean, clutter-free workspaces.
- **Readiness Override Controls:** Operators cannot manually alter the staging compliance decision or override the automated `CONDITIONALLY_READY` state.
