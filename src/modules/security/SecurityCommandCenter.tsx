import React from 'react';
import { 
  Shield, 
  History, 
  UserCheck, 
  Lock, 
  RefreshCw, 
  Key
} from 'lucide-react';
import { Language } from '../../types';

// Import UI Library Components
import { 
  Button, 
  Badge, 
  StatCard, 
  PageHeader, 
  SectionHeader 
} from '../../ui';

// Import Hook
import { useSecurityCommandCenter } from './hooks/useSecurityCommandCenter';

// Import Modular Presentation Panels
import { ActiveSocketsPanel } from './components/ActiveSocketsPanel';
import { AbacSimulatorPanel } from './components/AbacSimulatorPanel';
import { AuditLogStreamPanel } from './components/AuditLogStreamPanel';
import { ActiveSocketsBreakdownPanel } from './components/ActiveSocketsBreakdownPanel';
import { KeyChainRegistryPanel } from './components/KeyChainRegistryPanel';
import { ComplianceChecklistPanel } from './components/ComplianceChecklistPanel';

// Import Localization Helper
import { t } from './localization/securityTranslations';
import { ComplianceItemViewModel } from './types/securityViewModels';

// Static Compliance Config
const complianceChecklist: ComplianceItemViewModel[] = [
  {
    code: 'ISO-27001-A.9',
    framework: 'ISO 27001',
    name: {
      en: 'Cryptographic Access Control Standards',
      ar: 'معايير التحكم بالتشفير والوصول',
      ku: 'تۆماری پابەندبوون بە متمانەی گشتی نهێننووسی گومرگ'
    },
    status: 'COMPLIANT',
    level: {
      en: '100% Validated',
      ar: 'مكتمل ومصادق ١٠٠٪',
      ku: '١٠٠٪ پشتڕاستکراوەتەوە'
    }
  },
  {
    code: 'NIST-SP-800-207',
    framework: 'NIST Zero Trust',
    name: {
      en: 'Verified Enclave Threat Prevention',
      ar: 'منظومة حماية الأجهزة المعتمدة والتحقق',
      ku: 'ئاستی پاراستنی سیستم لە کاتی ڕوودانی هەڕەشەکان'
    },
    status: 'COMPLIANT',
    level: {
      en: '100% Policy Engine Match',
      ar: 'تطابق كامل ومؤمن للسياسات جمركية',
      ku: 'ڕێککەوتنی تەواو لەگەڵ مەکینەی پشکنین'
    }
  },
  {
    code: 'INSCP-SEC-V2',
    framework: 'Iraq Secure Cloud',
    name: {
      en: 'Multi-Tenant Ministry Logical Separation',
      ar: 'بروتوكول عزل تداول البيانات الفيدرالي للوزارات',
      ku: 'یاساکانی جیاکردنەوەی بەشە جیاوازەکانی وەزارەتەکان'
    },
    status: 'COMPLIANT',
    level: {
      en: 'Sovereign Core Encryption Locked',
      ar: 'التشغيل والتشفير مؤمن ومحمي بالخزنة',
      ku: 'مۆری بەستنەوەی کلیلەکان بە تەواوی ئامادەیە'
    }
  },
  {
    code: 'WCAG-2.1-AA',
    framework: 'System Ergonomics',
    name: {
      en: 'Strict High-Contrast Gold Layout Alignment',
      ar: 'معايير تطابق الكونتراست والتصميم العيادي',
      ku: 'بەراوردکردنی پێوانەی سپەیسینگ و جۆری نووسین'
    },
    status: 'COMPLIANT',
    level: {
      en: 'AA Compliant contrast matching',
      ar: 'متوافق مع معايير الويب المقروءة للرؤية البصرية',
      ku: 'هاوتای یاساکانی نێودەوڵەتی خێرایی و ڕوونی ڕەنگەکان'
    }
  }
];

