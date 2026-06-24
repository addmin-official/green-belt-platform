import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { Language } from '../../../types';
import { Button } from '../../../ui';
import { t } from '../localization/dataFabricTranslations';

export interface MdmResolutionPanelProps {
  lang: Language;
  duplicates: any[];
  resolveMdmDuplicate: (dupId: string, action: 'MERGE' | 'REJECT_OUTLIER') => void;
}

export const MdmResolutionPanel: React.FC<MdmResolutionPanelProps> = React.memo(({
  lang,
  duplicates,
  resolveMdmDuplicate
}) => {
  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
      <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center font-sans">
        <span className="flex items-center gap-1.5">
          <ArrowLeftRight className="text-[#E0A96D] w-4.5 h-4.5" />
          {t(lang, 'mdm.title')}
        </span>
      </h3>

      {duplicates.length === 0 ? (
        <span className="text-[11px] text-emerald-400 bg-emerald-950/20 p-3 rounded border border-emerald-900 font-mono inline-block">
          {t(lang, 'mdm.successMessage')}
        </span>
      ) : (
        <div className="flex flex-col gap-3 font-mono text-xs">
          {duplicates.map((dup) => (
            <div key={dup.id} className="p-3 bg-slate-900 border border-slate-850 rounded flex flex-col gap-2">
              <div className="flex justify-between border-b border-slate-950 pb-1 text-[10px] text-slate-400">
                <span>{t(lang, 'mdm.conflictId')}{dup.id}</span>
                <span className="text-amber-400 font-bold">
                  {Math.round(dup.similarityRatio * 100)}% {t(lang, 'mdm.matchSimilarity')}
                </span>
              </div>

              <p className="text-slate-200 font-sans text-[11px] leading-relaxed">
                {t(lang, 'mdm.conflictDetails')}
                <strong className="text-white block font-mono">
                  Babylon Food Imports vs {dup.conflictingSourceId.split('-').slice(-1)}
                </strong>.
              </p>

              <div className="text-[10px] text-slate-500">
                {t(lang, 'mdm.unresolvedAttrs')}{dup.unresolvedFields.join(', ')}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => resolveMdmDuplicate(dup.id, 'MERGE')}
                  className="bg-[#52B788] hover:bg-[#52B788]/90 text-slate-950 font-bold text-[10px] py-1"
                >
                  {t(lang, 'mdm.mergeBtn')}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => resolveMdmDuplicate(dup.id, 'REJECT_OUTLIER')}
                  className="border-slate-800 text-slate-350 hover:bg-slate-950 font-bold text-[10px] py-1"
                >
                  {t(lang, 'mdm.segregateBtn')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

MdmResolutionPanel.displayName = 'MdmResolutionPanel';
export default MdmResolutionPanel;
