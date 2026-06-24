# Iraq Digital Gateway (IDG) • Final Implementation Masterplan
## Supreme Engineering Blueprint & Multi-Decade Execution Roadmap
**Architectural Specification for a 20+ Year Lifecycle Scaling to Thousands of Services**

---

## Executive Overview
This document represents the ultimate **Implementation Masterplan** for the **Iraq Digital Gateway (IDG)** and the **National Unified Trust Network**. It consolidates the prior multi-disciplinary specs (Platform, Database, Security, Identity, Finance, and Super-App) into a single, concrete engineering and execution guide.

A new engineering organization can use this masterplan to construct, compile, secure, test, deploy, and scale the entire sovereign gateway from absolute scratch.

---

## 1. Complete Repository Tree
The system is modeled as a unified, domain-driven **Enterprise Monorepo** managed with `pnpm` workspaces. This guarantees atomic, coordinated changes across all microservices, shared packages, and frontend touchpoints, preventing version drift.

```text
/ (IDG Monorepo Root)
├── package.json                         # Monorepo Workspace configuration & core tasks
├── pnpm-workspace.yaml                  # pnpm Workspace micro-packages registrations
├── tsconfig.json                        # Sovereign TypeScript Compiler Config
├── /apps                                # Executive Portals & Touchpoints (OLTP Client Tier)
│   ├── /command-center-web              # Supreme Cabinet & Director Dashboard (React)
│   ├── /customs-portal-web              # Importer Customs Filing & Tax Portal (React)
│   ├── /border-terminal-client          # Physical Border Local Terminal Client (React/Native)
│   └── /inspector-mobile-client         # Android Mobile Patrol App (Kotlin/Jetpack Compose)
├── /services                            # Domain-Driven Microservices (OLTP Core Tier)
│   ├── /identity-auth-service           # OIDC & WebAuthn Security Authority
│   ├── /customs-tariff-service          # HS-Classification tax evaluation Engine
│   ├── /payment-settlement-service      # SWIFT & CBI ISO 20022 Financial Gateway
│   ├── /iot-telemetry-service           # High-Frequency GPS Tracking & Anomaly Analyzer
│   └── /audit-ledger-service            # Append-Only Core Transactional Ledger Hub
├── /packages                            # Shared Monorepo Core Libraries (Acyclic Utility Tier)
│   ├── /ui-core                         # Shared Tailwind Design System & Tokens
│   ├── /crypto-sdk                      # National Digital Signature & PKI Toolkit
│   └── /api-client                      # Unified gRPC & REST API Client Wrapper
├── /infrastructure                      # Infrastructure-as-Code (Private & Public Cloud)
│   ├── /terraform                       # Secure Network segments, Subnets, VM provisioning
│   └── /k8s                             # Kubernetes Helm Helm Charts & Ingress configuration
├── /ai                                  # Local AI Model Registry & Prompt Library
│   ├── /model-registry                  # MoE Weights Meta, Schemas, & local configurations
│   └── /prompt-library                  # Immutable Ledger-Anchored Prompts
├── /data                                # Database Schemas & Migrations (Sovereign Data Storage)
│   ├── /migrations                      # PostgreSQL & TimescaleDB schema migrations
│   └── /lakehouse-rules                 # Apache Iceberg & Spark partition definitions
└── /security                            # Zero-Trust IAM & Security Scripts
    ├── /kms                             # HSM Integration scripts & Vault configurations
    └── /secdb-rules                     # PostgreSQL Row-Level (RLS) policies declarations
```

---

## 2. Complete File Structure (Core Manifest)
Below are the files critical to the construction of the IDG platform:

### 1. Monorepo Configuration Root
*   **File Path**: `/package.json`
    *   **Responsibility**: Defines the monorepo-wide tools, shared helper scripts, and packages directories list.
    *   **Interfaces**: Global lifecycle tasks (`npm run dev`, `npm run build`, `npm run lint`).
    *   **Dependencies**: `pnpm`, `typescript`, `esbuild`, `tsx`.
*   **File Path**: `/pnpm-workspace.yaml`
    *   **Responsibility**: Declares directories designated as workspace modules.
    *   **Interfaces**: Workspace configurations specifications.
    *   **Dependencies**: None.
*   **File Path**: `/tsconfig.json`
    *   **Responsibility**: Enforces compiler strict-types requirements across all projects.
    *   **Interfaces**: TypeScript target definitions layout (`ESNext`, `moduleResolution: "node"`, `strict: true`).
    *   **Dependencies**: `typescript`.

