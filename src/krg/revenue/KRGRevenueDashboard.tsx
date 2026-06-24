import React, { useState } from 'react';
import { 
  Landmark, ShieldAlert, Cpu, Coins, TrendingUp, AlertTriangle, 
  CheckCircle2, FileText, Lock, RefreshCw, Send, Database, Activity
} from 'lucide-react';
import { Card, Badge, Button } from '../../ui';

// Import useGovernment context and Sovereign policy
import { useGovernment } from '../../providers/GovernmentProvider';
import { SovereignRevenueVisibilityPolicy } from '../../shared/revenue/SovereignRevenueVisibilityPolicy';

// Import KRG Isolated Core Engines
import { KRGRevenueLedgerEngine } from './core/RevenueLedgerEngine';
import { KRGCustomsRevenueEngine } from './core/CustomsRevenueEngine';
import { KRGBorderFeeEngine } from './core/BorderFeeEngine';
import { KRGTaxRevenueEngine } from './core/TaxRevenueEngine';
import { KRGRevenueLeakageDetectionEngine } from './core/RevenueLeakageDetectionEngine';
import { KRGRevenueCollectionEngine } from './core/RevenueCollectionEngine';

export default function KRGRevenueDashboard() {
  const { activeContext } = useGovernment();

  const caller = activeContext === 'FEDERAL_IRAQ' ? 'FEDERAL' : 
                 activeContext === 'KURDISTAN_REGION' ? 'KRG' : 'JOINT';

  const isAuthorized = SovereignRevenueVisibilityPolicy.authorizeAccess(caller, 'KRG');

  const [ticker, setTicker] = useState(0);
  const handleRefresh = () => setTicker(prev => prev + 1);

  // States for manual regional revenue capture
  const [streamType, setStreamType] = useState<'CUSTOMS' | 'BORDER_FEE' | 'TAX' | 'TARIFF'>('CUSTOMS');
  const [sourceEntityId, setSourceEntityId] = useState('');
  const [amountUSD, setAmountUSD] = useState('');
  const [payerName, setPayerName] = useState('');
  const [signatory, setSignatory] = useState('Erbil Cabinet Senior Revenue Officer');
  const [feedback, setFeedback] = useState<{ success?: boolean; msg?: string } | null>(null);

  // Load isolated data summaries
  const ledgerEntries = KRGRevenueLedgerEngine.getLedger();
  const ledgerStats = KRGRevenueLedgerEngine.getStats();
  const customsTotals = KRGCustomsRevenueEngine.getTotals();
  const borderTotals = KRGBorderFeeEngine.getTotals();
  const taxTotals = KRGTaxRevenueEngine.getTotals();
  const leakageAlerts = KRGRevenueLeakageDetectionEngine.getAlerts();
  const ledgerIntegrity = KRGRevenueLedgerEngine.verifyLedgerIntegrity();

  const handleCollectRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountUSD);
    if (isNaN(amt) || amt <= 0 || !sourceEntityId || !payerName) {
      setFeedback({ success: false, msg: 'تکایە هەموو خانەکان بە دروستی پڕ بکەرەوە' });
      return;
    }

    const res = KRGRevenueCollectionEngine.collectRevenue({
      streamType,
      sourceEntityId,
      amountUSD: amt,
      exporterOrPayer: payerName,
      signatory,
      jurisdictionTag: 'krg'
    });

    if (res.success) {
      setFeedback({ success: true, msg: `داهاتی هەرێم تۆمارکرا! کلیل: ${res.txHash?.substring(0, 24)}...` });
      setAmountUSD('');
      setSourceEntityId('');
      setPayerName('');
      handleRefresh();
    } else {
      setFeedback({ success: false, msg: res.error });
    }
  };

  if (!isAuthorized) {
    return (
      <Card className="border border-red-950 bg-red-950/20 p-8 rounded-xl text-right">
        <div className="flex items-start gap-4 justify-end">
          <div className="text-right flex-1">
            <h3 className="text-lg font-bold text-red-300 font-sans">یاسای پاراستنی داهاتی هەرێمی: چوونەژوورەوە بلۆککراوە</h3>
            <p className="text-sm text-red-400/90 mt-2 leading-relaxed font-sans">
              یاسای سەروەری گشتی داتا ڕێگا بە هیچ لایەنێکی دەرەکی یان هاوبەش نادات داتا مۆنێتاری تەواوی هەرێمی کوردستان ببینێت. هەوڵدان بۆ چوونەژوورەوەی جۆری <b>[{caller}]</b> ڕەتکرایەوە.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-red-950/50 text-xs font-mono text-slate-400 text-left">
              SOVEREIGN_POLICY_REVENUE_ENFORCEMENT: krg_only_allow • SYSTEM_STATE: SECURITY_LOCKED
            </div>
          </div>
          <div className="p-3 bg-red-950 border border-red-905 rounded-lg text-red-400 shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#111c35] p-6 rounded-2xl border border-[#3b82f6]/30 shadow-xl gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <Badge variant="blue">سەروەری هەرێمی کوردستان</Badge>
            <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block">ناوچەی هەرێمی پارێزراوی داهات (KRG SECURE ZONE)</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">بەڕێوبەرایەتی کۆکردنەوە و بڕوانامەکانی داهاتی هەرێمی کوردستان (KRG)</h2>
          <p className="text-xs text-slate-300 mt-1">تۆمارکردن، ژمێریاری و چاودێری ڕاستەوخۆ بە شێوەیەکی تەواو جیاواز و دەستکارینەکراو</p>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="border-[#3b82f6]/40 hover:bg-[#1e293b] text-blue-200">
            <RefreshCw className="w-4 h-4 mr-2" />
            تازەکردنەوەی هەرێمی
          </Button>
          <div className="bg-[#1e293b] py-2 px-4 rounded-xl border border-slate-800 text-center select-none">
            <span className="text-[10px] text-slate-500 block uppercase font-mono">تەواوێتی دەفتەری فەرمی</span>
            {ledgerIntegrity.isValid ? (
              <span className="text-emerald-400 text-xs font-bold font-mono">✓ بە مۆری فەرمی ECDSA پارێزراوە</span>
            ) : (
              <span className="text-red-400 text-xs font-bold font-mono">⚠️ زنجیرەی تەواوێتی پچڕاوە</span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">داهاتی کۆکراوەی تێکەڵاو</span>
            <Coins className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${(ledgerStats.totalRevenueUSD + borderTotals.totalCollectedUSD + taxTotals.totalPaid).toLocaleString()}</div>
          <p className="text-[10px] text-slate-500 mt-2">ئۆپەراسیۆنی ناوخۆیی و گشتی هەرێم</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">داهاتی تاریفەی گومرگی هەرێم</span>
            <Database className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${customsTotals.totalCollectedDutyUSD.toLocaleString()}</div>
          <p className="text-[10px] text-purple-400 mt-2">بەها بازرگانییەکان: ${customsTotals.totalDeclaredValueUSD.toLocaleString()}</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">باجی ناوخۆیی سێکتەرەکان</span>
            <Landmark className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${taxTotals.totalPaid.toLocaleString()}</div>
          <p className="text-[10px] text-amber-400 mt-2">نوکان، کۆڕەک و باجدەرانی ناوخۆیی</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">سەرچاوەی دەر دەروازەی سنوور</span>
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${borderTotals.totalCollectedUSD.toLocaleString()}</div>
          <p className="text-[10px] text-emerald-400 mt-2">ترافیکی ئیبراهیم خەلیل و پەروێزخان</p>
        </Card>
      </div>

      {/* Main Grid elements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Alerts and Ledger table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Revenue Leakage Detection Alerts */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4 text-right justify-between">
              <span className="bg-red-950 text-red-400 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                {leakageAlerts.length} حاڵەت
              </span>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">ئاگادارکردنەوە فەرمییەکانی لێچوونی داهاتی هەرێم</h3>
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
            </div>

            <div className="space-y-3">
              {leakageAlerts.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">هیچ کێشەیەکی فەرمی نەدۆزرایەوە لەم خولەدا.</div>
              ) : (
                leakageAlerts.map(alert => (
                  <div key={alert.id} className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between text-right gap-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={alert.severity === 'CRITICAL' ? 'destructive' : 'orange'}>
                        {alert.severity === 'CRITICAL' ? 'زۆر مەترسیدار' : 'مەترسیدار'}
                      </Badge>
                      <span className="text-[10px] font-mono text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-xs font-bold text-white truncate max-w-[150px]">{alert.sourceName}</span>
                        <span className="text-[10px] font-mono text-purple-400 truncate">[{alert.sourceEntityId}]</span>
                      </div>
                      <div className="text-xs text-slate-400 break-words line-clamp-2">
                        جۆر:{' '}
                        <span className="text-slate-200">
                          {alert.anomalyType === 'TARIFF_MISAPPLY' ? 'کەمکردنەوەی ناڕەوای تاریفە' :
                           alert.anomalyType === 'UNDERVALUATION' ? 'کەمتر پیشاندانی بەهای گشتی' :
                           alert.anomalyType === 'FEE_EVASION' ? 'خۆدزینەوە لە ڕسوومات' :
                           alert.anomalyType === 'DELINQUENT_TAX' ? 'باجی دواکەوتووی نافەرمی' : alert.anomalyType}
                        </span> | سەرپێچی دارایی:{' '}
                        <span className="text-red-400 font-bold font-mono">${alert.leakageUSD.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Secure Raw Ledger Trails */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4 justify-end">
              <h3 className="text-sm font-bold text-slate-100">تۆماری فەرمی گۆمڕگی هەرێم - زنجیرەی بلۆک</h3>
              <Lock className="w-4 h-4 text-blue-400" />
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs text-slate-300 table-fixed min-w-[600px]">
                <thead className="bg-[#050914] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-start w-[220px]">کۆد و هاشی بلۆک</th>
                    <th className="p-3 text-right w-[100px]">جۆری سەرچاوە</th>
                    <th className="p-3 text-right w-[140px]">باجدەر / لایەن</th>
                    <th className="p-3 text-right w-[140px]">کارمەندی واژۆکار</th>
                    <th className="p-3 text-center w-[120px]">کۆکراوە</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 font-mono">
                  {ledgerEntries.map(entry => {
                    const parsedPayload = JSON.parse(entry.payload);
                    return (
                      <tr key={entry.id} className="hover:bg-slate-900/10">
                        <td className="p-3 text-start text-slate-500 overflow-hidden">
                          <span className="text-blue-400 font-bold block truncate">{entry.id}</span>
                          <span className="text-[9px] text-slate-600 block truncate font-mono select-all" title={entry.hash}>{entry.hash}</span>
                        </td>
                        <td className="p-3 text-right">
                          <Badge variant="blue">
                            {entry.streamType === 'CUSTOMS' ? 'گومرگ' : entry.streamType === 'BORDER_FEE' ? 'رسوماتی سنوور' : entry.streamType === 'TARIFF' ? 'تاریفە' : 'باج'}
                          </Badge>
                        </td>
                        <td className="p-3 text-right text-slate-300 font-sans truncate" title={parsedPayload.payer || 'موردەکردنی گشتی'}>
                          {parsedPayload.payer || 'موردەکردنی گشتی'}
                        </td>
                        <td className="p-3 text-right text-slate-400 truncate" title={entry.signatory}>
                          {entry.signatory === 'Erbil Cabinet Senior Revenue Officer' ? 'ئەفسەری باڵای داهاتی هەولێر' : entry.signatory}
                        </td>
                        <td className="p-3 text-center text-white font-bold">${entry.amountUSD.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Collection tools and settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* RevenueCollectionEngine Form */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl text-right">
            <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2 justify-end border-b border-slate-800 pb-3">
              بریکاری تۆمارکردنی داهاتی هەرێمی (KRG)
              <Send className="w-4 h-4 text-blue-400" />
            </h3>

            {feedback && (
              <div className={`p-3 rounded-lg text-xs font-medium mb-3 text-center ${feedback.success ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                {feedback.msg}
              </div>
            )}

            <form onSubmit={handleCollectRevenue} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">جۆری پۆرتی سەرچاوە</label>
                <select 
                  value={streamType} 
                  onChange={(e) => setStreamType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="CUSTOMS">نوسینگەی گومرگ (CUSTOMS)</option>
                  <option value="BORDER_FEE">هاوردەکردنی سنوور (BORDER_FEE)</option>
                  <option value="TARIFF">تاریفەی دەروازەکان (TARIFF)</option>
                  <option value="TAX">باجە ناوخۆیییەکان (TAX)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">کۆد یان نیشانەی پەیوەندیدار (Entity ID)</label>
                <input
                  type="text"
                  required
                  placeholder="بۆ نموونە: DECL-KRG-30040"
                  value={sourceEntityId}
                  onChange={(e) => setSourceEntityId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">بڕی دانیشتنەکە (USD)</label>
                <input
                  type="number"
                  required
                  placeholder="بەهای دۆلاری فەرمی"
                  value={amountUSD}
                  onChange={(e) => setAmountUSD(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">لایەنی باجدەر یان کۆمپانیا</label>
                <input
                  type="text"
                  required
                  placeholder="بۆ نموونە: Korek Telecom"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">ناوی ئەفسەری واژۆکار</label>
                <input
                  type="text"
                  required
                  value={signatory}
                  onChange={(e) => setSignatory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
              >
                کۆمیتکردن بۆ تێپەڕبوونی هەرێمی
              </button>
            </form>
          </Card>

          {/* Isolation standard box */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl text-right space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">یاسا هەرێمییەکانی گەرەنتی (KRG Isolation)</h4>
            <div className="text-xs text-slate-500 leading-relaxed">
              <p>سەرجەم داتاکان بە شێوەی خۆماڵی تەنها لەم دراودا هەڵدەگیرێن و ناوەستن بۆ هیچ کێشەیەکی دەرەکی. داتای دەرەکی ناتوانێت دەستکاری ئەم تەمویلە بکات.</p>
              <div className="bg-[#0e172a] p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-blue-400 text-left mt-3">
                REG_ENCLAVE: ECDSA-384 / SHA-256<br />
                RESTRICTION: STRICT_ISOLATION_ZONE<br />
                STATUS: DECENTRALIZED_ACTIVE
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
