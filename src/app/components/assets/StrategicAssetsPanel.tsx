import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertOctagon, Flame, Eye, ShieldAlert, RefreshCw, Radio
} from 'lucide-react';
import { NationalAssetRegistry, SovereignPhysicalAsset } from '../../../services/assets/NationalAssetRegistry';
import { StrategicAssetEngine, StrategicSecurityStatus } from '../../../services/assets/StrategicAssetEngine';

interface StrategicAssetsPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function StrategicAssetsPanel({ lang, onStateChange }: StrategicAssetsPanelProps) {
  const [strategicAssets, setStrategicAssets] = useState<SovereignPhysicalAsset[]>([]); // | سەروەتە ستراتیژییەکان
  const [selectedAssetId, setSelectedAssetId] = useState<string>(''); // | ناسنامەی سەروەتی هەڵبژێردراو
  const [securityStatus, setSecurityStatus] = useState<StrategicSecurityStatus | null>(null); // | دۆخی ئەمنی
  const [ticker, setTicker] = useState(0); // | ژمێریار (بۆ نوێکردنەوە)

  const loadData = () => {
    const list = StrategicAssetEngine.getStrategicAssets();
    setStrategicAssets(list);
    if (list.length > 0 && !selectedAssetId) {
      setSelectedAssetId(list[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, [ticker]);

  useEffect(() => {
    if (selectedAssetId) {
      setSecurityStatus(StrategicAssetEngine.getSecurityStatus(selectedAssetId));
    }
  }, [selectedAssetId, ticker]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleTriggerScan = () => {
    if (selectedAssetId) {
      // | جێبەجێکردنی وردبینی ئەمنی و دەستپێکردنی دووبارە هەڵسەنگاندنی مەترسی لە مەکینەکەدا
      const nextScore = Math.floor(Math.random() * 10) + 90; // | باشترکردنی خەیاڵی
      setTicker(prev => prev + 1);
      if (onStateChange) onStateChange();
    }
  };

  const selectedAsset = strategicAssets.find(a => a.id === selectedAssetId);

  return (
    <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4" id="strategic-assets-panel">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
            {getLabel('Strategic Asset Defense & Resources', 'مركز حماية الأصول الإستراتيجية والموارد', '| بەرگری و گەشەپێدانی سەرچاوە ستراتیژییەکانی وڵات')}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {getLabel('Perimeter protection, real-time security clearances, and resource containment status.',
                     'مراقبة الحماية، ترخيص الدخول الأمني الفوري، وخلاصة الطاقة والوقود والنفايات.',
                     '| کۆنترۆڵکردنی فەرمی پاراستنی فیزیکی، پێدانی ڕێگەپێدانی ئەمنی، کۆگانی سووتەمەنی و سەرچاوە کانزاییەکان.')}
          </p>
        </div>
        <button
          onClick={() => setTicker(t => t + 1)}
          className="p-1.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-white rounded-lg cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* | دیاریکەری چەپ */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 divide-y divide-slate-900 overflow-y-auto max-h-[320px]">
          {strategicAssets.map(asset => (
            <button
              key={asset.id}
              onClick={() => setSelectedAssetId(asset.id)}
              className={`w-full text-start p-2.5 transition-all outline-none rounded-lg flex flex-col gap-1 cursor-pointer ${
                selectedAssetId === asset.id 
                  ? 'bg-[#111e2f] border border-[#233d5a]' 
                  : 'bg-transparent border border-transparent hover:bg-slate-900/40'
              }`}
            >
              <span className="text-xs font-bold text-slate-200 block">{asset.name}</span>
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono text-slate-400">{asset.category} | {asset.jurisdiction.toUpperCase()}</span>
                <span className="text-[10px] font-mono text-[#cca553] font-bold">${asset.valuationUSD}م</span>
              </div>
            </button>
          ))}
        </div>

        {/* | ناوچەی سەرەکی هەڵبژێردراو */}
        <div className="col-span-2 bg-slate-950/40 p-4 rounded-xl border border-slate-900 space-y-4">
          {selectedAsset ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 font-sans">{selectedAsset.name}</h4>
                  <span className="text-xs font-mono text-slate-400 block">{selectedAsset.id} — {selectedAsset.description}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#111e2f] border border-[#233d5a] text-[#cca553]">
                  {selectedAsset.lifecycle}
                </span>
              </div>
              
              {securityStatus ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Security Stats */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-3">
                    <h5 className="text-xs font-bold text-[#cca553] font-sans flex items-center gap-1.5 border-b border-slate-900 pb-2">
                      <Radio className="w-3.5 h-3.5 text-[#cca553]" />
                      {getLabel('Constitutional Security Status', 'الوضعية الأمنية الفيدرالية', 'پاسپۆرت و دۆخی ئەمنی نیشتمانی')}
                    </h5>
                    
                    <div className="grid grid-cols-2 gap-3" id="security-classification-grid">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">{getLabel('Classification', 'التصنيف الأمني', 'پۆلینی نھێنی')}</span>
                        <span className={`text-xs font-bold font-mono ${
                          securityStatus.securityClassification === 'TOP_SECRET' ? 'text-red-400' : 
                          securityStatus.securityClassification === 'SECRET' ? 'text-amber-400' : 'text-sky-300'
                        }`}>
                          {securityStatus.securityClassification}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">{getLabel('Perimeter Integrity', 'سلامة المحيط الفني', 'پاراستنی فیزیکی')}</span>
                        <span className="text-xs font-bold text-emerald-400 font-sans">{securityStatus.perimeterIntegrity}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">{getLabel('Military Liaison', 'الاتصال العسكري اللامركزي', 'سەرکردایەتی سەربازی')}</span>
                        <span className="text-xs font-bold text-slate-300 font-sans">
                          {securityStatus.defenseLiaisonActive ? getLabel('ACTIVE', 'نشط', 'چالاک') : getLabel('STANDBY', 'جاهز', 'پاساو')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-mono">{getLabel('Readiness Code', 'رمز الاستعداد القتالي', 'ئاستی ئامادەکاری')}</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-900/50">
                          {securityStatus.contingencyReadinessCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resource containment & mitigation */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-3">
                    <h5 className="text-xs font-bold text-[#cca553] font-sans flex items-center gap-1.5 border-b border-slate-900 pb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#cca553]" />
                      {getLabel('Mitigation Protective Protocol', 'بروتوكول الحماية والتدابير الوقائية', 'پرۆتۆکۆلی پاراستن و ڕێگری')}
                    </h5>
                    
                    <p className="text-xs font-sans text-slate-300 italic">
                      "{securityStatus.mitigationProtocol}"
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={handleTriggerScan}
                        className="w-full py-1.5 bg-[#182a3d] border border-[#cca553]/40 hover:bg-[#cca553]/20 text-[#cca553] text-[10px] font-mono font-bold rounded cursor-pointer transition-all uppercase"
                      >
                        {getLabel('Execute Strategic Security Scan', 'إطلاق فحص أمني إستراتيجي', 'ئەنجامدانی پشکنینی پۆلێنی ئەمنی چڕ')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              {getLabel('Select a strategic asset to load secure defense channels', 'اختر أصلاً استراتيجياً لتفعيل قنوات الحماية', 'یەکێک لە سامانەکان دیاریبکە بۆ چاودێریکردنی کەرتی ئەمنی')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
