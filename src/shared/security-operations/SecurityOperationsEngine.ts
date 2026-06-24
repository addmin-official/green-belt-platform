import { ThreatScoringEngine } from '../intelligence/ThreatScoringEngine';
import { NationalIntelligenceRegistry } from '../intelligence/NationalIntelligenceRegistry';
import { CrisisMonitoringEngine } from './CrisisMonitoringEngine';

export class SecurityOperationsEngine {
  public static executeUnifiedReview(jurisdiction: 'federal' | 'krg' | 'joint'): {
    calculatedScore: number;
    highestCrisisPercent: number;
    securityActionLevel: string;
    needsDeployment: boolean;
  } {
    const threats = NationalIntelligenceRegistry.getThreats(jurisdiction);
    const crisis = CrisisMonitoringEngine.monitorCrisisStatus();

    const scoreData = ThreatScoringEngine.computeThreatScore({
      infrastructureRisk: crisis.overallDisruptionPercent > 40,
      borderBreaches: threats.filter(t => t.sourceDomain === 'border').length,
      customsBypasses: threats.filter(t => t.sourceDomain === 'customs').length,
      revenueLossMill: threats.filter(t => t.sourceDomain === 'revenue').length,
      tradeAnomalies: threats.filter(t => t.sourceDomain === 'trade').length,
      insiderIncidents: threats.filter(t => t.sourceDomain === 'integrity').length
    });

    const needsDeployment = scoreData.score > 60;

    let securityActionLevel = 'دۆخی ئاسایی (ROUTINE)';
    if (scoreData.score > 85) securityActionLevel = 'بارودۆخی نائاسایی نیشتمانی (DEFCON 1)';
    else if (scoreData.score > 65) securityActionLevel = 'جاهیزیەتی باڵا (HIGH_警戒)';
    else if (scoreData.score > 45) securityActionLevel = 'کواتی چاودێری زیاتر (STANDBY)';

    return {
      calculatedScore: scoreData.score,
      highestCrisisPercent: crisis.overallDisruptionPercent,
      securityActionLevel,
      needsDeployment
    };
  }
}
