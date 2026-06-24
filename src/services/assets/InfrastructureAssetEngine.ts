import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface InfrastructureStatus {
  assetId: string; // | ناسنامەی سەروەت
  reliabilityMetric: number; // | پێوانەی متمانەپێکراوی (٠-١٠٠)
  capacityUtilization: number; // | بەکارهێنانی توانا (ڕێژەی سەدی)
  powerStatus: 'NOMINAL' | 'STANDBY' | 'CRITICAL'; // | دۆخی کارەبا
  integrityIndex: number; // | پێنوێنی یەکپارچەیی (٠-١٠٠)
}

// | وەرگێڕانی دۆخی کارەبا بۆ UI
export const PowerStatusLabels: Record<InfrastructureStatus['powerStatus'], string> = {
  NOMINAL: '| ئاسایی',
  STANDBY: '| ئامادەباش',
  CRITICAL: '| هەستیار'
};

export class InfrastructureAssetEngine {
  public static getInfrastructureAssets(): SovereignPhysicalAsset[] {
    const categoriesValue = ['INFRASTRUCTURE', 'WATER', 'TRANSPORT', 'AIRPORT', 'SEAPORT', 'BORDER_GATE', 'TELECOM', 'DIGITAL'];
    return NationalAssetRegistry.getAssets().filter(
      a => categoriesValue.includes(a.category)
    );
  }

  public static getInfrastructureStatus(assetId: string): InfrastructureStatus {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return {
        assetId,
        reliabilityMetric: 0,
        capacityUtilization: 0,
        powerStatus: 'STANDBY',
        integrityIndex: 0
      };
    }

    // | دروستکردنی بەها دەترمینستیکەکان بەپێی نمرەکانی مەترسی و پابەندبوون
    const reliabilityMetric = Math.min(100, Math.max(20, asset.complianceScore - Math.floor(asset.riskScore / 3)));
    const capacityUtilization = Math.round(45 + (parseFloat(asset.id.replace(/\D/g, '')) || 25) % 46); // | ٤٥٪ - ٩٠٪
    const integrityIndex = Math.min(100, Math.max(30, 100 - asset.riskScore));
    const powerStatus = integrityIndex > 80 ? 'NOMINAL' : integrityIndex > 60 ? 'STANDBY' : 'CRITICAL';

    return {
      assetId,
      reliabilityMetric,
      capacityUtilization,
      powerStatus,
      integrityIndex
    };
  }
}