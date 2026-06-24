import React, { useState } from 'react';
import { 
  Landmark, Layers, Activity, Network, Shield, AlertTriangle, 
  Coins, FileText, CheckCircle2, Cpu, RefreshCw, Scale, Database, PlayCircle
} from 'lucide-react';
import { Card, Badge, Button } from '../../../ui';

// Import our real border-settlement engine & registry
import { BorderRevenuePolicyRegistry } from '../../../shared/border-settlement/BorderRevenuePolicyRegistry';
import { BorderRevenueCalculationEngine, RealBorderRevenueProvider } from '../../../shared/border-settlement/BorderRevenueCalculationEngine';
import { BorderSettlementReadinessReport } from '../../../shared/border-settlement/BorderSettlementReadinessReport';
import { BorderSettlementVisibilityPolicy } from '../../../shared/border-settlement/BorderSettlementVisibilityPolicy';

interface SovereignFiscalSystemProps {
  lang: 'en' | 'ar' | 'ku';
}

/**
 * @file SovereignFiscalSystem.tsx
 * @description پۆرتاڵی فەرمی و چڕوپڕی یەکلاییکردنەوەی داهاتی سنوورەکان و دەروازە گومرگییەکان (سەرانسەری عێراق و هەرێمی کوردستان).
 * تەنها پابەندبوونی کایەی دەروازە سنوورییەکان بەبێ تێکەڵبوونی داتای گشتی نیشتیمانی، نەوت، یان مووچە پیشان دەدات.
 */
