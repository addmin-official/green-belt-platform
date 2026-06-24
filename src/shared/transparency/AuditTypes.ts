export type Jurisdiction = 'federal' | 'krg' | 'joint';

export type RiskSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type InvestigationStatus = 'OPEN' | 'ASSIGNED' | 'UNDER_REVIEW' | 'ESCALATED' | 'CLOSED';

export interface AuditRecord {
  id: string; // AUD-XXXX
  timestamp: string;
  actorId: string;
  actorName: string;
  action: string;
  details: string;
  jurisdiction: Jurisdiction;
  module: 'CUSTOMS' | 'REVENUE' | 'BORDER' | 'TRADE' | 'TRANSPARENCY';
  payloadHash: string; // Cryptographic chain proof
}

export interface AuditEvidence {
  id: string; // EVD-XXXX
  caseId: string;
  registeredBy: string;
  registeredAt: string;
  evidenceType: 'DOCUMENT' | 'HASH_PROOF' | 'IMAGE' | 'LOG_DUMP';
  title: string;
  description: string;
  secureHash: string;
}

export interface InvestigationCase {
  id: string; // INV-XXXX
  title: string;
  description: string;
  jurisdiction: Jurisdiction;
  status: InvestigationStatus;
  severity: RiskSeverity;
  assignedOfficer: string;
  createdAt: string;
  lastUpdatedAt: string;
  suspectEntity?: string;
  suspectOfficer?: string;
  evidenceIds: string[];
}

export interface RevenueLeakageAlert {
  id: string; // LEAK-XXXX
  title: string;
  jurisdiction: Jurisdiction;
  expectedValueUSD: number;
  actualCalculatedUSD: number;
  leakageAmountUSD: number;
  leakageType: 'TARIFF_UNDERVALUATION' | 'FEE_BYPASS' | 'CROSS_BORDER_SMUGGLING' | 'COLLECTION_GAP';
  detectedAt: string;
  status: 'PENDING' | 'INVESTIGATING' | 'MITIGATED';
  corridorId: string;
}

export interface RiskSignal {
  id: string; // RISK-XXXX
  targetType: 'OFFICER' | 'TRADER' | 'BORDER_GATE' | 'CHANNEL';
  targetId: string;
  targetName: string;
  jurisdiction: Jurisdiction;
  riskFactors: string[];
  riskIndicators: string[];
  anomalyScore: number; // 0 - 100
  severity: RiskSeverity;
  detectedAt: string;
}
