import React, { useState } from 'react';
import { CabinetRegistry } from '../../services/federation/CabinetRegistry';
import { ExecutiveDecisionEngine, ExecutiveDecision } from '../../services/federation/ExecutiveDecisionEngine';
import { Card, Button, Badge, Alert } from '../../ui';
import { 
  ShieldCheck, Users, Vote, FileText, Zap, Key, Check, Plus, AlertCircle 
} from 'lucide-react';
import { useGovernment } from '../../providers/GovernmentProvider';

interface FederalCabinetDeskProps {
  lang: 'en' | 'ar' | 'ku';
}

export const FederalCabinetDesk: React.FC<FederalCabinetDeskProps> = ({ lang }) => {
  const { userRole, logAction } = useGovernment();
  const [decisions, setDecisions] = useState<ExecutiveDecision[]>(() => 
    ExecutiveDecisionEngine.getDecisionsByJurisdiction('federal')
  );

  // Form controls
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleKu, setNewTitleKu] = useState('');
  const [newSummaryEn, setNewSummaryEn] = useState('');
  const [newSummaryKu, setNewSummaryKu] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [showDraftForm, setShowDraftForm] = useState(false);

  const roster = CabinetRegistry.getMinistersByJurisdiction('federal');

  const t = {
    en: {
      title: 'Federal Sovereign Prime Minister Signature Desk',
      sub: 'Independent executive legislative ledger, ministerial approval chains, and secure RSA security footprints.',
      rosterHeader: 'Authorized Federal Cabinet Portfolios',
      decisionHeader: 'Federal Executive Legislative Ledger',
      draftTitle: 'Draft New Sovereign Legislative Resolution',
      formTitle: 'Resolution Title (English)',
      formTitleKu: 'Resolution Title (Kurdish)',
      formSummary: 'Summary / Directives (English)',
      formSummaryKu: 'Summary / Directives (Kurdish)',
      pmAuthorization: 'Prime Minister Signature Seal Required',
      emergency: 'EMERGENCY PROTOCOL (EXISTS BY-PASS)',
      submit: 'Dispatch Cabinet Resolution File',
      signSeal: 'Affix Diplomatic Seal Signature',
      veto: 'Veto',
      authoritiesCount: 'Signatures Collected',
      stateProposed: 'PROPOSED',
      stateSigned: 'SIGNED',
      unauth: 'Your current credential role is restricted from signing Federal Sovereign Cabinet files.'
    },
    ar: {
      title: 'مكتب رئيس الوزراء ومجالس التوقيعات الفيدرالية والمصادقة',
      sub: 'التشريعات التنفيذية المستقلة، سلاسل موافقة وزراء السيادة، والتوقيعات بروشات التوثيق الفيدرالية.',
      rosterHeader: 'الحقائب والوزارات الفيدرالية المعتمدة',
      decisionHeader: 'سجل القرارات والتشريعات التنفيذية الفيدرالية',
      draftTitle: 'صياغة قرار تشريعي فيدرالي جديد',
      formTitle: 'عنوان القرار (بالإنكليزية)',
      formTitleKu: 'عنوان القرار (بالكردية)',
      formSummary: 'ملخص التوجيهات (بالإنكليزية)',
      formSummaryKu: 'ملخص التوجيهات (بالكردية)',
      pmAuthorization: 'يتطلب فحص ختم التوقيع المركزي لرئيس الوزراء',
      emergency: 'بروتوكول الطوارئ العاجل',
      submit: 'تفويض وتوزيع السجل التشريعي للوزارات',
      signSeal: 'تطبيق التوقيع الدبلوماسي المشفر',
      veto: 'نقض قرار',
      authoritiesCount: 'التواقيع المجموعة',
      stateProposed: 'مقترح',
      stateSigned: 'موقع ومعتمد',
      unauth: 'صلاحيات دورك الحالي لا تسمح بالتوقيع على وثائق مجلس الوزراء الاتحادي.'
    },
    ku: {
      title: 'مەڵبەندی بڕیاردان و واژۆکردنی کارەکانی سەرۆک وەزیرانی فیدراڵ',
      sub: 'تۆماری سەربەخۆی بڕیارە جێبەجێکارەکان، زانیارییەکانی لێژنەی فیدراڵ و متمانەی ئاسایشی کۆنترۆڵ.',
      rosterHeader: 'ئەندامانی کابینەی وەزاری فیدراڵی عێراق',
      decisionHeader: 'تۆماری فەرمی بڕیارە جێبەجێکارەکانی فیدراڵ',
      draftTitle: 'داڕشتنی پڕۆژە بڕیاری نوێی کابینە',
      formTitle: 'ناونیشانی بڕیار (ئینگلیزی)',
      formTitleKu: 'ناونیشانی بڕیار (کوردی)',
      formSummary: 'کورتەی فەرمانەکان (ئینگلیزی)',
      formSummaryKu: 'کورتەی فەرمانەکان (کوردی)',
      pmAuthorization: 'پێویستی بە مۆری فەرمی واژۆی سەرۆک وەزیران هەیە',
      emergency: 'دۆخی کتوپڕ (دەربازبوونی بەپەلە)',
      submit: 'ناردنی فەرمی بڕیار بۆ لایەنی پەیوەندیدار',
      signSeal: 'جێگیرکردنی واژۆی مۆری کریپتۆگرافی',
      veto: 'ڕەتکردنەوەی جێبەجێکردن',
      authoritiesCount: 'واژۆ کۆکراوەکان',
      stateProposed: 'پێشنیارکراو',
      stateSigned: 'واژۆکراو و لەکاردا',
      unauth: 'ڕۆڵی ئێستات ڕێگەپێنەدراوە بۆ واژۆکردنی فایلەکانی کابینەی فیدراڵ.'
    }
  }[lang];

  const handleCreateDecision = () => {
    if (!newTitleEn.trim() || !newTitleKu.trim()) return;

    const fresh = ExecutiveDecisionEngine.proposeDecision({
      title: {
        en: newTitleEn,
        ar: newTitleEn,
        ku: newTitleKu
      },
      summary: {
        en: newSummaryEn,
        ar: newSummaryEn,
        ku: newSummaryKu
      },
      jurisdiction: 'federal',
      proposer: userRole,
      isEmergency,
      requiredSignersCount: isEmergency ? 1 : 2
    });

    logAction(
      userRole,
      `Drafted Federal Sovereign Resolution: ${newTitleEn} [ID: ${fresh.id}]`,
      'FEDERAL_CABINET_GOVERNANCE'
    );

    setDecisions(ExecutiveDecisionEngine.getDecisionsByJurisdiction('federal'));
    setNewTitleEn('');
    setNewTitleKu('');
    setNewSummaryEn('');
    setNewSummaryKu('');
    setIsEmergency(false);
    setShowDraftForm(false);
  };

  const handleSign = (id: string) => {
    // Standard rule: only Federal prime minister or high ministers can sign
    const updated = ExecutiveDecisionEngine.signDecision(id, userRole);
    if (updated) {
      logAction(
        userRole,
        `Signed Federal Sovereign Executive Decision file: ${updated.id}`,
        'FEDERAL_CABINET_GOVERNANCE'
      );
      setDecisions(ExecutiveDecisionEngine.getDecisionsByJurisdiction('federal'));
    }
  };

  const handleVeto = (id: string) => {
    const updated = ExecutiveDecisionEngine.vetoDecision(id, userRole, 'Vetoed during review session due to alignment gridlock.');
    if (updated) {
      logAction(
        userRole,
        `VETOED Federal Sovereign Executive Decision file: ${updated.id}`,
        'FEDERAL_CABINET_GOVERNANCE'
      );
      setDecisions(ExecutiveDecisionEngine.getDecisionsByJurisdiction('federal'));
    }
  };

  // Check if role is authorized to sign (e.g. includes Federal PM, PM or Minister)
  const isAuthorizedToSign = userRole.includes('Federal Prime Minister') || userRole.toLowerCase().includes('pm') || userRole.toLowerCase().includes('minister');

  return (
    <div id="federal-cabinet-command-desk" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      
      {/* Prime Minister Command Ribbon Banner */}
      <Card className="bg-[#0b1429]/95 border-sky-900/60 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-sky-950/70 border border-sky-800 text-sky-400 rounded-lg shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-sans font-medium text-slate-100 flex items-center gap-2 tracking-tight">
              {t.title}
              <Badge variant="teal">FEDERAL_SOVEREIGN_DESK</Badge>
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-normal max-w-3xl">{t.sub}</p>
          </div>
        </div>
      </Card>

      {/* Roster & Decision matrix split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Roster Block */}
        <div className="lg:col-span-4 h-full">
          <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl flex flex-col gap-4 h-full text-start">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              {t.rosterHeader}
            </h3>

            <div className="flex flex-col gap-3">
              {roster.map(m => (
                <div key={m.id} className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                  <div className="text-xs font-bold text-slate-200">{m.name[lang] || m.name.en}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{m.portfolio[lang] || m.portfolio.en}</div>
                  <div className="flex justify-between items-center mt-2 text-[9px] font-mono text-slate-500">
                    <span>CN: {m.id}</span>
                    <span className="text-sky-400 uppercase">CLEARANCE: {m.clearanceLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Ledger */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="bg-slate-950/80 border-slate-900 p-5 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                {t.decisionHeader}
              </h3>
              
              <Button 
                variant="sky" 
                className="text-xs" 
                onClick={() => setShowDraftForm(!showDraftForm)}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                {t.draftTitle}
              </Button>
            </div>

            {/* Drafting dynamic form */}
            {showDraftForm && (
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 flex flex-col gap-3.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-400">{t.formTitle}</label>
                    <input
                      type="text"
                      className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 outline-none"
                      placeholder="e.g. Excise Tariff Adjustment"
                      value={newTitleEn}
                      onChange={e => setNewTitleEn(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-400">{t.formTitleKu}</label>
                    <input
                      type="text"
                      className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 outline-none"
                      placeholder="e.g. ڕێکخستنی باجی گومرگی"
                      value={newTitleKu}
                      onChange={e => setNewTitleKu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-400">{t.formSummary}</label>
                    <textarea
                      rows={2}
                      className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 outline-none resize-none"
                      placeholder="Summary of directives..."
                      value={newSummaryEn}
                      onChange={e => setNewSummaryEn(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-400">{t.formSummaryKu}</label>
                    <textarea
                      rows={2}
                      className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 outline-none resize-none"
                      placeholder="کورتەی بڕیار لە لایەن سەرۆکایەتی..."
                      value={newSummaryKu}
                      onChange={e => setNewSummaryKu(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={e => setIsEmergency(e.target.checked)}
                      className="rounded border-slate-800 bg-slate-950 accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      {t.emergency}
                    </span>
                  </label>

                  <Button 
                    variant="sky" 
                    className="text-xs" 
                    disabled={!newTitleEn || !newTitleKu}
                    onClick={handleCreateDecision}
                  >
                    {t.submit}
                  </Button>
                </div>
              </div>
            )}

            {/* Cabinet Decision Grid cards */}
            <div className="flex flex-col gap-3.5">
              {decisions.map(dec => {
                const hasSigned = dec.signers.includes(userRole);
                return (
                  <div key={dec.id} className="bg-slate-900/35 border border-slate-800 p-4 rounded-lg flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="text-xs font-mono text-slate-500">{dec.id}</div>
                        <h4 className="text-sm font-semibold text-slate-200 mt-0.5">
                          {dec.title[lang] || dec.title.en}
                        </h4>
                      </div>
                      <Badge variant={dec.status === 'SIGNED' || dec.status === 'ENFORCED' ? 'teal' : dec.status === 'VETOED' ? 'rose' : 'gold'}>
                        {dec.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-400 leading-normal">{dec.summary[lang] || dec.summary.en}</p>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-900 pt-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{t.authoritiesCount}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-300">{dec.signers.length} / {dec.requiredSignersCount}</span>
                          <span className="text-[10px] text-slate-500">({dec.signers.join(', ') || 'None'})</span>
                        </div>
                      </div>

                      {dec.status !== 'SIGNED' && dec.status !== 'ENFORCED' && dec.status !== 'VETOED' && (
                        <div className="flex items-center gap-2">
                          <button
                            disabled={!isAuthorizedToSign || hasSigned}
                            onClick={() => handleSign(dec.id)}
                            className={`px-3 py-1.5 rounded text-xs font-medium border flex items-center gap-1 transition ${
                              hasSigned 
                                ? 'bg-[#0f2d11]/80 text-emerald-400 border-emerald-900 pointer-events-none' 
                                : isAuthorizedToSign 
                                ? 'bg-sky-950/80 hover:bg-sky-900 text-sky-300 border-sky-800 cursor-pointer' 
                                : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
                            }`}
                          >
                            <Key className="w-3.5 h-3.5" />
                            {hasSigned ? 'SIGNED' : t.signSeal}
                          </button>

                          <button
                            disabled={!isAuthorizedToSign}
                            onClick={() => handleVeto(dec.id)}
                            className={`px-3 py-1.5 rounded text-xs font-medium border transition ${
                              isAuthorizedToSign 
                                ? 'bg-rose-950/70 hover:bg-rose-900 text-rose-300 border-rose-900 cursor-pointer' 
                                : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
                            }`}
                          >
                            {t.veto}
                          </button>
                        </div>
                      )}
                    </div>

                    {!isAuthorizedToSign && (
                      <div className="text-[10px] text-amber-500 bg-amber-950/40 p-2.5 rounded border border-amber-900/60 leading-normal flex items-start gap-1.5 mt-1">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                        <span>{t.unauth}</span>
                      </div>
                    )}

                    <div className="text-[9px] font-mono text-slate-600 border-t border-slate-900 pt-2 flex justify-between">
                      <span>SHA-256 HASH: {dec.immutableSHA256.slice(0, 32)}...</span>
                      <span>Owner: {dec.proposer}</span>
                    </div>

                  </div>
                );
              })}
            </div>

          </Card>
        </div>

      </div>

    </div>
  );
};
