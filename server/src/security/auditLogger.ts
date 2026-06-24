import { env } from '../config/env.js';
import { AuditLogEntry } from '../types/provider.js';

export class AuditLogger {
  public static log(entry: Omit<AuditLogEntry, 'timestamp' | 'requestId'>, reqId: string): void {
    if (!env.ENABLE_AUDIT_LOG) return;

    const logEntry: AuditLogEntry = {
      requestId: reqId,
      timestamp: new Date().toISOString(),
      jurisdiction: entry.jurisdiction,
      route: entry.route,
      providerState: entry.providerState,
      decision: entry.decision
    };

    // Output secure structure.
    console.log(`[AUDIT_LOG] ${JSON.stringify(logEntry)}`);
  }
}
