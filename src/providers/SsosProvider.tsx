import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SsosMode, 
  BudgetItem, 
  TreasuryAccount, 
  RevenueSharingSetting, 
  EnergyField, 
  StrategicProject, 
  MinistryKpi, 
  CrisisAlarm,
  FederalTreasuryEngine,
  KRGTreasuryEngine,
  JointTreasuryEngine,
  RevenueSharingEngine,
  NationalEnergyRegistry,
  NationalKPIEngine,
  StateOperatingSystemReadinessEngine,
  StrategicDecisionEngine
} from '../services/ssos/SsosEngines';
import { useGovernment } from './GovernmentProvider';

interface SsosContextData {
  ssosMode: SsosMode;
  setSsosMode: (mode: SsosMode) => void;
  
  // Budgets
  budgets: BudgetItem[];
  addBudget: (budget: BudgetItem) => void;
  updateBudgetStatus: (id: string, status: BudgetItem['status']) => void;
  
  // Treasury Accounts
  federalTreasury: TreasuryAccount;
  krgTreasury: TreasuryAccount;
  jointTreasury: TreasuryAccount;
  allocationSummary: ReturnType<typeof RevenueSharingEngine.processAllocations>;
  updateTreasuryAccount: (jurisdiction: 'federal' | 'krg' | 'joint', updates: Partial<TreasuryAccount>) => void;
  
  // Formulas
  sharingSettings: RevenueSharingSetting;
  updateSharingSettings: (settings: Partial<RevenueSharingSetting>) => void;
  
  // Energy
  energyFields: EnergyField[];
  addEnergyField: (field: EnergyField) => void;
  updateEnergyProduction: (id: string, rate: number, price: number) => void;
  
  // Projects
  projects: StrategicProject[];
  addProject: (project: StrategicProject) => void;
  updateProjectLifecycle: (id: string, step: StrategicProject['lifecycle'], percent: number, score: number) => void;
  fundProject: (id: string, amount: number) => void;
  
  // KPIs
  ministryKpis: MinistryKpi[];
  updateMinistryPerformance: (id: string, efficiency: number, delivery: number, execution: number) => void;
  updateSpecificKpi: (ministryId: string, kpiId: string, currentValue: number) => void;
  
  // Crisis Alarms
  crisisAlarms: CrisisAlarm[];
  triggerCrisis: (alarm: Omit<CrisisAlarm, 'id' | 'timeline'>) => void;
  respondToCrisis: (id: string, jurisdiction: 'federal' | 'krg' | 'joint', action: string, nextStatus: CrisisAlarm['federalStatus']) => void;
  
  // Readiness scores
  readinessReport: ReturnType<typeof StateOperatingSystemReadinessEngine.evaluateSsosReadiness>;
}

const SsosContext = createContext<SsosContextData | undefined>(undefined);

// SEED DATA FOR BUDGETS
const SEED_BUDGETS: BudgetItem[] = [
  {
    id: 'BGT-2026-FED-01',
    name: {
      en: 'Federal General Budget Law 2026',
      ar: 'قانون الموازنة العامة الاتحادية لعام ٢٠٢٦',
      ku: 'یاسای بودجەی گشتی فیدراڵ ٢٠٢٦'
    },
    year: 2026,
    jurisdiction: 'federal',
    totalAllocated: 145000, // 145 Billion USD
    expenditureSocial: 32000,
    expenditureSecurity: 28000,
    expenditureDevelopment: 45000,
    expenditureOperating: 40000,
    revenueEstOil: 120000,
    revenueEstNonOil: 25000,
    status: 'Execution'
  },
  {
    id: 'BGT-2026-KRG-01',
    name: {
      en: 'Kurdistan Region Annual Budget Directive',
      ar: 'الموازنة العامة لإقليم كوردستان ٢٠٢٦',
      ku: 'بودجەی گشتی هەرێمی کوردستان ٢٠٢٦'
    },
    year: 2026,
    jurisdiction: 'krg',
    totalAllocated: 18400, // 18.4 Billion USD
    expenditureSocial: 5400,
    expenditureSecurity: 3200,
    expenditureDevelopment: 4800,
    expenditureOperating: 5000,
    revenueEstOil: 13000,
    revenueEstNonOil: 5400,
    status: 'Cabinet Approval'
  },
  {
    id: 'BGT-2026-JNT-01',
    name: {
      en: 'Joint Reconstruction & Border Security Special Fund',
      ar: 'الصندوق المالي المشترك لإعادة الإعمار وأمن الحدود',
      ku: 'سندوقی دارایی هاوبەش بۆ ئاوەدانکردنەوە و ئاسایشی سنوورەکان'
    },
    year: 2026,
    jurisdiction: 'joint',
    totalAllocated: 3500, // 3.5 Billion USD
    expenditureSocial: 500,
    expenditureSecurity: 1500,
    expenditureDevelopment: 1200,
    expenditureOperating: 300,
    revenueEstOil: 0,
    revenueEstNonOil: 3500,
    status: 'Execution'
  }
];

