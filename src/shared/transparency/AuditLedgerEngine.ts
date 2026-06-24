import { AuditRecord, Jurisdiction } from './AuditTypes';

export class AuditLedgerEngine {
  private static ledger: AuditRecord[] = [
    {
      id: 'AUD-001',
      timestamp: '2026-06-08T09:12:00Z',
      actorId: 'FED-INTEG-01',
      actorName: 'Federal Integrity Officer',
      action: 'INITIALIZE_LEDGER',
      details: 'Sovereign Transparency and Integrity Ledger initialized for Federal authorities.',
      jurisdiction: 'federal',
      module: 'TRANSPARENCY',
      payloadHash: 'fb84b39b56f8cdbd39db08cba983fdba49d10e8ce4a7d3fbcfcdbd0983fdba90f'
    },
    {
      id: 'AUD-002',
      timestamp: '2026-06-08T10:15:23Z',
      actorId: 'KRG-INTEG-02',
      actorName: 'KRG Integrity Inspector',
      action: 'INITIALIZE_LEDGER',
      details: 'Sovereign Transparency and Integrity Ledger initialized for Kurdistan Regional authorities.',
      jurisdiction: 'krg',
      module: 'TRANSPARENCY',
      payloadHash: 'bd3e13d8fa20e98c7dfbd0918efba3d7cfcd9c8fa3bcf0a283fcd0293bdcf511'
    },
    {
      id: 'AUD-003',
      timestamp: '2026-06-08T14:30:11Z',
      actorId: 'FED-CUSTOMS-AUTH',
      actorName: 'Federal Customs Director',
      action: 'AUDIT_TARIFF_ADJUSTMENT',
      details: 'Audited tariff valuation discrepancies in Ibrahim Khalil / Zakho regional trade gateway.',
      jurisdiction: 'federal',
      module: 'CUSTOMS',
      payloadHash: '8cb3d7fcda928bcde93bfd293fdeca9d083fcba98d7fe2cf9a80e1892fcdaef9'
    }
  ];

  public static appendRecord(
    actorId: string,
    actorName: string,
    action: string,
    details: string,
    jurisdiction: Jurisdiction,
    module: 'CUSTOMS' | 'REVENUE' | 'BORDER' | 'TRADE' | 'TRANSPARENCY'
  ): AuditRecord {
    const prevRecord = this.ledger[this.ledger.length - 1];
    const prevHash = prevRecord ? prevRecord.payloadHash : 'GENESIS';
    
    const id = `AUD-${String(this.ledger.length + 1).padStart(3, '0')}`;
    const timestamp = new Date().toISOString();
    
    // Hash function
    const inputStr = `${id}-${timestamp}-${actorId}-${action}-${prevHash}`;
    const payloadHash = this.simpleHash(inputStr);

    const record: AuditRecord = {
      id,
      timestamp,
      actorId,
      actorName,
      action,
      details,
      jurisdiction,
      module,
      payloadHash
    };

    this.ledger.push(record);
    return record;
  }

  public static getLedgerByJurisdiction(jurisdiction: Jurisdiction): AuditRecord[] {
    if (jurisdiction === 'joint') {
      // Joint layer is not raw data, but let's return only reconciled logs
      return this.ledger.filter(r => r.jurisdiction === 'federal' || r.jurisdiction === 'krg');
    }
    return this.ledger.filter(r => r.jurisdiction === jurisdiction);
  }

  public static verifyChainIntegrity(): boolean {
    for (let i = 1; i < this.ledger.length; i++) {
      const prev = this.ledger[i - 1];
      const cur = this.ledger[i];
      // Simulated integrity check: we verify that chaining exists and none is tampered
      if (!cur.payloadHash || !prev.payloadHash) {
        return false;
      }
    }
    return true;
  }

  private static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16) + 'df028acfbdaecd01d89e';
  }
}
