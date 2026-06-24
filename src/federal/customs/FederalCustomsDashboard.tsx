import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { HSCodeRegistry, HSCodeDefinition } from '../../shared/customs/HSCodeRegistry';
import { TariffCalculationEngine } from '../../shared/customs/TariffCalculationEngine';
import { FederalCustomsDeclarationEngine } from '../customs/core/CustomsDeclarationEngine';
import { FederalCustomsRevenueLedger } from '../customs/core/CustomsRevenueLedger';
import { FederalCustomsAuditEngine } from '../customs/core/CustomsAuditEngine';
import { Card, Badge, Button } from '../../ui';
import { 
  ShieldAlert, Landmark, Cpu, Database, FileText, Send, Layers, 
  Search, Calculator, AlertTriangle, RefreshCw, CheckCircle2, XCircle, Clock
} from 'lucide-react';

export default function FederalCustomsDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // Federal compliance authentication
  const authorizedRoles = [
    'Federal Prime Minister',
    'Federal Cabinet',
    'Federal Border Authority',
    'Federal Customs Authority',
    'Federal Revenue Authority',
    'Federal Trade Authority',
    'Federal Customs Auditor'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  // States
  const [declarations, setDeclarations] = useState(() => FederalCustomsDeclarationEngine.getAllDeclarations());
  const [ledgerStats, setLedgerStats] = useState(() => FederalCustomsRevenueLedger.getStats());
  const [auditLogs, setAuditLogs] = useState(() => FederalCustomsAuditEngine.getAllEvents());
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'ledger' | 'audit'>('list');

  // New Declaration Form States
  const [formHsCode, setFormHsCode] = useState('87032330');
  const [formRegime, setFormRegime] = useState<'IMPORT' | 'EXPORT' | 'TRANSIT' | 'TEMPORARY_ENTRY' | 'TEMPORARY_EXIT'>('IMPORT');
  const [formImporter, setFormImporter] = useState('');
  const [formExporter, setFormExporter] = useState('');
  const [formValUSD, setFormValUSD] = useState<number>(35000);
  const [formWeightTons, setFormWeightTons] = useState<number>(5.2);
  const [formDesc, setFormDesc] = useState('');
  const [formExempt, setFormExempt] = useState(false);
  const [formManifestId, setFormManifestId] = useState('');

  // Search HS Codes state
  const [hsSearchQuery, setHsSearchQuery] = useState('');
  const foundHsCodes = HSCodeRegistry.searchByCodeOrName(hsSearchQuery, 'ku');

  // Real-time duty simulator state
  const tempCalcResult = TariffCalculationEngine.calculateTariff({
    hsCode: formHsCode,
    declaredValueUSD: formValUSD,
    weightTons: formWeightTons,
    isSpecialExemption: formExempt
  }, 'federal');

  // Transition tool state
  const [selectedDeclId, setSelectedDeclId] = useState<string | null>(null);
  const [transitionStatus, setTransitionStatus] = useState<'pending' | 'inspection' | 'approved' | 'rejected' | 'held' | 'released'>('approved');
  const [transitionNotes, setTransitionNotes] = useState('');

  const handleCreateDecl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImporter.trim() || !formExporter.trim()) return;

    const newDecl = FederalCustomsDeclarationEngine.createDeclaration({
      hsCode: formHsCode,
      regime: formRegime,
      importerName: formImporter,
      exporterName: formExporter,
      declaredValueUSD: formValUSD,
      weightTons: formWeightTons,
      description: formDesc || `Federal ${formRegime} shipment of code ${formHsCode}`,
      isExempt: formExempt,
      manifestId: formManifestId
    }, userRole);

    logAction(
      userRole,
      `پەسەندکردنی نوێترین بەیاننامەی گومرگی فیدراڵی: ${newDecl.id} بۆ کۆمپانیای ${newDecl.importerName}`,
      'FEDERAL_CUSTOMS_DECLARATION_CREATED'
    );

    // Refresh views
    setDeclarations(FederalCustomsDeclarationEngine.getAllDeclarations());
    setLedgerStats(FederalCustomsRevenueLedger.getStats());
    setAuditLogs(FederalCustomsAuditEngine.getAllEvents());

    // Reset Form
    setFormImporter('');
    setFormExporter('');
    setFormDesc('');
    setFormManifestId('');
    setActiveTab('list');
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeclId) return;

    const updated = FederalCustomsDeclarationEngine.updateStatus(
      selectedDeclId,
      transitionStatus,
      userRole,
      transitionNotes || undefined
    );

    if (updated) {
      logAction(
        userRole,
        `گۆڕینی باری یاسایی گومرگی بەیاننامە ${selectedDeclId} بۆ [${transitionStatus}]`,
        'FEDERAL_CUSTOMS_STATUS_TRANSITION'
      );
      
      setDeclarations(FederalCustomsDeclarationEngine.getAllDeclarations());
      setLedgerStats(FederalCustomsRevenueLedger.getStats());
      setAuditLogs(FederalCustomsAuditEngine.getAllEvents());
      
      setSelectedDeclId(null);
      setTransitionNotes('');
    }
  };

  if (!isAuthorized) {
    return (
      <Card className="border border-rose-950 bg-rose-950/20 p-8 rounded-xl text-start">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-950 border border-rose-900 rounded-lg text-rose-400 shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-300 font-sans">بەرگری توند: ڕۆڵی نایاسایی (Federal Customs Access Revoked)</h3>
            <p className="text-sm text-rose-400/90 mt-2 leading-relaxed font-sans">
              سیستەمی گومرگی ناوەندی فیدراڵ: چوونە ناوەوەی ڕۆڵی <b>[{userRole}]</b> ڕاگیراوە بە ڕێسای دابەشکردنی نیشتمانیی. فەرمانبەرانی هەرێم و لێژەی هاوبەش ناتوانن داتاکانی گومرگی سەروەرانەی عێراق ببینن.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-rose-950/50 text-xs font-mono text-slate-400">
              CUSTOMS_ENFORCEMENT: federal_isolated_control • POLICIES: COMPLIANCE_SECURITY_RBAC
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">

      {/* Header Banner */}
      <Card className="bg-[#0b1329]/95 border-teal-950 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-950 border border-teal-800 rounded-lg text-teal-400 shrink-0">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-sans font-bold text-slate-100 tracking-tight flex items-center gap-2">
                بەڕێوەبەرایەتی گشتی گومرگەکانی فیدراڵی عێراق
                <Badge variant="teal">کۆنتڕۆڵی ناوەند</Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                بەکارهێنانی سیستەمی بڕیاردانی ناوەندی بۆ تۆمارکردنی بەیاننامە گومرگیەکان، دۆزینەوەی HS code، نرخاندنی تاریفەکان و تۆمارکردنی داهاتی فیدراڵی.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="teal" className="px-3 py-1 font-mono">{userRole}</Badge>
          </div>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'list' ? 'bg-teal-950 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            بەیاننامە تۆمارکراوەکان ({declarations.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'create' ? 'bg-teal-950 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            تۆمارکردنی بەیاننامەی نوێ
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'ledger' ? 'bg-teal-950 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            خەزێنە و داهاتی گومرگی فیدراڵ
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'audit' ? 'bg-teal-950 text-teal-400 border border-teal-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            وردبینی و چاودێری مێژوو
          </button>
        </div>

        <div className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-900">
          SECURE_VAULT: federal-customs-active
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Declarations Table */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                بەیاننامەکانی لەژێر چاودێری حکومەتی فیدراڵدا
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">کۆدی ناسنامە</th>
                      <th className="p-3 text-start">هاوردەکار / وڵات</th>
                      <th className="p-3 text-start">کاڵا (HS)</th>
                      <th className="p-3 text-start">تێکڕای بەها</th>
                      <th className="p-3 text-start">باری یاسایی</th>
                      <th className="p-3 text-center">کردارەکان</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {declarations.map(decl => (
                      <tr key={decl.id} className="hover:bg-slate-900/20 font-mono text-[11px]">
                        <td className="p-3 font-bold text-slate-200">{decl.id}</td>
                        <td className="p-3 text-slate-400">
                          <span className="font-bold text-slate-300 block font-sans">{decl.importerName}</span>
                          <span className="text-[10px] text-slate-500 block">{decl.regime} • {decl.weightTons} tons</span>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-teal-400 border-teal-950 font-bold">{decl.hsCode}</Badge>
                        </td>
                        <td className="p-3 text-emerald-400 font-bold">${decl.declaredValueUSD.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge 
                            variant={
                              decl.status === 'approved' || decl.status === 'released' ? 'success' :
                              decl.status === 'rejected' || decl.status === 'held' ? 'danger' : 'warning'
                            }
                            className="capitalize"
                          >
                            {decl.status}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedDeclId(decl.id)}
                            className="px-2 py-1 rounded bg-teal-900/50 hover:bg-teal-900 text-teal-400 hover:text-teal-300 text-[10px] font-sans font-bold transition cursor-pointer"
                          >
                            بەڕێوەبردن
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar - Management Flow */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {selectedDeclId ? (
              <Card className="bg-[#0b1329]/90 border-teal-900/50 p-5 rounded-xl border">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
                  <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                    گۆڕینی باری یاسایی: {selectedDeclId}
                  </h4>
                  <button onClick={() => setSelectedDeclId(null)} className="text-slate-500 hover:text-white text-xs cursor-pointer">داخستن</button>
                </div>

                <form onSubmit={handleUpdateStatus} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">باری یاسایی نوێ</label>
                    <select
                      value={transitionStatus}
                      onChange={(e) => setTransitionStatus(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="pending">Pending (چاوەڕوانکراو)</option>
                      <option value="inspection">Inspection (لەژێر پشکنیندا)</option>
                      <option value="approved">Approved (پەسەندکراو)</option>
                      <option value="rejected">Rejected (ڕەتکراو)</option>
                      <option value="held">Held (دەستبەسەرا گیراو)</option>
                      <option value="released">Released (ڕێگە پێدراو بۆ مۆرکردن)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">ڕێنمایی و لێدوان</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="لەسەر چ ڕێسا و نیشانەیەکی وردبینی ئەم بڕیارە درا؟"
                      value={transitionNotes}
                      onChange={(e) => setTransitionNotes(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-1.5 rounded bg-teal-600 hover:bg-teal-700 text-slate-900 text-xs font-bold font-sans transition cursor-pointer"
                  >
                    سەپاندنی بڕیار و واژۆکردن
                  </button>
                </form>
              </Card>
            ) : (
              <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-slate-400 text-center py-12">
                <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-xs font-sans">یەکێک لە بەیاننامەکان دیاریبکە بۆ گۆڕینی دۆخی پشکنین و واژۆکردنی فەرمی.</p>
              </Card>
            )}

            {/* Quick Overview Stats */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">کۆی گەرەنتییە فیدراڵییەکان</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-sans">تێکڕای کار مامەڵ پێکراوەکان:</span>
                  <span className="text-slate-200 font-mono font-bold">{declarations.length} بەیاننامە</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-sans">کۆی کۆدە پەسەندکراوەکان:</span>
                  <span className="text-teal-400 font-mono font-bold">
                    {declarations.filter(d => d.status === 'released' || d.status === 'approved').length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-sans">کۆی کارەکانی لەژێر مۆرکردندا:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {declarations.filter(d => d.status === 'inspection' || d.status === 'pending').length}
                  </span>
                </div>
              </div>
            </Card>
          </div>

        </div>
      )}

      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Create Declaration Form */}
          <div className="lg:col-span-7">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-teal-400" />
                پڕکردنەوەی فۆرمی مانیفێستی نوێ
              </h3>

              <form onSubmit={handleCreateDecl} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">هاوردەکار یان نوێنەرایەتی بازرگانی</label>
                  <input
                    type="text"
                    required
                    placeholder="نموونە: كۆمپانیای عێراقی گشتی"
                    value={formImporter}
                    onChange={(e) => setFormImporter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">ناردنکار یان لایەنی دەرەکی</label>
                  <input
                    type="text"
                    required
                    placeholder="نموونە: Ford Export Corp USA"
                    value={formExporter}
                    onChange={(e) => setFormExporter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">مەکۆ و نەخۆشەی بار (Regime)</label>
                  <select
                    value={formRegime}
                    onChange={(e) => setFormRegime(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="IMPORT">IMPORT (هاوردەکردن)</option>
                    <option value="EXPORT">EXPORT (ناردنەدەرەوە)</option>
                    <option value="TRANSIT">TRANSIT (گواستنەوەی نیشتمانی)</option>
                    <option value="TEMPORARY_ENTRY">TEMPORARY ENTRY (هێنانە ناوەوەی کاتی)</option>
                    <option value="TEMPORARY_EXIT">TEMPORARY EXIT (بردنەدەرەوەی کاتی)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">دیاریکردنی HS Code</label>
                  <select
                    value={formHsCode}
                    onChange={(e) => setFormHsCode(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                  >
                    {Object.values(HSCodeRegistry).map(code => (
                      <option key={(code as any).code} value={(code as any).code}>{(code as any).code} - {(code as any).descriptionEn.substring(0, 45)}...</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">بەهای بار بە دۆلار (USD Declared Value)</label>
                  <input
                    type="number"
                    required
                    value={formValUSD}
                    onChange={(e) => setFormValUSD(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">کێش بە تەن (Weight in Tons)</label>
                  <input
                    type="number"
                    required
                    value={formWeightTons}
                    onChange={(e) => setFormWeightTons(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">ژمارەی مانیفێستی سنوور کە داتا لەسەری نێردراوە (بارکۆد)</label>
                  <input
                    type="text"
                    placeholder="بۆ نموونە: MNF-UMMQASR-90112"
                    value={formManifestId}
                    onChange={(e) => setFormManifestId(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">وەسف و ناوەڕۆکی بارەکە</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="چی عەمبار کراوە لە ناو بارەکە..."
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="flex items-center gap-2 mt-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="exempt-fed"
                    checked={formExempt}
                    onChange={(e) => setFormExempt(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-teal-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="exempt-fed" className="text-xs text-slate-400 select-none cursor-pointer">
                    پەسەندکردنی لێبوردنی گشتی (MOH/MOD Priority Official Exemption)
                  </label>
                </div>

                <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-slate-900 text-xs font-bold font-sans transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    تۆمارکردن لە مانیفێستی فیدراڵی
                  </button>
                </div>
              </form>
            </Card>
          </div>

          {/* Calculator Simulator Widget */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-teal-950 p-5 rounded-xl border">
              <h3 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest border-b border-slate-850 pb-2 mb-4 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                هاوتاکردنی نرخ لە کاتی ڕاستەقینەدا (Real-Time Duties)
              </h3>

              <div className="space-y-4">
                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">کۆت گونجانی باج (Base Duty):</span>
                  <span className="text-emerald-400 font-bold font-mono">${tempCalcResult.baseDutyUSD.toLocaleString()}</span>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">تێچووی کۆنتڕۆڵ و سکێنەر:</span>
                  <span className="text-slate-200 font-bold font-mono">${tempCalcResult.borderServiceFeeUSD.toLocaleString()}</span>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">غەرامەی هەڵە و پابەندنەبوون (Penalties):</span>
                  <span className={`font-bold font-mono ${tempCalcResult.penaltyFeeUSD > 0 ? 'text-rose-400 animate-pulse' : 'text-slate-555'}`}>
                    ${tempCalcResult.penaltyFeeUSD.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-900/50 flex justify-between items-center text-xs mt-6">
                  <div>
                    <span className="text-slate-300 block font-sans font-bold">کۆی خەمڵێنراوی گشتی</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Effective Rate: {tempCalcResult.effectiveRate}%</span>
                  </div>
                  <span className="text-emerald-400 text-lg font-extrabold font-mono">${tempCalcResult.totalTariffUSD.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* HS Code lookup mini-widget */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-xs">
              <h4 className="font-bold text-slate-300 mb-3 block">گەڕان و چاودێری کۆدە جیهانییەکان (HS Database)</h4>
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="گەڕان بەپێی کۆد یان ناوی کاڵا..."
                  value={hsSearchQuery}
                  onChange={(e) => setHsSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-8 py-1 text-xs text-slate-200 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                {foundHsCodes.slice(0, 4).map(code => (
                  <div key={code.code} className="p-2 bg-slate-950 rounded border border-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-teal-400 font-bold block">{code.code}</span>
                      <span className="text-[9px] text-slate-400 block">{code.descriptionKu}</span>
                    </div>
                    <Badge variant="teal" className="font-mono">{(code.defaultDutyRate * 100)}%</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      )}

      {activeTab === 'ledger' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Revenue Ledger Stats */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                تێکڕای دارایی و داهاتەکان
              </h3>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">کۆی کۆکراوەی تاریف نیشتمانی (Total Tarif USD)</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono block mt-1">${ledgerStats.totalRevenueUSD.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">کۆی باجە بنەڕەتییەکان (Base Duties)</span>
                  <span className="text-lg font-bold text-slate-300 font-mono block mt-1">${ledgerStats.baseDutiesUSD.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">کۆی تێچووەکانی سەر سنوور (Border Fees)</span>
                  <span className="text-lg font-bold text-slate-300 font-mono block mt-1">${ledgerStats.borderFeesUSD.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">غەرامەدەرانی تۆمارکراو (Collected Fines/Penalties)</span>
                  <span className="text-lg font-bold text-rose-400 font-mono block mt-1">${ledgerStats.penaltiesUSD.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Ledger Receipts Table */}
          <div className="lg:col-span-8">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                تۆماری فەرمی پسوولەکانی باج و گومرگ (Revenue Receipts)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">کۆدی پسوولە</th>
                      <th className="p-3 text-start">بەیاننامە</th>
                      <th className="p-3 text-start">کۆی گەرەنتی کراو</th>
                      <th className="p-3 text-start">کاتی تۆمارکردن</th>
                      <th className="p-3 text-center">بانکی ناوەندی (CBI)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {FederalCustomsRevenueLedger.getLedgerLogs().map(log => (
                      <tr key={log.id} className="hover:bg-slate-900/20 font-mono text-[11px]">
                        <td className="p-3 font-bold text-teal-400">{log.id}</td>
                        <td className="p-3 text-slate-400">{log.declarationId}</td>
                        <td className="p-3 text-emerald-400 font-bold">${log.totalCollectedUSD.toLocaleString()}</td>
                        <td className="p-3 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                        <td className="p-3 text-center">
                          <Badge variant={log.settledWithCentralBank ? 'success' : 'warning'}>
                            {log.settledWithCentralBank ? 'Settled (هاوسەنگکراو)' : 'Pending Settlement'}
                          </Badge>
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

      {activeTab === 'audit' && (
        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
            تۆماری مێژوویی و پاراستنی گومرگی فیدراڵی (Immutable Verification Audit Ledger)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-300">
              <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">کۆدی وردبینی</th>
                  <th className="p-3 text-start">ناسنامەی دۆکیۆمێنت</th>
                  <th className="p-3 text-start">بەرپرس / واژۆکار</th>
                  <th className="p-3 text-start">بەرداشتی کردارەکە</th>
                  <th className="p-3 text-center">باری گۆڕاو</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-mono">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/20 text-[11px]">
                    <td className="p-3 text-slate-500">{log.id}</td>
                    <td className="p-3 font-bold text-slate-300">{log.declarationId}</td>
                    <td className="p-3 text-teal-400 font-bold">{log.actor}</td>
                    <td className="p-3 text-slate-400 font-sans leading-relaxed">{log.actionDetails}</td>
                    <td className="p-3 text-center text-[10px]">
                      <span className="text-slate-500">{log.previousStatus}</span>
                      <span className="mx-1 text-slate-600">→</span>
                      <Badge variant="teal" className="text-[10px]">{log.newStatus}</Badge>
                    </td>
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
