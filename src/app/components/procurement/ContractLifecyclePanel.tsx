import React, { useState, useEffect } from 'react';
import { 
  FileText, Activity, AlertCircle, CheckCircle, Sparkles, Sliders, Play, RefreshCw, Layers
} from 'lucide-react';
import { ProcurementRegistry } from '../../../services/procurement/ProcurementRegistry';
import { ContractRegistry } from '../../../services/procurement/ContractRegistry';
import { Contract, Jurisdiction } from '../../../services/procurement/ProcurementTypes';

interface ContractLifecyclePanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function ContractLifecyclePanel({ lang, onStateChange }: ContractLifecyclePanelProps) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [activeContractId, setActiveContractId] = useState<string | null>(null);

  const loadContracts = () => {
    const data = ContractRegistry.getContracts();
    setContracts(data);
    if (data.length > 0 && !activeContractId) {
      setActiveContractId(data[0].id);
    }
  };

  useEffect(() => {
    loadContracts();
    window.addEventListener('storage', loadContracts);
    return () => window.removeEventListener('storage', loadContracts);
  }, [activeContractId]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleMilestoneUpdate = (
    contractId: string, 
    milestoneId: string, 
    progress: number, 
    status: Contract['milestones'][0]['status']
  ) => {
    ContractRegistry.updateMilestoneProgress(
      contractId,
      milestoneId,
      progress,
      status,
      'Sovereign Contract Operations Hub'
    );
    loadContracts();
    if (onStateChange) onStateChange();
  };

  const handleContractStatus = (id: string, status: Contract['status']) => {
    ContractRegistry.updateContractStatus(id, status, 'Contract Board of Directors');
    loadContracts();
    if (onStateChange) onStateChange();
  };

  const activeContract = contracts.find(c => c.id === activeContractId);

  return (
    <div className="bg-[#0b1329]/95 border border-slate-800 rounded-xl p-5 text-start flex flex-col gap-5">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-500" />
          {getLabel('Sovereign Contract Lifecycle Panel', 'لوحة مراقبة وإدارة دورة حياة العقود', 'پانێڵی بەڕێوەبردن و چاودێریکردنی گرێبەستە نیشتمانییەکان')}
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">
          {getLabel(
            'Track milestone deliveries, disburse progressive payments, and audit performance scores.',
            'تتبع تسليم المراحل والمحطات، وصرف الدفعات المرحلية، والتحقق من درجات الأداء.',
            'چاودێریکردنی جێبەجێکردنی قۆناغەکان، خەرجکردنی پارەی تەرخانکراو بەپێی قۆناغ، و گۆڕینی نمرەی کواڵیتی.'
          )}
        </p>
      </div>

      {contracts.length === 0 ? (
        <div className="bg-slate-900/20 border border-dashed border-slate-800 p-8 rounded-xl text-center text-slate-400 font-mono text-xs">
          {getLabel('No executed sovereign contracts currently active in the registry.', 'لا توجد عقود سيادية نشطة حالياً في السجل.', 'هیچ گرێبەستێکی فەرمی واژۆکراو لەم کاتەدا لە تۆمارەکەدا نییە.')}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* CONTRACTS COLUMN/SELECTOR (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold font-mono">CONSOLIDATED LIST OF SYSTEM CONTRACTS:</span>
            {contracts.map(c => {
              const active = c.id === activeContractId;
              const statusStyle = c.status === 'Active'
                ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400'
                : c.status === 'Disputed'
                  ? 'bg-red-950/30 border-red-500/10 text-rose-450'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400';

              const progressPct = c.milestones.length > 0 
                ? Math.round(c.milestones.reduce((sum, m) => sum + m.progress, 0) / c.milestones.length)
                : 0;

              return (
                <button
                  key={c.id}
                  onClick={() => setActiveContractId(c.id)}
                  className={`w-full p-3.5 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#122438] border-[#cca553] shadow-md' 
                      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[9px] text-[#cca553] font-bold uppercase tracking-tight">ID: {c.id}</span>
                    <span className={`text-[8px] font-bold uppercase py-0.5 px-1.5 rounded-md ${statusStyle}`}>
                      {c.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white tracking-tight truncate mb-2">
                    {c.title[lang] || c.title.en}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-350">
                    <div>
                      <span className="text-[9px] text-slate-500 block">VALUE PROPOSAL</span>
                      <span className="text-emerald-400 font-bold">${c.valueUSD}M USD</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-500 block">TOTAL DISBURSED</span>
                      <span className="text-slate-300 font-bold">${c.spentUSD.toFixed(1)}M USD</span>
                    </div>
                  </div>

                  {/* MINI BAR */}
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-[8px] text-slate-500 uppercase font-bold mb-1">
                      <span>AVERAGE PROGRESSION</span>
                      <span className="text-[#cca553]">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1 border border-slate-900 overflow-hidden">
                      <div className="bg-amber-500 h-full transition-all" style={{ width: `${progressPct}%` }}></div>
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-500 mt-2 flex items-center justify-between border-t border-slate-950 pt-2">
                    <span>{c.vendorName}</span>
                    <span className="uppercase text-[8px] py-0.5 px-1 bg-slate-950/45 text-slate-400 rounded">
                      {c.jurisdiction}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CONTRACT DETAIL INTERACTIVE HUB (8/12) */}
          <div className="lg:col-span-8 bg-slate-900/10 border border-slate-850 p-4 rounded-xl flex flex-col gap-4 font-mono">
            {activeContract ? (
              <>
                {/* CONTRACT DETAILS MINI-HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-850 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {activeContract.title[lang] || activeContract.title.en}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-400 mt-1">
                      <span>Vendor partner: <strong className="text-white">{activeContract.vendorName}</strong></span>
                      <span className="text-slate-650">•</span>
                      <span>Issuing Desk: <strong className="text-white">{activeContract.authority}</strong></span>
                    </div>
                  </div>

                  {/* Status update picker */}
                  <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-850 self-start md:self-auto">
                    <span className="text-[9px] text-slate-500 uppercase font-bold">STATUS SET:</span>
                    {(['Active', 'Disputed', 'Completed', 'Terminated'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => handleContractStatus(activeContract.id, st)}
                        className={`text-[9.5px] px-1.5 py-0.5 rounded font-bold cursor-pointer transition-all ${
                          activeContract.status === st
                            ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/20 font-bold shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* OVERALL METRIC BLOCKET */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950/40 p-3 rounded-lg border border-slate-900 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">SIGNING TIME</span>
                    <span className="text-[#cca553] font-bold">{activeContract.signingDate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">FINANCES DISBURSEMENT</span>
                    <span className="text-emerald-400 font-bold">${activeContract.spentUSD.toFixed(2)}M / ${activeContract.valueUSD}M USD</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">REMAINING ESCROW</span>
                    <span className="text-slate-300 font-bold">${(activeContract.valueUSD - activeContract.spentUSD).toFixed(2)}M USD</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">PERFORMANCE RATING</span>
                    <span className={`font-bold font-mono text-[13px] ${activeContract.performanceScore >= 75 ? 'text-emerald-400' : activeContract.performanceScore >= 50 ? 'text-amber-400' : 'text-red-500 animate-pulse'}`}>
                      {activeContract.performanceScore}%
                    </span>
                  </div>
                </div>

                {/* MILESTONE INTERACTIVE COMPILATION */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      COOPERATIVE MILESTONES & FUNDS DISPATCH TRIGGERS:
                    </span>
                    <span className="text-[9px] text-[#cca553]">Values are matched automatically</span>
                  </div>

                  {activeContract.milestones.map(m => {
                    const mColor = m.status === 'Approved'
                      ? 'border-emerald-500/20 bg-emerald-950/10 text-emerald-400'
                      : m.status === 'Delayed'
                        ? 'border-red-500/20 bg-rose-950/10 text-rose-455'
                        : 'border-slate-800 bg-slate-900/10 text-slate-100';

                    return (
                      <div key={m.id} className={`p-3.5 rounded-xl border flex flex-col gap-3 transition-colors ${mColor}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-[#cca553] font-bold block">WEIGHT: {m.weight}% OF ESCROW VALUATION (${(activeContract.valueUSD * m.weight / 100).toFixed(2)}M)</span>
                            <span className="text-xs font-bold text-white block">
                              {m.description[lang] || m.description.en}
                            </span>
                            <span className="text-[9px] text-slate-450 block">Target delivery date: {m.dueDate}</span>
                          </div>

                          {/* Milestone control form */}
                          <div className="flex items-center gap-2 bg-slate-950/80 p-2 rounded-lg border border-slate-850 self-start md:self-auto select-none">
                            <span className="text-[9px] text-slate-500 font-bold uppercase">STATUS:</span>
                            {(['Pending', 'Approved', 'Delayed'] as const).map(ms => (
                              <button
                                key={ms}
                                onClick={() => {
                                  // Auto set 100% progress when marking approved
                                  const targetProg = ms === 'Approved' ? 100 : m.progress;
                                  handleMilestoneUpdate(activeContract.id, m.id, targetProg, ms);
                                }}
                                className={`text-[9px] px-1.5 py-0.5 rounded font-bold cursor-pointer transition-all ${
                                  m.status === ms
                                    ? ms === 'Approved' 
                                      ? 'bg-emerald-500 text-white' 
                                      : ms === 'Delayed' 
                                        ? 'bg-red-600 text-white animate-pulse' 
                                        : 'bg-slate-700 text-white'
                                    : 'text-slate-450 hover:text-white'
                                }`}
                              >
                                {ms}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Slide progression input bar */}
                        {m.status !== 'Approved' && (
                          <div className="flex items-center gap-3 bg-slate-950/40 p-2 rounded-lg border border-slate-900">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-[9px] text-slate-500 mb-1">
                                <span className="uppercase font-bold">MANUAL PROGRESS CONTROL:</span>
                                <span className="text-white font-bold">{m.progress}%</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer focus:outline-none"
                                value={m.progress}
                                onChange={e => {
                                  const progVal = parseInt(e.target.value);
                                  const computedStatus = progVal === 100 ? 'Approved' : m.status;
                                  handleMilestoneUpdate(activeContract.id, m.id, progVal, computedStatus as any);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <span className="text-slate-400">Please choose a contract from the left selector list.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
