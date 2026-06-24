import { AuditCaseEngine } from './AuditCaseEngine';
import { AuditLedgerEngine } from './AuditLedgerEngine';

export class CaseAssignmentEngine {
  public static assignOfficer(
    caseId: string,
    officerName: string,
    authorizedBy: string,
    authorizedById: string
  ): boolean {
    const c = AuditCaseEngine.getCases().find(x => x.id === caseId);
    if (!c) return false;

    c.assignedOfficer = officerName;
    c.status = 'ASSIGNED';
    c.lastUpdatedAt = new Date().toISOString();

    AuditLedgerEngine.appendRecord(
      authorizedById,
      authorizedBy,
      'INVESTIGATION_ASSIGNED',
      `Assigned special investigator ${officerName} to case ${caseId}.`,
      c.jurisdiction,
      'TRANSPARENCY'
    );
    return true;
  }
}
