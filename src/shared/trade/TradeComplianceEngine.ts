import { TradeCommodity, TradePartner, TradeDeclaration } from './TradeTypes';
import { TradePartnerRegistry } from './TradePartnerRegistry';

export class TradeComplianceEngine {
  // Hardcoded commodity classifications (reference list)
  private static commodityRegistry: TradeCommodity[] = [
    { hsCode: '10011900', name: 'Premium Durum Wheat', category: 'GRAINS', isRestricted: false, isProhibited: false, isDualUse: false, baseTariffRate: 2 },
    { hsCode: '27101921', name: 'Refined Diesel Fuel', category: 'PETROLEUM', isRestricted: true, isProhibited: false, isDualUse: false, baseTariffRate: 15 },
    { hsCode: '85176200', name: 'Sovereign Telecommunication Switched Hubs', category: 'TELECOM', isRestricted: true, isProhibited: false, isDualUse: true, baseTariffRate: 10 },
    { hsCode: '36020000', name: 'Industrial Mining Nitro-gel', category: 'EXPLOSIVES', isRestricted: true, isProhibited: true, isDualUse: true, baseTariffRate: 40 },
    { hsCode: '87032330', name: 'Passenger SUVs', category: 'VEHICLES', isRestricted: false, isProhibited: false, isDualUse: false, baseTariffRate: 25 },
    { hsCode: '30049000', name: 'Child Vaccine Packages', category: 'PHARMA', isRestricted: false, isProhibited: false, isDualUse: false, baseTariffRate: 0 },
    { hsCode: '88022000', name: 'UAV Survey Drone Pack (Dual-use rotors)', category: 'AVIATION', isRestricted: true, isProhibited: false, isDualUse: true, baseTariffRate: 30 },
    { hsCode: '38249992', name: 'Chemical Pesticide Compounds (Toxic Precursor)', category: 'CHEMICALS', isRestricted: true, isProhibited: false, isDualUse: true, baseTariffRate: 12 }
  ];

  public static getCommodityByCode(hsCode: string): TradeCommodity {
    const found = this.commodityRegistry.find(c => c.hsCode === hsCode);
    if (found) return found;
    // Return a default dynamic commodity if not registered
    return {
      hsCode,
      name: `Commodity Code ${hsCode}`,
      category: 'MISCELLANEOUS',
      isRestricted: false,
      isProhibited: false,
      isDualUse: false,
      baseTariffRate: 5
    };
  }

  public static getAllCommodities(): TradeCommodity[] {
    return [...this.commodityRegistry];
  }

  /**
   * Performs full structured compliance checks on declarations.
   */
  public static runComplianceCheck(declaration: {
    partnerName: string;
    hsCode: string;
    declaredValueUSD: number;
    weightTons: number;
  }): {
    complianceScore: number;
    failedChecks: string[];
    isApproved: boolean;
    category: 'PASSED' | 'WARNING' | 'FAILED';
  } {
    const failedChecks: string[] = [];
    const commodity = this.getCommodityByCode(declaration.hsCode);
    
    // 1. Check Prohibited goods
    if (commodity.isProhibited) {
      failedChecks.push('CRITICAL: Prohibited goods catalog breach. Strict embargo enforced.');
    }

    // 2. Check Sanctioned partner names or entities
    const partners = TradePartnerRegistry.getAllPartners();
    const isPartnerSanctioned = partners.some(p => 
      p.isSanctioned && 
      (p.name.toLowerCase().includes(declaration.partnerName.toLowerCase()) || 
       declaration.partnerName.toLowerCase().includes(p.name.toLowerCase()))
    );
    if (isPartnerSanctioned) {
      failedChecks.push('CRITICAL: Sanctioned entity involvement detected.');
    }

    // 3. Check Dual-use and missing special approval
    if (commodity.isDualUse && declaration.declaredValueUSD > 100000) {
      failedChecks.push('WARNING: Dual-use good value threshold exceeded without pre-cleared special trade permit.');
    }

    // 4. Check anomalous weight/value ratio
    const avgValuePerTon = declaration.declaredValueUSD / (declaration.weightTons || 1);
    if (avgValuePerTon > 500000) {
      failedChecks.push('WARNING: Under-declared mass relative to premium value index (possible tax evasion).');
    } else if (avgValuePerTon < 5) {
      failedChecks.push('WARNING: Severe under-valuation ratio detected.');
    }

    // Calculate score
    let score = 100;
    for (const fail of failedChecks) {
      if (fail.startsWith('CRITICAL:')) {
        score -= 50;
      } else {
        score -= 20;
      }
    }
    score = Math.max(0, score);

    const isApproved = !failedChecks.some(f => f.startsWith('CRITICAL:'));
    const category = score === 100 ? 'PASSED' : isApproved ? 'WARNING' : 'FAILED';

    return {
      complianceScore: score,
      failedChecks,
      isApproved,
      category
    };
  }
}