### 2. Apps Domain (Frontends)
*   **File Path**: `/apps/command-center-web/src/App.tsx`
    *   **Responsibility**: Core cabinet dashboard UI, routing between regional operations metrics, live Customs revenues, and active risk charts.
    *   **Interfaces**: Render views according to current operator authentication scopes.
    *   **Dependencies**: `/packages/ui-core`, `/packages/api-client`.
*   **File Path**: `/apps/customs-portal-web/src/pages/FilingPortal.tsx`
    *   **Responsibility**: Multi-step layout for importers to deposit digital declarations, invoices, and HS-Code selections.
    *   **Interfaces**: `FilingSubmit(manifest: RawManifest): Promise<ReceiptToken>`
    *   **Dependencies**: `/packages/crypto-sdk` (client-side manifest signing), `/packages/api-client`.
*   **File Path**: `/apps/border-terminal-client/src/components/ScannerTerminal.tsx`
    *   **Responsibility**: Physical terminal controller for customs lanes. Renders raw X-ray overlays and provides controls to open exit barriers.
    *   **Interfaces**: `OnScannerEvent(buffer: ScannerArray): void`, `SetBarrierState(open: boolean): Promise<boolean>`
    *   **Dependencies**: `/packages/ui-core`, `/packages/api-client`.
*   **File Path**: `/apps/inspector-mobile-client/src/App.kt`
    *   **Responsibility**: Android app for mobile inspect forces checking truck hashes and biosafety labels at parking lanes.
    *   **Interfaces**: `ScanQRBarcode(): String`, `VerifyIntegritySignature(hash: String): Flow<CheckState>`
    *   **Dependencies**: Jetpack Compose UI, MLKit QR/Barcode Scanner SDK.

### 3. Services Domain (Microservices)
*   **File Path**: `/services/identity-auth-service/server.ts`
    *   **Responsibility**: Main identity provider running OIDC, handling credentials, biometrics, FIDO2, and WebAuthn challenges.
    *   **Interfaces**: `POST /auth/login`, `POST /auth/mfa/webauthn`, `POST /auth/token/refresh`.
    *   **Dependencies**: `express`, `fido2-lib`, `crypto`, `jose`.
*   **File Path**: `/services/customs-tariff-service/server.ts`
    *   **Responsibility**: Core computational customs tax evaluation based on current laws and exceptions rules.
    *   **Interfaces**: `POST /tariff/evaluate`, `GET /tariff/hs-codes/:code`.
    *   **Dependencies**: `express`, `pg` (Postgres adapter), `zod`.
*   **File Path**: `/services/payment-settlement-service/server.ts`
    *   **Responsibility**: SWIFT & CBI gateway. Ingests and processes ISO 20022 wire matching messages.
    *   **Interfaces**: `POST /settlement/iso-inbound`, `GET /settlement/reconciliation-status/:prn`.
    *   **Dependencies**: `fast-xml-parser`, `express`, `/packages/crypto-sdk`.
*   **File Path**: `/services/iot-telemetry-service/server.ts`
    *   **Responsibility**: High-frequency telemetry broker capturing data from vehicle GPS coordinates and container locks.
    *   **Interfaces**: `WebSocket /telemetry/fleet/stream`, `POST /telemetry/incident-alert`.
    *   **Dependencies**: `ws`, `timescaledb-client-sdk`.
*   **File Path**: `/services/audit-ledger-service/server.ts`
    *   **Responsibility**: Cryptographically links all core events into sequential ledger blocks, preventing retroactive manipulation.
    *   **Interfaces**: `POST /ledger/block/append`, `GET /ledger/block/verify-chain`.
    *   **Dependencies**: `express`, `/packages/crypto-sdk`.

### 4. Shared Packages Domain (Utilities)
*   **File Path**: `/packages/ui-core/src/components/Button.tsx`
    *   **Responsibility**: Custom button components matching space brand styling guidelines.
    *   **Interfaces**: `export Button: FC<ButtonProps>`
    *   **Dependencies**: `lucide-react`, `tailwind-merge`, `clsx`.
*   **File Path**: `/packages/crypto-sdk/src/signing.ts`
    *   **Responsibility**: Handles local cryptographic transactions, standard PKCS7, and X.509 signature processing.
    *   **Interfaces**: `SignPayload(payload: object, key: string): string`, `VerifyState(payload: object, signature: string, cert: string): boolean`.
    *   **Dependencies**: `node-forge`.
