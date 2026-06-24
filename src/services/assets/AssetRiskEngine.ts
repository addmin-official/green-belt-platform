import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface AssetRiskAssessment {
  assetId: string; // | ناسنامەی سەروەت
  environmentalRiskScore: number; // | نمرەی مەترسی ژینگەیی (٠-١٠٠)
  securityThreatScore: number; // | نمرەی هەڕەشەی ئەمنی (٠-١٠٠)
  marketVolatilityScore: number; // | نمرەی ناجێگیری بازاڕ (٠-١٠٠)
  geopoliticalExposureScore: number; // | نمرەی بەرکەوتنی جیۆپۆلیتیکی (٠-١٠٠)
  overallRiskScore: number; // | کۆی نمرەی مەترسی (٠-١٠٠)
  mitigationProtocol: string; // | پڕۆتۆکۆڵی کەمکردنەوەی مەترسی
}

export class AssetRiskEngine {
  public static assessAssetRisk(assetId: string): AssetRiskAssessment {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return {
        assetId,
        environmentalRiskScore: 0,
        securityThreatScore: 0,
        marketVolatilityScore: 0,
        geopoliticalExposureScore: 0,
        overallRiskScore: 0,
        mitigationProtocol: '| نەبوو'
      };
    }

    // | نمرەدانانی خاو (Raw) بە شێوەیەکی دەترمینستیک
    const isStrategic = ['STRATEGIC', 'ENERGY', 'MILITARY'].includes(asset.category);
    const environmentalRiskScore = isStrategic ? 35 : 15;
    const securityThreatScore = asset.jurisdiction === 'joint' ? 45 : asset.jurisdiction === 'krg' ? 30 : 20;
    const marketVolatilityScore = asset.category === 'ENERGY' ? 65 : 25;
    const geopoliticalExposureScore = asset.jurisdiction === 'joint' ? 55 : 30;

    const overallRiskScore = Math.round(
      (environmentalRiskScore + securityThreatScore + marketVolatilityScore + geopoliticalExposureScore) / 4
    );

    const mitigationProtocol = overallRiskScore > 40
      ? '| جێگیرکردنی گاریسۆنی ئەمنی هاوبەشی فیدراڵ-هەرێم و دامەزراندنی نوودەکانی چاودێری دیجیتاڵی ئۆتۆماتیکی.'
      : '| پڕۆتۆکۆڵی ئاسایی پاسەوانی خاڵی پشکنینی ئۆتۆماتیکی و وردبینی فیزیایی دوو ساڵ جارێک.';

    return {
      assetId,
      environmentalRiskScore,
      securityThreatScore,
      marketVolatilityScore,
      geopoliticalExposureScore,
      overallRiskScore,
      mitigationProtocol
    };
  }

  public static runAssetRiskRevaluation(assetId: string, actor: string): number {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) return 0;

    const assessment = this.assessAssetRisk(assetId);
    
    const updated: SovereignPhysicalAsset = {
      ...asset,
      riskScore: assessment.overallRiskScore
    };

    NationalAssetRegistry.updateAsset(updated, actor);

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'RISK_UPDATE', // | نوێکردنەوەی مەترسی
      actor,
      `| هەڵسەنگاندنی مەترسی سەروەتی دەوڵەت جێبەجێکرا. نمرەی پرۆفایلی مەترسی یەکخراو دیاریکرا بۆ: ${assessment.overallRiskScore}٪.`
    );

    return assessment.overallRiskScore;
  }
}