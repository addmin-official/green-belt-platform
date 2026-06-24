import React, { useState, useEffect } from 'react';
import { 
  Building2, Info, RefreshCw, BarChart2, Activity, Zap, ShieldAlert
} from 'lucide-react';
import { InfrastructureAssetEngine, InfrastructureStatus } from '../../../services/assets/InfrastructureAssetEngine';
import { SovereignPhysicalAsset } from '../../../services/assets/NationalAssetRegistry';

interface InfrastructureAssetsPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function InfrastructureAssetsPanel({ lang, onStateChange }: InfrastructureAssetsPanelProps) {
  const [infraAssets, setInfraAssets] = useState<SovereignPhysicalAsset[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [status, setStatus] = useState<InfrastructureStatus | null>(null);
  const [ticker, setTicker] = useState(0);

  const loadData = () => {
    const list = InfrastructureAssetEngine.getInfrastructureAssets();
    setInfraAssets(list);
    if (list.length > 0 && !selectedAssetId) {
      setSelectedAssetId(list[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, [ticker]);

  useEffect(() => {
    if (selectedAssetId) {
      setStatus(InfrastructureAssetEngine.getInfrastructureStatus(selectedAssetId));
    }
  }, [selectedAssetId, ticker]);

  useEffect(() => {
    if (infraAssets.length > 0 && !selectedAssetId) {
      setSelectedAssetId(infraAssets[0].id);
    }
  }, [infraAssets]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const selectedAsset = infraAssets.find(a => a.id === selectedAssetId);

  return (
    <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4" id="infrastructure-assets-panel">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500" />
            {getLabel('Constitutional Infrastructure Integrity Rail', 'مراقبة متانة البنى التحتية والمشروعات الكبرى', 'چاودێری فەرمی کارایی و تەواوبوونی پڕۆژە نیشتمانییەکان')}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {getLabel('Reliability metrics, power supply backups, and capacity utilization across state transit, seaports, and grids.',
                     'مؤشرات الأداء التشغيلي ومستويات استغلال الطاقة للمنشآت والممرات العامة.',
                     'نیشاندەرە فەرمییەکانی وزە، ڕێژەی بەکارهێنان و گرنگی پڕۆژە نیشتمانییەکان لە خۆراک، ئاو، گواستنەوە و فڕۆکەخانە.')}
          </p>
        </div>
        <button
          onClick={() => setTicker(t => t + 1)}
          className="p-1.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-white rounded-lg cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="infra-layout-grid-custom">
        {/* List Left */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 overflow-y-auto max-h-[300px]">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-2">{getLabel('ACTIVE INFRASTRUCTURES', 'المنشآت النشطة', 'پڕۆژە چالاک و گرنگەکان')}</span>
          <div className="space-y-1">
            {infraAssets.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAssetId(a.id)}
                className={`w-full text-start p-2 rounded transition-all outline-none text-xs block cursor-pointer ${
                  selectedAssetId === a.id 
                    ? 'bg-[#111e2f] border border-[#233d5a] text-[#cca553]' 
                    : 'bg-transparent border border-transparent text-slate-300 hover:bg-slate-900'
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* Status Area Right */}
        <div className="col-span-2 bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-4">
          {selectedAsset && status ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase font-sans">
                      {selectedAsset.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">{selectedAsset.id} • {selectedAsset.category}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    status.powerStatus === 'NOMINAL' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/40' : 
                    status.powerStatus === 'STANDBY' ? 'bg-amber-950/60 text-amber-400 border border-amber-900/40' : 'bg-red-950 text-red-400'
                  }`}>
                    {status.powerStatus} FUEL STATE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px]" id="infra-indicator-detail-row">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-center space-y-1">
                    <Zap className="w-5 h-5 text-amber-400 mx-auto" />
                    <span className="text-[9px] text-slate-400 block">RELIABILITY METRIC</span>
                    <span className="text-sm font-bold text-slate-150">{status.reliabilityMetric}%</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-center space-y-1">
                    <Activity className="w-5 h-5 text-sky-400 mx-auto" />
                    <span className="text-[9px] text-slate-400 block">UTILIZATION RATIO</span>
                    <span className="text-sm font-bold text-slate-150">{status.capacityUtilization}%</span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 text-center space-y-1">
                    <BarChart2 className="w-5 h-5 text-emerald-400 mx-auto" />
                    <span className="text-[9px] text-slate-400 block">INTEGRITY INDEX</span>
                    <span className="text-sm font-bold text-slate-150">{status.integrityIndex}/100</span>
                  </div>
                </div>

                <div className="p-3 bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs leading-relaxed text-slate-300">
                  <Info className="w-4 h-4 text-[#cca553] inline-block shrink-0 mr-1.5 align-text-bottom" />
                  We calculate these coefficients based on constitutional audit guidelines, integrating continuous telemetry data directly from local boundary operators.
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              {getLabel('Target asset selected is waiting telemetry sync.', 'الرجاء اختيار منشأة لمزامنة القراءة الفنية.', 'سامانێک دیاریبکە بۆ وەرگرتنی ڕاپۆرتی باری دارایی پڕۆژەکە.')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
