// IDG Master Data Management (MDM) - Entity Resolution & Golden Records
// Implements Single Source of Truth for core sovereign registers

export interface GoldenRecord<T> {
  id: string;
  sourceSystems: string[];
  resolvedAt: string;
  confidenceScore: number; // 0 to 1 indicating resolution matching reliability
  attributes: T;
  hasLineageConflicts: boolean;
}

export interface MasterCitizen {
  nationalId: string;
  passportNumber?: string;
  fullName: { en: string; ar: string; ku: string };
  civilRegDistrict: string;
  biometricId: string;
  mfaVerifiedPhone: string;
  complianceRating: number; // 0 to 100
}

export interface MasterBusiness {
  tin: string;
  registrationNumber: string;
  companyName: { en: string; ar: string; ku: string };
  authorizedCapitalIQD: number;
  importLicenceStatus: 'VALID' | 'REVOKED' | 'EXPIRED';
  hqAddress: string;
  riskRating: number; // 0 to 100
}

export interface MasterPort {
  code: string;
  name: { en: string; ar: string; ku: string };
  type: 'air' | 'sea' | 'land';
  province: string;
  scannersOperational: number;
}

export interface DuplicateResourceRecord {
  id: string;
  entityType: 'citizen' | 'business';
  conflictingSourceId: string;
  similarityRatio: number;
  unresolvedFields: string[];
}

export class MasterDataManagement {
  private static instance: MasterDataManagement;

  private citizenGoldenRecords: GoldenRecord<MasterCitizen>[] = [];
  private businessGoldenRecords: GoldenRecord<MasterBusiness>[] = [];
  private portGoldenRecords: GoldenRecord<MasterPort>[] = [];
  private pendingDuplicates: DuplicateResourceRecord[] = [];

  private constructor() {
    this.seedGoldenRecords();
  }

  public static getInstance(): MasterDataManagement {
    if (!MasterDataManagement.instance) {
      MasterDataManagement.instance = new MasterDataManagement();
    }
    return MasterDataManagement.instance;
  }