// SEED TREASURIES
const SEED_TREASURY_FED: TreasuryAccount = {
  jurisdiction: 'federal',
  balance: 45200, // Millions USD
  emergencyReserve: 5000,
  revenueCollectedOil: 31200,
  revenueCollectedNonOil: 4200,
  spentSocial: 7500,
  spentSecurity: 8100,
  spentDevelopment: 9000,
  spentOperating: 11000
};

const SEED_TREASURY_KRG: TreasuryAccount = {
  jurisdiction: 'krg',
  balance: 4800, // Millions USD
  emergencyReserve: 600,
  revenueCollectedOil: 3100,
  revenueCollectedNonOil: 1100,
  spentSocial: 1200,
  spentSecurity: 950,
  spentDevelopment: 1100,
  spentOperating: 1400
};

const SEED_TREASURY_JNT: TreasuryAccount = {
  jurisdiction: 'joint',
  balance: 1540, // Millions USD
  emergencyReserve: 150,
  revenueCollectedOil: 0,
  revenueCollectedNonOil: 1200,
  spentSocial: 150,
  spentSecurity: 420,
  spentDevelopment: 380,
  spentOperating: 110
};

// SEED SHARING SETTINGS
const DEFAULT_SHARING_SETTINGS: RevenueSharingSetting = {
  oilFederationRatio: 0.85, // 85% FederalSOMO block, 15% regional (KRG keeping ratio or custom settings)
  customsFederationRatio: 0.50, // 50-50 share for KRG crossings, compliant with border control laws
  taxFederationRatio: 0.20, // 20% shared to Federal pool
  borderFeeRatio: 0.50, // 50% split on international entrances
  federalTransferRatio: 0.1267 // 12.67% of Sovereign general pool is allocated as budget to KRG
};

// SEED OIL FIELDS
const SEED_ENERGY_FIELDS: EnergyField[] = [
  {
    id: 'ENG-FLD-01',
    name: 'Rumaila Oil Field (South Basra)',
    type: 'oil',
    location: 'Basra Governorate',
    jurisdiction: 'federal',
    productionRate: 1420000, // Barrels/day
    exportRate: 1210000,
    domesticRate: 210000,
    pricePerBarrel: 74.5,
    dailyRevenue: 1420000 * 74.5 / 1000000, // in Millions USD
  },
  {
    id: 'ENG-FLD-02',
    name: 'Tawke Petroleum Block',
    type: 'oil',
    location: 'Zakho district, Duhok KRG',
    jurisdiction: 'krg',
    productionRate: 105000,
    exportRate: 98000,
    domesticRate: 7000,
    pricePerBarrel: 74.5,
    dailyRevenue: 105000 * 74.5 / 1000000,
  },
  {
    id: 'ENG-FLD-03',
    name: 'Khormor Gas Complex',
    type: 'gas',
    location: 'Chamchamal, Kurdistan Region',
    jurisdiction: 'joint',
    productionRate: 430000, // MCF/day equivalent
    exportRate: 150000,
    domesticRate: 280000,
    pricePerBarrel: 5.5, // USD per units
    dailyRevenue: 430000 * 5.5 / 1000000,
  },
  {
    id: 'ENG-FLD-04',
    name: 'Kirkuk Baba Gurgur Field',
    type: 'oil',
    location: 'Kirkuk Governorate',
    jurisdiction: 'joint',
    productionRate: 280000,
    exportRate: 240000,
    domesticRate: 4000,
    pricePerBarrel: 74.5,
    dailyRevenue: 280000 * 74.5 / 1000000,
  }
];

