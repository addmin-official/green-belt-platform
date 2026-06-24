export type ReadinessStatus = 
  | 'BLOCKED' 
  | 'CONDITIONALLY_READY' 
  | 'PILOT_READY' 
  | 'ACQUISITION_READY'
  | 'CONDITIONALLY_READY — BACKEND UNAVAILABLE'
  | 'CONDITIONALLY_READY — PROVIDERS REQUIRED'
  | 'CONDITIONALLY_READY — PILOT DRY-RUN READY, PROVIDERS REQUIRED'
  | 'CONDITIONALLY_READY — KRG DIGITAL PROVIDER APPROVAL REQUIRED'
  | 'CONDITIONALLY_READY — KRG PROVIDER APPROVAL PACKAGE READY'
  | 'CONDITIONALLY_READY — EXECUTIVE PITCH PACKAGE READY, PROVIDERS REQUIRED'
  | 'CONDITIONALLY_READY — OUTREACH PACKAGE READY, PROVIDERS REQUIRED'
  | 'CONDITIONALLY_READY — TRAINING PACKAGE READY, PROVIDERS REQUIRED'
  | 'CONDITIONALLY_READY — TRAINING PACKAGE FULLY VERIFIED, PROVIDERS REQUIRED';

export interface QACheckResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'NOT_CONFIGURED' | 'WARNING';
  violationsCount: number;
  details: string;
  timestamp: string;
}

export interface ProductionGateResult {
  mockDependencyCheck: QACheckResult;
  sovereignBoundaryCheck: QACheckResult;
  localizationCoverageCheck: QACheckResult;
  rtlTypographyCheck: QACheckResult;
  hardcodedSuccessCheck: QACheckResult;
  demoIsolationCheck: QACheckResult;
  apiContractCheck?: QACheckResult;
  openapiContractCheck?: QACheckResult;
  deploymentReadinessCheck?: QACheckResult;
  buildOutputSafetyCheck?: QACheckResult;
  providerWiringCheck?: QACheckResult;
  uatDryRunCheck?: QACheckResult;
  krgDigitalCompatibilityCheck?: QACheckResult;
  krgOnboardingPackageCheck?: QACheckResult;
  krgPitchPackageCheck?: QACheckResult;
  krgOutreachPackageCheck?: QACheckResult;
  krgTrainingPackageCheck?: QACheckResult;
  buildCheck: QACheckResult;
  readinessDecision: ReadinessStatus;
  overallComplianceScore: number;
  timestamp: string;
}