  private seedGoldenRecords() {
    // 1. Seed Citizen Golden Record
    this.citizenGoldenRecords.push({
      id: 'golden-cit-001',
      sourceSystems: ['Ministry of Interior - Civil Registry', 'Ministry of Foreign Affairs - Passport HQ'],
      resolvedAt: '2026-05-12T08:15:00Z',
      confidenceScore: 0.99,
      hasLineageConflicts: false,
      attributes: {
        nationalId: '1988921827C',
        passportNumber: 'A0098271',
        fullName: {
          en: 'Muntadhar Al-Abadi',
          ar: 'منتظر العبادي',
          ku: 'مونتەزار ئەلعەبادی'
        },
        civilRegDistrict: 'Baghdad Karada Center',
        biometricId: 'bio-8812cda-44',
        mfaVerifiedPhone: '+964770112233',
        complianceRating: 98.2
      }
    });

    // 2. Seed Business Golden Record
    this.businessGoldenRecords.push({
      id: 'golden-biz-010',
      sourceSystems: ['Ministry of Trade - Registrar', 'Ministry of Finance - General Commission of Taxes'],
      resolvedAt: '2026-06-01T10:00:00Z',
      confidenceScore: 0.95,
      hasLineageConflicts: true, // Conflict on authorized capital resolved by MoTrade record
      attributes: {
        tin: 'TAX-BIZ-SIND991',
        registrationNumber: 'BIZ-2022-88210',
        companyName: {
          en: 'Sindbad Sovereign Importation Ltd',
          ar: 'شركة السندباد للاستيراد السيادي المحدودة',
          ku: 'کۆمپانیای سیندباد بۆ هاوردەکاردنی نیشتمانی'
        },
        authorizedCapitalIQD: 5000000000,
        importLicenceStatus: 'VALID',
        hqAddress: 'Somer Tower, Basra Port Road, Basra',
        riskRating: 14.5
      }
    });

    this.businessGoldenRecords.push({
      id: 'golden-biz-011',
      sourceSystems: ['Ministry of Trade - Registrar', 'Customs - Federal Portal'],
      resolvedAt: '2026-06-03T11:45:00Z',
      confidenceScore: 0.98,
      hasLineageConflicts: false,
      attributes: {
        tin: 'TAX-BIZ-BABYLON77',
        registrationNumber: 'BIZ-2024-11726',
        companyName: {
          en: 'Babylon Food Imports & Distribution',
          ar: 'بابل لاستيراد وتوزيع المواد الغذائية',
          ku: 'کۆمپانیای بابلیۆن بۆ هاوردەکردن و دابەشکردنی خۆراک'
        },
        authorizedCapitalIQD: 1200000000,
        importLicenceStatus: 'VALID',
        hqAddress: 'Saddoun Street, Baghdad',
        riskRating: 28.0
      }
    });

    // 3. Seed Borders & Ports Golden Records
    this.portGoldenRecords.push({
      id: 'golden-port-01',
      sourceSystems: ['General Authority for Customs', 'Ministry of Transport'],
      resolvedAt: '2026-01-10T00:00:00Z',
      confidenceScore: 1.0,
      hasLineageConflicts: false,
      attributes: {
        code: 'IQ-IKG',
        name: {
          en: 'Ibrahim Khalil Border Crossing',
          ar: 'منفذ إبراهيم الخليل الحدودي',
          ku: 'دەروازەی سنووری ئیبراهیم خەلیل'
        },
        type: 'land',
        province: 'Duhok, Kurdistan Region',
        scannersOperational: 4
      }
    });

    this.portGoldenRecords.push({
      id: 'golden-port-02',
      sourceSystems: ['General Authority for Customs', 'Sovereign Ports Trust'],
      resolvedAt: '2026-01-10T06:00:00Z',
      confidenceScore: 1.0,
      hasLineageConflicts: false,
      attributes: {
        code: 'IQ-BQP',
        name: {
          en: 'Umm Qasr Sea Port (Basra)',
          ar: 'ميناء أم قصر البحري في البصرة',
          ku: 'بەندەری ئوم قەسری دەریایی لە بەسرە'
        },
        type: 'sea',
        province: 'Basra Governorate',
        scannersOperational: 8
      }
    });

    // 4. Seed Simulated Pending Duplicate Match for Resolver UI
    this.pendingDuplicates.push({
      id: 'dup-8821',
      entityType: 'business',
      conflictingSourceId: 'source-mof-taxpayer-babylon',
      similarityRatio: 0.88,
      unresolvedFields: ['authorizedCapitalIQD', 'hqAddress']
    });
  }

  public getCitizenGoldenRecords(): GoldenRecord<MasterCitizen>[] {
    return this.citizenGoldenRecords;
  }

  public getBusinessGoldenRecords(): GoldenRecord<MasterBusiness>[] {
    return this.businessGoldenRecords;
  }

  public getPortGoldenRecords(): GoldenRecord<MasterPort>[] {
    return this.portGoldenRecords;
  }

  public getPendingDuplicates(): DuplicateResourceRecord[] {
    return this.pendingDuplicates;
  }

  /**
   * Resolves entity duplicate, matching record fields manually or automatically.
   */
  public resolveDuplicate(id: string, decision: 'MERGE' | 'REJECT_OUTLIER') {
    const dup = this.pendingDuplicates.find(d => d.id === id);
    if (!dup) return;

    if (decision === 'MERGE') {
      // In real systems, fields are merged. We simulate dynamic audit stream validation
      this.pendingDuplicates = this.pendingDuplicates.filter(d => d.id !== id);
    } else {
      this.pendingDuplicates = this.pendingDuplicates.filter(d => d.id !== id);
    }
  }
}
