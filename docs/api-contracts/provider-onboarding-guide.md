# Iraq Digital Gateway: Backend Provider Onboarding & Integration Guide

This guide is designed for the systems engineering teams of the **Federal Republic of Iraq (Baghdad)**, the **Kurdistan Regional Government (Erbil)**, and any **Joint Ministerial Operations** commissions. It outlines the architectural requirements to connect your backend services with the Iraq Digital Gateway (IDG) platform interface.

---

## 1. Architectural Principles

The IDG platform employs an isolation-first model. To preserve security and constitutional boundaries:
- **Federal Backend Systems** must remain physically isolated and process only Federal data.
- **KRG Backend Systems** must remain physically isolated and process only Kurdistan Region data.
- **Joint Systems** must never contain raw operations datasets.

---

## 2. Onboarding Requirements for Backend APIs

Every domain-oriented provider must implement a standardized set of administrative endpoints alongside their domain-specific business logic routes:

### Required Administrative Routes
- **Health Check (`GET /health`)**: Verifies that your microservice is active. Must return a `200 OK` with JSON `{ "status": "UP" }`. Keep this lightweight.
- **Readiness Check (`GET /readiness`)**: Asserts that internal dependencies (databases, cache, networks) are ready to receive real live traffic.
- **Metadata Inventory (`GET /metadata`)**: Exposes API configurations and operational ranges without revealing operational records.
- **Audit Logging Logs (`GET /audit-events`)**: High-integrity administrative access logs of who queried the gateway.
- **Sync Status check (`GET /sync-status`)**: Synchronization logs verifying that caches or ledger hashes match.

---

## 3. Jurisdiction-Specific Security Rules

To enforce sovereign boundaries, backend servers must strictly adhere to isolation policies across the network topology:

### A. Federal Providers (Baghdad Core)
- Must read/write only Federal (Central) databases.
- Under **no circumstances** should Erbil’s KRG systems be queried directly.
- All outbound traffic is limited to Baghdad sovereign assets.

### B. KRG Providers (Erbil Core)
- Must read/write only autonomous KRG databases.
- Under **no circumstances** should Baghdad's Federal database tables be queried directly.
- All outbound traffic is restricted to Erbil sovereign assets.

### C. Joint Operations Providers (Coordination Core)
- **METADATA-ONLY RULE**: Joint systems are strictly prohibited from receiving or processing raw operational datasets.
- **Permitted Data**: High-level aggregated statistics (e.g. combined transaction count, summary IQD balances), SHA256 document verification hashes, and cross-party sync states.
- **Forbidden Data**: Raw tax/revenue ledgers, specific customs declarations, citizen/civil servant identity records, agent roster assignments, and tactical intelligence alerts.

---

## 4. Authentication & Audit Logs

- **Mutual TLS (mTLS)**: All APIs in operational mode require mutual TLS client certificates.
- **Cryptographic JSON Web Tokens (JWT)**: Client requests will contain cryptographically signed tokens.
- **System-level Audits**: Every read or write API interaction must be securely logged to an immutable local ledger before responding to the platform gateway proxy.

---

## 5. Moving from `CONDITIONALLY_READY` to `PILOT_READY` / `PILOT_READY` to `ACQUISITION_READY`

Historically, the platform's UI status sits at `CONDITIONALLY_READY` when there are no live backend services linked. To achieve live runtime readiness:
1. Deploy your server complying with the appropriate OpenAPI specification (`federal-openapi.yaml`, `krg-openapi.yaml`, or `joint-openapi.yaml`).
2. Configure the environment variables in the Gateway matching your deployed base URLs. (Refer to `provider-environment-template.md` for variable assignments).
3. Ensure that the `/health` and `/readiness` checks return `200 OK`.
4. Trigger the Automated QA Release Gate to verify that the environment values resolve successfully with clean, secure Handshakes.
