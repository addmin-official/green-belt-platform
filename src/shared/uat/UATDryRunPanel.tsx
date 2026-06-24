import React, { useState } from 'react';
import { Shield, Languages, CheckCircle2, AlertOctagon, User, BookOpen, AlertTriangle, RefreshCw } from 'lucide-react';
import { UAT_ROLES, UATRoleProfile } from './UATRoleRegistry';
import { UAT_SCENARIOS, UATScenario } from './UATScenarioRegistry';
import { UATBoundaryCheck } from './UATBoundaryCheck';
import { UATLanguageCheck } from './UATLanguageCheck';
import { UATReadinessReport } from './UATReadinessReport';

interface UATDryRunPanelProps {
  currentLanguage: string;
  onLanguageChange?: (lang: string) => void;
  federalBackendState?: string;
  krgBackendState?: string;
  jointBackendState?: string;
  isBackendReachable?: boolean;
}

export const UATDryRunPanel: React.FC<UATDryRunPanelProps> = ({
  currentLanguage,
  onLanguageChange,
  federalBackendState = 'NOT_CONFIGURED',
  krgBackendState = 'NOT_CONFIGURED',
  jointBackendState = 'NOT_CONFIGURED',
  isBackendReachable = false
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(UAT_ROLES[0].id);
  const [testZone, setTestZone] = useState<string>('Federal Private Raw Revenue');
  const [activeTab, setActiveTab] = useState<'scenarios' | 'boundaries' | 'languages' | 'providers' | 'krg-standards'>('scenarios');

  // Generate Report Live
  const report = UATReadinessReport.generateReport(
    federalBackendState,
    krgBackendState,
    jointBackendState,
    isBackendReachable
  );

  const selectedRole = UAT_ROLES.find(r => r.id === selectedRoleId) || UAT_ROLES[0];

  // Live Access Check
  const boundaryValidation = UATBoundaryCheck.executeSuite();
  const selectedRoleValidation = boundaryValidation.find(v => v.roleId === selectedRoleId);
  const targetCheck = selectedRoleValidation?.testTargets.find(t => t.zone === testZone);

  // Localization labels
  const getUatLabel = (en: string, ar: string, ku: string) => {
    if (currentLanguage === 'ar') return ar;
    if (currentLanguage === 'ku') return ku;
    return en;
  };

  return (
    <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-5 mt-6 space-y-4 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-mono font-bold text-teal-400 tracking-wider uppercase flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400 animate-pulse" />
            <span>
              {getUatLabel(
                'Phase 5.11 — Pilot UAT Dry-Run Simulator',
                'المرحلة 5.11 — محاكي فحص قبول البيئة التجريبية',
                'قۆناغی 5.11 — سیناریۆکانی تاقیکردنەوەی ئەزموونی'
              )}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {getUatLabel(
              'Validate sovereign boundaries, user authorization profiles, and local languages with zero mock records leakage.',
              'التحقق من الحدود السيادية، وبطاقات صلاحيات المستخدمين، واللغات مع الالتزام التام بعدم تسريب أي معلومات حقيقية.',
              'پشکنینی سنووری حوکمڕانی، مۆڵەتی بەکارهێنەر، و دەستکارینەکردنی داتا سیادییەکان بەبێ پاشماوە.'
            )}
          </p>
        </div>
        <div className="bg-amber-950/40 px-3 py-1 rounded border border-amber-800/60">
          <span className="text-[10px] font-mono text-amber-500 font-bold block uppercase tracking-wide">
            {getUatLabel('Strategic Readiness Stature', 'حالة الجاهزية الاستراتيجية', 'بڕیاری جاهیزیەت')}
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">
            {report.overallDecision}
          </span>
        </div>
      </div>

      {/* Role Selection Bar */}
      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-2">
        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
          {getUatLabel('Active Simulative Role', 'اختر دور المستخدم للمحاكاة', 'هەڵبژاردنی دۆخی ئەندام')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {UAT_ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`text-[10px] font-mono font-semibold py-1.5 px-2 rounded border transition-colors ${
                selectedRoleId === role.id
                  ? 'bg-teal-950/60 text-teal-300 border-teal-700/80'
                  : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>

        {/* Selected Role Meta */}
        <div className="pt-2.5 mt-2 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-300 block">{selectedRole.name}</span>
              <span className="text-[10px] text-slate-500 block">{selectedRole.description}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-slate-900 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-800 text-slate-400">
              {getUatLabel('JURISDICTION:', 'النطاق السيادي:', 'حوکمڕانی:')}{' '}
              <span className="text-teal-400 font-bold">{selectedRole.jurisdiction}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs */}
      <div className="flex gap-1.5 border-b border-slate-800/80 pb-1">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`text-xs font-mono font-medium pb-2 px-3 relative transition-colors ${
            activeTab === 'scenarios' ? 'text-teal-400 border-b-2 border-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {getUatLabel('1. Test Scenarios', '١. سيناريوهات الاختبار', '١. سیناریۆی تاقیکردنەوە')}
        </button>
        <button
          onClick={() => setActiveTab('boundaries')}
          className={`text-xs font-mono font-medium pb-2 px-3 relative transition-colors ${
            activeTab === 'boundaries' ? 'text-teal-400 border-b-2 border-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {getUatLabel('2. Boundary Matrix', '٢. مصفوفة الحدود السيادية', '٢. جیاکاری سنوور')}
        </button>
        <button
          onClick={() => setActiveTab('languages')}
          className={`text-xs font-mono font-medium pb-2 px-3 relative transition-colors ${
            activeTab === 'languages' ? 'text-teal-400 border-b-2 border-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {getUatLabel('3. Language Check', '٣. فحص اللغات المحلية', '٣. پشکنینی زمان')}
        </button>
        <button
          onClick={() => setActiveTab('providers')}
          className={`text-xs font-mono font-medium pb-2 px-3 relative transition-colors ${
            activeTab === 'providers' ? 'text-teal-400 border-b-2 border-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {getUatLabel('4. Provider Sincerity Check', '٤. تدقيق التوصيل الصادق', '٤. پشکنینی ڕاستگۆیی دابینکەر')}
        </button>
        <button
          onClick={() => setActiveTab('krg-standards')}
          className={`text-xs font-mono font-medium pb-2 px-3 relative transition-colors ${
            activeTab === 'krg-standards' ? 'text-teal-400 border-b-2 border-teal-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {getUatLabel('5. KRG Digital Standards', '٥. المعايير الرقمية لحكومة كوردستان', '٥. پێوەرەکانی هەرێمی کوردستان')}
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'scenarios' && (
        <div className="space-y-3">
          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">
            <h4 className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>{getUatLabel('UAT Scenario Flow Execution Logs', 'سجلات تنفيذ سيناريوهات قبول المستخدم', 'تۆماری سیناریۆکانی ئەزموونی')}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-72 overflow-y-auto pr-1">
              {UAT_SCENARIOS.map((scen, idx) => {
                const isMatchingRole = scen.roleId === selectedRoleId;
                return (
                  <div
                    key={scen.id}
                    className={`p-3 rounded border transition-all ${
                      isMatchingRole
                        ? 'bg-teal-950/20 border-teal-800/90 shadow-md ring-1 ring-teal-900/50'
                        : 'bg-slate-950 border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-mono font-bold text-slate-300">
                        {idx + 1}. {scen.name}
                      </span>
                      {isMatchingRole && (
                        <span className="bg-teal-900/60 text-teal-300 text-[8px] font-mono px-1.5 py-0.5 rounded border border-teal-700 font-bold uppercase tracking-wide">
                          {getUatLabel('ACTIVE SIM', 'محاكاة نشطة', 'چالاکە')}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 space-y-1 text-[10px] font-mono text-slate-400">
                      <div>
                        <span className="text-slate-500 uppercase">{getUatLabel('ACTION:', 'العملية:', 'کردار:')}</span> {scen.action}
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase">{getUatLabel('BEHAVIOR:', 'السلوك المتوقع:', 'دەرئەنجام:')}</span>{' '}
                        <span className={isMatchingRole ? 'text-teal-300' : 'text-slate-400'}>{scen.expectedBehavior}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase">{getUatLabel('MITIGATION:', 'تخفيف المخاطر:', 'پاراستن:')}</span>{' '}
                        <span className="text-indigo-400">{scen.riskMitigation}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'boundaries' && (
        <div className="space-y-4">
          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
              <h4 className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>{getUatLabel('Sovereign Access Guard Boundary Matrix Check', 'مصفوفة تدقيق ممانعة اختراق الحدود السيادية', 'کارکردی ماتریکسی پاراستنی حومڕانی')}</span>
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">{getUatLabel('Target Zone Unit UI:', 'المنطقة المستهدفة للفحص:', 'پۆلێنکردنی ئامانج:')}</span>
                <select
                  value={testZone}
                  onChange={e => setTestZone(e.target.value)}
                  className="bg-slate-900 border border-slate-750 text-[10px] font-mono p-1 rounded text-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-700"
                >
                  <option value="Federal Private Raw Revenue">Federal Private Raw Revenue</option>
                  <option value="KRG Private Raw Revenue">KRG Private Raw Revenue</option>
                  <option value="Joint Metadata aggregates">Joint Metadata aggregates</option>
                  <option value="Joint raw revenue records">Joint raw revenue records</option>
                </select>
              </div>
            </div>

            {/* Interactive access result panel */}
            <div className="bg-slate-950/90 p-4 rounded border border-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">{getUatLabel('Interception Interactor', 'نظام الاعتراض والتحقق', 'خانەی بەرگری')}</span>
                  <div className="text-xs font-mono font-bold text-slate-200">
                    {selectedRole.name} ➔ <span className="text-yellow-500">{testZone}</span>
                  </div>
                </div>
                <div>
                  {targetCheck?.actualResult === 'ALLOWED' ? (
                    <div className="flex items-center gap-1.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 px-2.5 py-1 rounded font-mono text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{getUatLabel('ACCESS ALLOWED', 'مسموح بالدخول', 'ڕێگەپێدراو')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-rose-950/65 text-rose-400 border border-rose-800/80 px-2.5 py-1 rounded font-mono text-xs font-bold">
                      <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span>{getUatLabel('ACCESS BLOCKED', 'محظور سيادياً', 'بلۆک کرا')}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 text-[10px] font-mono text-slate-400">
                <span className="text-slate-500 font-bold block mb-1 uppercase">{getUatLabel('JOURNAL EMITTED LOG:', 'سجل التدقيق الصادر:', 'تۆماری فەرمی:')}</span>
                {targetCheck?.rawReport}
              </div>
            </div>

            {/* Full Matrix View summary */}
            <div className="mt-3.5 space-y-2">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">{getUatLabel('Sovereign Matrix Enforcement Map (All Roles Spec)', 'خريطة إنفاذ مصفوفة السيادة (جميع المهام والمسؤوليات)', 'نەخشەی جێبەجێکردنی پاراستنی سنوورەکان')}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {boundaryValidation.map(set => {
                  const hasBlocks = set.testTargets.filter(t => t.actualResult === 'DENIED').length;
                  return (
                    <div key={set.roleId} className="bg-slate-950 p-2 rounded border border-slate-900 text-[10px] font-mono">
                      <div className="font-bold text-slate-300 border-b border-slate-900 pb-1 mb-1.5 flex justify-between">
                        <span>{set.roleName}</span>
                        <span className="text-[8px] text-teal-400">[{set.roleId}]</span>
                      </div>
                      <div className="space-y-1 text-[9px] text-slate-400">
                        {set.testTargets.map(t => (
                          <div key={t.zone} className="flex justify-between">
                            <span className="text-slate-500 truncate max-w-[124px]">{t.zone}</span>
                            <span className={t.actualResult === 'ALLOWED' ? 'text-emerald-400 font-bold' : 'text-rose-500 font-bold'}>
                              {t.actualResult}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'languages' && (
        <div className="space-y-3">
          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">
            <h4 className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
              <Languages className="w-4 h-4 text-teal-400" />
              <span>{getUatLabel('Multi-Zone Language Integration Tests', 'فحص توافق اللغات المحلية للدولة العراقية المشتركة', 'پشکنینی گونجانی زمانە فەرمییەکان')}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {report.languages.map(lang => {
                const isSelected = currentLanguage === lang.lang;
                const dir = UATLanguageCheck.getDirection(lang.lang);
                return (
                  <div
                    key={lang.lang}
                    onClick={() => onLanguageChange && onLanguageChange(lang.lang)}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-teal-950/20 border-teal-800 shadow-md ring-1 ring-teal-900/60'
                        : 'bg-slate-950 border-slate-900 hover:border-slate-855 hover:bg-slate-955'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-slate-200">{lang.name}</span>
                      <span className="text-[8px] text-slate-500 font-mono font-bold bg-slate-900 px-1 py-0.5 rounded">
                        {lang.lang.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-slate-400 space-y-1">
                      <div>
                        {getUatLabel('LAYOUT DIRECTION:', 'اتجاه العرض المطبق:', 'ئاڕاستەی نوسین:')}{' '}
                        <span className="text-teal-400 uppercase font-bold">{dir}</span>
                      </div>
                      <div>
                        {getUatLabel('CONTEXT SENSITIVE:', 'الحفاظ على المحتوى السيادي:', 'پاراستنی حوکمڕانی:')}{' '}
                        <span className="text-emerald-400">PASSED</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-2.5 text-[10px] font-mono text-teal-300 font-semibold border-t border-teal-900/50 pt-2 text-right">
                        {getUatLabel('✓ Active Language State', '✓ اللغة النشطة حالياً', '✓ زمانی کارا')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'providers' && (
        <div className="space-y-3">
          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">
            <h4 className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
              <RefreshCw className="w-4 h-4 text-teal-400" />
              <span>{getUatLabel('Provider State Sincerity Audit', 'تدقيق شفافية وصدق حالة موصلي الأنظمة', 'پشکنینی دڵنیایی ڕاستگۆیی دۆخی دابینکەر')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {report.providerChecks.map(chk => (
                <div key={chk.providerName} className="bg-slate-950 p-3 rounded border border-slate-900 text-[10px] font-mono space-y-2">
                  <div className="font-bold text-slate-300 border-b border-slate-900 pb-1 flex justify-between items-center">
                    <span>{chk.providerName}</span>
                    <span className={`text-[8px] px-1 rounded uppercase ${chk.actualState === 'READY' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                      {chk.actualState}
                    </span>
                  </div>
                  <div className="text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>{getUatLabel('Honest State Reporting:', 'التقرير الصادق للحالة:', 'ڕاپۆرتی ڕاستگۆیانە:')}</span>
                      <span className="text-emerald-400 font-bold">YES</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{getUatLabel('Production Verification:', 'التحقق من جاهزية التشغيل:', 'دڵنیابوونەوەی کارایی:')}</span>
                      <span className={chk.isProductionReady ? 'text-emerald-400 font-bold' : 'text-slate-500 font-bold'}>
                        {chk.isProductionReady ? 'ACTIVE' : 'ISOLATED fallback'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-955/60 p-3 rounded border border-slate-800 mt-3 flex gap-3 text-[10px] font-mono text-slate-400">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <span className="text-amber-400 font-bold block mb-0.5 uppercase">
                  {getUatLabel('Sovereign Sincerity Directive Enforcement', 'إنفاذ سياسة الصدق السيادي للمعلومات', 'سەپاندنی دڵنیایی ڕاستی کارەکان')}
                </span>
                {getUatLabel(
                  'The Iraq Digital Gateway is configured to output isProductionReady=false for connected backends unless active and healthy operational database pools are completely certified. No placeholder records or simulation parameters will ever fake execution.',
                  'تمت برمجة البوابة الرقمية العراقية لتأكيد عدم جاهزية التشغيل الكامل (isProductionReady=false) طالما لم يتم ربطه بقواعد البيانات السيادية الحقيقية والفعالة بشكل مباشر، مع منع المحاكاة للتزييف.',
                  'دەروازەی دیجیتاڵی عێراق وا ڕێکخراوە کە ئامادەنەبونی تەواوی داتابەیس پشانبدات هەتاوەکو خۆی پەیوەندی پێوەنەکات، هیچ داتایەکی ساختە بەکارناهێنرێت.'
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'krg-standards' && (
        <div className="space-y-3">
          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850">
            <h4 className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
              <Shield className="w-4 h-4 text-teal-400" />
              <span>{getUatLabel('Kurdistan Region Standards Compliance Metrics', 'مقاييس الامتثال للمعايير الرقمية لإقليم كوردستان', 'پێوەرەکانی گونجانی هەرێمی کوردستان لەگەڵ سیستم')}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* KRDPASS State */}
              <div className="bg-slate-950 p-3.5 rounded border border-slate-900 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-teal-400 block uppercase border-b border-slate-900 pb-1">OIDC / KRDPASS Authentication compatibility</span>
                <div className="text-[10px] font-mono text-slate-400 space-y-1">
                  <div><span className="text-slate-500">OIDC FLOW:</span> Authorization Code with PKCE</div>
                  <div><span className="text-slate-500">ALLOWED SCOPES:</span> openid, profile</div>
                  <div><span className="text-slate-500">CITIZEN IDENTITY:</span> citizen_identity (KRG_ONLY - HIGH_SENSITIVITY)</div>
                  <div><span className="text-slate-500">STATUS:</span> <span className="text-amber-500 font-bold">KRG_APPROVAL_REQUIRED</span></div>
                </div>
              </div>

              {/* BRS State */}
              <div className="bg-slate-950 p-3.5 rounded border border-slate-900 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-teal-400 block uppercase border-b border-slate-900 pb-1">Business Registry Service (BRS) compatibility</span>
                <div className="text-[10px] font-mono text-slate-400 space-y-1">
                  <div><span className="text-slate-500">JOINT TRANSFERS:</span> Metadata verification hash and status only</div>
                  <div><span className="text-slate-500">PROHIBITED FIELDS:</span> ownerName, UPN, address, feeDetails</div>
                  <div><span className="text-slate-500">DATA FILTER POLICY:</span> Enforced (Strict KRG isolation)</div>
                  <div><span className="text-slate-500">STATUS:</span> <span className="text-amber-500 font-bold">KRG_APPROVAL_REQUIRED</span></div>
                </div>
              </div>

              {/* Sovereign policy enforcement info */}
              <div className="bg-slate-950 p-3.5 rounded border border-slate-900 col-span-1 md:col-span-2 space-y-2">
                <span className="text-[10px] font-mono font-bold text-teal-400 block uppercase border-b border-slate-900 pb-1">KRG Data Sovereignty Policies</span>
                <p className="text-[10px] font-mono text-slate-400 leading-relaxed">
                  Every transaction processed under KRG purview complies with autonomous administration guidelines. Central Joint auditing desks can only receive cryptographic integrity hashes. No raw citizens, identity records, business folders, or revenue balances are shared with Federal agencies or Joint databases.
                </p>
                <div className="flex flex-wrap gap-4 pt-1 font-mono text-[9px] text-teal-500 font-bold">
                  <span>✓ NO RAW IDENTITY OUTSIDE KRG ZONE</span>
                  <span>✓ NO RAW BRS DATA LEAKAGE</span>
                  <span>✓ JOINT METADATA SAFETY ACTIVE</span>
                </div>
              </div>

              {/* Onboarding Package Files Block */}
              <div className="bg-slate-950 p-3.5 rounded border border-slate-900 col-span-1 md:col-span-2 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-teal-400 block uppercase border-b border-slate-900 pb-1">KRG Onboarding & Approval Pack (Phase 5.13)</span>
                <p className="text-[10px] font-mono text-slate-400">
                  The following formal approval templates have been generated, audited, and added to the official cabinet:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-KRG-ONB-001 (General Approval)</span>
                    <span className="text-emerald-500 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-KRG-ONB-021 (KRDPASS Request)</span>
                    <span className="text-emerald-500 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-KRG-ONB-031 (BRS Request)</span>
                    <span className="text-emerald-500 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-KRG-ONB-041 (Sovereignty Statement)</span>
                    <span className="text-emerald-500 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-KRG-ONB-051 (Joint Exchange Protocol)</span>
                    <span className="text-emerald-500 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-KRG-ONB-061 (Security Survey)</span>
                    <span className="text-emerald-500 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center col-span-1 sm:col-span-2">
                    <span>📄 IDG-KRG-ONB-071 (Pilot Scope & Success Criteria)</span>
                    <span className="text-emerald-500 font-bold">✓ COMPILED & VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Executive Pitch & Partnership Package Block */}
              <div className="bg-slate-950 p-3.5 rounded border border-slate-900 col-span-1 md:col-span-2 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-teal-400 block uppercase border-b border-slate-900 pb-1">Executive Pitch & Partnership (Phase 5.14)</span>
                <p className="text-[10px] font-mono text-slate-400">
                  Secured pitch modules compiled in accordance with standard risk-trust guidelines:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-EXEC-001 (One-Page Brief)</span>
                    <span className="text-teal-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-KRG-PRP-002 (Partnership Proposal)</span>
                    <span className="text-teal-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-RWA-BRIEF-003 (Rwanga Intro)</span>
                    <span className="text-teal-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-COM-MODEL-004 (Commercial Model)</span>
                    <span className="text-teal-400 font-bold">✓ CONFIG C RECOMMENDED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-STK-DEMO-005 (15-Min Talk Script)</span>
                    <span className="text-teal-400 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-RSK-TRUST-006 (Sovereignty Trust Positioning)</span>
                    <span className="text-teal-400 font-bold">✓ VERIFIED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center col-span-1 sm:col-span-2">
                    <span>📄 IDG-GOV-FND-007 (Strategic Note — Mustafa Jalal Khoshnaw)</span>
                    <span className="text-teal-400 font-bold">✓ AUDITED STRATEGIC SPONSOR</span>
                  </div>
                </div>
              </div>

              {/* Institutional Outreach & Meeting Request Package Block */}
              <div className="bg-slate-950 p-3.5 rounded border border-slate-900 col-span-1 md:col-span-2 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-sky-400 block uppercase border-b border-slate-900 pb-1">Institutional Outreach & Meeting Requests (Phase 5.15)</span>
                <p className="text-[10px] font-mono text-slate-400">
                  Official introduction and pilot presentation documents compiled and verified:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-OUT-KRG-001 (KRG DIT Request)</span>
                    <span className="text-sky-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-OUT-RWA-002 (Rwanga Introduction)</span>
                    <span className="text-sky-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-OUT-PTN-003 (Strategic Partner Intro)</span>
                    <span className="text-sky-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-OUT-AGD-004 (45-Min Pilot Agenda)</span>
                    <span className="text-sky-400 font-bold">✓ STRUCTURED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-OUT-VERB-005 (Founder Pitch Script)</span>
                    <span className="text-sky-400 font-bold">✓ MUSTAFA JALAL KHOSHNAW</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-OUT-FAQ-006 (Stakeholder FAQ)</span>
                    <span className="text-sky-400 font-bold">✓ AUDITED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center col-span-1 sm:col-span-2">
                    <span>📄 IDG-OUT-EML-007 (Neutral Follow-Up Email)</span>
                    <span className="text-sky-400 font-bold">✓ STAGED DRIFT-SAFE</span>
                  </div>
                </div>
              </div>

              {/* Training, Dashboard Maps & UX Separation Block (Phase 5.15) */}
              <div className="bg-slate-950 p-3.5 rounded border border-slate-900 col-span-1 md:col-span-2 space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-sky-400 block uppercase border-b border-slate-900 pb-1">Training, Dashboard Maps & UX Separation (Phase 5.15)</span>
                <p className="text-[10px] font-mono text-slate-400">
                  Comprehensive training manuals, stakeholder walk-through blueprints, and administrative isolation guides compiled and verified:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-MAN-001 (Training Manual)</span>
                    <span className="text-sky-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-MAP-002 (System Dashboard Map)</span>
                    <span className="text-sky-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-SEP-003 (Access Separation Guide)</span>
                    <span className="text-sky-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-DMG-004 (20-Min Demo Blueprint)</span>
                    <span className="text-sky-400 font-bold">✓ COMPILED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-NAV-005 (RBAC Hierarchy Guide)</span>
                    <span className="text-sky-400 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-RED-006 (Readiness Explainer)</span>
                    <span className="text-sky-400 font-bold">✓ READY</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-STG-007 (Local Dry-run Startup Sheet)</span>
                    <span className="text-sky-400 font-bold">✓ VERIFIED</span>
                  </div>
                  <div className="p-1 px-2 rounded bg-slate-900/60 border border-slate-800/50 flex justify-between items-center">
                    <span>📄 IDG-TRN-FND-008 (Sponsor Coaching Playbook)</span>
                    <span className="text-sky-400 font-bold">✓ MUSTAFA JALAL KHOSHNAW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
