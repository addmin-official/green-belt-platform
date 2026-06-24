import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { HSCodeRegistry, HSCodeDefinition } from '../../shared/customs/HSCodeRegistry';
import { TariffCalculationEngine } from '../../shared/customs/TariffCalculationEngine';
import { KRGCustomsDeclarationEngine } from '../customs/core/CustomsDeclarationEngine';
import { KRGCustomsRevenueLedger } from '../customs/core/CustomsRevenueLedger';
import { KRGCustomsAuditEngine } from '../customs/core/CustomsAuditEngine';
import { Card, Badge, Button } from '../../ui';
import { 
  ShieldAlert, Landmark, Cpu, Database, FileText, Send, Layers, 
  Search, Calculator, AlertTriangle, RefreshCw, CheckCircle2, XCircle, Clock
} from 'lucide-react';

export default function KRGCustomsDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // KRG regional compliance authentication
  const authorizedRoles = [
    'Prime Minister of Kurdistan Region',
    'KRG Prime Minister',
    'KRG Cabinet',
    'KRG Border Authority',
    'KRG Customs Authority',
    'KRG Revenue Authority',
    'KRG Trade Authority',
    'KRG Customs Inspector',
    'KRG PKI Authority'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  // States
  const [declarations, setDeclarations] = useState(() => KRGCustomsDeclarationEngine.getAllDeclarations());
  const [ledgerStats, setLedgerStats] = useState(() => KRGCustomsRevenueLedger.getStats());
  const [auditLogs, setAuditLogs] = useState(() => KRGCustomsAuditEngine.getAllEvents());
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'ledger' | 'audit'>('list');

  // New Declaration Form States
  const [formHsCode, setFormHsCode] = useState('25232900'); // portland cement default for KRG infrastructure
  const [formRegime, setFormRegime] = useState<'IMPORT' | 'EXPORT' | 'TRANSIT' | 'TEMPORARY_ENTRY' | 'TEMPORARY_EXIT'>('IMPORT');
  const [formImporter, setFormImporter] = useState('');
  const [formExporter, setFormExporter] = useState('');
  const [formValUSD, setFormValUSD] = useState<number>(45000);
  const [formWeightTons, setFormWeightTons] = useState<number>(100);
  const [formDesc, setFormDesc] = useState('');
  const [formExempt, setFormExempt] = useState(false);
  const [formManifestId, setFormManifestId] = useState('');

  // Search HS Codes state
  const [hsSearchQuery, setHsSearchQuery] = useState('');
  const foundHsCodes = HSCodeRegistry.searchByCodeOrName(hsSearchQuery, 'ku');

  // Real-time regional duty simulator state
  const tempCalcResult = TariffCalculationEngine.calculateTariff({
    hsCode: formHsCode,
    declaredValueUSD: formValUSD,
    weightTons: formWeightTons,
    isSpecialExemption: formExempt
  }, 'krg');

  // Transition tool state
  const [selectedDeclId, setSelectedDeclId] = useState<string | null>(null);
  const [transitionStatus, setTransitionStatus] = useState<'pending' | 'inspection' | 'approved' | 'rejected' | 'held' | 'released'>('approved');
  const [transitionNotes, setTransitionNotes] = useState('');

  const handleCreateDecl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImporter.trim() || !formExporter.trim()) return;

    const newDecl = KRGCustomsDeclarationEngine.createDeclaration({
      hsCode: formHsCode,
      regime: formRegime,
      importerName: formImporter,
      exporterName: formExporter,
      declaredValueUSD: formValUSD,
      weightTons: formWeightTons,
      description: formDesc || `KRG Regional ${formRegime} shipment of code ${formHsCode}`,
      isExempt: formExempt,
      manifestId: formManifestId
    }, userRole);

    logAction(
      userRole,
      `پەسەندکردنی بەیاننامەی گومرگی هەرێمی کوردستان: ${newDecl.id} بۆ کۆمپانیای ${newDecl.importerName}`,
      'KRG_CUSTOMS_DECLARATION_CREATED'
    );

    // Refresh views
    setDeclarations(KRGCustomsDeclarationEngine.getAllDeclarations());
    setLedgerStats(KRGCustomsRevenueLedger.getStats());
    setAuditLogs(KRGCustomsAuditEngine.getAllEvents());

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

    const updated = KRGCustomsDeclarationEngine.updateStatus(
      selectedDeclId,
      transitionStatus,
      userRole,
      transitionNotes || undefined
    );

    if (updated) {
      logAction(
        userRole,
        `گۆڕینی باری یاسایی گومرگی بەیاننامە هەرێمی ${selectedDeclId} بۆ [${transitionStatus}]`,
        'KRG_CUSTOMS_STATUS_TRANSITION'
      );
      
      setDeclarations(KRGCustomsDeclarationEngine.getAllDeclarations());
      setLedgerStats(KRGCustomsRevenueLedger.getStats());
      setAuditLogs(KRGCustomsAuditEngine.getAllEvents());
      
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
            <h3 className="text-lg font-bold text-rose-300 font-sans">هاوشێوەی مەترسی: دەستگەیشتن ڕەتکرایەوە (KRG Customs Isolated Base)</h3>
            <p className="text-sm text-rose-400/90 mt-2 leading-relaxed font-sans">
              سیستەمی کارگێڕی گومرگەکانی هەرێمی کوردستان (Erbil Mainframe): جێبەجێکاری ڕۆڵی <b>[{userRole}]</b> ناسنامەی پێویستی لەسەر سیستەمی مۆڵەتی مانیفێستی هەرێمی باکوور نییە. کایەکانی فاش و داهاتە ناوخۆییەکانی گومرگەکانی KRG بەتەواوی پارێزراوە.
            </p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded border border-rose-950/50 text-xs font-mono text-slate-400">
              CUSTOMS_ENFORCEMENT: krg_isolated_control • PROTOCOLS: ERBIL_SECURITY_HSM_ONLY
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in text-start">

      {/* Header Banner */}
      <Card className="bg-[#0b1329]/95 border-emerald-950 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-lg text-emerald-400 shrink-0">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-sans font-bold text-slate-100 tracking-tight flex items-center gap-2">
                بەڕێوەبەرایەتی گشتی گومرگ و لێخۆشبوونەکانی هەرێمی کوردستان
                <Badge variant="success">سیستەمی کارگێڕی هەرێم</Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                بەڕێوەبەرایەتی تایبەتی مۆڵەتەکانی باکوور – تۆمارکردنی بەیاننامە ناوخۆییەکانی هەرێم، هەڵسەنگاندنی تاریفە گومرگییە تایبەتەکانی کوردستان و چاودێری دەروازە سنوورییە وشکانییەکانی وەک ئیبراهیم خەلیل.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="success" className="px-3 py-1 font-mono">{userRole}</Badge>
          </div>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'list' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            بەیاننامە تۆمارکراوەکان ({declarations.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'create' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            تۆمارکردنی بەیاننامەی نوێ (ڕێسای باکوور)
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'ledger' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            داهاتی گومرگی هەرێم
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-xs font-sans font-bold rounded-lg transition transition-all ${
              activeTab === 'audit' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            تۆماری پاراستنی هەرێمی
          </button>
        </div>

        <div className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-900">
          KRG_LEDGER: isolated-northern-vault
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Declarations Table */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
                بەیاننامەکانی لەژێر چاودێری گومرگی کوردستاندا
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">کۆدی ناسنامە</th>
                      <th className="p-3 text-start">هاوردەکار / ڕژێم</th>
                      <th className="p-3 text-start">کۆدی کاڵا (HS)</th>
                      <th className="p-3 text-start">بەهای ڕاستەقینە</th>
                      <th className="p-3 text-start">بارودۆخ</th>
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
                          <Badge variant="outline" className="text-emerald-400 border-emerald-950 font-bold">{decl.hsCode}</Badge>
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
                            className="px-2 py-1 rounded bg-emerald-900/50 hover:bg-emerald-900 text-emerald-400 hover:text-emerald-300 text-[10px] font-sans font-bold transition cursor-pointer"
                          >
                            دەستکاری
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
              <Card className="bg-[#0b1329]/90 border-emerald-900/50 p-5 rounded-xl border">
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
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
                      placeholder="لەسەر چ ڕێسایەکی وردبینی هەرێم ئەم بڕیارە درا؟"
                      value={transitionNotes}
                      onChange={(e) => setTransitionNotes(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-slate-900 text-xs font-bold font-sans transition cursor-pointer"
                  >
                    سەپاندنی بڕیار و هاوتاکردن
                  </button>
                </form>
              </Card>
            ) : (
              <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-slate-400 text-center py-12">
                <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-xs font-sans">یەکێک لە بەیاننامە هەرێمییەکان دیاریبکە بۆ گۆڕینی دۆخی پشکنینی ناوخۆ.</p>
              </Card>
            )}

            {/* Quick Overview Stats */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">کۆی چالاکییە هەرێمییەکان</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-sans">تۆماری مانیفێست فەرمی:</span>
                  <span className="text-slate-200 font-mono font-bold">{declarations.length} بەیاننامە</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-sans">کۆدە پەسەندکراوەکانی هەرێم:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {declarations.filter(d => d.status === 'released' || d.status === 'approved').length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-sans">لە چاوەڕوانی چاکسازیدا:</span>
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
          <div className="lg:col-span-12 xl:col-span-7">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-emerald-400" />
                تۆمارکردنی بار لە بنکەی زانیاری مانیفێستی کوردستان
              </h3>

              <form onSubmit={handleCreateDecl} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">هاوردەکار یان بازرگانی مۆڵەتدار</label>
                  <input
                    type="text"
                    required
                    placeholder="نموونە: كۆمپانیای سۆران بۆ وەبەرهێنان"
                    value={formImporter}
                    onChange={(e) => setFormImporter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">لەناردنکار (باری دەرەکی تورکیا/ئێران)</label>
                  <input
                    type="text"
                    required
                    placeholder="نموونە: Anatolia Limestone Mills Turkey"
                    value={formExporter}
                    onChange={(e) => setFormExporter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">جۆری ڕژێمی لۆجستی (Regime)</label>
                  <select
                    value={formRegime}
                    onChange={(e) => setFormRegime(e.target.value as any)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="IMPORT">IMPORT (هاوردەکردنی هەرێمی)</option>
                    <option value="EXPORT">EXPORT (ناردنەدەرەوە)</option>
                    <option value="TRANSIT">TRANSIT (تێپەڕبوونی نێودەوڵەتی بە کوردستاندا)</option>
                    <option value="TEMPORARY_ENTRY">TEMPORARY ENTRY (هێنانە ناوەوەی کاتی)</option>
                    <option value="TEMPORARY_EXIT">TEMPORARY EXIT (بردنەدەرەوەی کاتی)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">کۆدی پۆلێنکردنی جیهانی (HS Code)</label>
                  <select
                    value={formHsCode}
                    onChange={(e) => setFormHsCode(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  >
                    {Object.values(HSCodeRegistry).map(code => (
                      <option key={(code as any).code} value={(code as any).code}>{(code as any).code} - {(code as any).descriptionEn.substring(0, 45)}...</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">بەهای ڕاستەقینە بە دۆلار (USD Declared Value)</label>
                  <input
                    type="number"
                    required
                    value={formValUSD}
                    onChange={(e) => setFormValUSD(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">کێشی گشتی بە تەن (Weight in Tons)</label>
                  <input
                    type="number"
                    required
                    value={formWeightTons}
                    onChange={(e) => setFormWeightTons(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">کۆدی مانیفێستی دەروازەی سنووری باکوور (بارکۆد)</label>
                  <input
                    type="text"
                    placeholder="بۆ نموونە: MNF-IBRAHIM-KK-401"
                    value={formManifestId}
                    onChange={(e) => setFormManifestId(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase font-mono text-slate-500 font-bold">ناوەڕۆک و جۆری کاڵا بە کورتی</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="جۆری کەرەستەکان و شوێنی عەمبارکردن لە کوردستان..."
                    className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 mt-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="exempt-krg"
                    checked={formExempt}
                    onChange={(e) => setFormExempt(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <label htmlFor="exempt-krg" className="text-xs text-slate-400 select-none cursor-pointer">
                    پەسەندکردنی لێخۆشبوونی گشتی پاڵپشت بە بڕیارەکانی گەشەپێدانی هەرێمی
                  </label>
                </div>

                <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-slate-900 text-xs font-bold font-sans transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    جێبەجێکردن لە داتابەیسی گومرگی هەرێم
                  </button>
                </div>
              </form>
            </Card>
          </div>

          {/* Calculator Simulator Widget */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/90 border-emerald-950 p-5 rounded-xl border">
              <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest border-b border-slate-850 pb-2 mb-4 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                هاوتاکردنی نرخ لە کاتی ڕاستەقینەدا (Regional Schedules)
              </h3>

              <div className="space-y-4">
                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">کۆت گونجانی باج (Base Duty):</span>
                  <div className="text-end">
                    <span className="text-emerald-400 font-bold font-mono block">${tempCalcResult.baseDutyUSD.toLocaleString()}</span>
                    {formHsCode === '25232900' && (
                      <span className="text-[10px] text-emerald-500 font-sans block">• 20% Regional Build Discount applied</span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">تێچووی کۆنتڕۆڵ و سکێنەرە هەرێمییەکان:</span>
                  <span className="text-slate-200 font-bold font-mono">${tempCalcResult.borderServiceFeeUSD.toLocaleString()}</span>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-lg border border-slate-900 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-sans">تێچووی پشکنینی گشتی تاقیگەیی:</span>
                  <span className="text-slate-200 font-bold font-mono">${tempCalcResult.inspectionFeeUSD.toLocaleString()}</span>
                </div>

                <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-900/50 flex justify-between items-center text-xs mt-6">
                  <div>
                    <span className="text-slate-300 block font-sans font-bold">کۆی گشتی هەرێمی</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Effective Rate: {tempCalcResult.effectiveRate}%</span>
                  </div>
                  <span className="text-emerald-400 text-lg font-extrabold font-mono">${tempCalcResult.totalTariffUSD.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* HS Code lookup mini-widget */}
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl text-xs">
              <h4 className="font-bold text-slate-300 mb-3 block">داتابەیسی کۆدە گشتگیرییەکان لە هەرێم</h4>
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
                      <span className="font-mono text-emerald-400 font-bold block">{code.code}</span>
                      <span className="text-[9px] text-slate-400 block">{code.descriptionKu}</span>
                    </div>
                    <Badge variant="success" className="font-mono">{(code.defaultDutyRate * 100)}%</Badge>
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
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 font-sans">
                تێکڕای دارایی و داهاتە هەرێمییەکان
              </h3>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">کۆی کۆکراوەی تاریف هەرێم (KRG Captured Tarif)</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono block mt-1">${ledgerStats.totalRevenueUSD.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">باجی بنەڕەتی کۆکراوە (Base Duties)</span>
                  <span className="text-lg font-bold text-slate-300 font-mono block mt-1">${ledgerStats.baseDutiesUSD.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">سکێنەر و پاڵپشتی لۆجستی (Border Fees)</span>
                  <span className="text-lg font-bold text-slate-300 font-mono block mt-1">${ledgerStats.borderFeesUSD.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] text-slate-500 block">کۆی غەرامەکانی سەر سنوور (Regional Fines)</span>
                  <span className="text-lg font-bold text-rose-400 font-mono block mt-1">${ledgerStats.penaltiesUSD.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Ledger Receipts Table */}
          <div className="lg:col-span-8">
            <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 font-sans">
                پسوولە فەرمییەکانی داهاتی گومرگی کوردستان (Erbil Treasury receipts)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-start">کۆدی پسوولە</th>
                      <th className="p-3 text-start">بەیاننامە</th>
                      <th className="p-3 text-start">کۆی کۆکراوە</th>
                      <th className="p-3 text-start">کاتی تۆمارکردن</th>
                      <th className="p-3 text-center">بانکی ناوەندی (CBI Sync)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {KRGCustomsRevenueLedger.getLedgerLogs().map(log => (
                      <tr key={log.id} className="hover:bg-slate-900/20 font-mono text-[11px]">
                        <td className="p-3 font-bold text-emerald-400">{log.id}</td>
                        <td className="p-3 text-slate-400">{log.declarationId}</td>
                        <td className="p-3 text-emerald-400 font-bold">${log.totalCollectedUSD.toLocaleString()}</td>
                        <td className="p-3 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                        <td className="p-3 text-center">
                          <Badge variant={log.settledWithCentralBank ? 'success' : 'warning'}>
                            {log.settledWithCentralBank ? 'Settled (هاوسەنگکراو)' : 'Pending reconciliation'}
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
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 font-sans">
            تۆماری مێژوویی و چاودێری گومرگی هەرێمی کوردستان (Immutable Regional Verification Audit)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-300">
              <thead className="bg-[#070c17] text-slate-500 uppercase font-mono text-[9px] border-b border-slate-800">
                <tr>
                  <th className="p-3 text-start">کۆدی وردبینی</th>
                  <th className="p-3 text-start">بەیاننامە</th>
                  <th className="p-3 text-start">بەرپرس / فەرمانبەر</th>
                  <th className="p-3 text-start">بەرداشتی کردارەکە</th>
                  <th className="p-3 text-center">باری گۆڕاو</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-mono">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/20 text-[11px]">
                    <td className="p-3 text-slate-500">{log.id}</td>
                    <td className="p-3 font-bold text-slate-300">{log.declarationId}</td>
                    <td className="p-3 text-emerald-400 font-bold">{log.actor}</td>
                    <td className="p-3 text-slate-400 font-sans leading-relaxed">{log.actionDetails}</td>
                    <td className="p-3 text-center text-[10px]">
                      <span className="text-slate-500">{log.previousStatus}</span>
                      <span className="mx-1 text-slate-600">→</span>
                      <Badge variant="success" className="text-[10px]">{log.newStatus}</Badge>
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
