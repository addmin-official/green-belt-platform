import { BorderSettlementAuditProof, RevenueJurisdictionType, BorderRevenueScopeType, BorderSettlementStatusType } from './BorderSettlementTypes';

/**
 * @file BorderSettlementProofBuilder.ts
 * @description Proof builder constructing strictly metadata-only cryptographic proofs for joint border verification.
 */

export class BorderSettlementProofBuilder {
  /**
   * Constructs an audit proof containing zero raw currency lines or raw metrics.
   */
  public static buildProof(params: {
    settlementPeriod: string;
    borderGateId: string;
    policyId: string;
    sourceJurisdiction: RevenueJurisdictionType;
    recipientJurisdiction: RevenueJurisdictionType;
    revenueScope: BorderRevenueScopeType;
    percentageApplied: number;
    grossBorderRevenueHash: string;
    deductionHash: string;
    payableAmountHash: string;
    calculationTimestamp?: string;
    approvalState: BorderSettlementStatusType;
    auditTraceId?: string;
    transferStatus: 'PENDING_TRANSFER' | 'COMPLETED' | 'NONE';
    disputeStatus: 'NONE' | 'UNDER_DISPUTE' | 'RESOLVED';
  }): BorderSettlementAuditProof {
    const traceId = params.auditTraceId || `PROOF-GEN-${params.borderGateId}-${params.settlementPeriod}-${Math.floor(Math.random() * 100000)}`;
    const timestamp = params.calculationTimestamp || new Date().toISOString();

    return {
      settlementPeriod: params.settlementPeriod,
      borderGateId: params.borderGateId,
      policyId: params.policyId,
      sourceJurisdiction: params.sourceJurisdiction,
      recipientJurisdiction: params.recipientJurisdiction,
      revenueScope: params.revenueScope,
      percentageApplied: params.percentageApplied,
      grossBorderRevenueHash: params.grossBorderRevenueHash,
      deductionHash: params.deductionHash,
      payableAmountHash: params.payableAmountHash,
      calculationTimestamp: timestamp,
      approvalState: params.approvalState,
      auditTraceId: traceId,
      transferStatus: params.transferStatus,
      disputeStatus: params.disputeStatus
    };
  }

  /**
   * Validates if a proof behaves correctly and has valid metadata properties without raw details.
   */
  public static verifyProofStructure(proof: BorderSettlementAuditProof): boolean {
    return (
      typeof proof.settlementPeriod === 'string' &&
      typeof proof.borderGateId === 'string' &&
      typeof proof.policyId === 'string' &&
      typeof proof.grossBorderRevenueHash === 'string' &&
      typeof proof.deductionHash === 'string' &&
      typeof proof.payableAmountHash === 'string' &&
      !('rawGrossAmount' in proof) && // Ensure strict compliance - no raw numeric fields present
      !('rawDeductionAmount' in proof)
    );
  }
}
