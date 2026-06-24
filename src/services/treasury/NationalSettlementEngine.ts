import { SsosMode, TreasuryAccount } from '../ssos/SsosEngines';
import { CBIRegistry } from './CBIRegistry';

export type LedgerEventType = 
  | 'REVENUE' 
  | 'EXPENDITURE' 
  | 'TRANSFER' 
  | 'SETTLEMENT' 
  | 'ALLOCATION' 
  | 'ADJUSTMENT';

export type SettlementStatus = 
  | 'Draft' 
  | 'Validated' 
  | 'Authorized' 
  | 'Settled' 
  | 'Audited';

export interface SovereignLedgerEvent {
  transactionId: string;
  eventType: LedgerEventType;
  jurisdiction: 'federal' | 'krg' | 'joint';
  authority: string;
  timestamp: string;
  policyReference: string;
  auditReference: string;
  ledgerReference: string;
  amountUSD: number; // Millions USD
  payload: string; // JSON detail
}

export interface SettlementInstruction {
  id: string;
  sourceJurisdiction: 'federal' | 'krg' | 'joint';
  targetJurisdiction: 'federal' | 'krg' | 'joint';
  amountUSD: number;
  description: string;
  status: SettlementStatus;
  policyIdReference: string;
  authorizedBy?: string;
  signedTimestamp?: string;
  auditHash?: string;
}

export interface FiscalReadinessReport {
  scoreOverall: number; // 0-100
  treasuryReadiness: number;
  settlementReadiness: number;
  revenueReconciliationReadiness: number;
  debtGovernanceReadiness: number;
  assetGovernanceReadiness: number;
  isCompliant: boolean;
  notes: string[];
}

export class NationalSettlementEngine {
  // Immutable Event-Sourced Append-Only Ledger
  private static sovereignLedger: SovereignLedgerEvent[] = [
    {
      transactionId: 'TX-LEDGER-001',
      eventType: 'REVENUE',
      jurisdiction: 'federal',
      authority: 'Federal Oil Marketing Organization',
      timestamp: '2026-06-01T08:00:22Z',
      policyReference: 'POL-FY26-FED-01',
      auditReference: 'AUD-FED-BASRA-OIL-99',
      ledgerReference: 'LEDGER-PRIMARY-FED',
      amountUSD: 1450,
      payload: '{"tanker":"Basra Queen","barrels":2100000,"port":"Basra Deep Oil Terminal"}'
    },
    {
      transactionId: 'TX-LEDGER-002',
      eventType: 'REVENUE',
      jurisdiction: 'krg',
      authority: 'KRG Ministry of Natural Resources',
      timestamp: '2026-06-02T10:15:00Z',
      policyReference: 'POL-FY26-KRG-01',
      auditReference: 'AUD-KRG-FISHKHABUR-44',
      ledgerReference: 'LEDGER-PRIMARY-KRG',
      amountUSD: 310,
      payload: '{"pipeline":"Ceyhan Gate 1","barrels":450000,"flowState":"APPROVED"}'
    },
    {
      transactionId: 'TX-LEDGER-003',
      eventType: 'ALLOCATION',
      jurisdiction: 'joint',
      authority: 'Joint Erbil-Baghdad Reconciliation Board',
      timestamp: '2026-06-03T14:30:11Z',
      policyReference: 'POL-FY26-JNT-01',
      auditReference: 'AUD-SYNC-HANDSHAKE-01',
      ledgerReference: 'LEDGER-SHR-POOL',
      amountUSD: 180,
      payload: '{"purpose":"Constitutional 12.67 Transfer Re-mapping","session":"SESS-FY26-HANDSHAKE-03"}'
    },
    {
      transactionId: 'TX-LEDGER-004',
      eventType: 'EXPENDITURE',
      jurisdiction: 'federal',
      authority: 'Federal Comptroller Gen',
      timestamp: '2026-06-04T11:22:45Z',
      policyReference: 'BGT-AUTH-FED',
      auditReference: 'AUD-GOV-PAY-FED-102',
      ledgerReference: 'LEDGER-EXP-FED',
      amountUSD: 120,
      payload: '{"category":"Social Subsidy Allocation","paymentChannel":"ZainCash Treasury Wire"}'
    },
    {
      transactionId: 'TX-LEDGER-005',
      eventType: 'SETTLEMENT',
      jurisdiction: 'joint',
      authority: 'Central Bank of Iraq Routing',
      timestamp: '2026-06-05T16:00:00Z',
      policyReference: 'POL-FY26-JNT-01',
      auditReference: 'AUD-CBI-SETTLEMENT-TX-099',
      ledgerReference: 'LEDGER-SHR-POOL',
      amountUSD: 85,
      payload: '{"instructionId":"STL-002","originChannel":"CBI-FED-USD-011","targetChannel":"CBI-KRG-USD-021"}'
    }
  ];

