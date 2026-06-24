import React, { useState } from 'react';
import { 
  Building2, ShieldAlert, Coins, Library, Landmark, Hammer, ArrowLeftRight, ClipboardCheck 
} from 'lucide-react';

import NationalAssetRegistryPanel from './NationalAssetRegistryPanel';
import StrategicAssetsPanel from './StrategicAssetsPanel';
import StatePropertyPanel from './StatePropertyPanel';
import AssetValuationPanel from './AssetValuationPanel';
import AssetTransferPanel from './AssetTransferPanel';
import AssetAuditPanel from './AssetAuditPanel';
import AssetRiskPanel from './AssetRiskPanel';
import InfrastructureAssetsPanel from './InfrastructureAssetsPanel';

interface NationalAssetAuthorityDashboardProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function NationalAssetAuthorityDashboard({ lang, onStateChange }: NationalAssetAuthorityDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'registry' | 'strategic' | 'property' | 'valuation' | 'transfer' | 'audit' | 'risk' | 'infrastructure'>('registry');

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const menuItems = [
    { id: 'registry', label: getLabel('National Asset Registry', 'سجل الأصول الحكومية', 'تۆماری سامانە نیشتمانییەکان'), icon: Library },
    { id: 'strategic', label: getLabel('Strategic Assets', 'الأصول الإستراتيجية', 'سامانە ستراتیژییەکان'), icon: LandlordShimIcon },
    { id: 'property', label: getLabel('State Property', 'عقارات الدولة', 'مۆڵکەکانی دەوڵەت'), icon: Building2 },
    { id: 'valuation', label: getLabel('Asset Valuation', 'تقييم الأصول المالي', 'نرخاندنی سەرچاوەکان'), icon: Coins },
    { id: 'transfer', label: getLabel('Asset Transfer', 'نقل ملكية الأصول', 'گواستنەوەی سامان'), icon: ArrowLeftRight },
    { id: 'audit', label: getLabel('Asset Audit', 'تدقيق الحسابات والالتزام', 'ورده‌كاری و چاودێری'), icon: ClipboardCheck },
    { id: 'risk', label: getLabel('Risk Assessment', 'منظومة تقييم المخاطر', 'نرخاندنی مەترسی'), icon: ShieldAlert },
    { id: 'infrastructure', label: getLabel('Infrastructures', 'البنية التحتية المتكالمة', 'پڕۆژە فەرمییەکان'), icon: Hammer },
  ];

  function LandlordShimIcon({ className }: { className?: string }) {
    return <Landmark className={className} />;
  }

  return (
    <div className="w-full space-y-6" id="national-asset-authority-dashboard">
      {/* Decorative Title Banner */}
      <div className="bg-gradient-to-r from-[#0a1420] via-[#102235] to-[#0a1420] p-6 rounded-2xl border border-[#cca553]/20 text-center space-y-2">
        <span className="text-[10px] font-mono font-bold text-[#cca553] tracking-widest uppercase block animate-pulse">
          {getLabel('SOCIALLY INTEGRATED STATE PROPERTY EXECUTIVE PROCESSOR', 'الهيئة الوطنية والأمانة العامة لمتلكات الدولة السيادية', 'دەسەڵاتی نیشتمانی بۆ پاراستن و بەڕێوەبردنی سامانەکانی دەوڵەت')}
        </span>
        <h2 className="text-xl md:text-2xl font-bold font-sans text-white tracking-wide uppercase">
          {getLabel('National Asset & State Property Authority', 'الهيئة الوطنية الموحدة لإدارة السيولة والأصول العقارية', 'دەسەڵاتی نیشتمانی بۆ بەڕێوەبردنی سامان و مۆڵکەکانی دەوڵەت')}
        </h2>
        <p className="text-xs text-slate-400 font-sans max-w-2xl mx-auto">
          {getLabel('Authorized under Constitutional Decree Sovereign Protocol v3.6.13. Provides real-time synchronization with central treasury reserves, intergovernmental ledger balance sheets, and security matrices.',
                  'مرخص بموجب المرسوم الدستوري لتعديل نظام الأصول v3.6.13. یوفر مزامنة فورية مع الاحتياطيات الفيدرالية والإقليمية.', 
                  '| پەسەندکراو لە ژێر بڕیاری دەستووری بۆ هەموارکردنەوەی سیستەمی سەروەتەکان v3.6.13. ئەنجامدانی هاوکاتکردنی خێرا لەگەڵ یەدەگە فیدراڵی و هەرێمییەکان.')}
        </p>
      </div>

      {/* Sub Tabs Navigation Layout */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-900 shadow-inner">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSubTab(item.id as any)}
            className={`px-3 py-2 rounded-lg text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === item.id 
                ? 'bg-[#182a3d] text-white border-b-2 border-[#cca553] shadow-md font-[800]' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/35 font-[700]'
            }`}
          >
            <item.icon className="w-3.5 h-3.5 text-[#cca553]" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Rendering Active Panel Component */}
      <div className="transition-all duration-300 animate-fadeIn" id="asset-dashboard-content-frame">
        {activeSubTab === 'registry' && <NationalAssetRegistryPanel lang={lang} onStateChange={onStateChange} />}
        {activeSubTab === 'strategic' && <StrategicAssetsPanel lang={lang} onStateChange={onStateChange} />}
        {activeSubTab === 'property' && <StatePropertyPanel lang={lang} onStateChange={onStateChange} />}
        {activeSubTab === 'valuation' && <AssetValuationPanel lang={lang} onStateChange={onStateChange} />}
        {activeSubTab === 'transfer' && <AssetTransferPanel lang={lang} onStateChange={onStateChange} />}
        {activeSubTab === 'audit' && <AssetAuditPanel lang={lang} onStateChange={onStateChange} />}
        {activeSubTab === 'risk' && <AssetRiskPanel lang={lang} onStateChange={onStateChange} />}
        {activeSubTab === 'infrastructure' && <InfrastructureAssetsPanel lang={lang} onStateChange={onStateChange} />}
      </div>
    </div>
  );
}
