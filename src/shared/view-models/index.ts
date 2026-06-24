import { IdentityOrchestrator } from '../../orchestrators/IdentityOrchestrator';
import { SecurityOrchestrator } from '../../orchestrators/SecurityOrchestrator';
import { WorkflowOrchestrator } from '../../orchestrators/WorkflowOrchestrator';
import { AIOrchestrator } from '../../orchestrators/AIOrchestrator';
import { CommandCenterOrchestrator } from '../../orchestrators/CommandCenterOrchestrator';

export const Orchestrators = {
  identity: IdentityOrchestrator.getInstance(),
  security: SecurityOrchestrator.getInstance(),
  workflow: WorkflowOrchestrator.getInstance(),
  ai: AIOrchestrator.getInstance(),
  commandCenter: CommandCenterOrchestrator.getInstance(),
};

export { AuditViewModel } from './AuditViewModel';
export { CustomsViewModel } from './CustomsViewModel';
export { BorderEventViewModel } from './BorderEventViewModel';
export { CommandCenterViewModel } from './CommandCenterViewModel';
export { AnalyticsViewModel } from './AnalyticsViewModel';
export { IdentityViewModel } from './IdentityViewModel';
