#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('[SMOKE] Running Backend Build Smoke Check...');

const distJs = path.resolve('server/dist/index.js');
if (fs.existsSync(distJs)) {
  console.log('[+] PASS: Backend production build output found (server/dist/index.js).');
  process.exit(0);
} else {
  console.error('[-] FAIL: Backend production build output missing. Please run "npm run backend:build" first.');
  process.exit(1);
}
