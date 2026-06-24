import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export class StatePropertyRegistry {
  public static getProperties(): SovereignPhysicalAsset[] {
    return NationalAssetRegistry.getAssets().filter(
      a => a.category === 'LAND' || a.category === 'BUILDING' || a.category === 'INDUSTRIAL' || a.category === 'AGRICULTURE' || a.category === 'MINERAL'
    );
  }

  public static registerProperty(
    property: Omit<SovereignPhysicalAsset, 'id' | 'auditHash' | 'complianceScore' | 'riskScore'>,
    actor: string
  ): SovereignPhysicalAsset {
    const id = `AST-PROP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProperty = NationalAssetRegistry.addAsset({
      ...property,
      id
    }, actor);
    return newProperty;
  }
}
