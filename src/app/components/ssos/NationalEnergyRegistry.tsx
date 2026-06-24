import React, { useState } from 'react';
import { useSsos } from '../../../providers/SsosProvider';
import { NationalEnergyRegistry as RevenueRegistryClass } from '../../../services/ssos/SsosEngines';
import { Card, Badge, Button } from '../../../ui';
import { 
  Flame, 
  Settings, 
  MapPin, 
  Plus, 
  Boxes, 
  Briefcase, 
  TrendingUp, 
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';

interface NationalEnergyPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const NationalEnergyRegistryComponent: React.FC<NationalEnergyPanelProps> = ({ lang }) => {
  const { energyFields, ssosMode, addEnergyField, updateEnergyProduction } = useSsos();
  const [selectedFieldId, setSelectedFieldId] = useState<string>('ENG-FLD-01');
  const [showAddAsset, setShowAddAsset] = useState<boolean>(false);
  const [editRate, setEditRate] = useState<string>('1400000');
  const [editPrice, setEditPrice] = useState<string>('75');

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'oil' | 'gas'>('oil');
  const [newLocation, setNewLocation] = useState('');
  const [newRate, setNewRate] = useState('150000');
  const [newPrice, setNewPrice] = useState('75');
  const [newJurisdiction, setNewJurisdiction] = useState<'federal' | 'krg' | 'joint'>('federal');

  const selectedField = energyFields.find(f => f.id === selectedFieldId) || energyFields[0];

  const handleUpdateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFieldId) return;
    updateEnergyProduction(
      selectedFieldId, 
      parseInt(editRate) || 100000, 
      parseFloat(editPrice) || 75
    );
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation) return;
    
    const rateVal = parseInt(newRate);
    const priceVal = parseFloat(newPrice);
    
    addEnergyField({
      id: `ENG-FLD-${Date.now().toString().slice(-4)}`,
      name: newName,
      type: newType,
      location: newLocation,
      jurisdiction: newJurisdiction,
      productionRate: rateVal,
      exportRate: Math.round(rateVal * 0.85),
      domesticRate: Math.round(rateVal * 0.15),
      pricePerBarrel: priceVal,
      dailyRevenue: rateVal * priceVal / 1000000
    });

    setShowAddAsset(false);
    setNewName('');
    setNewLocation('');
  };

  const t = {
    en: {
      title: 'National Petroleum & Energy Registry',
      sub: 'Hydrocarbon output tracing, production allocations and strategic export clearances.',
      addAsset: 'Register Energy Wellblock',
      assetName: 'Asset/Field Name',
      location: 'Administrative Location',
      productionRate: 'Production Rate (Barrels / Day)',
      mcfRate: 'Production Rate (MCF / Day)',
      price: 'Reference Market Pricing (USD)',
      jurisdiction: 'Sovereign Ownership Jurisdiction',
      addBtn: 'Seal Registry Row',
      updateBtn: 'Commit Logs & Rate',
      dailyEst: 'Daily Estimated Well Revenue',
      beneficiaries: 'Beneficiary Distribution Yields',
      federalShare: 'Federal Treasury Equity',
      krgShare: 'Kurdistan Region Equity',
      operator: 'Authorized Operations Authority',
      type: 'Hydrocarbon Type'
    },
    ar: {
      title: 'السجل الوطني الموحد للنفط والغاز والثروات الطبيعية',
      sub: 'تتبع إنتاج الآبار النفطية والغازية الوطنية، ومستويات التصدير والتكرار واحتساب مستحق الخزانة.',
      addAsset: 'تسجيل حقل أو بلك استكشافي جديد',
      assetName: 'اسم الحقل أو المربع الاستكشافي',
      location: 'المحافظة والموقع الإداري',
      productionRate: 'معدل الإنتاج اليومي (برميل/يوم)',
      mcfRate: 'معدل الإنتاج اليومي (قدم مكعب قياسي/يوم)',
      price: 'السعر المرجعي لبرميل السلة الوطنية (USD)',
      jurisdiction: 'نطاق الإدارة والملكية السيادية',
      addBtn: 'حفظ وتسجيل البيانات الملكية',
      updateBtn: 'تحديث بيانات ومعدلات الإنتاج حياً',
      dailyEst: 'العوائد والنفقات الإجمالية اليومية المرصودة',
      beneficiaries: 'نسب دمج وتوافق العوائد السيادية للمالكين',
      federalShare: 'أسهم وحصة الخزانة الاتحادية',
      krgShare: 'أسهم وحصة موازنة إقليم كوردستان',
      operator: 'الجهة والمؤسسة المشغلة المرخصة',
      type: 'صنف الموارد الهيدروكربونية'
    },
    ku: {
  header: '| وزەی نیشتمانی',
  title: '| تۆماری گشتی نەوت و غازی نیشتمانی',
  sub: '| چاودێریکردنی نرخ، هەناردەکردن، بەکارهێنانی ناوخۆیی و کۆی داهاتەکانی کەرتی وزە.',
  addAsset: '| تۆمارکردنی کێڵگەیەکی نوێی وزە',
  assetName: '| ناوی کێڵگە یان کەرتی وزە',
  location: '| شوێنی جوگرافی',
  productionRate: '| ڕێژەی بەرهەمهێنانی نەوت بۆ هەر ڕۆژێک',
  mcfRate: '| ڕێژەی بەرهەمهێنانەکەی غاز بۆ هەر ڕۆژێک',
  price: '| نرخی بنەڕەتی فەرمی (USD)',
  jurisdiction: '| خاوەندارییەتی فەرمی دەوڵەت',
  addBtn: '| سەبت کردنی داتا نوێیەکان',
  updateBtn: '| نوێکردنەوەی ژمارەکان',
  dailyEst: '| پێشبینی داهاتی ڕۆژانەی ئەم کەرتی وزەیە',
  beneficiaries: '| هاوبەشی دابەشکردنی خێرەکە',
  federalShare: '| پشکی سندوقی نیشتمانی عێراق',
  krgShare: '| پشکی هەرێمی کوردستان',
  operator: '| دەزگای ڕێپێدراو بۆ بەڕێوەبردن',
  type: '| جۆری سەرچاوەی وزە'
}
  }[lang];

  // Derived calculations
  const ownershipMap = selectedField 
    ? RevenueRegistryClass.getFieldOwnershipDetails(selectedField, ssosMode)
    : { operator: 'SOMO', beneficiaryShareFederal: 100, beneficiaryShareKrg: 0 };

  const dailyVal = selectedField ? RevenueRegistryClass.computeProductionValue(selectedField) : 0;

  return (
    <div id="national-energy-governance-hub" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Page Header card */}
      <Card className="bg-[#0b1329]/95 border-amber-900/40 p-6 rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-950/80 border border-orange-500 rounded-lg text-orange-500">
            <Flame className="w-6 h-6 animate-pulse shrink-0" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              {t.title}
              <Badge variant="teal">ENERGY_REGISTRY_V2</Badge>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.sub}</p>
          </div>
        </div>
        <Button variant="emerald" className="text-xs shrink-0 flex items-center gap-1.5" onClick={() => setShowAddAsset(!showAddAsset)}>
          <Plus className="w-3.5 h-3.5" />
          {t.addAsset}
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Create blocks and active list layout */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {showAddAsset && (
            <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-3">
              <h3 className="text-xs font-mono text-[#E0A96D] uppercase tracking-widest">{t.addAsset}</h3>
              <form onSubmit={handleCreateAsset} className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.assetName}</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="E.g. Shaikan Oil Field"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.type}</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="oil">OIL (Crude Petroleum)</option>
                    <option value="gas">GAS (Natural Dry Gas)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.location}</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    placeholder="E.g. Duhok, KRG Boundary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono">Prod. Volume</label>
                    <input
                      type="number"
                      value={newRate}
                      onChange={e => setNewRate(e.target.value)}
                      className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-slate-400 uppercase font-mono">Price (USD)</label>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={e => setNewPrice(e.target.value)}
                      className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">{t.jurisdiction}</label>
                  <select
                    value={newJurisdiction}
                    onChange={e => setNewJurisdiction(e.target.value as any)}
                    className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                  >
                    <option value="federal">FEDERAL_IRAQ</option>
                    <option value="krg">KURDISTAN_REGION</option>
                    <option value="joint">JOINT_OPERATIONS</option>
                  </select>
                </div>

                <Button type="submit" variant="emerald" className="w-full text-xs mt-1">
                  {t.addBtn}
                </Button>
              </form>
            </Card>
          )}

          <Card className="bg-[#0b1329]/95 border-slate-900 p-5 rounded-xl flex flex-col gap-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Active Field Ledger Rows</span>
            <div className="flex flex-col gap-2.5">
              {energyFields.map(f => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFieldId(f.id);
                    setEditPrice(f.pricePerBarrel.toString());
                    setEditRate(f.productionRate.toString());
                  }}
                  className={`p-3 rounded-lg border text-start transition flex items-center justify-between cursor-pointer ${
                    selectedFieldId === f.id
                      ? 'bg-amber-950/40 border-amber-600/70 shadow'
                      : 'bg-slate-900/40 border-slate-900'
                  }`}
                >
                  <div className="flex flex-col text-start">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">ID: {f.id} • {f.jurisdiction.toUpperCase()}</span>
                    <strong className="text-xs font-bold text-slate-200 lines-clamp-1 mt-0.5">{f.name}</strong>
                  </div>
                  <Badge variant={f.type === 'oil' ? 'gold' : 'sky'}>
                    {f.type.toUpperCase()}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column: Hydrocarbon tracing metrics and outputs */}
        {selectedField && (
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="bg-[#0b1329]/95 border-slate-900 p-6 rounded-xl flex flex-col gap-6">
              
              {/* Headline block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-4">
                <div>
                  <Badge variant={selectedField.jurisdiction === 'federal' ? 'teal' : selectedField.jurisdiction === 'krg' ? 'emerald' : 'gold'}>
                    {selectedField.jurisdiction.toUpperCase()} OWNER
                  </Badge>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedField.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    {selectedField.location}
                  </p>
                </div>

                <div className="text-start sm:text-end bg-slate-900/50 p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">{t.dailyEst}</span>
                  <strong className="text-xl font-mono text-emerald-400 font-extrabold">
                    ${(selectedField.dailyRevenue).toFixed(2)}M USD
                  </strong>
                </div>
              </div>

              {/* Dynamic state data overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Form to update rates */}
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                    Modify Production Log
                  </span>

                  <form onSubmit={handleUpdateAsset} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-slate-400 uppercase font-mono">
                        {selectedField.type === 'oil' ? t.productionRate : t.mcfRate}
                      </label>
                      <input
                        type="number"
                        value={editRate}
                        onChange={e => setEditRate(e.target.value)}
                        className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-slate-400 uppercase font-mono">{t.price}</label>
                      <input
                        type="number"
                        step="0.05"
                        value={editPrice}
                        onChange={e => setEditPrice(e.target.value)}
                        className="bg-slate-950 border border-slate-900 rounded p-2 text-xs text-slate-200 outline-none"
                      />
                    </div>

                    <Button type="submit" variant="teal" className="text-xs">
                      {t.updateBtn}
                    </Button>
                  </form>
                </div>

                {/* Operator and shares details */}
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                    <Briefcase className="w-4 h-4 text-[#E0A96D]" />
                    Sovereign Governance Metadata
                  </span>

                  <div className="flex flex-col gap-3 bg-slate-900/20 p-4 border border-slate-900 rounded-lg">
                    <div>
                      <span className="text-[9px] text-slate-500 block font-mono uppercase">{t.operator}</span>
                      <strong className="text-xs text-slate-200 bg-slate-950 px-2 py-1 rounded inline-block mt-1 font-mono">
                        {ownershipMap.operator}
                      </strong>
                    </div>

                    <div className="border-t border-slate-900 mt-2 pt-3">
                      <span className="text-[9px] text-slate-500 block font-mono uppercase mb-2">{t.beneficiaries}</span>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">{t.federalShare}</span>
                          <span className="font-mono text-slate-200 font-bold">{ownershipMap.beneficiaryShareFederal}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500" style={{ width: `${ownershipMap.beneficiaryShareFederal}%` }} />
                        </div>

                        <div className="flex justify-between items-center text-xs mt-1">
                          <span className="text-slate-400">{t.krgShare}</span>
                          <span className="font-mono text-slate-200 font-bold">{ownershipMap.beneficiaryShareKrg}%</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${ownershipMap.beneficiaryShareKrg}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </Card>
          </div>
        )}

      </div>

    </div>
  );
};
export default NationalEnergyRegistryComponent;
