import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Play, CheckCircle2, AlertTriangle, 
  BookOpen, HelpCircle, UserCheck, Shield, Bookmark, ListCollapse
} from 'lucide-react';
import { StakeholderPresentationFlow, PresentationFlowStep } from './StakeholderPresentationFlow';
import { PresentationScenarioRegistry, PresentationScenario } from './PresentationScenarioRegistry';
import { PresentationNarrativeRegistry } from './PresentationNarrativeRegistry';
import { AcceptanceChecklistEngine } from './AcceptanceChecklistEngine';
import { ExecutiveDemoScript, DemoScriptSection } from './ExecutiveDemoScript';
import { ReadinessBadge } from './ReadinessBadge';

interface PresentationNavigatorProps {
  lang: 'en' | 'ar' | 'ku';
  onStepChange?: (step: PresentationFlowStep, scenario: PresentationScenario) => void;
}

export const PresentationNavigator: React.FC<PresentationNavigatorProps> = ({ 
  lang,
  onStepChange 
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(StakeholderPresentationFlow.getActiveIndex());
  const [showFullNarrative, setShowFullNarrative] = useState(true);
  const [activeStakeholderRole, setActiveStakeholderRole] = useState<'FEDERAL_STAKEHOLDERS' | 'KRG_STAKEHOLDERS' | 'JOINT_COMMITTEE' | 'TECHNICAL_COMMITTEE'>('JOINT_COMMITTEE');

  const steps = StakeholderPresentationFlow.getSteps();
  const currentStep = steps[activeStepIndex];

  // Map step to a corresponding scenario id for narratives
  const getScenarioIdForStep = (stepId: string): string => {
    switch (stepId) {
      case 'platform_mission':
        return 'joint_view';
      case 'fed_krg_separation':
        return 'federal_view';
      case 'border_operations':
        return 'border_flow';
      case 'customs_flow':
        return 'customs_flow';
      case 'revenue_isolation':
        return 'revenue_isolation';
      case 'trade_visibility':
        return 'federal_view';
      case 'anti_corruption':
        return 'anti_corruption';
      case 'executive_dashboards':
        return 'krg_view';
      case 'multilingual_runtime':
        return 'lang_switching';
      case 'acceptance_checklist':
        return 'joint_view';
      default:
        return 'joint_view';
    }
  };

  const currentScenarioId = getScenarioIdForStep(currentStep.id);
  const scenario = PresentationScenarioRegistry.getScenarios().find(s => s.id === currentScenarioId) || PresentationScenarioRegistry.getScenarios()[2];
  const narrative = PresentationNarrativeRegistry.getLocalizedNarrative(currentScenarioId, lang);
  const checklist = AcceptanceChecklistEngine.getChecklist();
  
  // Find associated checklist item for acceptance checking
  const getChecklistItem = () => {
    switch (currentStep.id) {
      case 'fed_krg_separation':
        return checklist.find(c => c.id === 'fed_krg_separation');
      case 'revenue_isolation':
        return checklist.find(c => c.id === 'no_raw_revenue_leakage');
      case 'border_operations':
        return checklist.find(c => c.id === 'border_operations_visible');
      case 'customs_flow':
        return checklist.find(c => c.id === 'customs_core_visible');
      case 'trade_visibility':
        return checklist.find(c => c.id === 'trade_core_visible');
      case 'anti_corruption':
        return checklist.find(c => c.id === 'transparency_core_visible');
      case 'multilingual_runtime':
        return checklist.find(c => c.id === 'language_switcher_working');
      default:
        return checklist.find(c => c.id === 'isolation_audit_passed');
    }
  };

  const associatedCheckItem = getChecklistItem();
  const scriptSection = ExecutiveDemoScript.getScriptByStakeholder(activeStakeholderRole);

  const getLabel = (en: string, ar: string, ku: string) => {
    const map = { en, ar, ku };
    return map[lang] || en;
  };

  const handleStepJump = (index: number) => {
    StakeholderPresentationFlow.setActiveIndex(index);
    setActiveStepIndex(index);
    
    // Set scenario globally too
    const step = steps[index];
    const targetScenarioId = getScenarioIdForStep(step.id);
    PresentationScenarioRegistry.setActiveScenario(targetScenarioId);

    if (onStepChange) {
      const activeScenario = PresentationScenarioRegistry.getActiveScenario();
      onStepChange(step, activeScenario);
    }
  };

  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      handleStepJump(activeStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      handleStepJump(activeStepIndex - 1);
    }
  };

  return (
    <div id="presentation-navigator" className="border-t border-slate-800/80 pt-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-[#E0A96D]" />
          <span>{getLabel('Sovereign Presentation Navigator', 'مرشد العرض والاعتماد السيادي المباشر', 'ڕێبەرنامەی فەرمی نیشاندانی سەروەری')}</span>
        </h4>
        <div className="flex gap-1">
          {steps.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => handleStepJump(idx)}
              className={`w-3.5 h-3.5 rounded-full text-[8px] font-bold font-mono transition flex items-center justify-center border ${
                idx === activeStepIndex 
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold scale-110 shadow' 
                  : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300'
              }`}
              title={getLabel(st.titleEn, st.titleAr, st.titleKu)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Step details & talking points */}
        <div className="lg:col-span-8 bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between border-b border-slate-900 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-100 mt-1.5 font-sans">
                  {getLabel(currentStep.titleEn, currentStep.titleAr, currentStep.titleKu)}
                </h3>
                <span className="block w-fit text-left mt-2 mr-auto text-[9px] font-mono font-bold bg-[#E0A96D]/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20" dir="ltr">
                  STEP {activeStepIndex + 1} OF {steps.length} • {currentStep.keyName.toUpperCase()}
                </span>
              </div>
              <div className="text-right flex flex-col items-end gap-1 shrink-0 ml-3">
                <span className="text-[9px] text-slate-500 font-mono">ACCEPTANCE VERIFIED</span>
                {associatedCheckItem ? (
                  <ReadinessBadge 
                    state={associatedCheckItem.passed ? 'READY' : 'BLOCKED'} 
                    lang={lang} 
                  />
                ) : (
                  <ReadinessBadge state="READY" lang={lang} />
                )}
              </div>
            </div>

            {/* Scenario explanation */}
            <p className="text-[11px] text-slate-400 leading-relaxed italic mb-4 bg-slate-900/40 p-2.5 rounded border border-slate-900/50">
              {narrative.shortExplanation}
            </p>

            {/* Talking Points */}
            <div className="space-y-2 mt-2">
              <h5 className="text-[10.5px] font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>{getLabel('Demonstrated Talking Points:', 'نقاط استعراض اللجنة العليا:', 'خاڵەکانی گفتوگۆ بۆ نیشاندان:')}</span>
              </h5>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] pl-1 font-sans text-slate-300">
                {narrative.talkingPoints.map((point, pIdx) => (
                  <li key={pIdx} className="bg-slate-900/60 p-2 rounded-lg border border-slate-900 hover:border-slate-800 transition flex items-start gap-1.5">
                    <span className="text-amber-400 font-mono mt-0.5">•</span>
                    <span className="leading-relaxed text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Risk & Security Boundaries disclaimer */}
            <div className="bg-amber-950/20 border border-amber-900/30 p-3 rounded-lg flex items-start gap-2 mt-4">
              <Shield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-[10px] text-slate-300 leading-relaxed font-sans">
                <span className="font-bold text-amber-400 block uppercase font-mono tracking-wide text-[9px]">Sovereignty Safeguard Boundary</span>
                {narrative.riskNote}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-900">
            <button
              onClick={handlePrev}
              disabled={activeStepIndex === 0}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 text-slate-300 border border-slate-800/80 rounded-lg text-xs font-mono flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{getLabel('PREVIOUS', 'السابق', 'پێشوو')}</span>
            </button>

            <span className="text-[10px] font-mono text-slate-500 font-medium tracking-wide">
              {associatedCheckItem ? associatedCheckItem.notes : 'Passes programmatic data isolation rules.'}
            </span>

            <button
              onClick={handleNext}
              disabled={activeStepIndex === steps.length - 1}
              className="px-3 py-1.5 bg-[#E0A96D]/15 hover:bg-[#E0A96D]/25 disabled:opacity-30 disabled:hover:bg-transparent text-[#E0A96D] border border-[#E0A96D]/30 rounded-lg text-xs font-mono flex items-center gap-1.5 transition"
            >
              <span>{getLabel('NEXT', 'التالي', 'دواتر')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stakeholder Speaking Script cards */}
        <div className="lg:col-span-4 bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-900 pb-2 mb-3">
              <label className="text-[10px] font-mono font-bold text-[#E0A96D] uppercase tracking-widest block flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>{getLabel('Executive Briefing Roles', 'الملخص التنفيذي للأدوار القيادية', 'کاراکتەرەکانی سەرۆکایەتی')}</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                {(['FEDERAL_STAKEHOLDERS', 'KRG_STAKEHOLDERS', 'JOINT_COMMITTEE', 'TECHNICAL_COMMITTEE'] as const).map(role => {
                  const isSelected = activeStakeholderRole === role;
                  const label = {
                    FEDERAL_STAKEHOLDERS: 'Iraq Cabinet',
                    KRG_STAKEHOLDERS: 'KRG Prime',
                    JOINT_COMMITTEE: 'Joint Committee',
                    TECHNICAL_COMMITTEE: 'Tech Committee'
                  }[role];
                  return (
                    <button
                      key={role}
                      onClick={() => setActiveStakeholderRole(role)}
                      className={`py-1 px-2 rounded text-[9px] font-mono font-bold border transition text-center truncate ${
                        isSelected 
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/40' 
                          : 'bg-transparent text-slate-500 border-transparent hover:text-slate-400 hover:bg-slate-900/60'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected stakeholder script details */}
            <div className="space-y-3 font-mono text-[10px]">
              <span className="text-[#E0A96D] font-bold block border-b border-slate-900/80 pb-1 text-[9.5px]">
                {getLabel(scriptSection.titleEn, scriptSection.titleAr, scriptSection.titleKu)}
              </span>
              <div className="text-[9.5px] text-slate-400 leading-normal mb-2 border-l border-emerald-500/40 pl-2">
                <span className="font-bold text-slate-200 block text-[8px] uppercase tracking-wider mb-0.5">Briefing Goal</span>
                {getLabel(scriptSection.briefingGoalEn, scriptSection.briefingGoalAr, scriptSection.briefingGoalKu)}
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-slate-200 block text-[8px] uppercase tracking-wider">Stakeholder Scripts</span>
                {(lang === 'en' ? scriptSection.talkingPointsEn : lang === 'ar' ? scriptSection.talkingPointsAr : scriptSection.talkingPointsKu).map((tp, tpIdx) => (
                  <div key={tpIdx} className="bg-slate-900/40 p-1.5 rounded border border-slate-900 text-[9px] text-slate-300 font-sans leading-relaxed">
                    {tp}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Indicators footer for selection */}
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900/80 mt-4 text-[9px] font-mono text-slate-400">
            <span className="font-bold text-teal-400 block mb-1 uppercase tracking-wide text-[8px]">Session Metrics</span>
            {(lang === 'en' ? scriptSection.keyIndicatorsEn : lang === 'ar' ? scriptSection.keyIndicatorsAr : scriptSection.keyIndicatorsKu).map((ki, kiIdx) => (
              <div key={kiIdx} className="flex justify-between items-center border-b border-slate-900/50 py-0.5 last:border-b-0 text-slate-300">
                <span className="text-slate-400">{ki.split(':')[0]}</span>
                <span className="font-bold text-emerald-400">{ki.split(':')[1] || ' OK'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
