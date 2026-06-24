/**
 * @file ProjectScopeRegistry.ts
 * @description تۆماری فەرمی پێناسەکردنی کایەکانی دەسەڵات و مۆدیۆلە مۆڵەتپێدراو یان دەرەوەی کارەکانی سیستەمی دەروازە سنوورییەکان.
 */

export type ScopeCategory =
  | 'CORE_BORDER'
  | 'CORE_CUSTOMS'
  | 'CORE_TRADE_CLEARANCE'
  | 'CORE_TRANSIT'
  | 'CORE_BORDER_REVENUE'
  | 'CORE_BORDER_SETTLEMENT'
  | 'CORE_JOINT_RECONCILIATION'
  | 'CORE_KRG_COMPATIBILITY'
  | 'CORE_PROVIDER_READINESS'
  | 'CORE_TRAINING'
  | 'CORE_OUTREACH'
  | 'SUPPORTING_QA'
  | 'SUPPORTING_UI'
  | 'SUPPORTING_INFRASTRUCTURE'
  | 'DEMO_ONLY'
  | 'ARCHIVE_CANDIDATE'
  | 'OUT_OF_SCOPE';

export interface ScopeDefinition {
  itemPath: string;
  category: ScopeCategory;
  description: string;
  riskAssessment: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  actionPlan: 'KEEP_UNTOUCHED' | 'MONITOR' | 'SOFT_HIDE_UI_ONLY' | 'PREPARE_FOR_PRUNING' | 'SAFE_REMOVE';
}

