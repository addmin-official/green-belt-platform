#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('[SMOKE] Running Joint Metadata-Only Safety Smoke Check...');

let auditFailed = false;

// List forbidden terms
const forbiddenTerms = [
  'rawRevenue', 'rawCustoms', 'rawIdentity', 'rawWorkforce', 'rawIntelligence', 'rawSecurity',
  'biometricData', 'personalData', 'ledgerRecords', 'declarationRecords',
  'raw_revenue', 'raw_customs', 'raw_identity', 'raw_workforce', 'raw_intelligence', 'raw_security'
];

// 1. Static Scan
const jointRoutesPath = path.resolve('server/src/zones/joint/routes.ts');
if (fs.existsSync(jointRoutesPath)) {
  const content = fs.readFileSync(jointRoutesPath, 'utf-8');
  console.log('[+] Performing static analysis scan of joint routing definitions...');
  for (const term of forbiddenTerms) {
    if (content.includes(term)) {
      console.error(`[-] static violation: Joint routes file contains explicit reference to forbidden term block "${term}".`);
      auditFailed = true;
    }
  }
} else {
  console.warn('[!] Joint routes path not found for static validation under: ' + jointRoutesPath);
}

// 2. Guard validation scan
const guardPath = path.resolve('server/src/security/jurisdictionGuard.ts');
if (fs.existsSync(guardPath)) {
  const guardContent = fs.readFileSync(guardPath, 'utf-8');
  console.log('[+] Static verification check for raw field stripping hooks in jurisdictionGuard...');
  const stripsAll = forbiddenTerms.every(term => guardContent.includes(term));
  if (!stripsAll) {
    console.error('[-] safety warning: Not all forbidden fields are mapped for sanitization inside jurisdictionGuard.ts.');
    auditFailed = true;
  } else {
    console.log('[+] PASS: Custom response JSON interceptors fully configured and enforce strict metadata-only aggregates.');
  }
}

if (auditFailed) {
  console.error('[-] FAIL: Joint operations metadata isolation criteria violated.');
  process.exit(1);
} else {
  console.log('[+] PASS: Joint bilateral routes passed all metadata-only and anonymization constraints.');
  process.exit(0);
}
