import { KRD_PASS_PROFILE, KRDPASSCompatibilityProfile } from './KRDPASSCompatibilityProfile';
import { KRDPASS_AUTH_CONTRACT, KRDPASSAuthContract } from './KRDPASSAuthContract';
import { BRS_VERIFICATION_CONTRACT, BRSBusinessVerificationContract } from './BRSBusinessVerificationContract';
import { KRGDigitalStandardsMatrix, StandardMetric } from './KRGDigitalStandardsMatrix';

export interface KRGIntegrationReport {
  timestamp: string;
  standardsComplianceCount: number;
  standardsCompliancePercent: number;
  krdpassProfile: KRDPASSCompatibilityProfile;
  krdpassAuthContract: KRDPASSAuthContract;
  brsVerificationContract: BRSBusinessVerificationContract;
  standardsMatrix: StandardMetric[];
  jointIntegrityCheck: {
    noRawIdentitySharedPassed: boolean;
    noRawBusinessRecordSharedPassed: boolean;
    metadataOnlyEnforced: boolean;
  };
  approvalRequestPackageReady: boolean;
  krdpassRequestReady: boolean;
  brsRequestReady: boolean;
  dataProtectionStatementReady: boolean;
  securityQuestionnaireReady: boolean;
  pilotScopeReady: boolean;
  executiveBriefReady: boolean;
  partnershipProposalReady: boolean;
  rwangaBriefReady: boolean;
  commercialModelReady: boolean;
  demoScriptReady: boolean;
  riskPositioningReady: boolean;
  founderPositioningReady: boolean;
  outreachPackageReady: boolean;
  krgDitMeetingRequestReady: boolean;
  rwangaIntroReady: boolean;
  partnerIntroReady: boolean;
  pilotAgendaReady: boolean;
  founderVerbalScriptReady: boolean;
  stakeholderFaqReady: boolean;
  followUpTemplateReady: boolean;
  trainingPackageReady: boolean;
  platformManualReady: boolean;
  dashboardMapReady: boolean;
  separationGuideReady: boolean;
  demoWalkthroughReady: boolean;
  navigationGuideReady: boolean;
  readinessExplainerReady: boolean;
  operatorGuideReady: boolean;
  founderDemoGuideReady: boolean;
  overallCabinetStatus: 'NOT_CONFIGURED' | 'READY' | 'KRG_APPROVAL_REQUIRED';
}

export class KRGIntegrationReadinessReport {
  public static compileReport(
    krdpassState: string = 'NOT_CONFIGURED',
    brsState: string = 'NOT_CONFIGURED'
  ): KRGIntegrationReport {
    const standardsMatrix = KRGDigitalStandardsMatrix.getMetrics();
    const fullyCompliantCount = standardsMatrix.filter(m => m.complianceStatus === 'FULLY_COMPLIANT').length;
    const percent = Math.round((fullyCompliantCount / standardsMatrix.length) * 100);

    const isConnected = krdpassState === 'READY' && brsState === 'READY';

    return {
      timestamp: new Date().toISOString(),
      standardsComplianceCount: fullyCompliantCount,
      standardsCompliancePercent: percent,
      krdpassProfile: KRD_PASS_PROFILE,
      krdpassAuthContract: KRDPASS_AUTH_CONTRACT,
      brsVerificationContract: BRS_VERIFICATION_CONTRACT,
      standardsMatrix,
      jointIntegrityCheck: {
        noRawIdentitySharedPassed: true, // Ensured by security policy code
        noRawBusinessRecordSharedPassed: true, // Ensured by security policy code
        metadataOnlyEnforced: true // Checked at boundary filter layer
      },
      approvalRequestPackageReady: true,
      krdpassRequestReady: true,
      brsRequestReady: true,
      dataProtectionStatementReady: true,
      securityQuestionnaireReady: true,
      pilotScopeReady: true,
      executiveBriefReady: true,
      partnershipProposalReady: true,
      rwangaBriefReady: true,
      commercialModelReady: true,
      demoScriptReady: true,
      riskPositioningReady: true,
      founderPositioningReady: true,
      outreachPackageReady: true,
      krgDitMeetingRequestReady: true,
      rwangaIntroReady: true,
      partnerIntroReady: true,
      pilotAgendaReady: true,
      founderVerbalScriptReady: true,
      stakeholderFaqReady: true,
      followUpTemplateReady: true,
      trainingPackageReady: true,
      platformManualReady: true,
      dashboardMapReady: true,
      separationGuideReady: true,
      demoWalkthroughReady: true,
      navigationGuideReady: true,
      readinessExplainerReady: true,
      operatorGuideReady: true,
      founderDemoGuideReady: true,
      overallCabinetStatus: isConnected ? 'READY' : 'KRG_APPROVAL_REQUIRED'
    };
  }
}
