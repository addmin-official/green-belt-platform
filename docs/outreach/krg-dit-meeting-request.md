# KRG DIT Official Meeting Request: Core Digital Gateway Integration

**Document Reference:** IDG-OUT-KRG-001  
**Target Authority:** Kurdistan Regional Government Department of Information Technology (DIT)  
**Status:** DRAFT INTRODUCTION DOCUMENT  

---

## 1. Request for Technical Alignment Session
Our executive steering committee formally requests a 45-minute technical briefing with the KRG Department of IT (DIT) engineering leaders. The focus of this session is the **Iraq Digital Gateway (IDG)** integration platform.

IDG is a high-security transaction coordination, intelligence, and integration layer designed to align regional customs clearings with national reconciliation targets.

---

## 2. Core Security & Architecture Guarantees
We wish to share and align on the platform's architectural constraints, which are hard-coded into our routing engines:
- **No Replacement of Regional Systems:** IDG does not replace KRG systems, database registers, or local processes. It operates cleanly as an integration adapter.
- **Strict Data Sovereignty (KRG-Only):** All raw corporate registrations (BRS) or identity authorizations (KRDPASS) are isolated within KRG-managed sandboxes. No raw, unredacted corporate records or citizen profiles cross boundaries or are exposed to joint terminals.
- **Joint Metadata-Only Exchange:** Handshakes between KRG posts and centralized reconciliation consoles use exclusively SHA-256 validation hashes alongside standard status codes (e.g., `VERIFIED`, `DECLINED`). Real names, financial values, or physical files do not leave the regional boundary.

---

## 3. Discussion Objectives
We seek DIT's guidance to:
1. Review our standard KRDPASS (OIDC) compatibility profile.
2. Audit our BRS API integration mappings.
3. Coordinate the process for linking the gateway to KRG's official dev/sandbox endpoints for dry-run verification.
4. Establish clear administrative channels to coordinate future staging authorizations.

*Note: No active database connections or partner authorizations exist today; our current platform build is verified in dry-run/mock isolation as we await governmental instructions.*
