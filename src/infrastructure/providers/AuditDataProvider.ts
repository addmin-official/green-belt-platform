import { AuditLogDTO } from '../../contracts/AuditContract';
import { ProviderState } from './ProviderState';

export interface AuditDataProvider {
  state: ProviderState;
  fetchLogs(): Promise<AuditLogDTO[]>;
}
