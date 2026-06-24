import { ApiContract } from './ApiContractTypes';

export const SecurityApiContract: ApiContract = {
  domain: 'Security',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/security',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['secure_session_tokens', 'mfa_verifications', 'audit_hashes'],
  forbiddenPayloadTypes: ['raw_decryption_keys', 'unobscured_plain_passwords'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'security_administrator'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Security internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/security/sessions', method: 'GET', description: 'Evaluate active operational sessions', expectedResponseKeys: ['sessions'] },
    { path: '/security/devices', method: 'GET', description: 'Evaluate registered hardware gateways', expectedResponseKeys: ['devices'] },
    { path: '/security/mfa', method: 'GET', description: 'Verify Multi-Factor authentications status', expectedResponseKeys: ['mfaStatus'] },
    { path: '/security/audit', method: 'GET', description: 'Security hardening audits logs', expectedResponseKeys: ['hardeningLogs'] }
  ]
};
