import { ApiContract } from './ApiContractTypes';

export const WorkflowApiContract: ApiContract = {
  domain: 'Workflow',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/workflow',
  allowedJurisdictions: ['JOINT_OPERATIONS'],
  allowedPayloadTypes: ['workflow_step_status', 'reconciliation_hashes', 'sign_off_hashes'],
  forbiddenPayloadTypes: ['raw_revenue', 'raw_customs_records', 'raw_identity_records', 'raw_workforce_records', 'raw_intelligence_records', 'raw_security_records', 'raw_biometric_data', 'raw_personal_data'],
  authRequirement: {
    type: 'JWT',
    roleRequired: 'joint_workflow_manager'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: true,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Workflow internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] }
  ]
};