export class ProjectScopeRegistry {
  private static registeredScopes: ScopeDefinition[] = [
    // Core Border Operating System Scope
    {
      itemPath: 'src/shared/border-settlement',
      category: 'CORE_BORDER_SETTLEMENT',
      description: 'بزوێنەری یەکگرتنەوەی داهاتی دەروازە سنوورییەکان بە هەژماری ڕێژەی ٥٠٪ی تایبەت بە سنوور.',
      riskAssessment: 'LOW',
      actionPlan: 'KEEP_UNTOUCHED'
    },
    {
      itemPath: 'src/shared/border',
      category: 'CORE_BORDER',
      description: 'لۆجیکی چاودێری جووڵەی کاڵاکان و بنکەکانی دەروازە.',
      riskAssessment: 'LOW',
      actionPlan: 'KEEP_UNTOUCHED'
    },
    {
      itemPath: 'src/shared/customs',
      category: 'CORE_CUSTOMS',
      description: 'هەڵسەنگاندن و پشکنینی گومرگی بە تەندروستی بازرگانی.',
      riskAssessment: 'LOW',
      actionPlan: 'KEEP_UNTOUCHED'
    },
    {
      itemPath: 'src/shared/trade',
      category: 'CORE_TRADE_CLEARANCE',
      description: 'مۆڵەت و پاکتاوبوونی گومرگی بارەکان لە سەر دەروازەکان.',
      riskAssessment: 'LOW',
      actionPlan: 'KEEP_UNTOUCHED'
    },
    {
      itemPath: 'src/shared/revenue',
      category: 'CORE_BORDER_REVENUE',
      description: 'زانیاری داهاتە گومرگییە نیشتیمانی و ناوخۆییەکانی تایبەت بە بازرگانی سەر سنوور.',
      riskAssessment: 'LOW',
      actionPlan: 'KEEP_UNTOUCHED'
    },
    {
      itemPath: 'src/shared/transparency',
      category: 'CORE_JOINT_RECONCILIATION',
      description: 'وردبینی دۆسییەکان و لیدجەری هاوبەشی بەڵگەکانی تێپەڕین.',
      riskAssessment: 'LOW',
      actionPlan: 'KEEP_UNTOUCHED'
    },
    {
      itemPath: 'src/infrastructure/krg-digital',
      category: 'CORE_KRG_COMPATIBILITY',
      description: 'سیاسەت و نەرمەکاڵای گونجاندنی نیشتمانی بۆ سیستەمی باری ئەلیکترۆنی هەرێم.',
      riskAssessment: 'LOW',
      actionPlan: 'KEEP_UNTOUCHED'
    },

    // General Fiscal Settlement (Archive Candidates due to General/Non-Border Overreach)
    {
      itemPath: 'src/shared/revenue-settlement',
      category: 'ARCHIVE_CANDIDATE',
      description: 'بزوێنەری کۆنی یەکلاییکردنەوەی بودجە و داهاتی گشتی عێراق و هەرێم کە زیاد لە تایبەت بە سنوورە.',
      riskAssessment: 'MEDIUM',
      actionPlan: 'PREPARE_FOR_PRUNING'
    },
    {
      itemPath: 'server/src/zones/federal/settlementRoutes.ts',
      category: 'ARCHIVE_CANDIDATE',
      description: 'ڕێڕەوی کۆنی فیدراڵ بۆ یەکلاییکردنەوەی داهاتە گشتییەکان.',
      riskAssessment: 'MEDIUM',
      actionPlan: 'PREPARE_FOR_PRUNING'
    },
    {
      itemPath: 'server/src/zones/krg/settlementRoutes.ts',
      category: 'ARCHIVE_CANDIDATE',
      description: 'ڕێڕەوی کۆنی کەی جی بۆ یەکلاییکردنەوەی داهاتە گشتییەکان.',
      riskAssessment: 'MEDIUM',
      actionPlan: 'PREPARE_FOR_PRUNING'
    },
    {
      itemPath: 'server/src/zones/joint/settlementRoutes.ts',
      category: 'ARCHIVE_CANDIDATE',
      description: 'ڕێڕەوی کۆنی جۆینت بۆ یەکلاییکردنەوەی داهاتە ناوخۆییە غەیرە سنوورییەکان.',
      riskAssessment: 'MEDIUM',
      actionPlan: 'PREPARE_FOR_PRUNING'
    },

    // UI Scope & Navigation Overreach Classification
    {
      itemPath: 'src/app/components/ssos/SovereignFiscalSystem.tsx',
      category: 'OUT_OF_SCOPE',
      description: 'مۆدیۆلی بەڕێوەبردنی سیستەمی دارایی گشتی و سیادی نیشتمانی دەرەوەی سنوور.',
      riskAssessment: 'HIGH',
      actionPlan: 'SOFT_HIDE_UI_ONLY'
    },
    {
      itemPath: 'src/app/components/ssos/NationalBudgetCommandCenter.tsx',
      category: 'OUT_OF_SCOPE',
      description: 'خاڵی فەرماندەیی بودجەی نیشتمانی عێراق کە پەیوەندی بە دەروازە سنوورییەکانەوە نییە.',
      riskAssessment: 'HIGH',
      actionPlan: 'SOFT_HIDE_UI_ONLY'
    },
    {
      itemPath: 'src/app/components/ssos/NationalEnergyRegistry.tsx',
      category: 'OUT_OF_SCOPE',
      description: 'مۆدیۆلی نەوت و گازی نیشتمانی دەرەوەی دەروازە گومرگییەکان.',
      riskAssessment: 'CRITICAL',
      actionPlan: 'SOFT_HIDE_UI_ONLY'
    },
    {
      itemPath: 'src/app/components/PolicyAdvisorPanel.tsx',
      category: 'OUT_OF_SCOPE',
      description: 'ڕاوێژکاری گشتی سیاسەتەکانی حکومەت کە لایەنی مۆدیۆلی سنووری نییە.',
      riskAssessment: 'MEDIUM',
      actionPlan: 'SOFT_HIDE_UI_ONLY'
    },
    {
      itemPath: 'src/app/components/procurement',
      category: 'OUT_OF_SCOPE',
      description: 'مۆدیۆلە کڕین و بازاڕکارییەکانی گشتی دەرەوەی بواری دەروازە سنوورییەکان.',
      riskAssessment: 'HIGH',
      actionPlan: 'PREPARE_FOR_PRUNING'
    },
    {
      itemPath: 'src/app/components/EconomicCorridorsPanel.tsx',
      category: 'OUT_OF_SCOPE',
      description: 'مۆدیۆلی ڕێڕەوە ئابوورییە گشتییە ئۆرگانیکەکان دەرەوەی دەروازە گومرگییەکان.',
      riskAssessment: 'MEDIUM',
      actionPlan: 'SOFT_HIDE_UI_ONLY'
    }
  ];

  public static getAllRegistered(): ScopeDefinition[] {
    return [...this.registeredScopes];
  }

  public static getByPath(pathStr: string): ScopeDefinition | undefined {
    return this.registeredScopes.find(s => s.itemPath === pathStr || pathStr.startsWith(s.itemPath + '/'));
  }
}
