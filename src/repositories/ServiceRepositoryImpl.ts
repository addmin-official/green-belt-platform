import { SystemService } from '../types';
import { ProductionProviderRegistry } from '../infrastructure/providers/ProductionProviderRegistry';
import { DemoModeController } from '../shared/demo/DemoModeController';

export interface ServiceRepository {
  getServices(): Promise<SystemService[]>;
}

export class ServiceRepositoryImpl implements ServiceRepository {
  async getServices(): Promise<SystemService[]> {
    const mode = DemoModeController.getActiveMode();
    if (mode === 'OPERATIONAL_MODE') {
      const provider = ProductionProviderRegistry.getOperationalProvider();
      return provider.fetchAllServices();
    }
    return DemoModeController.getSystemServices();
  }
}
