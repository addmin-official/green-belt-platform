# KRG Digital Integration — Pilot Scope & Success Criteria

**Document Reference:** IDG-KRG-ONB-071  
**Project Phase:** Phase 5.13  

---

## 1. Pilot Boundary Definition
The initial integration pilot is restricted to a selected border-post customs terminal. The objective is to demonstrate absolute standards compliance, secure connectivity, and sovereign data isolation under real-world conditions.

---

## 2. Measurable Success Checklist

Before transitioning from staging to live production usage, the following indicators must be checked and approved:

### A. KRDPASS Login Readiness
- [ ] Staging credentials register successfully with the KRG OIDC service.
- [ ] Login flow performs seamless Authorization Code Exchange with PKCE.
- [ ] JWKS endpoint signature validations succeed via Cached Key Arrays.

### B. BRS Service Verification Readiness
- [ ] Company UEN lookups resolve with valid registered indicators from the BRS API.
- [ ] Error scenarios (e.g., Company block, invalid UEN) return clear error structures rather than faking success.

### C. Data Sovereignty Boundaries (KRG-Only)
- [ ] Zero raw identity records or token claims leave the regional domain.
- [ ] Zero raw business records, owners, or financial details are stored outside regional data boundaries.

### D. Joint Metadata-Only Exchange
- [ ] The Joint reconciliation tier receives ONLY the SHA-256 verification hash and non-sensitive status strings.
- [ ] Access validation policies actively filter out forbidden records.

### E. Federal Direct Access Isolation
- [ ] Federal endpoints receive `ACCESS DENIED` errors when attempting direct queries against KRG registry nodes.

### F. Automated Quality Assurance Gate
- [ ] All package audits pass via `npm run qa:krg-onboarding-package`.
- [ ] Full production gate and local smoke tests complete successfully.

### G. Formal Provider Endorsement
- [ ] Formal electronic approval tokens received from the KRG Department of IT.
- [ ] Service state moves from `KRG_APPROVAL_REQUIRED` to active readiness.
- [ ] No raw credentials or sensitive keys are hardcoded.
