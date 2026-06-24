import { ApiContract } from './ApiContractTypes';

export const BorderApiContract: ApiContract = {
  domain: 'Border',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/border',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['border_gate_logs', 'vehicle_manifests', 'biometric_pings'],
  forbiddenPayloadTypes: ['unauthenticated_credentials', 'raw_intelligence_sources'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'border_controller'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Gateway internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status for high availability database checks', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/border/gates', method: 'GET', description: 'Registered border gates list', expectedResponseKeys: ['gates'] },
    { path: '/border/events', method: 'GET', description: 'Border gate crossing events', expectedResponseKeys: ['events'] },
    { path: '/border/traffic', method: 'GET', description: 'Border crossing transit traffic flow statistics', expectedResponseKeys: ['traffic'] },
    { path: '/border/risk', method: 'GET', description: 'Cross-border risk signals and indicators', expectedResponseKeys: ['riskLogs'] }
  ]
};
