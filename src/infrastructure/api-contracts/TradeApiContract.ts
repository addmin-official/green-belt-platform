import { ApiContract } from './ApiContractTypes';

export const TradeApiContract: ApiContract = {
  domain: 'Trade',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/trade',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['trade_licenses', 'import_schedules', 'export_manifests', 'corridor_metrics'],
  forbiddenPayloadTypes: ['raw_military_supply_lists', 'confidential_workforce_salaries'],
  authRequirement: {
    type: 'JWT',
    roleRequired: 'trade_validator'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Trade internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/trade/licenses', method: 'GET', description: 'Trade license registry lookup', expectedResponseKeys: ['licenses'] },
    { path: '/trade/imports', method: 'GET', description: 'Import schedules lookup', expectedResponseKeys: ['imports'] },
    { path: '/trade/exports', method: 'GET', description: 'Export manifest registry lookup', expectedResponseKeys: ['exports'] },
    { path: '/trade/corridors', method: 'GET', description: 'Corridor transit volume metrics', expectedResponseKeys: ['corridors'] }
  ]
};
