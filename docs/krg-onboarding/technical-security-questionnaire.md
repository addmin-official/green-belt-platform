# KRG Technical Security & Compliance Questionnaire

**Document Reference:** IDG-KRG-ONB-061  
**Auditor Guideline:** KRG MoTC / Department of Information Technology (DIT)  

---

## Technical Security Assessment Checklist

### Q1: Does the integration use standard OAuth2 / OIDC protocols?
**Status:** YES  
**Details:** Our client uses standard OIDC libraries. Static discovery endpoints are evaluated during initial startup sequences to fetch active configurations.

### Q2: Is PKCE (Proof Key for Code Exchange) strictly enforced?
**Status:** YES  
**Details:** Forced for all authentication code flows. Standard SHA-256 code challenge code verifiers prevent authorization hijacking.

### Q3: How is JWT and JWKS signature verification performed?
**Status:** YES  
**Details:** Incoming tokens are evaluated on the gateway backend against cached JWKS rosters. Signature algorithms are restricted exclusively to `RS256`.

### Q4: Are access or identity token credentials redacted from server logs?
**Status:** YES  
**Details:** The logging router redacts all token fields, cookie payloads, and bearer assertions prior to filesystem or journald writeouts.

### Q5: How are secrets managed across the lifecycle?
**Status:** SECURE  
**Details:** No secrets or credentials are saved within client bundles. Configuration is populated purely via backend environment variables separated strictly by jurisdiction.

### Q6: Is environment variable isolation maintained between Federal and KRG modules?
**Status:** YES  
**Details:** KRG credentials (e.g. `KRG_KRDPASS_CLIENT_SECRET`) are completely isolated from Federal configurations, loaded only by KRG-authorized worker instances.

### Q7: Are immutable audit trails created for all auth transactions?
**Status:** YES  
**Details:** Audit telemetry saves verification metadata directly into our system ledger tracking. No sensitive demographic claims are stored.

### Q8: Is transport-layer TLS mandated?
**Status:** YES  
**Details:** Raw HTTP is actively rejected. Modern TLS 1.3 is enforced with fallback to TLS 1.2.

### Q9: What role-based access controls are active?
**Status:** YES  
**Details:** Only authorized personnel registered within KRG departments can request company checks or border clearance approvals.

### Q10: How is the principle of data minimization enforced?
**Status:** YES  
**Details:** Only the minimum set of non-sensitive parameters is queried. Full company directory tables, owner demographics, and private ledger files are omitted from requests.

### Q11: Is Joint layer metadata-only transfer structurally guaranteed?
**Status:** YES  
**Details:** Yes, verified by code controls in `KRGDataSovereigntyPolicy`. Code enforces sanitization filters to eliminate raw records before sending outputs to consolidated dashboards.

### Q12: Who is the designated Security Incident contact?
**Status:** DESIGNATED  
**Details:** IDG Security Operations Command & Emergency Response Desk (`sec-ops-alert@idg-gov.example`).

### Q13: Does the system use live, active provider health checks?
**Status:** YES  
**Details:** Live, honest service probe routes (`/krdpass/readiness`, `/brs/readiness`) report status to system orchestrators.

### Q14: Does the gateway fake provider success states if the connection fails?
**Status:** NO  
**Details:** The system does not fake connectivity or data results. If a provider is unavailable or unconfigured, the routing tier returns `NOT_CONFIGURED` or `PROVIDER_REQUIRED` directly. No dummy placeholders are presented.
