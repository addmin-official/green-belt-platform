import React, { useState } from 'react';
import { 
  ShieldCheck, Presentation, Sliders, CheckCircle, AlertTriangle, 
  Globe, Radio, Lock, Play, RefreshCw, LayoutGrid, Check, Info, BadgeAlert
} from 'lucide-react';
import { DemoModeController, DemoMode } from './DemoModeController';
import { PresentationScenarioRegistry, PresentationScenario } from './PresentationScenarioRegistry';
import { AcceptanceChecklistEngine, AcceptanceChecklistItem } from './AcceptanceChecklistEngine';
import { AcceptanceReadinessSummary } from './AcceptanceReadinessSummary';
import { PresentationNavigator } from './PresentationNavigator';
import { TypographyReadabilityAudit } from '../../design-system/typography/TypographyReadabilityAudit';


interface PresentationControlPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onScenarioChange?: (scenario: PresentationScenario) => void;
  onModeChange?: (mode: DemoMode) => void;
}

export const PresentationControlPanel: React.FC<PresentationControlPanelProps> = ({ 
  lang, 
  onScenarioChange, 
  onModeChange 
}) => {
  const [activeMode, setActiveMode] = useState<DemoMode>(DemoModeController.getActiveMode());
  const [activeScenario, setActiveScenario] = useState<PresentationScenario>(PresentationScenarioRegistry.getActiveScenario());
  const [checklist, setChecklist] = useState<AcceptanceChecklistItem[]>(AcceptanceChecklistEngine.getChecklist());
  const [readiness, setReadiness] = useState(AcceptanceReadinessSummary.getSummary());

  const getLabel = (en: string, ar: string, ku: string) => {
    const map = { en, ar, ku };
    return map[lang] || en;
  };

  const handleModeSelect = (mode: DemoMode) => {
    DemoModeController.setActiveMode(mode);
    setActiveMode(mode);
    if (onModeChange) onModeChange(mode);
    
    // Refresh checklists
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  const handleScenarioSelect = (scenario: PresentationScenario) => {
    PresentationScenarioRegistry.setActiveScenario(scenario.id);
    setActiveScenario(scenario);
    if (onScenarioChange) onScenarioChange(scenario);

    // Refresh checklists and state
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  const handleStepChange = (step: any, targetScenario: PresentationScenario) => {
    setActiveScenario(targetScenario);
    if (onScenarioChange) onScenarioChange(targetScenario);
    
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  const forceAuditReCheck = () => {
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  return (
    <div id="presentation-control-panel" className="bg-[#091122]/95 border border-[#E0A96D]/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-start">
      {/* Background soft glow */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header section with trilingual labels */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <Presentation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-sans tracking-wide flex items-center gap-2">
              <span>{getLabel('SUPREME DEMONSTRATION & CONTROL ENGINE', 'منصة قيادة وتدقيق العروض التفاعلية والاعتماد', 'سیستەمی فەرماندەیی نیشاندان و متمانەپێدان')}</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5 uppercase tracking-widest text-[#E0A96D]/80">
              {getLabel('Federal Iraq & KRG Joint Sovereign Verification • Phase 5.0', 'الاتحاد العراقي وإقليم كوردستان - التحقق المشترك • المرحلة 5.0', 'کایەی هاوبەشی فیدراڵی عێراق و هەرێمی کوردستان • قۆناغی ٥.٠')}
            </p>
          </div>
        </div>

        {/* Readiness Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {readiness.ready ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[11px] font-bold text-emerald-400 font-mono">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{getLabel('READY FOR ACQUISITION', 'جاهز للاعتماد النهائي', 'ئامادەیە بۆ وەرگرتنی کۆتایی')}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-[11px] font-bold text-rose-400 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{getLabel('BLOCKED BY ENFORCEMENT', 'مرفوض - قيد الموانع السيادية', 'ڕاگیراوە بەهۆی لادانەکان')}</span>
            </div>
          )}
          <button 
            onClick={forceAuditReCheck} 
            className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-slate-400 flex items-center gap-1 transition font-mono"
            title="Recheck and re-trigger programmatic audits"
          >
            <RefreshCw className="w-3 h-3" />
            <span>AUDIT</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Mode Selector & Active Scenario details */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. DEMO MODE CONTROLLER Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              {getLabel('1. Operational Mode Select', '1. تحديد وضع تشغيل المنصة', '١. مۆدی کارپێکردنی سیستەم')}
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
              {(['PRESENTATION_MODE', 'TRAINING_MODE', 'OPERATIONAL_MODE'] as DemoMode[]).map(mode => {
                const isActive = activeMode === mode;
                const modeLabel = {
                  PRESENTATION_MODE: getLabel('Presentation Mode', 'نمط العرض والتمثيل', 'مۆدی نیشاندان'),
                  TRAINING_MODE: getLabel('Training Mode', 'النمط التجريبي والتدريب', 'مۆدی ڕاهێنان'),
                  OPERATIONAL_MODE: getLabel('Operational Mode', 'وضع العمل الفعلي', 'مۆدی دەستبەکاربوون')
                }[mode];
                return (
                  <button
                    key={mode}
                    onClick={() => handleModeSelect(mode)}
                    className={`p-2 rounded text-[10px] font-mono font-bold transition duration-200 border ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/5' 
                        : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    {modeLabel}
                  </button>
                );
              })}
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900/60 text-[11px] leading-relaxed text-slate-400">
              <span className="text-[#E0A96D] font-bold font-mono text-[10px] uppercase block mb-1">
                {activeMode === 'PRESENTATION_MODE' ? '★ ' : activeMode === 'TRAINING_MODE' ? '⚜ ' : '🔒 '}
                {{
                  PRESENTATION_MODE: getLabel('PRESENTATION MODE', 'نمط العرض والتمثيل', 'مۆدی نیشاندان'),
                  TRAINING_MODE: getLabel('TRAINING MODE', 'النمط التجريبي والتدريب', 'مۆدی ڕاهێنان'),
                  OPERATIONAL_MODE: getLabel('OPERATIONAL MODE', 'وضع العمل الفعلي', 'مۆدی دەستبەکاربوون')
                }[activeMode]}
              </span>
              {DemoModeController.getModeDescription(activeMode)}
            </div>
          </div>

          {/* 2. DEMO SCENARIOS Selection list */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex justify-between">
              <span>{getLabel('2. Selected Demonstration Scenario', '2. اختيار سيناريو العرض التفاعلي', '٢. دیاریکردنی سیناریۆی نیشاندان')}</span>
              <span className="text-amber-400 font-bold">{PresentationScenarioRegistry.getScenarios().length} {getLabel('scenarios', 'سيناريوهات', 'سیناریۆ')}</span>
            </label>
            
            <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1 bg-slate-950/40 p-2 rounded-xl border border-slate-900 custom-scrollbar">
              {PresentationScenarioRegistry.getScenarios().map(sc => {
                const isSelected = activeScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioSelect(sc)}
                    className={`w-full text-start p-2 rounded-lg border text-xs transition flex items-center justify-between ${
                      isSelected 
                        ? 'bg-gradient-to-r from-slate-900 to-slate-950 text-white border-[#E0A96D]/70 pl-3 shadow-inner' 
                        : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-900/50 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`} />
                      <span className="font-medium truncate font-sans">{getLabel(sc.nameEn, sc.nameAr, sc.nameKu)}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Interactive Status Tracker & Readiness indicators */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Scenario Details Panel */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 relative">
              <span className="absolute top-2 right-3 text-[9px] font-mono bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800">
                ROLE: {activeScenario.targetRole}
              </span>
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {getLabel('Scenario Objective:', 'الهدف التشغيلي للسيناريو:', 'ئامانجی سیناریۆی کارکردن:')} 
                  <span className="text-[#E0A96D] ml-1.5">{getLabel(activeScenario.nameEn, activeScenario.nameAr, activeScenario.nameKu)}</span>
                </span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-2 pl-5 border-l-2 border-amber-500/40">
                {getLabel(activeScenario.descriptionEn, activeScenario.descriptionAr, activeScenario.descriptionKu)}
              </p>
            </div>

            {/* 3. READY/BLOCKED CHECKLIST TRACKING */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex justify-between">
                <span>{getLabel('3. Readiness Acceptance Checklist', '3. قائمة التحقق للاعتماد الفيدرالي', '٣. مەرجەکانی متمانەپێدانی فیدراڵی')}</span>
                <span className="text-emerald-400 font-bold">
                  {checklist.filter(c => c.passed).length}/{checklist.length} {getLabel('Passed', 'مكتمل بنجاح', 'پەسەندکراو')}
                </span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {checklist.map(item => (
                  <div 
                    key={item.id} 
                    className="p-2 rounded bg-slate-950/90 border border-slate-900 flex items-start gap-2 text-[10px]"
                  >
                    {item.passed ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <BadgeAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-300 truncate">
                        {getLabel(item.titleEn, item.titleAr, item.titleKu)}
                      </div>
                      <div className="text-[9px] text-slate-500 truncate">{item.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warnings or Critical Alerts Panel if any */}
          {(!readiness.ready && readiness.criticalIssues.length > 0) ? (
            <div className="bg-rose-950/20 border border-rose-900/50 p-2.5 rounded-lg flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="text-[10px] text-rose-400 font-mono">
                <span className="font-bold block text-xs uppercase mb-0.5">{getLabel('Sovereignty Blockers Detected', 'تم رصد إنذارات سيادية ممانعة', 'هۆشداری تێپەڕاندنی دەسەڵات دۆزرایەوە')}</span>
                {readiness.criticalIssues[0]}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2.5 rounded-lg flex items-start gap-2.5 text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-xs uppercase mb-0.5">{getLabel('SOVEREIGNTY INTEGRITY ASSURED', 'ضمان تكامل السيادة التامة', 'پاراستنی تەواوی سەروەریی نیشتمان')}</span>
                {getLabel(
                  'No leaks detected. Direct database queries across Kurdistan Region and Baghdad remain 100% blocked programs.',
                  'لا توجد عمليات تسريب للبيانات. يمنع الاستعلام المباشر لقواعد البيانات والأنظمة السياسية منعاً مبرمجاً مطلقاً.',
                  'هیچ دزەکردنێکی زانیاری نییە. سیستەمی کۆنترۆڵکردن بە تەواوی سەربەخۆیە بە شێوازی فەرمی پڕۆگرامسازی.'
                )}
              </div>
            </div>
          )}

          {/* COMPACT TYPOGRAPHY READABILITY STATUS */}
          {(() => {
            const auditResult = TypographyReadabilityAudit.runAudit();
            const exceptions = auditResult.components.filter(c => c.status === 'EXCEPTION');
            return (
              <div className="bg-slate-950/75 p-4 rounded-xl border border-slate-800 mt-2 flex flex-col gap-3 text-start">
                <div className="flex items-start gap-2.5">
                  <Globe className="w-4.5 h-4.5 text-[#E0A96D] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-200 text-sm block font-sans">
                      {getLabel('TRILINGUAL READABILITY OVERHAUL (PHASE 5.2C)', 'مؤشر سلامة الخطوط واللغات المعتمدة', 'ڕاپۆرتی خوێندنەوەی زمانەکان (قۆناغی ٥.٢س)')}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                      {getLabel(
                        'Direct component sweeps applied on 25 critical UI files. Forced CSS override engine blocks non-compliant glyph rendering.',
                        'تم تدقيق ٢٥ ملف واجهة مستخدم وتطبيق مصفوفة تجاوز الأنماط لمنع الخطوط الشاذة أو تقطيع الحروف العربية.',
                        'پشکنینی ٢٥ ڕووکاری جیاواز ئەنجامدراوە بۆ جێگیرکردنی قەبارە و جۆری پیتە کوردی و عەرەبییەکان.'
                      )}
                    </p>
                  </div>
                </div>

                {/* Audit Checklist & Violation Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{getLabel('Files Audited', 'الملفات المدققة', 'سەرجەم فایلەکان')}</span>
                    <span className="text-sm font-bold text-slate-200 font-mono block">
                      {auditResult.components.length} {getLabel('Components', 'ملف برمجياً', 'مۆدیول')}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{getLabel('RTL Tiny Text', 'خطوط اللغات الشاذة', 'قەبارەی تێکست')}</span>
                    <span className={auditResult.tinyTextViolations > 0 ? "text-sm font-bold text-rose-400 font-mono block" : "text-sm font-bold text-emerald-400 font-mono block"}>
                      {auditResult.tinyTextViolations} {getLabel('Violations', 'ملاحظات', 'جیاوازی')}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{getLabel('RTL Mono Font', 'الخط أحادي المسافة', 'فۆنتی مۆنۆ')}</span>
                    <span className={auditResult.monoFontViolations > 0 ? "text-sm font-bold text-rose-400 font-mono block" : "text-sm font-bold text-emerald-400 font-mono block"}>
                      {auditResult.monoFontViolations} {getLabel('Violations', 'ملاحظات', 'جیاوازی')}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{getLabel('RTL Tracking', 'مساحات الحروف والتتبع', 'بۆشایی نێوان پیت')}</span>
                    <span className={auditResult.trackingViolations > 0 ? "text-sm font-bold text-rose-400 font-mono block" : "text-sm font-bold text-emerald-400 font-mono block"}>
                      {auditResult.trackingViolations} {getLabel('Violations', 'ملاحظات', 'جیاوازی')}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{getLabel('RTL Clipping Risks', 'مخاطر حجب النصوص', 'مەترسی بڕین')}</span>
                    <span className={auditResult.tableTextClippingRiskViolations > 0 ? "text-sm font-bold text-rose-400 font-mono block" : "text-sm font-bold text-emerald-400 font-mono block"}>
                      {auditResult.tableTextClippingRiskViolations} {getLabel('Risks', 'مخاطر محتملة', 'مەترسی')}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{getLabel('Compliance', 'الامتثال للمواصفات', 'یاسایی بوون')}</span>
                    <span className="text-sm font-bold text-[#E0A96D] font-mono block">
                      {auditResult.overallScore}% {getLabel('PASS', 'مطابق للمعيار', 'سەرکەوتوو')}
                    </span>
                  </div>
                </div>

                {/* Remaining Exceptions */}
                {exceptions.length > 0 && (
                  <div className="border-t border-slate-800/80 pt-2 mt-1">
                    <span className="text-[9.5px] uppercase font-mono text-[#E0A96D] block mb-1">
                      {getLabel('Remaining Justified Exceptions:', 'الاستثناءات التقنية المبررة المتبقية:', 'ڕێپێدانە تەکنیکییە بێ زیانەکان:')}
                    </span>
                    {exceptions.map((exc, index) => (
                      <div key={index} className="text-[11px] text-slate-400 leading-relaxed font-sans bg-slate-900/40 p-2 rounded border border-slate-800/40">
                        <strong className="text-slate-300">{exc.name} ({exc.path}):</strong> {exc.exceptionReason}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* 4. PRESENTATION NAVIGATOR */}
      <PresentationNavigator lang={lang} onStepChange={handleStepChange} />
    </div>
  );
};
