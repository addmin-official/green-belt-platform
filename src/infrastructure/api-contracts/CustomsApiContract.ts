import { ApiContract } from './ApiContractTypes';

export const CustomsApiContract: ApiContract = {
  domain: 'Customs',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/customs',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['customs_declarations', 'tariff_schedules', 'cargo_manifests'],
  forbiddenPayloadTypes: ['intelligence_briefs', 'raw_citizen_identity'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'customs_officer'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Customs internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/customs/declarations', method: 'GET', description: 'Retrieve declarations within bounds', expectedResponseKeys: ['declarations'] },
    { path: '/customs/tariffs', method: 'GET', description: 'Get active tariff configurations', expectedResponseKeys: ['tariffs'] },
    { path: '/customs/audit', method: 'GET', description: 'Secure audit extraction log', expectedResponseKeys: ['auditLogs'] },
    { path: '/customs/reconciliation', method: 'GET', description: 'Cross-border customs reconciliation details', expectedResponseKeys: ['reconciliationResult'] }
  ]
};
