import React, { useMemo } from 'react';
import { Shuffle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Language } from '../../../types';
import { CatalogDataset, DatasetQualityReport } from '../../../data-fabric';
import { 
  t, 
  translateClassification, 
  translateMinistry 
} from '../localization/dataFabricTranslations';

export interface DatasetDetailsPanelProps {
  lang: Language;
  selectedDatasetDetails: CatalogDataset | null;
  selectedDatasetQuality: DatasetQualityReport | null;
}

export const DatasetDetailsPanel: React.FC<DatasetDetailsPanelProps> = React.memo(({
  lang,
  selectedDatasetDetails,
  selectedDatasetQuality
}) => {
  const qualityDims = useMemo(() => {
    if (!selectedDatasetQuality) return [];
    return [
      { label: t(lang, 'catalog.dimensions.completeness'), val: selectedDatasetQuality.metrics.completeness },
      { label: t(lang, 'catalog.dimensions.accuracy'), val: selectedDatasetQuality.metrics.accuracy },
      { label: t(lang, 'catalog.dimensions.consistency'), val: selectedDatasetQuality.metrics.consistency },
      { label: t(lang, 'catalog.dimensions.timeliness'), val: selectedDatasetQuality.metrics.timeliness },
      { label: t(lang, 'catalog.dimensions.uniqueness'), val: selectedDatasetQuality.metrics.uniqueness },
      { label: t(lang, 'catalog.dimensions.validity'), val: selectedDatasetQuality.metrics.validity }
    ];
  }, [selectedDatasetQuality, lang]);

  if (!selectedDatasetDetails) return null;

  return (
    <div className="bg-[#0b1420]/80 p-4.5 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Column 1: Details & Cross-ministry Lineage points */}
      <div className="flex flex-col gap-3 text-start">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E0A96D] flex items-center gap-1.5 border-b border-slate-900 pb-1.5 font-sans">
          <Shuffle className="w-3.5 h-3.5" />
          {t(lang, 'catalog.mappingsTitle')}
        </h4>
        <p className="text-[11px] text-slate-400 leading-normal font-sans italic">
          "{lang === 'en' ? selectedDatasetDetails.description.en : lang === 'ar' ? selectedDatasetDetails.description.ar : selectedDatasetDetails.description.ku}"
        </p>

        <div className="flex flex-col gap-2.5 mt-1 font-mono text-[10px]">
          {selectedDatasetDetails.mappings.map((m, idx) => (
            <div key={idx} className="bg-[#111e2e]/60 p-2.5 rounded border border-slate-850 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[#E0A96D] font-bold">
                <span>Map [{m.sourceField}] → [{m.targetField}]</span>
                <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-white tracking-widest">{m.syncMechanism}</span>
              </div>
              <p className="text-slate-400">
                {t(lang, 'catalog.destinationTarget')}: <strong className="text-slate-200">{translateMinistry(lang, m.targetMinistry)}</strong> ({m.targetDatasetId})
              </p>
              {m.transformationRule && (
                <div className="text-[9px] text-slate-500 font-bold bg-slate-950 p-1.5 border border-slate-900 rounded italic">
                  {t(lang, 'catalog.ruleLabel')}: {
                    lang === 'en' ? m.transformationRule :
                    lang === 'ar' ? m.transformationRule.replace('Verify', 'التحقق من').replace('Format', 'صياغة').replace('Map', 'مطابقة') :
                    m.transformationRule.replace('Verify', 'پشکنینی فەرمی بۆ').replace('Format', 'دارشتنی شێوازی').replace('Map', 'بەستنەوە بە')
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Data Quality 6-way Dimensions Breakdown */}
      {selectedDatasetQuality && (
        <div className="flex flex-col gap-3 text-start">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#52B788] flex items-center gap-1.5 border-b border-slate-900 pb-1.5 font-sans">
            <CheckCircle className="w-3.5 h-3.5" />
            {t(lang, 'catalog.qualityTitle')}
          </h4>

          {/* Quality Rules Radar Mock Bar Grid */}
          <div className="grid grid-cols-2 gap-3.5 font-mono text-xs pt-1">
            {qualityDims.map((dim) => (
              <div key={dim.label} className="bg-slate-950/60 p-2 px-3 rounded border border-slate-900 flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>{dim.label}</span>
                  <span className="text-[#52B788] font-bold">{dim.val}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                  <div className="bg-[#52B788] h-full" style={{ width: `${dim.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Critical Anomalies Alerts inside quality rules */}
          <div className="flex flex-col gap-1.5 mt-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
              {t(lang, 'catalog.alertsTitle')}
            </span>
            {selectedDatasetQuality.criticalAnomalies.length === 0 ? (
              <span className="text-[10px] text-emerald-400 bg-emerald-950/20 p-2 px-3 rounded border border-emerald-900/40 inline-block font-mono text-start">
                ✓ {t(lang, 'catalog.emptyAlerts')}
              </span>
            ) : (
              <div className="flex flex-col gap-1.5">
                {selectedDatasetQuality.criticalAnomalies.map((a, i) => (
                  <div key={i} className="bg-red-950/20 border border-red-500/20 text-red-100 text-[10.5px] p-2 rounded-md font-sans font-semibold flex items-start gap-2 leading-relaxed text-start">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span>{
                      lang === 'en' ? a :
                      lang === 'ar' ? a.replace('Duplicate', 'سجل مكرر').replace('Invalid', 'غير صحيح').replace('Nulls', 'قيم فارغة') :
                      a.replace('Duplicate', 'سجلی دووبارە').replace('Invalid', 'ناڕاست').replace('Nulls', 'زانیاری بەتاڵ')
                    }</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
});

DatasetDetailsPanel.displayName = 'DatasetDetailsPanel';
export default DatasetDetailsPanel;