  // Intergovernmental Settlement Queue
  private static settlementsQueue: SettlementInstruction[] = [
    {
      id: 'STL-001',
      sourceJurisdiction: 'federal',
      targetJurisdiction: 'krg',
      amountUSD: 125.0,
      description: 'Monthly Sovereign Budget Allocation share - Tranche A',
      status: 'Audited',
      policyIdReference: 'POL-FY26-JNT-01',
      authorizedBy: 'Taif Sami Al-Shakarchi (Federal Finance)',
      signedTimestamp: '2026-06-01T12:00:00Z',
      auditHash: '0x3f5c71a399fde211b8cb3'
    },
    {
      id: 'STL-002',
      sourceJurisdiction: 'federal',
      targetJurisdiction: 'krg',
      amountUSD: 85.0,
      description: 'Northern Border infrastructure recovery funding',
      status: 'Settled',
      policyIdReference: 'POL-FY26-JNT-01',
      authorizedBy: 'Taif Sami Al-Shakarchi (Federal Finance)',
      signedTimestamp: '2026-06-04T15:30:11Z',
      auditHash: '0xa41c09abcf12316e6d191'
    },
    {
      id: 'STL-003',
      sourceJurisdiction: 'krg',
      targetJurisdiction: 'federal',
      amountUSD: 52.5,
      description: 'Reciprocated Customs Tariff share remittance - Ibrahim Khalil gate',
      status: 'Authorized',
      policyIdReference: 'POL-FY26-KRG-01',
      authorizedBy: 'Awat Janab Noori (KRG Finance)',
      signedTimestamp: '2026-06-05T09:12:44Z',
      auditHash: '0xfebd12aef912e5541ba3c'
    },
    {
      id: 'STL-004',
      sourceJurisdiction: 'joint',
      targetJurisdiction: 'federal',
      amountUSD: 14.2,
      description: 'Shared economic zone customs variance refund',
      status: 'Validated',
      policyIdReference: 'POL-FY26-FED-01',
      authorizedBy: 'Joint Clearing Board Commissioner',
      signedTimestamp: '2026-06-06T10:00:22Z'
    },
    {
      id: 'STL-005',
      sourceJurisdiction: 'federal',
      targetJurisdiction: 'krg',
      amountUSD: 40.0,
      description: 'Sovereign emergency contingency stabilization reserve grant',
      status: 'Draft',
      policyIdReference: 'POL-FY26-JNT-01'
    }
  ];

  // Sovereign reserve tracking
  private static sovereignGoldReserveFineOunces = 4300000; // ~133 metric tonnes of gold held in CBI
  private static sovereignSDRBalanceUSD = 2400.0; // IMF Special Drawing Rights (Millions USD)
  private static sovereignForeignCurrencyReservesUSD = 112000.0; // Millions USD held across foreign bank institutions

  public static getLedgerEvents(): SovereignLedgerEvent[] {
    return [...this.sovereignLedger];
  }

  public static getSettlementsQueue(): SettlementInstruction[] {
    return [...this.settlementsQueue];
  }

