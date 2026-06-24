import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';

export interface CriticalSovereignNode {
  nodeId: string;
  degreeOfCentrality: number;
  implicatedThreatCount: number;
  calculatedRiskIndex: number; // 0 to 100
}

export class NetworkAnalysisEngine {
  public static analyzeCentrality(): CriticalSovereignNode[] {
    const relationships = NationalIntelligenceRegistry.getRelationships();
    const threats = NationalIntelligenceRegistry.getThreats();

    const degreeMap: Record<string, number> = {};
    const implicatedThreatMap: Record<string, Set<string>> = {};

    relationships.forEach(rel => {
      degreeMap[rel.sourceId] = (degreeMap[rel.sourceId] || 0) + 1;
      degreeMap[rel.targetId] = (degreeMap[rel.targetId] || 0) + 1;
    });

    threats.forEach(t => {
      t.associatedEntities.forEach(ent => {
        if (!implicatedThreatMap[ent]) {
          implicatedThreatMap[ent] = new Set<string>();
        }
        implicatedThreatMap[ent].add(t.id);
      });
    });

    const uniqueNodes = Array.from(new Set([
      ...relationships.map(r => r.sourceId),
      ...relationships.map(r => r.targetId),
      ...Object.keys(implicatedThreatMap)
    ]));

    const analyzedNodes: CriticalSovereignNode[] = uniqueNodes.map(nodeId => {
      const degreeOfCentrality = degreeMap[nodeId] || 0;
      const implicatedThreatCount = implicatedThreatMap[nodeId]?.size || 0;
      
      let calculatedRiskIndex = degreeOfCentrality * 12 + implicatedThreatCount * 25;
      if (calculatedRiskIndex > 100) calculatedRiskIndex = 100;

      return {
        nodeId,
        degreeOfCentrality,
        implicatedThreatCount,
        calculatedRiskIndex
      };
    });

    // Sort by highest risk
    return analyzedNodes.sort((a, b) => b.calculatedRiskIndex - a.calculatedRiskIndex);
  }
}
