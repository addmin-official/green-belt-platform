#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';

console.log('====================================================');
console.log('      IRAQ DIGITAL GATEWAY - LOCAL SMOKE SUITE      ');
console.log('====================================================');

const tests = [
  { name: 'Frontend Asset Compile', script: 'scripts/smoke/check-frontend-build.mjs' },
  { name: 'Backend Asset Compile', script: 'scripts/smoke/check-backend-build.mjs' },
  { name: 'Backend Health Verification', script: 'scripts/smoke/check-backend-health.mjs' },
  { name: 'Provider Handshake Routing', script: 'scripts/smoke/check-provider-handshake.mjs' },
  { name: 'Joint Metadata-Only Isolation', script: 'scripts/smoke/check-joint-metadata-only.mjs' }
];

let failedCount = 0;
let resultsSummary = [];

for (const t of tests) {
  console.log(`\n[SMOKE_RUN] -> Executing: ${t.name}...`);
  try {
    execSync(`node ${t.script}`, { stdio: 'inherit' });
    resultsSummary.push({ name: t.name, status: 'PASS' });
  } catch (err) {
    // Check specific exit codes for handshakes
    const code = err.status;
    let desc = 'FAIL';
    if (t.name === 'Backend Health Verification' && code === 2) {
      desc = 'BACKEND_UNAVAILABLE';
    } else if (t.name === 'Provider Handshake Routing') {
      if (code === 2) desc = 'NOT_CONFIGURED';
      else if (code === 3) desc = 'UNAVAILABLE';
      else if (code === 4) desc = 'PROVIDER_NOT_CONNECTED';
    }
    
    resultsSummary.push({ name: t.name, status: desc });
    if (desc === 'FAIL') {
      failedCount++;
    }
  }
}

console.log('\n====================================================');
console.log('               SMOKE SUITE RUN SUMMARY              ');
console.log('====================================================');
for (const res of resultsSummary) {
  console.log(` - ${res.name.padEnd(30)}: [${res.status}]`);
}
console.log('====================================================');

if (failedCount > 0) {
  console.error(`[-] Smoke suite failed with ${failedCount} severe regression issue(s).`);
  process.exit(1);
} else {
  console.log('[+] Smoke suite finished with no blocker regressions.');
  process.exit(0);
}
