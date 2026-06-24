import React, { useState, useEffect } from 'react';
import { 
  Users, Award, ShieldAlert, CheckCircle, RefreshCw, Plus, Edit3, Trash2, Calendar, FileCheck, Check
} from 'lucide-react';
import { ProcurementRegistry } from '../../../services/procurement/ProcurementRegistry';
import { VendorRegistry } from '../../../services/procurement/VendorRegistry';
import { Vendor, Jurisdiction } from '../../../services/procurement/ProcurementTypes';

interface VendorQualificationPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function VendorQualificationPanel({ lang, onStateChange }: VendorQualificationPanelProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuditId, setShowAuditId] = useState<string | null>(null);

  // Add Form states
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [nameKu, setNameKu] = useState('');
  const [regNum, setRegNum] = useState('');
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('federal');
  const [category, setCategory] = useState<Vendor['category']>('Strategic Infrastructure');
  const [qualScore, setQualScore] = useState('80');

  // Audit states
  const [auditQual, setAuditQual] = useState('80');
  const [auditCompl, setAuditCompl] = useState('90');

  const loadVendors = () => {
    setVendors(VendorRegistry.getVendors());
  };

  useEffect(() => {
    loadVendors();
    window.addEventListener('storage', loadVendors);
    return () => window.removeEventListener('storage', loadVendors);
  }, []);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn || !nameAr || !nameKu || !regNum) {
      alert('Fill all required fields');
      return;
    }

    VendorRegistry.registerVendor({
      name: { en: nameEn, ar: nameAr, ku: nameKu },
      registrationNumber: regNum,
      jurisdiction,
      category,
      qualificationScore: parseInt(qualScore),
      status: 'Approved',
      lastAudited: new Date().toISOString().split('T')[0]
    }, 'Sovereign Procurement Office');

    loadVendors();
    setShowAddForm(false);
    // Reset Form
    setNameEn('');
    setNameAr('');
    setNameKu('');
    setRegNum('');
    setQualScore('80');
    if (onStateChange) onStateChange();
  };

  const handleAuditSubmit = (vendorId: string) => {
    VendorRegistry.auditVendor(
      vendorId,
      parseInt(auditQual),
      parseInt(auditCompl),
      'Federal-KRG Joint Auditor Board'
    );
    setShowAuditId(null);
    loadVendors();
    if (onStateChange) onStateChange();
  };

  const handleStatusChange = (vendorId: string, status: Vendor['status']) => {
    VendorRegistry.updateVendorStatus(vendorId, status, 'Audit Enforcement Board');
    loadVendors();
    if (onStateChange) onStateChange();
  };

  return (
    <div className="bg-[#0b1329]/95 border border-slate-800 rounded-xl p-5 text-start flex flex-col gap-5">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-500" />
            {getLabel('Vendor Qualification Registry', 'سجل تأهيل وتقييم الموردين', 'تۆماری شیاوی و چاودێریی بەڵێندەران')}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            {getLabel(
              'Enforce qualification scoring, regional certification criteria, and supplier risk index.',
              'تطبيق نظام تقييم نقاط التأهل، معايير الترخيص الإقليمية ومؤشرات المخاطر.',
              'جێبەجێکردنی سیستەمی کۆنترۆڵکردنی ئاستی شیاوی، مۆڵەتی فەرمی بەڕێوەبردن و نیشاندەری مەترسییەکان.'
            )}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          {getLabel('Clarify New Vendor', 'تسجيل مورد معتمد', 'تۆمارکردنی بەڵێندەری نوێ')}
        </button>
      </div>

      {/* FORM: ADD VENDOR */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Vendor/Company Name (EN) *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-205 focus:outline-none focus:border-sky-500"
                value={nameEn}
                onChange={e => setNameEn(e.target.value)}
                placeholder="e.g. Euphrates Infrastructure Corp"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">اسم الشركة (AR) *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-205 focus:outline-none focus:border-sky-500"
                value={nameAr}
                onChange={e => setNameAr(e.target.value)}
                placeholder="مثال: شركة الفرات للبنى التحتية"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">ناوی کۆمپانیا (KU) *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-205 focus:outline-none focus:border-sky-500"
                value={nameKu}
                onChange={e => setNameKu(e.target.value)}
                placeholder="نموونە: کۆمپانیای ژێرخانی فورات"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-bold">REGISTRATION PORTAL ID *</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-205 focus:outline-none focus:border-sky-500 font-bold"
                value={regNum}
                onChange={e => setRegNum(e.target.value)}
                placeholder="e.g. IQ-FED-5590"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">JURISDICTION DOMAIN</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-205 focus:outline-none focus:border-sky-500 font-bold text-sky-500"
                value={jurisdiction}
                onChange={e => setJurisdiction(e.target.value as any)}
              >
                <option value="federal">FEDERAL PORTAL (Iraq)</option>
                <option value="krg">KRG REGIONAL PORTAL</option>
                <option value="joint">JOINT CLEARANCE CORE</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">BUSINESS CATEGORY</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-205 focus:outline-none focus:border-sky-500"
                value={category}
                onChange={e => setCategory(e.target.value as any)}
              >
                <option value="Strategic Infrastructure">Strategic Infrastructure</option>
                <option value="Defense & Security">Defense & Security</option>
                <option value="Digital & Technology">Digital & Technology</option>
                <option value="Energy Systems">Energy Systems</option>
                <option value="General Supplies">General Supplies</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">INITIAL QUALIFICATION LEVEL</label>
              <input
                type="number"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-205 focus:outline-none focus:border-sky-500 text-center"
                value={qualScore}
                onChange={e => setQualScore(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
            >
              {getLabel('Cancel', 'إلغاء', 'پاشگەزبوونەوە')}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold"
            >
              {getLabel('Commit Registrar', 'تنفيذ التسجيل الموثق', 'دامەزراندنی کۆمپانیا')}
            </button>
          </div>
        </form>
      )}

      {/* VENDOR TABLE */}
      <div className="overflow-x-auto border border-slate-800/80 rounded-xl bg-slate-900/10">
        <table className="w-full font-mono text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#0b1b33] text-slate-400 border-b border-slate-800 font-bold uppercase">
              <th className="p-3">{getLabel('Vendor Clearances / Region', 'المورد / البوابة', 'بەڵێندەر / ناوچە')}</th>
              <th className="p-3">{getLabel('Business Domain', 'قطاع الأعمال', 'بواری چالاکی')}</th>
              <th className="p-3 text-center">{getLabel('Qual Score', 'نقاط التأهل', 'نمرەی شیاوی')}</th>
              <th className="p-3 text-center">{getLabel('Risk Index', 'مستوى المخاطر', 'نیشاندەری مەترسی')}</th>
              <th className="p-3 text-center">{getLabel('Compliance', 'درجة الامتثال', 'ئاستی ڕێکار')}</th>
              <th className="p-3 text-center">{getLabel('Contracts Active', 'العقود النشطة', 'گرێبەستی کارا')}</th>
              <th className="p-3">{getLabel('Status Registry', 'الحالة القانونية', 'باری یاسایی')}</th>
              <th className="p-3 text-right">{getLabel('Governance Action', 'إجراءات التدقيق', 'وردبینی و گۆڕانکاری')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {vendors.map(v => {
              const regionBadge = v.jurisdiction === 'federal'
                ? 'bg-sky-950/40 border border-sky-500/20 text-sky-450'
                : v.jurisdiction === 'krg'
                  ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-450'
                  : 'bg-amber-950/40 border border-amber-500/20 text-amber-450';

              const statusColor = v.status === 'Approved'
                ? 'bg-emerald-950/50 border border-emerald-500/20 text-emerald-400'
                : v.status === 'Suspended'
                  ? 'bg-amber-950/50 border border-amber-500/20 text-amber-450'
                  : v.status === 'Under Review'
                    ? 'bg-purple-950/50 border border-purple-500/20 text-purple-400'
                    : 'bg-red-950/50 border border-red-500/20 text-rose-400';

              const riskBadge = v.supplierRiskScore < 25
                ? 'text-emerald-400'
                : v.supplierRiskScore < 60
                  ? 'text-amber-400'
                  : 'text-rose-500 font-bold';

              return (
                <tr key={v.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-3 font-semibold text-white">
                    <div className="flex flex-col">
                      <span className="text-[13px]">{v.name[lang] || v.name.en}</span>
                      <span className="text-[9px] text-slate-500 font-bold">{v.registrationNumber}</span>
                    </div>
                  </td>
                  <td className="p-3 text-slate-300">
                    <span className="text-[11px] block">{v.category}</span>
                    <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${regionBadge}`}>
                      {v.jurisdiction}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold text-white text-[12px]">
                    {v.qualificationScore}%
                  </td>
                  <td className="p-3 text-center font-bold text-[12px]">
                    <span className={riskBadge}>{v.supplierRiskScore}%</span>
                  </td>
                  <td className="p-3 text-center font-bold text-slate-100 text-[12px]">
                    {v.complianceRating}%
                  </td>
                  <td className="p-3 text-center font-medium">
                    <div className="flex flex-col text-[10px]">
                      <span className="text-[#cca553] font-bold">{v.activeContracts} Actives</span>
                      <span className="text-slate-500">{v.completedContracts} Completed</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {showAuditId !== v.id ? (
                        <>
                          <button
                            onClick={() => {
                              setShowAuditId(v.id);
                              setAuditQual(v.qualificationScore.toString());
                              setAuditCompl(v.complianceRating.toString());
                            }}
                            className="bg-slate-800 hover:bg-slate-700 p-1 px-2 rounded text-[10px] font-bold text-sky-400 cursor-pointer flex items-center gap-1 transition-all"
                          >
                            <Award className="w-3.5 h-3.5" />
                            Audit
                          </button>

                          <div className="relative group inline-block">
                            <button className="bg-slate-800 hover:bg-slate-700 p-1 px-1.5 rounded text-[10px] text-slate-350 cursor-pointer font-bold">
                              Status ▾
                            </button>
                            <div className="absolute right-0 bottom-full mb-1 bg-slate-950 border border-slate-850 p-1 rounded shadow-xl hidden group-hover:block z-20 min-w-[100px] text-left">
                              <button 
                                onClick={() => handleStatusChange(v.id, 'Approved')} 
                                className="w-full text-left p-1 text-[9px] hover:bg-slate-900 text-emerald-400 block"
                              >
                                ✓ Approved
                              </button>
                              <button 
                                onClick={() => handleStatusChange(v.id, 'Suspended')} 
                                className="w-full text-left p-1 text-[9px] hover:bg-slate-900 text-amber-400 block"
                              >
                                ⚠ Suspend
                              </button>
                              <button 
                                onClick={() => handleStatusChange(v.id, 'Blacklisted')} 
                                className="w-full text-left p-1 text-[9px] hover:bg-slate-900 text-rose-500 block"
                              >
                                ☒ Blacklist
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded flex flex-col gap-1.5 text-left max-w-[160px] inline-block font-mono">
                          <span className="text-[9px] text-[#cca553] font-bold block uppercase pb-0.5 border-b border-slate-900">Performance Assessment</span>
                          <div className="flex gap-1.5">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-slate-500 font-bold uppercase">QUAL</span>
                              <input 
                                type="number" 
                                className="w-full bg-slate-900 border border-slate-850 p-0.5 text-center text-slate-200 text-[10px]" 
                                value={auditQual}
                                onChange={e => setAuditQual(e.target.value)}
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] text-slate-500 font-bold uppercase">COMPL</span>
                              <input 
                                type="number" 
                                className="w-full bg-slate-900 border border-slate-850 p-0.5 text-center text-slate-200 text-[10px]" 
                                value={auditCompl} 
                                onChange={e => setAuditCompl(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-1.5 mt-1">
                            <button 
                              onClick={() => setShowAuditId(null)} 
                              className="px-1 text-[8px] bg-slate-800 rounded text-slate-400"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => handleAuditSubmit(v.id)} 
                              className="px-1.5 py-0.5 text-[8px] bg-sky-600 rounded text-white font-bold"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
