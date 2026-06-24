export interface AuditLogDTO {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  status: 'success' | 'failure';
  details: string;
}

export interface AuditRepository {
  getLogs(): Promise<AuditLogDTO[]>;
}
