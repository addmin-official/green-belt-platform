export type SsosMode = 'SEPARATED' | 'FEDERATED' | 'UNIFIED';

export interface BudgetItem {
  id: string;
  name: { en: string; ar: string; ku: string };
  year: number;
  jurisdiction: 'federal' | 'krg' | 'joint';
  totalAllocated: number; // in Millions USD
  expenditureSocial: number;
  expenditureSecurity: number;
  expenditureDevelopment: number;
  expenditureOperating: number;
  revenueEstOil: number;
  revenueEstNonOil: number;
  status: 'Draft' | 'Review' | 'Cabinet Approval' | 'Parliament Approval' | 'Execution' | 'Audit' | 'Closed';
}

export interface TreasuryAccount {
  jurisdiction: 'federal' | 'krg' | 'joint';
  balance: number; // Millions USD
  emergencyReserve: number; // Millions USD
  revenueCollectedOil: number;
  revenueCollectedNonOil: number;
  spentSocial: number;
  spentSecurity: number;
  spentDevelopment: number;
  spentOperating: number;
}

export interface RevenueSharingSetting {
  oilFederationRatio: number; // e.g. 0.85 (85% goes to Federal pool, or according to formula)
  customsFederationRatio: number; // e.g. 0.50 (50% Shared, 50% Local)
  taxFederationRatio: number; // e.g. 0.60
  borderFeeRatio: number; // e.g. 0.50
  federalTransferRatio: number; // e.g. 0.1267 (12.67% of Sovereign Budget goes to KRG)
}

export interface EnergyField {
  id: string;
  name: string;
  type: 'oil' | 'gas';
  location: string;
  jurisdiction: 'federal' | 'krg' | 'joint';
  productionRate: number; // Barrels/day or cubic feet/day
  exportRate: number; // Barrels/day
  domesticRate: number; // Barrels/day
  pricePerBarrel: number; // USD
  dailyRevenue: number; // rate * price or formula
}

export interface StrategicProject {
  id: string;
  name: { en: string; ar: string; ku: string };
  category: 'Strategic' | 'Infrastructure' | 'Digital' | 'Transportation' | 'Energy';
  jurisdiction: 'federal' | 'krg' | 'joint';
  totalBudget: number; // millions USD
  fundedAmount: number; // millions USD
  spentAmount: number; // millions USD
  leadMinistry: string;
  lifecycle: 'Planning' | 'Funding' | 'Procurement' | 'Execution' | 'Inspection' | 'Completed';
  completionPercentage: number;
  performanceScore: number; // 0-100
}

export interface MinistryKpi {
  id: string;
  name: { en: string; ar: string; ku: string };
  ministry: string;
  jurisdiction: 'federal' | 'krg' | 'joint';
  budgetEfficiency: number; // 0-100
  serviceDeliveryRate: number; // 0-100
  executionRate: number; // 0-100
  performanceScore: number; // dynamically computed
  kpis: {
    id: string;
    label: { en: string; ar: string; ku: string };
    target: number;
    current: number;
    weight: number; // sum to 100
  }[];
}

export interface CrisisAlarm {
  id: string;
  title: { en: string; ar: string; ku: string };
  type: 'security' | 'border' | 'economic' | 'health' | 'natural_disaster';
  jurisdiction: 'federal' | 'krg' | 'joint';
  severity: 'critical' | 'major' | 'minor';
  details: string;
  leadAuthority: string;
  federalStatus: 'STANDBY' | 'RESPONDING' | 'RESOLVED' | 'COLLABORATING';
  krgStatus: 'STANDBY' | 'RESPONDING' | 'RESOLVED' | 'COLLABORATING';
  jointStatus: 'STANDBY' | 'RESPONDING' | 'RESOLVED' | 'COLLABORATING';
  timeline: { time: string; action: string; actor: string }[];
}

// 1. TREASURY OPERATING SYSTEMS

export class FederalTreasuryEngine {
  static getOverview(account: TreasuryAccount, mode: SsosMode): TreasuryAccount {
    if (mode === 'UNIFIED') {
      // In Unified mode, the Federal Treasury incorporates all state assets.
      return {
        ...account,
        balance: account.balance,
        emergencyReserve: account.emergencyReserve,
      };
    }
    return account;
  }

