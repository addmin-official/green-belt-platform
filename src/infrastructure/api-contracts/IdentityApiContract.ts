import { ApiContract } from './ApiContractTypes';

export const IdentityApiContract: ApiContract = {
  domain: 'Identity',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/identity',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['identity_hashes', 'verification_results', 'credential_status'],
  forbiddenPayloadTypes: ['unencrypted_biometrics', 'raw_security_intercepts'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'identity_registrar'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Identity internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/identity/records', method: 'GET', description: 'Query record state', expectedResponseKeys: ['records'] },
    { path: '/identity/verification', method: 'GET', description: 'Verify national identity keys', expectedResponseKeys: ['verificationResult'] },
    { path: '/identity/credentials', method: 'GET', description: 'Verify cryptographic credentials', expectedResponseKeys: ['credentials'] },
    { path: '/identity/lifecycle', method: 'GET', description: 'Lifecycle status updates', expectedResponseKeys: ['lifecycleLogs'] }
  ]
};
