import React, { useState, useEffect } from 'react';
import { 
  Building2, Coins, Calendar, FileText, Plus, CheckCircle2, ChevronRight, AlertTriangle, Play, ShieldAlert, CheckSquare, Trash2, RefreshCw
} from 'lucide-react';
import { ProcurementRegistry } from '../../../services/procurement/ProcurementRegistry';
import { TenderEngine } from '../../../services/procurement/TenderEngine';
import { VendorRegistry } from '../../../services/procurement/VendorRegistry';
import { Tender, Jurisdiction } from '../../../services/procurement/ProcurementTypes';

interface NationalTenderCenterProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function NationalTenderCenter({ lang, onStateChange }: NationalTenderCenterProps) {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | 'all'>('all');
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [showBidForm, setShowBidForm] = useState<string | null>(null);

  // Form states for publishing
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [titleKu, setTitleKu] = useState('');
  const [category, setCategory] = useState<Tender['category']>('Strategic Infrastructure');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('federal');
  const [budgetUSD, setBudgetUSD] = useState('');
  const [authority, setAuthority] = useState('');
  const [requirements, setRequirements] = useState('');
  const [minimumScore, setMinimumScore] = useState('75');

  // Form states for bidding
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [proposalUSD, setProposalUSD] = useState('');
  const [technicalScore, setTechnicalScore] = useState('80');
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = () => {
    setTenders(ProcurementRegistry.getTenders());
    setVendors(VendorRegistry.getVendors().filter(v => v.status === 'Approved'));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn || !titleAr || !titleKu || !budgetUSD || !authority) {
      alert('Please fill all required fields');
      return;
    }

    const reqs = requirements.split('\n').filter(r => r.trim().length > 0);
    
    TenderEngine.publishTender({
      title: { en: titleEn, ar: titleAr, ku: titleKu },
      category,
      jurisdiction,
      budgetUSD: parseFloat(budgetUSD),
      authority,
      requirements: reqs.length > 0 ? reqs : ['Compliance with standard security specifications'],
      minimumScoreRequired: parseInt(minimumScore),
      closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }, 'Executive Authority');

