export type ThreatLevel = 'LOW' | 'GUARDED' | 'ELEVATED' | 'HIGH' | 'SEVERE' | 'CRITICAL';

export type AlertSeverity = 'INFO' | 'WARNING' | 'HIGH_PRIORITY' | 'EMERGENCY' | 'NATIONAL_SECURITY_EVENT';

export interface ThreatEvent {
  id: string;
  sourceDomain: 'border' | 'customs' | 'revenue' | 'trade' | 'integrity' | 'workforce' | 'identity' | 'rbac' | 'security';
  jurisdiction: 'federal' | 'krg' | 'joint';
  titleEn: string;
  titleKu: string;
  descriptionEn: string;
  descriptionKu: string;
  indicatorWeight: number; // 0 to 100
  timestamp: string;
  sealedHash: string;
  associatedEntities: string[]; // IDs of persons, organizations, etc.
}

export interface WatchlistEntity {
  id: string;
  type: 'person' | 'organization' | 'cargo' | 'border_crossing' | 'license' | 'importer_exporter';
  nameEn: string;
  nameKu: string;
  riskRating: 'low' | 'medium' | 'high' | 'critical';
  addedByJurisdiction: 'federal' | 'krg' | 'joint';
  sealedDate: string;
  reasonEn: string;
  reasonKu: string;
}

export interface RelationshipEdge {
  sourceId: string;
  targetId: string;
  type: 'member_of' | 'employed_by' | 'owns' | 'traded_by' | 'cleared_at' | 'correlated_with' | 'investigated_under';
  weight: number; // strength or frequency
}

export interface IntelligenceSummary {
  summaryId: string;
  titleKu: string;
  titleEn: string;
  analyzedBy: string;
  classification: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
  contentKu: string;
  contentEn: string;
  timestamp: string;
  signatureHash: string;
}
