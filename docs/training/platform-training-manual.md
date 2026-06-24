# Platform Training Manual: Iraq Digital Gateway (IDG)

**Document Reference:** IDG-TRN-MAN-001  
**Classification:** RESTRICTED TRAINING DOCUMENT  
**Topic:** Core Architecture, Data Boundaries, and Staging Operational Handbooks  

---

## 1. Executive Summary
The **Iraq Digital Gateway (IDG)** is a secure transaction coordination, digital intelligence, and cross-border integration layer. It is built to coordinate trade clearance, customs, and revenues between the Federal Government of Iraq and the Kurdistan Region Government (KRG) without compromising regional, legislative, or technical sovereignty.

IDG resolves long-standing cross-border coordination failures by introducing a **sovereignty-preserving integration layer**. It replaces manual verification loops with cryptographic checks, reducing cross-border transit clearance lag from several days down to seconds.

---

## 2. The Core Problem & Our High-Security Solution
Historically, unified customs collection failed because of two opposing requirements:
1. **Federal Requirement:** Consolidate customs ledgers and import transparency to prevent revenue leakages.
2. **KRG Requirement:** Protect regional administrative databases, corporate registries (BRS), and citizen credentials (KRDPASS) under local laws.

### How IDG Resolves This: Sovereign Data Isolation
Instead of centralizing all regional citizen profiles and corporate registrations in a unified federal database, IDG enforces **data separation**. KRG assets and Federal assets are maintained within separate, private enclaves.
- **Federal Private Enclave:** Manages Federal revenue directories, customs databases, and central ledger accounts.
- **KRG Private Enclave:** Houses the Business Registry Service (BRS) data, regional revenue registries, and citizen/operator OIDC endpoints handled by KRDPASS.
- **Joint Operations Layer:** Operates as a completely decoupled ledger. It reads only performance aggregates, workflow tracking status codes (e.g., `VERIFIED`, `DECLINED`), and cryptographic SHA-256 transaction hashes. 

---

## 3. The Metadata-Only Joint Exchange Model
To prevent legislative leaks or security breaches, the Joint Operations Layer is legally and technologically restricted:
- **No Raw Record Queries:** Joint auditors and federal coordinators never have permission to query detailed corporate owners, individual citizens, or exact payment items from KRG's BRS or KRDPASS.
- **SHA-256 Handshake:** The system leverages cryptographic handshakes. When an item is processed in Erbil:
  1. The KRG enclave processes the sensitive customer/freight details.
  2. It generates a SHA-256 hash containing `hash(Company_ID + Customs_Receipt_Number + Timestamp)`.
  3. The enclave registers this hash along with a status of `APPROVED` on the Joint Operations Ledger.
  4. The Federal station matches this hash when the truck arrives, verifying clearance without viewing any underlying regional register.

---

## 4. Current Staging vs. Production Integration State
To maintain transparency with future stakeholders, trainees must clearly distinguish our current release level from lived production:
- **What is Ready Now:** The core backend routing, database definitions (using Drizzle/Postgres), interface localizations (Arabic/Kurdish/English), automated QA checking modules, and dry-run simulation engines are fully built, localized, and verified.
- **What is NOT Ready (Providers Required):** Real-world client credentials, live API tokens for KRDPASS IDPs, and physical firewalled endpoints in national datacenters are unconfigured. The gateway currently operates in a secure `NOT_CONFIGURED` fallback mode. No fake or dummy records are ever passed to live operational channels.

---

## 5. Summary of Key Training Principles
1. Never compromise the isolation boundary. KRG and Federal enclaves must remain independent.
2. Keep data minimum-viable; if an aggregate state code or validation hash is sufficient for audit, never request or transmit raw records.
3. Clearly present our current status as **Staging Dry-Run Verified, Awaiting Regional Onboarding Credentials**.
