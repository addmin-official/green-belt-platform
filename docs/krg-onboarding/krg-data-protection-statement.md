# KRG Sovereign Data Protection & Isolation Statement

**Document Reference:** IDG-KRG-ONB-041  
**Compliance Standards:** KRG General Data Protection Bylaw & Iraq National Sovereignty Accord  

---

## 1. Declarative Sovereignty Statement
The Kurdish Region branch of the Iraq Digital Gateway (IDG) maintains the autonomous administration of regional digital registries, identities, and financial metadata. Data sovereignty is not a simple permission level; it is hard-coded into the database structure, route validation middleware, and deployment boundary maps.

---

## 2. Immutable Isolation Boundaries

The gateway architecture enforces the following security boundaries at the API and database levels:

### A. KRDPASS Raw Identity Claims (KRG_ONLY)
All raw identity tokens, authentication claims, biometric indicators, and personnel files obtained via client-side KRDPASS interactions remain within the private memory segments of KRG-designated zone servers. No raw KRDPASS claims are written to central joint files or shared federal environments.

### B. BRS Raw Business Records (KRG_ONLY)
All BRS files containing full business records, registry lists, company folders, and owner data remain locked within the Kurdistan regional boundary. 

### C. Joint Zone Reconciliation Layer (Metadata & Verification Hashes Only)
The Joint zone is authorized to read only:
- Static metadata indicators (e.g., query timestamp, schema compliance signature).
- Verification hashes (SHA256 checksum representing status confirmation).
- Workflow and compliance state codes (e.g., `VERIFIED`, `DECLINED`).

The Joint zone is **strictly blocked** from receiving or reading:
- Owner names or personal identifiers.
- National Civil ID (UPN) numbers.
- Operational physical or registered addresses.
- Raw fee schedules, payment transaction traces, or balance reports.
- Comprehensive company dossiers or raw records.

### D. Federal Zone Exclusion (Zero Direct Access)
The Federal Iraq zone has zero physical, logical, or network-level access to KRDPASS or BRS provider APIs. Direct cross-jurisdictional queries are permanently blocked at the gateway firewall.

---

## 3. Policy Enforcement Engine
Our runtime environment contains a hard-coded security evaluation filter (`KRGDataSovereigntyPolicy`) that evaluates raw records and deletes unapproved parameters before data leaves regional segments.
