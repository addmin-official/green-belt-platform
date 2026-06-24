import { ThreatEvent } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';

export interface CorrelationCluster {
  id: string;
  threatIds: string[];
  sharedEntities: string[];
  correlationFactor: number; // 0 to 1
  descriptionEn: string;
  descriptionKu: string;
}

export class ThreatCorrelationEngine {
  public static findCorrelations(): CorrelationCluster[] {
    const threats = NationalIntelligenceRegistry.getThreats();
    const clusters: CorrelationCluster[] = [];

    // Simple entity-based correlation engine
    for (let i = 0; i < threats.length; i++) {
      for (let j = i + 1; j < threats.length; j++) {
        const t1 = threats[i];
        const t2 = threats[j];

        const commonEntities = t1.associatedEntities.filter(ent => t2.associatedEntities.includes(ent));
        if (commonEntities.length > 0) {
          const factor = commonEntities.length * 0.4 + (t1.sourceDomain !== t2.sourceDomain ? 0.35 : 0.1);
          const finalFactor = Math.min(factor, 1.0);

          clusters.push({
            id: `CL-CORR-${t1.id.slice(-3)}-${t2.id.slice(-3)}`,
            threatIds: [t1.id, t2.id],
            sharedEntities: commonEntities,
            correlationFactor: parseFloat(finalFactor.toFixed(2)),
            descriptionEn: `Multi-domain correlation links ${t1.sourceDomain} and ${t2.sourceDomain} via entity overlap.`,
            descriptionKu: `کارلێکی پەیوەندی نێوان کایەی ${t1.sourceDomain} و ${t2.sourceDomain} بەهۆی یەکگرتنی ناسنامەکان دۆزرایەوە.`
          });
        }
      }
    }

    return clusters;
  }
}
