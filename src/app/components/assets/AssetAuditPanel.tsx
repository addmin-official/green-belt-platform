import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, ShieldAlert, FileCode2, Play, Users, ClipboardCheck, MessageSquare, ShieldCheck
} from 'lucide-react';
import { NationalAssetRegistry, SovereignPhysicalAsset } from '../../../services/assets/NationalAssetRegistry';
import { AssetAuditEngine, AssetAuditRecord } from '../../../services/assets/AssetAuditEngine';

interface AssetAuditPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function AssetAuditPanel({ lang, onStateChange }: AssetAuditPanelProps) {
  const [assets, setAssets] = useState<SovereignPhysicalAsset[]>([]); // | سەروەتەکان
  const [auditLogs, setAuditLogs] = useState<AssetAuditRecord[]>([]); // | تۆمارەکانی وردبینی
  const [selectedAssetId, setSelectedAssetId] = useState(''); // | ناسنامەی سەروەتی هەڵبژێردراو
  const [auditor, setAuditor] = useState('| ئەنجومەنی باڵای وردبینی هاوبەش');
  const [notes, setNotes] = useState(''); // | تێبینییەکان
  const [ticker, setTicker] = useState(0); // | ژمێریار (بۆ نوێکردنەوەی داتا)

  const loadData = () => {
    setAssets(NationalAssetRegistry.getAssets());
    setAuditLogs(AssetAuditEngine.getAuditRecords());
    if (assets.length > 0 && !selectedAssetId) {
      setSelectedAssetId(assets[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, [ticker]);

  useEffect(() => {
    if (assets.length > 0 && !selectedAssetId) {
      setSelectedAssetId(assets[0].id);
    }
  }, [assets]);

  // | گەڕاندنەوەی ناونیشان بەپێی زمان
  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetId || !notes) return;

    const res = AssetAuditEngine.runAssetAudit(
      selectedAssetId,
      auditor,
      notes
    );

    if (res.success) {
      setNotes('');
      setTicker(prev => prev + 1);
      if (onStateChange) onStateChange();
    } else {
      alert(res.message); // | پیشاندانی پەیامی هەڵە
    }
  };

  return (
    <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4" id="asset-audit-panel">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-amber-500" />
            {getLabel('Sovereign Capital Integrity & Auditing', 'ديوان الرقابة المالية والتدقيق المشترك', '| دیوانی چاودێری دارایی و ڕێکارەکانی وردبینی نیشتمانی')}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {getLabel('Constitutional asset compliance rates, blockchain hash ledger validations, and performance audit reports.',
                     'التدقيق المالي وقوانين الشفافية الاتحادية لإحصاء الثروة العامة والسيادية.',
                     '| وردبینیکردنی فەرمی ڕێژەی سەرچاوە مادییەکان و دڵنیابوونەوە لە سەرچاوە گشتییەکانی دەوڵەت.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* | فۆڕمی چەپ */}
        <form onSubmit={handleRunAudit} className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3">
          <h4 className="text-xs font-bold text-[#cca553] font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
            <Users className="w-4 h-4 text-[#cca553]" />
            {getLabel('Execute Legislative Compliance Audit', 'بدء فحص وتقييم التدقيق المالي للدولة', '| نووسینی ڕاپۆرتی لێکۆڵینەوە و وردبینی نوێ')}
          </h4>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">| دیاریکردنی سەروەتی ئامانج بۆ پشکنین</label>
            <select
              value={selectedAssetId}
              onChange={e => setSelectedAssetId(e.target.value)}
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white outline-none"
            >
              <option value="">| -- هەڵبژاردنی سەروەت --</option>
              {assets.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.jurisdiction.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">| وردبینیکار / ئەنجومەنی باڵا</label>
            <input
              type="text"
              required
              value={auditor}
              onChange={e => setAuditor(e.target.value)}
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">| دەرەنجامی پشکنین و تێبینییەکانی پابەندبوون</label>
            <textarea
              required
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="| تۆمارکردنی هەر جیاوازییەکی پێکهاتەیی، پشتڕاستکردنەوەی سنوورەکان، یان وردبینی داهاتی دارایی..."
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white h-20 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-amber-700/20 to-amber-900/20 border border-[#cca553]/40 hover:border-[#cca553] text-[#cca553] text-xs font-mono font-bold rounded cursor-pointer transition-all flex items-center justify-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            {getLabel('Certify Ledger Entry on Sovereign blockchain', 'اعتماد وختم قيد التدقيق النهائي', '| پەسەندکردنی فەرمی وردبینییەکە لەسەر بلۆکچەینی سەروەری')}
          </button>
        </form>

        {/* | تۆمارەکانی وردبینی ڕاست */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#cca553] font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <FileCode2 className="w-4 h-4 text-sky-400" />
              {getLabel('Certified Audit Ledger History', 'سجل تقارير ديوان الرقابة المعتمدة للجمهورية', '| مێژووی فەرمی ڕاپۆرتەکانی دیوانی چاودێری دارایی')}
            </h4>

            <div className="space-y-2 overflow-y-auto max-h-[220px]">
              {auditLogs.map(log => (
                <div key={log.auditId} className="p-3 bg-slate-900 rounded-lg border border-slate-850 space-y-2 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 block">{log.assetId}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-900/40">
                      | نمرە: {log.complianceRating}٪
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">"{log.notes}"</p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-950/20">
                    <span>{log.auditor}</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      | پشتڕاستکراو
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
