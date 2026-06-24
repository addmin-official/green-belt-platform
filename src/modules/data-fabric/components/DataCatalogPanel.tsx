import React from 'react';
import { Search, Database } from 'lucide-react';
import { Language } from '../../../types';
import { CatalogDataset } from '../../../data-fabric';
import { Badge, Table, SectionHeader } from '../../../ui';
import { 
  t, 
  translateClassification, 
  translateMinistry 
} from '../localization/dataFabricTranslations';

export interface DataCatalogPanelProps {
  lang: Language;
  datasets: CatalogDataset[];
  selectedDatasetId: string;
  selectDataset: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const DataCatalogPanel: React.FC<DataCatalogPanelProps> = React.memo(({
  lang,
  datasets,
  selectedDatasetId,
  selectDataset,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4">
      <div className="border-b border-slate-900 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <SectionHeader 
            title={t(lang, 'catalog.title')}
            description={t(lang, 'catalog.description')}
          />
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute ltr:left-3 rtl:right-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={t(lang, 'catalog.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0b1420] border border-slate-800 text-xs rounded-md w-full ltr:pl-9 rtl:pr-9 py-2 text-white focus:outline-none focus:border-[#E0A96D] focus:ring-1 focus:ring-[#E0A96D]"
          />
        </div>
      </div>

      {/* Catalog Master Table */}
      <div className="overflow-x-auto">
        <Table headers={[
          t(lang, 'catalog.headers.name'),
          t(lang, 'catalog.headers.custodian'),
          t(lang, 'catalog.headers.steward'),
          t(lang, 'catalog.headers.classification'),
          t(lang, 'catalog.headers.quality'),
          t(lang, 'catalog.headers.records')
        ]}>
          {datasets.map((ds) => {
            const isSelected = ds.id === selectedDatasetId;
            return (
              <tr 
                key={ds.id} 
                onClick={() => selectDataset(ds.id)}
                className={`cursor-pointer transition-all text-xs font-mono hover:bg-slate-900/35 ${
                  isSelected ? 'bg-slate-900 border-l-4 border-[#E0A96D] text-white' : 'text-slate-300'
                }`}
              >
                <td className="px-4 py-3.5">
                  <strong className="text-white block font-sans text-xs">
                    {lang === 'en' ? ds.name.en : lang === 'ar' ? ds.name.ar : ds.name.ku}
                  </strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{ds.id}</span>
                </td>
                <td className="px-4 py-3.5 text-slate-200 uppercase tracking-wide">
                  {translateMinistry(lang, ds.ownerMinistry)}
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-slate-300 block">{ds.dataSteward}</span>
                  <span className="text-[9px] text-slate-500 block font-normal">{ds.stewardEmail}</span>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={
                    ds.classification === 'TOP_SECRET' ? 'gold' :
                    ds.classification === 'SECRET' ? 'danger' :
                    ds.classification === 'CONFIDENTIAL' ? 'warning' : 'slate'
                  }>
                    {translateClassification(lang, ds.classification)}
                  </Badge>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`font-bold text-xs ${ds.qualityScore > 95 ? 'text-[#52B788]' : 'text-amber-400'}`}>
                    {ds.qualityScore}%
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right font-bold text-slate-200">
                  {ds.recordCount.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
});

DataCatalogPanel.displayName = 'DataCatalogPanel';
export default DataCatalogPanel;
