import { CheckpointDTO } from '../contracts/CheckpointContract';
import { CheckpointRepository } from '../contracts/CheckpointContract';
import { ProductionProviderRegistry } from '../infrastructure/providers/ProductionProviderRegistry';
import { DemoModeController } from '../shared/demo/DemoModeController';

export class CheckpointRepositoryImpl implements CheckpointRepository {
  async getAll(): Promise<CheckpointDTO[]> {
    const mode = DemoModeController.getActiveMode();
    if (mode === 'OPERATIONAL_MODE') {
      const provider = ProductionProviderRegistry.getCheckpointProvider();
      return provider.fetchAll();
    }
    return DemoModeController.getCheckpoints();
  }

  async getById(id: string): Promise<CheckpointDTO | null> {
    const all = await this.getAll();
    return all.find(c => c.id === id) || null;
  }
}
