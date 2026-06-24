import { AuditCaseEngine } from './AuditCaseEngine';
import { InvestigationCase, Jurisdiction, RiskSeverity } from './AuditTypes';

export class InvestigationCaseRegistry {
  public static getAllCases(): InvestigationCase[] {
    return AuditCaseEngine.getCases();
  }

  public static getByJurisdiction(jurisdiction: Jurisdiction): InvestigationCase[] {
    return AuditCaseEngine.getCasesByJurisdiction(jurisdiction);
  }

  public static updateCase(id: string, status: any): void {
    AuditCaseEngine.updateCaseStatus(id, status);
  }
}
