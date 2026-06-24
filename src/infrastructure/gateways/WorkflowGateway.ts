export interface WorkflowGateway {
  executeStep(stepId: string, payload: unknown): Promise<unknown>;
}
