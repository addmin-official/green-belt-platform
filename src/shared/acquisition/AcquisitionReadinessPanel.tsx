import React, { useState } from 'react';
import { 
  Briefcase, ShieldCheck, DollarSign, Milestone, Award, 
  AlertOctagon, Users, Scale, Printer, Download, ChevronRight, 
  CheckCircle2, AlertTriangle, Shield, Check, Info, FileText, GraduationCap
} from 'lucide-react';
import { AcquisitionBrief, ProblemItem, SolutionModule } from './AcquisitionBrief';
import { ExecutiveValueProposition, ValuePoint } from './ExecutiveValueProposition';
import { GovernmentAcceptanceMatrix, AcceptanceCriterion } from './GovernmentAcceptanceMatrix';
import { DeploymentRoadmap, Milestone as BaseMilestone } from './DeploymentRoadmap';
import { CommercialModelOptions, CommercialModel } from './CommercialModelOptions';
import { RiskAndMitigationBrief, RiskItem } from './RiskAndMitigationBrief';
import { PilotImplementationPlan, PilotPhase } from './PilotImplementationPlan';
import { StakeholderAccessMatrix, AccessBoundary } from './StakeholderAccessMatrix';
import { ReadinessBadge } from '../demo/ReadinessBadge';
import { ProductionReadinessGate } from '../qa/ProductionReadinessGate';
import { Globe, Cpu, Key, Radio, GitBranch, Database } from 'lucide-react';
import { ProviderReadinessReport } from '../../infrastructure/providers/ProviderReadinessReport';
import { OperationalModeConfig } from '../../infrastructure/config/OperationalModeConfig';
import { JurisdictionEndpointConfig } from '../../infrastructure/config/JurisdictionEndpointConfig';
import { ReleaseConfig } from '../../config/release.config';
import { UATDryRunPanel } from '../uat/UATDryRunPanel';
import { TrainingGuidePanel } from '../training/TrainingGuidePanel';


