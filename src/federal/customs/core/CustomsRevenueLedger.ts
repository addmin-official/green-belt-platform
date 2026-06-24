import { RevenueLog } from '../../../shared/customs/CustomsTypes';

export class FederalCustomsRevenueLedger {
  private static ledgerLogs: RevenueLog[] = [
    {
      id: 'REV-FED-001',
      declarationId: 'DECL-FED-10020',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      jurisdiction: 'federal',
      baseDutyUSD: 14500,
      borderServiceFeeUSD: 2300,
      inspectionFeeUSD: 250,
      penaltyFeeUSD: 0,
      totalCollectedUSD: 17050,
      settledWithCentralBank: true
    },
    {
      id: 'REV-FED-002',
      declarationId: 'DECL-FED-10023',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      jurisdiction: 'federal',
      baseDutyUSD: 850,
      borderServiceFeeUSD: 410,
      inspectionFeeUSD: 100,
      penaltyFeeUSD: 400, // penalty for restriction violation
      totalCollectedUSD: 1760,
      settledWithCentralBank: false
    }
  ];

  public static recordRevenue(log: Omit<RevenueLog, 'id' | 'timestamp' | 'settledWithCentralBank' | 'jurisdiction'>): RevenueLog {
    const newLog: RevenueLog = {
      ...log,
      id: `REV-FED-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      jurisdiction: 'federal',
      settledWithCentralBank: false
    };
    this.ledgerLogs.unshift(newLog);
    return newLog;
  }

  public static markAsSettled(id: string): boolean {
    const log = this.ledgerLogs.find(l => l.id === id);
    if (log) {
      log.settledWithCentralBank = true;
      return true;
    }
    return false;
  }

  public static getLedgerLogs(): RevenueLog[] {
    return [...this.ledgerLogs];
  }

  public static getStats() {
    const logs = this.getLedgerLogs();
    const totals = logs.reduce((acc, log) => {
      acc.baseDuty += log.baseDutyUSD;
      acc.borderFee += log.borderServiceFeeUSD;
      acc.inspectionFee += log.inspectionFeeUSD;
      acc.penaltyFee += log.penaltyFeeUSD;
      acc.totalCollected += log.totalCollectedUSD;
      return acc;
    }, { baseDuty: 0, borderFee: 0, inspectionFee: 0, penaltyFee: 0, totalCollected: 0 });

    return {
      totalRevenueUSD: totals.totalCollected,
      baseDutiesUSD: totals.baseDuty,
      borderFeesUSD: totals.borderFee,
      inspectionFeesUSD: totals.inspectionFee,
      penaltiesUSD: totals.penaltyFee,
      transactionCount: logs.length,
      unsettledUSD: logs.filter(l => !l.settledWithCentralBank).reduce((sum, l) => sum + l.totalCollectedUSD, 0)
    };
  }
}
