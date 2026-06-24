import { RiskSignal, Jurisdiction, RiskSeverity } from './AuditTypes';

export class RiskSignalEngine {
  private static riskSignals: RiskSignal[] = [
    {
      id: 'RISK-001',
      targetType: 'OFFICER',
      targetId: 'FED-OFF-912',
      targetName: 'Officer Noori Kamal (Z-104)',
      jurisdiction: 'federal',
      riskFactors: ['Repeated overriding of tariff alerts on industrial machinery imports', 'Frequent shifts logged outside assigned schedule'],
      riskIndicators: ['High override ratio: 82%', 'Odd hours activity: 02:00 AM - 04:00 AM'],
      anomalyScore: 89,
      severity: 'CRITICAL',
      detectedAt: '2026-06-08T10:45:00Z'
    },
    {
      id: 'RISK-002',
      targetType: 'TRADER',
      targetId: 'TRD-904',
      targetName: 'Al-Rafidain Freight Corp',
      jurisdiction: 'federal',
      riskFactors: ['Mismatch in weights recorded at weigh-bridge vs cargo customs document', 'Underpriced invoices submitted for chemical materials'],
      riskIndicators: ['Weight mismatch: +6.7 tons', 'Invoiced value: 35% lower than national average code 2811'],
      anomalyScore: 78,
      severity: 'HIGH',
      detectedAt: '2026-06-08T11:20:00Z'
    },
    {
      id: 'RISK-003',
      targetType: 'OFFICER',
      targetId: 'KRG-OFF-302',
      targetName: 'Officer Rekawt Bakir (IK-X4)',
      jurisdiction: 'krg',
      riskFactors: ['Bypassing agricultural inspection limits for grains', 'Clearing heavy trucks without scale confirmation'],
      riskIndicators: ['Agricultural checklist skipped: 9 consecutive loads', 'Zero weigh-bridge scale logs linked'],
      anomalyScore: 85,
      severity: 'CRITICAL',
      detectedAt: '2026-06-08T15:10:00Z'
    },
    {
      id: 'RISK-004',
      targetType: 'BORDER_GATE',
      targetId: 'GATE-BA',
      targetName: 'Bashmakh Gate Segment 2',
      jurisdiction: 'krg',
      riskFactors: ['Repetitive transit duration anomalies for oil container convoys', 'Manual declaration entries bypassing central server validation'],
      riskIndicators: ['Delayed transit: average +4 hours unexplained route delay', 'Offline entries: 12 cargo logs generated offline'],
      anomalyScore: 68,
      severity: 'MEDIUM',
      detectedAt: '2026-06-09T01:30:00Z'
    }
  ];

  public static getSignals(): RiskSignal[] {
    return this.riskSignals;
  }

  public static getSignalsByJurisdiction(jurisdiction: Jurisdiction): RiskSignal[] {
    if (jurisdiction === 'joint') {
      return this.riskSignals;
    }
    return this.riskSignals.filter(s => s.jurisdiction === jurisdiction);
  }

  public static triggerMockAlert(
    targetType: 'OFFICER' | 'TRADER' | 'BORDER_GATE' | 'CHANNEL',
    targetId: string,
    targetName: string,
    jurisdiction: Jurisdiction,
    riskFactors: string[],
    riskIndicators: string[],
    anomalyScore: number,
    severity: RiskSeverity
  ): RiskSignal {
    const id = `RISK-${String(this.riskSignals.length + 1).padStart(3, '0')}`;
    const signal: RiskSignal = {
      id,
      targetType,
      targetId,
      targetName,
      jurisdiction,
      riskFactors,
      riskIndicators,
      anomalyScore,
      severity,
      detectedAt: new Date().toISOString()
    };
    this.riskSignals.push(signal);
    return signal;
  }
}
