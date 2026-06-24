#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING FRONTEND ↔ PILOT BACKEND WIRING QA AUDIT ---');

let passed = true;

const filesToCheck = [
  'src/infrastructure/http/PilotBackendClient.ts',
  'src/infrastructure/providers/FederalBackendProvider.ts',
  'src/infrastructure/providers/KRGBackendProvider.ts',
  'src/infrastructure/providers/JointMetadataBackendProvider.ts'
];

// 1. Verify files exist
for (const val of filesToCheck) {
  const full = path.resolve(val);
  if (!fs.existsSync(full)) {
    console.error(`[-] ERROR: Missing wiring file: ${val}`);
    passed = false;
  } else {
    console.log(`[+] SUCCESS: Found wiring file: ${val}`);
  }
}

// 2. Verify ProductionProviderRegistry.ts imports and registers these
const registryPath = path.resolve('src/infrastructure/providers/ProductionProviderRegistry.ts');
if (fs.existsSync(registryPath)) {
  const registryContent = fs.readFileSync(registryPath, 'utf-8');
  const requiredKeywords = [
    'FederalBackendProvider',
    'KRGBackendProvider',
    'JointMetadataBackendProvider',
    'getFederalBackendProvider',
    'getKRGBackendProvider',
    'getJointMetadataBackendProvider'
  ];

  for (const kw of requiredKeywords) {
    if (!registryContent.includes(kw)) {
      console.error(`[-] ERROR: ProductionProviderRegistry is missing integration for: ${kw}`);
      passed = false;
    } else {
      console.log(`[+] SUCCESS: ProductionProviderRegistry successfully references: ${kw}`);
    }
  }
} else {
  console.error(`[-] ERROR: ProductionProviderRegistry.ts does not exist!`);
  passed = false;
}

// 3. Scan providers for bad imports (demo, mocks, mock data files, etc.)
for (const file of filesToCheck) {
  const full = path.resolve(file);
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf-8');

    // Rule: No demo imports
    if (content.includes('demo/') || content.includes('/demo')) {
      console.error(`[-] VIOLATION: File ${file} imports or references 'demo' module! Operational mode must be clean.`);
      passed = false;
    }

    // Rule: No mock data or mock imports
    if (content.toLowerCase().includes('mock') && !content.toLowerCase().includes('mocktype') && !content.toLowerCase().includes('mock_url')) {
      console.error(`[-] VIOLATION: File ${file} contains references to 'mock'. Mock structures are forbidden in operational mode.`);
      passed = false;
    }

    // Rule: No secrets, real endpoints or private URLs
    if (content.includes('http') && !content.includes('${base}') && !content.includes('localhost') && !content.includes('placeholder')) {
      if (content.includes('.gov.iq') || content.includes('http://') || content.includes('https://')) {
         console.error(`[-] RISK: File ${file} contains potential hardcoded real services URL! Only use placeholders.`);
         passed = false;
      }
    }
  }
}

// 4. Verify Joint Metadata Spec guarantees
const jointPath = path.resolve('src/infrastructure/providers/JointMetadataBackendProvider.ts');
if (fs.existsSync(jointPath)) {
  const jointContent = fs.readFileSync(jointPath, 'utf-8');
  // Must return only METADATA aggregates or reconciliation. Must never scan raw revenue/customs
  const forbiddenRawStrings = ['raw_revenue', 'raw_customs', 'raw_identity', 'raw_workforce'];
  for (const forbidden of forbiddenRawStrings) {
    if (jointContent.includes(forbidden)) {
      console.error(`[-] SOVEREIGNTY VIOLATION: JointMetadataBackendProvider references raw sovereign parameter: "${forbidden}"!`);
      passed = false;
    }
  }
  console.log('[+] SUCCESS: JointMetadataBackendProvider successfully guarantees sovereign isolation.');
}

if (passed) {
  console.log('[+] ALL PILOT BACKEND WIRING QA CHECKS PASSED SUCCESSFULLY.');
  process.exit(0);
} else {
  console.error('[-] PILOT BACKEND WIRING QA AUDIT FAILED.');
  process.exit(1);
}
