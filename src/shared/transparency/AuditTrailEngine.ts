import { AuditLedgerEngine } from './AuditLedgerEngine';
import { AuditRecord, Jurisdiction } from './AuditTypes';

export class AuditTrailEngine {
  public static getTimelineForRecord(recordId: string): AuditRecord[] {
    const allLogs = AuditLedgerEngine.getLedgerByJurisdiction('joint');
    const root = allLogs.find(r => r.id === recordId);
    if (!root) return [];

    // Track records within same module and jurisdiction as timelines
    return allLogs
      .filter(r => r.jurisdiction === root.jurisdiction && r.module === root.module)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  public static getReconstructedChain(jurisdiction: Jurisdiction): {
    records: AuditRecord[];
    isValid: boolean;
  } {
    const records = AuditLedgerEngine.getLedgerByJurisdiction(jurisdiction);
    const isValid = AuditLedgerEngine.verifyChainIntegrity();

    return {
      records: [...records].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      isValid
    };
  }
}
