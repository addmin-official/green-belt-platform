import { Vendor, Tender, Bid, Contract, ProcurementPolicy, ProcurementLedgerRecord, Jurisdiction } from './ProcurementTypes';

// We initialize real, functional seed data in the registry, and make it fully reactive & persistent using localStorage.

const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'vn-01',
    name: {
      en: 'Al-Mansour Construction Ltd',
      ar: 'شركة المنصور للمقاولات المحدودة',
      ku: 'کۆمپانیای بیناسازی مەنسوور',
    },
    registrationNumber: 'IQ-FED-8849',
    jurisdiction: 'federal',
    category: 'Strategic Infrastructure',
    qualificationScore: 88,
    supplierRiskScore: 18,
    status: 'Approved',
    completedContracts: 12,
    activeContracts: 2,
    totalContractValueUSD: 145.5,
    complianceRating: 94,
    lastAudited: '2026-04-12',
  },
  {
    id: 'vn-02',
    name: {
      en: 'Zagros Energy Infrastructure',
      ar: 'زاغروس للبنية التحتية للطاقة',
      ku: 'زاگرۆس بۆ ژێرخانی وزە',
    },
    registrationNumber: 'IQ-KRG-2201',
    jurisdiction: 'krg',
    category: 'Energy Systems',
    qualificationScore: 92,
    supplierRiskScore: 12,
    status: 'Approved',
    completedContracts: 8,
    activeContracts: 1,
    totalContractValueUSD: 89.0,
    complianceRating: 96,
    lastAudited: '2026-05-02',
  },
  {
    id: 'vn-03',
    name: {
      en: 'Mesopotamia Digital Solutions',
      ar: 'بلاد الرافدين للحلول الرقمية',
      ku: 'چارەسەرە دیجیتاڵییەکانی میسۆپۆتامیا',
    },
    registrationNumber: 'IQ-INT-5544',
    jurisdiction: 'joint',
    category: 'Digital & Technology',
    qualificationScore: 85,
    supplierRiskScore: 25,
    status: 'Approved',
    completedContracts: 6,
    activeContracts: 3,
    totalContractValueUSD: 42.8,
    complianceRating: 89,
    lastAudited: '2026-03-20',
  },
  {
    id: 'vn-04',
    name: {
      en: 'Erbil Steel & Concrete Alliance',
      ar: 'تحالف أربيل للحديد والخرسانة',
      ku: 'هاوپەیمانی ئاسن و کۆنکرێتی هەولێر',
    },
    registrationNumber: 'IQ-KRG-4940',
    jurisdiction: 'krg',
    category: 'Strategic Infrastructure',
    qualificationScore: 78,
    supplierRiskScore: 35,
    status: 'Under Review',
    completedContracts: 4,
    activeContracts: 1,
    totalContractValueUSD: 23.2,
    complianceRating: 82,
    lastAudited: '2026-05-18',
  },
  {
    id: 'vn-05',
    name: {
      en: 'Tigris Defense Logistics',
      ar: 'دجلة للخدمات الدفاعية واللوجستية',
      ku: 'لۆجیستیکی بەرگری دیجلە',
    },
    registrationNumber: 'IQ-FED-9321',
    jurisdiction: 'federal',
    category: 'Defense & Security',
    qualificationScore: 95,
    supplierRiskScore: 5,
    status: 'Approved',
    completedContracts: 15,
    activeContracts: 2,
    totalContractValueUSD: 310.0,
    complianceRating: 98,
    lastAudited: '2026-02-15',
  },
  {
    id: 'vn-06',
    name: {
      en: 'Nishtiman General Trading',
      ar: 'نيشتيمان للتجارة العامة',
      ku: 'کۆمپانیای نیشتمان بۆ بازرگانی گشتی',
    },
    registrationNumber: 'IQ-KRG-3031',
    jurisdiction: 'krg',
    category: 'General Supplies',
    qualificationScore: 62,
    supplierRiskScore: 72,
    status: 'Suspended',
    completedContracts: 3,
    activeContracts: 0,
    totalContractValueUSD: 8.5,
    complianceRating: 58,
    lastAudited: '2026-04-30',
  }
];

