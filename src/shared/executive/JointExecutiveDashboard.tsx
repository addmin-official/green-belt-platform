import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { JOINT_KPI_REGISTRY } from '../../shared/executive/ExecutiveKPIRegistry';
import { Card, Badge, Button } from '../../ui';
import { 
  Landmark, Network, ShieldAlert, Cpu, Coins, TrendingUp, AlertTriangle, 
  CheckCircle2, FileText, Lock, RefreshCw, Send, Database, Shield
} from 'lucide-react';
import JointCustomsDashboard from '../customs/JointCustomsDashboard';
import JointTradeDashboard from '../../shared/trade/JointTradeDashboard';
import JointIntegrityDashboard from '../transparency/JointIntegrityDashboard';
import SovereignGovernanceSection from '../../shared/components/SovereignGovernanceSection';
import JointNationalSecurityDashboard from '../intelligence/JointNationalSecurityDashboard';
import { Users } from 'lucide-react';

export default function JointExecutiveDashboard() {
  const { userRole, logAction, auditTrail } = useGovernment();
  const { locale: lang } = useI18n();

  // Valid authorities for Joint Dashboard
  const authorizedRoles = [
    'Joint Coordination Council',
    'Joint Revenue Board',
    'Joint Border Committee',
    'Joint Trade Committee',
    'Joint Crisis Coordinator', // Existing role
    'Border Arbitrator', // Existing role
    'Federation Integration Director' // Existing role
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  const [activeDomainTab, setActiveDomainTab] = useState('joint-recon');
  const [ticker, setTicker] = useState(0);

  // Simulated actions for the dashboard
  const [simulatedLoad, setSimulatedLoad] = useState(false);
  const [decreeTitle, setDecreeTitle] = useState('');
  const [decreeContent, setDecreeContent] = useState('');

  const handleApplyBiDirectionalSync = () => {
    setSimulatedLoad(true);
    setTimeout(() => {
      setSimulatedLoad(false);
      logAction(
        userRole, 
        `هاوتاسازیی گشتی دوولایەنە (Bi-directional Sync) بە تەواوی جێبەجێکرا لە نێوان تۆمارەکانی گومرگی بەغدا و هەولێر بە ڕێژەی هاوتایی 99.98%.`, 
        'JOINT_FEDERATED_RECON_SUCCESS'
      );
    }, 850);
  };

  const handleSendDecree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decreeTitle.trim()) return;
    logAction(
      userRole, 
      `بڕیارنامەی هاوبەش بڵاوکرایەوە: ${decreeTitle} - مەرجەکان: ${decreeContent || 'بەبێ لێدوان'}`, 
      'JOINT_COMMITTEE_RESOLUTION_PUBLISHED'
    );
    setDecreeTitle('');
    setDecreeContent('');
  };

  if (!isAuthorized) {
    return (
      <Card className="border border-rose-950 bg-rose-950/20 p-8 rounded-xl text-start">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-950 border border-rose-900 rounded-lg text-rose-400 font-bold shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-300 font-sans">ڕەتکردنەوەی دەستگەیشتن (Access Prohibited)</h3>
            <p className="text-sm text-rose-400/90 mt-2 leading-relaxed">
              ناوەندی هاوئاهەنگی نیشتمانی فیدراڵ-هەرێم: ڕۆڵی چاودێری <b>[{userRole}]</b> مۆڵەتی پێویستی نییە بۆ دۆزینەوە و بەشداریکردن لە دیوانی باڵای ئەنجومەنی جێبەجێکردنی هاوبەش. ئەم دەمارەی تێپەڕبوونە چاودێری کرا و مۆرکرا لە تۆماری پاراستنی نیشتمانیدا.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-rose-950/50 text-xs font-mono text-slate-400">
              JURISDICTION_ENFORCEMENT: joint_interoperability • STATUS: BLOCKED_RBAC
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const selectedDomain = JOINT_KPI_REGISTRY.find(d => d.domainId === activeDomainTab) || JOINT_KPI_REGISTRY[0];

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Prime Cabinet Header */}
      <Card className="bg-[#0b1329]/95 border-amber-900/40 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-950 border border-amber-800 rounded-lg text-amber-400 shrink-0">
              <Network className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-sans font-bold text-slate-100 tracking-tight flex items-center gap-2">
                ئەنجومەنی فەرماندەیی و هەماهەنگی هاوبەشی فیدراڵ - KRG
                <Badge variant="gold">هاوئاهەنگی نیشتمانی</Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                ناوەندی هاوبەشی لێژنە جێبەجێکارەکان لە نێوان بەغداد و هەولێر – هاوتاکردنی داهات، چاودێری ڕێگا بازرگانییەکان، و پشکنینی هاوتایی بەستراو بەبێ دزەکردنی زانیاری سەروەری.
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyBiDirectionalSync}
            disabled={simulatedLoad}
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-slate-900 text-xs font-bold font-sans tracking-wide transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {simulatedLoad ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
            سەرلەنوێ هاوتاکردنی سەرانسەریی داتا مۆرییەکان
          </button>
        </div>
      </Card>

      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-950/60 p-1 rounded-xl border border-slate-900">
        {JOINT_KPI_REGISTRY.map(domain => {
          const isActive = activeDomainTab === domain.domainId;
          return (
            <button
              key={domain.domainId}
              onClick={() => setActiveDomainTab(domain.domainId)}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                isActive 
                  ? 'bg-amber-950/70 text-amber-400 border border-amber-500/20 shadow font-bold' 
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              {domain.domainId === 'joint-recon' && <Shield className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'joint-rev' && <Coins className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'joint-border' && <Cpu className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'joint-trade' && <TrendingUp className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'joint-audit' && <FileText className="w-3.5 h-3.5 shrink-0" />}
              <span>{domain.domainNameKu}</span>
            </button>
          );
        })}
        <button
          onClick={() => setActiveDomainTab('joint-governance')}
          className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
            activeDomainTab === 'joint-governance'
              ? 'bg-amber-950/70 text-amber-400 border border-amber-500/20 shadow font-bold'
              : 'text-slate-400 hover:text-white border-transparent'
          }`}
        >
          <Users className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span>هێزی کار و دەسەڵاتەکان (Workforce)</span>
        </button>
        <button
          onClick={() => setActiveDomainTab('joint-intelligence')}
          className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
            activeDomainTab === 'joint-intelligence'
              ? 'bg-[#1b264f] text-teal-400 border border-teal-500/20 shadow font-bold'
              : 'text-slate-400 hover:text-white border-transparent'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-teal-400" />
          <span>هەواڵگری و دەروازە نەبیراوەکان (Security)</span>
        </button>
      </div>

      {/* Main Stats Display Grid */}
      {activeDomainTab === 'joint-recon' ? (
        <div className="w-full">
          <JointCustomsDashboard />
        </div>
      ) : activeDomainTab === 'joint-trade' ? (
        <div className="w-full">
          <JointTradeDashboard />
        </div>
      ) : activeDomainTab === 'joint-audit' ? (
        <div className="w-full">
          <JointIntegrityDashboard />
        </div>
      ) : activeDomainTab === 'joint-governance' ? (
        <div className="w-full animate-fade-in">
          <SovereignGovernanceSection governingOrg="JOINT_OPERATIONS" />
        </div>
      ) : activeDomainTab === 'joint-intelligence' ? (
        <div className="w-full">
          <JointNationalSecurityDashboard />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* KPIs display column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                تۆماری یەکگرتووی نیشاندەرە گشتییەکان - ڕێژەکانی {selectedDomain.domainNameKu}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedDomain.kpis.map(kpi => (
                  <div key={kpi.id} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono font-bold uppercase">{kpi.nameKu}</span>
                      <span className="text-lg font-bold text-white font-mono block mt-1.5">{kpi.value}</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="text-slate-500 uppercase">مەودای فیدراسیۆن</span>
                      <span className="text-emerald-400">{kpi.changeRate || 'سەقامگیر'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Joint Recent Signed Actions */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                تۆماری ئۆپەراسیۆنە فەرمییەکان (Audit Trail Log)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-2.5 text-start">کاتی ڕێکەوت</th>
                      <th className="p-2.5 text-start">جێبەجێکاری لێژنە</th>
                      <th className="p-2.5 text-start">تۆماری دەستکەوتەکان</th>
                      <th className="p-2.5 text-center">پرۆتۆکۆڵ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono">
                    {auditTrail
                      .filter(log => log.jurisdiction === 'joint')
                      .slice(0, 5)
                      .map(log => (
                        <tr key={log.id} className="hover:bg-slate-900/20 text-[11px]">
                          <td className="p-2.5 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                          <td className="p-2.5 text-amber-500 font-bold">{log.actor}</td>
                          <td className="p-2.5 text-slate-300 font-sans">{log.details}</td>
                          <td className="p-2.5 text-center">
                            <Badge variant="gold">{log.policyContext}</Badge>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Executive Directives Form */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                داڕشتنی ڕێساکانی هاوبەش و واژۆکردنی هاوچەرخ
              </h3>

              <form onSubmit={handleSendDecree} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">لێژنەی دەرکەر</label>
                  <input
                    type="text"
                    required
                    placeholder="بۆ نموونە: بڕیارنامەی هاوبەشی دەورەیی-٢٠٢٦"
                    value={decreeTitle}
                    onChange={(e) => setDecreeTitle(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">بەرداشتی نیشتمانی / مەرجەکان</label>
                  <textarea
                    rows={3}
                    placeholder="هاوتاسازکردنی کۆبونەوەکانی مانیفێست بە شێوەیەکی هێمن..."
                    value={decreeContent}
                    onChange={(e) => setDecreeContent(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-slate-900 text-xs font-bold font-sans transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  پەسەندکردنی پرۆتۆکۆلی هاوبەش
                </button>
              </form>
            </Card>

            {/* Designate Council Authority Info */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">لێژنە هاوبەشە چالاکەکان</h4>
              <div className="space-y-2 mt-3 text-xs leading-relaxed text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  <span className="text-slate-200">ئەنجومەنی هەماهەنگی فیدراڵ-هەرێم</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  <span className="text-slate-200">لێژنەی باکووری سنووری هاوبەش</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  <span className="text-slate-200">ئەنجومەنی گشتی چاکسازی و دابەشکردنی داهات</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  <span className="text-slate-200">لێژنەی نووسینی بڕوانامەکان و مانیفێست</span>
                </div>
              </div>
            </Card>

          </div>

        </div>
      )}

    </div>
  );
}
