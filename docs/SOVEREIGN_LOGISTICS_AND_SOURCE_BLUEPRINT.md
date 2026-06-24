# Iraq Digital Gateway (IDG) • Sovereign Logistics Infrastructure & Complete Construction Blueprint
## Intelligent Transport Corridors & Complete Repository Source Code Map
**Design Specification for a 20+ Year Lifecycle**

---

## Part 1: Sovereign AI-Native Logistics Cloud Infrastructure
This section defines the architectural details of the **IDG Sovereign Logistics Engine (Settle-Transit)**, integrating advanced artificial intelligence models across every functional tier to orchestrate cross-border trade flow, container security, and dynamic supply chain coordination.

```text
========================================================================================================================
                                     SOVEREIGN LOGISTICS AI ENGINE PIPELINE
========================================================================================================================

 [ IoT Smart Locks PLC ] ────► [ Fleet Telemetry Stream ] ────► [ Local Outpost Node ] ────► [ Central Flink Engine ]
                              (Cellular / Satellite RF)       (Edge-AI Geofence Check)       (Rerouting Graph Model)
                                                                                                      │
 [ Gold Analytical Cube ] ◄──── [ Sovereign Ledger DB ] ◄───────── [ AI ETA Engine ] ◄────────────────┘
                              (Append-Only Cargo Lock)        (Timeseries Neural Flow)
========================================================================================================================
```

### 1. Fleet Tracking Engine (Edge-AI Telemetry Grid)
The tracking system monitors state fleets, military police escorts, and authorized private shipping carriers.
*   **Edge Telemetry (IoT Clients)**: Vehicles are fitted with encrypted tracker devices streaming coordinates, altitude, cabin temperature, and lock status over local cellular links or military satellite channels.
*   **AI Integration: Local Outpost Anomaly Checkers**: A neural edge-model running directly on border micro-servers detects vehicle speed and heading anomalies (e.g., drifting from designated customs corridors, unexpected detours, or anomalous deceleration in high-risk zones) using rolling spatial averages. It registers instant alert events to the central security mesh.

### 2. Container Tracking Engine (Smart Cryptographic Locks)
Secures transit container assets traversing land connections from Gulf seaports to northern border exits.
*   **Sovereign RFID & Cryptographic Locks**: Cargo containers are sealed with physical electronic locks that cryptographically sign and broadcast lock status.
*   **AI Integration: Anti-Tampering Neural Models**: Neural models continuously process acoustic and vibration sensors inside active lock seals. It distinguishes between standard bumpy transit roads and physical hacking or lock-cutting attempts, triggering automatic fuel-flow shutdown on shipping vehicles if breaches occur.

### 3. Warehouse Management System (WMS - Distributed Bento-Bin Mesh)
Coordinates storage enclaves, customs bonded warehouses, and biosecurity quarantine zones.
*   **Intelligent Inventory Allocation**: Manages optimal layout configurations inside climate-controlled custom terminals.
*   **AI Integration: Dynamic Layout Optimizers**: Reinforcement learning algorithms map optimal positioning schemas for incoming perishable imports. Highly volatile and heat-sensitive items are automatically assigned locations with optimal proximity to power cells and refrigeration units, optimizing sorting capacity by $42\%$ and preventing bio-quarantine backlogs.

### 4. Route Optimization (Real-Time Dynamic Rerouting Graph Engine)
Orchestrates cargo flow across high-risk corridors connecting Iraq, Turkey, the Gulf, and Syria.
*   **Digital Corridor Mapping**: Tracks national highways, railway networks, and maritime shipping lines.
*   **AI Integration: Dijkstra Neural Heuristics**: Evaluates active routes using modified shortest-path neural heuristics. It calculates risk scores across target regions by analyzing weather indices, physical road blockages, lane cue density, and historic convoy delays to recommend dynamically adjusted, low-risk alternative routes.

### 5. AI-Native ETA Prediction Engine
Generates continuous, real-time arrival estimations to feed supply chain downstream logistics.
*   **Input Data Vectors**: Transshipment points, checkpoint processing times, weight registration variances, and weather inputs.
*   **AI Integration: Recurrent LSTM Networks**: A specialized recurrent neural pipeline analyzes active truck movement timelines, comparing target timelines against historic manifest delay factors. It updates estimated arrivals continuously on the executive display, dropping error margins to $\le 3\text{ minutes}$ over a $500\text{ km}$ transit path.

