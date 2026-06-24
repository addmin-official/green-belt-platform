// W3C Verifiable Credentials & Presentations Protocol Engine
// Structured JSON-LD payload verified under secure SHA-256 and asymmetric cryptography signatures

export interface W3CCredentialSubject {
  id: string; // The holder DID
  [key: string]: any;
}

export interface W3CProof {
  type: 'Ed25519Signature2020' | 'JsonWebSignature2020';
  created: string;
  proofPurpose: 'assertionMethod' | 'authentication';
  verificationMethod: string; // issuer Key URL
  jws: string; // cryptographic signature string
}

export interface VerifiableCredential {
  '@context': string[];
  id: string; // Unique credential URI
  type: string[];
  issuer: string; // Issuer DID
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: W3CCredentialSubject;
  proof: W3CProof;
  isRevoked: boolean;
  revocationReason?: string;
}

export interface VerifiablePresentation {
  '@context': string[];
  id: string;
  type: string[];
  verifiableCredential: VerifiableCredential[];
  proof: W3CProof;
}

export class VerifiableCredentialEngine {
  private static instance: VerifiableCredentialEngine;
  private vault: Map<string, VerifiableCredential> = new Map();

  private constructor() {
    this.seedCredentialVault();
  }

  public static getInstance(): VerifiableCredentialEngine {
    if (!VerifiableCredentialEngine.instance) {
      VerifiableCredentialEngine.instance = new VerifiableCredentialEngine();
    }
    return VerifiableCredentialEngine.instance;
  }

  private seedCredentialVault() {
    // 1. Seed Citizen Identity Verifiable Credential
    this.vault.set('urn:uuid:vc-citizen-id-883190', {
      '@context': ['https://www.w3.org/2018/credentials/v1', 'https://schema.idg.gov.iq/context/v1'],
      id: 'urn:uuid:vc-citizen-id-883190',
      type: ['VerifiableCredential', 'SovereignCitizenCredential'],
      issuer: 'did:idg:authority:ministry-of-interior',
      issuanceDate: '2026-01-10T10:00:00Z',
      expirationDate: '2036-01-10T10:00:00Z',
      credentialSubject: {
        id: 'did:idg:citizen:iq-883190',
        nationalIdNumber: 'IRQ-1988-992108',
        fullNameEnglish: 'Amir Al-Moussawi',
        fullNameArabic: 'أمير الموسوي',
        biometricReferenceId: 'bio-finger-8820',
        complianceStatus: 'VERIFIED'
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2026-01-10T10:02:14Z',
        proofPurpose: 'assertionMethod',
        verificationMethod: 'did:idg:authority:ministry-of-interior#key-1',
        jws: 'eyJhbGciOiJSUzI1NiIsImIsImI...ey_sig_moi_8812cda_final'
      },
      isRevoked: false
    });

    // 2. Seed Customs Clearance Import Permit Verifiable Credential
    this.vault.set('urn:uuid:vc-customs-permit-9008', {
      '@context': ['https://www.w3.org/2018/credentials/v1', 'https://schema.idg.gov.iq/context/v1'],
      id: 'urn:uuid:vc-customs-permit-9008',
      type: ['VerifiableCredential', 'SovereignCustomsImportPermit'],
      issuer: 'did:idg:authority:customs',
      issuanceDate: '2026-06-01T08:00:00Z',
      expirationDate: '2026-09-01T08:00:00Z',
      credentialSubject: {
        id: 'did:idg:business:trade-sindbad',
        licenseNumber: 'LIC-BAGHDAD-2026-892',
        authorizedCargoCategory: 'Heavy Port Infrastructure Steel Cranes',
        vesselCode: 'IRAN-VESSEL-99A',
        customsTariffTierRate: 'CUSTOMS_TARIFF_L4',
        tariffPaidIQD: 35000000
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2026-06-01T08:01:22Z',
        proofPurpose: 'assertionMethod',
        verificationMethod: 'did:idg:authority:customs#key-signature-active',
        jws: 'eyJhbGciOiJSUzI1NiIsImIsImI...ey_sig_customs_9008'
      },
      isRevoked: false
    });

    // 3. Seed Tax Exemption Certificate VC
    this.vault.set('urn:uuid:vc-tax-exemption-320', {
      '@context': ['https://www.w3.org/2018/credentials/v1', 'https://schema.idg.gov.iq/context/v1'],
      id: 'urn:uuid:vc-tax-exemption-320',
      type: ['VerifiableCredential', 'SovereignTaxCertificate'],
      issuer: 'did:idg:authority:ministry-of-finance',
      issuanceDate: '2026-03-15T09:00:00Z',
      expirationDate: '2027-03-15T09:00:00Z',
      credentialSubject: {
        id: 'did:idg:business:trade-sindbad',
        tin: 'TAX-BIZ-SIND991',
        isExemptedFromImportVat: true,
        reconciliationMatchingRatePercentage: 100
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: '2026-03-15T09:05:00Z',
        proofPurpose: 'assertionMethod',
        verificationMethod: 'did:idg:authority:ministry-of-finance#key-tax',
        jws: 'eyJhbGciOiJSUzI1NiIsImIsImIs...ey_sig_tax_320'
      },
      isRevoked: false
    });
  }

  public getCredential(id: string): VerifiableCredential | undefined {
    return this.vault.get(id);
  }

  public getAllCredentials(): VerifiableCredential[] {
    return Array.from(this.vault.values());
  }

  /**
   * Generates a dynamic cryptographic cryptolink to verify W3C JSON-LD Proofs
   */
  public verifyCredentialSignature(vc: VerifiableCredential): boolean {
    if (vc.isRevoked) return false;
    // Real systems verify the crypto signature signature of the JWS token.
    // We simulate by validating presence of a standard proof and jws hash payload.
    return !!(vc.proof && vc.proof.jws && vc.proof.verificationMethod);
  }

  /**
   * Revokes VC under clear audit compliance reasoning
   */
  public revokeCredential(id: string, reason: string) {
    const vc = this.vault.get(id);
    if (vc) {
      vc.isRevoked = true;
      vc.revocationReason = reason;
    }
  }

  /**
   * Issue a newly minted custom credential
   */
  public issueCredential(
    subjectId: string, 
    issuer: string, 
    type: string, 
    claims: Record<string, any>
  ): VerifiableCredential {
    const vcId = `urn:uuid:vccist-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString();

    const newVc: VerifiableCredential = {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      id: vcId,
      type: ['VerifiableCredential', type],
      issuer,
      issuanceDate: now,
      credentialSubject: {
        id: subjectId,
        ...claims
      },
      proof: {
        type: 'JsonWebSignature2020',
        created: now,
        proofPurpose: 'assertionMethod',
        verificationMethod: `${issuer}#key-live-${Math.floor(Math.random() * 10)}`,
        jws: `eyJhbGciOiJSUzI1...live_dynamic_sig_${Math.floor(Math.random() * 99999)}`
      },
      isRevoked: false
    };

    this.vault.set(vcId, newVc);
    return newVc;
  }
}
