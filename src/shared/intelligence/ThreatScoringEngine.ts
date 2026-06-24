import { ThreatLevel } from './NationalThreatTypes';

export class ThreatScoringEngine {
  private static WEIGHT_MATRIX = {
    critical_infrastructure: 25,
    border_breach: 20,
    customs_bypass: 15,
    revenue_leakage: 12,
    trade_anomaly: 10,
    insider_risk: 18
  };

  public static computeThreatScore(metrics: {
    infrastructureRisk: boolean;
    borderBreaches: number;
    customsBypasses: number;
    revenueLossMill: number;
    tradeAnomalies: number;
    insiderIncidents: number;
  }): { score: number; level: ThreatLevel } {
    let raw = 0;
    
    if (metrics.infrastructureRisk) raw += this.WEIGHT_MATRIX.critical_infrastructure;
    raw += Math.min(metrics.borderBreaches * 5, this.WEIGHT_MATRIX.border_breach);
    raw += Math.min(metrics.customsBypasses * 4, this.WEIGHT_MATRIX.customs_bypass);
    raw += Math.min(metrics.revenueLossMill * 3, this.WEIGHT_MATRIX.revenue_leakage);
    raw += Math.min(metrics.tradeAnomalies * 2, this.WEIGHT_MATRIX.trade_anomaly);
    raw += Math.min(metrics.insiderIncidents * 6, this.WEIGHT_MATRIX.insider_risk);

    const score = Math.min(Math.round(raw), 100);

    let level: ThreatLevel = 'LOW';
    if (score >= 90) level = 'CRITICAL';
    else if (score >= 75) level = 'SEVERE';
    else if (score >= 50) level = 'HIGH';
    else if (score >= 35) level = 'ELEVATED';
    else if (score >= 15) level = 'GUARDED';

    return { score, level };
  }
}
