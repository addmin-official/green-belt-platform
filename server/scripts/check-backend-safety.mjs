#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING BACKEND SECURITY CODE AUDIT ---');

let passed = true;

// 1. Files validation
const criticalFiles = [
  'src/index.ts',
  'src/config/env.ts',
  'src/types/provider.ts',
  'src/security/jurisdictionGuard.ts',
  'src/security/auditLogger.ts',
  'src/middleware/requestContext.ts',
  'src/middleware/errorHandler.ts',
  'src/zones/federal/routes.ts',
  'src/zones/krg/routes.ts',
  'src/zones/joint/routes.ts'
];

for (const f of criticalFiles) {
  const fullPath = path.join('src', f.replace('src/', ''));
  if (!fs.existsSync(fullPath)) {
    console.error(`[-] ERROR: Missing critical file: ${f}`);
    passed = false;
  } else {
    console.log(`[+] SUCCESS: Found critical file: ${f}`);
  }
}

// 2. Scan routes for mock data or fake record creation
const routeFiles = [
  'src/zones/federal/routes.ts',
  'src/zones/krg/routes.ts',
  'src/zones/joint/routes.ts'
];

for (const rf of routeFiles) {
  const fullPath = path.resolve(rf);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Check no mock success data
    if (content.includes('fake') || content.includes('mockPerson') || content.includes('mockRevenue') || content.includes('dummy_records')) {
      console.error(`[-] ERROR: Found potential mock data pattern inside ${rf}`);
      passed = false;
    }
    
    // Enforce metadata provider not connected message for Joint
    if (rf.includes('joint') && !content.includes('METADATA_PROVIDER_NOT_CONNECTED')) {
      console.error(`[-] ERROR: Joint route handler does not properly enforce METADATA_PROVIDER_NOT_CONNECTED status.`);
      passed = false;
    }
  }
}

// 3. Scan security guards & audit loggers
const guardPath = path.resolve('src/security/jurisdictionGuard.ts');
if (fs.existsSync(guardPath)) {
  const content = fs.readFileSync(guardPath, 'utf-8');
  // Confirm presence of strict forbidden joint payload keys
  const expectedKeys = ['rawRevenue', 'rawCustoms', 'rawIdentity', 'rawWorkforce', 'rawIntelligence', 'rawSecurity'];
  for (const k of expectedKeys) {
    if (!content.includes(k)) {
      console.error(`[-] ERROR: jurisdictionGuard does not specify protection for joint key: ${k}`);
      passed = false;
    }
  }
}

const auditPath = path.resolve('src/security/auditLogger.ts');
if (fs.existsSync(auditPath)) {
  const content = fs.readFileSync(auditPath, 'utf-8');
  if (content.includes('req.body') || content.includes('payload')) {
    console.error(`[-] SECURITY WARNING: Audit logger must not serialize entire request payloads.`);
    passed = false;
  }
}

if (passed) {
  console.log('[+] ALL BACKEND SCAFFOLD SAFETY AUDITS COMPLIED.');
  process.exit(0);
} else {
  console.error('[-] BACKEND SCAFFOLD ENCOUNTERED NON-COMPLIANCE ISSUES.');
  process.exit(1);
}
