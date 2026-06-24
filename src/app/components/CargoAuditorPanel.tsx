import React from 'react';
import { Cpu, RefreshCw, Shield, Check, AlertTriangle, Server } from 'lucide-react';
import { CARGO_PRESETS } from '../../mockData';
import { PageHeader, Badge, UnifiedEmptyState } from '../../ui';
import { useGovernment } from '../../providers/GovernmentProvider';

export interface CargoAuditorPanelProps {
  lang: 'en' | 'ar' | 'ku';
  d: any;
  selectedPreset: string;
  customManifest: any;
  setCustomManifest: React.Dispatch<React.SetStateAction<any>>;
  isAuditing: boolean;
  auditResult: any;
  customManifestViewModel: any;
  auditResultViewModel: any;
  handlePresetSelect: (presetId: string) => void;
  handleInitiateAudit: () => void;
}

export const CargoAuditorPanel: React.FC<CargoAuditorPanelProps> = ({
  lang,
  d,
  selectedPreset,
  customManifest,
  setCustomManifest,
  isAuditing,
  auditResult,
  customManifestViewModel,
  auditResultViewModel,
  handlePresetSelect,
  handleInitiateAudit,
}) => {
  const { activeContext } = useGovernment();

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">
      <PageHeader
        icon={<Cpu />}
        title={lang === 'en' ? 'Sovereign Customs manifest auto-auditor' : lang === 'ar' ? 'التدقيق الذاتي الجمركي والمكوس' : 'سیستەمی چاودێری گومرگی و بازرگانی'}
        description={lang === 'en' ? 'Federal Compliance AI analysis system designed to match trade documents, verify HS classification codes and flags potential financial under-invoicing.' : lang === 'ar' ? 'نظام التحليل التلقائي للكشف عن التهرب الجمركي وفروقات تصنيف البضائع والترميز الرمزي.' : 'سیستەمی چاودێری و شیکردنەوەی پێشکەوتووی نیشتمانیی بۆ پشتڕاستکردنەوەی بەڵگەنامە بازرگانییەکان و دۆزینەوەی فرتوفێڵی دارایی.'}
        status={
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="gold">{lang === 'en' ? 'Cargo Auditor' : lang === 'ar' ? 'مدقق الشحنات' : 'چاودێری شتومەک'}</Badge>
            <Badge variant="teal">{activeContext}</Badge>
          </div>
        }
        actions={
          <div className="text-xs font-mono text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            {lang === 'en' ? 'ALGORITHM: FEDERAL_HS_CLASSIFY_V3' : 'PROT: HS_CODE_CHECK'}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Column: Presets & Form Data Fields */}
        <div className="lg:col-span-1 bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md">
        <div className="mb-5">
          <span className="text-xs text-[#cca553] uppercase font-mono block">Customs Audit Core</span>
          <h2 className="text-lg font-display font-medium text-slate-100 mt-0.5">
            Manifest Audit Parameters
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Load an authorized federal merchant trade manifest preset, or override values manually to audit legal classification and find under-invoiced tax evasion.
          </p>
        </div>

        {/* Presets Selection */}
        <div className="mb-5 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <label className="text-xs text-slate-400 font-mono uppercase block mb-2">{d.manifestPreset}</label>
          <div className="flex flex-col gap-2">
            {CARGO_PRESETS.map((preset) => {
              const presetId = preset.manifestId;
              return (
                <button
                  key={presetId}
                  onClick={() => handlePresetSelect(presetId)}
                  className={`w-full text-start p-2.5 rounded text-xs transition-all border flex flex-col cursor-pointer ${
                    selectedPreset === presetId 
                      ? 'bg-[#1a2c42] border-[#E0A96D] text-white shadow-lg' 
                      : 'bg-[#101925] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="font-mono font-semibold text-slate-300 text-[11px]">{presetId}</span>
                    <span className="text-[10px] text-[#E0A96D]/90 italic font-mono">{preset.originCountry}</span>
                  </div>
                  <span className="truncate max-w-[240px] text-slate-400 font-medium text-[11px] mt-1">
                    {preset.importerName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Input fields */}
        <div className="flex flex-col gap-4 font-mono text-xs font-medium">
          <div className="text-slate-400 text-[10px] uppercase font-mono my-1 border-b border-slate-800 pb-1">
            {d.orCustomText}
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Document Manifest ID</label>
            <input 
              type="text" 
              value={customManifest.manifestId || ''}
              onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, manifestId: e.target.value }))}
              className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Importer Corporate Name</label>
            <input 
              type="text" 
              value={customManifest.importerName || ''}
              onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, importerName: e.target.value }))}
              className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-400 block mb-1">Origin Country</label>
              <input 
                type="text" 
                value={customManifest.originCountry || ''}
                onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, originCountry: e.target.value }))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Dest. City</label>
              <input 
                type="text" 
                value={customManifest.destinationCity || ''}
                onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, destinationCity: e.target.value }))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-400 block mb-1">Declared HS Code</label>
              <input 
                type="text" 
                value={customManifest.hsCodeDeclared || ''}
                onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, hsCodeDeclared: e.target.value }))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Logistics Category</label>
              <input 
                type="text" 
                value={customManifest.goodsCategory || ''}
                onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, goodsCategory: e.target.value }))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-slate-400 block mb-1">Valuation (USD)</label>
              <input 
                type="number" 
                value={customManifest.declaredValueUSD || 0}
                onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, declaredValueUSD: Number(e.target.value) }))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-[#cca553] font-bold"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Weight (Tons)</label>
              <input 
                type="number" 
                step="0.1"
                value={customManifest.weightTons || 0}
                onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, weightTons: Number(e.target.value) }))}
                className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Cargo / Physical Description</label>
            <textarea 
              value={customManifest.description || ''}
              onChange={(e) => setCustomManifest((prev: any) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553] text-xs resize-none font-sans"
            />
          </div>

          <button
            onClick={handleInitiateAudit}
            disabled={isAuditing}
            className="w-full bg-[#cca553] text-[#111e2e] py-3 px-4 rounded-lg font-semibold transition-all hover:bg-[#b08e48] disabled:bg-slate-800 disabled:text-slate-500 font-sans tracking-wide uppercase text-xs flex items-center justify-center gap-2 mt-2 shadow-lg cursor-pointer"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="animate-spin w-4 h-4" />
                {d.analyzing}
              </>
            ) : (
              <>
                <Cpu className="w-4.5 h-4.5" />
                {d.analyzeButton}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right 2 Columns: Audit output reports */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md min-h-[420px] flex flex-col justify-between">
          
          {!auditResult && !isAuditing && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <UnifiedEmptyState 
                type="no-data" 
                lang={lang} 
                action={
                  <div className="flex items-center gap-2 text-[10px] bg-slate-950/80 px-3.5 py-2 rounded-xl text-amber-400 border border-amber-500/20 font-mono uppercase tracking-wider">
                    <Shield className="w-4 h-4 shrink-0" />
                    FED-CLEAR COGNITIVE READY
                  </div>
                } 
              />
            </div>
          )}

          {isAuditing && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
              <div className="p-4 bg-[#cca553]/10 rounded-full border border-[#cca553]/40 mb-4 animate-spin">
                <RefreshCw className="w-10 h-10 text-[#cca553]" />
              </div>
              <h3 className="font-semibold text-[#cca553] uppercase tracking-widest text-sm mb-1 animate-pulse">
                Processing Custom Risk Brain (Gemini)
              </h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4 font-mono">
                De-crypting cargo specifications, cross-checking central tariff registries, and analyzing letter-of-credit values with the Central Bank of Iraq...
              </p>
              <div className="text-[10px] text-slate-500 font-mono flex flex-col gap-1 items-center">
                <span>• Algorithm Protocol: IQ-CUSTOMS-DEC2026</span>
                <span>• Sovereign Database mesh: Synced (Erbil ⇄ Baghdad)</span>
              </div>
            </div>
          )}

          {auditResultViewModel && (
            <div className="flex flex-col gap-6 text-start">
              
              {/* Audit Top summary */}
              <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#cca553] uppercase font-mono tracking-widest font-semibold block">
                    FEDERAL INTELLIGENCE CLEARANCE
                  </span>
                  <h3 className="text-base font-display font-semibold text-slate-100 mt-0.5">
                    {d.resultTitle}
                  </h3>
                  {auditResultViewModel.notice && (
                    <span className="inline-block mt-2 text-[10px] text-amber-400 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/10 font-mono">
                      {auditResultViewModel.notice}
                    </span>
                  )}
                  {auditResultViewModel.isDemoMode && !auditResultViewModel.notice && (
                    <span className="inline-block mt-1 text-[10px] text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10 font-mono">
                      Demo Mode: Local Fallback Output
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Verdict</span>
                    <span className={`text-base font-bold uppercase ${
                      auditResultViewModel.status === 'APPROVED' ? 'text-emerald-400' : 'text-amber-500'
                    }`}>
                      {auditResultViewModel.status}
                    </span>
                  </div>
                  <div className={`p-2 rounded-lg border flex items-center justify-center ${
                    auditResultViewModel.status === 'APPROVED' ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' : 'bg-amber-950/20 border-[#cca553]/30 text-amber-400'
                  }`}>
                    {auditResultViewModel.status === 'APPROVED' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Numeric Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                    Calculated Sovereign Duty
                  </span>
                  <span className="text-base font-extrabold text-[#cca553] font-mono block">
                    {auditResultViewModel.formattedTariffCalculatedIQD} IQD
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({auditResultViewModel.tariffPercentage}% of declared value)
                  </span>
                </div>

                <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                    Threat Integrity Index
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-extrabold font-mono block ${
                      auditResultViewModel.isHighRisk ? 'text-red-400' : auditResultViewModel.riskScore > 20 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {auditResultViewModel.riskScore} / 100
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase">
                      {auditResultViewModel.isHighRisk ? 'HIGH RISK' : 'LOW RISK'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        auditResultViewModel.isHighRisk ? 'bg-red-500' : auditResultViewModel.riskScore > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${auditResultViewModel.riskScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                    HS-Code Verification
                  </span>
                  <span className="text-sm font-bold text-slate-100 font-mono block">
                    {auditResultViewModel.suggestedHSCode}
                  </span>
                  <span className={`text-[10px] font-mono ${
                    auditResultViewModel.isMatch ? 'text-emerald-400' : 'text-amber-500'
                  }`}>
                    {auditResultViewModel.isMatch ? '✓ Matching Verified' : '⚠ Discrepancy Found'}
                  </span>
                </div>
              </div>

              {/* Threat / Risk Points list */}
              <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800/85">
                <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  Risk Integrity Log Entries
                </h4>
                <ul className="flex flex-col gap-2 font-mono text-xs text-start">
                  {auditResultViewModel.riskAnalysis.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-slate-300 leading-relaxed">
                      <span className="text-amber-400 shrink-0">■</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Border Action Routing Recommendation */}
              <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800/85">
                <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  Border Command Action Routing Recommendation
                </h4>
                <p className="text-xs text-emerald-400 font-mono leading-relaxed bg-[#0a111a] p-2.5 rounded border-l-2 border-emerald-500">
                  {auditResultViewModel.routingRecommendation}
                </p>
                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                  <span>Federal Compliance: {auditResultViewModel.complianceProtocolUsed}</span>
                </div>
              </div>

              {/* Bilingual Translations for regional governors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 text-xs font-mono">
                {/* Arabic translation */}
                <div className="bg-slate-950/40 p-4 rounded border border-slate-800 text-right" dir="rtl">
                  <h4 className="text-amber-400 font-bold mb-2 font-sans text-xs">تقرير الأمن والتدقيق الجمركي الفدرالي</h4>
                  <p className="text-slate-300/90 leading-relaxed text-[11px]">
                    {auditResultViewModel.arabicSummary || "تم فحص الشحنة ومطابقة البنك المركزي العراقي بنجاح."}
                  </p>
                </div>

                {/* Kurdish translation */}
                <div className="bg-slate-950/40 p-4 rounded border border-slate-800 text-right" dir="rtl">
                  <h4 className="text-amber-400 font-bold mb-2 font-sans text-xs">ڕاپۆرتی سەرەکی لێکۆڵینەوە بازرگانی نیشتمانی</h4>
                  <p className="text-slate-300/90 leading-relaxed text-[11px]">
                    {auditResultViewModel.kurdishSummary || "شتومەکەکە پشکنینی بۆ کراوە بە پشتبەستن بە یاساي گومرگي فیدراڵي."}
                  </p>
                </div>
              </div>

            </div>
          )}

          <div className="text-[10px] text-slate-500 text-center font-mono border-t border-slate-800 pt-3 mt-4">
            REPUBLIC OF IRAQ CUSTOMS AUDIT BRAIN • SECURED DECENTRALIZED DATAFLOW
          </div>

        </div>
      </div>

    </div>
  </div>
);
};

export default CargoAuditorPanel;
