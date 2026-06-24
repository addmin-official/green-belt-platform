import { useState, useEffect } from 'react';
import { Language } from '../../../types';
import { initialWorkflowSteps } from '../data/workflowTemplates';
import { t } from '../../../localization';

export interface WorkflowStep {
  id: string;
  title: Record<string, string>;
  actor: Record<string, string>;
  detail: Record<string, string>;
}

export interface LogEntry {
  id: string;
  step: string;
  status: string;
  detail: string;
  timestamp: string;
}

export function useEcosystemWorkflows(lang: Language) {
  const [activeScenario, setActiveScenario] = useState<'general-trade' | 'krg-trade' | 'air-cargo'>('general-trade');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(3000);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'TX-0981', step: '1. Manifest Input', status: 'Success', detail: 'Pre-filing container batch registration processed via secure terminal.', timestamp: 'Just now' },
    { id: 'TX-0980', step: '13. Settlement Dispatch', status: 'Success', detail: 'National Treasury ledger updated; custom duty IQD cleared.', timestamp: '2 mins ago' }
  ]);

  const [simMetrics, setSimMetrics] = useState({
    processedTransactions: 124,
    unmitigatedAnomalies: 0,
    totalDutyCalculated: 4124900000,
    averageClearanceTime: 14.2
  });

  const workflowSteps = initialWorkflowSteps;

  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      timer = setInterval(() => {
        setActiveStepIndex((prev) => {
          const next = (prev + 1) % workflowSteps.length;
          
          if (next === 0) {
            setSimMetrics(prevMetrics => ({
              processedTransactions: prevMetrics.processedTransactions + 1,
              unmitigatedAnomalies: Math.random() > 0.85 ? prevMetrics.unmitigatedAnomalies + 1 : prevMetrics.unmitigatedAnomalies,
              totalDutyCalculated: prevMetrics.totalDutyCalculated + Math.floor(12000000 + Math.random() * 8000000),
              averageClearanceTime: Number((13.8 + Math.random() * 0.8).toFixed(1))
            }));
          }

          const stepObj = workflowSteps[next];
          const newTx = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
          setLogs(prevLogs => [
            { 
              id: newTx, 
              step: `${next + 1}. ${stepObj.title[lang] || stepObj.title['en']}`, 
              status: 'Processing', 
              detail: t(lang, 'workflow.ledger.log.successDetail').replace('{scenario}', activeScenario.toUpperCase()), 
              timestamp: t(lang, 'workflow.ledger.log.justNow') 
            },
            ...prevLogs.slice(0, 11)
          ]);

          return next;
        });
      }, simulationSpeed);
    }
    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed, activeScenario, lang, workflowSteps]);

  const activeStep = workflowSteps[activeStepIndex];

  return {
    activeScenario, setActiveScenario,
    isSimulating, setIsSimulating,
    simulationSpeed, setSimulationSpeed,
    activeStepIndex, setActiveStepIndex,
    logs, simMetrics, setSimMetrics,
    workflowSteps, activeStep
  };
}
