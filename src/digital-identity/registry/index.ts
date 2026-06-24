// Sovereign Identity Registry
// Under strict enforcement of national cryptography and biological authentication standards

export type IdentityType = 'CITIZEN' | 'BUSINESS' | 'GOVERNMENT_EMPLOYEE' | 'SERVICE_PRINCIPAL';

export interface IdentityMeta {
  id: string;
  type: IdentityType;
  publicKeyPem: string;
  isFingerprintVerified: boolean;
  isIrisVerified: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'REVOKED';
  createdAt: string;
  updatedAt: string;
}

export interface CitizenIdentity extends IdentityMeta {
  nationalIdNumber: string;
  fullName: { en: string; ar: string; ku: string };
  dateOfBirth: string;
}

export interface BusinessIdentity extends IdentityMeta {
  tradeLicenseNumber: string;
  registeredCapitalIQD: number;
  companyName: { en: string; ar: string; ku: string };
  primaryCategory: string;
}

export interface GovernmentEmployeeIdentity extends IdentityMeta {
  badgeId: string;
  ministry: string;
  securityClassification: 'SOVEREIGN' | 'SECRET' | 'CONFIDENTIAL' | 'RESTRICTED';
  title: { en: string; ar: string; ku: string };
}

export interface ServicePrincipalIdentity extends IdentityMeta {
  serviceId: string;
  governingSubsystem: string;
  authorizedScopes: string[];
}

export class NationalIdentityRegistry {
  private static instance: NationalIdentityRegistry;

  private citizens: Map<string, CitizenIdentity> = new Map();
  private businesses: Map<string, BusinessIdentity> = new Map();
  private employees: Map<string, GovernmentEmployeeIdentity> = new Map();
  private principals: Map<string, ServicePrincipalIdentity> = new Map();

  private constructor() {
    this.seedSovereignRegistry();
  }

  public static getInstance(): NationalIdentityRegistry {
    if (!NationalIdentityRegistry.instance) {
      NationalIdentityRegistry.instance = new NationalIdentityRegistry();
    }
    return NationalIdentityRegistry.instance;
  }

  private seedSovereignRegistry() {
    // 1. Seed Citizen
    this.citizens.set('did:idg:citizen:iq-883190', {
      id: 'did:idg:citizen:iq-883190',
      type: 'CITIZEN',
      nationalIdNumber: 'IRQ-1988-992108',
      fullName: {
        en: 'Amir Al-Moussawi',
        ar: 'أمير الموسوي',
        ku: 'ئەمیر ئەلموسەوی'
      },
      dateOfBirth: '1988-04-12',
      publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy...-----END PUBLIC KEY-----',
      isFingerprintVerified: true,
      isIrisVerified: true,
      status: 'ACTIVE',
      createdAt: '2026-01-10T09:00:00Z',
      updatedAt: '2026-05-18T10:30:00Z'
    });

    // 2. Seed Business
    this.businesses.set('did:idg:business:trade-sindbad', {
      id: 'did:idg:business:trade-sindbad',
      type: 'BUSINESS',
      tradeLicenseNumber: 'LIC-BAGHDAD-2026-892',
      registeredCapitalIQD: 10000000000,
      companyName: {
        en: 'Sindbad Sea Logistics & Customs Solutions',
        ar: 'السندباد للخدمات اللوجستية البحرية والحلول الجمركية',
        ku: 'سیندباد بۆ لۆجستی دەریایی و چارەسەری گومرگی'
      },
      primaryCategory: 'Maritime Transport and Bonded Warehousing',
      publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3...-----END PUBLIC KEY-----',
      isFingerprintVerified: false,
      isIrisVerified: false,
      status: 'ACTIVE',
      createdAt: '2026-02-14T08:00:00Z',
      updatedAt: '2026-06-01T14:40:00Z'
    });

    // 3. Seed Government Employee (Customs Directorate Commissioner)
    this.employees.set('did:idg:gov:customs-director-01', {
      id: 'did:idg:gov:customs-director-01',
      type: 'GOVERNMENT_EMPLOYEE',
      badgeId: 'BADGE-CUST-8812',
      ministry: 'Ministry of Finance',
      securityClassification: 'SECRET',
      title: {
        en: 'Super General Director of Customs Auditing',
        ar: 'المدير العام الأعلى لتدقيق الجمارك',
        ku: 'بەڕێوەبەری گشتیی باڵای وردبینی گومرگ'
      },
      publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1...-----END PUBLIC KEY-----',
      isFingerprintVerified: true,
      isIrisVerified: true,
      status: 'ACTIVE',
      createdAt: '2026-01-05T08:00:00Z',
      updatedAt: '2026-06-02T11:20:00Z'
    });

    // 4. Seed Service Principal
    this.principals.set('did:idg:service:cbi-reconciliation-agent', {
      id: 'did:idg:service:cbi-reconciliation-agent',
      type: 'SERVICE_PRINCIPAL',
      serviceId: 'svc-cbi-audit-daemon-l5',
      governingSubsystem: 'Central Bank compliance-ledger daemon',
      authorizedScopes: ['reconciles.write', 'identities.read'],
      publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp...-----END PUBLIC KEY-----',
      isFingerprintVerified: false,
      isIrisVerified: false,
      status: 'ACTIVE',
      createdAt: '2026-03-01T00:00:00Z',
      updatedAt: '2026-06-01T00:00:00Z'
    });
  }

  public getCitizen(id: string): CitizenIdentity | undefined {
    return this.citizens.get(id);
  }

  public getBusiness(id: string): BusinessIdentity | undefined {
    return this.businesses.get(id);
  }

  public getEmployee(id: string): GovernmentEmployeeIdentity | undefined {
    return this.employees.get(id);
  }

  public getServicePrincipal(id: string): ServicePrincipalIdentity | undefined {
    return this.principals.get(id);
  }

  public getAllCitizens(): CitizenIdentity[] {
    return Array.from(this.citizens.values());
  }

  public getAllBusinesses(): BusinessIdentity[] {
    return Array.from(this.businesses.values());
  }

  public getAllEmployees(): GovernmentEmployeeIdentity[] {
    return Array.from(this.employees.values());
  }

  public getAllPrincipals(): ServicePrincipalIdentity[] {
    return Array.from(this.principals.values());
  }
}
