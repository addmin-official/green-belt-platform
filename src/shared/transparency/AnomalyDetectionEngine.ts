import { Jurisdiction } from './AuditTypes';

export interface CommodityAnomaly {
  cargoId: string;
  hsCode: string;
  traderName: string;
  itemDeclaredPricePerTon: number;
  nationalAveragePricePerTon: number;
  standardDeviationsBelowMean: number;
  probabilityOfDeceptionPercent: number;
}

export class AnomalyDetectionEngine {
  public static scanForPriceAnomalies(jurisdiction: Jurisdiction): CommodityAnomaly[] {
    if (jurisdiction === 'federal') {
      return [
        {
          cargoId: 'CARG-FED-009',
          hsCode: '85176200',
          traderName: 'Ur Freight Systems',
          itemDeclaredPricePerTon: 840,
          nationalAveragePricePerTon: 4500,
          standardDeviationsBelowMean: 3.8, // extreme outlier!
          probabilityOfDeceptionPercent: 96.5
        }
      ];
    } else {
      return [
        {
          cargoId: 'CARG-KRG-491',
          hsCode: '10011900',
          traderName: 'Sinotech Industrial Group',
          itemDeclaredPricePerTon: 110,
          nationalAveragePricePerTon: 340,
          standardDeviationsBelowMean: 2.9,
          probabilityOfDeceptionPercent: 88.0
        }
      ];
    }
  }
}