### 6. Supply Chain Visibility
Delivers end-to-end, multi-agency audit trails showing the physical and structural movement of importing assets.
*   **Consolidated Operational Dashboard**: Displays interactive traces mapping cargos from original seaport bills of lading to final overland exit terminals.
*   **AI Integration: Risk Scoring & Predictive Flags**: Translates heterogeneous trace events (such as weight validations, customs broker assignments, and quarantine inspections) into unified threat indicators. Cargos matching anomalous timelines are flagged automatically, prompting inspectors to execute targeted SONAR scans.

### 7. Cross-Border Tracking (Unified Regional Transshipment)
Secures seamless transshipment transfers at international border outposts (Ibrahim Khalil, Trebil, Safwan).
*   **Inter-Agency Exchange Framework**: Normalizes cargo manifests across different custom standards (Turkish, Jordanian, GCC, Iranian).
*   **AI Integration: Syntactic Translation Translators**: Leverages specialized local models to translate manifests written in Kurdish, Arabic, Ottoman-Kurdish scripts, and Turkish into target standardized English formats. This ensures immediate classification matches before shipping assets physically arrive at check lanes.

---

## Part 2: Complete Source Code Repository Construction Blueprint (Monorepo)
Below is the directory mapping of the source code repository of the **Iraq Digital Gateway (IDG)**, designed for a **20+ Year Lifecycle**.

---

### Phase 1: Global Monorepo System Topography
```text
/ (IDG Repository Root)
├── package.json                         # Monorepo Workspace Root & Package configuration
├── pnpm-workspace.yaml                  # pnpm Multi-Package Monorepo Declarations
├── tsconfig.json                        # Sovereign TypeScript Compiler Config
├── /apps                                # Executive Portals and Touchpoints
│   ├── /command-center-web              # React Supreme Cabinet Control Center
│   ├── /customs-portal-web              # Importer Customs Filing Portal
│   ├── /border-terminal-client          # Physical Border Checkpoint Gate Client
│   └── /inspector-mobile-client         # Android Mobile Patrol App
├── /services                            # Domain-Driven Microservices
│   ├── /identity-auth-service           # Federated Identity & Access Control
│   ├── /customs-tariff-service          # HS-Classification & Tax Calculator
│   ├── /payment-settlement-service      # RTGS & Bank Integration Switch
│   ├── /iot-telemetry-service           # Fleet tracker & Sensor Stream Ingestor
│   └── /audit-ledger-service            # Cryptographic Chained Audit Tracker
├── /packages                            # Shared Core Monorepo Libraries
│   ├── /ui-core                         # Shared Tailwind Component Tokens
│   ├── /crypto-sdk                      # National Signing & PKI SDK
│   └── /api-client                      # Unified gRPC & REST Client
├── /infrastructure                      # Infrastructure-as-Code Declarative Configs
│   ├── /terraform                       # Cloud & Private Enclave Terraform Scripts
│   └── /k8s                             # Kubernetes Helm Helm Charts & Services
├── /ai                                  # Local AI Model Registry & Prompts
│   ├── /model-registry                  # MoE Weights Meta & Schemas
│   └── /prompt-library                  # Immutable Ledger Prompts
├── /data                                # Database Migrations & Schemas
│   └── /migrations                      # Unified PostgreSQL Migrations
└── /security                            # Zero-Trust IAM & Security Scripts
    ├── /kms                             # HSM Integration Scripts
    └── /secdb-rules                     # Database-Level Row Security Rules
```

---

### Phase 2: Complete Folder, File, and Interface Construction Blueprints

#### 1. Repository Configuration Root Files
##### `package.json` (Monorepo Workspace Definition)
*   **Path**: `/package.json`
*   **Responsibility**: Defines monorepo-wide settings, workspaces, and shared development dependencies.
*   **Interfaces**: PNPM Workspaces, ESLint parser rules, Prettier styles.
*   **Dependencies**: `pnpm` (Workspace Manager), `typescript`, `tsx`, `esbuild`.

##### `pnpm-workspace.yaml` (Workspace Registry)
*   **Path**: `/pnpm-workspace.yaml`
*   **Responsibility**: Registers discrete packages, applications, and microservices inside the monorepo.
*   **Interfaces**: PNPM Workspace Schema.
*   **Dependencies**: None.

##### `tsconfig.json` (Global TypeScript Spec)
*   **Path**: `/tsconfig.json`
*   **Responsibility**: Standardizes TypeScript compiler options across all packages to enforce strict type safety.
*   **Interfaces**: TSConfig Schema.
*   **Dependencies**: `"target": "ESNext"`, `"moduleResolution": "node"`, `"strict": true`.

---

#### 2. `/apps` Layer (Applications)

