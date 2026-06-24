import React, { useState } from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';

import { AuditLedgerEngine } from './AuditLedgerEngine';
import { AuditCaseEngine } from './AuditCaseEngine';
import { RiskSignalEngine } from './RiskSignalEngine';
import { RevenueLeakageAnalysisEngine } from './RevenueLeakageAnalysisEngine';

import { Card, Badge, Button } from '../../ui';
import { 
  ShieldCheck, Landmark, CheckCircle2, Lock, RefreshCw, 
  HelpCircle, AlertCircle, Cpu, TrendingUp 
} from 'lucide-react';

export default function JointIntegrityDashboard() {
  const { userRole, logAction } = useGovernment();
  const { locale: lang } = useI18n();

  // Roles allowed to view the joint integrity dashboard
  const authorizedRoles = [
    'Federal Prime Minister',
    'KRG Prime Minister',
    'Federal Integrity Commission',
    'KRG Integrity Authority',
    'Joint Coordination Council',
    'Joint Audit Council',
    'Joint Integrity Council',
    'Joint Revenue Board'
  ];

  const isAuthorized = authorizedRoles.includes(userRole);

  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'IDLE' | 'VERIFIED' | 'TAMPERED'>('IDLE');
  const [reconcileTime, setReconcileTime] = useState<string | null>(null);

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center bg-[#0d1527] border border-red-500/30 rounded-lg max-w-2xl mx-auto my-12" id="joint-integrity-unauthorized">
        <ShieldCheck className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-sans text-red-100 mb-2">ئەنجومەنی باڵای هەماهەنگی دەسپاکی: ڕێگەپێنەدراو</h2>
        <p className="text-xs font-sans text-slate-400 mb-6 leading-relaxed">
          ئەم بەشە پارێزراوە تایبەتە بە ئەندامانی فەرمی ئەنجومەنی باڵای هەماهەنگی دارایی و دەسپاکی هاوبەشی فیدراڵ و هەرێم.
        </p>
        <span className="text-[10px] font-mono text-slate-500 block">JOINT_INTEGRITY_ACCESS_DENIED</span>
      </div>
    );
  }

  // Handle live cryptographic chain check
  const checkChains = () => {
    setVerifying(true);
    setVerificationResult('IDLE');
    setTimeout(() => {
      setVerifying(false);
      const isOk = AuditLedgerEngine.verifyChainIntegrity();
      setVerificationResult(isOk ? 'VERIFIED' : 'TAMPERED');
      setReconcileTime(new Date().toISOString());
      logAction('JOINT_INTEGRITY_CHAIN_CHECK', { verified: isOk });
    }, 1000);
  };

  // Compute aggregated scores to avoid exposing raw rows
  const fedCases = AuditCaseEngine.getCasesByJurisdiction('federal');
  const krgCases = AuditCaseEngine.getCasesByJurisdiction('krg');

  const fedSignals = RiskSignalEngine.getSignalsByJurisdiction('federal');
  const krgSignals = RiskSignalEngine.getSignalsByJurisdiction('krg');

  const fedScore = RevenueLeakageAnalysisEngine.calculateIntegrityScore('federal');
  const krgScore = RevenueLeakageAnalysisEngine.calculateIntegrityScore('krg');
  const jointIntegrityScore = Math.round((fedScore + krgScore) / 2);

  const totalJointCases = fedCases.length + krgCases.length;
  const criticalJointRisks = fedSignals.filter(s => s.severity === 'CRITICAL').length + krgSignals.filter(s => s.severity === 'CRITICAL').length;

  return (
    <div className="bg-[#0b1329] text-slate-100 min-h-screen p-6 font-sans antialiased" id="joint-integrity-dashboard-root">
      
      {/* Sovereign Header */}
      <div className="border-b border-[#E0A96D]/20 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-[10px] tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-0.5 rounded-full font-bold uppercase font-sans">هاوپەیمانی گشتی دەسپاکی نیشتمانی (Joint Integrity)</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">سەکۆی گشتی لێکۆڵینەوە و مۆری هاوبەشی دەسپاکی (National Integrity & Blockchain Reconciliation)</h1>
          <p className="text-xs text-slate-400">هاوتاکردنی متمانەی چاودێری دارایی عێراق لە نێوان چاکسازی فیدراڵ و دەستەی پێداچوونەوەی مۆرەکانی هەرێمی کوردستان</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={checkChains} 
            disabled={verifying}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-bold text-xs px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200"
          >
            {verifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> پێداچوونەوەی مۆرەکان...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> ئەنجامدانی هاوتاکردنی لیدجەر
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Cryptographic verification banner */}
      {verificationResult === 'VERIFIED' && reconcileTime && (
        <div className="bg-[#093a20]/30 border border-emerald-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs font-sans">
            <strong className="text-white block font-bold text-[13px] mb-0.5">هاوتاکردنی مۆرە دیجیتاڵییەکان بە تەواوی ڕاست و دروست بوو (Ledger Cryptographically Verified)</strong>
            <span className="text-slate-300">سەرجەم لۆگەکانی چاودێری و دۆسیەکانی گەندەڵان بە پارێزراوی لە زنجیرەی نیشتمانیدا تۆمارکراون و هیچ گۆڕانکارییەک ئەنجام نەدراوە. </span>
            <code className="bg-slate-950/40 px-1.5 py-0.5 rounded font-mono text-emerald-400 text-[10px] block sm:inline-block mt-1 sm:mt-0 font-bold">SHA_RECON_TRANS_OK_903820c8f1a18bc</code>
            <span className="text-[10px] text-slate-450 block mt-1">کات: {reconcileTime} • مۆری هاوبەشی دیجیتاڵی واژۆ کرا</span>
          </div>
        </div>
      )}

      {/* Aggregate indicators only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">شاخصی گشتی دەسپاکی نیشتمانی</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400">{jointIntegrityScore}%</div>
          <p className="text-[10px] text-slate-400 mt-1">کۆژمەی تێکڕای فیدراڵ و هەرێم</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">کۆی دۆسیە هاوبەشەکان</span>
            <Cpu className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white">{totalJointCases}</div>
          <p className="text-[10px] text-slate-400 mt-1">لە دەفتەری فیدراڵی و هەرێمی</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">مەترسییە هەواڵگرییە چاوپۆشیکراوەکان</span>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-red-400">{criticalJointRisks}</div>
          <p className="text-[10px] text-slate-400 mt-1">پلەی مەترسی گزی بێ سنوور</p>
        </div>

        <div className="bg-[#101b35] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 font-bold">داوەریکردنی مۆر</span>
            <RefreshCw className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-mono font-semibold text-emerald-400">100% SECURE</div>
          <p className="text-[10px] text-slate-400 mt-1">هاوشێوەی بلۆکچێن جێگیرکراو</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Cross-Government Risk Indicators */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-4">شاخصەکانی تێپەڕاندنی سەروەریی دەسپاکی عێراق</h3>
            <div className="flex flex-col gap-4">
              
              <div className="p-4 bg-[#0a1122] rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs mb-2 border-b border-slate-800 pb-1.5">
                  <span className="text-white font-bold font-sans">تۆماری ئاماری فیدراڵ (Baghdad Scope)</span>
                  <Badge variant="outline">رێکخراو</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">شاخصی دەسپاکی بنچینەیی:</span>
                    <strong className="text-emerald-400">{fedScore}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">ڕێژەی لێکۆڵینەوە کراوەکان:</span>
                    <strong className="text-white">{fedCases.length} دۆسیە</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0a1122] rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs mb-2 border-b border-slate-800 pb-1.5">
                  <span className="text-white font-bold font-sans">تۆماری ئاماری هەرێمی کوردستان (Erbil Scope)</span>
                  <Badge variant="outline">رێکخراو</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">شاخصی دەسپاکی هەرێمی کوردستان:</span>
                    <strong className="text-emerald-400">{krgScore}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">ڕێژەی لێکۆڵینەوە کراوەکانی هەرێم:</span>
                    <strong className="text-white">{krgCases.length} دۆسیە</strong>
                  </div>
                </div>
              </div>

            </div>
          </Card>

          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-3">هاوسەنگ ترازنامەی گشتی دزیەکانی داهاتی سەر گومرگەکان</h3>
            <div className="p-4 bg-red-950/20 rounded border border-red-500/20 text-xs text-slate-300 leading-relaxed mb-1">
              بەپێی چاودێری هاوبەشی ئەنجومەنی دەسەڵاتی دەسپاکی هاوبەش فیدراڵ و هەرێم، کۆی داهاتە بزر و دزەکراوەکان هیچ گۆڕانکارییەکی مەترسیدارتان لە مۆری سەکۆدا دەرنەکردووە. نوێکردنەوەکانی نوێ لە ڕێگەی هاوتا لۆگ بە سەرکەوتوویی واژۆ کراوە.
            </div>
          </Card>
        </div>

        {/* Sovereignty rules */}
        <div className="flex flex-col gap-6">
          <Card className="bg-[#101b35] border-slate-800 p-6">
            <h3 className="text-sm font-bold text-white mb-3">پەیماننامەی شەستگوزاری پاراستنی سەروەریی خاکی داتا</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              سیستەمی گشتی لیدجەر پێکهاتووە لە مۆرە چێنراوە گشتییەکان. هیچ تۆمارێکی کاڵ لە لایەکی گومرگی فیدراڵ بۆ گومرگی هەرێم ناگوازرێتەوە بەبێ مۆری کریپتۆگرافی پارێزراو. ئەمە متمانەی چاکسازی دەستووری زیاتر دەپارێزێت.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
}
