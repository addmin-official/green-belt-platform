import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface ValuationQuote {
  basis: string; // | بنەما
  previousValuationUSD: number; // | نرخاندنی پێشوو (ملیۆن دۆلار)
  newValuationUSD: number; // | نرخاندنی نوێ (ملیۆن دۆلار)
  deltaUSD: number; // | جیاوازی نرخ (ملیۆن دۆلار)
  revaluedAt: string; // | کاتی دووبارە نرخاندن
  assessor: string; // | هەڵسەنگێنەر
}

export class AssetValuationEngine {
  public static triggerRevaluation(
    assetId: string,
    newValuationUSD: number,
    basis: string,
    assessor: string
  ): { success: boolean; quote?: ValuationQuote; message: string } {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return { success: false, message: '| سەروەتەکە لە تۆماری نیشتمانیدا نەدۆزرایەوە' };
    }

    const previousValuationUSD = asset.valuationUSD;
    const deltaUSD = newValuationUSD - previousValuationUSD;

    const updated: SovereignPhysicalAsset = {
      ...asset,
      valuationUSD: newValuationUSD,
      lastAuditDate: new Date().toISOString().split('T')[0]
    };

    NationalAssetRegistry.updateAsset(updated, assessor);

    const quote: ValuationQuote = {
      basis,
      previousValuationUSD,
      newValuationUSD,
      deltaUSD,
      revaluedAt: new Date().toISOString(),
      assessor
    };

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'VALUATION', // | نرخاندن
      assessor,
      `| نرخاندنی سەروەت بە دەست نوێکرایەوە. ڕێگاکە: ${basis}. جیاوازی: ${deltaUSD} ملیۆن دۆلار.`
    );

    return {
      success: true,
      quote,
      message: `| نرخاندنی ${newValuationUSD} ملیۆن دۆلار لە دەفتەری گشتیدا تۆمارکرا.`
    };
  }

  // | پێشبینیکردنی بەرزبوونەوەی نرخی سەروەت
  public static projectAssetAppreciation(assetId: string, yearsAhead: number): number[] {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) return [];

    let current = asset.valuationUSD;
    const path: number[] = [current];

    // | سیمولاسیۆنی ڕێڕەوی گەشەکردنی داهات
    for (let i = 1; i <= yearsAhead; i++) {
      const growthFactor = 1 + (asset.annualRevenueYieldUSD / (asset.valuationUSD || 1)) * 0.5 - asset.depreciationRate;
      current = Math.round(current * growthFactor * 10) / 10;
      path.push(current);
    }

    return path;
  }
}