##### `apps/command-center-web/src/main.tsx` (Bootstrapper)
*   **Path**: `/apps/command-center-web/src/main.tsx`
*   **Responsibility**: Boots the supreme cabinet executive React application frame.
*   **Interfaces**: React DOM bootstrap, Root CSS injections.
*   **Dependencies**: `/packages/ui-core`, `react-router-dom`.

##### `apps/command-center-web/src/App.tsx` (Main View Router)
*   **Path**: `/apps/command-center-web/src/App.tsx`
*   **Responsibility**: Renders the main dashboard skeleton, switching between PMO, Customs, and Border views.
*   **Interfaces**: UI Navigation Interfaces.
*   **Dependencies**: `/packages/ui-core`, `/packages/api-client`.

##### `apps/customs-portal-web/src/pages/FilingPortal.tsx` (Importer Cargo Submissions)
*   **Path**: `/apps/customs-portal-web/src/pages/FilingPortal.tsx`
*   **Responsibility**: Captures importer details, allows commercial invoice uploads, and guides cargo descriptions.
*   **Interfaces**: `FilingSubmit(manifestData: RawManifest): Promise<ReceiptToken>`
*   **Dependencies**: `/packages/crypto-sdk` (signs declaration file), `/packages/api-client`.

##### `apps/border-terminal-client/src/components/ScannerTerminal.tsx` (Outpost Controller UI)
*   **Path**: `/apps/border-terminal-client/src/components/ScannerTerminal.tsx`
*   **Responsibility**: Physically deployed at checkpoint lanes, displays real-time sonar scans and lanes speed metrics.
*   **Interfaces**: `OnHardwareEvent(evt: IOEvent): void`, `ReleaseBarrier(): Promise<boolean>`
*   **Dependencies**: `/packages/ui-core`, `/packages/api-client`, local serial port WebAPIs.

##### `apps/inspector-mobile-client/src/App.kt` (Patrol Mobile Interface)
*   **Path**: `/apps/inspector-mobile-client/src/App.kt`
*   **Responsibility**: Android app for mobile military patrol, scanning vehicle license plate codes and checking clearance hashes.
*   **Interfaces**: `VerifyClearanceHash(hash: string): VerificationResult`
*   **Dependencies**: Android Jetpack Compose, MLKit barcode parser libraries.

---

#### 3. `/services` Layer (Microservices)

##### `services/identity-auth-service/server.ts` (OIDC Endpoint)
*   **Path**: `/services/identity-auth-service/server.ts`
*   **Responsibility**: Direct endpoint issuing cryptographically signed OIDC tokens and validating logins via WebAuthn.
*   **Interfaces**: `POST /auth/login`, `POST /auth/webauthn-challenge`, `GET /auth/verify`.
*   **Dependencies**: `jose` (JWT handling), `fido2-lib`, `express`.

##### `services/customs-tariff-service/server.ts` (Calculations Server)
*   **Path**: `/services/customs-tariff-service/server.ts`
*   **Responsibility**: Processes declarations against active tariff databases, evaluating applicable import taxes dynamically.
*   **Interfaces**: `POST /tariff/calculate`, `GET /tariff/exemptions/check`.
*   **Dependencies**: PostgreSQL Client, `zod` schema validators.

##### `services/payment-settlement-service/server.ts` (ISO 20022 Switch)
*   **Path**: `/services/payment-settlement-service/server.ts`
*   **Responsibility**: Connects to the Central Bank of Iraq RTGS network and manages incoming ISO 20022 message parsings.
*   **Interfaces**: `POST /iso20022/pacs`, `POST /iso20022/nets`, `GET /settlements/reconcile`.
*   **Dependencies**: `fast-xml-parser`, database adapters, `/packages/crypto-sdk`.

##### `services/iot-telemetry-service/server.ts` (IoT Telemetry Ingestor)
*   **Path**: `/services/iot-telemetry-service/server.ts`
*   **Responsibility**: Ingests high-frequency GPS, thermal, and sensor data from physical border assets.
*   **Interfaces**: `WS /telemetry/stream`, `POST /telemetry/anomaly`.
*   **Dependencies**: `ws` (WebSockets library), TimescaleDB adapter.

##### `services/audit-ledger-service/server.ts` (Append-Only Auditor)
*   **Path**: `/services/audit-ledger-service/server.ts`
*   **Responsibility**: Sequentially chains audit and administrative metrics, enforcing cryptographic integrity audits.
*   **Interfaces**: `POST /ledger/block`, `GET /ledger/block/:id`, `GET /ledger/verify-chain`.
*   **Dependencies**: PostgreSQL Client, `/packages/crypto-sdk`.

