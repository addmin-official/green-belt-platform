import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { KRG_KPI_REGISTRY } from '../../shared/executive/ExecutiveKPIRegistry';
import { Card, Badge, Button } from '../../ui';
import { 
  Landmark, Layers, ShieldAlert, Cpu, Coins, TrendingUp, AlertTriangle, 
  CheckCircle2, FileText, Lock, RefreshCw, Send, Database, Shield
} from 'lucide-react';
import KRGCustomsDashboard from '../customs/KRGCustomsDashboard';
import KRGTradeDashboard from '../trade/KRGTradeDashboard';
import KRGTransparencyDashboard from '../transparency/KRGTransparencyDashboard';
import SovereignGovernanceSection from '../../shared/components/SovereignGovernanceSection';
import KRGIntelligenceDashboard from '../intelligence/KRGIntelligenceDashboard';
import { Users } from 'lucide-react';

export default function KRGPrimeMinisterDashboard() {
  const { userRole, logAction, auditTrail } = useGovernment();
  const { locale: lang } = useI18n();

  // Valid authorities for KRG Dashboard
  const authorizedRoles = [
    'Prime Minister of Kurdistan Region',
    'KRG Prime Minister', // Fallback
    'KRG Cabinet',
    'KRG Border Authority',
    'KRG Customs Authority',
    'KRG Revenue Authority',
    'KRG Trade Authority'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  const [activeDomainTab, setActiveDomainTab] = useState('krg-border');
  const [ticker, setTicker] = useState(0);

  // Simulated actions for the dashboard
  const [simulatedLoad, setSimulatedLoad] = useState(false);
  const [decreeTitle, setDecreeTitle] = useState('');
  const [decreeContent, setDecreeContent] = useState('');

  const handleApplyRegionalHandshake = () => {
    setSimulatedLoad(true);
    setTimeout(() => {
      setSimulatedLoad(false);
      logAction(
        userRole, 
        `واژۆی گۆشتی و ڕێساکانی مانیفێستی هەرێم نوێکرایەوە و هاوتاکرا لەگەڵ بانکی زانیاری نیشتمانی Erbil mainframe.`, 
        'KRG_REGIONAL_SEAL_SETTLED'
      );
    }, 800);
  };

  const handleSendDecree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decreeTitle.trim()) return;
    logAction(
      userRole, 
      `بڕیاری فەرمی هەرێمی دەرچوو: ${decreeTitle} - ناوەرۆک: ${decreeContent || 'بەبێ لێدوان'}`, 
      'KRG_DECREE_PUBLISHED'
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
              پاراستنی ئاسایشی هەرێمی كوردستان: ڕۆڵی چالاک <b>[{userRole}]</b> دەسەڵاتی پێویستی نییە بۆ تێپەڕبوون بە مێزی سەرۆکی ئەنجومەنی وەزیرانی هەرێمی کوردستان. ئەم هەوڵە و تۆمارەکە مۆرکرا لە مێژووی چاودێری فەرمیدا.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-rose-950/50 text-xs font-mono text-slate-400">
              JURISDICTION_ENFORCEMENT: krg_regional_control • STATUS: BLOCKED_RBAC
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const selectedDomain = KRG_KPI_REGISTRY.find(d => d.domainId === activeDomainTab) || KRG_KPI_REGISTRY[0];

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Prime Cabinet Header */}
      <Card className="bg-[#0b1329]/95 border-emerald-930 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-950/85 border border-emerald-800 rounded-lg text-emerald-400 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-sans font-bold text-slate-100 tracking-tight flex items-center gap-2">
                سەنتەری فەرماندەیی و بڕیاردانی سەرۆک وەزیرانی هەرێمی کوردستان
                <Badge variant="success">ئەندامیەتی هەرێم</Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                ئەنجومەنی وەزیرانی حکومەتی هەرێمی کوردستان (KRG) – فەمانگەی گشتی چاودێری تاریفەکان، لێخۆشبوونی وەبەرهێنان و بڕوانامەی مینیفاستەکانی باکوور.
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyRegionalHandshake}
            disabled={simulatedLoad}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-slate-900 text-xs font-bold font-sans tracking-wide transition flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {simulatedLoad ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
            مۆرکردنی ناوخۆیی مینیفاستەکان
          </button>
        </div>
      </Card>

      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-950/60 p-1 rounded-xl border border-slate-900">
        {KRG_KPI_REGISTRY.map(domain => {
          const isActive = activeDomainTab === domain.domainId;
          return (
            <button
              key={domain.domainId}
              onClick={() => setActiveDomainTab(domain.domainId)}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                isActive 
                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/20 shadow font-bold' 
                  : 'text-slate-400 hover:text-white border-transparent'
              }`}
            >
              {domain.domainId === 'krg-border' && <Shield className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'krg-customs' && <Cpu className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'krg-revenue' && <Coins className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'krg-trade' && <TrendingUp className="w-3.5 h-3.5 shrink-0" />}
              {domain.domainId === 'krg-audit' && <FileText className="w-3.5 h-3.5 shrink-0" />}
              <span>{domain.domainNameKu}</span>
            </button>
          );
        })}
        <button
          onClick={() => setActiveDomainTab('krg-governance')}
          className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
            activeDomainTab === 'krg-governance'
              ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/20 shadow font-bold'
              : 'text-slate-400 hover:text-white border-transparent'
          }`}
        >
          <Users className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span>هێزی کار و دەسەڵاتەکان (Workforce)</span>
        </button>
        <button
          onClick={() => setActiveDomainTab('krg-intelligence')}
          className={`px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
            activeDomainTab === 'krg-intelligence'
              ? 'bg-amber-950/70 text-amber-400 border border-amber-500/20 shadow font-bold'
              : 'text-slate-400 hover:text-white border-transparent'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span>هەواڵگری و ئاسایشی هەرێم (Security)</span>
        </button>
      </div>

      {/* Main Stats Display Grid */}
      {activeDomainTab === 'krg-customs' ? (
        <div className="w-full">
          <KRGCustomsDashboard />
        </div>
      ) : activeDomainTab === 'krg-trade' ? (
        <div className="w-full">
          <KRGTradeDashboard />
        </div>
      ) : activeDomainTab === 'krg-audit' ? (
        <div className="w-full">
          <KRGTransparencyDashboard />
        </div>
      ) : activeDomainTab === 'krg-governance' ? (
        <div className="w-full animate-fade-in">
          <SovereignGovernanceSection governingOrg="KRG" />
        </div>
      ) : activeDomainTab === 'krg-intelligence' ? (
        <div className="w-full">
          <KRGIntelligenceDashboard />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* KPIs display column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                سەنتەری داتاکانی گومرگی هەرێم - نیشاندەرە گشتییەکانی {selectedDomain.domainNameKu}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedDomain.kpis.map(kpi => (
                  <div key={kpi.id} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-mono font-bold uppercase">{kpi.nameKu}</span>
                      <span className="text-lg font-bold text-white font-mono block mt-1.5">{kpi.value}</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="text-slate-500 uppercase">مەودای چۆنایەتی</span>
                      <span className="text-emerald-400">{kpi.changeRate || 'سەقامگیر'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* KRG Recent Signed Actions */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                تۆماری ئۆپەراسیۆنە فەرمییەکان (Audit Trail Log)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-2.5 text-start">کاتی جێبەجێکردن</th>
                      <th className="p-2.5 text-start">کارمەندی بەڕێز</th>
                      <th className="p-2.5 text-start">چالاکی ڕێکارەکە</th>
                      <th className="p-2.5 text-center">بەڵگەنامە</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 font-mono">
                    {auditTrail
                      .filter(log => log.jurisdiction === 'krg')
                      .slice(0, 5)
                      .map(log => (
                        <tr key={log.id} className="hover:bg-slate-900/20 text-[11px]">
                          <td className="p-2.5 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                          <td className="p-2.5 text-emerald-400 font-bold">{log.actor}</td>
                          <td className="p-2.5 text-slate-300 font-sans">{log.details}</td>
                          <td className="p-2.5 text-center">
                            <Badge variant="success">{log.policyContext}</Badge>
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
                <FileText className="w-4 h-4 text-emerald-400" />
                داڕشتنی ڕێسا و بڕیار لە ئەنجومەنی وەزیران
              </h3>

              <form onSubmit={handleSendDecree} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">بابەتی بڕیاردان</label>
                  <input
                    type="text"
                    required
                    placeholder="بۆ نموونە: لێخۆشبوونی گومرگی هێڵەکانی گواستنەوە"
                    value={decreeTitle}
                    onChange={(e) => setDecreeTitle(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">ناوەڕۆک و وەسفی گشتی</label>
                  <textarea
                    rows={3}
                    placeholder="دیاریکردنی ناوچەکانی گەشەپێدان و چاودێری مانیفێستی دەروازەکان..."
                    value={decreeContent}
                    onChange={(e) => setDecreeContent(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-slate-900 text-xs font-bold font-sans transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  پەسەندکردنی بڕیاردان
                </button>
              </form>
            </Card>

            {/* Designate Council Authority Info */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-start">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">دەزگا هەرێمییە پەیوەندیدارەکان</h4>
              <div className="space-y-2 mt-3 text-xs leading-relaxed text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-200">فەرماندەیی پاراستنی گشتی سنوورەکان</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-200">بەڕێوبەرایەتی گشتی گومرگەکانی هەرێم</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-200">وەزارەتی دارایی و کارگێڕی هەرێمی</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-200">ئەنجومەنی ئابووری باڵای کوردستان</span>
                </div>
              </div>
            </Card>

          </div>

        </div>
      )}

    </div>
  );
}
