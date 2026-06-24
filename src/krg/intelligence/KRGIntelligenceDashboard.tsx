import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { NationalIntelligenceRegistry } from '../../shared/intelligence/NationalIntelligenceRegistry';
import { ThreatFusionEngine } from '../../shared/intelligence/ThreatFusionEngine';
import { StrategicRiskEngine } from '../../shared/intelligence/StrategicRiskEngine';
import { NationalAlertEngine } from '../../shared/security-operations/NationalAlertEngine';
import { SovereignThreatLedger } from '../../shared/intelligence/SovereignThreatLedger';
import { Card, Badge, Button } from '../../ui';
import {
  ShieldAlert, AlertTriangle, Radio, Lock, RefreshCw, Landmark, Zap, Award
} from 'lucide-react';

export default function KRGIntelligenceDashboard() {
  const { userRole, logAction } = useGovernment();
  const [ticker, setTicker] = useState(0);
  const triggerUpdate = () => setTicker(p => p + 1);

  // Local report states
  const [newTitleKu, setNewTitleKu] = useState('');
  const [newDescKu, setNewDescKu] = useState('');
  const [newDomain, setNewDomain] = useState<'border' | 'customs' | 'revenue' | 'trade' | 'security'>('security');
  const [newWeight, setNewWeight] = useState(50);

  // States
  const fusion = ThreatFusionEngine.fuseCrossDomainEvents('krg');
  const risks = StrategicRiskEngine.assessStrategicRisks();
  const alerts = NationalAlertEngine.getAlerts('krg');
  const threats = NationalIntelligenceRegistry.getThreats('krg');

  const handlePostThreat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleKu || !newDescKu) return;
    const threatId = `TE-KRG-${Math.floor(100 + Math.random() * 900)}`;

    NationalIntelligenceRegistry.addThreat({
      id: threatId,
      sourceDomain: newDomain,
      jurisdiction: 'krg',
      titleEn: "Regional KRG Intelligence Alert Event",
      titleKu: newTitleKu,
      descriptionEn: "Manually registered regional anomaly assessed under sovereign KRG boundary protocol.",
      descriptionKu: newDescKu,
      indicatorWeight: Number(newWeight),
      timestamp: new Date().toISOString(),
      sealedHash: 'STL_KRG_SEALED',
      associatedEntities: ['KRG_LOCAL_DESK']
    });

    logAction(
      userRole,
      `فەرمانی تۆمارکردنی کێشە لە ناوەندی هەرێم [${threatId}]: ${newTitleKu}`,
      'KRG_THREAT_REPORT'
    );

    setNewTitleKu('');
    setNewDescKu('');
    triggerUpdate();
  };

  const getLevelColor = (level: string) => {
    if (level === 'CRITICAL' || level === 'SEVERE') return 'rose';
    if (level === 'HIGH' || level === 'ELEVATED') return 'amber';
    return 'teal';
  };

  return (
    <div className="flex flex-col gap-6 w-full text-start animate-fade-in">
      {/* KRG Specific Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-500 animate-pulse" />
            سیستمی چاودێری و هەواڵگری هەرێمی کوردستان (KRG Core)
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-1">
            چاودێری خاڵە گومرگییە نیشتمانییەکان، مانیفێستی بارهەڵگر، و ڕێگری لە دەستکاریکردنی تاریفە سنوورییەکانی باکوور.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={triggerUpdate}
            className="bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800 text-xs p-1.5"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main KPIs layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">مەترسی هەرێمی (Index)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-white font-mono">{fusion.unifiedScore}%</span>
              <Badge variant={getLevelColor(fusion.threatLevel)}>
                {fusion.threatLevel}
              </Badge>
            </div>
            <span className="text-[10px] text-teal-400 font-mono mt-1 block">شیکردنەوەی چالاکی هەرێم</span>
          </div>
          <div className="p-3 bg-teal-950/50 border border-teal-900/30 rounded-lg text-teal-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">دۆسیە هەرێمییەکان</span>
            <span className="text-2xl font-bold text-white font-mono block mt-1">{threats.length} دۆسیە</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">لەسەر ئاستی باڵا</span>
          </div>
          <div className="p-3 bg-emerald-950/50 border border-emerald-900/30 rounded-lg text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">ئامادەیی تەواوی سنوور</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono block mt-1">94%</span>
            <span className="text-[10px] text-teal-500 font-mono mt-1 block">کایەی بێ کێشە</span>
          </div>
          <div className="p-3 bg-emerald-950/50 border border-emerald-900/30 rounded-lg text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">ئاگادارکەرەوەکانی KRG</span>
            <span className="text-2xl font-bold text-amber-400 font-mono block mt-1">{alerts.length} چالاک</span>
            <span className="text-[10px] text-amber-500 font-mono mt-1 block">سایتە سنوورییەکان</span>
          </div>
          <div className="p-3 bg-amber-950/50 border border-amber-900/30 rounded-lg text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Strategic Risks KRG Map */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase">ئاسایشی دەروازەی باکوور</span>
          <span className="text-xs font-bold text-slate-300 block mt-1">REGIONAL_BORDER_RISK</span>
          <div className="mt-2">
            <Badge variant={getLevelColor(risks.borderRiskLevel)}>{risks.borderRiskLevel}</Badge>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase">بەهای باج لە دەروازەکان</span>
          <span className="text-xs font-bold text-slate-300 block mt-1">REGIONAL_REVENUE_RISK</span>
          <div className="mt-2">
            <Badge variant={getLevelColor(risks.revenueRiskLevel)}>{risks.revenueRiskLevel}</Badge>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase">مۆڵەتنامە ناوخۆییەکانی هەرێم</span>
          <span className="text-xs font-bold text-slate-300 block mt-1">REGIONAL_TRADE_RISK</span>
          <div className="mt-2">
            <Badge variant={getLevelColor(risks.tradeRiskLevel)}>{risks.tradeRiskLevel}</Badge>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-sm font-sans font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <span>هەڕەشە و بارودۆخە پارێزراوەکانی ژێر دەسەڵاتی هەرێم</span>
              <Badge variant="teal">Isolative Roster</Badge>
            </h3>

            {threats.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/50 rounded-lg text-slate-500 text-xs">
                هیچ کۆدەنگی ناڕێکییەکی چالاک نەنۆسراوە لەم کایەیەدا.
              </div>
            ) : (
              <div className="space-y-4">
                {threats.map(t => (
                  <div key={t.id} className="bg-slate-955/20 border border-slate-850 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{t.id}</span>
                      <span className="text-[10px] text-amber-400 font-mono">وەزن: {t.indicatorWeight}</span>
                      <span className="text-[10px] text-slate-500 font-mono ml-auto">{new Date(t.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200 mt-2 font-sans">{t.titleKu}</h4>
                    <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                      {t.descriptionKu}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              تۆمارکردنی هەڕەشەی نوێ KRG
            </h3>

            <form onSubmit={handlePostThreat} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">ناو یان ناسنامەی دۆسیەکە</label>
                <input
                  type="text"
                  required
                  placeholder="بۆ نموونە: تێکدانی سیستمی بارکردن..."
                  value={newTitleKu}
                  onChange={(e) => setNewTitleKu(e.target.value)}
                  className="bg-slate-955 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">باسکردن و هۆکارەکان</label>
                <textarea
                  required
                  rows={3}
                  placeholder="ڕوونکردنەوەی کێشەی تەکنیکی یان گومرگی هەرێم..."
                  value={newDescKu}
                  onChange={(e) => setNewDescKu(e.target.value)}
                  className="bg-slate-955 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none resize-none font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">بۆماوەی سەرەکی</label>
                  <select
                    value={newDomain}
                    onChange={(e: any) => setNewDomain(e.target.value)}
                    className="bg-slate-955 border border-slate-800 rounded px-1 py-1 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="border">BORDER (سنوور)</option>
                    <option value="customs">CUSTOMS (گومرگ)</option>
                    <option value="revenue">REVENUE (داهات)</option>
                    <option value="trade">TRADE (بازرگانی)</option>
                    <option value="security">SECURITY (ئاسایش)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-mono text-slate-500 font-bold">کێشە (10-100)</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="bg-slate-955 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-slate-900 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                تۆمارکرنی هەڕەشەی پێویسته
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
