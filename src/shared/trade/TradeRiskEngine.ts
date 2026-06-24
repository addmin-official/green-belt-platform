import { TradeRiskProfile, TradeCommodity } from './TradeTypes';
import { TradeComplianceEngine } from './TradeComplianceEngine';
import { TradePartnerRegistry } from './TradePartnerRegistry';
import { TradeCorridorEngine } from './TradeCorridorEngine';

export class TradeRiskEngine {
  // Analytical risks indices
  private static countryRiskIndices: Record<string, number> = {
    'DE': 10,  // low
    'NL': 5,   // very low
    'AE': 15,  // low
    'TR': 42,  // medium
    'CN': 30,  // low-medium
    'IR': 75,  // high risk
    'SY': 85,  // high risk
    'JO': 35,  // medium-low
    'US': 12,  // low
    'UNKNOWN': 50
  };

  public static getCountryRisk(countryCode: string): number {
    return this.countryRiskIndices[countryCode.toUpperCase()] ?? this.countryRiskIndices['UNKNOWN'];
  }

  public static calculateRisk(declaration: {
    partnerName: string;
    hsCode: string;
    declaredValueUSD: number;
    weightTons: number;
    corridorId: string;
  }): {
    riskScore: number;
    riskFactors: string[];
    indicators: string[];
    overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  } {
    const riskFactors: string[] = [];
    const indicators: string[] = [];
    let baseScore = 15; // standard low baseline

    // 1. Commodity Risk
    const commodity = TradeComplianceEngine.getCommodityByCode(declaration.hsCode);
    if (commodity.isProhibited) {
      baseScore += 55;
      riskFactors.push('PROHIBITED_COMMODITY');
      indicators.push('Prohibited good listing in national ledger.');
    } else if (commodity.isRestricted) {
      baseScore += 25;
      riskFactors.push('RESTRICTED_COMMODITY');
      indicators.push('Restricted cargo requires multi-agency verification.');
    }
    if (commodity.isDualUse) {
      baseScore += 20;
      riskFactors.push('DUAL_USE_HARDWARE');
      indicators.push('Dual military-civilian application.');
    }

    // 2. Country/Partner Risk
    const partners = TradePartnerRegistry.getAllPartners();
    const partnerObj = partners.find(p => p.name.toLowerCase() === declaration.partnerName.toLowerCase());
    let countryCode = 'UNKNOWN';
    if (partnerObj) {
      countryCode = partnerObj.countryCode;
      if (partnerObj.isSanctioned) {
        baseScore += 50;
        riskFactors.push('SANCTIONED_PARTNER');
        indicators.push('Entity registered on the Central Inter-Ministerial Blacklist.');
      }
      if (partnerObj.reliabilityRating < 60) {
        baseScore += 15;
        riskFactors.push('LOW_LOGISTICS_RELIABILITY');
        indicators.push(`Partner rating is depressed: ${partnerObj.reliabilityRating}/100.`);
      }
    }
    const countryRiskVal = this.getCountryRisk(countryCode);
    if (countryRiskVal > 60) {
      baseScore += 20;
      riskFactors.push('HIGH_RISK_TRADE_GEOGRAPHY');
      indicators.push(`Direct cargo transit origin maps to standard compliance-alert zone (risk index: ${countryRiskVal}).`);
    }

    // 3. Corridor Specific Risks
    const corridor = TradeCorridorEngine.getCorridorById(declaration.corridorId);
    if (corridor) {
      if (corridor.dailyCapacityTons < 3000) {
        baseScore += 10;
        riskFactors.push('CONGESTED_CHOKE_CORRIDOR');
        indicators.push('Low-capacity mountain or boundary corridor.');
      }
    } else {
      baseScore += 15;
      riskFactors.push('UNREGISTERED_SMUGGLING_CORRIDOR_FLAG');
      indicators.push('Corridor ID undefined in sovereign logistics databases.');
    }

    // 4. Volume Value Anomaly (possible shell company pattern indicator)
    if (declaration.declaredValueUSD > 1500000) {
      baseScore += 15;
      riskFactors.push('HIGH_VALUE_EXPOSURE');
      indicators.push('Sizable transactions increase financial monitoring priority.');
    }

    const riskScore = Math.min(100, Math.max(0, baseScore));

    let overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (riskScore >= 80) overallRisk = 'CRITICAL';
    else if (riskScore >= 55) overallRisk = 'HIGH';
    else if (riskScore >= 30) overallRisk = 'MEDIUM';

    return {
      riskScore,
      riskFactors,
      indicators,
      overallRisk
    };
  }
}