// SEED STRATEGIC PROJECTS
const SEED_STRATEGIC_PROJECTS: StrategicProject[] = [
  {
    id: 'PRJ-STR-01',
    name: {
      en: 'Grand Faw Port Terminal Phase 1',
      ar: 'ميناء الفاو الكبير - المرحلة الأولى لكسر الأمواج والبنية الأساسية',
      ku: 'بەندەری گەورەی فاو - قۆناغی یەکەم'
    },
    category: 'Transportation',
    jurisdiction: 'federal',
    totalBudget: 4200, // Millions USD
    fundedAmount: 3100,
    spentAmount: 2450,
    leadMinistry: 'Federal Ministry of Transport',
    lifecycle: 'Execution',
    completionPercentage: 58,
    performanceScore: 88
  },
  {
    id: 'PRJ-STR-02',
    name: {
      en: 'Erbil-Duhok Strategic Water Pipeline System',
      ar: 'شريان نقل المياه الإستراتيجي أربيل-دهوك',
      ku: 'بۆری ئاوی ستراتیژی هەولێر-دهۆک'
    },
    category: 'Infrastructure',
    jurisdiction: 'krg',
    totalBudget: 380,
    fundedAmount: 380,
    spentAmount: 290,
    leadMinistry: 'KRG Ministry of Municipalities & Tourism',
    lifecycle: 'Execution',
    completionPercentage: 76,
    performanceScore: 92
  },
  {
    id: 'PRJ-STR-03',
    name: {
      en: 'Unified Border Digital Terminal Handshake system',
      ar: 'النظام الرقمي الموحد لإصدار وتثبيت الرسوم الجمركية والحلول المصرفية',
      ku: 'سیستەمی دیجیتاڵی هاوبەشی دەروازە سنوورییەکان و چارەسەرکردنی گومرگی'
    },
    category: 'Digital',
    jurisdiction: 'joint',
    totalBudget: 140,
    fundedAmount: 140,
    spentAmount: 135,
    leadMinistry: 'Joint Customs Reconciliation Board',
    lifecycle: 'Inspection',
    completionPercentage: 96,
    performanceScore: 97
  },
  {
    id: 'PRJ-STR-04',
    name: {
      en: 'Kirkuk Gas Flare Capture & Clean Power Project',
      ar: 'مشروع استثمار الغاز المصاحب في حقول كركوك لتوليد الطاقة النظيفة',
      ku: 'پڕۆژەی کۆکردنەوەی غاز لە کێڵگەکانی کەرکووک بۆ کارەبای خاوێن'
    },
    category: 'Energy',
    jurisdiction: 'joint',
    totalBudget: 850,
    fundedAmount: 420,
    spentAmount: 150,
    leadMinistry: 'Joint Ministry of Energy Council',
    lifecycle: 'Procurement',
    completionPercentage: 18,
    performanceScore: 78
  }
];

