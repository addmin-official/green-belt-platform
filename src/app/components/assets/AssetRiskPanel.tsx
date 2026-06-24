import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, AlertTriangle, RefreshCw, Radio, HardHat, FileWarning, Eye
} from 'lucide-react';
import { NationalAssetRegistry, SovereignPhysicalAsset } from '../../../services/assets/NationalAssetRegistry';
import { AssetRiskEngine, AssetRiskAssessment } from '../../../services/assets/AssetRiskEngine';

interface AssetRiskPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function AssetRiskPanel({ lang, onStateChange }: AssetRiskPanelProps) {
  const [assets, setAssets] = useState<SovereignPhysicalAsset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [assessment, setAssessment] = useState<AssetRiskAssessment | null>(null);
  const [ticker, setTicker] = useState(0);

  const loadData = () => {
    setAssets(NationalAssetRegistry.getAssets());
    if (assets.length > 0 && !selectedAssetId) {
      setSelectedAssetId(assets[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, [ticker]);

  useEffect(() => {
    if (selectedAssetId) {
      setAssessment(AssetRiskEngine.assessAssetRisk(selectedAssetId));
    }
  }, [selectedAssetId, ticker]);

  useEffect(() => {
    if (assets.length > 0 && !selectedAssetId) {
      setSelectedAssetId(assets[0].id);
    }
  }, [assets]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleRecalculateRisk = () => {
    if (selectedAssetId) {
      AssetRiskEngine.runAssetRiskRevaluation(selectedAssetId, 'Supreme Defense Liaison');
      setTicker(prev => prev + 1);
      if (onStateChange) onStateChange();
    }
  };

  return (
    <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4" id="asset-risk-panel">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            {getLabel('Asset Geopolitical & Climate Risk Matrix', 'مركز تقييم المخاطر الجيوسياسية الطبيعية والبيئية للأصول', 'سیستەمی نرخاندنی مەترسی و ناسەقامگیری و زەرەرمەندبوون')}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {getLabel('Macroeconomic threat analysis, water depletion impacts, and perimeter vulnerability testing.',
                     'تحليل المخاطر السيادية، كفاءة الأداء البيئي، والهشاشة المؤسسية لخطوط الإمداد.',
                     'لێکۆڵینەوە و چاودێریکردنی مەترسییە جیۆپۆلەتیکی و سروشتییەکان بۆ سەر سامانە گرنگەکان.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="risk-matrix-layout-custom">
        {/* Selection panel */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 overflow-y-auto max-h-[300px]">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-2">{getLabel('SELECT TRACKED ASSET', 'اختر الأصل المستهدف', 'سامانە پۆلێنکراوەکان')}</span>
          <div className="space-y-1">
            {assets.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAssetId(a.id)}
                className={`w-full text-start p-2 rounded transition-all outline-none text-xs block cursor-pointer ${
                  selectedAssetId === a.id 
                    ? 'bg-[#1a1212] border border-red-900/40 text-red-300' 
                    : 'bg-transparent border border-transparent text-slate-300 hover:bg-slate-900'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* Assessment detail right */}
        <div className="col-span-2 bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-4">
          {assessment ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase font-sans">
                    {getLabel('Geopolitical Security Threat Index', 'مؤشر التهديد الأمني الفيدرالي', 'نیشاندەری مەترسی ئەمنی و جیۆپۆلەتیکی')}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950/40 text-red-400 border border-red-900/40">
                    OVERALL: {assessment.overallRiskScore}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-[11px]" id="risk-raw-scores-grid">
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[9px] text-slate-400 block">GOVERNMENTAL/GEOPOLITICAL ACCORD</span>
                    <span className="font-bold text-slate-200">{assessment.geopoliticalExposureScore}%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[9px] text-slate-400 block">ENVIRONMENTAL/CLIMATE VULNERABILITY</span>
                    <span className="font-bold text-slate-200">{assessment.environmentalRiskScore}%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[9px] text-slate-400 block">PERIMETER PHYSICAL INSURGENCY</span>
                    <span className="font-bold text-slate-200">{assessment.securityThreatScore}%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[9px] text-slate-400 block">MARKET YIELD VOLATILITY</span>
                    <span className="font-bold text-slate-200">{assessment.marketVolatilityScore}%</span>
                  </div>
                </div>

                {/* Mitigation summary */}
                <div className="bg-[#1e1414] border border-red-950/20 p-2.5 rounded text-xs text-red-200 flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <span className="font-bold block uppercase">{getLabel('Protective Guard Mandate', 'أمر الاستجابة الوقائي', 'پێشنیاری خۆپارێزی فەرمی')}</span>
                    {assessment.mitigationProtocol}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleRecalculateRisk}
                  className="w-full py-1.5 bg-[#1f1616] border border-red-900/60 hover:bg-[#2c1a1a] text-red-400 text-[10px] font-mono font-bold rounded cursor-pointer transition-all uppercase flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {getLabel('Recompute Threat Vectors', 'إعادة احتساب مصفوفة المخاطر والمحاكاة', 'سەرلەنوێ لێکۆڵینەوە لە هاوکۆلکەی سەرکێشی')}
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              {getLabel('Target asset selected is waiting risk validation.', 'الرجاء اختيار أصل لإحصاء مؤشر المخاطر.', 'سامانێک دیاریبکە بۆ لێکۆڵینەوە لە ڕادەی جێگیری.')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
