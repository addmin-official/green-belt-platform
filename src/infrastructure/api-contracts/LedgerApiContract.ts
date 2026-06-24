import { ApiContract } from './ApiContractTypes';

export const LedgerApiContract: ApiContract = {
  domain: 'Ledger',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/ledger',
  allowedJurisdictions: ['JOINT_OPERATIONS'],
  allowedPayloadTypes: ['ledger_hashes', 'netting_reconciliation_status', 'aggregate_kpis'],
  forbiddenPayloadTypes: ['raw_revenue', 'raw_customs_records', 'raw_identity_records', 'raw_workforce_records', 'raw_intelligence_records', 'raw_security_records', 'raw_biometric_data', 'raw_personal_data'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'joint_netting_controller'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: true,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Ledger internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] }
  ]
};