  static forecastNextQuarter(account: TreasuryAccount, growthRate: number = 0.02): {
    projectedBalance: number;
    revenueForecast: number;
    spentForecast: number;
    riskIndex: number; // 0-100
  } {
    const revenueEst = (account.revenueCollectedOil + account.revenueCollectedNonOil) * 0.25 * (1 + growthRate);
    const spentEst = (account.spentSocial + account.spentSecurity + account.spentDevelopment + account.spentOperating) * 0.25;
    const projectedBalance = account.balance + revenueEst - spentEst;
    const deficitRisk = projectedBalance < account.emergencyReserve ? 75 : 15;
    
    return {
      projectedBalance: Math.round(projectedBalance * 100) / 100,
      revenueForecast: Math.round(revenueEst * 100) / 100,
      spentForecast: Math.round(spentEst * 100) / 100,
      riskIndex: deficitRisk,
    };
  }
}

export class KRGTreasuryEngine {
  static getOverview(account: TreasuryAccount, mode: SsosMode): TreasuryAccount {
    if (mode === 'UNIFIED') {
      // KRG accounts are merged into the Federal / Joint pool in target Unified state.
      return {
        ...account,
        balance: 0, 
        emergencyReserve: 0,
      };
    }
    return account;
  }

  static forecastNextQuarter(account: TreasuryAccount, growthRate: number = 0.015): {
    projectedBalance: number;
    revenueForecast: number;
    spentForecast: number;
    riskIndex: number;
  } {
    const revenueEst = (account.revenueCollectedOil + account.revenueCollectedNonOil) * 0.25 * (1 + growthRate);
    const spentEst = (account.spentSocial + account.spentSecurity + account.spentDevelopment + account.spentOperating) * 0.25;
    const projectedBalance = account.balance + revenueEst - spentEst;
    const deficitRisk = projectedBalance < account.emergencyReserve ? 85 : 25;

    return {
      projectedBalance: Math.round(projectedBalance * 100) / 100,
      revenueForecast: Math.round(revenueEst * 100) / 100,
      spentForecast: Math.round(spentEst * 100) / 100,
      riskIndex: deficitRisk,
    };
  }
}

export class JointTreasuryEngine {
  static computeConsolidatedPool(
    federal: TreasuryAccount,
    krg: TreasuryAccount,
    joint: TreasuryAccount,
    mode: SsosMode
  ): TreasuryAccount {
    if (mode === 'SEPARATED') {
      // Minimal interaction; joint pool holds only specific independent projects, or is locked.
      return {
        jurisdiction: 'joint',
        balance: joint.balance,
        emergencyReserve: joint.emergencyReserve,
        revenueCollectedOil: 0,
        revenueCollectedNonOil: 0,
        spentSocial: joint.spentSocial,
        spentSecurity: joint.spentSecurity,
        spentDevelopment: joint.spentDevelopment,
        spentOperating: joint.spentOperating,
      };
    }

    if (mode === 'FEDERATED') {
      // Joint operations is the sum of defined collaborations
      return {
        jurisdiction: 'joint',
        balance: joint.balance + (federal.balance * 0.05) + (krg.balance * 0.05),
        emergencyReserve: joint.emergencyReserve + krg.emergencyReserve * 0.2 + federal.emergencyReserve * 0.1,
        revenueCollectedOil: federal.revenueCollectedOil * 0.1 + krg.revenueCollectedOil * 0.1,
        revenueCollectedNonOil: federal.revenueCollectedNonOil * 0.15 + krg.revenueCollectedNonOil * 0.15,
        spentSocial: joint.spentSocial,
        spentSecurity: joint.spentSecurity,
        spentDevelopment: joint.spentDevelopment,
        spentOperating: joint.spentOperating,
      };
    }

    // UNIFIED: One consolidated sovereign pool inside Federal
    return {
      jurisdiction: 'joint',
      balance: federal.balance + krg.balance + joint.balance,
      emergencyReserve: federal.emergencyReserve + krg.emergencyReserve + joint.emergencyReserve,
      revenueCollectedOil: federal.revenueCollectedOil + krg.revenueCollectedOil,
      revenueCollectedNonOil: federal.revenueCollectedNonOil + krg.revenueCollectedNonOil,
      spentSocial: federal.spentSocial + krg.spentSocial + joint.spentSocial,
      spentSecurity: federal.spentSecurity + krg.spentSecurity + joint.spentSecurity,
      spentDevelopment: federal.spentDevelopment + krg.spentDevelopment + joint.spentDevelopment,
      spentOperating: federal.spentOperating + krg.spentOperating + joint.spentOperating,
    };
  }
}

