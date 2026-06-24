export interface CargoManifest {
  manifestId: string;
  importerName: string;
  exporterName: string;
  originCountry: string;
  destinationCity: string;
  hsCodeDeclared: string;
  declaredValueUSD: number;
  weightTons: number;
  description: string;
  goodsCategory: string;
  carrierInfo: string;
}
