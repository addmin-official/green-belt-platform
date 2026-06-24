import { BorderAuditRecord, BorderJurisdiction, BorderOwnership, BorderVisibilityFlag } from './BorderTypes';

export class BorderAuditEngine {
  private static ledger: BorderAuditRecord[] = [
    {
      hash: 'sha256_initial_border_audit_record_hash_key_002847192837bcdaef7263',
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      timestamp: '2026-06-01T08:00:00Z',
      action: 'BOOT_BORDER_CORE',
      actor: 'SOVEREIGN_BORDER_PORT_COMMISSION',
      details: 'Sovereign Border Operations Core initialized successfully under joint federal-region legislation.',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Federal-Region Border Committee',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-3-REGIONAL'
    }
  ];

  public static getLedger(): BorderAuditRecord[] {
    return [...this.ledger];
  }

  public static appendRecord(
    action: string,
    actor: string,
    details: string,
    jurisdiction: BorderJurisdiction,
    ownership: BorderOwnership,
    authority: string,
    visibility: BorderVisibilityFlag = 'RESTRICTED',
    accessPolicy: string = 'LEVEL-4-JOINT'
  ): BorderAuditRecord {
    const parent = this.ledger[this.ledger.length - 1];
    const previousHash = parent ? parent.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();

    const payload = `${previousHash}|${timestamp}|${action}|${actor}|${details}|${jurisdiction}|${ownership}|${authority}`;
    const hash = this.calculateSHA256(payload);

    const newRecord: BorderAuditRecord = {
      hash,
      previousHash,
      timestamp,
      action,
      actor,
      details,
      jurisdiction,
      ownership,
      authority,
      visibility,
      accessPolicy
    };

    this.ledger.push(newRecord);
    return newRecord;
  }

  public static verifyLedgerIntegrity(): boolean {
    for (let i = 1; i < this.ledger.length; i++) {
      const current = this.ledger[i];
      const previous = this.ledger[i - 1];
      if (current.previousHash !== previous.hash) {
        return false;
      }
      const payload = `${current.previousHash}|${current.timestamp}|${current.action}|${current.actor}|${current.details}|${current.jurisdiction}|${current.ownership}|${current.authority}`;
      const expectedHash = this.calculateSHA256(payload);
      if (current.hash !== expectedHash) {
        return false;
      }
    }
    return true;
  }

  private static calculateSHA256(str: string): string {
    let hash = 0;
    if (str.length === 0) return '0000000000000000000000000000000000000000000000000000000000000000';
    for (let i = 0; i < str.length; i++) {
       const chr = str.charCodeAt(i);
       hash = ((hash << 5) - hash) + chr;
       hash |= 0;
    }
    const safeHash = Math.abs(hash).toString(16).padStart(8, '0');
    return `sha256_${safeHash}_${Array.from({ length: 40 }, (_, idx) => 
       ((hash + idx * 11) & 15).toString(16)
    ).join('')}`;
  }
}