const INITIAL_TENDERS: Tender[] = [
  {
    id: 'td-01',
    title: {
      en: 'Baghdad-Erbil High-Speed Fiber Backbone',
      ar: 'خط الألياف الضوئية السريع المشترك بغداد-أربيل',
      ku: 'هێڵی ڕیشاڵی تیشکی خێرا نێوان بەغداد-هەولێر',
    },
    category: 'Digital & Technology',
    jurisdiction: 'joint',
    budgetUSD: 35.0,
    authority: 'Joint Regulatory Telecom Council (JRTC)',
    status: 'Evaluation',
    publishDate: '2026-05-01',
    closingDate: '2026-06-15',
    requirements: [
      'Minimum technical score of 80',
      'Dual route redundancy across federal and regional lines',
      'Unified encryption key standard certification',
    ],
    minimumScoreRequired: 80,
    bidIds: ['bd-01', 'bd-02'],
  },
  {
    id: 'td-02',
    title: {
      en: 'Fao Port Terminal Control Infrastructure',
      ar: 'البنية التحتية لمنظومة التحكم في ميناء الفاو الكبير',
      ku: 'ژێرخانی سیستەمی کۆنتڕۆڵی بەندەری فاو',
    },
    category: 'Strategic Infrastructure',
    jurisdiction: 'federal',
    budgetUSD: 180.0,
    authority: 'Federal Ministry of Transport',
    status: 'Bid Open',
    publishDate: '2026-05-10',
    closingDate: '2026-07-01',
    requirements: [
      'Industrial grade port control management software',
      'Civil defense approval and 10-year structures assurance',
      'Compliance with Federal Marine Security protocols',
    ],
    minimumScoreRequired: 85,
    bidIds: [],
  },
  {
    id: 'td-03',
    title: {
      en: 'KRG Smart Cities Power Grid Modernization',
      ar: 'تحديث شبكة الكهرباء الذكية للمدن في الإقليم',
      ku: 'نوێکردنەوەی جۆری زیرەکی کارەبا بۆ شارەکانی هەرێم',
    },
    category: 'Energy Systems',
    jurisdiction: 'krg',
    budgetUSD: 75.0,
    authority: 'KRG Ministry of Electricity',
    status: 'Published',
    publishDate: '2026-05-25',
    closingDate: '2026-06-30',
    requirements: [
      'Integration with existing regional metering nodes',
      'KRG energy governance compatibility license',
      'Minimum localized engineering staffing of 40%',
    ],
    minimumScoreRequired: 75,
    bidIds: [],
  }
];

const INITIAL_BIDS: Bid[] = [
  {
    id: 'bd-01',
    tenderId: 'td-01',
    vendorId: 'vn-03',
    vendorName: 'Mesopotamia Digital Solutions',
    proposalUSD: 32.5,
    technicalScore: 88,
    financialScore: 90,
    overallScore: 89,
    complianceChecked: true,
    complianceViolations: [],
    submissionDate: '2026-05-20',
    status: 'Under Review',
  },
  {
    id: 'bd-02',
    tenderId: 'td-01',
    vendorId: 'vn-02',
    vendorName: 'Zagros Energy Infrastructure',
    proposalUSD: 36.8,
    technicalScore: 82,
    financialScore: 78,
    overallScore: 80,
    complianceChecked: true,
    complianceViolations: [],
    submissionDate: '2026-05-22',
    status: 'Under Review',
  }
];

const INITIAL_CONTRACTS: Contract[] = [
  {
    id: 'ct-01',
    tenderId: 'td-01',
    vendorId: 'vn-03',
    vendorName: 'Mesopotamia Digital Solutions',
    title: {
      en: 'Baghdad-Erbil High-Speed Fiber Backbone',
      ar: 'خط الألياف الضوئية السريع المشترك بغداد-أربيل',
      ku: 'هێڵی ڕیشاڵی تیشکی خێرا نێوان بەغداد-هەولێر',
    },
    jurisdiction: 'joint',
    valueUSD: 32.5,
    spentUSD: 12.0,
    authority: 'Joint Regulatory Telecom Council (JRTC)',
    signingDate: '2026-05-28',
    completionDate: '2027-05-28',
    status: 'Active',
    milestones: [
      {
        id: 'ms-1',
        description: { en: 'Geotechnical & Survey Work Approval', ar: 'الموافقة على المسوحات الجغرافية والفنية', ku: 'پەسەندکردنی نەخشە و ڕووپێوی زەوی' },
        dueDate: '2026-07-15',
        weight: 15,
        status: 'Approved',
        progress: 100,
      },
      {
        id: 'ms-2',
        description: { en: 'Core fiber roll-out Phase A', ar: 'مد الألياف الضوئية - المرحلة الأولى', ku: 'ڕاکێشانی هێڵی ڕیشاڵی - قۆناغی یەکەم' },
        dueDate: '2026-11-20',
        weight: 45,
        status: 'Pending',
        progress: 30,
      },
      {
        id: 'ms-3',
        description: { en: 'Unified exchange terminal handshake tests', ar: 'فحوصات الربط والتبادل الموحد لمحطات الاتصال', ku: 'تاقیکردنەوەی سەرەکی پێکەوەبەستنی وێستگەکان' },
        dueDate: '2027-03-10',
        weight: 40,
        status: 'Pending',
        progress: 0,
      }
    ],
    performanceScore: 92,
  }
];

