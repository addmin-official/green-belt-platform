import { ApiContract } from './ApiContractTypes';

export const WorkforceApiContract: ApiContract = {
  domain: 'Workforce',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/workforce',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['roster_meta', 'shift_schedules', 'certifications_status'],
  forbiddenPayloadTypes: ['raw_intelligence_briefs', 'undercover_agent_details'],
  authRequirement: {
    type: 'JWT',
    roleRequired: 'workforce_scheduler'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Workforce internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/workforce/roster', method: 'GET', description: 'Query workforce roster', expectedResponseKeys: ['roster'] },
    { path: '/workforce/shifts', method: 'GET', description: 'Query shifts schedules', expectedResponseKeys: ['shifts'] },
    { path: '/workforce/assignments', method: 'GET', description: 'Query deployment assignments', expectedResponseKeys: ['assignments'] },
    { path: '/workforce/certifications', method: 'GET', description: 'Verify certification updates', expectedResponseKeys: ['certifications'] }
  ]
};
