export interface AuditGateway {
  logEvent(event: unknown): Promise<void>;
}
