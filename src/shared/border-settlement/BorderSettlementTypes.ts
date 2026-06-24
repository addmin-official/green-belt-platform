/**
 * @file BorderSettlementTypes.ts
 * @description Border-specific revenue settlement types matching constitutional and coordination criteria.
 */

export type RevenueJurisdictionType = 'KURDISTAN_REGION' | 'FEDERAL_IRAQ';

export type BorderRevenueScopeType =
  | 'BORDER_CROSSING_FEES'
  | 'CUSTOMS_DUTIES'
  | 'TRANSIT_FEES'
  | 'TRADE_CLEARANCE_FEES'
  | 'BORDER_SERVICE_FEES'
  | 'AGREEMENT_DEFINED_BORDER_REVENUE';

export type BorderSettlementStatusType =
  | 'DRAFT'
  | 'PENDING_PROVIDER_DATA'
  | 'PENDING_REVIEW'
  | 'CALCULATED'
  | 'DISPUTED'
  | 'APPROVED'
  | 'TRANSFER_PENDING'
  | 'TRANSFER_CONFIRMED'
  | 'RECONCILED';

export interface BorderRevenuePolicy {
  policyId: string;
  name: string;
  borderGateId?: string;
  borderGateName?: string;
  sourceJurisdiction: RevenueJurisdictionType;
  recipientJurisdiction: RevenueJurisdictionType;
  revenueScope: BorderRevenueScopeType;
  settlementPercentage: number; // e.g., 50
  legalBasisId: string;
  legalReferenceLabel: string;
  effectiveDate: string;
  expiryDate: string;
  providerRequired: boolean;
  auditRequired: boolean;
  approvalStatus: 'DRAFT' | 'LEGAL_BASIS_REQUIRED' | 'ACTIVE' | 'EXPIRED';
  disputeStatus: 'NONE' | 'UNDER_DISPUTE' | 'RESOLVED';
}

export interface BorderSettlementPeriodData {
  periodId: string;
  borderGateId: string;
  revenueScope: BorderRevenueScopeType;
  grossBorderRevenueHash: string;
  deductionHash: string;
  payableAmountHash: string;
  calculationTimestamp: string;
  providerState: 'CONFIGURED' | 'NOT_CONFIGURED';
  rawExposed: boolean;
}

export interface BorderSettlementAuditProof {
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
  calculationTimestamp: string;
  approvalState: BorderSettlementStatusType;
  auditTraceId: string;
  transferStatus: 'PENDING_TRANSFER' | 'COMPLETED' | 'NONE';
  disputeStatus: 'NONE' | 'UNDER_DISPUTE' | 'RESOLVED';
  reconciliationStatus?: 'MATCHED' | 'MISMATCHED' | 'PENDING_VERIFICATION';
}
