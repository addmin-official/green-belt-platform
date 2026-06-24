// IDG Sovereign Security & Identity Governance System
// Under strict compliance with Iraqi National Secure Cloud Protocols (INSCP)

export type TenantType = 'FEDERAL' | 'KRG' | 'MINISTERIAL' | 'CITIZEN' | 'BUSINESS' | 'SERVICE';
export type ClearanceLevel = 'SOVEREIGN' | 'SECRET' | 'CONFIDENTIAL' | 'RESTRICTED' | 'UNCLASSIFIED';

export interface BaseIdentity {
  id: string;
  tenantId: TenantType;
  publicKeyFingerprint?: string;
  biometricVerificationHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GovernmentEmployeeProfile extends BaseIdentity {
  role: string;
  fullName: { en: string; ar: string; ku: string };
  badgeNumber: string;
  ministry: string;
  department: string;
  clearance: ClearanceLevel;
  signingAuthorityLimitIQD: number;
}

export interface CitizenProfile extends BaseIdentity {
  nationalID: string;
  fullName: { en: string; ar: string; ku: string };
  passportNumber?: string;
  residencyRegion: 'BAGHDAD' | 'BASRA' | 'ERBIL' | 'DUHOK' | 'SULAYMANIYAH' | 'NINEVEH' | 'ANBAR';
  taxRegistrationID?: string;
  verificationStatus: 'VERIFIED' | 'SUSPENDED' | 'PENDING_BIOMETRICS';
}

export interface BusinessProfile extends BaseIdentity {
  registrationNumber: string;
  companyName: { en: string; ar: string; ku: string };
  taxIdentityNumber: string;
  sectorOfActivity: string;
  importLicenceNumber: string;
  customsScoreRate: number; // 0 to 100 representing compliance standing
  complianceStatus: 'COMPLIANT' | 'WARNING_ISSUED' | 'BLACKLISTED';
}

export interface OrganizationProfile extends BaseIdentity {
  orgUnitCode: string;
  name: { en: string; ar: string; ku: string };
  jurisdiction: string;
  allowedSectors: string[];
}

export interface ServiceAccount extends BaseIdentity {
  clientId: string;
  serviceName: string;
  associatedSubsystem: string;
  authorizedIPRanges: string[];
  activeScopes: string[];
}

export class SovereignIdentityProvider {
  private static instance: SovereignIdentityProvider;
  
  private employeeProfiles: Map<string, GovernmentEmployeeProfile> = new Map();
  private citizenProfiles: Map<string, CitizenProfile> = new Map();
  private businessProfiles: Map<string, BusinessProfile> = new Map();
  private serviceAccounts: Map<string, ServiceAccount> = new Map();

  private constructor() {
    this.seedDefaultIdentities();
  }

  public static getInstance(): SovereignIdentityProvider {
    if (!SovereignIdentityProvider.instance) {
      SovereignIdentityProvider.instance = new SovereignIdentityProvider();
    }
    return SovereignIdentityProvider.instance;
  }

