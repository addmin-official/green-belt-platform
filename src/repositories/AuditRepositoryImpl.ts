import { AuditLogDTO } from '../contracts/AuditContract';
import { AuditRepository } from '../contracts/AuditContract';
import { ProductionProviderRegistry } from '../infrastructure/providers/ProductionProviderRegistry';
import { DemoModeController } from '../shared/demo/DemoModeController';

export class AuditRepositoryImpl implements AuditRepository {
  async getLogs(): Promise<AuditLogDTO[]> {
    const mode = DemoModeController.getActiveMode();
    if (mode === 'OPERATIONAL_MODE') {
      const provider = ProductionProviderRegistry.getAuditProvider();
      return provider.fetchLogs();
    }
    
    // For presentation/training mode, return isolated sample data
    return DemoModeController.getTradeAlerts().map(alert => ({
      id: alert.id,
      timestamp: alert.timestamp,
      actor: alert.checkpointName.en,
      action: alert.title.en,
      status: alert.status === 'resolved' ? 'success' as const : 'failure' as const,
      details: alert.description.en
    }));
  }
}
