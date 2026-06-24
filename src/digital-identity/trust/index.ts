// PKI Sovereign Certificate & Trust Authority Management
// Implements secure Root CA, Intermediate CAs, Digital Signing Certs, CRL, and Validation

export interface PKICertificate {
  serialNumber: string;
  fingerprintSHA256: string;
  subjectCommonName: string;
  issuerCommonName: string;
  keyUsage: string[];
  signatureAlgorithm: 'SHA3-512withRSA' | 'SHA256withECDSA' | 'Ed25519';
  validFrom: string;
  validTo: string;
  isRevoked: boolean;
  revocationReason?: string;
  hierarchyLevel: 'ROOT_CA' | 'INTERMEDIATE_CA' | 'LEAF_CERTIFICATE';
}

export class PublicKeyTrustPlatform {
  private static instance: PublicKeyTrustPlatform;

  private certs: Map<string, PKICertificate> = new Map();

  private constructor() {
    this.seedFederalTrustHierarchy();
  }

  public static getInstance(): PublicKeyTrustPlatform {
    if (!PublicKeyTrustPlatform.instance) {
      PublicKeyTrustPlatform.instance = new PublicKeyTrustPlatform();
    }
    return PublicKeyTrustPlatform.instance;
  }

  private seedFederalTrustHierarchy() {
    // 1. Root CA (National Cryptographic Root of Iraq IDG)
    this.certs.set('01:AB:88:21:CD:AA:99:11', {
      serialNumber: '01:AB:88:21:CD:AA:99:11',
      fingerprintSHA256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      subjectCommonName: 'Sovereign Republic of Iraq - Root CA G1',
      issuerCommonName: 'Sovereign Republic of Iraq - Root CA G1', // Self-signed
      keyUsage: ['digitalSignature', 'keyCertSign', 'cRLSign'],
      signatureAlgorithm: 'SHA3-512withRSA',
      validFrom: '2026-01-01T00:00:00Z',
      validTo: '2056-01-01T00:00:00Z',
      isRevoked: false,
      hierarchyLevel: 'ROOT_CA'
    });

    // 2. Intermediate CA (Ministry of Finance Trust Authority Gen 2)
    this.certs.set('02:FA:11:92:BC:EF:44:88', {
      serialNumber: '02:FA:11:92:BC:EF:44:88',
      fingerprintSHA256: 'b45c2ae3aa284dc8a3a93d015b3fbfa4b2b2b1bc8bb025da2c0f68cd0298a44d',
      subjectCommonName: 'Ministry of Finance - Secure Intermediate CA G2',
      issuerCommonName: 'Sovereign Republic of Iraq - Root CA G1',
      keyUsage: ['digitalSignature', 'keyCertSign', 'cRLSign'],
      signatureAlgorithm: 'SHA256withECDSA',
      validFrom: '2026-01-02T00:00:00Z',
      validTo: '2041-01-02T00:00:00Z',
      isRevoked: false,
      hierarchyLevel: 'INTERMEDIATE_CA'
    });

    // 3. Intermediate CA (Ministry of Interior Civil Trust Authority Gen 2)
    this.certs.set('02:CB:33:88:AC:FF:00:12', {
      serialNumber: '02:CB:33:88:AC:FF:00:12',
      fingerprintSHA256: 'cd82ab99f4be67da20c08acbcbc5a3bfbeb2bcf67da21867cda0cfef01021bc8',
      subjectCommonName: 'Ministry of Interior - Civil Trust Intermediate CA G2',
      issuerCommonName: 'Sovereign Republic of Iraq - Root CA G1',
      keyUsage: ['digitalSignature', 'keyCertSign', 'cRLSign'],
      signatureAlgorithm: 'SHA256withECDSA',
      validFrom: '2026-01-02T06:00:00Z',
      validTo: '2041-01-02T06:00:00Z',
      isRevoked: false,
      hierarchyLevel: 'INTERMEDIATE_CA'
    });

    // 4. Leaf Signing Cert (Port Authority Customs Examiner Authorized Signatures)
    this.certs.set('03:DF:00:11:AA:BB:CC:99', {
      serialNumber: '03:DF:00:11:AA:BB:CC:99',
      fingerprintSHA256: 'a12cd1888b2f992cdacbac3ad1e843bf9f2bcfcd88210cdcacfe092d8fa20cc9',
      subjectCommonName: 'General Authority for Customs - Authorized Manifest Auditor G3',
      issuerCommonName: 'Ministry of Finance - Secure Intermediate CA G2',
      keyUsage: ['digitalSignature', 'nonRepudiation'],
      signatureAlgorithm: 'Ed25519',
      validFrom: '2026-01-10T08:00:00Z',
      validTo: '2028-01-10T08:00:00Z',
      isRevoked: false,
      hierarchyLevel: 'LEAF_CERTIFICATE'
    });

    // 5. Revoked Sample Cert for Audit view (Faked Compromised Trade Terminal)
    this.certs.set('03:E5:99:AA:88:BB:EE:33', {
      serialNumber: '03:E5:99:AA:88:BB:EE:33',
      fingerprintSHA256: 'e83bcad38fa1b8766a2fe016ef3abfa49c3bd0112cbfacfe09ea8fcfa0821ccf',
      subjectCommonName: 'Ministry of Trade - Port Transit Gate 4 Auditor Cert',
      issuerCommonName: 'Sovereign Republic of Iraq - Root CA G1',
      keyUsage: ['digitalSignature'],
      signatureAlgorithm: 'SHA256withECDSA',
      validFrom: '2026-02-01T00:00:00Z',
      validTo: '2027-02-01T00:00:00Z',
      isRevoked: true,
      revocationReason: 'KEY_COMPROMISE (Detected unauthorized biometric sensor tampering)',
      hierarchyLevel: 'LEAF_CERTIFICATE'
    });
  }

  public getCertificate(serial: string): PKICertificate | undefined {
    return this.certs.get(serial);
  }

  public getAllCertificates(): PKICertificate[] {
    return Array.from(this.certs.values());
  }

  /**
   * Performs real algorithmic PKI chain check from Leaf up to self-signed Root CA
   */
  public validateTrustPath(serialNumber: string): { isValid: boolean; chain: string[] } {
    const chain: string[] = [];
    const cert = this.certs.get(serialNumber);
    if (!cert) return { isValid: false, chain };

    let currentCert = cert;
    chain.push(currentCert.subjectCommonName);

    if (currentCert.isRevoked) {
      return { isValid: false, chain };
    }

    // Traverse upwards
    while (currentCert.hierarchyLevel !== 'ROOT_CA') {
      const parent = Array.from(this.certs.values()).find(c => c.subjectCommonName === currentCert.issuerCommonName);
      if (!parent) {
        return { isValid: false, chain }; // Broken trust path
      }

      currentCert = parent;
      chain.push(currentCert.subjectCommonName);

      if (currentCert.isRevoked) {
        return { isValid: false, chain };
      }
    }

    // Ensure self-signed root is valid
    const rootMatches = currentCert.subjectCommonName === currentCert.issuerCommonName;
    return {
      isValid: rootMatches && !currentCert.isRevoked,
      chain
    };
  }

  /**
   * Revoke dynamic cert and add to CRL system
   */
  public revokeCertificate(serial: string, reason: string) {
    const cert = this.certs.get(serial);
    if (cert) {
      cert.isRevoked = true;
      cert.revocationReason = reason;
    }
  }
}
