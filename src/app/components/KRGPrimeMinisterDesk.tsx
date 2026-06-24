import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useFederation } from '../../services/federation/GovernmentFederationProvider';
import { FederationPolicyEngine } from '../../services/federation/FederationPolicyEngine';
import { Card, Button, Badge, Alert } from '../../ui';
import { Landmark, ArrowRight, Check, Ban, Send, ShieldCheck, Database } from 'lucide-react';

interface KRGPrimeMinisterDeskProps {
  lang: 'en' | 'ar' | 'ku';
}

export const KRGPrimeMinisterDesk: React.FC<KRGPrimeMinisterDeskProps> = ({ lang }) => {
  const { 
    userRole, 
    requestFederation,
    policies,
    addPolicy,
    logAction
  } = useGovernment();

  const { federationMode } = useFederation();
  const [selectedPolicy, setSelectedPolicy] = useState('RULE-POL-002');
  const [evaluationResult, setEvaluationResult] = useState<{ allowed: boolean; reason: string } | null>(null);

  // Form states for sending a federated transfer
  const [serviceType, setServiceType] = useState<'customs' | 'identity'>('customs');
  const [payloadSummary, setPayloadSummary] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const t = {
    en: {
      title: 'KRG Prime Minister Regional Desk',
      sub: 'Regional investment directive formulation and outbound federation handshakes transmission.',
      evaluateBtn: 'Evaluate Regional Policy Rule',
      createPolicy: 'Authorize Investment Exemption',
      createPolicyDesc: 'Grants regional zero-tax allowance on building machines.',
      sendReqHeader: 'Initiate Outbound Federation Tunnel',
      sendReqBtn: 'Deploy Request to Federal Gateway',
      payloadPlaceholder: 'e.g. Sync request for Ibrahim Khalil container DEC-2026-K001',
      successMsg: 'Tunnel request dispatched to Federal Iraq Gateway node successfully.',
      modeWarning: 'System is currently operating under SEPARATED mode. Federation channels are closed.',
      roleLabel: 'Active Role'
    },
    ar: {
      title: 'مكتب رئيس وزراء إقليم كوردستان للشؤون الإقليمية',
      sub: 'إقرار التوجيهات الاستثمارية للمحافظات الشمالية وإرسال طلبات الربط والتكامل مع بغداد.',
      evaluateBtn: 'تقييم القاعدة التنظيمية للإقليم',
      createPolicy: 'منح إعفاء استثماري إقليمي',
      createPolicyDesc: 'يرخص للمستثمرين المعامل الجمركية الصفرية على المعدات الثقيلة.',
      sendReqHeader: 'إرسال طلب ربط عبر النفق الجمركي السريع',
      sendReqBtn: 'إرسال الطلب إلى البوابة الاتحادية',
      payloadPlaceholder: 'مثال: ربط معامل جمارك منفذ إبراهيم الخليل برقم شحنة K001',
      successMsg: 'تم بث ونقل طلب التكامل إلى بوابة بغداد الاتحادية بنجاح.',
      modeWarning: 'النظام حالياً في وضع العزل التام. غرف مبادلة البيانات الثنائية متوقفة.',
      roleLabel: 'المنصب النشط'
    },
    ku: {
      title: 'مێزی سەرۆک وەزیرانی هەرێمی کوردستان بۆ کاروباری ناوچەیی',
      sub: 'داڕشتنی ڕێنماییە ئابوورییەکانی هەرێم و ناردنی داواکارییە هاوبەشەکان بۆ بەغدا.',
      evaluateBtn: 'هەڵسەنگاندنی دەسەڵاتی بڕیاردانی ناوچەیی',
      createPolicy: 'ڕێپێدانی بەخشینی باجی وەبەرهێنان',
      createPolicyDesc: 'بەخشینی گومرگی تەواو دەدات بە ئامێرە قورسەکانی زۆنی پیشەسازی.',
      sendReqHeader: 'ناردنی داواکاری پەڕینەوەی گومرگی',
      sendReqBtn: 'ڕەوانەکردنی داواکاری بۆ دەروازەی فیدراڵ',
      payloadPlaceholder: 'بۆ نموونە: گواستنەوەی چاودێری شتومەکی ئیبراهیم خەلیل K001',
      successMsg: 'داواکارییەکە بە سەرکەوتوویی بۆ دەروازەی فیدراڵی عێراق لێدرا.',
      modeWarning: 'سیستەمەکە ئێستا لە دۆخی جیابوونەوەی تەواودایە. هەماهەنگییە فیدراڵییەکان کورتکراونەتەوە.',
      roleLabel: 'بەرپرسیاریەتی'
    }
  }[lang];

  const handleEvaluate = () => {
    const res = FederationPolicyEngine.evaluateAction({
      policyId: selectedPolicy,
      actorRole: userRole,
      activeContext: 'KURDISTAN_REGION'
    });
    setEvaluationResult({ allowed: res.allowed, reason: res.reason });
  };

  const handleCreateRegionalPolicy = () => {
    addPolicy({
      title: `KRG Smart-Zoning Exemption - KRG-${Date.now().toString().slice(-4)}`,
      category: 'Regional Development',
      status: 'active',
      lastUpdated: new Date().toISOString().slice(0, 10),
      content: 'Under regulatory framework Act, authorizes full local tariff exemptions for technology servers and core processing elements imported via Turkey borders.'
    });
    logAction('KRG Prime Minister Officer', 'Authorized local tech import tax exemption', 'RULE-POL-002');
  };

  const handleSendTunnel = () => {
    if (!payloadSummary.trim()) return;
    requestFederation(serviceType, payloadSummary, 'KRG Executive PM Liaison Office');
    setToastMessage(t.successMsg);
    setPayloadSummary('');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div id="krg-pm-desk-panel" className="flex flex-col gap-6 w-full animate-fade-in text-start">
      <Card className="bg-[#111e2e]/95 border-amber-950/40 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-950/45 border border-amber-900 rounded-lg text-amber-500">
            <Landmark className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-sans font-medium text-slate-100 tracking-tight flex items-center gap-2">
              {t.title}
              <Badge variant="gold">{lang === 'en' ? 'Regional Sovereign' : 'هەرێمی'}</Badge>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Regional Policy Rules Control */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="bg-[#111e2e]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4">
            <h3 className="text-sm font-sans font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {lang === 'en' ? 'KRG Regional Policy Authority' : 'کارسەلماندنی یاسا گومرگییەکانی هەرێم'}
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-slate-400">{lang === 'en' ? 'JURISDICTION DIRECTIVE' : 'تۆماری فەرمانەکە'}</label>
              <select 
                value={selectedPolicy}
                onChange={(e) => {
                  setSelectedPolicy(e.target.value);
                  setEvaluationResult(null);
                }}
                className="bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 p-2.5 outline-none"
              >
                <option value="RULE-POL-002">RULE-POL-002: KRG Regional Subsidies</option>
                <option value="RULE-POL-003">RULE-POL-003: Joint Border Operations</option>
                <option value="RULE-POL-005">RULE-POL-005: Regional Lockout overrides</option>
              </select>
            </div>

            <Button variant="emerald" onClick={handleEvaluate} className="w-full">
              {t.evaluateBtn}
            </Button>

            {evaluationResult && (
              <div className={`p-4 rounded-lg border text-xs leading-relaxed ${evaluationResult.allowed ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300' : 'bg-rose-950/30 border-rose-900 text-rose-300'}`}>
                <div className="flex items-center gap-2 font-semibold mb-1">
                  {evaluationResult.allowed ? <Check className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                  {evaluationResult.allowed ? 'REGIONAL CLEARANCE ALLOWED' : 'OPERATIONAL BLOCK'}
                </div>
                {evaluationResult.reason}
              </div>
            )}

            <hr className="border-slate-800/80 my-2" />

            <div className="flex flex-col gap-1.5 step-card bg-amber-950/15 p-3 rounded-lg border border-amber-900/30 text-start">
              <div className="text-xs font-semibold text-amber-300">{t.createPolicy}</div>
              <p className="text-[11px] text-slate-400 leading-tight">{t.createPolicyDesc}</p>
              <Button onClick={handleCreateRegionalPolicy} className="mt-2 text-xs py-1" variant="gold">
                {lang === 'en' ? 'Enact Exemption Policy' : 'جێبەجێکردنی بەخشین'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Tunnel Request Sender */}
        <div className="lg:col-span-7">
          <Card className="bg-[#111e2e]/90 border-slate-800 p-5 rounded-xl flex flex-col gap-4 h-full">
            <h3 className="text-sm font-sans font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              {t.sendReqHeader}
            </h3>

            {federationMode === 'SEPARATED' ? (
              <div className="flex flex-col items-center justify-center p-10 text-slate-500 h-full">
                <Ban className="w-10 h-10 text-rose-500 opacity-65 mb-2" />
                <span className="text-xs font-sans text-center max-w-sm">
                  {lang === 'en' ? 'Bilateral channels are restricted. Transition the system to Federated or Unified Mode inside Joint Executive Council.' : 'پەڕینەوە ناچالاکە. هۆکارەکەی جیاکردنەوەی تەواوی فیدراڵ و هەرێمە.'}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-start">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-slate-400">{lang === 'en' ? 'SERVICE SECTOR' : 'بەرپرس'}</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 p-2.5 outline-none"
                    >
                      <option value="customs">Customs & Logistics Handshake</option>
                      <option value="identity">Identity Public Key Handshake</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-slate-400">{t.roleLabel}</label>
                    <div className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs font-semibold text-amber-400">
                      {userRole}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-slate-400">{lang === 'en' ? 'BRIDGE PAYLOAD SUMMARY' : 'پوختەی داتاکان'}</label>
                  <textarea
                    rows={4}
                    value={payloadSummary}
                    onChange={(e) => setPayloadSummary(e.target.value)}
                    placeholder={t.payloadPlaceholder}
                    className="bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 p-3 outline-none resize-none focus:border-amber-900/80 transition"
                  />
                </div>

                <Button 
                  variant="gold" 
                  onClick={handleSendTunnel} 
                  disabled={!payloadSummary.trim()}
                  className="w-full h-11 transition-all hover:shadow-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {t.sendReqBtn}
                </Button>

                {toastMessage && (
                  <div className="p-3.5 bg-emerald-950/40 border border-emerald-900 rounded-lg text-xs text-emerald-300 animate-pulse">
                    {toastMessage}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};
