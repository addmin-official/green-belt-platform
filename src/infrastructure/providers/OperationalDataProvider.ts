import { SystemService } from '../../types';
import { ProviderState } from './ProviderState';

export interface OperationalDataProvider {
  state: ProviderState;
  fetchAllServices(): Promise<SystemServicesDTO[]>;
}

// Map helper to DTO naming in the command center
export type SystemServicesDTO = SystemService;
