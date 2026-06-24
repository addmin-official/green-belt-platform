import { TreatyRegistry } from './TreatyRegistry';
import { ExecutiveDecisionEngine } from './ExecutiveDecisionEngine';
import { WorkflowFederationEngine } from './WorkflowFederationEngine';
import { CabinetRegistry } from './CabinetRegistry';

export interface FederationHealthMetrics {
  activeTreatiesCount: number;
  unificationScore: number;
  federationScore: number;
  riskIndex: number;
  syncRatioPercent: number;
  cooperationMetrics: {
    customsSuccess: number;
    identityMatches: number;
    securityIncidentsMitigated: number;
  };
  recommendedActions: { id: string; en: string; ar: string; ku: string }[];
}

export class FederationOperationsEngine {
  
  public static getFederationHealth(): FederationHealthMetrics {
    const treaties = TreatyRegistry.getTreaties();
    const activeTreaties = treaties.filter(t => t.status === 'ACTIVE' || t.status === 'RATIFIED');
    const decisions = ExecutiveDecisionEngine.getDecisions();
    const workflows = WorkflowFederationEngine.getWorkflows();

    const signedDecisions = decisions.filter(d => d.status === 'SIGNED' || d.status === 'ENFORCED').length;
    const totalDecisions = decisions.length || 1;
    const decisionSyncRatio = Math.round((signedDecisions / totalDecisions) * 100);

    const activeWorkflowCompletion = workflows.filter(w => w.status === 'COMPLETED').length;
    const totalWorkflows = workflows.length || 1;
    const workflowSuccessRate = Math.round((activeWorkflowCompletion / totalWorkflows) * 100);

    // Dynamic calculations
    const syncRatioPercent = Math.round((decisionSyncRatio + workflowSuccessRate) / 2);
    
    // Unification calculation based on active treaties and compliance ratios
    const totalComplianceSum = treaties.reduce((acc, t) => acc + t.complianceRatio, 0);
    const averageCompliance = treaties.length ? Math.round(totalComplianceSum / treaties.length) : 0;
    
    const unificationScore = Math.round((activeTreaties.length / (treaties.length || 1)) * 40 + averageCompliance * 0.6);
    const federationScore = Math.min(100, Math.round(syncRatioPercent * 0.5 + averageCompliance * 0.5));
    
    // Risk score lowers with more active, compliant treaties
    const riskIndex = Math.max(5, 100 - unificationScore);

    // Recommended Actions
    const recommendedActions: { id: string; en: string; ar: string; ku: string }[] = [];

    if (treaties.some(t => t.status === 'NEGOTIATION')) {
      recommendedActions.push({
        id: 'REC-01',
        en: 'Expedite negotiations for active Border & Security Joint-defense compact treaties.',
        ar: 'تسريع مفاوضات المعاهدات الأمنية المشتركة لحماية الحدود.',
        ku: 'خێراکردنی گفتوگۆکانی پەیماننامەی هاوبەشی ئەمنی بۆ فەرماندەیی هاوبەشی سنوورەکان.'
      });
    }

    if (syncRatioPercent < 80) {
      recommendedActions.push({
        id: 'REC-02',
        en: 'Authorize pending ministerial and cabinet signature queues to unblock transit lines.',
        ar: 'تخويل سلسلة التوقيعات الوزارية المعلقة لتسهيل ممرات التزانزيت.',
        ku: 'ڕاسپاردنی زووی واژۆکردنی بڕیارە جێماوەکان بۆ کەمکردنەوەی جیاوازی باجی گومرگی.'
      });
    }

    if (riskIndex > 20) {
      recommendedActions.push({
        id: 'REC-03',
        en: 'Audit regional invest tax bypass rules before compliance indicators deteriorate.',
        ar: 'تدقيق قواعد الإعفاء الضريبي الإقليمي لتجنب زيادة معدلات الخطر.',
        ku: 'پشکنینی دووبارە بۆ مۆڵەتەکانی بەخشینی باج لە هەرێم بە هۆکاری کەمبوونەوەی گونجانی گومرگی.'
      });
    }

    return {
      activeTreatiesCount: activeTreaties.length,
      unificationScore,
      federationScore,
      riskIndex,
      syncRatioPercent,
      cooperationMetrics: {
        customsSuccess: 94,
        identityMatches: 820,
        securityIncidentsMitigated: 14
      },
      recommendedActions
    };
  }
}
export default FederationOperationsEngine;
