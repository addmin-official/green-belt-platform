import { TradeAuditLog, Jurisdiction } from './TradeTypes';

export class TradeAuditEngine {
  private static auditLogs: TradeAuditLog[] = [
    {
      id: 'AUD-TRD-000101',
      timestamp: new Date(Date.now() - 3600000 * 240).toISOString(),
      actor: 'Federal Customs Director Al-Zubaidi',
      action: 'LICENSE_ISSUANCE',
      recordId: 'LIC-FED-IMP-2001',
      recordType: 'LICENSE',
      details: 'Issued large scale grain and auto import quota authorization for State Supply.',
      hash: 'fa821cd8c199042b311234c892bdef91'
    },
    {
      id: 'AUD-TRD-000102',
      timestamp: new Date(Date.now() - 3600000 * 150).toISOString(),
      actor: 'KRG Trade Comptroller Barzani',
      action: 'LICENSE_SUSPENSION',
      recordId: 'LIC-KRG-SPC-5003',
      recordType: 'LICENSE',
      details: 'Suspended dual-use license pending security intelligence inspection.',
      hash: 'da711cd2c188042b511334c292bcef11'
    }
  ];

  public static getLogsByJurisdiction(jurisdiction: Jurisdiction): TradeAuditLog[] {
    // Filter based on naming codes to respect boundary separation
    if (jurisdiction === 'federal') {
      return this.auditLogs.filter(log => log.recordId.includes('-FED-'));
    } else if (jurisdiction === 'krg') {
      return this.auditLogs.filter(log => log.recordId.includes('-KRG-'));
    } else {
      // Joint sees everything but can be summary or joint-related records only
      return [...this.auditLogs];
    }
  }

  public static getLogsByRecordId(recordId: string): TradeAuditLog[] {
    return this.auditLogs.filter(log => log.recordId === recordId);
  }

  public static logAction(
    actor: string,
    action: string,
    recordId: string,
    recordType: 'DECLARATION' | 'LICENSE' | 'VIOLATION' | 'RISK_PROFILE',
    details: string
  ): TradeAuditLog {
    const idNum = Math.floor(100000 + Math.random() * 899999);
    const id = `AUD-TRD-${idNum}`;
    const timestamp = new Date().toISOString();
    
    // Simple mock hash generation
    const cleanDetails = details.replace(/[^a-zA-Z0-9]/g, '');
    const hash = `hash_${Math.random().toString(36).substring(2, 10)}_${cleanDetails.slice(0, 10).toLowerCase()}`;

    const newLog: TradeAuditLog = {
      id,
      timestamp,
      actor,
      action,
      recordId,
      recordType,
      details,
      hash
    };

    this.auditLogs.unshift(newLog);
    return newLog;
  }
}
