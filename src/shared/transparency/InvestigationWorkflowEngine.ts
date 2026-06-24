import { AuditCaseEngine } from './AuditCaseEngine';
import { AuditLedgerEngine } from './AuditLedgerEngine';
import { InvestigationCase, InvestigationStatus } from './AuditTypes';

export class InvestigationWorkflowEngine {
  public static transitionCase(
    caseId: string,
    nextStatus: InvestigationStatus,
    actorId: string,
    actorName: string,
    comments: string
  ): boolean {
    const c = AuditCaseEngine.getCases().find(x => x.id === caseId);
    if (!c) return false;

    const prevStatus = c.status;
    const ok = AuditCaseEngine.updateCaseStatus(caseId, nextStatus);

    if (ok) {
      AuditLedgerEngine.appendRecord(
        actorId,
        actorName,
        'INVESTIGATION_STATUS_TRANSITION',
        `Case ${caseId} transitioned from ${prevStatus} to ${nextStatus}. Comments: ${comments}`,
        c.jurisdiction,
        'TRANSPARENCY'
      );
      return true;
    }
    return false;
  }
}
