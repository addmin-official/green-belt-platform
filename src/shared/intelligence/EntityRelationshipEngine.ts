import { RelationshipEdge } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';

export class EntityRelationshipEngine {
  public static mapRelationship(sourceId: string, targetId: string, type: RelationshipEdge['type'], weight = 50): void {
    // Avoid double entries
    const exists = NationalIntelligenceRegistry.getRelationships().find(r => 
      r.sourceId === sourceId && r.targetId === targetId && r.type === type
    );
    if (!exists) {
      NationalIntelligenceRegistry.addRelationship(sourceId, targetId, type, weight);
    }
  }

  public static getTransitiveConnections(entityId: string): Array<{ targetId: string; type: string; weight: number }> {
    const list = NationalIntelligenceRegistry.getRelationships();
    const connections: Array<{ targetId: string; type: string; weight: number }> = [];

    list.forEach(edge => {
      if (edge.sourceId === entityId) {
        connections.push({ targetId: edge.targetId, type: edge.type, weight: edge.weight });
      } else if (edge.targetId === entityId) {
        connections.push({ targetId: edge.sourceId, type: edge.type, weight: edge.weight });
      }
    });

    return connections;
  }
}
