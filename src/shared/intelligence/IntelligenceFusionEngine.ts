import { ThreatFusionEngine } from './ThreatFusionEngine';
import { IntelligenceSummary, ThreatLevel } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';

export interface FusedIntelligenceProfile {
  jurisdiction: 'federal' | 'krg' | 'joint';
  compositeThreatIndex: number; // 0 to 100
  threatLevel: ThreatLevel;
  associatedSummaries: IntelligenceSummary[];
  reconciliationRequired: boolean;
  lastUpdated: string;
}

export class IntelligenceFusionEngine {
  public static fuseIntelligence(jurisdiction: 'federal' | 'krg' | 'joint'): FusedIntelligenceProfile {
    // 1. Get raw Threat Fusion indicators
    const fusionData = ThreatFusionEngine.fuseCrossDomainEvents(jurisdiction);
    
    // 2. Fetch permitted intelligence summaries
    const summaries = NationalIntelligenceRegistry.getSummaries();
    
    // Joint dashboard sees any summary, other desks see target jurisdiction summaries
    const permittedSummaries = summaries.filter(s => {
      if (jurisdiction === 'joint') return true;
      if (jurisdiction === 'federal') return s.analyzedBy === 'FEDERAL_GIS' || s.classification === 'unclassified';
      return s.analyzedBy === 'KRG_SECURITY_SERVICE' || s.classification === 'unclassified';
    });

    const reconciliationRequired = fusionData.unifiedScore > 70 && jurisdiction === 'joint';

    return {
      jurisdiction,
      compositeThreatIndex: fusionData.unifiedScore,
      threatLevel: fusionData.threatLevel,
      associatedSummaries: permittedSummaries,
      reconciliationRequired,
      lastUpdated: new Date().toISOString()
    };
  }
}
