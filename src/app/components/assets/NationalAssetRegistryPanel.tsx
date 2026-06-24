import React, { useState, useEffect } from 'react';
import { 
  Building2, Coins, ShieldCheck, FileText, Plus, Landmark, CheckCircle2, AlertTriangle, RefreshCw, Search, ChevronRight, MapPin
} from 'lucide-react';
import { NationalAssetRegistry, SovereignPhysicalAsset, AssetCategory, AssetLifecycle, OwnershipModel } from '../../../services/assets/NationalAssetRegistry';
import { AssetAuditEngine } from '../../../services/assets/AssetAuditEngine';
import { AssetRiskEngine } from '../../../services/assets/AssetRiskEngine';

interface NationalAssetRegistryPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function NationalAssetRegistryPanel({ lang, onStateChange }: NationalAssetRegistryPanelProps) {
  const [assets, setAssets] = useState<SovereignPhysicalAsset[]>([]);
  const [ticker, setTicker] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('INFRASTRUCTURE');
  const [ownership, setOwnership] = useState<OwnershipModel>('FEDERAL_IRAQ');
  const [jurisdiction, setJurisdiction] = useState<'federal' | 'krg' | 'joint'>('federal');
  const [valuation, setValuation] = useState('150.0');
  const [depreciation, setDepreciation] = useState('0.03');
  const [revenue, setRevenue] = useState('12.5');
  const [desc, setDesc] = useState('');

  const loadData = () => {
    setAssets(NationalAssetRegistry.getAssets());
  };

