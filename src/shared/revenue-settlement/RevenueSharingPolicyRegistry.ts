import { FiscalSettlementPolicy } from './FiscalSettlementTypes';

/**
 * @file RevenueSharingPolicyRegistry.ts
 * @description تۆماری فەرمی سیاسەتەکانی دابەشکردنی داهات و گواستنەوەی دارایی لە نێوان هەرێم و بەغداد.
 * تێبینین: ڕێژەی ٥٠٪ تەنها وەک نموونەیەکی سیاسەتی ڕێککەوتنگۆڕاو نیشان دراوە و جێگیر نەکراوە.
 */

export class RevenueSharingPolicyRegistry {
  private static policies: FiscalSettlementPolicy[] = [
    {
      policyId: 'KRG_TO_FEDERAL_REFERENCE_SHARE_50_PERCENT',
      name: 'ڕادەستکردنی ٥٠٪ی داهاتی ناوخۆیی هەرێمی کوردستان بە حکومەتی فیدراڵ',
      jurisdictionSource: 'KURDISTAN_REGION',
      jurisdictionRecipient: 'FEDERAL_IRAQ',
      calculationBasis: 'NON_OIL_REVENUE',
      settlementPercentage: 50.0,
      deductionRules: [
        'کەمکردنەوەی خەرجییە سیادییەکان',
        'کەمکردنەوەی تێچووی کۆکردنەوەی ناوخۆیی'
      ],
      reviewBasis: 'ڕێککەوتنی بودجەی هاوبەش',
      effectiveDate: '2026-01-01',
      expiryDate: '2026-12-31',
      approvalStatus: 'AGREEMENT_DEPENDENT', // status: AGREEMENT_DEPENDENT
      legalReferencePlaceholder: 'یاسای بودجەی عێراق - ماددەی چوارەم',
      providerRequired: true, // providerRequired: true
      legalReferenceRequired: true // legalReferenceRequired: true
    },
    {
      policyId: 'FEDERAL_KRG_CUSTOMS_EQUALIZATION_60_40',
      name: 'هاوتاکردنی داهاتی گومرگە سنوورییەکان بە ڕێژەی ٦٠ - ٤٠',
      jurisdictionSource: 'FEDERAL_IRAQ',
      jurisdictionRecipient: 'KURDISTAN_REGION',
      calculationBasis: 'CUSTOMS_REVENUE',
      settlementPercentage: 40.0,
      deductionRules: ['کەمکردنەوەی ڕسوماتی دەروازە یەکگرتووەکان'],
      reviewBasis: 'کۆنووسی لیژنەی دارایی هاوبەش',
      effectiveDate: '2026-03-01',
      expiryDate: '2027-03-01',
      approvalStatus: 'DRAFT',
      legalReferencePlaceholder: 'بڕیاری سەرۆکایەتی ئەنجومەنی وەزیران ژمارە ٣٢',
      providerRequired: true,
      legalReferenceRequired: true
    }
  ];

  /**
   * وەرگرتنی هەموو سیاسەتە تۆمارکراوەکان.
   */
  public static getAllPolicies(): FiscalSettlementPolicy[] {
    return [...this.policies];
  }

  /**
   * گەڕان بەپێی ناسنامەی سیاسەت.
   */
  public static getPolicyById(policyId: string): FiscalSettlementPolicy | undefined {
    return this.policies.find(p => p.policyId === policyId);
  }

  /**
   * زیادکردن یان نوێکردنەوەی سیاسەتی نوێ.
   */
  public static registerPolicy(policy: FiscalSettlementPolicy): void {
    const index = this.policies.findIndex(p => p.policyId === policy.policyId);
    if (index !== -1) {
      this.policies[index] = policy;
    } else {
      this.policies.push(policy);
    }
  }
}
