import { BorderRevenuePolicy, BorderSettlementStatusType, BorderSettlementAuditProof } from './BorderSettlementTypes';
import { BorderRevenuePolicyRegistry } from './BorderRevenuePolicyRegistry';

/**
 * @file FederalKRGBorderRevenuePolicy.ts
 * @description Core coordinator modeling Federal-KRG border revenue settlements and validation workflows.
 */

export class FederalKRGBorderRevenuePolicy {
  private policy: BorderRevenuePolicy;
  private currentStatus: BorderSettlementStatusType;

  constructor(policyId: string = 'KRG_TO_FEDERAL_BORDER_REVENUE_50_PERCENT') {
    const found = BorderRevenuePolicyRegistry.getPolicyById(policyId);
    if (!found) {
      throw new Error(`سیاسەتی دەروازی سنووری بە ناسنامەی ${policyId} نەدۆزرایەوە.`);
    }
    this.policy = found;
    this.currentStatus = 'DRAFT';
  }

  public getPolicy(): BorderRevenuePolicy {
    return this.policy;
  }

  public getStatus(): BorderSettlementStatusType {
    return this.currentStatus;
  }

  public updateStatus(status: BorderSettlementStatusType): void {
    this.currentStatus = status;
  }

  /**
   * Configurable percentage-based adjustment that guarantees it applies only to borders
   */
  public adjustSettlementPercentage(newPercentage: number): void {
    if (newPercentage < 0 || newPercentage > 100) {
      throw new Error('ڕێژەی گواستنەوە دەبێت لە نێوان ٠ بۆ ١٠٠ بێت.');
    }
    this.policy.settlementPercentage = newPercentage;
    BorderRevenuePolicyRegistry.registerPolicy(this.policy);
  }

  /**
   * Safe generation of metadata-only audit proofs preventing leaking raw transactions
   */
  public generateProof(
    periodId: string,
    grossHash: string,
    deductionHash: string,
    payableHash: string,
    transferStatus: 'PENDING_TRANSFER' | 'COMPLETED' | 'NONE' = 'NONE',
    disputeState: 'NONE' | 'UNDER_DISPUTE' | 'RESOLVED' = 'NONE'
  ): BorderSettlementAuditProof {
    const traceId = `TRACE-BORDER-${this.policy.borderGateId}-${periodId}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    return {
      settlementPeriod: periodId,
      borderGateId: this.policy.borderGateId || 'UNSPECIFIED',
      policyId: this.policy.policyId,
      sourceJurisdiction: this.policy.sourceJurisdiction,
      recipientJurisdiction: this.policy.recipientJurisdiction,
      revenueScope: this.policy.revenueScope,
      percentageApplied: this.policy.settlementPercentage,
      grossBorderRevenueHash: grossHash,
      deductionHash: deductionHash,
      payableAmountHash: payableHash,
      calculationTimestamp: new Date().toISOString(),
      approvalState: this.currentStatus,
      auditTraceId: traceId,
      transferStatus,
      disputeStatus: disputeState
    };
  }
}
