#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('[SMOKE] Running Frontend Build Smoke Check...');

const distHtml = path.resolve('dist/index.html');
if (fs.existsSync(distHtml)) {
  console.log('[+] PASS: Frontend production build output found (dist/index.html).');
  process.exit(0);
} else {
  console.error('[-] FAIL: Frontend production build output missing. Please run "npm run build" first.');
  process.exit(1);
}
