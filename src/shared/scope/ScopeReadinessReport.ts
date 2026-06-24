import { ProjectScopeRegistry } from './ProjectScopeRegistry';

/**
 * @file ScopeReadinessReport.ts
 * @description State reporting agency declaring that the border scope is locked, pruning has been mapped, and real data providers are required.
 */

export interface ScopeReadinessSummary {
  status: 'CONDITIONALLY_READY';
  readinessDecision: 'CONDITIONALLY_READY — BORDER SCOPE LOCKED, PRUNING PLAN READY, PROVIDERS REQUIRED';
  scopeLocked: boolean;
  pruningPlanReady: boolean;
  providerState: 'NOT_CONFIGURED';
  realBorderProviderConnected: boolean;
  totalRegisteredScopeItems: number;
  archiveCandidatesCount: number;
  outOfScopeItemsCount: number;
  timestamp: string;
  statement: string;
}

export class ScopeReadinessReport {
  public static generateReport(): ScopeReadinessSummary {
    const all = ProjectScopeRegistry.getAllRegistered();
    const archiveList = all.filter(s => s.category === 'ARCHIVE_CANDIDATE');
    const outOfScopeList = all.filter(s => s.category === 'OUT_OF_SCOPE');

    return {
      status: 'CONDITIONALLY_READY',
      readinessDecision: 'CONDITIONALLY_READY — BORDER SCOPE LOCKED, PRUNING PLAN READY, PROVIDERS REQUIRED',
      scopeLocked: true,
      pruningPlanReady: true,
      providerState: 'NOT_CONFIGURED',
      realBorderProviderConnected: false,
      totalRegisteredScopeItems: all.length,
      archiveCandidatesCount: archiveList.length,
      outOfScopeItemsCount: outOfScopeList.length,
      timestamp: new Date().toISOString(),
      statement: 'باری تەندروستی گشتی سیستمەکە جێگیرە لە چوارچێوەی بەستنی سنوورەکان و دەروازە گومرگییەکان. ڕێڕەوی ڕوونکردنەوەی فەرمی گواستراوەتە کایەی کورتەی پاراستنی مێتاداتا'
    };
  }
}
