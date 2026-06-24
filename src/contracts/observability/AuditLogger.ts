export interface AuditLogger {
  logAction(actor: string, action: string, status: 'success' | 'failure', details: string): void;
}
