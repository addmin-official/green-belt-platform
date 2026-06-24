import { ProjectScopeRegistry, ScopeCategory, ScopeDefinition } from './ProjectScopeRegistry';

/**
 * @file ModuleScopeClassifier.ts
 * @description پۆلێنکەر بۆ پشکنین و حوکمکردنی فەلای سەر بە دۆسیە جیاوازەکان بەپێی کایەی مۆڵەتپێدراوی دەروازە سنوورییەکان.
 */

export class ModuleScopeClassifier {
  /**
   * Determine the scope category for a file path.
   */
  public static classifyPath(filePath: string): ScopeCategory {
    const reg = ProjectScopeRegistry.getByPath(filePath);
    if (reg) {
      return reg.category;
    }

    // Heuristics based on name segments safely protecting the boundaries
    const lowercasePath = filePath.toLowerCase();

    // Check for explicit off-scope keywords
    if (lowercasePath.includes('oil') || lowercasePath.includes('energy') || lowercasePath.includes('petroleum')) {
      return 'OUT_OF_SCOPE';
    }
    if (lowercasePath.includes('payroll') || lowercasePath.includes('salary') || lowercasePath.includes('workforce') || lowercasePath.includes('roster')) {
      return 'OUT_OF_SCOPE';
    }
    if (lowercasePath.includes('procurement') || lowercasePath.includes('state-assets')) {
      return 'OUT_OF_SCOPE';
    }
    if (lowercasePath.includes('super-app') || lowercasePath.includes('superapp')) {
      return 'OUT_OF_SCOPE';
    }
    if (lowercasePath.includes('identity/records') || lowercasePath.includes('ai-brain')) {
      return 'OUT_OF_SCOPE';
    }

    // Core scopes
    if (lowercasePath.includes('border-settlement')) {
      return 'CORE_BORDER_SETTLEMENT';
    }
    if (lowercasePath.includes('revenue-settlement') || lowercasePath.includes('settlementroutes')) {
      return 'ARCHIVE_CANDIDATE';
    }
    if (lowercasePath.includes('customs')) {
      return 'CORE_CUSTOMS';
    }
    if (lowercasePath.includes('border')) {
      return 'CORE_BORDER';
    }
    if (lowercasePath.includes('trade') || lowercasePath.includes('clearance')) {
      return 'CORE_TRADE_CLEARANCE';
    }
    if (lowercasePath.includes('transit')) {
      return 'CORE_TRANSIT';
    }
    if (lowercasePath.includes('revenue')) {
      return 'CORE_BORDER_REVENUE';
    }
    if (lowercasePath.includes('transparency') || lowercasePath.includes('joint') || lowercasePath.includes('reconciliation')) {
      return 'CORE_JOINT_RECONCILIATION';
    }
    if (lowercasePath.includes('krg-digital') || lowercasePath.includes('krdpass')) {
      return 'CORE_KRG_COMPATIBILITY';
    }
    if (lowercasePath.includes('training') || lowercasePath.includes('manual')) {
      return 'CORE_TRAINING';
    }
    if (lowercasePath.includes('outreach') || lowercasePath.includes('meeting')) {
      return 'CORE_OUTREACH';
    }
    if (lowercasePath.includes('qa') || lowercasePath.includes('test') || lowercasePath.includes('smoke')) {
      return 'SUPPORTING_QA';
    }
    if (lowercasePath.includes('ui') || lowercasePath.includes('component') || lowercasePath.includes('view') || lowercasePath.includes('page')) {
      return 'SUPPORTING_UI';
    }

    // Default to supportive infrastructure if not clearly identified
    return 'SUPPORTING_INFRASTRUCTURE';
  }

  /**
   * Determine if a filepath is strictly out of border scope.
   */
  public static isOutOfScope(filePath: string): boolean {
    const category = this.classifyPath(filePath);
    return category === 'OUT_OF_SCOPE' || category === 'ARCHIVE_CANDIDATE';
  }

  /**
   * Audit list of filepaths to identify those that must be hidden or pruned.
   */
  public static auditFiles(filePaths: string[]): {
    active: string[];
    outOfScope: string[];
    archiveCandidates: string[];
  } {
    const active: string[] = [];
    const outOfScope: string[] = [];
    const archiveCandidates: string[] = [];

    for (const pathStr of filePaths) {
      const cat = this.classifyPath(pathStr);
      if (cat === 'OUT_OF_SCOPE') {
        outOfScope.push(pathStr);
      } else if (cat === 'ARCHIVE_CANDIDATE') {
        archiveCandidates.push(pathStr);
      } else {
        active.push(pathStr);
      }
    }

    return { active, outOfScope, archiveCandidates };
  }
}
