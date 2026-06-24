import React, { useState } from 'react';
import { useGovernment, FederationTransaction } from '../../providers/GovernmentProvider';
import { useFederation } from '../../services/federation/GovernmentFederationProvider';
import { FederationPolicyEngine } from '../../services/federation/FederationPolicyEngine';
import { Card, Button, Badge, Table, Alert } from '../../ui';
import { Landmark, Check, Ban, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface FederalPrimeMinisterDeskProps {
  lang: 'en' | 'ar' | 'ku';
}

export const FederalPrimeMinisterDesk: React.FC<FederalPrimeMinisterDeskProps> = ({ lang }) => {
  const { 
    userRole, 
    federationTransactions, 
    approveFederation, 
    rejectFederation,
    policies,
    addPolicy,
    logAction
  } = useGovernment();

  const { federationMode } = useFederation();
  const [selectedPolicy, setSelectedPolicy] = useState('RULE-POL-001');
  const [evaluationResult, setEvaluationResult] = useState<{ allowed: boolean; reason: string } | null>(null);

  const federalTx = federationTransactions.filter(tx => tx.targetJurisdiction === 'federal');

  // Translations
  const t = {
    en: {
      title: 'Federal Prime Minister Sovereignty Desk',
      sub: 'Executive decree signing, policy evaluation and incoming federal compliance review.',
      emptyTx: 'No incoming cross-boundary transactions awaiting federal sign-off.',
      txId: 'Transaction ID',
      service: 'Service Node',
      summary: 'Payload Summary',
      sender: 'Origin Operator',
      actions: 'Actions',
      approve: 'Approve & Handshake',
      reject: 'Reject & Block',
      evaluateBtn: 'Evaluate Executive Policy Rule',
      createPolicy: 'Formulate Royal Decree Policy',
      policyTitle: 'Policy Title',
      category: 'Category',
      actionSuccess: 'Action executed successfully.',
      modeWarning: 'System is currently operating under SEPARATED mode. Cross-border requests are blocked.'
    },
    ar: {
      title: 'مكتب رئيس الوزراء الاتحادي للسيادة الرقمية',
      sub: 'توقيع المراسيم التنفيذية المباشرة، وتقييم السياسات والتحقق من الطلبات الفدرالية الواردة.',
      emptyTx: 'لا توجد طلبات عبور معلقة بانتظار الموافقة الاتحادية حالياً.',
      txId: 'رمز المعاملة',
      service: 'نوع الخدمة',
      summary: 'ملخص الحمولة والبيانات',
      sender: 'الجهة الطالبة',
      actions: 'الإجراءات السيادية',
      approve: 'موافقة ومصافحة رقمية',
      reject: 'رفض وحظر الوصول',
      evaluateBtn: 'تقييم قاعدة السياسة التنفيذية',
      createPolicy: 'صياغة مرسوم سيادي جديد',
      policyTitle: 'عنوان السياسة',
      category: 'التصنيف العملياتي',
      actionSuccess: 'تم تنفيذ الإجراء التنفيذي بنجاح.',
      modeWarning: 'يعمل النظام حاليًا تحت وضع العزل التام. الممرات الرقمية المشتركة متوقفة.'
    },
    ku: {
      title: 'مێزی سەرۆک وەزیرانی فیدراڵ بۆ سەروەری دیجیتاڵیی',
      sub: 'واژۆکردنی بڕیارە جێبەجێکارییەکان، هەڵسەنگاندنی ڕێساکان و بەدواداچوونی داواکارییە فیدراڵییەکان.',
      emptyTx: 'هیچ داواکارییەکی هاوبەشی سنووری چاوەڕێی واژۆی فیدراڵی ناکات.',
      txId: 'ناسنامەی مامەڵە',
      service: 'جۆری خزمەتگوزاری',
      summary: 'کورتیی زانیارییەکان',
      sender: 'داواکار',
      actions: 'بڕیارەکان',
      approve: 'پەسەندکردن و بەستنەوە',
      reject: 'ڕەتکردنەوە و گرتن',
      evaluateBtn: 'هەڵسەنگاندنی ڕێسای سیاسی فیدراڵ',
      createPolicy: 'داڕشتنی فەرمانی سەروەری نوێ',
      policyTitle: 'ناونیشانی یاسا',
      category: 'پۆلێنکردن',
      actionSuccess: 'کرداری سەرۆکایەتی بە سەرکەوتوویی جێبەجێ کرا.',
      modeWarning: 'سیستەمەکە ئێستا لە دۆخی جیابوونەوەی تەواودایە. هەماهەنگییە سنوورییەکان ناچالاکن.'
    }
  }[lang];

  const handleEvaluate = () => {
    const res = FederationPolicyEngine.evaluateAction({
      policyId: selectedPolicy,
      actorRole: userRole,
      activeContext: 'FEDERAL_IRAQ'
    });
    setEvaluationResult({ allowed: res.allowed, reason: res.reason });
  };

  const handleCreateDecree = () => {
    addPolicy({
      title: `Federal Maritime Decree - SEC-${Date.now().toString().slice(-4)}`,
      category: 'Sovereign Directive',
      status: 'active',
      lastUpdated: new Date().toISOString().slice(0, 10),
      content: 'Under constitutional authority, establishes a verified biometric token gate for all regional logistics couriers entering the southern customs corridor.'
    });
    logAction('Federal Prime Minister Officer', 'Enacted royal decree on southern customs corridor', 'RULE-POL-001');
  };

  return (
    <div id="fed-pm-desk-panel" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      <Card className="bg-[#0b1329]/95 border-emerald-900/60 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-sans font-medium text-slate-100 tracking-tight flex items-center gap-2">
              {t.title}
              <Badge variant="teal">{lang === 'en' ? 'Sovereign' : 'سەروەری'}</Badge>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">{t.sub}</p>
          </div>
        </div>
      </Card>

      {federationMode === 'SEPARATED' && (
        <Alert variant="warning" className="border-amber-950 text-amber-300 bg-amber-950/20">
          {t.modeWarning}
        </Alert>
      )}

      {/* Grid of decisions policies evaluation & custom linkages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Policy Engine Evaluation */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4">
            <h3 className="text-sm font-sans font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {lang === 'en' ? 'Sovereign Policy Core' : 'هەڵسەنگاندنی یاسایی'}
            </h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-slate-400">{lang === 'en' ? 'SELECT DIRECTIVE' : 'یاسا هەڵبژێرە'}</label>
              <select 
                value={selectedPolicy}
                onChange={(e) => {
                  setSelectedPolicy(e.target.value);
                  setEvaluationResult(null);
                }}
                className="bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 p-2.5 outline-none"
              >
                <option value="RULE-POL-001">RULE-POL-001: Sea Port Tariffs</option>
                <option value="RULE-POL-003">RULE-POL-003: Border Operations Protocol</option>
                <option value="RULE-POL-004">RULE-POL-004: Trade Manifest Clearance</option>
                <option value="RULE-POL-005">RULE-POL-005: Boundary Emergency Lockout</option>
              </select>
            </div>

            <Button variant="emerald" onClick={handleEvaluate} className="w-full">
              {t.evaluateBtn}
            </Button>

            {evaluationResult && (
              <div className={`p-4 rounded-lg border text-xs leading-relaxed ${evaluationResult.allowed ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : 'bg-rose-950/30 border-rose-900 text-rose-300'}`}>
                <div className="flex items-center gap-2 font-semibold mb-1">
                  {evaluationResult.allowed ? <Check className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                  {evaluationResult.allowed ? 'AUTHORIZATION VERIFIED' : 'ACCESS PROHIBITED'}
                </div>
                {evaluationResult.reason}
              </div>
            )}

            <hr className="border-slate-800/80 my-2" />

            <Button variant="outline" onClick={handleCreateDecree} className="w-full">
              {t.createPolicy}
            </Button>
          </Card>
        </div>

        {/* Incoming Federation Transactions */}
        <div className="lg:col-span-8">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4 h-full">
            <h3 className="text-sm font-sans font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              {lang === 'en' ? 'Bilateral Interoperability Influx' : 'داواکاری هاوبەشی گەیشتوو'}
            </h3>

            {federalTx.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500 gap-2 border border-dashed border-slate-800/80 rounded-lg">
                <FileText className="w-8 h-8 opacity-40 text-slate-400" />
                <span className="text-xs font-sans">{t.emptyTx}</span>
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-xs text-slate-300">
                  <thead className="bg-slate-950/80 border-b border-slate-800/50">
                    <tr>
                      <th className="p-3 text-left font-mono">{t.txId}</th>
                      <th className="p-3 text-left">{t.service}</th>
                      <th className="p-3 text-left">{t.summary}</th>
                      <th className="p-3 text-left">{t.sender}</th>
                      <th className="p-3 text-center">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {federalTx.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-mono text-emerald-400">{tx.id}</td>
                        <td className="p-3">
                          <Badge variant={tx.serviceType === 'identity' ? 'gold' : 'teal'}>{tx.serviceType.toUpperCase()}</Badge>
                        </td>
                        <td className="p-3 max-w-xs truncate" title={tx.payloadSummary}>
                          {tx.payloadSummary}
                        </td>
                        <td className="p-3 text-slate-400 font-mono">{tx.requestedBy}</td>
                        <td className="p-3 flex items-center justify-center gap-2">
                          {tx.status === 'pending' ? (
                            <>
                              <button 
                                onClick={() => approveFederation(tx.id, 'Federal Cabinet PM Desk')}
                                className="p-1 px-2.5 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-medium transition flex items-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                {t.approve}
                              </button>
                              <button 
                                onClick={() => rejectFederation(tx.id, 'Federal Cabinet PM Desk')}
                                className="p-1 px-2.5 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-900 text-rose-300 font-medium transition flex items-center gap-1 cursor-pointer"
                              >
                                <Ban className="w-3.5 h-3.5" />
                                {t.reject}
                              </button>
                            </>
                          ) : (
                            <Badge variant={tx.status === 'approved' ? 'teal' : 'rose'}>
                              {tx.status.toUpperCase()}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};
