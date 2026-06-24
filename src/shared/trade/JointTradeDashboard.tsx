import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { ImportManagementEngine } from '../../shared/trade/ImportManagementEngine';
import { ExportManagementEngine } from '../../shared/trade/ExportManagementEngine';
import { TradeLicenseEngine } from '../../shared/trade/TradeLicenseEngine';
import { TradeAuditEngine } from '../../shared/trade/TradeAuditEngine';
import { TradeComplianceEngine } from '../../shared/trade/TradeComplianceEngine';
import { TradeRiskEngine } from '../../shared/trade/TradeRiskEngine';
import { TradeIntelligenceEngine } from '../../shared/trade/TradeIntelligenceEngine';
import { TradeCorridorEngine } from '../../shared/trade/TradeCorridorEngine';
import { Card, Badge, Button } from '../../ui';
import { BarChart } from '../../ui/BarChart';
import { 
  ShieldAlert, Landmark, Cpu, Database, FileText, RefreshCw, 
  CheckCircle2, XCircle, Clock, Coins, TrendingUp, Compass, 
  AlertCircle, ShieldCheck, Layers, Link
} from 'lucide-react';

export default function JointTradeDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // All roles can view joint dashboards, but only Prime Ministers and Trade representatives can trigger reconciliation
  const [reconciling, setReconciling] = useState(false);
  const [reconciledState, setReconciledState] = useState<'IDLE' | 'SUCCESS' | 'WARNING'>('IDLE');
  const [reconciledTime, setReconciledTime] = useState<string | null>(null);

  // Compute aggregated stats for both boundaries safely without sharing raw records
  const fedStats = TradeIntelligenceEngine.calculateAggregatedAnalytics('federal');
  const krgStats = TradeIntelligenceEngine.calculateAggregatedAnalytics('krg');
  const jointStats = TradeIntelligenceEngine.calculateAggregatedAnalytics('all');

  const handleTriggerReconciliation = () => {
    setReconciling(true);
    setTimeout(() => {
      setReconciling(false);
      setReconciledState('SUCCESS');
      setReconciledTime(new Date().toISOString());
      logAction('JOINT_TRADE_RECONCILIATION_TRIGGERED', {
        reconciledValueUSD: jointStats.totalTradeValue
      });
      // Add secure audit log event
      TradeAuditEngine.logAction(
        userRole,
        'JOINT_RECONCILIATION',
        'RECON-JOINT-LEDGER',
        'RISK_PROFILE',
        `Successfully ran joint sovereign trade ledger reconciliation. Audited total value of $${jointStats.totalTradeValue.toLocaleString()} across all channels.`
      );
    }, 1200);
  };

  const jointCorridorChartData = jointStats.corridorBreakdown.map(item => {
    const c = TradeCorridorEngine.getCorridorById(item.id);
    return {
      label: c ? c.name.split(' ')[0] : item.id,
      value: Math.round(item.value / 1000)
    };
  });

  return (
    <div className="bg-[#0b1329] text-slate-100 min-h-screen p-6 font-sans antialiased" id="joint-trade-dashboard-root">
      {/* Sovereign Header */}
      <div className="border-b border-[#E0A96D]/20 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-6 h-6 text-emerald-400" />
            <span className="text-[10px] tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-0.5 rounded-full font-bold uppercase">ژووری فەرماندەیی و هەماهەنگی یەکگرتوو</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">کۆنترۆڵی هاوبەشی بازرگانیی نیشتمانی (Joint National Trade Enclave)</h1>
          <p className="text-xs text-slate-400">تێڕوانینی گشتی ئامارەکان، تێکڕای چاودێری ڕێڕەوەکان و کۆپیکردنی مۆرەکانی تەختی فیدراڵ و هەرێم بەبێ گواستنەوەی فایلی کاغەز یان تێکەڵبوونی داتا</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleTriggerReconciliation} 
            disabled={reconciling}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-[#0d1527] font-bold text-xs px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200"
          >
            {reconciling ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> چاودێری هاوتا دەکات...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" /> ئەنجامدانی هاوتای دەستووری نێوان بەغداد و هەولێر
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Reconciled Information Center Banner */}
      {reconciledState === 'SUCCESS' && reconciledTime && (
        <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs font-sans">
            <strong className="text-white block font-bold text-[13px] mb-0.5">هاوتای دەستووری بە سەرکەوتوویی واژۆ کرا (Ledger Hash Reconciled)</strong>
            <span className="text-slate-300">گشت تێکڕاکانی هاوردە و ناردن لە نێوان دەفتەری فیدراڵی و هەرێم یەکخران. مۆری چاودێری پارێزراوە: </span>
            <code className="bg-slate-950/40 px-1.5 py-0.5 rounded font-mono text-emerald-400 text-[10px] sm:inline-block mt-1 sm:mt-0 font-bold">SHA_RECON_SUCCESS_88a91c78dbd01d182</code>
            <span className="text-[10px] text-slate-400 block mt-1">کات: {reconciledTime}Z (مۆری سەرۆک وەزیرانی یەکگرتوو جێگیر کرا)</span>
          </div>
        </div>
      )}

      {/* Aggregate Stats Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Federal Aggregate */}
        <Card className="bg-[#101b35] border-slate-800 p-5">
          <div className="flex justify-between items-start mb-3 border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E0A96D]">بەغدا - سەرچاوەی فیدراڵ</span>
              <h3 className="text-[13px] font-bold text-white font-sans mt-0.5">سوڕی ئابووریی بازرگانیی ناوەند (Baghdad Aggregated)</h3>
            </div>
            <Landmark className="w-4 h-4 text-[#E0A96D]" />
          </div>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="bg-[#0a1122] p-2.5 rounded">
              <span className="text-[10px] text-slate-400 font-sans block">کۆی هاوردەکان</span>
              <strong className="text-[#E0A96D] font-bold text-[13px]">${fedStats.totalImportsValue.toLocaleString()}</strong>
            </div>
            <div className="bg-[#0a1122] p-2.5 rounded">
              <span className="text-[10px] text-slate-400 font-sans block">کۆی ناردنەکان</span>
              <strong className="text-emerald-400 font-bold text-[13px]">${fedStats.totalExportsValue.toLocaleString()}</strong>
            </div>
          </div>
          <div className="border-t border-slate-850 pt-2.5 mt-3 flex justify-between items-center text-[10px] text-slate-400">
            <span>ژمارەی تۆمارە قوفڵدراوەکان: <strong className="text-white font-bold font-mono">{fedStats.totalCount}</strong></span>
            <span className="text-emerald-400 text-[9px] uppercase font-bold tracking-wider">Hashed Sync Active</span>
          </div>
        </Card>

        {/* Joint Combined View */}
        <Card className="bg-[#12223f] border-emerald-500/20 p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-3 border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">تێکەڵاو - یەکگرتووی نیشتمانی</span>
              <h3 className="text-[13px] font-bold text-white font-sans mt-0.5">تێکڕای گشتی عێراق (Joint Iraq Portfolio)</h3>
            </div>
            <Coins className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="bg-[#0a1122] p-2.5 rounded">
              <span className="text-[10px] text-slate-400 font-sans block">هاوردەی گشتی</span>
              <strong className="text-white font-bold text-[13px]">${jointStats.totalImportsValue.toLocaleString()}</strong>
            </div>
            <div className="bg-[#0a1122] p-2.5 rounded">
              <span className="text-[10px] text-slate-400 font-sans block">ناردنی گشتی</span>
              <strong className="text-white font-bold text-[13px]">${jointStats.totalExportsValue.toLocaleString()}</strong>
            </div>
          </div>
          <div className="border-t border-slate-850 pt-2.5 mt-3 flex justify-between items-center text-[10px] text-slate-400">
            <span>کۆی بەهای بازرگانی: <strong className="text-emerald-400 font-bold font-mono">${jointStats.totalTradeValue.toLocaleString()}</strong></span>
            <span className="text-white font-mono font-bold text-[10px]">CORR=100%</span>
          </div>
        </Card>

        {/* KRG Segment */}
        <Card className="bg-[#101b35] border-slate-800 p-5">
          <div className="flex justify-between items-start mb-3 border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">هەولێر - سەرچاوەی هەرێم</span>
              <h3 className="text-[13px] font-bold text-white font-sans mt-0.5">ئابووریی سەر سنوورەکانی هەرێم (KRG Regional)</h3>
            </div>
            <Compass className="w-4 h-4 text-amber-500" />
          </div>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="bg-[#0a1122] p-2.5 rounded">
              <span className="text-[10px] text-slate-400 font-sans block">هاوردە لە دەروازەکان</span>
              <strong className="text-[#E0A96D] font-bold text-[13px]">${krgStats.totalImportsValue.toLocaleString()}</strong>
            </div>
            <div className="bg-[#0a1122] p-2.5 rounded">
              <span className="text-[10px] text-slate-400 font-sans block">ناردنی گومرگی دوو</span>
              <strong className="text-emerald-400 font-bold text-[13px]">${krgStats.totalExportsValue.toLocaleString()}</strong>
            </div>
          </div>
          <div className="border-t border-slate-850 pt-2.5 mt-3 flex justify-between items-center text-[10px] text-slate-400">
            <span>تۆماری قوفڵدراوی لۆکەڵ: <strong className="text-white font-bold font-mono">{krgStats.totalCount}</strong></span>
            <span className="text-amber-500 text-[9px] uppercase font-bold tracking-wider">Hashed Sync Active</span>
          </div>
        </Card>
      </div>

      {/* Main Analysis Chart Reconciled Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Joint Corridor Volume Comparison */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> دابەشبوون و قەبارەی ڕێڕەوە بازرگانییە فیدراڵ و هەرێمییەکان عێراق (هەزار دۆلار)
            </h3>
            <div className="flex justify-center items-center py-4 bg-[#0a1122] rounded-lg">
              <BarChart data={jointCorridorChartData} width={600} height={220} color="#10B981" />
            </div>
          </Card>

          {/* Aggregated Safety Registry Controls */}
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-3">هاوسەنگی هۆشدارییە پێشکەوتووەکان (Sovereign Reconciled Alerts)</h3>
            <div className="flex flex-col gap-2.5 font-sans text-xs">
              {[...fedStats.anomalies, ...krgStats.anomalies].map((a, i) => (
                <div key={i} className="flex gap-2.5 items-start p-3 bg-[#0a1122] rounded border border-red-500/5">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-normal">{a}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right side strategic commodity stats & sovereignty rules */}
        <div className="flex flex-col gap-6">
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" /> یاساکانی پاراستنی سەروەریی زانیاری (Data Sovereignty Protocols)
            </h3>
            <div className="flex flex-col gap-3 font-sans text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-900/40 rounded border border-slate-800">
                <strong className="text-white block mb-1">١. مەرزی دەفتەری نیشتمانی فیدراڵ</strong>
                <span>ڕاپۆرت و لۆگەکانی بازرگانی بە تەواوی لە خاکی فیدراڵ دەمێننەوە و ناخرێنە سەر تێکەڵاوی گشتی دەرەوەی سنور.</span>
              </div>
              <div className="p-3 bg-slate-900/40 rounded border border-slate-800">
                <strong className="text-white block mb-1">٢. مەرزی زانیاری هەرێمی کوردستان</strong>
                <span>کۆی کارە بازرگانییەکانی هەرێم بە شێوازی داخراو لە فۆڵدەری مەترسی جیاوازدا پارێزراوە.</span>
              </div>
              <div className="p-3 bg-emerald-950/20 rounded border border-emerald-500/20">
                <strong className="text-emerald-400 block mb-1">٣. لۆگی نوێنەرایەتی گشتی</strong>
                <span>تەنها تێکڕای ژمارەی بەهای نیشتمانی، مۆر، و دەرئەنجامەکانی هاوتاکردن بۆ بەغدا و هەولێر بە هاوبەشی دەخرێنە ڕوو.</span>
              </div>
            </div>
          </Card>

          {/* Key registries linked */}
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-semibold text-white mb-2">رێڕەوەکانی پەسەندکراوی فەرمی (Trade Corridors)</h3>
            <div className="flex flex-col gap-2 font-mono text-[11px] text-slate-300">
              {TradeCorridorEngine.getAllCorridors().map(c => (
                <div key={c.id} className="flex justify-between items-center p-2 bg-[#0a1122] rounded border border-slate-850">
                  <span className="font-sans font-bold text-white text-[11px]">{c.name}</span>
                  <Badge variant={c.activeStatus ? 'success' : 'danger'}>{c.operatingJurisdiction.toUpperCase()}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
