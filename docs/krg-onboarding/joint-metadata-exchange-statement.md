# Joint Metadata-Only Exchange Protocol Statement

**Document Reference:** IDG-KRG-ONB-051  
**Scope:** Bi-directional Transaction Reconciliation Standards  

---

## 1. Goal of Joint Reconciliation
To ensure national safety, audit transparency, and cross-border customs coordination, the Iraq Digital Gateway (IDG) maintains a Joint Operations Layer. This layer aggregates verification statuses from both Federal and Kurdistan Region authorities without centralizing private citizen, trade, or business information.

---

## 2. Core Exchange Principles

1. **Zero Raw Leakage:** Raw workforce registers, identity credentials, and company ownership books are strictly constrained within their home jurisdictions.
2. **Cryptographic Proofs:** Verification checks yield a secure SHA-256 fingerprint representing a specific state. This fingerprint functions as a non-reusable proof of clearance.
3. **No Direct Access Paths:** Federal personnel cannot inspect KRG directory providers. KRG regional desks do not pull Federal identity profiles.

---

## 3. Approved Joint Transmission Schema
Only the following schema is approved for transmission from the KRG secure enclave to the Joint Reconciliation ledger:

```json
{
  "$schema": "https://idg.gov.example/schemas/joint-reconciliation-v1.json",
  "jurisdiction": "KURDISTAN_REGION",
  "timestamp": "2026-06-10T15:36:43Z",
  "verificationHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "workflowStatus": "VERIFIED",
  "complianceStatus": "FULLY_COMPLIANT"
}
```

This strict layout guarantees that federal and joint desks can verify that a business has been checked and approved by KRG authorities without disclosing private commercial, fiscal, or personal files.
