# Iraq Digital Gateway: Pilot Backend MVP Scaffold

The IDG platform features an isolated, three-zone Node.js + Express backend scaffold to ensure high security isolation of data streams before pilot database ingestion.

---

## 1. Running the Backend MVP Scaffold

From the `/server` workspace directory:

```bash
# Install dependencies
npm install

# Run static TypeScript compliance check
npm run build

# Start isolated sandbox environment (default Port 8787)
npm run dev

# Run security static audit validation
npm run qa:safety
```

---

## 2. Why Providers are NOT_CONFIGURED

By default, the platform routes all queries for raw datasets (tax registers, customs ledger, biometrics, border gateways) to a non-connected fallback state. 
This is because live, physical government nodes/databases are isolated from public code environments.
When secure database endpoints are deployed:
1. Populate specific operational parameters (`FEDERAL_DB_URL`, `KRG_DB_URL`, `JOINT_METADATA_DB_URL`).
2. Update `PROVIDER_MODE` to `OPERATIONAL`.
3. The server will dynamically swap fallback responses to live database query engines.

---

## 3. Joining Database Segments (Federal / KRG / Joint Metadata Only)

- **Federal Central Centralized Nodes**: Connect your physical Oracle, PostgreSQL or MSSQL Centralized DB URL to `FEDERAL_DB_URL` inside Central Centralized firewalls. This zone will strictly query `/api/v1/federal/*` endpoints.
- **Kurdistan Regional Autonomous Nodes**: Connect your physical Regional Erbil cluster DB URL to `KRG_DB_URL` inside Regional Erbil firewalls. This zone will strictly serve `/api/v1/krg/*` endpoints.
- **Joint Reconciliation Bilateral Nodes**: Connect the Shared Interoperability Ledgers strictly via unidirectional HTTPS tunnels inside Joint Bilateral Operations Command. All exchanges strictly enforce **METADATA-ONLY** patterns, stripping raw identity index information before dispatching. This resolves matching transactions without exposing raw personal records.
