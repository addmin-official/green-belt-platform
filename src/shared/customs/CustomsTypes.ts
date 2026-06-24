import { TariffCalculationResult } from './TariffCalculationEngine';

export type CustomsRegime = 'IMPORT' | 'EXPORT' | 'TRANSIT' | 'TEMPORARY_ENTRY' | 'TEMPORARY_EXIT';

export type CustomsClearanceStatus = 'pending' | 'inspection' | 'approved' | 'rejected' | 'held' | 'released';

export interface CustomsDeclaration {
  id: string; // DECL-xxxxxx standard
  hsCode: string;
  regime: CustomsRegime;
  importerName: string;
  exporterName: string;
  declaredValueUSD: number;
  weightTons: number;
  description: string;
  jurisdiction: 'federal' | 'krg';
  status: CustomsClearanceStatus;
  tariffDetail: TariffCalculationResult;
  submittedAt: string;
  lastUpdatedAt: string;
  assignedInspector?: string;
  notes?: string;
  manifestIdField?: string; // Links to existing manifest if provided
}

export interface CustomsAuditEvent {
  id: string;
  declarationId: string;
  timestamp: string;
  actor: string;
  actionDetails: string;
  previousStatus: CustomsClearanceStatus;
  newStatus: CustomsClearanceStatus;
  notes?: string;
}

export interface RevenueLog {
  id: string;
  declarationId: string;
  timestamp: string;
  jurisdiction: 'federal' | 'krg';
  baseDutyUSD: number;
  borderServiceFeeUSD: number;
  inspectionFeeUSD: number;
  penaltyFeeUSD: number;
  totalCollectedUSD: number;
  settledWithCentralBank: boolean;
}
