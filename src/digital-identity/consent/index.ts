// Sovereign Citizen Consent Agreement & Sharing Registry
// Implements user-controlled sovereignty over federal and micro ministry data transfers

export interface ConsentAgreement {
  id: string;
  citizenDid: string;
  targetMinistry: string;
  purpose: string;
  grantedClaims: string[];
  expiresAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  timestamp: string;
}

export class CitizenConsentRegistry {
  private static instance: CitizenConsentRegistry;
  private consents: Map<string, ConsentAgreement> = new Map();

  private constructor() {
    this.seedConsentRegistry();
  }

  public static getInstance(): CitizenConsentRegistry {
    if (!CitizenConsentRegistry.instance) {
      CitizenConsentRegistry.instance = new CitizenConsentRegistry();
    }
    return CitizenConsentRegistry.instance;
  }

  private seedConsentRegistry() {
    this.consents.set('con-88219-c', {
      id: 'con-88219-c',
      citizenDid: 'did:idg:citizen:iq-883190',
      targetMinistry: 'Ministry of Finance - VAT division',
      purpose: 'Tax clearance verification for import duty reductions',
      grantedClaims: ['nationalIdNumber', 'fullName', 'dateOfBirth'],
      expiresAt: '2027-06-05T00:00:00Z',
      status: 'ACTIVE',
      timestamp: '2026-06-01T10:00:00Z'
    });

    this.consents.set('con-77120-g', {
      id: 'con-77120-g',
      citizenDid: 'did:idg:citizen:iq-883190',
      targetMinistry: 'General Authority for Customs',
      purpose: 'Border crossing transit clearance auto matching and border gates verification',
      grantedClaims: ['passportNumber', 'biometricReferenceId'],
      expiresAt: '2026-10-01T00:00:00Z',
      status: 'ACTIVE',
      timestamp: '2026-06-04T09:30:00Z'
    });
  }

  public getCitizenConsents(citizenDid: string): ConsentAgreement[] {
    return Array.from(this.consents.values()).filter(c => c.citizenDid === citizenDid);
  }

  public getAllConsents(): ConsentAgreement[] {
    return Array.from(this.consents.values());
  }

  /**
   * Revoke agreement instantly preventing secondary middleware lookup access
   */
  public revokeConsent(id: string) {
    const consent = this.consents.get(id);
    if (consent) {
      consent.status = 'REVOKED';
    }
  }

  /**
   * Authorize dynamic consent record
   */
  public registerNewConsent(
    citizenDid: string, 
    targetMinistry: string, 
    purpose: string, 
    claims: string[], 
    validityMonths: number
  ): ConsentAgreement {
    const id = `con-gen-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const expires = new Date();
    expires.setMonth(now.getMonth() + validityMonths);

    const agreement: ConsentAgreement = {
      id,
      citizenDid,
      targetMinistry,
      purpose,
      grantedClaims: claims,
      expiresAt: expires.toISOString(),
      status: 'ACTIVE',
      timestamp: now.toISOString()
    };

    this.consents.set(id, agreement);
    return agreement;
  }
}
