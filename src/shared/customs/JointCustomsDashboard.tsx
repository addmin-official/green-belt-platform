import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { HSCodeRegistry } from './HSCodeRegistry';
import { TariffCalculationEngine } from './TariffCalculationEngine';
import { JointCustomsReconciliationEngine, ReconciledCustomsReceipt } from './JointCustomsReconciliationEngine';
import { Card, Badge, Button } from '../../ui';
import { 
  ShieldAlert, Landmark, Cpu, Database, FileText, Send, Layers, 
  Search, Calculator, AlertTriangle, RefreshCw, CheckCircle2, TrendingUp, Sparkles, Scale
} from 'lucide-react';

export default function JointCustomsDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // Joint Authorized roles (reconciliation auditing permission)
  const authorizedRoles = [
    'Federal Prime Minister',
    'Federal Cabinet',
    'Prime Minister of Kurdistan Region',
    'KRG Prime Minister',
    'KRG Cabinet',
    'Joint Representative',
    'Joint Executive',
    'National Executive Desk',
    'Federal Customs Auditor',
    'KRG Customs Inspector'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  // States
  const [reconciledReceipts, setReconciledReceipts] = useState(() => JointCustomsReconciliationEngine.getReconciledLedgers());
  const [tariffSplit, setTariffSplit] = useState(() => JointCustomsReconciliationEngine.getJointRevenueSplitSummary());
  const [corridors, setCorridors] = useState(() => JointCustomsReconciliationEngine.getJointCorridorActivity());
  const [activeTab, setActiveTab] = useState<'reconciliation' | 'comparison' | 'corridors'>('reconciliation');

  // Simulator comparison states
  const [simHsCode, setSimHsCode] = useState('87032330');
  const [simValue, setSimValue] = useState<number>(100000);
  const [simWeight, setSimWeight] = useState<number>(20);
  const [simExempt, setSimExempt] = useState(false);

  // Calculate under three regimes
  const fedSim = TariffCalculationEngine.calculateTariff({
    hsCode: simHsCode,
    declaredValueUSD: simValue,
    weightTons: simWeight,
    isSpecialExemption: simExempt
  }, 'federal');

  const krgSim = TariffCalculationEngine.calculateTariff({
    hsCode: simHsCode,
    declaredValueUSD: simValue,
    weightTons: simWeight,
    isSpecialExemption: simExempt
  }, 'krg');

  const jointSim = TariffCalculationEngine.calculateTariff({
    hsCode: simHsCode,
    declaredValueUSD: simValue,
    weightTons: simWeight,
    isSpecialExemption: simExempt
  }, 'joint');

  const [simResolutionName, setSimResolutionName] = useState('');
  const [simResolutionNotes, setSimResolutionNotes] = useState('');
  const [submittedDirective, setSubmittedDirective] = useState<string | null>(null);

  const handleSubmitDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simResolutionName.trim()) return;

    const resId = JointCustomsReconciliationEngine.pushJointDirectives(
      simResolutionName,
      simResolutionNotes,
      userRole
    );

    logAction(
      userRole,
      `بڕیارنامەی هاوبەشی گومرگی نوێ دەرکرا: ${resId} - [${simResolutionName}]`,
      'JOINT_CUSTOMS_RESOLUTION_ISSUED'
    );

    setSubmittedDirective(resId);
    setSimResolutionName('');
    setSimResolutionNotes('');
    setTimeout(() => setSubmittedDirective(null), 5000);
  };

  if (!isAuthorized) {
    return (
      <Card className="border border-rose-950 bg-rose-950/20 p-8 rounded-xl text-start">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-950 border border-rose-900 rounded-lg text-rose-400 shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-300 font-sans">بەرگری توند: چوونەژوورەوە سنوردارە (Joint Gateway Access Regulated)</h3>
            <p className="text-sm text-rose-400/90 mt-2 leading-relaxed font-sans">
              سیستەمی هەماهەنگی هاوبەمی گومرگی (Joint Reconciliation Desk): ڕۆڵی <b>[{userRole}]</b> پێویستی بە مۆڵەتنامەی فیدراڵی-هەرێمی هاوبەشە بۆ بینینی داتا ڕێکخراوە گشتییەکان. ڕۆڵە پەسەندکراوەکانی پەرلەمان، دارایی ناوەند و سەرۆکایەتییەکان ڕێگەیەکی یاسایییان هەیە تەنها.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-rose-950/50 text-xs font-mono text-slate-400">
              JOINT_ENFORCEMENT: reconciliation_datasets_only • STATUS: SECURED_HASH_MONITOR
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">

      {/* Header Banner */}
      <Card className="bg-[#0b1329]/95 border-blue-950 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-950 border border-blue-850 rounded-lg text-blue-400 shrink-0">
              <Scale className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-sans font-bold text-slate-100 tracking-tight flex items-center gap-2">
                سەکۆی سەرپەرشتی و هاوتاکردنی گومرگی هاوبەش
                <Badge variant="blue">ئۆرگانی دەستووری هاوبەش</Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                ڕێکخستن و هەڵسەنگاندنی داهاتی گومرگی نێوان حکومەتی فیدراڵی و حکومەتی هەرێمی کوردستان بەپێی داتا فەرمییە ڕێگەپێدراوەکان، بەڕێوەبردنی ڕێڕەوە بازرگانییەکان و هاوتاکردنی باجەکان.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="blue" className="px-3 py-1 font-mono">{userRole}</Badge>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('reconciliation')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'reconciliation' ? 'bg-blue-950 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            ڕێکخستنی داهاتی نیشتمانی (Reconciliation Engine)
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'comparison' ? 'bg-blue-950 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            هاوشێوەکەری تاریفە گشتییەکان (Duties Simulator)
          </button>
          <button
            onClick={() => setActiveTab('corridors')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'corridors' ? 'bg-blue-950 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            ڕێڕەوە بازرگانییە فەرمییەکان ({corridors.length})
          </button>
        </div>

        <div className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-900">
          JOINT_GATE: approved-reconciliation-endpoints
        </div>
      </div>

      {/* Main Content Areas */}
      {activeTab === 'reconciliation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Ledger Totals Split Summary */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                کورتەی گونجانی گومرگی و هاوتاکردنی نیشتمانی
              </h3>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">ڕەوشی دڵنیابوونەوەی داهاتی فیدراڵ</span>
                  <span className="text-sm font-bold text-teal-400 font-mono block mt-1">پارێزراو (CONFIDENTIAL_SHIELDED)</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">ڕەوشی دڵنیابوونەوەی داهاتی هەرێم</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono block mt-1">مۆرکراو (CRYPTO_SIGNED_OK)</span>
                </div>
                <div className="bg-[#070c17] p-4 rounded-xl border border-blue-950/40">
                  <span className="text-[10px] text-blue-400 font-sans font-bold block">متیۆدی هاوپێچ و دەستووری</span>
                  <span className="text-lg font-extrabold text-slate-100 font-mono block mt-1">هاوتاکردنی بێ لادانی گشتگیر</span>
                </div>

                <div className="p-3.5 bg-blue-950/20 rounded-xl border border-blue-900/40 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400">واژۆی لایەنی فیدراڵی:</span>
                    <span className="text-slate-200 font-bold font-mono">VERIFIED_SIGNATURE</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">واژۆی لایەنی هەرێمی کوردستان:</span>
                    <span className="text-slate-200 font-bold font-mono">TRUSTED_ROOT_OK</span>
                  </div>
                  <div className="border-t border-blue-900/40 mt-3 pt-2 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-500">پێوەر و زانیاری گونجانی گومرگی:</span>
                    <span className="text-blue-400 font-bold">{tariffSplit.protocolEfficiencyIndex}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Reconciled Logs List */}
          <div className="lg:col-span-8">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                تۆماری فەرمی پسوولە هاوتا و هاوسەنگکراوەکان (Reconciliation Database)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">کۆدی متمانە</th>
                      <th className="p-3 text-start">سەرچاوەی دەرکەوتن</th>
                      <th className="p-3 text-start">کۆدی مانیفێست</th>
                      <th className="p-3 text-start">ڕەوشی قەتیسکردنی بەها</th>
                      <th className="p-3 text-start">باری دڵنیایی</th>
                      <th className="p-3 text-start">شیکاری متمانەی واژۆ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {reconciledReceipts.map(rec => (
                      <tr key={rec.reconciliationId} className="hover:bg-slate-900/20 font-mono text-[11px]">
                        <td className="p-3 font-bold text-blue-400">{rec.reconciliationId}</td>
                        <td className="p-3 capitalize">
                          <Badge variant={rec.source === 'federal' ? 'outline' : 'success'}>
                            {rec.source === 'federal' ? 'Iraq Federal' : 'KRG Regional'}
                          </Badge>
                        </td>
                        <td className="p-3 text-slate-400">{rec.matchedId}</td>
                        <td className="p-3 text-emerald-400 font-bold">پارێزراو [SHIELDED_HASH]</td>
                        <td className="p-3">
                          <Badge variant={rec.status === 'fully_matched' ? 'success' : 'warning'}>
                            {rec.status === 'fully_matched' ? 'Fully Reconciled' : 'Evaluating Hash'}
                          </Badge>
                        </td>
                        <td className="p-3 text-slate-500 text-[10px] font-sans">{rec.auditorVerification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Inputs comparison */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                تێکۆشانی زانیاری بار بۆ بەراوردکاری
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">دیاریکردنی جۆری کاڵا (HS Code)</label>
                  <select
                    value={simHsCode}
                    onChange={(e) => setSimHsCode(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  >
                    {Object.values(HSCodeRegistry).map(code => (
                      <option key={(code as any).code} value={(code as any).code}>{(code as any).code} - {(code as any).descriptionEn.substring(0, 45)}...</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">بەهای بارەکە بە دۆلار</label>
                  <input
                    type="number"
                    value={simValue}
                    onChange={(e) => setSimValue(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">کێش بە تەن</label>
                  <input
                    type="number"
                    value={simWeight}
                    onChange={(e) => setSimWeight(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>

                <div className="flex items-center gap-2 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    id="exempt-sim"
                    checked={simExempt}
                    onChange={(e) => setSimExempt(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="exempt-sim" className="text-xs text-slate-400 cursor-pointer">لێبوردنی فەرمی گومرگی</label>
                </div>
              </div>
            </Card>

            {/* Directive Resolution Issue Widget */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest mb-3 pb-2 border-b border-slate-800">
                گەیاندنی ناوبژیوانی یان نۆرمینالی هاوبەش (Joint Directives)
              </h4>

              <form onSubmit={handleSubmitDirective} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="ناوی ڕێککەوتننامەی گومرگی نوێ..."
                  value={simResolutionName}
                  onChange={(e) => setSimResolutionName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="ڕێنماییەکان سەبارەت بە پشکنینی پۆلێنە گومرگییەکان..."
                  value={simResolutionNotes}
                  onChange={(e) => setSimResolutionNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                />

                <Button
                  type="submit"
                  variant="blue"
                  className="w-full text-xs font-bold"
                >
                  دەرکردنی واژۆی بڕیاری دەستووری هاوبەش
                </Button>
              </form>

              {submittedDirective && (
                <div className="mt-3 p-3 bg-blue-950/40 rounded border border-blue-900 border-blue-500/20 text-xs text-blue-300">
                  بڕیاری هاوبەش بە سەرکەوتوویی واژۆکردنی بۆ کرا لەگەڵ کۆدی یەکلیکەرەوە: <b>{submittedDirective}</b>.
                </div>
              )}
            </Card>
          </div>

          {/* Comparative results side-by-side! */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                شیکاری بەراوردکاری چۆنیەتی سەپاندنی باج و گومرگ (Comparison Ledger)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Federal Schedule */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 relative">
                  <div className="absolute top-3 right-3 text-teal-555 text-[9px] font-mono font-bold uppercase">FED SCHEDULE</div>
                  <h4 className="text-xs font-bold text-slate-300 font-sans block mt-1">تۆماری فیدراڵی</h4>
                  <div className="space-y-3 mt-4">
                    <div className="text-xs">
                      <span className="text-slate-500 block">باجی بنەڕەتی:</span>
                      <span className="text-slate-200 font-bold font-mono">${fedSim.baseDutyUSD.toLocaleString()}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-500 block">تێچووی سەر سنوور:</span>
                      <span className="text-slate-200 font-bold font-mono">${fedSim.borderServiceFeeUSD.toLocaleString()}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-500 block">کۆکراوەی سەرجەم:</span>
                      <span className="text-teal-400 font-extrabold font-mono">${fedSim.totalTariffUSD.toLocaleString()}</span>
                    </div>
                    <Badge variant="teal" className="w-full text-center mt-2 justify-center font-mono">{fedSim.effectiveRate}% rate</Badge>
                  </div>
                </div>

                {/* KRG Schedule */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-900 relative">
                  <div className="absolute top-3 right-3 text-emerald-555 text-[9px] font-mono font-bold uppercase">KRG SCHEDULE</div>
                  <h4 className="text-xs font-bold text-slate-300 font-sans block mt-1">تۆماری هەرێم</h4>
                  <div className="space-y-3 mt-4">
                    <div className="text-xs">
                      <span className="text-slate-500 block">باجی بنەڕەتی:</span>
                      <span className="text-slate-200 font-bold font-mono">${krgSim.baseDutyUSD.toLocaleString()}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-500 block">تێچووی سەر سنوور:</span>
                      <span className="text-slate-200 font-bold font-mono">${krgSim.borderServiceFeeUSD.toLocaleString()}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-500 block">کۆکراوەی سەرجەم:</span>
                      <span className="text-emerald-400 font-extrabold font-mono">${krgSim.totalTariffUSD.toLocaleString()}</span>
                    </div>
                    <Badge variant="success" className="w-full text-center mt-2 justify-center font-mono">{krgSim.effectiveRate}% rate</Badge>
                  </div>
                </div>

                {/* Harmonized Joint Schedule */}
                <div className="p-4 bg-blue-950/20 rounded-xl border border-blue-900/40 relative">
                  <div className="absolute top-3 right-3 text-blue-400 text-[9px] font-mono font-bold uppercase">HARMONIZED</div>
                  <h4 className="text-xs font-bold text-blue-300 font-sans block mt-1">ڕێککەوتووی هاوبەش</h4>
                  <div className="space-y-3 mt-4">
                    <div className="text-xs">
                      <span className="text-slate-400 block">باجی بنەڕەتی:</span>
                      <span className="text-slate-200 font-bold font-mono">${jointSim.baseDutyUSD.toLocaleString()}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 block">تێچووی سەر سنوور:</span>
                      <span className="text-slate-200 font-bold font-mono">${jointSim.borderServiceFeeUSD.toLocaleString()}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 block">کۆکراوەی سەرجەم:</span>
                      <span className="text-blue-400 font-extrabold font-mono">${jointSim.totalTariffUSD.toLocaleString()}</span>
                    </div>
                    <Badge variant="blue" className="w-full text-center mt-2 justify-center font-mono">{jointSim.effectiveRate}% rate</Badge>
                  </div>
                </div>

              </div>
            </Card>
          </div>

        </div>
      )}

      {activeTab === 'corridors' && (
        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
            تۆماری ئاماری چاودێری گواستنەوە هاوبەشەکان (Joint Trade Corridors Monitor)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-300">
              <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">کۆدی ڕێڕەو</th>
                  <th className="p-3 text-start">ئاراستە و مەسافە نیشتمانییەکان</th>
                  <th className="p-3 text-start">باری جامی بەڕێوەبردن</th>
                  <th className="p-3 text-start">گواستنەوەی چالاک لە کاتی ئێستادا</th>
                  <th className="p-3 text-start">ناوەندی کاتی تێپەڕبوونی گشتی (کاتژمێر)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {corridors.map(corr => (
                  <tr key={corr.corridorId} className="hover:bg-slate-900/20 font-mono text-[11px]">
                    <td className="p-3 font-bold text-blue-400">{corr.corridorId}</td>
                    <td className="p-3 font-sans font-bold text-slate-300">{corr.routeEn}</td>
                    <td className="p-3">
                      <Badge variant={corr.status === 'Optimal' ? 'success' : 'warning'}>
                        {corr.status}
                      </Badge>
                    </td>
                    <td className="p-3 font-bold text-slate-200">{corr.activeConvoys} قۆناغ</td>
                    <td className="p-3 text-slate-400">{corr.averageTransitHrs} کاتژمێر</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
}
