import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { NationalIntelligenceRegistry } from '../../shared/intelligence/NationalIntelligenceRegistry';
import { ThreatFusionEngine } from '../../shared/intelligence/ThreatFusionEngine';
import { StrategicRiskEngine } from '../../shared/intelligence/StrategicRiskEngine';
import { NationalAlertEngine } from '../../shared/security-operations/NationalAlertEngine';
import { NationalWatchlistEngine } from '../../shared/intelligence/NationalWatchlistEngine';
import { SovereignThreatLedger } from '../../shared/intelligence/SovereignThreatLedger';
import { NetworkAnalysisEngine } from '../../shared/intelligence/NetworkAnalysisEngine';
import { IncidentCommandEngine } from '../../shared/security-operations/IncidentCommandEngine';
import { Card, Badge, Button } from '../../ui';
import {
  Shield, ShieldAlert, AlertTriangle, Radio, Award, Lock, Eye, RefreshCw, CheckCircle2,
  ListFilter, Landmark, Zap, Network, HelpCircle
} from 'lucide-react';

export default function FederalIntelligenceDashboard() {
  const { userRole, logAction } = useGovernment();
  const [ticker, setTicker] = useState(0);
  const triggerUpdate = () => setTicker(p => p + 1);

  // States for reporting a threat
  const [newTitleKu, setNewTitleKu] = useState('');
  const [newDescKu, setNewDescKu] = useState('');
  const [newDomain, setNewDomain] = useState<'border' | 'customs' | 'revenue' | 'trade' | 'integrity' | 'security'>('security');
  const [newWeight, setNewWeight] = useState(50);
  const [newEntity, setNewEntity] = useState('');

  // States for Watchlist insertion
  const [watchId, setWatchId] = useState('');
  const [watchNameKu, setWatchNameKu] = useState('');
  const [watchReasonKu, setWatchReasonKu] = useState('');
  const [watchType, setWatchType] = useState<'person' | 'organization' | 'cargo'>('person');
  const [watchRating, setWatchRating] = useState<'low' | 'medium' | 'high' | 'critical'>('high');

  // Load analytical indexes
  const fusion = ThreatFusionEngine.fuseCrossDomainEvents('federal');
  const risks = StrategicRiskEngine.assessStrategicRisks();
  const centralNodes = NetworkAnalysisEngine.analyzeCentrality();
  const alerts = NationalAlertEngine.getAlerts('federal');
  const watchlisted = NationalWatchlistEngine.queryWatchlist();
  const threats = NationalIntelligenceRegistry.getThreats('federal');
  const ledger = SovereignThreatLedger.getChain().filter(c => c.dataType === 'threat_event' || c.dataType === 'watchlist');

  const handlePostThreat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleKu || !newDescKu) return;
    const threatId = `TE-FED-${Math.floor(100 + Math.random() * 900)}`;
    const mockEnglishTitle = "Sovereign Federal Security Threat Assessment";
    const mockEnglishDesc = "Anonymously flagged domestic manifest discrepancy with sovereign implications.";

    NationalIntelligenceRegistry.addThreat({
      id: threatId,
      sourceDomain: newDomain,
      jurisdiction: 'federal',
      titleEn: mockEnglishTitle,
      titleKu: newTitleKu,
      descriptionEn: mockEnglishDesc,
      descriptionKu: newDescKu,
      indicatorWeight: Number(newWeight),
      timestamp: new Date().toISOString(),
      sealedHash: 'STL_RECOGNIZED_SEAL',
      associatedEntities: newEntity ? [newEntity] : ['INTERNAL_AUDIT_FED']
    });

    logAction(
      userRole,
      `ڕاگەیاندنی فەرمی هەڕەشەی نوێ [${threatId}] بەهۆی ناڕێکی: ${newTitleKu}`,
      'THREAT_ASSESSMENT_PUBLISH'
    );

    setNewTitleKu('');
    setNewDescKu('');
    setNewEntity('');
    triggerUpdate();
  };

  const handleAddToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!watchId || !watchNameKu || !watchReasonKu) return;

    NationalWatchlistEngine.addWatchlistEntity({
      id: watchId,
      type: watchType,
      nameEn: "Sovereign Target Asset Assessment",
      nameKu: watchNameKu,
      riskRating: watchRating,
      addedByJurisdiction: 'federal',
      reasonEn: "Targeted under ongoing federal security profiling strategy.",
      reasonKu: watchReasonKu
    });

    logAction(
      userRole,
      `زیادکردنی بڕگەی تاقیکراو بۆ چاودێری نیشتمانی فیدراڵ: ${watchNameKu} (${watchId})`,
      'WATCHLIST_ADD_ACTION'
    );

    setWatchId('');
    setWatchNameKu('');
    setWatchReasonKu('');
    triggerUpdate();
  };

  const handleBroadcastEmergency = () => {
    NationalAlertEngine.broadcastNationalAlert(
      'EMERGENCY',
      'ئاگادارکردنەوەی جومگەی بارودۆخی دەروازەی سنووری نیشتمانی',
      'ڕاگرتنی کاتی بەهاکانی بەشداران و بەرزکردنەوەی ئاستی پشکنینی ئاراستەکان بە مۆری فیدراڵ.',
      'federal'
    );
    logAction(userRole, 'بڵاوکردنەوەی هۆشداری ئاسایشی نیشتمانی کتوپڕ.', 'NATIONAL_SECURITY_EMERGENCY');
    triggerUpdate();
  };

  // Maps levels to styles
  const getLevelColor = (level: string) => {
    if (level === 'CRITICAL' || level === 'SEVERE') return 'rose';
    if (level === 'HIGH' || level === 'ELEVATED') return 'amber';
    return 'teal';
  };

  return (
    <div className="flex flex-col gap-6 w-full text-start animate-fade-in">
      {/* Top Banner & Emergency Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
            سیستمی تێکەڵکردنی هەواڵگری نیشتمانی فیدراڵ
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            لێکۆڵینەوە، شیکردنەوەی مەترسی ئاسایشی نیشتمانی، و گەرەنتی کردنی یەکپارچەیی سەرچاوەکانی داهات و گومرگ.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleBroadcastEmergency}
            className="bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-800/40 text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            بڵاوکردنەوەی هۆشداریی فریاکەوتن
          </Button>
          <Button
            onClick={triggerUpdate}
            className="bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800 text-xs p-1.5"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Stats KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">ئاستی گشتی مەترسی</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white font-mono">{fusion.unifiedScore}%</span>
              <Badge variant={getLevelColor(fusion.threatLevel)}>
                {fusion.threatLevel}
              </Badge>
            </div>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">شاخی هەواڵگری فیدراڵ</span>
          </div>
          <div className="p-3 bg-teal-950/50 border border-teal-900/30 rounded-lg text-teal-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">هەڕەشە چالاکەکان</span>
            <span className="text-2xl font-bold text-white font-mono block mt-1">{threats.length} دۆسیە</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">لە ژێر لێکۆڵینەوەدا</span>
          </div>
          <div className="p-3 bg-emerald-950/50 border border-emerald-900/30 rounded-lg text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">لیستی چاودێری فیدراڵ</span>
            <span className="text-2xl font-bold text-rose-400 font-mono block mt-1">{watchlisted.length} ئامانج</span>
            <span className="text-[10px] text-rose-500/80 font-mono mt-1 block">توماری گشتی چالاک</span>
          </div>
          <div className="p-3 bg-rose-950/50 border border-rose-900/30 rounded-lg text-rose-400">
            <Eye className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">ئامادەیی نیشتمانی فیدراڵ</span>
            <span className="text-2xl font-bold text-white font-mono block mt-1">92%</span>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">بەردەوامی مۆرەکان</span>
          </div>
          <div className="p-3 bg-teal-950/50 border border-teal-900/30 rounded-lg text-teal-400">
            <Award className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Domain Risk Matrices */}
      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-2">
        پشکنینی دۆخی ئاسایشی گشتی و مەترسییەکانی کایەکان
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl">
          <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase">ئاسایشی سنوورەکان</span>
          <span className="text-xs font-bold text-slate-300 block mt-1">BORDER_SECURITY</span>
          <div className="mt-2">
            <Badge variant={getLevelColor(risks.borderRiskLevel)}>{risks.borderRiskLevel}</Badge>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl">
          <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase">پاراستنی گومرگ</span>
          <span className="text-xs font-bold text-slate-300 block mt-1">CUSTOMS_OVERSIGHT</span>
          <div className="mt-2">
            <Badge variant={getLevelColor(risks.customsRiskLevel)}>{risks.customsRiskLevel}</Badge>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl">
          <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase">رێگری لە کورتهێنانی داهات</span>
          <span className="text-xs font-bold text-slate-300 block mt-1">REVENUE_RISK</span>
          <div className="mt-2">
            <Badge variant={getLevelColor(risks.revenueRiskLevel)}>{risks.revenueRiskLevel}</Badge>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl">
          <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase">بڕیکردنی ساختەکاری بازرگانی</span>
          <span className="text-xs font-bold text-slate-300 block mt-1">TRADE_MANIP_RISK</span>
          <div className="mt-2">
            <Badge variant={getLevelColor(risks.tradeRiskLevel)}>{risks.tradeRiskLevel}</Badge>
          </div>
        </div>
      </div>

      {/* Grid: Left Main Threats, Right Input forms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left lists */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Active threat events */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                هەڕەشە هەواڵگرییە چالاکەکانی فیدراڵ
              </span>
              <Badge variant="teal">پارێزراوی فەرمی</Badge>
            </h3>

            {threats.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/50 rounded-lg text-slate-500 text-xs">
                چاکە: هیچ مەترسییەکی چالاک نەنۆسراوە لەم بەشەدا.
              </div>
            ) : (
              <div className="space-y-4">
                {threats.map(t => (
                  <div key={t.id} className="bg-slate-955/20 border border-slate-850 p-4 rounded-xl flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="p-2 bg-rose-950/40 border border-rose-900/40 text-rose-400 rounded mt-1">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-white">{t.id}</span>
                          <Badge variant={getLevelColor(t.indicatorWeight >= 75 ? 'SEVERE' : t.indicatorWeight >= 45 ? 'HIGH' : 'LOW')}>
                            وەزن: {t.indicatorWeight}
                          </Badge>
                          <span className="text-[10px] text-slate-500 font-mono">{new Date(t.timestamp).toLocaleString()}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 mt-2 font-sans">{t.titleKu}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1">
                          {t.descriptionKu}
                        </p>
                        <div className="mt-2 text-[10px] font-mono text-slate-500 leading-relaxed">
                          <span className="text-slate-500">مۆر و ناسنامەی هاوبەند:</span> {t.associatedEntities.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-teal-400 border border-slate-800">
                        {t.sourceDomain.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Watchlists */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                لیستی چاودێری ئامانجە مەترسیدارەکانی دەوڵەت
              </span>
              <Badge variant="rose">مەمنوعی فەرمی</Badge>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-slate-350">
                <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                  <tr>
                    <th className="p-2.5 text-start">کۆدی ئامانج</th>
                    <th className="p-2.5 text-start">ناو یان ناسنامە</th>
                    <th className="p-2.5 text-start">جۆری ڕشتن</th>
                    <th className="p-2.5 text-center">ئاستی مەترسی</th>
                    <th className="p-2.5 text-start">هۆکار و لێکدانەوە</th>
                    <th className="p-2.5 text-center">کۆنترۆڵەکان</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {watchlisted.map(w => (
                    <tr key={w.id} className="hover:bg-slate-900/10">
                      <td className="p-2.5 font-mono text-[11px] text-slate-500">{w.id}</td>
                      <td className="p-2.5 font-bold text-slate-200">{w.nameKu}</td>
                      <td className="p-2.5 capitalize text-slate-400">{w.type}</td>
                      <td className="p-2.5 text-center">
                        <Badge variant={w.riskRating === 'critical' || w.riskRating === 'high' ? 'rose' : 'amber'}>
                          {w.riskRating.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-2.5 text-[11px] text-slate-400 max-w-xs truncate">{w.reasonKu}</td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => {
                            NationalWatchlistEngine.updateWatchlistRating(w.id, 'critical', userRole);
                            triggerUpdate();
                          }}
                          className="px-2 py-0.5 rounded text-[10px] bg-rose-950/40 text-rose-400 border border-rose-900/30 font-mono hover:bg-rose-900/40 cursor-pointer transition"
                        >
                          SET_CRIT
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right sidebars/inputs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Post intelligence threat assessment */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-teal-400" />
              تۆمارکردنی هەڕەشەی نوێ (Triage)
            </h3>

            <form onSubmit={handlePostThreat} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">بابەتی مەترسی بە کوردی</label>
                <input
                  type="text"
                  required
                  placeholder="بۆ نموونە: گومانی بارکردنی نایاسایی..."
                  value={newTitleKu}
                  onChange={(e) => setNewTitleKu(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">لێکدانەوەی ورد</label>
                <textarea
                  required
                  rows={3}
                  placeholder="باسکردنی ڕاستەقینەی ڕووداوەکە بەبێ ناوی گشتی..."
                  value={newDescKu}
                  onChange={(e) => setNewDescKu(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">بۆماوەی سەرەکی</label>
                  <select
                    value={newDomain}
                    onChange={(e: any) => setNewDomain(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-1 py-1 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="border">BORDER (سنوور)</option>
                    <option value="customs">CUSTOMS (گومرگ)</option>
                    <option value="revenue">REVENUE (داهات)</option>
                    <option value="trade">TRADE (بازرگانی)</option>
                    <option value="security">SECURITY (ئاسایش)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">مەترسی (0-100)</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold font-sans">هاوپەیوەند (ID)</label>
                <input
                  type="text"
                  placeholder="ORG-TRADER-901 یان هیتر"
                  value={newEntity}
                  onChange={(e) => setNewEntity(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                راگەیاندنی مۆرکراو
              </button>
            </form>
          </Card>

          {/* Add to watchlist */}
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              نووسینی بڕگەی نوێ بۆ لیستی چاودێری
            </h3>

            <form onSubmit={handleAddToWatchlist} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">کۆد (Target ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="ORG-INC-889"
                    value={watchId}
                    onChange={(e) => setWatchId(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">جۆری پەلەکە</label>
                  <select
                    value={watchType}
                    onChange={(e: any) => setWatchType(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-1 py-1 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="person">PERSON (کارمەند / ئەکتەر)</option>
                    <option value="organization">ORGANIZATION (کۆمپانیا)</option>
                    <option value="cargo">CARGO (بارهەڵگر)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ناو (بە کوردی)</label>
                <input
                  type="text"
                  required
                  placeholder="ناوی مۆڵەت یان کۆمپانیا"
                  value={watchNameKu}
                  onChange={(e) => setWatchNameKu(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">یەکگرتنەوە و هۆكار</label>
                <input
                  type="text"
                  required
                  placeholder="هۆکاری خستنە ناو لیست..."
                  value={watchReasonKu}
                  onChange={(e) => setWatchReasonKu(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ئاستی دڵنیایی</label>
                <select
                  value={watchRating}
                  onChange={(e: any) => setWatchRating(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-1 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                >
                  <option value="low">LOW RISK</option>
                  <option value="medium">MEDIUM RISK</option>
                  <option value="high">HIGH RISK</option>
                  <option value="critical">CRITICAL_ALERT</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                سەپاندنی مۆر لەسەر تۆمار
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
