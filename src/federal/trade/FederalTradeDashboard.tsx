import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { ImportManagementEngine } from '../../shared/trade/ImportManagementEngine';
import { ExportManagementEngine } from '../../shared/trade/ExportManagementEngine';
import { TradeLicenseEngine } from '../../shared/trade/TradeLicenseEngine';
import { TradeAuditEngine } from '../../shared/trade/TradeAuditEngine';
import { TradeComplianceEngine } from '../../shared/trade/TradeComplianceEngine';
import { TradeRiskEngine } from '../../shared/trade/TradeRiskEngine';
import { TradeIntelligenceEngine } from '../../shared/trade/TradeIntelligenceEngine';
import { TradePartnerRegistry } from '../../shared/trade/TradePartnerRegistry';
import { TradeCorridorEngine } from '../../shared/trade/TradeCorridorEngine';
import { Card, Badge, Button, Input, Select } from '../../ui';
import { BarChart } from '../../ui/BarChart';
import { 
  ShieldAlert, Landmark, Cpu, Database, FileText, Send, Layers, 
  Search, Calculator, AlertTriangle, RefreshCw, CheckCircle2, XCircle, Clock,
  Coins, TrendingUp, Compass, Plus, AlertCircle, Trash2, CheckCircle, Ban
} from 'lucide-react';

