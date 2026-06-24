# Iraq Digital Gateway (IDG) • Internal Developer Platform (IDP) Blueprint
## Sovereign Enterprise Platform Engineering & Infrastructure-as-a-Service (IaaS) Control Plane
**Design Specification for a 20+ Year Lifecycle Scaling to Thousands of Services**

---

## Executive Architectural Summary
The **Internal Developer Platform (IDP)** of the **Iraq Digital Gateway (IDG)** is the unified, secure, self-service infrastructure and delivery plane designed to support the development, deployment, execution, and monitoring of **thousands of future sovereign microservices and applications**. 

Operating as an integrated, developer-focused operational tier, the IDP abstracts network complexity, enforces security and regulatory invariants automatically, and delivers high automation velocities without compromising our strict federal Zero-Trust directives. It establishes custom "Golden Paths," ensuring that any state agency, central bank department, or regional border technologist can bootstrap a fully compliant, containerized microservice with complete telemetry, databases, IAM, and testing capabilities in under $5\text{ minutes}$.

---

## System Operational Architecture

```text
========================================================================================================================
                                      IDG INTERNAL DEVELOPER PLATFORM (IDP) MESH
========================================================================================================================

                 [ DEVELOPER / PLATFORM ENGINEER ]
                               │
                               ▼
 ┌─────────────────────────────────────────────────────────────┐
 │       1. PORTAL LAYER: Unified Sovereign Developer Portal    │
 │  - Software Catalog      - Golden Path Templates (Scaffolding)│
 │  - Standards Scorecards  - API Documentation Hub (OpenAPI)   │
 └─────────────┬───────────────────────────────┬───────────────┘
               │                               │
               ▼ (Trigger GitOps Repository)   ▼ (Self-Service Infrastructure API)
 ┌──────────────────────────────────────────────┐
 │   2. PLATFORM ENGINE & ENVIRONMENT OPERATOR  │
 │  - Crossplane Infrastructure Controllers     │
 │  - Automated Vault Secret Scoping            │
 └─────────────┬────────────────────────────────┘
               │
               ▼ (Generate signed build images)
 ┌─────────────────────────────────────────────────────────────┐
 │       3. CI/CD PIPELINE & COGNITIVE SECURITY ENGINE         │
 │  - Hermetic Scribe / Tekton Builders  - SBOM Verification    │
 │  - SAST / DAST Vulnerability Scanners - Cosign Image Proofs │
 └─────────────┬───────────────────────────────────────────────┘
               │
               ▼ (Helm / ArgoCD GitOps Sync Loop)
 ┌─────────────────────────────────────────────────────────────┐
 │      4. RUNTIME PLANE: Service Mesh & Envoy Gateway         │
 │  - Envoy API Gateway (Ingress Routing/TLS Offload)          │
 │  - Istio Service Mesh (mTLS / SPIRE Identity Attestation)    │
 └─────────────┬───────────────────────────────────────────────┘
               │ (Telemetry collection loops)
               ▼
 ┌─────────────────────────────────────────────────────────────┐
 │            5. UNIFIED SYSTEM OBSERVABILITY (OLT)            │
 │  - OpenTelemetry Collectors  - Prometheus Storage           │
 │  - Grafana Analytics Panels  - Jaeger Telemetry Trace        │
 └─────────────────────────────────────────────────────────────┘
========================================================================================================================
```

---

## 1. Internal Developer Portal (The Unified Interface)
The entry point of our developer workspace. Built to streamline and govern service registries, avoiding multi-agency catalog fragmentation across structural boundaries.

### Platform Components
*   **The Sovereign Catalog**: A centralized metadata index documenting every active service, frontend UI, data model pipeline, and machine-learning model in the IDG ecosystem. Powered by YAML metadata schemas:
    ```yaml
    apiVersion: idg.gov.iq/v1alpha1
    kind: Component
    metadata:
      name: basra-sonar-analyzer
      description: "Extracts physical cargo densities from sea-container Sonar scans"
      owner: general-customs-hq
      system: border-logistics-cortex
    spec:
      type: service
      lifecycle: production
      owner: group:customs-defense
    ```
*   **Golden Path Software Scaffolding**: Standardized templates that scaffold ready-to-code project templates directly into the organization git repository:
    *   *Path 1*: `Sovereign Go Microservice (gRPC + Postgres + mTLS + OTel)`
    *   *Path 2*: `Sovereign Spring Boot Core (Java + CockroachDB + CDC)`
    *   *Path 3*: `Sovereign Python ML Engine (PyTorch + GPU Scoped + Triton)`
