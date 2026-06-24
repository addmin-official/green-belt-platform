import React, { useState, useEffect } from 'react';
import { 
  Home, Map, MapPin, ClipboardList, Shield, RefreshCw, FileSignature, CheckCircle2, ChevronRight
} from 'lucide-react';
import { StatePropertyRegistry } from '../../../services/assets/StatePropertyRegistry';
import { LandRegistryEngine, LandParcel } from '../../../services/assets/LandRegistryEngine';
import { SovereignPhysicalAsset } from '../../../services/assets/NationalAssetRegistry';

interface StatePropertyPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onStateChange?: () => void;
}

export default function StatePropertyPanel({ lang, onStateChange }: StatePropertyPanelProps) {
  const [properties, setProperties] = useState<SovereignPhysicalAsset[]>([]); // | موڵکەکان
  const [selectedPropId, setSelectedPropId] = useState<string>(''); // | ناسنامەی موڵکی هەڵبژێردراو
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null); // | پارچە زەوی هەڵبژێردراو
  const [ticker, setTicker] = useState(0); // | ژمێریار (بۆ نوێکردنەوەی داتا)

  // | فۆڕمی تۆمارکردن
  const [showForm, setShowForm] = useState(false); // | پیشاندانی فۆڕم
  const [name, setName] = useState(''); // | ناو
  const [category, setCategory] = useState<'LAND' | 'BUILDING' | 'INDUSTRIAL' | 'AGRICULTURE' | 'MINERAL'>('LAND'); // | پۆلێن
  const [governorate, setGovernorate] = useState('Erbil'); // | پارێزگا (هەولێر)
  const [hectares, setHectares] = useState('45.0'); // | ڕووبەر (هێکتار)
  const [cadastral, setCadastral] = useState('CAD-'); // | کۆدی تاپۆ
  const [valuationUSD, setValuationUSD] = useState('20'); // | نرخاندن (ملیۆن دۆلار)
  const [description, setDescription] = useState(''); // | وەسف

  const loadData = () => {
    const list = StatePropertyRegistry.getProperties();
    setProperties(list);
    if (list.length > 0 && !selectedPropId) {
      setSelectedPropId(list[0].id);
    }
  };

 useEffect(() => {
    loadData();
  }, [ticker]);

  useEffect(() => {
    if (selectedPropId) {
      const details = LandRegistryEngine.getParcelDetails(selectedPropId);
      if (details) {
        setSelectedParcel(details);
      } else {
        setSelectedParcel(null);
      }
    }
  }, [selectedPropId, ticker]);

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'ku') return ku;
    if (lang === 'ar') return ar;
    return en;
  };

  const handleRegisterProp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cadastral || !hectares) {
      alert('| تکایە زانیارییە پێویستەکان پڕبکەرەوە');
      return;
    }

    const reg = StatePropertyRegistry.registerProperty({
      name,
      category,
      lifecycle: 'REGISTERED', // | تۆمارکراو
      lifecycleState: 'REGISTERED',
      ownership: 'MINISTRY', // | وەزارەت
      jurisdiction: governorate.toLowerCase() === 'basra' || governorate.toLowerCase() === 'baghdad' ? 'federal' : governorate.toLowerCase() === 'erbil' || governorate.toLowerCase() === 'sulaymaniyah' || governorate.toLowerCase() === 'duhok' ? 'krg' : 'joint',
      valuationUSD: parseFloat(valuationUSD),
      depreciationRate: 0.02,
      annualRevenueYieldUSD: parseFloat(valuationUSD) * 0.05,
      lastAuditDate: new Date().toISOString().split('T')[0],
      description: description || '| پارچە زەوییەکی حکومییە و بەپێی دەستوور لە تاپۆ تۆمارکراوە.'
    }, '| نووسینگەی ڕووپێوی سەروەری');
   // | تۆمارکردنی وردەکاری پارچە زەوی
    LandRegistryEngine.registerParcel(reg.id, {
      governorate,
      hectares: parseFloat(hectares),
      cadastralCode: cadastral,
      surveyConfirmed: true,
      geographicZonings: '| سنووری کشتوکاڵی/شارستانی سنووردارکراوی سەروەری'
    });

    setTicker(prev => prev + 1);
    setShowForm(false);
    setName('');
    setCadastral('CAD-');
    setDescription('');

    if (onStateChange) onStateChange();
  };

  return (
    <div className="bg-[#0e1726]/80 p-5 rounded-2xl border border-slate-900 shadow-xl space-y-4" id="state-property-panel">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold font-sans text-slate-100 flex items-center gap-2">
            <Home className="w-5 h-5 text-amber-500" />
            {getLabel('State Land & Real Property Registry', 'سجل الأراضي والملكيات العقارية للدولة', '| سامانی نیشتمانی و تۆماری زەوی و زار')}
          </h3>
          <p className="text-xs text-slate-400 font-sans">
            {getLabel('Federal cadastral mapping, agricultural deeds, and metropolitan government building controls.',
                     'المسح العقاري الاتحادي، صكوك الأراضي الحكومية، وتنظيم عقارات الخدمة العامة.',
                     '| ووردەکاری فەرمی نەخشەسازی و ڕووپێوی خاکی نیشتمانی، زەوی کشتوکاڵی، مۆڵکە گشتییەکان.')}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3.5 py-1.5 bg-[#182a3d] border border-[#cca553]/30 hover:bg-[#cca553]/10 text-[#cca553] text-[10px] font-mono font-bold rounded-lg cursor-pointer transition-all uppercase flex items-center gap-1.5"
        >
          <FileSignature className="w-3.5 h-3.5" />
          {getLabel('Register Property', 'تسجيل ملكية', '| تۆمارکردنی مۆڵک')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleRegisterProp} className="bg-slate-950 p-4 rounded-xl border border-[#cca553]/20 space-y-3">
          <h4 className="text-xs font-bold font-mono text-[#cca553] uppercase tracking-wider">
            {getLabel('Cadastral Land Ledger Deed Filing', 'تسجيل صك رسمي في سجل العقارات', 'تۆمارکردنی ڕێوشوێنی نوێی زەوی')}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">PROPERTY NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Erbil Government Complex Phase 2"
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">CATEGORY</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              >
                <option value="LAND">LAND</option>
                <option value="BUILDING">BUILDING</option>
                <option value="INDUSTRIAL">INDUSTRIAL</option>
                <option value="AGRICULTURE">AGRICULTURE</option>
                <option value="MINERAL">MINERAL</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">GOVERNORATE</label>
              <select
                value={governorate}
                onChange={e => setGovernorate(e.target.value)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              >
                <option value="Erbil">Erbil</option>
                <option value="Sulaymaniyah">Sulaymaniyah</option>
                <option value="Duhok">Duhok</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Nineveh">Nineveh</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">CADASTRAL CODE</label>
              <input
                type="text"
                required
                value={cadastral}
                onChange={e => setCadastral(e.target.value)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">HECTARES (SIZE)</label>
              <input
                type="number"
                step="0.1"
                required
                value={hectares}
                onChange={e => setHectares(e.target.value)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 block font-bold">ESTIMATED VALUE ($M USD)</label>
              <input
                type="number"
                required
                value={valuationUSD}
                onChange={e => setValuationUSD(e.target.value)}
                className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 block font-bold">DESCRIPTIVE BOUNDARY DETAILS</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Coordinates, surrounding state highways..."
              className="w-full bg-[#111e2f] border border-[#233d5a] rounded text-xs p-2 text-white"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-emerald-900 to-teal-900 text-emerald-200 border border-emerald-500/30 text-xs font-mono font-bold rounded cursor-pointer"
          >
            {getLabel('Publish to Cadastral Sovereign Block', 'نشر صك الملكية المشفر', 'تۆمارکردنی ئەلیکترۆنی لە کۆپی فەرمی')}
          </button>
        </form>
      )}

      {/* Main Panel View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 font-sans uppercase flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-slate-400" />
            {getLabel('Registered Institutional Properties', 'سجل الملكيات العقارية المسجلة', 'سامانە فەرمی و زەوییە کشتوکاڵییەکان')}
          </h4>

          {properties.length === 0 ? (
            <p className="text-xs font-mono text-slate-500 italic p-6 text-center">
              {getLabel('No agricultural or civil properties registered', 'لم يتم تفعیل ممتلكات حكومية في السجل', 'هیچ زەوییەک یا مۆڵکێک لە دەفتەری نیشتمانیدا نییە')}
            </p>
          ) : (
            <div className="space-y-2 overflow-y-auto max-h-[280px]">
              {properties.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPropId(p.id)}
                  className={`w-full text-start p-2.5 rounded-lg border transition-all flex items-center justify-between outline-none cursor-pointer ${
                    selectedPropId === p.id 
                      ? 'bg-[#111e2f] border-[#cca553]/40' 
                      : 'bg-slate-950 border-slate-900 hover:bg-slate-905'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-100 block">{p.name}</span>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">{p.id} • {p.category}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Panel Right */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#cca553] font-sans uppercase border-b border-slate-950/40 pb-2 flex items-center gap-1.5">
              <Map className="w-4 h-4 text-[#cca553]" />
              {getLabel('Cadastral & Title Deed Record', 'سند الملكية العقارية الدقيق', 'تۆماری فەرمی تێبینییەکانی زەوی و موڵک')}
            </h4>

            {selectedParcel ? (
              <div className="space-y-3 text-xs font-sans">
                <div className="grid grid-cols-2 gap-3" id="cadastral-deed-grid">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">GOVERNORATE</span>
                    <span className="font-bold text-slate-200">{selectedParcel.governorate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">CADASTRAL CODE</span>
                    <span className="font-bold text-slate-200 font-mono">{selectedParcel.cadastralCode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">HECTARES</span>
                    <span className="font-bold text-[#cca553] font-mono">{selectedParcel.hectares} ha</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">SURVEY STATUS</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      SECURED & VERIFIED
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#111e2f] border border-[#233d5a] rounded-lg">
                  <span className="text-[10px] text-slate-300 font-bold block font-mono">GEOGRAPHICAL BOUNDARY ZONING</span>
                  <p className="text-[11px] text-slate-400 mt-1">{selectedParcel.geographicZonings}</p>
                </div>
              </div>
            ) : (
              <div className="bg-[#182335] p-4 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-500 block">NO CADASTRAL PARCEL RECORD FOUND</span>
                  This property contains sovereign status without agricultural parcel tracking data. Select or register a parcel mapping.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
