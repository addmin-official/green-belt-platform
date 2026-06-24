# Iraq Digital Gateway (IDG) • Sovereign National Super App Experience Blueprint
## Iraq One-App (IQA) • Unified Experience Portal & Multi-Role Sovereign Interface
**Design Specification for a 20+ Year Lifecycle Scaling to 40+ Million Users**

---

## Executive Architectural Summary
The **Iraq One-App (IQA)** is the unified national super-application designed to consolidate all citizens, domestic and international commercial businesses, customs brokers, state operators, border forces, inspectors, and judicial auditors into a single, high-performance, secure digital experience ecosystem. 

Rather than deploying isolated, fragmented apps across ministries, IQA is built as a single, multi-tenant digital gateway. It dynamically morphs its entire workspace layout, menu systems, data fields, and security clearness profiles based on the authenticated actor’s role. Operating with a mobile-first, desktop-expanded layout paradigm, IQA integrates on-device **Offline Databases**, local biosecurity and facial recognition models, secure hardware-anchored **Digital Signatures**, and a local **Sovereign AI Cortex Assistant (Bilal)** that helps users file taxes, track logistics, scan cargo manifests, and audit trade balances with conversational ease.

---

## Iraq One-App Core Architectural Topography

```text
========================================================================================================================
                                     IQA UNIFIED EXPERIENCE PLANE
========================================================================================================================

                                    [ USER ACCESS INTERACTION ]
                                 (Mobile / Tablet / Desktop / kiosk)
                                                 │
                                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       1. DYNAMIC EXPERIENCE RENDERING ENGINE (DXRE)                                  │
│  The client detects current role claims from OAuth OIDC JWT tokens and dynamically morphs interface components:      │
│                                                                                                                      │
│   [ CITIZEN VIEW ]             [ BUSINESS VIEW ]             [ GOVERNMENT PORTAL ]         [ OPERATIONS MODE ]       │
│   - Unified ID Wallet          - HS Code Catalog             - Tariff Audit Board          - Camera Sonar Monitor    │
│   - Personal Taxes             - Trade License Registries    - Revenue Visualizers         - Live Outpost Gate Ctrl  │
│   - Transit Pass QR Code       - Fleet Tracking Tracker      - Risk Intelligence Dashboard - Offline Sync Status     │
└────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               2. SOVEREIGN AI CORTEX (BILAL) ASSISTANT INTERFACE                                     │
│  - Text / Voice Multilingual Engine (Arabic, Kurdish, English)                                                       │
│  - On-Device Manifest Parsing / OCR Classifier                                                                       │
│  - Intelligent HS Suggestion & Risk Alert Dispatcher                                                                 │
└────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                3. LOCAL AUTONOMOUS STORAGE & RECONCILIATION EDGE                                     │
│  Does the Connection Exist?                                                                                          │
│    │                                                                                                                 │
│    ├──► [ YES: Online ] ──► Real-Time gRPC / WebSocket Synchronization with Central NDF                              │
│    └──► [ NO: Offline ]  ──► Encrypted SQLCipher SQLite Local DB Store ──► Queue Ledger Transactions ──► TLS Sync on Link│
└────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              4. SOVEREIGN IDENTITY & CRYPTOGRAPHIC SECURITY SIGNATURE                                │
│  - WebAuthn & biometric iris signature matching on-chip                                                              │
│  - Hardware Security Module (HSM) Cryptographic Time-stamped (RFC 3161) Document Signing                             │
│  - Zero-Trust session micro-segmentation                                                                             │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
========================================================================================================================
```

---

## 1. Multi-Role Dynamic Workspace Architecture
The core concept of IQA is **One Base Image, Infinite Experience Contexts**. At startup, after validating credentials, the application initializes the **Dynamic Experience Rendering Engine (DXRE)**, transforming metadata routes, styles, and action buttons.

