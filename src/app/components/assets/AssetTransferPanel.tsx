import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, RefreshCw, Layers, ShieldAlert, CheckCircle2, AlertTriangle, FileCheck, Check
} from 'lucide-react';
import { NationalAssetRegistry, SovereignPhysicalAsset, OwnershipModel } from '../../../services/assets/NationalAssetRegistry';
import { AssetTransferEngine, TransferProposal } from '../../../services/assets/AssetTransferEngine';

interface AssetTransferPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function AssetTransferPanel({ lang, onStateChange }: AssetTransferPanelProps) {
  const [assets, setAssets] = useState<SovereignPhysicalAsset[]>([]);
  const [transfers, setTransfers] = useState<TransferProposal[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [targetOwnership, setTargetOwnership] = useState<OwnershipModel>('JOINT');
  const [targetJurisdiction, setTargetJurisdiction] = useState<'federal' | 'krg' | 'joint'>('joint');
  const [actor, setActor] = useState('Erbil-Baghdad Liaison Council');
  const [ticker, setTicker] = useState(0);

  const loadData = () => {
    setAssets(NationalAssetRegistry.getAssets());
    setTransfers(AssetTransferEngine.getTransfers());
  };

  useEffect(() => {
    loadData();
  }, [ticker]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetId) return;

    const res = AssetTransferEngine.submitTransfer(
      selectedAssetId,
      targetOwnership,
      targetJurisdiction,
      actor
    );

    if (res.success) {
      setTicker(prev => prev + 1);
      if (onStateChange) onStateChange();
    } else {
      alert(res.message);
    }
  };

  const handleApprove = (id: string) => {
    const res = AssetTransferEngine.approveAndExecuteTransfer(id, 'Constitutional Executive Representative');
    if (res.success) {
      setTicker(prev => prev + 1);
      if (onStateChange) onStateChange();
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4" id="asset-transfer-panel">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-amber-500 animate-pulse" />
            {getLabel('Sovereign Balance Sheet Transfer & Exchange', 'نظام تبادل ونقل ملكية الأصول السيادية موازت الخزینة', 'گواستنەوەی فەرمی خاوەندارێتی و جێگۆڕکێی داهاتی دەوڵەت')}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {getLabel('Constitutional ownership migration, intergovernmental clearing, and reserve impact processing.',
                     'تسوية القيود الحكومية الدستورية وإدارة نقل الممتلكات بين الإقليم والمركز.',
                     'گۆڕینی خاوەندارێتی لە نێوان حکومەتی فیدراڵ و حکومەتی هەرێمی کوردستان لەگەڵ چاودێریکردنی کۆگاکانی دارایی.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Initiate form */}
        <form onSubmit={handleInitiateTransfer} className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3">
          <h4 className="text-xs font-bold text-[#cca553] font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
            <Layers className="w-4 h-4 text-amber-400" />
            {getLabel('Propose Ownership Transfer', 'تقديم طلب انتقال ملكية الأصول السيادية', 'پێشنیارکردنی نوێ بۆ گواستنەوەی سامانەکان')}
          </h4>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">ASSET TO TRANSFER</label>
            <select
              value={selectedAssetId}
              onChange={e => setSelectedAssetId(e.target.value)}
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white outline-none"
            >
              <option value="">-- Choose Asset --</option>
              {assets.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.ownership} / {a.jurisdiction.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">TARGET OWNERSHIP</label>
              <select
                value={targetOwnership}
                onChange={e => setTargetOwnership(e.target.value as OwnershipModel)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white outline-none"
              >
                <option value="FEDERAL_IRAQ">FEDERAL IRAQ</option>
                <option value="KRG">KRG REGIONAL</option>
                <option value="JOINT">JOINT COUNCIL</option>
                <option value="STATE_ENTERPRISE">STATE ENTERPRISE</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">TARGET JURISDICTION</label>
              <select
                value={targetJurisdiction}
                onChange={e => setTargetJurisdiction(e.target.value as any)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white outline-none"
              >
                <option value="federal">FEDERAL</option>
                <option value="krg">KRG</option>
                <option value="joint">JOINT BOUNDARY</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">LIAISON / AUTHORIZED SIGNATORY</label>
            <input
              type="text"
              required
              value={actor}
              onChange={e => setActor(e.target.value)}
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-teal-900 to-[#182a3d] border border-teal-500/30 hover:border-teal-400 text-teal-300 text-xs font-mono font-bold rounded cursor-pointer transition-all"
          >
            {getLabel('Propose Transfer to Sovereign Parliament', 'تقديم الطلب للجمعية الدستورية المشتركة', 'ناردنی پێشنیارەکە بۆ پەرلەمان یا ئەنجومەنی باڵا')}
          </button>
        </form>

        {/* Pending Queue */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3">
          <h4 className="text-xs font-bold text-[#cca553] font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            {getLabel('Pending Constitutional Action Queue', 'قائمة الانتظار والمصادقة السيادية للدولة', 'سامانە لەکارەکان و ئەوانەی چاوەڕێی کۆتایین')}
          </h4>

          {transfers.length === 0 ? (
            <div className="text-center p-8 text-slate-500 font-mono text-xs italic">
              {getLabel('No actions are currently pending approval.', 'لا توجد طلبات معلقة حالياً.', 'هیچ داواکارییەکی فەرمی چاوەڕوانکراو نییە.')}
            </div>
          ) : (
            <div className="space-y-2 overflow-y-auto max-h-[220px]">
              {transfers.map(trsf => (
                <div key={trsf.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-200 block text-xs">Asset ID: {trsf.assetId}</span>
                    <span className="text-[10px] text-slate-400 block">
                      {trsf.sourceOwnership} ({trsf.sourceJurisdiction.toUpperCase()}) → {trsf.targetOwnership} ({trsf.targetJurisdiction.toUpperCase()})
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">Value: ${trsf.valuationAtTransferUSD}M USD • {trsf.id}</span>
                  </div>

                  {trsf.status === 'PENDING' ? (
                    <button
                      onClick={() => handleApprove(trsf.id)}
                      className="px-2.5 py-1.5 bg-emerald-900/60 hover:bg-emerald-900 text-emerald-300 text-[10px] font-mono font-bold rounded cursor-pointer transition-all flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Approve
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold bg-[#111e2f] px-2 py-0.5 rounded border border-[#233d5a]">
                      {trsf.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Treasury Reserve warning box */}
          <div className="bg-[#1b2b1d] border border-emerald-950/20 p-3 rounded-lg flex items-start gap-2 text-[11px] text-emerald-200">
            <AlertTriangle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce-slow" />
            <div>
              <span className="font-bold block uppercase">Treasury Synchronization Rule</span>
              Executing a transfer recertifies the backing gold ratio, recalculating the CBI sovereign debt coverage multiplier instantaneously.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
