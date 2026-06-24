import { SsosMode } from '../ssos/SsosEngines';

export interface TreasuryPolicy {
  id: string;
  name: string;
  jurisdiction: 'federal' | 'krg' | 'joint';
  ratioTarget: number;
  approvedBy: string;
  status: 'ACTIVE' | 'PENDING' | 'RETIRED';
}

export interface FiscalAuthority {
  id: string;
  name: string;
  jurisdiction: 'federal' | 'krg' | 'joint';
  clearanceLimit: number; // Millions USD
  assignedMinister: string;
  role: string;
}

export interface SettlementAuthority {
  id: string;
  jurisdiction: 'federal' | 'krg' | 'joint';
  authorizedSignatory: string;
  clearanceRole: string;
  isActive: boolean;
}

export interface BudgetAuthority {
  id: string;
  jurisdiction: 'federal' | 'krg' | 'joint';
  approvingEntity: string;
  governanceCode: string;
}

export interface SovereignObligation {
  id: string;
  lender: string;
  loanType: 'Internal' | 'External' | 'Guarantee' | 'Commitment';
  jurisdiction: 'federal' | 'krg' | 'joint';
  principalAmount: number; // Millions USD
  interestRate: number; // percentage
  maturityDate: string;
  committedSpent: number;
}

export interface SovereignAsset {
  id: string;
  name: string;
  category: 'Energy' | 'Infrastructure' | 'Strategic' | 'StateOwnedEnterprise' | 'TreasuryControlled';
  jurisdiction: 'federal' | 'krg' | 'joint';
  valuation: number; // Millions USD
  annualRevenueYield: number; // Millions USD
  lastAuditDate: string;
}

export interface CBIAccount {
  accountNumber: string;
  title: string;
  jurisdiction: 'federal' | 'krg' | 'joint';
  currency: 'IQD' | 'USD';
  balance: number; // in Local Currency Units or millions
  reserveRequirementRatio: number;
}

export class CBIRegistry {
  public static readonly CBI_EXCHANGE_RATE = 1310.0; // IQD per USD

  // Registries
  private static treasuryPolicies: TreasuryPolicy[] = [
    { id: 'POL-FY26-FED-01', name: 'Federal Oil Revenue Retention Protocol', jurisdiction: 'federal', ratioTarget: 0.85, approvedBy: 'Federal Council of Ministers', status: 'ACTIVE' },
    { id: 'POL-FY26-KRG-01', name: 'Regional Custom Revenue Retention Protocol', jurisdiction: 'krg', ratioTarget: 0.50, approvedBy: 'Kurdish Parliament', status: 'ACTIVE' },
    { id: 'POL-FY26-JNT-01', name: 'Joint Border Finance Allocation Procedure', jurisdiction: 'joint', ratioTarget: 0.1267, approvedBy: 'Joint Coordination Council', status: 'ACTIVE' }
  ];

  private static fiscalAuthorities: FiscalAuthority[] = [
    { id: 'AUTH-FED-MIN-01', name: 'Federal Minister of Finance', jurisdiction: 'federal', clearanceLimit: 50000, assignedMinister: 'Taif Sami Al-Shakarchi', role: 'Treasury Guardian' },
    { id: 'AUTH-KRG-MIN-01', name: 'KRG Minister of Finance and Economy', jurisdiction: 'krg', clearanceLimit: 10000, assignedMinister: 'Awat Janab Noori', role: 'Regional Treasurer' },
    { id: 'AUTH-JNT-DIR-01', name: 'Joint Executive Committee Secretariat', jurisdiction: 'joint', clearanceLimit: 5000, assignedMinister: 'Erbil-Baghdad Liaison Council', role: 'Joint Fiscal Clearing Signatory' }
  ];

  private static settlementAuthorities: SettlementAuthority[] = [
    { id: 'SETTLE-FED-01', jurisdiction: 'federal', authorizedSignatory: 'Deputy Governor of CBI', clearanceRole: 'Federal Routing Authority', isActive: true },
    { id: 'SETTLE-KRG-01', jurisdiction: 'krg', authorizedSignatory: 'KRG Director General of Treasury', clearanceRole: 'KRG Regional Clearer', isActive: true },
    { id: 'SETTLE-JNT-01', jurisdiction: 'joint', authorizedSignatory: 'Joint Clearing Board Commissioner', clearanceRole: 'Handshake Overseer', isActive: true }
  ];

  private static budgetAuthorities: BudgetAuthority[] = [
    { id: 'BGT-AUTH-FED', jurisdiction: 'federal', approvingEntity: 'Iraqi Parliament Finance Committee', governanceCode: 'DECREE-2026-COFM' },
    { id: 'BGT-AUTH-KRG', jurisdiction: 'krg', approvingEntity: 'Kurdistan Region Parliament Office', governanceCode: 'DECREE-2026-KRGP' },
    { id: 'BGT-AUTH-JNT', jurisdiction: 'joint', approvingEntity: 'Federated Intergovernmental Committee', governanceCode: 'DECREE-2026-JNT' }
  ];

