import { SsosMode, TreasuryAccount } from '../ssos/SsosEngines';
import { CBIRegistry } from './CBIRegistry';

export interface RevenueStream {
  id: string;
  name: string;
  type: 'Customs' | 'Border' | 'Taxation' | 'Energy' | 'Shared';
  jurisdiction: 'federal' | 'krg' | 'joint';
  projectedAnnual: number; // Millions USD
  collectedToDate: number; // Millions USD
  lastSyncDate: string;
}

export interface ReconciliationReport {
  timestamp: string;
  scope: string;
  totalFederalRevenue: number;
  totalKrgRevenue: number;
  unreconciledDifference: number;
  exceptions: Array<{ code: string; message: string; severity: 'critical' | 'alert' | 'info' }>;
  recommendations: string[];
}

export interface TreasuryPosition {
  jurisdiction: 'federal' | 'krg' | 'joint';
  totalBalanceUSD: number; // Total combined USD
  liquidAssetsUSD: number;
  restrictedAssetsUSD: number;
  emergencyCoverageRatio: number; // percentage of reserve requirement met
  auditStatus: 'VERIFIED' | 'PENDING_RECONCILIATION' | 'UNRECONCILED';
}

export class CBIIntegrationEngine {
  private static revenueStreams: RevenueStream[] = [
    { id: 'STR-FED-OIL', name: 'Federal Southern Offshore Oil Sales', type: 'Energy', jurisdiction: 'federal', projectedAnnual: 98000, collectedToDate: 26400, lastSyncDate: '2026-06-05' },
    { id: 'STR-KRG-OIL', name: 'Regional Pipeline export Offtake', type: 'Energy', jurisdiction: 'krg', projectedAnnual: 12400, collectedToDate: 3100, lastSyncDate: '2026-06-04' },
    { id: 'STR-FED-CST-UMMQASR', name: 'Umm Qasr Port Customs Tariffs', type: 'Customs', jurisdiction: 'federal', projectedAnnual: 1200, collectedToDate: 380, lastSyncDate: '2026-06-06' },
    { id: 'STR-KRG-CST-IBRAHIM', name: 'Ibrahim Khalil Custom duties', type: 'Customs', jurisdiction: 'krg', projectedAnnual: 680, collectedToDate: 195, lastSyncDate: '2026-06-03' },
    { id: 'STR-FED-TAX-CORP', name: 'Federal Corporate Income Tax', type: 'Taxation', jurisdiction: 'federal', projectedAnnual: 3400, collectedToDate: 920, lastSyncDate: '2026-06-02' },
    { id: 'STR-KRG-TAX-INDIV', name: 'KRG Personal Income Taxation', type: 'Taxation', jurisdiction: 'krg', projectedAnnual: 480, collectedToDate: 120, lastSyncDate: '2026-06-05' },
    { id: 'STR-JNT-CUSTOMS-FREE', name: 'Joint Economic Zone Custom Clearing fees', type: 'Shared', jurisdiction: 'joint', projectedAnnual: 250, collectedToDate: 85, lastSyncDate: '2026-06-06' }
  ];

  public static getRevenueStreams(): RevenueStream[] {
    return [...this.revenueStreams];
  }

  public static addRevenueStream(stream: RevenueStream) {
    this.revenueStreams.push(stream);
  }

  public static updateCollectedRevenue(id: string, newAmountCollected: number) {
    const stream = this.revenueStreams.find(s => s.id === id);
    if (stream) {
      stream.collectedToDate += newAmountCollected;
      stream.lastSyncDate = new Date().toISOString().split('T')[0];
    }
  }

  /**
   * Performs dynamic validation against current CBI exchange rates and audits trades compliance
   */
  public static verifyExchangeCompliance(wireAmountUSD: number, wireAmountIQD: number): {
    isValid: boolean;
    offsetRatio: number;
    exchangeRateUsed: number;
    complianceCode: string;
  } {
    const expectedRate = CBIRegistry.CBI_EXCHANGE_RATE;
    const computedRate = wireAmountIQD / wireAmountUSD;
    const offsetRatio = Math.abs(computedRate - expectedRate) / expectedRate;
    
    // Arbitrage ceiling threshold of 1.5% limit
    const isValid = offsetRatio < 0.015;
    
    return {
      isValid,
      offsetRatio: Math.round(offsetRatio * 10000) / 100, // percentage representation
      exchangeRateUsed: computedRate,
      complianceCode: isValid ? 'CBI-COMPLY-PASS' : 'CBI-COMPLY-VIOLATION-ARBITRAGE'
    };
  }

