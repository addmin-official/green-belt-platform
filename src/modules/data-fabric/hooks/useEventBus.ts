import { useState, useCallback, useMemo, useEffect } from 'react';
import { SovereignDomainEvent } from '../../../data-fabric';
import { DataFabricOrchestrator } from '../services/DataFabricOrchestrator';

export function useEventBus(onEventPublished?: () => void) {
  const orchestrator = useMemo(() => DataFabricOrchestrator.getInstance(), []);

  const [activeEvents, setActiveEvents] = useState<SovereignDomainEvent[]>([]);
  const [simTopic, setSimTopic] = useState<'customs.manifest.declared' | 'identity.citizen.unified' | 'financial.wire.flagged'>('customs.manifest.declared');
  const [simSourceSystem] = useState('General Authority for Customs');
  const [simPayloadKey, setSimPayloadKey] = useState('declaredWeightTons');
  const [simPayloadValue, setSimPayloadValue] = useState('120.4');

  const reloadEvents = useCallback(() => {
    setActiveEvents(orchestrator.getEventHistory());
  }, [orchestrator]);

  useEffect(() => {
    reloadEvents();
  }, [reloadEvents]);

  const dispatchCustomSimulatorEvent = useCallback(() => {
    const payloadObj: Record<string, string> = {};
    payloadObj[simPayloadKey || 'metadata'] = simPayloadValue || '42.0';
    payloadObj['reconciledBy'] = 'Sovereign Automated Orchestrator';

    orchestrator.publishEvent(simTopic, simSourceSystem, payloadObj);
    reloadEvents();

    let targetDs = '';
    if (simTopic === 'customs.manifest.declared') targetDs = 'ds-port-cargo-manifests-04';
    else if (simTopic === 'identity.citizen.unified') targetDs = 'ds-national-citizens-01';
    else if (simTopic === 'financial.wire.flagged') targetDs = 'ds-currency-reserves-03';

    if (targetDs) {
      const reports = orchestrator.getQualityReports();
      const currentRep = reports.find(r => r.datasetId === targetDs);
      if (currentRep) {
        const nextCompleteness = Math.min(100, currentRep.metrics.completeness + 0.1);
        orchestrator.triggerLiveRecalculationAssessment(targetDs, nextCompleteness);
      }
    }

    if (onEventPublished) {
      onEventPublished();
    }
  }, [orchestrator, simTopic, simSourceSystem, simPayloadKey, simPayloadValue, reloadEvents, onEventPublished]);

  return {
    activeEvents,
    simTopic,
    setSimTopic,
    simPayloadKey,
    setSimPayloadKey,
    simPayloadValue,
    setSimPayloadValue,
    dispatchCustomSimulatorEvent,
    reloadEvents
  };
}
