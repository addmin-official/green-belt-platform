import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Language } from '../../../types';
import { Button, Badge } from '../../../ui';
import { AccessRequestWorkflow } from '../../../data-fabric';
import { 
  t, 
  translateRole 
} from '../localization/dataFabricTranslations';

export interface GovernanceWorkflowPanelProps {
  lang: Language;
  workflows: AccessRequestWorkflow[];
  executeApprovalSignoff: (wfId: string, approverRole: string, approverName: string) => void;
}

export const GovernanceWorkflowPanel: React.FC<GovernanceWorkflowPanelProps> = React.memo(({
  lang,
  workflows,
  executeApprovalSignoff
}) => {
  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start animate-fade-in">
      <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center font-sans">
        <span className="flex items-center gap-1.5">
          <ShieldAlert className="text-[#E0A96D] w-4.5 h-4.5" />
          {t(lang, 'governance.title')}
        </span>
      </h3>

      <div className="flex flex-col gap-3 font-mono text-xs">
        {workflows.map((wf) => {
          const allApproved = wf.status === 'APPROVED_AND_KEY_GRANTED';
          return (
            <div key={wf.id} className="p-3 bg-slate-900 border border-slate-850 rounded flex flex-col gap-2 leading-normal">
              <div className="flex justify-between items-center border-b border-slate-950 pb-1">
                <span className="text-[#E0A96D] font-bold">{wf.id}</span>
                <Badge variant={allApproved ? 'success' : 'warning'}>
                  {wf.status.replace(/_/g, ' ')}
                </Badge>
              </div>

              <p className="text-slate-200 font-sans text-[11px] leading-snug">
                {t(lang, 'governance.requestor')}
                <strong className="text-white block font-mono">{wf.requestorUsername} ({translateRole(lang, wf.requestorRole)})</strong>
                {t(lang, 'governance.targeting')}
                <strong className="text-cyan-400 font-mono block">{wf.targetDatasetId} ({wf.requiredClassification})</strong>
              </p>

              <p className="text-[10px] text-slate-400 italic bg-slate-950/70 p-1.5 rounded border border-slate-950 leading-relaxed text-start">
                "{wf.justification}"
              </p>

              <div className="flex flex-col gap-1.5 mt-1 border-t border-slate-950 pt-2 text-[10px]">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">
                  {t(lang, 'governance.ministryChain')}
                </span>
                {wf.approversChain.map((step, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-950 p-1.5 px-2.5 rounded text-[10px]">
                    <span className="text-slate-400">{translateRole(lang, step.role)}</span>
                    {step.signed ? (
                      <span className="text-[#52B788] font-bold">
                        {t(lang, 'governance.signed')}{step.name})
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => executeApprovalSignoff(wf.id, step.role, 'Dr. Tariq Al-Jamil')}
                        className="text-[9px] font-bold px-1.5 py-0.5"
                      >
                        {t(lang, 'governance.signBtn')}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

GovernanceWorkflowPanel.displayName = 'GovernanceWorkflowPanel';
export default GovernanceWorkflowPanel;
