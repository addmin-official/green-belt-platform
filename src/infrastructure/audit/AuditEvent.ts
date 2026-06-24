export interface AuditEvent {
  action: string;
  actor: string;
  timestamp: string;
  details: unknown;
}
