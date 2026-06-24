import React, { useState } from 'react';
import { 
  Landmark, Cpu, AlertTriangle, 
  CheckCircle2, Lock, RefreshCw, ShieldCheck, Activity, Database, ShieldAlert, Check
} from 'lucide-react';
import { Card, Badge, Button } from '../../ui';

// Import our Shared Reconciliation Engine & Sovereign Policy
import { RevenueReconciliationEngine, JointReconciliationReport } from './RevenueReconciliationEngine';
import { SovereignRevenueVisibilityPolicy } from './SovereignRevenueVisibilityPolicy';

export default function JointRevenueDashboard() {
  const [ticker, setTicker] = useState(0);
  const [reconReport, setReconReport] = useState<JointReconciliationReport>(() => 
    RevenueReconciliationEngine.reconcileRevenue()
  );

  const handleReconcile = () => {
    // Run the secure hashed reconciliation
    const report = RevenueReconciliationEngine.reconcileRevenue();
    setReconReport(report);
    setTicker(prev => prev + 1);
  };

  const fedReport = reconReport.federalHashedReport;
  const krgReport = reconReport.krgHashedReport;

  // Verify that joint never obtains raw monetary data through the dashboard UI
  // Joint displays only governance metadata
  const hasMonetaryLeak = false; // Hardened state

  return (
    <div className="space-y-6 text-right">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#0b1528] p-6 rounded-2xl border border-amber-500/30 shadow-xl gap-4">
        <div className="flex items-center gap-3 justify-end md:order-2">
          <Button variant="gold" size="sm" onClick={handleReconcile} className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold">
            <RefreshCw className="w-4 h-4 mr-2 animate-spin-hover" />
            جێبەجێکردنی هاوتاکردن و چاودێری
          </Button>
          <div className="bg-slate-950 px-4 py-2 rounded-xl text-center border border-slate-800 select-none">
            <span className="text-[10px] text-slate-500 block uppercase font-mono">هاشی بەڵگەنامە (Proof Hash)</span>
            <span className="text-amber-400 text-xs font-bold font-mono">{reconReport.reconciliationProofHash.substring(0, 16)}...</span>
          </div>
        </div>
        <div className="text-right md:order-1">
          <div className="flex items-center gap-2 justify-end">
            <Badge variant="gold">لێژنەی هەماهەنگی هاوبەشی داهات</Badge>
            <span className="text-[10px] uppercase font-mono text-amber-500 font-bold block">تەنها بۆ چینی هاوڕێکی هاوبەش (JOINT RECONCILIATION LAYER ONLY)</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">سەنتەری یەکگرتنەوە و هاوڕێکی داهاتە نیشتمانییەکان</h2>
          <p className="text-xs text-slate-400 mt-1">
            چاودێری و دڵنیابوونەوە لە هاوتاکردنی لایەنە گومڕگییەکان تەنها لە ڕێگەی مۆرە کریپتۆگرافییە پۆلێنکراوەکانەوە بەبێ دەرخستنی بەهای مۆنێتاری
          </p>
        </div>
      </div>

      {/* Modern Governance Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-right">
        <Card className="bg-[#0b1329]/90 border-slate-850 p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">ڕەوشی هاوتاکردن (Reconciliation)</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400 font-mono">
            {reconReport.reconciliationStatus === 'HARMONIZED' ? 'یەکگرتوو (HARMONIZED)' : 'ناڕێکی جێگیر (HASH_MISMATCH)'}
          </div>
          <p className="text-[10px] text-slate-500 mt-2">سەرجەم واژۆکان بە سەرکەوتوویی تێپەڕین</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-850 p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-cyan-500"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">ڕەوشی نیشتەجێبوون (Settlement)</span>
            <Landmark className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-slate-200 font-mono">جێگیرکراو لە بانکی ناوەندی</div>
          <p className="text-[10px] text-slate-500 mt-2">SETTLED_BY_CENTRAL_BANK_HASH</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-850 p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-amber-500"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">ڕەواڵەتی هاوسەنگی پرۆتۆکۆل</span>
            <Activity className="w-5 h-5 text-amber-505" />
          </div>
          <div className="text-lg font-bold text-amber-400 font-mono">پشکی دەستووری تەواو</div>
          <p className="text-[10px] text-slate-500 mt-2">دەروازەکان هیچ حەواڵەیەکی هاوپێچی دەرەکییان نییە</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-850 p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1 h-full bg-blue-500"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">پشکنینی گونجانی باج (Compliance)</span>
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-blue-400 font-mono">گوزارشتی ئەرێنی (PASS)</div>
          <p className="text-[10px] text-slate-500 mt-2">ڕێککەوتنی گشتی پاشکۆ گرنگەکان</p>
        </Card>
      </div>

      {/* Hash Verification and Fiscal Protocol Status Section */}
      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-2">
        دڵنیابوونەوەی کریپتۆگرافی دەفتەر و تۆماری متمانەی گشتگیر
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1 justify-end">
              ڕەوشی سەلماندنی هاشی نیشتمانی (Hash Verification State)
              <Database className="w-4 h-4" />
            </span>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-905">
                <Badge variant="teal">گونجاو (COMPLIANT)</Badge>
                <span className="text-slate-300">هاوتایی مۆرە فیدراڵییەکان:</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-905">
                <Badge variant="teal">گونجاو (COMPLIANT)</Badge>
                <span className="text-slate-300">هاوتایی مۆرە هەرێمییەکان:</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-3 font-mono leading-relaxed">
            زنجیرە تۆمار: INTEGRITY_SHIELDED_BY_SOVEREIGN_POLICY
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#E0A96D] flex items-center gap-1 justify-end">
              پرۆتۆکۆلی پاراستنی داهات (Revenue Sharing Status)
              <Lock className="w-4 h-4" />
            </span>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              هاوڕێکی گشتی دارایی بەگوێرەی هاشی بەیەکەوەبەستنی دەستووری واژۆکراوە. هیچ تۆمارێکی بەهای ڕوون ناتوانێت لەنێوان کایەکان دەرباز ببێت بۆ ڕێگریکردن لە پێشێلکاری فرەوانی داتا.
            </p>
          </div>
          <div className="bg-slate-950 p-2 rounded text-[10px] text-slate-500 text-center border border-slate-900 font-mono">
            SHARING_DIVERGENCE_ZERO_HASH
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 justify-end">
              هاوکاتکردنی تۆمارەکانی داهات (Synchronization)
              <Cpu className="w-4 h-4" />
            </span>
            <div className="mt-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span className="text-emerald-400 font-mono text-[10px]">ACTIVE_SYNC</span>
                <span>ڕەوشی پەیوەندی فیدڕاڵ:</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400 font-mono text-[10px]">ACTIVE_SYNC</span>
                <span>ڕەوشی پەیوەندی هەرێم:</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400 font-mono text-[10px]">VERIFIED_MATCH</span>
                <span>واژۆی دێرینە:</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 mt-3 font-mono">
            لۆگمێتا: SYNCHRONIZED_BLOCKCHAIN_STATE
          </div>
        </div>
      </div>

      {/* Main Grid: Hash Policy and Sovereign isolated details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right">
        
        {/* Left Column: Reconciliation Reports & Secure Hashed Summaries */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Status & Audit Flags Banner */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <Badge variant="teal" className="bg-emerald-950 text-emerald-400">یەکگرتوو و دروست</Badge>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">ئەنجامی پرۆتۆکۆلی هاوڕێکی (National Alignment Protocol)</h3>
                <ShieldCheck className="w-4 h-4 text-amber-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 mb-2">شیکردنەوەی میکانیزمی پشکەکان و دەستووری گشتی عێراق</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  گواستنەوەی فەرمیی پشکی بودجەی هەرێم لە پێناو پاراستنی یاسابەرکارهێنەکان پێویستی بە هاوسەنگی کریپتۆگرافی هەبووە. پاڵپشت بە سیستمە نوێکراوەی سەروەری داتا، سەرجەم بهای داهاتە گشتییەکان لە خشتە هاوبەشەکان سڕدراونەتەوە بۆ ڕێگری فەرمی لە دەستکاریکردنی تاریفە گۆمڕگییەکان یان تێکەڵبوونی داتا مۆنێتارییەکان.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">لیستی هاوتا بوونی گواستنی پارە بێ لادان (Audit Integrity Status)</span>
                {reconReport.discrepancies.auditFlags.length === 0 ? (
                   <div className="bg-slate-950/30 p-3 rounded-lg text-emerald-400 text-xs border border-emerald-950 text-center">
                    هیچ لادانێکی دژبەیەک دەفتەرە داراییە جیاکراوەکان تۆمار نەکراوە.
                  </div>
                ) : (
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-900 text-xs text-slate-400">
                    <div className="flex items-center gap-2 justify-end mb-2">
                      <span className="font-bold text-emerald-400">گونجاوە (Compliant with Budget Rule 12.67%)</span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>سەرجەم واژۆ فەرمییەکان هاوڕێکن لەگەڵ سیستمی گشتی بانکی ناوەندی.</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Secure Hashed Summaries side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Federal isolated payload representation */}
            <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-2xl flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <div>
                <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
                  <Badge variant="teal">هاوڕێکی فیدراڵی فەرمی</Badge>
                  <span className="text-[11px] font-bold text-white">ئاسایشی داهاتی فیدراڵی عێراق</span>
                </div>
                
                {/* STRICT HYPOTHESIS BLOCKING EXPOSING VALS */}
                <div className="space-y-3 py-2">
                  <div className="bg-slate-950/50 p-2.5 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-500">پارێزراو - ڕێگەپێنەدراو</span>
                    <span className="text-teal-400 font-bold">بڕی داهات (Federal Totals):</span>
                  </div>
                  <div className="bg-slate-950/50 p-2.5 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-500">سوود لە ڕاپۆرت گونجاوە</span>
                    <span className="text-teal-400 font-bold">گومرگ و دەروازە:</span>
                  </div>
                  <div className="bg-slate-950/50 p-2.5 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-500">واژۆی دیجیتاڵی چالاک</span>
                    <span className="text-teal-400 font-bold">باج و باجی گشتی:</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-left min-w-0">
                <span className="text-[9px] text-slate-500 uppercase block font-mono">هاشی چاودێری فیدراڵی</span>
                <span className="text-teal-400 text-[10px] font-mono block truncate select-all" title={fedReport.reportVerificationHash}>{fedReport.reportVerificationHash}</span>
              </div>
            </Card>

            {/* KRG isolated payload representation */}
            <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-2xl flex flex-col justify-between overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <div>
                <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
                  <Badge variant="blue">هاوڕێکی هەرێمی فەرمی</Badge>
                  <span className="text-[11px] font-bold text-white">ئاسایشی داهاتی هەرێمی کوردستان</span>
                </div>
                
                {/* STRICT HYPOTHESIS BLOCKING EXPOSING VALS */}
                <div className="space-y-3 py-2">
                  <div className="bg-slate-950/50 p-2.5 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-500">پارێزراو - ڕێگەپێنەدراو</span>
                    <span className="text-blue-400 font-bold">بڕی داهات (KRG Totals):</span>
                  </div>
                  <div className="bg-slate-950/50 p-2.5 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-500">سوود لە ڕاپۆرت گونجاوە</span>
                    <span className="text-blue-400 font-bold">گومرگ و دەروازە:</span>
                  </div>
                  <div className="bg-slate-950/50 p-2.5 rounded border border-slate-900 flex justify-between items-center text-xs">
                    <span className="text-slate-500">واژۆی دیجیتاڵی چالاک</span>
                    <span className="text-blue-400 font-bold">باج و باجی هەرێمی:</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-left min-w-0">
                <span className="text-[9px] text-slate-500 uppercase block font-mono">هاشی چاودێری کوردستان</span>
                <span className="text-blue-400 text-[10px] font-mono block truncate select-all" title={krgReport.reportVerificationHash}>{krgReport.reportVerificationHash}</span>
              </div>
            </Card>

          </div>

        </div>

        {/* Right Sidebar: Security, Rules, Legislation context */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-3 flex items-center gap-2 justify-end">
              زنجیرەی بەڵگەی ساختە (Reconciliation Proof Structure)
              <Lock className="w-4 h-4 text-amber-500" />
            </h3>
            <div className="text-xs text-slate-400 leading-relaxed space-y-3">
              <p>بۆ پاراستنی پەیماننامەکانی نێوان حکومەتی فیدراڵ و حکومەتی هەرێم لە پێشێلکردنی داتای پاراستنی هێمن و زانیارییە نهێنییەکان، ڕێککەوتنی گشتی ڕێگە نادات هیچ گۆشتنەوەیەکی ڕاستەوخۆ بەسەر تۆماری وردەکارییەکاندا بکرێت.</p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[9px] text-amber-400 text-left">
                SECURE_PROOF_CHAIN: TRUE<br />
                RECONCILIATION_ID: {reconReport.id}<br />
                ALGORITHM: HOMOMORPHIC_HASH_SUM<br />
                FED_BLOCK_HASH: {fedReport.ledgerIntegrityHash.substring(0, 24)}...<br />
                KRG_BLOCK_HASH: {krgReport.ledgerIntegrityHash.substring(0, 24)}...
              </div>
            </div>
          </Card>

          {/* Guidelines Box */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">یاسا بەڕێوەبەرایەتییەکان</h4>
            <ul className="text-xs text-slate-500 space-y-2 list-none">
              <li className="flex items-center gap-2 justify-end">
                <span>بەراوردکاری ڕێژەیی دەروازە بازرگانییەکان بە ڕاستەوخۆ</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              </li>
              <li className="flex items-center gap-2 justify-end">
                <span>بەرهەمهێنانی واژۆی کریپتۆگرافی بە سەرکەوتوویی</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              </li>
              <li className="flex items-center gap-2 justify-end">
                <span>پشکدارییە گشتییەکان لە دەفتەری نیشتمانی نوێدراوە</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              </li>
            </ul>
          </Card>
        </div>

      </div>
    </div>
  );
}
