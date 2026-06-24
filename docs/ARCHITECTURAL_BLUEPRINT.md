# Iraq Digital Gateway (IDG) • Sovereign Enterprise Monorepo Blueprint
## Supreme National Security & Customs Interoperability Hub
**Design Specification for a 20+ Year Lifecycle**

---

## Executive Architectural Summary
This document defines the comprehensive repository topology and governance model for the **Iraq Digital Gateway (IDG)**. The architecture is engineered to establish a multi-agency, zero-trust, event-driven, and AI-native digital sovereign frontier. The codebase is modeled as an **Enterprise Monorepo** using **Domain-Driven Design (DDD)** principles to guarantee separation of concerns, high scalability, and robust security parameters suited for critical national infrastructure.

---

### Monorepo Directory Topology
```text
/ (Monorepo Root)
├── /apps                     # Front-End Portals & User-Facing Touchpoints
├── /services                 # Backend Microservices (Domain Driven)
├── /packages                 # Shared Monorepo Packages (Core, Engines)
├── /infrastructure           # Infrastructure-as-Code (IaC) & Cloud Engineering
├── /ai                       # Model Registry, Prompts & LLM Orchestration
├── /data                     # Schemas, Migrations, Ledger & Data Warehouse
├── /security                 # Zero-Trust, IAM, Cryptography & Compliance
├── /integrations             # Inter-Agency & Geopolitical Gateway Connectors
├── /platform                 # Service Mesh, IPC, and Event-Bus Utilities
├── /observability            # Real-Time Telemetry, Audit Trails & Metrics
├── /deployment               # Container Orchestration, Helm, & GitOps Specs
└── /docs                     # System Architecture, Sovereign Accords, & RFCs
```

---

## Detailed Directory Specifications

### 1. `/apps` (Applications layer)
#### Purpose
The `/apps` directory hosts the user-facing gateways, interactive control panels, and administrative digital portal interfaces. It acts as the orchestration point for human-computer interaction (HCI) across different branches of government and private trade importers.

#### Key Applications (Subdirectories)
*   `apps/command-center-web`: The primary executive react application dashboard used by the Council of Ministers, PM Office (PMO), and high command.
*   `apps/customs-clearance-portal`: Importer-facing digital catalog and filing module for submitting cargo declarations, HS codes, and invoices.
*   `apps/border-terminal-client`: Highly optimized, low-latency client interface running locally at physical border posts (Umm Qasr, Ibrahim Khalil, Trebil) connected directly to local hardware (X-Ray, scanners, biometrics).
*   `apps/audit-verification-mobile`: Android/iOS light client for field inspectors and mobile military police patrols checking vehicle clearance hashes.

#### Responsibilities
*   Serve responsive, highly performant, accessible (Arabic, Kurdish, English) user interfaces.
*   Enforce client-side cryptographic signature signing of documents before API submission.
*   Gracefully manage offline-first capabilities at remote border checkpoints.

#### Ownership
*   **National Digital Transformation Council & PMO Liaison DevOps Team**.

#### Dependencies
*   `/packages/ui-core` (reusable Tailwind component tokens).
*   `/packages/crypto-sdk` (client-side signing / local verification).
*   `/packages/api-client` (unified event and query client SDKs).

#### Future Scalability Considerations (20+ Year Window)
*   **Aesthetic Preservation**: Pure UI separation via CSS/Tailwind variables, allowing the underlying frameworks to migrate (e.g., React to subsequent modern paradigms) without disrupting pixel-perfect custom designs.
*   **Edge Computing Transition**: Mobile apps should support seamless migration to Progressive Web Apps (PWAs) integrated with decentralized ledger clients directly running inside local cellular relays.

---

### 2. `/services` (Sovereign Microservices)
#### Purpose
This folder encapsulates the business logic of our architecture, split into isolated, domain-driven microservices. Each service owns its database bounds, ensuring zero-trust containment and preventing database-level state contamination.

