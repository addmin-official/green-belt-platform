export interface StandardMetric {
  standardName: string;
  category: 'Security' | 'API' | 'Sovereignty' | 'DevOps';
  complianceStatus: 'FULLY_COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'NOT_APPLICABLE';
  description: string;
  enforcementMechanism: string;
}

export class KRGDigitalStandardsMatrix {
  public static getMetrics(): StandardMetric[] {
    return [
      {
        standardName: 'OpenAPI 3.0+',
        category: 'API',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'All KRG-facing ingress and egress routes configured inside the API contract registries and validated.',
        enforcementMechanism: 'Strict schema definition file /docs/api-contracts/krg-openapi.yaml'
      },
      {
        standardName: 'OAuth 2.0 / OpenID Connect (OIDC)',
        category: 'Security',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Native KRDPASS identity compatibility with ID token exchange standards.',
        enforcementMechanism: 'Client code validates signature, issuer constraints, and nonce tokens'
      },
      {
        standardName: 'Proof Key for Code Exchange (PKCE)',
        category: 'Security',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Mandatory PKCE protection for mobile or client-side authorization callback routes.',
        enforcementMechanism: 'Auth session state generation with dynamic code_verifier patterns'
      },
      {
        standardName: 'JWT / JWKS Validation',
        category: 'Security',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Automatic verification of incoming state tokens against external public key sets.',
        enforcementMechanism: 'JWKS endpoint validation caches keys locally'
      },
      {
        standardName: 'JSON-API Specification',
        category: 'API',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Consistent RESTful response templates containing links, document metadata, and unified JSON structures.',
        enforcementMechanism: 'KRG endpoint wrappers serialize using standardized formatters'
      },
      {
        standardName: 'Immutable Audit Logging',
        category: 'Sovereignty',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Every auth validation request issues a signed verification record on the joint system logging track.',
        enforcementMechanism: 'Security assertion logging triggers side-effect events'
      },
      {
        standardName: 'Environment Variable Isolation',
        category: 'DevOps',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'No secrets or endpoints are shared or nested within client bundles; separate environment variable groups.',
        enforcementMechanism: '.env.example boundary configurations'
      },
      {
        standardName: 'Microservice Readiness Probe',
        category: 'DevOps',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Integrates endpoints to report raw connection state directly back to the health probes.',
        enforcementMechanism: 'Express routes reporting ACTUAL connection checks'
      },
      {
        standardName: 'Metadata-only Joint Exchange',
        category: 'Sovereignty',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Blocks full record transfers to consolidated dashboards, permitting only cryptographic validation hashes.',
        enforcementMechanism: 'KRGDataSovereigntyPolicy filters payload structures'
      },
      {
        standardName: 'Raw Data Sharing Block',
        category: 'Sovereignty',
        complianceStatus: 'FULLY_COMPLIANT',
        description: 'Total structural isolation preventing Federal and out-of-boundary systems from querying KRG database pools.',
        enforcementMechanism: 'Database access policies enforced via Drizzle metadata and firestore rules'
      }
    ];
  }
}
