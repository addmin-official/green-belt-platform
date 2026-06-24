import { ThreatLevel } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';

export interface ThreatForecast {
  targetHorizonDays: number;
  expectedThreatIndex: number; // 0 to 100
  trend: 'rising' | 'stable' | 'declining';
  predictedPeakThreatLevel: ThreatLevel;
  primaryRiskVectorKu: string;
}

export class ThreatForecastEngine {
  public static generateForecast(horizonDays: number = 7): ThreatForecast {
    const threats = NationalIntelligenceRegistry.getThreats();
    
    // Simple predictive analytics based on active severe counts
    const criticalCount = threats.filter(t => t.indicatorWeight >= 75).length;
    const elevatedCount = threats.filter(t => t.indicatorWeight >= 40 && t.indicatorWeight < 75).length;

    let baseThreatIndex = 15;
    baseThreatIndex += criticalCount * 18;
    baseThreatIndex += elevatedCount * 8;
    if (baseThreatIndex > 100) baseThreatIndex = 100;

    let trend: ThreatForecast['trend'] = 'stable';
    if (criticalCount > 0) trend = 'rising';
    else if (threats.length === 0) trend = 'declining';

    let predictedPeakThreatLevel: ThreatLevel = 'LOW';
    if (baseThreatIndex > 80) predictedPeakThreatLevel = 'CRITICAL';
    else if (baseThreatIndex > 65) predictedPeakThreatLevel = 'SEVERE';
    else if (baseThreatIndex > 45) predictedPeakThreatLevel = 'HIGH';
    else if (baseThreatIndex > 25) predictedPeakThreatLevel = 'ELEVATED';
    else if (baseThreatIndex > 10) predictedPeakThreatLevel = 'GUARDED';

    let primaryRiskVectorKu = 'بێ سەروبەری لە تۆماری مۆڵەت و گۆڕانکاری لە بەهای مانیفێست بەبێ پشتڕاستکردنەوە کاتیاوی';
    if (criticalCount > 0) {
      primaryRiskVectorKu = 'لادانی ئاراستەی بارهەڵگرە کیمیاییەکان یان ماددە هەستیارەکان لە دەروازە ناڕوونەکان بە مانیفێستی مۆبایلی ناتەبا';
    }

    return {
      targetHorizonDays: horizonDays,
      expectedThreatIndex: Math.round(baseThreatIndex),
      trend,
      predictedPeakThreatLevel,
      primaryRiskVectorKu
    };
  }
}
