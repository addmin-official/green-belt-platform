import React from 'react';
import { useGovernment } from '../../providers/GovernmentProvider';
import { useI18n } from '../../providers/I18nProvider';
import { Card, Badge } from '../../ui';
import { ShieldAlert, Lock } from 'lucide-react';

// Import dashboards
import FederalPrimeMinisterDashboard from '../../federal/executive/FederalPrimeMinisterDashboard'; // sovereign-routing
import KRGPrimeMinisterDashboard from '../../krg/executive/KRGPrimeMinisterDashboard'; // sovereign-routing
import JointExecutiveDashboard from './JointExecutiveDashboard';

interface SovereignGovernanceRouterProps {
  lang: 'en' | 'ar' | 'ku';
}

export const SovereignGovernanceRouter: React.FC<SovereignGovernanceRouterProps> = ({ lang }) => {
  const { activeContext, userRole } = useGovernment();

  // Define exact lists of authorized roles per jurisdiction
  const federalRoles = [
    'Federal Prime Minister',
    'Federal Cabinet',
    'Federal Border Authority',
    'Federal Customs Authority',
    'Federal Revenue Authority',
    'Federal Trade Authority',
    'Federal Customs Auditor',
    'Federal Identity Analyst'
  ];

  const krgRoles = [
    'Prime Minister of Kurdistan Region',
    'KRG Cabinet',
    'KRG Border Authority',
    'KRG Customs Authority',
    'KRG Revenue Authority',
    'KRG Trade Authority',
    'KRG Prime Minister',
    'KRG Customs Inspector',
    'KRG PKI Authority'
  ];

  const jointRoles = [
    'Joint Coordination Council',
    'Joint Revenue Board',
    'Joint Border Committee',
    'Joint Trade Committee',
    'Joint Crisis Coordinator',
    'Border Arbitrator',
    'Federation Integration Director'
  ];

  // Sovereign safety boundary routing & cross-access prevention
  const isFederalUser = federalRoles.includes(userRole);
  const isKrgUser = krgRoles.includes(userRole);
  const isJointUser = jointRoles.includes(userRole);

  // Mismatch / Cross-Access violation detection
  let securityViolation = false;
  let violationDetails = '';

  if (activeContext === 'FEDERAL_IRAQ' && !isFederalUser) {
    securityViolation = true;
    violationDetails = `گونجانی ڕێساکان: ڕۆڵی چالاکی بەکارهێنەر [${userRole}] متمانەپێکراو نییە بۆ دەستگەیشتن بە کایەی فیدراڵ (FEDERAL JURISDICTION).`;
  } else if (activeContext === 'KURDISTAN_REGION' && !isKrgUser) {
    securityViolation = true;
    violationDetails = `گونجانی ڕێساکان: ڕۆڵی چالاکی بەکارهێنەر [${userRole}] متمانەپێکراو نییە بۆ دەستگەیشتن بە دەسەڵاتی هەرێمی کوردستان (KRG JURISDICTION).`;
  } else if (activeContext === 'JOINT_OPERATIONS' && !isJointUser) {
    securityViolation = true;
    violationDetails = `گونجانی ڕێساکان: ڕۆڵی چالاکی بەکارهێنەر [${userRole}] متمانەپێکراو نییە بۆ چوونە ناوەوەی کایەی کاری لێژنەی هاوبەش (JOINT OPERATIONS).`;
  }

  if (securityViolation) {
    return (
      <Card className="border border-red-950 bg-red-950/20 p-8 rounded-xl text-start">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-950 border border-red-900 rounded-lg text-red-400 shrink-0">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-300 font-sans flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-400" />
              ئاگاداری مەترسی سەروەری: ڕێگریکردنی تێپەڕبوونی نایاسایی (Cross-Access Violation Blocked)
            </h3>
            <p className="text-sm text-red-400/95 mt-2 leading-relaxed">
              ئەم پۆرتاڵە بە شێوازی پاراستنی فیدراڵی سەربەخۆ کار دەکات. ناتوانیت بچیتە ناو زانیارییەکانی دەسەڵاتێکی تر پێش ئەوەی ڕۆڵی پێویست لە هێمای سەرەوە مۆر بکەیت.
            </p>
            <div className="mt-4 p-3 bg-slate-950/80 rounded border border-red-950/50 text-xs font-mono text-slate-400">
              {violationDetails}
              <br />
              SYS_PREVENTION_TRIGGER: SovereignGovernanceRouter_v1.0 • BOUNDARY: SECURE
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Purely routed based on correct alignment
  if (activeContext === 'FEDERAL_IRAQ') {
    return <FederalPrimeMinisterDashboard />;
  }

  if (activeContext === 'KURDISTAN_REGION') {
    return <KRGPrimeMinisterDashboard />;
  }

  return <JointExecutiveDashboard />;
};