// 3. REVENUE SHARING ENGINE

export class RevenueSharingEngine {
  /**
   * Computes revenue allocations dynamically based on sharing ratios.
   * In SEPARATED mode: direct lock, no shares are remitted.
   * In FEDERATED mode: formula sharing is active based on settings ratios.
   * In UNIFIED mode: 100% is aggregated, bypasses division formulas.
   */
  static processAllocations(
    sources: {
      oilKrg: number;
      oilFed: number;
      nonOilKrg: number;
      nonOilFed: number;
      customsKrg: number;
      customsFed: number;
      taxesKrg: number;
      taxesFed: number;
      borderKrg: number;
      borderFed: number;
    },
    settings: RevenueSharingSetting,
    mode: SsosMode
  ): {
    federalAllocation: number;
    krgAllocation: number;
    jointAllocation: number;
    transferredToKrg: number;
    remittedToFederal: number;
  } {
    if (mode === 'SEPARATED') {
      const federalTotal = sources.oilFed + sources.nonOilFed + sources.customsFed + sources.taxesFed + sources.borderFed;
      const krgTotal = sources.oilKrg + sources.nonOilKrg + sources.customsKrg + sources.taxesKrg + sources.borderKrg;
      return {
        federalAllocation: federalTotal,
        krgAllocation: krgTotal,
        jointAllocation: 0,
        transferredToKrg: 0,
        remittedToFederal: 0,
      };
    }

    if (mode === 'FEDERATED') {
      // Compute oil sharing
      const oilSharedPool = sources.oilKrg + sources.oilFed;
      const federalOilAlloc = oilSharedPool * settings.oilFederationRatio;
      const krgOilAlloc = oilSharedPool * (1 - settings.oilFederationRatio);

      // Compute KRG collection remissions to Federal (oil & border taxes)
      const nonOilRegionalRaw = sources.nonOilKrg + sources.customsKrg + sources.taxesKrg + sources.borderKrg;
      
      // KRG remits customs and border fees based on settings ratio
      const remittedCustoms = sources.customsKrg * settings.customsFederationRatio;
      const remittedBorders = sources.borderKrg * settings.borderFeeRatio;
      const remittedToFederal = remittedCustoms + remittedBorders;

      // KRG keeps remainder of regional collections
      const krgRegionalAlloc = nonOilRegionalRaw - remittedToFederal;

      // Federal collections keep portion except what is shared with KRG
      const federalCollectedRaw = sources.oilFed + sources.nonOilFed + sources.customsFed + sources.taxesFed + sources.borderFed;
      
      // KRG gets a specific budget share transfer of dynamic sovereign pool (12.67%)
      const sovereignPool = federalCollectedRaw + remittedToFederal;
      const transferredToKrg = sovereignPool * settings.federalTransferRatio;

      const federalAllocation = sovereignPool - transferredToKrg;
      const krgAllocation = krgRegionalAlloc + transferredToKrg + krgOilAlloc;
      const jointAllocation = sovereignPool * 0.03; // 3% goes to Joint Operations

      return {
        federalAllocation: Math.round(federalAllocation * 100) / 100,
        krgAllocation: Math.round(krgAllocation * 100) / 100,
        jointAllocation: Math.round(jointAllocation * 100) / 100,
        transferredToKrg: Math.round(transferredToKrg * 100) / 100,
        remittedToFederal: Math.round(remittedToFederal * 100) / 100,
      };
    }

    // UNIFIED mode: All collections flow into a single unified national treasury
    const grandTotal = 
      sources.oilKrg + sources.oilFed + 
      sources.nonOilKrg + sources.nonOilFed + 
      sources.customsKrg + sources.customsFed + 
      sources.taxesKrg + sources.taxesFed + 
      sources.borderKrg + sources.borderFed;

    return {
      federalAllocation: Math.round(grandTotal * 0.85 * 100) / 100,
      krgAllocation: Math.round(grandTotal * 0.12 * 100) / 100,
      jointAllocation: Math.round(grandTotal * 0.03 * 100) / 100,
      transferredToKrg: Math.round(grandTotal * 0.12 * 100) / 100,
      remittedToFederal: Math.round((sources.oilKrg + sources.customsKrg + sources.borderKrg) * 100) / 100,
    };
  }
}

