import React, { useState } from 'react';
import { TreatyRegistry, Treaty, TreatyStatus, TreatyType } from '../../services/federation/TreatyRegistry';
import { TreatyEngine } from '../../services/federation/TreatyEngine';
import { Card, Button, Badge } from '../../ui';
import { FileSignature, Globe2, Shield, Radio, Activity, CheckCircle, Scale, Plus } from 'lucide-react';
import { useGovernment } from '../../providers/GovernmentProvider';

interface JointTreatyCenterProps {
  lang: 'en' | 'ar' | 'ku';
}

export const JointTreatyCenter: React.FC<JointTreatyCenterProps> = ({ lang }) => {
  const { userRole, logAction } = useGovernment();
  const [treaties, setTreaties] = useState<Treaty[]>(() => TreatyRegistry.getTreaties());

  // Propose Treaty controls
  const [showForm, setShowForm] = useState(false);
  const [titleEn, setTitleEn] = useState('');
  const [titleKu, setTitleKu] = useState('');
  const [type, setType] = useState<TreatyType>('customs');
  const [parties, setParties] = useState('Federal Ministry & KRG Dept');
  const [law, setLaw] = useState('Unified Constitution Treaty Protocol');

  const t = {
    en: {
      title: 'Bilateral Treaty & Accords Orchestration Center',
      sub: 'Drafting, negotiating, and ratifying sovereign bilateral treaties to coordinate customs, data-exchanges, and joint boundary domains.',
      activeCount: 'Active Sovereign Compacts',
      lifecycleHeader: 'Active Treaty Registers & Compliance Density',
      createBtn: 'Propose Bilateral Compact',
      formTitle: 'Compact Title (English)',
      formTitleKu: 'Compact Title (Kurdish)',
      formType: 'Focus Domain',
      partiesField: 'Signing Plenipotentiary Parties',
      lawField: 'Governing National Framework Accord',
      submit: 'Submit Draft Compact to Review Cabinets',
      signSeal: 'Advance Lifecycle Stage',
      compliance: 'Compliance Integrity',
      partiesLabel: 'Sovereign Signers'
    },
    ar: {
      title: 'مجلس المعاهدات والاتفاقيات السيادية المشتركة',
      sub: 'صياغة ومفاوضات واعتماد المعاهدات الثنائية لتنظيم الجمارك والتحقق ومزامنة بوابات العبور والحدود.',
      activeCount: 'الاتفاقيات السيادية النشطة',
      lifecycleHeader: 'سجل المعاهدات الحكومية المشتركة ومعدلات الامتثال',
      createBtn: 'اقتراح معاهدة ثنائية مشتركة',
      formTitle: 'عنوان الاتفاقية (بالطلب الإنكليزي)',
      formTitleKu: 'عنوان الاتفاقية (بالطلب الكردستاني)',
      formType: 'مجال التركيز الأساسي',
      partiesField: 'الأطراف الموقعة ذات الصلاحية الكاملة',
      lawField: 'إطار القانون المنظم للاتفاقية',
      submit: 'إرسال المسودة لمستوى مراجعة مجلس الوزراء',
      signSeal: 'دفع الحالة التنفيذية للمعاهدة',
      compliance: 'مستوى سلامة الامتثال',
      partiesLabel: 'الموقعون السياديون'
    },
    ku: {
      title: 'بۆردی ڕێککەوتننامە نیشتمانی و پەیماننامە هاوبەشەکان',
      sub: 'نووسین، گەنگەشەکردن، و واژۆکردنی ئەو ڕێککەوتنانەی کە دەبنە هۆی یەکخستنی کارامەییەکانی گومرگ و داتاکان.',
      activeCount: 'پەیماننامە چالاکە ناوبژیوانییەکان',
      lifecycleHeader: 'تۆماری فەرمی پەیماننامە دەرەکی و ناوخۆییەکان',
      createBtn: 'پێشنیارکردنی پەیماننامەی نوێ',
      formTitle: 'ناونیشانی پەیماننامە (ئینگلیزی)',
      formTitleKu: 'ناونیشانی پەیماننامە (کوردی)',
      formType: 'بواری سەرەکی کارایی',
      partiesField: 'بەرپرس و لایەنە ڕاسپێردراوەکانی واژۆکار',
      lawField: 'یاسای فەرمی چاودێری ڕێککەوتنەکە',
      submit: 'ناردنی فەرمی بابەتەکە بۆ دەسەڵاتەکان',
      signSeal: 'پێشخستنی قۆناغی جێبەجێکردن',
      compliance: 'ڕێژەی گونجانی تەکنیکی',
      partiesLabel: 'واژۆکەرانی دەسەڵاتی جێبەجێکار'
    }
  }[lang];

  const handleCreateTreaty = () => {
    if (!titleEn.trim() || !titleKu.trim()) return;

    const fresh = TreatyRegistry.addTreaty({
      title: {
        en: titleEn,
        ar: titleEn,
        ku: titleKu
      },
      type,
      status: 'DRAFT',
      signingParties: parties.split('+').map(p => p.trim()),
      governingLaw: law,
      clauses: [
        { id: 'CL-01', title: 'Dynamic Bilateral Handshake', content: 'Requires mutual operational approvals under active system flags.' }
      ]
    });

    logAction(
      userRole,
      `Proposed new cross-government compact: ${titleEn} [ID: ${fresh.id}]`,
      'FEDERATION_TREATY_ORCHESTRATION'
    );

    setTreaties([...TreatyRegistry.getTreaties()]);
    setTitleEn('');
    setTitleKu('');
    setShowForm(false);
  };

  const handleAdvanceStatus = (id: string, current: TreatyStatus) => {
    const sequence: TreatyStatus[] = [
      'DRAFT', 'NEGOTIATION', 'REVIEW', 'APPROVED', 'RATIFIED', 'ACTIVE', 'SUSPENDED', 'TERMINATED'
    ];
    const nextIndex = sequence.indexOf(current) + 1;
    if (nextIndex < sequence.length) {
      const nextStatus = sequence[nextIndex];
      const updated = TreatyRegistry.updateTreatyStatus(id, nextStatus);
      if (updated) {
        logAction(
          userRole,
          `Advanced Treaty ${id} operational lifecycle to [${nextStatus}]. System attributes recalculated.`,
          'FEDERATION_TREATY_ORCHESTRATION'
        );
        setTreaties([...TreatyRegistry.getTreaties()]);
      }
    }
  };

  return (
    <div id="joint-treaty-orchestration-desk" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Upper overview header */}
      <Card className="bg-[#0c1f2e]/90 border-sky-800/40 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-950/60 border border-sky-800 rounded-lg text-sky-400 shrink-0">
            <Globe2 className="w-6 h-6 border-sky-500" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-lg font-sans font-medium text-slate-100 flex items-center gap-2">
                {t.title}
                <Badge variant="teal">{t.activeCount}: {treaties.filter(t => t.status === 'ACTIVE').length}</Badge>
              </h2>
              
              <Button 
                variant="sky" 
                className="text-xs" 
                onClick={() => setShowForm(!showForm)}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                {t.createBtn}
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-4xl">{t.sub}</p>
          </div>
        </div>
      </Card>

      {/* Accord form proposal */}
      {showForm && (
        <Card className="bg-slate-950 border border-slate-900 p-5 rounded-xl flex flex-col gap-4">
          <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            {t.createBtn}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-slate-400">{t.formTitle}</label>
              <input
                type="text"
                placeholder="Compact name in English..."
                className="bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none"
                value={titleEn}
                onChange={e => setTitleEn(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-slate-400">{t.formTitleKu}</label>
              <input
                type="text"
                placeholder="ناو و ناوەڕۆک بە کوردی..."
                className="bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none"
                value={titleKu}
                onChange={e => setTitleKu(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-slate-400">{t.formType}</label>
              <select
                className="bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none"
                value={type}
                onChange={e => setType(e.target.value as TreatyType)}
              >
                <option value="customs">Customs & Levies</option>
                <option value="data-sharing">Data-Sharing Sync</option>
                <option value="identity-federation">Identity Federation</option>
                <option value="border-cooperation">Border Operations</option>
                <option value="security-cooperation">Security Mutual Defense</option>
                <option value="economic-corridor">Economic Corridors</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 font-mono">
              <label className="text-[11px] font-mono text-slate-400">{t.partiesField}</label>
              <input
                type="text"
                className="bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none"
                placeholder="Baghdad Dept + KRG Bureau"
                value={parties}
                onChange={e => setParties(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-slate-400">{t.lawField}</label>
              <input
                type="text"
                className="bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-200 outline-none"
                value={law}
                onChange={e => setLaw(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="sky" className="text-xs" onClick={handleCreateTreaty} disabled={!titleEn || !titleKu}>
              {t.submit}
            </Button>
          </div>
        </Card>
      )}

      {/* Main Treaties List Grid */}
      <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-400" />
          {t.lifecycleHeader}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {treaties.map(tr => (
            <div key={tr.id} className="bg-slate-950/70 p-4 border border-slate-900 rounded-xl flex flex-col gap-3 justify-between">
              
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{tr.id} • TYPE: {tr.type.toUpperCase()}</span>
                    <h4 className="text-sm font-semibold text-slate-200 mt-0.5 leading-snug">
                      {tr.title[lang] || tr.title.en}
                    </h4>
                  </div>
                  <Badge variant={tr.status === 'ACTIVE' || tr.status === 'RATIFIED' ? 'teal' : tr.status === 'DRAFT' ? 'neutral' : 'gold'}>
                    {tr.status}
                  </Badge>
                </div>

                <div className="flex gap-2.5 justify-between text-[11px] font-sans mt-2">
                  <span className="text-slate-400"><strong className="text-slate-300">{t.partiesLabel}:</strong> {tr.signingParties.join(' + ')}</span>
                </div>
              </div>

              {/* Progress Integrity rating indicator */}
              <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex flex-col gap-1 mt-1 font-mono">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{t.compliance}</span>
                  <span className={`${tr.complianceRatio > 80 ? 'text-emerald-400' : 'text-amber-500'}`}>{tr.complianceRatio}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${tr.complianceRatio > 80 ? 'bg-emerald-400' : 'bg-amber-500'}`}
                    style={{ width: `${tr.complianceRatio}%` }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              {tr.status !== 'TERMINATED' && (
                <div className="flex justify-between items-center border-t border-slate-900 pt-3 mt-1 flex-wrap gap-2">
                  <span className="text-[10px] font-mono text-slate-500 truncate max-w-[200px]">{tr.governingLaw}</span>
                  <button
                    onClick={() => handleAdvanceStatus(tr.id, tr.status)}
                    className="p-1.5 px-3 rounded bg-sky-950/50 hover:bg-sky-900 text-[11px] text-sky-300 font-medium border border-sky-800 hover:border-sky-700 transition flex items-center gap-1 cursor-pointer"
                  >
                    <FileSignature className="w-3.5 h-3.5" />
                    {t.signSeal}
                  </button>
                </div>
              )}

            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};
export default JointTreatyCenter;
