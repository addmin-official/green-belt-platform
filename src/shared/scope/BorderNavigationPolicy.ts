/**
 * @file BorderNavigationPolicy.ts
 * @description سیاسەتی ڕێگەپێدانی مینیو و شاشەکانی وێب کە تەنها کایەی دەروازە سنوورییەکان کارا دەکات.
 */

export type RuntimeSectionId =
  | 'command-center'
  | 'border-ops'
  | 'customs-coordination'
  | 'trade-clearance'
  | 'transit-monitoring'
  | 'border-revenue-settlement'
  | 'joint-border-reconciliation'
  | 'krg-digital-compatibility'
  | 'provider-readiness'
  | 'readiness-center'
  | 'training-guide'
  | 'demo-walkthrough'
  | 'admin-center'
  | 'blueprints'
  | 'ai-auditor'
  | 'security'; // Border security only

export class BorderNavigationPolicy {
  private static allowedSections: RuntimeSectionId[] = [
    'command-center',
    'border-ops',
    'customs-coordination',
    'trade-clearance',
    'transit-monitoring',
    'border-revenue-settlement',
    'joint-border-reconciliation',
    'krg-digital-compatibility',
    'provider-readiness',
    'readiness-center',
    'training-guide',
    'demo-walkthrough',
    'admin-center',
    'blueprints',
    'ai-auditor',
    'security'
  ];

  private static blockedSections: string[] = [
    'ai-brain',
    'data-fabric',
    'sovereign-trust',
    'state-assets',
    'procurement',
    'sovereign-fiscal', // Unless mapped/renamed to border-revenue-settlement
    'economic-corridors',
    'ecosystem',
    'policy-advisor'
  ];

  /**
   * Check if a section is allowed under the border-only policy.
   */
  public static isSectionAllowed(sectionId: string): boolean {
    if (this.blockedSections.includes(sectionId)) {
      return false;
    }
    return true;
  }

  /**
   * Filter a list of navigation tabs down to only allowed border-scoped items.
   */
  public static filterAllowedTabs<T extends { id: string }>(tabs: T[]): T[] {
    return tabs.filter(tab => this.isSectionAllowed(tab.id));
  }
}
