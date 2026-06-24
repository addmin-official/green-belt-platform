import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { NationalIntelligenceRegistry } from '../../shared/intelligence/NationalIntelligenceRegistry';
import { ThreatFusionEngine } from '../../shared/intelligence/ThreatFusionEngine';
import { ThreatCorrelationEngine, CorrelationCluster } from '../../shared/intelligence/ThreatCorrelationEngine';
import { ThreatForecastEngine } from '../../shared/intelligence/ThreatForecastEngine';
import { CrisisMonitoringEngine } from '../../shared/security-operations/CrisisMonitoringEngine';
import { JointThreatReconciliationEngine, JointThreatResolution } from '../../shared/security-operations/JointThreatReconciliationEngine';
import { SovereignThreatLedger, LedgerBlock } from '../../shared/intelligence/SovereignThreatLedger';
import { IncidentCommandEngine, CommandDirective } from '../../shared/security-operations/IncidentCommandEngine';
import { Card, Badge, Button } from '../../ui';
import {
  ShieldAlert, Radio, AlertTriangle, FileText, Lock, RefreshCw, Layers, TrendingUp, CheckCircle2, Award
} from 'lucide-react';

export default function JointNationalSecurityDashboard() {
  const { userRole, logAction } = useGovernment();
  const [ticker, setTicker] = useState(0);

  // Reconciliation form states
  const [resolvedAction, setResolvedAction] = useState('');
  const [selectedThreat1, setSelectedThreat1] = useState('');
  const [selectedThreat2, setSelectedThreat2] = useState('');

  // Emergency dispatch states
  const [dispatchUnit, setDispatchUnit] = useState('');
  const [dispatchNameKu, setDispatchNameKu] = useState('');

  const triggerUpdate = () => setTicker(prev => prev + 1);

  // Pull Data
  const fusion = ThreatFusionEngine.fuseCrossDomainEvents('joint');
  const correlations = ThreatCorrelationEngine.findCorrelations();
  const forecast = ThreatForecastEngine.generateForecast(7);
  const crisis = CrisisMonitoringEngine.monitorCrisisStatus();
  const resolutions = JointThreatReconciliationEngine.getResolutions();
  const ledger = SovereignThreatLedger.getChain().slice(-8).reverse(); // last 8 records
  const directives = IncidentCommandEngine.getDirectives();
  const allThreats = NationalIntelligenceRegistry.getThreats();

  const handleReconcile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThreat1 || !selectedThreat2 || !resolvedAction) return;

    try {
      const res = JointThreatReconciliationEngine.reconcileOverlappingThreats(
        [selectedThreat1, selectedThreat2],
        resolvedAction,
        userRole
      );

      logAction(
        userRole,
        `ئاشتەوایی نیشتمانی نوێ تۆمارکرا [${res.reconciliationId}] بۆ بنبڕکردنی لادانەکان لە کایەکانی فیدراڵ و هەرێم.`,
        'JOINT_RECONCILIATION_EVENT'
      );

      setResolvedAction('');
      setSelectedThreat1('');
      setSelectedThreat2('');
      triggerUpdate();
    } catch (err: any) {
      alert(err.message || 'Error executing joint reconciliation.');
    }
  };

  const handleDispatchCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchUnit || !dispatchNameKu) return;

    IncidentCommandEngine.dispatchEmergencyAction({
      targetUnitId: dispatchUnit,
      jurisdiction: 'joint',
      commandNameKu: dispatchNameKu,
      initiatedBy: userRole
    });

    logAction(
      userRole,
      `ڕەوانەکردنی خێرای گرووپی ئۆپەراسیۆنی هاوبەش بۆ یەکەی: ${dispatchUnit}. بابەت: ${dispatchNameKu}`,
      'TACTICAL_DISPATCH'
    );

    setDispatchUnit('');
    setDispatchNameKu('');
    triggerUpdate();
  };

  const getLevelColor = (level: string) => {
    if (level === 'CRITICAL' || level === 'SEVERE') return 'rose';
    if (level === 'HIGH' || level === 'ELEVATED') return 'amber';
    return 'teal';
  };

  return (
    <div className="flex flex-col gap-6 w-full text-start animate-fade-in">
      {/* Sovereign Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-400" />
            ناوەندی هاوبەشی بەڕێوەبردنی ئاسایش و هەواڵگری نیشتمانی (IDG Joint)
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            چاودێری خێرا، شیکردنەوەی پێشبینیکەر، و چارەسەرکردنی ڕووداوە ناتەباکانی نێوان حکومەتی فیدراڵ و هەرێم.
          </p>
        </div>
        <div>
          <Button
            onClick={triggerUpdate}
            className="bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800 text-xs p-1.5"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Stats Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">شاخی مەترسی نیشتمانی</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white font-mono">{fusion.unifiedScore}%</span>
              <Badge variant={getLevelColor(fusion.threatLevel)}>
                {fusion.threatLevel}
              </Badge>
            </div>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">مەترسی تێکەڵکراو</span>
          </div>
          <div className="p-3 bg-teal-950/50 border border-teal-900/30 rounded-lg text-teal-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">لادانە ناتەباکان (Correlations)</span>
            <span className="text-2xl font-bold text-amber-400 font-mono block mt-1">{correlations.length} تێکەڵکراو</span>
            <span className="text-[10px] text-amber-500 font-mono mt-1 block">پێویستی بە چارەسەر</span>
          </div>
          <div className="p-3 bg-amber-950/50 border border-amber-900/30 rounded-lg text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">ئاستی پچڕانی قەیران</span>
            <span className="text-2xl font-bold text-rose-400 font-mono block mt-1">{crisis.overallDisruptionPercent}%</span>
            <span className="text-[10px] text-rose-500/80 font-mono mt-1 block">چاودێری وێنەی گشتی</span>
          </div>
          <div className="p-3 bg-rose-950/50 border border-rose-900/30 rounded-lg text-rose-400">
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">پێشبینی مەترسی داهاتوو</span>
            <div className="flex items-baseline gap-2 mt-[2px]">
              <span className="text-lg font-bold text-white font-mono">{forecast.expectedThreatIndex}% ({forecast.trend.toUpperCase()})</span>
            </div>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">خوولی پێشبینی کەشوان</span>
          </div>
          <div className="p-3 bg-teal-950/50 border border-teal-900/30 rounded-lg text-teal-400">
            <Award className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Predictions and Crisis Details */}
      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-2">
        وردەکاری پێشبینی ئاسایش و دۆخی قەیرانی لادانەکان
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-bold text-[#E0A96D] flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            ئاراستەی مەترسی گشتی لەسەر ڕێڕەوی {forecast.targetHorizonDays} رۆژی داهاتوو
          </span>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            <span className="text-slate-500 font-bold">کایەی سەرەکی مەترسی دار:</span> {forecast.primaryRiskVectorKu}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>بەرزترین ئاستی چاوەڕوانکراو:</span>
            <Badge variant={getLevelColor(forecast.predictedPeakThreatLevel)}>{forecast.predictedPeakThreatLevel}</Badge>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-bold text-teal-400 flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            جێبەجێکردنی بڕگە و جومگەکانی بڕینی قەیرانی چالاک
          </span>
          <div className="mt-3 space-y-2 text-xs">
            {crisis.crisisMetrics.map(cr => (
              <div key={cr.categoryKu} className="flex justify-between items-center bg-slate-950/40 p-1.5 rounded border border-slate-900">
                <span className="text-slate-300 font-bold">{cr.categoryKu}</span>
                <span className="text-slate-500 font-mono">{cr.intensityUnit}</span>
                <Badge variant={cr.status === 'CRITICAL_DISRUPTION' ? 'rose' : cr.status === 'ELEVATED_RISK' ? 'amber' : 'teal'}>
                  {cr.status} ({cr.percentageImbalance}%)
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roster / Inputs Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left correlations / dispatches */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Active overlapping correlations */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                لادان و کارلێکە گوماناوییەکانی نێوان کەرتی فیدراڵ و هەرێم
              </span>
              <Badge variant="rose">ناڕێکی ژێربینیا</Badge>
            </h3>

            {correlations.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/50 rounded-lg text-slate-500 text-xs">
                چاکە: هیچ کارلێکێکی ناڕوون لە لایەن مەکینەی شیکردنەوەوە تێبینی نەکراوە.
              </div>
            ) : (
              <div className="space-y-4">
                {correlations.map(corr => (
                  <div key={corr.id} className="bg-slate-955/20 border border-slate-850 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{corr.id}</span>
                      <Badge variant="rose">رێژەی کارلێک: {corr.correlationFactor}</Badge>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-2">
                      {corr.descriptionKu}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-slate-500">
                      کۆدە یەکگرتووەکان: {corr.sharedEntities.join(', ')} &bull; ناسنامەی هەڕەشە هاوپەیوەندەکان: {corr.threatIds.join(' , ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Sealed reconciliations logs */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                تۆماری ئاشتەوایی و مۆرە هاوبەشە فەرمییەکان
              </span>
              <Badge variant="teal">ڕاستەقینە - پارێزراو</Badge>
            </h3>

            <div className="space-y-3">
              {resolutions.map(res => (
                <div key={res.reconciliationId} className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">{res.reconciliationId}</span>
                      <Badge variant="teal">{res.reconciledStatus.toUpperCase()}</Badge>
                      <span className="text-[10px] text-slate-500 font-mono">{new Date(res.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mt-2">{res.resolvedActionKu}</p>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      لایەنەکان: {res.agreedByParties.join(' & ')} &bull; ناسنامە کێشەدارە چاککراوەکان: {res.associatedThreatIds.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right input panels */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Reconciliation trigger Form */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              ئاشتەوایی لادانەکان (Form)
            </h3>

            <form onSubmit={handleReconcile} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold font-sans">هەڵبژاردنی هەڕەشەی فیدراڵ</label>
                <select
                  required
                  value={selectedThreat1}
                  onChange={(e) => setSelectedThreat1(e.target.value)}
                  className="bg-slate-955 border border-slate-800 rounded px-1 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                >
                  <option value="">بەڵگەنامەی جێگۆڕکێی یەکەم...</option>
                  {allThreats.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.id} - {t.titleKu.slice(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold font-sans">هەڵبژاردنی هەڕەشەی هەرێمی</label>
                <select
                  required
                  value={selectedThreat2}
                  onChange={(e) => setSelectedThreat2(e.target.value)}
                  className="bg-slate-955 border border-slate-800 rounded px-1 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                >
                  <option value="">بەڵگەنامەی جێگۆڕکێی دووەم...</option>
                  {allThreats.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.id} - {t.titleKu.slice(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold font-sans">فەرمانی واژۆی هاوبەش (بڕیارنامە)</label>
                <textarea
                  required
                  rows={3}
                  placeholder="بۆ نموونە: نوێکردنەوەی مانیفێستی هاوبەش و واژۆکردنی سیستم لە دەروازە..."
                  value={resolvedAction}
                  onChange={(e) => setResolvedAction(e.target.value)}
                  className="bg-slate-955 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                نزامکردن و چارەسەرکردنی هاوبەش
              </button>
            </form>
          </Card>

          {/* Joint Tactical command dispatch form */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              فەرمانی ڕەوانەکردنی هێزی هاوبەش (Dispatch)
            </h3>

            <form onSubmit={handleDispatchCommand} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ناسنامەی دەروازە یان یەکە (Target ID)</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: IBRAHIM_KHALIL_SITE"
                  value={dispatchUnit}
                  onChange={(e) => setDispatchUnit(e.target.value)}
                  className="bg-slate-955 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold font-sans">فەرمانی ئۆپەراسیۆن (بە کوردی)</label>
                <input
                  type="text"
                  required
                  placeholder="ڕێگریکردنی کاتی کاروانە نایاساییەکان..."
                  value={dispatchNameKu}
                  onChange={(e) => setDispatchNameKu(e.target.value)}
                  className="bg-slate-955 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5" />
                جێبەجێکردنی فەرمانی خێرا
              </button>
            </form>
          </Card>

          {/* Immutable Cryptographic Ledger blocks */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl">
            <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              لۆگی سەپاندنی مۆرە یەکگرتووەکان (Sovereign Ledger)
            </h3>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {ledger.map(block => (
                <div key={block.hash} className="bg-slate-950 p-2.5 rounded border border-slate-900 flex justify-between items-start gap-1 font-mono text-[9px] text-slate-400 leading-relaxed">
                  <div>
                    <div className="font-bold text-emerald-400">#{block.index} &bull; {block.dataType.toUpperCase()}</div>
                    <div className="text-[8px] text-slate-500 mt-0.5">{block.timestamp}</div>
                    <div className="text-[8px] text-slate-500 mt-1 truncate max-w-[170px]">Prev: {block.previousHash}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="bg-slate-900 border border-slate-800 text-teal-400 px-1 py-0.5 rounded block text-[9px] max-w-[130px] truncate">
                      {block.hash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
