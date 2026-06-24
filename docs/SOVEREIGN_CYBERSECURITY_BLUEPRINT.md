# Iraq Digital Gateway (IDG) • Sovereign Cybersecurity Architecture Blueprint
## Supreme Zero-Trust Cyber Defense and National Security Guard
**Design Specification for a 20+ Year Lifecycle**

---

## Executive Architectural Summary
The **Sovereign Cybersecurity Architecture (SCA)** is the digital fortification framework of the **Iraq Digital Gateway (IDG)**. It establishes an uncompromised, military-grade network defense perimeter designed to safeguard the Republic’s critical trade, customs, and financial workflows. Guided by the principle of **Never Trust, Always Verify**, this framework enforces a complete Zero-Trust model across all layers of state interactions, isolating physical checkpoints, securing high-frequency ledger audits, and preventing data infiltration by hostile actors.

These specifications are structurally aligned to protect physical borders, microservice communications, hardware scanner inputs, and central bank wire registries across a 20+ year operational window.

---

## 1. Unified Zero-Trust Security Framework
Traditional castle-and-moat perimeter models are insufficient for critical national infrastructure. The IDG relies on strict **Micro-Segmentation** and dynamic **Continuous Authentication** at every software and physical interface.

```text
========================================================================================================================
                                      IDG ZERO-TRUST CONTROL LOOPS
========================================================================================================================

    [ USER / MACHINE IDENTITIES ] ──────► [ CRYPTO PKI CERT / MUTUAL TLS ] ──────► [ REGULATORY ABAC POLICIES ]
                                                                                         │
                                                                                         ▼
  [ COMPLIANCE RECONCILED STATE ] ◄─────── [ CRYPTOGRAPHIC VERIFICATION ] ◄────── [ SECURE SERVICE MESH ]
                                          - SHA-512 Hash & Ledger Seals           - Envoy Sidecar Proxies
========================================================================================================================
```

### Core Tenets
*   **Decentralized Boundary Containment**: Every microservice lives within its own isolated, firewalled virtual network segment. There is no wide internal LAN. 
*   **Mutual TLS (mTLS)**: No service trust is inferred. Service-to-service calls utilize dual-directional, cryptographically verified mTLS with temporary short-lived TLS certificates issued by our local core authority.
*   **Continuous Cryptographic Re-Credentialing**: Authentication is evaluated on every single request, matching active user tokens, source IP, device telemetry hashes, and active operational hours. Unverified requests are instantly dropped and reported to the Threat Analysis team.

---

## 2. Identity & Access Management (IAM), RBAC, and ABAC
Our access control plane merges **Role-Based Access Control (RBAC)** for structural administrative hierarchies with dynamic, runtime **Attribute-Based Access Control (ABAC)** to secure sensitive transactions.

### Multi-Tier IAM (Identity Management)
*   **Federal Identity Source**: Integrated with secured, redundant OpenLDAP clusters synced continuously via cryptographically signed payloads.
*   **Phased SSO Protocol**: Admin access requires hardware security key verification (e.g., FIDO2/YubiKey) alongside biometric identification at border control points.

### Role-Based Access Control (RBAC) Matrix
The system defines explicit, hierarchical roles with bounded capabilities:
*   `ROLE_SUPREME_STRATEGIC_ADMIN`: Reserved strictly for the Prime Minister's Office and Cabinet leads. Restricts action to wide policymaking, general custom tariff overrides, and ministerial agenda review. No direct cargo database updates.
*   `ROLE_CUSTOMS_AUDITOR`: General Customs Authority auditors. Grants permission to execute HS classification audits, verify tariff receipts, and flag suspected under-invoicing anomalies.
*   `ROLE_BORDER_BORDER_OFFICER`: Physical outpost security agents. Restricts view to the active checkpoint terminal node, allowing local scan registrations and biomedical quarantine releases.
*   `ROLE_COMPLIANCE_CBI_RECONCILER`: Central Bank of Iraq wire matching agents. Authorized to cross-verify trade finance filings with manifest declarations.

### Attribute-Based Access Control (ABAC) Policies
To prevent database-level compromises, permissions are evaluated at runtime using strict, contextual attributes. Access to any record requires satisfying the following ABAC rule bounds:

$$\text{Clearance Granted} = f(\text{Subject Role}, \text{Resource Location}, \text{Access Time Window}, \text{Compliance Hash Status})$$

#### Core Policy Declarations
*   **Geofenced Boundary Rule**: A border officer assigned to `BASRA_SEAPORT` is programmatically blocked from viewing or editing clearance files originating from `IBRAHIM_KHALIL_LAND`, regardless of their role hierarchy level.
*   **Fiscal Window Rule**: Financial auditing and CBI wire reconciliations are restricted to official banking transaction windows ($08:00\text{ to }17:00\text{ UTC}$), requiring manual joint ministerial signatures for emergency out-of-hours overrides.

---

## 3. Privileged Access Management (PAM)
Privileged escalation is the primary target of sophisticated threat actors. The IDG eliminates static, persistent administrative credentials through an immutable, ephemeral access architecture.

### Operational PAM Controls
*   **Zero-Standing Privileges (ZSP)**: There are no full-time "root" or "global admin" server credentials. Engineers own standard unprivileged accounts.
*   **Just-In-Time (JIT) Escalation**: System administration requires requesting a temporary, scoped privilege window. Access must be approved by two independent security officers (Dual-Operator Consensus).
*   **Automated Ephemeral Keys**: Upon approval, the security manager generates unique, one-time SSH keys or database session tokens that automatically self-destruct after $60\text{ minutes}$.
*   **Continuous Keystroke Logging**: All elevated JIT sessions are fully logged, audited, and recorded at the packet level. These logs are simultaneously written in parallel to our append-only sovereign database to prevent deletion by insiders.

