# Iraq Digital Gateway (IDG) • National Data Fabric (NDF) Blueprint
## Unified Enterprise Data Architecture for Sovereign Trade & Border Guard
**Design Specification for a 20+ Year Lifecycle**

---

## Executive Architectural Summary
The **National Data Fabric (NDF)** is the ultimate data convergence, storage, ingestion, and governance backbone of the **Iraq Digital Gateway (IDG)**. It integrates operational databases, distributed event streams, analytical warehouses, object-level storage systems, and artificial intelligence model feature registries into a single, high-throughput, zero-trust, on-premises federated data layout. 

The NDF is designed to guarantee high availability (99.999% uptime), absolute regional offline-autonomy, cryptographic append-only integrity validation, multi-agency regulatory governance, and near-zero latency processing. It handles hundreds of millions of custom declarations, central bank wire transactions, telemetry sensor signals, and biological quarantine events annually.

---

## National Data Fabric Architectural Schema

```text
========================================================================================================================
                                 IRAQ NATIONAL DATA FABRIC (NDF) TOPOLOGY
========================================================================================================================

                 [ BORDER SENSORS / SCANNERS ]      [ TRADE ENTRANT FILINGS ]      [ CBI BANKING WIRE INTAKE ]
                               │                               │                               │
                               ▼                               ▼                               ▼
┌───────────────────────────────────────────────────────────────┐
│              1. OPERATIONAL DATABASES LAYER (OLTP)            │
│  - Customs DB (PostgreSQL / RLS)      - Logistics Geo-DB      │
│  - Identity IAM Ledger (OpenLDAP)     - CBI Wire Match (SQL)  │
└───────────────────────────────┬───────────────────────────────┘
                                │ (Real-Time Change Data Capture - CDC via Debezium)
                                ▼
┌───────────────────────────────────────────────────────────────┐
│            2. STREAMING PIPELINES & EVENT STORE (Kafka)       │
│  - raw-manifests  - scanner-telemetry  - cbi-bank-wires        │
│  - Stream Processor: Apache Flink (Stateful Join Queries)     │
└───────────────────────────────┬───────────────────────────────┘
                                │ (Continuous Append & Micro-batch Ingestion Engine)
                                ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       3. UNIFIED DATA LAKEHOUSE ARCHITECTURE                                         │
│                                                                                                                      │
│   [ BRONZE ZONE ]                                [ SILVER ZONE ]                            [ GOLD ZONE ]            │
│   Raw Iceberg Append-Only Blocks                 Cleaned, Schema-Conformed                  Fully Aggregated Stars   │
│   • RAW JSON Cargo File Stream                   • Unified IDG Customs Models               • Treasury Yield Cubes   │
│   • Raw X-Ray Scanner Output                     • Cleansed Importer Records                • Threat Score Vectors   │
└──────────────────────────────────────┬───────────────────────────────────────────────────────────────────────────────┘
                                       │ (Advanced OLAP Partition Querying)
                                       ▼
┌───────────────────────────────────────────────────────────────┐
│                4. ENTERPRISE DATA WAREHOUSE (OLAP)            │
│  - Trino / Presto Distributed query engines                   │
│  - dbt (Data Build Tool) automated semantic validation lines   │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ├──► [ Master Data Management (MDM) Engine ] (HS Catalog, Importers Roster)
                                ├──► [ Enterprise Metadata Catalog & OpenLineage ] (Apache Atlas Tracking)
                                └──► [ National Sovereign AI Feature Store ] (IDG Cortex Training Vectors)
========================================================================================================================
```

---

## 1. Operational Databases Layer (OLTP)
The operational databases of the IDG handle active, high-concurrency transactional workloads. They are structured according to Domain-Driven Design (DDD) to isolate faults and restrict database access per microservice.

### Specific Databases
*   **Customs Declarations DB (PostgreSQL Key-Store)**: Houses active declarations, bills of lading, and HS code classifications. Managed with ultra-strict PostgreSQL Row-Level Security (RLS) policies to prevent cross-checkpoint leakage.
*   **Logistics & Corridor Geolocation DB (PostgreSQL with PostGIS extension)**: Tracks real-time spatial locations of shipping fleets, border entry vehicle cues, sealed container trucks, and active routes.
*   **Central Financial Registry DB (High-Availability CockroachDB Cluster)**: Records import values matching CBI FX auction hashes. Runs as standard high-availability distributed SQL to prevent single-point-of-failure outages.
*   **Border Physical Telemetry DB (TimescaleDB)**: Ingests time-series metrics from local checkpoint gates (scanners, network speeds, temperature, local server power grid state).

