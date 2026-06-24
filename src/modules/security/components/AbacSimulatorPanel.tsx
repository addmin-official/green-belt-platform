import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Language } from '../../../types';
import { SectionHeader } from '../../../ui';
import { ClearanceLevel } from '../../../security';
import { 
  t, 
  translateRole, 
  translateClearance, 
  translateMinistry, 
  translateDenialReason 
} from '../localization/securityTranslations';

interface AbacSimulatorPanelProps {
  lang: Language;
  simSubjectId: string;
  setSimSubjectId: (id: string) => void;
  simPermission: string;
  setSimPermission: (perm: string) => void;
  simResourceRequiredClearance: ClearanceLevel;
  setSimResourceRequiredClearance: (clr: ClearanceLevel) => void;
  simResourceMinistry: string;
  setSimResourceMinistry: (ministry: string) => void;
  simDeviceVerified: boolean;
  setSimDeviceVerified: (verified: boolean) => void;
  simRiskScore: number;
  setSimRiskScore: (score: number) => void;
  simResult: any;
  employeeProfiles: any;
}

export const AbacSimulatorPanel: React.FC<AbacSimulatorPanelProps> = React.memo(({
  lang,
  simSubjectId,
  setSimSubjectId,
  simPermission,
  setSimPermission,
  simResourceRequiredClearance,
  setSimResourceRequiredClearance,
  simResourceMinistry,
  setSimResourceMinistry,
  simDeviceVerified,
  setSimDeviceVerified,
  simRiskScore,
  setSimRiskScore,
  simResult,
  employeeProfiles
}) => {
  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4 animate-fade-in">
      <SectionHeader 
        title={t(lang, 'abac.section.title')}
        description={t(lang, 'abac.section.desc')}
      />

      <div className="bg-[#0b1420] p-4.5 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Simulator Subject selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-sans text-[#E0A96D] uppercase font-bold">
            {t(lang, 'abac.steps.targetId')}
          </label>
          <select
            value={simSubjectId}
            onChange={(e) => setSimSubjectId(e.target.value)}
            className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-sans text-white focus:outline-none focus:border-[#E0A96D]"
          >
            <option value="emp-pmo-001">
              {lang === 'en' ? 'Dr. Tariq (PM Office - Super Admin)' : lang === 'ar' ? 'د. طارق (رئاسة الوزراء - مدير عام)' : 'د. تاریق (نوسینگەی سەرۆک وەزیران - گشتی)'}
            </option>
            <option value="emp-customs-011">
              {lang === 'en' ? 'Col. Haider Jasim (Finance - Customs Admin)' : lang === 'ar' ? 'العقيد حيدر جاسم (المالية - مدير الجمارك)' : 'عەقید حەیدەر جاسم (دارایی - سەرپەرشتیاری گومرگ)'}
            </option>
            <option value="emp-border-022">
              {lang === 'en' ? 'Aras Karwan (KRG Security - Border Officer)' : lang === 'ar' ? 'أراس كروان (أمن الإقليم - ضابط الحدود)' : 'ئاراس کاروان (ئاسایشی هەرێم - ئەفسەری سنوور)'}
            </option>
            <option value="emp-intel-007">
              {lang === 'en' ? 'Nassim Al-Sadr (NSA - Intelligence Analyst)' : lang === 'ar' ? 'نسيم الصدر (الأمن الوطني - محلل استخباراتي)' : 'نەسیم ئەلسەدر (ئاسایشی نیشتمانیی - شیکەرەوە)'}
            </option>
          </select>
          <div className="bg-slate-900 p-2.5 rounded text-[11px] text-slate-400 font-sans leading-[1.8]">
            {t(lang, 'abac.profile.role')}: <span className="text-white font-bold">{translateRole(lang, employeeProfiles.getEmployeeProfile(simSubjectId)?.role || '')}</span><br />
            {t(lang, 'abac.profile.clearance')}: <span className="text-[#E0A96D] font-bold">{translateClearance(lang, employeeProfiles.getEmployeeProfile(simSubjectId)?.clearance || '')}</span><br />
            {t(lang, 'abac.profile.lineage')}: <span className="text-slate-300">{translateMinistry(lang, employeeProfiles.getEmployeeProfile(simSubjectId)?.ministry || '')}</span>
          </div>
        </div>

        {/* Resource requirement settings */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-sans text-[#E0A96D] uppercase font-bold">
            {t(lang, 'abac.steps.targetAsset')}
          </label>
          <select
            value={simPermission}
            onChange={(e) => setSimPermission(e.target.value)}
            className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-sans text-white focus:outline-none focus:border-[#E0A96D] mb-1.5"
          >
            <option value="APPROVE_CLEARANCE">APPROVE_CLEARANCE ({lang === 'en' ? 'Sign border passage' : lang === 'ar' ? 'توقيع تصريح المرور' : 'واژۆکردنی مۆڵەتی سنوور'})</option>
            <option value="OVERRIDE_RISK_HOLD">OVERRIDE_RISK_HOLD ({lang === 'en' ? 'Bypass threat holds' : lang === 'ar' ? 'تجاوز حظر التهديدات' : 'مۆری بێ متمانەیی دەکات'})</option>
            <option value="EXPORT_AUDIT_LOGS">EXPORT_AUDIT_LOGS ({lang === 'en' ? 'Download security databases' : lang === 'ar' ? 'تنزيل قواعد البيانات الأمنية' : 'داگرتنی داتابەیسی تۆمارەکان'})</option>
            <option value="VIEW_SECURITY_METRICS">VIEW_SECURITY_METRICS ({lang === 'en' ? 'Inspect system health' : lang === 'ar' ? 'فحص جاهزية النظام' : 'بینینی ئاستی ئاسایشی سیستم'})</option>
          </select>
          
          <div className="grid grid-cols-2 gap-2">
            <select
              value={simResourceRequiredClearance}
              onChange={(e) => setSimResourceRequiredClearance(e.target.value as ClearanceLevel)}
              className="bg-[#111e2e] border border-slate-800 rounded p-1.5 text-[11px] font-sans text-white focus:outline-none"
            >
              <option value="UNCLASSIFIED">{lang === 'en' ? 'UNCLASSIFIED req' : lang === 'ar' ? 'مطلوب: عام' : 'داواکراو: ئاشکرا'}</option>
              <option value="CONFIDENTIAL">{lang === 'en' ? 'CONFIDENTIAL req' : lang === 'ar' ? 'مطلوب: خاص' : 'داواکراو: تایبەت'}</option>
              <option value="SECRET">{lang === 'en' ? 'SECRET req' : lang === 'ar' ? 'مطلوب: سري' : 'داواکراو: نهێنی'}</option>
              <option value="SOVEREIGN">{lang === 'en' ? 'SOVEREIGN req' : lang === 'ar' ? 'مطلوب: سيادي' : 'داواکراو: سەروەر'}</option>
            </select>

            <select
              value={simResourceMinistry}
              onChange={(e) => setSimResourceMinistry(e.target.value)}
              className="bg-[#111e2e] border border-slate-800 rounded p-1.5 text-[11px] font-sans text-white focus:outline-none"
            >
              <option value="Ministry of Finance">{lang === 'en' ? 'Affiliated: Finance' : lang === 'ar' ? 'الجهة المالك: المالية' : 'خاوەندارێتی: دارایی'}</option>
              <option value="Prime Minister Office">{lang === 'en' ? 'Affiliated: PM Office' : lang === 'ar' ? 'الجهة المالك: الوزراء' : 'خاوەندارێتی: سەرۆک وەزیران'}</option>
              <option value="National Security Agency">{lang === 'en' ? 'Affiliated: NS Agency' : lang === 'ar' ? 'الجهة المالك: الأمن الوطني' : 'خاوەندارێتی: ئاسایشی نیشتمانی'}</option>
              <option value="Ministry of Defense">{lang === 'en' ? 'Affiliated: Defense (Dual-use)' : lang === 'ar' ? 'الجهة المالك: الدفاع' : 'خاوەندارێتی: بەرگری'}</option>
            </select>
          </div>
        </div>

        {/* Threat context settings */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-sans text-[#E0A96D] uppercase font-bold">
            {t(lang, 'abac.steps.environment')}
          </label>
          
          <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded">
            <span className="text-[10px] text-slate-400 font-sans">
              {t(lang, 'abac.profile.hardwareMatch')}
            </span>
            <input 
              type="checkbox" 
              checked={simDeviceVerified} 
              onChange={(e) => setSimDeviceVerified(e.target.checked)}
              className="accent-[#E0A96D] cursor-pointer"
            />
          </div>

          <div className="flex flex-col p-1.5 bg-slate-900 border border-slate-800 rounded gap-1">
            <div className="flex justify-between text-[10px] font-sans text-slate-400">
              <span>
                {t(lang, 'abac.profile.threatScore')}
              </span>
              <span className="text-white font-bold font-sans">{simRiskScore}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={simRiskScore} 
              onChange={(e) => setSimRiskScore(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded accent-[#E0A96D] cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Result UI */}
      {simResult && (
        <div 
          className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in ${
            simResult.allowed 
              ? 'bg-emerald-950/20 border-[#52B788]/35 text-emerald-100' 
              : 'bg-red-950/20 border-red-500/30 text-red-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {simResult.allowed ? (
              <CheckCircle2 className="w-8 h-8 text-[#52B788] shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-bold text-sm tracking-wide font-mono uppercase">
                {t(lang, 'abac.outcome.decision')}: {simResult.allowed ? t(lang, 'abac.outcome.granted') : t(lang, 'abac.outcome.blocked')}
              </h4>
              {!simResult.allowed && (
                <p className="text-xs text-red-400 font-mono font-bold mt-1">
                  {t(lang, 'abac.outcome.reason')}: {translateDenialReason(lang, simResult.denialReason)}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {simResult.appliedPolicies.map((p: string, idx: number) => (
                  <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[9px] px-2 py-0.5 rounded">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] text-slate-400 leading-normal shrink-0">
            {t(lang, 'abac.outcome.blockHash')}:<br />
            <span className="text-[#E0A96D] text-[9px]">{simResult.evaluationTimestamp.slice(0, 8)}...</span><br />
            {t(lang, 'abac.outcome.syncedAt')} {simResult.evaluationTimestamp.slice(11, 19)}
          </div>
        </div>
      )}
    </div>
  );
});

AbacSimulatorPanel.displayName = 'AbacSimulatorPanel';