  useEffect(() => {
    loadData();
  }, [ticker]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const getCatLabel = (cat: string) => {
    switch (cat) {
      case 'all': return getLabel('ALL', 'الكل', 'هەموو');
      case 'ENERGY': return getLabel('ENERGY', 'طاقة', 'وزە');
      case 'INFRASTRUCTURE': return getLabel('INFRASTRUCTURE', 'بنية تحتية', 'ژێرخان');
      case 'WATER': return getLabel('WATER', 'مياه', 'ئاو');
      case 'TRANSPORT': return getLabel('TRANSPORT', 'نقل', 'گواستنەوە');
      case 'AIRPORT': return getLabel('AIRPORT', 'مطار', 'فڕۆکەخانە');
      case 'SEAPORT': return getLabel('SEAPORT', 'ميناء', 'بەندەر');
      case 'BORDER_GATE': return getLabel('BORDER GATE', 'منفذ حدودي', 'دەروازەی سنووری');
      case 'MILITARY': return getLabel('MILITARY', 'عسكري', 'سەربازی');
      case 'DIGITAL': return getLabel('DIGITAL', 'رقمي', 'دیجیتاڵی');
      case 'TELECOM': return getLabel('TELECOM', 'اتصالات', 'گەیاندن');
      case 'STRATEGIC': return getLabel('STRATEGIC', 'إستراتيجي', 'ستراتیژی');
      default: return cat;
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !valuation || !revenue) {
      alert('Please fill out essential fields');
      return;
    }

    const id = `AST-REG-${Math.floor(1000 + Math.random() * 9000)}`;
    const regAsset = {
      id,
      name,
      category,
      lifecycle: 'REGISTERED' as AssetLifecycle,
      lifecycleState: 'REGISTERED' as AssetLifecycle,
      ownership,
      jurisdiction,
      valuationUSD: parseFloat(valuation),
      depreciationRate: parseFloat(depreciation),
      annualRevenueYieldUSD: parseFloat(revenue),
      lastAuditDate: new Date().toISOString().split('T')[0],
      description: desc || 'Sovereign asset registered under administrative decree.'
    };

    NationalAssetRegistry.addAsset(regAsset, 'Sovereign Cabinet Executive');
    
    // Refresh
    setTicker(prev => prev + 1);
    setShowRegisterForm(false);
    
    // Reset Form
    setName('');
    setValuation('150.0');
    setRevenue('12.5');
    setDesc('');

    if (onStateChange) onStateChange();
  };

  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const stats = NationalAssetRegistry.calculateStateHealthMetrics();

  return (
    <div className="w-full space-y-6" id="national-asset-registry-panel">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111e2f] border border-[#233d5a] p-4 rounded-xl flex items-center justify-between" id="metric-assets-total">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 block block tracking-wider uppercase">
              {getLabel('Total State Capital', 'إجمالي الأصول السيادية', 'داهاتی گشتی سەروەری')}
            </span>
            <span className="text-xl font-bold text-[#cca553] font-sans">
              ${(stats.totalAssetValuationUSD / 1000).toFixed(2)}B
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {getLabel('Physical asset reserves', 'احتياطي الأصول المادية', 'سەرچاوە مادییەکان')}
            </span>
          </div>
          <Coins className="w-8 h-8 text-[#cca553]/70" />
        </div>

        <div className="bg-[#111e2f] border border-[#233d5a] p-4 rounded-xl flex items-center justify-between" id="metric-assets-coverage">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 block block tracking-wider uppercase">
              {getLabel('Core Asset Coverage', 'تغطية ديون الدولة', 'ڕێژەی داپۆشینی دارایی')}
            </span>
            <span className="text-xl font-bold text-emerald-400 font-sans">
              {stats.assetCoverageIndex}%
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {getLabel('Asset to debt coefficient', 'معامل الأصول إلى الديون', 'هاوکۆلکەی داهات بۆ قەرز')}
            </span>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-400/70" />
        </div>

        <div className="bg-[#111e2f] border border-[#233d5a] p-4 rounded-xl flex items-center justify-between" id="metric-audit-completion">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 block block tracking-wider uppercase">
              {getLabel('Audit Completion Rate', 'معدل إنجاز التدقيق', 'ڕێژەی تەواوبوونی وردبینی')}
            </span>
            <span className="text-xl font-bold text-[#cca553] font-sans">
              {stats.assetAuditCompletionRate}%
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {getLabel('FY2026 Sovereign cycle', 'الدورة السيادية لعام 2026', 'خولی وەزارەتی ساڵی ٢٠٢٦')}
            </span>
          </div>
          <CheckCircle2 className="w-8 h-8 text-amber-500/70" />
        </div>

        <div className="bg-[#111e2f] border border-[#233d5a] p-4 rounded-xl flex items-center justify-between" id="metric-blockchain-accuracy">
          <div>
            <span className="text-[11px] font-mono font-bold text-slate-400 block block tracking-wider uppercase">
              {getLabel('Sovereign Ledger Accuracy', 'دقة السجل الموحد', 'ڕێژەی دروستی دەفتەری دارایی')}
            </span>
            <span className="text-xl font-bold text-sky-400 font-sans">
              {stats.sovereignAssetAccuracyScore}/100
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {getLabel('SHA-256 state tracking', 'تشفير السلسلة الحكومية', 'سیستەمی پاراستنی زنجیرەیی')}
            </span>
          </div>
          <Landmark className="w-8 h-8 text-sky-400/70" />
        </div>
      </div>

      {/* Table & Controls card */}
      <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#cca553]" />
              {getLabel('National Sovereign State Asset Registry', 'سجل أصول الدولة السيادية الموحد', 'تۆماری فەرمی سەرچاوە و سامانەکانی وڵات')}
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              {getLabel('Decentralized consensus tracking of federal, regional (KRG), and joint physical, strategic, and land infrastructure.',
                       'تتبع توافقي غير مركزي للبنى التحتية والأراضي والأصول الإستراتيجية كوردستانية والاتحادية.',
                       'چاودێری فەرمی و چڕی سەرچاوە، خاک، پڕۆژە نیشتمانییەکان، فڕۆکەخانەکان و گرێبەستە فیدراڵ و هەرێمییەکان.')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRegisterForm(!showRegisterForm)}
              className="px-3.5 py-1.5 bg-[#182a3d] border border-[#cca553]/30 hover:bg-[#cca553]/10 text-[#cca553] text-xs font-mono font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              {getLabel('Register Asset', 'تسجيل أصل جديد', 'تۆمارکردنی سامانێک')}
            </button>
            <button
              onClick={() => setTicker(t => t + 1)}
              className="p-1.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-white rounded-lg cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Overlay */}
        {showRegisterForm && (
          <form onSubmit={handleRegister} className="bg-slate-950 p-4 rounded-xl border border-[#cca553]/20 space-y-3">
            <h4 className="text-xs font-bold font-mono text-[#cca553] uppercase tracking-wider">
              {getLabel('Initiate Primary Registration', 'بدء عملية التسجيل الأولي', 'دەستپێکردنی تۆمارکردنی سەرەتایی')}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                  {getLabel('Asset Name', 'اسم الأصل', 'ناوی سامانەکە')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={getLabel('e.g. Kirkuk Water Treatment Station', 'مثل: محطة تصفية المياه في كركوك', 'بۆ نموونە: وێستگەی پاڵاوتنی ئاوی کەرکووک')}
                  className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white focus:outline-none focus:border-[#cca553]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                  {getLabel('Asset Category', 'فئة الأصل', 'جۆری سامانەکە')}
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as AssetCategory)}
                  className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white focus:outline-none"
                >
                  <option value="ENERGY">{getLabel('ENERGY', 'طاقة', 'وزە')}</option>
                  <option value="INFRASTRUCTURE">{getLabel('INFRASTRUCTURE', 'بنية تحتية', 'ژێرخان')}</option>
                  <option value="WATER">{getLabel('WATER', 'مياه', 'ئاو')}</option>
                  <option value="TRANSPORT">{getLabel('TRANSPORT', 'نقل', 'گواستنەوە')}</option>
                  <option value="AIRPORT">{getLabel('AIRPORT', 'مطار', 'فڕۆکەخانە')}</option>
                  <option value="SEAPORT">{getLabel('SEAPORT', 'ميناء بحري', 'بەندەر')}</option>
                  <option value="BORDER_GATE">{getLabel('BORDER GATE', 'منفذ حدودي', 'دەروازەی سنووری')}</option>
                  <option value="MILITARY">{getLabel('MILITARY', 'عسكري', 'سەربازی')}</option>
                  <option value="DIGITAL">{getLabel('DIGITAL', 'رقمي', 'دیجیتاڵی')}</option>
                  <option value="TELECOM">{getLabel('TELECOM', 'اتصالات', 'گەیاندن')}</option>
                  <option value="STRATEGIC">{getLabel('STRATEGIC', 'إستراتيجي', 'ستراتیژی')}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                  {getLabel('Ownership Authority', 'جهة الملكية', 'لایەنی خاوەندارێتی')}
                </label>
                <select
                  value={ownership}
                  onChange={e => setOwnership(e.target.value as OwnershipModel)}
                  className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white focus:outline-none"
                >
                  <option value="FEDERAL_IRAQ">{getLabel('FEDERAL IRAQ', 'العراق الاتحادي', 'عێراقی فیدراڵ')}</option>
                  <option value="KRG">{getLabel('KURDISTAN REGION (KRG)', 'إقليم كوردستان', 'هەرێمی کوردستان')}</option>
                  <option value="JOINT">{getLabel('JOINT COUNCIL', 'مجلس مشترك', 'ئەنجومەنی هاوبەش')}</option>
                  <option value="MINISTRY">{getLabel('MINISTRY LEVEL', 'مستوى الوزارة', 'ئاستی وەزارەت')}</option>
                  <option value="STATE_ENTERPRISE">{getLabel('STATE OWNED ENTERPRISE', 'شركة تابعة للدولة', 'کۆمپانیای سەر بە دەوڵەت')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                  {getLabel('Constitutional Jurisdiction', 'الولاية الدستورية', 'دەسەڵاتی دەستووری')}
                </label>
                <select
                  value={jurisdiction}
                  onChange={e => setJurisdiction(e.target.value as 'federal' | 'krg' | 'joint')}
                  className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white focus:outline-none"
                >
                  <option value="federal">{getLabel('FEDERAL', 'اتحادي', 'فیدراڵ')}</option>
                  <option value="krg">{getLabel('KRG', 'إقليم كوردستان', 'هەرێمی کوردستان')}</option>
                  <option value="joint">{getLabel('JOINT BOUNDARY', 'حدود مشتركة', 'سنووری هاوبەش')}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                  {getLabel('Valuation ($ Millions USD)', 'التقييم الفوري ($ مليون دولار)', 'نرخاندنی سەرەتایی (ملیۆن دۆلار)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={valuation}
                  onChange={e => setValuation(e.target.value)}
                  className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                  {getLabel('Annual Revenue ($M USD)', 'العائد السنوي المتوقع ($ مليون)', 'داهاتی ساڵانەی پێشبینیکراو (ملیۆن دۆلار)')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={revenue}
                  onChange={e => setRevenue(e.target.value)}
                  className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                  {getLabel('Depreciation Rate (Annual %)', 'نسبة الإهلاك السنوي', 'ڕێژەی دابەزینی بەهای ساڵانە')}
                </label>
                <input
                  type="number"
                  step="0.001"
                  required
                  value={depreciation}
                  onChange={e => setDepreciation(e.target.value)}
                  className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold">
                {getLabel('Asset Descriptions & Boundary Notes', 'الملاحظات التقنية والوصف', 'تێبینییەکان و پێناسەکردنی پڕۆژەکە')}
              </label>
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder={getLabel('Constitutional coordinates, parcel codes...', 'الرموز والإحداثيات الجغرافية...', 'کۆئۆردینیتی دەستووری، کۆدەکانی پارچە زەوی...')}
                className="w-full max-w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs p-2 text-white h-16 focus:outline-none whitespace-normal break-words"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#1a2c42] to-[#254162] border border-[#cca553]/40 hover:border-[#cca553] text-[#cca553] text-xs font-mono font-bold rounded-lg cursor-pointer"
            >
              {getLabel('Execute Cryptographic Decentralized Registry Entry', 'تنفيذ تشفير قيد السجل الموحد', 'دروستکردنی بڕوانامەی تۆمارکردنی کلیلدار')}
            </button>
          </form>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-950 p-2 rounded-xl w-full">
          <div className="relative flex-1 min-w-[200px]">
            <Search className={`w-4 h-4 absolute ${lang !== 'en' ? 'right-3' : 'left-3'} top-2.5 text-slate-400`} />
            <input
              type="text"
              placeholder={getLabel('Search assets by name or ledger ID', 'البحث في سجل الأصول السيادية', 'گەڕان بەدوای سامان یان پڕۆژە نیشتمانییەکان')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full bg-[#111e2f] border border-[#233d5a] rounded-lg text-xs ${lang !== 'en' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-2 text-white focus:outline-none`}
            />
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {['all', 'ENERGY', 'INFRASTRUCTURE', 'WATER', 'AIRPORT', 'SEAPORT', 'BORDER_GATE', 'DIGITAL'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-[#182a3d] border-[#cca553]/40 text-[#cca553]'
                    : 'border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {getCatLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Table Render */}
        <div className="overflow-x-auto rounded-xl border border-slate-900 w-full">
          <table className="w-full text-start border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-900">
                <th className="p-3 text-start">{getLabel('Asset ID & Name', 'مُعرّف واسم الأصل', 'ناسنامە و ناوی سامانەکە')}</th>
                <th className="p-3 text-start">{getLabel('Type', 'النوع والجهة', 'جۆر و دەسەڵات')}</th>
                <th className="p-3 text-start">{getLabel('Location / Status', 'الموقع والحالة الدستورية', 'پۆلێن / دۆخی یاسایی')}</th>
                <th className="p-3 text-end">{getLabel('Sovereign Value', 'التقييم المالي', 'بەهای گشتی')}</th>
                <th className="p-3 text-end">{getLabel('Revenue Yield', 'العائد السنوي', 'داهاتی ساڵانە')}</th>
                <th className="p-3 text-start">{getLabel('Consensus Ledger', 'سلسلة التدقيق والتشفير', 'تۆماری نهێنی و وردبینی')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 bg-slate-950/40">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    {getLabel('No matches resolved in the current sovereign view', 'لم يتم العثور على أصول تطابق في المنظور الخاضع للولاية', 'هیچ سەرچاوەیەکی گونجاو لەم بوارەدا نەدۆزرایەوە')}
                  </td>
                </tr>
              ) : (
                filteredAssets.map(asset => (
                  <tr key={asset.id} className="hover:bg-slate-900/50 transition-all font-sans">
                    <td className="p-3 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-[#cca553]/70 shrink-0" />
                        <span className="break-words white-space-normal">{asset.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 block">{asset.id}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#111e2f] border border-[#233d5a] text-[#cca553] whitespace-nowrap">
                        {getCatLabel(asset.category)}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-1 whitespace-nowrap">
                        {asset.ownership === 'FEDERAL_IRAQ' ? getLabel('Federal Iraq', 'العراق الاتحادي', 'عێراقی فیدراڵ') :
                         asset.ownership === 'KRG' ? getLabel('Kurdistan Region (KRG)', 'إقليم كوردستان', 'هەرێمی کوردستان') :
                         asset.ownership === 'JOINT' ? getLabel('Joint Council', 'مجلس مشترك', 'ئەنجومەنی هاوبەش') :
                         asset.ownership === 'MINISTRY' ? getLabel('Ministry Level', 'مستوى الوزارة', 'ئاستی وەزارەت') :
                         asset.ownership === 'STATE_ENTERPRISE' ? getLabel('State Owned Enterprise', 'شركة تابعة للدولة', 'کۆمپانیای سەر بە دەوڵەت') :
                         asset.ownership}
                      </span>
                    </td>
                    <td className="p-3 space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        asset.lifecycle === 'ACTIVE' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/40' : 
                        asset.lifecycle === 'VERIFIED' ? 'bg-blue-950/60 text-blue-400 border border-blue-900/40' : 'bg-slate-900 text-slate-400 border-transparent'
                      }`}>
                        {asset.lifecycle === 'ACTIVE' ? getLabel('ACTIVE', 'نشط', 'چالاک') :
                         asset.lifecycle === 'VERIFIED' ? getLabel('VERIFIED', 'مؤكد', 'پەسەندکراو') :
                         asset.lifecycle === 'REGISTERED' ? getLabel('REGISTERED', 'مسجل', 'تۆمارکراو') :
                         asset.lifecycle}
                      </span>
                      <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        {asset.jurisdiction === 'federal' ? getLabel('FEDERAL', 'اتحادي', 'فیدراڵ') :
                         asset.jurisdiction === 'krg' ? getLabel('KRG', 'إقليم كوردستان', 'هەرێمی کوردستان') :
                         asset.jurisdiction === 'joint' ? getLabel('JOINT BOUNDARY', 'حدود مشتركة', 'سنووری هاوبەش') :
                         asset.jurisdiction}
                      </span>
                    </td>
                    <td className="p-3 text-end font-mono font-bold text-[#cca553] whitespace-nowrap">
                      ${asset.valuationUSD.toLocaleString()}M
                    </td>
                    <td className="p-3 text-end font-mono text-slate-300 whitespace-nowrap">
                      ${asset.annualRevenueYieldUSD.toLocaleString()}M
                      <span className="block text-[10px] text-slate-500 font-mono">{(asset.annualRevenueYieldUSD / asset.valuationUSD * 100).toFixed(1)}% yield</span>
                    </td>
                    <td className="p-3 font-mono space-y-1 min-w-[150px]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-slate-400">{getLabel('Compliance', 'الامتثال', 'پابەندبوون')}: <b className="text-emerald-400">{asset.complianceScore}%</b></span>
                        <span className="text-[10px] text-slate-400">{getLabel('Risk', 'المخاطر', 'مەترسی')}: <b className="text-red-400">{asset.riskScore}%</b></span>
                      </div>
                      <div className="text-[9px] text-slate-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[170px]" title={asset.auditHash}>
                        {asset.auditHash}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
