import React, { useState } from 'react';
import { useSsos } from '../../../providers/SsosProvider';
import { Card, Badge, Button } from '../../../ui';
import { 
  Briefcase, 
  Settings, 
  CheckCircle, 
  Boxes, 
  MapPin, 
  Activity, 
  Compass, 
  Plus, 
  Lock, 
  DollarSign, 
  Wrench,
  Wand2
} from 'lucide-react';

interface NationalProjectsPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const NationalProjectsRegistryPanel: React.FC<NationalProjectsPanelProps> = ({ lang }) => {
  const { projects, ssosMode, addProject, updateProjectLifecycle, fundProject } = useSsos();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('PRJ-STR-01');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form states
  const [newNameEn, setNewNameEn] = useState('');
  const [newNameAr, setNewNameAr] = useState('');
  const [newNameKu, setNewNameKu] = useState('');
  const [newCat, setNewCat] = useState<'Strategic' | 'Infrastructure' | 'Digital' | 'Transportation' | 'Energy'>('Strategic');
  const [newBudget, setNewBudget] = useState('500');
  const [newMinistry, setNewMinistry] = useState('');
  const [newJurisdiction, setNewJurisdiction] = useState<'federal' | 'krg' | 'joint'>('federal');

  // Audit slider states
  const [auditPercent, setAuditPercent] = useState<number>(30);
  const [auditScore, setAuditScore] = useState<number>(85);
  const [fundAmount, setFundAmount] = useState<string>(50);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const lifecycles: ('Planning' | 'Funding' | 'Procurement' | 'Execution' | 'Inspection' | 'Completed')[] = [
    'Planning', 'Funding', 'Procurement', 'Execution', 'Inspection', 'Completed'
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNameEn || !newBudget) return;

    addProject({
      id: `PRJ-STR-${Date.now().toString().slice(-4)}`,
      name: {
        en: newNameEn,
        ar: newNameAr || newNameEn,
        ku: newNameKu || newNameEn
      },
      category: newCat,
      jurisdiction: newJurisdiction,
      totalBudget: parseInt(newBudget) || 100,
      fundedAmount: 0,
      spentAmount: 0,
      leadMinistry: newMinistry || 'Ministry of Planning',
      lifecycle: 'Planning',
      completionPercentage: 0,
      performanceScore: 100
    });