  /**
   * Tracks Liquidity positions and computes positions for any given treasury setting
   */
  public static evaluateTreasuryPosition(
    account: TreasuryAccount,
    mode: SsosMode
  ): TreasuryPosition {
    // Collect accounts from CBI
    const allCbiAccs = CBIRegistry.getCBIAccounts().filter(a => a.jurisdiction === account.jurisdiction);
    let totalCbiUSD = 0;
    allCbiAccs.forEach(acc => {
      if (acc.currency === 'USD') {
        totalCbiUSD += acc.balance;
      } else {
        totalCbiUSD += acc.balance / CBIRegistry.CBI_EXCHANGE_RATE;
      }
    });

    const combinedVaultUSD = account.balance + totalCbiUSD;
    const liquidAssets = combinedVaultUSD * 0.7; // 70% of treasury balance is liquid
    const restrictedAssets = combinedVaultUSD * 0.3; // 30% held in restricted development bond yields Or guarantees

    // Emergency reserve coverage check
    const requirementRatioPercentage = account.emergencyReserve > 0 
      ? (combinedVaultUSD / account.emergencyReserve) * 100 
      : 100;

    let auditStatus: TreasuryPosition['auditStatus'] = 'VERIFIED';
    if (mode === 'SEPARATED' && account.jurisdiction === 'joint') {
      auditStatus = 'PENDING_RECONCILIATION';
    }

    return {
      jurisdiction: account.jurisdiction,
      totalBalanceUSD: Math.round(combinedVaultUSD),
      liquidAssetsUSD: Math.round(liquidAssets),
      restrictedAssetsUSD: Math.round(restrictedAssets),
      emergencyCoverageRatio: Math.round(requirementRatioPercentage),
      auditStatus
    };
  }

  /**
   * Revenue sharing reconciliation process - generates variance audits
   */
  public static executeRevenueReconciliation(mode: SsosMode): ReconciliationReport {
    const allStreams = this.revenueStreams;
    
    let totalFederalRevenue = 0;
    let totalKrgRevenue = 0;
    let totalSharedCollected = 0;

    allStreams.forEach(s => {
      if (s.jurisdiction === 'federal') {
        totalFederalRevenue += s.collectedToDate;
      } else if (s.jurisdiction === 'krg') {
        totalKrgRevenue += s.collectedToDate;
      } else {
        totalSharedCollected += s.collectedToDate;
      }
    });

    const targetRatio = 0.1267; // Iraqi National budget allocation to Kurdistan (12.67%)
    const expectedRegionalShare = (totalFederalRevenue + totalSharedCollected) * targetRatio;
    const unreconciledDifference = expectedRegionalShare - totalKrgRevenue;

    const exceptions: ReconciliationReport['exceptions'] = [];
    const recommendations: string[] = [];

    if (mode === 'SEPARATED') {
      exceptions.push({
        code: 'RECON-EXC-001',
        message: 'No joint revenue reconciliation matches active SEPARATED state. Dual state isolation is strictly in effect.',
        severity: 'info'
      });
      recommendations.push('Transition operating system to federated mode to activate dynamic allocation shares.');
    } else {
      if (Math.abs(unreconciledDifference) > 500) {
        exceptions.push({
          code: 'RECON-EXC-002',
          message: `High variance in Erbil-Baghdad dynamic budget allocation. Outlier offset: $${Math.abs(Math.round(unreconciledDifference))}M`,
          severity: 'critical'
        });
        recommendations.push('Trigger Intergovernmental Clearing voucher via National Settlement Engine.');
      } else {
        exceptions.push({
          code: 'RECON-EXC-003',
          message: 'Minor currency offset due to weekly oil rate valuation adjustments.',
          severity: 'info'
        });
        recommendations.push('Authorize routine balancing transfer draft to maintain compliance.');
      }
    }

    // Border posts verification checks.
    const baghdadCustoms = allStreams.find(s => s.id === 'STR-FED-CST-UMMQASR')?.collectedToDate || 0;
    const erbilCustoms = allStreams.find(s => s.id === 'STR-KRG-CST-IBRAHIM')?.collectedToDate || 0;
    
    if (erbilCustoms > baghdadCustoms * 0.8) {
      exceptions.push({
        code: 'RECON-EXC-004',
        message: 'KRG northern land customs outperforming southern customs relative density. Potential customs diversion leak check suggested.',
        severity: 'alert'
      });
      recommendations.push('Synchronize border tariffs mapping under Treaty policy Decree 1984.');
    }

    return {
      timestamp: new Date().toISOString(),
      scope: `REVENUE-AUDIT-${mode}`,
      totalFederalRevenue,
      totalKrgRevenue,
      unreconciledDifference: Math.round(unreconciledDifference * 100) / 100,
      exceptions,
      recommendations
    };
  }
}
