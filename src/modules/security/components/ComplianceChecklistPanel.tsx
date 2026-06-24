import React from 'react';
import { Layers } from 'lucide-react';
import { Language } from '../../../types';
import { Badge } from '../../../ui';
import { t } from '../localization/securityTranslations';
import { ComplianceItemViewModel } from '../types/securityViewModels';

interface ComplianceChecklistPanelProps {
  lang: Language;
  complianceChecklist: ComplianceItemViewModel[];
}

export const ComplianceChecklistPanel: React.FC<ComplianceChecklistPanelProps> = React.memo(({
  lang,
  complianceChecklist
}) => {
  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
      <h3 className="text-sm font-[650] text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <Layers className="text-[#E0A96D] w-4.5 h-4.5" />
          {t(lang, 'sidebar.compliance.title')}
        </span>
      </h3>

      <div className="flex flex-col gap-3 font-sans text-xs">
        {complianceChecklist.map((c) => (
          <div 
            key={c.code}
            className="bg-slate-900/50 p-3.5 rounded border border-slate-850 hover:border-[#E0A96D]/30 transition-all cursor-pointer text-start"
          >
            <div className="flex justify-between items-center border-b border-slate-950 pb-1.5 mb-1.5">
              <span className="text-[#E0A96D] font-bold text-[10px]">{c.code} — {c.framework}</span>
              <Badge variant="success">✓ {t(lang, 'sidebar.compliance.status')}</Badge>
            </div>
            <strong className="text-slate-200 block text-xs font-sans font-semibold mb-1">{c.name[lang]}</strong>
            <span className="text-[10px] text-slate-500 block leading-snug">{c.level[lang]}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

ComplianceChecklistPanel.displayName = 'ComplianceChecklistPanel';
