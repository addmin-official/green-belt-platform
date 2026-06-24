import { Jurisdiction } from './AuditTypes';

export interface TariffVarianceReport {
  hsCode: string;
  commodityName: string;
  expectedTariffPercent: number;
  actualTariffPercent: number;
  varianceUSD: number;
  cargoValueUSD: number;
  auditorRemarks: string;
}

export class TariffVarianceEngine {
  public static calculateTariffVariances(jurisdiction: Jurisdiction): TariffVarianceReport[] {
    if (jurisdiction === 'federal') {
      return [
        {
          hsCode: '85176200',
          commodityName: 'Networking Switches',
          expectedTariffPercent: 15,
          actualTariffPercent: 5, // Implies falsified classification as simpler hardware
          varianceUSD: 64000,
          cargoValueUSD: 640000,
          auditorRemarks: 'Misclassified as raw components to bypass advanced network gear tax rates.'
        }
      ];
    } else {
      return [
        {
          hsCode: '27090000',
          commodityName: 'Industrial Oils / Petrochemicals',
          expectedTariffPercent: 20,
          actualTariffPercent: 8,
          varianceUSD: 96000,
          cargoValueUSD: 800000,
          auditorRemarks: 'Misdeclared density parameters of oil mixtures to pay minimum local transit standard.'
        }
      ];
    }
  }
}