#### Core Microservices
*   `services/customs-tariff-engine`: Resolves tariff rates, evaluates excise tax calculations, and manages exemptions matching state directives.
*   `services/cargo-declaration-verification`: Registers and verifies import manifests using multi-key hashes.
*   `services/ledger-authority`: Append-only zero-trust ledger manager executing distributed audit block validations.
*   `services/identity-access-auth`: Central federal authentication authority issuing cryptographic JWT-tokens and validating agency permissions.
*   `services/border-iot-gateway`: Ingests sensor streams (thermal readings, scanner output, lane speeds) and triggers alerts.

#### Responsibilities
*   Enforce domain invariants and isolate critical database read/write queries.
*   Emit asynchronous domain events (e.g., `CargoClearedEvent`) into the central system event stream.
*   Provide robust REST and gRPC interfaces for synchronous inter-agency interactions.

#### Ownership
*   **General Customs Authority Software Engineering Division**.

#### Dependencies
*   `/packages/shared-types` (common interfaces).
*   `/packages/db-adapters` (shared resilient connection pooling abstractions).
*   `/platform/event-bus` (core communication pipelines).

#### Future Scalability Considerations (20+ Year Window)
*   **Microservices to Serverless/Wasm**: Services are standard containerized Node/Go binaries, ensuring trivial migration to on-premises WebAssembly (Wasm) runtime cells to achieve sub-millisecond start times and absolute memory isolation.
*   **Geopolitical Distribution**: Designed to support dual-execution in redundant regional data centers (Baghdad Central and Erbil Secondary) using raft consensus synchronization.

---

### 3. `/packages` (Monorepo Shared Modules)
#### Purpose
Provides common, reusable, versioned libraries used across `/apps` and `/services`. This eliminates code duplication and ensures regulatory standards are implemented identically in every system component.

#### Core Shared Packages
*   `packages/ui-core`: Pure display component suite styled with precise custom brand standards space guidelines.
*   `packages/crypto-sdk`: Contains the cryptographic libraries for generating and validating sovereign transaction seals, employing SHA-256 and post-quantum safe digital signature alternatives.
*   `packages/hs-catalog`: The codified Harmonized System classification schema and validation patterns.
*   `packages/i18n-engine`: Localized translation resources (Arabic, English, Kurdish) for terminal displays and reports.

#### Responsibilities
*   Enforce absolute unit-test coverage thresholds (>95%) to prevent regression in core libraries.
*   Abstract intricate utilities (such as currency conversion ratios and tax algorithms) away from UI routers.

#### Ownership
*   **Lead Repo Architecture & Core Systems Engineering Team**.

#### Dependencies
*   Third-party utility libraries (e.g., `lodash`, `lucide-react`, `zod`). No internal cross-package dependencies allowed unless strictly acyclic.

#### Future Scalability Considerations (20+ Year Window)
*   **Compile-Target Longevity**: Written in pure, strict TypeScript compile-targeted to ESNext/Wasm, assuring compatibility with all next-generation JavaScript runtimes.
*   **Post-Quantum Transition**: Crypto libraries use abstract interfaces allowing quick swaps from standard ECDSA to Lattice-based algorithms without refactoring core business logic.

---

### 4. `/infrastructure` (Infrastructure-as-Code)
#### Purpose
Contains the cloud and on-premises deployment orchestrations, provisioning models, and structural declarations required to host the entire ecosystem securely.

#### Core Components
*   `infrastructure/terraform/`: Declarative configuration of private cloud enclaves, secure databases, private subnets, and edge compute servers.
*   `infrastructure/ansible/`: Configuration parameters for physical on-premises border post servers, local X-ray machines, and cryptographic hardware security modules (HSMs).
*   `infrastructure/networks/`: Service mesh settings, VPN tunnels, and local SDN (Software Defined Network) configurations connecting Baghdad to regional crossing outposts.

#### Responsibilities
*   Guarantee continuous delivery of reproducible environments (Development, Staging, Sovereign Training, Production).
*   Implement maximum ingress/egress firewall constraints and isolate database enclaves.

