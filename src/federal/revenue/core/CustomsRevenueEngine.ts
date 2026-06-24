import { FederalCustomsDeclarationEngine } from '../../customs/core/CustomsDeclarationEngine';
import { TariffCalculationEngine } from '../../../shared/customs/TariffCalculationEngine';

export interface CustomsRevenueSummary {
  declarationId: string;
  importerName: string;
  goodsDescription: string;
  declaredValueUSD: number;
  calculatedDutyUSD: number;
  recordedDutyUSD: number;
  isIntegrityOk: boolean;
  discrepancyUSD: number;
}

export class FederalCustomsRevenueEngine {
  public static evaluateCustomsRevenue(): CustomsRevenueSummary[] {
    const declarations = FederalCustomsDeclarationEngine.getAllDeclarations();
    
    return declarations.map(decl => {
      // Calculate from Tariff engine directly to get a pristine valuation
      const pristineTariff = TariffCalculationEngine.calculateTariff({
        hsCode: decl.hsCode,
        declaredValueUSD: decl.declaredValueUSD,
        weightTons: decl.weightTons
      }, 'federal');

      const calculatedDutyUSD = pristineTariff.baseDutyUSD;
      const recordedDutyUSD = decl.tariffDetail ? decl.tariffDetail.baseDutyUSD : 0;
      const isIntegrityOk = Math.abs(calculatedDutyUSD - recordedDutyUSD) < 1; // within $1 threshold

      return {
        declarationId: decl.id,
        importerName: decl.importerName,
        goodsDescription: decl.description,
        declaredValueUSD: decl.declaredValueUSD,
        calculatedDutyUSD,
        recordedDutyUSD,
        isIntegrityOk,
        discrepancyUSD: Math.round((recordedDutyUSD - calculatedDutyUSD) * 100) / 100
      };
    });
  }

  public static getTotals() {
    const summaryList = this.evaluateCustomsRevenue();
    return summaryList.reduce((acc, curr) => {
      acc.totalDeclaredValueUSD += curr.declaredValueUSD;
      acc.totalCollectedDutyUSD += curr.recordedDutyUSD;
      if (!curr.isIntegrityOk) {
        acc.leakageDiscrepanciesCount += 1;
        acc.leakageDeltaUSD += Math.abs(curr.discrepancyUSD);
      }
      return acc;
    }, {
      totalDeclaredValueUSD: 0,
      totalCollectedDutyUSD: 0,
      leakageDiscrepanciesCount: 0,
      leakageDeltaUSD: 0
    });
  }
}