  public static getSovereignReserves() {
    return {
      goldFineOunces: this.sovereignGoldReserveFineOunces,
      goldValueUSD: Math.round(this.sovereignGoldReserveFineOunces * 2350.0 / 1000000), // Millions USD @ approx $2350/oz
      sdrBalanceUSD: this.sovereignSDRBalanceUSD,
      foreignCurrencyReservesUSD: this.sovereignForeignCurrencyReservesUSD,
      totalReservesSovereignUSD: Math.round(
        (this.sovereignGoldReserveFineOunces * 2350.0 / 1000000) + 
        this.sovereignSDRBalanceUSD + 
        this.sovereignForeignCurrencyReservesUSD
      )
    };
  }

  /**
   * Append-only event sourced ledger writer
   */
  public static appendLedgerEvent(event: Omit<SovereignLedgerEvent, 'transactionId' | 'timestamp'>): SovereignLedgerEvent {
    const transactionId = `TX-LEDGER-${String(this.sovereignLedger.length + 1).padStart(3, '0')}`;
    const timestamp = new Date().toISOString();
    
    const newEvent: SovereignLedgerEvent = {
      ...event,
      transactionId,
      timestamp
    };
    
    this.sovereignLedger.push(newEvent);
    return newEvent;
  }

  /**
   * Modifies settlement instructions with audit traceability
   */
  public static appendSettlement(instruction: Omit<SettlementInstruction, 'id' | 'status'>): SettlementInstruction {
    const id = `STL-${String(this.settlementsQueue.length + 1).padStart(3, '0')}`;
    const newInstruction: SettlementInstruction = {
      ...instruction,
      id,
      status: 'Draft'
    };
    this.settlementsQueue.push(newInstruction);
    return newInstruction;
  }

  public static advanceSettlementStatus(id: string, actor: string, advanceTo?: SettlementStatus): {
    success: boolean;
    instruction?: SettlementInstruction;
    message: string;
  } {
    const item = this.settlementsQueue.find(s => s.id === id);
    if (!item) {
      return { success: false, message: 'Settlement instruction not found.' };
    }

    const workflowOrder: SettlementStatus[] = ['Draft', 'Validated', 'Authorized', 'Settled', 'Audited'];
    const currentIndex = workflowOrder.indexOf(item.status);
    
    let nextStatus = advanceTo;
    if (!nextStatus) {
      if (currentIndex < workflowOrder.length - 1) {
        nextStatus = workflowOrder[currentIndex + 1];
      } else {
        return { success: false, message: 'Settlement already fully audited.', instruction: item };
      }
    }

    item.status = nextStatus;
    if (nextStatus === 'Authorized') {
      item.authorizedBy = actor;
      item.signedTimestamp = new Date().toISOString();
    } else if (nextStatus === 'Settled') {
      // Generate immutable ledger entries.
      item.auditHash = '0x' + Array.from({length: 20}, () => Math.floor(Math.random()*16).toString(16)).join('');
      
      this.appendLedgerEvent({
        eventType: 'SETTLEMENT',
        jurisdiction: item.sourceJurisdiction,
        authority: actor,
        policyReference: item.policyIdReference,
        auditReference: `AUD-SETTLE-${item.id}`,
        ledgerReference: `LEDGER-${item.sourceJurisdiction.toUpperCase()}-PRIMARY`,
        amountUSD: item.amountUSD,
        payload: JSON.stringify({
          source: item.sourceJurisdiction,
          target: item.targetJurisdiction,
          amountUSD: item.amountUSD,
          hash: item.auditHash,
          type: 'Intergovernmental Settlement Fund Routing'
        })
      });

      // Transfer physical asset change under CBI primary registries if applicable
      const findSourceCBI = CBIRegistry.getCBIAccounts().find(a => a.jurisdiction === item.sourceJurisdiction && a.currency === 'USD');
      const findTargetCBI = CBIRegistry.getCBIAccounts().find(a => a.jurisdiction === item.targetJurisdiction && a.currency === 'USD');
      if (findSourceCBI && findTargetCBI) {
        CBIRegistry.updateCBIAccountBalance(findSourceCBI.accountNumber, -item.amountUSD);
        CBIRegistry.updateCBIAccountBalance(findTargetCBI.accountNumber, item.amountUSD);
      }
    }

    return {
      success: true,
      instruction: item,
      message: `Settlement advanced successfully to [${nextStatus}]`
    };
  }