#### Ownership
*   **DevOps and Systems Security Operations Command**.

#### Dependencies
*   None. This directory operates exclusively on external provider APIs (GCP, AWS, OpenStack, bare-metal controllers).

#### Future Scalability Considerations (20+ Year Window)
*   **Hybrid Cloud Independence**: Employs open-source Terraform patterns and CNCF-certified operators, preventing lock-in to specific public cloud vendors. System can be migrated to completely air-gapped private sovereign bare-metal servers during emergency conditions.

---

### 5. `/ai` (AI-Native Intelligence Services)
#### Purpose
Hosts the model registry, prompts, cognitive data pipelines, and orchestration agents that power smart classifications, risk anomalies profiling, and high-speed cargo auditing.

#### Core Content
*   `ai/model-registry/`: Configuration references, metadata, weights signatures, and validation schemas for specialized models (e.g., `IDG-Cortex-V3`, `Ur-Transit-MoE`, `Iraq-Risk-V1`).
*   `ai/prompt-library/`: Immutable, auditable prompt templates for LLM orchestrations (e.g., HS-classification instructions, balance of payment forecasting).
*   `ai/training-pipelines/`: Offline training and validation scripts designed to safely ingest historical customs logs to retrain classification neural networks without data leaks.

#### Responsibilities
*   Define system boundaries and sandboxes for LLM invocation, ensuring strict input filtering.
*   Provide Human-in-the-Loop (HITL) overrides routing fallback configurations.
*   Maintain accurate performance logs (per-inference latency, classification confidence scores).

#### Ownership
*   **Sovereign Cognitive Technologies & AI Research Group**.

#### Dependencies
*   `/packages/shared-types`
*   `/services/ledger-authority` (stores prompt signatures and model executions).

#### Future Scalability Considerations (20+ Year Window)
*   **Model-Agnostic Core**: Connects strictly to abstract model wrappers. If the leading AI engines change, the system can seamlessly transition to newer, faster local open-source LLMs without touching prompt templates or business application pipelines.

---

### 6. `/data` (Sovereign Data Storage & Ledger Schemas)
#### Purpose
The centralized storage schema definer. Hosts transactional databases schemas, ledger templates, data warehouse structures, and ETL pipelines designed to securely log 100+ million customs actions annually.

#### Core Content
*   `data/migrations/`: Sequential SQL/NoSQL schema migrations for primary transaction systems.
*   `data/ledger-blueprint/`: Smart-contract definitions, validation parameters, and block structures of the append-only ledger.
*   `data/secdb-rules/`: Security rules (e.g., Firestore rules, PostgreSQL row-level security RLS configurations) preventing unauthorized multi-tenant reading.

#### Responsibilities
*   Guarantee referential integrity of cross-border customs declarations.
*   Isolate sensitive taxpayer and biometric data from high-risk public networks.
*   Provide optimized indexing structures to support instant historical scans from custom tribunals.

#### Ownership
*   **Sovereign Data Engineering & Database Administrator Guild**.

#### Dependencies
*   None. Operates as the foundation for the `/services` folder.

#### Future Scalability Considerations (20+ Year Window)
*   **Relational to Ledger Fusion**: Database layer is built to automatically mirror verified states to decentralized append-only ledger blocks, allowing historical audit trails to remain mathematically trusted even if active SQL instances undergo migration or recovery blocks.

---

### 7. `/security` (Zero-Trust Security & Compliance)
#### Purpose
The digital armor of the IDG monorepo. Formulates authentication policies, row-level policy parameters, IAM boundaries, encryption filters, and automated scanning modules.

#### Core Content
*   `security/kms/`: Management procedures and connectors for Sovereign Hardware Security Modules (HSMs) and Key Management Systems (KMS).
*   `security/policies/`: Mandatory Access Control (MAC) and Attribute-Based Access Control (ABAC) definitions.
*   `security/auditors/`: Automated CI/CD scanners that audit the codebase, scanning for exposed tokens, dependency vulnerabilities, and regulatory compliance.