    setShowAddForm(false);
    setNewNameEn('');
    setNewNameAr('');
    setNewNameKu('');
  };

  const handleUpdateAudit = (status: typeof lifecycles[number]) => {
    if (!selectedProjectId) return;
    updateProjectLifecycle(selectedProjectId, status, auditPercent, auditScore);
  };

  const handleFund = () => {
    if (!selectedProjectId) return;
    const value = parseInt(fundAmount.toString());
    fundProject(selectedProjectId, value || 10);
  };

  const t = {
    en: {
      header: 'National Infrastructure & Strategic Projects',
      sub: 'Multi-jurisdictional register for tracking strategic infrastructure pipelines, investments and engineering logs.',
      createProject: 'Register Strategic Project',
      pNameEn: 'Project Title (English)',
      pNameAr: 'Project Title (Arabic)',
      pNameKu: 'Project Title (Kurdish)',
      category: 'Strategic Sector',
      budget: 'Total Capital Budget ($M USD)',
      leadMinistry: 'Lead Administrative Authority',
      jurisdiction: 'Target Jurisdiction Scope',
      addBtn: 'Submit Capital Program',
      fundingState: 'Financial Funding Status',
      stages: 'Execution Lifecycle State',
      auditTitle: 'Audit Inspector Controls',
      percent: 'Completion Progress Index',
      score: 'Quality & Safety Rating',
      forceState: 'Transition to Stage',
      fundBtn: 'Disburse Capital Tranche',
      spent: 'Accrued Spent Expenditures',
      funded: 'Capital Funds Disbursed'
    },
    ar: {
      header: 'السجل السيادي الموحد للمشروعات والمبادرات الكبرى',
      sub: 'تتبع المشروعات الإستراتيجية وخطط التطوير والاعتمادات المالية والتدقيق المالي للمشروعات الفيدرالية والإقليمية.',
      createProject: 'تسجيل مشروع إستراتيجي وطني جديد',
      pNameEn: 'اسم المشروع (قانوني إنجليزي)',
      pNameAr: 'اسم المشروع (قانوني عربي)',
      pNameKu: 'اسم المشروع (قانوني كوردستاني)',
      category: 'القطاع الإنمائي والإستراتيجي',
      budget: 'مخصص الموازنة الرأسمالية المرصود (مليون دولار)',
      leadMinistry: 'الوزارة أو السلطة المشرفة',
      jurisdiction: 'نطاق السيادة والتمويل',
      addBtn: 'تسجيل وإدراج البرنامج الوطني',
      fundingState: 'محصلة التغطية والتمويل المالي',
      stages: 'المرحلة التشريعية والعملياتية الحالية',
      auditTitle: 'لوحة التحكم والتدقيق الفني والإداري',
      percent: 'معدل التقدم الفعلي والإنجاز الميداني',
      score: 'مؤشر الجودة والسلامة الانشائية والأداء',
      forceState: 'تحديث حالة المشروع إلى',
      fundBtn: 'تحويل دفعة مالية رأسمالية للمشروع',
      spent: 'النفقات والمصاريف الميدانية المسجلة',
      funded: 'إجمالي المخصص المصروف والممول حياً'
    },
    ku: {
  header: '| تۆماری گشتی پڕۆژە نیشتمانی و ستراتیژییەکان',
  sub: '| تۆماری سەرجەم پڕۆژەکانی بوارەکانی وزە، ژێرخان، دیجیتاڵی، پیشەسازی و گواستنەوە.',
  createProject: '| تۆمارکردنی پڕۆژەیەکی نوێی دەوڵەت',
  pNameEn: '| ناونیشانی پڕۆژە (بە ئینگلیزی)',
  pNameAr: '| ناونیشانی پڕۆژە (بە عەرەبی)',
  pNameKu: '| ناونیشانی پڕۆژە (بە کوردی)',
  category: '| بواری سەرەکی پڕۆژە',
  budget: '| کۆی بودجەی تەرخانکراو (ملیۆن دۆلار)',
  leadMinistry: '| وەزارەتی سەرپەرشتیار',
  jurisdiction: '| دەسەڵاتی جێبەجێکردن',
  addBtn: '| سەبت کردنی پڕۆژە ستراتیژییەکە',
  fundingState: '| سەرچاوەی دابینکردنی دارایی',
  stages: '| قۆناغی ئێستای جێبەجێکردن',
  auditTitle: '| لوحەی چاودێریکردن و دەستکاری بەڕێوەبردن',
  percent: '| ڕێژەی پێشکەوتنی پڕۆژە لەسەر زەوی',
  score: '| پلەی سەلامەتی و توانای جێبەجێکردن',
  forceState: '| گۆڕینی قۆناغ بۆ',
  fundBtn: '| تەرخانکردنی بڕە پارەی تری دارایی',
  spent: '| کۆی خەرجییەکان تا ئێستا',
  funded: '| کۆی پارەی تەرخانکراو تا ئێستا'
}
  }[lang];

  return (
    <div id="national-projects-command" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Header bar */}
      <Card className="bg-[#0b1329]/95 border-emerald-900/40 p-6 rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-950/80 border border-emerald-900 rounded-lg text-emerald-400">
            <Boxes className="w-6 h-6 animate-pulse shrink-0" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              {t.header}
              <Badge variant="teal">NATIONAL_PROJECTS</Badge>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.sub}</p>
          </div>
        </div>
        <Button variant="emerald" className="text-xs shrink-0 flex items-center gap-1.5" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-3.5 h-3.5" />
          {t.createProject}
        </Button>
      </Card>

      {/* Main Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Add form & dynamic lists */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {showAddForm && (
            <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-3 shadow-inner">
              <h3 className="text-xs font-mono text-[#E0A96D] uppercase tracking-widest">{t.createProject}</h3>
              <form onSubmit={handleCreateProject} className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.pNameEn}</label>
                  <input
                    type="text"
                    required
                    value={newNameEn}
                    onChange={e => setNewNameEn(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="E.g. Basra Subway Line"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.pNameAr}</label>
                  <input
                    type="text"
                    value={newNameAr}
                    onChange={e => setNewNameAr(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="مشروع مترو البصرة"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.pNameKu}</label>
                  <input
                    type="text"
                    value={newNameKu}
                    onChange={e => setNewNameKu(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="پڕۆژەی میترۆی بەسرە"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono">{t.category}</label>
                    <select
                      value={newCat}
                      onChange={e => setNewCat(e.target.value as any)}
                      className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    >
                      <option value="Strategic">Strategic</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Digital">Digital</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Energy">Energy</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono">{t.budget}</label>
                    <input
                      type="number"
                      value={newBudget}
                      onChange={e => setNewBudget(e.target.value)}
                      className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.leadMinistry}</label>
                  <input
                    type="text"
                    required
                    value={newMinistry}
                    onChange={e => setNewMinistry(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="Federal Ministry of Housing"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.jurisdiction}</label>
                  <select
                    value={newJurisdiction}
                    onChange={e => setNewJurisdiction(e.target.value as any)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="federal">FEDERAL_IRAQ</option>
                    <option value="krg">KURDISTAN_REGION</option>
                    <option value="joint">JOINT_OPERATIONS</option>
                  </select>
                </div>

                <Button type="submit" variant="emerald" className="w-full text-xs mt-1.5">
                  {t.addBtn}
                </Button>
              </form>
            </Card>
          )}

          <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Strategic Development Ledger Rows</span>
            <div className="flex flex-col gap-2.5">
              {projects.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setAuditPercent(p.completionPercentage);
                    setAuditScore(p.performanceScore);
                  }}
                  className={`p-3 rounded-lg border text-start transition flex flex-col gap-1.5 cursor-pointer ${
                    selectedProjectId === p.id
                      ? 'bg-amber-950/40 border-amber-600/70 shadow'
                      : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">
                      ID: {p.id} • {p.jurisdiction.toUpperCase()}
                    </span>
                    <Badge variant={p.lifecycle === 'Completed' ? 'teal' : p.lifecycle === 'Planning' ? 'neutral' : 'gold'}>
                      {p.lifecycle}
                    </Badge>
                  </div>
                  <strong className="text-xs font-bold text-slate-200 lines-clamp-1">{p.name[lang] || p.name.en}</strong>
                  
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-1 pb-1">
                    <span>{p.category}</span>
                    <span className="text-amber-500 font-bold">${p.totalBudget.toLocaleString()}M</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column: Capital expenditure auditing and tracking */}
        {selectedProject && (
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/95 border-slate-900 p-6 rounded-xl flex flex-col gap-6">
              
              {/* Project Title Block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-4">
                <div>
                  <Badge variant={selectedProject.jurisdiction === 'federal' ? 'teal' : selectedProject.jurisdiction === 'krg' ? 'emerald' : 'gold'}>
                    {selectedProject.jurisdiction.toUpperCase()} SCOPE • {selectedProject.category.toUpperCase()}
                  </Badge>
                  <h3 className="text-base font-bold text-slate-100 mt-1">{selectedProject.name[lang] || selectedProject.name.en}</h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Lead: {selectedProject.leadMinistry}</span>
                </div>

                <div className="text-start sm:text-end bg-slate-1000 p-2.5 rounded border border-slate-910 bg-slate-950">
                  <span className="text-[9px] text-slate-500 font-mono block uppercase">COMMITTED FUND ALLOCATION</span>
                  <strong className="text-lg font-mono text-amber-500 font-extrabold">
                    ${selectedProject.totalBudget.toLocaleString()}M USD
                  </strong>
                </div>
              </div>

              {/* Progress bars & Capital indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                
                {/* Financial Status */}
                <div className="flex flex-col gap-3 bg-slate-900/30 p-4 border border-slate-900 rounded-lg">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">{t.fundingState}</span>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">{t.funded}</span>
                      <strong className="text-slate-200 font-bold">${selectedProject.fundedAmount}M</strong>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${Math.round((selectedProject.fundedAmount / selectedProject.totalBudget) * 100) || 0}%` }} />
                    </div>

                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">{t.spent}</span>
                      <strong className="text-slate-200 font-bold">${selectedProject.spentAmount}M</strong>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: `${Math.round((selectedProject.spentAmount / (selectedProject.fundedAmount || 1)) * 100) || 0}%` }} />
                    </div>
                  </div>
                </div>

                {/* Progress parameters */}
                <div className="flex flex-col gap-3 bg-slate-900/30 p-4 border border-slate-900 rounded-lg">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">{t.stages}</span>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-mono border-b border-slate-900 pb-1.5">
                      <span className="text-slate-400">Completion Percent</span>
                      <strong className="text-emerald-400 font-bold">{selectedProject.completionPercentage}%</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono pt-0.5">
                      <span className="text-slate-400">Safety & Engineering Index</span>
                      <strong className="text-[#E0A96D] font-bold">{selectedProject.performanceScore}%</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Inspector Controls / Update forms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900">
                
                {/* Audit Slider updates */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#E0A96D]" />
                    {t.auditTitle}
                  </span>

                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">{t.percent}</span>
                        <strong className="text-emerald-400 font-bold">{auditPercent}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={auditPercent}
                        onChange={e => setAuditPercent(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 h-1 cursor-pointer bg-slate-950 rounded appearance-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">{t.score}</span>
                        <strong className="text-amber-500 font-bold">{auditScore}%</strong>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={auditScore}
                        onChange={e => setAuditScore(parseInt(e.target.value))}
                        className="w-full accent-amber-500 h-1 cursor-pointer bg-slate-950 rounded appearance-none"
                      />
                    </div>

                    {/* Step direct buttons */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-slate-500 font-mono uppercase">{t.forceState}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {lifecycles.map(stg => (
                          <button
                            key={stg}
                            onClick={() => handleUpdateAudit(stg)}
                            className={`p-1 px-2.2 rounded border text-[9px] font-bold font-mono transition cursor-pointer hover:bg-slate-800 ${
                              selectedProject.lifecycle === stg
                                ? 'bg-amber-950 border-amber-600/70 text-amber-300'
                                : 'bg-slate-950 border-slate-900 text-slate-400'
                            }`}
                          >
                            {stg.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Capital disbursement panel */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Capital Allocation Desk
                  </span>

                  <div className="flex flex-col gap-3.5 bg-slate-900/20 p-4 border border-slate-900 rounded-lg h-full justify-center">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-slate-400 uppercase font-mono">Disbursement Amount ($M USD)</label>
                      <input
                        type="number"
                        value={fundAmount}
                        onChange={e => setFundAmount(e.target.value)}
                        className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                      />
                    </div>

                    <Button variant="emerald" className="text-xs shrink-0 flex items-center gap-1.5 justify-center" onClick={handleFund}>
                      <Wrench className="w-3.5 h-3.5" />
                      {t.fundBtn}
                    </Button>
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
export default NationalProjectsRegistryPanel;
