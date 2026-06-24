import { Jurisdiction } from './AuditTypes';

export interface CollectionGapSummary {
  billingSource: string;
  billedUSD: number;
  clearedBankUSD: number;
  activeGapUSD: number;
  leakagePercentage: number;
  unreconciledInvoicesCount: number;
}

export class CollectionGapEngine {
  public static fetchCollectionGaps(jurisdiction: Jurisdiction): CollectionGapSummary[] {
    if (jurisdiction === 'federal') {
      return [
        {
          billingSource: 'Umm Qasr South Terminal Port Customs',
          billedUSD: 4500000,
          clearedBankUSD: 4150000,
          activeGapUSD: 350000,
          leakagePercentage: 7.7,
          unreconciledInvoicesCount: 14
        },
        {
          billingSource: 'Baghdad Airport Freight Hub',
          billedUSD: 1800000,
          clearedBankUSD: 1780000,
          activeGapUSD: 20000,
          leakagePercentage: 1.1,
          unreconciledInvoicesCount: 3
        }
      ];
    } else {
      return [
        {
          billingSource: 'Ibrahim Khalil Gate Regional Vault Office',
          billedUSD: 3200000,
          clearedBankUSD: 2980000,
          activeGapUSD: 220000,
          leakagePercentage: 6.8,
          unreconciledInvoicesCount: 9
        },
        {
          billingSource: 'Bashmakh Gate Regional Desk',
          billedUSD: 1200000,
          clearedBankUSD: 1150000,
          activeGapUSD: 50000,
          leakagePercentage: 4.1,
          unreconciledInvoicesCount: 4
        }
      ];
    }
  }
}
