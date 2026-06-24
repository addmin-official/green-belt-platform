import { ThreatLevel } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';

export interface StrategicRiskMatrix {
  borderRiskLevel: ThreatLevel;
  customsRiskLevel: ThreatLevel;
  revenueRiskLevel: ThreatLevel;
  tradeRiskLevel: ThreatLevel;
  overallNationalSecurityIndex: number; // 0 to 100
}

export class StrategicRiskEngine {
  public static assessStrategicRisks(): StrategicRiskMatrix {
    const threats = NationalIntelligenceRegistry.getThreats();

    const getDomainRisk = (domain: string): ThreatLevel => {
      const domainThreats = threats.filter(t => t.sourceDomain === domain);
      if (domainThreats.length === 0) return 'LOW';
      
      const maxWeight = Math.max(...domainThreats.map(t => t.indicatorWeight));
      if (maxWeight >= 80) return 'CRITICAL';
      if (maxWeight >= 65) return 'SEVERE';
      if (maxWeight >= 50) return 'HIGH';
      if (maxWeight >= 35) return 'ELEVATED';
      return 'GUARDED';
    };

    // Overall index calculation
    const weightsSum = threats.reduce((acc, curr) => acc + curr.indicatorWeight, 0);
    let overallIndex = threats.length > 0 ? weightsSum / threats.length : 12;
    // Cap index
    overallIndex = Math.min(Math.round(overallIndex), 100);

    return {
      borderRiskLevel: getDomainRisk('border'),
      customsRiskLevel: getDomainRisk('customs'),
      revenueRiskLevel: getDomainRisk('revenue'),
      tradeRiskLevel: getDomainRisk('trade'),
      overallNationalSecurityIndex: overallIndex
    };
  }
}