  /**
   * FiscalReadinessEngine checking readiness parameters mathematically
   */
  public static evaluateFiscalReadiness(mode: SsosMode): FiscalReadinessReport {
    // 1. Treasury Readiness - Balance vs emergency ratio
    const initialTreasuries = [
      { bal: 45200, res: 5000 }, // federal
      { bal: 4800, res: 600 },  // krg
      { bal: 850, res: 100 }    // joint
    ];
    let totalBal = 0;
    let totalRes = 0;
    initialTreasuries.forEach(t => {
      totalBal += t.bal;
      totalRes += t.res;
    });
    const treasuryReadiness = totalBal > totalRes * 5 ? 98 : 74;

    // 2. Settlement Readiness - checks audited settlements in queue
    const allSTL = this.settlementsQueue;
    const completedOrAudited = allSTL.filter(s => s.status === 'Settled' || s.status === 'Audited').length;
    const settlementReadiness = Math.round((completedOrAudited / allSTL.length) * 100);

    // 3. Revenue Reconciliation Readiness - exception density
    const exceptionCount = allSTL.filter(s => s.status === 'Draft' || s.status === 'Validated').length;
    const revenueReconciliationReadiness = Math.max(20, 100 - (exceptionCount * 12));

    // 4. Debt Governance Readiness - debt to assets valuation ratio
    const obligations = CBIRegistry.getSovereignObligations();
    const assets = CBIRegistry.getSovereignAssets();
    
    let totalPrincipal = 0;
    obligations.forEach(o => {
      totalPrincipal += o.principalAmount;
    });
    
    let totalAssetValuation = 0;
    assets.forEach(a => {
      totalAssetValuation += a.valuation;
    });

    const assetToDebtRatio = totalPrincipal > 0 ? (totalAssetValuation / totalPrincipal) : 100;
    const debtGovernanceReadiness = assetToDebtRatio > 4 ? 90 : Math.round(assetToDebtRatio * 20);

    // 5. Asset Governance Readiness - assets audits coverage
    const assetCount = assets.length;
    let auditedIn2025Or2026 = 0;
    assets.forEach(a => {
      if (a.lastAuditDate.startsWith('2025') || a.lastAuditDate.startsWith('2026')) {
        auditedIn2025Or2026++;
      }
    });
    const assetGovernanceReadiness = assetCount > 0 ? Math.round((auditedIn2025Or2026 / assetCount) * 100) : 100;

    // Mode amplification modifier
    const modeModifier = mode === 'UNIFIED' ? 1.0 : mode === 'FEDERATED' ? 0.9 : 0.7;
    const rawAverage = (
      treasuryReadiness + 
      settlementReadiness + 
      revenueReconciliationReadiness + 
      debtGovernanceReadiness + 
      assetGovernanceReadiness
    ) / 5;

    const scoreOverall = Math.round(rawAverage * modeModifier);
    const isCompliant = scoreOverall >= 75;

    const notes: string[] = [];
    if (settlementReadiness < 60) notes.push('Pending draft settlement handshakes could slow intergovernmental budget distributions.');
    if (revenueReconciliationReadiness < 70) notes.push('Higher variances flagged on cross-boundary border tax audits.');
    if (mode === 'SEPARATED') notes.push('Unification strategy restricts total coordination. Switch to federated to maximize system capabilities.');

    return {
      scoreOverall,
      treasuryReadiness,
      settlementReadiness,
      revenueReconciliationReadiness,
      debtGovernanceReadiness,
      assetGovernanceReadiness,
      isCompliant,
      notes
    };
  }
}
