import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';

import { AuditCaseEngine } from '../../shared/transparency/AuditCaseEngine';
import { AuditLedgerEngine } from '../../shared/transparency/AuditLedgerEngine';
import { AuditEvidenceEngine } from '../../shared/transparency/AuditEvidenceEngine';
import { RiskSignalEngine } from '../../shared/transparency/RiskSignalEngine';
import { RevenueLeakageAnalysisEngine } from '../../shared/transparency/RevenueLeakageAnalysisEngine';
import { CaseAssignmentEngine } from '../../shared/transparency/CaseAssignmentEngine';
import { InvestigationWorkflowEngine } from '../../shared/transparency/InvestigationWorkflowEngine';

import { 
  TransactionMismatchEngine 
} from '../../shared/transparency/TransactionMismatchEngine';
import { 
  TariffVarianceEngine 
} from '../../shared/transparency/TariffVarianceEngine';
import { 
  CollectionGapEngine 
} from '../../shared/transparency/CollectionGapEngine';
import { 
  BorderLeakageEngine 
} from '../../shared/transparency/BorderLeakageEngine';

import { Card, Badge, Button, Input, Select } from '../../ui';
import { 
  ShieldAlert, Landmark, Scale, FileText, CheckCircle2, AlertTriangle, 
  Search, Eye, Plus, Cpu, Activity, UserCheck, ShieldCheck, RefreshCw 
} from 'lucide-react';

