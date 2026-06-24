import { RevenueLeakageAlert, Jurisdiction } from './AuditTypes';

export class RevenueLeakageAnalysisEngine {
  private static leakageAlerts: RevenueLeakageAlert[] = [
    {
      id: 'LEAK-001',
      title: 'Under-reported Machinery Tariffs (Ibraham Khalil)',
      jurisdiction: 'federal',
      expectedValueUSD: 850000,
      actualCalculatedUSD: 420000,
      leakageAmountUSD: 430000,
      leakageType: 'TARIFF_UNDERVALUATION',
      detectedAt: '2026-06-08T11:45:00Z',
      status: 'INVESTIGATING',
      corridorId: 'COR-IK'
    },
    {
      id: 'LEAK-002',
      title: 'Haji Omeran Tariff Fee Bypass Checkpoint',
      jurisdiction: 'krg',
      expectedValueUSD: 300000,
      actualCalculatedUSD: 180000,
      leakageAmountUSD: 120000,
      leakageType: 'FEE_BYPASS',
      detectedAt: '2026-06-08T16:10:00Z',
      status: 'PENDING',
      corridorId: 'COR-HO'
    },
    {
      id: 'LEAK-003',
      title: 'Umm Qasr Sea Cargo Classification Gap',
      jurisdiction: 'federal',
      expectedValueUSD: 1200000,
      actualCalculatedUSD: 950000,
      leakageAmountUSD: 250000,
      leakageType: 'COLLECTION_GAP',
      detectedAt: '2026-06-09T08:30:00Z',
      status: 'PENDING',
      corridorId: 'COR-UQ'
    }
  ];

  public static getAlerts(): RevenueLeakageAlert[] {
    return this.leakageAlerts;
  }

  public static getAlertsByJurisdiction(jurisdiction: Jurisdiction): RevenueLeakageAlert[] {
    if (jurisdiction === 'joint') {
      return this.leakageAlerts;
    }
    return this.leakageAlerts.filter(a => a.jurisdiction === jurisdiction);
  }

  public static createLeakageAlert(
    title: string,
    jurisdiction: Jurisdiction,
    expectedValueUSD: number,
    actualCalculatedUSD: number,
    leakageType: 'TARIFF_UNDERVALUATION' | 'FEE_BYPASS' | 'CROSS_BORDER_SMUGGLING' | 'COLLECTION_GAP',
    corridorId: string
  ): RevenueLeakageAlert {
    const id = `LEAK-${String(this.leakageAlerts.length + 1).padStart(3, '0')}`;
    const leakageAmountUSD = expectedValueUSD - actualCalculatedUSD;
    const alert: RevenueLeakageAlert = {
      id,
      title,
      jurisdiction,
      expectedValueUSD,
      actualCalculatedUSD,
      leakageAmountUSD,
      leakageType,
      detectedAt: new Date().toISOString(),
      status: 'PENDING',
      corridorId
    };
    this.leakageAlerts.push(alert);
    return alert;
  }

  public static updateAlertStatus(id: string, status: 'PENDING' | 'INVESTIGATING' | 'MITIGATED'): boolean {
    const alert = this.leakageAlerts.find(a => a.id === id);
    if (alert) {
      alert.status = status;
      return true;
    }
    return false;
  }

  public static calculateIntegrityScore(jurisdiction: Jurisdiction): number {
    const alerts = this.getAlertsByJurisdiction(jurisdiction);
    if (alerts.length === 0) return 100;
    
    // Integrity index goes down based on leakage density
    const activeLeakage = alerts
      .filter(a => a.status !== 'MITIGATED')
      .reduce((sum, current) => sum + current.leakageAmountUSD, 0);

    const score = 100 - Math.min(Math.round(activeLeakage / 20000), 45); 
    return Math.max(score, 55);
  }
}
