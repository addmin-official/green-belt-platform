export interface OfficerCertification {
  id: string; // CERT-XXXX
  employeeId: string;
  certificationName: string; // e.g., "Sovereign Customs Operator Certificate", "Border Screening Clearance"
  issuingAuthority: 'FEDERAL_BOARD' | 'KRG_COUNCIL' | 'JOINT_COMMITTEE';
  issuedDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'revoked';
}

export const INITIAL_CERTIFICATIONS: OfficerCertification[] = [
  {
    id: 'CERT-001',
    employeeId: 'EMP-FED-004',
    certificationName: 'Sovereign Customs Administrator',
    issuingAuthority: 'FEDERAL_BOARD',
    issuedDate: '2025-01-10',
    expiryDate: '2028-01-10',
    status: 'active',
  },
  {
    id: 'CERT-002',
    employeeId: 'EMP-KRG-004',
    certificationName: 'Kurdistan Regional Customs Examiner',
    issuingAuthority: 'KRG_COUNCIL',
    issuedDate: '2025-03-15',
    expiryDate: '2028-03-15',
    status: 'active',
  },
  {
    id: 'CERT-003',
    employeeId: 'EMP-JNT-002',
    certificationName: 'Joint Border Revenue Coordinator',
    issuingAuthority: 'JOINT_COMMITTEE',
    issuedDate: '2026-02-01',
    expiryDate: '2029-02-01',
    status: 'active',
  }
];

export class CertificationEngine {
  private static certifications: OfficerCertification[] = [...INITIAL_CERTIFICATIONS];

  public static getCertifications(): OfficerCertification[] {
    return this.certifications;
  }

  public static issueCertification(employeeId: string, name: string, authority: OfficerCertification['issuingAuthority'], durationYears: number): OfficerCertification {
    const issued = new Date();
    const expiry = new Date();
    expiry.setFullYear(issued.getFullYear() + durationYears);

    const newCert: OfficerCertification = {
      id: `CERT-${Date.now()}`,
      employeeId,
      certificationName: name,
      issuingAuthority: authority,
      issuedDate: issued.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      status: 'active',
    };

    this.certifications.push(newCert);
    return newCert;
  }

  public static getByEmployee(employeeId: string): OfficerCertification[] {
    return this.certifications.filter(c => c.employeeId === employeeId);
  }
}
