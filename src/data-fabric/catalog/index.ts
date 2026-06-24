// IDG National Data Fabric - Unified Catalog & Discovery Registry
// Compliant with Federal Data Architecture Guidelines and Iraqi Secure Protocols

export type DatasetClassification = 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';

export interface CrossMinistryMapping {
  sourceField: string;
  targetMinistry: string;
  targetDatasetId: string;
  targetField: string;
  syncMechanism: 'REAL_TIME_WEBHOOK' | 'NIGHTLY_BATCH' | 'ON_DEMAND_QUERY';
  transformationRule?: string;
}

export interface CatalogDataset {
  id: string;
  name: { en: string; ar: string; ku: string };
  description: { en: string; ar: string; ku: string };
  ownerMinistry: string;
  dataSteward: string;
  stewardEmail: string;
  classification: DatasetClassification;
  qualityScore: number; // calculated from metric rules
  recordCount: number;
  apiEndpoints: string[];
  mappings: CrossMinistryMapping[];
}

export class NationalDataCatalog {
  private static instance: NationalDataCatalog;
  private datasets: Map<string, CatalogDataset> = new Map();

  private constructor() {
    this.seedNationalRegistry();
  }

  public static getInstance(): NationalDataCatalog {
    if (!NationalDataCatalog.instance) {
      NationalDataCatalog.instance = new NationalDataCatalog();
    }
    return NationalDataCatalog.instance;
  }

