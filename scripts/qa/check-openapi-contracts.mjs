#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const API_CONTRACTS_DIR = path.resolve('docs/api-contracts');
const FILES = {
  federal: path.join(API_CONTRACTS_DIR, 'federal-openapi.yaml'),
  krg: path.join(API_CONTRACTS_DIR, 'krg-openapi.yaml'),
  joint: path.join(API_CONTRACTS_DIR, 'joint-openapi.yaml'),
};

console.log('--- STARTING OPENAPI CONTRACT BOUNDARY COMPLIANCE SEARCH ---');

let passed = true;

const forbiddenKeywords = ['secret', 'token', 'key', 'password', 'private_key', 'authorization_bearer'];
const forbiddenHosts = ['.gov.iq', 'http://172.', 'http://10.', 'http://192.168.', 'https://']; // only local placeholders

// 1. Files existence check
for (const [key, filepath] of Object.entries(FILES)) {
  if (!fs.existsSync(filepath)) {
    console.error(`[-] CRITICAL ERROR: OpenAPI spec file missing: ${filepath}`);
    passed = false;
  } else {
    console.log(`[+] SUCCESS: found spec file for ${key}`);
  }
}

if (!passed) {
  process.exit(1);
}

// 2. Validate Federal Spec
const federalContent = fs.readFileSync(FILES.federal, 'utf-8');
if (federalContent.includes('krg-only') || federalContent.includes('Erbil') || federalContent.includes('Kurdistan')) {
  console.warn('[!] WARNING: Federal spec file mentions Kurdistan/KRG references. Audit cross-exposure risk.');
}
if (federalContent.includes('raw_revenue_krg') || federalContent.includes('/krg/')) {
  console.error('[-] JURISDICTION VIOLATION: Federal spec contains explicit KRG routes/data references!');
  passed = false;
}

// 3. Validate KRG Spec
const krgContent = fs.readFileSync(FILES.krg, 'utf-8');
if (krgContent.includes('federal-only') || krgContent.includes('Baghdad')) {
  console.warn('[!] WARNING: KRG spec file mentions Baghdad/federal references. Audit cross-exposure risk.');
}
if (krgContent.includes('raw_revenue_fed') || krgContent.includes('/federal/')) {
  console.error('[-] JURISDICTION VIOLATION: KRG spec contains explicit Federal routes/data references!');
  passed = false;
}

// 4. Validate Joint Spec: metadata-only
const jointContent = fs.readFileSync(FILES.joint, 'utf-8');
const jointForbiddenTerms = [
  'raw_revenue', 'raw_customs', 'raw_identity', 'raw_workforce', 'raw_intelligence', 'raw_security', 
  'biometric_data', 'personal_data', 'passenger_details', 'taxpayer_identities', 'passport_numbers'
];

for (const term of jointForbiddenTerms) {
  if (jointContent.toLowerCase().includes(term.toLowerCase())) {
    console.error(`[-] RECONCILIATION DATA LEAK: Joint spec contains reference to raw or sensitive data payload term: "${term}"`);
    passed = false;
  }
}

// 5. Leak Checks for Secrets and Hosts across all files:
for (const [key, filepath] of Object.entries(FILES)) {
  const content = fs.readFileSync(filepath, 'utf-8');
  
  // Secrets
  for (const keyword of forbiddenKeywords) {
    if (content.toLowerCase().includes(`api_${keyword}`) || content.toLowerCase().includes(`secret_${keyword}`)) {
      console.error(`[-] TECHNICAL RISK: Spec file [${key}] contains risk keyword: "${keyword}"`);
      passed = false;
    }
  }

  // Real URLs or non-placeholder hosts
  for (const host of forbiddenHosts) {
    if (content.toLowerCase().includes(host) && !content.toLowerCase().includes('http://placeholder') && !content.toLowerCase().includes('http://localhost')) {
      console.error(`[-] LANDSCAPE RISK: Spec file [${key}] contains explicit external or real host address query: "${host}"`);
      passed = false;
    }
  }
}

if (passed) {
  console.log('[+] ALL OPENAPI CONTRACT COMPLIANCE CHECKS PASSED SUCCESSFULLY.');
  process.exit(0);
} else {
  console.error('[-] OPENAPI CONTRACT COMPLIANCE CHECKS FAILED.');
  process.exit(1);
}
