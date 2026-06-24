import { NationalIntelligenceRegistry } from '../intelligence/NationalIntelligenceRegistry';

export interface CrisisMetric {
  categoryKu: string;
  intensityUnit: string;
  status: 'STABLE' | 'ELEVATED_RISK' | 'CRITICAL_DISRUPTION';
  percentageImbalance: number;
}

export class CrisisMonitoringEngine {
  public static monitorCrisisStatus(): {
    overallDisruptionPercent: number;
    crisisMetrics: CrisisMetric[];
  } {
    const threats = NationalIntelligenceRegistry.getThreats();

    // Dynamically calculate based on real threat events in registry
    const borderDisruptions = threats.filter(t => t.sourceDomain === 'border').length;
    const fraudSpikes = threats.filter(t => t.sourceDomain === 'customs' || t.sourceDomain === 'revenue').length;
    const systemFails = threats.filter(t => t.sourceDomain === 'rbac' || t.sourceDomain === 'security').length;

    const metrics: CrisisMetric[] = [
      {
        categoryKu: 'سیستمی ئاسایشی سنوور',
        intensityUnit: 'سەرپێچی سەرپەرشتیار',
        status: borderDisruptions > 1 ? 'CRITICAL_DISRUPTION' : borderDisruptions > 0 ? 'ELEVATED_RISK' : 'STABLE',
        percentageImbalance: borderDisruptions * 15
      },
      {
        categoryKu: 'داهات و کۆنتڕۆڵی باج',
        intensityUnit: 'فێڵی باجی مانیفێست',
        status: fraudSpikes > 1 ? 'CRITICAL_DISRUPTION' : fraudSpikes > 0 ? 'ELEVATED_RISK' : 'STABLE',
        percentageImbalance: fraudSpikes * 22
      },
      {
        categoryKu: 'شیاوی داتاکانی نزاهەت',
        intensityUnit: 'جێگۆڕکێی مۆڵەتی ناتەبا',
        status: systemFails > 1 ? 'CRITICAL_DISRUPTION' : systemFails > 0 ? 'ELEVATED_RISK' : 'STABLE',
        percentageImbalance: systemFails * 18
      }
    ];

    const overallDisruptionPercent = Math.min(
      Math.round(metrics.reduce((acc, curr) => acc + curr.percentageImbalance, 0)),
      100
    );

    return {
      overallDisruptionPercent,
      crisisMetrics: metrics
    };
  }
}
