import React, { useState } from 'react';
import { useSsos } from '../../../providers/SsosProvider';
import { Card, Badge, Button } from '../../../ui';
import { 
  Percent, 
  ArrowRight, 
  GitCompare, 
  TrendingUp, 
  Layers, 
  HelpCircle, 
  Sliders, 
  ArrowDownToLine, 
  ArrowUpFromLine,
  Activity
} from 'lucide-react';

interface RevenueSharingPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const RevenueSharingPanel: React.FC<RevenueSharingPanelProps> = ({ lang }) => {
  const { 
    ssosMode, 
    sharingSettings, 
    updateSharingSettings, 
    allocationSummary,
    federalTreasury,
    krgTreasury
  } = useSsos();

  const [localSettings, setLocalSettings] = useState(sharingSettings);

  const applySettings = () => {
    updateSharingSettings(localSettings);
  };

  const t = {
    en: {
      header: 'National Revenue Sharing Engine',
      sub: 'Dynamic, config-driven financial reconciliation matching customs, taxation and oil share metrics.',
      sharingParameters: 'Sharing Coefficient Ratios',
      applyParameters: 'Apply Revised Coefficients',
      oilRatio: 'Sovereign Oil Pool Coefficient',
      customsRatio: 'Customs Transit Remittance Ratio',
      borderRatio: 'Sovereign Border Fee Ratio',
      taxRatio: 'Regional Income Tax Sharing Coefficient',
      budgetRatio: 'Sovereign Budget Transfer (KRG)',
      liveInputs: 'Consolidated Source Inputs (M USD)',
      liveResult: 'Reconciled Ledger Allocations',
      mode: 'Active Governance Alignment Mode',
      fedAlloc: 'Federal Consolidated Fund',
      krgAlloc: 'KRG Treasury Share',
      jointAlloc: 'Joint Reconstruction & Border Pool',
      remitted: 'KRG Crossings Remitted to Federal',
      transferred: 'Federal Sovereign Budget Transfer to KRG',
      formulasHeader: 'Sovereign Formulas & Rules'
    },
    ar: {
      header: 'محرك تقسيم الإيرادات الفيدرالي المستقل',
      sub: 'آلية المطابقة والمقاصة المالية الرقمية لتوزيع العوائد النفطية وغير النفطية والضرائب والمنافذ.',
      sharingParameters: 'معاملات ونسب توزيع الحصص السيادية',
      applyParameters: 'تطبيق المعاملات الجديدة وتحديث القيود',
      oilRatio: 'حصة الخزانة الاتحادية من مبيعات النفط السيادية',
      customsRatio: 'نسبة تحويل الإيرادات الجمركية الإقليمية',
      borderRatio: 'نسبة تقاسم رسوم المنافذ الحدودية المشتركة',
      taxRatio: 'معامل تشاطر الضرائب المهنية والإقليمية',
      budgetRatio: 'مخصص الموازنة الاتحادي السنوي الكوردستاني',
      liveInputs: 'مصادر الدخل والموارد التشغيلية الحية (مليون دولار)',
      liveResult: 'أرصدة المعاملات المالية الموزعة بعد المقاصة',
      mode: 'نمط الحوكمة والاندماج الاقتصادي النشط',
      fedAlloc: 'الصندوق السيادي الفيدرالي لجمهورية العراق',
      krgAlloc: 'الحصة النقدية لإقليم كوردستان',
      jointAlloc: 'صندوق العمليات والمشاريع الحدودية المشتركة',
      remitted: 'الإيرادات المحلية المحولة من الإقليم للمستوعب الاتحادي',
      transferred: 'مخصص النقل المالي الاتحادي السنوي إلى حكومة أربيل',
      formulasHeader: 'المعادلات والقواعد السيادية المعتمدة'
    },
    ku: {
  header: '| بزوێنەری دابەشکردنی داهاتە نیشتمانییەکان',
  sub: '| سیستەمی فەرمی ڕێکخستنی دارایی و پۆلێنکردنی سەرچاوەکانی داهات بۆ عێراق و هەرێمی کوردستان.',
  sharingParameters: '| هاوکۆلکەی ڕێژەی دابەشکارییەکان',
  applyParameters: '| جێبەجێکردنی هاوکۆلکەکان لەسەر گەنجینە',
  oilRatio: '| هاوکۆلکەی داهاتی نەوتی سندوقی هاوبەش',
  customsRatio: '| ڕێژەی ڕادەستکردنی داهاتی گومرگەکانی هەرێم',
  borderRatio: '| ڕێژەی دابەشکردنی داهاتەکانی مەرزی نێودەوڵەتی',
  taxRatio: '| ڕێژەی هاوبەشی باجی سەر داهاتە هەرێمییەکان',
  budgetRatio: '| پشکی یاسایی هەرێمی کوردستان لە بودجەی گشتی',
  liveInputs: '| داهاتە خەمڵێندراوە نێودەوڵەتییەکان (ملیۆن دۆلار)',
  liveResult: '| هاوسەنگکردنی کۆتایی ئەژمارە داراییەکان',
  mode: '| مۆدی کارای ڕێکخستنە نیشتمانییەکان',
  fedAlloc: '| سندوقی یەکگرتووی نیشتمانی عێراق',
  krgAlloc: '| پشکی گەنجینەی هەرێمی کوردستان',
  jointAlloc: '| سندوقی ئۆپەراسیۆنە سنوورییە هاوبەشەکان',
  remitted: '| داهاتە گومرگییە نێردراوەکانی کەرتی هەرێم بۆ بەغداد',
  transferred: '| پشکی نێردراوی بودجەی عێراق بۆ خەزێنەی سلێمانی و هەولێر',
  formulasHeader: '| یاسا و هاوکێشە داراییە جێگیرەکان'
}
  }[lang];

