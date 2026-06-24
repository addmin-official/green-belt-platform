# IDG Staging Deployment Verification Rubric

This checklist is the final sign-off criteria before staging:

---

### Step A: Code & Asset Sanitation
- [ ] **No Hardcoded Tokens**: Checked via `npm run qa:production-gate` that no private keys, passwords, or mock service accounts are bundled.
- [ ] **Data Matrices Confirmed**: The Jurisdiction Data Matrix restrictions are correctly implemented in API routes.
- [ ] **Local Placeholders ONLY**: Checked `.env.example` to ensure no live public hostnames are exposed to client-facing assets.

### Step B: Integration Compliance
- [ ] **Metadata-Only Enforcement**: Verified that Joint APIs do not expose raw identity indices, tax registers, military rosters, or customs ledgers.
- [ ] **Three-Language Support**: Complete coverage for Arabic, Kurdish Sorani, and English labels across the platform interface.

### Step C: Environment Preparation
- [ ] **Mutual TLS Active**: All target connections are configured with valid Client Certificates.
- [ ] **Key Rotation**: Cryptographic signing keys are set to rotate on a 30-day interval.