    loadData();
    setShowPublishForm(false);
    // Reset Form
    setTitleEn('');
    setTitleAr('');
    setTitleKu('');
    setBudgetUSD('');
    setAuthority('');
    setRequirements('');
    if (onStateChange) onStateChange();
  };

  const handleBidSubmit = (tenderId: string) => {
    if (!selectedVendorId || !proposalUSD || !technicalScore) {
      setErrorMsg('Please select a vendor, enter proposed budget and technical score.');
      return;
    }

    try {
      TenderEngine.submitBid(
        tenderId,
        selectedVendorId,
        parseFloat(proposalUSD),
        parseInt(technicalScore),
        'Procurement Authority Panel'
      );
      setErrorMsg('');
      setShowBidForm(null);
      setSelectedVendorId('');
      setProposalUSD('');
      loadData();
      if (onStateChange) onStateChange();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error submitting bid');
    }
  };

  const filteredTenders = tenders.filter(t => 
    selectedJurisdiction === 'all' ? true : t.jurisdiction === selectedJurisdiction
  );

  return (
    <div className="bg-[#0b1329]/95 border border-slate-800 rounded-xl p-5 text-start flex flex-col gap-5">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            {getLabel('National Sovereign Tender Center', 'مركز العطاءات الوطني السيادي', 'سەنتەری نیشتمانیی داواکاریی گرێبەستەکان')}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {getLabel(
              'Publish, govern, and audit intergovernmental sovereign procurement initiatives.',
              'نشر المشتريات والمقاصات الحكومية وتنظيمها والتدقيق عليها.',
              'بڵاوکردنەوە، کۆنتڕۆڵکردن و وردبینی داواکارییە گشتییە داراییەکان لە نێوان حکومەتەکان.'
            )}
          </p>
        </div>
        <button
          onClick={() => setShowPublishForm(!showPublishForm)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          {getLabel('Publish New Tender', 'نشر عطاء جديد', 'بڵاوکردنەوەی تەندەری نوێ')}
        </button>
      </div>

      {/* PUBLISH NEW TENDER SCREEN/FORM */}
      {showPublishForm && (
        <form onSubmit={handlePublish} className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Tender Title (EN) *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                value={titleEn}
                onChange={e => setTitleEn(e.target.value)}
                placeholder="e.g. Strategic Dam Development Phase A"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">العنوان بالعربية (AR) *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                value={titleAr}
                onChange={e => setTitleAr(e.target.value)}
                placeholder="مثال: تطوير سد بخمة الإستراتيجي"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">ناونیشان بە کوردی (KU) *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                value={titleKu}
                onChange={e => setTitleKu(e.target.value)}
                placeholder="نموونە: گەشەپێدانی بەنداوی بێخمەی ستراتیژی"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Procurement Category</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                value={category}
                onChange={e => setCategory(e.target.value as any)}
              >
                <option value="Strategic Infrastructure">Strategic Infrastructure</option>
                <option value="Energy Systems">Energy Systems</option>
                <option value="Digital & Technology">Digital & Technology</option>
                <option value="Defense & Security">Defense & Security</option>
                <option value="General Supplies">General Supplies</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Jurisdiction separator</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 font-bold text-amber-500"
                value={jurisdiction}
                onChange={e => setJurisdiction(e.target.value as any)}
              >
                <option value="federal">FEDERAL GOVERNMENT (Baghdad)</option>
                <option value="krg">KURDISTAN REGION (KRG)</option>
                <option value="joint">JOINT COOPERATION (Federal & KRG)</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Budget Valuation (Millions USD) *</label>
              <input
                type="number"
                step="0.1"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                value={budgetUSD}
                onChange={e => setBudgetUSD(e.target.value)}
                placeholder="e.g. 45.8"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Issuing Authority/Ministry *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500"
                value={authority}
                onChange={e => setAuthority(e.target.value)}
                placeholder="e.g. Ministry of Water Resources"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Tender Compliance Requirements (one per line)</label>
            <textarea
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none font-mono text-xs"
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
              placeholder="Minimum qualification score of 80&#10;Central Bank bank guarantee matching 5% valuation"
            />
          </div>

          <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
            <div>
              <label className="text-slate-400 mr-2 font-mono">Minimum Qualification Level Required (0-100):</label>
              <input
                type="number"
                className="w-16 bg-slate-950 border border-slate-800 rounded p-1 text-slate-200 text-center"
                value={minimumScore}
                onChange={e => setMinimumScore(e.target.value)}
              />
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setShowPublishForm(false)}
                className="px-3.5 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                {getLabel('Cancel', 'إلغاء', 'پاشگەزبوونەوە')}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                {getLabel('Execute Sovereign Publish', 'تنفيذ النشر السيادي', 'ئەنجامدانی بڵاوکردنەوەی تەندەر')}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* JURISDICTION SELECTOR TABS */}
      <div className="flex flex-wrap items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-850 self-start">
        {(['all', 'federal', 'krg', 'joint'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedJurisdiction(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedJurisdiction === tab 
                ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/30Shadow' 
                : 'text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            {getLabel(
              tab === 'all' ? 'All Portals' : tab === 'federal' ? 'Federal Iraq' : tab === 'krg' ? 'Kurdistan KRG' : 'Joint Treaty Contracts',
              tab === 'all' ? 'كل البوابات' : tab === 'federal' ? 'الحكومة الاتحادية' : tab === 'krg' ? 'إقليم كوردستان' : 'العقود المشتركة',
              tab === 'all' ? 'هەموو دەروازەکان' : tab === 'federal' ? 'فیدراڵی عێراق' : tab === 'krg' ? 'هەرێمی کوردستان' : 'پەیماننامە هاوبەشەکان'
            )}
          </button>
        ))}
      </div>

      {/* TENDERS DISPLAY GRID */}
      {filteredTenders.length === 0 ? (
        <div className="bg-slate-900/20 border border-dashed border-slate-800 p-8 rounded-xl text-center text-slate-500 font-mono text-xs">
          {getLabel('No strategic tenders found matching the active filters.', 'لم يتم العثور على أي عطاءات تطابق معيار التصفية الحالي.', 'هیچ داواکارییەکی گرینگی کارا نەدۆزرایەوە کە لەگەڵ چاودێریکراوەکان بگونجێت.')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTenders.map(t => {
            const jurisdictionStyle = t.jurisdiction === 'federal' 
              ? 'border-sky-500/20 bg-sky-950/10 text-sky-400' 
              : t.jurisdiction === 'krg' 
                ? 'border-emerald-500/20 bg-emerald-950/10 text-emerald-400' 
                : 'border-amber-500/20 bg-amber-950/10 text-amber-400';

            const statusColors = {
              Draft: 'bg-slate-800 text-slate-300',
              Published: 'bg-teal-950/40 border border-teal-500/20 text-teal-400',
              'Bid Open': 'bg-sky-950/40 border border-sky-500/20 text-sky-400',
              Evaluation: 'bg-amber-950/40 border border-amber-500/20 text-amber-400 animate-pulse',
              Awarded: 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400',
              Closed: 'bg-red-950/40 border border-red-500/20 text-rose-400',
            };

            return (
              <div 
                key={t.id} 
                className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between gap-4 h-full hover:border-slate-700 transition-all font-mono"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] uppercase font-bold py-0.5 px-2 rounded-md ${jurisdictionStyle}`}>
                      {t.jurisdiction.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-bold py-0.5 px-2 rounded-md ${statusColors[t.status]}`}>
                      {t.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight line-clamp-2 min-h-[40px] mb-1 text-start">
                    {t.title[lang] || t.title.en}
                  </h3>
                  
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{t.authority}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-900 mb-3 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">BUDGET VALUE</span>
                      <span className="text-white font-bold font-mono">${t.budgetUSD} Millions</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block font-bold">SUBMITTED BIDS</span>
                      <span className="text-[#cca553] font-bold font-mono">{t.bidIds.length} ACTIVE</span>
                    </div>
                  </div>

                  {/* Requirements List Accordion visual */}
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase font-bold block mb-1">REGULATORY COMPLIANCE REQUIREMENTS:</span>
                    {t.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-[10px] text-slate-400 leading-tight">
                        <CheckSquare className="w-3 h-3 text-[#cca553] mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BID FORMS & ACTION TRIGGER BUTTONS */}
                <div className="mt-2.5">
                  {(t.status === 'Published' || t.status === 'Bid Open') && (
                    <>
                      {showBidForm !== t.id ? (
                        <button
                          onClick={() => {
                            setShowBidForm(t.id);
                            setErrorMsg('');
                          }}
                          className="w-full bg-[#1b2c44] hover:bg-[#253f60] border border-[#E0A96D]/30 hover:border-[#E0A96D]/50 text-[#E0A96D] text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current text-amber-500" />
                          {getLabel('Submit Bid Proposal', 'تقديم عرض مالي وفني', 'پێشکەشکردنی پێشنیاری تەندەر')}
                        </button>
                      ) : (
                        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex flex-col gap-2.5">
                          <h4 className="text-[10px] text-[#cca553] font-bold border-b border-slate-900 pb-1 uppercase">
                            Submit Bid form - {t.id}
                          </h4>

                          {errorMsg && (
                            <div className="p-1 px-2 rounded bg-red-950/45 border border-red-500/20 text-red-400 text-[10px] flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3 shrink-0" />
                              <span className="truncate">{errorMsg}</span>
                            </div>
                          )}

                          <div>
                            <label className="text-[9px] text-slate-500 block mb-1 uppercase font-bold">SELECT VENDOR CLEARANCE</label>
                            <select
                              className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-slate-300 text-[11px]"
                              value={selectedVendorId}
                              onChange={e => setSelectedVendorId(e.target.value)}
                            >
                              <option value="">-- Choose Vendor Auth --</option>
                              {vendors.map(v => (
                                <option key={v.id} value={v.id}>{v.name.en} ({v.jurisdiction.toUpperCase()})</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-1 uppercase font-bold">BID USD ($M)</label>
                              <input
                                type="number"
                                step="0.1"
                                className="w-full bg-slate-905 border border-slate-800 rounded p-1 text-slate-200 text-[11px]"
                                value={proposalUSD}
                                onChange={e => setProposalUSD(e.target.value)}
                                placeholder="e.g. 33.2"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 block mb-1 uppercase font-bold">TECH QUAL (0-100)</label>
                              <input
                                type="number"
                                className="w-full bg-slate-905 border border-slate-800 rounded p-1 text-slate-200 text-[11px] text-center"
                                value={technicalScore}
                                onChange={e => setTechnicalScore(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="flex gap-1.5 self-end">
                            <button
                              onClick={() => setShowBidForm(null)}
                              className="px-2 py-1 rounded bg-slate-900 text-slate-400 text-[10px]"
                            >
                              {getLabel('Cancel', 'إلغاء', 'پاشگەزبوونەوە')}
                            </button>
                            <button
                              onClick={() => handleBidSubmit(t.id)}
                              className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px]"
                            >
                              {getLabel('Submit Bid', 'إرسال', 'پەسەندکردن')}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {t.status === 'Closed' && (
                    <div className="p-2 text-center border border-red-500/20 bg-rose-950/20 text-rose-300 font-bold text-[10px] rounded-lg">
                      {getLabel('Procurement Execution Closed', 'تم إغلاق التعاقد', 'تەواوکرا و داخرا')}
                    </div>
                  )}
                  {t.status === 'Awarded' && (
                    <div className="p-2 text-center border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 font-bold text-[10px] rounded-lg flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{getLabel('Tender Award Executed', 'تم حسم وترسية العطاء', 'رێکارەکانی جێبەجێکردن دەستیپێکرد')}</span>
                    </div>
                  )}
                  {t.status === 'Evaluation' && (
                    <div className="p-2 text-center border border-amber-500/20 bg-amber-950/20 text-amber-300 font-bold text-[10px] rounded-lg animate-pulse">
                      {getLabel('Bidding Active Audit Evaluation', 'العطاء قيد المراجعة الفنية والامتثال', 'تەندەر لەژێر هەڵسەنگاندن و وردبینیدایە')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
