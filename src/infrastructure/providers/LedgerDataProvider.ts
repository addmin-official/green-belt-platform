import { LedgerBlockDTO } from '../../contracts/LedgerContract';
import { ProviderState } from './ProviderState';

export interface LedgerDataProvider {
  state: ProviderState;
  fetchRecent(limit: number): Promise<LedgerBlockDTO[]>;
}
