# Stakeholder Frequently Asked Questions (FAQ)

**Document Reference:** IDG-OUT-FAQ-006  
**Audience:** KRG MoTC, Federal Ministries, Auditing Officers  

---

### Q1: Is this platform replacing KRG systems?
**No.** The Iraq Digital Gateway (IDG) does not replace any existing KRG customs registries, digital applications, or directory servers. It serves as an **integration, intelligence, and operational coordination layer** that formats and securely routes verification receipts using standardized APIs.

### Q2: Does Federal Iraq see KRG raw data?
**No.** Federal stations have zero physical, logical, or network-level access to KRG databases. The system architecture enforces strict isolation. Raw demographic profiles, corporate ownership records, and customs transaction logs are kept inside KRG enclaves.

### Q3: Does the Joint Operations Layer see raw records?
**No.** The Joint console only sees non-sensitive metadata, workflow status codes (e.g., `VERIFIED`), and unique SHA-256 validation fingerprints. No personal identification, payment, or ownership directories ever enter the Joint Operations Layer.

### Q4: Is KRDPASS already connected?
**No.** The core KRDPASS OIDC compatibility profile is fully coded, built, and tested inside our local dry-run staging environment. Secure production connection hooks remain offline pending formal authorization and client credential issuance by the KRG Department of IT (DIT).

### Q5: Is BRS already connected?
**No.** The Business Registry Service (BRS) API schema interfaces have been fully modeled and tested. Like KRDPASS, active API handshakes are unconfigured, falling back safely to a compliant `NOT_CONFIGURED` status rather than using mock operational records.

### Q6: What formal approvals are required?
Deploying a staging pilot requires written technical clearance from the KRG Ministry of Transport and Communications (MoTC) / Department of IT (DIT) to secure sandboxed client IDs and verification keys.

### Q7: Who owns the platform's Intellectual Property (IP)?
All platform IP—including the core gateway logic, role-validation middlewares, multilingual engines, and isolation policies—remains the exclusive property of the platform owner. Clients are granted dedicated runtime credentials for regional instances.

### Q8: Who hosts and pays for the infrastructure?
Under our recommended deployment model (**Option C**), the host government department provides and maintains the local server assets, network paths, and mTLS firewalls in local KRG data centers.

### Q9: What is the scope of the initial pilot?
The pilot is constrained to a single border-post checkpoint for a designated one-month dry-run phase to evaluate OIDC token handshakes and metadata-only reconciliation under local auditing supervision.

### Q10: What is not ready yet?
The software build is complete and compliant. However, we are **not** ready for live production queries. Physical credentials, SSL certificates for official government domains, and active provider bindings are pending formal administrative onboarding and DIT credential packages.
