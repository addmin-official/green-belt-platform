import { AuditEvent } from './AuditEvent';

export interface AuditPipeline {
  submit(event: AuditEvent): Promise<void>;
}
