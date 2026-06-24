import React, { useState } from 'react';
import { 
  Network, Calendar, BookOpen, Headset, ShieldAlert, 
  Database, LineChart, FileWarning, CheckCircle, AlertTriangle, 
  HelpCircle, UserCheck, ShieldCheck, RefreshCw, Printer, Check
} from 'lucide-react';
import { PilotSiteRegistry, PilotSite } from './PilotSiteRegistry';
import { PilotReadinessChecklist, ChecklistItem } from './PilotReadinessChecklist';
import { PilotOperationsPlan, PilotOperationPhase } from './PilotOperationsPlan';
import { PilotTrainingPlan, TrainingCohort } from './PilotTrainingPlan';
import { PilotSupportModel, SupportTier } from './PilotSupportModel';
import { PilotSecurityPlan, SecurityPolicy } from './PilotSecurityPlan';
import { PilotDataGovernancePlan, DataGovernanceRule } from './PilotDataGovernancePlan';
import { PilotSuccessMetrics, SuccessMetric } from './PilotSuccessMetrics';
import { PilotRiskRegister, PilotRisk } from './PilotRiskRegister';

interface PilotDeploymentPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const PilotDeploymentPanel: React.FC<PilotDeploymentPanelProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'sites' | 'ops' | 'readiness' | 'training' | 'support' | 'security' | 'governance' | 'metrics' | 'risks'>('sites');
  
  // Simulated interactive states
  const [checklistStates, setChecklistStates] = useState<Record<string, 'READY' | 'PENDING' | 'WARN'>>({
    federal_hsm_key_sync: 'READY',
    krg_data_containment: 'READY',
    offline_terminal_fallback: 'READY',
    trilingual_dictionary_match: 'READY',
    append_only_audit_chain: 'READY'
  });

  const [activeSite, setActiveSite] = useState<string>('safra_federal_gate');
  const [actionSimulated, setActionSimulated] = useState<string | null>(null);

  // Data fetching
  const sites = PilotSiteRegistry.getSites();
  const checklistItems = PilotReadinessChecklist.getItems();
  const phases = PilotOperationsPlan.getPhases();
  const cohorts = PilotTrainingPlan.getCohorts();
  const supportTiers = PilotSupportModel.getTiers();
  const securityPolicies = PilotSecurityPlan.getPolicies();
  const governanceRules = PilotDataGovernancePlan.getRules();
  const metrics = PilotSuccessMetrics.getMetrics();
  const risks = PilotRiskRegister.getRisks();

  const getLabel = (en: string, ar: string, ku: string) => {
    const map = { en, ar, ku };
    return map[lang] || en;
  };

  const toggleChecklist = (id: string) => {
    setChecklistStates(prev => {
      const current = prev[id];
      const next: 'READY' | 'PENDING' | 'WARN' = current === 'READY' ? 'PENDING' : current === 'PENDING' ? 'WARN' : 'READY';
      return { ...prev, [id]: next };
    });
  };

  const handleRunDiagnostics = (siteId: string) => {
    setActionSimulated(siteId);
    setTimeout(() => {
      setActionSimulated(null);
      alert(getLabel(
        "Diagnostics completed successfully! Sovereign isolation parameters are perfectly compliant. Cryptographic hash registers signed and verified.",
        "اكتمل الفحص الفني الذاتي للمنفذ بنظام السيادة والخصوصية! جميع قنوات الاتصال مؤمنة وتوقيعات الهاش مطابقة.",
        "پشکنینی دەروازەکە بە سەرکەوتوویی جێبەجێ کرا! هەموو هێڵەکان پارێزراون و مۆری ئەلیکترۆنی فەرمی پشتڕاست کرایەوە."
      ));
    }, 1200);
  };

  return (
    <div id="pilot-deployment-panel" className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 mt-6 shadow-2xl overflow-hidden">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#E0A96D] bg-[#E0A96D]/10 px-2 py-0.5 rounded border border-amber-500/20">
              {getLabel('Pilot Deployment', 'التنفيذ الميداني التجريبي', 'پلانی تاقیکاری دەروازەکان')}
            </span>
            <span className="text-[9px] uppercase font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              PHASE 5.2 OPERATIONAL
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-1 font-sans">
            {getLabel('90-Day Pilot Operations Command', 'غرفة قيادة ومتابعة المشروع التجريبي (٩٠ يوماً)', 'بەڕێوەبەرایەتی گشتی پلانی ٩٠ ڕۆژەی ئەزموونی')}
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {getLabel(
              'Interactive coordination matrix mapping setup, training cohorts, security isolation guidelines, and success metrics.',
              'لوحة الإشراف المتكاملة لربط المنافذ والتأهيل وحفظ خصوصية داتا الإقليم ومعايير نجاح المشروع.',
              'داشبۆردی سەرەتایی بۆ بەدواداچوونی ڕاهێنان، پاراستنی داتا و عزلکردنی ناوەکان لە دەروازەکاندا.'
            )}
          </p>
        </div>

        {/* State Indicators */}
        <div className="flex items-center gap-2">
          <button 
            disabled={!!actionSimulated}
            onClick={() => handleRunDiagnostics('all')}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-700/60 font-mono text-[10.5px] font-bold flex items-center gap-1.5 transition disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${actionSimulated ? 'animate-spin text-amber-400' : 'text-slate-400'}`} />
            <span>
              {actionSimulated 
                ? getLabel('RUNNING DIACS...', 'جاري الفحص الميداني...', 'پشکنین دەکات...') 
                : getLabel('RUN DIAGNOSTICS', 'تشغيل فحص المنافذ', 'پشکنینی گشتی دەروازە')}
            </span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-1 border-b border-slate-900 pb-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
        {[
          { id: 'sites', label: getLabel('Pilot Sites', 'منافذ المشروع', 'دەروازەکانی ئەزموونی'), icon: Network },
          { id: 'ops', label: getLabel('Operations Timeline', 'خطة الـ ٩٠ يوماً', 'پلانی جێبەجێکردن'), icon: Calendar },
          { id: 'readiness', label: getLabel('Readiness Matrix', 'علامات الجاهزية', 'ئامادەیی ئەمنی'), icon: CheckCircle },
          { id: 'training', label: getLabel('Onboarding Cohorts', 'فئات المتدربين', 'ڕانی فەرمانبەران'), icon: BookOpen },
          { id: 'support', label: getLabel('Support Model', 'آلية الدعم والمتابعة', 'پشتیوانی کار'), icon: Headset },
          { id: 'security', label: getLabel('Security Plan', 'بروتوكولات الأمان', 'پاراستنی گومرگی'), icon: ShieldCheck },
          { id: 'governance', label: getLabel('Data Governance', 'حوكمة البيانات السيادية', 'بەڕێوەبردن'), icon: Database },
          { id: 'metrics', label: getLabel('Success Metrics', 'معايير تقييم الأثر', 'کوالێتی سەرکەوتن'), icon: LineChart },
          { id: 'risks', label: getLabel('Risk Register', 'سجل المخاطر وتجنبها', 'مەترسییەکان'), icon: ShieldAlert }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium font-mono whitespace-nowrap transition ${
                isActive 
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Body Content */}
      <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-900/80 min-h-[300px] flex flex-col justify-between">
        
        {/* TAB 1: PILOT SITES */}
        {activeTab === 'sites' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase flex items-center gap-1.5">
              <Network className="w-4 h-4 text-[#E0A96D]" />
              <span>{getLabel('Federal & Regional Active Gate Setup Sites', 'محيط ومنافذ التشغيل الفعلي المعتمدة بالمشروع', 'دەروازە فەرمییەکانی پلانی تاقیکاری')}</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {sites.map(site => {
                const isSelected = activeSite === site.id;
                return (
                  <div 
                    key={site.id} 
                    onClick={() => setActiveSite(site.id)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-slate-900 border-[#E0A96D]/50 shadow-lg' 
                        : 'bg-slate-950/80 border-slate-900 hover:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-slate-900/80 mb-2.5">
                        <span className="font-bold text-[12px] text-slate-100">
                          {getLabel(site.nameEn, site.nameAr, site.nameKu)}
                        </span>
                        <span className="text-[7.5px] font-mono bg-emerald-500/15 text-emerald-400 px-1.5 rounded uppercase border border-emerald-500/20 shrink-0">
                          {site.status}
                        </span>
                      </div>
                      
                      <div className="text-[10px] space-y-1.5 text-slate-300">
                        <div>
                          <span className="text-slate-500 font-mono block text-[8px] uppercase">{getLabel('Location', 'الموقع الجغرافي', 'شوێنی جوگرافی')}</span>
                          <span className="font-sans font-medium">{getLabel(site.locationEn, site.locationAr, site.locationKu)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono block text-[8px] uppercase">{getLabel('Gate Classification', 'تصنيف المنفذ', 'پێگەی دەروازە')}</span>
                          <span className="font-sans font-medium text-[#E0A96D]">{getLabel(site.typeEn, site.typeAr, site.typeKu)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-mono block text-[8px] uppercase">{getLabel('Scope Objective', 'الهدف التشغيلي', 'ئامانجی گشتی')}</span>
                          <p className="font-sans text-slate-400 mt-0.5 leading-normal">{getLabel(site.descriptionEn, site.descriptionAr, site.descriptionKu)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-900/40">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRunDiagnostics(site.id);
                        }}
                        className="w-full py-1 text-[9.5px] font-mono font-bold bg-amber-500/10 hover:bg-amber-500/20 text-[#E0A96D] rounded border border-amber-500/20 transition"
                      >
                        {getLabel('RUN CHECKPOINT DIAGNS', 'فحص شبكة ومعايير السيادة للمنفذ', 'پلانی پشکنینی پڕۆسێس')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: OPS TIMELINE */}
        {activeTab === 'ops' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-400" />
              <span>{getLabel('Comprehensive 90-Day Step-by-Step Roadmap', 'الخطة الزمنية التفصيلية لتشغيل ونضوج المشروع التجريبي', 'خشتەی پڕۆژەی ئەزموونی گشتی ٩٠ ڕۆژە')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {phases.map(phase => (
                <div key={phase.id} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-900 hover:border-slate-800 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 border-b border-slate-900 pb-2 mb-2.5">
                      <span className="font-bold text-[11px] text-[#E0A96D]">
                        {getLabel(phase.nameEn, phase.nameAr, phase.nameKu)}
                      </span>
                    </div>
                    <span className="text-[9px] uppercase font-mono bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded border border-teal-500/20 block w-fit mb-3">
                      {getLabel(phase.timelineEn, phase.timelineAr, phase.timelineKu)}
                    </span>
                    
                    <ul className="space-y-2 text-[10px] pl-1 text-slate-300 leading-normal font-sans">
                      {phase.objectivesEn.map((goal, gIdx) => (
                        <li key={gIdx} className="flex gap-1.5 items-start">
                          <span className="text-[#E0A96D] font-mono">•</span>
                          <span>{getLabel(phase.objectivesEn[gIdx], phase.objectivesAr[gIdx], phase.objectivesKu[gIdx])}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: READINESS MATRIX */}
        {activeTab === 'readiness' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{getLabel('Constitutional Security & Isolation Verification Matrix', 'مصفوفة مطابقة والتصديق الفني لمعايير الخصوصية والسيادة', 'سەلماندنی مەرجە ئەمنییەکانی داتا')}</span>
            </h3>
            
            <p className="text-[10.5px] text-slate-400 mb-2 italic">
              {getLabel(
                "Verify critical system readiness parameters below. Toggle states to audit compliance levels manually:",
                "قم بمطابقة وفحص معايير تشغيل الحدود والتحكيم المشترك. انقر لتعديل مستويات النزاهة:",
                "هاوتاکردنی مەرجە گشتییەکانی سیستەم بۆ پۆلێنکردنی دڵنیایی کارەکە:"
              )}
            </p>

            <div className="space-y-2.5">
              {checklistItems.map(item => {
                const curState = checklistStates[item.id] || 'READY';
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`p-3.5 rounded-lg border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      curState === 'READY' 
                        ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/30' 
                        : curState === 'WARN' 
                          ? 'bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/30'
                          : 'bg-slate-950/80 hover:bg-slate-900 border-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        curState === 'READY' 
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' 
                          : curState === 'WARN' 
                            ? 'bg-rose-500/20 border-rose-400 text-rose-400'
                            : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}>
                        {curState === 'READY' && <Check className="w-3.5 h-3.5 font-bold" />}
                        {curState === 'WARN' && <span className="font-bold text-[10px] font-mono">!</span>}
                        {curState === 'PENDING' && <span className="font-bold text-[10px] font-mono">?</span>}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[11px] text-slate-100">
                            {getLabel(item.titleEn, item.titleAr, item.titleKu)}
                          </span>
                          <span className="text-[7.5px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.2 rounded uppercase">
                            {getLabel(item.categoryEn, item.categoryAr, item.categoryKu)}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                          {getLabel(item.taskEn, item.taskAr, item.taskKu)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {curState === 'READY' ? (
                        <span className="text-[8.5px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/35 px-2 py-0.5 rounded">
                          {getLabel('VERIFIED COMPLIANT', 'مطابق ومعتمد', 'پەسەندکراو')}
                        </span>
                      ) : curState === 'WARN' ? (
                        <span className="text-[8.5px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/35 px-2 py-0.5 rounded">
                          {getLabel('SECURITY ALERT', 'تحذير تشغيلي', 'هۆشداری ئەمنی')}
                        </span>
                      ) : (
                        <span className="text-[8.5px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/35 px-2 py-0.5 rounded">
                          {getLabel('PENDING VALIDATION', 'قيد الفحص والمطابقة', 'چاوەڕوانی پشتڕاستکردن')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: TRAINING COHORTS */}
        {activeTab === 'training' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>{getLabel('Unified Curriculum & Officer Onboarding Programs', 'برامج التدريب الفنية والتأهيل لكوادر الحدود والرقابة', 'پڕۆگرامی مەشق و ڕاهێنانی فەرمانبەران')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cohorts.map(cohort => (
                <div key={cohort.id} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-slate-900 pb-2 mb-2.5">
                      <span className="font-bold text-[12px] text-slate-100 block">
                        {getLabel(cohort.groupNameEn, cohort.groupNameAr, cohort.groupNameKu)}
                      </span>
                      <span className="text-[8.5px] font-mono text-teal-300 bg-teal-500/10 border border-teal-500/20 px-1.5 py-0.2 rounded w-fit block mt-1.5 uppercase">
                        {getLabel(cohort.durationEn, cohort.durationAr, cohort.durationKu)}
                      </span>
                    </div>

                    <div className="space-y-2 text-[10.5px] text-slate-300">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-slate-500 block mb-1">
                        {getLabel('Curriculum Modules', 'منهج التأهيل والأدوات', 'وانەکانی خوێندن')}
                      </span>
                      {cohort.curriculumEn.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start font-sans">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{getLabel(cohort.curriculumEn[idx], cohort.curriculumAr[idx], cohort.curriculumKu[idx])}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SUPPORT MODEL */}
        {activeTab === 'support' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase flex items-center gap-1.5">
              <Headset className="w-4 h-4 text-amber-500" />
              <span>{getLabel('Robust Incident Escalation & Response Tiers', 'آلية الدعم الفني وتوصيف مستويات الصيانة المركزية', 'ئاستەکانی پشتیوانی کۆنتڕۆڵی پڕۆژە کە جێبەجێ کراوە')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {supportTiers.map(tier => (
                <div key={tier.tierIndex} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-slate-900 pb-2 mb-2.5">
                      <span className="font-bold text-[12px] text-[#E0A96D] block">
                        {getLabel(tier.nameEn, tier.nameAr, tier.nameKu)}
                      </span>
                      <span className="text-[8px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded w-fit block mt-1.5 uppercase">
                        {getLabel('SLA Response: ', 'زمن الاستجابة: ', 'خێرایی وەڵامدانەوە: ')} {getLabel(tier.responseTimeEn, tier.responseTimeAr, tier.responseTimeKu)}
                      </span>
                    </div>

                    <div className="space-y-1 text-[10.5px] text-slate-300 leading-normal">
                      <p className="font-sans text-slate-400">{getLabel(tier.responstibilityEn, tier.responstibilityAr, tier.responstibilityKu)}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-2 rounded mt-4 text-[9.5px]">
                    <span className="font-mono text-rose-400 font-bold uppercase tracking-wider block text-[7.5px] mb-0.5">
                      {getLabel('Escalation Protocol', 'بروتوكول التصعيد المعتمد', 'ڕێڕەوی هۆشداری')}
                    </span>
                    <span className="text-slate-300 font-sans leading-normal block">
                      {getLabel(tier.escalationEn, tier.escalationAr, tier.escalationKu)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SECURITY PLAN */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{getLabel('Zero-Trust Cybersecurity Isolation System', 'بروتوكولات الأمان الإلكتروني وعزل البوابات والشبكات', 'یاسا گشتییەکانی پاراستنی ئەلکترۆنی')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {securityPolicies.map(policy => (
                <div key={policy.policyId} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-slate-900 pb-2 mb-2.5">
                      <span className="font-bold text-[11.5px] text-slate-100 block">
                        {getLabel(policy.titleEn, policy.titleAr, policy.titleKu)}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-normal mb-3 font-sans">
                      {getLabel(policy.ruleEn, policy.ruleAr, policy.ruleKu)}
                    </p>
                  </div>

                  <div className="bg-[#E0A96D]/5 border border-amber-500/15 p-2 rounded text-[9.5px]">
                    <span className="font-mono text-amber-400 font-bold block uppercase text-[7.5px] tracking-wide mb-0.5">
                      {getLabel('Engineering Mechanism', 'الآلية البرمجية الفنية المتبعة', 'پلانی جیبەجێکاری')}
                    </span>
                    <span className="text-slate-300 leading-relaxed font-sans block">
                      {getLabel(policy.mechanismEn, policy.mechanismAr, policy.mechanismKu)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: DATA GOVERNANCE */}
        {activeTab === 'governance' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase flex items-center gap-1.5">
              <Database className="w-4 h-4 text-[#E0A96D]" />
              <span>{getLabel('Constitutional Data Sovereignty & Management Mapping', 'مبادئ حوكمة وأمن البيانات والمستندات الحدودية', 'بەڕێوەبردن و دیاریکردنی زانیارییەکان بە زمانی فەرمی')}</span>
            </h3>
            
            <div className="space-y-2.5">
              {governanceRules.map(rule => (
                <div key={rule.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[11.5px] text-slate-100 block">
                      {getLabel(rule.domainEn, rule.domainAr, rule.domainKu)}
                    </span>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans max-w-2xl">
                      {getLabel(rule.governanceEn, rule.governanceAr, rule.governanceKu)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-right shrink-0">
                    <div className="bg-slate-905 border border-slate-900 p-1.5 rounded min-w-[120px] text-left">
                      <span className="text-slate-500 font-mono text-[7px] uppercase block mb-0.2">{getLabel('Data Owner', 'مالك البيانات', 'خاوەنی داتا')}</span>
                      <span className="text-[9px] text-[#E0A96D] font-bold font-sans">{getLabel(rule.ownerEn, rule.ownerAr, rule.ownerKu)}</span>
                    </div>
                    <div className="bg-slate-905 border border-slate-900 p-1.5 rounded min-w-[120px] text-left">
                      <span className="text-slate-500 font-mono text-[7px] uppercase block mb-0.2">{getLabel('Classification', 'تصنيف السرية', 'پۆلێنکردنی داتا')}</span>
                      <span className="text-[9px] text-teal-400 font-bold font-mono">{getLabel(rule.classificationEn, rule.classificationAr, rule.classificationKu)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SUCCESS METRICS */}
        {activeTab === 'metrics' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-teal-400 uppercase flex items-center gap-1.5">
              <LineChart className="w-4 h-4 text-teal-400" />
              <span>{getLabel('Strategic Evaluation Success Metrics & Parameters', 'معايير قياس الأداء ومؤشرات النجاح وتقييم الفعالية', 'نیشانەدانی کارادەی سەرکەوتنی جێبەجێکردن')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {metrics.map(metric => (
                <div key={metric.id} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-900 hover:border-slate-800 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between border-b border-slate-900 pb-2 mb-2.5 gap-2">
                      <span className="font-bold text-[11px] text-slate-100">
                        {getLabel(metric.nameEn, metric.nameAr, metric.nameKu)}
                      </span>
                      <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 rounded shrink-0">
                        {metric.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-[10px] text-slate-300">
                      <div>
                        <span className="text-slate-500 font-mono text-[7.5px] uppercase block">{getLabel('Target Parameter', 'الهدف التشغيلي الموصوف', 'ئامانجی گشتی نیشانە')}</span>
                        <p className="font-sans leading-relaxed mt-0.5">{getLabel(metric.targetEn, metric.targetAr, metric.targetKu)}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-900/40">
                        <span className="text-slate-500 font-mono text-[7.5px] uppercase block">{getLabel('Verification Process', 'آلية التحقق والتدقيق الميداني', 'شێوازی بەدواداچون')}</span>
                        <p className="font-sans text-slate-400 leading-relaxed mt-0.5">{getLabel(metric.verificationEn, metric.verificationAr, metric.verificationKu)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: RISK REGISTER */}
        {activeTab === 'risks' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>{getLabel('Comprehensive Pilot Risk Assessment & Minimization Map', 'لوحة إدارة الأخطار وتلافي المعوقات الإدارية الميدانية', 'ڕێگریکردن لە هەر کێشەیەکی سنوری بازرگانی')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {risks.map(risk => (
                <div key={risk.id} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2.5">
                      <span className="font-bold text-[11px] text-slate-100">
                        {getLabel(risk.titleEn, risk.titleAr, risk.titleKu)}
                      </span>
                      <span className={`text-[7.5px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        risk.threatLevel === 'CRITICAL' 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 font-bold animate-pulse' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                      }`}>
                        {risk.threatLevel}
                      </span>
                    </div>

                    <div className="text-[10px] space-y-1 text-slate-400 mb-3 font-sans leading-relaxed">
                      <span>{getLabel(risk.descriptionEn, risk.descriptionAr, risk.descriptionKu)}</span>
                      <span className="text-slate-500 italic block mt-1.5 text-[8.5px]">
                        Owner: {getLabel(risk.riskOwnerEn, risk.riskOwnerAr, risk.riskOwnerKu)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#E0A96D]/5 border border-amber-500/15 p-2 rounded text-[9.5px]">
                    <span className="font-mono text-amber-400 font-bold block uppercase text-[7.5px] tracking-wide mb-0.5">
                      {getLabel('Mitigation Plan', 'خطة تلافي وتجنب الخطر المالي', 'پلانی چارەسەر')}
                    </span>
                    <span className="text-slate-300 leading-normal font-sans block">
                      {getLabel(risk.mitigationEn, risk.mitigationAr, risk.mitigationKu)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