// SEED MINISTRIES & KPIS
const SEED_MINISTRY_KPIS: MinistryKpi[] = [
  {
    id: 'MIN-FED-MOF',
    name: {
      en: 'Federal Ministry of Finance',
      ar: 'وزارة المالية الاتحادية',
      ku: 'وەزارەتی دارایی فیدراڵ'
    },
    ministry: 'Federal Ministry of Finance',
    jurisdiction: 'federal',
    budgetEfficiency: 82,
    serviceDeliveryRate: 78,
    executionRate: 85,
    performanceScore: 81,
    kpis: [
      {
        id: 'kpi-fed-1',
        label: {
          en: 'Revenue Diversification Index (% of non-oil collected)',
          ar: 'مؤشر تنويع الموارد المالية الإيرادات غير النفطية',
          ku: 'پێوەری هەمەجۆرکردنی داهاتی نانەوتی'
        },
        target: 20,
        current: 16.5,
        weight: 40
      },
      {
        id: 'kpi-fed-2',
        label: {
          en: 'Electronic Auditing systems Adoption frequency',
          ar: 'نسبة أتمتة تدقيق ومراقبة النفقات البلدية والمحلية',
          ku: 'ڕێژەی سیستەمی ئەلیکترۆنی بۆ چاودێری نفقات'
        },
        target: 100,
        current: 82,
        weight: 60
      }
    ]
  },
  {
    id: 'MIN-KRG-MOFE',
    name: {
      en: 'KRG Ministry of Finance & Economy',
      ar: 'وزارة المالية والاقتصاد في إقليم كوردستان',
      ku: 'وەزارەتی دارایی و ابوری هەرێمی کوردستان'
    },
    ministry: 'KRG Ministry of Finance & Economy',
    jurisdiction: 'krg',
    budgetEfficiency: 74,
    serviceDeliveryRate: 80,
    executionRate: 69,
    performanceScore: 74,
    kpis: [
      {
        id: 'kpi-krg-1',
        label: {
          en: 'Digital tax register resolution rate',
          ar: 'مستوى الربط والمطابقة الرقمية للشركات الإقليمية الخاضعة للضريبة',
          ku: 'ڕێژەی جێگیرکردنی سیستەمی باجی دیجیتاڵی بۆ کۆمپانیا ناوچەییەکان'
        },
        target: 95,
        current: 78,
        weight: 50
      },
      {
        id: 'kpi-krg-2',
        label: {
          en: 'Customs transit data sync timeliness',
          ar: 'سرعة مطابقة ومزامنة بيانات الشحنات العابرة للمنافذ الحدودية لدا داتا سنتر أربيل',
          ku: 'مەودای هاوتاکردنی داتاکانی ترانزێت لە سێنتەری هەولێر'
        },
        target: 100,
        current: 72,
        weight: 50
      }
    ]
  },
  {
    id: 'MIN-JNT-BCC',
    name: {
      en: 'Joint Border Coordination Commission',
      ar: 'الهيئة المشتركة العليا لتنسيق الحدود وحركة البضائع الموحدة',
      ku: 'کۆمیسیۆنی هاوبەشی ڕێکخستنی سنوورەکان و جووڵەی کاڵاکان'
    },
    ministry: 'Joint Border Coordination Commission',
    jurisdiction: 'joint',
    budgetEfficiency: 92,
    serviceDeliveryRate: 90,
    executionRate: 98,
    performanceScore: 93,
    kpis: [
      {
        id: 'kpi-jnt-1',
        label: {
          en: 'Discrepancy mitigation rate on joint tariff valuations',
          ar: 'نسبة حل ومعالجة التناقض الجمركي والقيمي على البضائع الموحدة',
          ku: 'ڕێژەی چارەسەرکردنی کێشەکانی تایبەت بە نرخاندنی کاڵاکان'
        },
        target: 100,
        current: 95,
        weight: 50
      },
      {
        id: 'kpi-jnt-2',
        label: {
          en: 'Joint border station response delay threshold (hours)',
          ar: 'زمن إنهاء الشكاوى والمعاملات الجمركية المشتركة المعلقة',
          ku: 'ماوەی نەمانی پەڕاوە کێشەدارەکان لە دەروازە گومرگییەکاندا'
        },
        target: 2,
        current: 1.8,
        weight: 50
      }
    ]
  }
];

