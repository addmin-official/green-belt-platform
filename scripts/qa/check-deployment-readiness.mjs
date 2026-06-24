#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING PLATFORM DEPLOYMENT READINESS QA ---');

let passed = true;

// 1. Validate .env.example
const envPath = path.resolve('.env.example');
if (!fs.existsSync(envPath)) {
  console.error('[-] ERROR: .env.example file does not exist!');
  passed = false;
} else {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const requiredKeys = [
    'VITE_FEDERAL_API_BASE_URL',
    'VITE_KRG_API_BASE_URL',
    'VITE_JOINT_API_BASE_URL',
    'VITE_PROVIDER_MODE',
    'VITE_OPERATIONAL_MODE',
    'VITE_ENABLE_DEMO_MODE',
    'VITE_ENABLE_TRAINING_MODE',
  ];

  for (const key of requiredKeys) {
    if (!envContent.includes(key)) {
      console.error(`[-] ERROR: .env.example is missing key placeholder: "${key}"`);
      passed = false;
    } else {
      console.log(`[+] SUCCESS: Found .env.example placeholder: "${key}"`);
    }
  }

  // Check no real government URLs or secrets inside env.example
  const scanContent = envContent.toLowerCase();
  if (scanContent.includes('.gov.iq') && !scanContent.includes('placeholder')) {
    console.error('[-] JURISDICTION RISK: Real government URL found in .env.example!');
    passed = false;
  }
}

// 2. Check OpenAPI files exist
const openapiFiles = [
  'docs/api-contracts/federal-openapi.yaml',
  'docs/api-contracts/krg-openapi.yaml',
  'docs/api-contracts/joint-openapi.yaml'
];

for (const filepath of openapiFiles) {
  const fullPath = path.resolve(filepath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[-] ERROR: OpenAPI Spec file is missing: ${filepath}`);
    passed = false;
  } else {
    console.log(`[+] SUCCESS: Found OpenAPI Spec: ${filepath}`);
  }
}

// 3. Confirm QA scripts exist
const qaScripts = [
  'scripts/qa/check-api-contracts.mjs',
  'scripts/qa/check-demo-isolation.mjs',
  'scripts/qa/check-hardcoded-success.mjs',
  'scripts/qa/check-localization-coverage.mjs',
  'scripts/qa/check-mock-dependencies.mjs',
  'scripts/qa/check-rtl-typography.mjs',
  'scripts/qa/check-sovereign-boundaries.mjs',
  'scripts/qa/run-production-gate.mjs',
  'scripts/qa/check-openapi-contracts.mjs'
];

for (const script of qaScripts) {
  const fullPath = path.resolve(script);
  if (!fs.existsSync(fullPath)) {
    console.error(`[-] ERROR: Critical QA script is missing: ${script}`);
    passed = false;
  } else {
    console.log(`[+] SUCCESS: Checked QA script: ${script}`);
  }
}

// 4. Validate package.json scripts
const pkgPath = path.resolve('package.json');
if (!fs.existsSync(pkgPath)) {
  console.error('[-] ERROR: package.json missing!');
  passed = false;
} else {
  const pkgContent = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const requiredScripts = ['build', 'qa:production-gate', 'qa:api-contracts', 'qa:openapi-contracts'];
  
  for (const script of requiredScripts) {
    if (!pkgContent.scripts || !pkgContent.scripts[script]) {
      console.error(`[-] ERROR: package.json is missing script: "${script}"`);
      passed = false;
    } else {
      console.log(`[+] SUCCESS: package.json contains script: "${script}"`);
    }
  }
}

if (passed) {
  console.log('[+] ALL PLATFORM DEPLOYMENT READINESS CHECKS PASSED.');
  process.exit(0);
} else {
  console.error('[-] ENVIRONMENT READINESS AUDIT ENCOUNTERED ERRORS.');
  process.exit(1);
}
