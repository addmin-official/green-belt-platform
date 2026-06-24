# KRDPASS OpenID Connect Integration Request

**Document Reference:** IDG-KRG-ONB-021  
**Integration Class:** OIDC / OAuth 2.0 Authorization Code Flow + PKCE  

---

## 1. Client Identity Requirements (Staging Environment)
To facilitate testing within the Sandbox / Pilot Staging environment, the IDG requires the provision of OAuth client descriptors.

- **Request Type:** New OIDC Client Credentials & Client ID registration.
- **Client Name:** `Iraq Digital Gateway (IDG) Portal - Kurdish Region Branch`
- **Client Secrets:** *TO BE COMPILLED VIA SECURE ENV CONFIG ONLY (No hardcoded secrets or placeholders are saved).*
- **Redirect URIs (Staging/Pilot):**
  - `http://localhost:3000/auth/krdpass/callback` (Local Development Loopback)
  - `https://idg.gov.example/auth/krdpass/callback` (Secure Intranet Gateway)
- **OIDC Flow Protocol:** Authorization Code Flow + RFC 7636 Proof Key for Code Exchange (PKCE) mandatory.

---

## 2. Requested Scope Register & Compliance Boundaries

The application requests authorization for only two low-risk scope indicators for the initial pilot phase, conforming to the principle of least privilege.

| Scope | Sensitivity Class | Jurisdiction Restriction | Request Status | Usage Justification |
| :--- | :--- | :--- | :--- | :--- |
| **`openid`** | PUBLIC | ALL_SYSTEM | REQUIRED | Core identity token establishment to identify the acting regional customs officer or desk advisor. |
| **`profile`** | RESTRICTED | ALL_SYSTEM | REQUIRED | Displays localized worker names and operational ministries (e.g., KRG Ministry of Finance) for layout rendering. |
| **`citizen_identity`** | HIGH_SENSITIVITY | **KRG_ONLY** | **APPROVAL_REQUIRED** | *NOT REQUIRED FOR INITIAL PILOT.* Future Citizen Registry queries will never display raw citizen lists in joint systems. |

---

## 3. Cryptographic Signature & JWKS Policy
- **Signature Algorithm Enforcement:** `RS256` only.
- **JWKS Source Plan:** Live caching of keys via KRG Department of IT's JWKS Endpoint. 
- **Token Storage Policy:** Transient token storage. Tokens are maintained strictly in-memory or secure session-state instances on the server. They are never written to shared cache engines, joint cloud environments, or stored client-side in the browser.
- **Audit Logging and Retention:** Audit indicators track login event timestamps, acting client IDs, and authorization outcome states. No private user claims are dumped to log files.
