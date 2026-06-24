import { ApiContract } from './ApiContractTypes';

export const RevenueApiContract: ApiContract = {
  domain: 'Revenue',
  baseEndpointPlaceholder: 'https://api.gateway.gov.iq/v1/revenue',
  allowedJurisdictions: ['FEDERAL_IRAQ', 'KURDISTAN_REGION'],
  allowedPayloadTypes: ['tax_collections', 'revenue_leakage_reports', 'reconciliation_hashes'],
  forbiddenPayloadTypes: ['raw_military_spending', 'raw_citizen_biometrics'],
  authRequirement: {
    type: 'MTLS',
    roleRequired: 'revenue_auditor'
  },
  auditRequired: true,
  healthCheckRoute: '/health',
  readinessRoute: '/readiness',
  metadataOnlyRuleIfJoint: false,
  routes: [
    { path: '/health', method: 'GET', description: 'Standard health check endpoint', expectedResponseKeys: ['status', 'online'] },
    { path: '/readiness', method: 'GET', description: 'Deep readiness verification', expectedResponseKeys: ['ready', 'dependencies'] },
    { path: '/metadata', method: 'GET', description: 'Sovereign provider metadata exchange', expectedResponseKeys: ['jurisdiction', 'domain', 'version'] },
    { path: '/audit-events', method: 'GET', description: 'Revenue internal audit events logs', expectedResponseKeys: ['events'] },
    { path: '/sync-status', method: 'GET', description: 'Sync status check', expectedResponseKeys: ['synced', 'lastSyncTime'] },
    { path: '/revenue/ledger', method: 'GET', description: 'Access revenue records ledger', expectedResponseKeys: ['ledger'] },
    { path: '/revenue/collections', method: 'GET', description: 'Access collection summaries', expectedResponseKeys: ['collections'] },
    { path: '/revenue/leakage', method: 'GET', description: 'Assess leakages and anomalies', expectedResponseKeys: ['anomalies'] },
    { path: '/revenue/reconciliation', method: 'GET', description: 'Secure revenue cross-matching statistics', expectedResponseKeys: ['reconciliationResult'] }
  ]
};