export default function KRGTransparencyDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // KRG authorization control - only authorized regional entities can view
  const authorizedRoles = [
    'KRG Prime Minister',
    'KRG Integrity Authority',
    'KRG Audit Authority',
    'KRG Border Authority',
    'KRG Customs Authority',
    'KRG Revenue Authority'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  // States
  const [activeTab, setActiveTab] = useState<'overview' | 'investigations' | 'leakages' | 'signals' | 'ledger'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data reloads
  const [cases, setCases] = useState(() => AuditCaseEngine.getCasesByJurisdiction('krg'));
  const [alerts, setAlerts] = useState(() => RevenueLeakageAnalysisEngine.getAlertsByJurisdiction('krg'));
  const [signals, setSignals] = useState(() => RiskSignalEngine.getSignalsByJurisdiction('krg'));
  const [ledger, setLedger] = useState(() => AuditLedgerEngine.getLedgerByJurisdiction('krg'));

  // Active detail modal/panel case
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  // Forms states
  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseDesc, setNewCaseDesc] = useState('');
  const [newCaseSeverity, setNewCaseSeverity] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('HIGH');
  const [newCaseSusproc, setNewCaseSusproc] = useState('');
  const [newCaseSusent, setNewCaseSusent] = useState('');

  // Evidence states
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceType, setEvidenceType] = useState<'DOCUMENT' | 'HASH_PROOF' | 'IMAGE' | 'LOG_DUMP'>('DOCUMENT');
  const [evidenceDesc, setEvidenceDesc] = useState('');

  // Assignment states
  const [assigneeName, setAssigneeName] = useState('');

  const reloadData = () => {
    setCases(AuditCaseEngine.getCasesByJurisdiction('krg'));
    setAlerts(RevenueLeakageAnalysisEngine.getAlertsByJurisdiction('krg'));
    setSignals(RiskSignalEngine.getSignalsByJurisdiction('krg'));
    setLedger(AuditLedgerEngine.getLedgerByJurisdiction('krg'));
  };

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center bg-[#0d1527] border border-red-500/30 rounded-lg max-w-2xl mx-auto my-12" id="auth-unauthorized-layer-krg-transparency">
        <ShieldAlert className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-sans text-amber-100 mb-2">دەستەی دەسپاکی هەرێمی کوردستان: ڕێگەپێنەدراو</h2>
        <p className="text-xs font-sans text-slate-400 mb-6 leading-relaxed">
          سەکۆی شەفافیەت و چاودێری دارایی هەرێمی کوردستان داخراوە بە زانیارییە ناوخۆییەکانی کابینەی حکومەتی هەرێم. پلەی گەیشتنی ئێستاتان `{userRole}` مۆڵەتی پێویستی نییە.
        </p>
        <span className="text-[10px] font-mono text-slate-500 block">KRG_AUTHORIZATION_FAILED // SECURED_REGIONAL_VAULT</span>
      </div>
    );
  }

  // Handle Case Filing
  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseTitle || !newCaseDesc) return;

    const newCase = AuditCaseEngine.createCase(
      newCaseTitle,
      newCaseDesc,
      'krg',
      newCaseSeverity,
      'Unassigned',
      newCaseSusproc || undefined,
      newCaseSusent || undefined
    );

    // Append to chain ledger
    AuditLedgerEngine.appendRecord(
      'KRG-ETH-02',
      userRole,
      'CASE_CREATED',
      `Created new regional investigation case ${newCase.id}: "${newCaseTitle}"`,
      'krg',
      'TRANSPARENCY'
    );

    logAction('KRG_CASE_CREATED', { caseId: newCase.id });
    setNewCaseTitle('');
    setNewCaseDesc('');
    setNewCaseSusproc('');
    setNewCaseSusent('');
    reloadData();
    alert('لێکۆڵینەوەی دەسپاکی هەرێمی کوردستان بە سەرکەوتوویی تۆمارکرا');
  };

  // Handle Evidence Submission
  const handleAddEvidence = (caseId: string) => {
    if (!evidenceTitle) return;
    const ev = AuditEvidenceEngine.registerEvidence(caseId, userRole, evidenceType, evidenceTitle, evidenceDesc);
    AuditCaseEngine.linkEvidence(caseId, ev.id);

    AuditLedgerEngine.appendRecord(
      'KRG-ETH-02',
      userRole,
      'EVIDENCE_SUBMITTED',
      `Registered evidence ${ev.id} on regional case ${caseId}.`,
      'krg',
      'TRANSPARENCY'
    );

    setEvidenceTitle('');
    setEvidenceDesc('');
    reloadData();
    alert('بەڵگەی نوێ بە سەرکەوتوویی بەم مەلەفی هەرێمەوە بەسترا');
  };

  // Handle Case Assignment
  const handleAssignCase = (caseId: string) => {
    if (!assigneeName) return;
    CaseAssignmentEngine.assignOfficer(caseId, assigneeName, userRole, 'KRG-ETH-02');
    setAssigneeName('');
    reloadData();
    alert('ئەفسەری لێکۆڵینەوە بازنەی هەرێم دیاریکرا');
  };

  // Change Case Status (Workflow)
  const handleTransitionStatus = (caseId: string, nextStatus: any) => {
    InvestigationWorkflowEngine.transitionCase(caseId, nextStatus, 'KRG-ETH-02', userRole, 'KRG regional audit transition.');
    reloadData();
  };

  const triggerAutoAnalysis = () => {
    TransactionMismatchEngine.runAutomaticAudit('krg');
    reloadData();
    alert('پشکنەر و چاودێری جیاوازی لۆگەکانی داهاتی هەرێم دەستیپێکرد');
  };

  const integrityScore = RevenueLeakageAnalysisEngine.calculateIntegrityScore('krg');

  const borderLeakageRecords = BorderLeakageEngine.getBorderTransitAnomalies('krg');
  const collectionGapRecords = CollectionGapEngine.fetchCollectionGaps('krg');

  return (
    <div className="bg-[#0b1329] text-slate-100 min-h-screen p-6 font-sans antialiased" id="krg-transparency-dashboard-root">
      
      {/* Sovereign Header */}
      <div className="border-b border-amber-500/20 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Landmark className="w-6 h-6 text-amber-500" />
            <span className="text-[10px] tracking-widest bg-amber-500/10 text-amber-400 px-3 py-0.5 rounded-full font-bold uppercase">دەسپاکی و چاودێری دارایی حکومەتی هەرێمی کوردستان (KRG)</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">سیستمی گشتی شەفافیەت و بەرگری لە گەندەڵی هەرێم (Regional Integrity Core)</h1>
          <p className="text-xs text-slate-400">مۆرکردنی دۆسیەکانی گومرگ، بەراوردکردنی ترازمەنی بانک، و ئاگادارکەرەوەی ئۆفیسەرانی دەروازە بازرگانییەکانی هەرێم</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reloadData} className="flex items-center gap-1.5 bg-[#121f3d] hover:bg-[#18294f] border-amber-500/30 text-white font-sans font-bold text-xs p-2 rounded-lg cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> نوێکردنەوە
          </Button>
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg px-3 py-1 text-center">
            <span className="text-[9px] block text-amber-500 uppercase font-bold tracking-wider">پلەی سەرپەرشتیار</span>
            <span className="text-xs font-mono font-bold text-white uppercase">{userRole}</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">تێکڕای جۆری دەسپاکی هەرێم</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400">{integrityScore}%</div>
          <p className="text-[10px] text-slate-400 mt-1">ئاستی پابەندی هەرێم: <span className="text-white font-bold">بەرز</span></p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">دۆسیە چالاکەکانی لێکۆڵینەوەی هەرێم</span>
            <Activity className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{cases.filter(c => c.status !== 'CLOSED').length}</div>
          <p className="text-[10px] text-slate-400 mt-1">تێکڕای گشتی داخراو: {cases.filter(c => c.status === 'CLOSED').length}</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold font-sans">هۆشداری دزەی داهات لە دەروازەکان</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-red-400">{alerts.length}</div>
          <p className="text-[10px] text-slate-400 mt-1">چاودێری داخراو لە لیدجەردا</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">نیشانە مەترسیدارەکانی ئەفسەرانی لۆکەڵ</span>
            <Cpu className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{signals.length}</div>
          <p className="text-[10px] text-slate-400 mt-1">پشکنەری ئۆتۆماتیکی نمرەی گزی</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 mb-6">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'overview' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>پوختەی دەسپاکی هەرێم</button>
        <button onClick={() => setActiveTab('investigations')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'investigations' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>دۆسیە هەرێمییەکان</button>
        <button onClick={() => setActiveTab('leakages')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'leakages' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>بەدواداچوونی دزەکردنی داهاتی گوندەکان</button>
        <button onClick={() => setActiveTab('signals')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'signals' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>چاودێری گومانلێکراوانی خاڵی سنوور</button>
        <button onClick={() => setActiveTab('ledger')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'ledger' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>لیدجەری هەرێمی نەگۆڕ</button>
      </div>

      {/* Renders */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="overview-render-p">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-500" /> ئامادەیی لیسی یەکەکانی پشکنینی گومرگی هەرێمی کوردستان
                </h3>
                <Button size="sm" onClick={triggerAutoAnalysis} className="text-xs bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold px-3 py-1 rounded cursor-pointer">
                  بەگەڕخستنی پشکنەری ناوخۆبی
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-300 font-sans">
                  <thead className="bg-[#0a1122] text-[#E0A96D] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-2 text-start">ناسنامەی ترانزێتی لۆکەڵ</th>
                      <th className="p-2">خاڵی دەروازە</th>
                      <th className="p-2 text-center">کێش لە مانیفێست</th>
                      <th className="p-2 text-center">کێش لەسەر تەرازوو</th>
                      <th className="p-2 text-center">جیاوازی کێش (تۆن)</th>
                      <th className="p-2 text-center">بەهای غەرامەی بزر</th>
                      <th className="p-2 text-center">جۆری گومان</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {borderLeakageRecords.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-2 text-start font-mono font-bold text-white">{b.transitId}</td>
                        <td className="p-2 font-bold">{b.gateId}</td>
                        <td className="p-2 text-center font-mono">{b.manifestWeightTons} t</td>
                        <td className="p-2 text-center font-mono">{b.scaleWeightTons} t</td>
                        <td className="p-2 text-center font-mono text-red-400 font-bold">+{b.varianceTons} t</td>
                        <td className="p-2 text-center font-mono text-emerald-400">${b.estimatedUndeclaredValueUSD.toLocaleString()}</td>
                        <td className="p-2 text-center">
                          <Badge variant="warning">{b.anomalyType}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">هاوسەنگی تەمویلی گشتی دەروازەی زاخۆ و سلێمانی</h3>
              <div className="overflow-x-auto text-xs text-slate-300">
                <table className="w-full text-right">
                  <thead className="bg-[#0a1122] text-amber-500 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-2 text-start">دەروازە</th>
                      <th className="p-2 text-center font-sans font-bold text-white">بەروار پسوڵەی گومرگ</th>
                      <th className="p-2 text-center">هاوردەی واژۆ بانکی</th>
                      <th className="p-2 text-center">بڕی کورتھێنان</th>
                      <th className="p-2 text-center">ڕێژەی غەدرکار</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 font-mono">
                    {collectionGapRecords.map((g, i) => (
                      <tr key={i}>
                        <td className="p-2 text-start font-sans font-bold text-white">{g.billingSource}</td>
                        <td className="p-2 text-center">${g.billedUSD.toLocaleString()}</td>
                        <td className="p-2 text-center">${g.clearedBankUSD.toLocaleString()}</td>
                        <td className="p-2 text-center text-red-400 font-bold">-${g.activeGapUSD.toLocaleString()}</td>
                        <td className="p-2 text-center text-amber-400 font-bold">{g.leakagePercentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">پرۆتۆکۆلی شەفافیەتی لۆکەڵ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                سەرجەم لۆگەکانی پرۆسەی هاوردەکردن لە ناوچە سنوورییەکان بە واژۆی فەرمی دەپاریزرێن. دەرئەنجامەکانی لێکۆڵینەوە لێرەوە دەتوانرێت بە شێوازێکی هاوتا بۆ سەکۆی گشتی لیدجەر بنێردرێت.
              </p>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'investigations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="krg-investigations-tab">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4">لیستی دۆسیە تۆمارکراوەکانی دەسپاکی هەرێم (KRG Investigations)</h3>
              <div className="flex flex-col gap-3">
                {cases.map(c => (
                  <div key={c.id} className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedCaseId === c.id ? 'bg-[#18294f] border-amber-500/50' : 'bg-[#0a1122] border-slate-850 hover:bg-[#121f3d]'}`} onClick={() => setSelectedCaseId(c.id)}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-500">{c.id}</span>
                        <Badge variant={c.severity === 'CRITICAL' ? 'danger' : 'warning'}>{c.severity}</Badge>
                      </div>
                      <Badge variant="outline">{c.status}</Badge>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">{c.title}</h4>
                    <p className="text-xs text-slate-400 mb-2">{c.description}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800">
                      <span>ئەفسەر: {c.assignedOfficer}</span>
                      <span>نوێکردنەوە: {c.lastUpdatedAt.slice(0, 10)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedCaseId && (() => {
              const currentCase = cases.find(c => c.id === selectedCaseId);
              if (!currentCase) return null;
              const caseEvidence = AuditEvidenceEngine.getEvidenceForCase(currentCase.id);

              return (
                <Card className="bg-[#101b35] border-amber-500/20 p-6">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Eye className="w-4 h-4 text-amber-500" /> نیشاندانی وردەکاری دۆسیەی هەرێمی {currentCase.id}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
                    <div className="flex flex-col gap-1.5 p-2.5 bg-[#0a1122] rounded border border-slate-800">
                      <span className="text-slate-400 font-bold">ئەفسەری سنوری گومانلێکراو</span>
                      <span className="text-white font-mono">{currentCase.suspectOfficer || 'UNKNOWN'}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-2.5 bg-[#0a1122] rounded border border-slate-800">
                      <span className="text-slate-400 font-bold">بریکاری بازرگانی سەر سنوور</span>
                      <span className="text-white">{currentCase.suspectEntity || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">بەڵگە بەستراوە هەرێمییەکان:</h4>
                    <div className="flex flex-col gap-2">
                      {caseEvidence.map(ev => (
                        <div key={ev.id} className="p-2.5 bg-[#0a1122] rounded border border-slate-800 text-xs">
                          <div className="flex justify-between mb-1">
                            <span className="font-mono text-amber-400 font-bold">{ev.id} [{ev.evidenceType}]</span>
                            <span className="text-[10px] text-slate-500">{ev.registeredAt.slice(0, 16)}</span>
                          </div>
                          <strong className="text-white block">{ev.title}</strong>
                          <p className="text-slate-400 text-[11px] mt-0.5">{ev.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-slate-800 pt-4 flex flex-wrap gap-2">
                    <div className="flex flex-col gap-1 inline-block">
                      <Input placeholder="ناوی ئەنجومەن..." value={assigneeName} onChange={(e) => setAssigneeName(e.target.value)} className="bg-[#0a1122] border-slate-800 text-xs h-8" />
                      <Button size="sm" onClick={() => handleAssignCase(currentCase.id)} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs p-1 rounded cursor-pointer mt-1">دیاریکردنی سپۆنسەری لێکۆڵینەوە</Button>
                    </div>

                    <div className="flex gap-1.5 items-end ml-auto">
                      <Button size="sm" onClick={() => handleTransitionStatus(currentCase.id, 'UNDER_REVIEW')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-2.5 py-1.5 rounded cursor-pointer">ناردن بۆ پشکنین</Button>
                      <Button size="sm" onClick={() => handleTransitionStatus(currentCase.id, 'CLOSED')} className="bg-[#8b0000] hover:bg-red-800 text-white font-bold text-xs px-2.5 py-1.5 rounded cursor-pointer">داخستنی بە مەرج</Button>
                    </div>
                  </div>

                  {/* Add evidence */}
                  <div className="mt-4 border-t border-slate-800 pt-4 bg-[#0a1122] p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-amber-400 mb-3">هاوپێچ کردنی بەڵگەی نوێ:</h4>
                    <div className="flex flex-col gap-3 text-xs">
                      <Input value={evidenceTitle} onChange={(e) => setEvidenceTitle(e.target.value)} placeholder="ناونیشانی بەڵگە" className="bg-[#101b35] border-slate-800" />
                      <Input value={evidenceDesc} onChange={(e) => setEvidenceDesc(e.target.value)} placeholder="وردەکاری گرێدراو" className="bg-[#101b35] border-slate-800" />
                      <Button size="sm" onClick={() => handleAddEvidence(currentCase.id)} className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold text-xs py-1.5 rounded cursor-pointer">تۆماری فایلی مۆر</Button>
                    </div>
                  </div>

                </Card>
              );
            })()}

          </div>

          {/* Create form */}
          <Card className="bg-[#101b35] border-slate-800 p-6 h-fit">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
              <Plus className="w-5 h-5 text-amber-500" /> پێکێنانی دۆسیەی نوێی سەر تاوان
            </h3>
            <form onSubmit={handleCreateCase} className="flex flex-col gap-4 text-xs font-sans">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-bold">ناوی دۆسیە</label>
                <Input value={newCaseTitle} onChange={(e) => setNewCaseTitle(e.target.value)} placeholder="بۆ نموونە: هاوردەکردنی گاز لە دەروازە بەبێ گومرگ" required className="bg-[#0a1122] border-slate-800" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-bold">جۆری پێشێلکاری و نیشاندانی بەڵگە</label>
                <textarea value={newCaseDesc} onChange={(e) => setNewCaseDesc(e.target.value)} placeholder="وردەکاری پرسی بەراوردکردن..." required className="bg-[#0a1122] border-slate-800 text-xs text-white p-2 rounded-lg border focus:border-amber-500 focus:outline-none h-24 font-sans" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">مەترسی</label>
                  <Select value={newCaseSeverity} onChange={(e) => setNewCaseSeverity(e.target.value as any)} className="bg-[#0a1122] border-slate-800">
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">کارمەندی گومانلێکراو</label>
                  <Input value={newCaseSusproc} onChange={(e) => setNewCaseSusproc(e.target.value)} placeholder="ناوی فەرمانبەر" className="bg-[#0a1122] border-slate-800" />
                </div>
              </div>

              <Button type="submit" className="w-full bg-amber-500 text-slate-900 hover:bg-amber-400 py-2.5 font-bold text-xs rounded-lg cursor-pointer">
                دەستپێکردنی دۆسیە
              </Button>
            </form>
          </Card>

        </div>
      )}

      {activeTab === 'leakages' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="leakages-tab-panel">
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-4">ئاگادرکەرەوەکانی زیرەکی دۆزینەوەی دزەی داهاتی گومرگی هەرێم</h3>
            <div className="flex flex-col gap-4">
              {alerts.map(a => (
                <div key={a.id} className="bg-[#0a1122] p-4 rounded-lg border border-amber-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs font-bold text-amber-500">{a.id}</span>
                    <Badge variant="outline">{a.leakageType}</Badge>
                  </div>
                  <strong className="text-sm text-white block mb-2">{a.title}</strong>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs my-3 bg-[#101b35] p-3 rounded">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">پێشبینیکراو:</span>
                      <span className="text-white font-bold">${a.expectedValueUSD.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">کۆکراوە:</span>
                      <span className="text-white font-bold">${a.actualCalculatedUSD.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">بڕی دزە:</span>
                      <span className="text-red-400 font-bold">${a.leakageAmountUSD.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'signals' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="signals-tab-panel">
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-4">پۆرترێتی هۆشدارییەکانی سەر گومانلێکراوانی خاڵی سنووری هەرێم</h3>
            <div className="flex flex-col gap-4">
              {signals.map(s => (
                <div key={s.id} className="bg-[#0a1122] p-4 rounded-lg border border-amber-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs font-bold text-amber-500">{s.id}</span>
                    <Badge variant="danger">{s.severity} (نمرە: {s.anomalyScore})</Badge>
                  </div>
                  <strong className="text-sm text-white block mb-2">{s.targetName} [ناسنامە: {s.targetId}]</strong>
                  <div className="text-xs my-2">
                    <span className="text-slate-400 block font-bold">هۆکارە بازرگانییەکان:</span>
                    <ul className="list-disc list-inside text-slate-300">
                      {s.riskFactors.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'ledger' && (
        <Card className="bg-[#101b35] border-slate-800 p-6" id="ledger-tab-panel">
          <h3 className="text-sm font-bold text-white mb-3">بلۆک لۆگی هەرێمی کوردستانى جێگیرکراو</h3>
          <div className="overflow-x-auto text-[11px] font-mono">
            <table className="w-full text-right text-slate-300">
              <thead className="bg-[#0a1122] text-amber-500 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">ناسنامە</th>
                  <th className="p-3">ئەفسەری کاربین</th>
                  <th className="p-3">کردەوە</th>
                  <th className="p-3 text-start">شێواز</th>
                  <th className="p-3 text-start font-mono">مۆری بلۆک (Hash Block)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {ledger.map(log => (
                  <tr key={log.id}>
                    <td className="p-3 text-start font-bold text-amber-400">{log.id}</td>
                    <td className="p-3 font-sans font-semibold text-white">{log.actorName}</td>
                    <td className="p-3 text-center"><Badge variant="outline">{log.action}</Badge></td>
                    <td className="p-3 font-sans text-slate-300 text-start">{log.details}</td>
                    <td className="p-3 text-start text-emerald-400">{log.payloadHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
}
