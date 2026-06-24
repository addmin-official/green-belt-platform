import { LedgerBlockDTO } from '../contracts/LedgerContract';
import { LedgerRepository } from '../contracts/LedgerContract';
import { ProductionProviderRegistry } from '../infrastructure/providers/ProductionProviderRegistry';
import { DemoModeController } from '../shared/demo/DemoModeController';

export class LedgerRepositoryImpl implements LedgerRepository {
  async getRecentBlocks(limit: number): Promise<LedgerBlockDTO[]> {
    const mode = DemoModeController.getActiveMode();
    if (mode === 'OPERATIONAL_MODE') {
      const provider = ProductionProviderRegistry.getLedgerProvider();
      return provider.fetchRecent(limit);
    }
    return DemoModeController.getMockLedgerBlocks().slice(0, limit);
  }

  async processTransaction(payload: any): Promise<LedgerBlockDTO> {
    throw new Error('Not implemented');
  }
}
