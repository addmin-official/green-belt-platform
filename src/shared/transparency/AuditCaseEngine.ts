import { InvestigationCase, Jurisdiction, RiskSeverity } from './AuditTypes';

export class AuditCaseEngine {
  private static cases: InvestigationCase[] = [
    {
      id: 'INV-001',
      title: 'Ibrahim Khalil Gate Under-Declaration Scheme',
      description: 'Systematic tariff evasion by declaring electronics under general agricultural scrap category.',
      jurisdiction: 'federal',
      status: 'UNDER_REVIEW',
      severity: 'CRITICAL',
      assignedOfficer: 'Ali Al-Sistani (Federal Inspector)',
      createdAt: '2026-06-08T10:00:00Z',
      lastUpdatedAt: '2026-06-09T12:00:00Z',
      suspectOfficer: 'Officer Noori Kamal (Z-104)',
      suspectEntity: 'Al-Rafidain Freight Corp',
      evidenceIds: ['EVD-001']
    },
    {
      id: 'INV-002',
      title: 'KRG Border Gate Wheat Quota Bypass',
      description: 'Evading regional grain import tax caps using forged local production stamps.',
      jurisdiction: 'krg',
      status: 'OPEN',
      severity: 'HIGH',
      assignedOfficer: 'Hawre Kurdistan (KRG Investigator)',
      createdAt: '2026-06-08T15:00:00Z',
      lastUpdatedAt: '2026-06-08T16:30:00Z',
      suspectOfficer: 'Officer Rekawt Bakir',
      suspectEntity: 'Zagros Harvest and Grain Trading',
      evidenceIds: ['EVD-002']
    }
  ];

  public static getCases(): InvestigationCase[] {
    return this.cases;
  }

  public static getCasesByJurisdiction(jurisdiction: Jurisdiction): InvestigationCase[] {
    if (jurisdiction === 'joint') {
      return this.cases;
    }
    return this.cases.filter(c => c.jurisdiction === jurisdiction);
  }

  public static createCase(
    title: string,
    description: string,
    jurisdiction: Jurisdiction,
    severity: RiskSeverity,
    assignedOfficer: string,
    suspectOfficer?: string,
    suspectEntity?: string
  ): InvestigationCase {
    const id = `INV-${String(this.cases.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    const newCase: InvestigationCase = {
      id,
      title,
      description,
      jurisdiction,
      status: 'OPEN',
      severity,
      assignedOfficer,
      createdAt: now,
      lastUpdatedAt: now,
      suspectOfficer,
      suspectEntity,
      evidenceIds: []
    };
    this.cases.push(newCase);
    return newCase;
  }

  public static updateCaseStatus(id: string, status: any): boolean {
    const c = this.cases.find(x => x.id === id);
    if (c) {
      c.status = status;
      c.lastUpdatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  public static linkEvidence(caseId: string, evidenceId: string): boolean {
    const c = this.cases.find(x => x.id === caseId);
    if (c) {
      if (!c.evidenceIds.includes(evidenceId)) {
        c.evidenceIds.push(evidenceId);
      }
      c.lastUpdatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }
}
