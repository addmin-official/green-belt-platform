import { WorkflowStepDTO } from '../../contracts/WorkflowContract';
import { ProviderState } from './ProviderState';

export interface WorkflowDataProvider {
  state: ProviderState;
  fetchAll(): Promise<WorkflowStepDTO[]>;
}