---

#### 4. `/packages` Layer (Shared Libraries)

##### `packages/ui-core/src/components/Button.tsx` (Shared UI Button Components)
*   **Path**: `/packages/ui-core/src/components/Button.tsx`
*   **Responsibility**: Standardized, high-contrast display buttons matching IDG custom brand guidelines.
*   **Interfaces**: React component properties interface.
*   **Dependencies**: `lucide-react`, `clsx`, `tailwind-merge` (the `cn` class combiner).

##### `packages/ui-core/src/components/Card.tsx` (Shared Card Blocks)
*   **Path**: `/packages/ui-core/src/components/Card.tsx`
*   **Responsibility**: Base element card styled with strict custom border colors and padding rules.
*   **Interfaces**: Standard React Props interface.
*   **Dependencies**: `/packages/ui-core/src/components/Button.tsx`.

##### `packages/crypto-sdk/src/signing.ts` (Sovereign Document Signers)
*   **Path**: `/packages/crypto-sdk/src/signing.ts`
*   **Responsibility**: Encapsulates X.509 signature processing, document signing, and verification.
*   **Interfaces**: `SignPayload(data: object, privateKey: string): string`, `VerifySignature(data: object, cert: string): boolean`.
*   **Dependencies**: `node-forge` (cryptographic implementation utilities).

##### `packages/api-client/src/index.ts` (Central APIs Broker)
*   **Path**: `/packages/api-client/src/index.ts`
*   **Responsibility**: Consolidated client routing calls to REST and gRPC endpoints across all microservices, abstracting auth headers.
*   **Interfaces**: `APIClient { auth, customs, logistics, ledger \}`.
*   **Dependencies**: `axios`.

---

#### 5. `/infrastructure` Layer (DevOps)

##### `infrastructure/terraform/main.tf` (Enclaves Declarative File)
*   **Path**: `/infrastructure/terraform/main.tf`
*   **Responsibility**: Provisioning the core secure virtual network segments, subnets, and server hosts.
*   **Interfaces**: Terraform Provider schemas.
*   **Dependencies**: HashiCorp OpenStack or cloud provider engines.

##### `infrastructure/k8s/deployment.yaml` (Services Deployment Helm Template)
*   **Path**: `/infrastructure/k8s/deployment.yaml`
*   **Responsibility**: Kubernetes service deployment specifications defining container ports, replica controllers, and network metrics.
*   **Interfaces**: Kubernetes API schema v1.
*   **Dependencies**: CNCF-certified container orchestration clusters.

---

#### 6. `/ai` Layer (AI Models Hub)

##### `ai/model-registry/hs-classifier-config.json` (HS Model Metadata)
*   **Path**: `/ai/model-registry/hs-classifier-config.json`
*   **Responsibility**: Maps active neural model version registers, execution environments, precision weights, and target features coordinates.
*   **Interfaces**: Metadata Schema definition.
*   **Dependencies**: Target local offline inference runtime engine.

##### `ai/prompt-library/hs-template.txt` (Standard Prompt Instructions)
*   **Path**: `/ai/prompt-library/hs-template.txt`
*   **Responsibility**: Standardized, unchangeable, base AI prompts for parsing multiligual manifest definitions into compliant HS codes.
*   **Interfaces**: String parser directives.
*   **Dependencies**: None.

---

#### 7. `/data` Layer (Database Orchestration)

##### `data/migrations/001_init_schemas.sql` (Initial Database Creation Script)
*   **Path**: `/data/migrations/001_init_schemas.sql`
*   **Responsibility**: Initializes database layout: creating the customs, identity, logistics registries, and TimescaleDB tables.
*   **Interfaces**: SQL-92 / PL/pgSQL database scripts.
*   **Dependencies**: PostgreSQL version 15+ engine.

---

#### 8. `/security` Layer (Defense & Cryptography)

##### `security/kms/vault-config.json` (Crypto HSM Configuration)
*   **Path**: `/security/kms/vault-config.json`
*   **Responsibility**: Restricts HSM and systems secrets management routing coordinates, identifying access bounds and keys mappings.
*   **Interfaces**: HashiCorp Vault API.
*   **Dependencies**: External secured physical hardware interfaces.

##### `security/secdb-rules/postgresql-rls.json` (Postgres Row Security Policies)
*   **Path**: `/security/secdb-rules/postgresql-rls.json`
*   **Responsibility**: Mandates row-level access parameters inside operational tables, preventing cross-checkpoint leaks.
*   **Interfaces**: PostgreSQL Policy Script.
*   **Dependencies**: Active SQL databases.
