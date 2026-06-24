import React from 'react';
import { CheckCircle2, Layers } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/aiTranslations';

interface GovernanceAccordsPanelProps {
  lang: Language;
}

export const GovernanceAccordsPanel: React.FC<GovernanceAccordsPanelProps> = React.memo(({
  lang
}) => {
  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-3 text-start">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-1.5 flex items-center gap-1.5 text-start">
        <Layers className="text-[#E0A96D] w-4.5 h-4.5 shrink-0" />
        {t(lang, 'governance.title')}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed font-sans text-start">
        {t(lang, 'governance.subtitle')}
      </p>
      
      <div className="flex flex-col gap-2.5 mt-1 text-start">
        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-start gap-2 text-start">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-start">
            <p className="font-semibold text-slate-200 text-xs text-start">{t(lang, 'governance.rule1Title')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-normal text-start">{t(lang, 'governance.rule1Desc')}</p>
          </div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-start gap-2 text-start">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-start">
            <p className="font-semibold text-slate-200 text-xs text-start">{t(lang, 'governance.rule2Title')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-normal text-start">{t(lang, 'governance.rule2Desc')}</p>
          </div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-start gap-2 text-start">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-start">
            <p className="font-semibold text-slate-200 text-xs text-[#cad5e1] text-start">{t(lang, 'governance.rule3Title')}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-normal text-[#64748b] text-start">{t(lang, 'governance.rule3Desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

GovernanceAccordsPanel.displayName = 'GovernanceAccordsPanel';
