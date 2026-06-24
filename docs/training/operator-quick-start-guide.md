# Operator Quick-Start and Dry-Run Testing Guide

**Document Reference:** IDG-TRN-STG-007  
**Classification:** RESTRICTED TRAINING DOCUMENT  
**Topic:** CLI Testing, Linter Runs, and System Verification  

---

## 1. Launching the Local Dry-Run Environment
To evaluate the platform, operators can run the fully integrated dry-run simulator in our sandbox.

### Executing Local Builds:
To build the frontend UI and backend server bundle:
```bash
npm run build
```
This compiles the React application under strict ESM path rules and creates a bundled `dist/server.cjs` file bypassing Node's CJS runtime constraints.

### Launching the Development Server:
```bash
npm run dev
```

---

## 2. Conducting a Local Dry-Run Clearance Audit
To simulate cross-border transit coordinate verifications:
1. Open the platform in your browser.
2. Navigate to the **Automated QA Gate** tab inside the **Acquisition & Deployment Hub**.
3. Under **Scenario Selector**, select `Simulation Phase C: Staging Manifest Verification`.
4. Run the validation sequence. Observe that the KRG enclave validates BRS matching rules locally, generates a validation SHA-256 hash, and transfers the status token to the Joint operations view.

---

## 3. Running Automated Compliance Checks
Operators can execute the same checks run by our production pipelines:

### Verify Outreach Packages:
```bash
npm run qa:outreach-package
```

### Run Full Production Gate Scans:
```bash
npm run qa:production-gate
```

If any files are missing or unvetted claims of automatic approvals are detected, the scan will immediately signal `FAIL` with a detailed violation log.
