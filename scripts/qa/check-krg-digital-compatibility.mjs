#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING KRG DIGITAL SERVICES COMPATIBILITY CHECK ---');

let passed = true;

const filesToVerify = [
  'src/infrastructure/krg-digital/KRDPASSCompatibilityProfile.ts',
  'src/infrastructure/krg-digital/KRDPASSAuthContract.ts',
  'src/infrastructure/krg-digital/BRSBusinessVerificationContract.ts',
  'src/infrastructure/krg-digital/KRGDigitalStandardsMatrix.ts',
  'src/infrastructure/krg-digital/KRGDataSovereigntyPolicy.ts',
  'src/infrastructure/krg-digital/KRGIntegrationReadinessReport.ts',
  'server/src/zones/krg/krdpassRoutes.ts',
  'server/src/zones/krg/brsRoutes.ts'
];

for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    console.log(`[+] Found KRG Digital component file: ${file}`);
  } else {
    console.error(`[-] ERROR: Missing required file: ${file}`);
    passed = false;
  }
}

// Check for absolute, real KRG government or non-example URLs
// Check for secrets or fake employees/businesses
const forbiddenPatterns = [
  'krg.gov.iq', 
  'client_secret_xyz', 'super_secret', 'admin_password',
  'john smith', 'jane doe',
  // Fictional test companies
  'hawler goods', 'slemani traders', 'erbil oil'
];

for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf8').toLowerCase();
  for (const pattern of forbiddenPatterns) {
    if (content.includes(pattern)) {
      console.error(`[-] ERROR: Forbidden pattern or leak detected: "${pattern}" in ${file}`);
      passed = false;
    }
  }
}

// Check Joint metadata constraint is present in KRG Data Sovereignty Policy
const policyPath = path.resolve('src/infrastructure/krg-digital/KRGDataSovereigntyPolicy.ts');
if (fs.existsSync(policyPath)) {
  const content = fs.readFileSync(policyPath, 'utf8');
  if (!content.includes('jointPermittedFields') || !content.includes('strictlyProhibitedFields')) {
    console.error('[-] ERROR: KRGDataSovereigntyPolicy is missing joint metadata-only restriction enforcements.');
    passed = false;
  }
}

if (passed) {
  console.log('[+] ALL KRG DIGITAL SERVICES COMPATIBILITY CHECKS PASSED.');
  process.exit(0);
} else {
  console.error('[-] KRG COMPATIBILITY SCAN DETECTED FAILURE OR VIOLATION.');
  process.exit(1);
}
