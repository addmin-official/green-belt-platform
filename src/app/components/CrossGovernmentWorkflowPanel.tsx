import React, { useState } from 'react';
import { WorkflowFederationEngine, CrossGovWorkflow } from '../../services/federation/WorkflowFederationEngine';
import { Card, Button, Badge } from '../../ui';
import { Network, Signature, PlayCircle, ShieldCheck, CheckCircle2, XCircle, FileClock } from 'lucide-react';
import { useGovernment } from '../../providers/GovernmentProvider';

interface CrossGovernmentWorkflowPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const CrossGovernmentWorkflowPanel: React.FC<CrossGovernmentWorkflowPanelProps> = ({ lang }) => {
  const { userRole, logAction } = useGovernment();
  const [workflows, setWorkflows] = useState<CrossGovWorkflow[]>(() => 
    WorkflowFederationEngine.getWorkflows()
  );
  
  const [selectedId, setSelectedId] = useState<string>(workflows[0]?.id || '');
  const [rejectReason, setRejectReason] = useState('');

  const activeWf = workflows.find(w => w.id === selectedId) || workflows[0];

  const handleApproveStage = (wfId: string) => {
    const updated = WorkflowFederationEngine.approveWorkflowStage(wfId, `${userRole} (Cryptographic Stamp appended via active PKI Token)`);
    if (updated) {
      logAction(
        userRole,
        `Approved active stage of cross-gov workflow [ID: ${wfId}] successfully.`,
        'FEDERATION_CROSS_GOVERNMENT_WORKFLOW'
      );
      setWorkflows([...WorkflowFederationEngine.getWorkflows()]);
    }
  };

  const handleRejectWorkflow = (wfId: string) => {
    if (!rejectReason.trim()) return;
    const updated = WorkflowFederationEngine.rejectWorkflow(wfId, userRole, rejectReason);
    if (updated) {
      logAction(
        userRole,
        `REJECTED cross-gov workflow [ID: ${wfId}]. Reason: ${rejectReason}`,
        'FEDERATION_CROSS_GOVERNMENT_WORKFLOW'
      );
      setWorkflows([...WorkflowFederationEngine.getWorkflows()]);
      setRejectReason('');
    }
  };

  const t = {
    en: {
      selectLabel: 'Select Sovereign Active Workflow',
      stagesHeader: 'Sequential Cross-Government Transit Stages',
      workflowLog: 'Sovereign Process Audit trail',
      approveBtn: 'Approve Pending Workflow Stage',
      rejectBtn: 'Terminate Workflow Instance',
      reasonPlace: 'State reject comment...',
      constrainedBy: 'Constrained dynamically by Treaty ID',
      stageAssigned: 'Assigned Custodian authority'
    },
    ar: {
      selectLabel: 'اختر العملية الحكومية المشتركة النشطة',
      stagesHeader: 'مراحل التحقق وصياغة المصادقة الدبلوماسية المشتركة',
      workflowLog: 'سجل التدقيق والتوسيع للกระت العملياتي',
      approveBtn: 'صادق على المرحلة المعلقة',
      rejectBtn: 'إلغاء وتجميد مسار العمل الحالي',
      reasonPlace: 'سبب الرفض والاعتراض الفني...',
      constrainedBy: 'مقترن ومقيد تلقائياً بسجل المعاهدة الموحد',
      stageAssigned: 'الجهة المخولة بالتدقيق'
    },
    ku: {
      selectLabel: 'هەڵبژاردنی پڕۆسەی فەرمی هاوبەش',
      stagesHeader: 'قۆناغەکانی جێبەجێکردنی هاوبەش لە نێوان حکومەتەکان',
      workflowLog: 'تۆماری پشکنین و ڕووداوەکانی پڕۆسە',
      approveBtn: 'پەسەندکردنی قۆناغی وەستاو',
      rejectBtn: 'ڕەتکردنەوە و داخستنی پڕۆسە',
      reasonPlace: 'هۆکاری ڕەتکردنەوە بنووسە...',
      constrainedBy: 'بەستراوەتەوە بە شێوەی خودکار بە پەیماننامەی ژمارە',
      stageAssigned: 'فەرمانگەی ڕاسپێردراو لەم قۆناغەدا'
    }
  }[lang];

