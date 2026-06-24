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

export default function KRGTradeDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // KRG authorization control - only authorized entities can view & manage regional trade data
  const authorizedRoles = [
    'KRG Prime Minister',
    'KRG Cabinet',
    'KRG Border Authority',
    'KRG Customs Authority',
    'KRG Revenue Authority',
    'KRG Trade Authority'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  // Core Trade States Linked to the Management Engines (KRG Scope)
  const [imports, setImports] = useState(() => ImportManagementEngine.getDeclarationsByJurisdiction('krg'));
  const [exports, setExports] = useState(() => ExportManagementEngine.getDeclarationsByJurisdiction('krg'));
  const [licenses, setLicenses] = useState(() => TradeLicenseEngine.getLicensesByJurisdiction('krg'));
  const [auditLogs, setAuditLogs] = useState(() => TradeAuditEngine.getLogsByJurisdiction('krg'));
  const [intelligence, setIntelligence] = useState(() => TradeIntelligenceEngine.getIntelligenceList('krg'));

  // Dashboard Tab Configuration
  const [activeTab, setActiveTab] = useState<'analytics' | 'declarations' | 'licenses' | 'intel' | 'audit'>('analytics');
  const [declType, setDeclType] = useState<'IMPORT' | 'EXPORT'>('IMPORT');

  // Form states for new Trade License creation
  const [newLicenseHolderId, setNewLicenseHolderId] = useState('IMP-KRG-004');
  const [newLicenseHolderName, setNewLicenseHolderName] = useState('Zagros Logistics Erbil');
  const [newLicenseType, setNewLicenseType] = useState<'IMPORT_LICENSE' | 'EXPORT_LICENSE' | 'TRANSIT_LICENSE' | 'SPECIAL_LICENSE'>('IMPORT_LICENSE');
  const [newLicenseQuota, setNewLicenseQuota] = useState(2500000);
  const [newLicenseCommodities, setNewLicenseCommodities] = useState('10011900, 85176200');

  // Form states for importing / exporting declarations
  const [partnerName, setPartnerName] = useState('Sinotech Industrial Group');
  const [corridorId, setCorridorId] = useState('COR-IK');
  const [hsCode, setHsCode] = useState('85176200');
  const [declaredValue, setDeclaredValue] = useState(450000);
  const [weightTons, setWeightTons] = useState(12.6);

  const reloadData = () => {
    setImports(ImportManagementEngine.getDeclarationsByJurisdiction('krg'));
    setExports(ExportManagementEngine.getDeclarationsByJurisdiction('krg'));
    setLicenses(TradeLicenseEngine.getLicensesByJurisdiction('krg'));
    setAuditLogs(TradeAuditEngine.getLogsByJurisdiction('krg'));
    setIntelligence(TradeIntelligenceEngine.getIntelligenceList('krg'));
  };

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center bg-[#0d1527] border border-red-500/30 rounded-lg max-w-2xl mx-auto my-12" id="auth-unauthorized-layer-krg">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-sans text-red-100 mb-2">کارگێڕیی هەرێم: تەنها بۆ کەسانی ڕێگەپێدراو</h2>
        <p className="text-xs font-sans text-slate-400 mb-6 leading-relaxed">
          ئەم سیستمەی خوارەوە بەستراوەتەوە بە گرێی هەرێمیی زانیارییەکانی پاراستنی سەروەریی خزمەتگوزارییە بازرگانییەکان. ئاستی سەرپەرشتیاری ئێستاتان `{userRole}` مۆڵەتی پێویستی نییە بۆ بینین یان فایلی ڕاپۆرتی لەم کەرتەدا.
        </p>
        <span className="text-[10px] font-mono text-slate-500 block">KRG_REGIONAL_ACCESS_DENIED // ENCRYPTED_KEY_CHAIN</span>
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
      jurisdiction: 'krg',
      authorizedCommodities: authorizedCommodityList,
      approvedQuotaUSD: newLicenseQuota
    });

    logAction('KRG_TRADE_LICENSE_ISSUED', { holderName: newLicenseHolderName, quota: newLicenseQuota });
    TradeAuditEngine.logAction(
      userRole,
      'LICENSE_ISSUED',
      newLicenseHolderId,
      'LICENSE',
      `Issued regional ${newLicenseType} for ${newLicenseHolderName} under mountain customs corridor quotas.`
    );

    reloadData();
    alert('مۆڵەتەکە بە سەرکەوتوویی لە لایەن حکومەتی هەرێمی کوردستانەوە دەرکرا');
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
        jurisdiction: 'krg',
        actor: userRole
      });
    } else {
      ExportManagementEngine.registerExport({
        partnerName,
        corridorId,
        hsCode,
        declaredValueUSD: declaredValue,
        weightTons,
        jurisdiction: 'krg',
        actor: userRole
      });
    }

    logAction('KRG_TRADE_DECLARATION_REGISTRATION', { partnerName, declaredValue });
    reloadData();
    alert('فایلی ڕاگەیاندنی بازرگانیی هەرێم تۆمار کرا');
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
    TradeAuditEngine.logAction(userRole, 'LICENSE_SUSPENDED', licNum, 'LICENSE', 'KRG Ministry of Trade suspended license due to regional intelligence reports.');
    reloadData();
  };

  const handleRevokeLicense = (licNum: string) => {
    TradeLicenseEngine.revokeLicense(licNum);
    TradeAuditEngine.logAction(userRole, 'LICENSE_REVOKED', licNum, 'LICENSE', 'KRG Ministry of Trade revoked license after inspection audit failure.');
    reloadData();
  };

  // Compute stats on the fly
  const analyticsSummary = TradeIntelligenceEngine.calculateAggregatedAnalytics('krg');

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
    <div className="bg-[#0b1329] text-slate-100 min-h-screen p-6 font-sans antialiased" id="krg-trade-dashboard-root">
      {/* Sovereign Header */}
      <div className="border-b border-[#E0A96D]/20 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Landmark className="w-6 h-6 text-[#E0A96D]" />
            <span className="text-[10px] tracking-widest bg-amber-500/10 text-amber-500 px-3 py-0.5 rounded-full font-bold uppercase font-sans">کابینەی حکومەتی هەرێمی کوردستان (KRG)</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">دەسەڵاتی کۆنترۆڵکردنی بازرگانیی هەرێمی کوردستان (KRG Trade Core)</h1>
          <p className="text-xs text-slate-400">بەڕێوەبردنی خاڵە سنوورییەکان، پاسەوانی گومرگی ئیبراهیم خەلیل، باشماخ و پەروێزخان بە پاسەوانی هەرێمی</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={reloadData} className="flex items-center gap-1.5 bg-[#121f3d] hover:bg-[#18294f] border-[#E0A96D]/30 text-white font-sans font-bold text-xs p-2 rounded-lg cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" /> نوێکردنەوەی داتاکان
          </Button>
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg px-3 py-1 text-center">
            <span className="text-[9px] block text-amber-400 uppercase font-bold tracking-wider">سەروەریی هەرێم</span>
            <span className="text-xs font-mono font-bold text-white uppercase">Regional Vault Isolated</span>
          </div>
        </div>
      </div>

      {/* Aggregate Stats Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">تێکڕای هاوردەی هەرێم (Imports)</span>
            <Coins className="w-5 h-5 text-[#E0A96D]" />
          </div>
          <div className="text-xl font-mono font-bold text-white">${analyticsSummary.totalImportsValue.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 mt-1">تێکڕای کێش: <span className="font-mono text-emerald-400">{analyticsSummary.totalImportsWeight.toLocaleString()} تەبەن</span></p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">تێکڕای ناردنی هەرێم (Exports)</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xl font-mono font-bold text-white">${analyticsSummary.totalExportsValue.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 mt-1">تێکڕای کێش: <span className="font-mono text-[#E0A96D]">{analyticsSummary.totalExportsWeight.toLocaleString()} تەبەن</span></p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">مۆڵەتە مێژووییەکانی هەرێم</span>
            <Layers className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-xl font-mono font-bold text-white">
            {licenses.filter(l => l.status === 'ACTIVE').length} / {licenses.length}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">هاوردەی کێشراوی سنووری ئیبراهیم خەلیل</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">هۆشدارییەکانی گومرگی هەرێم</span>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-xl font-mono font-bold text-red-400">
            {analyticsSummary.anomalies.length}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">چاودێری پاسەوانی سەر لێواری شاخاوی</p>
        </div>
      </div>

      {/* Tabs Selection Container */}
      <div className="flex border-b border-slate-800 gap-2 mb-6">
        <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'analytics' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>شیکاری و ئابووری (Analytics)</button>
        <button onClick={() => setActiveTab('declarations')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'declarations' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>ڕاگەیاندنی نیشتمانی (Declarations)</button>
        <button onClick={() => setActiveTab('licenses')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'licenses' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>مۆڵەتەکانی هەرێم (Trade Licenses)</button>
        <button onClick={() => setActiveTab('intel')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'intel' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>مەترسی و هەواڵگری (Risk & Intel)</button>
        <button onClick={() => setActiveTab('audit')} className={`px-4 py-2 text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${activeTab === 'audit' ? 'border-b-2 border-amber-500 text-white bg-slate-900/40' : 'text-slate-400 hover:text-slate-200'}`}>هێڵی چاودێری هەرێمی (Audit Trails)</button>
      </div>

      {/* Tab Render Content */}
      <div className="grid grid-cols-1 gap-6">
        
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-analytics-panel-krg">
            {/* Charts Component Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" /> دەروازە چالاکیە بازرگانییەکانی هەرێم (بڕی کەڵەکەبوو بە هەزار دۆلار)
                </h3>
                <div className="flex justify-center items-center py-4 bg-[#0a1122] rounded-lg">
                  <BarChart data={corridorChartData} width={500} height={200} color="#F59E0B" />
                </div>
              </Card>

              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> تێڕوانینی جۆرەکانی کاڵا لە گومرگەکانی زاخۆ و سلێمانی (هەزار دۆلار)
                </h3>
                <div className="flex justify-center items-center py-4 bg-[#0a1122] rounded-lg">
                  <BarChart data={commodityChartData} width={500} height={200} color="#10B981" />
                </div>
              </Card>
            </div>

            {/* Strategic Goods Right Column */}
            <div className="flex flex-col gap-6">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500" /> چاودێریی کاڵا ستراتیژییە سیادییەکان
                </h3>
                <p className="text-[11px] text-slate-400 mb-4">چاودێری بەردەوامی کاڵا پارێزراو یان دوو-بەکارهێنانەکان لە بازنەی ئابووری هەرێمدا.</p>
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
            </div>
          </div>
        )}

        {activeTab === 'declarations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-declarations-panel-krg">
            {/* Filing Form of New Declarations */}
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                <Plus className="w-5 h-5 text-amber-500" /> تۆمارکردنی دانپێدانانی نوێی کاڵا
              </h3>
              <form onSubmit={handleRegisterDeclaration} className="flex flex-col gap-4 text-xs font-sans">
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setDeclType('IMPORT')} className={`p-2 rounded font-bold cursor-pointer transition-colors ${declType === 'IMPORT' ? 'bg-amber-500 text-[#0D1B2A]' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'}`}>هاوردەکردن (IMPORT)</button>
                  <button type="button" onClick={() => setDeclType('EXPORT')} className={`p-2 rounded font-bold cursor-pointer transition-colors ${declType === 'EXPORT' ? 'bg-amber-500 text-[#0D1B2A]' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'}`}>ناردن (EXPORT)</button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">ناوی هاوبەشی بازرگانیی نێودەوڵەتی</label>
                  <Input value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required className="bg-[#0a1122] border-slate-800 font-sans text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">ڕێڕەوی گواستنەوە</label>
                    <Select value={corridorId} onChange={(e) => setCorridorId(e.target.value)} className="bg-[#0a1122] border-slate-800 text-xs">
                      {TradeCorridorEngine.getAllCorridors().filter(c => c.operatingJurisdiction === 'krg').map(c => (
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
                  <span className="text-[11px] font-sans font-bold text-amber-400 border-b border-slate-800 pb-1 block">لێکۆڵینەوە و شیکاری مەترسی هەرێم</span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">نمرەی کۆنترۆڵ:</span>
                    <span className="text-emerald-400 font-bold">{TradeComplianceEngine.runComplianceCheck({ partnerName, hsCode, declaredValueUSD: declaredValue, weightTons }).complianceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ریسک:</span>
                    <span className="text-amber-400 font-bold">{TradeRiskEngine.calculateRisk({ partnerName, hsCode, declaredValueUSD: declaredValue, weightTons, corridorId }).riskScore}%</span>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-amber-500 text-[#0d1527] hover:bg-amber-600 py-2 font-bold font-sans text-xs rounded-lg cursor-pointer transition-colors duration-200 mt-2">
                  تۆمارکردن لە دەفتەری هەرێمی کوردستان
                </Button>
              </form>
            </Card>

            {/* List of Registered Imports/Exports */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-3">هاوردە تۆمارکراوەکان لە دەوڵەتی هەرێمدا (Imports)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs text-slate-300 font-sans">
                    <thead className="bg-[#0a1122] text-[#E0A96D] font-bold text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-2 text-start">ناسنامە</th>
                        <th className="p-2">هاوردەکار / وڵات</th>
                        <th className="p-2">کاڵا</th>
                        <th className="p-2 text-center">بەها (USD)</th>
                        <th className="p-2 text-center">ریسک</th>
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
                <h3 className="text-sm font-bold text-white mb-3">ناردنە تۆمارکراوەکان لە لایەن هەرێمەوە (Exports)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs text-slate-300 font-sans">
                    <thead className="bg-[#0a1122] text-emerald-400 font-bold text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-2 text-start">ناسنامە</th>
                        <th className="p-2">ڕێڕەو / دەستەی ناردن</th>
                        <th className="p-2">کاڵا</th>
                        <th className="p-2 text-center">بەها (USD)</th>
                        <th className="p-2 text-center">میزان ریسک</th>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tab-licenses-panel-krg">
            {/* Form for Issuing New License */}
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                <Coins className="w-5 h-5 text-amber-500" /> دەرکردنی مۆڵەتی نوێ
              </h3>
              <form onSubmit={handleIssueLicense} className="flex flex-col gap-4 text-xs font-sans">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">ناسنامەی سەرپەرشتیار / دامەزراوە</label>
                  <Input value={newLicenseHolderId} onChange={(e) => setNewLicenseHolderId(e.target.value)} required className="bg-[#0a1122] border-slate-800 font-mono text-xs" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-400 font-bold">ناوی ئەنجومەن یان بریکار</label>
                  <Input value={newLicenseHolderName} onChange={(e) => setNewLicenseHolderName(e.target.value)} required className="bg-[#0a1122] border-slate-800 font-sans text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold">جۆری مۆڵەت</label>
                    <Select value={newLicenseType} onChange={(e) => setNewLicenseType(e.target.value as any)} className="bg-[#0a1122] border-slate-800 text-xs">
                      <option value="IMPORT_LICENSE">هاوردەی هەرێمی</option>
                      <option value="EXPORT_LICENSE">ناردنی گومرگی هەرێم</option>
                      <option value="TRANSIT_LICENSE">ترانزێتی پارێزراوی سنور</option>
                      <option value="SPECIAL_LICENSE">مۆڵەتی تایبەت (تایبەت)</option>
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

                <Button type="submit" className="w-full bg-amber-500 text-[#0d1527] hover:bg-amber-600 py-2 font-bold font-sans text-xs rounded-lg cursor-pointer transition-colors duration-200 mt-2">
                  واژۆکردن و ناردن بۆ گومرگەکان
                </Button>
              </form>
            </Card>

            {/* List of Issued Licenses */}
            <div className="lg:col-span-2">
              <Card className="bg-[#101b35] border-slate-800 p-6">
                <h3 className="text-sm font-bold text-white mb-3">مۆڵەتنامەکانی هاوردە و ناردنی تۆمارکراو لە بازنەی هەرێم</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs text-slate-300 font-sans">
                    <thead className="bg-[#0a1122] text-[#E0A96D] font-bold text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-2 text-start">ژمارەی مۆڵەت</th>
                        <th className="p-2">خاون مۆڵەت</th>
                        <th className="p-2">جۆر</th>
                        <th className="p-2 text-center">کۆتا (Quota)</th>
                        <th className="p-2 text-center">بڕی بەکارهێنراو</th>
                        <th className="p-2 text-center">بەسەرچوون</th>
                        <th className="p-2 text-center">بارودۆخ</th>
                        <th className="p-2 text-center">کردەوەکان</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {licenses.map(lic => (
                        <tr key={lic.licenseNumber} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-2 text-start font-mono font-bold text-amber-400">{lic.licenseNumber}</td>
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
          <div className="flex flex-col gap-6" id="tab-intel-panel-krg">
            <Card className="bg-[#101b35] border-slate-800 p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                <Compass className="w-5 h-5 text-red-500" /> سیستمی زانیاری و هۆشیاری بازرگانیی هەرێم (Regional Intelligence)
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                ئەم پلاتفۆرمە داتاکانی سەرپەرشتی کراوی گشت ڕێڕەوەکانی کەی ئاڕ جی شیدەکاتەوە بۆ پاراستنی چەکوشەوانی ئابووریی هەرێمی کوردستان.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {intelligence.map(intel => (
                  <div key={intel.id} className="bg-[#0a1122] p-4 rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono font-bold text-amber-400">{intel.id}</span>
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
              <h3 className="text-sm font-bold text-white mb-3">هۆشدارییەکانی سەرپێچیی بازرگانیی گومرگی هەرێم</h3>
              <div className="bg-[#0a1122] p-4 rounded-lg border border-slate-850">
                <div className="flex flex-col gap-2.5">
                  {analyticsSummary.anomalies.map((anomaly, idx) => (
                    <div key={idx} className="flex gap-2 items-start py-2 border-b border-slate-850 last:border-0 font-sans text-xs">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-slate-300 leading-normal">{anomaly}</span>
                    </div>
                  ))}
                  {analyticsSummary.anomalies.length === 0 && (
                    <span className="text-slate-500 text-center font-mono py-4">NO COMPLIANCE ANOMALIES DETECTED WITHIN KRG RECORDSET</span>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'audit' && (
          <Card className="bg-[#101b35] border-slate-800 p-6" id="tab-audit-panel-krg">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5">
              <Database className="w-5 h-5 text-amber-500" /> مۆری مێژوویی کاروباری بازرگانیی کەی ئاڕ جی (Immutable Regional Ledger)
            </h3>
            <p className="text-xs text-slate-400 mb-4">چاودێری زنجیرەیی کە گۆڕانکارییەکانی ناوخۆی مۆڵەتە سنوورییەکان بە پارێزراوی تۆمار دەکات.</p>
            <div className="overflow-x-auto text-[11px] font-sans">
              <table className="w-full text-right text-slate-300">
                <thead className="bg-[#0a1122] text-[#E0A96D] font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-start">ناسنامە</th>
                    <th className="p-3 text-center">کاتی کار</th>
                    <th className="p-3">کاربەدەست</th>
                    <th className="p-3 text-center">کارە</th>
                    <th className="p-3 text-center">ناسنامەی تۆمار</th>
                    <th className="p-3 font-sans text-start">شێواز</th>
                    <th className="p-3 text-start">مۆری پارێزراو (Hash Key)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 font-mono">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-900/30 transition-colors">
                      <td className="p-3 text-start font-bold text-amber-400">{log.id}</td>
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
