import React, { useState } from 'react';
import { useSsos } from '../../../providers/SsosProvider';
import { Card, Badge, Button } from '../../../ui';
import { 
  Landmark, 
  Layers, 
  Network, 
  ChevronRight, 
  Plus, 
  Briefcase, 
  Settings, 
  DollarSign, 
  Gauge, 
  TrendingUp, 
  Calendar,
  Layers2
} from 'lucide-react';

interface NationalBudgetCommandCenterProps {
  lang: 'en' | 'ar' | 'ku';
}

export const NationalBudgetCommandCenter: React.FC<NationalBudgetCommandCenterProps> = ({ lang }) => {
  const { budgets, ssosMode, addBudget, updateBudgetStatus } = useSsos();
  const [selectedBudgetIdx, setSelectedBudgetIdx] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form states
  const [newBgtNameEn, setNewBgtNameEn] = useState('');
  const [newBgtNameAr, setNewBgtNameAr] = useState('');
  const [newBgtNameKu, setNewBgtNameKu] = useState('');
  const [newBgtAllocated, setNewBgtAllocated] = useState('12000');
  const [newBgtJurisdiction, setNewBgtJurisdiction] = useState<'federal' | 'krg' | 'joint'>('federal');

  const activeBudget = budgets[selectedBudgetIdx] || budgets[0];

  const lifecycles: ('Draft' | 'Review' | 'Cabinet Approval' | 'Parliament Approval' | 'Execution' | 'Audit' | 'Closed')[] = [
    'Draft', 'Review', 'Cabinet Approval', 'Parliament Approval', 'Execution', 'Audit', 'Closed'
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBgtNameEn || !newBgtAllocated) return;
    
    const allocations = parseInt(newBgtAllocated);
    addBudget({
      id: `BGT-${Date.now().toString().slice(-4)}`,
      name: {
        en: newBgtNameEn,
        ar: newBgtNameAr || newBgtNameEn,
        ku: newBgtNameKu || newBgtNameEn
      },
      year: 2026,
      jurisdiction: newBgtJurisdiction,
      totalAllocated: allocations,
      expenditureSocial: Math.round(allocations * 0.25),
      expenditureSecurity: Math.round(allocations * 0.20),
      expenditureDevelopment: Math.round(allocations * 0.30),
      expenditureOperating: Math.round(allocations * 0.25),
      revenueEstOil: Math.round(allocations * 0.80),
      revenueEstNonOil: Math.round(allocations * 0.20),
      status: 'Draft'
    });

    setShowAddForm(false);
    setNewBgtNameEn('');
    setNewBgtNameAr('');
    setNewBgtNameKu('');
  };

  const currentIdx = lifecycles.indexOf(activeBudget?.status || 'Draft');

  const promoteStatus = () => {
    if (activeBudget && currentIdx < lifecycles.length - 1) {
      updateBudgetStatus(activeBudget.id, lifecycles[currentIdx + 1]);
    }
  };

  const demoteStatus = () => {
    if (activeBudget && currentIdx > 0) {
      updateBudgetStatus(activeBudget.id, lifecycles[currentIdx - 1]);
    }
  };

  const t = {
    en: {
      budgetCenter: 'National Budget Sovereign Commander',
      desc: 'Sovereign legislative allocations, capital budgeting lifecycle, and inter-government finance mandates.',
      createBgt: 'Draft Sovereign Budget Act',
      namePlEn: 'Budget Name (English)',
      namePlAr: 'Budget Name (Arabic)',
      namePlKu: 'Budget Name (Kurdish)',
      allocated: 'Consolidated Allocation ($M USD)',
      jurisdiction: 'Sovereign Jurisdiction',
      submitBtn: 'Enact Budget',
      totalAlloc: 'Total Allocated Budget',
      lifecycleHeader: 'Legislative Approval Lifecycle',
      promote: 'Advance Stage',
      demote: 'Revert Stage',
      social: 'Social Affairs & Pensions',
      security: 'National Defense & Security',
      development: 'Capital Development Projects',
      operating: 'Government Operating Costs',
      estRevenue: 'Est. Revenue Streams',
      estOil: 'Oil Revenues Forecast',
      estNonOil: 'Non-Oil Tributary Ratios',
      unifiedWarning: 'SOVEREIGN STATE UNIFICATION DIRECTIVE: Regional budgets are merged into the Iraq Grand National Ledger.'
    },
    ar: {
      budgetCenter: 'مركز قيادة الموازنة العامة والتشريع المالي',
      desc: 'إدارة وتتبع الموازنات الاتحادية، وهيكل الإنفاق الرأسمالي والتخطيط المالي السيادي المشترك.',
      createBgt: 'صياغة مشروع قانون الموازنة العامة',
      namePlEn: 'اسم الموازنة (قانوني إنجليزي)',
      namePlAr: 'اسم الموازنة (قانوني عربي)',
      namePlKu: 'اسم الموازنة (قانوني كوردستاني)',
      allocated: 'القيمة المالية للمخصصات (مليون دولار)',
      jurisdiction: 'النطاق الجغرافي والسيادي',
      submitBtn: 'إرسال للمصادقة',
      totalAlloc: 'إجمالي التمويل المرصود والمخصص',
      lifecycleHeader: 'دورة التشريع والموافقة النيابية',
      promote: 'ترقية المرحلة التشريعية',
      demote: 'إرجاع للتدقيق',
      social: 'مخصصات المساعدات والرعاية الاجتماعية',
      security: 'الدفاع والمنظومة الأمنية الوطنية',
      development: 'المشروعات الصناعية والتنموية',
      operating: 'النفقات الحكومية والسيادية المستمرة',
      estRevenue: 'توقعات هيكل الإيرادات وعوائد الدولة',
      estOil: 'الإيرادات النفطية والغازية المباشرة',
      estNonOil: 'الإيرادات والرسوم لغير القطاع النفطي',
      unifiedWarning: 'تنبيه الدمج الوطني الكامل: تم دمج جميع الموازنات ضمن الموازنة العامة العراقية الموحدة.'
    },
    ku: {
  budgetCenter: '| ناوەندی چاودێری و بڕیاردانی بودجەی گشتی نیشتمانی',
  desc: '| یاسای فەرمی دابەشکردنی بودجەی گشتی، ئاوەدانکردنەوە و گەشەپێدانی بەردەوام.',
  createBgt: '| نووسینی ڕەشنووسی یاسای بودجە',
  namePlEn: '| ناوی بودجە (بە ئینگلیزی)',
  namePlAr: '| ناوی بودجە (بە عەرەبی)',
  namePlKu: '| ناوی بودجە (بە کوردی)',
  allocated: '| ڕێژەی بودجەی گشتی (ملیۆن دۆلار)',
  jurisdiction: '| دەسەڵاتی دادوەری نیشتمانی',
  submitBtn: '| سەردانیکردن بۆ پەرلەمان',
  totalAlloc: '| سەرجەم بودجەی تەرخانکراو',
  lifecycleHeader: '| قۆناغەکانی یاسایی و وەرگرتنی واژۆ',
  promote: '| بەرەو پێش بردن',
  demote: '| گەڕاندنەوە بۆ چاکسازی',
  social: '| چاودێری کۆمەڵایەتی و خانەنشینی',
  security: '| ئاسایش و پاراستنی نیشتمانی',
  development: '| پڕۆژەکانی بنیاتنانی ژێرخان',
  operating: '| تێچووی بەڕێوەبردنی فەرمانگەکان',
  estRevenue: '| هێڵکاری پێشبینی داهاتەکان',
  estOil: '| داهاتەکانی فرۆشتنی نەوت',
  estNonOil: '| باج و داهاتە ناوخۆییەکان',
  unifiedWarning: '| ئاگاداری یەکگرتنەوەی فیدراڵ: سەرجەم بودجەکانی هەرێم و فیدراڵ پاڵپشت بە سندوقی نیشتمانی دابەشکراون.'
}
  }[lang];

  return (
    <div id="ssos-budget-command-center" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Top Banner Header card */}
      <Card className="bg-[#0b1329]/95 border-amber-900/40 p-6 rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-950/80 border border-amber-900 rounded-lg text-amber-500">
            <Landmark className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              {t.budgetCenter}
              <Badge variant="gold">SSOS_FISCAL_V3</Badge>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
          </div>
        </div>
        
        {ssosMode !== 'UNIFIED' && (
          <Button variant="sky" className="text-xs shrink-0 flex items-center gap-1.5" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-3.5 h-3.5" />
            {t.createBgt}
          </Button>
        )}
      </Card>

      {ssosMode === 'UNIFIED' && (
        <Card className="bg-emerald-950/20 border-emerald-900/60 p-4 shrink-0 font-medium text-emerald-400 text-xs">
          {t.unifiedWarning}
        </Card>
      )}

      {/* Grid: Forms & List side vs core dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: selection & Add Form */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {showAddForm && (
            <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl">
              <h3 className="text-xs font-mono text-[#E0A96D] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Layers2 className="w-4 h-4" />
                {t.createBgt}
              </h3>

              <form onSubmit={handleCreate} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-400">{t.namePlEn}</label>
                  <input
                    type="text"
                    required
                    value={newBgtNameEn}
                    onChange={e => setNewBgtNameEn(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="E.g. General Budget 2026"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-400">{t.namePlAr}</label>
                  <input
                    type="text"
                    value={newBgtNameAr}
                    onChange={e => setNewBgtNameAr(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="مرسوم الموازنة ٢٠٢٦"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-400">{t.namePlKu}</label>
                  <input
                    type="text"
                    value={newBgtNameKu}
                    onChange={e => setNewBgtNameKu(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="یاسای بودجەی ٢٠٢٦"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-400">{t.allocated}</label>
                  <input
                    type="number"
                    required
                    value={newBgtAllocated}
                    onChange={e => setNewBgtAllocated(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-400">{t.jurisdiction}</label>
                  <select
                    value={newBgtJurisdiction}
                    onChange={e => setNewBgtJurisdiction(e.target.value as any)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="federal">FEDERAL_IRAQ</option>
                    <option value="krg">KURDISTAN_REGION</option>
                    <option value="joint">JOINT_OPERATIONS</option>
                  </select>
                </div>

                <Button type="submit" variant="emerald" className="mt-2 w-full text-xs">
                  {t.submitBtn}
                </Button>
              </form>
            </Card>
          )}

          <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-2.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Active Legislative Proposals</span>
            {budgets.map((bgt, index) => {
              const bgtJuris = bgt.jurisdiction;
              return (
                <button
                  key={bgt.id}
                  onClick={() => setSelectedBudgetIdx(index)}
                  className={`p-3 rounded-lg border text-start transition flex flex-col cursor-pointer ${
                    activeBudget?.id === bgt.id
                      ? 'bg-amber-950/40 border-amber-600/70 shadow-[0_0_12px_rgba(224,169,109,0.1)]'
                      : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] font-mono text-slate-400 select-all uppercase">
                      {bgt.jurisdiction.toUpperCase()} • ID: {bgt.id}
                    </span>
                    <Badge variant={bgt.status === 'Execution' ? 'teal' : bgt.status === 'Closed' ? 'neutral' : 'gold'}>
                      {bgt.status}
                    </Badge>
                  </div>
                  <div className="text-xs font-bold text-slate-200 mt-1 lines-clamp-1">
                    {bgt.name[lang] || bgt.name.en}
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>Year: 2026</span>
                    <span className="text-amber-500">${bgt.totalAllocated.toLocaleString()}M USD</span>
                  </div>
                </button>
              );
            })}
          </Card>
        </div>

        {/* Right Side: core budget dashboard details */}
        {activeBudget && (
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/95 border-slate-900 p-6 rounded-xl flex flex-col gap-6">
              
              {/* Core numbers */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-900 pb-4 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-500 uppercase">Awaiting Sovereign Consent</span>
                  <h3 className="text-[#E0A96D] text-lg font-bold">{activeBudget.name[lang] || activeBudget.name.en}</h3>
                </div>
                <div className="text-start md:text-end">
                  <span className="text-[9px] font-mono text-slate-500 block uppercase">{t.totalAlloc}</span>
                  <span className="text-2xl font-bold font-mono text-slate-100">${activeBudget.totalAllocated.toLocaleString()}M USD</span>
                </div>
              </div>

              {/* Lifecycle stepper */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-500" />
                  {t.lifecycleHeader}
                </span>

                <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                  {lifecycles.map((stg, i) => {
                    const isPassed = i < currentIdx;
                    const isCurrent = i === currentIdx;
                    return (
                      <div
                        key={stg}
                        className={`p-2 rounded text-center border text-[9px] font-bold font-mono flex flex-col gap-1 items-center justify-center ${
                          isCurrent
                            ? 'bg-amber-950/80 border-amber-600/60 text-amber-300'
                            : isPassed
                            ? 'bg-emerald-950/30 border-emerald-950 text-emerald-500'
                            : 'bg-slate-900/20 border-slate-950/60 text-slate-600'
                        }`}
                      >
                        <span>STAGE {i + 1}</span>
                        <span className="uppercase text-[8px] truncate max-w-full text-slate-300" title={stg}>
                          {stg.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 mt-1.5">
                  <button
                    disabled={currentIdx === 0}
                    onClick={demoteStatus}
                    className="px-3 py-1 bg-slate-900 border border-slate-800 text-xs text-slate-400 rounded hover:bg-slate-800 hover:text-slate-200 transition font-sans cursor-pointer disabled:opacity-40"
                  >
                    {t.demote}
                  </button>
                  <button
                    disabled={currentIdx === lifecycles.length - 1}
                    onClick={promoteStatus}
                    className="px-3 py-1 bg-amber-950 border border-amber-800 text-xs text-amber-400 rounded hover:bg-amber-900 hover:text-amber-200 transition font-sans cursor-pointer disabled:opacity-40"
                  >
                    {t.promote}
                  </button>
                </div>
              </div>

              {/* Expenditure Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#E0A96D]" />
                    Budget Distribution Metrics
                  </span>

                  <div className="flex flex-col gap-3">
                    {[
                      { label: t.social, val: activeBudget.expenditureSocial, color: 'bg-[#C23B22]' },
                      { label: t.security, val: activeBudget.expenditureSecurity, color: 'bg-amber-500' },
                      { label: t.development, val: activeBudget.expenditureDevelopment, color: 'bg-sky-500' },
                      { label: t.operating, val: activeBudget.expenditureOperating, color: 'bg-purple-500' },
                    ].map(exp => {
                      const sharePct = Math.round((exp.val / activeBudget.totalAllocated) * 100) || 25;
                      return (
                        <div key={exp.label} className="bg-slate-900/40 p-3 rounded border border-slate-900">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-300 font-medium">{exp.label}</span>
                            <span className="font-mono text-slate-200 font-bold">${exp.val.toLocaleString()}M ({sharePct}%)</span>
                          </div>
                          <div className="w-full bg-slate-950 h-1.5 mt-2 rounded-full overflow-hidden">
                            <div className={`h-full ${exp.color}`} style={{ width: `${sharePct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    {t.estRevenue}
                  </span>

                  <div className="flex flex-col gap-4 h-full justify-center bg-slate-900/20 p-4 border border-slate-900 rounded-lg">
                    <div className="flex flex-col gap-1 text-center py-4">
                      <span className="text-[10px] text-slate-500 font-mono">TOTAL ESTIMATED INCOME TARGET</span>
                      <strong className="text-2xl font-mono text-emerald-400 font-extrabold">
                        ${(activeBudget.revenueEstOil + activeBudget.revenueEstNonOil).toLocaleString()}M USD
                      </strong>
                    </div>

                    <div className="flex flex-col gap-3.5 mt-2">
                      <div className="flex justify-between text-xs items-center border-b border-slate-900 pb-2">
                        <span className="text-slate-400">{t.estOil}</span>
                        <span className="font-mono text-slate-200 font-bold">${activeBudget.revenueEstOil.toLocaleString()}M USD</span>
                      </div>
                      <div className="flex justify-between text-xs items-center pb-1">
                        <span className="text-slate-400">{t.estNonOil}</span>
                        <span className="font-mono text-slate-200 font-bold">${activeBudget.revenueEstNonOil.toLocaleString()}M USD</span>
                      </div>
                    </div>
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
export default NationalBudgetCommandCenter;