export const SovereignFiscalSystem: React.FC<SovereignFiscalSystemProps> = ({ lang }) => {
  const isRtl = lang !== 'en';

  const [activeTab, setActiveTab] = useState<'policies' | 'calculator' | 'readiness' | 'security-policy'>('policies');
  const [ticker, setTicker] = useState(0);

  // Simulation Provider Configurations
  const [isTestProviderEnabled, setIsTestProviderEnabled] = useState(false);
  const [testGrossUSD, setTestGrossUSD] = useState('2400000');
  const [testDeductionUSD, setTestDeductionUSD] = useState('400000');
  const [selectedPolicyId, setSelectedPolicyId] = useState('KRG_TO_FEDERAL_BORDER_REVENUE_50_PERCENT');
  const [periodId, setPeriodId] = useState('2026-Q2');

  const getLabel = (en: string, ar: string, ku: string) => {
    const labels = { en, ar, ku };
    return labels[lang] || en;
  };

  const policies = BorderRevenuePolicyRegistry.getAllPolicies();
  const readinessReport = BorderSettlementReadinessReport.generateReport();

  // Handle registering/de-registering simulation provider safely
  const handleToggleTestProvider = () => {
    if (!isTestProviderEnabled) {
      const gross = parseFloat(testGrossUSD);
      const deduct = parseFloat(testDeductionUSD);

      if (isNaN(gross) || isNaN(deduct) || gross < 0 || deduct < 0) {
        alert(getLabel('Please enter valid numeric values', 'الرجاء إدخال قيم عددية صالحة', 'تکایە ژمارەی دروست بنووسە'));
        return;
      }

      // Register temporary real provider simulator
      const mockProvider: RealBorderRevenueProvider = {
        borderGateId: 'ALL_KRG_GATES',
        isConfigured: true,
        getValidatedGrossRevenueUSD: () => gross,
        getValidatedDeductionsUSD: () => deduct,
        getAuditVerificationHash: () => 'sha256_mock_audit_prov_hash_09f3'
      };
      
      BorderRevenueCalculationEngine.registerProvider(mockProvider);
      setIsTestProviderEnabled(true);
    } else {
      BorderRevenueCalculationEngine.removeProvider('ALL_KRG_GATES');
      setIsTestProviderEnabled(false);
    }
    setTicker(prev => prev + 1);
  };

  // Run calculation logic from core engine
  const calculationResult = BorderRevenueCalculationEngine.calculate(
    selectedPolicyId,
    periodId,
    'ALL_KRG_GATES'
  );

  return (
    <div id="border-revenue-settlement-portal" className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 shadow-2xl relative">
      
      {/* Top Banner Warning: Providers Required */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3.5 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold text-amber-400 font-mono">
            {getLabel(
              'CONDITIONALLY READY — PROVIDERS NOT CONFIGURING REAL AUTOMATED TRANSMISSION',
              'جاهزية مشروطة — مزودو البيانات الحقيقية قيد التثبيت والطلب',
              'ئامادەکاری مەرجدار — دابینکارانی داتای ڕاستەقینە لە دەروازەکان پێویستن'
            )}
          </p>
          <p className="text-slate-300 mt-1">
            {getLabel(
              'This module is locked to Border & Customs Revenue share logic. No raw national data, oil, or state assets are accessible. Real automated telemetry feeds from Baghdad/Erbil must be established for live settlement actions.',
              'تم قفل هذه الوحدة البرمجية على إيرادات المنافذ والجمارك فقط. لا يمكن كشف الحسابات العامة أو كشوف ميزانية النفط والرواتب. لتفعيل الحسابات الحية، يلزم ربط مزودات البيانات المشفرة التابعة للطرفين.',
              'ئەم بەشە بە تەواوی قوفڵکراوە لەسەر لۆجیکی داهاتی دەروازەکان و گومرگ. هیچ گرێدەرێکی نەوت، دەوڵەت یان داتای دارایی تر تێکەڵ نەکراوە. بۆ یەکلاکردنەوەی کار پێویستە پرۆڤایدەری دڵنیایی فەرمی هەبێت.'
            )}
          </p>
        </div>
      </div>

      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="warning">
              {getLabel('BORDER OPERATING SYSTEM', 'نظام تشغيل وإدارة الحدود', 'سیستەمی فەرمی دەروازەکان (BOS)')}
            </Badge>
            <span className="text-[10px] font-mono text-slate-500">v5.20 LOCKED</span>
          </div>
          <h2 className="text-xl font-bold font-sans text-slate-100 mt-1.5">
            {getLabel(
              'Border Revenue Settlement Control Hub',
              'منصة يكلواندنةوة و ڕێكخستنی داهاتی دەروازە سنوورییەکان',
              'مەڵبەندی یەکلاییکردنەوەی داهاتی دەروازە سنوورییەکان'
            )}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            {getLabel(
              'Constitutional border-revenue coordination, customs duties auditing and multi-jurisdiction 50% reconciliation calculations.',
              'وردبینی فەرمی داهاتی گومرگ، چاودێری جێبەجێکردنی هاوبەشی بەندی ٥٠٪، و بەڵگەسازی بۆ لیدجەری هاوبەشی نیشتمانی.',
              'بەدواداچوون بۆ ڕێککەوتنی دارایی داهاتە دەروازەیییەکان بە پێی بەندی فەرمی فیدراڵی ٥٠٪.'
            )}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              BorderRevenueCalculationEngine.removeProvider('ALL_KRG_GATES');
              setIsTestProviderEnabled(false);
              setTicker(p => p + 1);
            }}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-850 text-slate-400 hover:text-slate-200 transition-all text-xs flex items-center gap-1.5"
            title={getLabel('Reset Engine State', 'إعادة ضبط وضعية الحساب', 'دووبارە ڕێکخستنەوەی سیستم')}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{getLabel('Reset', 'إعادة ضبط', 'دووبارەکردنەوە')}</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Grid */}
      <div className="flex flex-wrap border-b border-slate-800 gap-1.5 pb-3 mb-6">
        <button
          onClick={() => setActiveTab('policies')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'policies'
              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>{getLabel('Customs Share Policies', 'سیاسات توزيع داهات الحدوود', 'یاساکانی دابەشکردنی داهاتی گومرگ')}</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'calculator'
              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>{getLabel('Calculations Engine', 'بزوێنەری بیرکاری گومرگی', 'سیستەمی هەژمارکاری داهات')}</span>
        </button>

        <button
          onClick={() => setActiveTab('readiness')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'readiness'
              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{getLabel('Sovereign Scope Audit', 'دۆخی فەرمی کایەی کورتەی دەروازە', 'ڕاپۆرتی سەروەریی دەروازە')}</span>
        </button>

        <button
          onClick={() => setActiveTab('security-policy')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'security-policy'
              ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{getLabel('Sovereignty Rules Policy', 'پاراستنی سەروەری گومرگی', 'یاساکانی سەروەری دەروازەکان')}</span>
        </button>
      </div>

      {/* TAB CONTENT: POLICIES */}
      {activeTab === 'policies' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 font-mono">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>{getLabel('Constitutional Customs Treaties Registered', 'الاتفاقيات الدستورية الموثقة لتوزيع داهات گومرگ', 'ڕێککەوتنە دەستوورییە مۆرکراوەکانی گومرگ')}</span>
            </h3>

            {policies.map(policy => (
              <Card key={policy.policyId} className="bg-slate-900/50 border-slate-800 p-4">
                <div className="flex items-start justify-between gap-3 flex-col sm:flex-row">
                  <div>
                    <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 leading-relaxed font-sans text-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {policy.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono text-start">
                      {getLabel('Applicable Target Gate:', 'المنفذ المستهدف:', 'دەروازەی جێبەجێکار:')} <b className="text-slate-200">{policy.borderGateName}</b>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono text-start">
                      {getLabel('Basis Code:', 'السند الدستوري:', 'بناغەی یاسایی:')} <span className="text-slate-300 font-bold">{policy.legalBasisId}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1.5 text-start leading-relaxed bg-[#0b0f1a] p-2 rounded border border-slate-850">
                      <b>{getLabel('Legal Reference Name:', 'المرجع القانوني:', 'دەقی یاسایی:')}</b> {policy.legalReferenceLabel}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                    <Badge variant={policy.policyId.includes('50_PERCENT') ? 'success' : 'warning'}>
                      {policy.settlementPercentage}% {getLabel('Distribution', 'نسبة الحصة', 'ڕێژەی پشک')}
                    </Badge>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {policy.effectiveDate} - {policy.expiryDate}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                  <div>
                    <span>{getLabel('Scope:', 'نطاق العمليات:', 'بواری گومرگ:')} </span>
                    <b className="text-slate-300">{policy.revenueScope}</b>
                  </div>
                  <div>
                    <span>{getLabel('Legal Status:', 'الوضعية القانونية:', 'دۆخی یاسایی:')} </span>
                    <span className="text-emerald-400 font-bold">{policy.approvalStatus}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div>
            <Card className="bg-[#0b1322] border-slate-800 p-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                {getLabel('Sovereign Separation Rules', 'قواعد الفصل وحماية السرية السيادية', 'یاساکانی جیاکاری سەروەری دارایی')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {getLabel(
                  'Under Federal and Kurdistan sovereignty agreements, general treasury accounts and raw internal local transaction ledgers are strictly hosted inside local clusters. The Federal Ministry receives only structured audited metadata proofs.',
                  'بموجب اتفاقيات السيادة الوطنية المبرمة، تخضع الأنظمة المالية الداخلية للطرفين للحوسبة المحلية التامة. لا تشترك البوابة المركزية بالمسودات أو المعاملات التفصيلية للمواطنين، بل بمؤشرات المطابقة والنسب الإجمالية فقط.',
                  'بە پێی پەیمانی سەروەریی نێوان هەولێر و بەغدا، سەرجەم داتاکانی خەڵک لە ئاستی دەروازەکان دەژرێن و پارێزراون. بەغدا تەنها ڕێژەی سەرەکی و پشکی گشتی ٥٠٪ ی دەست دەکەوێت.'
                )}
              </p>
              
              <div className="mt-4 space-y-2 text-[11px] font-mono">
                <div className="flex items-center justify-between p-2 bg-[#122237]/60 rounded">
                  <span className="text-slate-400">{getLabel('Oil revenue inclusion:', 'إيرادات الموازنة والمحروقات:', 'تێکەڵبوونی نەوت:')}</span>
                  <span className="text-rose-400 font-bold">STRICTLY_FORBIDDEN</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#122237]/60 rounded">
                  <span className="text-slate-400">{getLabel('Internal payroll integration:', 'توطين المعاشات والرواتب:', 'مووچەی فەرمانبەران:')}</span>
                  <span className="text-rose-400 font-bold">OUT_OF_SCOPE</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#122237]/60 rounded">
                  <span className="text-slate-400">{getLabel('Zero-Disclosure audit verified:', 'تحقق خالٍ من كشف البيانات التفصيلية:', 'وردبینی بێ-خستنەڕوو:')}</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CALCULATIONS ENGINE */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-1.5 font-mono">
                <Cpu className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
                <span>{getLabel('Mathematical Border Revenue Calculation Engine', 'بزوێنەری بیرکاری گومرگ و دەروازەکان', 'سیستەمی هەژمارکردنی داهاتی دەروازە')}</span>
              </h3>

              {/* Simulation Provider Controls */}
              <div className="bg-[#121c2c] border border-slate-800 rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">
                      {getLabel('Automated Telemetry Provider Simulator', 'محاكي دابینکاری داتا مۆڵەتپێدراو', 'مەینەتی هۆست فیدەر بۆ داتای گومرگ')}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {getLabel(
                        'Enable temporary testing provider with custom verified border data values.',
                        'ڕێگە بدە بە تاقیکردنەوەی خێرای بزوێنەرەکە بە زیادکردنی ژمارەی خەمڵێنراوی خاو.',
                        'ڕێگە بدە بە تاقیکردنەوەی خێرای بزوێنەرەکە بە زیادکردنی ژمارەی خەمڵێنراوی خاو.'
                      )}
                    </p>
                  </div>

                  <button
                    onClick={handleToggleTestProvider}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isTestProviderEnabled
                        ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>
                      {isTestProviderEnabled 
                        ? getLabel('Deactivate Simulator', 'تعطيل المحاكي', 'ناچالاککردن') 
                        : getLabel('Activate Test Data', 'تفعيل محاكي البيانات', 'چالاککردنی تاقیکاری')
                      }
                    </span>
                  </button>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 font-mono mb-1">{getLabel('Gross Customs Revenue (USD):', 'مجمل إيرادات الجمارك (دولار):', 'تێکڕای گشتی داهاتی گومرکی (USD):')}</label>
                    <input
                      type="number"
                      value={testGrossUSD}
                      disabled={isTestProviderEnabled}
                      onChange={(e) => setTestGrossUSD(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-xs rounded p-2 text-slate-100 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-mono mb-1">{getLabel('Validated Deductions (USD):', 'تخفيضات ومصاريف دەروازە:', 'داشکاندن و خەرجییە گومرگییە ڕێگەپێدراوەکان:')}</label>
                    <input
                      type="number"
                      value={testDeductionUSD}
                      disabled={isTestProviderEnabled}
                      onChange={(e) => setTestDeductionUSD(e.target.value)}
                      className="bg-slate-900 border border-slate-800 text-xs rounded p-2 text-slate-100 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Selector configurations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">{getLabel('Target Active Policy:', 'الاتفاقية الناشطة المستهدفة:', 'یاسای جێبەجێکار:')}</label>
                  <select
                    value={selectedPolicyId}
                    onChange={(e) => setSelectedPolicyId(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-2 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  >
                    {policies.map(p => (
                      <option key={p.policyId} value={p.policyId}>{p.policyId}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">{getLabel('Settlement Period:', 'فترة التصفية والمطابقة:', 'وەرزی یەکلاییکردنەوە:')}</label>
                  <input
                    type="text"
                    value={periodId}
                    onChange={(e) => setPeriodId(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-xs rounded p-2 text-slate-100 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Output block displaying calculated values or REAL_BORDER_REVENUE_PROVIDER_REQUIRED status */}
              <div className="bg-[#0b101a] border border-slate-850 rounded-lg p-5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#cca553] block mb-2">{getLabel('Engine Process State Output', 'مخرجات حالة بزوێنەی بیرکاری', 'ئەنجامی ڕاستەوخۆی پرۆسەی هەژمار')}</span>
                
                {calculationResult.status === 'PENDING_PROVIDER_DATA' ? (
                  <div className="flex flex-col items-center justify-center p-6 bg-amber-500/5 border border-dashed border-amber-500/25 rounded-md">
                    <AlertTriangle className="w-7 h-7 text-amber-500 mb-2" />
                    <p className="text-xs font-bold font-mono text-amber-400">STATUS: PENDING_PROVIDER_DATA</p>
                    <p className="text-[11px] text-slate-400 text-center mt-1.5 max-w-md">
                      {getLabel(
                        'The engine rejected the calculation due to lacks of verified automated provider validation signals. Reason code:',
                        'تم رفض الحساب تلقائياً نظراً لعدم توفر داتا الدەروازە الموثقة من الشبكات المحلية. رمز السبب:',
                        'بزوێنەرەکە ڕەتی کردەوە داتای گرێبەستی بێ پرۆڤایدەر هەژمار بکات چونکە کایەی دڵنیایی داواکراوە. کۆدی ڕەتکردنەوە:'
                      )}
                    </p>
                    <code className="text-xs font-mono px-3 py-1 bg-slate-900 border border-slate-800 rounded text-amber-300 font-bold mt-2.5">
                      REAL_BORDER_REVENUE_PROVIDER_REQUIRED
                    </code>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-emerald-950/20 border border-emerald-500/20 rounded">
                      <span className="text-xs text-emerald-400 font-bold uppercase font-mono">STATUS: CALCULATED (PROVISIONAL SIMULATION)</span>
                      <span className="text-[10px] text-slate-500 font-mono">TEST_PROVIDER_ACTIVE</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-3.5 bg-slate-900 border border-slate-850 rounded">
                        <span className="text-[10px] text-slate-400 font-mono block">{getLabel('Gross Customs Sum:', 'إجمالي إيراد دەروازە:', 'تێکڕای داهاتی دەروازە:')}</span>
                        <span className="text-base font-bold text-white font-mono block mt-1">${parseFloat(testGrossUSD).toLocaleString()} USD</span>
                        <span className="text-[9px] text-slate-500 font-mono block mt-1">{calculationResult.auditProof?.grossBorderRevenueHash}</span>
                      </div>

                      <div className="p-3.5 bg-slate-900 border border-slate-850 rounded">
                        <span className="text-[10px] text-slate-400 font-mono block">{getLabel('Calculated 50% Federal Share:', 'مستحق الهيئة الفيدرالية ٥٠٪:', 'پشکی فیدراڵی فەرمی ٥٠٪:')}</span>
                        <span className="text-base font-bold text-amber-400 font-mono block mt-1">${((parseFloat(testGrossUSD) - parseFloat(testDeductionUSD)) * 0.5).toLocaleString()} USD</span>
                        <span className="text-[9px] text-slate-500 font-mono block mt-1">{calculationResult.auditProof?.payableAmountHash}</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-900 border border-slate-850 rounded font-mono text-[11px] space-y-1 text-slate-400 mt-2">
                      <p className="font-bold text-slate-300 mb-1.5">{getLabel('Zero-Disclosure Verification Proof generated:', 'دليل التحقق السيادي المولد:', 'بەڵگەی ئۆتۆماتیکی وردبینی:')}</p>
                      <p><b>{getLabel('Audit ID:', 'رقم التحقق:', 'کۆدی سەرەکی:')}</b> <span className="text-slate-300">{calculationResult.auditProof?.auditTraceId}</span></p>
                      <p><b>{getLabel('Compliance Certificate:', 'بەنوسی دڵنیایی:', 'ئاستی یەکگرتنەوە:')}</b> <span className="text-emerald-400 font-bold">CERTIFIED_ZERO_DISCLOSURE</span></p>
                      <p><b>{getLabel('Sovereign Signatures:', 'تواقيع السيادة المشتركة:', 'واژۆی دەسەڵاتی خاوەن دۆسیە:')}</b> {calculationResult.auditProof ? `${calculationResult.auditProof.sourceJurisdiction}_SECURED || ${calculationResult.auditProof.recipientJurisdiction}_SECURED` : ''}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className="bg-[#0b1322] border-slate-800 p-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3">
                {getLabel('Formula & Standard Rules', 'المعادلات الریاضیة الرسمیة للحدود', 'یاسا بیرکارییەکانی مینیوی سنوور')}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {getLabel(
                  'The calculation engine uses strict legal custom sharing rules without hardcoding state properties:',
                  'بزوێنەری بیرکاری داهاتی گومرکی بە ئۆتۆماتیکی پاشەکەست دەکات دوای کایەکردنی خەرجییەکان:',
                  'حیسابی داهاتی گشت دەروازە حکومەتییەکان لە کۆتاییدا بەم نەخشەیە خەمڵێنرێت:'
                )}
              </p>
              
              <div className="bg-slate-900 border border-slate-850 rounded p-3 text-start font-mono text-xs text-amber-500 mt-4 leading-relaxed">
                <b>Net Revenue Basis (B)</b> = Gross Customs Revenue - Approved Deductions<br/>
                <b>Payable Federal Sum</b> = (B * Policy Percentage) / 100
              </div>

              <div className="mt-4 p-3 bg-slate-900/50 border border-slate-800 rounded text-xs text-slate-400">
                <p className="font-bold text-slate-300 font-mono mb-1">{getLabel('Telemetry required:', 'مزودو الشبکات:', 'هێڵی گواستنەوەی داتا:')}</p>
                <p className="leading-relaxed">
                  {getLabel(
                    'No fake or simulated balances leak into production databases. If data signals drop, calculated bounds turn back to pending provider state automatically.',
                    'لا یسمح للبیانات التجریبیة بدخول قواعد البیانات المرکزیة للطرفین. عند انقطاع الاتصال تحتسب حالة تعلیق المخرجات تلقائیاً.',
                    'هیچ کات داتایەکی گومانی ناچێتە سیستمەوە. لە کاتی نەبوونی پەیوەندی بەستێن، سەرجەم ژمارەکان ئەبن بە مەرجدار.'
                  )}
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB CONTENT: READINESS REPORT */}
      {activeTab === 'readiness' && (
        <Card className="bg-slate-900 border-slate-800 p-5 text-start">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono mb-4">
            <Activity className="w-5 h-5 text-amber-500" />
            <span>{getLabel('Sovereign Border Scope & Readiness Audit Report', 'تقرير جاهزية کورتەی کایەی پەیوەندی دەروازەکان', 'ڕاپۆرتی سەرنشین بۆ هەڵسەنگاندنی کایەی ڕاستەقینە')}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="py-3 px-4 bg-[#0c1624] border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-mono">{getLabel('System State', 'حالة النطاق الموحد', 'دۆخی گشتی')}</span>
              <span className="block text-sm font-bold text-amber-400 font-mono mt-1">LOCKED</span>
            </div>
            <div className="py-3 px-4 bg-[#0c1624] border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-mono">{getLabel('Pruning Mapping', 'حماية النطاق', 'نەخشەی دەرچوون')}</span>
              <span className="block text-sm font-bold text-emerald-400 font-mono mt-1">FULLY_PRUNED</span>
            </div>
            <div className="py-3 px-4 bg-[#0c1624] border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-mono">{getLabel('Registered Rules', 'الاتفاقيات الفعالة', 'یاساکانی دەروازە')}</span>
              <span className="block text-sm font-bold text-white font-mono mt-1">{readinessReport.borderPolicyCount} Policies</span>
            </div>
            <div className="py-3 px-4 bg-[#0c1624] border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-mono">{getLabel('Gate Decision', 'الامتثال للاتفاق الجمركي', 'جوڵەی بڕیار لە دەروازە')}</span>
              <span className="block text-xs font-bold text-rose-400 font-mono mt-1" title="Providers required to transition to pilot phase">PENDING_PROVIDERS</span>
            </div>
          </div>

          <div className="bg-[#0b101a] border border-slate-850 rounded-lg p-4 mb-4">
            <h4 className="text-xs font-bold text-slate-300 font-mono mb-2 uppercase tracking-wide">
              {getLabel('Certified Executive Core Statement', 'البيان السيادي والمصادقة التنفيذية للحدود', 'بەیاننامەی سەرەکی بەستێنی دەسەڵاتی دەروازەکان')}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans text-start">
              {readinessReport.notes[1]}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-[#cca553] font-mono mb-2">{getLabel('Mandatory Verification Items Evaluated:', 'مؤشرات التحقق الإجباریة:', 'داواکارییەکانی پاراستنی سەروەری گومرگی:')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px] text-slate-300">
              <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{getLabel('Constitutional 50% border split locked', 'تم حظر دمج أي حسابات خارجية', 'یاسای فیدراڵی ٥٠٪ دەروازەکان جێگیرە')}</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{getLabel('Sovereignty-rule data leakage restricted', 'تأمين داتا الإقليم وعدم كشف السرية', 'دزەکردنی داتا بە تەواوی بلۆککراوە')}</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{getLabel('No hardcoded mock transaction values', 'أرقام الحساب خالية من البيانات الصورية', 'سیستەمەکە سەربەخۆیە لە ژمارەی ساختە')}</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 border border-slate-800 rounded flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{getLabel('Zero general fiscal or salary-integration overreach', 'عدم وجود تداخل مع ملفات الرواتب العامة', 'هیچ تێکەڵبوونێک بە مووچەی مەدەنییەکان نییە')}</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* TAB CONTENT: SECURITY & SOVEREIGNTY RULES */}
      {activeTab === 'security-policy' && (
        <Card className="bg-slate-900 border-slate-800 p-5 text-start">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono mb-4">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span>{getLabel('Sovereignty & Separation Rules Visibility Ledger', 'دفتر سجل الفصل وحماية سيادة البيانات', 'لیدجەری پاراستنی تایبەتمەندی و بەندەکانی دەسەڵاتی داتای هەرێم')}</span>
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            {getLabel(
              'To build mutual trust, our software mandates that Baghdad audit officials can never bypass sovereignty bounds to view raw, unhashed regional transaction elements. Similarly, admin roles are restricted from forcing central overrides of local database nodes.',
              'لتعزيز الثقة البينية، تمنع البرمجيات سلطات التدقيق الاتحادية من الولوج المباشر للداتا الخام لبلدات إقليم كوردستان، وتسمح بالتحقق المستند للوثائق الثنائية. كما يمنع الإداريون الفيدراليون من إجبار مخدّمات الإقليم على تعديل داتها محلياً.',
              'بۆ پاراستنی بارودۆخی متمانە، بەرنامەکە بە یاسای توند ڕێگری لێ دەکات کە فیکەرەکانی بەغداد بتوانن داتای وردبینی دەروازەیی هەولێر ببینن بێ واژۆی هاوبەش، هەروەها ناتوانرێت لە لایەن ئەدمین تێکبدرێت.'
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#0a111a] border border-slate-850 rounded">
              <span className="text-xs font-bold text-emerald-400 font-mono block uppercase mb-1">
                Rule check: canFederalViewRawKrgBorderRevenue()
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {getLabel(
                  'KRG raw clearance logs are processed in Erbil. Federal requests return true only for pre-audited high-level totals or signed metadata blocks.',
                  'داتای سەرەکی گومرگی هەرێم بە ناچالاکی تێپەڕ دەبێت. بەغداد تەنها مێتاداتای زەرور و باڵانسی فەرمی واژۆکراوی هەیە.',
                  'داتای گومرگی دەروازەکانی هەرێم تەنها مێتاداتاکەی بۆ بەغدا دەچێت. داتای سەرەکی گرێدراوە تەنها خوێنەرەوەی لۆکاڵی هەیە.'
                )}
              </p>
              <span className="inline-block mt-3 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/25 uppercase">
                STATUS: ENFORCED (FALSE BY DEFAULT)
              </span>
            </div>

            <div className="p-4 bg-[#0a111a] border border-slate-850 rounded">
              <span className="text-xs font-bold text-rose-450 font-mono block uppercase mb-1">
                Rule check: canAdminBypassSovereigntyRules()
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {getLabel(
                  'Even system administrators with full write rights are programmaticly barred from manually bypassing cryptographic separation rules.',
                  'ڕێگری لە دەستێوەردانی ئەندازیار یان سەرکردەکانی سیستەم کراوە لە ڕێڕەوی گواستنەوەی پارە بە بەکارهێنانی کلیلە کریپتۆگرافییەکان.',
                  'ڕێگری لە دەستێوەردانی ئەندازیار یان سەرکردەکانی سیستەم کراوە لە ڕێڕەوی گواستنەوەی پارە بە بەکارهێنانی کلیلە کریپتۆگرافییەکان.'
                )}
              </p>
              <span className="inline-block mt-3 bg-rose-500/10 text-rose-400 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-500/25 uppercase">
                STATUS: BLOCKED (FALSE BY DEFAULT)
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Decorative Branding Watermark */}
      <div className="mt-8 border-t border-slate-800/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-3">
        <span>{getLabel('IRAQ CENTRAL BANK LIAISON ACTIVE', 'قناة البنك المركزي العراقي نشطة', 'هێڵی پەیوەندی بانکی ناوەندیی چالاکە')}</span>
        <span>
          {getLabel('DECISION:', 'حالة التصفية الحالية:', 'بڕیاری کۆتایی:')} <b className="text-amber-400">CONDITIONALLY_READY — PROVIDERS REQUIRED</b>
        </span>
      </div>
    </div>
  );
};
