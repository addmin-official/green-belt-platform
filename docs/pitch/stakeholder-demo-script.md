# 15-Minute Stakeholder Presentation & Demo Script

**Document Reference:** IDG-STK-DEMO-005  
**Audience:** KRG Ministry of Transportation / Department of IT / Regional Customs Supervisors  

---

## Presentation Roadmap & Segment Guide

### Part 1: The Core Problem (Minutes 0 - 2)
* **Objective:** Establish the friction with current cross-border customs clearings.
* **Talking Points:**
  - Standard trade systems require centralized data pools, which violates regional data sovereignty regulations.
  - Paper-based cross-checks are slow and introduce administrative friction.
  - Setting up uncoordinated parallel networks leads to compliance issues at border junctions.

---

### Part 2: Hardcoded Sovereign Separation (Minutes 2 - 4)
* **Objective:** Introduce the multi-zone architecture.
* **Talking Points:**
  - IDG enforces separation between three zones: Federal Iraq (isolated), Kurdistan Region (isolated), and Joint Operations (metadata-only).
  - Show the network boundary configurations on screen.
  - Explain that data isolation is embedded directly in our code and database schemas.

---

### Part 3: The Dedicated KRG-Only Private Interface (Minutes 4 - 6)
* **Objective:** Demean the fear of external reading.
* **Talking Points:**
  - Show the localized KRG Portal layout (supporting Kurdish Sorani, Arabic, and English).
  - Demonstrate a local customs clearance transaction being queued.
  - Highlight that this private screen runs entirely locally and does not share any private records with the outside world.

---

### Part 4: KRDPASS & BRS Compatibility (Minutes 6 - 8)
* **Objective:** Highlight alignment with local government technology.
* **Talking Points:**
  - Demonstrate our KRDPASS integration readiness (using standard OIDC Authorization Code with PKCE and RS256 signature verification).
  - Demonstrate how BRS lookups work using a company's Unique Entity Number (UEN) to verify active registration status.
  - Point out that our code blocks raw citizen or company ledger data from being exposed on these screens.

---

### Part 5: Joint Operations Metadata-Only View (Minutes 8 - 10)
* **Objective:** Show how the reconciliation desk operates safely.
* **Talking Points:**
  - Switch the view to the Joint Reconciliation auditing console.
  - Point out that there are **no names, civil UPN numbers, commercial payments, or raw company files** visible on this screen.
  - Show that only cryptographic SHA-256 hashes and standard status indicators verify clearance.

---

### Part 6: UAT Dry-Run Module (Minutes 10 - 11.5)
* **Objective:** Show how we prevent operational failures using built-in testing tools.
* **Talking Points:**
  - Open the live UAT Dry-Run panel in the client interface.
  - Choose different roles to show how role-based permissions are enforced.
  - Highlight the "KRG Digital Standards" compliance metrics, showing our 100% adherence to OpenAPI and OIDC guidelines.

---

### Part 7: The Provider Approval Request Package (Minutes 11.5 - 13)
* **Objective:** Present our onboarding documents.
* **Talking Points:**
  - Show the structured compliance logs and onboarding markdown documents.
  - Walk stakeholders through the Technical Security Questionnaire and KRG Data Protection Statement.
  - Explain that we are ready to supply these formal request dossiers to the Department of IT.

---

### Part 8: Staging Pilot & Next Steps (Minutes 13 - 15)
* **Objective:** Conclude with a clear action plan.
* **Talking Points:**
  - The software is currently in `KRG PROVIDER APPROVAL PACKAGE READY` status.
  - The immediate next step is submission of these files to regional tech authorities to obtain credentials for a secure sandbox pilot.
  - Address stakeholder questions.