  private static sovereignObligations: SovereignObligation[] = [
    { id: 'DEBT-IMF-SBA-2026', lender: 'International Monetary Fund', loanType: 'External', jurisdiction: 'federal', principalAmount: 4800, interestRate: 3.25, maturityDate: '2031-12-31', committedSpent: 4200 },
    { id: 'DEBT-CBI-DEBENTURE-1', lender: 'Central Bank of Iraq Bond Sale', loanType: 'Internal', jurisdiction: 'federal', principalAmount: 12000, interestRate: 4.50, maturityDate: '2028-06-30', committedSpent: 12000 },
    { id: 'DEBT-KRG-LOCAL-BANKS', lender: 'Kurdistan Consortium of Private Banks', loanType: 'Internal', jurisdiction: 'krg', principalAmount: 1850, interestRate: 5.75, maturityDate: '2027-12-31', committedSpent: 1800 },
    { id: 'DEBT-FED-GUAR-KRG', lender: 'Federal Iraq Sovereign Guarantee to KRG', loanType: 'Guarantee', jurisdiction: 'joint', principalAmount: 2500, interestRate: 0.0, maturityDate: '2029-01-01', committedSpent: 2200 }
  ];

  private static sovereignAssets: SovereignAsset[] = [
    { id: 'AST-KIRKUK-NORTHOIL', name: 'Kirkuk North Oil Fields Infrastructure', category: 'Energy', jurisdiction: 'federal', valuation: 85000, annualRevenueYield: 8200, lastAuditDate: '2025-10-15' },
    { id: 'AST-KHURMALA-DOME', name: 'Khurmala Refining Complex & Pipeline Node', category: 'Energy', jurisdiction: 'krg', valuation: 14500, annualRevenueYield: 1850, lastAuditDate: '2025-11-20' },
    { id: 'AST-GRANDFAW-PORT', name: 'Grand Faw International Seaport Complex', category: 'Infrastructure', jurisdiction: 'federal', valuation: 32000, annualRevenueYield: 450, lastAuditDate: '2026-01-10' },
    { id: 'AST-IBRAHIMKHALIL-GATE', name: 'Ibrahim Khalil Border Crossing Assets', category: 'Infrastructure', jurisdiction: 'krg', valuation: 4800, annualRevenueYield: 620, lastAuditDate: '2025-12-05' },
    { id: 'AST-SOE-AIRLINES', name: 'Iraqi Airways State Owned Enterprise', category: 'StateOwnedEnterprise', jurisdiction: 'federal', valuation: 2400, annualRevenueYield: 180, lastAuditDate: '2025-09-01' }
  ];

  private static cbiAccounts: CBIAccount[] = [
    { accountNumber: 'CBI-FED-USD-011', title: 'Federal Sovereign Treasury Primary Account', jurisdiction: 'federal', currency: 'USD', balance: 35200, reserveRequirementRatio: 0.15 },
    { accountNumber: 'CBI-FED-IQD-012', title: 'Federal Sovereign Treasury Sub-Account', jurisdiction: 'federal', currency: 'IQD', balance: 13100000, reserveRequirementRatio: 0.15 }, // millions IQD
    { accountNumber: 'CBI-KRG-USD-021', title: 'KRG Regional Treasury Vault Account', jurisdiction: 'krg', currency: 'USD', balance: 3200, reserveRequirementRatio: 0.12 },
    { accountNumber: 'CBI-KRG-IQD-022', title: 'KRG Regional Treasury Sub-Account', jurisdiction: 'krg', currency: 'IQD', balance: 2096000, reserveRequirementRatio: 0.12 },
    { accountNumber: 'CBI-JNT-USD-099', title: 'Erbil-Baghdad Joint Clearing Pool', jurisdiction: 'joint', currency: 'USD', balance: 850, reserveRequirementRatio: 0.10 }
  ];

  // Accessors
  public static getTreasuryPolicies(): TreasuryPolicy[] {
    return [...this.treasuryPolicies];
  }

  public static getFiscalAuthorities(): FiscalAuthority[] {
    return [...this.fiscalAuthorities];
  }

  public static getSettlementAuthorities(): SettlementAuthority[] {
    return [...this.settlementAuthorities];
  }

  public static getBudgetAuthorities(): BudgetAuthority[] {
    return [...this.budgetAuthorities];
  }

  public static getSovereignObligations(): SovereignObligation[] {
    return [...this.sovereignObligations];
  }

  public static getSovereignAssets(): SovereignAsset[] {
    return [...this.sovereignAssets];
  }

  public static getCBIAccounts(): CBIAccount[] {
    return [...this.cbiAccounts];
  }

  // Mutators for real provider-driven modifications
  public static addTreasuryPolicy(policy: TreasuryPolicy) {
    this.treasuryPolicies.push(policy);
  }

  public static addSovereignObligation(obligation: SovereignObligation) {
    this.sovereignObligations.push(obligation);
  }

  public static addSovereignAsset(asset: SovereignAsset) {
    this.sovereignAssets.push(asset);
  }

  public static updateCBIAccountBalance(accountNumber: string, amountChange: number) {
    const acc = this.cbiAccounts.find(a => a.accountNumber === accountNumber);
    if (acc) {
      acc.balance += amountChange;
    }
  }
}
