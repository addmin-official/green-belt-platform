# IDG Provider Integration Checklist

This document is the official certification rubric used during the Auditing phase to transition a domain provider to active production status. All requirements must be marked as **PASSED** by the QA gate before deployment.

---

## 1. Gateway Connection Parameters
- [ ] **Federal Endpoint Configured**: `VITE_FEDERAL_API_BASE_URL` is set to a valid, secure internal hostname (non-public).
- [ ] **KRG Endpoint Configured**: `VITE_KRG_API_BASE_URL` is set to a valid, secure internal autononous hostname (non-public).
- [ ] **Joint Endpoint Configured**: `VITE_JOINT_API_BASE_URL` is set to a valid, secure bilateral matching node.

---

## 2. Infrastructure Security & Cryptography
- [ ] **mTLS (Mutual TLS) Peer Handshake Configured**: client and server handshakes securely exchange internal certificates.
- [ ] **JWT Sovereign Role Authentication**: All incoming requests present a signed JSON Web Token (JWT) with valid `ROLE` and `JURISDICTION_MASK` claims.
- [ ] **Key Rotation Active**: System rotates cryptographic tokens and public keys on the standard 30-day schedule.

---

## 3. Auditing & Resilience
- [ ] **Audit Trail Storage Enabled**: Core write events write to a tamper-proof local audit append-only journal before final execution.
- [ ] **Health Checks Active (`GET /health`)**: Endpoint responds under 100ms and returns `200 OK` JSON payloads.
- [ ] **Readiness Checks Active (`GET /readiness`)**: Endpoint successfully evaluates DB pool health and yields valid status results.

---

## 4. Sovereignty and Isolation Safeguards
- [ ] **Joint Raw Data Blocked**: Joint APIs strictly forbid transmitting raw financial ledger records, customs entries, or identity data. Only metadata is permitted.
- [ ] **Cross-Jurisdiction Isolation Enforced**: Baghdad queries are physically routed away from Erbil nodes (and vice-versa). Direct calls are completely blocked at the firewall.
- [ ] **PII and Biometrics Shielding Enforced**: Raw portrait images and biometric hashes remain entirely offline inside secure regional identity repositories.

---

## 5. QA Release Criteria
- [ ] **Automated QA Gate Passed**: Every static code compliance check and runtime isolation scanner registers green without violations.
- [ ] **All Registered Provider Health Checks Passed**: No timeouts, network drops, or payload contract discrepancies are flagged on the IDG Command Center telemetry.