  return (
    <div id="cross-gov-workflow-orchestration" className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full text-start">
      
      {/* Workflow Navigation side panel */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl flex flex-col gap-3">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Network className="w-4 h-4 text-sky-400" />
            {t.selectLabel}
          </label>

          <div className="flex flex-col gap-2.5 mt-1">
            {workflows.map(wf => (
              <button
                key={wf.id}
                onClick={() => setSelectedId(wf.id)}
                className={`p-3 rounded-lg border text-start transition flex flex-col justify-between cursor-pointer ${
                  selectedId === wf.id
                    ? 'bg-sky-950/45 border-sky-600/80 shadow-[0_0_15px_rgba(3,105,161,0.1)]'
                    : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono text-slate-500">{wf.id}</span>
                  <Badge variant={wf.status === 'COMPLETED' ? 'teal' : wf.status === 'TERMINATED' ? 'rose' : 'gold'}>
                    {wf.status}
                  </Badge>
                </div>
                <div className="text-xs font-sans font-bold text-slate-200 mt-1">
                  {wf.name[lang] || wf.name.en}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Execution Flow center card */}
      {activeWf && (
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl flex flex-col gap-4">
            
            <div className="flex justify-between items-start border-b border-slate-900 pb-3 gap-3">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{t.constrainedBy}: <span className="text-amber-500">{activeWf.treatyConstraintId}</span></span>
                <h3 className="text-base font-bold text-slate-200 mt-0.5">
                  {activeWf.name[lang] || activeWf.name.en}
                </h3>
              </div>
              <Badge variant="teal">STAGE_{activeWf.currentStageIndex + 1}_ACTIVE</Badge>
            </div>

            {/* Stages visualization */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-emerald-400" />
                {t.stagesHeader}
              </span>

              <div className="flex flex-col gap-2.5">
                {activeWf.stages.map((stg, idx) => {
                  const isCurrent = idx === activeWf.currentStageIndex && activeWf.status === 'IN_PROGRESS';
                  return (
                    <div 
                      key={stg.id} 
                      className={`p-3 rounded-lg border transition ${
                        isCurrent 
                          ? 'bg-[#0f1d3a]/60 border-sky-800 shadow-[0_0_12px_rgba(3,105,161,0.12)]' 
                          : stg.status === 'APPROVED' 
                          ? 'bg-[#0f2d11]/20 border-emerald-950' 
                          : 'bg-slate-900/35 border-slate-950 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          {stg.status === 'APPROVED' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : stg.status === 'REJECTED' ? (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-slate-500 flex items-center justify-center text-[8px] font-bold text-slate-400">{idx + 1}</span>
                          )}
                          {stg.label[lang] || stg.label.en}
                        </span>
                        <Badge variant={stg.status === 'APPROVED' ? 'teal' : stg.status === 'REJECTED' ? 'rose' : 'gold'}>
                          {stg.status}
                        </Badge>
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                        <span>{t.stageAssigned}: <strong className="text-slate-300 font-sans">{stg.assignedAuthority}</strong></span>
                        {stg.signatureUsed && (
                          <span className="text-emerald-400 font-mono text-[9px]">SIG: {stg.signatureUsed.slice(0, 35)}...</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage Action Controls */}
            {activeWf.status === 'IN_PROGRESS' && (
              <div className="bg-slate-900/40 p-4 border border-slate-900 rounded-xl flex flex-col gap-3 mt-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Signature className="w-3.5 h-3.5 text-amber-500" />
                  Active Workspace Coordinator: <strong className="text-slate-300">{userRole}</strong>
                </span>

                <div className="flex flex-wrap items-center gap-3 justify-end">
                  <input
                    type="text"
                    className="flex-1 bg-slate-950 border border-slate-800/80 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-sky-500"
                    placeholder={t.reasonPlace}
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                  />

                  <Button
                    variant="sky"
                    className="text-xs"
                    onClick={() => handleApproveStage(activeWf.id)}
                  >
                    {t.approveBtn}
                  </Button>

                  <button
                    disabled={!rejectReason.trim()}
                    onClick={() => handleRejectWorkflow(activeWf.id)}
                    className="px-3 py-1.5 rounded text-xs text-rose-300 bg-rose-950/70 border border-rose-900 hover:bg-rose-900 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {t.rejectBtn}
                  </button>
                </div>
              </div>
            )}

            {/* Process Logs */}
            <div className="flex flex-col gap-2 border-t border-slate-900 pt-3 mt-1 text-xs">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <FileClock className="w-4 h-4" />
                {t.workflowLog}
              </span>
              <div className="bg-slate-950/80 p-3 rounded font-mono text-[10px] text-slate-400 flex flex-col gap-1 max-h-[100px] overflow-y-auto">
                {activeWf.log.map((log_line, idx) => (
                  <div key={idx} className="text-left select-none">• {log_line}</div>
                ))}
              </div>
            </div>

          </Card>
        </div>
      )}

    </div>
  );
};
export default CrossGovernmentWorkflowPanel;
