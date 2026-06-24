import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, RefreshCw, Layers, DollarSign, Calculator, ChevronRight, CheckCircle2, History
} from 'lucide-react';
import { NationalAssetRegistry, SovereignPhysicalAsset } from '../../../services/assets/NationalAssetRegistry';
import { AssetValuationEngine, ValuationQuote } from '../../../services/assets/AssetValuationEngine';

interface AssetValuationPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function AssetValuationPanel({ lang, onStateChange }: AssetValuationPanelProps) {
  const [assets, setAssets] = useState<SovereignPhysicalAsset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [newValuationUSD, setNewValuationUSD] = useState('');
  const [basis, setBasis] = useState('Income Capitalization Approach');
  const [assessor, setAssessor] = useState('Central Bureau of Valuation');
  const [successQuote, setSuccessQuote] = useState<ValuationQuote | null>(null);
  const [ticker, setTicker] = useState(0);

  const loadData = () => {
    const list = NationalAssetRegistry.getAssets();
    setAssets(list);
    if (list.length > 0 && !selectedAssetId) {
      setSelectedAssetId(list[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, [ticker]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleRevalue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetId || !newValuationUSD) return;

    const res = AssetValuationEngine.triggerRevaluation(
      selectedAssetId,
      parseFloat(newValuationUSD),
      basis,
      assessor
    );

    if (res.success && res.quote) {
      setSuccessQuote(res.quote);
      setNewValuationUSD('');
      setTicker(prev => prev + 1);
      if (onStateChange) onStateChange();
    } else {
      alert(res.message);
    }
  };

  const selectedAsset = assets.find(a => a.id === selectedAssetId);
  const appreciationProjection = selectedAssetId ? AssetValuationEngine.projectAssetAppreciation(selectedAssetId, 5) : [];

  return (
    <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4" id="asset-valuation-panel">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            {getLabel('Asset Valuation & Yield Engine', 'محرك تقييم الأصول وتدوير العائد المالي', 'کەرتی بەرزکردنەوەی بەها و نرخاندنی فەرمی')}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {getLabel('National value recalculation against index parameters, GDP backing, and sovereign yield models.',
                     'إعادة احتساب الأصول الاقتصادية وعائدات الخزينة القومية بناءً على مؤشرات السوق.',
                     'نرخاندنەوەی فەرمی سەرچاوە مادییەکان پاڵپشت بە پێوانەی جیهانی و بەهای پووڵی نیشتمانی.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="valuation-layout-grid-custom">
        {/* Revaluation form */}
        <form onSubmit={handleRevalue} className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3">
          <h4 className="text-xs font-bold text-[#cca553] font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
            <DollarSign className="w-4 h-4" />
            {getLabel('Log New Audit Valuation', 'إطلاق تقييم مالي رسمي حكومي', 'تۆمارکردنی نرخاندن یا هەموارکردنەوە')}
          </h4>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">SELECT SOVEREIGN ASSET</label>
            <select
              value={selectedAssetId}
              onChange={e => setSelectedAssetId(e.target.value)}
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} (${a.valuationUSD}M)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">NEW VALUE ($ Millions USD)</label>
              <input
                type="number"
                step="0.1"
                required
                value={newValuationUSD}
                onChange={e => setNewValuationUSD(e.target.value)}
                placeholder="e.g. 15400"
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">METHOD & BASIS</label>
              <select
                value={basis}
                onChange={e => setBasis(e.target.value)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              >
                <option value="Income Capitalization Approach">Income Capitalization</option>
                <option value="Replacement Cost Method">Replacement Cost Model</option>
                <option value="Comparative Market Valuation">Comparative Market</option>
                <option value="Asset Backed Reserves Indexing">Sovereign Reserves Indexing</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">CERTIFYING ASSESSOR</label>
            <input
              type="text"
              required
              value={assessor}
              onChange={e => setAssessor(e.target.value)}
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-amber-600/30 to-amber-800/30 border border-[#cca553]/40 hover:border-[#cca553] text-[#cca553] text-xs font-mono font-bold rounded cursor-pointer transition-all"
          >
            {getLabel('Authorize & Sign New Valuation Quote', 'اعتماد وتوقيع التقييم المالي المحدث', 'سەرپەرشتیکردن و پەسەندکردنی ئەم نرخاندنە')}
          </button>
        </form>

        {/* Projection results */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#cca553] font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <Calculator className="w-4 h-4 animate-pulse" />
              {getLabel('5-Year Yield Valuation Projection', 'تطور قيمة الأصل لـ 5 سنوات ومحاكاة الأرباح', 'پێشبینی پێنج ساڵی داهاتووی داهاتی دەوڵەت')}
            </h4>

            {selectedAsset ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current Valuation:</span>
                  <span className="font-bold text-[#cca553] font-mono">${selectedAsset.valuationUSD}M</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Est. Growth Rate:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {((selectedAsset.annualRevenueYieldUSD / (selectedAsset.valuationUSD || 1)) * 100 - selectedAsset.depreciationRate * 100).toFixed(2)}%
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  {appreciationProjection.map((val, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900/60 p-1.5 rounded text-[11px] font-mono">
                      <span className="text-slate-400">Year {idx} (Forecast)</span>
                      <span className="text-slate-200 font-bold">${val.toFixed(1)}M USD</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {successQuote && (
            <div className="bg-[#111e2f] border border-[#233d5a] rounded-lg p-3 space-y-1.5 animate-fadeIn">
              <span className="text-[10px] text-emerald-400 font-bold font-mono uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VALUATION SECURED IN BLOCKCHAIN Government ID
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                <div>PREVIOUS Valuation: <b>${successQuote.previousValuationUSD}M</b></div>
                <div>NEW Value: <b className="text-[#cca553]">${successQuote.newValueUSD}M</b></div>
                <div className="col-span-2">DELTA: <b className={successQuote.deltaUSD >= 0 ? "text-emerald-400" : "text-red-400"}>${successQuote.deltaUSD >= 0 ? '+' : ''}{successQuote.deltaUSD}M USD</b></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