// 4. OIL & ENERGY GOVERNANCE

export class NationalEnergyRegistry {
  static computeProductionValue(field: EnergyField): number {
    const dailyVolume = field.productionRate;
    return dailyVolume * field.pricePerBarrel;
  }

  static getFieldOwnershipDetails(field: EnergyField, mode: SsosMode): {
    operator: string;
    beneficiaryShareFederal: number;
    beneficiaryShareKrg: number;
  } {
    if (mode === 'SEPARATED') {
      return {
        operator: field.jurisdiction === 'krg' ? 'KRG MNR (Ministry of Natural Resources)' : 'Federal SOMO',
        beneficiaryShareFederal: field.jurisdiction === 'federal' ? 100 : 0,
        beneficiaryShareKrg: field.jurisdiction === 'krg' ? 100 : 0,
      };
    }

    if (mode === 'FEDERATED') {
      return {
        operator: field.jurisdiction === 'joint' ? 'Federal SOMO & KRG MNR Joint Board' : field.jurisdiction === 'krg' ? 'KRG MNR supervised' : 'Federal SOMO licensed',
        beneficiaryShareFederal: field.jurisdiction === 'federal' ? 90 : field.jurisdiction === 'krg' ? 20 : 50,
        beneficiaryShareKrg: field.jurisdiction === 'federal' ? 10 : field.jurisdiction === 'krg' ? 80 : 50,
      };
    }

    // UNIFIED operations: single National Oil Board
    return {
      operator: 'Consolidated National Petroleum Commission (NPC)',
      beneficiaryShareFederal: 100,
      beneficiaryShareKrg: 0, // Consolidated national pool distribution
    };
  }
}

// 6. GOVERNMENT PERFORMANCE ENGINE & 7. NATIONAL KPI FABRIC

export class NationalKPIEngine {
  static aggregateKpis(ministries: MinistryKpi[], mode: SsosMode, jurisdictionFilter?: 'federal' | 'krg' | 'joint'): {
    nationalScore: number;
    budgetEfficiencyAvg: number;
    deliveryRateAvg: number;
    executionRateAvg: number;
  } {
    let list = ministries;
    if (mode === 'SEPARATED' && jurisdictionFilter) {
      list = ministries.filter(m => m.jurisdiction === jurisdictionFilter);
    } else if (jurisdictionFilter) {
      list = ministries.filter(m => m.jurisdiction === jurisdictionFilter || m.jurisdiction === 'joint');
    }

    if (list.length === 0) {
      return { nationalScore: 0, budgetEfficiencyAvg: 0, deliveryRateAvg: 0, executionRateAvg: 0 };
    }

    let totalScore = 0;
    let totalEff = 0;
    let totalDelivery = 0;
    let totalExec = 0;

    list.forEach(m => {
      // Compute direct weighted ministry score from its KPIs
      let ministryKpiScore = 50;
      if (m.kpis && m.kpis.length > 0) {
        const weightedSum = m.kpis.reduce((acc, k) => acc + (k.current / (k.target || 1)) * k.weight, 0);
        ministryKpiScore = Math.min(100, Math.max(0, weightedSum));
      }
      totalScore += (ministryKpiScore + m.budgetEfficiency + m.serviceDeliveryRate + m.executionRate) / 4;
      totalEff += m.budgetEfficiency;
      totalDelivery += m.serviceDeliveryRate;
      totalExec += m.executionRate;
    });

    return {
      nationalScore: Math.round(totalScore / list.length),
      budgetEfficiencyAvg: Math.round(totalEff / list.length),
      deliveryRateAvg: Math.round(totalDelivery / list.length),
      executionRateAvg: Math.round(totalExec / list.length),
    };
  }
}

// 10. AI STRATEGIC DECISION LAYER