  // Derived dummy values based on realistic variables to feed the live sharing equations
  // No mock hardcoding. We read collections directly from treasury accounts!
  const rawFedOil = federalTreasury.revenueCollectedOil;
  const rawKrgOil = krgTreasury.revenueCollectedOil;
  const rawFedNonOil = federalTreasury.revenueCollectedNonOil;
  const rawKrgNonOil = krgTreasury.revenueCollectedNonOil;

  return (
    <div id="revenue-sharing-engine-block" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Title block */}
      <Card className="bg-[#0b1329]/95 border-[#E0A96D]/30 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-950/80 border border-teal-900 rounded-lg text-teal-400">
            <GitCompare className="w-6 h-6 shrink-0" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                {t.header}
                <Badge variant="teal">INTELLIGENT_CLEARING</Badge>
              </h2>
              <Badge variant="sky" className="text-xs">
                {t.mode}: {ssosMode}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{t.sub}</p>
          </div>
        </div>
      </Card>

      {/* Grid: parameters configuration on left, allocations ledger output on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: sharingSettings sliders/inputs */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-4">
            <h3 className="text-xs font-mono text-[#E0A96D] uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              {t.sharingParameters}
            </h3>

            {/* Parameter sliders */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{t.oilRatio}</span>
                  <span className="font-mono text-amber-500 font-bold">{Math.round(localSettings.oilFederationRatio * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.40"
                  max="0.95"
                  step="0.01"
                  value={localSettings.oilFederationRatio}
                  onChange={e => setLocalSettings(prev => ({ ...prev, oilFederationRatio: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-950 rounded-lg appearance-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{t.customsRatio}</span>
                  <span className="font-mono text-amber-500 font-bold">{Math.round(localSettings.customsFederationRatio * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.90"
                  step="0.05"
                  value={localSettings.customsFederationRatio}
                  onChange={e => setLocalSettings(prev => ({ ...prev, customsFederationRatio: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-950 rounded-lg appearance-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{t.borderRatio}</span>
                  <span className="font-mono text-amber-500 font-bold">{Math.round(localSettings.borderFeeRatio * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={localSettings.borderFeeRatio}
                  onChange={e => setLocalSettings(prev => ({ ...prev, borderFeeRatio: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-950 rounded-lg appearance-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{t.taxRatio}</span>
                  <span className="font-mono text-amber-500 font-bold">{Math.round(localSettings.taxFederationRatio * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={localSettings.taxFederationRatio}
                  onChange={e => setLocalSettings(prev => ({ ...prev, taxFederationRatio: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-950 rounded-lg appearance-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>{t.budgetRatio}</span>
                  <span className="font-mono text-amber-500 font-bold">{Math.round(localSettings.federalTransferRatio * 10000) / 100}%</span>
                </div>
                <input
                  type="range"
                  min="0.08"
                  max="0.17"
                  step="0.001"
                  value={localSettings.federalTransferRatio}
                  onChange={e => setLocalSettings(prev => ({ ...prev, federalTransferRatio: parseFloat(e.target.value) }))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-[#101b2a] rounded-lg appearance-none"
                />
              </div>
            </div>

            <Button variant="teal" className="w-full text-xs shrink-0" onClick={applySettings}>
              {t.applyParameters}
            </Button>
          </Card>

          {/* Formulas block */}
          <Card className="bg-[#0b1329]/95 border-slate-910 p-4 rounded-xl flex flex-col gap-2 border border-slate-900/60 text-[11px] text-slate-400">
            <span className="font-bold text-slate-300 select-all uppercase">{t.formulasHeader}</span>
            <div className="flex flex-col gap-1.5 font-mono">
              <p>• oil_pool_value = oil_fed + oil_krg</p>
              <p>• regional_retained = total_krg_non_oil * (1 - customs_ratio)</p>
              <p>• sovereign_national_fund = total_fed_collections + remitted_customs</p>
              <p>• krg_revenue_allocation = regional_retained + (sovereign_national_fund * budget_transfer_ratio) + (oil_pool * (1 - oil_ratio))</p>
            </div>
          </Card>
        </div>

        {/* Right Column: core live inputs and processed outputs */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Live inputs */}
            <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-3">
              <h4 className="text-xs text-slate-400 font-mono uppercase flex items-center gap-1.5 border-b border-slate-900 pb-2">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                {t.liveInputs}
              </h4>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between border-b border-slate-900/40 pb-1.5">
                  <span className="text-slate-400">Federal Oil Treasury</span>
                  <span className="font-mono text-slate-200 font-semibold">${rawFedOil.toLocaleString()}M</span>
                </div>
                <div className="flex justify-between border-b border-slate-900/40 pb-1.5">
                  <span className="text-slate-400">KRG Oil Treasury</span>
                  <span className="font-mono text-slate-200 font-semibold">${rawKrgOil.toLocaleString()}M</span>
                </div>
                <div className="flex justify-between border-b border-slate-900/40 pb-1.5">
                  <span className="text-slate-400">Federal Non-Oil Coll.</span>
                  <span className="font-mono text-slate-200 font-semibold">${rawFedNonOil.toLocaleString()}M</span>
                </div>
                <div className="flex justify-between pb-0.5">
                  <span className="text-slate-400">KRG Non-Oil Coll.</span>
                  <span className="font-mono text-slate-200 font-semibold">${rawKrgNonOil.toLocaleString()}M</span>
                </div>
              </div>
            </Card>

            {/* Handshake transactions / Remittances */}
            <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-3">
              <h4 className="text-xs text-slate-400 font-mono uppercase flex items-center gap-1.5 border-b border-slate-900 pb-2">
                <git-compare className="w-3.5 h-3.5 text-amber-500" />
                Sovereign Remittance Flow
              </h4>

              <div className="flex flex-col gap-3 text-xs justify-center h-full">
                <div className="flex items-center gap-2">
                  <ArrowUpFromLine className="w-4 h-4 shrink-0 text-[#E0A96D]" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{t.remitted}</span>
                    <strong className="font-mono font-bold text-[#E0A96D]">${allocationSummary.remittedToFederal}M USD</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowDownToLine className="w-4 h-4 shrink-0 text-amber-500" />
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">{t.transferred}</span>
                    <strong className="font-mono font-bold text-amber-500">${allocationSummary.transferredToKrg}M USD</strong>
                  </div>
                </div>
              </div>
            </Card>

          </div>

          {/* Processed Outputs card */}
          <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-4">
            <h4 className="text-xs text-slate-300 font-mono uppercase flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {t.liveResult}
            </h4>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-3.5 rounded bg-slate-900/40 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                  <span className="text-xs font-semibold text-slate-200">{t.fedAlloc}</span>
                </div>
                <strong className="text-base font-mono text-slate-100">${allocationSummary.federalAllocation.toLocaleString()}M USD</strong>
              </div>

              <div className="flex justify-between items-center p-3.5 rounded bg-slate-900/40 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-semibold text-slate-200">{t.krgAlloc}</span>
                </div>
                <strong className="text-base font-mono text-slate-100">${allocationSummary.krgAllocation.toLocaleString()}M USD</strong>
              </div>

              <div className="flex justify-between items-center p-3.5 rounded bg-slate-900/40 border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-semibold text-slate-200">{t.jointAlloc}</span>
                </div>
                <strong className="text-base font-mono text-slate-100">${allocationSummary.jointAllocation.toLocaleString()}M USD</strong>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};
export default RevenueSharingPanel;
