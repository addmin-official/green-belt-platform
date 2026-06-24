import React, { useState } from 'react';
import { useSsos } from '../../../providers/SsosProvider';
import { NationalKPIEngine } from '../../../services/ssos/SsosEngines';
import { Card, Badge, Button } from '../../../ui';
import { 
  Gauge, 
  GitCommit, 
  Settings, 
  TrendingUp, 
  UserCheck, 
  Briefcase, 
  Building2, 
  Sliders, 
  Layers,
  Award
} from 'lucide-react';

interface GovernmentPerformanceProps {
  lang: 'en' | 'ar' | 'ku';
}

export const GovernmentPerformancePanel: React.FC<GovernmentPerformanceProps> = ({ lang }) => {
  const { ministryKpis, ssosMode, updateMinistryPerformance, updateSpecificKpi } = useSsos();
  const [selectedMinId, setSelectedMinId] = useState<string>('MIN-FED-MOF');

  // Input states
  const [efficiency, setEfficiency] = useState<number>(85);
  const [delivery, setDelivery] = useState<number>(80);
  const [execution, setExecution] = useState<number>(75);

  const selectedMinistry = ministryKpis.find(m => m.id === selectedMinId) || ministryKpis[0];

  const handleUpdateMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMinId) return;
    updateMinistryPerformance(selectedMinId, efficiency, delivery, execution);
  };

  const handleKpiValueChange = (ministryId: string, kpiId: string, val: number) => {
    updateSpecificKpi(ministryId, kpiId, val);
  };

  // Run dynamic aggregations under the current selected context
  const nationalSummary = NationalKPIEngine.aggregateKpis(ministryKpis, ssosMode);
  const federalSummary = NationalKPIEngine.aggregateKpis(ministryKpis, ssosMode, 'federal');
  const krgSummary = NationalKPIEngine.aggregateKpis(ministryKpis, ssosMode, 'krg');

  const t = {
    en: {
      title: 'Sovereign Government Performance Hub',
      sub: 'Algorithmic administrative monitoring tracking public execution limits and policy compliance.',
      nationalMetrics: 'Sovereign National Index',
      budgetEfficiency: 'Budget Usage Efficiency',
      serviceDelivery: 'Citizens Service Delivery',
      executionRate: 'Strategic Program Execution',
      updateTitle: 'Calibrate Institutional Performance Indices',
      btnUpdate: 'Recalculate Ministry Index',
      ministryList: 'Sovereign Administrative Entities',
      kpisHeader: 'Active KPI Metrics Metrics',
      target: 'Objective Target',
      current: 'Active Valuation',
      overallScore: 'Executive Performance Index Score',
      unifiedHeader: 'Unified Administrative Fabric'
    },
    ar: {
      title: 'المنظومة الوطنية لمراقبة وتقييم الأداء الحكومي',
      sub: 'مراقبة وتقييم الكفاءة الإدارية للأجهزة التنفيذية والوزارة والهيئات وفق مؤشرات الأداء الحقيقية والمخرجات.',
      nationalMetrics: 'المؤشر السيادي الوطني العام لمؤسسات الدولة',
      budgetEfficiency: 'كفاءة صرف واستغلال الموازنات المرصودة',
      serviceDelivery: 'معدل رضا وجودة تقديم الخدمات للمواطنين',
      executionRate: 'معدل إنجاز خطط البرامج الإستراتيجية العليا',
      updateTitle: 'معايرة وضبط مؤشرات الفعالية المؤسسية',
      btnUpdate: 'إعادة احتساب الأداء العملياتي لدا الوزارة',
      ministryList: 'الوزارات والهيئات الوطنية الخاضعة للتدقيق',
      kpisHeader: 'مؤشرات الأداء النشطة والأهداف الكمية',
      target: 'الهدف الاستراتيجي المرسوم',
      current: 'مستوى التقييم الميداني الفعلي',
      overallScore: 'معدل نقاط الجودة والتقييم المؤسسي',
      unifiedHeader: 'المستوعب الإداري السيادي الموحد'
    },
    ku: {
  title: '| ناوەندی هەڵسەنگاندنی کارکردنی دامەزراوەکانی دەوڵەت',
  sub: '| چاودێریکردنی توانای جێبەجێکردنی پڕۆژە خزمەتگوزارییەکان لەلایەن وەزارەتەکانەوە بە ڕێگای دیجیتاڵی.',
  nationalMetrics: '| کۆی پێنوێنی نیشتمانی گشتی',
  budgetEfficiency: '| ڕێژەی سوودوەرگرتن لە بودجەی گواستراوە',
  serviceDelivery: '| ئاستی پێشکەشکردنی خزمەتگوزارییەکان بە خەڵک',
  executionRate: '| ڕێژەی بەدەستهێنانی ئامانجە ستراتیژییەکان',
  updateTitle: '| دەستکاری پێوەرەکانی وەزارەتی دیاری کراو',
  btnUpdate: '| هاوسەنگکردنەوەی ژمارەکانی گونجاندن',
  ministryList: '| وەزارەت و فەرمانگەکانی بەکار لە چاودێری',
  kpisHeader: '| مەودا و ئامانجی سەرەکی خاڵەکانی KPI',
  target: '| ئامانجی پێویست بۆ بەدەستهێنان',
  current: '| ئاستی کارکردنی ئێستا',
  overallScore: '| پلەی ناوەندی گشتی جێبەجێکردن',
  unifiedHeader: '| یەکگرتنەوەی کارگێڕیی هاوچەرخی دەوڵەت'
}
  }[lang];

  return (
    <div id="government-performance-governor" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Page Header card */}
      <Card className="bg-[#0b1329]/95 border-[#E0A96D]/30 p-6 rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-teal-950/80 border border-teal-800 rounded-lg text-teal-400">
            <Gauge className="w-6 h-6 animate-pulse shrink-0" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              {t.title}
              <Badge variant="teal">NATIONAL_KPI_FABRIC</Badge>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.sub}</p>
          </div>
        </div>
      </Card>

      {/* Aggregate KPI Gauges across Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3.5 bg-teal-950/80 border border-teal-800 rounded-full text-teal-400 shrink-0 text-base font-bold font-mono">
            {nationalSummary.nationalScore}%
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">SOVEREIGN STATE INDEX</span>
            <strong className="text-sm text-slate-200">Consolidated Performance Score</strong>
            <div className="w-full bg-slate-950 h-1 mt-1 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500" style={{ width: `${nationalSummary.nationalScore}%` }} />
            </div>
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3.5 bg-emerald-950/80 border border-emerald-800 rounded-full text-emerald-400 shrink-0 text-base font-bold font-mono">
            {federalSummary.nationalScore}%
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">FEDERAL JURISDICTION</span>
            <strong className="text-sm text-slate-200">Federal Iraq Executive Score</strong>
            <div className="w-full bg-slate-950 h-1 mt-1 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${federalSummary.nationalScore}%` }} />
            </div>
          </div>
        </Card>

        <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3.5 bg-amber-950/80 border border-amber-800 rounded-full text-amber-500 shrink-0 text-base font-bold font-mono">
            {krgSummary.nationalScore}%
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">KURDISTAN REGION (KRG)</span>
            <strong className="text-sm text-slate-200">KRG Executive Performance Score</strong>
            <div className="w-full bg-slate-950 h-1 mt-1 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: `${krgSummary.nationalScore}%` }} />
            </div>
          </div>
        </Card>

      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left selection card */}
        <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl lg:col-span-4 flex flex-col gap-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">{t.ministryList}</span>
          <div className="flex flex-col gap-2.5">
            {ministryKpis.map(m => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMinId(m.id);
                  setEfficiency(m.budgetEfficiency);
                  setDelivery(m.serviceDeliveryRate);
                  setExecution(m.executionRate);
                }}
                className={`p-3 rounded-lg border text-start transition flex flex-col gap-1.5 cursor-pointer ${
                  selectedMinId === m.id
                    ? 'bg-amber-950/40 border-amber-600/70 shadow'
                    : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">{m.jurisdiction.toUpperCase()} OWNER</span>
                  <Badge variant="emerald">{m.performanceScore}%</Badge>
                </div>
                <strong className="text-xs font-bold text-slate-200 lines-clamp-1">{m.name[lang] || m.name.en}</strong>
              </button>
            ))}
          </div>
        </Card>

        {/* Right dashboard details */}
        {selectedMinistry && (
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/95 border-slate-900 p-6 rounded-xl flex flex-col gap-6">
              
              {/* Slate title header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-4">
                <div>
                  <Badge variant={selectedMinistry.jurisdiction === 'federal' ? 'teal' : selectedMinistry.jurisdiction === 'krg' ? 'emerald' : 'gold'}>
                    {selectedMinistry.jurisdiction.toUpperCase()} DIRECTIVE AUTHORITY
                  </Badge>
                  <h3 className="text-base font-bold text-slate-100 mt-1">{selectedMinistry.name[lang] || selectedMinistry.name.en}</h3>
                </div>

                <div className="text-start sm:text-end bg-slate-950 p-2 rounded border border-slate-900/80">
                  <span className="text-[9px] text-slate-500 block uppercase font-mono">{t.overallScore}</span>
                  <strong className="text-xl font-mono text-[#E0A96D] font-extrabold">{selectedMinistry.performanceScore}%</strong>
                </div>
              </div>

              {/* Slider metrics on top half, sliders KPIs on lower half */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pb-2">
                
                {/* Sliders update performance parameters */}
                <div className="bg-slate-900/20 p-5 rounded-lg border border-slate-900 flex flex-col gap-3.5">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-slate-900">
                    <Sliders className="w-4 h-4 text-amber-500" />
                    {t.updateTitle}
                  </span>

                  <form onSubmit={handleUpdateMetrics} className="flex flex-col gap-3 text-xs leading-relaxed">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">{t.budgetEfficiency}</span>
                        <strong className="text-amber-500">{efficiency}%</strong>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={efficiency}
                        onChange={e => setEfficiency(parseInt(e.target.value))}
                        className="w-full accent-amber-500 h-1 cursor-pointer bg-slate-950 rounded appearance-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">{t.serviceDelivery}</span>
                        <strong className="text-emerald-400">{delivery}%</strong>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={delivery}
                        onChange={e => setDelivery(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 h-1 cursor-pointer bg-slate-950 rounded appearance-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between font-mono">
                        <span className="text-slate-400">{t.executionRate}</span>
                        <strong className="text-sky-400">{execution}%</strong>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={execution}
                        onChange={e => setExecution(parseInt(e.target.value))}
                        className="w-full accent-sky-500 h-1 cursor-pointer bg-slate-950 rounded appearance-none"
                      />
                    </div>

                    <Button type="submit" variant="emerald" className="text-xs shrink-0 font-sans mt-1">
                      {t.btnUpdate}
                    </Button>
                  </form>
                </div>

                {/* KPI Metrics block */}
                <div className="flex flex-col gap-3 bg-slate-900/20 p-5 rounded-lg border border-slate-900/60 max-w-full">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-slate-900">
                    <Award className="w-4 h-4 text-emerald-400" />
                    {t.kpisHeader}
                  </span>

                  <div className="flex flex-col gap-4">
                    {selectedMinistry.kpis.map(kp => (
                      <div key={kp.id} className="flex flex-col gap-1.5 text-xs pb-3 border-b border-slate-900 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start gap-3">
                          <span className="text-slate-200 font-semibold leading-tight">{kp.label[lang] || kp.label.en}</span>
                          <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">Weight: {kp.weight}%</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-mono text-slate-400 items-center mt-0.5">
                          <span>{t.target}: <b>{kp.target}%</b></span>
                          <span>{t.current}: <b className="text-emerald-400">{kp.current}%</b></span>
                        </div>

                        {/* Interactive direct updates */}
                        <input
                          type="range"
                          min="0"
                          max={kp.target}
                          step="0.5"
                          value={kp.current}
                          onChange={e => handleKpiValueChange(selectedMinistry.id, kp.id, parseFloat(e.target.value))}
                          className="w-full accent-emerald-500 h-0.5 cursor-pointer bg-slate-950 rounded appearance-none mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </Card>
          </div>
        )}

      </div>

    </div>
  );
};
export default GovernmentPerformancePanel;
