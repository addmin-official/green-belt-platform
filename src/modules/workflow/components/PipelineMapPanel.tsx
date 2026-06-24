import React from 'react';
import { ArrowRight, FileCheck, Activity } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/workflowTranslations';
import { WorkflowStep } from '../hooks/useEcosystemWorkflows';

interface PipelineMapPanelProps {
  lang: Language;
  workflowSteps: WorkflowStep[];
  activeStepIndex: number;
  setActiveStepIndex: (idx: number) => void;
  activeStep: WorkflowStep;
  simMetrics: any;
  activeScenario: string;
}

export const PipelineMapPanel: React.FC<PipelineMapPanelProps> = React.memo(({
  lang,
  workflowSteps,
  activeStepIndex,
  setActiveStepIndex,
  activeStep,
  simMetrics,
  activeScenario
}) => {
  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
      <h3 className="text-xs uppercase font-mono tracking-wider text-slate-500 border-b border-slate-900 pb-2 font-bold text-start">
        {t(lang, 'pipeline.mapTitle')}
      </h3>
      
      {/* Horizontal scroll steps train tracker */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 select-none scrollbar-thin">
        {workflowSteps.map((step, idx) => {
          const isActive = activeStepIndex === idx;
          const isCompleted = idx < activeStepIndex;
          return (
            <div key={step.id} className="flex items-center gap-1.5 shrink-0 last:pr-4">
              <button
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-lg border font-mono transition-all text-xs cursor-pointer flex flex-col justify-between h-[82px] w-[145px] text-start ${
                  isActive 
                    ? 'bg-cyan-950/30 border-cyan-400 text-cyan-300 shadow-lg ring-1 ring-cyan-500/20 font-bold' 
                    : isCompleted
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400 line-through decoration-slate-705'
                    : 'bg-[#0f1b29]/80 border-slate-800 text-slate-500 hover:text-slate-350 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center text-[9px] text-[#4d6682] uppercase w-full">
                  <span>{t(lang, 'pipeline.stage')} {idx + 1}</span>
                  {isCompleted && <FileCheck className="w-3 h-3 text-emerald-400 shrink-0" />}
                  {isActive && <Activity className="w-3 h-3 text-cyan-400 shrink-0 animate-pulse" />}
                </div>
                <p className="font-semibold text-[10px] truncate leading-tight mt-1 w-full">{step.title[lang]}</p>
                <p className="text-[9px] text-slate-500 font-mono mt-1 font-semibold truncate uppercase w-full">{step.actor[lang]}</p>
              </button>
              {idx < workflowSteps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0 lg:mx-0.5 rtl:rotate-180" />
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Stage Detail Monitor */}
      <div className="bg-[#0b1420] p-5 rounded-lg border border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-5 text-start">
        <div className="md:col-span-2 border-r border-slate-800/65 pr-5 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-5 flex flex-col gap-2 text-start">
          <span className="text-[10px] font-mono text-[#E0A96D] uppercase font-bold tracking-widest block text-start">
            {t(lang, 'pipeline.wavePrefix')}{activeStepIndex + 1}{t(lang, 'pipeline.waveSuffix')}
          </span>
          <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 text-start">
            <span className="p-1 px-1.5 bg-[#E0A96D]/15 rounded border border-[#E0A96D]/30 font-mono text-xs text-[#E0A96D] shrink-0">
              {activeStepIndex + 1}
            </span>
            {activeStep.title[lang]}
          </h4>
          <p className="text-xs text-slate-400 capitalize font-mono font-bold mt-1 text-start">
            {t(lang, 'pipeline.actorPrefix')}<span className="text-slate-200">{activeStep.actor[lang]}</span>
          </p>
          <p className="text-xs text-slate-350 leading-relaxed font-mono mt-2 pt-2 border-t border-slate-800/40 text-start">
            {activeStep.detail[lang]}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-3 text-xs text-start">
          <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold text-start">
            {t(lang, 'pipeline.simCounterTitle')}
          </span>
          <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 text-center">
              <span className="text-[9px] text-slate-500 block">
                {t(lang, 'pipeline.txLabel')}
              </span>
              <span className="text-xs font-bold text-slate-200 mt-1 block">
                {simMetrics.processedTransactions} {t(lang, 'pipeline.txProcessed')}
              </span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 text-center">
              <span className="text-[9px] text-slate-500 block">
                {t(lang, 'pipeline.anLabel')}
              </span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">
                {t(lang, 'pipeline.anMitigation')}
              </span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 text-center">
              <span className="text-[9px] text-slate-500 block">
                {t(lang, 'pipeline.revLabel')}
              </span>
              <span className="text-xs font-bold text-[#E0A96D] mt-1 block">{(simMetrics.totalDutyCalculated / 1000000).toFixed(0)}M IQD</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 text-center">
              <span className="text-[9px] text-slate-500 block">
                {t(lang, 'pipeline.latLabel')}
              </span>
              <span className="text-xs font-bold text-cyan-400 mt-1 block">
                {simMetrics.averageClearanceTime} {t(lang, 'pipeline.minLabel')}
              </span>
            </div>
          </div>
          <div className="bg-slate-900/90 p-2 rounded border border-slate-800 text-center font-mono text-[10px] text-slate-500 leading-normal">
            {t(lang, 'pipeline.currentScenario')} <span className="text-cyan-400 font-bold">{activeScenario.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

PipelineMapPanel.displayName = 'PipelineMapPanel';