  private seedDefaultIdentities() {
    // 1. Seed Prime Minister Office - Super Administrator
    this.employeeProfiles.set('emp-pmo-001', {
      id: 'emp-pmo-001',
      tenantId: 'FEDERAL',
      fullName: {
        en: 'Dr. Tariq Al-Jamil',
        ar: 'د. طارق الجميل',
        ku: 'د. تاریق ئەلجەمیل'
      },
      badgeNumber: 'PMO-SEC-998',
      role: 'Super Administrator',
      ministry: 'Prime Minister Office',
      department: 'Supreme Security Strategy Advisory',
      clearance: 'SOVEREIGN',
      signingAuthorityLimitIQD: 10000000000,
      biometricVerificationHash: 'fcef9c61bc99468e82ef620e4c27eceb16ffeaee',
      createdAt: '2026-01-10T08:00:00Z',
      updatedAt: '2026-06-01T09:30:00Z'
    });

    // 2. Seed Customs Administrator
    this.employeeProfiles.set('emp-customs-011', {
      id: 'emp-customs-011',
      tenantId: 'MINISTERIAL',
      fullName: {
        en: 'Colonel Haider Jasim',
        ar: 'العقيد حيدر جاسم',
        ku: 'عەقید حەیدەر جاسم'
      },
      badgeNumber: 'FED-CUST-882',
      role: 'Customs Administrator',
      ministry: 'Ministry of Finance',
      department: 'Federal Customs Control Commissioner',
      clearance: 'SECRET',
      signingAuthorityLimitIQD: 5000000000,
      biometricVerificationHash: 'e698beabfe9e4c11bdc0a377759ad4c896987f22',
      createdAt: '2026-02-15T09:00:00Z',
      updatedAt: '2026-05-20T11:45:00Z'
    });

    // 3. Seed Border Officer at Ibrahim Khalil
    this.employeeProfiles.set('emp-border-022', {
      id: 'emp-border-022',
      tenantId: 'KRG',
      fullName: {
        en: 'Aras Karwan',
        ar: 'أراس كروان',
        ku: 'ئاراس کاروان'
      },
      badgeNumber: 'KRG-BORDER-220',
      role: 'Border Officer',
      ministry: 'Kurdish Region Security Council',
      department: 'Ibrahim Khalil Gate Inspection Unit',
      clearance: 'CONFIDENTIAL',
      signingAuthorityLimitIQD: 100000000,
      biometricVerificationHash: 'ad3fa9f929312117fc04c0044fa31b147321ee88',
      createdAt: '2026-03-01T10:00:00Z',
      updatedAt: '2026-06-02T13:12:00Z'
    });

    // 4. Seed Intelligence Analyst
    this.employeeProfiles.set('emp-intel-007', {
      id: 'emp-intel-007',
      tenantId: 'FEDERAL',
      fullName: {
        en: 'Nassim Al-Sadr',
        ar: 'نسيم الصدر',
        ku: 'نەسیم ئەلسەدر'
      },
      badgeNumber: 'INTEL-ANAL-007',
      role: 'Intelligence Analyst',
      ministry: 'National Security Agency',
      department: 'Counter-Terrorism Finance (CTF) Audits',
      clearance: 'SECRET',
      signingAuthorityLimitIQD: 0,
      biometricVerificationHash: '8b7f8aa64cc91cdcf396ff1b4cbb1123dfee90c1',
      createdAt: '2026-01-20T08:00:00Z',
      updatedAt: '2026-05-30T10:00:00Z'
    });

    // 5. Seed Citizens
    this.citizenProfiles.set('cit-882103', {
      id: 'cit-882103',
      tenantId: 'CITIZEN',
      nationalID: 'IRQ-8821389812',
      fullName: {
        en: 'Karim Al-Hassan',
        ar: 'كريم الحسن',
        ku: 'کەریم ئەلحەسەن'
      },
      passportNumber: 'N00889212',
      residencyRegion: 'BAGHDAD',
      taxRegistrationID: 'TAX-BAG-0982C',
      verificationStatus: 'VERIFIED',
      biometricVerificationHash: '882cda1bc0a92e10c7bf392116abf98bc19d',
      createdAt: '2026-04-10T12:00:00Z',
      updatedAt: '2026-04-10T12:00:00Z'
    });

    // 6. Seed Businesses
    this.businessProfiles.set('biz-sumer-trade', {
      id: 'biz-sumer-trade',
      tenantId: 'BUSINESS',
      registrationNumber: 'BIZ-2026-9921',
      companyName: {
        en: 'Sumer National Logistics Inc.',
        ar: 'شركة سومر اللوجستية الوطنية',
        ku: 'کۆمپانیای سۆمەری نیشتمانیی بۆ لۆجستی'
      },
      taxIdentityNumber: 'TAX-BIZ-SUM881',
      sectorOfActivity: 'Containerised Logistics and Heavy Machinery Importation',
      importLicenceNumber: 'LIC-FED-2026-00452',
      customsScoreRate: 97.4,
      complianceStatus: 'COMPLIANT',
      createdAt: '2026-02-10T08:00:00Z',
      updatedAt: '2026-05-18T14:45:00Z'
    });

    // 7. Seed Service Accounts
    this.serviceAccounts.set('svc-cbi-ledger-01', {
      id: 'svc-cbi-ledger-01',
      tenantId: 'SERVICE',
      clientId: 'cbi-gateway-service-key-01',
      serviceName: 'Central Bank compliance-ledger sync',
      associatedSubsystem: 'Foreign Exchange Auction Match Registry',
      authorizedIPRanges: ['10.100.20.1', '10.100.20.2'],
      activeScopes: ['ledger.write', 'tariff.read', 'risk.evaluate'],
      createdAt: '2026-01-15T00:00:00Z',
      updatedAt: '2026-06-01T00:00:00Z'
    });
  }

  // API Gateways
  public getEmployeeProfile(id: string): GovernmentEmployeeProfile | undefined {
    return this.employeeProfiles.get(id);
  }

  public getCitizenProfile(id: string): CitizenProfile | undefined {
    return this.citizenProfiles.get(id);
  }

  public getBusinessProfile(id: string): BusinessProfile | undefined {
    return this.businessProfiles.get(id);
  }

  public getServiceAccount(id: string): ServiceAccount | undefined {
    return this.serviceAccounts.get(id);
  }

  public getAllEmployeeProfiles(): GovernmentEmployeeProfile[] {
    return Array.from(this.employeeProfiles.values());
  }

  public getAllCitizenProfiles(): CitizenProfile[] {
    return Array.from(this.citizenProfiles.values());
  }

  public getAllBusinessProfiles(): BusinessProfile[] {
    return Array.from(this.businessProfiles.values());
  }

  public getAllServiceAccounts(): ServiceAccount[] {
    return Array.from(this.serviceAccounts.values());
  }
}
