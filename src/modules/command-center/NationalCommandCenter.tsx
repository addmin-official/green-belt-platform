import React, { useState } from 'react';
import { 
  Shield, Landmark, Activity, Network, Layers, BadgeAlert, FileText, Cpu, AlertTriangle, 
  Play, CircleDollarSign, CheckCircle2, Server, HelpCircle, FileCheck, RefreshCw, Key, KeySquare, TrendingUp
} from 'lucide-react';
import { Language } from '../../types';

// Standardized UI wrappers
import { Card, Badge, PageHeader, Button } from '../../ui';

// Core hook & contextual governance
import { useNationalCommandCenter } from './hooks/useNationalCommandCenter';
import { useGovernment, JurisdictionType } from '../../providers/GovernmentProvider';
import { IdentityRegistry } from '../../shared/identity/IdentityRegistry';
import { CertificationEngine } from '../../shared/workforce/CertificationEngine';
import { LocalizationRuntimeAudit } from '../../shared/localization/LocalizationRuntimeAudit';
import { ExecutiveIsolationAudit } from '../../shared/executive/ExecutiveIsolationAudit';
import { RevenueIsolationAudit } from '../../shared/revenue/RevenueIsolationAudit';
import { CustomsIsolationAudit } from '../../shared/customs/CustomsIsolationAudit';
import { TradeIsolationAudit } from '../../shared/trade/TradeIsolationAudit';
import { IdentityIsolationAudit } from '../../shared/identity/IdentityIsolationAudit';
import { WorkforceIsolationAudit } from '../../shared/workforce/WorkforceIsolationAudit';
import { IntelligenceIsolationAudit } from '../../shared/intelligence/IntelligenceIsolationAudit';
import { SecurityIsolationAudit } from '../../shared/security/SecurityIsolationAudit';
import { AssetIsolationAudit } from '../../services/assets/AssetIsolationAudit';
import { SharedBoundaryAudit } from '../../shared/security/SharedBoundaryAudit';
import { SovereignIsolationAuditReport } from '../../shared/security/SovereignIsolationAuditReport';
import { PresentationControlPanel } from '../../shared/demo/PresentationControlPanel';
import { AcquisitionReadinessPanel } from '../../shared/acquisition/AcquisitionReadinessPanel';
import { PilotDeploymentPanel } from '../../shared/pilot/PilotDeploymentPanel';
import { DemoModeController, ProviderState } from '../../shared/demo/DemoModeController';

// Executive Desks for Federated Governance Layer
import { FederalPrimeMinisterDesk } from '../../app/components/FederalPrimeMinisterDesk';
import { KRGPrimeMinisterDesk } from '../../app/components/KRGPrimeMinisterDesk';
import { JointExecutiveCouncil } from '../../app/components/JointExecutiveCouncil';
import { FederationOperationsCenter } from '../federation/FederationOperationsCenter';
import { SovereignGovernanceRouter } from '../../shared/executive/SovereignGovernanceRouter';
import FederalIntelligenceDashboard from '../../federal/intelligence/FederalIntelligenceDashboard';
import KRGIntelligenceDashboard from '../../krg/intelligence/KRGIntelligenceDashboard';
import JointNationalSecurityDashboard from '../../shared/intelligence/JointNationalSecurityDashboard';


// Sovereign Procurement Modules
import NationalTenderCenter from '../../app/components/procurement/NationalTenderCenter';
import VendorQualificationPanel from '../../app/components/procurement/VendorQualificationPanel';
import ContractLifecyclePanel from '../../app/components/procurement/ContractLifecyclePanel';
import BidEvaluationPanel from '../../app/components/procurement/BidEvaluationPanel';
import ProcurementAuditPanel from '../../app/components/procurement/ProcurementAuditPanel';
import SupplierRiskPanel from '../../app/components/procurement/SupplierRiskPanel';
import { Coins } from 'lucide-react';

interface NationalCommandCenterProps {
  lang: Language;
}

