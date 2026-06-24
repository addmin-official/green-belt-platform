import { ThreatEvent } from './NationalThreatTypes';

export class BorderThreatEngine {
  public static evaluateRadarAndSensors(anomalies: Array<{
    sectorName: string;
    unlockedSignalsCount: number;
    altitudeMeters: number;
    velocityKmh: number;
  }>): ThreatEvent[] {
    const threats: ThreatEvent[] = [];

    anomalies.forEach(an => {
      // Small low-flying high-velocity objects (potential unmanned aerial systems / contraband transport)
      if (an.altitudeMeters > 5 && an.altitudeMeters < 150 && an.velocityKmh > 40) {
        threats.push({
          id: `TE-BORDER-UAV-${Math.floor(1000 + Math.random() * 9000)}`,
          sourceDomain: 'border',
          jurisdiction: 'federal',
          titleEn: "Unidentified Low-Altitude Aviation Signal",
          titleKu: "دۆزینەوەی ئامێری فڕینی نەنۆسراو لە کایەی نزمی ئاسمانی",
          descriptionEn: `Unmanned signature logged in ${an.sectorName} at altitude ${an.altitudeMeters}m moving at ${an.velocityKmh}km/h towards non-designated pathways.`,
          descriptionKu: `ئامێرێکی فڕینی بێسەرنشینی گوماناوی لە کەرتی ${an.sectorName} لە بەرزایی ${an.altitudeMeters}م لە کاتی شەودا تۆمارکراوە بەبێ هەماهەنگی ئاسمانی فەرمی.`,
          indicatorWeight: 80,
          timestamp: new Date().toISOString(),
          sealedHash: 'UAV_RADAR_SEAL',
          associatedEntities: [an.sectorName]
        });
      }
    });

    return threats;
  }
}