// SEED CRISIS ALARMS
const SEED_CRISIS_ALARMS: CrisisAlarm[] = [
  {
    id: 'CRS-ALRM-101',
    title: {
      en: 'Parviz Khan Crossing Customs Discrepancy Logjam',
      ar: 'تكدس حركة الشحن والبضائع عند منفذ برويزخان الحدودي لعدم مطابقة الترميز',
      ku: 'وەستانی کاڵاکان لە مەرزی پەروێزخان بەهۆی ناڕوونی لە کۆدە گومرگییەکان'
    },
    type: 'border',
    jurisdiction: 'joint',
    severity: 'critical',
    details: 'A critical system mismatch in HS Code interpretation has caused over 420 industrial freight trucks carrying chemicals and fertilizers to stall at the crossing. Importers demand urgent high-level policy reconciliation.',
    leadAuthority: 'Joint Border Coordination Commission & Customs Board',
    federalStatus: 'RESPONDING',
    krgStatus: 'RESPONDING',
    jointStatus: 'RESPONDING',
    timeline: [
      {
        time: '2026-06-08T09:15:00Z',
        action: 'Border signal triggered; physical cargo queues detected with Satellite imagery.',
        actor: 'Border Operations Center System'
      },
      {
        time: '2026-06-08T10:45:00Z',
        action: 'Federal Customs dispatched digital reconciliation key to Erbil Server Block.',
        actor: 'Federal Customs Director (Haidar Al-Zubaidi)'
      }
    ]
  },
  {
    id: 'CRS-ALRM-102',
    title: {
      en: 'Inflation-driven Exchange Liquidity Volatility Warning',
      ar: 'تقلبات حادة في وفرة الدينار والسيولة الأجنبية في البنوك الإقليمية',
      ku: 'مەترسی نەختینە و نەمانی دراو لە بانکە ناوچەییەکان بەهۆی ئالۆزی ئابوورییەوە'
    },
    type: 'economic',
    jurisdiction: 'federal',
    severity: 'major',
    details: 'Unregulated parallel market cash flows in secondary exchange terminals are putting strain on regional banking reserves in northern provinces. Requires synchronized Central Bank intervention limits.',
    leadAuthority: 'Central Bank of Iraq (CBI)',
    federalStatus: 'RESPONDING',
    krgStatus: 'STANDBY',
    jointStatus: 'STANDBY',
    timeline: [
      {
        time: '2026-06-08T11:00:00Z',
        action: 'Trigger alerted; parallel exchange margin crossed threshold value (>145,000 IQD).',
        actor: 'CBI Financial Monitoring Engine'
      }
    ]
  }
];

