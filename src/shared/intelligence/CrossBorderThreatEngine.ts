import { ThreatEvent } from './NationalThreatTypes';

export class CrossBorderThreatEngine {
  public static assessCrossBorderTraffic(events: Array<{
    checkpoint: string;
    cargoCategory: string;
    unregisteredTransitNum: number;
    sensorAnomaliesCount: number;
  }>): ThreatEvent[] {
    const threats: ThreatEvent[] = [];

    events.forEach(ev => {
      if (ev.unregisteredTransitNum > 2 || ev.sensorAnomaliesCount > 5) {
        threats.push({
          id: `TE-CBT-${Math.floor(100 + Math.random() * 900)}`,
          sourceDomain: 'border',
          jurisdiction: ev.checkpoint.toLowerCase().includes('ibrahim') ? 'joint' : 'federal',
          titleEn: `Cross-Border Transit Anomaly at ${ev.checkpoint}`,
          titleKu: `ناڕێکی گواستنەوەی نیشتمانی لە دەروازەی ${ev.checkpoint}`,
          descriptionEn: `Sensor alerts and unregistered transits detected for ${ev.cargoCategory}. Indicators point toward unnotified bypass path.`,
          descriptionKu: `ئاگادارکەرەوەی ئامێرەکان و گواستنەوەی ناتۆمارکراو بۆ مانیفێستی جۆری ${ev.cargoCategory}. گومان لە دزەکردنی بارهەڵگر هەیە.`,
          indicatorWeight: 72,
          timestamp: new Date().toISOString(),
          sealedHash: 'STL-PENDING',
          associatedEntities: [ev.checkpoint]
        });
      }
    });

    return threats;
  }
}
