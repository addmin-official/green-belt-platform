import { FiscalSettlementPolicy, SettlementStatus, SettlementAuditProof, JurisdictionType } from './FiscalSettlementTypes';
import { RevenueSharingPolicyRegistry } from './RevenueSharingPolicyRegistry';

/**
 * @file FederalKRGSettlementPolicy.ts
 * @description بەڕێوەبەرایەتی تایبەتمەندی و کارەکانی پێوەست بە سیاسەتی دارایی نێوان هەرێم و بەغداد.
 * دڵنیایی دەدات کە داتای خاو داهاتەکان بە جیاوازی و پارێزراوی لای لایەنە فەرمییەکان دەمێننەوە.
 */

export class FederalKRGSettlementPolicy {
  private policy: FiscalSettlementPolicy;
  private currentStatus: SettlementStatus;

  constructor(policyId: string = 'KRG_TO_FEDERAL_REFERENCE_SHARE_50_PERCENT') {
    const found = RevenueSharingPolicyRegistry.getPolicyById(policyId);
    if (!found) {
      throw new Error(`سیاسەتی دارایی بە ناسنامەی ${policyId} نەدۆزرایەوە.`);
    }
    this.policy = found;
    this.currentStatus = 'DRAFT';
  }

  public getPolicy(): FiscalSettlementPolicy {
    return this.policy;
  }

  public getStatus(): SettlementStatus {
    return this.currentStatus;
  }

  public updateStatus(status: SettlementStatus): void {
    this.currentStatus = status;
  }

  /**
   * ئەنجامدانی سێتینگەکانی کارپێکردن
   */
  public configurePolicy(percentage: number, reviewBasis: string): void {
    this.policy.settlementPercentage = percentage;
    this.policy.reviewBasis = reviewBasis;
    RevenueSharingPolicyRegistry.registerPolicy(this.policy);
  }

  /**
   * بەدەستهێنانی کورتەیەک بۆ سەلماندنی جێبەجێکردنی سیاسەتەکە بەبێ پیشاندانی داتای خاو
   */
  public generateAuditProof(
    periodId: string,
    grossHash: string,
    deductionHash: string,
    payableHash: string,
    approvalState: SettlementStatus
  ): SettlementAuditProof {
    const traceId = `TRACE-FISCAL-${periodId}-${Math.floor(100000 + Math.random() * 900000)}`;
    
    return {
      settlementPeriod: periodId,
      policyId: this.policy.policyId,
      sourceJurisdiction: this.policy.jurisdictionSource,
      recipientJurisdiction: this.policy.jurisdictionRecipient,
      calculationBasis: this.policy.calculationBasis,
      percentageApplied: this.policy.settlementPercentage,
      grossRevenueHash: grossHash,
      deductionHash: deductionHash,
      payableAmountHash: payableHash,
      calculationTimestamp: new Date().toISOString(),
      approvalState: approvalState,
      auditTraceId: traceId
    };
  }
}