*   **File Path**: `/packages/api-client/src/index.ts`
    *   **Responsibility**: Aggregated Javascript API client module routing queries across all internal microservice routers.
    *   **Interfaces**: Exported class object representing nested service endpoints.
    *   **Dependencies**: `axios`.

---

## 3. Complete Database Structure (SQL / OLAP / NoSQL)
The IDG National Data Fabric uses a multi-layered storage layout matching modern **Lakehouse** designs.

```text
========================================================================================================================
                                     NATIONAL UNIFIED PORTAL STORAGE SPECS
========================================================================================================================

 ┌────────────────────────────────────────────────────────┐
 │            1. OLTP PRIMARY TRANSACTIONAL METADATA       │
 │   PostgreSQL Primary engine running clustered nodes   │
 └───────────────────────────┬────────────────────────────┘
                             │ (Continuous Change Data Capture via Debezium CDC)
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │            2. EVENT STREAM RAW INGESTION QUEUE         │
 │   Apache Kafka immutable topics                        │
 └───────────────────────────┬────────────────────────────┘
                             │ (Continuous Micro-Batch Sink)
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │            3. UNIFIED OBJECT LAKEHOUSE SYSTEM          │
 │   S3 Object API (MinIO / Ceph local clusters)          │
 │   Structured under core Apache Iceberg Table Formats   │
 └────────────────────────────────────────────────────────┘
```

### 1. Operational OLTP Schemas (PostgreSQL / TimescaleDB)
All tables operate with custom row-level security enabled.

#### Table: `customs.declarations`
Holds transactional details representing active cargo.
*   `id`: `UUID PRIMARY KEY DEFAULT gen_random_uuid()`
*   `importer_id`: `UUID NOT NULL REFERENCES master.importers(id)`
*   `hs_code`: `VARCHAR(10) NOT NULL`
*   `declared_value_usd`: `NUMERIC(15, 2) NOT NULL`
*   `tax_liability_iqd`: `NUMERIC(15, 2) NOT NULL`
*   `reconciliation_status`: `VARCHAR(30) DEFAULT 'UNPAID'`
*   `checkpoint_id`: `VARCHAR(50) NOT NULL`
*   `payload_signature`: `TEXT NOT NULL` -- Cryptographic client-signed stamp
*   `created_at`: `TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP`

#### Table: `identity.operator_profiles`
Main identity profiles matching civil registry indexes.
*   `id`: `UUID PRIMARY KEY REFERENCES auth.users(id)`
*   `role`: `VARCHAR(50) NOT NULL`
*   `assigned_checkpoint_id`: `VARCHAR(50)` -- Null for top-level admin
*   `biometric_enclave_key`: `VARCHAR(256)` -- Reference to template identifier
*   `updated_at`: `TIMESTAMPTZ`

#### Table: `logistics.fleet_telemetry` (TimescaleDB Hypertable)
Compiles real-time, high-density telemetry from commercial trucks.
*   `time`: `TIMESTAMPTZ NOT NULL`
*   `vehicle_id`: `VARCHAR(50) NOT NULL`
*   `latitude`: `DOUBLE PRECISION NOT NULL`
*   `longitude`: `DOUBLE PRECISION NOT NULL`
*   `lock_status`: `VARCHAR(20) NOT NULL`
*   `temperature_celsius`: `NUMERIC(4, 2)`

### 2. Analytical Tables (Apache Iceberg over MinIO S3 Object Storage)
Partitions are stored in binary Parquet files.

#### Gold Zone Star-Schema Layout (Data Warehouse)
##### Fact Table: `gold_customs.fact_tariffs_collected`
*   `time_key`: `INTEGER REFERENCES gold_dimensions.dim_date(key)`
*   `importer_key`: `INTEGER REFERENCES gold_dimensions.dim_importers(key)`
*   `hs_key`: `INTEGER REFERENCES gold_dimensions.dim_hs_codes(key)`
*   `checkpoint_key`: `INTEGER REFERENCES gold_dimensions.dim_checkpoints(key)`
*   `value_settled_usd`: `NUMERIC(18, 2)`
*   `under_invoicing_risk_score`: `DOUBLE PRECISION`

---

## 4. Complete API Structure (gRPC & REST Specifications)
Microservices communicate internally using performance-focused **gRPC**, and with frontend runtimes using secure SSL **REST API** contracts.

### 1. Internal Protocol Buffers (gRPC)
Used for fast inter-service communication:

