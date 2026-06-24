import { HS_CODE_REGISTRY, HSCodeRegistry } from './HSCodeRegistry';

export type TariffJurisdiction = 'federal' | 'krg' | 'joint';

export interface TariffInput {
  hsCode: string;
  declaredValueUSD: number;
  weightTons: number;
  isSpecialExemption?: boolean;
  undervaluationRatio?: number; // scale like 1.5 if declared is below market
}

export interface TariffCalculationResult {
  jurisdiction: TariffJurisdiction;
  baseDutyUSD: number;
  borderServiceFeeUSD: number;
  inspectionFeeUSD: number;
  penaltyFeeUSD: number;
  totalTariffUSD: number;
  effectiveRate: number;
}

export class TariffCalculationEngine {
  public static calculateTariff(input: TariffInput, jurisdiction: TariffJurisdiction): TariffCalculationResult {
    const hsDef = HSCodeRegistry.getHSDefinition(input.hsCode);
    const defaultRate = hsDef ? hsDef.defaultDutyRate : 0.05; // fallback to 5%
    
    let baseDutyUSD = 0;
    let borderServiceFeeUSD = 0;
    let inspectionFeeUSD = 0;
    let penaltyFeeUSD = 0;

    const declaredVal = input.declaredValueUSD;
    const weight = input.weightTons;

    // 1. Base Duty Calculation
    if (!input.isSpecialExemption) {
      if (jurisdiction === 'federal') {
        baseDutyUSD = declaredVal * defaultRate;
      } else if (jurisdiction === 'krg') {
        // KRG has active regional adjustments (e.g. 10% discount on construction cement, high luxury vehicle tax)
        if (input.hsCode === '25232900') { // Portland Cement
          baseDutyUSD = declaredVal * (defaultRate * 0.8); // 8% instead of 10% to support local build
        } else if (input.hsCode === '87032330') { // Large engine cars
          baseDutyUSD = declaredVal * (defaultRate * 1.25); // higher rate for environment luxury
        } else {
          baseDutyUSD = declaredVal * defaultRate;
        }
      } else { // Joint harmonized schedule
        // Evaluates the median rate between the two.
        const fedRate = defaultRate;
        let krgRate = defaultRate;
        if (input.hsCode === '25232900') krgRate = defaultRate * 0.8;
        if (input.hsCode === '87032330') krgRate = defaultRate * 1.25;
        
        const harmonizedRate = (fedRate + krgRate) / 2;
        baseDutyUSD = declaredVal * harmonizedRate;
      }
    }

    // 2. Border Service Fee (based on volume/weight and flat gate rates)
    if (jurisdiction === 'federal') {
      // Federal scanning & gate flat fees: 2% of value plus $50/ton
      borderServiceFeeUSD = (declaredVal * 0.015) + (weight * 30);
    } else if (jurisdiction === 'krg') {
      // KRG uses local flat weight support fee: $40/ton and 1% of value
      borderServiceFeeUSD = (declaredVal * 0.01) + (weight * 40);
    } else {
      // Joint use combined average rate: 1.25% value and $35/ton
      borderServiceFeeUSD = (declaredVal * 0.0125) + (weight * 35);
    }

    // 3. Inspection Fees (flat rate per container type/hazardousness)
    const isHighRisk = hsDef?.riskCategory === 'HIGH';
    if (jurisdiction === 'federal') {
      inspectionFeeUSD = isHighRisk ? 250 : 100;
    } else if (jurisdiction === 'krg') {
      inspectionFeeUSD = isHighRisk ? 200 : 80;
    } else {
      inspectionFeeUSD = isHighRisk ? 220 : 90;
    }

    // 4. Penalty calculation (if suspicion of undervaluation is flagged or hazardous clearance violations)
    if (input.undervaluationRatio && input.undervaluationRatio > 1.1) {
      // Penalize based on the delta value gap
      const delta = declaredVal * (input.undervaluationRatio - 1.0);
      penaltyFeeUSD = delta * 0.50; // fine of 50% of the undervalued gap
    }

    // restricted items processed without proper initial permit get assessed $500 penalty
    if (hsDef?.isRestricted && !input.isSpecialExemption && jurisdiction === 'federal') {
      penaltyFeeUSD += 400; // Federal fine
    } else if (hsDef?.isRestricted && !input.isSpecialExemption && jurisdiction === 'krg') {
      penaltyFeeUSD += 300; // Regional fine
    }

    const totalTariffUSD = baseDutyUSD + borderServiceFeeUSD + inspectionFeeUSD + penaltyFeeUSD;
    const effectiveRate = declaredVal > 0 ? (totalTariffUSD / declaredVal) * 100 : 0;

    return {
      jurisdiction,
      baseDutyUSD: Math.round(baseDutyUSD * 100) / 100,
      borderServiceFeeUSD: Math.round(borderServiceFeeUSD * 100) / 100,
      inspectionFeeUSD: Math.round(inspectionFeeUSD * 100) / 100,
      penaltyFeeUSD: Math.round(penaltyFeeUSD * 100) / 100,
      totalTariffUSD: Math.round(totalTariffUSD * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100
    };
  }
}