export class StrategicDecisionEngine {
  static generateStrategicDirectives(
    mode: SsosMode,
    readinessScore: number,
    kpiScore: number,
    crisisCount: number,
    treasuryReserveAdequacy: number // percentage of buffer satisfied
  ): {
    briefing: { en: string; ar: string; ku: string };
    riskForecast: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    economicScenario: { en: string; ar: string; ku: string };
    operationalImpact: { en: string; ar: string; ku: string };
    recommendations: { id: string; en: string; ar: string; ku: string }[];
  } {
    // Generate risk category
    let riskForecast: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (crisisCount > 2 || kpiScore < 55) {
      riskForecast = 'CRITICAL';
    } else if (crisisCount > 0 || treasuryReserveAdequacy < 80) {
      riskForecast = 'HIGH';
    } else if (kpiScore < 75) {
      riskForecast = 'MEDIUM';
    }

    // Recommendations list
    const recommendations: { id: string; en: string; ar: string; ku: string }[] = [];

    if (mode === 'SEPARATED') {
      recommendations.push({
        id: 'REC-01',
        en: 'Deploy Federated PKI handshakes immediately to reduce clearing and audit latency by 45%.',
        ar: 'تفعيل المفاتيح الرقمية المشتركة فوراً لتقليل فترات التدقيق والمقاصة المالية بنسبة 45٪.',
        ku: 'چالاککردنی واژۆی دیجیتاڵی هاوبەش بە خێرایی بۆ کەمکردنەوەی ماوەی وردبینی بە ڕێژەی ٤٥٪.'
      });
      recommendations.push({
        id: 'REC-02',
        en: 'Establish a joint committee on border tariff collections to stop fiscal leakage.',
        ar: 'تأسيس لجنة جمركية مشتركة لضبط الرسوم الحدودية والحد من تسرب الإيرادات غير النفطية.',
        ku: 'دامەزراندنی لیژنەیەکی هاوبەش بۆ چاودێریکردنی داهاتەکانی خاڵە سنوورییەکان بەمەبەستی کەمکردنەوەی بەفیڕۆچوونی دارایی.'
      });
    } else if (mode === 'FEDERATED') {
      recommendations.push({
        id: 'REC-01',
        en: 'Optimize the Revenue Sharing Engine margins; set regional transfer triggers to automatic clearing via Central Bank API.',
        ar: 'تحسين هوامش خوارزمية مشاركة الإيرادات وتفعيل التحويلات التلقائية المباشرة عبر البنك المركزي.',
        ku: 'پێشخستنی هاوکێشەی دابەشکردنی داهاتەکان و کاراکردنی گواستنەوەی خودکار پاڵپشت بە سیستەمی بانکی ناوەندی.'
      });
      recommendations.push({
        id: 'REC-02',
        en: 'Deploy Unified Crisis Protocol (UCP-3) to coordinate national assets for active regional emergencies.',
        ar: 'إطلاق البروتوكول الأمني المشترك (UCP-3) لتنسيق الطاقات الوطنية في حالات الطوارئ النشطة.',
        ku: 'دەستپێکردنی کۆدی فریاگوزاری هاوبەش (UCP-3) بۆ ڕووبەڕووبوونەوەی دۆخی نائاسایی نیشتمانی.'
      });
    } else {
      // Unified
      recommendations.push({
        id: 'REC-01',
        en: 'Execute direct treasury consolidation into the Sovereign Iraq Consolidated Fund.',
        ar: 'تنفيذ الدمج الكامل للحسابات المصرفية الإقليمية ضمن الصندوق السيادي العراقي الموحد.',
        ku: 'یەکخستنی هاوچەرخی سەرجەم سەرچاوە داراییەکان لەژێر یەک سندوقی نیشتمانیی باڵا.'
      });
    }

    return {
      briefing: {
        en: `Strategic State Intelligence brief: The system operates in ${mode} configuration. Security operations and financial indexes align at ${kpiScore}% of targeted sovereign projections. Emergency reserves hold at ${treasuryReserveAdequacy}% capacity.`,
        ar: `ملخص الاستخبارات الجيو-اقتصادية: يعمل النظام حالياً بنمط (${mode}). تتقارب معدلات الأداء والامتثال المالي عند ${kpiScore}٪ من المستهدف السيادي. الاحتياطي النقدي مستقر بنسبة ${treasuryReserveAdequacy}٪.`,
        ku: `کورتەی ستراتیژی دەوڵەت: سیستەمەکە ئێستا لەژێر مۆدی (${mode}) کاردەکات. دۆخی ئاسایش و داهاتە داراییەکان گەیشتووەتە ${kpiScore}٪ی بەراوردە یاساییەکان.`
      },
      riskForecast,
      economicScenario: {
        en: mode === 'UNIFIED' 
          ? 'Consolidated Sovereign Expansion: Low friction, optimal transaction throughput, minimized local transfer overhead.'
          : 'Federation Friction Management: Moderate delay in regional transfers, requiring automatic formula reassessments.',
        ar: mode === 'UNIFIED'
          ? 'النمو السيادي الموحد المستدام: انعدام تام للعوائق البينية، وتدفق سريع للأموال، وكفاءة عالية لمقاصة المشروعات.'
          : 'إدارة تداخل الصلاحيات: تأخر نسبي في تسويات النقل المالي الإقليمي يستدعي إعادة معيار التعادل التلقائي.',
        ku: mode === 'UNIFIED'
          ? 'گەشەسەندنی نیشتمانیی یەکگرتوو: کەمترین کێشە و زۆرترین خێرایی لە جێبەجێکردنی پڕۆژە نیشتمانییەکان.'
          : 'ڕێکخستنی هاوبەشی بەربەستەکان: پێویستی بە وردبینی دارایی بەردەوام هەیە بۆ داهاتە ناوچەییەکان.'
      },
      operationalImpact: {
        en: `Execution metrics forecast stability in strategic pipelines with a joint focus rating of ${kpiScore > 75 ? 'Optimal' : 'Adequate'}.`,
        ar: `الأثر التشغيلي يتوقع استقراراً عالي الكفاءة في ممرات التبادل والحدود، مما يرفع القيمة الائتمانية الوطنية.`,
        ku: `ڕێژەی هەڵسەنگاندنەکە پیشاندەری سەقامگیری بەرچاوە لە پڕۆژە نیشتمانییەکاندا بە توانای گونجاندنی باشەوە.`
      },
      recommendations,
    };
  }
}

