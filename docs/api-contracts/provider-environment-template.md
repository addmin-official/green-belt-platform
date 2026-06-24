# IDG Provider Environment Variable Configuration Template

Use this configuration template to populate the `.env` settings profile inside the gateway container. 

> [!CAUTION]
> **Strict Security Notice**:
> - NEVER store actual production keys, secrets, or certificates inside environment files.
> - NEVER hardcode real public or governmental endpoints in this profile. All production endpoints must route through secure, internal, private network overlays (VPNs or private VPC nodes) using safe placeholders.

---

## 1. Provider Target Base Endpoints

Assign base URLs connecting the system to the respective secure API gateways.

```env
# ==============================================================================
# IDG LOCAL ENDPOINT ENFORCEMENT CONFIGURATION
# ==============================================================================

# Federal (Baghdad Core Gateway) base endpoint placeholder.
# Configured only via internal non-public microservice mapping.
VITE_FEDERAL_API_BASE_URL=http://localhost:3000/api/federal-placeholder

# KRG (Erbil Core Gateway) base endpoint placeholder.
# Configured only via internal non-public microservice mapping.
VITE_KRG_API_BASE_URL=http://localhost:3000/api/krg-placeholder

# Joint Operations Bilateral Netting gateway base endpoint placeholder.
VITE_JOINT_API_BASE_URL=http://localhost:3000/api/joint-placeholder
```

---

## 2. Infrastructure Modes and Safety Locks

To safeguard sovereignty during audit cycles, toggle system mode switches exactly:

```env
# Selector config: 'DEMO', 'TRAINING', or 'OPERATIONAL'
# In operational mode, the mock engine is completely isolated and cannot be loaded.
VITE_PROVIDER_MODE=DEMO

# Standard runtime mode locks: Set to true only in real private target networks.
VITE_OPERATIONAL_MODE=false

# Enable or disable visual demo scenarios overlay. Keep disabled in target production terminals.
VITE_ENABLE_DEMO_MODE=true

# Enable or disable trainee training sandbox accounts.
VITE_ENABLE_TRAINING_MODE=false
```