### Responsibilities
*   Maintain database-level ACID transactions for active clearances and cash registrations.
*   Isolate data domains by microservice bounds – no inter-service queries should circumvent APIs.
*   Implement automatic replication to local border outpost micro-servers for offline-first resilience.

### Ownership & Governance
*   **Operational Database Administration Division & Chief Database Architect**.

### Future Scalability Considerations (20+ Year)
*   **Automatic Archiving Trigger**: Data is automatically marked for partitioning and archived to cold storage via CDC lines after 90 days, keeping the primary transactional indexes extremely lightweight.

---

## 2. Event Store & Streaming Pipelines (Real-Time Plane)
To power a multi-agency, near-instant intercept system, all transactions, declarations, and physical sensor outputs are treated as immutable events.

### Core Architecture
*   **Event Log (Apache Kafka / Redpanda Cluster)**: The central backbone of the IDG. All data insertions, state changes, and hardware events are published as immutable, serialized events.
*   **Change Data Capture (CDC)**: Deploying **Debezium** connectors on all Operational Databases. Every transaction, even if made directly via internal systems, emits a CDC event to Kafka (e.g., `db-customs.public.declarations`).
*   **Stateful Stream Processing (Apache Flink)**: Monitors events on-the-fly. Flink executes continuous sliding window correlations – for example, matching incoming cargo manifest files to CBI FX transfer approvals within a rolling 60-second window to flag financial out-flow anomalies.

### Key Kafka-Topic Pipelines
*   `iraq.idg.manifests.raw`: Unvalidated, digital filings directly from importers.
*   `iraq.idg.scanners.telemetry`: Raw outputs of physical X-ray machines, weigh-bridge registers and vehicle plate readers.
*   `iraq.idg.cbi.auction-wires`: Central Bank of Iraq financial transfers data.
*   `iraq.idg.customs.audit-logs`: Ledger entries tracking all human operator edits and overrides.

### Future Scalability Considerations (20+ Year)
*   **Event Schema Registry (Confluent Schema Registry)**: Enforces strict backward and forward Avro/Protobuf schema compatibility. If a schema changes inside the next 200 months, the consumers will not break.

---

## 3. Data Lakehouse & Object Tier Architecture
For deep, petabyte-scale analysis, training specialized AI models, and long-term regulatory compliance logs, the NDF deploys a unified **Lakehouse** model using open-source, non-proprietary table formats.

### Core Storage Platform
*   **Primary Objects Tier (MinIO / Ceph Object Store)**: Hosted on secure local government hardware, presenting fully open, S3-compatible endpoints.
*   **Sovereign Table Format (Apache Iceberg)**: All structured logs inside the lake are represented as Iceberg table specs, enabling high-performance relational SQL querying directly over cold physical files.

### Structured Schema Zones
1.  **Bronze Zone (Ingestion / Raw Trace)**:
    *   Saves absolute unmodified, append-only streams from streaming pipelines. Contains RAW JSON files, unchanged scanner arrays, and flat CBI transaction records.
    *   No schema correction or validation is run in this zone.

2.  **Silver Zone (Cleansed / Conformed Objects)**:
    *   Ingests data from the Bronze zone through automated dbt pipelines.
    *   Validates data types, maps Kurdish/Arabic entries to shared dictionaries, normalizes datetime zones to UTC, hashes sensitive tax payer IDs, and resolves country codes to ISO values.

3.  **Gold Zone (Business / Analytical Aggregations)**:
    *   Pre-aggregated, high-performance dimensional tables structured as star schemas.
    *   Optimized for sub-second executive reporting, trend projections, and feeding AI training inputs (such as historical cargo risk ratios).

### Future Scalability Considerations (20+ Year)
*   **Multi-Tier Storage Life Policy**: Iceberg table configurations automatically transition older partitions (e.g., historical entries older than 5 years) to low-cost tape-drives or cold-glacier local vaults without breaking catalog lookups.

---

## 4. Enterprise Data Warehouse (Analytical OLAP)
Enables ministries and high command to query structured histories across decades of national trade without blocking operational databases.

### Core Stack
*   **Query Coordinator Engine (Trino / Distributed Presto)**: A highly parallelized SQL query engine executing fast analytical queries over massive Apache Iceberg silver/gold tables.
*   **Semantic Layer & Transformations (dbt — Data Build Tool)**: Standardizes all metrics (such as "Customs Revenue Yield", "Border Clearing Latency", "Financial Overpricing Ratio") in version-controlled SQL files. 
*   **Data Models**: Structured as star and snowflake multidimensional grids, separating Dimensions (Importers, Gates, Products, Dates) from Fact tables (Tariffs Paid, Scans Executed, CBI Transfers).

### Ownership
*   **Ministry of Finance & National Trade Council Business Intelligence Divisions**.

---

