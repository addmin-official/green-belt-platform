import React from 'react';
import { Play } from 'lucide-react';
import { SectionHeader, Table, Badge } from '../../../ui';
import { Language } from '../../../types';
import { LineageImpactNode } from '../types/DataFabricViewModels';
import { 
  t, 
  translateClassification, 
  translateRole 
} from '../localization/dataFabricTranslations';

export interface DataLineagePanelProps {
  lang: Language;
  impactSourceNode: string;
  impactResult: LineageImpactNode[];
  lineageGraph: any;
  triggerImpactSimulation: (nodeId: string) => void;
}

export const DataLineagePanel: React.FC<DataLineagePanelProps> = React.memo(({
  lang,
  impactSourceNode,
  impactResult,
  lineageGraph,
  triggerImpactSimulation
}) => {
  const isRtl = lang !== 'en';

  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
      <SectionHeader 
        title={t(lang, 'lineage.title')}
        description={t(lang, 'lineage.description')}
      />

      {/* Lineage Visual Simulator layout */}
      <div className="bg-[#0b1420] p-4.5 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Selector area */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">
            {t(lang, 'lineage.selectTitle')}
          </label>
          <select
            value={impactSourceNode}
            onChange={(e) => triggerImpactSimulation(e.target.value)}
            className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-mono text-white focus:outline-none w-full"
          >
            <option value="src-moi-civil-db">
              {t(lang, 'lineage.routeMap.primaryDbs')} - {lang === 'en' ? 'MoI Civil Registration (Raw Citizen DB)' : lang === 'ar' ? 'سجل الأحوال المدنية - الداخلية (قاعدة بيانات المواطنين الأساسية)' : 'تۆماری باری شارستانی - وەزارەتی ناوخۆ (داتای هاوڵاتیان)'}
            </option>
            <option value="src-mot-companies-db">
              {lang === 'en' ? 'MoTrade Registry System (Raw Corporate DB)' : lang === 'ar' ? 'سجل الشركات المركزي - وزارة التجارة (قاعدة بيانات الشركات العالمية)' : 'تۆماری ناوەندی کۆمپانیاکان - وەزارەتی بازرگانی'}
            </option>
            <option value="src-cbi-wire-db">
              {lang === 'en' ? 'Central Bank Interbanking Ledger (Raw Forex DB)' : lang === 'ar' ? 'سجل الحوالات المالية المركزي - البنك المركزي العراقي' : 'تۆماری بانکەکان - بانکی ناوەندی عێراق'}
            </option>
            <option value="pipe-idg-etl-processor">
              {lang === 'en' ? 'IDG Resolution Node (Transformation Pipeline)' : lang === 'ar' ? 'عقدة معالجة وتدقيق البوابة الرقمية المشتركة' : 'ناوەندی پاکتاوکردن و چاکسازی پۆرتاڵی نیشتمانی'}
            </option>
            <option value="core-datalake-isolated">
              {t(lang, 'lineage.routeMap.secureDatalake')} - {lang === 'en' ? 'Unified Data Ocean (Central Golden Registry)' : lang === 'ar' ? 'بحيرة البيانات الفيدرالية الموحدة المعزولة' : 'دەریاچەی زانیارییە فیدراڵییە سەرەکییە پارێزراوەکان'}
            </option>
          </select>
          <p className="text-[10px] text-slate-500 font-sans leading-normal">
            {t(lang, 'lineage.telemetry')}
          </p>
        </div>

        {/* Data Provenance & Impact Simulation Result table */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-[11px] font-mono text-[#52B788] uppercase font-bold flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            {t(lang, 'lineage.impactTitle')}
          </label>

          {impactResult.length === 0 ? (
            <div className="p-4 bg-slate-900 border border-slate-850 rounded-lg text-xs italic text-slate-500 text-start">
              {t(lang, 'lineage.emptyImpact')}
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[160px] border border-slate-850 rounded">
              <Table headers={[
                t(lang, 'lineage.headers.impactedNode'),
                t(lang, 'lineage.headers.classificationType'),
                t(lang, 'lineage.headers.criticalityRating'),
                t(lang, 'lineage.headers.roleAffiliations')
              ]}>
                {impactResult.map((node, i) => (
                  <tr key={i} className="text-[10.5px] font-mono hover:bg-slate-900/30">
                    <td className="px-3 py-2 font-semibold text-white">{node.label}</td>
                    <td className="px-3 py-2 text-slate-400">{translateClassification(lang, node.type)}</td>
                    <td className="px-3 py-2">
                      <Badge variant={node.impactLevel === 'CRITICAL' ? 'danger' : 'warning'}>
                        {node.impactLevel === 'CRITICAL'
                          ? t(lang, 'impactLevel.CRITICAL')
                          : t(lang, 'impactLevel.WARNING')}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-slate-350">{translateRole(lang, node.roleAffected)}</td>
                  </tr>
                ))}
              </Table>
            </div>
          )}
        </div>

      </div>

      {/* Static high-fidelity diagram detailing trace flows in key layout */}
      <div className="border border-slate-850 p-4 rounded-xl bg-slate-950/40" dir={isRtl ? 'rtl' : 'ltr'}>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-3 font-mono">
          {t(lang, 'lineage.routeMap.title')}
        </span>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center text-xs font-mono">
          
          <div className="bg-[#111e2e] border border-slate-800 p-3 rounded-lg w-full md:w-36">
            <strong className="text-white block text-[11px]">
              {t(lang, 'lineage.routeMap.primaryDbs')}
            </strong>
            <span className="text-[9px] text-[#E0A96D] block mt-0.5">
              {t(lang, 'lineage.routeMap.rawEncrypted')}
            </span>
          </div>

          <div className="text-slate-600 font-extrabold text-[15px]">⇄</div>

          <div className="bg-[#111e2e] border border-emerald-900 w-full md:w-36 p-3 rounded-lg relative">
            <strong className="text-white block text-[11px]">
              {t(lang, 'lineage.routeMap.idgEtlNode')}
            </strong>
            <span className="text-[9px] text-[#52B788] block mt-0.5">
              {t(lang, 'lineage.routeMap.resolutionEngine')}
            </span>
          </div>

          <div className="text-slate-600 font-extrabold text-[15px]">⇄</div>

          <div className="bg-[#111e2e] border border-slate-800 p-3 rounded-lg w-full md:w-36">
            <strong className="text-white block text-[11px]">
              {t(lang, 'lineage.routeMap.secureDatalake')}
            </strong>
            <span className="text-[9px] text-cyan-400 block mt-0.5">
              {t(lang, 'lineage.routeMap.goldMasterIndex')}
            </span>
          </div>

          <div className="text-slate-600 font-extrabold text-[15px]">⇄</div>

          <div className="bg-[#111e2e] border border-purple-900 p-3 rounded-lg w-full md:w-36">
            <strong className="text-white block text-[11px]">
              {t(lang, 'lineage.routeMap.secureApi')}
            </strong>
            <span className="text-[9px] text-purple-400 block mt-0.5">
              {t(lang, 'lineage.routeMap.dualSignature')}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
});

DataLineagePanel.displayName = 'DataLineagePanel';
export default DataLineagePanel;
