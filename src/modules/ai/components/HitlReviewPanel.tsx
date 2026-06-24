import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/aiTranslations';
import { HITLIncident, HITLApproval } from '../hooks/useSovereignAI';

interface HitlReviewPanelProps {
  lang: Language;
  hitlList: HITLIncident[];
  hitlApprovals: HITLApproval[];
  handleHITLResolve: (id: string, action: 'APPROVED' | 'REJECTED') => void;
}

export const HitlReviewPanel: React.FC<HitlReviewPanelProps> = React.memo(({
  lang,
  hitlList,
  hitlApprovals,
  handleHITLResolve
}) => {
  const getCheckpointLabel = (chName: string) => {
    if (chName.includes('Umm Qasr')) {
      return lang === 'ku' ? 'بەندەری ئوم قەسری باشوور' : lang === 'ar' ? 'ميناء أم قصر الجنوبي' : 'Umm Qasr Seaport';
    }
    if (chName.includes('Ibrahim Khalil')) {
      return lang === 'ku' ? 'دەروازەی سنووری ئیبراهیم خەلیل' : lang === 'ar' ? 'منفذ إبراهيم الخليل البري' : 'Ibrahim Khalil Border Gate';
    }
    if (chName.includes('Trebil')) {
      return lang === 'ku' ? 'دەروازەی سنووری نێودەوڵەتی ترێبل' : lang === 'ar' ? 'منفذ طريبيل الحدودي البري' : 'Trebil border gate';
    }
    return chName;
  };

  const getCargoLabel = (cargo: string) => {
    if (cargo.includes('Vegetable')) {
      return lang === 'ku' ? 'ڕۆنی ڕووەکی پاڵێوراو' : lang === 'ar' ? 'زيوت نباتية مكررة ومصنعة' : 'Refined Vegetable Oils';
    }
    if (cargo.includes('Wireless')) {
      return lang === 'ku' ? 'سیستەمی گواستنەوەی بێ تەل' : lang === 'ar' ? 'أنظمة ارسال لاسلكي عن بعد' : 'Wireless Telemetry Systems';
    }
    if (cargo.includes('Agricultural')) {
      return lang === 'ku' ? 'دانەوێڵە و کەرەستەی خۆراکی ئاژەڵی' : lang === 'ar' ? 'أعلاف وحبوب زراعية معالجة' : 'Agricultural Feed Strains';
    }
    return cargo;
  };

  // بەشی دیاریکردنی جۆری ناڕێکییەکان بەپێی ستانداردی گومرگی
const getAnomalyLabel = (anomaly: string) => {
  if (anomaly.includes('Weight/volume')) {
    return lang === 'ku'
      ? 'جیاوازیی کێش و قەبارە بە ڕێژەی ٤٢٪ بەراورد بە پێوەرە فەرمییەکان'
      : lang === 'ar'
      ? 'تباين الوزن مقابل الحجم بنسبة ٤٢٪ عن المعايير الجمركية المعتمدة'
      : 'Weight/volume ratio diverges by 42% from standard merchant profiles';
  }
  if (anomaly.includes('Exporter matching')) {
    return lang === 'ku'
      ? 'سەرچاوەی بێتەلی بەکارهێنراو لە لیستی مۆڵەتی وەزارەتی بەرگری تۆمار نەکراوە'
      : lang === 'ar'
      ? 'تم رصد مصدر لاسلكي ثنائي الاستخدام غير مدرج ضمن تصاريح وزارة الدفاع'
      : 'Exporter matching flagged on dual-use RF transmitter registry without MoD seal';
  }
  if (anomaly.includes('Grain checking') || anomaly.includes('Grain inspection')) {
    return lang === 'ku'
      ? 'بەڵگەنامەی پشکنینی تەندروستیی دانەوێڵە لەگەڵ مۆری فەرمیی کشتوکاڵ ناگونجێت'
      : lang === 'ar'
      ? 'عدم تطابق شهادة الفحص الصحي للحبوب مع الختم الرقمي المعتمد'
      : 'Grain inspection certificates mismatch phytosanitary stamp hash';
  }
  return anomaly;
};

  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
      <div className="border-b border-slate-900 pb-2 text-start">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 text-start">
          <ShieldCheck className="text-emerald-400 w-4.5 h-4.5 shrink-0" />
          {t(lang, 'hitl.title')}
        </h3>
        <p className="text-xs text-slate-400 mt-1 text-start">
          {t(lang, 'hitl.subtitle')}
        </p>
      </div>

      {hitlList.length === 0 ? (
        <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded text-center text-xs">
          <p className="text-[#52B788] font-bold mb-1">
            {t(lang, 'hitl.completed')}
          </p>
          <p className="text-[10px] text-slate-400">
            {t(lang, 'hitl.completedSub')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-start">
          {hitlList.map((h) => (
            <div key={h.id} className="bg-slate-900 p-3.5 rounded border border-slate-800 flex flex-col gap-2.5 text-xs text-slate-305 text-start">
              <div className="flex justify-between items-center text-slate-400 font-mono text-[10px] border-b border-slate-800 pb-1.5 w-full">
                <span>{t(lang, 'hitl.incident')} <strong className="text-slate-200">{h.id}</strong></span>
                <span className="text-amber-400 bg-amber-955/40 px-1.5 py-0.5 rounded font-semibold font-mono text-[9px] shrink-0">
                  {t(lang, 'hitl.score')}{h.score}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-100">{getCargoLabel(h.cargo)}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{getCheckpointLabel(h.checkpoint)}</p>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed bg-slate-950/45 p-2 rounded border border-slate-800/60 italic text-start">
                  "{getAnomalyLabel(h.anomaly)}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => handleHITLResolve(h.id, 'APPROVED')}
                  className="py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/20 text-emerald-300 rounded font-semibold font-mono text-[10px] uppercase transition-all cursor-pointer text-center"
                >
                  {t(lang, 'hitl.accept')}
                </button>
                <button
                  onClick={() => handleHITLResolve(h.id, 'REJECTED')}
                  className="py-1.5 bg-red-950 hover:bg-red-900 border border-red-500/20 text-red-300 rounded font-semibold font-mono text-[10px] uppercase transition-all cursor-pointer text-center"
                >
                  {t(lang, 'hitl.reject')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resolved overrides logs ledger */}
      {hitlApprovals.length > 0 && (
        <div className="mt-2 bg-slate-900 p-3 rounded border border-slate-800 text-start">
          <span className="text-[10px] uppercase font-mono text-slate-500 block mb-2 font-bold text-start">
            {t(lang, 'hitl.ledgerTitle')}
          </span>
          <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto text-start">
            {hitlApprovals.map((r, idx) => (
              <div key={idx} className="text-[10px] font-mono text-slate-400 border-b border-slate-800 last:border-0 pb-1.5 last:pb-0 text-start animate-fade-in">
                <div className="flex justify-between items-center text-[#E0A96D] font-bold w-full">
                  <span>{t(lang, 'hitl.mitigated')}{r.id}</span>
                  <span className="text-slate-500 text-[8px]">{t(lang, 'hitl.secured')}</span>
                </div>
                <p className="text-slate-300 mt-0.5 leading-snug">
                  {t(lang, 'hitl.resolutionAction')}
                  <span className={r.action === 'APPROVED' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {r.action === 'APPROVED' ? t(lang, 'hitl.approved') : t(lang, 'hitl.rejected')}
                  </span>
                </p>
                <p className="text-[9px] text-[#425870] mt-0.5">{t(lang, 'hitl.certLabel')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

HitlReviewPanel.displayName = 'HitlReviewPanel';
