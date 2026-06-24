import React from 'react';
import { 
  Network, Play, Pause, RefreshCw
} from 'lucide-react';
import { Language } from '../../types';

// Import local Refactored items
import { useEcosystemWorkflows } from './hooks/useEcosystemWorkflows';
import { t } from './localization/workflowTranslations';
import { ScenarioSelectorPanel } from './components/ScenarioSelectorPanel';
import { PipelineMapPanel } from './components/PipelineMapPanel';
import { TransactionLedgerPanel } from './components/TransactionLedgerPanel';
import { GovernanceRulesPanel } from './components/GovernanceRulesPanel';

interface EcosystemWorkflowsProps {
  lang: Language;
}

export default function EcosystemWorkflows({ lang }: EcosystemWorkflowsProps) {
  const model = useEcosystemWorkflows(lang);
  const isRtl = lang !== 'en';

  return (
    <div id="ecosystem-workflows-canvas" className="bg-[#111e2e]/95 rounded-xl border border-slate-800 p-5 lg:p-6 shadow-2xl flex flex-col gap-6 text-slate-100/90 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Simulation Dashboard Header Banner */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5 text-start">
        <div className="text-start">
          <span className="text-[10px] uppercase font-mono text-[#E0A96D] tracking-widest font-bold block text-start">
            {t(lang, 'header.overwatch')}
          </span>
          <h2 className="text-xl font-display font-semibold tracking-wide text-slate-50 uppercase flex items-center gap-2.5 mt-0.5 text-start">
            <span className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <Network className="w-5 h-5 text-cyan-400" />
            </span>
            {t(lang, 'header.title')}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl text-start">
            {t(lang, 'header.subtitle')}
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2.5 bg-[#0b1420] border border-slate-800 p-2 rounded-lg text-start self-start">
          <span className="text-[10px] font-mono text-slate-500 uppercase px-1 font-bold">
            {t(lang, 'header.speedPrefix')}
          </span>
          
          <button
            onClick={() => model.setSimulationSpeed(4500)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
              model.simulationSpeed === 4500 ? 'bg-slate-900 border border-slate-800 text-[#E0A96D] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t(lang, 'header.slower')}
          </button>
          
          <button
            onClick={() => model.setSimulationSpeed(3000)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
              model.simulationSpeed === 3000 ? 'bg-slate-900 border border-slate-800 text-[#E0A96D] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t(lang, 'header.normal')}
          </button>

          <button
            onClick={() => model.setSimulationSpeed(1500)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
              model.simulationSpeed === 1500 ? 'bg-slate-900 border border-slate-800 text-[#E0A96D] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t(lang, 'header.accelerated')}
          </button>

          <div className="h-4 w-[1px] bg-slate-800 mx-1"></div>

          <button
            onClick={() => model.setIsSimulating(!model.isSimulating)}
            className={`px-3 py-1 rounded text-[10px] uppercase font-mono font-bold transition-all flex items-center gap-1 ${
              model.isSimulating 
                ? 'bg-amber-950/40 text-amber-400 border border-amber-500/25' 
                : 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/25'
            }`}
          >
            {model.isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {model.isSimulating 
              ? t(lang, 'header.pause')
              : t(lang, 'header.resume')}
          </button>
        </div>
      </div>

      {/* Roster of Scenarios Selection Panels */}
      <ScenarioSelectorPanel 
        lang={lang}
        activeScenario={model.activeScenario}
        setActiveScenario={model.setActiveScenario}
        setSimMetrics={model.setSimMetrics}
      />

      {/* Live Pipeline Step Visual Grid Map */}
      <PipelineMapPanel 
        lang={lang}
        workflowSteps={model.workflowSteps}
        activeStepIndex={model.activeStepIndex}
        setActiveStepIndex={model.setActiveStepIndex}
        activeStep={model.activeStep}
        simMetrics={model.simMetrics}
        activeScenario={model.activeScenario}
      />

      {/* Bottom sections: Transaction monitor split with logs & sidebar governance */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-start">
        
        {/* Left 2/3: Live Transaction logs list */}
        <TransactionLedgerPanel 
          lang={lang}
          logs={model.logs}
          activeScenario={model.activeScenario}
        />

        {/* Right 1/3 sidebar framework governance rules */}
        <GovernanceRulesPanel 
          lang={lang}
        />

      </div>

    </div>
  );
}
