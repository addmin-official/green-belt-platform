import { ApiContract } from './ApiContractTypes';

export const AuditApiContract: ApiContract = {
  domain: 'Audit',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/audit',
  allowedJurisdictions: ['JOINT_OPERATIONS'],
  allowedPayloadTypes: ['audit_metadata', 'reconciliation_hashes', 'event_aggregates'],
  forbiddenPayloadTypes: ['raw_revenue', 'raw_customs_records', 'raw_identity_records', 'raw_workforce_records', 'raw_intelligence_records', 'raw_security_records', 'raw_biometric_data', 'raw_personal_data'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'joint_auditor'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: true,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Unified Joint audit logs extraction (metadata only)', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] }
  ]
};
