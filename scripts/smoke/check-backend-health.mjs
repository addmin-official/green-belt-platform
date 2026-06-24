#!/usr/bin/env node
import http from 'http';

console.log('[SMOKE] Running Backend Health and Readiness Smoke Check...');

const PORT = process.env.PORT || 8787;
const BASE_URL = `http://localhost:${PORT}`;

const targetEndpoints = [
  { name: 'Root Health', path: '/health' },
  { name: 'Root Readiness', path: '/readiness' },
  { name: 'Federal Health', path: '/api/v1/federal/health' },
  { name: 'Federal Readiness', path: '/api/v1/federal/readiness' },
  { name: 'KRG Health', path: '/api/v1/krg/health' },
  { name: 'KRG Readiness', path: '/api/v1/krg/readiness' },
  { name: 'Joint Health', path: '/api/v1/joint/health' },
  { name: 'Joint Readiness', path: '/api/v1/joint/readiness' }
];

async function pingEndpoint(endpoint) {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL + endpoint.path, { timeout: 1500 }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ ok: res.statusCode === 200, status: res.statusCode, data: parsed });
        } catch {
          resolve({ ok: res.statusCode === 200, status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => {
      resolve({ error: err.code || 'UNKNOWN_ERROR' });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ error: 'TIMEOUT' });
    });
  });
}

async function run() {
  let anyError = false;
  let unavailable = false;

  console.log(`[+] Attempting to ping local pilot backend scaffold at: ${BASE_URL}...`);

  for (const ep of targetEndpoints) {
    const result = await pingEndpoint(ep);
    if (result.error) {
      console.warn(`[-] Ping failed for ${ep.name} (${ep.path}): ${result.error}`);
      if (result.error === 'ECONNREFUSED' || result.error === 'TIMEOUT') {
        unavailable = true;
      }
      anyError = true;
    } else {
      console.log(`[+] Ping component: ${ep.name} -> HTTP ${result.status} (${JSON.stringify(result.data || result.raw)})`);
    }
  }

  if (unavailable) {
    console.error('[-] STATUS CODE: BACKEND_UNAVAILABLE. Please ensure the pilot server on port 8787 is running.');
    process.exit(2); // Exit with a specific state code to indicate unavailable
  }

  if (anyError) {
    console.error('[-] FAIL: Health/readiness checks returned offline or failed statuses.');
    process.exit(1);
  }

  console.log('[+] PASS: All isolated backend readiness/health gates responded perfectly.');
  process.exit(0);
}

run();
