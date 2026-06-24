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

export class KRGTaxRevenueEngine {
  private static taxRegistry: TaxRecord[] = [
    {
      id: 'TAX-KRG-PAY-0412',
      taxPayer: 'Korek Telecom Erbil',
      sector: 'TELECOM',
      fiscalYear: 2025,
      expectedTaxUSD: 950000,
      paidTaxUSD: 950000,
      status: 'PAID',
      lastFilingDate: '2026-03-12T10:00:00Z'
    },
    {
      id: 'TAX-KRG-PAY-0413',
      taxPayer: 'Nokan Strategic Energy',
      sector: 'OIL_GAS',
      fiscalYear: 2025,
      expectedTaxUSD: 2100000,
      paidTaxUSD: 1800000,
      status: 'UNDER_AUDIT',
      lastFilingDate: '2026-04-10T11:45:00Z'
    },
    {
      id: 'TAX-KRG-PAY-0414',
      taxPayer: 'RT Bank Erbil Headquarters',
      sector: 'FINANCE',
      fiscalYear: 2025,
      expectedTaxUSD: 600000,
      paidTaxUSD: 600000,
      status: 'PAID',
      lastFilingDate: '2026-03-18T15:00:00Z'
    },
    {
      id: 'TAX-KRG-PAY-0415',
      taxPayer: 'Qaiwan Housing and Construction',
      sector: 'CONSTRUCTION',
      fiscalYear: 2025,
      expectedTaxUSD: 1100000,
      paidTaxUSD: 350000,
      status: 'DELINQUENT',
      lastFilingDate: '2026-05-02T13:30:00Z'
    }
  ];

  public static getTaxes(): TaxRecord[] {
    return [...this.taxRegistry];
  }

  public static recordTaxPayment(payment: Omit<TaxRecord, 'id' | 'status' | 'lastFilingDate'>): TaxRecord {
    const id = `TAX-KRG-PAY-${Math.floor(400 + Math.random() * 9500)}`;
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