  private seedNationalRegistry() {
    // 1. Unified Citizens Registry (Civil Status IDG Core)
    this.datasets.set('ds-national-citizens-01', {
      id: 'ds-national-citizens-01',
      name: {
        en: 'National Unified Citizen Master Record',
        ar: 'السجل الموحد للمواطنين الوطنيين',
        ku: 'تۆماری نیشتمانیی یەکگرتووی هاووڵاتیان'
      },
      description: {
        en: 'The single source of truth for unified civil identities, national registration status, and biometric mappings.',
        ar: 'المصدر الوحيد للحقيقة للهويات المدنية الموحدة وحالة التسجيل الوطني ورسم الخرائط البيومترية.',
        ku: 'سەرچاوەی بێهامتا بۆ ناسنامە سڤیلە یەکگرتووەکان و دۆخی تۆماری نیشتمانی.'
      },
      ownerMinistry: 'Ministry of Interior',
      dataSteward: 'Directorate of National Cards',
      stewardEmail: 'steward.interior@idg.gov.iq',
      classification: 'TOP_SECRET',
      qualityScore: 98.4,
      recordCount: 42100850,
      apiEndpoints: ['/api/v1/data/identity/citizens/resolve', '/api/v1/data/identity/citizens/biometric-verify'],
      mappings: [
        {
          sourceField: 'nationalCardId',
          targetMinistry: 'Ministry of Finance',
          targetDatasetId: 'ds-taxpayer-directory-02',
          targetField: 'citizenTin',
          syncMechanism: 'REAL_TIME_WEBHOOK',
          transformationRule: 'TRIM_WHITESPACE && RESOLVING_SALT'
        },
        {
          sourceField: 'passportNumber',
          targetMinistry: 'Customs Authority',
          targetDatasetId: 'ds-border-clearance-04',
          targetField: 'passengerPassport',
          syncMechanism: 'REAL_TIME_WEBHOOK'
        }
      ]
    });

    // 2. National Businesses Registry
    this.datasets.set('ds-commercial-companies-02', {
      id: 'ds-commercial-companies-02',
      name: {
        en: 'National Registered Companies Catalog',
        ar: 'دليل الشركات المسجلة الوطنية',
        ku: 'تۆماری کۆمپانیا تۆمارکراوە نیشتمانییەکان'
      },
      description: {
        en: 'Comprehensive business entity master containing import permits, capital validation, and board members.',
        ar: 'دليل شامل للكيانات التجارية يحتوي على تراخيص الاستيراد والتحقق من رأس المال ومجلس الإدارة.',
        ku: 'تۆماری گشتگیری قەوارە بازرگانییەکان کە مۆڵەتی هاوردەکردنی تێدایە.'
      },
      ownerMinistry: 'Ministry of Trade',
      dataSteward: 'Sovereign Company Registrar Directorate',
      stewardEmail: 'steward.trade@idg.gov.iq',
      classification: 'CONFIDENTIAL',
      qualityScore: 94.2,
      recordCount: 184500,
      apiEndpoints: ['/api/v1/data/commercial/companies/lookup', '/api/v1/data/commercial/permits/verify'],
      mappings: [
        {
          sourceField: 'taxId',
          targetMinistry: 'Ministry of Finance',
          targetDatasetId: 'ds-[#E0A96D]',
          targetField: 'businessTin',
          syncMechanism: 'NIGHTLY_BATCH'
        }
      ]
    });

    // 3. Central Bank Currencies Ledger
    this.datasets.set('ds-currency-reserves-03', {
      id: 'ds-currency-reserves-03',
      name: {
        en: 'National Foreign Exchange Transaction Vault',
        ar: 'مستودع صفقات النقد الأجنبي لجمهورية العراق',
        ku: 'خەزێنەی مامەڵەکانی دراوی بیانی نیشتمانی'
      },
      description: {
        en: 'Centralised repository recording interbank foreign transfer audits and wire compliance verification tags.',
        ar: 'مستودع مركزي يسجل تدقيق التحويلات الأجنبية بين البنوك وعلامات التحقق من الامتثال البرقي.',
        ku: 'کۆگایەکی ناوەندی کە وردبینی گواستنەوەی دراوی بیانی نێوان بانکەکان تۆمار دەکات.'
      },
      ownerMinistry: 'Central Bank of Iraq',
      dataSteward: 'Financial Intelligence Unit (FIU)',
      stewardEmail: 'steward.cbi@idg.gov.iq',
      classification: 'SECRET',
      qualityScore: 99.8,
      recordCount: 2450100,
      apiEndpoints: ['/api/v1/data/cbi/wire-ledgers/reconcile'],
      mappings: [
        {
          sourceField: 'remitterTin',
          targetMinistry: 'Ministry of Trade',
          targetDatasetId: 'ds-commercial-companies-02',
          targetField: 'taxIdentityNumber',
          syncMechanism: 'ON_DEMAND_QUERY'
        }
      ]
    });

    // 4. Customs Passenger & Cargo manifests
    this.datasets.set('ds-port-cargo-manifests-04', {
      id: 'ds-port-cargo-manifests-04',
      name: {
        en: 'Border Crossings Integrated Cargo Log',
        ar: 'السجل المتكامل لشحنات المنافذ الحدودية',
        ku: 'تۆماری یەکگرتووی باری دەروازە سنوورییەکان'
      },
      description: {
        en: 'Standard declaration records of goods, declared weight, custom duties, HS-Codes, and risk warnings.',
        ar: 'سجلات الإقرارات الموحدة للبضائع، الوزن المعلن، الرسوم الجمركية، ورموز النظام المنسق ومعاملي الخطورة.',
        ku: 'تۆمارە بازرگانییەکانی باری سنووری، کێش، باج، و کۆدەکانی گومرگ.'
      },
      ownerMinistry: 'Ministry of Finance',
      dataSteward: 'General Authority for Customs',
      stewardEmail: 'steward.customs@idg.gov.iq',
      classification: 'INTERNAL',
      qualityScore: 92.1,
      recordCount: 3824000,
      apiEndpoints: ['/api/v1/data/customs/cargo/verify-manifest'],
      mappings: [
        {
          sourceField: 'driverNationalId',
          targetMinistry: 'Ministry of Interior',
          targetDatasetId: 'ds-national-citizens-01',
          targetField: 'nationalCardId',
          syncMechanism: 'REAL_TIME_WEBHOOK'
        }
      ]
    });
  }

  public getAllDatasets(): CatalogDataset[] {
    return Array.from(this.datasets.values());
  }

  public getDataset(id: string): CatalogDataset | undefined {
    return this.datasets.get(id);
  }

  public updateDatasetQuality(id: string, nextScore: number) {
    const dataset = this.datasets.get(id);
    if (dataset) {
      dataset.qualityScore = Math.min(100, Math.max(0, nextScore));
    }
  }

  public searchDatasets(query: string): CatalogDataset[] {
    const term = query.toLowerCase();
    return this.getAllDatasets().filter(d => 
      d.name.en.toLowerCase().includes(term) ||
      d.name.ar.includes(term) ||
      d.name.ku.includes(term) ||
      d.ownerMinistry.toLowerCase().includes(term)
    );
  }
}
