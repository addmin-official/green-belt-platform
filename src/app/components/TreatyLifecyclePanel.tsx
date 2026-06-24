import React, { useState } from 'react';
import { TreatyRegistry, Treaty, TreatyStatus } from '../../services/federation/TreatyRegistry';
import { Card, Badge, Button } from '../../ui';
import { FileSearch, Sliders, ChevronRight, Scale, CheckSquare, AlertTriangle } from 'lucide-react';
import { useGovernment } from '../../providers/GovernmentProvider';

interface TreatyLifecyclePanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const TreatyLifecyclePanel: React.FC<TreatyLifecyclePanelProps> = ({ lang }) => {
  const { userRole, logAction } = useGovernment();
  const [treaties, setTreaties] = useState<Treaty[]>(() => TreatyRegistry.getTreaties());
  const [selectedId, setSelectedId] = useState<string>(treaties[0]?.id || '');

  const activeTreaty = treaties.find(t => t.id === selectedId) || treaties[0];

  const handleAdjustRatio = (id: string, ratio: number) => {
    const updated = TreatyRegistry.updateCompliance(id, ratio);
    if (updated) {
      logAction(
        userRole,
        `Adjusted compliance rating metric for Treaty of ${updated.id} to ${ratio}%.`,
        'FEDERATION_TREATY_ORCHESTRATION'
      );
      setTreaties([...TreatyRegistry.getTreaties()]);
    }
  };

  const t = {
    en: {
      selectLabel: 'Select Treaty Document File',
      clausesHeader: 'Treaty Sovereign Articles & Clauses Matrix',
      complianceLabel: 'Adjust Compliance Verification Ratio',
      governingLaw: 'Governing National Framework',
      activeStatus: 'Active Verification State',
      signatoryCabinets: 'Signatory Sovereign Cabinets'
    },
    ar: {
      selectLabel: 'اختر وثيقة المعاهدة المعروضة',
      clausesHeader: 'بنود ومواد الاتفاقية السيادية الثنائية',
      complianceLabel: 'ضبط معيار سلامة الامتثال الفني للبيانات',
      governingLaw: 'القانون المنظم المصدق عليه',
      activeStatus: 'حالة الصلاحية والتنفيذ',
      signatoryCabinets: 'مجالس الوزراء والمؤسسات الموقعة'
    },
    ku: {
      selectLabel: 'دەستنیشانکردنی پەیماننامەی نیشتمانی',
      clausesHeader: 'بەند و ماددە فەرمییەکانی ڕێککەوتنی باڵا',
      complianceLabel: 'ڕێکخستنی ڕێژەی بڕواپێکراوی گونجان',
      governingLaw: 'یاسای فەرمی چاودێریکار',
      activeStatus: 'دۆخی هەڵسوڕانی فەرمی',
      signatoryCabinets: 'فەرمانگە و واژۆکارانی یاسایی'
    }
  }[lang];

  return (
    <div id="treaty-lifecycle-analyzer-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full text-start">
      
      {/* Selection Left bar */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl flex flex-col gap-3">
          <label className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Scale className="w-4 h-4 text-sky-400" />
            {t.selectLabel}
          </label>

          <div className="flex flex-col gap-2.5 mt-1">
            {treaties.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`p-3 rounded-lg border text-start transition flex flex-col justify-between cursor-pointer ${
                  selectedId === t.id
                    ? 'bg-sky-950/45 border-sky-600/80'
                    : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono text-slate-500">{t.id}</span>
                  <Badge variant={t.status === 'ACTIVE' || t.status === 'RATIFIED' ? 'teal' : 'neutral'}>
                    {t.status}
                  </Badge>
                </div>
                <div className="text-xs font-sans font-bold text-slate-200 mt-1 lines-clamp-2">
                  {t.title[lang] || t.title.en}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Clause & Compliance controls */}
      {activeTreaty && (
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-start gap-4 border-b border-slate-900 pb-3">
              <div>
                <span className="text-[10.5px] font-mono text-slate-400 uppercase">{activeTreaty.id} • STATUS: {activeTreaty.status}</span>
                <h3 className="text-base font-bold text-slate-100 mt-1">
                  {activeTreaty.title[lang] || activeTreaty.title.en}
                </h3>
              </div>
            </div>

            {/* Clauses breakdown */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-emerald-400" />
                {t.clausesHeader}
              </span>

              <div className="flex flex-col gap-2.5">
                {activeTreaty.clauses.map(cls => (
                  <div key={cls.id} className="p-3 bg-slate-900/35 border border-slate-900 rounded-lg">
                    <span className="text-[10px] font-mono text-sky-400 font-bold block">{cls.id} • {cls.title}</span>
                    <p className="text-xs text-slate-300 mt-1 leading-normal text-left">{cls.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance verification slider */}
            <div className="bg-slate-900/40 p-4 border border-slate-900 rounded-xl flex flex-col gap-2 mt-2">
              <label className="text-xs font-mono text-amber-500 flex items-center gap-2 uppercase tracking-wide">
                <Sliders className="w-4 h-4" />
                {t.complianceLabel}
              </label>
              
              <div className="flex gap-4 items-center mt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={activeTreaty.complianceRatio}
                  className="w-full accent-amber-500 bg-slate-950 h-1.5 rounded-full outline-none cursor-pointer"
                  onChange={e => handleAdjustRatio(activeTreaty.id, parseInt(e.target.value))}
                />
                <span className="text-sm font-bold font-mono text-slate-100 w-12 text-end">
                  {activeTreaty.complianceRatio}%
                </span>
              </div>
            </div>

            {/* Document Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pt-2 border-t border-slate-900 text-xs font-sans">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">{t.governingLaw}</span>
                <span className="text-slate-300 font-medium">{activeTreaty.governingLaw}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase">{t.signatoryCabinets}</span>
                <span className="text-slate-300 font-medium">{activeTreaty.signingParties.join(' + ')}</span>
              </div>
            </div>

          </Card>
        </div>
      )}

    </div>
  );
};
export default TreatyLifecyclePanel;
