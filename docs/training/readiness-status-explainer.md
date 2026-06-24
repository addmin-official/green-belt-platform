# Platform Readiness Status Explainer Guide

**Document Reference:** IDG-TRN-RED-006  
**Classification:** RESTRICTED TRAINING DOCUMENT  
**Topic:** Release Standards, Status Codes, and Staging Rules  

---

## 1. System Safeguard Rules
The **Iraq Digital Gateway (IDG)** platform implements a rigorous safety mechanism: **Staging-Operational Isolation**. 

The code is strictly prohibited from claiming a "Live" or "Fully Operational" status to stakeholders unless the backend API endpoints for real government providers are physically configured, routed, and validated via cryptographic mTLS handshakes.

---

## 2. Staging Readiness States Explainer

### 1. `NOT_CONFIGURED`
- **Meaning:** The system is in its initial setup block. Staging enclaves are not verified, and core wiring loops are incomplete.
- **Risk Level:** Safe but inoperable.

### 2. `CONDITIONALLY_READY — PROVIDERS REQUIRED`
- **Meaning:** Frontend, backend schemas, and QA scanners are built. However, integration hooks for regional ministries are offline.
- **Rules:** Perfect for local offline developer checks.

### 3. `CONDITIONALLY_READY — KRG PROVIDER APPROVAL PACKAGE READY`
- **Meaning:** Standard administrative onboarding files, security questionnaires, and SLA drafts have been fully compiled and added to the platform directory.
- **Rules:** Ready for technical delivery pipeline audits.

### 4. `CONDITIONALLY_READY — EXECUTIVE PITCH PACKAGE READY, PROVIDERS REQUIRED`
- **Meaning:** Key stakeholder briefs, commercial Option C licensing profiles, and partnership templates are verified and structured.
- **Rules:** Unlocks presentations to senior cabinet advisors.

### 5. `CONDITIONALLY_READY — OUTREACH PACKAGE READY, PROVIDERS REQUIRED` (Current State)
- **Meaning:** Formal meeting requests for KRG DIT, Rwanga introductory briefings, targeted systems integrator proposals, interactive stakeholder FAQs, and follow-up templates are fully compiled and integrated into our QA production checks.
- **Why it is the Highest Safe Staging Level:** The codebase, UI translations, security configurations, and full-scope documentation packages are complete. All automated QA scans pass. It is ready for institutional presentation.
- **Why we CANNOT mark `PILOT_READY` or `APPROVED`:** Claiming the system is live without official governmental certificates or sandboxed API keys is a major violation of security compliance. The system must remain `CONDITIONALLY_READY` until proper credentials are provided.

---

## 3. Training Guideline
When training team members on system status indicators:
- **Never attempt to fake a status.** Let the system return `NOT_CONFIGURED` gracefully. This demonstrates robust architectural integrity to government technical auditors.
- **Explain the "Conditional" status as a security feature.** It proves our platform does not transmit unauthorized mock payloads across sovereign boundaries.
