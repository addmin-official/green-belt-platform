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
import { AnomalyDetectionEngine } from '../../shared/transparency/AnomalyDetectionEngine';
import { BehaviorAnalysisEngine } from '../../shared/transparency/BehaviorAnalysisEngine';

import { Card, Badge, Button, Input, Select } from '../../ui';
import { 
  ShieldAlert, Landmark, Scale, FileText, CheckCircle2, AlertTriangle, 
  Search, Eye, Plus, Cpu, Activity, UserCheck, ShieldCheck, RefreshCw 
} from 'lucide-react';

export default function FederalTransparencyDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // Federal authorization control - only authorized entities can view & manage
  const authorizedRoles = [
    'Federal Prime Minister',
    'Federal Integrity Commission',
    'Federal Audit Authority',
    'Federal Border Authority',
    'Federal Customs Authority',
    'Federal Revenue Authority'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  // States
  const [activeTab, setActiveTab] = useState<'overview' | 'investigations' | 'leakages' | 'signals' | 'ledger'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data reloads
  const [cases, setCases] = useState(() => AuditCaseEngine.getCasesByJurisdiction('federal'));
  const [alerts, setAlerts] = useState(() => RevenueLeakageAnalysisEngine.getAlertsByJurisdiction('federal'));
  const [signals, setSignals] = useState(() => RiskSignalEngine.getSignalsByJurisdiction('federal'));
  const [ledger, setLedger] = useState(() => AuditLedgerEngine.getLedgerByJurisdiction('federal'));

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
    setCases(AuditCaseEngine.getCasesByJurisdiction('federal'));
    setAlerts(RevenueLeakageAnalysisEngine.getAlertsByJurisdiction('federal'));
    setSignals(RiskSignalEngine.getSignalsByJurisdiction('federal'));
    setLedger(AuditLedgerEngine.getLedgerByJurisdiction('federal'));
  };

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center bg-[#0d1527] border border-red-500/30 rounded-lg max-w-2xl mx-auto my-12" id="auth-unauthorized-layer-fed-transparency">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-sans text-red-100 mb-2">دەستەی دەسپاکی فیدراڵی: ڕێگەپێنەدراو</h2>
        <p className="text-xs font-sans text-slate-400 mb-6 leading-relaxed">
          فۆڵدەری زانیارییەکانی دەسەڵاتی دەسپاکی و شەفافیەتی فیدراڵ بە تەواوی داخراوە. پلەی بەکارهێنەری ئێستاتان `{userRole}` دەسەڵاتی گەیشتن و بینینی ئەم سەکۆیەی کورتکردووەتەوە.
        </p>
        <span className="text-[10px] font-mono text-slate-500 block">FED_AUTHORIZATION_FAILED // SECURED_LEDGER_ENCLAVE</span>
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
      'federal',
      newCaseSeverity,
      'Unassigned',
      newCaseSusproc || undefined,
      newCaseSusent || undefined
    );

    // Append to chain ledger
    AuditLedgerEngine.appendRecord(
      'FED-ETH-01',
      userRole,
      'CASE_CREATED',
      `Created new investigation case ${newCase.id}: "${newCaseTitle}"`,
      'federal',
      'TRANSPARENCY'
    );

    logAction('FED_CASE_CREATED', { caseId: newCase.id });
    setNewCaseTitle('');
    setNewCaseDesc('');
    setNewCaseSusproc('');
    setNewCaseSusent('');
    reloadData();
    alert('لێکۆڵینەوەی دەسپاکی فیدراڵی بە سەرکەوتوویی تۆمارکرا');
  };

  // Handle Evidence Submission
  const handleAddEvidence = (caseId: string) => {
    if (!evidenceTitle) return;
    const ev = AuditEvidenceEngine.registerEvidence(caseId, userRole, evidenceType, evidenceTitle, evidenceDesc);
    AuditCaseEngine.linkEvidence(caseId, ev.id);

    AuditLedgerEngine.appendRecord(
      'FED-ETH-01',
      userRole,
      'EVIDENCE_SUBMITTED',
      `Registered evidence ${ev.id} on case ${caseId}.`,
      'federal',
      'TRANSPARENCY'
    );

    setEvidenceTitle('');
    setEvidenceDesc('');
    reloadData();
    alert('بەڵگەی نوێ بە سەرکەوتوویی بەم دۆسیەیەوە بەسترا');
  };

  // Handle Case Assignment
  const handleAssignCase = (caseId: string) => {
    if (!assigneeName) return;
    CaseAssignmentEngine.assignOfficer(caseId, assigneeName, userRole, 'FED-ETH-01');
    setAssigneeName('');
    reloadData();
    alert('ئەفسەری لێکۆڵینەوە بە سەرکەوتوویی دیاریکرا');
  };

  // Change Case Status (Workflow)
  const handleTransitionStatus = (caseId: string, nextStatus: any) => {
    InvestigationWorkflowEngine.transitionCase(caseId, nextStatus, 'FED-ETH-01', userRole, 'KRG-FED joint compliance transition.');
    reloadData();
  };

  // Run audit triggers
  const triggerAutoAnalysis = () => {
    TransactionMismatchEngine.runAutomaticAudit('federal');
    reloadData();
    alert('سیستمی چاودێری ئۆتۆماتیکی داهات و گونجان بە سەرکەوتوویی بەگەڕخرا');
  };

  const integrityScore = RevenueLeakageAnalysisEngine.calculateIntegrityScore('federal');

  // Multi-engine data retrieval
  const mismatchRecords = TransactionMismatchEngine.analyzeMismatches('federal');
  const tariffVarianceRecords = TariffVarianceEngine.calculateTariffVariances('federal');
  const collectionGapRecords = CollectionGapEngine.fetchCollectionGaps('federal');
  const borderLeakageRecords = BorderLeakageEngine.getBorderTransitAnomalies('federal');

  return (
    <div className="bg-[#0b1329] text-slate-100 min-h-screen p-6 font-sans antialiased" id="federal-transparency-dashboard-root">
      
      {/* Sovereign Header */}
      <div className="border-b border-red-500/20 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-6 h-6 text-red-500" />
            <span className="text-[10px] tracking-widest bg-red-500/10 text-red-400 px-3 py-0.5 rounded-full font-bold uppercase">دەسەڵاتی دەسپاکی و چاودێری دارایی عێراقی فیدراڵ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">سیستمی چاودێری و لێکۆڵینەوەی ڕێگری لە گەندەڵی فیدراڵ (Federal Integrity Core)</h1>
          <p className="text-xs text-slate-400">بەرگری لە دزەکردنی داهاتی گشتی، هاوردەکردنی کاڵا کورتخایەنەکان و هاوتاکردنی لۆگی ئەفسەرانی سەر سنوورەکان</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reloadData} className="flex items-center gap-1.5 bg-[#121f3d] hover:bg-[#18294f] border-red-500/30 text-white font-sans font-bold text-xs p-2 rounded-lg cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5 animate-pulse" /> نوێکردنەوەی لیدجەر
          </Button>
          <div className="bg-red-950/20 border border-red-500/30 rounded-lg px-3 py-1 text-center">
            <span className="text-[9px] block text-red-500 uppercase font-bold tracking-wider">ئاستی سەرپەرشتی</span>
            <span className="text-xs font-mono font-bold text-white uppercase">{userRole}</span>
          </div>
        </div>
      </div>

      {/* Aggregate Integrity Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">شاخصی ڕێژەی دەسپاکی فیدراڵ</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400">{integrityScore}%</div>
          <p className="text-[10px] text-slate-400 mt-1">ئاستی گونجاوی بەرەنگاربوونەوە: <span className="text-white font-bold">بەرز</span></p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">دۆسیە چالاکەکانی لێکۆڵینەوە</span>
            <Activity className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{cases.filter(c => c.status !== 'CLOSED').length}</div>
          <p className="text-[10px] text-slate-400 mt-1">تێکڕای داخراو: {cases.filter(c => c.status === 'CLOSED').length}</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">ئاگادارکردنەوەکانی دزەکردنی داهات</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-red-400">{alerts.length}</div>
          <p className="text-[10px] text-slate-400 mt-1">دۆسیەی مەترسی گومرگی فەرمی</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">نیشانە مەترسیدارەکانی ئەفسەران</span>
            <Cpu className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{signals.length}</div>
          <p className="text-[10px] text-slate-400 mt-1">بەرزی نمرەی هۆشداری ئۆتۆماتیکی</p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-800 gap-2 mb-6">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'overview' ? 'border-b-2 border-red-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>پوختەی دەسپاکی فیدراڵ</button>
        <button onClick={() => setActiveTab('investigations')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'investigations' ? 'border-b-2 border-red-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>دۆسیەکانی لێکۆڵینەوە</button>
        <button onClick={() => setActiveTab('leakages')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'leakages' ? 'border-b-2 border-red-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>بەدواداچوونی دزەکردنی داهات (Revenue leakage)</button>
        <button onClick={() => setActiveTab('signals')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'signals' ? 'border-b-2 border-red-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>هۆشدارکەرەوەی ڕەفتاری ئەفسەران</button>
        <button onClick={() => setActiveTab('ledger')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'ledger' ? 'border-b-2 border-red-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>مۆری کریپتۆگرافی لۆک بێستون</button>
      </div>

      {/* Renders */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="transparency-overview-p">
          
          {/* Main Indicators */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400" /> ئامادەیی و چاودێری بەربەستی رۆیشتنی کاڵاکانی فیدراڵ
                </h3>
                <Button size="sm" onClick={triggerAutoAnalysis} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded cursor-pointer font-bold">
                  ڕێوشوێنی پشکنینی گشتی سەرتاپا
                </Button>
              </div>

              {/* Transit anomalies list */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-300 font-sans">
                  <thead className="bg-[#0a1122] text-[#E0A96D] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-2 text-start">ناسنامەی ترانزێت</th>
                      <th className="p-2">خاڵی سنووری</th>
                      <th className="p-2 text-center">کێش لە دۆکیومێنت</th>
                      <th className="p-2 text-center">کێشی ڕاستەقینە</th>
                      <th className="p-2 text-center">جیاوازی کێش</th>
                      <th className="p-2 text-center">بزرکاری داهات (خەمڵاندن)</th>
                      <th className="p-2 text-center">ستایل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {borderLeakageRecords.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-2 text-start font-mono font-bold text-white">{b.transitId}</td>
                        <td className="p-2 font-bold">{b.gateId}</td>
                        <td className="p-2 text-center font-mono">{b.manifestWeightTons} تەبەن</td>
                        <td className="p-2 text-center font-mono">{b.scaleWeightTons} تەبەن</td>
                        <td className="p-2 text-center font-mono text-red-400 font-bold">+{b.varianceTons} تەبەن</td>
                        <td className="p-2 text-center font-mono text-emerald-400">${b.estimatedUndeclaredValueUSD.toLocaleString()}</td>
                        <td className="p-2 text-center">
                          <Badge variant="danger">{b.anomalyType}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Price anomalies scanning */}
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">پشکنەری جیاوازی نرخی کاڵا هاوردەکراوەکان (Price Outliers Detector)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-300 font-sans">
                  <thead className="bg-[#0a1122] text-red-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-2 text-start">کۆدی کاڵا</th>
                      <th className="p-2">هاوردەکار</th>
                      <th className="p-2 text-center">نرخی ڕاگەیەندراو (تۆن)</th>
                      <th className="p-2 text-center">نرخی تێکڕای عێراق</th>
                      <th className="p-2 text-center">ئاستی دوورکەوتنەوە</th>
                      <th className="p-2 text-center">ڕێژەی فێڵکردن</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 font-mono">
                    {AnomalyDetectionEngine.scanForPriceAnomalies('federal').map((anom, idx) => (
                      <tr key={idx}>
                        <td className="p-2 text-start text-emerald-400 font-bold">{anom.hsCode}</td>
                        <td className="p-2 font-sans font-bold text-white">{anom.traderName}</td>
                        <td className="p-2 text-center">${anom.itemDeclaredPricePerTon}</td>
                        <td className="p-2 text-center">${anom.nationalAveragePricePerTon}</td>
                        <td className="p-2 text-center text-red-400 font-bold">-{anom.standardDeviationsBelowMean}σ</td>
                        <td className="p-2 text-center font-sans">
                          <Badge variant="danger">{anom.probabilityOfDeceptionPercent}% متمانە</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Quick action tools */}
          <div className="flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">رێسا سەرکردەکانی دەسپاکی فیدراڵ</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                یاسا چاندراوەکانی سەکۆ دڵنیایی دەدەن لەوەی گواستنەوەی تۆمارەکانی فیدراڵ مۆری نیشتمانی لەسەر بمێنێتەوە و گومرگی فیدراڵی بۆ هەرێم ڕوون و ئاشکرا بێت بە شێوازی هاوتا.
              </p>
              <div className="flex flex-col gap-2.5 text-xs">
                <div className="p-3 bg-[#0a1122] rounded border border-slate-800">
                  <span className="font-bold text-white block mb-0.5">سیستەمی قوفڵدانی داتاکان</span>
                  <span className="text-slate-400 text-[11px]">ڕێگە نادات هیچ پرۆسەیەکی چاکسازی لەسەر ئاستی بەهای گومرگی پێشوو بکرێت ئەگەر تێپەڕیبا بە مۆردا.</span>
                </div>
                <div className="p-3 bg-[#0a1122] rounded border border-slate-800">
                  <span className="font-bold text-white block mb-0.5">بەدواداچوونی گەمژانە</span>
                  <span className="text-slate-400 text-[11px]">بەراوردکردنی چرکەیی داهات لەگەڵ بانکە فەرمییەکان بۆ ئاشکراکردنی جیاوازی دۆسیەی ترانزێت.</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'investigations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="investigations-tab-panel">
          
          {/* Active Cases List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4">لیستی دۆسیە چالاکەکانی سەرپێچی دەسپاکی فیدراڵ</h3>
              <div className="flex flex-col gap-3">
                {cases.map(c => (
                  <div key={c.id} className={`p-4 rounded-lg border transition-all cursor-pointer ${selectedCaseId === c.id ? 'bg-[#18294f] border-red-500/50' : 'bg-[#0a1122] border-slate-850 hover:bg-[#121f3d]'}`} onClick={() => setSelectedCaseId(c.id)}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-red-400">{c.id}</span>
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

            {/* Case Details Expansion */}
            {selectedCaseId && (() => {
              const currentCase = cases.find(c => c.id === selectedCaseId);
              if (!currentCase) return null;
              const caseEvidence = AuditEvidenceEngine.getEvidenceForCase(currentCase.id);

              return (
                <Card className="bg-[#101b35] border-red-500/20 p-6">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Eye className="w-4 h-4 text-red-500" /> بەوردبینی تێڕوانینی دۆسیەی {currentCase.id}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
                    <div className="flex flex-col gap-1.5 p-2.5 bg-[#0a1122] rounded border border-slate-800">
                      <span className="text-slate-400 font-bold">بەرپرسی پێشوو / گومانلێکراو (کارمەند)</span>
                      <span className="text-white font-mono">{currentCase.suspectOfficer || 'UNKNOWN'}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-2.5 bg-[#0a1122] rounded border border-slate-800">
                      <span className="text-slate-400 font-bold">لایهنی بازرگانی گومانلێکراو</span>
                      <span className="text-white">{currentCase.suspectEntity || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Evidence viewer */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">بەڵگە بەستراو و جێگیرکراوەکان:</h4>
                    <div className="flex flex-col gap-2">
                      {caseEvidence.map(ev => (
                        <div key={ev.id} className="p-2.5 bg-[#0a1122] rounded border border-slate-800 text-xs">
                          <div className="flex justify-between mb-1">
                            <span className="font-mono text-emerald-400 font-bold">{ev.id} [{ev.evidenceType}]</span>
                            <span className="text-[10px] text-slate-500">{ev.registeredAt.slice(0, 16)}</span>
                          </div>
                          <strong className="text-white block">{ev.title}</strong>
                          <p className="text-slate-400 text-[11px] mt-0.5">{ev.description}</p>
                          <span className="text-[9px] font-mono text-slate-500 block mt-2">مۆری پارێزراوی فایلی بەڵگە: {ev.secureHash}</span>
                        </div>
                      ))}
                      {caseEvidence.length === 0 && (
                        <div className="text-center text-slate-500 py-3 bg-[#0a1122] rounded border border-slate-800 text-[11px]">تا ئێستا چەند بەڵگەیەکی پەسەندی فەرمی بەم مۆدیولەوە نەنراوە.</div>
                      )}
                    </div>
                  </div>

                  {/* Actions for Case */}
                  <div className="border-t border-slate-800 pt-4 flex flex-wrap gap-2">
                    <div className="flex flex-col gap-1 inline-block">
                      <Input placeholder="ناوی گواستنەوەی ئەفسەر..." value={assigneeName} onChange={(e) => setAssigneeName(e.target.value)} className="bg-[#0a1122] border-slate-800 text-xs h-8" />
                      <Button size="sm" onClick={() => handleAssignCase(currentCase.id)} className="bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-bold text-xs p-1 rounded cursor-pointer mt-1">دیاریکردنی کارمەندی سەرپەرشتیار</Button>
                    </div>

                    <div className="flex gap-1.5 items-end ml-auto">
                      <Button size="sm" onClick={() => handleTransitionStatus(currentCase.id, 'UNDER_REVIEW')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-2.5 py-1.5 rounded cursor-pointer">بخرێتە پێداچوونەوە</Button>
                      <Button size="sm" onClick={() => handleTransitionStatus(currentCase.id, 'ESCALATED')} className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-2.5 py-1.5 rounded cursor-pointer">بەرزکردنەوەی جۆری مەترسی</Button>
                      <Button size="sm" onClick={() => handleTransitionStatus(currentCase.id, 'CLOSED')} className="bg-red-800 hover:bg-red-700 text-white font-bold text-xs px-2.5 py-1.5 rounded cursor-pointer">داخستنی دۆسیە</Button>
                    </div>
                  </div>

                  {/* Add evidence form */}
                  <div className="mt-4 border-t border-slate-800 pt-4 bg-[#0a1122] p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-amber-400 mb-3">تۆمارکردنی بەڵگەیەکی نوێ بۆ ئەم دۆسیەیە:</h4>
                    <div className="flex flex-col gap-3 text-xs">
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-400">ناونیشانی بەڵگە</label>
                        <Input value={evidenceTitle} onChange={(e) => setEvidenceTitle(e.target.value)} placeholder="بۆ نموونە: کۆپی فاکتۆری گومرگی فەرمانی دەروازە" className="bg-[#101b35] border-slate-800 font-sans" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400">جۆری بەڵگە</label>
                          <Select value={evidenceType} onChange={(e) => setEvidenceType(e.target.value as any)} className="bg-[#101b35] border-slate-800">
                            <option value="DOCUMENT">دۆکیومێنت (سەرخاڵ)</option>
                            <option value="HASH_PROOF">مۆری دیجیتاڵ (Hash Block)</option>
                            <option value="IMAGE">وێنەی گرتە و کامێرای گومرگ</option>
                            <option value="LOG_DUMP">لۆگی بنکەی زانیاری داتاکان</option>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-slate-400">تێبینی و ڕوونکردنەوە</label>
                          <Input value={evidenceDesc} onChange={(e) => setEvidenceDesc(e.target.value)} placeholder="وردەکاری چرکەی پشکنین" className="bg-[#101b35] border-slate-800" />
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleAddEvidence(currentCase.id)} className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-1.5 rounded cursor-pointer mt-1">تۆمار لە واژۆی لۆگ دۆک</Button>
                    </div>
                  </div>

                </Card>
              );
            })()}

          </div>

          {/* New Case Creation Form */}
          <Card className="bg-[#101b35] border-slate-800 p-6 h-fit">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
              <Plus className="w-5 h-5 text-red-500" /> تۆمارکردنی کێشەیەکی نوێی سەرپێچی دەسپاکی
            </h3>
            <form onSubmit={handleCreateCase} className="flex flex-col gap-4 text-xs font-sans">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-bold">ناونیشانی دۆسیەی گومانلێکراو</label>
                <Input value={newCaseTitle} onChange={(e) => setNewCaseTitle(e.target.value)} placeholder="بۆ نموونە: هاوردەی کەم-بەهاکراوی پۆڵا لە گومرگ" required className="bg-[#0a1122] border-slate-800 text-xs" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-bold">وەسف و هۆکاری گومان</label>
                <textarea value={newCaseDesc} onChange={(e) => setNewCaseDesc(e.target.value)} placeholder="وردەکاری تەواوی کردەی چاکسازی و بڕی دزە..." required className="bg-[#0a1122] border-slate-800 text-xs text-white p-2 rounded-lg border focus:outline-none focus:border-red-500 h-24 font-sans" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">ئاستی مەترسی</label>
                  <Select value={newCaseSeverity} onChange={(e) => setNewCaseSeverity(e.target.value as any)} className="bg-[#0a1122] border-slate-800 text-xs">
                    <option value="LOW">نزم (LOW)</option>
                    <option value="MEDIUM">ناوەند (MEDIUM)</option>
                    <option value="HIGH">بەرز (HIGH)</option>
                    <option value="CRITICAL">مەترسیدار (CRITICAL)</option>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">کارمەندی گومانلێکراو</label>
                  <Input value={newCaseSusproc} onChange={(e) => setNewCaseSusproc(e.target.value)} placeholder="ژمارەی ناسنامە یان ناو" className="bg-[#0a1122] border-slate-800 font-mono text-xs" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-400 font-bold">کۆمپانیای هاوبەشی بازرگانی</label>
                <Input value={newCaseSusent} onChange={(e) => setNewCaseSusent(e.target.value)} placeholder="کۆمپانیای هاوردەکار یان گوازەرەوە" className="bg-[#0a1122] border-slate-800 text-xs" />
              </div>

              <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-500 py-2.5 font-bold font-sans text-xs rounded-lg cursor-pointer transition-colors mt-2">
                دامەزراندنی دۆسیە
              </Button>
            </form>
          </Card>

        </div>
      )}

      {activeTab === 'leakages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="leakages-tab-panel">
          
          {/* List of active leakage alerts */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4">ئاگادارکەرەوەکانی زیرەکی دۆزەرەوەی دزەکردنی داهات</h3>
              <div className="flex flex-col gap-4">
                {alerts.map(a => (
                  <div key={a.id} className="bg-[#0a1122] p-4 rounded-lg border border-red-500/10 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-500">{a.id}</span>
                        <span className="text-[10px] tracking-wider bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-bold">{a.leakageType}</span>
                      </div>
                      <Badge variant={a.status === 'MITIGATED' ? 'success' : 'danger'}>{a.status}</Badge>
                    </div>
                    <strong className="text-sm text-red-100 block mb-1">{a.title}</strong>
                    <div className="grid grid-cols-3 gap-2 font-mono text-xs my-3 bg-[#101b35] p-3 rounded">
                      <div>
                        <span className="text-[10px] font-sans text-slate-400 block">داهاتی پێشبینیکراو:</span>
                        <span className="text-white font-bold">${a.expectedValueUSD.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-sans text-slate-400 block">داهاتی کۆکراوە:</span>
                        <span className="text-white font-bold">${a.actualCalculatedUSD.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-sans text-slate-400 block">بڕی دزە:</span>
                        <span className="text-red-400 font-bold">${a.leakageAmountUSD.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span>ڕێڕەو: {a.corridorId}</span>
                      <span className="font-mono">کات: {a.detectedAt.replace('T', ' ').slice(0, 19)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Collection gap bank balances */}
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">هاوتاکردنی داهاتی ڕەسەنی بانکی vs دەفتەری گومرگی (Escrow Discrepancies)</h3>
              <div className="overflow-x-auto text-xs font-sans text-slate-300">
                <table className="w-full text-right">
                  <thead className="bg-[#0a1122] text-[#E0A96D] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-2 text-start">سەرچاوەی داهات</th>
                      <th className="p-2 text-center">داهاتی تۆمارکراو</th>
                      <th className="p-2 text-center">بانکی واژۆکراو</th>
                      <th className="p-2 text-center">کەمی و جیاوازی دۆلار</th>
                      <th className="p-2 text-center">ڕێژەی کورتھێنان</th>
                      <th className="p-2 text-center">فاکتۆری بێ مۆر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 font-mono">
                    {collectionGapRecords.map((g, i) => (
                      <tr key={i} className="hover:bg-slate-900/40">
                        <td className="p-2 text-start font-sans font-bold text-white">{g.billingSource}</td>
                        <td className="p-2 text-center">${g.billedUSD.toLocaleString()}</td>
                        <td className="p-2 text-center">${g.clearedBankUSD.toLocaleString()}</td>
                        <td className="p-2 text-center text-red-400 font-bold">-${g.activeGapUSD.toLocaleString()}</td>
                        <td className="p-2 text-center text-amber-400 font-bold">{g.leakagePercentage}%</td>
                        <td className="p-2 text-center font-sans">
                          <Badge variant="warning">{g.unreconciledInvoicesCount} پسووڵە</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

          </div>

          {/* Micro-engines details */}
          <div className="flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">جیاوازی پاوڵێنەکراوی تاریفە گومرگییەکان (Tariff Variance Outliers)</h3>
              <div className="flex flex-col gap-3 font-sans text-xs">
                {tariffVarianceRecords.map((t, idx) => (
                  <div key={idx} className="bg-[#0a1122] p-3 rounded border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-emerald-400">HS:{t.hsCode}</span>
                      <strong className="text-red-400 font-mono">-${t.varianceUSD.toLocaleString()}</strong>
                    </div>
                    <strong className="text-white block">{t.commodityName}</strong>
                    <div className="flex justify-between text-[11px] text-slate-400 my-1 font-mono">
                      <span>ڕەسەن: {t.expectedTariffPercent}%</span>
                      <span>جێبەجێکراو: {t.actualTariffPercent}%</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">" {t.auditorRemarks} "</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      )}

      {activeTab === 'signals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="signals-tab-panel">
          
          {/* Officer Risk Indicators */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4">چاودێری و پۆلێنکردنی نیشانەکانی مەترسی ئەفسەران</h3>
              <div className="flex flex-col gap-4">
                {signals.map(s => (
                  <div key={s.id} className="bg-[#0a1122] p-4 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-red-500">{s.id}</span>
                        <span className="text-[10px] tracking-wider bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded font-bold uppercase">{s.targetType}</span>
                      </div>
                      <Badge variant={s.severity === 'CRITICAL' ? 'danger' : s.severity === 'HIGH' ? 'danger' : 'warning'}>
                        {s.severity} (نمرە: {s.anomalyScore})
                      </Badge>
                    </div>
                    <strong className="text-sm text-white block mb-2">{s.targetName} [ناسنامە: {s.targetId}]</strong>
                    
                    <div className="text-xs my-3 flex flex-col gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block border-b border-slate-800 pb-0.5 mb-1 font-bold">هۆکارەکانی مەترسی:</span>
                        <ul className="list-disc list-inside text-slate-300 space-y-1">
                          {s.riskFactors.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block border-b border-slate-800 pb-0.5 mb-1 font-bold">ئامادەیی نیشاندەرەکانی فەرمی:</span>
                        <ul className="list-disc list-inside text-amber-400 space-y-1">
                          {s.riskIndicators.map((ind, i) => <li key={i} className="font-mono">{ind}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Behavior profiles */}
          <div className="flex flex-col gap-6">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">شیکاری گواستنەوەی ڕەفتار (Behavior Scoring Engine)</h3>
              <div className="flex flex-col gap-3 text-xs font-sans">
                {BehaviorAnalysisEngine.getBehaviorScores('federal').map((b, idx) => (
                  <div key={idx} className="bg-[#0a1122] p-3 rounded border border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-white">{b.subjectName}</strong>
                      <Badge variant={b.overallRiskRating === 'CRITICAL' ? 'danger' : 'warning'}>{b.overallRiskRating}</Badge>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-mono">ناسنامە: {b.subjectId} • {b.roleType}</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-850">
                      <span>کاتی کار: {b.clearanceSpeedMinutes} خولەک</span>
                      <span>سەرپێچی تێپەڕین: {b.averageOverrideRatePercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      )}

      {activeTab === 'ledger' && (
        <Card className="bg-[#101b35] border-slate-800 p-6" id="ledger-tab-panel">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
            <Activity className="w-5 h-5 text-red-500 animate-pulse" /> زنجیرەی تۆمارە نەگۆڕەکان (Immutable Cryptographic Log Ledger)
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-normal">
            ئەم زنجیرەیە بەکاردێت بۆ پاراستنی لۆگەکانی چاکسازی عێڕاقی فیدراڵ بەبێ ئەگەری هیچ لادانێک لە مۆرەکەدا. هەر بلۆکێک بە مۆری بلۆکی پێشوو بەستراوەتەوە.
          </p>
          <div className="overflow-x-auto text-[11px] font-mono">
            <table className="w-full text-right text-slate-300">
              <thead className="bg-[#0a1122] text-[#E0A96D] font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">ناسنامە</th>
                  <th className="p-3 text-center">کات</th>
                  <th className="p-3">کارمەند</th>
                  <th className="p-3 text-center">کردار</th>
                  <th className="p-3 font-sans text-start">وردەکاری پرۆسە</th>
                  <th className="p-3 text-start">مۆری بلۆک (Cryptographic Hash)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {ledger.map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                    <td className="p-3 text-start font-bold text-amber-500">{log.id}</td>
                    <td className="p-3 text-center text-[10px] text-slate-400 font-sans">{log.timestamp.replace('T', ' ').slice(0, 19)}Z</td>
                    <td className="p-3 font-sans font-semibold text-white">{log.actorName}</td>
                    <td className="p-3 text-center"><Badge variant="outline">{log.action}</Badge></td>
                    <td className="p-3 font-sans text-slate-300 text-start">{log.details}</td>
                    <td className="p-3 text-start text-emerald-400 text-[10px]">{log.payloadHash}</td>
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
