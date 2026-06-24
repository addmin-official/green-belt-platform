import { AuditCaseEngine } from './AuditCaseEngine';
import { InvestigationCase, Jurisdiction, RiskSeverity } from './AuditTypes';

export class InvestigationEngine {
  public static getInvestigations(jurisdiction: Jurisdiction): InvestigationCase[] {
    return AuditCaseEngine.getCasesByJurisdiction(jurisdiction);
  }

  public static addEvidenceToCase(caseId: string, title: string, type: any, desc: string, actor: string): void {
    // Register evidence
    const { AuditEvidenceEngine } = require('./AuditEvidenceEngine');
    const ev = AuditEvidenceEngine.registerEvidence(caseId, actor, type, title, desc);
    AuditCaseEngine.linkEvidence(caseId, ev.id);
    
    // Log action to Ledger
    const { AuditLedgerEngine } = require('./AuditLedgerEngine');
    const c = AuditCaseEngine.getCases().find(v => v.id === caseId);
    if (c) {
      AuditLedgerEngine.appendRecord(
        'ETH-OFFICER',
        actor,
        'EVIDENCE_REGISTERED',
        `Registered evidence ${ev.id} (${title}) on case ${caseId} in ${c.jurisdiction} enclave.`,
        c.jurisdiction,
        'TRANSPARENCY'
      );
    }
  }
}
