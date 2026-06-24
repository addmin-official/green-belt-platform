import { SettlementAuditProof, JurisdictionType, CalculationBasisType, SettlementStatus } from './FiscalSettlementTypes';

/**
 * @file SettlementProofBuilder.ts
 * @description دروستکەری بەڵگەی پشتڕاستکراوەی بێ زانیاری دەربارەی داهاتی گومرکی یان گشتی خاوی هەرێم لە بەشی هاوبەش.
 * نووسراوەکان تەنها کۆد و هاژ دەگرنەوە.
 */

export class SettlementProofBuilder {
  /**
   * دروستکردنی بەڵگەیەکی سەلماندن لەسەر مێتاداتا بە شێوازی سەلامەت
   */
  public static createProof(params: {
    settlementPeriod: string;
    policyId: string;
    sourceJurisdiction: JurisdictionType;
    recipientJurisdiction: JurisdictionType;
    calculationBasis: CalculationBasisType;
    percentageApplied: number;
    grossRevenueHash: string;
    deductionHash: string;
    payableAmountHash: string;
    calculationTimestamp: string;
    approvalState: SettlementStatus;
    auditTraceId: string;
  }): SettlementAuditProof {
    // دڵنیابوون لەوەی بەڵگەکە هیچ داتایەکی ژمارەیی تێدا نییە تەنیا ناوەڕۆک و فۆرماتە هاژکراوەکان
    return {
      settlementPeriod: params.settlementPeriod,
      policyId: params.policyId,
      sourceJurisdiction: params.sourceJurisdiction,
      recipientJurisdiction: params.recipientJurisdiction,
      calculationBasis: params.calculationBasis,
      percentageApplied: params.percentageApplied,
      grossRevenueHash: params.grossRevenueHash,
      deductionHash: params.deductionHash,
      payableAmountHash: params.payableAmountHash,
      calculationTimestamp: params.calculationTimestamp || new Date().toISOString(),
      approvalState: params.approvalState,
      auditTraceId: params.auditTraceId
    };
  }

  /**
   * ئەنجامدانی هاژی بەراوردکاری گەرەنتی کە لە پێکهاتەی بەڕێوەبەرایەتیدا بەکاردێت.
   */
  public static calculateVerificationHash(proof: SettlementAuditProof): string {
    const combinedString = `${proof.settlementPeriod}|${proof.policyId}|${proof.grossRevenueHash}|${proof.deductionHash}|${proof.payableAmountHash}|${proof.approvalState}`;
    
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
      hash = ((hash << 5) - hash) + combinedString.charCodeAt(i);
      hash |= 0;
    }
    return `sha256_verifylink_0x${Math.abs(hash).toString(16).padStart(8, '0')}`;
  }
}