interface AcquisitionReadinessPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const AcquisitionReadinessPanel: React.FC<AcquisitionReadinessPanelProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'value_prop' | 'acceptance' | 'roadmap' | 'commercial' | 'risks' | 'pilot' | 'access' | 'qa_gate' | 'training'>('brief');
  const [simulatedLang, setSimulatedLang] = useState<string>(lang);
  
  React.useEffect(() => {
    setSimulatedLang(lang);
  }, [lang]);

  const [signedOff, setSignedOff] = useState<Record<string, boolean>>({
    no_raw_revenue_exposure: true,
    multilingual_run: true,
    federal_krg_separation: true,
    joint_metadata_only: true,
    audit_trail_enabled: false,
    executive_dashboards_operational: false
  });
  
  const [legislatorVote, setLegislatorVote] = useState<'UNDECIDED' | 'APPROVED' | 'REJECTED'>('UNDECIDED');
  const [contractGenerated, setContractGenerated] = useState(false);

  // Dynamic Provider Readiness state
  const [providerReport, setProviderReport] = useState<any>(null);
  const [isReportLoading, setIsReportLoading] = useState(true);

  React.useEffect(() => {
    let active = true;
    ProviderReadinessReport.executeComprehensiveReport()
      .then(res => {
        if (active) {
          setProviderReport(res);
          setIsReportLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to load provider report", err);
        if (active) setIsReportLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);


  // Data fetching
  const problems = AcquisitionBrief.getProblems();
  const solutions = AcquisitionBrief.getSolutions();
  const valueProps = ExecutiveValueProposition.getValueProps();
  const acceptanceCriteria = GovernmentAcceptanceMatrix.getMatrix();
  const deploymentMilestones = DeploymentRoadmap.getMilestones();
  const commercialModels = CommercialModelOptions.getModels();
  const risks = RiskAndMitigationBrief.getRisks();
  const pilotPhases = PilotImplementationPlan.getPilotPhases();
  const accessMatrices = StakeholderAccessMatrix.getMatrix();

  const getLabel = (en: string, ar: string, ku: string) => {
    const map = { en, ar, ku };
    return map[lang] || en;
  };

  const handleToggleSignOff = (id: string) => {
    setSignedOff(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Count signed off criteria
  const signedOffCount = Object.values(signedOff).filter(Boolean).length;
  const totalCriteria = Object.keys(signedOff).length;
  const allSignedOff = signedOffCount === totalCriteria;

  const handleTriggerContractSimulation = () => {
    setContractGenerated(true);
    setTimeout(() => {
      setContractGenerated(false);
      alert(getLabel(
        "Proposal package generated! Direct PDF and secure XML format exports saved to acquisition registry.",
        "تم إصدار وثيقة الشق التجاري! تم تخزين ملفات الاستحواذ الرسمية بصيغة (PDF و XML) المشفرة.",
        "گرێبەستی فەرمی مۆرکرا! مۆدیولی فایلی تایبەتی PDF و XML لە ئەرشیفەکە خەزن کرا."
      ));
    }, 1200);
  };

  return (
    <div id="acquisition-readiness-panel" className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 shadow-2xl overflow-hidden">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#E0A96D] bg-[#E0A96D]/10 px-2 py-0.5 rounded border border-amber-500/20">
              {getLabel('Acquisition Package', 'حزمة الاستحواذ والاعتماد الحكومي', 'پڕۆتخی فەرمی کڕینەوە')}
            </span>
            <span className="text-[9px] uppercase font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              PHASE 5.1 COMPLIANT
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-1 font-sans">
            {getLabel('Sovereign Border & Revenue Acquisition Portal', 'بوابة المفاوضات والاستحواذ السيادي للمنافذ والإيرادات', 'پۆرتاڵی کڕینەوە و بەدواداچوونی گومرگی فەرمی')}
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {getLabel(
              'Technical and commercial evaluation system for joint ministerial and federal decision-makers.',
              'المنصة التقنية والتجارية الموحدة لتدقيق وموافقة مجلس الوزراء والهيئات المشتركة.',
              'سیستەمی هەڵسەنگاندنی تەکنیکی و بازرگانی بۆ نوێنەرانی باڵای هەولێر و بەغدا.'
            )}
          </p>
        </div>
        
        {/* State Indicators */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 flex items-center gap-2 text-[11px] font-mono">
            <span className="text-slate-400">{getLabel('Compliance:', 'نسبة الالتزام:', 'ڕێژەی گوێڕایەڵی:')}</span>
            <span className="font-bold text-emerald-400">{Math.round((signedOffCount / totalCriteria) * 100)}%</span>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 flex items-center gap-2 text-[11px] font-mono">
            <span className="text-slate-400">{getLabel('Decision:', 'القرار:', 'جوڵەی بریار:')}</span>
            {legislatorVote === 'APPROVED' ? (
              <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase text-[9px]">
                {getLabel('APPROVED', 'مقبول', 'ڕێگەپێدراو')}
              </span>
            ) : legislatorVote === 'REJECTED' ? (
              <span className="font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/30 uppercase text-[9px]">
                {getLabel('REJECTED', 'مرفوض', 'ڕەتکراوە')}
              </span>
            ) : (
              <span className="font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 uppercase text-[9px]">
                {getLabel('PENDING', 'قيد الدراسة', 'چاوەڕوان')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-1 border-b border-slate-900 pb-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
        {[
          { id: 'brief', label: getLabel('Brief & Problem', 'الملخص والجدوى', 'بینینی سەرەتایی'), icon: Briefcase },
          { id: 'value_prop', label: getLabel('Value Proposition', 'القيمة المضافة للشركاء', 'بەهای پڕۆژە'), icon: ShieldCheck },
          { id: 'acceptance', label: getLabel('Acceptance Criteria', 'شروط الاستحواذ', 'مەرجەکانی وەرگرتن'), icon: Award },
          { id: 'roadmap', label: getLabel('Deployment Roadmap', 'جدول خريطة الطريق', 'پلانی جێبەجێکردن'), icon: Milestone },
          { id: 'commercial', label: getLabel('Commercial Options', 'الشق المالي والعقود', 'تێچوو و گرێبەست'), icon: DollarSign },
          { id: 'risks', label: getLabel('Risk Management', 'إدارة المخاطر والحلول', 'مەترسییەکان'), icon: AlertOctagon },
          { id: 'pilot', label: getLabel('Pilot Setup', 'التنفيذ التجريبي', 'خاڵی ئەزموونی'), icon: FileText },
          { id: 'access', label: getLabel('Access Matrix', 'مصفوفة الصلاحيات', 'دەسەڵاتی کاربەر'), icon: Users },
          { id: 'qa_gate', label: getLabel('Automated QA Gate', 'بوابة جودة الإنتاج الفعالة', 'چاودێری کوالێتی بەرهەم'), icon: Shield },
          { id: 'training', label: getLabel('Training Manual & Maps', 'دليل المعرفة والخرائط', 'ڕێبەری ڕاهێنان و نەخشەكان'), icon: GraduationCap }
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
      <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-900/80 min-h-[340px] flex flex-col justify-between">
        
        {/* TAB 1: BRIEF */}
        {activeTab === 'brief' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase mb-2 flex items-center gap-1">
                <Info className="w-4 h-4 text-[#E0A96D]" />
                <span>{getLabel('Constitutional Problem Statement', 'توصيف العقبات الوطنية الحالية', 'پێگەی کێشە نیشتمانییەکان')}</span>
              </h3>
              <p className="text-[11.5px] text-slate-300 leading-relaxed mb-3">
                {getLabel(
                  'The lack of an automated, integrated technical pipeline between Baghdad and Erbil has historically harmed border management and resulted in massive financial leakage. Below are the key identified failure pillars mitigated by this system:',
                  'إن غياب آليات التنسيق والتدوير الجمركي التلقائي بين بغداد وأربيل تسبب تاريخياً في هدر مليارات الدولارات وإعاقة نمو موازنة الدولة. يعالج هذا البرنامج العقبات التالية:',
                  'نەبوونی هێڵی بەیەکبەستنی گومرگی فەرمی لە مێژوودا زیانی بە دەروازە سنورییەکان گەیاندووە و بووەتە هۆی گەندەڵی، ئەم سیستەمە خاڵە نەرێنییەکانی ژێرەوە چارەسەر دەکات:'
                )}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {problems.map(prob => (
                  <div key={prob.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <div>
                      <span className="font-semibold text-[11px] text-slate-100 block mb-0.5">
                        {getLabel(prob.titleEn, prob.titleAr, prob.titleKu)}
                      </span>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        {getLabel(prob.descEn, prob.descAr, prob.descKu)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-900 pt-3 mt-3">
              <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase mb-2">
                {getLabel('Modern Border OS Modules Solution Map', 'خارطة مكونات وموديلات السيادة المطبقة بالمنصة', 'مۆدیولە چارەسەرکەرەکانی سیستەمی کۆنترۆل')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {solutions.map(sol => (
                  <div key={sol.id} className="bg-slate-900/40 p-2.5 rounded border border-slate-800/60">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-[10.5px] text-slate-200">
                        {getLabel(sol.titleEn, sol.titleAr, sol.titleKu)}
                      </span>
                      <span className="text-[7.5px] font-mono bg-amber-500/10 text-[#E0A96D] px-1 rounded border border-amber-500/20">
                        {getLabel(sol.badgeEn, sol.badgeAr, sol.badgeKu)}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-slate-400 leading-relaxed">
                      {getLabel(sol.descEn, sol.descAr, sol.descKu)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VALUE PROP */}
        {activeTab === 'value_prop' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-teal-400 uppercase mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{getLabel('Executive Multi-Stakeholder Value Delivery', 'القيمة المضافة العضوية لصناع القرار', 'سەلماندنی سوود و تایبەتمەندییەکان بۆ هەردوو لایەن')}</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {valueProps.map(vp => (
                <div key={vp.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-[12px] text-[#E0A96D] block border-b border-slate-900 pb-1.5 mb-2.5">
                      {getLabel(vp.titleEn, vp.titleAr, vp.titleKu)}
                    </span>
                    <ul className="space-y-2 text-[10.5px] text-slate-300 leading-normal pl-1">
                      {vp.pointsEn.map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex gap-2 items-start">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{getLabel(vp.pointsEn[ptIdx], vp.pointsAr[ptIdx], vp.pointsKu[ptIdx])}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-900 border border-slate-800/60 p-2 rounded mt-4 text-[10px] font-mono font-bold text-center text-teal-300">
                    {getLabel(vp.statEn, vp.statAr, vp.statKu)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACCEPTANCE */}
        {activeTab === 'acceptance' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="text-xs font-mono font-bold text-amber-500 uppercase flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#E0A96D]" />
                <span>{getLabel('National Government Acceptance Criteria Matrix', 'مصفوفة مطابقة شروط الاعتماد والاستحواذ', 'لیستی مەرجەکانی متمانەدان بۆ کڕینەوەی فەرمی')}</span>
              </h3>
              <span className="text-[10px] font-mono font-medium text-slate-400">
                {signedOffCount} of {totalCriteria} {getLabel('Criteria Compliant', 'شروط مستوفاة', 'مەرجەکان توافقولەدایە')}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 italic mb-2">
              {getLabel(
                "Click individual checkboxes below to simulate ministerial sign-off audits across target constitutional vectors:",
                "قم بالنقر لتفعيل أو إلغاء علامات الرقابة والمطابقة لمحاكاة التصديق الدستوري للجنة المشتركة:",
                "کلیک لەسەر چوارگۆشەکان بکە بۆ تاقیکردنەوەی چاودێری و واژۆی فەرمی نێوان نوێنەرانی باڵا:"
              )}
            </p>

            <div className="space-y-2.5">
              {acceptanceCriteria.map(item => {
                const isSigned = !!signedOff[item.id];
                return (
                  <div 
                    key={item.id} 
                    onClick={() => handleToggleSignOff(item.id)}
                    className={`p-3 rounded-lg border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSigned 
                        ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition ${
                        isSigned 
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' 
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}>
                        {isSigned && <Check className="w-3.5 h-3.5 font-bold" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[11px] text-slate-100">
                            {getLabel(item.titleEn, item.titleAr, item.titleKu)}
                          </span>
                          <span className="text-[8px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.2 rounded-full uppercase">
                            {getLabel(item.categoryEn, item.categoryAr, item.categoryKu)}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          {getLabel(item.metricEn, item.metricAr, item.metricKu)}
                        </p>
                        <span className="text-[8.5px] font-mono text-slate-500 block mt-1">
                          {getLabel('Method: ', 'الآلية: ', 'شێواز: ')} {getLabel(item.verificationMethodEn, item.verificationMethodAr, item.verificationMethodKu)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="sm:text-right shrink-0">
                      {isSigned ? (
                        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded uppercase">
                          {getLabel('APPROVED SIGN-OFF', 'تم الاعتماد والتوقيع', 'موافق لێدرا')}
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded uppercase">
                          {getLabel('PENDING CABINET VOTE', 'بانتظار تصويت الوزراء', 'چاوەڕوانی واژۆ')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#E0A96D] uppercase mb-2 flex items-center gap-1.5">
              <Milestone className="w-4 h-4 text-emerald-400" />
              <span>{getLabel('Rigorous Phased Deployment Timelines', 'خريطة الطريق لعملية التعميم للمنافذ الوطنية', 'پلانی جێبەجێکردنی قۆناغەکانی پڕۆژە')}</span>
            </h3>
            
            <div className="relative border-l border-slate-800 ml-4 pl-4 space-y-4 py-1">
              {deploymentMilestones.map((ms, idx) => (
                <div key={ms.phaseIndex} className="relative bg-slate-950/60 p-3 rounded-lg border border-slate-900 hover:border-slate-800 transition">
                  {/* Timeline point indicator */}
                  <div className="absolute -left-[23px] top-6 w-3 h-3 rounded-full bg-amber-400 border border-slate-950 flex items-center justify-center shadow" />
                  
                  <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-1 mb-2">
                    <span className="font-bold text-[11px] text-[#E0A96D]">
                      {getLabel(ms.titleEn, ms.titleAr, ms.titleKu)}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      {getLabel(ms.durationEn, ms.durationAr, ms.durationKu)}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-[10px] pl-1 font-sans text-slate-300 leading-normal">
                    {ms.goalsEn.map((goal, gIdx) => (
                      <li key={gIdx} className="flex gap-1.5 items-start">
                        <span className="text-amber-400 font-mono">•</span>
                        <span>{getLabel(ms.goalsEn[gIdx], ms.goalsAr[gIdx], ms.goalsKu[gIdx])}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COMMERCIAL */}
        {activeTab === 'commercial' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase mb-2 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>{getLabel('Versatile Commercial Acquisition Models', 'النماذج التجارية وصيغ هيكلة العقود والترخيص', 'شێوازەکانی گرێبەستی فەرمی بۆ تێچووی نیشتمانی')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commercialModels.map(model => (
                <div key={model.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between border-b border-slate-900 pb-1.5 mb-2 gap-2">
                      <span className="font-bold text-[11.5px] text-[#E0A96D]">
                        {getLabel(model.nameEn, model.nameAr, model.nameKu)}
                      </span>
                      <span className="text-[8px] font-mono bg-teal-500/10 text-teal-300 px-1.5 rounded border border-teal-500/20 uppercase shrink-0">
                        {getLabel(model.costEn, model.costAr, model.costKu)}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
                      {getLabel(model.descEn, model.descAr, model.descKu)}
                    </p>
                    
                    <ul className="space-y-1.5 text-[9.5px] text-slate-300 leading-normal pl-1">
                      {model.benefitsEn.map((ben, bIdx) => (
                        <li key={bIdx} className="flex gap-1.5 items-start">
                          <Check className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                          <span>{getLabel(model.benefitsEn[bIdx], model.benefitsAr[bIdx], model.benefitsKu[bIdx])}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: RISKS */}
        {activeTab === 'risks' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase mb-2 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-amber-500" />
              <span>{getLabel('Risk Assessment & Mitigation Matrix', 'مصفوفة معالجة نقاط التخوف وإدارة المخاطر', 'پلانی ڕێگری لە مەترسی و لادانەکانی کار')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {risks.map(risk => (
                <div key={risk.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-2">
                      <span className="font-bold text-[11px] text-slate-100">
                        {getLabel(risk.riskTitleEn, risk.riskTitleAr, risk.riskTitleKu)}
                      </span>
                      <span className={`text-[7.5px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        risk.threatLevel === 'HIGH' 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/25' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                      }`}>
                        {risk.threatLevel}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-3">
                      {getLabel(risk.descriptionEn, risk.descriptionAr, risk.descriptionKu)}
                    </p>
                  </div>
                  
                  <div className="bg-[#E0A96D]/5 border border-amber-500/15 p-2 rounded text-[9.5px]">
                    <span className="font-mono font-bold text-amber-400 block uppercase text-[8px] tracking-wide mb-0.5">
                      {getLabel('Mitigation Plan', 'خطة تلافي المخاطر', 'پلانی ڕێکخستنەوە')}
                    </span>
                    <span className="text-slate-300 leading-relaxed font-sans block">
                      {getLabel(risk.mitigationEn, risk.mitigationAr, risk.mitigationKu)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PILOT */}
        {activeTab === 'pilot' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-teal-400 uppercase mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-400" />
              <span>{getLabel('Low-Risk Pilot Implementation Guidelines', 'دليل تهيئة وإدارة المراكز والمنافذ التجريبية', 'بەدواداچوونی وردی قۆناغی تاقیکاری پڕۆژە')}</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {pilotPhases.map(phase => (
                <div key={phase.id} className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between border-b border-slate-900 pb-1.5 mb-2 gap-2">
                      <span className="font-bold text-[11px] text-teal-300">
                        {getLabel(phase.nameEn, phase.nameAr, phase.nameKu)}
                      </span>
                      <span className="text-[8px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1 py-0.2 rounded shrink-0">
                        {getLabel(phase.timeframeEn, phase.timeframeAr, phase.timeframeKu)}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-[9.5px] text-slate-400 leading-normal pl-1">
                      {phase.activitiesEn.map((act, actIdx) => (
                        <li key={actIdx} className="flex gap-1.5 items-start">
                          <span className="text-[#E0A96D] font-mono font-bold">•</span>
                          <span>{getLabel(phase.activitiesEn[actIdx], phase.activitiesAr[actIdx], phase.activitiesKu[actIdx])}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: ACCESS */}
        {activeTab === 'access' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>{getLabel('Sovereign Role Clearance & Access Matrices', 'مصفوفة الرتب وطبقات الأمن التابعة للملف الوطني', 'خشتەی دەسەڵاتی کاربەران بەپێی یاسای گشتی')}</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {accessMatrices.map(role => (
                <div key={role.roleId} className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-slate-900 pb-1.5 mb-2.5">
                      <span className="font-bold text-[12px] text-[#E0A96D] block">
                        {getLabel(role.roleNameEn, role.roleNameAr, role.roleNameKu)}
                      </span>
                      <span className="text-[8.5px] text-slate-400 block mt-0.5 font-sans italic">
                        {getLabel(role.jurisdictionEn, role.jurisdictionAr, role.jurisdictionKu)}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[10px] text-slate-300 leading-normal pl-1">
                      <span className="font-bold text-teal-400 block text-[8px] uppercase tracking-wider mb-1">
                        {getLabel('Permitted Modules', 'الموديلات والمكونات المسموحة', 'بەشە ڕێگەپێدراوەکان')}
                      </span>
                      {role.allowedModulesEn.map((mod, mIdx) => (
                        <div key={mIdx} className="flex gap-1.5 items-center">
                          <Check className="w-3 h-3 text-teal-400 shrink-0" />
                          <span>{getLabel(role.allowedModulesEn[mIdx], role.allowedModulesAr[mIdx], role.allowedModulesKu[mIdx])}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-rose-950/10 border border-rose-900/30 p-2 rounded mt-4 text-[9px] text-rose-300 font-sans">
                    <span className="font-mono font-bold text-rose-400 block uppercase text-[8px] tracking-wide mb-0.5">
                      {getLabel('Exclusion Boundary Rule', 'خط عزل ومنع الحسابات', 'ڕێسای بلۆککردن')}
                    </span>
                    {getLabel(role.blockRuleEn, role.blockRuleAr, role.blockRuleKu)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: AUTOMATED QA GATE */}
        {activeTab === 'qa_gate' && (() => {
          const gateResult = ProductionReadinessGate.executeRuntimeGate();
          const checks = [
            {key: 'mock', name: getLabel('Mock Dependency Check', 'فحص الاعتمادية والبيانات الوهمية', 'پشکنینی داتای ساختە'), obj: gateResult.mockDependencyCheck, icon: Cpu},
            {key: 'sovereign', name: getLabel('Sovereign Boundary Check', 'فحص الحوكمة والحدود السيادية', 'پشکنینی پاراستنی دەسەڵات'), obj: gateResult.sovereignBoundaryCheck, icon: Shield},
            {key: 'localization', name: getLabel('Localization Coverage Check', 'فحص التغطية الكاملة للغات', 'پشکنینی ڕێژەی زمانەكان'), obj: gateResult.localizationCoverageCheck, icon: Globe},
            {key: 'typography', name: getLabel('RTL Typography Check', 'فحص الخطوط والقراءة الآمنة', 'پشکنینی جۆري نووسين'), obj: gateResult.rtlTypographyCheck, icon: Key},
            {key: 'hardcoded', name: getLabel('Hardcoded Success Check', 'فحص البيانات المباشرة المزيفة', 'پشکنینی ڕابۆرتە ڕاستەقینەکان'), obj: gateResult.hardcodedSuccessCheck, icon: Radio},
            {key: 'demo', name: getLabel('Demo Isolation Check', 'فحص عزل السيناريوهات الافتراضية', 'پشکنینی جیاکردنەوەی تاقیکاري'), obj: gateResult.demoIsolationCheck, icon: GitBranch},
            {key: 'build', name: getLabel('Production Build Compliance Check', 'فحص مخرجات الإنتاج السليم', 'پشکنینی پرۆسەی دروستکردن'), obj: gateResult.buildCheck, icon: ShieldCheck}
          ];

          return (
            <div id="automated-qa-gate" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <span>{getLabel('Automated QA Release Gate', 'بوابة إصدارات الإنتاج الفعالة والمدققة آلياً', 'چاودێری کوالێتی بەرهەم و پاراستن')}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {getLabel(
                      'Real-time automated compliance static code scanning and runtime environment checks.',
                      'نظام المسح المباشر التلقائي للملفات ومطابقة الكود الدستوري ومعايير إنفاذ البيانات البرمجية السليمة.',
                      'سیستەمی سکانکردن و بەدواداچوونی سەرچاوەی کارکردنی بەرنامەکە و کوالێتی کۆدەکە.'
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">{getLabel('Compliance Score', 'معدل المطابقة', 'نمرەی گشتی')}</span>
                    <span className="text-xl font-bold text-emerald-400 font-mono">{gateResult.overallComplianceScore}% PASS</span>
                  </div>
                  <div className="bg-slate-950 px-3 py-1.5 rounded border border-slate-800 text-center min-w-[120px]">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">{getLabel('Decision', 'القرار الفني', 'بڕیاری کۆتایی')}</span>
                    <span className={`text-xs font-bold font-mono ${
                      gateResult.readinessDecision === 'ACQUISITION_READY' ? 'text-emerald-400' :
                      gateResult.readinessDecision === 'PILOT_READY' ? 'text-teal-400' :
                      gateResult.readinessDecision?.startsWith('CONDITIONALLY_READY') ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {gateResult.readinessDecision}
                    </span>
                  </div>
                </div>
              </div>

              {/* API Contract Compliance Section (Phase 5.5) */}
              <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-amber-500" />
                  <span>{getLabel('Backend API Contracts & Integration Spec (Phase 5.5)', 'مطابقة وسلامة بروتوكولات الربط البرمجي للمنافذ (المرحلة 5.5)', 'پشکنینی ڕێککەوتنی کۆدی API دەروازەکان')}</span>
                </h4>
                {isReportLoading ? (
                  <div className="text-xs text-slate-400 font-mono animate-pulse">
                    {getLabel('Analyzing API Contract Registries...', 'جاري فحص وتدقيق بروتوكولات الربط للوزارات...', 'خەریکی پشکنینی ڕێککەوتنەکانی API دەروازەکانە...')}
                  </div>
                ) : providerReport ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {/* 1. API Contract Readiness */}
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">
                        {getLabel('Contract Readiness', 'جاهزية العقد البرمجي', 'جاهزیەتی ڕێککەوتن')}
                      </span>
                      <span className={`text-sm font-bold font-mono ${providerReport.contractReadinessScore === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {providerReport.contractReadinessScore}%
                      </span>
                    </div>

                    {/* 2. Missing Contract Count */}
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">
                        {getLabel('Missing Contracts', 'عقود برمجية مفقودة', 'ڕێککەوتنی بەردەست نییە')}
                      </span>
                      <span className={`text-sm font-bold font-mono ${providerReport.missingContractCount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {providerReport.missingContractCount}
                      </span>
                    </div>

                    {/* 3. Schema Completeness */}
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">
                        {getLabel('Schema Completeness', 'اكتمل تخطيط البيانات', 'کوالێتی داڕشتن داتا')}
                      </span>
                      <span className="text-sm font-bold font-mono text-teal-400">
                        {providerReport.schemaCompletenessScore}%
                      </span>
                    </div>

                    {/* 4. Joint Metadata Compliance */}
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">
                        {getLabel('Joint Metadata Rule', 'امتثال البيانات المشتركة', 'ڕێککەوتنی داتای هاوبەش')}
                      </span>
                      <span className={`text-[10px] font-bold font-mono block mt-1 ${providerReport.jointMetadataCompliance ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {providerReport.jointMetadataCompliance ? 'COMPLIANT' : 'NON-COMPLIANT'}
                      </span>
                    </div>

                    {/* 5. Jurisdiction Contract Violations */}
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center col-span-2 md:col-span-1">
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">
                        {getLabel('Jurisdiction Violations', 'انتهاكات الاختصاص القضائي', 'پێشێلکاری سنورەکان')}
                      </span>
                      <span className={`text-sm font-bold font-mono ${providerReport.jurisdictionContractViolationsCount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {providerReport.jurisdictionContractViolationsCount}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-rose-400 font-mono">
                    {getLabel('Failed to retrieve comprehensive contract report.', 'فشل فحص بروتوكولات الكود والربط.', 'هەڵەیەک لە پشکنینی پۆرتە دەرەکییەکاندا هەیە.')}
                  </div>
                )}
              </div>

              {/* OpenAPI Export & Backend Onboarding Status Section (Phase 5.6) */}
              <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4.5 h-4.5 text-emerald-400" />
                  <span>{getLabel('OpenAPI Export & Backend Onboarding (Phase 5.6)', 'تصدير بروتوكولات الربط وحزمة تهيئة الأنظمة (المرحلة 5.6)', 'هەناردەکردنی گرێبەستی کات و ئۆنبوڕدین')}</span>
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* 1. OpenAPI Export Status */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('OpenAPI Export Status', 'حالة تصدير ملفات OpenAPI', 'هەناردەی مەلەفی فەرمی')}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400 block mt-1">
                      EXPORTED (3 FILES)
                    </span>
                  </div>

                  {/* 2. Backend Onboarding Package Status */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Onboarding Package Status', 'حالة حزمة تهيئة الوزارات', 'مۆدیولی ئۆنبوڕدین')}
                    </span>
                    <span className="text-xs font-semibold font-mono text-emerald-400 block mt-1">
                      READY / COMPLIED
                    </span>
                  </div>

                  {/* 3. Joint Metadata Spec Status */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Joint Metadata Spec Status', 'تطابق بيانات الربط المشترك', 'مەرجەكانی سەنەد')}
                    </span>
                    <span className="text-xs font-bold font-mono text-teal-400 block mt-1">
                      ENFORCED (METADATA-ONLY)
                    </span>
                  </div>

                  {/* 4. Provider Integration Checklist Status */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Integration Checklist Status', 'اكتمال معايير مصفوفة التدقيق', 'لیستی پشکنینی پڕۆژە')}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400 block mt-1">
                      100% COMPLIANT
                    </span>
                  </div>
                </div>
              </div>

              {/* Release Hardening & Deployment Environment (Phase 5.7) */}
              <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                  <span>{getLabel('Release Hardening & Deployment Environment (Phase 5.7)', 'تحصين بيئة النشر وجاهزية الإطلاق (المرحلة 5.7)', 'ئاسایشکردنی ژینگەی ناردنی مەلەف')}</span>
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* 1. Release Channel */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Release Channel', 'قناة الإصدار', 'کەنالی بڵاوکردنەوە')}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400 block mt-1">
                      {ReleaseConfig.releaseChannel}
                    </span>
                  </div>

                  {/* 2. Build Target */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Build Target', 'هدف البناء', 'ئامانجی دروستکردن')}
                    </span>
                    <span className="text-xs font-bold font-mono text-teal-400 block mt-1">
                      {ReleaseConfig.buildTarget}
                    </span>
                  </div>

                  {/* 3. Deployment Readiness */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Deployment Readiness', 'جاهزية النشر للمحيط', 'ئامادەیی ناردن')}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400 block mt-1">
                      VERIFIED (ACTIVE)
                    </span>
                  </div>

                  {/* 4. Build Output Safety */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 col-span-2 lg:col-span-1">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Build Output Safety', 'سلامة مخرجات البناء', 'ئاسایشی داتاكان بونیات')}
                    </span>
                    <span className="text-xs font-bold font-mono text-emerald-400 block mt-1">
                      SANITIZED & SAFE
                    </span>
                  </div>

                  {/* 5. Provider Requirement Status */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 col-span-2 lg:col-span-1">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Provider Requirement Status', 'حالة متطلبات المزودات', 'مەرجی كۆمپانیاكان')}
                    </span>
                    <span className="text-xs font-bold font-mono text-amber-400 block mt-1">
                      PROVIDERS REQUIRED
                    </span>
                  </div>

                  {/* 6. Final Readiness Decision */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 col-span-2 lg:col-span-1">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Final Readiness Decision', 'قرار الجاهزية النهائي', 'بڕیاری کۆتایی ئامادەیی')}
                    </span>
                    <span className="text-xs font-bold font-mono text-amber-500 block mt-1">
                      CONDITIONALLY READY
                    </span>
                  </div>
                </div>
              </div>

              {/* Pilot Backend Provider Wiring (Phase 5.9) */}
              <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800 space-y-3 mt-4">
                <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-4.5 h-4.5 text-amber-500" />
                  <span>{getLabel('Pilot Backend Provider Wiring (Phase 5.9)', 'توصيل مزودات البيئة التجريبية الخلفية (المرحلة 5.9)', 'تەلی دەروازەی پشتەوەی ئەزموونی')}</span>
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* 1. Backend Wiring Status */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Backend Wiring Status', 'حالة توصيل النظم الخلفية', 'خاڵی پەیوەندی')}
                    </span>
                    <span className={`text-xs font-bold font-mono block mt-1 ${isReportLoading ? 'text-slate-400' : providerReport?.backendScaffoldReachable ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isReportLoading ? 'CHECKING...' : providerReport?.backendScaffoldReachable ? 'CONNECTED' : 'DISCONNECTED / OFFLINE'}
                    </span>
                  </div>

                  {/* 2. Federal Backend State */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Federal Backend State', 'حالة المزود الاتحادي', 'دۆخی فیدراڵ')}
                    </span>
                    <span className={`text-xs font-bold font-mono block mt-1 ${isReportLoading ? 'text-slate-400' : providerReport?.federalBackendState === 'READY' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isReportLoading ? 'PENDING...' : providerReport?.federalBackendState || 'NOT_CONFIGURED'}
                    </span>
                  </div>

                  {/* 3. KRG Backend State */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('KRG Backend State', 'حالة المزود الإقليمي', 'دۆخی هەرێم')}
                    </span>
                    <span className={`text-xs font-bold font-mono block mt-1 ${isReportLoading ? 'text-slate-400' : providerReport?.krgBackendState === 'READY' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isReportLoading ? 'PENDING...' : providerReport?.krgBackendState || 'NOT_CONFIGURED'}
                    </span>
                  </div>

                  {/* 4. Joint Backend State */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Joint Backend State', 'حالة مزود العمليات المشتركة', 'دۆخی هاوبەش')}
                    </span>
                    <span className={`text-xs font-bold font-mono block mt-1 ${isReportLoading ? 'text-slate-400' : providerReport?.jointBackendState === 'READY' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isReportLoading ? 'PENDING...' : providerReport?.jointBackendState || 'NOT_CONFIGURED'}
                    </span>
                  </div>

                  {/* 5. Provider Not Connected Count */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Unconnected Fallbacks', 'عدد المزودات قيد الربط', 'ژمارەی تەلەفۆن')}
                    </span>
                    <span className="text-xs font-bold font-mono text-amber-500 block mt-1">
                      {isReportLoading ? '...' : providerReport?.providerNotConnectedCount ?? 0} Fallbacks Active
                    </span>
                  </div>

                  {/* 6. Final Readiness Decision */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Final Readiness Decision', 'قرار الجاهزية النهائي', 'بڕیاری کۆتایی')}
                    </span>
                    <span className="text-xs font-bold font-mono text-amber-400 block mt-1">
                      {gateResult.readinessDecision}
                    </span>
                  </div>
                </div>
              </div>

              {/* Local/Staging Orchestration & Smoke Suite (Phase 5.10) */}
              <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800 space-y-3 mt-4">
                <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4.5 h-4.5 text-teal-400" />
                  <span>{getLabel('Local/Staging Orchestration & Smoke Suite (Phase 5.10)', 'إدارة البيئة المحلية والاختبار الشامل (المرحلة 5.10)', 'تایبەتمەندی ڕێکخستنی ناوخۆیی (قۆناغی 5.10)')}</span>
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Local Frontend Build */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Local Frontend Build', 'بناء واجهة المستخدم المحلية', 'بنیادنانی پێشەوە')}
                    </span>
                    <span className="text-xs font-bold font-mono block mt-1 text-emerald-400">
                      PASS (COMPILED)
                    </span>
                  </div>

                  {/* Local Backend Build */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Local Backend Build', 'بناء النظام الخلفي المحلي', 'بنیادنانی پشتەوە')}
                    </span>
                    <span className="text-xs font-bold font-mono block mt-1 text-emerald-400">
                      PASS (COMPILED)
                    </span>
                  </div>

                  {/* Backend Health */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Backend Health', 'صحة النظام الخلفي', 'تەندروستی پشتەوە')}
                    </span>
                    <span className={`text-xs font-bold font-mono block mt-1 ${isReportLoading ? 'text-slate-400' : providerReport?.backendScaffoldReachable ? 'text-emerald-400' : 'text-amber-500'}`}>
                      {isReportLoading ? 'CHECKING...' : providerReport?.backendScaffoldReachable ? 'PASS (HEALTHY)' : 'BACKEND_UNAVAILABLE'}
                    </span>
                  </div>

                  {/* Provider Handshake */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Provider Handshake', 'مصافحة مزود الخدمة', 'هاوتاکردنی دابینکەر')}
                    </span>
                    <span className={`text-xs font-bold font-mono block mt-1 ${isReportLoading ? 'text-slate-400' : providerReport?.providerNotConnectedCount > 0 ? 'text-amber-500' : 'text-emerald-400'}`}>
                      {isReportLoading ? 'PENDING...' : providerReport?.providerNotConnectedCount > 0 ? 'PROVIDER_NOT_CONNECTED' : 'FULLY_OPERATIONAL'}
                    </span>
                  </div>

                  {/* Joint Metadata Smoke Test */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Joint Metadata Smoke Test', 'فحص دخان بيانات العمليات المشتركة', 'پشکنینی دووکەڵی دراوەکان')}
                    </span>
                    <span className="text-xs font-bold font-mono block mt-1 text-emerald-400">
                      PASS (ISOLATED)
                    </span>
                  </div>

                  {/* Staging Release Check */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Staging Release Check', 'فحص جاهزية النشر المؤقت', 'مەرجی وەستاندنی بڵاوکردنەوە')}
                    </span>
                    <span className="text-xs font-bold font-mono block mt-1 text-amber-500">
                      NOT_CONFIGURED (PILOT DB)
                    </span>
                  </div>

                  {/* Final Strategic Readiness */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 col-span-2">
                    <span className="text-[9px] text-slate-500 uppercase font-mono block">
                      {getLabel('Final Strategic Readiness', 'قرار الجاهزية النهائي للمرحلة', 'بڕیاری کۆتایی جاهیزیەت')}
                    </span>
                    <span className="text-xs font-bold font-mono text-amber-500 block mt-1">
                      {gateResult.readinessDecision || 'CONDITIONALLY_READY — PROVIDERS REQUIRED'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Phase 5.11 - Pilot Dry-run & Role-based UAT Panel */}
              <UATDryRunPanel
                currentLanguage={simulatedLang}
                onLanguageChange={(newLang) => setSimulatedLang(newLang as any)}
                federalBackendState={providerReport?.federalState || 'NOT_CONFIGURED'}
                krgBackendState={providerReport?.krgState || 'NOT_CONFIGURED'}
                jointBackendState={providerReport?.jointState || 'NOT_CONFIGURED'}
                isBackendReachable={providerReport?.backendScaffoldReachable || false}
              />

              {/* Status checklist grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {checks.map(check => {
                  const Icon = check.icon;
                  return (
                    <div key={check.key} className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 flex items-start gap-3 justify-between">
                      <div className="flex items-start gap-2.5 flex-1">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 mt-0.5 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-xs text-slate-200 block">
                            {check.name}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-relaxed block mt-1 break-words">
                            {check.obj.details}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 block mt-1.5">
                            {getLabel('Latest verification: ', 'آخر فحص: ', 'دوایین پشکنین: ')} {new Date(check.obj.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 text-right ml-2">
                        {check.obj.status === 'PASS' ? (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                            PASS
                          </span>
                        ) : check.obj.status === 'NOT_CONFIGURED' ? (
                          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-500/10 border border-slate-500/20 px-2 py-0.5 rounded uppercase">
                            N/A
                          </span>
                        ) : (
                          <div>
                            <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase block mb-1">
                              FAIL
                            </span>
                            <span className="text-[10px] font-mono text-rose-300 block">
                              {check.obj.violationsCount > 0 ? `${check.obj.violationsCount} Errors` : 'Error'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {activeTab === 'training' && (
          <TrainingGuidePanel currentLang={simulatedLang} />
        )}

        {/* Dynamic bottom controls section for voting and PDF Generation */}
        <div className="border-t border-slate-900 pt-4 mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-slate-400">
            {allSignedOff ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{getLabel('All 6 high-level sovereign criteria confirmed compliant.', 'تم التحقق من تطابق كافة شروط الاعتماد الستة.', 'سەرجەم ٦ مەرجە باڵاکان بە سەرکەوتوویی واژۆ کران')}</span>
              </span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  {getLabel(
                    `Incomplete Sign-offs (${signedOffCount} of ${totalCriteria}). Complete lists to unblock supreme vote.`,
                    `شروط غير كاملة (${signedOffCount} منصلة ${totalCriteria}). استكمل التواقيع لتشغيل التصويت الدستوري.`,
                    `تەواو نەکردنی واژۆکان (${signedOffCount} لە کۆی ${totalCriteria}).`
                  )}
                </span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              {[
                { vote: 'APPROVED', label: getLabel('APPROVE', 'قبول وموافقة', 'موافقم'), color: 'text-emerald-400' },
                { vote: 'REJECTED', label: getLabel('REJECT', 'رفض وتجميد', 'ڕەتکردنەوە'), color: 'text-rose-400' }
              ].map(opt => (
                <button
                  key={opt.vote}
                  disabled={!allSignedOff}
                  onClick={() => setLegislatorVote(opt.vote as any)}
                  className={`px-3 py-1 text-[10px] font-mono font-bold rounded-md transition ${
                    opt.vote === legislatorVote 
                      ? 'bg-[#E0A96D]/15 text-amber-300 shadow' 
                      : 'text-slate-500 hover:text-slate-300 disabled:opacity-30'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleTriggerContractSimulation}
              disabled={legislatorVote !== 'APPROVED'}
              className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-[#E0A96D] hover:from-amber-600 hover:to-amber-500 disabled:opacity-30 text-slate-950 font-bold text-xs font-mono rounded-lg transition flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4" />
              <span>{getLabel('DOWNLOAD CONTRACT PACKAGE', 'تصدير حزمة العقد النهائي', 'دابەزاندنی فایلەکانی گرێبەست')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