const INITIAL_POLICIES: ProcurementPolicy[] = [
  {
    id: 'pl-01',
    title: {
      en: 'Federal Infrastructure Threshold Protection Policy',
      ar: 'سياسة حماية مستويات الإنفاق الاتحادي على البنى التحتية',
      ku: 'سیاسەتی پاراستنی ئاستی خەرجی ژێرخانی فیدراڵ',
    },
    jurisdiction: 'federal',
    thresholdMillionsUSD: 50.0,
    approvalRequiredBy: 'Cabinet',
    complianceRules: [
      'Must go through a public tender bid dynamic auction',
      'Sovereign escrow matching validation mandatory before signing',
      'Performance audit checkpoints scheduled every 20% completion',
    ],
    active: true,
  },
  {
    id: 'pl-02',
    title: {
      en: 'KRG Local Labor & Materials Sovereignty Act',
      ar: 'قانون تفضيل العمالة والمواد المحلية للإقليم',
      ku: 'یاسای فەرماندەیی دەستی کار و کەرەستەی خۆماڵی لە هەرێم',
    },
    jurisdiction: 'krg',
    thresholdMillionsUSD: 10.0,
    approvalRequiredBy: 'Ministry',
    complianceRules: [
      'Minimum localized labor force threshold set to 35%',
      'Regional environmental inspection clearance certificate required',
    ],
    active: true,
  },
  {
    id: 'pl-03',
    title: {
      en: 'Joint Intergovernmental Procurement Harmonization Treaty',
      ar: 'معاهدة تنسيق المشتريات والتعاقدات الحكومية المشتركة',
      ku: 'پەیماننامەی یەکخستنی گرێبەستە نیشتمانییە هاوبەشەکان',
    },
    jurisdiction: 'joint',
    thresholdMillionsUSD: 25.0,
    approvalRequiredBy: 'Joint Council',
    complianceRules: [
      'Requires bi-lateral prime minister validation of joint budget utilization',
      'Vendor must have registration clearances in both Baghdad and Erbil portals',
      'Sovereign Ledger cryptographic commitment before funds release',
    ],
    active: true,
  }
];

export class ProcurementRegistry {
  private static getStored<T>(key: string, initial: T[]): T[] {
    const raw = localStorage.getItem(`procurement_${key}`);
    if (!raw) return initial;
    try {
      return JSON.parse(raw);
    } catch {
      return initial;
    }
  }

  private static setStored<T>(key: string, data: T[]): void {
    localStorage.setItem(`procurement_${key}`, JSON.stringify(data));
  }

  static getVendors(): Vendor[] {
    return this.getStored<Vendor>('vendors', INITIAL_VENDORS);
  }

  static saveVendors(vendors: Vendor[]): void {
    this.setStored<Vendor>('vendors', vendors);
  }

  static getTenders(): Tender[] {
    return this.getStored<Tender>('tenders', INITIAL_TENDERS);
  }

  static saveTenders(tenders: Tender[]): void {
    this.setStored<Tender>('tenders', tenders);
  }

  static getBids(): Bid[] {
    return this.getStored<Bid>('bids', INITIAL_BIDS);
  }

  static saveBids(bids: Bid[]): void {
    this.setStored<Bid>('bids', bids);
  }

  static getContracts(): Contract[] {
    return this.getStored<Contract>('contracts', INITIAL_CONTRACTS);
  }

  static saveContracts(contracts: Contract[]): void {
    this.setStored<Contract>('contracts', contracts);
  }

  static getPolicies(): ProcurementPolicy[] {
    return this.getStored<ProcurementPolicy>('policies', INITIAL_POLICIES);
  }

  static savePolicies(policies: ProcurementPolicy[]): void {
    this.setStored<ProcurementPolicy>('policies', policies);
  }

  static getLedger(): ProcurementLedgerRecord[] {
    return this.getStored<ProcurementLedgerRecord>('ledger', []);
  }

  static saveLedger(ledger: ProcurementLedgerRecord[]): void {
    this.setStored<ProcurementLedgerRecord>('ledger', ledger);
  }

  // Log action inside our encrypted-like Sovereign Procurement Ledger
  static logToLedger(
    action: string,
    entityType: ProcurementLedgerRecord['entityType'],
    entityId: string,
    actor: string,
    payload: any
  ): void {
    const ledger = this.getLedger();
    const id = `lg-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    const payloadStr = JSON.stringify(payload);
    
    // Simple mock signature calculation simulating military-grade sovereign PKI
    const signatureSource = `${timestamp}|${action}|${entityType}|${entityId}|${actor}|${payloadStr}`;
    let signatureHash = 0;
    for (let i = 0; i < signatureSource.length; i++) {
      const char = signatureSource.charCodeAt(i);
      signatureHash = (signatureHash << 5) - signatureHash + char;
      signatureHash = signatureHash & signatureHash; // Convert to 32bit integer
    }
    const signature = `SHA256:SECURE_SIG_${Math.abs(signatureHash).toString(16).toUpperCase()}`;

    const newRecord: ProcurementLedgerRecord = {
      id,
      timestamp,
      action,
      entityType,
      entityId,
      actor,
      signature,
      payload: payloadStr,
    };

    ledger.unshift(newRecord);
    this.saveLedger(ledger);
  }

  static flushToDefaults(): void {
    localStorage.removeItem('procurement_vendors');
    localStorage.removeItem('procurement_tenders');
    localStorage.removeItem('procurement_bids');
    localStorage.removeItem('procurement_contracts');
    localStorage.removeItem('procurement_policies');
    localStorage.removeItem('procurement_ledger');
  }
}
