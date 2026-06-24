import React, { useState, useEffect } from 'react';
import { 
  History, ShieldAlert, Key, Clipboard, RefreshCw, AlertCircle, FileSpreadsheet, Lock, Check, ToggleLeft, ToggleRight
} from 'lucide-react';
import { ProcurementRegistry } from '../../../services/procurement/ProcurementRegistry';
import { ProcurementPolicy, ProcurementLedgerRecord } from '../../../services/procurement/ProcurementTypes';

interface ProcurementAuditPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function ProcurementAuditPanel({ lang, onStateChange }: ProcurementAuditPanelProps) {
  const [ledger, setLedger] = useState<ProcurementLedgerRecord[]>([]);
  const [policies, setPolicies] = useState<ProcurementPolicy[]>([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  const loadData = () => {
    setLedger(ProcurementRegistry.getLedger());
    setPolicies(ProcurementRegistry.getPolicies());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleTogglePolicy = (policyId: string) => {
    const list = [...policies];
    const index = list.findIndex(p => p.id === policyId);
    if (index !== -1) {
      list[index].active = !list[index].active;
      ProcurementRegistry.savePolicies(list);
      
      ProcurementRegistry.logToLedger(
        'POLICY_STATE_CHANGED',
        'POLICY',
        policyId,
        'Compliance Auditor Desk',
        { active: list[index].active }
      );
      loadData();
      if (onStateChange) onStateChange();
    }
  };

  return (
    <div className="bg-[#0b1329]/95 border border-slate-800 rounded-xl p-5 text-start flex flex-col gap-5">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-500" />
            {getLabel('Sovereign Procurement Ledger & Policy Audit', 'سجل التعاقدات السيادي ومراقبة الامتثال', 'بەرگی گرێبەستی مۆرکراوی نیشتمانی و یاساکانی ڕێکار')}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {getLabel(
              'Audit cryptographically committed contract signatures and govern intergovernmental matching treaties.',
              'التدقيق على التوقيعات الرقمية الملتزم بها وتطبيق معاهدات التنسيق المالي المشترك.',
              'وردبینی واژۆی دیجیتاڵی گرێبەستە نیشتمانییەکان و کۆنترۆڵکردنی یاساکانی دابەشکردنی خەرجی.'
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CONTRACT COOPERATIVE POLICIES (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-[10px] text-slate-500 uppercase font-bold font-mono">SOVEREIGN PROCUREMENT THRESHOLD TREATIES:</span>

          <div className="space-y-3">
            {policies.map(p => {
              const domainVal = p.jurisdiction === 'federal'
                ? 'border-sky-500/20 bg-sky-950/15 text-sky-400'
                : p.jurisdiction === 'krg'
                  ? 'border-emerald-500/20 bg-emerald-950/15 text-emerald-400'
                  : 'border-amber-500/20 bg-amber-950/15 text-amber-400';

              return (
                <div key={p.id} className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl flex flex-col gap-3 font-mono">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-950 pb-1.5 mb-0.5">
                    <span className={`text-[8px] uppercase font-bold py-0.5 px-2 rounded ${domainVal}`}>
                      {p.jurisdiction}
                    </span>
                    
                    <button
                      onClick={() => handleTogglePolicy(p.id)}
                      className="cursor-pointer text-slate-400 hover:text-white transition-colors"
                      title="Toggle Policy Active State"
                    >
                      {p.active ? (
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                          <span>ACTIVE</span>
                          <ToggleRight className="w-5 h-5 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <span>INACTIVE</span>
                          <ToggleLeft className="w-5 h-5 text-slate-650" />
                        </div>
                      )}
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-white tracking-tight text-start">
                    {p.title[lang] || p.title.en}
                  </h3>

                  <div className="text-[11px] text-slate-400">
                    Threshold: <strong className="text-white">${p.thresholdMillionsUSD}M USD</strong>
                    <span className="mx-2 text-slate-650">•</span>
                    Escraw approval check: <strong className="text-white">{p.approvalRequiredBy}</strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">ENFORCED RULES:</span>
                    {p.complianceRules.map((rule, index) => (
                      <div key={index} className="flex items-start gap-1 text-[10px] text-slate-350 leading-snug text-start">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LEDGER STREAM AUDIT TRAIL LOGS (7/12) */}
        <div className="lg:col-span-7 bg-[#050b14]/50 border border-slate-850 p-4 rounded-xl flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#cca553]" />
              SECURE SOVEREIGN PROCUREMENT BLOCK SIGNATURES LEDGER:
            </span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              APPEND_ONLY
            </span>
          </div>

          <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
            {ledger.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs border border-dashed border-slate-850 bg-slate-900/10 rounded-lg">
                No ledger commitments registered yet. Commit an action (e.g. register vendor, submit bid, update milestone) to trigger sovereign ledger hashing blocks.
              </div>
            ) : (
              ledger.map(block => (
                <div key={block.id} className="p-3 rounded-lg border border-slate-900 bg-slate-950/60 flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 text-[9px] text-slate-500 pb-1.5 border-b border-slate-900 leading-none">
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-400 font-bold">{block.action}</span>
                      <span>•</span>
                      <span>Target: <strong className="text-slate-300">{block.entityType} ({block.entityId})</strong></span>
                    </div>
                    <span>{block.timestamp}</span>
                  </div>

                  <div className="text-[10px] text-slate-300">
                    Actor: <strong className="text-white">{block.actor}</strong>
                    <p className="text-[10px] text-slate-450 mt-1 pl-1 bg-slate-900/40 p-1.5 border border-slate-950 break-all rounded max-h-[70px] overflow-y-auto">
                      {block.payload}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[8.5px] bg-[#0c1825] p-1.5 px-2.5 rounded border border-[#cca553]/15 self-start text-[#cca553] font-bold">
                    <Key className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{block.signature}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
