import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { FEDERAL_KPI_REGISTRY } from '../../shared/executive/ExecutiveKPIRegistry';
import { Card, Badge, Button } from '../../ui';
import { 
  Landmark, Shield, ShieldAlert, Cpu, Coins, TrendingUp, AlertTriangle, 
  CheckCircle2, FileText, Lock, RefreshCw, Send, Database, Users 
} from 'lucide-react';
import FederalCustomsDashboard from '../customs/FederalCustomsDashboard';
import FederalTradeDashboard from '../trade/FederalTradeDashboard';
import FederalTransparencyDashboard from '../transparency/FederalTransparencyDashboard';
import SovereignGovernanceSection from '../../shared/components/SovereignGovernanceSection';
import FederalIntelligenceDashboard from '../intelligence/FederalIntelligenceDashboard';

export default function FederalPrimeMinisterDashboard() {
  const { userRole, logAction, auditTrail } = useGovernment();
  const { locale: lang } = useI18n();

  // Valid authorities for Federal Dashboard
  const authorizedRoles = [
    'Federal Prime Minister',
    'Federal Cabinet',
    'Federal Border Authority',
    'Federal Customs Authority',
    'Federal Revenue Authority',
    'Federal Trade Authority'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  const [activeDomainTab, setActiveDomainTab] = useState('fed-border');
  const [ticker, setTicker] = useState(0);

  // Simulated actions for the dashboard
  const [simulatedLoad, setSimulatedLoad] = useState(false);
  const [decreeTitle, setDecreeTitle] = useState('');
  const [decreeContent, setDecreeContent] = useState('');

  const handleApplySovereignSeal = () => {
    setSimulatedLoad(true);
    setTimeout(() => {
      setSimulatedLoad(false);
      logAction(
        userRole, 
        `مۆری ئەلیکترۆنی دەوڵەتی (Sovereign Seal) سەرکەوتووانە جێبەجێکرا لەسەر کۆی تۆمارە دارایی و گومرگییەکانی فیدراڵ.`, 
        'FEDERAL_DECISION_PROTOCOL'
      );
    }, 800);
  };

  const handleSendDecree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decreeTitle.trim()) return;
    logAction(
      userRole, 
      `بڕیاری فەرمی نوێ دەرچوو: ${decreeTitle} - وەسف: ${decreeContent || 'بەبێ لێدوان'}`, 
      'FEDERAL_DECREE_PUBLISHED'
    );
    setDecreeTitle('');
    setDecreeContent('');
  };

  if (!isAuthorized) {
    return (
      <Card className="border border-rose-950 bg-rose-950/20 p-8 rounded-xl text-start">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-950 border border-rose-900 rounded-lg text-rose-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-300 font-sans">ڕەتکردنەوەی دەستگەیشتن (Access Prohibited)</h3>
            <p className="text-sm text-rose-400/90 mt-2 leading-relaxed">
              تۆماری ئاسایشی نیشتمانی فیدراڵ: ڕۆڵی چالاک <b>[{userRole}]</b> مۆڵەتی پێویستی نییە بۆ بینینی سەنتەری بڕیاردانی بەڕێوەبەرایەتی سەرۆک وەزیرانی فیدراڵ. ئەم چالاکییە تۆمارکرا لە مێژووی وردبینی دەوڵەتدا.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-rose-950/50 text-xs font-mono text-slate-400">
              JURISDICTION_ENFORCEMENT: federal_control • STATUS: BLOCKED_RBAC
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const selectedDomain = FEDERAL_KPI_REGISTRY.find(d => d.domainId === activeDomainTab) || FEDERAL_KPI_REGISTRY[0];

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Prime Cabinet Header */}
      <Card className="bg-[#0b1329]/95 border-teal-900/40 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-950 border border-teal-800 rounded-lg text-teal-400 shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-sans font-bold text-slate-100 tracking-tight flex items-center gap-2">
                سەنتەری سەرۆکایەتی و ئۆپەراسیۆنەکانی سەرۆک وەزیرانی فیدراڵ
                <Badge variant="teal">ڕێسای سەروەری</Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                پۆرتاڵی باڵای جێبەجێکردنی ئەنجومەنی وەزیرانی کۆماری عێراق – چاودێریکردنی ئاستی پابەندبوون، داهاتی تاریفەکان و ڕێگری لە قاچاخچێتی دارایی.
              </p>
            </div>
          </div>

          <button
            onClick={handleApplySovereignSeal}
            disabled={simulatedLoad}
            className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-slate-900 text-xs font-bold font-sans tracking-wide transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {simulatedLoad ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
            مۆرکردنی گشتیی داتا مینیفاستەکان
          </button>
        </div>
      </Card>

      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-950/60 p-1 rounded-xl border border-slate-900">
        {FEDERAL_KPI_REGISTRY.map(domain => {
          const isActive = activeDomainTab === domain.domainId;
          return (
            <button
              key={domain.domainId}
              onClick={() => setActiveDomainTab(domain.domainId)}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                isActive 
                  ? 'bg-teal-950/70 text-teal-400 border border-teal-500/20 shadow font-bold' 
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              {domain.domainId === 'fed-border' && <Shield className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'fed-customs' && <Cpu className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'fed-revenue' && <Coins className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'fed-trade' && <TrendingUp className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'fed-audit' && <FileText className="w-3.5 h-3.5 shrink-0" />}
              <span>{domain.domainNameKu}</span>
            </button>
          );
        })}
        <button
          onClick={() => setActiveDomainTab('fed-governance')}
          className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
            activeDomainTab === 'fed-governance'
              ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/20 shadow font-bold'
              : 'text-slate-400 hover:text-white border-transparent'
          }`}
        >
          <Users className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span>هێزی کار و دەسەڵاتەکان (Workforce)</span>
        </button>
        <button
          onClick={() => setActiveDomainTab('fed-intelligence')}
          className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
            activeDomainTab === 'fed-intelligence'
              ? 'bg-rose-950/70 text-rose-400 border border-rose-500/20 shadow font-bold'
              : 'text-slate-400 hover:text-white border-transparent'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-400" />
          <span>هەواڵگری و ئاسایشی نیشتمانی (Security)</span>
        </button>
      </div>

      {/* Main Stats Display Grid */}
      {activeDomainTab === 'fed-customs' ? (
        <div className="w-full">
          <FederalCustomsDashboard />
        </div>
      ) : activeDomainTab === 'fed-trade' ? (
        <div className="w-full">
          <FederalTradeDashboard />
        </div>
      ) : activeDomainTab === 'fed-audit' ? (
        <div className="w-full">
          <FederalTransparencyDashboard />
        </div>
      ) : activeDomainTab === 'fed-governance' ? (
        <div className="w-full animate-fade-in">
          <SovereignGovernanceSection governingOrg="FEDERAL_IRAQ" />
        </div>
      ) : activeDomainTab === 'fed-intelligence' ? (
        <div className="w-full">
          <FederalIntelligenceDashboard />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* KPIs display column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-400" />
                تۆماری فەرمی نیشاندەرەکانی سەرەکی (KPIs) - بوارەکام: {selectedDomain.domainNameKu}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedDomain.kpis.map(kpi => (
                  <div key={kpi.id} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">{kpi.nameKu}</span>
                      <span className="text-lg font-bold text-white font-mono block mt-1.5">{kpi.value}</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="text-slate-500 uppercase">مەودای دراو</span>
                      <span className="text-emerald-400">{kpi.changeRate || 'سەقامگیر'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Federal Recent Signed Actions */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                تۆماری ئۆپەراسیۆنە فەرمییەکان (Audit Trail Log)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-2.5 text-start">ڕێکەوت</th>
                      <th className="p-2.5 text-start">جێبەجێکار</th>
                      <th className="p-2.5 text-start">چالاکی</th>
                      <th className="p-2.5 text-center">پرۆکۆڵ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono">
                    {auditTrail
                      .filter(log => log.jurisdiction === 'federal')
                      .slice(0, 5)
                      .map(log => (
                        <tr key={log.id} className="hover:bg-slate-900/20 text-[11px]">
                          <td className="p-2.5 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                          <td className="p-2.5 text-teal-400 font-bold">{log.actor}</td>
                          <td className="p-2.5 text-slate-300 font-sans">{log.details}</td>
                          <td className="p-2.5 text-center">
                            <Badge variant="teal">{log.policyContext}</Badge>
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
                <FileText className="w-4 h-4 text-teal-400" />
                داڕشتنی فەرمانی باڵای جێبەجێکردن
              </h3>

              <form onSubmit={handleSendDecree} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">بڕیاردانی فەرمی</label>
                  <input
                    type="text"
                    required
                    placeholder="بۆ نموونە: تاریفەی غەرامەی گومرگی هۆشەک"
                    value={decreeTitle}
                    onChange={(e) => setDecreeTitle(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">وەسف و ڕێنماییەکان</label>
                  <textarea
                    rows={3}
                    placeholder="ڕێساکانی مۆنیفاست و سەپاندنی ڕێژەی نوێی باج..."
                    value={decreeContent}
                    onChange={(e) => setDecreeContent(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-slate-900 text-xs font-bold font-sans transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  بڵاوکردنەوەی بڕیاردان
                </button>
              </form>
            </Card>

            {/* Designate Council Authority Info */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">دەزگا فیدرالییە پەیوەندیدارەکان</h4>
              <div className="space-y-2 mt-3 text-xs leading-relaxed text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                  <span className="text-slate-200">فەرماندەیی گشتی سنوورەکان</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                  <span className="text-slate-200">بەڕێوبەرایەتی گومرگی فیدراڵ</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                  <span className="text-slate-200">وەزارەتی دارایی و داهاتە گشتییەکان</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                  <span className="text-slate-200">کونسڵگەری گشتی وەزارەتی بازرگانی</span>
                </div>
              </div>
            </Card>

          </div>

        </div>
      )}

    </div>
  );
}