## 5. Master Data Management (MDM)
To guarantee consistency across all state software, the NDF incorporates a central Master Data Management engine. The MDM holds the authoritative "Single Source of Truth" lists.

### Masters Registry Domain Models
*   **The Sovereign Harmonized System (HS) Catalog**: Authoritative 8-digit tariff indexes aligned with World Customs Organization (WCO) standards, with custom Iraq tax rates.
*   **Sovereign Agency Master Register**: Standard identity entries for all Iraqi ministries, state quarantine labs, border posts, and security agencies.
*   **Unified Register of Importers**: Cleansed database matching tax IDs, commercial licenses, customs ratings, and security clearance profiles for active trade entrants.
*   **Exemptions & Accords Index**: Active diplomatic clearance matrices, tax exemptions granted to domestic industry, and bilateral trade accords.

### Governance
*   Only registered, authorized administrators from the Ministerial Council can submit updates to Master Data. Any change triggers automatic Kafka events that sync matching cache tables across all operational microservices.

---

## 6. Enterprise Metadata Catalog & Data Lineage
For critical national infrastructure, every data state change must be explainable, auditable, and trace-compliant.

### Core Technologies
*   **Sovereign Metadata Catalog (Apache Atlas)**: Automatically catalogs schemas, indexes databases, lists files, and documents security classifications (e.g., TOP SECRET, CLASSIFIED, PUBLIC).
*   **Continuous Trace Lineage (OpenLineage Integration)**: Integrated into Flink streaming pipelines, dbt tables, and ingestion jobs.
*   **Lineage Visual Representation**: Generates a dynamic schema-to-schema map showing exactly how data flows.
    *   *Example Trace*: Importer Manifest Input (Bronze) ──► dbt Clean Task (Silver) ──► Revenue Yield Summary (Gold) ──► Weekly PMO Strategy Report.
    *   If a tax calculation error occurs, compliance agents can trace the lineage backwards to find the exact raw ingestion payload.

---

## 7. Data Governance & Sovereign Security Actions
The NDF enforces absolute security frameworks protecting sensitive national assets from corporate or foreign telemetry surveillance.

### Key Governance Policies
*   **Zero-Trust Row-Level Security (RLS)**: Customs officers stationed in Basra are strictly prohibited from viewing transit records originating from northern Ibrahim Khalil terminals, enforced via database-level session policies.
*   **Dynamic Data Masking**: PII (Personally Identifiable Information) such as importer phone numbers, driver biometrics, and exact bank accounts are masked or hashed using salted SHA-256 techniques inside analytical tables unless explicitly cleared by a judicial override.
*   **Column-Level Encryption**: Cryptographic keys managed in physical secure hardware (HSM) encrypt bank wire values and classification threat records before physical drive formatting.
*   **Cryptographically Signed Audit Log**: Internal administrative records, human-in-the-loop decisions, and database updates write append-only hashes directly into our secure transaction ledger. These hashes are immutable and cannot be rewritten, even if a host root server suffers compromise.

---

## 8. Alignment of Data Fabric to IDG Domain Modules

### I. Customs
*   **Data Utility**: Matches HS Codes to incoming manifests, calculates duties, verifies exemption certificates, and reconciles tax receipts.
*   **Primary Pipelines**: `customs-tariff-engine` ──► `iraq.idg.manifests.raw` ──► Flink Validations.

### II. Trade
*   **Data Utility**: Tracks trade volumes, processes digital import requests, and monitors trade balances with neighboring nations.
*   **Primary Pipelines**: MDM Importers Catalog ──► Star Schema Trade Balance Models.

### III. Logistics
*   **Data Utility**: Calculates physical container truck clearance times, maps route deviations, and forecasts harbor basin queues.
*   **Primary Pipelines**: Logistics Geo-DB ──► PostGIS Spatial Joins ──► Flink Queue Forecasts.

### IV. Finance
*   **Data Utility**: Cross-checks central bank wire transfers to cargo manifest assessments to stop over-invoicing and capital flight.
*   **Primary Pipelines**: `iraq.idg.cbi.auction-wires` ◄──(Flink Joins)──► `iraq.idg.manifests.raw` ──► CBI Compliance Dashboard.

### V. Border Operations
*   **Data Utility**: Audits scanner diagnostic logs, tracks biosecurity clearance, and alerts on physical sensor anomalies.
*   **Primary Pipelines**: TimescaleDB Sensor Logs ──► Operational Dashboard Graphs.

### VI. Sovereign Artificial Intelligence
*   **Data Utility**: Features Store. Gold analytical datasets are continuously piped to local offline neural network instances inside the AI-Native Model Registry. This trains dynamic classifiers to detect tariff fraud, biosecurity hazards, and risk patterns instantly with maximum precision.
