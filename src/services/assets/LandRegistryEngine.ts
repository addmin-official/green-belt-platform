import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface LandParcel {
  parcelId: string; // | ناسنامەی پارچە زەوی
  governorate: string; // | پارێزگا
  hectares: number; // | ڕووبەر (هێکتار)
  cadastralCode: string; // | کۆدی تاپۆ (Cadastral)
  surveyConfirmed: boolean; // | پشتڕاستکردنەوەی پێوانە
  geographicZonings: string; // | پۆلێنکردنی جوگرافی
}

export class LandRegistryEngine {
  private static parcels: Object & Record<string, LandParcel> = {
    'AST-KIRKUK-NORTHOIL': {
      parcelId: 'AST-KIRKUK-NORTHOIL',
      governorate: '| کەرکوک',
      hectares: 24500,
      cadastralCode: 'CAD-KIK-RAWANDUZ-012',
      surveyConfirmed: true, // | بەڵێ
      geographicZonings: '| ناوچەی ستراتیژی یەدەگی کاربۆن - A'
    },
    'AST-GRANDFAW-PORT': {
      parcelId: 'AST-GRANDFAW-PORT',
      governorate: '| بەسرە',
      hectares: 8500,
      cadastralCode: 'CAD-BAS-FAW-SEASHORE-99',
      surveyConfirmed: true, // | بەڵێ
      geographicZonings: '| ناوچەی بازرگانی گومرگی دەریایی'
    }
  };

  public static getLandAssets(): SovereignPhysicalAsset[] {
    return NationalAssetRegistry.getAssets().filter(
      a => a.category === 'LAND' // | زەوی
    );
  }

  public static getParcelDetails(assetId: string): LandParcel | undefined {
    return this.parcels[assetId];
  }

  public static registerParcel(assetId: string, parcel: Omit<LandParcel, 'parcelId'>) {
    this.parcels[assetId] = {
      parcelId: assetId,
      ...parcel
    };
  }
}