```protobuf
syntax = "proto3";
package iraq.idg.customs;

service TariffCalculator {
  rpc EvaluateTaxes (TariffRequest) returns (TariffResponse);
}

message TariffRequest {
  string hs_code = 1;
  double declared_value_usd = 2;
  string importer_id = 3;
}

message TariffResponse {
  double calculated_tax_iqd = 1;
  double base_hs_percentage = 2;
  string exemption_applied_code = 3;
  bool is_high_risk = 4;
}
```

### 2. External Edge REST Payloads (JSON over SSL)
Used by web portals and border client terminals.

#### API Contract: `POST /api/v1/settlement/process`
Submits payments from partner banks:
*   **Request Headers**:
    ```http
    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR...
    X-Client-Signature: MEYCIQCr8gSg1A7wN3gCg7...
    ```
*   **Request JSON Payload**:
    ```json
    {
      "prn_token": "PRN-901-788219-IQ",
      "bank_transaction_id": "CBI-TX-882190-2026",
      "settled_amount_iqd": 12500000.00,
      "settlement_time_utc": "2026-06-04T02:56:02Z",
      "iso_message_type": "pacs.008"
    }
    ```
*   **Response JSON Payload**:
    ```json
    {
      "status": "BALANCED_SUCCESS",
      "ledger_block_index": 7118210,
      "transaction_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "open_barrier_permit": true
    }
    ```

---

## 5. Complete Event Structure (Kafka Topics & Flink Pipeline)
To ensure dynamic, near-instant cargo auditing, all transactions, declarations, and physical sensor outputs are emitted as immutable event logs.

### 1. Multi-Agency Kafka Topics List
*   `iraq.idg.customs.manifest.raw`
    *   *Producer*: Importer Web Portal
    *   *Payload*: Raw cargo details, files, and initial values configurations.
*   `iraq.idg.financial.cbi.wire-settled`
    *   *Producer*: CBI Payment Gateway
    *   *Payload*: Bank wire settlements matching wire transactions hashes.
*   `iraq.idg.border.scanner.scan-completed`
    *   *Producer*: Point Check Scanner client
    *   *Payload*: Raw sonar/scan profiles and identified density vectors.
*   `iraq.idg.platform.security.rls-violations`
    *   *Producer*: Core Database Engine
    *   *Payload*: Alerts on illegal database access attempts across geofenced limits.

### 2. Stateful Stream Joins Specification (Apache Flink SQL)
Automates the detection of financial evasion. It evaluates transaction matches on-the-fly, correlating assets using a rolling 1-hour window:

```sql
SELECT 
  man.id AS manifest_id,
  man.declared_value_usd,
  wire.settled_amount_iqd,
  (man.declared_value_usd * 1450.00) - wire.settled_amount_iqd AS absolute_financial_drift
FROM 
  iraq.idg.customs.manifest.raw man
INNER JOIN 
  iraq.idg.financial.cbi.wire-settled wire
  ON man.id = wire.manifest_id
  AND wire.event_time BETWEEN man.event_time - INTERVAL '1' HOUR AND man.event_time + INTERVAL '1' HOUR
WHERE 
  ABS((man.declared_value_usd * 1450.00) - wire.settled_amount_iqd) > 100000.00; -- Alert when drift exceeds threshold
```

---

## 6. Complete AI Structure (Local Neural Registry)
No public internet LLM APIs are used. The cognitive layer is hosted on on-premises GPUs running local neural models.

### 1. Model Registry Index Code
*   **Location**: `/ai/model-registry/registry.json`
*   **Model Profiles**:
    *   `IDG-Cortex-V3`: Fine-tuned 8-billion parameter local model optimizing cargo classifications and WCO HS code alignments.
    *   `Iraq-Risk-V1`: High-precision neural network trained on historic audited customs fraud cases, outputting danger scores for under-invoicing anomalies.
    *   `Ur-Transit-MoE`: Shared Mixture-of-Experts (MoE) model orchestrating fleet routes and forecasting border crossing queues.

### 2. Prompt Template Schema
*   **Location**: `/ai/prompt-library/hs-classifier-prompt.txt`
    ```text
    [ROLE DEFINITION]: Supreme Classifier of World Customs Organization (WCO) HS Customs Codes.
    [CONTEXTUAL INJECTS]:
    - Country of Origin: {{ origin_country }}
    - Goods Raw Text description: {{ description_query }}
    - Declared cargo value: {{ declared_val }} USD
    [TARGET INSTRUCTION]: Evaluate Goods description and suggest the optimal 8-digit HS Code. 
    Output strictly valid JSON listing "hs_code", "tariffs_percentage", "confidence_index".
    ```

