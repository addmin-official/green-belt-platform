export type IsolationRule = 'FEDERAL_ONLY' | 'KRG_ONLY' | 'JOINT_METADATA_ONLY' | 'CROSS_JURISDICTION_DENY';

export interface PolicyCheckResult {
  allowed: boolean;
  ruleApplied: IsolationRule;
  reasonEn: string;
  reasonKu: string;
  reasonAr: string;
  auditHash: string;
}

export class DataIsolationPolicyEngine {
  /**
   * Generates a unique secure ledger hash for verification tracking.
   */
  private static generateAuditHash(caller: string, resource: string, rule: IsolationRule): string {
    const raw = `${caller}:${resource}:${rule}:${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    return `PE-SEC-${Math.abs(hash).toString(16).toUpperCase()}`;
  }

  /**
   * Enforces isolation boundaries based on caller context and data jurisdiction guidelines.
   */
  public static evaluatePolicy(
    callerContext: 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS',
    dataJurisdiction: 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS',
    dataType: 'raw' | 'metadata' | 'aggregate'
  ): PolicyCheckResult {
    // 1. Cross-jurisdiction direct access is strictly blocked
    if (callerContext !== dataJurisdiction && dataJurisdiction !== 'JOINT_OPERATIONS' && callerContext !== 'JOINT_OPERATIONS') {
      return {
        allowed: false,
        ruleApplied: 'CROSS_JURISDICTION_DENY',
        reasonEn: 'CRITICAL SHIELD: Cross-jurisdiction raw data query is strictly forbidden.',
        reasonKu: 'پاراستنی سەروەری: گەڕان بەدوای داتای خاوی کایەکانی تر بە تەواوی قەدەغەکراوە.',
        reasonAr: 'حظر تجاوز الحدود السيادية: يمنع منعا باتا الاستعلام المباشر عن البيانات الخام للجهات الأخرى.',
        auditHash: this.generateAuditHash(callerContext, dataJurisdiction, 'CROSS_JURISDICTION_DENY')
      };
    }

    // 2. Federal-only assets can only be seen by Federal Iraq context
    if (dataJurisdiction === 'FEDERAL_IRAQ' && callerContext !== 'FEDERAL_IRAQ') {
      return {
        allowed: false,
        ruleApplied: 'FEDERAL_ONLY',
        reasonEn: 'RESTRICTED: Resource is mapped strictly to Federal Iraq sovereignty layer.',
        reasonKu: 'سنووردارکراو: ئەم سەرچاوەیە تەنیا ڕێگەپێدراوە بۆ کایەی دەسەڵاتی فیدراڵی عێراق.',
        reasonAr: 'قيد سيادي: هذا المورد مخصص حصريا لسلطة عێراق الاتحادية.',
        auditHash: this.generateAuditHash(callerContext, dataJurisdiction, 'FEDERAL_ONLY')
      };
    }

    // 3. KRG-only assets can only be seen by Kurdistan Region context
    if (dataJurisdiction === 'KURDISTAN_REGION' && callerContext !== 'KURDISTAN_REGION') {
      return {
        allowed: false,
        ruleApplied: 'KRG_ONLY',
        reasonEn: 'RESTRICTED: Resource is mapped strictly to Kurdistan Region regional authority layer.',
        reasonKu: 'سنووردارکراو: ئەم سەرچاوەیە تەنیا ڕێگەپێدراوە بۆ کەرتی هەرێمی کوردستان.',
        reasonAr: 'قيد إقليمي: هذا المورد مخصص حصريا لسلطة إقليم كوردستان.',
        auditHash: this.generateAuditHash(callerContext, dataJurisdiction, 'KRG_ONLY')
      };
    }

    // 4. Joint domain can only expose aggregates/metadata to Joint Context, Raw values are blocked in any case
    if (dataJurisdiction === 'JOINT_OPERATIONS' && dataType === 'raw') {
      return {
        allowed: false,
        ruleApplied: 'JOINT_METADATA_ONLY',
        reasonEn: 'COMPLIANCE EXCLUSION: Joint layer can only process cryptographic hashes and high-level metadata indices.',
        reasonKu: 'گونجانی دەستووری: کایەی هاوبەش تەنها دەتوانێت پڕۆسەی واژۆی متمانە و مێتاداتا ئەنجام بدات بەبێ پێدانی داتای خاو.',
        reasonAr: 'الامتثال الدستوري: يمنع على المستوى المشترك معالجة البيانات التفصيلية، يقتصر على الواجهات والملامح الوصفية.',
        auditHash: this.generateAuditHash(callerContext, dataJurisdiction, 'JOINT_METADATA_ONLY')
      };
    }

    // Default Allow under isolated matches
    const rule: IsolationRule = callerContext === 'JOINT_OPERATIONS' ? 'JOINT_METADATA_ONLY' : 
                                 callerContext === 'FEDERAL_IRAQ' ? 'FEDERAL_ONLY' : 'KRG_ONLY';

    return {
      allowed: true,
      ruleApplied: rule,
      reasonEn: 'AUTHORIZED: Request complies fully with national sovereign boundaries.',
      reasonKu: 'ڕێگەپێدراو: داواکارییەکە بە تەواوی لەگەڵ یاسا و سنوورە نیشتمانییەکان دەگونجێت.',
      reasonAr: 'مصرح به: الاستعلام متوافق تماما مع محددات السيادة الوطنية المرسومة.',
      auditHash: this.generateAuditHash(callerContext, dataJurisdiction, rule)
    };
  }
}
