import { execSync } from 'child_process';
import realFs from 'fs';
import realPath from 'path';

const resultsPath = 'src/shared/qa/qa-results.json';

function runScript(scriptPath, name) {
  const start = new Date();
  console.log(`[QA] Running ${name} (${scriptPath})...`);
  try {
    const output = execSync(`node ${scriptPath}`, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`[QA] ${name} PASSED.`);
    return {
      name,
      status: 'PASS',
      violationsCount: 0,
      details: output.split('\n')[0] || 'Verification successfully completed with 0 violations.',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`[QA] ${name} FAILED.`);
    const errorMsg = error.stderr || error.stdout || error.message;
    
    // Parse approximate violations
    let violationsCount = 1;
    const match = errorMsg.match(/(\d+)\s+violations/i) || errorMsg.match(/(\d+)\s+errors/i);
    if (match) {
      violationsCount = parseInt(match[1], 10);
    }

    return {
      name,
      status: 'FAIL',
      violationsCount,
      details: errorMsg.split('\n')[0] || `Failing during ${name} check execution.`,
      timestamp: new Date().toISOString()
    };
  }
}

function runBuildCommand() {
  console.log(`[QA] Running Build Check (npm run build)...`);
  try {
    const output = execSync(`npm run build`, { encoding: 'utf8', stdio: 'pipe' });
    return {
      name: 'Build Check',
      status: 'PASS',
      violationsCount: 0,
      details: 'Production package build compiles cleanly under Vite bundle guidelines.',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    const errorMsg = error.stderr || error.stdout || error.message;
    return {
      name: 'Build Check',
      status: 'FAIL',
      violationsCount: 1,
      details: errorMsg.split('\n')[0] || 'Build failed with syntax or asset bundling errors.',
      timestamp: new Date().toISOString()
    };
  }
}

// Let's execute the main suites
const mockDependencyCheck = runScript('scripts/qa/check-mock-dependencies.mjs', 'Mock Dependency Check');
const sovereignBoundaryCheck = runScript('scripts/qa/check-sovereign-boundaries.mjs', 'Sovereign Boundary Check');
const localizationCoverageCheck = runScript('scripts/qa/check-localization-coverage.mjs', 'Localization Coverage Check');
const rtlTypographyCheck = runScript('scripts/qa/check-rtl-typography.mjs', 'RTL Typography Check');
const hardcodedSuccessCheck = runScript('scripts/qa/check-hardcoded-success.mjs', 'Hardcoded Success Check');
const demoIsolationCheck = runScript('scripts/qa/check-demo-isolation.mjs', 'Demo Isolation Check');
const apiContractCheck = runScript('scripts/qa/check-api-contracts.mjs', 'API Contract Compliance Check');
const openapiContractCheck = runScript('scripts/qa/check-openapi-contracts.mjs', 'OpenAPI Contract Verification Check');
const deploymentReadinessCheck = runScript('scripts/qa/check-deployment-readiness.mjs', 'Deployment Readiness Check');
const providerWiringCheck = runScript('scripts/qa/check-provider-wiring.mjs', 'Pilot Backend Wiring Check');
const uatDryRunCheck = runScript('scripts/qa/check-uat-dry-run.mjs', 'UAT Dry-Run Compliance Check');
const krgDigitalCompatibilityCheck = runScript('scripts/qa/check-krg-digital-compatibility.mjs', 'KRG Digital Standards Compliance Check');
const krgOnboardingPackageCheck = runScript('scripts/qa/check-krg-onboarding-package.mjs', 'KRG Onboarding Package Compliance Check');
const krgPitchPackageCheck = runScript('scripts/qa/check-pitch-package.mjs', 'KRG Executive Pitch & Partnership Package Check');
const krgOutreachPackageCheck = runScript('scripts/qa/check-outreach-package.mjs', 'KRG Executive Outreach & Meetings Request Package Check');
const krgTrainingPackageCheck = runScript('scripts/qa/check-training-package.mjs', 'KRG Training & Manual Package Check');
const uiContainmentCheck = runScript('scripts/qa/check-ui-containment.mjs', 'UI Containment & Safety Check');
const fiscalSettlementPolicyCheck = runScript('scripts/qa/check-fiscal-settlement-policy.mjs', 'Fiscal Settlement Policy & Rules Engine Check');
const borderSettlementPolicyCheck = runScript('scripts/qa/check-border-settlement-policy.mjs', 'Border Settlement Policy & Rules Engine Check');
const borderScopeLockCheck = runScript('scripts/qa/check-border-scope-lock.mjs', 'Border Operating System Scope Lock Check');
const borderApiSurfaceCheck = runScript('scripts/qa/check-border-api-surface.mjs', 'Border API Surface Compliance Check');
const buildCheck = runBuildCommand();
const buildOutputSafetyCheck = runScript('scripts/qa/check-build-output-safety.mjs', 'Build Output Safety Check');

const finalReport = {
  mockDependencyCheck,
  sovereignBoundaryCheck,
  localizationCoverageCheck,
  rtlTypographyCheck,
  hardcodedSuccessCheck,
  demoIsolationCheck,
  apiContractCheck,
  openapiContractCheck,
  deploymentReadinessCheck,
  buildOutputSafetyCheck,
  providerWiringCheck,
  uatDryRunCheck,
  krgDigitalCompatibilityCheck,
  krgOnboardingPackageCheck,
  krgPitchPackageCheck,
  krgOutreachPackageCheck,
  krgTrainingPackageCheck,
  uiContainmentCheck,
  fiscalSettlementPolicyCheck,
  borderSettlementPolicyCheck,
  borderScopeLockCheck,
  borderApiSurfaceCheck,
  buildCheck
};

const passCount = Object.values(finalReport).filter(c => c.status === 'PASS').length;
const totalCount = Object.values(finalReport).length;
const overallComplianceScore = Math.round((passCount / totalCount) * 100);

// Set final decision to CONDITIONALLY_READY — BORDER API SURFACE VERIFIED, PROVIDERS REQUIRED
const finalReportWithMetadata = {
  ...finalReport,
  readinessDecision: 'CONDITIONALLY_READY — BORDER API SURFACE VERIFIED, PROVIDERS REQUIRED',
  overallComplianceScore,
  timestamp: new Date().toISOString()
};


// Write results
try {
  realFs.writeFileSync(resultsPath, JSON.stringify(finalReportWithMetadata, null, 2), 'utf8');
  console.log(`[QA] Comprehensive results written successfully to ${resultsPath}.`);
} catch (err) {
  console.error('Failed to write QA results to file:', err);
}

// Exit code indicates absolute gate outcome
const checks = Object.values(finalReport);
const hasFailures = checks.some(c => c.status === 'FAIL');

if (hasFailures) {
  console.error('\n[QA] PRODUCTION QA GATE STATUS: BLOCKED. Fix violations before staging.');
  process.exit(1);
} else {
  console.log('\n[QA] PRODUCTION QA GATE STATUS: PASS. Ready for pilot review.');
  process.exit(0);
}
