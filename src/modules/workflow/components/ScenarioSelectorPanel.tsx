import React from 'react';
import { Ship, Truck, Plane } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/workflowTranslations';

interface ScenarioSelectorPanelProps {
  lang: Language;
  activeScenario: 'general-trade' | 'krg-trade' | 'air-cargo';
  setActiveScenario: (scenario: 'general-trade' | 'krg-trade' | 'air-cargo') => void;
  setSimMetrics: React.Dispatch<React.SetStateAction<any>>;
}

export const ScenarioSelectorPanel: React.FC<ScenarioSelectorPanelProps> = React.memo(({
  lang,
  activeScenario,
  setActiveScenario,
  setSimMetrics
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
      {/* Scenario 1: Gulf-Basra */}
      <button
        onClick={() => {
          setActiveScenario('general-trade');
          setSimMetrics((prev: any) => ({ ...prev, averageClearanceTime: 14.1 }));
        }}
        className={`p-4 rounded-xl border text-start transition-all flex items-start gap-3.5 h-[115px] cursor-pointer ${
          activeScenario === 'general-trade'
            ? 'bg-[#1a2c42]/30 border-[#E0A96D] shadow-md ring-1 ring-[#E0A96D]/15'
            : 'bg-slate-950/80 border-[#1a2c42] hover:border-slate-700'
        }`}
      >
        <span className="p-2 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
          <Ship className={`w-5 h-5 ${activeScenario === 'general-trade' ? 'text-[#E0A96D]' : 'text-slate-500'}`} />
        </span>
        <div>
          <h3 className="font-semibold text-slate-100 text-xs">
            {t(lang, 'scenarios.gulfTitle')}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1 leading-normal">
            {t(lang, 'scenarios.gulfDesc')}
          </p>
        </div>
      </button>

      {/* Scenario 2: KRG */}
      <button
        onClick={() => {
          setActiveScenario('krg-trade');
          setSimMetrics((prev: any) => ({ ...prev, averageClearanceTime: 12.8 }));
        }}
        className={`p-4 rounded-xl border text-start transition-all flex items-start gap-3.5 h-[115px] cursor-pointer ${
          activeScenario === 'krg-trade'
            ? 'bg-[#1a2c42]/30 border-[#E0A96D] shadow-md ring-1 ring-[#E0A96D]/15'
            : 'bg-slate-950/80 border-[#1a2c42] hover:border-slate-700'
        }`}
      >
        <span className="p-2 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
          <Truck className={`w-5 h-5 ${activeScenario === 'krg-trade' ? 'text-[#E0A96D]' : 'text-slate-500'}`} />
        </span>
        <div>
          <h3 className="font-semibold text-slate-100 text-xs">
            {t(lang, 'scenarios.krgTitle')}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1 leading-normal">
            {t(lang, 'scenarios.krgDesc')}
          </p>
        </div>
      </button>

      {/* Scenario 3: Air Cargo */}
      <button
        onClick={() => {
          setActiveScenario('air-cargo');
          setSimMetrics((prev: any) => ({ ...prev, averageClearanceTime: 8.4 }));
        }}
        className={`p-4 rounded-xl border text-start transition-all flex items-start gap-3.5 h-[115px] cursor-pointer ${
          activeScenario === 'air-cargo'
            ? 'bg-[#1a2c42]/30 border-[#E0A96D] shadow-md ring-1 ring-[#E0A96D]/15'
            : 'bg-slate-950/80 border-[#1a2c42] hover:border-slate-700'
        }`}
      >
        <span className="p-2 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
          <Plane className={`w-5 h-5 ${activeScenario === 'air-cargo' ? 'text-[#E0A96D]' : 'text-slate-500'}`} />
        </span>
        <div>
          <h3 className="font-semibold text-slate-100 text-xs">
            {t(lang, 'scenarios.airTitle')}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1 leading-normal">
            {t(lang, 'scenarios.airDesc')}
          </p>
        </div>
      </button>
    </div>
  );
});

ScenarioSelectorPanel.displayName = 'ScenarioSelectorPanel';
