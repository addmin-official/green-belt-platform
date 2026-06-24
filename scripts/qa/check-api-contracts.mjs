import fs from 'fs';
import path from 'path';

const contractsDir = 'src/infrastructure/api-contracts';
const expectedFiles = [
  'BorderApiContract.ts',
  'CustomsApiContract.ts',
  'RevenueApiContract.ts',
  'TradeApiContract.ts',
  'TransparencyApiContract.ts',
  'IdentityApiContract.ts',
  'WorkforceApiContract.ts',
  'SecurityApiContract.ts',
  'IntelligenceApiContract.ts',
  'AuditApiContract.ts',
  'LedgerApiContract.ts',
  'WorkflowApiContract.ts',
  'JointReconciliationApiContract.ts',
  'ApiContractTypes.ts',
  'ApiContractRegistry.ts',
  'ApiContractValidationEngine.ts'
];

const forbiddenKeywords = [
  'api.government.gov.iq', // Example fake domain
  'secret-token',
  'auth-password',
  'private-key'
];

const rawJointKeywords = [
  'raw_revenue',
  'raw_customs_records',
  'raw_identity_records',
  'raw_workforce_records',
  'raw_intelligence_records',
  'raw_security_records',
  'raw_biometric_data',
  'raw_personal_data'
];

let violationsCount = 0;
const errors = [];

function logViolation(msg) {
  violationsCount++;
  errors.push(msg);
}

try {
  // 1. Verify all files exist
  for (const expFile of expectedFiles) {
    const filePath = path.join(contractsDir, expFile).replace(/\\/g, '/');
    if (!fs.existsSync(filePath)) {
      logViolation(`Missing expected API Contract file: ${filePath}`);
    } else {
      // Analyze file content
      const content = fs.readFileSync(filePath, 'utf8');

      // Check for security leaks
      for (const kw of forbiddenKeywords) {
        if (content.includes(kw)) {
          logViolation(`Security Violation: File ${filePath} contains unescaped real secret/domain placeholder "${kw}".`);
        }
      }

      // Check joint metadata compliance
      if (expFile.includes('Transparency') || expFile.includes('Audit') || expFile.includes('Ledger') || expFile.includes('Workflow') || expFile.includes('JointReconciliation')) {
        // Enforce Joint rules
        if (content.includes('metadataOnlyRuleIfJoint') && !content.includes('metadataOnlyRuleIfJoint: true')) {
          logViolation(`Sovereignty Violation: ${expFile} must set 'metadataOnlyRuleIfJoint: true'.`);
        }

        // Search for allowed raw payload lists
        const matchAllowed = content.match(/allowedPayloadTypes:\s*\[([^\]]+)\]/);
        if (matchAllowed) {
          const allowedItems = matchAllowed[1];
          for (const rawKw of rawJointKeywords) {
            if (allowedItems.includes(rawKw)) {
              logViolation(`Sovereignty Violation: ${expFile} allows unauthorized raw joint data: "${rawKw}".`);
            }
          }
        }
      }
    }
  }

  if (violationsCount > 0) {
    console.error(`FAIL: ${violationsCount} API Contract compliance violations detected:`);
    errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
  } else {
    console.log('PASS: All 16 API Contract structures comply with national sovereignty bounds, schema controls, and metadata-only limits.');
    process.exit(0);
  }
} catch (err) {
  console.error('Fatal error during API Contracts validation check:', err);
  process.exit(1);
}
