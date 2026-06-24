import React, { useState, useEffect } from 'react';
import { 
  Award, ShieldAlert, CheckCircle, Scale, PenTool, CheckSquare, Layers, AlertCircle, FilePlus
} from 'lucide-react';
import { ProcurementRegistry } from '../../../services/procurement/ProcurementRegistry';
import { BidEvaluationEngine } from '../../../services/procurement/BidEvaluationEngine';
import { ContractExecutionEngine } from '../../../services/procurement/ContractExecutionEngine';
import { Tender, Bid } from '../../../services/procurement/ProcurementTypes';

interface BidEvaluationPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function BidEvaluationPanel({ lang, onStateChange }: BidEvaluationPanelProps) {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);

  const loadData = () => {
    const list = ProcurementRegistry.getTenders().filter(t => 
      t.status === 'Published' || t.status === 'Bid Open' || t.status === 'Evaluation' || t.status === 'Awarded'
    );
    setTenders(list);
    if (list.length > 0 && !selectedTenderId) {
      setSelectedTenderId(list[0].id);
    }
    setBids(ProcurementRegistry.getBids());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, [selectedTenderId]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleEvaluate = (tenderId: string) => {
    BidEvaluationEngine.evaluateBids(tenderId, 'Joint Procurement Compliance Board');
    loadData();
    if (onStateChange) onStateChange();
  };

  const handleAward = (tenderId: string, bidId: string) => {
    try {
      BidEvaluationEngine.awardTender(tenderId, bidId, 'Sovereign Treaty Council');
      loadData();
      if (onStateChange) onStateChange();
    } catch (err: any) {
      alert(err.message || 'Award error');
    }
  };

  const handleExecuteContract = (tenderId: string, bidId: string) => {
    try {
      ContractExecutionEngine.executeContract(tenderId, bidId, 'National Contract Governance Authority');
      loadData();
      if (onStateChange) onStateChange();
    } catch (err: any) {
      alert(err.message || 'Execution error');
    }
  };

  const activeTender = tenders.find(t => t.id === selectedTenderId);
  const tenderBids = bids.filter(b => b.tenderId === selectedTenderId);

  return (
    <div className="bg-[#0b1329]/95 border border-slate-800 rounded-xl p-5 text-start flex flex-col gap-5">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-500" />
          {getLabel('Sovereign Bid Evaluation & Compliance Board', 'هيئة تقييم العروض والامتثال المالي', 'لیژنەی هەڵسەنگاندن و وردبینی پێشنیارەکان')}
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">
          {getLabel(
            'Enforce mechanical bid screening. Verify supplier risks, escrow capacity, and intergovernmental compliance.',
            'إنفاذ المراجعة الرقمية المبرمجة للعطاءات. التحقق من مخاطر الموردين والضمانات المالية وسلطة اتخاذ القرار.',
            'جێبەجێکردنی وردبینی دیجیتاڵی بۆ تەندەرەکان. گرەنتی چاودێری مەترسی کۆمپانیاکان و گونجانی باری دارایی.'
          )}
        </p>
      </div>

      {tenders.length === 0 ? (
        <div className="bg-slate-900/20 border border-dashed border-slate-800 p-8 rounded-xl text-center text-slate-400 font-mono text-xs">
          {getLabel('No active tenders are currently awaiting bid evaluation.', 'لا توجد عطاءات نشطة تنتظر التقييم حالياً.', 'هیچ تەندەرێک نییە کە لەم کاتەدا لەژێر هەڵسەنگاندندا بێت.')}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* TENDER LIST SELECTOR (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1">
            <span className="text-[10px] text-slate-500 uppercase font-bold font-mono">TENDERS REQUIRING ASSESSMENT:</span>
            {tenders.map(t => {
              const active = t.id === selectedTenderId;
              const statusStyle = t.status === 'Evaluation'
                ? 'bg-amber-950/40 border-amber-500/20 text-amber-400'
                : t.status === 'Awarded'
                  ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400';

              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTenderId(t.id)}
                  className={`w-full p-3.5 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#122438] border-[#cca553] shadow-md' 
                      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[9px] text-[#cca553] font-bold uppercase">ID: {t.id}</span>
                    <span className={`text-[8px] font-bold uppercase py-0.5 px-1.5 rounded-md ${statusStyle}`}>
                      {t.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white tracking-tight truncate mb-1">
                    {t.title[lang] || t.title.en}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-450">
                    <span>Valuation: <strong>${t.budgetUSD}M USD</strong></span>
                    <span className="text-amber-500 font-bold">{t.bidIds.length} bids filed</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE BID EVALUATION FIELD (8/12) */}
          <div className="lg:col-span-8 bg-slate-900/10 border border-slate-850 p-4 rounded-xl flex flex-col gap-4 font-mono">
            {activeTender ? (
              <>
                {/* HEAD */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-850 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {activeTender.title[lang] || activeTender.title.en}
                    </h3>
                    <div className="flex items-center gap-2.5 text-[11px] text-slate-400 mt-1">
                      <span>Authority: <strong className="text-white">{activeTender.authority}</strong></span>
                      <span>•</span>
                      <span>Category: <strong className="text-white">{activeTender.category}</strong></span>
                    </div>
                  </div>

                  {activeTender.status !== 'Awarded' && activeTender.status !== 'Closed' && (
                    <button
                      onClick={() => handleEvaluate(activeTender.id)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer select-none transition-all"
                    >
                      Audit Bids Compliance
                    </button>
                  )}
                </div>

                {/* BIDS MAP */}
                <div className="space-y-3">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">PROPOSAL ASSESSMENT INDEX</span>
                  
                  {tenderBids.length === 0 ? (
                    <div className="bg-slate-950/40 p-6 rounded-lg text-center text-slate-500 text-xs border border-dashed border-slate-850">
                      No bids submitted to this tender docket. Use the Tender Center tab to file a bid proposal!
                    </div>
                  ) : (
                    tenderBids.map(b => {
                      const scoreColor = b.overallScore >= 80 
                        ? 'text-emerald-400' 
                        : b.overallScore >= 60 
                          ? 'text-amber-400' 
                          : 'text-rose-500';

                      const isCompliant = b.complianceChecked && b.complianceViolations.length === 0;

                      return (
                        <div 
                          key={b.id} 
                          className={`p-3.5 rounded-xl border flex flex-col gap-3 transition-colors ${
                            b.status === 'Awarded'
                              ? 'border-emerald-500/30 bg-emerald-950/15'
                              : b.status === 'Rejected'
                                ? 'border-red-500/10 bg-rose-950/10'
                                : 'border-slate-800 bg-slate-900/10'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-xs font-bold text-white uppercase">{b.vendorName}</h4>
                                <span className="text-[9px] text-slate-500">ID: {b.id}</span>
                              </div>
                              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                                <span>Fee: <strong className="text-white">${b.proposalUSD} Millions USD</strong></span>
                                <span>•</span>
                                <span>Tech score: <strong className="text-white">{b.technicalScore}%</strong></span>
                                <span>•</span>
                                <span>Finance efficiency: <strong className="text-white">{b.financialScore}%</strong></span>
                              </div>
                            </div>

                            {/* COMPOSITE SCORE RATING & ACTIONS */}
                            <div className="flex items-center gap-3 self-start md:self-auto">
                              <div className="text-right">
                                <span className="text-[9px] text-slate-500 uppercase font-slate block font-bold text-[9px]">COMPOSITE MATCH</span>
                                <span className={`text-sm font-bold ${scoreColor}`}>{b.overallScore}%</span>
                              </div>

                              <div className="border-l border-slate-800 pl-3 flex flex-col gap-1">
                                {activeTender.status === 'Evaluation' && isCompliant && b.status !== 'Awarded' && b.status !== 'Rejected' && (
                                  <button
                                    onClick={() => handleAward(activeTender.id, b.id)}
                                    className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] cursor-pointer"
                                  >
                                    Award Tender
                                  </button>
                                )}

                                {b.status === 'Awarded' && activeTender.status === 'Awarded' && (
                                  <button
                                    onClick={() => handleExecuteContract(activeTender.id, b.id)}
                                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] cursor-pointer flex items-center gap-1"
                                  >
                                    <FilePlus className="w-3.5 h-3.5" />
                                    Generate National Contract
                                  </button>
                                )}

                                {b.status === 'Awarded' && (
                                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-950 text-emerald-450 uppercase flex items-center gap-1 border border-emerald-500/20">
                                    ✓ Awarded
                                  </span>
                                )}

                                {b.status === 'Rejected' && (
                                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-950 text-red-400 uppercase flex items-center gap-1 border border-red-500/20">
                                    ☒ Rejected
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* COMPLIANCE WARNINGS */}
                          {b.complianceChecked && (
                            <div className="mt-1 bg-slate-950/60 p-2 rounded-lg border border-slate-900 text-[10px]">
                              {isCompliant ? (
                                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>ALL SOVEREIGN TREATIES AND PROCUREMENT CHECKPOINTS VALIDATED COMPLIANT.</span>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <div className="text-rose-450 font-bold flex items-center gap-1.5 border-b border-slate-900 pb-0.5 mb-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                    <span>REGULATORY TREATY VIOLATIONS ENCOUNTERED:</span>
                                  </div>
                                  {b.complianceViolations.map((viol, idx) => (
                                    <div key={idx} className="text-slate-400 pl-3 relative before:absolute before:left-1 before:top-1 before:w-1 before:h-1 before:bg-red-500 before:rounded-full">
                                      {viol}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <span className="text-slate-400">Please choose a tender from the left list.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
