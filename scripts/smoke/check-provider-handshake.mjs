#!/usr/bin/env node
import http from 'http';

console.log('[SMOKE] Running Provider Handshake Smoke Check...');

const fedUrl = process.env.VITE_FEDERAL_API_BASE_URL || '';
const krgUrl = process.env.VITE_KRG_API_BASE_URL || '';
const jointUrl = process.env.VITE_JOINT_API_BASE_URL || '';

console.log(`[+] Current Environmental Variable State:`);
console.log(`  - VITE_FEDERAL_API_BASE_URL: "${fedUrl}"`);
console.log(`  - VITE_KRG_API_BASE_URL: "${krgUrl}"`);
console.log(`  - VITE_JOINT_API_BASE_URL: "${jointUrl}"`);

const hasPlaceholders = !fedUrl || !krgUrl || !jointUrl || 
                        fedUrl.includes('placeholder') || 
                        krgUrl.includes('placeholder') || 
                        jointUrl.includes('placeholder') ||
                        fedUrl === '' || krgUrl === '' || jointUrl === '';

if (hasPlaceholders) {
  console.log('[-] HANDSHAKE STATUS: NOT_CONFIGURED. Environment variables contain placeholders.');
  process.exit(2); // Output code 2 for NOT_CONFIGURED
}

// If variables are configured, we check readability of the actual routes
async function verifyEndpointUrl(url, path) {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(url + path);
      const req = http.get(parsedUrl.href, { timeout: 1500 }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (data.status === 'PROVIDER_NOT_CONNECTED' || data.status === 'METADATA_PROVIDER_NOT_CONNECTED') {
              resolve('PROVIDER_NOT_CONNECTED');
            } else {
              resolve('REACHABLE');
            }
          } catch {
            resolve('UNAVAILABLE');
          }
        });
      });
      req.on('error', () => {
        resolve('UNAVAILABLE');
      });
      req.on('timeout', () => {
        req.destroy();
        resolve('UNAVAILABLE');
      });
    } catch {
      resolve('UNAVAILABLE');
    }
  });
}

async function run() {
  const fedRes = await verifyEndpointUrl(fedUrl, '/api/v1/federal/health');
  const krgRes = await verifyEndpointUrl(krgUrl, '/api/v1/krg/health');
  const jointRes = await verifyEndpointUrl(jointUrl, '/api/v1/joint/health');

  if (fedRes === 'UNAVAILABLE' || krgRes === 'UNAVAILABLE' || jointRes === 'UNAVAILABLE') {
    console.error('[-] HANDSHAKE STATUS: UNAVAILABLE. Endpoint is unreachable.');
    process.exit(3); // Code 3 for UNAVAILABLE
  }

  if (fedRes === 'PROVIDER_NOT_CONNECTED' || krgRes === 'PROVIDER_NOT_CONNECTED' || jointRes === 'PROVIDER_NOT_CONNECTED') {
    console.log('[-] HANDSHAKE STATUS: PROVIDER_NOT_CONNECTED. Backends reachable, but physical databases are still isolated (NOT_CONFIGURED).');
    process.exit(4); // Code 4 for PROVIDER_NOT_CONNECTED
  }

  console.log('[+] HANDSHAKE STATUS: FULLY_OPERATIONAL_READY.');
  process.exit(0);
}

run();
