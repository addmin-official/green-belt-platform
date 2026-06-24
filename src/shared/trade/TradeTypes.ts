export type Jurisdiction = 'federal' | 'krg' | 'joint';

export type TradeLicenseType = 'IMPORT_LICENSE' | 'EXPORT_LICENSE' | 'TRANSIT_LICENSE' | 'SPECIAL_LICENSE';

export type LicenseStatus = 'ACTIVE' | 'SUSPENDED' | 'REVOKED' | 'EXPIRED';

export type DeclarationStatus = 'DRAFT' | 'FILED' | 'INSPECTING' | 'REJECTED' | 'RELEASED' | 'TRANSIT_HOLD';

export type TradeRegime = 'IMPORT' | 'EXPORT' | 'TRANSIT';

export interface Importer {
  id: string; // e.g., IMP-IRQ-10023
  name: string;
  taxId: string;
  countryOfOrigin: string;
  reliabilityScore: number; // 0-100
  licenseNumber: string;
}

export interface Exporter {
  id: string; // e.g., EXP-IRQ-20094
  name: string;
  taxId: string;
  destinationCountry: string;
  reliabilityScore: number; // 0-100
  licenseNumber: string;
}

export interface TradeLicense {
  licenseNumber: string;
  holderId: string; // Importer or Exporter ID
  holderName: string;
  type: TradeLicenseType;
  issueDate: string;
  expiryDate: string;
  status: LicenseStatus;
  jurisdiction: Jurisdiction;
  authorizedCommodities: string[]; // HS Codes or categories
  approvedQuotaUSD: number;
  exhaustedQuotaUSD: number;
}

export interface TradeCommodity {
  hsCode: string; // Harmonized System Code
  name: string;
  category: string;
  isRestricted: boolean;
  isProhibited: boolean;
  isDualUse: boolean;
  baseTariffRate: number; // percentage
}

export interface TradeDeclaration {
  id: string; // TDEC-XXXXX
  importerId?: string;
  exporterId?: string;
  partnerName: string; // foreign or domestic partner
  regime: TradeRegime;
  corridorId: string;
  commodity: TradeCommodity;
  declaredValueUSD: number;
  weightTons: number;
  status: DeclarationStatus;
  riskScore: number;
  complianceScore: number;
  submittedAt: string;
  lastUpdatedAt: string;
  jurisdiction: Jurisdiction;
  assignedInspector?: string;
  reconciliationHash?: string; // for joint ledger verification
}

export interface TradePartner {
  id: string;
  name: string;
  type: 'COUNTRY' | 'PORT' | 'EXPRESS_CARRIER' | 'BILATERAL_AGENCY';
  countryCode: string;
  reliabilityRating: number; // 0-100
  isSanctioned: boolean;
}

export interface TradeCorridor {
  id: string;
  name: string;
  type: 'LAND' | 'SEA' | 'AIR' | 'RAIL';
  primaryGateName: string;
  operatingJurisdiction: Jurisdiction;
  dailyCapacityTons: number;
  activeStatus: boolean;
}

export interface TradeInspection {
  id: string;
  declarationId: string;
  inspectorName: string;
  inspectedAt: string;
  findings: string;
  result: 'APPROVED' | 'REJECTED' | 'FINED';
  fineAmountUSD?: number;
}

export interface TradeRiskProfile {
  id: string;
  targetType: 'ENTITY' | 'COMMODITY' | 'COUNTRY' | 'CORRIDOR';
  targetId: string; // ID of the entity, HS Code, or Country Code
  riskFactors: string[];
  overallRiskScore: number; // 0-100
  smugglingFlagScore: number; // 0-100
  indicators: string[];
}

export interface TradeViolation {
  id: string;
  declarationId?: string;
  licenseNumber?: string;
  entityName: string;
  violationType: 'PROHIBITED_GOODS' | 'SANCTION_BREACH' | 'UNDER_VALUATION' | 'MISCLASSIFICATION' | 'EXCEEDED_QUOTA';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedAt: string;
  actionTaken: string;
  status: 'PENDING' | 'RESOLVED' | 'CONTENDED';
}

export interface TradeIntelligenceRecord {
  id: string;
  headline: string;
  category: 'FLOW_ANOMALY' | 'SMUGGLING_ALERT' | 'TARIFF_EVASION' | 'CORRIDOR_CONGESTION';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  details: string;
  detectedAt: string;
  sourceEnclave: string;
  confidence: number; // percentage
}

export interface TradeAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  recordId: string;
  recordType: 'DECLARATION' | 'LICENSE' | 'VIOLATION' | 'RISK_PROFILE';
  details: string;
  hash: string; // for cryptographic proof
}