export default function FederalTradeDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // Federal authorization control - only authorized entities can view & manage national trade data
  const authorizedRoles = [
    'Federal Prime Minister',
    'Federal Cabinet',
    'Federal Border Authority',
    'Federal Customs Authority',
    'Federal Revenue Authority',
    'Federal Trade Authority'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  // Core Trade States Linked to the Management Engines
  const [imports, setImports] = useState(() => ImportManagementEngine.getDeclarationsByJurisdiction('federal'));
  const [exports, setExports] = useState(() => ExportManagementEngine.getDeclarationsByJurisdiction('federal'));
  const [licenses, setLicenses] = useState(() => TradeLicenseEngine.getLicensesByJurisdiction('federal'));
  const [auditLogs, setAuditLogs] = useState(() => TradeAuditEngine.getLogsByJurisdiction('federal'));
  const [intelligence, setIntelligence] = useState(() => TradeIntelligenceEngine.getIntelligenceList('federal'));

  // Dashboard Tab Configuration
  const [activeTab, setActiveTab] = useState<'analytics' | 'declarations' | 'licenses' | 'intel' | 'audit'>('analytics');
  const [declType, setDeclType] = useState<'IMPORT' | 'EXPORT'>('IMPORT');

  // Form states for new Trade License creation
  const [newLicenseHolderId, setNewLicenseHolderId] = useState('IMP-FED-004');
  const [newLicenseHolderName, setNewLicenseHolderName] = useState('Mesopotamia Trading Group');
  const [newLicenseType, setNewLicenseType] = useState<'IMPORT_LICENSE' | 'EXPORT_LICENSE' | 'TRANSIT_LICENSE' | 'SPECIAL_LICENSE'>('IMPORT_LICENSE');
  const [newLicenseQuota, setNewLicenseQuota] = useState(1000000);
  const [newLicenseCommodities, setNewLicenseCommodities] = useState('10011900, 30049000');

  // Form states for importing / exporting declarations
  const [partnerName, setPartnerName] = useState('Novavaxis Biotech Zug');
  const [corridorId, setCorridorId] = useState('COR-BGW');
  const [hsCode, setHsCode] = useState('30049000');
  const [declaredValue, setDeclaredValue] = useState(250000);
  const [weightTons, setWeightTons] = useState(4.5);

  const reloadData = () => {
    setImports(ImportManagementEngine.getDeclarationsByJurisdiction('federal'));
    setExports(ExportManagementEngine.getDeclarationsByJurisdiction('federal'));
    setLicenses(TradeLicenseEngine.getLicensesByJurisdiction('federal'));
    setAuditLogs(TradeAuditEngine.getLogsByJurisdiction('federal'));
    setIntelligence(TradeIntelligenceEngine.getIntelligenceList('federal'));
  };

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center bg-[#0d1527] border border-red-500/30 rounded-lg max-w-2xl mx-auto my-12" id="auth-unauthorized-layer">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-sans text-red-100 mb-2">کارگێڕیی فیدراڵ: تەنها بۆ کەسانی ڕێگەپێدراو</h2>
        <p className="text-xs font-sans text-slate-400 mb-6 leading-relaxed">
          ئەم سیستمەی خوارەوە بەستراوەتەوە بە گرێی نیشتمانیی زانیارییەکانی بازرگانیی نێودەوڵەتی. ئاستی سەرپەرشتیاری ئێستاتان `{userRole}` مۆڵەتی پێویستی نییە بۆ بینین یان فایلی ڕاپۆرتی لەم کەرتەدا.
        </p>
        <span className="text-[10px] font-mono text-slate-500 block">JURISDICTION_ACCESS_DENIED // SHA_HASH_ENCRYPTED</span>
      </div>
    );
  }

  // Handle License Issuance Form Submission
  const handleIssueLicense = (e: React.FormEvent) => {
    e.preventDefault();
    const authorizedCommodityList = newLicenseCommodities.split(',').map(s => s.trim());
    
    TradeLicenseEngine.issueLicense({
      holderId: newLicenseHolderId,
      holderName: newLicenseHolderName,
      type: newLicenseType,
      issueDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 3600000 * 24 * 365).toISOString(),
      jurisdiction: 'federal',
      authorizedCommodities: authorizedCommodityList,
      approvedQuotaUSD: newLicenseQuota
    });

    logAction('TRADE_LICENSE_ISSUED', { holderName: newLicenseHolderName, quota: newLicenseQuota });
    TradeAuditEngine.logAction(
      userRole,
      'LICENSE_ISSUED',
      newLicenseHolderId,
      'LICENSE',
      `Issued specialized ${newLicenseType} for ${newLicenseHolderName} under federal trade quotas.`
    );

    reloadData();
    alert('مۆڵەتەکە بە سەرکەوتوویی لە لایەن دەسەڵاتی فیدراڵەوە دەرکرا');
  };

  // Handle Declaration Registration
  const handleRegisterDeclaration = (e: React.FormEvent) => {
    e.preventDefault();
    if (declType === 'IMPORT') {
      ImportManagementEngine.registerImport({
        partnerName,
        corridorId,
        hsCode,
        declaredValueUSD: declaredValue,
        weightTons,
        jurisdiction: 'federal',
        actor: userRole
      });
    } else {
      ExportManagementEngine.registerExport({
        partnerName,
        corridorId,
        hsCode,
        declaredValueUSD: declaredValue,
        weightTons,
        jurisdiction: 'federal',
        actor: userRole
      });
    }

    logAction('TRADE_DECLARATION_REGISTRATION', { partnerName, declaredValue });
    reloadData();
    alert('فایلی ڕاگەیاندنی بازرگانی بە سەرکەوتوویی تۆمار کرا و گەشەی مەترسییەکانی پێوانە کرا');
  };

  const handleUpdateStatus = (id: string, regime: 'IMPORT' | 'EXPORT', status: any) => {
    if (regime === 'IMPORT') {
      ImportManagementEngine.updateImportStatus(id, status, userRole);
    } else {
      ExportManagementEngine.updateExportStatus(id, status, userRole);
    }
    reloadData();
  };

  const handleSuspendLicense = (licNum: string) => {
    TradeLicenseEngine.suspendLicense(licNum);
    TradeAuditEngine.logAction(userRole, 'LICENSE_SUSPENDED', licNum, 'LICENSE', 'Federal Ministry of Trade suspended license due to dynamic validation protocols.');
    reloadData();
  };

  const handleRevokeLicense = (licNum: string) => {
    TradeLicenseEngine.revokeLicense(licNum);
    TradeAuditEngine.logAction(userRole, 'LICENSE_REVOKED', licNum, 'LICENSE', 'Federal Ministry of Trade revoked license.');
    reloadData();
  };

  // Compute stats on the fly
  const analyticsSummary = TradeIntelligenceEngine.calculateAggregatedAnalytics('federal');

  // BarChart compatible datasets for dashboard
  const corridorChartData = analyticsSummary.corridorBreakdown.map(item => {
    const c = TradeCorridorEngine.getCorridorById(item.id);
    return {
      label: c ? c.name.split(' ')[0] : item.id,
      value: Math.round(item.value / 1000) // Value in USD Thousands
    };
  });

  const commodityChartData = analyticsSummary.commodityBreakdown.map(item => ({
    label: item.name.split(' ').slice(0, 2).join(' '),
    value: Math.round(item.value / 1000)
  }));

  return (
    <div className="bg-[#0b1329] text-slate-100 min-h-screen p-6 font-sans antialiased" id="federal-trade-dashboard-root">
      {/* Sovereign Header */}
      <div className="border-b border-[#E0A96D]/20 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Landmark className="w-6 h-6 text-[#E0A96D]" />
            <span className="text-[10px] tracking-widest bg-[#E0A96D]/10 text-[#E0A96D] px-2 py-0.5 rounded-full font-bold uppercase">دەسەڵاتی نیشتمانیی فیدراڵ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">کۆنترۆڵی بازرگانیی نێودەوڵەتیی فیدراڵ (Federal Trade Core)</h1>
          <p className="text-xs text-slate-400">سیستمی گشتگیری مۆڵەتەکان، فایلی هاوردە و ناردن و پێنوێنی چاودێری سووڕی ئابووری</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reloadData} className="flex items-center gap-1.5 bg-[#121f3d] hover:bg-[#18294f] border-[#E0A96D]/30 text-white font-sans font-bold text-xs p-2 rounded-lg cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" /> نوێکردنەوەی داتاکان
          </Button>
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg px-3 py-1 text-center">
            <span className="text-[9px] block text-emerald-400 uppercase font-bold tracking-wider">سەروەریی فیدراڵ</span>
            <span className="text-xs font-mono font-bold text-white uppercase">Secured Enclave Active</span>
          </div>
        </div>
      </div>

      {/* Aggregate Stats Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">بڕی تێکڕای هاوردەی فیدراڵ</span>
            <Coins className="w-5 h-5 text-[#E0A96D]" />
          </div>
          <div className="text-xl font-mono font-bold text-white">${analyticsSummary.totalImportsValue.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 mt-1">تێکڕای کێش: <span className="font-mono text-emerald-400">{analyticsSummary.totalImportsWeight.toLocaleString()} تەبەن</span></p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">بڕی تێکڕای ناردنی فیدراڵ</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xl font-mono font-bold text-white">${analyticsSummary.totalExportsValue.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 mt-1">تێکڕای کێش: <span className="font-mono text-[#E0A96D]">{analyticsSummary.totalExportsWeight.toLocaleString()} تەبەن</span></p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">مۆڵەتە چالاکەکانی فیدراڵ</span>
            <Layers className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-xl font-mono font-bold text-white">
            {licenses.filter(l => l.status === 'ACTIVE').length} / {licenses.length}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">هاوردەی فیدراڵی بە فەرمی نوێکراوەتەوە</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">هۆشدارییەکانی کۆمەڵەی بازرگانی</span>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-xl font-mono font-bold text-red-400">
            {analyticsSummary.anomalies.length}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">مەترسی ناوچەیی و سەرپێچی لێکۆڵینەوە</p>
        </div>
      </div>

      {/* Tabs Selection Container */}
      <div className="flex border-b border-slate-800 gap-2 mb-6">
        <button 
          onClick={() => setActiveTab('analytics')} 
          className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'analytics' ? 'border-b-2 border-[#E0A96D] text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}
        >
          شیکاری و ئابووری (Analytics)
        </button>
        <button 
          onClick={() => setActiveTab('declarations')} 
          className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'declarations' ? 'border-b-2 border-[#E0A96D] text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}
        >
          ڕاگەیاندنی نیشتمانی (Declarations)
        </button>
        <button 
          onClick={() => setActiveTab('licenses')} 
          className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'licenses' ? 'border-b-2 border-[#E0A96D] text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}
        >
          مۆڵەتەکانی بازرگانی (Trade Licenses)
        </button>
        <button 
          onClick={() => setActiveTab('intel')} 
          className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'intel' ? 'border-b-2 border-[#E0A96D] text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}
        >
          مەترسی و هەواڵگری (Risk & Intel)
        </button>
        <button 
          onClick={() => setActiveTab('audit')} 
          className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'audit' ? 'border-b-2 border-[#E0A96D] text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}
        >
          هێڵی چاودێریی زنجیرەیی (Audit Trails)
        </button>
      </div>

      {/* Tab Render Content */}
      <div className="grid grid-cols-1 gap-6">
        
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-analytics-panel">
            {/* Charts Component Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#E0A96D]" /> شیکاری دارایی ڕێڕەوەکانی بازرگانیی فیدراڵ (بڕی کەڵەکەبوو بە هەزار دۆلار)
                </h3>
                <div className="flex justify-center items-center py-4 bg-[#0a1122] rounded-lg">
                  <BarChart data={corridorChartData} width={500} height={200} color="#E0A96D" />
                </div>
              </Card>

              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> پۆلێنکردنی بڕی بازرگانیی هاوردە و ناردن بەپێی کاڵاکان (هەزار دۆلار)
                </h3>
                <div className="flex justify-center items-center py-4 bg-[#0a1122] rounded-lg">
                  <BarChart data={commodityChartData} width={500} height={200} color="#52B788" />
                </div>
              </Card>
            </div>

            {/* Strategic Goods Right Column */}
            <div className="flex flex-col gap-6">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" /> چاودێریی کاڵا ستراتیژییە سیادییەکان
                </h3>
                <p className="text-[11px] text-slate-400 mb-4">چاودێری بەردەوامی کاڵا پارێزراو یان دوو-بەکارهێنانەکان لە بازنەی ئابووری عێراقدا.</p>
                <div className="flex flex-col gap-3">
                  {TradeComplianceEngine.getAllCommodities().map(c => (
                    <div key={c.hsCode} className="bg-[#0a1122] p-2.5 rounded border border-slate-850 flex justify-between items-center text-xs font-sans">
                      <div>
                        <span className="font-mono text-[10px] text-slate-500 block">HS: {c.hsCode}</span>
                        <strong className="text-white text-[11px]">{c.name}</strong>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {c.isProhibited && <Badge variant="danger">قەدەغەکراو</Badge>}
                        {c.isRestricted && <Badge variant="warning">کۆتوبەند</Badge>}
                        {c.isDualUse && <Badge variant="gold">دوو-بەکارهێنان</Badge>}
                        {!c.isProhibited && !c.isRestricted && !c.isDualUse && <Badge variant="outline">ئاسایی</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Dynamic Enclave Indicators */}
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-3">هاوبەشە نێودەوڵەتییەکان (Registered Authorities)</h3>
                <div className="flex flex-col gap-2 font-mono text-[11px]">
                  {TradePartnerRegistry.getAllPartners().slice(0, 5).map(p => (
                    <div key={p.id} className="flex justify-between items-center p-2 bg-[#0a1122] rounded">
                      <span className="text-slate-300 font-sans font-semibold">{p.name} <Badge variant="outline">{p.countryCode}</Badge></span>
                      <span className="text-emerald-400 font-bold font-mono">{p.reliabilityRating}% RP</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'declarations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-declarations-panel">
            {/* Filing Form of New Declarations */}
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                <Plus className="w-5 h-5 text-[#E0A96D]" /> فایلی ڕاگەیاندنی نیشتمانیی نوێ
              </h3>
              <form onSubmit={handleRegisterDeclaration} className="flex flex-col gap-4 text-xs font-sans">
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setDeclType('IMPORT')} className={`p-2 rounded font-bold cursor-pointer transition-colors ${declType === 'IMPORT' ? 'bg-[#E0A96D] text-[#0D1B2A]' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'}`}>هاوردەکردن (IMPORT)</button>
                  <button type="button" onClick={() => setDeclType('EXPORT')} className={`p-2 rounded font-bold cursor-pointer transition-colors ${declType === 'EXPORT' ? 'bg-[#E0A96D] text-[#0D1B2A]' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'}`}>ناردن (EXPORT)</button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">ناوی هاوبەشی بازرگانیی نێودەوڵەتی</label>
                  <Input value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required className="bg-[#0a1122] border-slate-800 font-sans text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">ڕێڕەوی گواستنەوە</label>
                    <Select value={corridorId} onChange={(e) => setCorridorId(e.target.value)} className="bg-[#0a1122] border-slate-800 text-xs">
                      {TradeCorridorEngine.getAllCorridors().map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">کۆدی پۆلێنکردنی کاڵا (HS Code)</label>
                    <Select value={hsCode} onChange={(e) => setHsCode(e.target.value)} className="bg-[#0a1122] border-slate-800 text-xs">
                      {TradeComplianceEngine.getAllCommodities().map(c => (
                        <option key={c.hsCode} value={c.hsCode}>{c.hsCode} - {c.category}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">بەهای ڕاگەیەندراو (USD)</label>
                    <Input type="number" value={declaredValue} onChange={(e) => setDeclaredValue(Number(e.target.value))} required className="bg-[#0a1122] border-slate-800 font-mono text-xs" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">کێش بە تەن (Tons)</label>
                    <Input type="number" step="0.01" value={weightTons} onChange={(e) => setWeightTons(Number(e.target.value))} required className="bg-[#0a1122] border-slate-800 font-mono text-xs" />
                  </div>
                </div>

                {/* Pre-calculation compliance and risk values */}
                <div className="bg-[#0a1122] p-3 rounded-lg border border-slate-850 mt-2 flex flex-col gap-2 font-mono text-[10px]">
                  <span className="text-[11px] font-sans font-bold text-[#E0A96D] border-b border-slate-800 pb-1 block">لێکۆڵینەوە و شیکاری پێشوەختە (Pre-Assessment)</span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">نمرەی کۆنترۆڵ:</span>
                    <span className="text-emerald-400 font-bold">{TradeComplianceEngine.runComplianceCheck({ partnerName, hsCode, declaredValueUSD: declaredValue, weightTons }).complianceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ئاستی مەترسی ئابووری:</span>
                    <span className="text-red-400 font-bold">{TradeRiskEngine.calculateRisk({ partnerName, hsCode, declaredValueUSD: declaredValue, weightTons, corridorId }).riskScore}%</span>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#E0A96D] text-slate-900 hover:bg-[#cfa065] py-2 font-bold font-sans text-xs rounded-lg cursor-pointer transition-colors duration-200 mt-2">
                  تۆمارکردن لە دەفتەری نیشتمانی فیدراڵ
                </Button>
              </form>
            </Card>

            {/* List of Registered Imports/Exports */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-3">هاوردە تۆمارکراوەکان لە نێو کەرتی فیدراڵدا (Imports)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs text-slate-300 font-sans">
                    <thead className="bg-[#0a1122] text-[#E0A96D] font-bold text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-2 text-start">ناسنامە</th>
                        <th className="p-2">هاوردەکار / وڵات</th>
                        <th className="p-2">کاڵا</th>
                        <th className="p-2 text-center">بەها (USD)</th>
                        <th className="p-2 text-center">مەترسی</th>
                        <th className="p-2 text-center">کۆنترۆڵ</th>
                        <th className="p-2 text-center">بارودۆخ</th>
                        <th className="p-2 text-center">کارەکان</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {imports.map(imp => (
                        <tr key={imp.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-2 text-start font-mono font-bold text-white">{imp.id}</td>
                          <td className="p-2 font-semibold">{imp.partnerName}</td>
                          <td className="p-2 text-slate-400">{imp.commodity.name}</td>
                          <td className="p-2 text-center font-mono font-bold text-slate-300">${imp.declaredValueUSD.toLocaleString()}</td>
                          <td className="p-2 text-center font-mono">
                            <span className={imp.riskScore > 60 ? 'text-red-400 font-bold' : imp.riskScore > 30 ? 'text-yellow-400' : 'text-emerald-400'}>
                              {imp.riskScore}%
                            </span>
                          </td>
                          <td className="p-2 text-center font-mono text-emerald-400 font-bold">{imp.complianceScore}%</td>
                          <td className="p-2 text-center">
                            <Badge variant={
                              imp.status === 'RELEASED' ? 'success' :
                              imp.status === 'TRANSIT_HOLD' ? 'danger' : 'warning'
                            }>
                              {imp.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex gap-1 justify-center">
                              {imp.status !== 'RELEASED' && (
                                <button onClick={() => handleUpdateStatus(imp.id, 'IMPORT', 'RELEASED')} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded p-1 text-[10px] cursor-pointer">ڕێگە پێدان</button>
                              )}
                              {imp.status !== 'TRANSIT_HOLD' && (
                                <button onClick={() => handleUpdateStatus(imp.id, 'IMPORT', 'TRANSIT_HOLD')} className="bg-red-900 hover:bg-red-850 text-white rounded p-1 text-[10px] cursor-pointer">ڕاگرتن</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-3">ناردنە تۆمارکراوەکان لە بازنەی فیدراڵدا (Exports)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs text-slate-300 font-sans">
                    <thead className="bg-[#0a1122] text-emerald-400 font-bold text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-2 text-start">ناسنامە</th>
                        <th className="p-2">ڕێڕەو / دەستەی ناردن</th>
                        <th className="p-2">کاڵا</th>
                        <th className="p-2 text-center">بەها (USD)</th>
                        <th className="p-2 text-center">ریسک</th>
                        <th className="p-2 text-center">کۆنترۆڵ</th>
                        <th className="p-2 text-center">بارودۆخ</th>
                        <th className="p-2 text-center">کارەکان</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {exports.map(exp => (
                        <tr key={exp.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-2 text-start font-mono font-bold text-white">{exp.id}</td>
                          <td className="p-2 font-semibold">{exp.partnerName}</td>
                          <td className="p-2 text-slate-400">{exp.commodity.name}</td>
                          <td className="p-2 text-center font-mono font-bold text-slate-300">${exp.declaredValueUSD.toLocaleString()}</td>
                          <td className="p-2 text-center font-mono text-red-400">{exp.riskScore}%</td>
                          <td className="p-2 text-center font-mono text-emerald-400 font-bold">{exp.complianceScore}%</td>
                          <td className="p-2 text-center">
                            <Badge variant={exp.status === 'RELEASED' ? 'success' : exp.status === 'TRANSIT_HOLD' ? 'danger' : 'warning'}>
                              {exp.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex gap-1 justify-center">
                              {exp.status !== 'RELEASED' && (
                                <button onClick={() => handleUpdateStatus(exp.id, 'EXPORT', 'RELEASED')} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded p-1 text-[10px] cursor-pointer">ڕێگە پێدان</button>
                              )}
                              {exp.status !== 'TRANSIT_HOLD' && (
                                <button onClick={() => handleUpdateStatus(exp.id, 'EXPORT', 'TRANSIT_HOLD')} className="bg-red-900 hover:bg-red-850 text-white rounded p-1 text-[10px] cursor-pointer">ڕاگرتن</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'licenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-licenses-panel">
            {/* Form for Issuing New License */}
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                <Coins className="w-5 h-5 text-[#E0A96D]" /> دەرکردنی مۆڵەتی بازرگانی نوێ
              </h3>
              <form onSubmit={handleIssueLicense} className="flex flex-col gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">ناسنامەی سەرپەرشتیار / دامەزراوە</label>
                  <Input value={newLicenseHolderId} onChange={(e) => setNewLicenseHolderId(e.target.value)} required className="bg-[#0a1122] border-slate-800 font-mono text-xs" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">ناوی دامەزراوە یان بریکار</label>
                  <Input value={newLicenseHolderName} onChange={(e) => setNewLicenseHolderName(e.target.value)} required className="bg-[#0a1122] border-slate-800 font-sans text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">جۆری مۆڵەتی بازرگانی</label>
                    <Select value={newLicenseType} onChange={(e) => setNewLicenseType(e.target.value as any)} className="bg-[#0a1122] border-slate-800 text-xs">
                      <option value="IMPORT_LICENSE">هاوردەکردنی گشتی</option>
                      <option value="EXPORT_LICENSE">ناردنی گشتی</option>
                      <option value="TRANSIT_LICENSE">ترانزێتی نیشتمانی</option>
                      <option value="SPECIAL_LICENSE">پارێزراو / تایبەت</option>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">بڕی کۆتا (USD)</label>
                    <Input type="number" value={newLicenseQuota} onChange={(e) => setNewLicenseQuota(Number(e.target.value))} required className="bg-[#0a1122] border-slate-800 font-mono text-xs" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">کۆدەکانی ڕێگەپێدراو (کۆما بەکار بێنە)</label>
                  <Input value={newLicenseCommodities} onChange={(e) => setNewLicenseCommodities(e.target.value)} required className="bg-[#0a1122] border-slate-800 font-mono text-xs" />
                </div>

                <Button type="submit" className="w-full bg-[#E0A96D] text-slate-900 hover:bg-[#cfa065] py-2 font-bold font-sans text-xs rounded-lg cursor-pointer transition-colors duration-200 mt-2">
                  پەسەندکردن و واژۆکردنی سیستم بە فەرمی
                </Button>
              </form>
            </Card>

            {/* List of Issued Licenses */}
            <div className="lg:col-span-2">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-3">مۆڵەتنامەکانی هاوردە و ناردنی تۆمارکراو لە بازنەی فیدراڵ</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs text-slate-300 font-sans">
                    <thead className="bg-[#0a1122] text-[#E0A96D] font-bold text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-2 text-start">ژمارەی مۆڵەت</th>
                        <th className="p-2">خاوەن پێناس</th>
                        <th className="p-2">جۆر</th>
                        <th className="p-2 text-center">کۆتا (Quota)</th>
                        <th className="p-2 text-center">بڕی کێشراو</th>
                        <th className="p-2 text-center">بەسەرچوون</th>
                        <th className="p-2 text-center">بارودۆخ</th>
                        <th className="p-2 text-center">سەرپەرشتیاری</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {licenses.map(lic => (
                        <tr key={lic.licenseNumber} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-2 text-start font-mono font-bold text-[#E0A96D]">{lic.licenseNumber}</td>
                          <td className="p-2">
                            <strong className="text-white block">{lic.holderName}</strong>
                            <span className="text-[10px] text-slate-500 font-mono">{lic.holderId}</span>
                          </td>
                          <td className="p-2 font-bold text-[10px]">{lic.type}</td>
                          <td className="p-2 text-center font-mono text-slate-300">${lic.approvedQuotaUSD.toLocaleString()}</td>
                          <td className="p-2 text-center font-mono text-red-400">
                            ${lic.exhaustedQuotaUSD.toLocaleString()}
                            <span className="text-[10px] text-slate-500 block">
                              ({Math.round((lic.exhaustedQuotaUSD / lic.approvedQuotaUSD) * 100)}%)
                            </span>
                          </td>
                          <td className="p-2 text-center text-slate-400 font-mono">{lic.expiryDate.slice(0, 10)}</td>
                          <td className="p-2 text-center">
                            <Badge variant={
                              lic.status === 'ACTIVE' ? 'success' :
                              lic.status === 'SUSPENDED' ? 'warning' : 'danger'
                            }>
                              {lic.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex gap-1 justify-center">
                              {lic.status === 'ACTIVE' && (
                                <button onClick={() => handleSuspendLicense(lic.licenseNumber)} className="bg-amber-600 hover:bg-amber-700 text-white rounded px-1.5 py-0.5 text-[9px] font-bold cursor-pointer transition-colors">ڕاگرتنی کاتی</button>
                              )}
                              {lic.status !== 'REVOKED' && (
                                <button onClick={() => handleRevokeLicense(lic.licenseNumber)} className="bg-red-800 hover:bg-red-850 text-white rounded px-1.5 py-0.5 text-[9px] font-bold cursor-pointer transition-colors">بێبەشکردن</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'intel' && (
          <div className="flex flex-col gap-6" id="tab-intel-panel">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                <Compass className="w-5 h-5 text-red-500" /> سیستمی هۆشیاری و هەواڵگریی بازرگانیی نیشتمانی (Federal Intelligence Reports)
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                ئەم کەرتە نوێنەرایەتی پێنوێنەکانی شیکاریکەری داتاکانی دەستەی فیدراڵ دەکات لەسەر دەروازە جیاوازەکان. هەر ڕاپۆرتێک بە بەستنەوەی ئەباک و پرۆتۆکۆلی پاراستنی سەروەری گەمارۆ واژۆ دەکرێت.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {intelligence.map(intel => (
                  <div key={intel.id} className="bg-[#0a1122] p-4 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#E0A96D]">{intel.id}</span>
                        <Badge variant={intel.severity === 'CRITICAL' ? 'danger' : 'warning'}>{intel.severity}</Badge>
                      </div>
                      <h4 className="text-xs font-bold text-red-100 mb-2 leading-snug">{intel.headline}</h4>
                      <p className="text-[11px] text-slate-400 leading-normal mb-4">"{intel.details}"</p>
                    </div>
                    <div className="border-t border-slate-850 pt-3 mt-2 flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span>دۆزراوەتەوە لە: {intel.sourceEnclave}</span>
                      <span className="text-emerald-400 font-bold">{intel.confidence}% متمانە</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-3">ناسنامەی مەترسی وێنراو (Sovereign Anomaly Indicators)</h3>
              <div className="bg-[#0a1122] p-4 rounded-lg border border-slate-850">
                <div className="flex flex-col gap-2.5">
                  {analyticsSummary.anomalies.map((anomaly, idx) => (
                    <div key={idx} className="flex gap-2 items-start py-2 border-b border-slate-850 last:border-0 font-sans text-xs">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-slate-300 leading-normal">{anomaly}</span>
                    </div>
                  ))}
                  {analyticsSummary.anomalies.length === 0 && (
                    <span className="text-slate-500 text-center font-mono py-4">NO COMPLIANCE ANOMALIES DETECTED WITHIN FEDERAL RECORDSET</span>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'audit' && (
          <Card className="bg-[#101b35] border-slate-800 p-6" id="tab-audit-panel">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
              <Database className="w-5 h-5 text-[#E0A96D]" /> پەرتووکی فەرمی زنجیرەیی پارێزراو - بازرگانیی نیشتمانی
            </h3>
            <p className="text-xs text-slate-400 mb-4">ئەم بەڵگانە گوزارشت لە دەفتەری نەگۆڕ و دابەشکراوی هاوردە و ناردنی عێراق دەکات کە بەپێی ڕێنماییە دەستوورییەکان بە هەماهەنگی یەکگرتوو بەستراوەتەوە.</p>
            <div className="overflow-x-auto text-[11px] font-sans">
              <table className="w-full text-right text-slate-300">
                <thead className="bg-[#0a1122] text-[#E0A96D] font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-start">ناسنامەی چاودێری</th>
                    <th className="p-3 text-center">کاتی کار</th>
                    <th className="p-3">کاربەدەست</th>
                    <th className="p-3 text-center">کردەوە</th>
                    <th className="p-3 text-center">ناسنامەی تۆمار</th>
                    <th className="p-3">وردەکاری دەستووری</th>
                    <th className="p-3 text-start">کلیل و مۆری پارێزراو</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 font-mono">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="p-3 text-start font-bold text-[#E0A96D]">{log.id}</td>
                      <td className="p-3 text-center text-[10px] text-slate-400 font-sans">{log.timestamp.replace('T', ' ').slice(0, 19)}Z</td>
                      <td className="p-3 font-sans font-semibold text-white">{log.actor}</td>
                      <td className="p-3 text-center"><Badge variant="outline">{log.action}</Badge></td>
                      <td className="p-3 text-center text-slate-400">{log.recordId}</td>
                      <td className="p-3 font-sans text-slate-300 text-start">{log.details}</td>
                      <td className="p-3 text-start text-emerald-400 text-[10px]">{log.hash.slice(0, 16)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
