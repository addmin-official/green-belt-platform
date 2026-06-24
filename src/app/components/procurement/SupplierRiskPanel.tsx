import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Award, AlertTriangle, AlertCircle, TrendingDown, CheckSquare, Search, RefreshCw, Layers
} from 'lucide-react';
import { ProcurementRegistry } from '../../../services/procurement/ProcurementRegistry';
import { VendorRegistry } from '../../../services/procurement/VendorRegistry';
import { Vendor } from '../../../services/procurement/ProcurementTypes';

interface SupplierRiskPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function SupplierRiskPanel({ lang, onStateChange }: SupplierRiskPanelProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [suspendReason, setSuspendReason] = useState<string>('');

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

  const handleAction = (vendorId: string, action: Vendor['status']) => {
    VendorRegistry.updateVendorStatus(vendorId, action, 'Joint Intelligence Screening Unit');
    loadVendors();
    if (onStateChange) onStateChange();
  };

  // Compute risk category statistics
  const lowRiskCount = vendors.filter(v => v.supplierRiskScore <= 25 && v.status === 'Approved').length;
  const medRiskCount = vendors.filter(v => v.supplierRiskScore > 25 && v.supplierRiskScore <= 60 && v.status === 'Approved').length;
  const highRiskCount = vendors.filter(v => v.supplierRiskScore > 60 || v.status === 'Suspended' || v.status === 'Blacklisted').length;

  return (
    <div className="bg-[#0b1329]/95 border border-slate-800 rounded-xl p-5 text-start flex flex-col gap-5">
      {/* HEADER SECTION */}
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          {getLabel('Joint Supplier Risk & Intelligence Screening', 'نظام فحص المخاطر ومكافحة التواطؤ للموردين', 'سیستەمی چاودێری مەترسی کۆمپانیاکان و ئاستی کواڵیتی')}
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">
          {getLabel(
            'Compute unified supplier risk index based on historical delivery speed, compliance audits, and sanction lists.',
            'حساب مؤشرات مخاطر الموردين الموحدة بالاستناد إلى تقارير التسليمات السابقة، التدقيق واللوائح العقابية.',
            'هەژمارکردنی ڕێژەی مەترسی کۆمپانیاکان بەپێی خێرایی جێبەجێکردنی پڕۆژەکانی ڕابردوو، ڕاپۆرتی لێژنەی چاودێری و لیستە گشتییەکان.'
          )}
        </p>
      </div>

      {/* METRICS ROW BENTO BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 font-mono">
          <span className="text-[10px] text-emerald-400 font-bold block uppercase">LOW RISK CLEARED PARTNERS</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-white">{lowRiskCount}</span>
            <span className="text-xs text-emerald-400">Pristine standing</span>
          </div>
        </div>

        <div className="bg-amber-955/20 border border-amber-500/20 rounded-xl p-4 font-mono">
          <span className="text-[10px] text-amber-450 font-bold block uppercase">MODERATE WARNING PARTNERS</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-white">{medRiskCount}</span>
            <span className="text-xs text-amber-450">Pending active auditing</span>
          </div>
        </div>

        <div className="bg-rose-955/20 border border-rose-500/20 rounded-xl p-4 font-mono">
          <span className="text-[10px] text-rose-450 font-bold block uppercase">CRITICAL RESTRICTED & SANCTIONED</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-white">{highRiskCount}</span>
            <span className="text-xs text-rose-400">Suspended or Blacklisted</span>
          </div>
        </div>
      </div>

      {/* SCREENING LIST COMPILATION */}
      <div className="space-y-4">
        <span className="text-[10px] text-slate-500 uppercase font-bold font-mono">INTELLIGENCE RISK EVALUATION MATRIX:</span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vendors.map(v => {
            const riskValue = v.supplierRiskScore;
            let riskLevel = 'LOW';
            let riskColor = 'text-emerald-400 bg-emerald-950/25 border-emerald-500/10';
            
            if (v.status === 'Blacklisted') {
              riskLevel = 'BLACKLISTED';
              riskColor = 'text-red-500 bg-red-950/25 border-red-500/20 font-bold animate-pulse';
            } else if (v.status === 'Suspended') {
              riskLevel = 'SUSPENDED';
              riskColor = 'text-amber-500 bg-amber-950/25 border-amber-500/20';
            } else if (riskValue > 60) {
              riskLevel = 'HIGH RISK';
              riskColor = 'text-rose-450 bg-rose-950/20 border-rose-500/20';
            } else if (riskValue > 25) {
              riskLevel = 'MODERATE';
              riskColor = 'text-amber-450 bg-amber-950/10 border-amber-500/10';
            }

            return (
              <div 
                key={v.id} 
                className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3.5 font-mono"
              >
                <div>
                  {/* Title and risk indicator */}
                  <div className="flex items-center justify-between gap-2.5 border-b border-slate-950 pb-2 mb-2">
                    <h3 className="text-xs font-bold text-white leading-tight triage truncate text-start">
                      {v.name[lang] || v.name.en}
                    </h3>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${riskColor}`}>
                      {riskLevel} ({riskValue}%)
                    </span>
                  </div>

                  {/* Details indicators */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-900 text-xs">
                    <div>
                      <span className="text-[8px] text-slate-500 uppercase block">Reg Portal</span>
                      <span className="text-slate-300 font-bold text-[10px]">{v.registrationNumber}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 uppercase block">Compliance Rating</span>
                      <span className="text-slate-305 font-bold text-[10px]">{v.complianceRating}%</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 uppercase block">Escraw saturation</span>
                      <span className="text-amber-500 font-bold text-[10px]">${v.totalContractValueUSD.toFixed(1)}M</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[10px] text-slate-400 space-y-1.5 text-start">
                    <div className="flex justify-between">
                      <span>Completed Contracts count:</span>
                      <strong className="text-white">{v.completedContracts} completed</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Sovereign Risk Level Details:</span>
                      <span className="text-[#cca553] font-bold">{v.qualificationScore}% Match Rating</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-950 pt-2 text-[9px] text-slate-500">
                      <span>Last Compliance Audit Date:</span>
                      <span>{v.lastAudited || 'Un-Audited'}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Intelligence mitigation actions */}
                <div className="flex items-center justify-between gap-2 border-t border-slate-950 pt-3">
                  <span className="text-[8px] text-slate-500 uppercase font-bold">Action control:</span>
                  
                  <div className="flex gap-1.5">
                    {v.status !== 'Approved' && (
                      <button
                        onClick={() => handleAction(v.id, 'Approved')}
                        className="p-1 px-2 text-[9px] font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer select-none transition-all"
                      >
                        ✓ Reinstate Approved
                      </button>
                    )}
                    {v.status === 'Approved' && (
                      <>
                        <button
                          onClick={() => handleAction(v.id, 'Suspended')}
                          className="p-1 px-2 text-[9px] font-bold rounded bg-amber-600 hover:bg-amber-500 text-slate-950 cursor-pointer select-none transition-all"
                        >
                          ⚠ Suspend
                        </button>
                        <button
                          onClick={() => handleAction(v.id, 'Blacklisted')}
                          className="p-1 px-2 text-[9px] font-bold rounded bg-red-650 hover:bg-red-500 text-white cursor-pointer select-none transition-all"
                        >
                          ☒ Blacklist
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