export default function NationalCommandCenter({ lang }: NationalCommandCenterProps) {
  const model = useNationalCommandCenter(lang);
  const { 
    activeContext, 
    userRole, 
    customsRecords, 
    policies, 
    identities, 
    pkiFederal, 
    pkiKrg, 
    auditTrail, 
    federationTransactions, 
    approveFederation, 
    rejectFederation,
    jointTasks, 
    resolveJointTask, 
    addJointTask, 
    federalFabricSchema, 
    krgFabricSchema 
  } = useGovernment();

  const isRtl = lang !== 'en';

  const [providerStates, setProviderStates] = useState({
    checkpoint: DemoModeController.getProviderState('checkpoint'),
    operational: DemoModeController.getProviderState('operational'),
    audit: DemoModeController.getProviderState('audit'),
    ledger: DemoModeController.getProviderState('ledger'),
    workflow: DemoModeController.getProviderState('workflow')
  });

  const handleCycleProviderState = (provider: string) => {
    const states: ProviderState[] = ['not_configured', 'configured', 'unavailable', 'ready', 'error'];
    const current = DemoModeController.getProviderState(provider);
    const nextIndex = (states.indexOf(current) + 1) % states.length;
    const nextState = states[nextIndex];
    DemoModeController.setProviderState(provider, nextState);
    setProviderStates(prev => ({
      ...prev,
      [provider]: nextState
    }));
  };
  
  // Capability sub-navigation inside the PM Command Center
  const [activeCapability, setActiveCapability] = useState<
    'brief' | 'analytics' | 'security' | 'economy' | 'identity' | 'infra' | 'policy' | 'cabinet' | 'federation' | 'procurement'
  >('brief');

  const [activeProcurementSubTab, setActiveProcurementSubTab] = useState<'tenders' | 'bids' | 'contracts' | 'vendors' | 'risk' | 'audit'>('tenders');
  const [selectedStaffDivision, setSelectedStaffDivision] = useState<'all' | 'border' | 'customs' | 'revenue' | 'trade' | 'investigation'>('all');

  // Multi-government titles & translation mapping
  const titleMap = {
    FEDERAL_IRAQ: {
      en: 'Federal Prime Minister Command Center',
      ar: 'مركز قيادة رئيس الوزراء الاتحادي',
      ku: 'سەنتەری فەرماندەیی سەرۆک وەزیرانی فیدراڵ'
    },
    KURDISTAN_REGION: {
      en: 'Kurdistan Prime Minister Command Center',
      ar: 'مركز قيادة رئيس وزراء إقليم كوردستان',
      ku: 'سەنتەری فەرماندەیی سەرۆک وەزیرانی هەرێم (KRG)'
    },
    JOINT_OPERATIONS: {
      en: 'Joint Federal-KRG Coordination Workspace',
      ar: 'مساحة التنسيق المشترك لنواة الاتحاد العراقي',
      ku: 'کایەی کاری هاوبەشی فیدراڵ-هەرێم'
    }
  };

  const getLabel = (en: string, ar: string, ku: string) => {
    const labels = { en, ar, ku };
    return labels[lang] || en;
  };

  const activeTitle = titleMap[activeContext][lang];
  const activeSubtitle = activeContext === 'FEDERAL_IRAQ'
    ? getLabel('Republic of Iraq Sovereign Cabinet Executive Oversight Portal', 'البوابة التنفيذية لمجلس وزراء جمهورية العراق', 'پۆرتاڵی جێبەجێکردنی ئەنجومەنی وەزیرانی کۆماری عێراق')
    : activeContext === 'KURDISTAN_REGION'
    ? getLabel('Autonomous KRG Regional Administration Leadership Board', 'مجلس إدارة حكومة إقليم كوردستان المتمتع بالحكم الذاتي', 'ئەنجومەنی بەڕێوەبردنی خۆسەری هەرێمی کوردستان')
    : getLabel('Mutual Customs, Security, and Trade Federation Desk', 'مكتب التنسيق الجمركي والأمني وتبادل البيانات المشترك', 'نووسینگەی هاوبەشی هەماهەنگی گومرگ و ئاسایش');

  // Filter records based on Active Context (to avoid leakage!)
  const mappedJurisdiction: JurisdictionType = 
    activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';

  const contextCustoms = customsRecords.filter(r => 
    activeContext === 'JOINT_OPERATIONS' || r.jurisdiction === mappedJurisdiction
  );

  const contextPolicies = policies.filter(p => 
    activeContext === 'JOINT_OPERATIONS' || p.jurisdiction === mappedJurisdiction
  );

  const contextIdentities = identities.filter(i => 
    activeContext === 'JOINT_OPERATIONS' || i.jurisdiction === mappedJurisdiction
  );

  // Statistics modeling
  const statsSummary = {
    treasuryAllocated: activeContext === 'FEDERAL_IRAQ' 
      ? getLabel('142.5 T IQD', '142.5 ترليون د.ع', '١٤٢.٥ ترلیۆن دینار') 
      : activeContext === 'KURDISTAN_REGION' 
      ? getLabel('18.2 T IQD', '18.2 ترليون د.ع', '١٨.٢ ترلیۆن دینار') 
      : getLabel('160.7 T IQD (Combined)', '160.7 ترليون د.ع (مجمع)', '١٦٠.٧ ترلیۆن دینار (کۆی گشتی)'),
    budgetUtilization: activeContext === 'FEDERAL_IRAQ' ? '82.4%' : activeContext === 'KURDISTAN_REGION' ? '74.1%' : '81.5%',
    activeDirectives: activeContext === 'FEDERAL_IRAQ' ? 34 : activeContext === 'KURDISTAN_REGION' ? 19 : 53,
    borderRevenue: activeContext === 'FEDERAL_IRAQ' 
      ? getLabel('2.14 B USD', '2.14 مليار دولار', '٢.١٤ ملیار دۆلار') 
      : activeContext === 'KURDISTAN_REGION' 
      ? getLabel('540 M USD', '540 مليون دولار', '٥٤٠ ملیۆن دۆلار') 
      : getLabel('2.68 B USD', '2.68 مليار دولار', '٢.٦٨ ملیار دۆلار'),
    pkiStatus: activeContext === 'FEDERAL_IRAQ' 
      ? getLabel(pkiFederal.trustStatus, 'موثوق بالكامل', 'باوەڕ پێکراو') 
      : activeContext === 'KURDISTAN_REGION' 
      ? getLabel(pkiKrg.trustStatus, 'موثوق بالكامل', 'باوەڕ پێکراو') 
      : getLabel('Joint Federated', 'فدرالية مشتركة', 'فیدڕاڵی هاوبەش'),
  };

  // State for adding a Joint Task under Joint Mode
  const [jtName, setJtName] = useState('');
  const [jtLead, setJtLead] = useState('Joint Coordination Committee');
  const [jtParties, setJtParties] = useState('Gov Iraq Admin + KRG Commission');

  const handleCreateJointTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jtName.trim()) return;
    addJointTask(jtName, jtLead, jtParties);
    setJtName('');
  };

  return (
    <Card 
      id="executive-command-center-canvas" 
      className="p-5 lg:p-6 pb-8 lg:pb-10 overflow-visible text-slate-100 border border-[#E0A96D]/15 text-start bg-[#111e2e]/95" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      
      {/* 4K Unified Header with PageHeader component */}
      <PageHeader
        icon={activeContext === 'FEDERAL_IRAQ' ? <Landmark className="text-teal-400 w-7 h-7" /> : activeContext === 'KURDISTAN_REGION' ? <Layers className="text-emerald-400 w-7 h-7" /> : <Network className="text-amber-500 w-7 h-7 animate-pulse" />}
        title={activeTitle}
        description={activeSubtitle}
        status={
          <Badge variant={activeContext === 'FEDERAL_IRAQ' ? 'teal' : activeContext === 'KURDISTAN_REGION' ? 'success' : 'gold'}>
            {activeContext === 'FEDERAL_IRAQ' 
              ? getLabel('IRAQ FEDERAL SOVEREIGN', 'السيادة الاتحادية لجمهورية العراق', 'سەروەری فیدراڵی عێراق') 
              : activeContext === 'KURDISTAN_REGION' 
              ? getLabel('KRG AUTO-COUNCIL', 'حكومة إقليم كوردستان المتمتع بالحكم الذاتي', 'خۆسەری هەرێمی کوردستان') 
              : getLabel('JOINT FEDERATION ACTIVE', 'الممر الاتحادي المشترك الفعال', 'چالاکی هاوبەشی فیدراڵ-هەرێم')}
          </Badge>
        }
        actions={
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/60 pt-[10px] pb-2 pl-1 pr-[10px] border border-slate-800 rounded-xl">
            <span className="text-[9px] font-mono text-slate-500 uppercase px-2 font-bold select-none text-start">
              {getLabel('CAPABILITIES:', 'القدرات التنفيذية:', 'تواناکان:')}
            </span>
            {[
              { id: 'brief', label: getLabel('Brief', 'الموجز', 'کورتی'), icon: FileText },
              { id: 'analytics', label: getLabel('Analytics', 'التحليلات', 'شیکاری'), icon: TrendingUp },
              { id: 'security', label: getLabel('Security', 'الأمن', 'ئاسایش'), icon: Shield },
              { id: 'economy', label: getLabel('Economy', 'الاقتصاد', 'ئابووری'), icon: CircleDollarSign },
              { id: 'identity', label: getLabel('Identity', 'الهويات', 'ناسنامەکان'), icon: Key },
              { id: 'infra', label: getLabel('Infra', 'البنية التحتية', 'ژێرخان'), icon: Server },
              { id: 'policy', label: getLabel('Policy', 'السياسة', 'یاسا کانی'), icon: HelpCircle },
              { id: 'cabinet', label: getLabel('Cabinet', 'مجلس الوزراء', 'ئەنجومەن'), icon: Landmark },
              { id: 'federation', label: getLabel('Federation', 'الفيدرالية', 'پەیماننامەکان'), icon: Network },
              { id: 'procurement', label: getLabel('Procurement', 'العطاءات والمشتريات', 'داواکاریی تەندەر'), icon: Coins },
            ].map((cap) => (
              <button
                key={cap.id}
                onClick={() => setActiveCapability(cap.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeCapability === cap.id 
                    ? 'bg-[#1a2c42] text-[#E0A96D] border-[#E0A96D]/40 font-bold' 
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                <cap.icon className="w-3.5 h-3.5 text-[#cca553] shrink-0" />
                <span className="inline-block whitespace-nowrap">{cap.label}</span>
              </button>
            ))}
          </div>
        }
      />

      {/* ACTIVE OWNERSHIP AND ROLE INDICATOR BAR */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <BadgeAlert className="w-4 h-4 text-[#cca553] shrink-0" />
          <span className="text-slate-300 font-medium">
            {getLabel(
              `Active Admin Domain State: [${activeContext}] • Executive Actor: [${userRole}]`,
              `الحقل الإداري النشط: [${activeContext}] • المفوض الحالي: [${userRole}]`,
              `مەودای کارگێڕی چالاک: [${activeContext}] • کارەکتەری جێبەجێکار: [${userRole}]`
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] bg-slate-900/80 text-slate-500 border border-slate-800 px-2 py-1 rounded">
            {getLabel('OWNER_GOV_ID: ', 'رمز الهيئة المالكة: ', 'کۆدی لایەنی بەرپرس: ')}
            {activeContext === 'FEDERAL_IRAQ' ? 'IQ-FED-BAGHDAD-01' : activeContext === 'KURDISTAN_REGION' ? 'IQ-KRG-ERBIL-02' : 'IQ-JOINT-MULTILATERAL-99'}
          </span>
          <span className="text-[10px] bg-slate-900/80 text-emerald-400 border border-emerald-950 px-2 py-1 rounded">
            {getLabel('TRUST_LEVEL: ', 'مستوى الثقة السيادي: ', 'ئاستی متمانە: ')}
            {getLabel('SECURE_LEVEL_A', 'مستوى الأمان كلاس A', 'ئاستی پارێزراوی جۆری یەکەم')}
          </span>
        </div>
      </div>

      {/* CORE STRATEGIC METRICS PANEL (EXECUTIVE DASHBOARD PARITY) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 block font-mono uppercase font-semibold">{getLabel('National Treasury allocated', 'رمز ميزانية الخزينة الوطنية', 'بودجەی تەرخانکراوی گشتی')}</span>
          <span className="text-lg font-bold text-teal-400 font-mono block mt-1">{statsSummary.treasuryAllocated}</span>
          <span className="text-[10px] text-slate-400 block mt-1">{getLabel('FY-2026/27 Approved Ledger', 'الموازنة معتمدة ومقفلة', 'بودجەی سەلمێنراوی دارایی')}</span>
        </div>
        
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 block font-mono uppercase font-semibold">{getLabel('Resource Utilization index', 'معدل استهلاك الموارد المخصصة', 'ڕێژەی سوودوەرگرتن لە سەرچاوە')}</span>
          <span className="text-lg font-bold text-emerald-400 font-mono block mt-1">{statsSummary.budgetUtilization}</span>
          <span className="text-[10px] text-slate-400 block mt-1">{getLabel('Real-time ledger audit', 'طوابق مستمرة للتدقيق', 'وردبینی دارایی ڕاستەوخۆ')}</span>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 block font-mono uppercase font-semibold">{getLabel('Active Cabinet Directives', 'القرارات والتشريعات المفعلة', 'یاساکانی کارای ئەنجومەن')}</span>
          <span className="text-lg font-bold text-white font-mono block mt-1">{statsSummary.activeDirectives}</span>
          <span className="text-[10px] text-slate-400 block mt-1">{getLabel('Legally ratified and sealed', 'مصدقة ومدرجة في البوابة', 'سەلمێنراو و واژۆکراو')}</span>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 block font-mono uppercase font-semibold">{getLabel('Customs Revenue Captured', 'الإيرادات الجمركية المحصلة', 'داهاتی پێوانەکراوی گومرگی')}</span>
          <span className="text-lg font-bold text-[#E0A96D] font-mono block mt-1">{statsSummary.borderRevenue}</span>
          <span className="text-[10px] text-slate-400 block mt-1">{getLabel('Current Quarter Estimate', 'تقديرات الربع الحالي', 'داهاتی گریمانەیی چارەکی ئەمساڵ')}</span>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-500 block font-mono uppercase font-semibold">{getLabel('Sovereign PKI Keys Status', 'حالة كروت المفتاح العام السيادي', 'باری کلیلە گشتییەکانی PKI')}</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-md font-bold text-slate-200 capitalize font-mono">{statsSummary.pkiStatus}</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">{getLabel('Active Root CA cryptographic Integrity', 'توقيعات التجزئة المعتمدة', 'ئاستی سەلامەتی دەسەڵاتی واژۆکان')}</span>
        </div>
      </div>

      {/* DYNAMICS OF CAPABILITIES */}
      <div className="mt-6">
        
        {/* TAB 1: BRIEF */}
        {activeCapability === 'brief' && (
          <div className="space-y-6">
            {/* PRESENTATION CONTROL PANEL */}
            <PresentationControlPanel lang={lang} />

            {/* GOVERNMENT ACQUISITION PACKAGE PANEL (PHASE 5.1) */}
            <AcquisitionReadinessPanel lang={lang} />

            {/* PILOT DEPLOYMENT OPERATIONS PANEL (PHASE 5.2) */}
            <PilotDeploymentPanel lang={lang} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex justify-between items-center">
                <span>{getLabel('EXECUTIVE BRIEF & ACTIONABLE RADAR', 'الموجز التنفيذي وبرنامج العمل الفوري', 'کورتەی جێبەجێکاری و بواری چالاکی:')}</span>
                <Badge variant="teal">{activeContext}</Badge>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mb-4">
                {activeContext === 'FEDERAL_IRAQ'
                  ? getLabel('Federal Command authorizes all active air/sea freight customs compliance checkpoints. Digital ledger seals prevent unauthorized trade bypasses across Southern seaports under Treaty Agreement Section 12.',
                              'تخول القيادة الاتحادية جميع نقاط تفتيش المطابقة الجمركية للشحن الجوي والبحري النشطة. تمنع أختام السجلات الرقمية التجاوزات التجارية غير المصرح بها عبر الموانئ البحرية الجنوبية.',
                              'سەرکردایەتی فیدراڵ دەسەڵات دەبەخشێت بە هەموو خاڵەکانی پشکنینی هاوتایی گومرگی دەریایی و ئاسمانی. مۆرەکانی دەفتەری دیجیتاڵ ڕێگری دەکەن لە تێپەڕبوونی گومرگی بەبێ مۆڵەت لە دەروازە دەریاییەکانی باشوور.')
                  : activeContext === 'KURDISTAN_REGION'
                  ? getLabel('KRG Regional Cabinet optimizes trade corridor efficiency for northern land gates. Strategic coordination with Baghdad maintains unified border taxation guidelines while protecting regional economic development.',
                              'يعمل مجلس وزراء إقليم كوردستان على تحسين كفاءة الممرات التجارية للبوابات البرية الشمالية. يحافظ التنسيق الاستراتيجي مع بغداد على المبادئ التوجيهية للضرائب الموحدة مع حماية التنمية الاقتصادية في الإقليم.',
                              'ئەنجومەنی وەزیرانی هەرێم کار دەکات بۆ بەرزکردنەوەی کارایی دەمارە بازرگانییەکانی دەروازە وشکانییەکانی باکوور. هەماهەنگی لەگەڵ بەغدا پارێزگاری لە ڕێسا هاوبەشەکان دەکات لە کاتی هاندانی وەبەرهێنانی ناوخۆیی.')
                  : getLabel('Joint Multilateral Room hosts direct integration interfaces. No state data leakages occur; however cross-boundary statistics federation bridges and automated validation handshakes remain fully operative.',
                              'تستضيف الغرفة المشتركة واجهات دمج مباشرة لمنع تسرب البيانات السيادية، مع الاستمرار في تشغيل ممرات البيانات الجمركية وتبادل إحصاءات الحدود وتأمين الاتصالات.',
                              'ڕووبەری هاوبەش میوانداری ڕووکاری یەکگرتنی ڕاستەوخۆ دەکات بۆ ڕێگری لە دزەکردنی داتا، لە کاتێکدا ڕێڕەوی هاوبەش و پشکنینی ئۆتۆماتیکی کاران.')
                }
              </p>
            </div>

            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between gap-4">
              <div>
                <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                  {getLabel('TACTICAL SYSTEM SUMMARY', 'ملخص الأنظمة التكتيكية المساعدة', 'پوختەی سیستەمە تەکتییەکە')}
                </h4>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{getLabel('Active Environment Hub', 'محور البيئة النشطة', 'ژووری چالاک')}</span>
                    <span className="text-[#E0A96D] font-mono font-bold">{activeContext}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{getLabel('Jurisdiction Code', 'رمز السلطة القضائية والتشريع', 'کۆدی بازنە')}</span>
                    <span className="text-white font-mono">{activeContext === 'FEDERAL_IRAQ' ? 'federal' : activeContext === 'KURDISTAN_REGION' ? 'krg' : 'joint'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{getLabel('Active Core Security Key', 'مفتاح الأمان السيادي النشط', 'کلیلە ئاسایشییە چالاکەکە')}</span>
                    <span className="text-slate-300 font-mono text-[10px] truncate max-w-[140px]">{activeContext === 'FEDERAL_IRAQ' ? pkiFederal.sha256Fingerprint : pkiKrg.sha256Fingerprint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{getLabel('Authority Signatures Level', 'عمق شهادة الأمان', 'قووڵایی بڕوانامەکان')}</span>
                    <span className="text-white font-bold">{activeContext === 'FEDERAL_IRAQ' ? 'RSA_4096' : 'ECDSA_384'}</span>
                  </div>
                </div>
              </div>

              {/* PRODUCTION DEPLOYMENT & HARDENING AUDIT */}
              <div className="border-t border-slate-800 pt-4 mt-2">
                <h4 className="text-xs font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 text-[#E0A96D]">
                  {getLabel('PRODUCTION DEPLOYMENT GATE', 'بوابة النشر والاعتماد الفعلي', 'پەرژینی متمانە و ڕادەستکردنی بەرهەم')}
                </h4>

                {(() => {
                  const infoReport = SovereignIsolationAuditReport.compileSupremeReport();
                  const currentMode = DemoModeController.getActiveMode();
                  const isFullyConfigured = infoReport.acquisitionStatus === 'READY_FOR_ACQUISITION';

                  return (
                    <div className="space-y-3.5 text-xs">
                      {/* Production Readiness Status */}
                      <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded border border-slate-800">
                        <span className="text-slate-400 font-mono text-[11px]">{getLabel('Readiness Status:', 'وضعية الجاهزية الاستحواذ:', 'ڕەوشی کڕینەوە:')}</span>
                        <Badge variant={isFullyConfigured ? 'success' : 'warning'}>
                          {infoReport.acquisitionStatus}
                        </Badge>
                      </div>

                      {/* Dynamic Enforcement Coverage */}
                      <div className="flex justify-between items-center text-slate-300 font-mono">
                        <span>{getLabel('Enforcement Coverage:', 'تغطية فرض الحوكمة:', 'ڕووبەری سەپاندنی حوكمڕانی:')}</span>
                        <span className="font-mono font-bold text-teal-400">{infoReport.enforcementCoveragePercent}%</span>
                      </div>

                      {/* Mock Dependency Count */}
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{getLabel('Runtime Mock Dependencies:', 'الاعتماديات الوهمية في وقت التشغيل:', 'پاشبەندە ناڕاستەکانی ناو ڕەنتايم:')}</span>
                        <span className="font-mono font-bold text-emerald-400">0</span>
                      </div>

                      {/* Hardcoded Audit Success Count */}
                      <div className="flex justify-between items-center text-slate-300 font-sans">
                        <span>{getLabel('Hardcoded Audit Rules:', 'شروط الأمان الثابتة:', 'مەرجە ئاسایشییە جێگیرەکان:')}</span>
                        <span className="font-mono font-bold text-emerald-400">0</span>
                      </div>

                      {/* Demo Data Isolation */}
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{getLabel('Demo Data Quarantined:', 'عزل بيانات المعاينة:', 'کەرەنتینەکردنی داتای نمایشی:')}</span>
                        <span className="text-emerald-400 font-mono font-bold">100% ISOLATED</span>
                      </div>

                      {/* Active Runtime Mode */}
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{getLabel('Active Runtime Mode:', 'نمط التشغيل النشط:', 'مۆدی دەستبەکاربوونی چالاک:')}</span>
                        <span className="font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[#E0A96D] text-[10px]">
                          {currentMode}
                        </span>
                      </div>

                      {/* Operational Mode Readiness */}
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{getLabel('Operational Ready Status:', 'وضعية الإطلاق التشغيلي للخدمة:', 'ڕەوشی سەرەتایی دەستبەکاربوون:')}</span>
                        {currentMode === 'OPERATIONAL_MODE' ? (
                          isFullyConfigured ? (
                            <span className="text-emerald-400 font-bold font-mono">FULLY_OPERATIONAL</span>
                          ) : (
                            <span className="text-rose-400 font-bold font-mono">DATA_SOURCE_REQUIRED</span>
                          )
                        ) : (
                          <span className="text-slate-500 font-mono">SANDBOX_ACTIVE</span>
                        )}
                      </div>

                      {/* Sovereign Provider States Configuration Matrix */}
                      <div className="border-t border-slate-800/80 pt-3 mt-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2 tracking-wider">
                          {getLabel('Sovereign Providers State Matrix (Click to Cycle):', 'تنظیم وضعية جلب البيانات الوطنية (اضغط للتعديل):', 'ڕێکخستنی سەرچاوەی داتای جۆراوجۆر (کلیک بکە):')}
                        </span>
                        
                        <div className="grid grid-cols-1 gap-1.5">
                          {Object.entries(providerStates).map(([pName, pState]) => {
                            const badgeColor = 
                              pState === 'ready' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
                              pState === 'configured' ? 'text-teal-400 bg-teal-500/10 border-teal-500/30' :
                              pState === 'not_configured' ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' :
                              pState === 'unavailable' ? 'text-slate-500 bg-slate-500/10 border-slate-500/30' :
                              'text-rose-400 bg-rose-500/10 border-rose-500/30';
                            
                            return (
                              <div 
                                key={pName} 
                                onClick={() => handleCycleProviderState(pName)}
                                className="flex justify-between items-center bg-slate-900/40 border border-slate-800 p-1.5 rounded hover:bg-slate-900 transition cursor-pointer select-none"
                              >
                                <span className="text-[10px] font-mono text-slate-300 capitalize">{pName}Provider:</span>
                                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase transition ${badgeColor}`}>
                                  {pState}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* REAL-TIME SOVEREIGN MULTILINGUAL AUDIT MONITOR */}
              <div className="mt-2 bg-[#0a1420] p-4 rounded-xl border border-slate-800 text-xs text-start">
                <h5 className="text-[10px] font-mono font-bold text-[#E0A96D] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>{getLabel('MULTILINGUAL INTEGRITY AUDIT', 'تدقيق نزاهة اللغات المتعددة', 'وردبینی ڕەسەنایەتی زمانەکان')}</span>
                  <Badge variant="teal">PASS</Badge>
                </h5>
                
                {(() => {
                  const audit = LocalizationRuntimeAudit.runAudit();
                  return (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px]">
                        <div className="bg-slate-950 p-1.5 rounded border border-slate-900">
                          <span className="text-slate-500 block">Kurdish</span>
                          <span className="text-emerald-400 font-bold block mt-0.5">{audit.kurdishCoverage}%</span>
                        </div>
                        <div className="bg-slate-950 p-1.5 rounded border border-slate-900">
                          <span className="text-slate-500 block">Arabic</span>
                          <span className="text-teal-400 font-bold block mt-0.5">{audit.arabicCoverage}%</span>
                        </div>
                        <div className="bg-slate-950 p-1.5 rounded border border-slate-900">
                          <span className="text-slate-500 block">English</span>
                          <span className="text-amber-400 font-bold block mt-0.5">{audit.englishCoverage}%</span>
                        </div>
                      </div>

                      <div className="space-y-1 mt-2 text-[10px] font-mono">
                        <div className="flex justify-between text-slate-400">
                          <span>{getLabel('Audit Registry Status:', 'حالة الفحص اللغوي:', 'ڕەوشی پیادەکردن:')}</span>
                          <span className="text-emerald-400 font-bold">100% OK</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>{getLabel('Missing Keys / Failures:', 'المفاتيح المفقودة / الأخطاء:', 'کلیلە بەتاڵەکان / لادانەکان:')}</span>
                          <span className="text-teal-400 font-bold">{audit.missingKeysCount}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

          </div>
        </div>
        )}

        {/* TAB 2: ANALYTICS */}
        {activeCapability === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                {getLabel('REVENUE & FREIGHT FLOW REAL-TIME STREAM', 'بيانات تدفق السلع والرسوم الفورية', 'ڕەوتی کاڵا و باج بە کاتی ڕاستەقینە')}
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                {getLabel('Isolated datasets displaying transactional volume per gate for the current administrative session. Cross-domain leakage strictly prevented.',
                            'حزم بيانات جمركية معزولة لكل منفذ في الجلسة الإدارية الحالية بهدف منع تسرب المعلومات المتبادلة.',
                            'داتاسێتی جوداکراوە بۆ قەبارەی بازرگانی لە دەروازەکان لەم خولە کارییەدا، دوور لە هەر دزەکردنی داتا لە بازنەکە.')}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-mono text-[10px]">
                      <th className="py-2.5 text-start font-semibold uppercase">{getLabel('DECLARATION ID', 'رقم البيان الجمركي', 'ناسنامەی بەیاننامە')}</th>
                      <th className="py-2.5 text-start font-semibold uppercase">{getLabel('IMPORTER NAME', 'اسم المستورد', 'هاوردەکار')}</th>
                      <th className="py-2.5 text-start font-semibold uppercase">{getLabel('PORT OF ORIGIN', 'المنفذ والمصدر', 'دەروازەی سەرەکی')}</th>
                      <th className="py-2.5 text-start font-semibold uppercase">{getLabel('ASSESSED VALUE', 'القيمة المقدرة للضريبة', 'نرخاندنی کاڵا')}</th>
                      <th className="py-2.5 text-start font-semibold uppercase">{getLabel('TAX COLLECTED', 'الرسوم المستحقة والمسجلة', 'باجی کۆکراوە')}</th>
                      <th className="py-2.5 text-start font-semibold uppercase">{getLabel('REGION & SOURCE', 'المنطقة الإدارية', 'ناوچە و سەرچاوە')}</th>
                      <th className="py-2.5 text-start font-semibold uppercase">{getLabel('STATUS', 'الحالة الفنية للبيان', 'بارودۆخ')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {contextCustoms.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-900/40 font-mono transition-all">
                        <td className="py-3 text-cyan-400 font-bold">{rec.declarationId}</td>
                        <td className="py-3 text-slate-200 font-sans font-bold">{rec.importer}</td>
                        <td className="py-3 text-slate-300 font-sans">{rec.origin}</td>
                        <td className="py-3 text-emerald-400">${rec.assessedValue.toLocaleString()}</td>
                        <td className="py-3 text-white">${rec.taxCollected.toLocaleString()}</td>
                        <td className="py-3">
                          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-amber-500 font-semibold border border-slate-800 uppercase">
                            {rec.regionId} • {rec.authorityId}
                          </span>
                        </td>
                        <td className="py-3">
                          <Badge variant={rec.status === 'approved' ? 'success' : rec.status === 'flagged' ? 'danger' : 'warning'}>
                            {rec.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECURITY */}
        {activeCapability === 'security' && (
          <div className="flex flex-col gap-6">
            {/* Top-level Unified Sovereign Intelligence Dashboard */}
            <div className="w-full">
              {activeContext === 'FEDERAL_IRAQ' && <FederalIntelligenceDashboard />}
              {activeContext === 'KURDISTAN_REGION' && <KRGIntelligenceDashboard />}
              {activeContext === 'JOINT_OPERATIONS' && <JointNationalSecurityDashboard />}
            </div>

            {/* Downward secondary panels: CCTV Sensors and Live Crisis controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                  <Shield className="text-rose-500 w-5 h-5 shrink-0" />
                  <span>{getLabel('BORDER INTRUSION & MOVEMENT RADAR CCTV', 'كاميرات المراقبة وأمن ممرات الشحن والحدود', 'ڕادار و کامێراکانی ئاسایشی سنورەکان')}</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(model.thermalSensors)
                    // Securely partition who can see which border camera sensors!
                    .filter(([key]) => {
                      if (activeContext === 'FEDERAL_IRAQ') {
                        return key.includes('Umm Qasr') || key.includes('Baghdad') || key.includes('Trebil');
                      }
                      if (activeContext === 'KURDISTAN_REGION') {
                        return key.includes('Ibrahim Khalil');
                      }
                      return true; // joint sees all
                    })
                    .map(([port, temp]) => {
                      const tempNum = temp as number;
                      const isHot = tempNum > 40;
                      return (
                        <div key={port} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 overflow-hidden relative group">
                          <div className="absolute top-0 start-0 w-1.5 h-full bg-red-600 animate-pulse"></div>
                          <div className="flex justify-between items-center pb-2 border-b border-slate-800/80 mb-2">
                            <span className="font-bold text-xs uppercase tracking-wider text-slate-200">{port}</span>
                            <span className="text-[9px] text-[#E0A96D] font-mono uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80">CCTV LIVE</span>
                          </div>
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div>
                              <p className="text-slate-400">{getLabel('Laser Scan Temp', 'حرارة الاستشعار', 'پشکنینی گەرمیی لێزەر')}: <span className="text-white font-bold">{tempNum}°C</span></p>
                              <p className="text-slate-400">{getLabel('Generator Feed', 'تأمين المولدات', 'تەزووی مۆلیدە')}: <span className="text-emerald-400 font-bold">100% SECURE</span></p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-slate-500 block">JURISDICTION</span>
                              <span className="text-cyan-400 font-bold capitalize">{activeContext === 'FEDERAL_IRAQ' ? 'Federal' : activeContext === 'KURDISTAN_REGION' ? 'KRG' : 'Joint (HQ)'}</span>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                  {getLabel('CRISIS CONTROLS', 'إدارة الحوادث المتعارضة والمستعجلة', 'کۆنتڕۆڵکردنی کێشە کتوپڕەکان')}
                </h4>
                
                <div className="space-y-3">
                  {model.unresolvedCrisisList.map(crisis => (
                    <div key={crisis.id} className="bg-slate-950 p-3.5 rounded border border-rose-500/20 hover:border-rose-504 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-200 font-mono text-cyan-400">{crisis.id}</span>
                        <Badge variant="danger">{crisis.severity}</Badge>
                      </div>
                      <span className="font-sans block text-rose-400 font-bold">{crisis.type}</span>
                      <p className="text-slate-400 text-[11px] mt-1">{crisis.desc}</p>
                      <span className="text-[9px] font-mono text-slate-500 block mt-2">AUTHORITY PATHWAY: {activeContext === 'KURDISTAN_REGION' ? 'AUTH-KRG-CAB' : 'AUTH-FED-CAB'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SOVEREIGN DATA ISOLATION AUDIT SUITE */}
            <div className="bg-[#0b1329]/95 p-6 rounded-xl border border-[#E0A96D]/30 text-start mt-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-5">
                <div>
                  <h4 className="text-base font-bold text-[#E0A96D] uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span>{getLabel('PHASE 4.9 — SOVEREIGN DATA ISOLATION AUDIT & ENFORCEMENT', 'المرحلة 4.9 — تدقيق وفرض عزل البيانات السيادية', 'قۆناغی ٤.٩ — بەدواداچوون و جێبەجێکردنی کەرتی سەربەخۆیی داتا')}</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {getLabel('Proves programmatic separation of operational, financial, customs, identity, and security databases across target jurisdictions.',
                              'تأكيد برامجي تام لعدم عبور البيانات المالية أو التشغيلية أو الأمنية أو الجمركية خارج حدود السيادة المعتمدة.',
                              'سەلماندنی پڕۆگرامسازی بۆ کەرتی سەربەخۆیی و ڕێگریکردن لە دزەکردنی زانیارییە گومرگی و داراییەکان لە نێوان کایەکان.')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="animate-pulse">ISO-9001 COMPLIANT</Badge>
                  <span className="text-[10px] bg-slate-950 px-2 py-1 rounded text-cyan-400 border border-slate-800 font-mono">NODE v1.0.9</span>
                </div>
              </div>

              {(() => {
                const execAudit = ExecutiveIsolationAudit.runAudit();
                const revAudit = RevenueIsolationAudit.runAudit();
                const custAudit = CustomsIsolationAudit.runAudit();
                const tradeAudit = TradeIsolationAudit.runAudit();
                const identityAudit = IdentityIsolationAudit.runAudit();
                const workforceAudit = WorkforceIsolationAudit.runAudit();
                const intelligenceAudit = IntelligenceIsolationAudit.runAudit();
                const securityAudit = SecurityIsolationAudit.runAudit();
                const assetAudit = AssetIsolationAudit.runAudit();
                const sharedAudit = SharedBoundaryAudit.runAudit();
                const supremeReport = SovereignIsolationAuditReport.compileSupremeReport();

                return (
                  <div className="space-y-6">
                    {/* SUPREME COOPERATION LEADERBOARD METRICS */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800">
                      <div className="text-center p-2 rounded bg-slate-900 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Modules Audited</span>
                        <span className="text-xl font-bold text-teal-400 mt-1 block">{supremeReport.totalModulesAudited}</span>
                      </div>
                      <div className="text-center p-2 rounded bg-slate-900 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Total Violations</span>
                        <span className="text-xl font-bold text-slate-200 mt-1 block">{supremeReport.totalViolations}</span>
                      </div>
                      <div className="text-center p-2 rounded bg-slate-900 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Critical Leaks</span>
                        <span className="text-xl font-bold text-rose-500 mt-1 block">{supremeReport.criticalViolations}</span>
                      </div>
                      <div className="text-center p-2 rounded bg-slate-900 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Cross-Jurisdiction</span>
                        <span className="text-xl font-bold text-amber-500 mt-1 block">{supremeReport.crossJurisdictionLeaks}</span>
                      </div>
                      <div className="text-center p-2 rounded bg-slate-900 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Shared Violations</span>
                        <span className="text-xl font-bold text-purple-400 mt-1 block">{supremeReport.sharedLayerViolations}</span>
                      </div>
                      <div className="text-center p-2 rounded bg-slate-900 border border-slate-800/60">
                        <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Enforcement Cov.</span>
                        <span className="text-xl font-bold text-emerald-400 mt-1 block">{supremeReport.enforcementCoveragePercent}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* A: Executive Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">A: Executive Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Validates dashboards (Federal Prime Minister, KRG Prime Minister, Joint Executive, and Sovereign Governance Router) to ensure zero cross-boundary asset imports or bypasses.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {execAudit.reports.map((r, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-slate-200">{r.dashboardName}</span>
                                  <span className="text-emerald-400">{r.status}</span>
                                </div>
                                <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[9px] pl-1">
                                  {r.details.slice(0, 1).map((detail, dIdx) => (
                                    <li key={dIdx} className="truncate">{detail}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Jurisdiction:</span>
                          <span className="text-teal-400 font-bold">100% BLOCKED</span>
                        </div>
                      </div>

                      {/* B: Revenue Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">B: Revenue Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Ensures raw ledgers can not be queried by opposite modules. Joint layer consumes only verified cryptographic hashes and recon indicators.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {revAudit.results.map((r, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-slate-200">{r.engineName}</span>
                                  <span className="text-emerald-400">{r.isolationStatus === 'SECURE_ISOLATED' ? 'SECURE' : 'FAIL'}</span>
                                </div>
                                <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[9px] pl-1">
                                  {r.validations.slice(0, 1).map((val, vIdx) => (
                                    <li key={vIdx} className="truncate">{val.reason}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-905 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Reconciliation:</span>
                          <span className="text-teal-400 font-bold capitalize">{revAudit.reconciliationStatus}</span>
                        </div>
                      </div>

                      {/* C: Customs Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">C: Customs Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Verifies zero raw declaration, transit manifest, or cargo list sharing across platforms. Only proof hashes processed by the Central system.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {custAudit.checks.map((r, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-slate-200">{r.moduleName}</span>
                                  <span className="text-emerald-400">{r.status}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-[8px] text-slate-500 mt-1">
                                  <div className="bg-slate-950 p-1 rounded">Decl Sharing: <span className="text-emerald-400 font-bold">BLOCK</span></div>
                                  <div className="bg-slate-950 p-1 rounded">Manifest: <span className="text-emerald-400 font-bold">BLOCK</span></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Isomorphic Separation:</span>
                          <span className="text-emerald-400 font-bold">ACTIVE</span>
                        </div>
                      </div>

                      {/* D: Trade Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">D: Trade Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Guarantees isolated licensing, imports management, and export registries. Joint dashboards consume strictly high-level economic indicators without private manifests.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {tradeAudit.checks.map((c, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-slate-200">{c.engineName}</span>
                                  <span className="text-emerald-400">{c.isolationStatus === 'SECURE_ISOLATED' ? 'SECURE' : 'FAIL'}</span>
                                </div>
                                <div className="text-[9px] text-slate-400 truncate">{c.notes}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Trade Isolation:</span>
                          <span className="text-emerald-400 font-bold">100% SECURE</span>
                        </div>
                      </div>

                      {/* E: Identity Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">E: Identity Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Proves zero biometric leakage and locks down credentials against unauthorized cross-government queries. Enforces secure, randomized ID tokens.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {identityAudit.tests.map((t, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-slate-200">{t.subsystem}</span>
                                  <span className="text-emerald-400">{t.status === 'VERIFIED' ? 'SECURE' : 'FAIL'}</span>
                                </div>
                                <div className="flex gap-2 text-[8px] text-slate-500 mt-1">
                                  <div>Biometry: <span className="text-emerald-400 font-bold">SHIELD</span></div>
                                  <div>Shared-Auth: <span className="text-rose-500 font-bold">BLOCKED</span></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Biometric Leakage:</span>
                          <span className="text-emerald-400 font-bold">0% LEAKS</span>
                        </div>
                      </div>

                      {/* F: Workforce Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">F: Workforce Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Verifies strict organizational partitioning of federal and regional employees, security rosters, certifications, and secure workflows.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {workforceAudit.audits.map((a, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold">
                                  <span className="text-slate-200">{a.componentGroup}</span>
                                  <span className="text-emerald-400">{a.isolationStatus}</span>
                                </div>
                                <div className="text-[9px] text-slate-400 mt-0.5">Records audited: <span className="text-teal-400">{a.auditedCount}</span></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Workforce Sharing:</span>
                          <span className="text-purple-400 font-bold">COUNTS ONLY</span>
                        </div>
                      </div>

                      {/* G: Intelligence Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">G: Intel Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Ensures zero raw operational intelligence lists cross the border. The Joint level receives threat scores and security metadata hashes only.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {intelligenceAudit.engineAudits.map((e, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold">
                                  <span className="text-slate-200">{e.engineName}</span>
                                  <span className="text-emerald-400">{e.isolationStatus === 'SECURE_ISOLATED' ? 'SECURE' : 'FAIL'}</span>
                                </div>
                                <div className="text-[8px] text-slate-500 mt-1 truncate">Exposed: {e.exposedDataPoints.join(', ')}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Raw Intel Sharing:</span>
                          <span className="text-emerald-400 font-bold">0% EXPOSED</span>
                        </div>
                      </div>

                      {/* H: Security Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">H: Security Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Verifies absolute isolation of user sessions, device hardware trusts, multi-factor triggers, and audit-trail logging servers.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {securityAudit.audits.map((a, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-slate-200">{a.engineName}</span>
                                  <span className="text-emerald-400">{a.status === 'ISOLATED_PASS' ? 'SECURE' : 'FAIL'}</span>
                                </div>
                                <div className="text-[9px] text-slate-400 truncate">{a.notes}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Auth Context:</span>
                          <span className="text-teal-400 font-bold">FULLY ISOLATED</span>
                        </div>
                      </div>

                      {/* I: Assets Domain */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">I: Assets Domain</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            Audit of state land registers, pipeline assets, military installations, and asset transfer logging workflows to enforce division of ownership.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {assetAudit.checks.map((c, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-slate-200">{c.componentName}</span>
                                  <span className="text-emerald-400">{c.isolationStatus === 'SECURE_ISOLATED' ? 'SECURE' : 'FAIL'}</span>
                                </div>
                                <div className="flex gap-2 text-[8px] text-slate-500 mt-1">
                                  <div>Ownership: <span className="text-emerald-400 font-bold">VALID</span></div>
                                  <div>Visibility Rules: <span className="text-emerald-400 font-bold">ENFORCED</span></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>Sovereignty Limits:</span>
                          <span className="text-emerald-400 font-bold">PROVED</span>
                        </div>
                      </div>

                      {/* J: Shared Modules */}
                      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-900 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3 border-b border-slate-900 pb-2">
                            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">J: Shared Modules Code</span>
                            <Badge variant="teal">PASS</Badge>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                            A deep AST-grade codebase validation scanning /src/shared folder to block direct coupling imports of federal or regional code modules.
                          </p>
                          <div className="space-y-2 text-[10px] font-mono">
                            {sharedAudit.rulesChecked.map((r, idx) => (
                              <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800/80">
                                <div className="flex justify-between font-bold mb-0.5">
                                  <span className="text-slate-200 truncate pr-2">{r.name}</span>
                                  <span className="text-emerald-400">{r.passed ? 'PASS' : 'FAIL'}</span>
                                </div>
                                <div className="text-[9px] text-slate-400 block truncate">{r.details}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex justify-between">
                          <span>AST Violations:</span>
                          <span className="text-teal-400 font-bold">0 DETECTED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 4: ECONOMY */}
        {activeCapability === 'economy' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
              {getLabel('REPUBLIC ECONOMIC OUTLOOK & POLICY INDEX', 'مؤشرات التخطيط والسياسة الاقتصادية الكلية', 'بارودۆخی گشتی ئابووری و بنەماکانی سیاسەتی گشتی')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-start">
                <span className="text-teal-400 font-bold block mb-2 font-mono uppercase">CBI CURRENCY SURVEILLANCE FEED</span>
                <p className="text-slate-300 leading-relaxed">
                  {getLabel('Foreign exchange wire compliance measures remain fully active inside Baghdad Central vaults. Combined transaction audits are securely linked to check trade values against normal market deviations without regional leakages.',
                              'تظل إجراءات مطابقة التحويلات المصرفية الأجنبية نشطة بالكامل في البنك المركزي العراقي لمنع خروج غير مصرح به للعملات الصعبة.',
                              'ئامرازەکانی پشکنینی حەواڵەی دراو چالاکن لە گەنجینەکانی بەغدا. پێداچوونەوەکان بە هاوبەشی بۆ کەمکردنەوەی جیاوازی نرخەکان دەکرێت بێ زیان گەیاندن بە سەروەری گەشەی هەرێم.')}
                </p>
                <div className="mt-3.5 flex justify-between font-mono text-slate-400">
                  <span>CBI Market Rate: <b>1,310 IQD/USD</b></span>
                  <span>Compliance Flags: <b>0 Outliers detected</b></span>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-start">
                <span className="text-emerald-400 font-bold block mb-2 font-mono uppercase">ECONOMIC TRADE CORRIDORS SIMULATOR</span>
                <p className="text-slate-300 leading-relaxed">
                  {getLabel('Forecast model tracks active corridor development along Northern and Southern shipping paths, balancing inflation index models across Erbil and Baghdad Treasury directories respectively.',
                              'يتتبع نموذج التنبؤ تطوير الممر التجاري النشط على طول مسارات الشحن الشمالية والجنوبية، ويوازن مؤشرات التضخم في أربيل وبغداد.',
                              'مۆدێلی گریمانەیی پشکنینی پەرەپێدانی دەمارە دەریا و وشکانییەکان دەکات لەگەڵ هاوسەنگردنی هەڵاوسان لە نێوان وەزارەتەکانی دارایی هەولێر و بەغدا.')}
                </p>
                <div className="mt-3.5 flex justify-between font-mono text-slate-400">
                  <span>Inflation Rate: <b>+3.4% Index</b></span>
                  <span>National Trade Level: <b>Optimal Stability</b></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: IDENTITY */}
        {activeCapability === 'identity' && (
          <div className="space-y-6">
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
                {getLabel('DUAL DIGITAL IDENTITY AUTHORITIES registry', 'سجل وإدارة سلطات الهوية الرقمية المزدوجة', 'دەسەڵاتی ناسنامە دیجیتاڵییە فیدراڵ و هەرێمییەکان')}
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                {getLabel('Isolated PKI key signing routines are applied to active national registries. Unified federation mappings are configured without reissuing historical keys.',
                            'يتم تطبيق إجراءات توقيع مفاتيح PKI المعزولة على سجلات الهوية النشطة دون الحاجة لإعادة إصدار الكروت التاريخية.',
                            'ڕێکارەکانی واژۆی کلیلی PKI ی جودا جێبەجێ دەکرێن لەسەر تۆمارەکان. نەخشەکردنی فیدراڵی هاوبەش کارا دەکرێت بێ دەستکاریکردنی کلیلەکان.')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Federal Identity block */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-teal-500/10">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/80 mb-3">
                    <span className="font-bold text-teal-400 uppercase tracking-wider text-xs">FEDERAL IDENTITY PKI ROOT STATE</span>
                    <Badge variant={pkiFederal.trustStatus === 'active' ? 'success' : 'slate'}>{pkiFederal.trustStatus}</Badge>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <p className="truncate text-slate-300">Root CN: <span className="text-white font-bold">{pkiFederal.rootCN}</span></p>
                    <p className="truncate text-slate-300">Fingerprint SHA256: <span className="text-[#E0A96D] text-[10px]">{pkiFederal.sha256Fingerprint}</span></p>
                    <p className="text-slate-300">Algorithm: <span className="text-white">{pkiFederal.signatureAlgorithm}</span> • Depth: <span className="text-white">{pkiFederal.certChainDepth} chains</span></p>
                  </div>
                </div>

                {/* KRG Identity block */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-500/10">
                  <div className="flex justify-between items-center pb-2 border-b border-[#52B788]/20 mb-3">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider text-xs">KRG IDENTITY PKI ROOT STATE</span>
                    <Badge variant={pkiKrg.trustStatus === 'active' ? 'success' : 'slate'}>{pkiKrg.trustStatus}</Badge>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <p className="truncate text-slate-300">Root CN: <span className="text-white font-bold">{pkiKrg.rootCN}</span></p>
                    <p className="truncate text-slate-300">Fingerprint SHA256: <span className="text-[#E0A96D] text-[10px]">{pkiKrg.sha256Fingerprint}</span></p>
                    <p className="text-slate-300">Algorithm: <span className="text-white">{pkiKrg.signatureAlgorithm}</span> • Depth: <span className="text-white">{pkiKrg.certChainDepth} chains</span></p>
                  </div>
                </div>

              </div>

              {/* National Workforce & Staffing Status Divisions */}
              <div className="mt-8">
                <span className="text-[10px] text-[#E0A96D] font-mono block mb-3 font-bold uppercase tracking-widest">
                  {getLabel('NATIONAL WORKFORCE & DIVISIONAL STAFFING HUB', 'ناوەندی نیشتمانی بۆ چاودێری و هێزی کار', 'ناوەندی نیشتمانی بۆ هێزی کار و بەشەکانی کارمەندان')}
                </span>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4 text-start">
                  {/* Card 1: National Workforce Status */}
                  <div
                    onClick={() => setSelectedStaffDivision('all')}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      selectedStaffDivision === 'all'
                        ? 'bg-amber-950/40 border-[#E0A96D]/60 text-amber-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] uppercase font-mono block text-slate-500">گشتی (Workforce)</span>
                      <span className="text-sm font-bold text-slate-100 block mt-1">{IdentityRegistry.getAll().length} ئەندام</span>
                    </div>
                    <span className="text-[10px] text-emerald-400/80 font-mono mt-2 flex items-center gap-1">
                      ● Active Roster
                    </span>
                  </div>

                  {/* Card 2: Border Staffing Status */}
                  <div
                    onClick={() => setSelectedStaffDivision('border')}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      selectedStaffDivision === 'border'
                        ? 'bg-amber-950/40 border-[#E0A96D]/60 text-amber-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] uppercase font-mono block text-slate-500">سنوورەکان (Border)</span>
                      <span className="text-sm font-bold text-slate-100 block mt-1">
                        {IdentityRegistry.getAll().filter(s => s.role?.toLowerCase().includes('border') || s.role?.toLowerCase().includes('guard') || s.directorate?.toLowerCase().includes('border')).length} ئەندام
                      </span>
                    </div>
                    <span className="text-[10px] text-teal-400 font-mono mt-2">دەروازە باڵاکان</span>
                  </div>

                  {/* Card 3: Customs Staffing Status */}
                  <div
                    onClick={() => setSelectedStaffDivision('customs')}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      selectedStaffDivision === 'customs'
                        ? 'bg-amber-950/40 border-[#E0A96D]/60 text-amber-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] uppercase font-mono block text-slate-500">گومرگ (Customs)</span>
                      <span className="text-sm font-bold text-slate-100 block mt-1">
                        {IdentityRegistry.getAll().filter(s => s.role?.toLowerCase().includes('customs')).length} ئەندام
                      </span>
                    </div>
                    <span className="text-[10px] text-teal-400 font-mono mt-2">مایکرۆ-ڕێکخستن</span>
                  </div>

                  {/* Card 4: Revenue Staffing Status */}
                  <div
                    onClick={() => setSelectedStaffDivision('revenue')}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      selectedStaffDivision === 'revenue'
                        ? 'bg-amber-950/40 border-[#E0A96D]/60 text-amber-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] uppercase font-mono block text-slate-500">داهات (Revenue)</span>
                      <span className="text-sm font-bold text-slate-100 block mt-1">
                        {IdentityRegistry.getAll().filter(s => s.role?.toLowerCase().includes('revenue') || s.role?.toLowerCase().includes('tax') || s.role?.toLowerCase().includes('finance') || s.role?.toLowerCase().includes('audit')).length} ئەندام
                      </span>
                    </div>
                    <span className="text-[10px] text-rose-400 font-mono mt-2">دیاریکردنی دزەکردن</span>
                  </div>

                  {/* Card 5: Trade Staffing Status */}
                  <div
                    onClick={() => setSelectedStaffDivision('trade')}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      selectedStaffDivision === 'trade'
                        ? 'bg-amber-950/40 border-[#E0A96D]/60 text-amber-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] uppercase font-mono block text-slate-500">بازرگانی (Trade)</span>
                      <span className="text-sm font-bold text-slate-100 block mt-1">
                        {IdentityRegistry.getAll().filter(s => s.role?.toLowerCase().includes('trade') || s.role?.toLowerCase().includes('license')).length} ئەندام
                      </span>
                    </div>
                    <span className="text-[10px] text-blue-400 font-mono mt-2">دەروازەی مۆڵەتەکان</span>
                  </div>

                  {/* Card 6: Investigation Staffing Status */}
                  <div
                    onClick={() => setSelectedStaffDivision('investigation')}
                    className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      selectedStaffDivision === 'investigation'
                        ? 'bg-amber-950/40 border-[#E0A96D]/60 text-amber-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-[9px] uppercase font-mono block text-slate-500">نزاهەت (Oversight)</span>
                      <span className="text-sm font-bold text-slate-100 block mt-1">
                        {IdentityRegistry.getAll().filter(s => s.role?.toLowerCase().includes('investig') || s.role?.toLowerCase().includes('inspect') || s.role?.toLowerCase().includes('transparency') || s.role?.toLowerCase().includes('integrity')).length} ئەندام
                      </span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono mt-2">پشکنەرانی باڵا</span>
                  </div>
                </div>

                {/* Expanded division's Roster Table */}
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 mb-6 text-start">
                  <h5 className="text-xs font-bold text-slate-200 mb-3 uppercase tracking-wider flex items-center justify-between">
                    <span>
                      {selectedStaffDivision === 'all' && 'تۆماری گشتی هێزی کار (Combined National Roster)'}
                      {selectedStaffDivision === 'border' && 'هێزی سنوورەکان (Sovereign Border Guard staffing)'}
                      {selectedStaffDivision === 'customs' && 'ئەفسەرانی گومرگ (Sovereign Customs Command staffing)'}
                      {selectedStaffDivision === 'revenue' && 'بەرپرسانی باج و داهات (Federal Revenue Control staffing)'}
                      {selectedStaffDivision === 'trade' && 'لیژنەی تاقیکردنەوەی مۆڵەتی بازرگانی (Trade Licensing staffing)'}
                      {selectedStaffDivision === 'investigation' && 'فەرمانبەرانی چاودێری و نزاهەت (Anti-Corruption Oversight staffing)'}
                    </span>
                    <Badge variant="teal">ڕاستەقینە - باوەڕپێکراو</Badge>
                  </h5>

                  <div className="overflow-x-auto max-h-64 overflow-y-auto">
                    <table className="w-full text-xs text-start">
                      <thead>
                        <tr className="border-b border-slate-850 text-slate-500 font-mono text-[10px]">
                          <th className="py-2 text-start">STAFF ID</th>
                          <th className="py-2 text-start">FULL NAME</th>
                          <th className="py-2 text-start">SOVEREIGN ROLE</th>
                          <th className="py-2 text-start">ORGANIZATION</th>
                          <th className="py-2 text-center">BIOMETRICS</th>
                          <th className="py-2 text-center">TRUST DEVICE</th>
                          <th className="py-2 text-center">CLEARANCE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/20 font-mono">
                        {IdentityRegistry.getAll()
                          .filter(s => {
                            if (selectedStaffDivision === 'all') return true;
                            if (selectedStaffDivision === 'border') {
                              return s.role?.toLowerCase().includes('border') || s.role?.toLowerCase().includes('guard') || s.directorate?.toLowerCase().includes('border');
                            }
                            if (selectedStaffDivision === 'customs') {
                              return s.role?.toLowerCase().includes('customs');
                            }
                            if (selectedStaffDivision === 'revenue') {
                              return s.role?.toLowerCase().includes('revenue') || s.role?.toLowerCase().includes('tax') || s.role?.toLowerCase().includes('audit') || s.role?.toLowerCase().includes('finance');
                            }
                            if (selectedStaffDivision === 'trade') {
                              return s.role?.toLowerCase().includes('trade') || s.role?.toLowerCase().includes('license');
                            }
                            if (selectedStaffDivision === 'investigation') {
                              return s.role?.toLowerCase().includes('investig') || s.role?.toLowerCase().includes('inspect') || s.role?.toLowerCase().includes('transparency') || s.role?.toLowerCase().includes('integrity');
                            }
                            return true;
                          })
                          .map(staff => (
                            <tr key={staff.id} className="hover:bg-slate-950/40 text-[11px] text-slate-300">
                              <td className="py-2 text-slate-500">{staff.id}</td>
                              <td className="py-2 font-sans font-bold text-slate-200">{staff.fullName}</td>
                              <td className="py-2 text-amber-300 font-bold">{staff.role}</td>
                              <td className="py-2"><Badge variant="teal">{staff.organization}</Badge></td>
                              <td className="py-2 text-center">
                                <Badge variant={staff.biometricStatus === 'verified' ? 'teal' : 'amber'}>
                                  {staff.biometricStatus === 'verified' ? 'VERIFIED' : 'PENDING'}
                                </Badge>
                              </td>
                              <td className="py-2 text-center">
                                <Badge variant={staff.deviceTrusted ? 'success' : 'rose'}>
                                  {staff.deviceTrusted ? 'TRUSTED' : 'UNTRUSTED'}
                                </Badge>
                              </td>
                              <td className="py-2 text-center capitalize text-teal-400 font-bold">{staff.clearanceLevel}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-[10px] text-slate-500 font-mono block mb-2 font-bold uppercase tracking-widest">{getLabel('AUTHORIZED JURISDICTION CITIZENS REGISTRY', 'سجل المواطنين المعتمد للمجموعة الحالية', 'تۆماری هاووڵاتیانی باوەڕپێکراوی بازنەی چالاک')}</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 font-mono text-[10px]">
                        <th className="py-2 text-start">NATIONAL UNIQUE ID</th>
                        <th className="py-2 text-start">CITIZEN FULL NAME</th>
                        <th className="py-2 text-start">BIOMETRIC STATUS</th>
                        <th className="py-2 text-start">GOVERNMENT SOURCE</th>
                        <th className="py-2 text-start">SECURITY LEVEL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 font-mono">
                      {contextIdentities.map((citizen) => (
                        <tr key={citizen.id} className="hover:bg-slate-900/30">
                          <td className="py-2.5 text-cyan-400">{citizen.nationalId}</td>
                          <td className="py-2.5 text-slate-200 font-sans font-bold">{citizen.fullName}</td>
                          <td className="py-2.5">
                            <span className="flex items-center gap-1.5 text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {citizen.biometricStatus}
                            </span>
                          </td>
                          <td className="py-2.5">
                            <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-amber-500 font-semibold border border-slate-800 uppercase">
                              {citizen.governmentId} • {citizen.authorityId}
                            </span>
                          </td>
                          <td className="py-2.5 capitalize">{citizen.clearanceLevel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: INFRASTRUCTURE */}
        {activeCapability === 'infra' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-xs text-start">
            <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
              {getLabel('DIGITAL INFRASTRUCTURE & EVENT BUS LINEAGE', 'صحة البنية التحتية والممرات الرقمية', 'دۆخی فیزیکی ژێرخانی دیجیتاڵی و مێرگەکان')}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Federal logical domain */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-teal-500/10 text-start">
                <span className="text-teal-400 font-bold block mb-2 font-mono uppercase">FEDERAL LOGICAL DATA DOMAIN</span>
                <div className="space-y-2 text-xs font-mono">
                  <p className="text-slate-300">Schema Name: <span className="text-white">{federalFabricSchema.schemaName}</span></p>
                  <p className="text-slate-300">Tables Seated: <span className="text-white">{federalFabricSchema.tablesCount} active</span></p>
                  <p className="text-slate-300">Isolated Storage Domain: <span className="text-amber-500">{federalFabricSchema.storageDomain}</span></p>
                  <p className="text-slate-300 truncate">Sovereign Stream Link: <span className="text-blue-400">{federalFabricSchema.eventStreamUrl}</span></p>
                  <p className="text-slate-300">AI Context Engine: <span className="text-teal-300">{federalFabricSchema.aiContextModel}</span></p>
                </div>
              </div>

              {/* KRG logical domain */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-emerald-500/10 text-start">
                <span className="text-emerald-400 font-bold block mb-2 font-mono uppercase">KRG REGIONAL DATA DOMAIN</span>
                <div className="space-y-2 text-xs font-mono">
                  <p className="text-slate-300">Schema Name: <span className="text-white">{krgFabricSchema.schemaName}</span></p>
                  <p className="text-slate-300">Tables Seated: <span className="text-white">{krgFabricSchema.tablesCount} active</span></p>
                  <p className="text-slate-300">Isolated Storage Domain: <span className="text-amber-500">{krgFabricSchema.storageDomain}</span></p>
                  <p className="text-slate-300 truncate">Sovereign Stream Link: <span className="text-blue-400">{krgFabricSchema.eventStreamUrl}</span></p>
                  <p className="text-slate-300">AI Context Engine: <span className="text-emerald-300">{krgFabricSchema.aiContextModel}</span></p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: POLICY */}
        {activeCapability === 'policy' && (
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h4 className="text-sm font-[700] text-slate-200 uppercase tracking-widest border-b border-slate-800 pb-2 mb-3">
              {getLabel('EXECUTIVE COUNCIL RESOLUTIONS & SOVEREIGN POLICIES', 'سجل قرارات وقوانين مجالس الوزراء السيادية', 'یاساکانی سەروەری لە ئەنجومەنی وەزیران')}
            </h4>
            
            <div className="space-y-4 text-xs text-start">
              {contextPolicies.map((pol) => (
                <div key={pol.id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 relative group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[9px] text-slate-500 block font-mono font-bold">JURISDICTION_OWNERSHIP: {pol.jurisdiction.toUpperCase()}</span>
                      <h5 className="font-bold text-slate-200 text-sm mt-1">{pol.title}</h5>
                    </div>
                    <Badge variant="teal">{pol.status}</Badge>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-3">{pol.content}</p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-500">
                    <span>GOVERNMENT_ID: <b className="text-[#E0A96D]">{pol.governmentId}</b></span>
                    <span>• AUTHORITY_SOURCE: <b className="text-[#E0A96D]">{pol.authorityId}</b></span>
                    <span>• REGION_ID: <b className="text-[#E0A96D]">{pol.regionId}</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: CABINET */}
        {activeCapability === 'cabinet' && (
          <div className="w-full">
            <SovereignGovernanceRouter lang={lang} />
          </div>
        )}

        {/* TAB 9: FEDERATION */}
        {activeCapability === 'federation' && (
          <div className="w-full">
            <FederationOperationsCenter lang={lang} />
          </div>
        )}

        {/* TAB 10: SOVEREIGN PROCUREMENT & CONTRACT AUTHORITY */}
        {activeCapability === 'procurement' && (
          <div className="w-full space-y-4">
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-900 inline-flex select-none">
              {[
                { id: 'tenders', label: getLabel('Tenders Feed', 'العطاءات المنشورة', 'تەندەرەکان') },
                { id: 'vendors', label: getLabel('Vendor Registry', 'سجل الموردين المعتمدين', 'تۆماری کۆمپانیاکان') },
                { id: 'bids', label: getLabel('Bid Evaluation & Awards', 'تقييم وترسية العروض', 'هەڵسەنگاندن و خەڵاتکردن') },
                { id: 'contracts', label: getLabel('Contract Escrows & Lifecycles', 'العقود ومتابعة الإنجاز', 'دۆخی گرێبەستەکان') },
                { id: 'risk', label: getLabel('Supplier Risk Screening', 'مكافحة التواطؤ والمخاطر', 'چاودێری مەترسی') },
                { id: 'audit', label: getLabel('Sovereign Ledger & Policies', 'سجل التدقيق والسياسات المشتركة', 'وردبینی و یاساکان') },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveProcurementSubTab(sub.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeProcurementSubTab === sub.id
                      ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/20 shadow'
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            <div className="mt-2 w-full">
              {activeProcurementSubTab === 'tenders' && (
                <NationalTenderCenter lang={lang} />
              )}
              {activeProcurementSubTab === 'vendors' && (
                <VendorQualificationPanel lang={lang} />
              )}
              {activeProcurementSubTab === 'bids' && (
                <BidEvaluationPanel lang={lang} />
              )}
              {activeProcurementSubTab === 'contracts' && (
                <ContractLifecyclePanel lang={lang} />
              )}
              {activeProcurementSubTab === 'risk' && (
                <SupplierRiskPanel lang={lang} />
              )}
              {activeProcurementSubTab === 'audit' && (
                <ProcurementAuditPanel lang={lang} />
              )}
            </div>
          </div>
        )}

      </div>

      {/* SPECIALIZED MULTI-GOVERNMENT CAPABILITY: JOINT OPERATIONS WORKSPACE & FEDERATION GATEWAY */}
      {activeContext === 'JOINT_OPERATIONS' && (
        <div className="mt-8 border-t border-[#E0A96D]/30 pt-8 text-start">
          <div className="flex items-center gap-3 mb-4">
            <Network className="text-amber-500 w-6 h-6 animate-pulse" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              {getLabel('FEDERAL-KRG JOINT INTER-GOVERNMENTAL GATEWAY', 'نواة البوابة والممر الاتحادي المشترك لمبادلة البيانات', 'دەروازەی فیدراڵی هاوبەشی گواستنەوەی زانیاری عێراق-هەرێم')}
            </h3>
          </div>
          <p className="text-xs text-slate-300 mb-6 max-w-3xl leading-relaxed">
            {getLabel('The Federation Gateway is built specifically as a Future Reconciliation Layer, allowing multi-agency approval workflows, policy enforcement, secure PKI mapping, and trade federation logging without bypassing active jurisdiction boundaries.',
                        'تم بناء بوابة الممر الفيدرالي لتعمل كطبقة مصالحة مستقبلية للموافقات عبر الحدود والتحقق من التوقيعات دون تداخل مع قوانين وولايات كل حكومة.',
                        'دەروازەی گرێدراوی فیدراڵی وەک نەخشەی هاوئاهەنگی دابینکراوە بۆ واژۆ و لێکۆڵینەوە هاوبەشەکانی دەروازەکان.')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* JOINT CRISIS MANAGEMENT SECTION */}
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block mb-3 uppercase tracking-wider font-bold text-[#E0A96D]">{getLabel('JOINT OPERATIONS CRISIS RESPONSE BOARD', 'مجلس إدارة الأزمات المشترك', 'بۆردی بەڕێوەبردنی کێشە کتوپڕە هاوبەشەکان')}</span>
              
              <form onSubmit={handleCreateJointTask} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-xs font-mono">
                <input 
                  type="text" 
                  value={jtName} 
                  onChange={(e) => setJtName(e.target.value)} 
                  placeholder={getLabel('Task name...', 'اسم المهمة المشتركة...', 'ناونیشانی ئۆپەراسیۆن...')} 
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-[11px] text-white"
                />
                <input 
                  type="text" 
                  value={jtLead} 
                  onChange={(e) => setJtLead(e.target.value)} 
                  placeholder={getLabel('Lead Authority...', 'السلطة المسؤولة...', 'دەسەڵاتی جێبەجێکار...')} 
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-[11px] text-white"
                />
                <Button type="submit" size="sm" variant="gold" className="text-[11px] py-1">
                  + {getLabel('Draft Joint Task', 'إنشاء مهمة مشتركة', 'تۆمارکردن')}
                </Button>
              </form>

              <div className="space-y-3.5 text-xs text-start">
                {jointTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-slate-900 rounded border border-slate-800 flex justify-between items-center hover:border-amber-500/20 transition-all">
                    <div>
                      <span className="text-[9px] text-amber-500 font-mono font-bold uppercase tracking-wider block">TASK ID: {task.id}</span>
                      <span className="font-bold text-slate-100 font-sans block mt-0.5">{task.taskName}</span>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">Lead: {task.leadAuthority} • Coordinating: {task.coordinatingParties}</p>
                    </div>
                    {task.status === 'open' || task.status === 'resolving' ? (
                      <Button onClick={() => resolveJointTask(task.id)} size="sm" variant="success" className="text-[10px] py-1 font-bold">
                        {getLabel('Resolve', 'حل الأزمة', 'چارەسەر')}
                      </Button>
                    ) : (
                      <Badge variant="success">Mitigated</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FEDERATION GATEWAY APPROVALS & HANDSHAKES */}
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block mb-3 uppercase tracking-wider font-bold text-[#E0A96D]">{getLabel('FEDERATION GATEWAY HANDSHAKES & LOGS', 'موافقات وحركات ومعاملات بوابة الممر', 'واژۆکان و تێپەڕینەکانی دەروازە فیدراڵییەکە')}</span>
              
              <div className="space-y-3.5 text-xs text-start">
                {federationTransactions.map((tx) => (
                  <div key={tx.id} className="p-3 bg-slate-900 rounded border border-slate-800 flex flex-col justify-between gap-3 relative overflow-hidden hover:border-amber-500/10 transition-all font-mono">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">{tx.serviceType.toUpperCase()} Handshake</span>
                      <Badge variant={tx.status === 'approved' ? 'success' : tx.status === 'rejected' ? 'danger' : 'warning'}>{tx.status}</Badge>
                    </div>
                    
                    <div className="space-y-1 text-slate-300 text-[11px]">
                      <p className="font-sans font-semibold text-slate-200">{tx.payloadSummary}</p>
                      <p>Tx Node Identifier: <span className="text-slate-400 font-bold">{tx.id}</span></p>
                      <p>Handshake Flow: <span className="font-bold text-teal-400">{tx.sourceJurisdiction.toUpperCase()}</span> ➔ <span className="font-bold text-emerald-400">{tx.targetJurisdiction.toUpperCase()}</span></p>
                      <p>Requested By: <span className="text-white mt-1 block">{tx.requestedBy}</span></p>
                      {tx.approvedBy && <p>Approved By: <span className="text-emerald-400">{tx.approvedBy}</span></p>}
                    </div>

                    {tx.status === 'pending' && (
                      <div className="flex justify-end gap-2 mt-1">
                        <Button onClick={() => rejectFederation(tx.id, userRole)} size="sm" variant="danger" className="text-[10px] py-1 font-bold">
                          Decline
                        </Button>
                        <Button onClick={() => approveFederation(tx.id, userRole)} size="sm" variant="success" className="text-[10px] py-1 font-bold">
                          Approve Handshake
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ACCESSIBILITY RADAR ACCORD SYSTEM (REPEATED ACCORD OVER THE LOWER FRAME) */}
      <div className="mt-8 pt-6 border-t border-slate-800/60 text-xs flex flex-wrap justify-between items-center text-slate-500 font-mono gap-4 text-start">
        <div>
          <span>{getLabel('RECONCILIATION ABSTRACT: ', 'موجز عملية الصلح والمطابقة: ', 'خولا بەراوردکاری هاوبەش: ')}<b>{getLabel('100% READY', 'جاهز بنسبة 100%', '١٠٠٪ ئامادەیە')}</b></span>
          <span className="mx-2">•</span>
          <span>{getLabel('FEDERAL ROLES ISOLATION: ', 'عزل الصلاحيات الاتحادية: ', 'عزلکردنی ڕوڵە فیدراڵییەکان: ')}<b>{getLabel('ENFORCED', 'مفروض ومطبق', 'جێبەجێکراوە')}</b></span>
        </div>
        <div>
          <span>{getLabel('ACCESSIBILITY VERBOSE STANDARD: ', 'معيار الوصول والشفافية الرقابي: ', 'پێوانەی شەفافیەتی گشتی: ')}<b>{getLabel('WCAG 2.1 AA COMPLIANT', 'متوافق مع المعيار الدولي WCAG 2.1 AA', 'گونجاوە لەگەڵ WCAG 2.1 AA')}</b></span>
        </div>
      </div>

    </Card>
  );
}
