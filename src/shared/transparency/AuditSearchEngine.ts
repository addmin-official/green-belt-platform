import { AuditLedgerEngine } from './AuditLedgerEngine';
import { AuditCaseEngine } from './AuditCaseEngine';
import { AuditRecord, InvestigationCase, Jurisdiction } from './AuditTypes';

export class AuditSearchEngine {
  public static searchAll(
    query: string,
    jurisdiction: Jurisdiction
  ): {
    records: AuditRecord[];
    cases: InvestigationCase[];
  } {
    const records = AuditLedgerEngine.getLedgerByJurisdiction(jurisdiction);
    const cases = AuditCaseEngine.getCasesByJurisdiction(jurisdiction);

    const lQuery = query.toLowerCase().trim();

    if (!lQuery) {
      return { records, cases };
    }

    const filteredRecords = records.filter(
      r =>
        r.id.toLowerCase().includes(lQuery) ||
        r.action.toLowerCase().includes(lQuery) ||
        r.details.toLowerCase().includes(lQuery) ||
        r.actorName.toLowerCase().includes(lQuery)
    );

    const filteredCases = cases.filter(
      c =>
        c.id.toLowerCase().includes(lQuery) ||
        c.title.toLowerCase().includes(lQuery) ||
        c.description.toLowerCase().includes(lQuery) ||
        c.assignedOfficer.toLowerCase().includes(lQuery) ||
        (c.suspectEntity && c.suspectEntity.toLowerCase().includes(lQuery)) ||
        (c.suspectOfficer && c.suspectOfficer.toLowerCase().includes(lQuery))
    );

    return {
      records: filteredRecords,
      cases: filteredCases
    };
  }
}
