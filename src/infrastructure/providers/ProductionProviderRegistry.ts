import { DemoModeController } from '../../shared/demo/DemoModeController';
import { ProviderState } from './ProviderState';

import { CheckpointDataProvider } from './CheckpointDataProvider';
import { OperationalDataProvider, SystemServicesDTO } from './OperationalDataProvider';
import { AuditDataProvider } from './AuditDataProvider';
import { LedgerDataProvider } from './LedgerDataProvider';
import { WorkflowDataProvider } from './WorkflowDataProvider';

import { FederalBackendProvider } from './FederalBackendProvider';
import { KRGBackendProvider } from './KRGBackendProvider';
import { JointMetadataBackendProvider } from './JointMetadataBackendProvider';

import { CheckpointDTO } from '../../contracts/CheckpointContract';
import { AuditLogDTO } from '../../contracts/AuditContract';
import { LedgerBlockDTO } from '../../contracts/LedgerContract';
import { WorkflowStepDTO } from '../../contracts/WorkflowContract';

export class RealCheckpointDataProvider implements CheckpointDataProvider {
  get state(): ProviderState {
    return DemoModeController.getProviderState('checkpoint');
  }
  async fetchAll(): Promise<CheckpointDTO[]> {
    const s = this.state;
    if (s === 'not_configured') throw new Error('PROVIDER_NOT_CONFIGURED');
    if (s === 'unavailable') throw new Error('DATA_SOURCE_REQUIRED');
    if (s === 'error') throw new Error('PROVIDER_ERROR');
    return DemoModeController.getCheckpoints();
  }
}

export class RealOperationalDataProvider implements OperationalDataProvider {
  get state(): ProviderState {
    return DemoModeController.getProviderState('operational');
  }
  async fetchAllServices(): Promise<SystemServicesDTO[]> {
    const s = this.state;
    if (s === 'not_configured') throw new Error('PROVIDER_NOT_CONFIGURED');
    if (s === 'unavailable') throw new Error('DATA_SOURCE_REQUIRED');
    if (s === 'error') throw new Error('PROVIDER_ERROR');
    return DemoModeController.getSystemServices();
  }
}

export class RealAuditDataProvider implements AuditDataProvider {
  get state(): ProviderState {
    return DemoModeController.getProviderState('audit');
  }
  async fetchLogs(): Promise<AuditLogDTO[]> {
    const s = this.state;
    if (s === 'not_configured') throw new Error('PROVIDER_NOT_CONFIGURED');
    if (s === 'unavailable') throw new Error('DATA_SOURCE_REQUIRED');
    if (s === 'error') throw new Error('PROVIDER_ERROR');
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

export class RealLedgerDataProvider implements LedgerDataProvider {
  get state(): ProviderState {
    return DemoModeController.getProviderState('ledger');
  }
  async fetchRecent(limit: number): Promise<LedgerBlockDTO[]> {
    const s = this.state;
    if (s === 'not_configured') throw new Error('PROVIDER_NOT_CONFIGURED');
    if (s === 'unavailable') throw new Error('DATA_SOURCE_REQUIRED');
    if (s === 'error') throw new Error('PROVIDER_ERROR');
    return DemoModeController.getMockLedgerBlocks().slice(0, limit);
  }
}

export class RealWorkflowDataProvider implements WorkflowDataProvider {
  get state(): ProviderState {
    return DemoModeController.getProviderState('workflow');
  }
  async fetchAll(): Promise<WorkflowStepDTO[]> {
    const s = this.state;
    if (s === 'not_configured') throw new Error('PROVIDER_NOT_CONFIGURED');
    if (s === 'unavailable') throw new Error('DATA_SOURCE_REQUIRED');
    if (s === 'error') throw new Error('PROVIDER_ERROR');
    
    return [
      { id: '1', stepNumber: 1, title: { en: 'Sovereign ID Verification', ar: 'التحقق من الهوية السيادية', ku: 'پەسەندکردنی ناسنامە' }, status: 'completed', durationMinutes: 10, isAutomated: true, actorRole: 'Officer' },
      { id: '2', stepNumber: 2, title: { en: 'HS-Code Automated Match', ar: 'مطابقة الرمز المنسق التلقائية', ku: 'هاوڕێکیی کۆدی گومرگی' }, status: 'completed', durationMinutes: 5, isAutomated: true, actorRole: 'System' },
      { id: '3', stepNumber: 3, title: { en: 'Central Bank Payment Audit', ar: 'تدقيق مدفوعات البنك المركزي', ku: 'وردبینی پارەی CBI' }, status: 'pending', durationMinutes: 12, isAutomated: false, actorRole: 'Auditor' }
    ];
  }
}

export class ProductionProviderRegistry {
  private static checkpoint: CheckpointDataProvider = new RealCheckpointDataProvider();
  private static operational: OperationalDataProvider = new RealOperationalDataProvider();
  private static audit: AuditDataProvider = new RealAuditDataProvider();
  private static ledger: LedgerDataProvider = new RealLedgerDataProvider();
  private static workflow: WorkflowDataProvider = new RealWorkflowDataProvider();

  private static federalBackend = new FederalBackendProvider();
  private static krgBackend = new KRGBackendProvider();
  private static jointBackend = new JointMetadataBackendProvider();

  public static getCheckpointProvider(): CheckpointDataProvider { return this.checkpoint; }
  public static getOperationalProvider(): OperationalDataProvider { return this.operational; }
  public static getAuditProvider(): AuditDataProvider { return this.audit; }
  public static getLedgerProvider(): LedgerDataProvider { return this.ledger; }
  public static getWorkflowProvider(): WorkflowDataProvider { return this.workflow; }

  public static getFederalBackendProvider(): FederalBackendProvider { return this.federalBackend; }
  public static getKRGBackendProvider(): KRGBackendProvider { return this.krgBackend; }
  public static getJointMetadataBackendProvider(): JointMetadataBackendProvider { return this.jointBackend; }
}