*   **Sovereign Compliance Scorecards**: Automatically evaluates services against organizational compliance gates (e.g., must run with strict security scans, require $\ge 85\%$ unit test coverage, possess signed SBOMs, and map to a recognized master database). Non-compliant services are automatically restricted from production clusters.

---

## 2. CI/CD & Security Ingestion Pipelines
Sovereign systems require secure, reproducible builds, preventing supply-chain malware and external code injections during compile windows.

### Container Pipeline Architecture
*   **Hermetic, Sandboxed Runners (Tekton Pipelines)**: Development executors operate in air-gapped environments without egress connections to public NPM, Maven, or PyPI servers.
*   **Sovereign Artifact Mirrors (Nexus / JFrog local registry)**: Dependencies are mirrored inside secure, local Baghdad mirrors, checked daily by structural vulnerability engines.
*   **Dynamic SBOM (Software Bill of Materials) Generation**: Every compiler step produces a signed cycloneDX/SPDX SBOM file, recording exact dependency shas.
*   **Cryptographic Container Signing (Cosign Intercom)**: Build artifacts are permanently signed utilizing private HSM keys matching the image digest:
    ```sh
    cosign sign --key hsm://national-pki/sign-key-01 idg-registry.gov.iq/customs/tariff-calc:v1.2.0
    ```
    Kubernetes nodes utilize **Kyverno** admission validation controllers to block any container execution unless backed by a signed Cosign proof.

---

## 3. Platform Engineering & Self-Service Provisioning (Golden Paths)
Infrastructure configuration is completely standardized and requested via **Infrastructure-as-Code** controllers, eliminating manual database or certificate provisioning by developers.

### Platform Orchestration
*   **Platform Orchestrator (Crossplane / Kubernetes Operators)**: Translates simple developer declarative files into cloud provisions:
    ```yaml
    apiVersion: database.idg.gov.iq/v1
    kind: PostgreSQLInstance
    spec:
      storageGB: 100
      rowLevelSecurity: true
      backups: automatic-daily
    ```
    The operator automatically provisions a segregated PostgreSQL cluster, configures RLS policies, binds secrets to Vault, and exposes mTLS credentials to the target service container.
*   **On-Demand Secrets Isolation**: Integrated with the central secure key vault. New services are assigned distinct, isolated Vault secrets paths.

---

## 4. Federated API Gateway & Zero-Trust Service Mesh
Secures entry networks and separates microservice communication boundaries as the platform scales to thousands of microservices.

### The Envoy API Gateway
We deploy a highly resilient, enterprise **Envoy Proxy** Gateway cluster at the edge:
*   **Dynamic Route Mapping**: Ingress rules routing requests (e.g., `/api/v1/customs/*`) to target internal systems.
*   **TLS Termination & mTLS Upgrades**: Inspects incoming public tokens, checks identity scopes, and forwards requests with local, signed JWT tokens.
*   **Rate-Limiting & Anti-DDoS Filters**: Implements token bucket throttling algorithms, preventing denial-of-service blockages at public border interfaces.

### Service Mesh (Istio Security Layer)
*   Services communicate exclusively via **Istio Sidecar Proxies** (Envoy) injected in each application pod.
*   **Automated SPIRE Identity Attestation**: Assures microservices prove identity state before executing mTLS calls, utilizing SPIFFE ID tokens injected dynamically.
*   **Strict Access Policies**: Direct microservice connections are blocked by default. Inter-service calls must satisfy strict validation rules:
    ```yaml
    apiVersion: security.istio.io/v1beta1
    kind: AuthorizationPolicy
    metadata:
      name: allow-tariff-to-ledger
      namespace: customs
    spec:
      selector:
        matchLabels:
          app: ledger-authority
      action: ALLOW
      rules:
      - from:
        - source:
            principals: ["cluster.local/ns/customs/sa/tariff-calc-service-account"]
    ```

---

## 5. Automated Testing Platform (The Quality Shield)
Prevents deployment regression, ensuring absolute interface compatibility across thousands of independent developer teams.

### Continuous Integration Test Suites
*   **Centralized Unit & Integration Testing**: Tests are executed during early compilation pipelines inside secure containers, enforcing strict strict types validation.
*   **Contract Testing (Pact Framework)**: With thousands of services, API compatibility is guarded using automated contract tests. Services publish consumer contracts; provider systems must satisfy these schemas during compilation to ensure network-level interoperability.
*   **Automated Chaos Simulation (Sovereign Chaos Mesh)**: Randomly exercises localized system failures (e.g., killing border outpost connectivity, injecting database latency) during staging cycles. This validates that fallback algorithms and offline-first replica states recover as expected under pressure.

