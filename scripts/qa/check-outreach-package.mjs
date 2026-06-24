#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING EXECUTIVE OUTREACH PACKAGE COMPLIANCE CHECK ---');

let passed = true;

const filesToVerify = [
  'docs/outreach/krg-dit-meeting-request.md',
  'docs/outreach/rwanga-introduction-message.md',
  'docs/outreach/strategic-partner-introduction-message.md',
  'docs/outreach/pilot-discussion-agenda.md',
  'docs/outreach/founder-verbal-pitch-script.md',
  'docs/outreach/stakeholder-faq.md',
  'docs/outreach/follow-up-email-template.md'
];

// 1. Verify existence
for (const file of filesToVerify) {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    console.log(`[+] Found outreach package component file: ${file}`);
  } else {
    console.error(`[-] ERROR: Missing required file: ${file}`);
    passed = false;
  }
}

// 2. Leak check & Forbidden patterns (No real secrets, URLs, or fake approvals/endorsements)
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
  
  if (lowerContent.includes('partnership exists') || lowerContent.includes('formally endorsed') || lowerContent.includes('fully approved') || lowerContent.includes('production ready')) {
    if (!lowerContent.includes('no replacement') && !lowerContent.includes('not ready') && !lowerContent.includes('safely to a compliant') && !lowerContent.includes('not suggest or imply')) {
       console.error(`[-] ERROR: File ${file} overclaims endorsement, partnership or production readiness.`);
       passed = false;
    }
  }
}

// 3. Founder Positioning Check in outreach
const founderPath = path.resolve('docs/outreach/founder-verbal-pitch-script.md');
if (fs.existsSync(founderPath)) {
  const content = fs.readFileSync(founderPath, 'utf8');
  if (!content.includes('Mustafa Jalal Khoshnaw')) {
    console.error('[-] ERROR: founder-verbal-pitch-script.md does not reference Mustafa Jalal Khoshnaw.');
    passed = false;
  }
  if (content.toLowerCase().includes('low-level') || content.toLowerCase().includes('programmer') || content.toLowerCase().includes('coder')) {
    console.error('[-] ERROR: founder-verbal-pitch-script.md incorrectly positions Founder as a low-level operator.');
    passed = false;
  }
}

if (passed) {
  console.log('[+] ALL EXECUTIVE OUTREACH PACKAGE COMPLIANCE CHECKS PASSED.');
  process.exit(0);
} else {
  console.error('[-] OUTREACH COMPLIANCE SCAN DETECTED FAILURE OR VIOLATION.');
  process.exit(1);
}
