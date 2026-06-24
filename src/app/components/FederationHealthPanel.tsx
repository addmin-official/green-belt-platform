import React, { useState, useEffect } from 'react';
import { FederationOperationsEngine, FederationHealthMetrics } from '../../services/federation/FederationOperationsEngine';
import { Card, Badge } from '../../ui';
import { Activity, ShieldAlert, Heart, RefreshCw, Layers, Terminal } from 'lucide-react';
import { useGovernment } from '../../providers/GovernmentProvider';

interface FederationHealthPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const FederationHealthPanel: React.FC<FederationHealthPanelProps> = ({ lang }) => {
  const { auditTrail } = useGovernment();
  const [metrics, setMetrics] = useState<FederationHealthMetrics>(() => 
    FederationOperationsEngine.getFederationHealth()
  );

  const reloadMetrics = () => {
    setMetrics(FederationOperationsEngine.getFederationHealth());
  };

  useEffect(() => {
    // Reload whenever audit trail registers a transition action
    reloadMetrics();
  }, [auditTrail]);

  const t = {
    en: {
      title: 'Federation Health & Unification Readiness Indicators',
      sub: 'Dynamic system alignment quotients calculated based on treaty adoption, PKI trust factors, and state-level sync rates.',
      uniscore: 'Consolidated Integration Index',
      fedscore: 'Federation Operations Quotient',
      risk: 'Active Operational Risk Index',
      actionsHeader: 'System Optimization Priorities',
      actionsDesc: 'Quantitative recommended actions to improve integration factor weights:',
      auditHeader: 'Unified Security Exchange Signal Logs'
    },
    ar: {
      title: 'مؤشر سلامة التكامل وجاهزية الفيدرالية الموحدة',
      sub: 'خوارزميات قياس ومحاكاة التوافق والترابط الفيدرالي المستندة إلى معاهدات السجل، ونشاط بوابات التحقق السيادية.',
      uniscore: 'معدل الاندماج الفيدرالي الشامل',
      fedscore: 'مؤشر كفاءة العمل السيادي المشترك',
      risk: 'مستوى المخاطر التشغيلية النشطة',
      actionsHeader: 'أولويات تحسين وتوافق الأنظمة المشتركة',
      actionsDesc: 'الإجراءات المقترحة لرفع مستويات التوافق والأمان الفيدرالي:',
      auditHeader: 'سجلات الإرسال والمصادقة الأمنية المشتركة'
    },
    ku: {
      title: 'نیشاندەرەکانی فەرمی ئامادەیی و دۆخی گونجانی فیدراڵ',
      sub: 'سیستەمی هەژمارکردنی خودکار بۆ تێکەڵبوون و گونجانی تەکنیکی نێوان دەروازەکان و کۆنتڕۆڵی باڵا.',
      uniscore: 'ئاستی یەکگرتنی گشتی (Unification)',
      fedscore: 'ڕێژەی هاوبەشی فیدراڵ (Federation)',
      risk: 'نیشاندەری مەترسی ئۆپەراسیۆنەکان',
      actionsHeader: 'هەنگاوەکانی پێشخستنی هاوتەریبی نیشتمانی',
      actionsDesc: 'کردارە ڕاسپێردراوەکان بۆ بەرزکردنەوەی ژمارەکانی گونجان:',
      auditHeader: 'تۆماری فەرمی گواستنەوەی متمانەی ئاسایش'
    }
  }[lang];

  return (
    <div id="federation-health-indicators-panel" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* 3 Grid Core parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Unification Score card */}
        <Card className="bg-[#0b1329]/95 border-emerald-900/60 p-5 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.uniscore}</span>
            <span className="p-2 bg-emerald-950 text-emerald-400 rounded border border-emerald-900"><Heart className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-mono text-slate-100">{metrics.unificationScore}%</h3>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full transition-all" style={{ width: `${metrics.unificationScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Weight factor: Active Treaties Adoption Matrix, PKI handshake depth.</p>
          </div>
        </Card>

        {/* Federation Health card */}
        <Card className="bg-[#0b1329]/95 border-sky-900/60 p-5 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.fedscore}</span>
            <span className="p-2 bg-sky-950 text-sky-400 rounded border border-sky-900"><Activity className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-mono text-slate-100">{metrics.federationScore}%</h3>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-sky-400 h-full transition-all" style={{ width: `${metrics.federationScore}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Weight factor: Cabinet executive alignments, active event streaming.</p>
          </div>
        </Card>

        {/* Risk quotient card */}
        <Card className="bg-[#0b1329]/95 border-teal-900/60 p-5 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.risk}</span>
            <span className="p-2 bg-rose-950 text-rose-400 rounded border border-rose-900"><ShieldAlert className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold font-mono text-slate-100">{metrics.riskIndex}%</h3>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-rose-500 h-full transition-all" style={{ width: `${metrics.riskIndex}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-mono">CRITICAL THRESHOLD: 35% gridlock override active.</p>
          </div>
        </Card>

      </div>

      {/* Recommended actions list table */}
      <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            {t.actionsHeader}
          </h3>
          <button 
            onClick={reloadMetrics}
            className="p-1.5 rounded hover:bg-slate-900 border border-slate-800 text-slate-400 transition hover:text-slate-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-normal mb-4">{t.actionsDesc}</p>

        <div className="flex flex-col gap-3">
          {metrics.recommendedActions.map(act => (
            <div key={act.id} className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/80 flex items-start gap-3">
              <span className="px-2 py-0.5 text-[9px] font-bold font-mono bg-amber-950 border border-amber-900/60 text-amber-400 rounded">
                {act.id}
              </span>
              <div className="flex flex-col gap-0.5 text-xs">
                <p className="text-slate-200 font-medium">{act[lang] || act.en}</p>
                {lang !== 'en' && <p className="text-[10px] text-slate-500 font-mono">Policy Ref: IDG_ALIGNMENT_PROTOCOL</p>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Embedded Realtime Signals Monitor logs */}
      <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl flex flex-col gap-4">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          {t.auditHeader}
        </h3>

        <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
          {auditTrail.slice(0, 6).map(log => (
            <div key={log.id} className="p-2.5 bg-slate-900/60 rounded border border-slate-930 text-[11px] font-mono flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-slate-500">
                <span className="text-emerald-400 font-bold">{log.actor}</span>
                <span>{log.timestamp.slice(11, 19)} UTC</span>
              </div>
              <p className="text-slate-300 font-sans">{log.details}</p>
              <div className="flex justify-between text-[9px] text-slate-600 mt-1">
                <span>POLICY: {log.policyContext}</span>
                <span className="uppercase">FED: {log.federationStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};
export default FederationHealthPanel;
