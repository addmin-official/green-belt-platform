import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface StrategicSecurityStatus {
  assetId: string;
  securityClassification: 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  perimeterIntegrity: number; // 0-100
  defenseLiaisonActive: boolean;
  contingencyReadinessCode: 'ALPHA' | 'BRAVO' | 'CHARLIE';
}

export class StrategicAssetEngine {
  public static getStrategicAssets(): SovereignPhysicalAsset[] {
    const strategicCategories = ['ENERGY', 'MILITARY', 'MINERAL', 'STRATEGIC'];
    return NationalAssetRegistry.getAssets().filter(
      a => strategicCategories.includes(a.category)
    );
  }

  public static getSecurityStatus(assetId: string): StrategicSecurityStatus {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return {
        assetId,
        securityClassification: 'RESTRICTED',
        perimeterIntegrity: 0,
        defenseLiaisonActive: false,
        contingencyReadinessCode: 'CHARLIE'
      };
    }

    // Deterministic simulation
    const classification = asset.category === 'MILITARY' ? 'TOP_SECRET' : 
                             asset.category === 'ENERGY' ? 'SECRET' : 'CONFIDENTIAL';
    
    const perimeterIntegrity = Math.round(90 + (asset.complianceScore % 11)); // 90 to 100
    const defenseLiaisonActive = perimeterIntegrity > 92;
    const contingencyReadinessCode = perimeterIntegrity > 95 ? 'ALPHA' : perimeterIntegrity > 91 ? 'BRAVO' : 'CHARLIE';

    return {
      assetId,
      securityClassification: classification,
      perimeterIntegrity,
      defenseLiaisonActive,
      contingencyReadinessCode
    };
  }
}