---

## 7. Complete Security Structure (National Security Guard)
Every level of the system operations utilizes zero-trust rules, physical keys, and cryptographically verified policies.

### 1. Certificate Authority Trust Hierarchy (Sovereign PKI)
```text
           [ SECURE AIR-GAPPED ROOT CA ]
                   (AES-256 HSM)
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
[ ONLINE IDENTITY CA ]           [ ONLINE OUTPOST CA ]
(SPIRE OIDC / mTLS Engine)      (Border node validations)
```

### 2. Attribute-Based Access Control (ABAC) Equation
Access decisions to high-security tables require satisfying a strict runtime conditional equation:

$$\text{Verdict} = (\text{Role} \in \text{Whitelist}) \land (\text{Station.IP} \in \text{AllowedIPs}) \land (\text{Geofence.Distance} \le 100\text{m}) \land (\text{CryptoKey.Status} \equiv \text{VALID})$$

### 3. Privileged Access Management (PAM) Just-In-Time Escalation Config
*   **Path**: `/security/kms/pam-escalation-policy.json`
    ```json
    {
      "escalation_policy": {
        "max_session_duration_minutes": 60,
        "dual_operator_signature_required": true,
        "allowed_source_cidr_blocks": ["10.100.20.0/24"],
        "commands_blacklist": ["rm -rf", "drop database", "truncate table"],
        "immediate_alerts_target_channel": "pmo-soc-incident-logs"
      }
    }
    ```

---

## 8. Complete Infrastructure Structure (Terraform Subnets Topology)
The system is built on-premises in secure state facilities using declarative, reproducible subnets:

```text
========================================================================================================
                                    IDG SOVEREIGN PRIVATE NETWORKS LAYER
========================================================================================================

       [ PUBLIC CUSTOMS / IMPORTERS NETWORK ] 
                         │
                         ▼ (Security SSL Boundary)
               ┌──────────────────┐
               │  Envoy Ingress   │
               │  API Gateway     │
               └─────────┬────────┘
                         │ (mTLS SPIRE Boundary)
                         ▼
        ┌────────────────────────────────────────────────────────┐
        │        1. DMZ SERVICES SUBNET (10.100.10.0/24)         │
        │ - identity-auth-service   - customs-tariff-service     │
        │ - payment-settlement-service                           │
        └────────────────────────┬───────────────────────────────┘
                                 │ (Secure HSM Boundary)
                                 ▼
        ┌────────────────────────────────────────────────────────┐
        │        2. SECURE STORAGE SUBNET (10.100.20.0/24)       │
        │ - Primary Postgres Clusters                            │
        │ - MinIO Lakehouse Storage (S3 API)                     │
        └────────────────────────┬───────────────────────────────┘
                                 │ (Air-Gapped Interface)
                                 ▼
        ┌────────────────────────────────────────────────────────┐
        │        3. SUPREME CABINET BUNKER (10.100.30.0/24)      │
        │ - Vault HSM Managers   - Supreme Ledger Core           │
        └────────────────────────────────────────────────────────┘
========================================================================================================
```

---

## 9. Complete Deployment Structure (Continuous GitOps Integration)
Deployment operations are fully automated using GitOps pipelines, eliminating manual edits in production servers.

### 1. Image Lifecycle Pipeline (CI/CD)
*   Container pipelines are managed by **Tekton Pipelines**, producing images inside secure registries.
*   Compilation steps generate signed container images using **Cosign** validated against Intermediate CA trust keys.

### 2. Automated GitOps Sync Loop (ArgoCD Layout)
*   **Path**: `/infrastructure/k8s/argocd-idg-app.yaml`
    ```yaml
    apiVersion: argoproj.io/v1alpha1
    kind: Application
    metadata:
      name: idg-customs-calculators
      namespace: argocd
    spec:
      project: default
      source:
        repoURL: 'git://national-code.idg.gov.iq/infrastructure/gitops-prod'
        targetRevision: HEAD
        path: deployments/customs-tariff
      destination:
        server: 'https://kubernetes.default.svc'
        namespace: active-customs
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
    ```

---

## 10. Complete Testing Structure (The Quality Shield)
High reliability is governed by sequential validation levels.

