import React, { useState } from 'react';
import { 
  Landmark, ShieldAlert, Cpu, Coins, TrendingUp, AlertTriangle, 
  CheckCircle2, FileText, Lock, RefreshCw, Send, Database, Activity, AlignLeft
} from 'lucide-react';
import { Card, Badge, Button } from '../../ui';

// Import useGovernment context and Sovereign policy
import { useGovernment } from '../../providers/GovernmentProvider';
import { SovereignRevenueVisibilityPolicy } from '../../shared/revenue/SovereignRevenueVisibilityPolicy';

// Import Federal Revenue Engines
import { FederalRevenueLedgerEngine } from './core/RevenueLedgerEngine';
import { FederalCustomsRevenueEngine } from './core/CustomsRevenueEngine';
import { FederalBorderFeeEngine } from './core/BorderFeeEngine';
import { FederalTaxRevenueEngine } from './core/TaxRevenueEngine';
import { FederalRevenueLeakageDetectionEngine } from './core/RevenueLeakageDetectionEngine';
import { FederalRevenueCollectionEngine } from './core/RevenueCollectionEngine';

export default function FederalRevenueDashboard() {
  const { activeContext, userRole } = useGovernment();

  const caller = activeContext === 'FEDERAL_IRAQ' ? 'FEDERAL' : 
                 activeContext === 'KURDISTAN_REGION' ? 'KRG' : 'JOINT';

  const isAuthorized = SovereignRevenueVisibilityPolicy.authorizeAccess(caller, 'FEDERAL');

  // Spark state for refresh
  const [ticker, setTicker] = useState(0);
  const handleRefresh = () => setTicker(prev => prev + 1);

  // States for manual revenue collection form
  const [streamType, setStreamType] = useState<'CUSTOMS' | 'BORDER_FEE' | 'TAX' | 'TARIFF'>('CUSTOMS');
  const [sourceEntityId, setSourceEntityId] = useState('');
  const [amountUSD, setAmountUSD] = useState('');
  const [payerName, setPayerName] = useState('');
  const [signatory, setSignatory] = useState('Senior Federal Collector Al-Hashimi');
  const [feedback, setFeedback] = useState<{ success?: boolean; msg?: string } | null>(null);

  // Load Engines data
  const ledgerEntries = FederalRevenueLedgerEngine.getLedger();
  const ledgerStats = FederalRevenueLedgerEngine.getStats();
  const customsTotals = FederalCustomsRevenueEngine.getTotals();
  const borderTotals = FederalBorderFeeEngine.getTotals();
  const taxTotals = FederalTaxRevenueEngine.getTotals();
  const leakageAlerts = FederalRevenueLeakageDetectionEngine.getAlerts();
  const ledgerIntegrity = FederalRevenueLedgerEngine.verifyLedgerIntegrity();

  const handleCollectRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amountUSD);
    if (isNaN(amt) || amt <= 0 || !sourceEntityId || !payerName) {
      setFeedback({ success: false, msg: 'تکایە هەموو زانیارییەکان بە ڕاستی پڕ بکەرەوە' });
      return;
    }

    const res = FederalRevenueCollectionEngine.collectRevenue({
      streamType,
      sourceEntityId,
      amountUSD: amt,
      exporterOrPayer: payerName,
      signatory,
      jurisdictionTag: 'federal'
    });

    if (res.success) {
      setFeedback({ success: true, msg: `داهات بە سەرکەوتوویی تۆمارکرا! کلیل: ${res.txHash?.substring(0, 24)}...` });
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
            <h3 className="text-lg font-bold text-red-300 font-sans">هاوپێچی ڕێگەپێنەدراو: داتا پارێزراوە لەژێر یاسای سەروەری دارایی نیشتمانی</h3>
            <p className="text-sm text-red-400/90 mt-2 leading-relaxed font-sans">
              سیستەمی گشتی یەکگرتوو ڕێگا بە بینینی داهاتی ناوچەی فیدراڵ نادات لە دەرەوەی دەسەڵاتی فەرمی عێراقی فیدراڵ. هەوڵدان بۆ چوونەژوورەوەی جۆری <b>[{caller}]</b> بلۆککراوە.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-red-950/50 text-xs font-mono text-slate-400 text-left">
              SOVEREIGN_POLICY_REVENUE_ENFORCEMENT: federal_only_allow • SYSTEM_STATE: SECURITY_LOCKED
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
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#0e172a] p-6 rounded-2xl border border-slate-800 shadow-xl gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <Badge variant="teal">پارێزراوی فیدراڵی عێراق</Badge>
            <span className="text-[10px] uppercase font-mono text-slate-500 font-bold block">ناوچەی فیدراڵی پارێزراوی داهات (SECURE ENCLAVE)</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">سەنتەری بەڕێوبەرایەتی داهاتی نیشتمانی فیدراڵ</h2>
          <p className="text-xs text-slate-400 mt-1">چاودێریکردنی ڕاستەوخۆ دەستکارینەکراوی دەروازە گشتییەکان، گومرگ و باجەکان لە سەرانسەری عێراقی فیدراڵدا</p>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Button variant="outline" size="sm" onClick={handleRefresh} className="border-slate-800 hover:bg-slate-900 text-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            تازەکردنەوەی داتا
          </Button>
          <div className="bg-[#1e293b] py-2 px-4 rounded-xl border border-slate-800 text-center select-none">
            <span className="text-[10px] text-slate-500 block uppercase font-mono">تەواوێتی دەفتەری فەرمی</span>
            {ledgerIntegrity.isValid ? (
              <span className="text-emerald-400 text-xs font-bold font-mono">✓ بە کریپتۆگرافی پارێزراوە</span>
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
            <span className="text-slate-400 text-xs font-bold">کۆی گشتی داهاتی فیدراڵی</span>
            <Coins className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${(ledgerStats.totalRevenueUSD + borderTotals.totalCollectedUSD + taxTotals.totalPaid).toLocaleString()}</div>
          <p className="text-[10px] text-slate-500 mt-2">تێکەڵەی سەرجەم سەرچاوە متمانەپێکراوەکان</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">داهاتی گومرگ و تاریفەکان</span>
            <Database className="w-5 h-5 text-[#3b82f6]" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${customsTotals.totalCollectedDutyUSD.toLocaleString()}</div>
          <p className="text-[10px] text-blue-400 mt-2">بەها ڕوونبووەکان: ${customsTotals.totalDeclaredValueUSD.toLocaleString()}</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">باجە نیشتمانییە کۆکراوەکان</span>
            <Landmark className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${taxTotals.totalPaid.toLocaleString()}</div>
          <p className="text-[10px] text-amber-400 mt-2">کۆمپانیا و سێکتەرە فەرمییەکان</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">کۆی داهاتی دەروازەکانی سنوور</span>
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">${borderTotals.totalCollectedUSD.toLocaleString()}</div>
          <p className="text-[10px] text-emerald-400 mt-2">ترافیکی ئۆپەراسیۆنە فیدراڵییەکان</p>
        </Card>
      </div>

      {/* Main Grid: Management Form and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Collection Engine & Alerts Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Revenue Leakage Detection Alerts */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 border-b border-sidebar-border pb-3 mb-4 text-right justify-between">
              <span className="bg-red-950 text-red-400 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                {leakageAlerts.length} دۆزرایەوە
              </span>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">ئاگادارکردنەوەکانی لێچوونی داهات (Leakage Engine)</h3>
                <ShieldAlert className="w-4 h-4 text-red-400" />
              </div>
            </div>

            <div className="space-y-3">
              {leakageAlerts.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">هیچ سەرپێچییەک یان جیاوازییەکی داهات نەدۆزراوەتەوە.</div>
              ) : (
                leakageAlerts.map(alert => (
                  <div key={alert.id} className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between text-right gap-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={alert.severity === 'CRITICAL' ? 'destructive' : alert.severity === 'HIGH' ? 'orange' : 'teal'}>
                        {alert.severity === 'CRITICAL' ? 'زۆر مەترسیدار' : alert.severity === 'HIGH' ? 'مەترسیدار' : 'کەم/ناوەنجی'}
                      </Badge>
                      <span className="text-[10px] font-mono text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-xs font-bold text-white truncate max-w-[150px]">{alert.sourceName}</span>
                        <span className="text-[10px] font-mono text-teal-400 truncate">[{alert.sourceEntityId}]</span>
                      </div>
                      <div className="text-xs text-slate-400 break-words line-clamp-2">
                        کێشە:{' '}
                        <span className="text-slate-200">
                          {alert.anomalyType === 'TARIFF_MISAPPLY' ? 'کەمکردنەوەی ناڕەوای تاریفە' :
                           alert.anomalyType === 'UNDERVALUATION' ? 'کەمتر پیشاندانی بەهای گشتی' :
                           alert.anomalyType === 'FEE_EVASION' ? 'خۆدزینەوە لە ڕسوومات' :
                           alert.anomalyType === 'DELINQUENT_TAX' ? 'باجی دواکەوتووی نافەرمی' : alert.anomalyType}
                        </span> | بڕی بەهەدەرچوو:{' '}
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
              <h3 className="text-sm font-bold text-slate-100">دەفتەری گشتی نەگۆڕی سزادراو (Immutable Ledger Chain)</h3>
              <Lock className="w-4 h-4 text-teal-400" />
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs text-slate-300 table-fixed min-w-[600px]">
                <thead className="bg-slate-950 text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-start w-[220px]">کۆد و هاشی بلۆک</th>
                    <th className="p-3 text-right w-[100px]">جۆری گواستنەوە</th>
                    <th className="p-3 text-right w-[140px]">کۆمپانیا/باجدەر</th>
                    <th className="p-3 text-right w-[140px]">بەڕێوەبەری واژۆکار</th>
                    <th className="p-3 text-center w-[120px]">کۆی گشتی بڕ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 font-mono">
                  {ledgerEntries.map(entry => {
                    const parsedPayload = JSON.parse(entry.payload);
                    return (
                      <tr key={entry.id} className="hover:bg-slate-900/10">
                        <td className="p-3 text-start text-slate-500 overflow-hidden">
                          <span className="text-teal-400 font-bold block truncate">{entry.id}</span>
                          <span className="text-[9px] text-slate-600 block truncate font-mono select-all" title={entry.hash}>{entry.hash}</span>
                        </td>
                        <td className="p-3 text-right">
                          <Badge variant="teal">{entry.streamType === 'CUSTOMS' ? 'گومرگ' : entry.streamType === 'BORDER_FEE' ? 'رسوماتی سنوور' : entry.streamType === 'TARIFF' ? 'تاریفە' : 'باج'}</Badge>
                        </td>
                        <td className="p-3 text-right text-slate-300 font-sans truncate" title={parsedPayload.payer || 'مۆڵەتی دەرەکی'}>
                          {parsedPayload.payer || 'مۆڵەتی دەرەکی'}
                        </td>
                        <td className="p-3 text-right text-slate-400 truncate" title={entry.signatory}>{entry.signatory === 'Senior Federal Collector Al-Hashimi' ? 'کۆکەرەوەی باڵای فیدراڵی ئەلهاشمی' : entry.signatory}</td>
                        <td className="p-3 text-center text-white font-bold">${entry.amountUSD.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Collection Panel and Rules Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* RevenueCollectionEngine Form */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl text-right">
            <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center gap-2 justify-end border-b border-slate-800 pb-3">
              بریکاری تێکچووی تۆمارکردنی داهاتی فیدراڵ
              <Send className="w-4 h-4 text-teal-400" />
            </h3>

            {feedback && (
              <div className={`p-3 rounded-lg text-xs font-medium mb-3 text-center ${feedback.success ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                {feedback.msg}
              </div>
            )}

            <form onSubmit={handleCollectRevenue} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">جۆری سەرچاوەی داهات</label>
                <select 
                  value={streamType} 
                  onChange={(e) => setStreamType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="CUSTOMS">گومرگی فیدراڵ (CUSTOMS)</option>
                  <option value="BORDER_FEE">رسومات و گومرگی سنوور (BORDER_FEE)</option>
                  <option value="TARIFF">تاریفەی هاوردەکردن (TARIFF)</option>
                  <option value="TAX">باجی نیشتمانی (TAX)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">کۆد یان نیشانەی پەیوەندیدار (Entity ID)</label>
                <input
                  type="text"
                  required
                  placeholder="بۆ نموونە: DECL-FED-10023"
                  value={sourceEntityId}
                  onChange={(e) => setSourceEntityId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">کۆی گشتی داهات (USD)</label>
                <input
                  type="number"
                  required
                  placeholder="مەبلەغ بە دۆلار"
                  value={amountUSD}
                  onChange={(e) => setAmountUSD(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono text-right focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">سەرچاوە یان باجدەر</label>
                <input
                  type="text"
                  required
                  placeholder="ناوی باجدەر یان دەروازە"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white text-right focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-mono font-bold uppercase block">واژۆکار (Signatory)</label>
                <input
                  type="text"
                  required
                  value={signatory}
                  onChange={(e) => setSignatory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 text-right focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-slate-900 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
              >
                تۆمارکردن لە دەفتەری فەرمی فیدراڵی
              </button>
            </form>
          </Card>

          {/* Isolation & Cryptographic Standards Info */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl text-right space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">یاسا بەهێزەکانی جیاکردنەوە (Isolation protocols)</h4>
            <div className="text-xs text-slate-500 leading-relaxed space-y-2">
              <p>سەرجەم سەلمێنەرە فەرمییەکانی داهات بۆ داتاکانی دەرەوەی فیدراڵی بە تەواوی داخراون. هەر جۆرە بەراوردکارییەک تەنها لە ڕێگەی لایەنی سێیەمەوە ئەنجام دەدرێت.</p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[10px] text-teal-400 text-left">
                ENCLAVE: AES-256-GCM / SHA-256<br />
                COMMUNICATION: SECURE_CROSS_LOCK<br />
                ACCESS_CONTROL: STRICT_ROLES
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