#### Responsibilities
*   Enforce encryption-at-rest and encryption-in-transit criteria.
*   Validate system actions against inter-agency access agreements.
*   Execute cryptographically valid signing patterns for Council of Ministers state records.

#### Ownership
*   **National Information Security Directorate (NISD) Cyber Defense Command**.

#### Dependencies
*   Core cryptographic OS libraries.

#### Future Scalability Considerations (20+ Year Window)
*   **Zero-Trust Evolution**: Designed to transition to fully Decentralized Identifiers (DIDs) where every truck driver, border officer, and agency server holds verified verifiable credentials (VCs), allowing trust models to work even in fully decentralized outposts.

---

### 8. `/integrations` (Agency Corridors & Geopolitical Gateways)
#### Purpose
Builds and maintains strict adapter networks to connect the IDG with foreign partners, local banks, and historic systems.

#### Core Adapters
*   `integrations/cbi-interlock/`: Connects to the Central Bank of Iraq for verifying trade transaction bank references before clearance.
*   `integrations/cosqc-audit/`: Connects standard testing registries to verify chemical or industrial certificates.
*   `integrations/regional-links/`: Data exchange adapters linking Turkish customs (Silopi), Kuwait borders, and Gulf maritime logistics networks.

#### Responsibilities
*   Abstract third-party API instability through resilient circuit-breaking patterns.
*   Normalize disparate data formats (XML, CSV, legacy mainframe payloads) into clean IDG schemas.

#### Ownership
*   **International Trade & Integration Services Liaison**.

#### Dependencies
*   `/packages/shared-types`
*   `/platform/event-bus`

#### Future Scalability Considerations (20+ Year Window)
*   **Standardized Inter-Agency Protocols**: High reliance on standardized OpenAPI schemas and gRPC descriptors allows foreign trade partners to build integration adapters on their end, reducing maintenance costs for the Iraqi government.

---

### 9. `/platform` (Internal Core Platform Engineering)
#### Purpose
The engine room. Provides low-level architectural layers like service-mesh connectors, event brokers, IPC (Inter-Process Communication) tunnels, and asynchronous job schedulers.

#### Core Utilities
*   `platform/messenger/`: Private event broker configuration deploying secure Kafka or RabbitMQ clusters.
*   `platform/service-mesh/`: Zero-trust network communication sidecars (e.g., Istio details) ensuring services can only talk to explicitly whitelisted endpoints.
*   `platform/cache-layer/`: Configuration of memory-tier clusters (e.g., Redis) for high-frequency HS classification lookups.

#### Responsibilities
*   Ensure ultra-high availability (99.999% uptime goal) of communication lines.
*   Enforce absolute message delivery guarantees (At-Least-Once or Exactly-Once where required).

#### Ownership
*   **Infrastructure & Core Platform Operations Team**.

#### Dependencies
*   Standard Linux kernel network interfaces, Kubernetes cluster abstractions.

#### Future Scalability Considerations (20+ Year Window)
*   **Protocol Neutrality**: Message passing uses abstract interfaces. The system can seamlessly migrate from Kafka to newer decentralized transport grids without breaking consumer configurations in the `/services` folder.

---

### 10. `/observability` (Telemetry & Real-Time Security Auditing)
#### Purpose
The sensory system of the IDG. Collects, analyses, and alerts on continuous logs, metrics, hardware temperature monitors, error exceptions, and suspicious access anomalies.

#### Core Content
*   `observability/grafana/`: Rich monitoring boards showing system ingress loads, customs revenues, hardware temperatures, and classifier accuracy parameters.
*   `observability/alertmanager/`: Configured triggers routing critical alarms to Ministry of Defense or customs response units.
*   `observability/syslog/`: Secure immutable centralized log receivers.

