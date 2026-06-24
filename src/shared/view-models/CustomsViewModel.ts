import { CargoManifest } from '../../core/types';

export class CustomsViewModel {
  private manifest: CargoManifest;

  constructor(manifest: CargoManifest) {
    this.manifest = manifest;
  }

  get id(): string {
    return this.manifest.manifestId;
  }

  get importer(): string {
    return this.manifest.importerName;
  }

  get exporter(): string {
    return this.manifest.exporterName;
  }

  get origin(): string {
    return this.manifest.originCountry;
  }

  get destination(): string {
    return this.manifest.destinationCity;
  }

  get declaredHS(): string {
    return this.manifest.hsCodeDeclared;
  }

  get declaredValueUSD(): number {
    return this.manifest.declaredValueUSD;
  }

  get formattedValueUSD(): string {
    return this.manifest.declaredValueUSD.toLocaleString();
  }

  get weightTons(): number {
    return this.manifest.weightTons;
  }

  get description(): string {
    return this.manifest.description;
  }

  get category(): string {
    return this.manifest.goodsCategory;
  }

  get carrier(): string {
    return this.manifest.carrierInfo;
  }
}
