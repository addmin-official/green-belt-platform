import { useState, useEffect, useCallback, useMemo } from 'react';
import { DataFabricOrchestrator } from '../services/DataFabricOrchestrator';
import { LineageImpactNode } from '../types/DataFabricViewModels';

export function useDataLineage() {
  const orchestrator = useMemo(() => DataFabricOrchestrator.getInstance(), []);

  const [impactSourceNode, setImpactSourceNode] = useState('src-moi-civil-db');
  const [impactResult, setImpactResult] = useState<LineageImpactNode[]>([]);

  const triggerImpactSimulation = useCallback((nodeId: string) => {
    setImpactSourceNode(nodeId);
    const affected = orchestrator.executeImpactSimulation(nodeId);
    setImpactResult(affected);
  }, [orchestrator]);

  useEffect(() => {
    triggerImpactSimulation('src-moi-civil-db');
  }, [triggerImpactSimulation]);

  const lineageGraph = useMemo(() => {
    return orchestrator.getLineageGraph();
  }, [orchestrator]);

  return {
    impactSourceNode,
    impactResult,
    lineageGraph,
    triggerImpactSimulation
  };
}