### IQA Workspace Manifest Profiles

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ IQA DYNAMIC PROFILE MATRIX                                                                                           │
├────────────────────┬────────────────────┬────────────────────────────┬───────────────────────────────────────────────┤
│ User Role Class    │ Primary Focus      │ Core UI Widgets Included   │ High-Impact Security Level Context            │
├────────────────────┼────────────────────┼────────────────────────────┼───────────────────────────────────────────────┤
│ Citizen            │ Civil Identity &   │ Personal ID Card, Tax Slip │ LEVEL 1: Zero direct access to trade databases│
│                    │ Personal Payments  │ QR Gate Pass Tracker       │                                               │
├────────────────────┼────────────────────┼────────────────────────────┼───────────────────────────────────────────────┤
│ Business Importer │ Import Filings &   │ HS Catalog Index, Customs  │ LEVEL 1: High validation on business registry│
│                    │ Cargo Tracking     │ Payments, Active Filings   │                                               │
├────────────────────┼────────────────────┼────────────────────────────┼───────────────────────────────────────────────┤
│ Customs Broker     │ Multi-Client Transit│ Bulk Declarations Engine,  │ LEVEL 1 / 2: Scopes limited to assigned agent │
│                    │ Auditing & Clearing│ Duty Estimator, Bonded WMS │ license keys                                  │
├────────────────────┼────────────────────┼────────────────────────────┼───────────────────────────────────────────────┤
│ Border Officer     │ Checkpoint Lane    │ Sonar Scanner Feed, Weigh- │ LEVEL 2: Geolocated coordination to assign    │
│                    │ Control Operations │ bridge logs, Lane Barrier  │ checkpoint                                    │
├────────────────────┼────────────────────┼────────────────────────────┼───────────────────────────────────────────────┤
│ Lab Inspector      │ Biological Safety  │ Lab sample registers,      │ LEVEL 2: Biological quarantine inspection     │
│                    │ & Tests Validation │ Quarantine hold releases   │ reports                                       │
├────────────────────┼────────────────────┼────────────────────────────┼───────────────────────────────────────────────┤
│ Government Auditor │ Fraud Isolation &  │ Revenue yield dashboards,  │ LEVEL 3: National currency transaction trails │
│                    │ Ledger Auditing    │ CBI FX wire match checkers │                                               │
└────────────────────┴────────────────────┴────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 2. Omnichannel Multi-Device Layout Strategy
The IQA applet operates seamlessly across all form-factors, running custom responsive adaptations to balance informational density:

### Device Interfaces
*   **Mobile Form-Factor (iOS/Android App)**: Optimized for on-the-go interactions. Highlighted by large touch-targets ($\ge 48\text{px}$), quick biometric touchpoints, barcode scan readers, and lightweight offline maps. Used by citizens, brokers, and mobile patrol inspectors.
*   **Tablet Form-Factor (Rugged Outpost Handheld)**: Tailored for intensive warehouse, port docks, and vehicle weigh-station workflows. High-density grids, dual split-screen panes (e.g., viewing cargo declarations alongside active scanner output photos), and integration with external Bluetooth barcode and hardware scanning tools.
*   **Desktop Form-Factor (Chrome/Edge Sovereign Client)**: Enforced for complex administrative work, high-volume financial auditing, and national command visualizations. Features keyboard macro-shortcuts for rapid data entry, multidimensional d3 chart arrays, and deep ledger monitoring grids.
*   **Self-Service Public Kiosks**: Deployed at border entry posts, seaports, and municipal administrative centers. Built in simplified, high-contrast accessible layouts with visual and speech synthesis guidance in Arabic and Kurdish, prioritizing ID scans, payment receipt printing, and gate ticket disbursements.

---

## 3. On-Device AI-Native Cortex (Bilal Assistant)
The IQA is designed from the ground up with a localized AI assistant named **Bilal**, providing advanced context understanding, automated classification, and seamless multi-language speech tools.

```text
========================================================================================================
                            BILAL COGNITIVE ASSISTANT PROCESSING LOOP
========================================================================================================

  [ VOICE/TEXT INPUT ] ──► [ Arabic / Kurdish Speech Recognizer ] ──► [ Semantic Intent Parser ]
                                                                                │
                                                                                ▼
  [ SECURE ACTION ] ◄── [ Cryptographic Dual-Signature ] ◄── [ Suggested Action Block ]
                                                             - Ex: Auto HS Classify / Audit Alerts
========================================================================================================
```

### Bilal Core Capabilities
*   **Semantic Natural Language Ingestion**: Supports conversational inputs in standard Arabic, Iraqi Arabic vernacular dialects, Kurdish (Sorani and Kurmanji scripts), and English. Users can state, *"Review the bill of lading for container IQ-901 and check if the custom tariff was paid"* to trigger complex backend traces instantly.
*   **Computer Vision Document OCR Classifier**: Users can take a photo of physical shipping invoices, custom registries, or commercial tax certificates with their mobile device camera. Bilal processes the crop, identifies key text blocks, extracts critical values, and structures declarations automatically into digital schemas.
*   **AI-Driven Tariff HS Classification**: When importers input cargo descriptions, Bilal suggests corresponding 8-digit World Customs Organization HS tariffs, calculating tax values on-the-fly and reporting potential tariff evasion risks.
*   **Cognitive Fraud Anomaly Alerts**: For government regulators, Bilal runs continuous anomaly matching on incoming documents, highlighting instances of over-invoicing or mismatched country classification, and flagging accounts directly on the executive board.

---

## 4. Absolute Offline-First Architecture
For a sovereign national application, network loss is not an excuse for operational failure. The IQA maintains full usability even in high-heat, remote, air-gapped desert outposts.

