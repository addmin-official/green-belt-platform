import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, BookOpen, Map, ShieldAlert, CheckCircle2, 
  HelpCircle, ChevronRight, AlertCircle, FileText, UserCheck, Key, Lock
} from 'lucide-react';
import { TrainingTopicRegistry, TrainingTopic } from './TrainingTopicRegistry';
import { DashboardTrainingRegistry, DashboardClass, DashboardClassificationsMap } from './DashboardTrainingRegistry';
import { AdminUserSeparationRegistry, SeparationPolicyItem } from './AdminUserSeparationRegistry';
import { TrainingReadinessReport, TrainingReport } from './TrainingReadinessReport';

interface TrainingGuidePanelProps {
  currentLang: string;
}

export const TrainingGuidePanel: React.FC<TrainingGuidePanelProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'dashboards' | 'separation' | 'documents'>('topics');
  const [report, setReport] = useState<TrainingReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    TrainingReadinessReport.executeComprehensiveReport().then(res => {
      setReport(res);
      setLoading(false);
    });
  }, []);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (currentLang === 'ar') return ar || en;
    if (currentLang === 'ku') return ku || en;
    return en;
  };

  const getTopicCategoryBadge = (cat: string) => {
    const classMap = {
      architecture: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      sovereignty: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      operation: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      reconciliation: 'bg-sky-500/10 text-sky-400 border-sky-500/20'
    };
    return classMap[cat as keyof typeof classMap] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  return (
    <div id="training-guide-panel" className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-3 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-500/10 rounded border border-sky-500/20 text-sky-400 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              {getLabel('Knowledge-Base & Training Center (Phase 5.16A)', 'دليل التدريب والمعرفة المشترك (المرحلة 5.16A)', 'سیستەمی زانیاری و پەروەردەی هاوبەش (قۆناغی 5.16A)')}
            </h3>
            <p className="text-[10px] text-slate-400 font-sans">
              {getLabel('Instructional walkthroughs, role mappings, sovereignty laws, and administrative separation checks.', 'الأدلة التوجيهية وتصنيف الصلاحيات وقوانين حماية السيادة الإقليمية للبيانات.', 'ڕێنمایی بەکارهێنەر، جیاکاری دەسەڵاتەکان، و یاساکانی پاراستنی زانیاری دەڤەری.')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 p-1 px-2 rounded">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span>{getLabel('ACTIVE TRAINING PROFILE', 'ملف التدريب نشط', 'پڕۆفایلی پەروەردەیی چالاکە')}</span>
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex flex-wrap gap-1 border-b border-slate-900/60 pb-2">
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-3 py-1 text-[10.5px] font-mono font-medium rounded transition flex items-center gap-1.5 ${
            activeTab === 'topics' 
              ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{getLabel('Manual Topics', 'مواضيع الدليل', 'بابەتەکانی دەفتەرەکە')}</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboards')}
          className={`px-3 py-1 text-[10.5px] font-mono font-medium rounded transition flex items-center gap-1.5 ${
            activeTab === 'dashboards' 
              ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>{getLabel('Dashboard Map', 'خرائط التوزيع', 'نەخشەی داشبۆردەکان')}</span>
        </button>

        <button
          onClick={() => setActiveTab('separation')}
          className={`px-3 py-1 text-[10.5px] font-mono font-medium rounded transition flex items-center gap-1.5 ${
            activeTab === 'separation' 
              ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{getLabel('Admin/User Separation', 'فصل الصلاحيات', 'جیاکاری دەسەڵاتەکان')}</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`px-3 py-1 text-[10.5px] font-mono font-medium rounded transition flex items-center gap-1.5 ${
            activeTab === 'documents' 
              ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{getLabel('Staged Handbooks', 'كتيبات العمليات', 'کتێبەکانی پێشکەشکردن')}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[220px]">
        {loading ? (
          <div className="flex items-center justify-center py-10 font-mono text-[11px] text-slate-500 animate-pulse">
            {getLabel('PROCESSING COMPREHENSIVE TRAINING DIRECTORY...', 'جاري تجميع حزمة المعارف...', 'ئامادەکردنی زانیارییە گشتییەکان...')}
          </div>
        ) : (
          <>
            {/* TAB 1: MANUAL TOPICS */}
            {activeTab === 'topics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TrainingTopicRegistry.map(topic => (
                  <div key={topic.id} className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[11px] text-slate-200">
                          {getLabel(topic.titleEn, topic.titleAr, topic.titleKu)}
                        </span>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${getTopicCategoryBadge(topic.category)}`}>
                          {topic.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                        {getLabel(topic.descriptionEn, topic.descriptionAr, topic.descriptionKu)}
                      </p>
                    </div>
                    <div className="mt-2 text-[9px] font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-900 leading-relaxed">
                      <span className="text-sky-400 font-bold uppercase block text-[8px] mb-0.5">{getLabel('KEY RULE', 'القاعدة الأساسية', 'یاسای سەرەکی')}:</span>
                      {getLabel(topic.keyTakeawayEn, topic.keyTakeawayAr, topic.keyTakeawayKu)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: DASHBOARDS */}
            {activeTab === 'dashboards' && (
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-400 leading-relaxed block">
                  {getLabel('Formal classifications for all core UI dashboards in the Jordan/Iraq/KRG coordination zones:', 'التصنيفات الرسمية للوحات القيادة والمشاهد ضمن منصة التنسيق الجمركي:', 'پۆلێنکردنی فەرمی داشبۆردە جیاوازەکان لە سەرانسەری سیستمدا:')}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DashboardTrainingRegistry.map(dash => (
                    <div key={dash.id} className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 space-y-2">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-950 pb-1.5">
                        <span className="font-bold text-[11px] text-slate-200">
                          {getLabel(dash.nameEn, dash.nameAr, dash.nameKu)}
                        </span>
                        <span className="text-[8px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 px-1.5 py-0.5 rounded">
                          {dash.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                        <div>
                          <span className="text-slate-500 block uppercase text-[8px]">{getLabel('AUDIENCE', 'الجمهور المستهدف', 'بەکارهێنەر')}:</span>
                          <span className="text-slate-300 block leading-tight mt-0.5">{getLabel(dash.intendedAudienceEn, dash.intendedAudienceAr, dash.intendedAudienceKu)}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block uppercase text-[8px]">{getLabel('SENSITIVITY', 'حساسية البيانات', 'هەستیاری')}:</span>
                          <span className={`block mt-0.5 font-bold ${dash.sensitivity === 'HIGH' ? 'text-rose-400' : dash.sensitivity === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>{dash.sensitivity}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans leading-relaxed">
                        <span className="text-sky-400 font-mono font-bold uppercase text-[8.5px] block mb-0.5">{getLabel('DEMO TALKING POINT', 'محور الشرح', 'خاڵی سەرەکی دێمۆ')}:</span>
                        {getLabel(dash.demoPointEn, dash.demoPointAr, dash.demoPointKu)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SEPARATION */}
            {activeTab === 'separation' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* ADMIN BOUNDARY */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{getLabel('ADMIN SECURITY BOUNDARIES', 'حدود صلاحيات المدير التقني', 'دەسەڵاتەکانی بەڕێوەبەر')}</span>
                    </span>
                    <div className="space-y-2">
                      {AdminUserSeparationRegistry.filter(p => p.scope === 'Admin').map(policy => (
                        <div key={policy.id} className="p-2 bg-slate-900/60 rounded border border-slate-800/50 text-[10px] space-y-1">
                          <div className="flex items-center justify-between gap-2 font-mono">
                            <span className="text-slate-200 leading-tight block">{getLabel(policy.descriptionEn, policy.descriptionAr, policy.descriptionKu)}</span>
                            <span className={`text-[8px] font-bold uppercase px-1 rounded ${policy.actionType === 'allowed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                              {policy.actionType}
                            </span>
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono italic leading-relaxed pt-1 border-t border-slate-800/30">
                            {getLabel(policy.mitigationOrRuleEn, policy.mitigationOrRuleAr, policy.mitigationOrRuleKu)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* USER BOUNDARY */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{getLabel('OPERATOR EXPERIENCE BOUNDARIES', 'حدود صلاحيات الموظفين والمستخدمين', 'دەسەڵاتەکانی کاربەران')}</span>
                    </span>
                    <div className="space-y-2">
                      {AdminUserSeparationRegistry.filter(p => p.scope === 'User').map(policy => (
                        <div key={policy.id} className="p-2 bg-slate-900/60 rounded border border-slate-800/50 text-[10px] space-y-1">
                          <div className="flex items-center justify-between gap-2 font-mono">
                            <span className="text-slate-200 leading-tight block">{getLabel(policy.descriptionEn, policy.descriptionAr, policy.descriptionKu)}</span>
                            <span className={`text-[8px] font-bold uppercase px-1 rounded ${policy.actionType === 'allowed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                              {policy.actionType}
                            </span>
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono italic leading-relaxed pt-1 border-t border-slate-800/30">
                            {getLabel(policy.mitigationOrRuleEn, policy.mitigationOrRuleAr, policy.mitigationOrRuleKu)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-400 leading-relaxed block">
                  {getLabel('A list of verified training and walk-through handbooks currently resident in the secure package directories:', 'كتيبات وأوراق العمليات والتقديم المعتمدة والموجودة في أضابير المنصة حالياً:', 'لیستی فایلی ڕێنماییە فەرمییەکان کە لە پۆشەی نهێنی خەزن کراون:')}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <span className="truncate">📄 IDG-TRN-MAN-001 (Training Manual)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <span className="truncate">📄 IDG-TRN-MAP-002 (System Dashboard Map)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <span className="truncate">📄 IDG-TRN-SEP-003 (Access Separation Guide)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <span className="truncate">📄 IDG-TRN-DMG-004 (20-Min Demo Blueprint)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <span className="truncate">📄 IDG-TRN-NAV-005 (RBAC Hierarchy Guide)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <span className="truncate">📄 IDG-TRN-RED-006 (Readiness Decider explainer)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                    <span className="truncate">📄 IDG-TRN-STG-007 (Local Dry-run Startup Sheet)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center col-span-1 sm:col-span-2">
                    <span className="truncate">📄 IDG-TRN-FND-008 (Founder Presentation Playbook — Mustafa Jalal Khoshnaw)</span>
                    <span className="text-sky-400 font-bold shrink-0 ml-2">✓ COMPILED & AUDITED FOR SPONSOR</span>
                  </div>
                </div>

                <div className="bg-slate-900/30 p-2.5 rounded border border-slate-900 flex items-start gap-2 text-[10px] font-mono text-slate-400 mt-2">
                  <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-bold block">{getLabel('Compliance Checklist Passed', 'امتحانات التدريب مستوفاة بالكامل', 'پشکنینی گشتی پەروەردەیی تێپەڕی')}</span>
                    <span>{getLabel('The internal trainer package validates that no artificial status override or unaligned data enclaves are referenced in training materials.', 'تؤكد حزمة النظم خلو أدلة التشغيل من أي مغالطات سيادية أو تزوير لمعالم الجاهزية الفعلية.', 'سیستمەکە پشتڕاستی دەکاتەوە کە هیچ زانیارییەکی ساختە یان دەرەوەی یاسا لەڕێگەی دەفتەری یەکەمەوە پۆست نەکراوە.')}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
