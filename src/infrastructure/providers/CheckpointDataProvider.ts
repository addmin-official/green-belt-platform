import { CheckpointDTO } from '../../contracts/CheckpointContract';
import { ProviderState } from './ProviderState';

export interface CheckpointDataProvider {
  state: ProviderState;
  fetchAll(): Promise<CheckpointDTO[]>;
}
