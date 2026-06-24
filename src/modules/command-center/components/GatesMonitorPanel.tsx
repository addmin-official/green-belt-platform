import React from 'react';
import { CHECKPOINTS } from '../../../mockData';
import { Checkpoint, Language } from '../../../types';
import { t } from '../localization/ccTranslations';
import { Badge, ChartContainer, LineChart } from '../../../ui';

interface GatesMonitorPanelProps {
  lang: Language;
  selectedGate: Checkpoint;
  setSelectedGate: (g: Checkpoint) => void;
  hourlyTrafficData: Array<{ label: string; value: number }>;
}

export const GatesMonitorPanel: React.FC<GatesMonitorPanelProps> = React.memo(({
  lang,
  selectedGate,
  setSelectedGate,
  hourlyTrafficData
}) => {
  const translateGateType = (type: string) => {
    if (type === 'land') return lang === 'en' ? 'land border' : lang === 'ar' ? 'منفذ بري' : 'سنووری وشکانی';
    if (type === 'sea') return lang === 'en' ? 'seaport deep' : lang === 'ar' ? 'منفذ بحري' : 'سنووری دەریایی';
    if (type === 'air') return lang === 'en' ? 'airport cargo' : lang === 'ar' ? 'شحن جوي' : 'بارهەڵگری ئاسمانی';
    return type;
  };

  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-5 text-start">
      <div className="border-b border-slate-900 pb-2.5 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-start">
        <div className="text-start">
          <span className="text-[10px] text-[#E0A96D] uppercase font-mono tracking-widest font-bold block text-start">
            {selectedGate.region[lang]}
          </span>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mt-1 font-display text-start">
            <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse shrink-0"></span>
            {selectedGate.name[lang]} - {t(lang, 'checkpoint.metricsTitleSuffix')}
          </h3>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          {t(lang, 'checkpoint.accuracyLabel')}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start font-mono">
        <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850">
          <span className="text-slate-500 text-[9px] uppercase block mb-1">
            {t(lang, 'checkpoint.taxAuditLabel')}
          </span>
          <span className="text-xs font-bold text-cyan-400 block">
            {t(lang, 'checkpoint.zeroTrustLock')}
          </span>
        </div>
        
        <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850">
          <span className="text-slate-500 text-[9px] uppercase block mb-1">
            {t(lang, 'checkpoint.intakeToday')}
          </span>
          <span className="text-xs font-bold text-[#E0A96D] block">
            {(selectedGate.revenueRaw * 1000).toLocaleString()} IQD
          </span>
        </div>
        
        <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850">
          <span className="text-slate-500 text-[9px] uppercase block mb-1">
            {t(lang, 'checkpoint.trucksLabel')}
          </span>
          <span className="text-xs font-bold text-slate-200 block">
            {selectedGate.processedToday} {t(lang, 'checkpoint.manifestsLabel')}
          </span>
        </div>
        
        <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850">
          <span className="text-slate-500 text-[9px] uppercase block mb-1">
            {t(lang, 'checkpoint.scannerGradeLabel')}
          </span>
          <span className="text-xs font-semibold text-slate-400 block truncate">{translateGateType(selectedGate.type)}</span>
        </div>
      </div>

      {/* Micro-visualization showing hourly flow sequence */}
      <ChartContainer 
        title={t(lang, 'checkpoint.chartTitle')} 
        subtitle={t(lang, 'checkpoint.chartSub')}
      >
        {({ width, height }) => (
          <LineChart data={hourlyTrafficData} width={width} height={height} />
        )}
      </ChartContainer>

      {/* Selector Nodes Grid */}
      <div className="bg-[#0b1420] p-4.5 rounded-xl border border-slate-850 flex flex-col gap-2.5 text-start">
        <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 block font-bold text-start">
          {t(lang, 'checkpoint.selectNodeLabel')}
        </span>
        <div className="flex flex-wrap gap-2.5">
          {CHECKPOINTS.map((checkpoint) => (
            <button
              key={checkpoint.id}
              onClick={() => setSelectedGate(checkpoint)}
              className={`px-3.5 py-2.5 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedGate.id === checkpoint.id
                  ? 'bg-[#1a2c42] border border-[#E0A96D]/45 text-[#E0A96D] font-bold shadow'
                  : 'bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {checkpoint.name[lang]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

GatesMonitorPanel.displayName = 'GatesMonitorPanel';
