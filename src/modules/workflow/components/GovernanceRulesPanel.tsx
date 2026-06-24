import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/workflowTranslations';

interface GovernanceRulesPanelProps {
  lang: Language;
}

export const GovernanceRulesPanel: React.FC<GovernanceRulesPanelProps> = React.memo(({
  lang
}) => {
  return (
    <div className="bg-[#0a1523]/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-3.5 text-start">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2 flex items-center gap-1.5 text-start">
        <Sparkles className="text-[#E0A96D] w-4.5 h-4.5" />
        {t(lang, 'governance.title')}
      </h3>
      <p className="text-xs text-slate-405 leading-relaxed font-mono text-start">
        {t(lang, 'governance.subtitle')}
      </p>
      <div className="flex flex-col gap-2.5 text-xs font-mono text-start">
        <div className="bg-slate-900/45 p-2.5 rounded border border-slate-800 text-start">
          <strong className="text-slate-205 block text-[11px] mb-1">
            {t(lang, 'governance.cbiTitle')}
          </strong>
          <p className="text-[10px] text-slate-500 leading-normal">
            {t(lang, 'governance.cbiDesc')}
          </p>
        </div>
        <div className="bg-slate-900/45 p-2.5 rounded border border-slate-800 text-start">
          <strong className="text-slate-205 block text-[11px] mb-1">
            {t(lang, 'governance.cosqcTitle')}
          </strong>
          <p className="text-[10px] text-slate-500 leading-normal">
            {t(lang, 'governance.cosqcDesc')}
          </p>
        </div>
      </div>
    </div>
  );
});

GovernanceRulesPanel.displayName = 'GovernanceRulesPanel';