### Sync Framework Operations
*   **On-Device Secure Storage (SQLCipher SQLite DB)**: Storage disks on mobile components are encrypted utilizing 256-bit AES. Local storage holds updated Master Data catalogs, active border blacklists, and temporary local user records.
*   **State-Queued Transaction Log**: Transactions executed offline (such as cargo clearance registrations, vehicle weigh records, or biosecurity approvals) are written as cryptographically signed data packets, sequentially queued in an append-only FIFO database loop.
*   **Conflict Resolution Protocol (Pre-calculated Hash Chain)**: Offline transactions contain cryptographic hashes from preceding actions. If multiple border posts execute overrides offline, synchronization uses deterministic hash reconciliation rules:

$$\text{Final State} = f(\text{Pre-Approved Ledger Hash}, \text{Timestamp Offset}, \text{Operator Cryptographic Rank})$$

*   **Automated Sync Ingest**: Upon restoring connection, the local app pushes queued transactions. The central NDF validates signatures and commits events, updating records across all operational directories.

---

## 5. Legally Binding Cryptographic Digital Signatures & Non-Repudiation
Every high-impact citizen transaction, commercial clearance, or administrative supervisor override executed in IQA is protected by national cryptographic signature protocols.

### Cryptographic Framework
*   **Hardware Token Authentication (YubiKey / SmartCard)**: Administrative and border officers use on-device cryptographic smart cards or hardware tokens. Touch sensors sign document hashes directly within secure enclaves, preventing remote manipulation or key extraction.
*   **National Citizens PKI Certificates (X.509)**: Citizens are assigned verified digital certificate keys stored securely inside on-device security chips, compliant with national electronic transaction legislation.
*   **Cryptographic Non-Repudiation Ledger**: Signed transactions write unique SHA-512 hashes directly to the sovereign data ledger, providing absolute legal proof of transactions.
*   **Atomic RFC 3161 Time-Stamp Verification**: Signed document structures are stamped by dedicated state authorities linked to atomic clock networks inside Baghdad, ensuring accurate transaction records.

---

## 6. Zero-Trust Access Controls & Geofencing Policies
The IQA architecture integrates strict boundaries that control access using spatial, terminal, and operational metadata attributes (ABAC).

### Key Architectural Guidelines
*   **Microsecond Geofencing Checks**: Access to high-impact border operations terminal screens requires continuous geofencing verification (combining hardware GPS coordinates, cell tower triangulation, and local checkpoint Wi-Fi handshakes). If an inspector exits their assigned sector boundary, critical screens are instantly locked.
*   **Dynamic Data Masking**: Secure fields (such as direct taxpayer credit indices, personal biometric templates, and corporate bank balances) are automatically masked at the rendering tier unless explicitly cleared via judicial keys.
*   **Continuous Behavioral Biometrics**: The mobile app analyses tactile interactions, tracking finger pressure-maps, device angle, and typing speeds. Sudden behavioral changes trigger immediate biometric re-verification challenges (such as Iris scans), preventing account takeovers from unlocked devices.

---

## 7. Integrated System Experiences Matrix
This reference layout maps how the One-App dynamically routes, styles, and executes domains:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ IQA OMNICHANNEL INTEGRATION FLOWS                                                                                  │
├───────────────┬────────────────────────────┬────────────────────────────┬──────────────────────────────────────────┤
│ Target Domain │ Dynamic App Module Screen  │ Local AI (Bilal) Task      │ Offline Continuity Resiliency            │
├───────────────┼────────────────────────────┼────────────────────────────┼──────────────────────────────────────────┤
│ Citizens      │ Unified Civil Identity     │ Guides tax payments,       │ Displays local cached QR ID code, and    │
│               │ & Personal Tax Slip Portal │ translates notifications   │ queues e-payments offline                │
├───────────────┼────────────────────────────┼────────────────────────────┼──────────────────────────────────────────┤
│ Businesses    │ Corporate Import filings,  │ Suggests HS classifications│ Files manifests locally, updating        │
│               │ Cargo Tracking Interface   │ and flags tariff risks     │ transit tracking once online             │
├───────────────┼────────────────────────────┼────────────────────────────┼──────────────────────────────────────────┤
│ Logistics     │ Active Fleet Tracker Board;│ Optimizes convoy routes,   │ Stores maps, and tracks offline GPS      │
│               │ Smart Lock Status Screen   │ estimates ETA via LSTM     │ routes via crypt-locked log queues       │
├───────────────┼────────────────────────────┼────────────────────────────┼──────────────────────────────────────────┤
│ Finance       │ CBI RTGS wire match, and   │ Cross-audits transactions, │ Validates invoice structures offline;     │
│               │ Treasury Single Account    │ detecting over-invoicing   │ synchronizes balances when connected     │
├───────────────┼────────────────────────────┼────────────────────────────┼──────────────────────────────────────────┤
│ Border Ops    │ Scanner Sonar, lane gates  │ Scans plates, and detects  │ Continues scanning, validating codes via │
│               │ status monitors interface  │ cargo threat indicators    │ local cached blacklists                  │
└───────────────┴────────────────────────────┴────────────────────────────┴──────────────────────────────────────────┘
```
