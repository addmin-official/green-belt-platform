# Iraq Digital Gateway: Deployment Environment & Platform Hardening Guide

This integration manual provides secure procedures for devops and infrastructure engineers deploying the Iraq Digital Gateway.

---

## 1. Network Topology & Hardened Routing

The IDG operates on a three-tier sovereign security architecture:

```
[ Baghdad Central Nodes ] <--- (FW Rule: Deny KRG) -----\
                                                         +--> [ Joint Netting Node (Hash & aggregates only) ]
[ Erbil Regional Nodes ] <--- (FW Rule: Deny Federal) --/
```

1. **Federal Isolation Firewall**: Federal gateway servers must run inside physically isolated namespaces. Querying Erbil regional database ports is strictly blocked at the hardware cluster routing layer.
2. **KRG Isolation Firewall**: KRG gateway servers must run in distinct Regional secure clusters. Querying central Baghdad database tables or endpoints is blocked.
3. **Joint Netting Firewall**: Bilateral matching tasks are authorized to run on dedicated mediation nodes. The exchange must adhere to the **METADATA-ONLY** principle.

---

## 2. Hardened Environment Settings Template

Ensure the following variables are configured in your container execution registry:

- `VITE_FEDERAL_API_BASE_URL`: Core internal service endpoint for Federal Baghdad ministries.
- `VITE_KRG_API_BASE_URL`: Core internal autonomous regional endpoint for Kurdistan Erbil.
- `VITE_JOINT_API_BASE_URL`: Joint bilateral coordination server mapping.
- `VITE_PROVIDER_MODE`: Set to `OPERATIONAL` on production staging nodes.
- `VITE_OPERATIONAL_MODE`: Set to `true` to disable demo-level mock pathways completely.
- `VITE_ENABLE_DEMO_MODE`: Set to `false` in production.
- `VITE_RELEASE_CHANNEL`: Staging or Production.
- `VITE_BUILD_TARGET`: Production production compile-time target.

---

## 3. Threat Assessment Plan

- **Infraction Action**: If any raw dataset (e.g. `raw_identity`, `pii_biometrics`) is routed to a Joint or invalid endpoint, the `ApiContractValidationEngine` and the network proxies register an immediate high-security alert and shut down the gateway port.
- **Log Forgery Guard**: All operational endpoints enforce write-ahead journal logs before replying to secure gateway proxies.
