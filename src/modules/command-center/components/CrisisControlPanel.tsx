import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/ccTranslations';
import { Badge } from '../../../ui';

interface CrisisControlPanelProps {
  lang: Language;
  unresolvedCrisisList: Array<{
    id: string;
    location: string;
    type: string;
    desc: string;
    severity: string;
    timestamp: string;
    actionRequired: string;
  }>;
  crisisResolutionNote: Record<string, string>;
  setCrisisResolutionNote: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleResolveCrisis: (id: string, location: string) => void;
}

export const CrisisControlPanel: React.FC<CrisisControlPanelProps> = React.memo(({
  lang,
  unresolvedCrisisList,
  crisisResolutionNote,
  setCrisisResolutionNote,
  handleResolveCrisis
}) => {
  const translateCrisisType = (type: string) => {
    if (type === 'Hazardous Chemicals') return lang === 'en' ? 'Hazardous Chemicals' : lang === 'ar' ? 'مواد كيميائية خطرة' : 'ماددە کیمیاییە مەترسیدارەکان';
    if (type === 'Severe Vessel Backlog') return lang === 'en' ? 'Severe Vessel Backlog' : lang === 'ar' ? 'تكدس شديد للسفن' : 'کۆبوونەوەی زۆری کەشتییەکان';
    if (type === 'Currency Outflow Risk') return lang === 'en' ? 'Currency Outflow Risk' : lang === 'ar' ? 'مخاطر تدفق العملة للخارج' : 'مەترسی دەرچوونی دراو';
    return type;
  };

  const translateLocation = (loc: string) => {
    if (loc.includes('Trebil')) return lang === 'en' ? 'Trebil Border Compound' : lang === 'ar' ? 'منفذ طريبيل الحدودي' : 'دەروازەی سنووریی ترێبێل';
    if (loc.includes('Umm Qasr')) return lang === 'en' ? 'Umm Qasr Seaport' : lang === 'ar' ? 'ميناء أم قصر' : 'بەندەری ئوم قەسر';
    if (loc.includes('Ibrahim Khalil')) return lang === 'en' ? 'Ibrahim Khalil Crossing' : lang === 'ar' ? 'معبر إبراهيم الخليل' : 'دەروازەی سنووریی ئیبراهیم خەلیل';
    return loc;
  };

  const translateCrisisDesc = (desc: string) => {
    if (desc.includes('18 tons')) {
      return lang === 'en' ? desc : lang === 'ar' ? 'كشف فحص الشحنات عن 18 طناً من المواد الكيميائية دون موافقة وزارة الدفاع للامتثال.' : 'پشکنینی گومرگی ۱٨ تەن ماددەی کیمیایی مەترسیداری نیشانداوە بە بێ مۆری فەرمی وەزارەتی بەرگری.';
    }
    if (desc.includes('Basra')) {
      return lang === 'en' ? desc : lang === 'ar' ? 'أبلغت إدارة ميناء البصرة عن ازدحام مؤقت في الحوض بسبب التقلبات وتراكم السفن.' : 'بەشی ڕێنیشاندەری بەسرە ڕاپۆرتی لەسەر کۆبوونەوەی کاتیی کەشتییەکان داوە بەهۆی کێشەی شەپۆلەکانەوە.';
    }
    if (desc.includes('CBI') || desc.includes('Central trade wire')) {
      return lang === 'en' ? desc : lang === 'ar' ? 'أبلغ نظام الامتثال للبنك المركزي عن تضخم في فواتير الآلات الأوروبية المستوردة بنسبة 410٪.' : 'سیستەمی پابەندبوونی بانکی ناوەندی بەرزبوونەوەی نابەجێی نرخی ئامێرە هاوردەکراوەکانی بە ڕێژەی ٤١٠٪ تۆمار کردووە.';
    }
    return desc;
  };

  const translateActionRequired = (act: string) => {
    if (act.includes('Hold & Alert')) return lang === 'en' ? act : lang === 'ar' ? 'إيقاف وإبلاغ الشرطة العسكرية' : 'ڕاگرتن و ئاگادارکردنەوەی پۆلیسی سەربازی';
    if (act.includes('Deploy AI')) return lang === 'en' ? act : lang === 'ar' ? 'تفعيل نظام الجدولة الذكي' : 'تەنسیقکردنی ڕێڕەوی لۆجستی بە زیرەکی دەستکرد';
    if (act.includes('Initiate CBI')) return lang === 'en' ? act : lang === 'ar' ? 'بدء تحقيق البنك المركزي' : 'دەستپێکردنی پشکنینی دارایی لەلایەن بانکی ناوەندی عێراقەوە';
    return act;
  };

  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
      <div className="border-b border-slate-900 pb-2.5 text-start">
        <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider flex items-center gap-2 text-start">
          <AlertTriangle className="text-amber-500 w-4 h-4 animate-bounce shrink-0" />
          {t(lang, 'crisis.title')}
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-normal text-start">
          {t(lang, 'crisis.sub')}
        </p>
      </div>

      {unresolvedCrisisList.length === 0 ? (
        <div className="bg-emerald-950/20 border border-[#52B788]/20 p-4 rounded text-center text-xs">
          <p className="text-[#52B788] font-bold mb-1">
            {t(lang, 'crisis.resolvedTitle')}
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {t(lang, 'crisis.resolvedDesc')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-start">
          {unresolvedCrisisList.map((crisis) => (
            <div key={crisis.id} className="bg-slate-900 p-4 rounded-lg border border-slate-850 flex flex-col gap-3 text-xs text-slate-300 text-start">
              <div className="flex justify-between items-center w-full">
                <Badge variant={crisis.severity === 'critical' ? 'danger' : 'warning'}>
                  {crisis.severity} • {crisis.timestamp}
                </Badge>
                <strong className="text-slate-500 font-mono text-[9px] shrink-0">{crisis.id}</strong>
              </div>

              <div>
                <h4 className="font-bold text-slate-200">{translateCrisisType(crisis.type)}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{translateLocation(crisis.location)}</p>
                <p className="text-slate-305 leading-relaxed text-[11px] mt-2 bg-slate-950/80 p-2.5 border border-slate-800/45 rounded italic text-start">
                  "{translateCrisisDesc(crisis.desc)}"
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-slate-850/50 text-start">
                <span className="text-[#E0A96D] font-mono uppercase text-[9px] font-bold text-start">
                  {t(lang, 'crisis.target')}{translateActionRequired(crisis.actionRequired)}
                </span>
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    placeholder={t(lang, 'crisis.placeholder')}
                    value={crisisResolutionNote[crisis.id] || ''}
                    onChange={(e) => setCrisisResolutionNote(prev => ({ ...prev, [crisis.id]: e.target.value }))}
                    className="flex-1 bg-[#0b1420] border border-slate-800 rounded px-2.5 py-1 text-[#E0A96D] font-mono text-[10px] placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#E0A96D]"
                  />
                  <button
                    onClick={() => handleResolveCrisis(crisis.id, crisis.location)}
                    className="px-3 py-1 bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold rounded text-[10px] uppercase tracking-wide font-mono transition-all shrink-0 cursor-pointer text-center"
                  >
                    {t(lang, 'crisis.interceptBtn')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

CrisisControlPanel.displayName = 'CrisisControlPanel';