export default function SecurityCommandCenter({ lang }: { lang: Language }) {
  const {
    activeSessions,
    auditLogs,
    keysList,
    securityScore,
    simSubjectId,
    setSimSubjectId,
    simPermission,
    setSimPermission,
    simResourceRequiredClearance,
    setSimResourceRequiredClearance,
    simResourceMinistry,
    setSimResourceMinistry,
    simDeviceVerified,
    setSimDeviceVerified,
    simRiskScore,
    setSimRiskScore,
    simResult,
    auditFilter,
    setAuditFilter,
    triggerTelemetryAudit,
    terminateSessionSocket,
    triggerKeyRollover,
    employeeProfiles
  } = useSecurityCommandCenter();

  const isRtl = lang !== 'en';
  const totalSess = activeSessions.length;
  const secureSess = activeSessions.filter(s => s.status === 'ACTIVE').length;
  const flaggedSess = activeSessions.filter(s => s.status === 'STEP_UP_CHALLENGE').length;
  const lockedSess = activeSessions.filter(s => s.status === 'LOCKED_BY_THREAT_DETECTION').length;

  return (
    <div id="sovereign-security-command-center" className="flex flex-col gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Page Header */}
      <PageHeader
        icon={<Lock />}
        title={t(lang, 'header.title')}
        description={t(lang, 'header.subtitle')}
        status={
          <Badge variant="gold">
            {t(lang, 'header.badge')}
          </Badge>
        }
        actions={
          <div className="flex gap-2">
            <Button 
              onClick={triggerTelemetryAudit}
              variant="outline"
              className="text-white border-slate-700 hover:border-[#E0A96D]/50 text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              {t(lang, 'buttons.syncChannel')}
            </Button>
            <Button 
              onClick={triggerKeyRollover}
              variant="default"
              className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              {t(lang, 'buttons.rotateKeys')}
            </Button>
          </div>
        }
      />

      {/* Top Layer 4-Way Technical Metrics Index */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <StatCard
          title={t(lang, 'stats.readiness.title')}
          value={`${securityScore}%`}
          subtitle={t(lang, 'stats.readiness.subtitle')}
          icon={<Shield className="w-5 h-5 text-[#E0A96D]" />}
          trend={{ value: t(lang, 'stats.readiness.trend'), isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.sessions.title')}
          value={totalSess.toString()}
          subtitle={`${secureSess} ${t(lang, 'stats.sessions.subtitleSafe')} (${flaggedSess + lockedSess})`}
          icon={<UserCheck className="w-5 h-5 text-cyan-400" />}
          trend={{ value: t(lang, 'stats.sessions.trend'), isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.keys.title')}
          value="AES-256-GCM"
          subtitle={`${t(lang, 'stats.keys.subtitle')}: Key_${keysList.find(k => k.status === 'ACTIVE')?.keyId.slice(-4) || 'ABCD'}`}
          icon={<Lock className="w-5 h-5 text-emerald-400" />}
          trend={{ value: t(lang, 'stats.keys.trend'), isPositive: true }}
        />

        <StatCard
          title={t(lang, 'stats.audit.title')}
          value={`#${auditLogs.length + 1000}`}
          subtitle={t(lang, 'stats.audit.subtitle')}
          icon={<History className="w-5 h-5 text-purple-400" />}
          trend={{ value: t(lang, 'stats.audit.trend'), isPositive: true }}
        />

      </div>

      {/* Main Command Center Layout Split: 2 Column left, 1 Column right layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Double-Col Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <ActiveSocketsPanel 
            lang={lang} 
            activeSessions={activeSessions} 
            terminateSessionSocket={terminateSessionSocket} 
          />

          <AbacSimulatorPanel
            lang={lang}
            simSubjectId={simSubjectId}
            setSimSubjectId={setSimSubjectId}
            simPermission={simPermission}
            setSimPermission={setSimPermission}
            simResourceRequiredClearance={simResourceRequiredClearance}
            setSimResourceRequiredClearance={setSimResourceRequiredClearance}
            simResourceMinistry={simResourceMinistry}
            setSimResourceMinistry={setSimResourceMinistry}
            simDeviceVerified={simDeviceVerified}
            setSimDeviceVerified={setSimDeviceVerified}
            simRiskScore={simRiskScore}
            setSimRiskScore={setSimRiskScore}
            simResult={simResult}
            employeeProfiles={employeeProfiles}
          />

          <AuditLogStreamPanel 
            lang={lang} 
            auditLogs={auditLogs} 
            auditFilter={auditFilter} 
            setAuditFilter={setAuditFilter} 
          />

        </div>

        {/* Right Sidebar Area (1-Col) */}
        <div className="flex flex-col gap-6">
          
          <ActiveSocketsBreakdownPanel 
            lang={lang} 
            activeSessions={activeSessions} 
          />

          <KeyChainRegistryPanel 
            lang={lang} 
            keysList={keysList} 
          />

          <ComplianceChecklistPanel 
            lang={lang} 
            complianceChecklist={complianceChecklist} 
          />

          <div className="bg-[#1a2c42]/20 border border-slate-800 p-5 rounded-xl text-start flex flex-col gap-3.5">
            <SectionHeader 
              title={t(lang, 'sidebar.governance.title')} 
              description={t(lang, 'sidebar.governance.desc')}
            />
            <p className="text-[11px] text-[#E0E1DD] font-mono leading-relaxed">
              {t(lang, 'sidebar.governance.body')}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