### Code Testing Structure
```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ IDG COMPREHENSIVE TESTING MATRIX                                                                       │
├─────────────────────┬──────────────────────────────┬───────────────────────────┬───────────────────────┤
│ Testing Tier        │ Execution Channel            │ Target Coverage Invariant │ Tool Selection        │
├─────────────────────┼──────────────────────────────┼───────────────────────────┼───────────────────────┤
│ Unit Unit-Tests     │ Local developer build-time   │ >= 90% Code Coverage      │ Jest / Vitest / GoTest│
│ Integration Tests   │ CI/CD Pipeline Build Stage   │ Fully Mocked DB adapters  │ Supertest / GoMock    │
│ Contract Tests      │ Integration Gates Validation │ Consumer-Provider Match   │ Pact Framework        │
│ Reliability Tests   │ Pre-production Staging Vault │ Network Failures Response │ Chaos Mesh / Toxiproxy│
└─────────────────────┴──────────────────────────────┴───────────────────────────┴───────────────────────┘
```

#### Chaos Mesh Test Declaration (Outpost Loss Simulation)
*   **Path**: `/infrastructure/k8s/chaos-network-loss.yaml`
    ```yaml
    apiVersion: chaos-mesh.org/v1alpha1
    kind: NetworkChaos
    metadata:
      name: border-network-loss-simulate
      namespace: active-customs
    spec:
      action: delay
      mode: fixed
      value: '22ms'
      direction: to
      target:
        selector:
          app: border-terminal-client
      duration: '30s'
      scheduler:
        cron: '@every 10m'
    ```

---

## 11. Multi-Year Implementation Roadmap

```text
========================================================================================================
                                    IDG MULTI-YEAR ROADMAP LIFECYCLE
========================================================================================================

  [ PHASE 1: MVP ] ──────────► [ PHASE 2: HARDENING ] ──────────► [ PHASE 3: ROLLOUT ] ──────────► [ PHASE 4: REGIONAL ]
   - Core Monorepo Setup        - HSM Integrations               - All Border Checkpoints          - Cross-Border API
   - SQL schemas initialization - CDC Kafka pipelines           - Offline DB replicates           - Multilingual translate
   - OIDC auth & Web UI         - ABAC & PAM validation          - Active geofencing               - Regional consensus
========================================================================================================
```

### Phase 1: MVP (Months 1–6)
*   **Core Systems Strategy**: Initialize the central monorepo structure, shared libraries, and build config files. Erect primary database tables.
*   **Milestones**:
    *   *Month 2*: Full monorepo scaffolding compilation, including TypeScript, Docker registries, and Lint gates.
    *   *Month 4*: Deploy basic `identity-auth-service` with active OIDC tokens and `customs-tariff-service` with PostgreSQL connections.
    *   *Month 6*: Complete the early `customs-portal-web` and `command-center-web` MVP UI interfaces, enabling base manifest uploads and tax assessments.

### Phase 2: Production Hardening (Months 7–12)
*   **Core Systems Strategy**: Integration of security, encryption, and transactional streaming pipelines. Eliminate mock variables completely.
*   **Milestones**:
    *   *Month 8*: Standardize HSM integrations, setting automatic key rotations inside HashiCorp Vault. Configure mTLS Envoy service mesh.
    *   *Month 10*: Deploy Apache Kafka and Debezium CDC lines, transferring database transactions to Flink window match pipelines.
    *   *Month 12*: Configure PAM JIT access boundaries and establish standard logging systems, completing internal security audits.

### Phase 3: National Rollout (Months 13–18)
*   **Core Systems Strategy**: Deploying the platform out to physical border checkpoints, warehouses, and customs outposts, managing offline-first replication.
*   **Milestones**:
    *   *Month 14*: Standardize local database replication loops using encrypted SQLCipher SQLite local databases for border nodes.
    *   *Month 16*: Deploy the `border-terminal-client` live on-site, integrating physical hardware scanners and biometric authentication devices.
    *   *Month 18*: Activate real-time ABAC geofencing controls, validating inspector activity contexts dynamically.

### Phase 4: Regional Expansion (Months 19–36)
*   **Core Systems Strategy**: Connect IDG to neighboring international custom links, scale model registries, and enable cross-border transshipments.
*   **Milestones**:
    *   *Month 24*: Open standardized cross-border API endpoints, linking with trade directories in Turkey, Jordan, and GCC seaports.
    *   *Month 30*: Enable advanced multilingual semantic translation modules in the local Bilal AI Cortex model.
    *   *Month 36*: Establish multi-facility geographical redundancy (consisting of Baghdad Alpha, Erbil Beta rock vaults, and Basra Gamma bunkers), completing the supreme sovereign Trade Gateway of the Republic of Iraq.
