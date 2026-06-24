import { BorderRevenuePolicy } from './BorderSettlementTypes';

/**
 * @file BorderRevenuePolicyRegistry.ts
 * @description Registry for Federal-KRG border revenue sharing policies based on constitutional agreements.
 */

export class BorderRevenuePolicyRegistry {
  private static policies: BorderRevenuePolicy[] = [
    {
      policyId: 'KRG_TO_FEDERAL_BORDER_REVENUE_50_PERCENT',
      name: 'پشکی ٥٠٪ی داهاتی دەروازە سنوورییەکان و گومرگەکانی هەرێم بۆ حکومەتی فیدراڵ',
      borderGateId: 'ALL_KRG_GATES',
      borderGateName: 'گشت دەروازە گومرگی و سنوورییەکانی هەرێمی کوردستان',
      sourceJurisdiction: 'KURDISTAN_REGION',
      recipientJurisdiction: 'FEDERAL_IRAQ',
      revenueScope: 'AGREEMENT_DEFINED_BORDER_REVENUE', // Fits border scope
      settlementPercentage: 50.0,
      legalBasisId: 'IRAQ_BUDGET_2023_ART_21_2_AND_FIN_MGMT_2019_ART_29',
      legalReferenceLabel: 'یاسای بودجەی گشتی فیدراڵی ژمارە ١٣ی ساڵی ٢٠٢٣ ماددەی ٢١(دووەم) و یاسای بەڕێوەبردنی دارایی فیدراڵی ژمارە ٦ی ساڵی ٢٠١٩ ماددەی ٢٩',
      effectiveDate: '2023-06-12',
      expiryDate: '2026-12-31',
      providerRequired: true,
      auditRequired: true,
      approvalStatus: 'LEGAL_BASIS_REQUIRED', // status: LEGAL_BASIS_REQUIRED
      disputeStatus: 'NONE'
    },
    {
      policyId: 'FEDERAL_TO_KRG_BORDER_TRANSIT_EQUALIZATION_15_PERCENT',
      name: 'هاوسەنگکردنی داهاتی ترانزێتی نێودەوڵەتی بە ڕێژەی ١٥٪',
      borderGateId: 'IBRAHIM_KHALIL',
      borderGateName: 'مەرزی نێودەوڵەتی ئیبراهیم خەلیل',
      sourceJurisdiction: 'KURDISTAN_REGION',
      recipientJurisdiction: 'FEDERAL_IRAQ',
      revenueScope: 'TRANSIT_FEES',
      settlementPercentage: 15.0,
      legalBasisId: 'CONSTITUTION_ART_114_SHARED_COMPETENCE',
      legalReferenceLabel: 'ماددەی ١١٤ی دەستووری عێراق - ئیدارەدانی گومرگ وەک دەسەڵاتێکی هاوبەش',
      effectiveDate: '2025-01-01',
      expiryDate: '2027-12-31',
      providerRequired: true,
      auditRequired: true,
      approvalStatus: 'DRAFT',
      disputeStatus: 'NONE'
    }
  ];

  /**
   * Get all registered border revenue policies.
   */
  public static getAllPolicies(): BorderRevenuePolicy[] {
    return [...this.policies];
  }

  /**
   * Safe retrieval of policy by ID.
   */
  public static getPolicyById(policyId: string): BorderRevenuePolicy | undefined {
    return this.policies.find(p => p.policyId === policyId);
  }

  /**
   * Update or add policy dynamically with strict validation.
   */
  public static registerPolicy(policy: BorderRevenuePolicy): void {
    // Prevent out-of-scope policies from crawling in
    const isOutOfScope = !['BORDER_CROSSING_FEES', 'CUSTOMS_DUTIES', 'TRANSIT_FEES', 'TRADE_CLEARANCE_FEES', 'BORDER_SERVICE_FEES', 'AGREEMENT_DEFINED_BORDER_REVENUE'].includes(policy.revenueScope);
    if (isOutOfScope) {
      throw new Error('سیستمەکە تەنیا ڕێگە بە زیادکردنی سیاسەتەکانی سەر بە دەروازە سنوورییەکان و گومرگ دەدات.');
    }

    const index = this.policies.findIndex(p => p.policyId === policy.policyId);
    if (index !== -1) {
      this.policies[index] = policy;
    } else {
      this.policies.push(policy);
    }
  }
}
