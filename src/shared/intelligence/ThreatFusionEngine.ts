import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';
import { ThreatEvent, ThreatLevel } from './NationalThreatTypes';
import { SovereignThreatLedger } from './SovereignThreatLedger';

export class ThreatFusionEngine {
  public static fuseCrossDomainEvents(jurisdiction: 'federal' | 'krg' | 'joint'): {
    unifiedScore: number;
    threatLevel: ThreatLevel;
    activeCorrelations: number;
    implicatedEntities: string[];
    compiledProfiles: Array<{ domain: string; count: number; maxWeight: number }>;
  } {
    const events = NationalIntelligenceRegistry.getThreats(jurisdiction);
    const domainMap: Record<string, { count: number; maxWeight: number }> = {};
    const implicatedSet = new Set<string>();

    events.forEach(ev => {
      if (!domainMap[ev.sourceDomain]) {
        domainMap[ev.sourceDomain] = { count: 0, maxWeight: 0 };
      }
      domainMap[ev.sourceDomain].count++;
      if (ev.indicatorWeight > domainMap[ev.sourceDomain].maxWeight) {
        domainMap[ev.sourceDomain].maxWeight = ev.indicatorWeight;
      }
      ev.associatedEntities.forEach(ent => implicatedSet.add(ent));
    });

    const profiles = Object.entries(domainMap).map(([domain, data]) => ({
      domain,
      count: data.count,
      maxWeight: data.maxWeight
    }));

    // Threat fusion calculation: sum of peak indicators + fractional bonus for cross-domain counts
    let rawScore = 0;
    profiles.forEach(p => {
      rawScore += p.maxWeight * 0.7 + p.count * 5;
    });

    if (rawScore > 100) rawScore = 100;
    rawScore = Math.round(rawScore);

    let threatLevel: ThreatLevel = 'LOW';
    if (rawScore > 85) threatLevel = 'CRITICAL';
    else if (rawScore > 70) threatLevel = 'SEVERE';
    else if (rawScore > 50) threatLevel = 'HIGH';
    else if (rawScore > 35) threatLevel = 'ELEVATED';
    else if (rawScore > 15) threatLevel = 'GUARDED';

    return {
      unifiedScore: rawScore,
      threatLevel,
      activeCorrelations: events.length > 1 ? events.length - 1 : 0,
      implicatedEntities: Array.from(implicatedSet),
      compiledProfiles: profiles
    };
  }
}
