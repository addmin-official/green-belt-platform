export type Jurisdiction = 'federal' | 'krg' | 'joint';

export interface Vendor {
  id: string;
  name: { en: string; ar: string; ku: string };
  registrationNumber: string;
  jurisdiction: Jurisdiction;
  category: 'Strategic Infrastructure' | 'Defense & Security' | 'Digital & Technology' | 'Energy Systems' | 'General Supplies';
  qualificationScore: number; // 0-100
  supplierRiskScore: number; // 0-100
  status: 'Approved' | 'Suspended' | 'Under Review' | 'Blacklisted';
  completedContracts: number;
  activeContracts: number;
  totalContractValueUSD: number; // Millions USD
  complianceRating: number; // 0-100
  lastAudited: string;
}

export interface Tender {
  id: string;
  title: { en: string; ar: string; ku: string };
  category: Vendor['category'];
  jurisdiction: Jurisdiction;
  budgetUSD: number; // Millions USD
  authority: string; // e.g. "Federal Ministry of Construction", "KRG Ministry of Transportation"
  status: 'Draft' | 'Published' | 'Bid Open' | 'Evaluation' | 'Awarded' | 'Closed';
  publishDate: string;
  closingDate: string;
  requirements: string[];
  minimumScoreRequired: number; // e.g. 75
  bidIds: string[];
}

export interface Bid {
  id: string;
  tenderId: string;
  vendorId: string;
  vendorName: string;
  proposalUSD: number; // Millions USD
  technicalScore: number; // 0-100
  financialScore: number; // 0-100
  overallScore: number; // 0-100
  complianceChecked: boolean;
  complianceViolations: string[];
  submissionDate: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Awarded';
}

export interface Contract {
  id: string;
  tenderId: string;
  vendorId: string;
  vendorName: string;
  title: { en: string; ar: string; ku: string };
  jurisdiction: Jurisdiction;
  valueUSD: number; // Millions USD
  spentUSD: number; // Millions USD
  authority: string;
  signingDate: string;
  completionDate: string;
  status: 'Active' | 'Disputed' | 'Completed' | 'Terminated' | 'Suspended';
  milestones: {
    id: string;
    description: { en: string; ar: string; ku: string };
    dueDate: string;
    weight: number; // percent of budget
    status: 'Pending' | 'Approved' | 'Delayed';
    progress: number; // 0-100
  }[];
  performanceScore: number; // 0-100
}

export interface ProcurementPolicy {
  id: string;
  title: { en: string; ar: string; ku: string };
  jurisdiction: Jurisdiction;
  thresholdMillionsUSD: number;
  approvalRequiredBy: 'Cabinet' | 'Joint Council' | 'Ministry' | 'Intergovernmental Board';
  complianceRules: string[];
  active: boolean;
}

export interface ProcurementLedgerRecord {
  id: string;
  timestamp: string;
  action: string;
  entityType: 'TENDER' | 'VENDOR' | 'BID' | 'CONTRACT' | 'POLICY';
  entityId: string;
  actor: string;
  signature: string; // Cryptographic-like hash signature for ledger integrity
  payload: string; // JSON payload of action
}
