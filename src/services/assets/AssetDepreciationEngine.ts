import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface DepreciationScheduleItem {
  year: number; // | ساڵ
  beginningBookValueUSD: number; // | بەهای کتێبی سەرەتایی (ملیۆن دۆلار)
  depreciationExpenseUSD: number; // | خەرجی دابەزینی نرخ (ملیۆن دۆلار)
  endingBookValueUSD: number; // | بەهای کتێبی کۆتایی (ملیۆن دۆلار)
  accumulatedDepreciationUSD: number; // | کۆی دابەزینی نرخ (ملیۆن دۆلار)
}

export class AssetDepreciationEngine {
  public static calculateSchedule(assetId: string, durationYears: number = 10): DepreciationScheduleItem[] {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) return [];

    const schedule: DepreciationScheduleItem[] = [];
    let beginningBookValueUSD = asset.valuationUSD;
    let accumulatedDepreciationUSD = 0;

    for (let yr = 1; yr <= durationYears; yr++) {
      const depreciationExpenseUSD = Math.round(beginningBookValueUSD * asset.depreciationRate * 10) / 10;
      const endingBookValueUSD = Math.max(0, Math.round((beginningBookValueUSD - depreciationExpenseUSD) * 10) / 10);
      accumulatedDepreciationUSD = Math.round((accumulatedDepreciationUSD + depreciationExpenseUSD) * 10) / 10;

      schedule.push({
        year: yr,
        beginningBookValueUSD,
        depreciationExpenseUSD,
        endingBookValueUSD,
        accumulatedDepreciationUSD
      });

      beginningBookValueUSD = endingBookValueUSD;
    }

    return schedule;
  }

  // | جێبەجێکردنی پڕۆسەی دابەزینی نرخی ساڵانە
  public static runAnnualDepreciationPass(actor: string): { success: boolean; affectedCount: number } {
    const list = NationalAssetRegistry.getAssets();
    let affectedCount = 0;

    list.forEach(asset => {
      const depAmt = asset.valuationUSD * asset.depreciationRate;
      if (depAmt > 0) {
        const updated: SovereignPhysicalAsset = {
          ...asset,
          valuationUSD: Math.max(0, Math.round((asset.valuationUSD - depAmt) * 10) / 10),
          lastAuditDate: new Date().toISOString().split('T')[0]
        };
        NationalAssetRegistry.updateAsset(updated, actor);
        NationalAssetRegistry.appendLedgerRecord(
          asset.id,
          'DEPRECIATION', // | دابەزینی نرخ
          actor,
          `| دابەزینی نرخی ئۆتۆماتیکی جێبەجێکرا. بەهای سەروەتەکە بە بڕی ${depAmt.toFixed(2)} ملیۆن دۆلار کەمکرایەوە.`
        );
        affectedCount++;
      }
    });

    return {
      success: true,
      affectedCount
    };
  }
}
