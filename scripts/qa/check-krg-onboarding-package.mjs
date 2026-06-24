#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING KRG PROVIDER APPROVAL & ONBOARDING PACKAGE CHECK ---');

let passed = true;

const filesToVerify = [
  'docs/krg-onboarding/krg-provider-approval-request.md',
  'docs/krg-onboarding/krdpass-integration-request.md',
  'docs/krg-onboarding/brs-integration-request.md',
  'docs/krg-onboarding/krg-data-protection-statement.md',
  'docs/krg-onboarding/joint-metadata-exchange-statement.md',
  'docs/krg-onboarding/technical-security-questionnaire.md',
  'docs/krg-onboarding/pilot-scope-and-success-criteria.md'
];

// 1. Verify existence
for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    console.log(`[+] Found onboarding package component file: ${file}`);
  } else {
    console.error(`[-] ERROR: Missing required file: ${file}`);
    passed = false;
  }
}

// 2. Leak check & Forbidden patterns (No real secrets, URLs, or client IDs)
const forbiddenPatterns = [
  'krg.gov.iq',
  'client_secret_xyz', 'super_secret', 'admin_password', 'secret_key',
  'john smith', 'jane doe',
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

// 3. KRDPASS scopes constraint check (citizen_identity is optional, high-sensitivity, and approval-requiring)
const krdpassPath = path.resolve('docs/krg-onboarding/krdpass-integration-request.md');
if (fs.existsSync(krdpassPath)) {
  const content = fs.readFileSync(krdpassPath, 'utf8');
  const normalized = content.toLowerCase();

  const containsCitizenIdentity = normalized.includes('citizen_identity');
  const containsHighSensitivity = normalized.includes('high_sensitivity');
  const containsApprovalRequired = normalized.includes('approval_required');
  const containsNotRequired = normalized.includes('not required for initial pilot');

  if (!containsCitizenIdentity || !containsHighSensitivity || !containsApprovalRequired || !containsNotRequired) {
    console.error('[-] ERROR: krdpass-integration-request.md must explicitly mark citizen_identity as HIGH_SENSITIVITY, APPROVAL_REQUIRED, and NOT REQUIRED FOR INITIAL PILOT.');
    passed = false;
  } else {
    console.log('[+] Verified KRDPASS citizen_identity status guidelines.');
  }
}

// 4. BRS fields check (No raw identity, owner database or fees requested for initial pilot)
const brsPath = path.resolve('docs/krg-onboarding/brs-integration-request.md');
if (fs.existsSync(brsPath)) {
  const content = fs.readFileSync(brsPath, 'utf8');
  const normalized = content.toLowerCase();

  const requestsOwner = normalized.includes('ownername') || normalized.includes('ownerpersonaldata') || normalized.includes('owneridentity');
  const hasStrictlyProhibited = normalized.includes('strictly prohibited') || normalized.includes('omitted');

  if (requestsOwner && !hasStrictlyProhibited) {
    console.error('[-] ERROR: BRS initial request must explicitly omit and list as PROHIBITED all owner personal data, addresses, and raw fee schedules.');
    passed = false;
  } else {
    console.log('[+] Verified BRS data minimization and owner-omission protocol.');
  }
}

// 5. Data protection statement verification (Isolation is clear)
const protectionPath = path.resolve('docs/krg-onboarding/krg-data-protection-statement.md');
if (fs.existsSync(protectionPath)) {
  const content = fs.readFileSync(protectionPath, 'utf8').toLowerCase();

  const matchesFederalNoDirect = content.includes('federal') && content.includes('zero') && content.includes('access');
  const matchesJointMetadataOnly = content.includes('joint') && (content.includes('metadata') || content.includes('hash'));

  if (!matchesFederalNoDirect || !matchesJointMetadataOnly) {
    console.error('[-] ERROR: krg-data-protection-statement.md lacks definite statements regarding Federal Zone block and Joint zone metadata-only boundaries.');
    passed = false;
  } else {
    console.log('[+] Verified KRG sovereignty and isolation boundary directives.');
  }
}

if (passed) {
  console.log('[+] ALL KRG PROVIDER APPROVAL & ONBOARDING PACKAGE CHECKS SECURE.');
  process.exit(0);
} else {
  console.error('[-] KRG ONBOARDING COMPLIANCE SCAN DETECTED FAILURE OR VIOLATION.');
  process.exit(1);
}