#### Responsibilities
*   Maintain accurate auditing files of all administrative actions (such as threshold changes, manual overrides, and human-in-the-loop decisions).
*   Flag physical hardware malfunctions at remote desert or maritime crossings.

#### Ownership
*   **Systems Integrity & Sovereign Telemetry Desk**.

#### Dependencies
*   `/packages/shared-types`
*   Distributed collector agents (Prometheus, OpenTelemetry).

#### Future Scalability Considerations (20+ Year Window)
*   **AI-Driven SRE**: Telemetry rules are configured to pipe into secure local prediction algorithms, allowing the system to forecast physical storage drive or fiber line failures up to 72 hours in advance and suggest repairs/maintenance cycles autonomously.

---

### 11. `/deployment` (Continuous Delivery & GitOps Configuration)
#### Purpose
Declares how the software flows from developer commits to physical deployment onto secure production hosts. Implements rigorous GitOps principles.

#### Core Content
*   `deployment/helm/`: Packaged Kubernetes manifests for rapid service deployment.
*   `deployment/gitops/`: Continuous synchronization manifests (FluxCD/ArgoCD config) ensuring the active cluster matches repository commits exactly.
*   `deployment/pipeline/`: Validation, linting, code-quality gates, and security scan pipelines (GitLab CI / GitHub Actions configs).

#### Responsibilities
*   Prevent any manual modifications to production environments. Every change must go through reviewed commits (Infrastructure-as-Code).
*   Enforce automated rolling zero-downtime updates with swift rollback capabilities.

#### Ownership
*   **Release Management Team & DevOps Lead**.

#### Dependencies
*   `/infrastructure` (utilizes provisioned enclaves).

#### Future Scalability Considerations (20+ Year Window)
*   **Immutable Releases**: Employs strictly versioned, signed container images (Onyx/Docker OCI specs), guaranteeing that any container can be reliably redeployed in its exact historical state 250 months from now without reliance on public image mirrors.

---

### 12. `/docs` (Enterprise Sovereign Knowledge Base)
#### Purpose
Preserves the institutional knowledge, standard operating procedures, RFC templates, international customs accords, and architectural decisions.

#### Core Content
*   `docs/rfcs/`: Request for Comments templates and accepted files defining core architectural changes.
*   `docs/standard-operating-procedures/`: Training guides for customs inspectors, terminal operators, and administrators.
*   `docs/sovereign-accords/`: Digitized agreements outlining bilateral custom standards with Turkey, Jordan, Kuwait, and the European Union.

#### Responsibilities
*   Provide clean, searchable, clear descriptions of system operations.
*   Maintain a complete history of architectural decisions (ADRs) to aid future generation developers.

#### Ownership
*   **Joint Steering Committee & Principal Architects**.

#### Dependencies
*   None.

#### Future Scalability Considerations (20+ Year Window)
*   **Continuous Literacy**: Maintained in native Markdown formats, avoiding proprietary document formats, assuring that future architectural leads can read can-level documentation even if modern document suites undergo deprecation.

---

## Architectural Principles for 20+ Year Longevity

1.  **Hardware & Vendor Independence**: No hardware locks, no proprietary OS dependencies. The entire system is built upon open container standards (OCI) and open-source database topologies.
2.  **Explicit Communication Tunnels**: Microservices converse exclusively through documented, version-controlled gRPC schemas or event messages. This eliminates tight coupling.
3.  **Strict Security Compartmentalization**: If one border checkpoint client or microservice suffers a breach, the service-mesh isolates the node instantly. The central treasury, identity systems, and other gateways remain fully insulated.
4.  **Sovereign Offline Fallback**: Remote outposts run micro-nodes loaded with local database mirrors. If national fiber optic links fail, the local gate continues evaluating clearances using local AI models, queuing transactional write logs to auto-sync once connectivity restores.
5.  **Multi-Lingual Equality Node Framework**: Real-time Arabic and Kurdish translations of custom entries are processed with equal integrity weights, honoring the constitutional frameworks of the Republic of Iraq.
