import { ApiContract } from './ApiContractTypes';

export const IntelligenceApiContract: ApiContract = {
  domain: 'Intelligence',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/intelligence',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['anomalous_alerts', 'threat_signals', 'watchlist_hashes'],
  forbiddenPayloadTypes: ['raw_confidential_informant_identities', 'active_military_operation_coordinates'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'security_analyst'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Intelligence internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/intelligence/threats', method: 'GET', description: 'National threat signals logging', expectedResponseKeys: ['threats'] },
    { path: '/intelligence/alerts', method: 'GET', description: 'Urgent intrusion or incident alerts', expectedResponseKeys: ['alerts'] },
    { path: '/intelligence/watchlists', method: 'GET', description: 'Cross-border watchlist status hashes', expectedResponseKeys: ['watchlistHashes'] },
    { path: '/intelligence/fusion', method: 'GET', description: 'Multi-agency security intelligence synthesis', expectedResponseKeys: ['fusionResults'] }
  ]
};
