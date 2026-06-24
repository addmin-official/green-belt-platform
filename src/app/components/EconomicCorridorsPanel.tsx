import React from 'react';
import { TrendingUp, RefreshCw, BookOpen, Shield } from 'lucide-react';
import { PageHeader, Badge, UnifiedEmptyState } from '../../ui';
import { useGovernment } from '../../providers/GovernmentProvider';

export interface EconomicCorridorsPanelProps {
  lang: 'en' | 'ar' | 'ku';
  d: any;
  selectedCorridor: string;
  setSelectedCorridor: React.Dispatch<React.SetStateAction<string>>;
  policyLevel: string;
  setPolicyLevel: React.Dispatch<React.SetStateAction<string>>;
  cbiSurveillance: string;
  setCbiSurveillance: React.Dispatch<React.SetStateAction<string>>;
  isPredicting: boolean;
  predictionResult: any;
  handleTriggerForecast: () => void;
}

export const EconomicCorridorsPanel: React.FC<EconomicCorridorsPanelProps> = ({
  lang,
  d,
  selectedCorridor,
  setSelectedCorridor,
  policyLevel,
  setPolicyLevel,
  cbiSurveillance,
  setCbiSurveillance,
  isPredicting,
  predictionResult,
  handleTriggerForecast,
}) => {
  const { activeContext } = useGovernment();

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">
      <PageHeader
        icon={<TrendingUp />}
        title={lang === 'en' ? 'Sovereign economic corridors & strategic trade modeling' : lang === 'ar' ? 'نمذجة الرواق الاقتصادي والممرات التجارية الاستراتيجية' : 'تۆماری ڕێڕەوە ئابوورییە ستراتیژییەکان'}
        description={lang === 'en' ? 'Sovereign econometric simulation suite modeling Development Road and maritime trade corridors predictive tax collections.' : lang === 'ar' ? 'جناح المحاكاة الاقتصادية القياسية لتقدير الإيرادات الجمركية وحجم البضائع العابرة للحدود.' : 'سیستەمی نەخشەسازی و ڕوانینی ئابووریی بۆ پێشبینیکردنی داهاتەکانی گومرگ و جووڵەی کاڵاکان.'}
        status={
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="gold">{lang === 'en' ? 'Economic Corridors' : lang === 'ar' ? 'الممرات الاقتصادية' : 'ڕێڕەوە ئابوورییەکان'}</Badge>
            <Badge variant="teal">{activeContext}</Badge>
          </div>
        }
        actions={
          <div className="text-xs font-mono text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            {lang === 'en' ? 'MODEL: ECONOMETRIC_AI_V4' : 'STAT: IN_SYNC'}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Column: Inputs and Parameters controls */}
        <div className="lg:col-span-1 bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md">
        <div className="mb-5">
          <span className="text-xs text-[#cca553] uppercase font-mono block">Econometric Trade Simulator</span>
          <h2 className="text-lg font-display font-medium text-slate-100 mt-0.5">
            Macro Planning Parameters
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tune sovereign variables, trade corridor focuses, and Central Bank security modes to run AI forecasting models predicting duty volumes and revenue captured.
          </p>
        </div>

        {/* Selection Inputs */}
        <div className="flex flex-col gap-4 font-mono text-xs">
          
          <div>
            <label className="text-slate-400 block mb-1.5">{d.corridorDropdown}</label>
            <select 
              value={selectedCorridor}
              onChange={(e) => setSelectedCorridor(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded p-2.5 text-slate-200 focus:outline-none focus:border-[#cca553]"
            >
              <option value="al-faw-dev-road">Development Road (Grand Faw Port ⇄ Turkey)</option>
              <option value="basra-gulf-maritime">Basra Arabian Gulf Maritime Corridor</option>
              <option value="ibrahim-khalil-land">Ibrahim Khalil land highway route (Europe - Iraq)</option>
              <option value="jordan-trebil-highway">Trebil transit corridor (Jordan ⇄ Baghdad)</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 block mb-1.5">Border Customs Oversight Style</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 p-2.5 rounded bg-slate-950/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                <input 
                  type="radio" 
                  name="policyLevel" 
                  value="harmonized" 
                  checked={policyLevel === 'harmonized'}
                  onChange={() => setPolicyLevel('harmonized')}
                  className="text-[#cca553] focus:ring-0"
                />
                <div>
                  <span className="text-slate-100 font-semibold block text-xs">Harmonized Unified Trade</span>
                  <span className="text-[10px] text-slate-400 block">Baghdad-Erbil unified clearing, green-channel prioritizations.</span>
                </div>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded bg-slate-950/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                <input 
                  type="radio" 
                  name="policyLevel" 
                  value="hardened" 
                  checked={policyLevel === 'hardened'}
                  onChange={() => setPolicyLevel('hardened')}
                  className="text-[#cca553] focus:ring-0"
                />
                <div>
                  <span className="text-slate-100 font-semibold block text-xs">Hardened Sovereign Security</span>
                  <span className="text-[10px] text-slate-400 block">Strict 100% physical checks, high-frequency anti-smuggling audits.</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1.5">CBI Dollar Currency Surveillance Mode</label>
            <select 
              value={cbiSurveillance}
              onChange={(e) => setCbiSurveillance(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded p-2.5 text-slate-200 focus:outline-none focus:border-[#cca553]"
            >
              <option value="standard">Standard Digital Matching (LC validations)</option>
              <option value="strict">Strict Cross-Border Price auditing (Stop currency flight)</option>
              <option value="decoupled">Independent Settlement Clearings (Regional exemptions)</option>
            </select>
          </div>

          <button
            onClick={handleTriggerForecast}
            disabled={isPredicting}
            className="w-full bg-[#cca553] text-[#111e2e] py-3 px-4 rounded-lg font-semibold transition-all hover:bg-[#b08e48] disabled:bg-slate-800 disabled:text-slate-500 font-sans tracking-wide uppercase text-xs flex items-center justify-center gap-2 mt-2 shadow-lg cursor-pointer"
          >
            {isPredicting ? (
              <>
                <RefreshCw className="animate-spin w-4 h-4" />
                {d.predicting}
              </>
            ) : (
              <>
                <TrendingUp className="w-4.5 h-4.5" />
                {d.generateForecast}
              </>
            )}
          </button>

        </div>
      </div>

      {/* Right 2 Columns: Outputs and Econometric Trends */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md min-h-[420px] flex flex-col justify-between">
          
          {!predictionResult && !isPredicting && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <UnifiedEmptyState 
                type="no-data" 
                lang={lang} 
                action={
                  <div className="flex items-center gap-2 text-[10px] bg-slate-950/80 px-3.5 py-2 rounded-xl text-[#E0A96D] border border-[#E0A96D]/20 font-mono uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    SIMULATOR STANDBY ACTIVE
                  </div>
                } 
              />
            </div>
          )}

          {isPredicting && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
              <div className="p-4 bg-[#cca553]/10 rounded-full border border-[#cca553]/40 mb-4 animate-spin">
                <RefreshCw className="w-10 h-10 text-[#cca553]" />
              </div>
              <h3 className="font-semibold text-[#cca553] uppercase tracking-widest text-sm mb-1 animate-pulse">
                Synthesizing Econometric Prognostic Models...
              </h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-2 font-mono">
                Running multi-variable linear predictions on custom tariffs captured and estimating border congestion delays from historical trade patterns...
              </p>
            </div>
          )}

          {predictionResult && (
            <div className="flex flex-col gap-6">
              
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] text-[#cca553] uppercase font-mono tracking-widest font-semibold block">
                  Macro Economic Forecast Report Context
                </span>
                <h3 className="text-base font-display font-semibold text-slate-100 mt-0.5">
                  {d.economicCorridorTitle}
                </h3>
                {predictionResult.isDemoMode && (
                  <span className="inline-block mt-1 text-[10px] text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10 font-mono">
                    Economic Simulator fallback prediction report loaded
                  </span>
                )}
              </div>

              {/* Volume and Duty capture deltas */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                    {d.borderTradeFlow}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-extrabold font-mono ${
                      predictionResult.rawVolumeChange >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {predictionResult.volumeChange}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">Projected Change</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-mono">
                    Logistics transit velocity across nodes
                  </p>
                </div>

                <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                    {d.predictedRevenue}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#cca553] font-mono">
                      {predictionResult.revenueChange}
                    </span>
                    <span className="text-xs text-slate-400 font-sans">Duty Captured</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-mono text-[#cca553]/80">
                    Captured treasury leakage optimization
                  </p>
                </div>

              </div>

              {/* Comprehensive Trend writeup */}
              <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#cca553]" />
                  Federal Treasury Strategic Trend Analysis
                </h4>
                <p className="text-xs text-slate-300 font-mono leading-relaxed bg-[#0a111a] p-3 rounded border-l-2 border-[#cca553]/60 italic">
                  "{predictionResult.trendAnalysis}"
                </p>
              </div>

              {/* Executive Action Directive */}
              <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-2 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Federal Cabinet Executive Planning Directive
                </h4>
                <div className="bg-[#020617] border border-emerald-500/20 p-3 rounded text-emerald-400 text-xs font-mono leading-relaxed">
                  <strong>DIRECTIVE ST/2026-66:</strong> {predictionResult.executiveDirective}
                </div>
              </div>

            </div>
          )}

          <div className="text-[10px] text-slate-500 text-center font-mono border-t border-slate-800 pt-3 mt-4">
            CENTRAL ECONOMIC PREDICTION BRAIN • GOVERNMENT MACROECONOMIC OPTIMIZATIONS
          </div>

        </div>
        
      </div>

    </div>
  </div>
);
};

export default EconomicCorridorsPanel;