---

## 6. Unified Enterprise Observability & Telemetry (OLT)
The sensory nervous system of the developer platform, enabling real-time diagnostic visibility.

### The OpenTelemetry Centralized Platform
The IDG platform natively enforces the **OpenTelemetry (OTel)** standard across all service templates:

```text
========================================================================================================
                               IDG TRACE & TELEMETRY COLLECTION NETWORK
========================================================================================================

 [ Service Container ] ──► (OTel Client SDK) ──► [ Local Node OTel Collector ] ──► [ Central Kafka OTel Stream ]
                                                                                              │
     ┌────────────────────────────┬────────────────────────────┐                              ▼
     ▼                            ▼                            ▼                     [ Prometheus Core ]
 [ Grafana Views ]         [ Tempo Tracing ]            [ OpenSearch Logs ]                (Timeseries)
========================================================================================================
```

*   **OTel Collector Mesh**: DaemonSet containers running on every Kubernetes node collect and batch metrics locally.
*   **Unified Timeseries Logs (Prometheus)**: High-performance storage mapping system metrics, node performance, container states, and hardware temperatures.
*   **Granular Trace Telemetry (Tempo / Jaeger)**: Correlates individual requests with a unique `trace_id` propagated across all microservices via W3C Trace Context headers. This permits tracing a request's exact lifecycle across database hits and internal services instantly.
*   **The Sovereign Security Audit Log**: Compliance and security metrics, database RLS violations, administrative overrides, and PAM escalations bypass standard log collections, routing to an append-only transaction ledger.

---

## 7. Automated Deployments (GitOps Core Execution Loops)
We enforce a strict **GitOps** deployment standard; manual cluster changes via CLI are prohibited.

### GitOps Sync Loop (ArgoCD / FluxCD)
*   The actual cluster deployment configuration (Kubernetes manifests, Helm values) is permanently declared in a central Git repository.
*   An active on-cluster agent (e.g., **ArgoCD**) continuously monitors the target Git branch.
*   **Continuous Desynchronization Checks**: If drift is detected (e.g., an engineer manually scales pods via kubectl), ArgoCD automatically reverts changes, pulling the active state back to the Git-declared state.

### Releasing Strategies: Safe Canary Rollouts
Microservice releases utilize automated **Kargo / Argo Rollouts** controllers for low-risk canary checks:

```text
1. Deploy New Version Config (v1.2.0)
       │
       ▼
2. Route 5% Traffic to New Container; Keep 95% on Stable (v1.1.0)
       │
       ▼
3. Continuous OTel Audit Loop:
   • Error Rate > 0.05%?   ──► AUTOMATIC ROLLBACK TO v1.1.0
   • P99 Latency > 150ms?  ──► AUTOMATIC ROLLBACK TO v1.1.0
       │
       ▼
4. Increment Traffic: 25% ──► 50% ──► 100% Complete Success
```

This guarantees zero-downtime updates and decouples releases from system downtime windows, enabling continuous developer agility across departments.

---

## 8. Multi-Agency Lifecycle Coordination Matrix

This reference mapping enforces boundaries between state developer layers on the platform:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ IDP LIFECYCLE COORDINATION MATRIX                                                                      │
├───────────────────┬───────────────────────────────┬──────────────────────┬─────────────────────────────┤
│ Developer Org     │ Authored Services Domain      │ Golden Path Scaffolder│ Active Service Mesh Boundary │
├───────────────────┼───────────────────────────────┼──────────────────────┼─────────────────────────────┤
│ Customs Authority │ Tariff, HS Matching Engines   │ Go gRPC Template     │ Namespace: `customs-domain` │
│ Ministry of Health│ Medical quarantine logs       │ Go gRPC Template     │ Namespace: `bio-quarantine` │
│ Transport Team    │ Fleet trackers, geofencing    │ Go gRPC Template     │ Namespace: `logistics-cortex`│
│ Trade Bureau      │ Importer catalogs, auditing   │ Spring Boot Template │ Namespace: `trade-analytics`│
│ Central Bank (CBI)│ Wire validation gateways      │ Spring Boot Template │ Namespace: `finance-clearing`│
│ Defense Ministry  │ Spatial route optimization    │ Python Triton ML     │ Namespace: `security-escort`│
└───────────────────┴───────────────────────────────┴──────────────────────┴─────────────────────────────┘
```
