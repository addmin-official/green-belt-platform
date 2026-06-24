export interface WorkflowStepDTO {
  id: string;
  stepNumber: number;
  title: Record<string, string>;
  status: string;
  durationMinutes: number;
  isAutomated: boolean;
  actorRole: string;
}

export interface WorkflowRepository {
  getSteps(): Promise<WorkflowStepDTO[]>;
}

export interface WorkflowItem {
  id: string;
  importer: string;
  hscode: string;
  duty: string;
  risk: string;
  status: string;
  step: number;
}

export interface WorkflowContract {
  getActiveWorkflows(): WorkflowItem[];
  getWorkflowById(id: string): WorkflowItem | undefined;
  transitionWorkflow(id: string, action: 'APPROVE' | 'REJECT' | 'HOLD'): void;
  getWorkflowSteps(): any[];
}
