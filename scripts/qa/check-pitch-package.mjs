#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING EXECUTIVE PITCH & PARTNERSHIP PACKAGE CHECK ---');

let passed = true;

const filesToVerify = [
  'docs/pitch/executive-one-page-brief.md',
  'docs/pitch/krg-partnership-proposal.md',
  'docs/pitch/rwanga-foundation-introduction-brief.md',
  'docs/pitch/pilot-commercial-model.md',
  'docs/pitch/stakeholder-demo-script.md',
  'docs/pitch/risk-and-trust-positioning.md',
  'docs/pitch/founder-positioning-note.md'
];

// 1. Verify existence
for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    console.log(`[+] Found pitch package component file: ${file}`);
  } else {
    console.error(`[-] ERROR: Missing required file: ${file}`);
    passed = false;
  }
}

// 2. Leak check & Forbidden patterns (No real secrets, URLs, or client IDs, no overclaiming readiness)
const forbiddenRegexes = [
  /krg\.gov\.iq/i,
  /client_secret_xyz/i,
  /super_secret/i,
  /admin_password/i,
  /secret_key/i,
  /john smith/i,
  /jane doe/i,
  /hawler goods/i,
  /slemani traders/i,
  /erbil oil/i
];

for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf8');
  for (const regex of forbiddenRegexes) {
    if (regex.test(content)) {
      console.error(`[-] ERROR: Forbidden pattern or leak detected matching ${regex} in ${file}`);
      passed = false;
    }
  }

  // Check against fake ready/approved declarations
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('partnership exists') || lowerContent.includes('formally endorsed by rwanga') || lowerContent.includes('rwanga has approved')) {
    console.error(`[-] ERROR: File ${file} overclaims endorsement or partnership state.`);
    passed = false;
  }
}

// 3. Founder Positioning Check (Must reference Mustafa Jalal Khoshnaw correctly as strategic owner)
const founderPath = path.resolve('docs/pitch/founder-positioning-note.md');
if (fs.existsSync(founderPath)) {
  const content = fs.readFileSync(founderPath, 'utf8');
  if (!content.includes('Mustafa Jalal Khoshnaw')) {
    console.error('[-] ERROR: founder-positioning-note.md does not reference Mustafa Jalal Khoshnaw.');
    passed = false;
  }
  if (content.toLowerCase().includes('low-level') || content.toLowerCase().includes('programmer') || content.toLowerCase().includes('coder')) {
    console.error('[-] ERROR: founder-positioning-note.md incorrectly positions Founder as a low-level operator.');
    passed = false;
  }
}

// 4. Commercial Model Presence & Validation
const commercialPath = path.resolve('docs/pitch/pilot-commercial-model.md');
if (fs.existsSync(commercialPath)) {
  const content = fs.readFileSync(commercialPath, 'utf8');
  if (!content.includes('Option A') || !content.includes('Option B') || !content.includes('Option C') || !content.includes('Option D')) {
    console.error('[-] ERROR: pilot-commercial-model.md is missing the explicit A/B/C/D option schema.');
    passed = false;
  }
}

if (passed) {
  console.log('[+] ALL EXECUTIVE PITCH & PARTNERSHIP PACKAGE COMPLIANCE CHECKS PASSED.');
  process.exit(0);
} else {
  console.error('[-] PITCH COMPLIANCE SCAN DETECTED FAILURE OR VIOLATION.');
  process.exit(1);
}
