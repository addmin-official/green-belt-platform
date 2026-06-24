import { ThreatEvent } from './NationalThreatTypes';

export class TradeManipulationDetectionEngine {
  public static scanTradeSequences(transfers: Array<{
    licenseNumber: string;
    importerName: string;
    cargoWeightKg: number;
    declaredCommodity: string;
    frequencyInDay: number;
  }>): ThreatEvent[] {
    const threats: ThreatEvent[] = [];

    transfers.forEach(tf => {
      // Rapid duplicate trade licensing
      if (tf.frequencyInDay > 5) {
        threats.push({
          id: `TE-TRADE-MANIP-${tf.licenseNumber.slice(-4)}`,
          sourceDomain: 'trade',
          jurisdiction: 'joint',
          titleEn: "Suspicious Rapid Refueling of Trade Manifest",
          titleKu: "دوبارەبوونەوەی خێرای مانیفێستی چوونەژوورەوەی بازرگانی",
          descriptionEn: `License ${tf.licenseNumber} for importer "${tf.importerName}" was pooled ${tf.frequencyInDay} times within a 24-hour cycle, indicative of multi-truck load-splitting.`,
          descriptionKu: `مۆڵەتی بازرگانی ${tf.licenseNumber} بۆ هاوردەکار "${tf.importerName}" زیاتر لە ${tf.frequencyInDay} جار لە ڕۆژێکدا بەکارهێنراوە، کە نیشانەی تێپەڕاندنی باری گەورەیە بە چەند جارێک بەبێ باج.`,
          indicatorWeight: 58,
          timestamp: new Date().toISOString(),
          sealedHash: 'TRADE_MANIP_SEAL',
          associatedEntities: [tf.licenseNumber]
        });
      }
    });

    return threats;
  }
}