export const SsosProvider: React.FC<{ children: React.ReactNode; lang: 'en' | 'ar' | 'ku' }> = ({ children, lang }) => {
  const { logAction } = useGovernment();
  
  // Active Modes: SEPARATED | FEDERATED | UNIFIED
  const [ssosMode, setSsosMode] = useState<SsosMode>(() => {
    return (localStorage.getItem('idg_ssos_mode') as SsosMode) || 'FEDERATED';
  });

  // State initialization
  const [budgets, setBudgets] = useState<BudgetItem[]>(SEED_BUDGETS);
  const [sharingSettings, setSharingSettings] = useState<RevenueSharingSetting>(DEFAULT_SHARING_SETTINGS);
  
  const [federalTreasury, setFederalTreasury] = useState<TreasuryAccount>(SEED_TREASURY_FED);
  const [krgTreasury, setKrgTreasury] = useState<TreasuryAccount>(SEED_TREASURY_KRG);
  const [jointTreasury, setJointTreasury] = useState<TreasuryAccount>(SEED_TREASURY_JNT);
  
  const [energyFields, setEnergyFields] = useState<EnergyField[]>(SEED_ENERGY_FIELDS);
  const [projects, setProjects] = useState<StrategicProject[]>(SEED_STRATEGIC_PROJECTS);
  const [ministryKpis, setMinistryKpis] = useState<MinistryKpi[]>(SEED_MINISTRY_KPIS);
  const [crisisAlarms, setCrisisAlarms] = useState<CrisisAlarm[]>(SEED_CRISIS_ALARMS);

  // Sync mode changes to localStorage
  useEffect(() => {
    localStorage.setItem('idg_ssos_mode', ssosMode);
    logAction(
      'Sovereign OS Kernel',
      `Dynamic State Operating System Mode shifted to: ${ssosMode}. Access parameters, sharing formulas, and joint balances recalculated.`,
      'SSOS_KERNEL_MODE_SHIFT'
    );
  }, [ssosMode]);

  // Handle budgets actions
  const addBudget = (budget: BudgetItem) => {
    setBudgets(prev => [...prev, budget]);
    logAction(
      'Cabinet Secretary Desk',
      `Drafted and registered new fiscal budget document ${budget.id} with allocation $${budget.totalAllocated}M USD.`,
      'BUDGET_FISCAL_PLAN'
    );
  };

  const updateBudgetStatus = (id: string, status: BudgetItem['status']) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    logAction(
      'Sovereign Parliament Controller',
      `Transitioned budget ${id} status to [${status}]. Verified compliance against spending rules.`,
      'BUDGET_STAGE_TRANSITION'
    );
  };

  // Dynamic revenue allocations from settings and sources
  const [allocationSummary, setAllocationSummary] = useState<ReturnType<typeof RevenueSharingEngine.processAllocations>>(() => {
    return RevenueSharingEngine.processAllocations({
      oilKrg: SEED_TREASURY_KRG.revenueCollectedOil,
      oilFed: SEED_TREASURY_FED.revenueCollectedOil,
      nonOilKrg: SEED_TREASURY_KRG.revenueCollectedNonOil,
      nonOilFed: SEED_TREASURY_FED.revenueCollectedNonOil,
      customsKrg: SEED_TREASURY_KRG.spentOperating * 0.4, // derived estimation
      customsFed: SEED_TREASURY_FED.spentOperating * 0.3, 
      taxesKrg: 410,
      taxesFed: 1200,
      borderKrg: 310,
      borderFed: 950
    }, DEFAULT_SHARING_SETTINGS, ssosMode);
  });

  // Calculate whenever collections, settings, or modes are modified
  useEffect(() => {
    const rawCustomsFed = Math.round(federalTreasury.revenueCollectedNonOil * 0.4);
    const rawCustomsKrg = Math.round(krgTreasury.revenueCollectedNonOil * 0.5);
    const rawTaxesFed = Math.round(federalTreasury.revenueCollectedNonOil * 0.45);
    const rawTaxesKrg = Math.round(krgTreasury.revenueCollectedNonOil * 0.4);
    const rawBordersFed = Math.round(federalTreasury.revenueCollectedNonOil * 0.15);
    const rawBordersKrg = Math.round(krgTreasury.revenueCollectedNonOil * 0.1);

    const summary = RevenueSharingEngine.processAllocations({
      oilKrg: krgTreasury.revenueCollectedOil,
      oilFed: federalTreasury.revenueCollectedOil,
      nonOilKrg: krgTreasury.revenueCollectedNonOil,
      nonOilFed: federalTreasury.revenueCollectedNonOil,
      customsKrg: rawCustomsKrg,
      customsFed: rawCustomsFed,
      taxesKrg: rawTaxesKrg,
      taxesFed: rawTaxesFed,
      borderKrg: rawBordersKrg,
      borderFed: rawBordersFed
    }, sharingSettings, ssosMode);

    setAllocationSummary(summary);
  }, [federalTreasury, krgTreasury, sharingSettings, ssosMode]);

  const updateTreasuryAccount = (jurisdiction: 'federal' | 'krg' | 'joint', updates: Partial<TreasuryAccount>) => {
    const logDetails: string[] = [];
    if (jurisdiction === 'federal') {
      setFederalTreasury(prev => {
        Object.keys(updates).forEach(k => logDetails.push(`${k}: ${updates[k as keyof TreasuryAccount]}`));
        return { ...prev, ...updates } as TreasuryAccount;
      });
    } else if (jurisdiction === 'krg') {
      setKrgTreasury(prev => {
        Object.keys(updates).forEach(k => logDetails.push(`${k}: ${updates[k as keyof TreasuryAccount]}`));
        return { ...prev, ...updates } as TreasuryAccount;
      });
    } else {
      setJointTreasury(prev => {
        Object.keys(updates).forEach(k => logDetails.push(`${k}: ${updates[k as keyof TreasuryAccount]}`));
        return { ...prev, ...updates } as TreasuryAccount;
      });
    }
    logAction(
      'Central Treasury Auditor',
      `Recalculated parameters on ${jurisdiction} ledger account parameters: [${logDetails.join(', ')}]`,
      'TREASURY_ACCOUNT_UPDATE'
    );
  };

  const updateSharingSettings = (settings: Partial<RevenueSharingSetting>) => {
    setSharingSettings(prev => ({ ...prev, ...settings }));
    logAction(
      'Joint Executive Council',
      `Amended Revenue Sharing setting parameters: [${Object.keys(settings).map(k => `${k} -> ${settings[k as keyof RevenueSharingSetting]}`).join(', ')}].`,
      'REVENUE_SHARING_POLICY_REVISION'
    );
  };

  // Energy fields actions
  const addEnergyField = (field: EnergyField) => {
    setEnergyFields(prev => [...prev, field]);
    logAction(
      'Ministry of Oil & Mineral Registry',
      `Registered new energy production asset: ${field.name} with production capacity ${field.productionRate} barrels/day.`,
      'SOVEREIGN_ENERGY_RESOURCE'
    );
  };

  const updateEnergyProduction = (id: string, rate: number, price: number) => {
    setEnergyFields(prev => prev.map(f => f.id === id ? { ...f, productionRate: rate, pricePerBarrel: price, dailyRevenue: rate * price / 1000000 } : f));
    logAction(
      'Joint Production Command Monitor',
      `Updated production output data for Energy resource ID ${id} to ${rate} units at current price $${price} USD.`,
      'ENERGY_PRODUCTION_DATA'
    );
  };

  // Projects actions
  const addProject = (project: StrategicProject) => {
    setProjects(prev => [...prev, project]);
    logAction(
      'National Development Board',
      `Added strategic infrastructure program [ID: ${project.id}] with budget allocation of $${project.totalBudget}M USD.`,
      'NATIONAL_PROJECTS_REGISTRY'
    );
  };

  const updateProjectLifecycle = (id: string, step: StrategicProject['lifecycle'], percent: number, score: number) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, lifecycle: step, completionPercentage: percent, performanceScore: score } : p));
    logAction(
      'Inspection and Audit Authority',
      `Registered field progress inspection for project ${id}. Phase transition: [${step}], Completion: ${percent}%, Safety score: ${score}%.`,
      'PROJECT_PROGRESS_AUDIT'
    );
  };

  const fundProject = (id: string, amount: number) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, fundedAmount: Math.min(p.totalBudget, p.fundedAmount + amount) } : p));
    logAction(
      'Sovereign Allocation Office',
      `Transferred strategic capital development tranche worth $${amount}M USD to Project ID: ${id}.`,
      'CAPITAL_EXPENDITURE_DISBURSEMENT'
    );
  };

  // KPI actions
  const updateMinistryPerformance = (id: string, efficiency: number, delivery: number, execution: number) => {
    setMinistryKpis(prev => prev.map(prevK => {
      if (prevK.id === id) {
        return {
          ...prevK,
          budgetEfficiency: efficiency,
          serviceDeliveryRate: delivery,
          executionRate: execution,
          performanceScore: Math.round((efficiency + delivery + execution) / 3)
        };
      }
      return prevK;
    }));
    logAction(
      'Cabinet Performance Metrics Audit',
      `Audited operational performance metrics for ${id}. New indices allocated.`,
      'GOVERNMENT_EFFICIENCY_METRICS'
    );
  };

  const updateSpecificKpi = (ministryId: string, kpiId: string, currentValue: number) => {
    setMinistryKpis(prev => prev.map(m => {
      if (m.id === ministryId) {
        const updatedKpis = m.kpis.map(k => k.id === kpiId ? { ...k, current: currentValue } : k);
        return { ...m, kpis: updatedKpis };
      }
      return m;
    }));
  };

  // Crisis Alarms actions
  const triggerCrisis = (alarm: Omit<CrisisAlarm, 'id' | 'timeline'>) => {
    const id = `CRS-ALRM-${Date.now()}`;
    const newAlarm: CrisisAlarm = {
      ...alarm,
      id,
      timeline: [
        {
          time: new Date().toISOString(),
          action: `Incident alarm activated: ${alarm.title.en}`,
          actor: 'Emergency Command Daemon'
        }
      ]
    };
    setCrisisAlarms(prev => [newAlarm, ...prev]);
    logAction(
      'Joint Emergency Response Room',
      `⚠️ CRITICAL ALARM GREGATED: ${alarm.title.en} (${alarm.type.toUpperCase()}). Emergency protocol deployed.`,
      'CRISIS_SITUATION_ROOM_WARN'
    );
  };

  const respondToCrisis = (id: string, jurisdiction: 'federal' | 'krg' | 'joint', action: string, nextStatus: CrisisAlarm['federalStatus']) => {
    setCrisisAlarms(prev => prev.map(c => {
      if (c.id === id) {
        const updatedTime = [...c.timeline, {
          time: new Date().toISOString(),
          action,
          actor: `Command Response Office (${jurisdiction.toUpperCase()})`
        }];

        const updates: Partial<CrisisAlarm> = {
          timeline: updatedTime
        };

        if (jurisdiction === 'federal') {
          updates.federalStatus = nextStatus;
        } else if (jurisdiction === 'krg') {
          updates.krgStatus = nextStatus;
        } else {
          updates.jointStatus = nextStatus;
        }

        return { ...c, ...updates };
      }
      return c;
    }));

    logAction(
      'Sovereign Crisis Control',
      `Registered command mitigation response for Alarm ${id} by ${jurisdiction.toUpperCase()} authority: ${action}. State: ${nextStatus}.`,
      'CRISIS_RESPONSE_MITIGATION'
    );
  };

  // Compute validation readiness score
  const [readinessReport, setReadinessReport] = useState<ReturnType<typeof StateOperatingSystemReadinessEngine.evaluateSsosReadiness>>(() => {
    return StateOperatingSystemReadinessEngine.evaluateSsosReadiness(
      federalTreasury,
      krgTreasury,
      SEED_BUDGETS,
      SEED_STRATEGIC_PROJECTS,
      SEED_CRISIS_ALARMS,
      ssosMode
    );
  });

  // Re-evaluate whenever state parameters change
  useEffect(() => {
    const report = StateOperatingSystemReadinessEngine.evaluateSsosReadiness(
      federalTreasury,
      krgTreasury,
      budgets,
      projects,
      crisisAlarms,
      ssosMode
    );
    setReadinessReport(report);
  }, [federalTreasury, krgTreasury, budgets, projects, crisisAlarms, ssosMode]);

  return (
    <SsosContext.Provider value={{
      ssosMode,
      setSsosMode,
      budgets,
      addBudget,
      updateBudgetStatus,
      federalTreasury,
      krgTreasury,
      jointTreasury,
      allocationSummary,
      updateTreasuryAccount,
      sharingSettings,
      updateSharingSettings,
      energyFields,
      addEnergyField,
      updateEnergyProduction,
      projects,
      addProject,
      updateProjectLifecycle,
      fundProject,
      ministryKpis,
      updateMinistryPerformance,
      updateSpecificKpi,
      crisisAlarms,
      triggerCrisis,
      respondToCrisis,
      readinessReport
    }}>
      {children}
    </SsosContext.Provider>
  );
};

export const useSsos = () => {
  const context = useContext(SsosContext);
  if (!context) {
    throw new Error('useSsos must be used within an SsosProvider');
  }
  return context;
};
export default SsosProvider;
