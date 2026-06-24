import { ThreatEvent, WatchlistEntity, RelationshipEdge, IntelligenceSummary } from './NationalThreatTypes';
import { SovereignThreatLedger } from './SovereignThreatLedger';

export class NationalIntelligenceRegistry {
  private static threatEvents: ThreatEvent[] = [];
  private static watchlist: WatchlistEntity[] = [];
  private static relationships: RelationshipEdge[] = [];
  private static summaries: IntelligenceSummary[] = [];

  // Initialize with some framework-consistent starting state
  static {
    // Generate empty or baseline framework-authorized signals
    this.addThreat({
      id: "TE-FED-201",
      sourceDomain: "border",
      jurisdiction: "federal",
      titleEn: "Discrepancies in Customs Clearance Logs at Southern Ports",
      titleKu: "ناڕێکی لە لۆگەکانی پاککردنەوەی گومرگ لە بەندەرەکانی باشوور",
      descriptionEn: "Unreconciled cargo manifest sequences detected between Federal Customs Registry and Southern Seaport Entry Points.",
      descriptionKu: "دۆزینەوەی زنجیرە نەخۆشەکانی مانیفێستی بار لە نێوان تۆماری گومرگی فیدراڵ و دەروازە دەریاکانی باشوور.",
      indicatorWeight: 45,
      timestamp: new Date(Date.now() - 4 * 3600000).toISOString(),
      sealedHash: "STL-HASH-8B77C2",
      associatedEntities: ["ORG-TRADER-901"]
    });

    this.addThreat({
      id: "TE-KRG-202",
      sourceDomain: "customs",
      jurisdiction: "krg",
      titleEn: "Unapproved Tariff Overrides Detected near Northern Borders",
      titleKu: "دەستکاریکردنی تاریفەی گومرگی لە سنوورەکانی باکوور",
      descriptionEn: "Manual overrides on vehicle tax rates registered at regional checkpoints without federal authorization signatures.",
      descriptionKu: "دەستکاری دەستی تاریفە نووسراوەکان بەبێ مۆری پەسەندکردنی فیدراڵ لە دەروازە سنوورییەکان.",
      indicatorWeight: 68,
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      sealedHash: "STL-HASH-CC918",
      associatedEntities: ["EMP-KRG-842", "LIC-TRADE-402"]
    });

    this.addThreat({
      id: "TE-JNT-203",
      sourceDomain: "integrity",
      jurisdiction: "joint",
      titleEn: "Joint High-Risk Trade Manipulation Loophole Identified",
      titleKu: "دۆزینەوەی کەلێنێکی فێڵ و تەڵەکەبازی بازرگانی هاوبەش",
      descriptionEn: "An exporter utilizing mismatching licenses to pass dual-use chemicals through central checkpoints under KRG-issued agricultural transport manifests.",
      descriptionKu: "هەناردەکارێک مۆڵەتی ناتەبا بەکاردێنێ بۆ تێپەڕاندنی ماددەی کیمیایی دوو-بەکارهێنەر تاقیکراو بە مانیفێستی گواستنەوەی کشتوکاڵی هەرێم.",
      indicatorWeight: 89,
      timestamp: new Date(Date.now() - 1 * 3600000).toISOString(),
      sealedHash: "STL-HASH-FE771",
      associatedEntities: ["ORG-EXP-77", "LIC-FED-220", "LIC-KRG-401"]
    });

    // Seed Watchlists
    this.addWatchlist({
      id: "ORG-TRADER-901",
      type: "organization",
      nameEn: "Afaq Al-Janub Trade & Logistics",
      nameKu: "کۆمپانیای ئاسۆکانی باشوور بۆ ئەندازیاری و گواستنەوە",
      riskRating: "medium",
      addedByJurisdiction: "federal",
      sealedDate: new Date().toISOString(),
      reasonEn: "Consistent undervaluation of electronic shipments under federal manifests.",
      reasonKu: "کەمکردنەوەی بەردەوامی بەهای بارە ئەلیکترۆنییەکان لە مانیفێستی گومرگی فیدراڵ."
    });

    this.addWatchlist({
      id: "ORG-EXP-77",
      type: "organization",
      nameEn: "Zagros Chemical Logistics Group",
      nameKu: "گرووپی لۆجستی زاگرۆس بۆ ماددە کیمیاییەکان",
      riskRating: "critical",
      addedByJurisdiction: "joint",
      sealedDate: new Date().toISOString(),
      reasonEn: "Under ongoing joint investigation for dual-use chemical transit manipulation.",
      reasonKu: "لە ژێر لێکۆڵینەوەیەکی هاوبەشی چڕ بۆ تێپەڕاندنی نایاسایی ماددە کیمیاییەکان."
    });

    this.addWatchlist({
      id: "EMP-KRG-842",
      type: "person",
      nameEn: "Officer R. Barzani",
      nameKu: "ئەفسەر ڕ. بارزانی",
      riskRating: "high",
      addedByJurisdiction: "krg",
      sealedDate: new Date().toISOString(),
      reasonEn: "Flagged for recurrent system overrides during clearance window times.",
      reasonKu: "تۆمارکردنی سەرپێچی دەستی مۆد سوپەر-سیستم لە کاتی شیفتەکەی."
    });

    // Seed Relationships
    this.addRelationship("ORG-EXP-77", "LIC-KRG-401", "owns", 85);
    this.addRelationship("ORG-EXP-77", "LIC-FED-220", "traded_by", 90);
    this.addRelationship("TE-JNT-203", "ORG-EXP-77", "correlated_with", 100);
  }

  public static addThreat(threat: ThreatEvent): void {
    this.threatEvents.push(threat);
    SovereignThreatLedger.sealAndPublish('threat_event', threat);
  }

  public static getThreats(jurisdiction?: 'federal' | 'krg' | 'joint'): ThreatEvent[] {
    if (!jurisdiction) return [...this.threatEvents];
    return this.threatEvents.filter(t => t.jurisdiction === jurisdiction);
  }

  public static addWatchlist(entity: WatchlistEntity): void {
    this.watchlist.push(entity);
    SovereignThreatLedger.sealAndPublish('watchlist', entity);
  }

  public static getWatchlist(jurisdiction?: 'federal' | 'krg' | 'joint'): WatchlistEntity[] {
    if (!jurisdiction) return [...this.watchlist];
    return this.watchlist.filter(w => w.addedByJurisdiction === jurisdiction || jurisdiction === 'joint');
  }

  public static addRelationship(sourceId: string, targetId: string, type: RelationshipEdge['type'], weight = 50): void {
    this.relationships.push({ sourceId, targetId, type, weight });
    SovereignThreatLedger.sealAndPublish('relationship', { sourceId, targetId, type, weight });
  }

  public static getRelationships(): RelationshipEdge[] {
    return [...this.relationships];
  }

  public static addSummary(summary: IntelligenceSummary): void {
    this.summaries.push(summary);
  }

  public static getSummaries(): IntelligenceSummary[] {
    return [...this.summaries];
  }
}
