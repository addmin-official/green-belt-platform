import { WorkflowStepDTO } from '../contracts/WorkflowContract';
import { WorkflowRepository } from '../contracts/WorkflowContract';
import { ProductionProviderRegistry } from '../infrastructure/providers/ProductionProviderRegistry';
import { DemoModeController } from '../shared/demo/DemoModeController';

export class WorkflowRepositoryImpl implements WorkflowRepository {
  async getSteps(): Promise<WorkflowStepDTO[]> {
    const mode = DemoModeController.getActiveMode();
    if (mode === 'OPERATIONAL_MODE') {
      const provider = ProductionProviderRegistry.getWorkflowProvider();
      return provider.fetchAll();
    }
    
    return [
      { id: '1', stepNumber: 1, title: { en: 'Sovereign ID Verification', ar: 'التحقق من الهوية السيادية', ku: 'پەسەندکردنی ناسنامە' }, status: 'completed', durationMinutes: 10, isAutomated: true, actorRole: 'Officer' },
      { id: '2', stepNumber: 2, title: { en: 'HS-Code Automated Match', ar: 'مطابقة الرمز المنسق التلقائية', ku: 'هاوڕێکیی کۆدی گومرگی' }, status: 'completed', durationMinutes: 5, isAutomated: true, actorRole: 'System' },
      { id: '3', stepNumber: 3, title: { en: 'Central Bank Payment Audit', ar: 'تدقيق مدفوعات البنك المركزي', ku: 'وردبینی پارەی CBI' }, status: 'pending', durationMinutes: 12, isAutomated: false, actorRole: 'Auditor' }
    ];
  }
}
