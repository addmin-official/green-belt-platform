/**
 * @file FiscalSettlementTypes.ts
 * @description پێناسەکردنی جۆرەکانی دراو و سیاسەتەکانی پێوانەکردن و هەڵسەنگاندنی شێوازی دابەشکردنی داهات لە نێوان عێراقی فیدراڵ و هەرێمی کوردستان.
 */

export type JurisdictionType = 'KURDISTAN_REGION' | 'FEDERAL_IRAQ';

export type CalculationBasisType =
  | 'GROSS_REVENUE'
  | 'NET_REVENUE'
  | 'CUSTOMS_REVENUE'
  | 'NON_OIL_REVENUE'
  | 'AGREEMENT_DEFINED';

export type SettlementStatus =
  | 'DRAFT'
  | 'PENDING_PROVIDER_DATA'
  | 'PENDING_REVIEW'
  | 'CALCULATED'
  | 'DISPUTED'
  | 'APPROVED'
  | 'TRANSFER_PENDING'
  | 'TRANSFER_CONFIRMED'
  | 'RECONCILED';

export interface FiscalSettlementPolicy {
  policyId: string;
  name: string;
  jurisdictionSource: JurisdictionType;
  jurisdictionRecipient: JurisdictionType;
  calculationBasis: CalculationBasisType;
  settlementPercentage: number; // e.g. 50% = 50
  deductionRules: string[];
  reviewBasis: string;
  effectiveDate: string;
  expiryDate: string;
  approvalStatus: 'ACTIVE' | 'DRAFT' | 'AGREEMENT_DEPENDENT' | 'EXPIRED';
  legalReferencePlaceholder: string;
  providerRequired: boolean;
  legalReferenceRequired: boolean;
}

export interface SettlementPeriodData {
  periodId: string; // e.g. "2026-Q1"
  grossRevenueHash: string;
  deductionHash: string;
  payableAmountHash: string;
  providerState: 'CONFIGURED' | 'NOT_CONFIGURED';
  rawRevenueExposed: boolean;
  rawKrgRevenueAmount?: number; // kept KRG_ONLY
  rawFederalRevenueAmount?: number; // kept FEDERAL_ONLY
}

export interface SettlementAuditProof {
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
  reconciliationProofHash?: string;
}
