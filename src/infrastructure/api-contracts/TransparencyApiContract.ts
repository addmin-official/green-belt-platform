import { ApiContract } from './ApiContractTypes';

export const TransparencyApiContract: ApiContract = {
  domain: 'Transparency',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/integrity',
  allowedJurisdictions: ['JOINT_OPERATIONS'],
  allowedPayloadTypes: ['cases_metadata', 'reconciliation_hashes', 'aggregated_anomalies_summary'],
  forbiddenPayloadTypes: ['raw_revenue', 'raw_customs_records', 'raw_identity_records', 'raw_workforce_records', 'raw_intelligence_records', 'raw_security_records', 'raw_biometric_data', 'raw_personal_data'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'integrity_officer'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: true,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Transparency internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/integrity/cases', method: 'GET', description: 'Non-sensitive integrity tracking summaries', expectedResponseKeys: ['cases'] },
    { path: '/integrity/evidence', method: 'GET', description: 'Non-sensitive audit trails evidence references (hashes only)', expectedResponseKeys: ['evidenceHashes'] },
    { path: '/integrity/risk-signals', method: 'GET', description: 'Aggregated risk signals summary', expectedResponseKeys: ['riskSignals'] },
    { path: '/integrity/audit-trails', method: 'GET', description: 'Sovereign cross-border matching audits', expectedResponseKeys: ['auditTrails'] }
  ]
};
