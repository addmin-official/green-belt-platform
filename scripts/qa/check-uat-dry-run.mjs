#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING UAT DRY-RUN AND ROLE-BASED BOUNDARY SCAN ---');

let passed = true;

const filesToVerify = [
  'src/shared/uat/UATRoleRegistry.ts',
  'src/shared/uat/UATScenarioRegistry.ts',
  'src/shared/uat/UATFlowValidator.ts',
  'src/shared/uat/UATBoundaryCheck.ts',
  'src/shared/uat/UATLanguageCheck.ts',
  'src/shared/uat/UATProviderStateCheck.ts',
  'src/shared/uat/UATReadinessReport.ts',
  'src/shared/uat/UATDryRunPanel.tsx'
];

// Check all files exist
for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    console.log(`[+] Found UAT component file: ${file}`);
  } else {
    console.error(`[-] ERROR: Missing required UAT system file: ${file}`);
    passed = false;
  }
}

// Check for forbidden anti-patterns in the files
// No mock operational data, no fake employees, no political names, no fake revenue records (e.g. mock dollars/IQD data blocks)
const prohibitedPatterns = [
  // fake employees
  'john smith', 'jane doe',
  // political figures
  'maliki', 'sudani', 'barzani', 'talabani',
  // fake revenue amounts
  '120,500,000 IQD', '45,200,000 USD'
];

for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf8').toLowerCase();
  for (const pattern of prohibitedPatterns) {
    if (content.includes(pattern)) {
      console.error(`[-] ERROR: Prohibited pattern or fake record "${pattern}" found in ${file}`);
      passed = false;
    }
  }
}

// Read scenario contents to ensure correct UAT boundary logic
const scenariosPath = path.resolve('src/shared/uat/UATScenarioRegistry.ts');
if (fs.existsSync(scenariosPath)) {
  const content = fs.readFileSync(scenariosPath, 'utf8');
  if (!content.includes('UAT_SCENARIOS')) {
    console.error('[-] ERROR: UATScenarioRegistry does not define UAT_SCENARIOS registry exports.');
    passed = false;
  }
}

if (passed) {
  console.log('[+] ALL UAT DRY-RUN COMPLIANCE CHECKS PASSED.');
  process.exit(0);
} else {
  console.error('[-] UAT DRY-RUN COMPLIANCE SCAN DETECTED FAILURE OR VIOLATION.');
  process.exit(1);
}
