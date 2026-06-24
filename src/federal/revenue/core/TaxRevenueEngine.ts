export interface TaxRecord {
  id: string;
  taxPayer: string;
  sector: 'TELECOM' | 'OIL_GAS' | 'FINANCE' | 'RETAIL' | 'CONSTRUCTION';
  fiscalYear: number;
  expectedTaxUSD: number;
  paidTaxUSD: number;
  status: 'PAID' | 'DELINQUENT' | 'UNDER_AUDIT';
  lastFilingDate: string;
}

export class FederalTaxRevenueEngine {
  private static taxRegistry: TaxRecord[] = [
    {
      id: 'TAX-FED-PAY-0391',
      taxPayer: 'Asiacell Telecom Baghdad',
      sector: 'TELECOM',
      fiscalYear: 2025,
      expectedTaxUSD: 1200000,
      paidTaxUSD: 1200000,
      status: 'PAID',
      lastFilingDate: '2026-03-15T11:00:00Z'
    },
    {
      id: 'TAX-FED-PAY-0392',
      taxPayer: 'Rafidain Petroleum Services',
      sector: 'OIL_GAS',
      fiscalYear: 2025,
      expectedTaxUSD: 3100000,
      paidTaxUSD: 2450000,
      status: 'UNDER_AUDIT',
      lastFilingDate: '2026-04-02T09:30:00Z'
    },
    {
      id: 'TAX-FED-PAY-0393',
      taxPayer: 'Al-Mansour Banking Group',
      sector: 'FINANCE',
      fiscalYear: 2025,
      expectedTaxUSD: 850000,
      paidTaxUSD: 850000,
      status: 'PAID',
      lastFilingDate: '2026-03-20T14:15:00Z'
    },
    {
      id: 'TAX-FED-PAY-0394',
      taxPayer: 'Baghdad Central Shopping Malls',
      sector: 'RETAIL',
      fiscalYear: 2025,
      expectedTaxUSD: 450000,
      paidTaxUSD: 120000,
      status: 'DELINQUENT',
      lastFilingDate: '2026-05-10T10:00:00Z'
    }
  ];

  public static getTaxes(): TaxRecord[] {
    return [...this.taxRegistry];
  }

  public static recordTaxPayment(payment: Omit<TaxRecord, 'id' | 'status' | 'lastFilingDate'>): TaxRecord {
    const id = `TAX-FED-PAY-${Math.floor(400 + Math.random() * 9500)}`;
    const status = payment.paidTaxUSD >= payment.expectedTaxUSD ? 'PAID' : 'UNDER_AUDIT';
    
    const newRecord: TaxRecord = {
      ...payment,
      id,
      status,
      lastFilingDate: new Date().toISOString()
    };
    this.taxRegistry.push(newRecord);
    return newRecord;
  }

  public static getTotals() {
    return this.taxRegistry.reduce((acc, curr) => {
      acc.totalExpected += curr.expectedTaxUSD;
      acc.totalPaid += curr.paidTaxUSD;
      acc.totalUnpaid += (curr.expectedTaxUSD - curr.paidTaxUSD);
      if (curr.status === 'DELINQUENT') acc.delinquentCount += 1;
      if (curr.status === 'UNDER_AUDIT') acc.underAuditCount += 1;
      return acc;
    }, { totalExpected: 0, totalPaid: 0, totalUnpaid: 0, delinquentCount: 0, underAuditCount: 0 });
  }

  public static getSectorBreakdown(): Record<string, number> {
    return this.taxRegistry.reduce((acc, curr) => {
      acc[curr.sector] = (acc[curr.sector] || 0) + curr.paidTaxUSD;
      return acc;
    }, {} as Record<string, number>);
  }
}
