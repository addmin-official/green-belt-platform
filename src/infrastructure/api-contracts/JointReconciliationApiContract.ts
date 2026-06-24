import { ApiContract } from './ApiContractTypes';

export const JointReconciliationApiContract: ApiContract = {
  domain: 'Revenue', // Mapped to general revenue matching domain
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/joint',
  allowedJurisdictions: ['JOINT_OPERATIONS'],
  allowedPayloadTypes: ['reconciliation_hashes', 'settlement_states', 'metadata_manifests'],
  forbiddenPayloadTypes: ['raw_revenue', 'raw_customs_records', 'raw_identity_records', 'raw_workforce_records', 'raw_intelligence_records', 'raw_security_records', 'raw_biometric_data', 'raw_personal_data'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'joint_reconciler'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: true,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Joint internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/joint/reconciliation', method: 'GET', description: 'Execute or check joint settlement/matching outcomes', expectedResponseKeys: ['reconciliationResult'] },
    { path: '/joint/hash-verification', method: 'POST', description: 'Verify ledger block cryptographic integrity hash', expectedResponseKeys: ['verified', 'mismatchDetected'] },
    { path: '/joint/settlement-status', method: 'GET', description: 'Determine dual-signature settlement clear state', expectedResponseKeys: ['settled', 'reconciliationHash'] },
    { path: '/joint/metadata-exchange', method: 'POST', description: 'Register dual-jurisdiction non-sensitive metadata exchange', expectedResponseKeys: ['exchangeStatus'] }
  ]
};