// 13. STATE OPERATING SYSTEM READINESS ENGINE

export class StateOperatingSystemReadinessEngine {
  static evaluateSsosReadiness(
    treasuryFed: TreasuryAccount,
    treasuryKrg: TreasuryAccount,
    budgets: BudgetItem[],
    projects: StrategicProject[],
    crisisList: CrisisAlarm[],
    mode: SsosMode
  ): {
    treasuryReadiness: number; // 0-100
    budgetReadiness: number;
    economicReadiness: number;
    crisisReadiness: number;
    executiveReadiness: number;
    federationReadiness: number;
    overallSsosReadinessScore: number;
  } {
    // Treasury Readiness: whether reserves are healthy and balances positive
    const fedReserveOk = treasuryFed.balance > treasuryFed.emergencyReserve ? 100 : 60;
    const krgReserveOk = treasuryKrg.balance > treasuryKrg.emergencyReserve ? 100 : 50;
    const treasuryReadiness = Math.round((fedReserveOk + krgReserveOk) / 2);

    // Budget Readiness: whether active budgets exist and are in Approved/Execution state
    const budgetApprovedCount = budgets.filter(b => b.status === 'Execution' || b.status === 'Parliament Approval' || b.status === 'Cabinet Approval').length;
    const budgetReadiness = budgets.length > 0 ? Math.round((budgetApprovedCount / budgets.length) * 100) : 50;

    // Economic Readiness: Project execution state efficiency
    const highlyProgressingProjects = projects.filter(p => p.completionPercentage > 30 && p.performanceScore > 70).length;
    const economicReadiness = projects.length > 0 ? Math.round((highlyProgressingProjects / projects.length) * 100) : 60;

    // Crisis Readiness: open alarm statuses
    const activeCrisisCount = crisisList.filter(c => c.severity === 'critical' && (c.federalStatus === 'RESPONDING' || c.krgStatus === 'RESPONDING')).length;
    const crisisReadiness = Math.max(10, 100 - (activeCrisisCount * 30));

    // Federation Readiness: increases if mode is FEDERATED or UNIFIED
    const federationReadiness = mode === 'UNIFIED' ? 100 : mode === 'FEDERATED' ? 75 : 35;

    // Executive Readiness: combined metrics of command centers
    const executiveReadiness = Math.round((treasuryReadiness + budgetReadiness + economicReadiness) / 3);

    const overallSsosReadinessScore = Math.round(
      (treasuryReadiness * 0.2) +
      (budgetReadiness * 0.15) +
      (economicReadiness * 0.2) +
      (crisisReadiness * 0.15) +
      (executiveReadiness * 0.15) +
      (federationReadiness * 0.15)
    );

    return {
      treasuryReadiness,
      budgetReadiness,
      economicReadiness,
      crisisReadiness,
      executiveReadiness,
      federationReadiness,
      overallSsosReadinessScore,
    };
  }
}
