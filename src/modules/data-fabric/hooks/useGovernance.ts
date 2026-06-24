import { useState, useEffect, useCallback, useMemo } from 'react';
import { AccessRequestWorkflow } from '../../../data-fabric';
import { DataFabricOrchestrator } from '../services/DataFabricOrchestrator';

export function useGovernance() {
  const orchestrator = useMemo(() => DataFabricOrchestrator.getInstance(), []);

  const [workflows, setWorkflows] = useState<AccessRequestWorkflow[]>([]);

  const reloadWorkflows = useCallback(() => {
    setWorkflows(orchestrator.getWorkflows());
  }, [orchestrator]);

  useEffect(() => {
    reloadWorkflows();
  }, [reloadWorkflows]);

  const executeApprovalSignoff = useCallback((wfId: string, approverRole: string, approverName: string) => {
    orchestrator.signWorkflowApprovalStep(wfId, approverRole, approverName);
    reloadWorkflows();
  }, [orchestrator, reloadWorkflows]);

  return {
    workflows,
    executeApprovalSignoff,
    reloadWorkflows
  };
}
