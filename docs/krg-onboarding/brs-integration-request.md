# KRG Business Registry Service (BRS) Integration Request

**Document Reference:** IDG-KRG-ONB-031  
**Integration Class:** REST / JSON Service-to-Service API Authorization  

---

## 1. Business Verification Use Case
The Iraq Digital Gateway (IDG) requires validation of Kurdistan-registered companies importing goods through northern border crossings. This verifies company registration status and legitimacy before allowing cargo entries to proceed under unified customs clearings.

- **Primary Integration Goal:** Check business registration integrity during regional customs declarations.
- **UEN Lookup Purpose:** Resolve regional Unique Entity Numbers (UEN) to ensure the entity is active and has no pending treasury blocks.
- **Authentication Method:** Secure API token issued under Client Credentials Flow with the KRG API Gateway.

---

## 2. Minimalist Field Register (Initial Pilot Request)

The initial pilot request asks for **zero** personally identifiable company details or private investor ledger values. The application strictly requests the following non-sensitive verification status elements:

| API Output Path | Type | Sensitivity Class | Pilot Status |
| :--- | :--- | :--- | :--- |
| **`businessVerified`** | Boolean | Non-Sensitive | **REQUIRED** |
| **`verificationHash`** | String (SHA256) | Non-Sensitive | **REQUIRED** |
| **`workflowStatus`** | String | Non-Sensitive | **REQUIRED** |
| **`nonSensitiveComplianceStatus`** | String | Non-Sensitive | **REQUIRED** |

### Prohibited Fields (Omitted during Initial Pilot)
To ensure compliance with KRG sovereign regulatory structures, the following sensitive fields **are explicitly not requested**:
- `ownerName` / `ownerPersonalData` (STRICTLY PROHIBITED)
- `ownerIdentity` / `UPN` (STRICTLY PROHIBITED)
- Company Physical Addresses or GPS Coordinates (STRICTLY PROHIBITED)
- Raw Fee Payment Schedules or Bank Deposit Accounts (STRICTLY PROHIBITED)
- Complete Raw Business Records (STRICTLY PROHIBITED)

---

## 3. Data Protection & Joint Projection Policies
- **Data Minimization Policy:** Only fields listed as `REQUIRED` above will be queried. Any unexpected fields returned by the endpoint will be automatically discarded at the boundary service layer.
- **Raw Data Retention Policy:** No raw business record or status data is persisted in database stores. Status queries are carried out in-memory on demand.
- **Joint Metadata Projection Policy:** The federal branch receives zero direct reading rights. Only the cryptographic validation SHA256 string is visible to joint reconciliation logs to prove legal verification completed before border crossing approval.