---

## 4. SIEM, SOC, and Modern AI Threat Intelligence
The NDF includes a continuous monitoring and threat hunting platform, merging high-speed log ingestion with local neural anomaly classifiers.

### The Sovereign SOC (Security Operations Center)
*   Our centralized SOC is managed on physical, secure servers within Baghdad, operating with separate fiber feeds to guarantee independent line integrity.
*   Maintains a real-time visualization pane logging active connection velocities, microservice health, crypto handshakes, and firewall blocks.

### Enterprise SIEM & Ingestion Engine
*   **Telemetry Collectors (OpenTelemetry & Prometheus)**: Ingest audit logs from all VMs, containers, networks, scanners, and applications into an optimized timeseries database.
*   **AI Anomaly Hunter**: A local machine-learning module evaluating log currents continuously. It evaluates user behavior trends, detecting suspicious access events—such as an administrator account executing standard operations from Basra, followed by database edits from Baghdad $20\text{ seconds}$ later (impossible physical travel time).
*   **Autonomic Active Defense Intercepts**: If high-severity alerts trigger (e.g., rapid database credential scans), the SIEM autonomously instructs firewall meshes to drop affected server segments instantly, isolating components before human analysts are alerted.

---

## 5. Enterprise Keys & Secrets Management
All secrets (API keys, bank authentication tokens, database credentials, encryption salts) are managed centrally in secure vaults, eliminating hardcoded variables completely.

### The Sovereign Key Vault
*   **Hardware Security Modules (HSMs)**: Secrets are anchored inside physical, tamper-proof, military-grade cryptographic HSMs located in secure bunkers.
*   **Hardware-Rooted Decryption**: Encryption keys never leave the HSM physical silicone; cipher processing executes on-chip.

### Automated Key Rotation Schedule
To neutralize the impact of prospective data leaks, the IDG enforces tight, automated rotation intervals:

| Secret Category | Rotation Interval | Management Mechanism |
| :--- | :--- | :--- |
| **Microservice DB Secrets** | Every $24\text{ hours}$ | Vault Ephemeral Token Generator |
| **mTLS Certificates** | Every $12\text{ hours}$ | Local CA Auto-Issuer (SPIFFE/SPIRE) |
| **Primary Master Data Keys** | Every $30\text{ days}$ | HSM Automatic Multi-Party Rotation |
| **State Ledger Signing Keys** | Every $90\text{ days}$ | Council of Ministers Secret Sharing Split |

---

## 6. Public Key Infrastructure (PKI) & Cryptography
The cryptographic core of the IDG guarantees the absolute authenticity and integrity of national records.

### PKI Architecture
*   **Sovereign Root CA**: An offline, air-gapped Root Certificate Authority. The physical signing key requires triple-custody physical keys held by the Prime Minister's deputy, the Governor of the Central Bank, and the Supreme Judicial Leader.
*   **Intermediate CAs**: Specialized online authorities (e.g., `Customs-Signing-CA`, `IoT-Scanner-CA`) issued by the Root and rotated annually.
*   **Post-Quantum Safe Cryptography (PQC)**: While current workflows rely on SHA-256 and RSA-4096 / ECDSA-P384, the cryptographic packages are abstracted. They are programmatically pre-engineered to support transition to lattice-based post-quantum algorithms (e.g., CRYSTALS-Kyber, CRYSTALS-Dilithium) through simple container updates.

### Encryption-at-Rest and Encryption-in-Transit (Envelope Encryption)
*   **Transit**: All network payloads are encrypted via TLS 1.3 with complete forward secrecy constraints.
*   **Rest**: Storage disks are encrypted utilizing AES-256-GCM. 
*   **Envelope Encryption Model**: Datasets are encrypted with individual dynamic Data Encryption Keys (DEKs). These DEKs are then encrypted utilizing massive Key Encryption Keys (KEKs) securely hosted inside our physical on-premises HSM.

---

## 7. Disaster Recovery & Sovereign Continuity of Government (CoG)
Critical national systems must withstand geopolitical crises, power grid failures, and physical warfare. The IDG implements a highly resilient disaster recovery design.

### RTO & RPO Objectives
*   **Recovery Time Objective (RTO)**: $\le 15\text{ minutes}$. Maximum time to restore critical gateway operations following general site destruction.
*   **Recovery Point Objective (RPO)**: $\le 0\text{ seconds}$. Zero data loss standard. Guaranteed by synchronous multi-site transaction logging database replication lines.

### Geographic Redundancy Topologies
The system operates across three geographically separated, highly fortified facilities:
1.  **Baghdad Central Node (Site Alpha)**: Primary operational cluster hosted in a central state facility with dedicated power feeds.
2.  **Erbil Mountain Node (Site Beta)**: Highly secure secondary cluster operating in an underground rock vault, continuously syncing transactional database logs with Site Alpha via dedicated government fiber networks.
3.  **Basra Bunker Node (Site Gamma)**: Lightweight active-passive backup site focusing purely on southern maritime and energy corridor clearing operations.

### Offline Border Autonomy Mode (Desynchronization)
If hostilities or network failures disconnect a physical border checkpoint from central Baghdad servers, the local post transitions instantly to **Offline Autonomy Mode**:
*   The outpost client uses a local database replica containing the latest Master Data, HS indexes, and blacklists.
*   The gate continues normal scanning operations, confirming vehicle entry credentials utilizing local offline CA keys.
*   Clearing logs and custom duties are written locally to encrypted, tamper-resistant storage modules.
*   Upon recovery of national network links, the local outpost automatically syncs queued logs to central Baghdad, matching transaction ledger hashes to verify complete integrity.
