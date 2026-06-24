import { KRGCustomsRevenueEngine } from './CustomsRevenueEngine';
import { KRGBorderFeeEngine } from './BorderFeeEngine';
import { KRGTaxRevenueEngine } from './TaxRevenueEngine';

export interface LeakageAlert {
  id: string;
  sourceEntityId: string;
  sourceName: string;
  streamType: 'CUSTOMS' | 'BORDER_FEE' | 'TAX';
  anomalyType: 'UNDERVALUATION' | 'FEE_EVASION' | 'DELINQUENT_TAX' | 'TARIFF_MISAPPLY';
  expectedAmountUSD: number;
  actualAmountUSD: number;
  leakageUSD: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  timestamp: string;
}

export class KRGRevenueLeakageDetectionEngine {
  private static manualAlerts: LeakageAlert[] = [];

  public static getAlerts(): LeakageAlert[] {
    const alerts: LeakageAlert[] = [...this.manualAlerts];

    // 1. Synthesize Customs Undervaluations
    const customsAnomalies = KRGCustomsRevenueEngine.evaluateCustomsRevenue().filter(c => !c.isIntegrityOk);
    customsAnomalies.forEach(c => {
      alerts.push({
        id: `LKG-KRG-CST-${c.declarationId}`,
        sourceEntityId: c.declarationId,
        sourceName: c.importerName,
        streamType: 'CUSTOMS',
        anomalyType: c.discrepancyUSD > 0 ? 'TARIFF_MISAPPLY' : 'UNDERVALUATION',
        expectedAmountUSD: c.calculatedDutyUSD,
        actualAmountUSD: c.recordedDutyUSD,
        leakageUSD: Math.abs(c.discrepancyUSD),
        severity: Math.abs(c.discrepancyUSD) > 8000 ? 'CRITICAL' : 'HIGH',
        status: 'OPEN',
        timestamp: new Date().toISOString()
      });
    });

    // 2. Synthesize Border Fee Evasions
    const borderAnomalies = KRGBorderFeeEngine.evaluateBorderFees().filter(b => b.discrepancyUSD > 0);
    borderAnomalies.forEach(b => {
      alerts.push({
        id: `LKG-KRG-BRD-${b.recordId}`,
        sourceEntityId: b.recordId,
        sourceName: `Gate: ${b.gateId}`,
        streamType: 'BORDER_FEE',
        anomalyType: 'FEE_EVASION',
        expectedAmountUSD: b.expectedFeeUSD,
        actualAmountUSD: b.actualPaidUSD,
        leakageUSD: b.discrepancyUSD,
        severity: b.discrepancyUSD > 100 ? 'MEDIUM' : 'LOW',
        status: 'OPEN',
        timestamp: new Date().toISOString()
      });
    });

    // 3. Synthesize Tax Delinquencies
    const taxAnomalies = KRGTaxRevenueEngine.getTaxes().filter(t => t.status === 'DELINQUENT' || t.status === 'UNDER_AUDIT');
    taxAnomalies.forEach(t => {
      alerts.push({
        id: `LKG-KRG-TAX-${t.id}`,
        sourceEntityId: t.id,
        sourceName: t.taxPayer,
        streamType: 'TAX',
        anomalyType: 'DELINQUENT_TAX',
        expectedAmountUSD: t.expectedTaxUSD,
        actualAmountUSD: t.paidTaxUSD,
        leakageUSD: t.expectedTaxUSD - t.paidTaxUSD,
        severity: t.status === 'DELINQUENT' ? 'CRITICAL' : 'MEDIUM',
        status: t.status === 'DELINQUENT' ? 'OPEN' : 'INVESTIGATING',
        timestamp: t.lastFilingDate
      });
    });

    return alerts.sort((a, b) => b.leakageUSD - a.leakageUSD);
  }

  public static addManualAlert(alert: Omit<LeakageAlert, 'id' | 'timestamp' | 'status'>) {
    const newAlert: LeakageAlert = {
      ...alert,
      id: `LKG-KRG-MAN-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'OPEN',
      timestamp: new Date().toISOString()
    };
    this.manualAlerts.push(newAlert);
  }

  public static updateStatus(id: string, nextStatus: 'OPEN' | 'INVESTIGATING' | 'RESOLVED'): boolean {
    const alert = this.manualAlerts.find(a => a.id === id);
    if (alert) {
      alert.status = nextStatus;
      return true;
    }
    return false;
  }
}
