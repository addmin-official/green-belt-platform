import { AcceptanceChecklistEngine } from './AcceptanceChecklistEngine';

export interface AcceptanceReadiness {
  ready: boolean;
  blocked: boolean;
  warnings: string[];
  criticalIssues: string[];
}

export class AcceptanceReadinessSummary {
  public static getSummary(): AcceptanceReadiness {
    const checklist = AcceptanceChecklistEngine.getChecklist();
    const failedItems = checklist.filter(item => !item.passed);

    const criticalIssues: string[] = [];
    const warnings: string[] = [];

    failedItems.forEach(item => {
      if (item.category === 'SECURITY' || item.category === 'GOVERNANCE') {
        criticalIssues.push(`CRITICAL: Failed ${item.titleEn} - ${item.notes}`);
      } else {
        warnings.push(`Warning: ${item.titleEn} - ${item.notes}`);
      }
    });

    const ready = criticalIssues.length === 0;
    const blocked = !ready;

    return {
      ready,
      blocked,
      warnings,
      criticalIssues
    };
  }
}
