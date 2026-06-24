import { RevenueLog } from '../../../shared/customs/CustomsTypes';

export class KRGCustomsRevenueLedger {
  private static ledgerLogs: RevenueLog[] = [
    {
      id: 'REV-KRG-001',
      declarationId: 'DECL-KRG-80021',
      timestamp: new Date(Date.now() - 3600000 * 30).toISOString(),
      jurisdiction: 'krg',
      baseDutyUSD: 4120,
      borderServiceFeeUSD: 980,
      inspectionFeeUSD: 80,
      penaltyFeeUSD: 0,
      totalCollectedUSD: 5180,
      settledWithCentralBank: true
    },
    {
      id: 'REV-KRG-002',
      declarationId: 'DECL-KRG-80025',
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      jurisdiction: 'krg',
      baseDutyUSD: 12000,
      borderServiceFeeUSD: 1850,
      inspectionFeeUSD: 80,
      penaltyFeeUSD: 300, // penalty for regional exemption check
      totalCollectedUSD: 14230,
      settledWithCentralBank: false
    }
  ];

  public static recordRevenue(log: Omit<RevenueLog, 'id' | 'timestamp' | 'settledWithCentralBank' | 'jurisdiction'>): RevenueLog {
    const newLog: RevenueLog = {
      ...log,
      id: `REV-KRG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      jurisdiction: 'krg',
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
