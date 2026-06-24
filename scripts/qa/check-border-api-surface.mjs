#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * @file check-border-api-surface.mjs
 * @description QA validation script ensuring that the active API routes and specifications
 * are restricted representing only border, customs, trade, and border-settlement operations.
 */

console.log('--- STARTING BORDER-ONLY API SURFACE QA VALIDATION ---');

let passed = true;
const rootDir = process.cwd();

function assert(condition, message) {
  if (!condition) {
    console.error(`[-] VIOLATION: ${message}`);
    passed = false;
  } else {
    console.log(`[+] SUCCESS: ${message}`);
  }
}

// 1. Verify index.ts is the active production backend entrypoint
const packageJsonPath = path.join(rootDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  // Ensure we document backend structure
  assert(fs.existsSync(path.join(rootDir, 'server/src/index.ts')), 'Production backend entrypoint exists at server/src/index.ts');
}

// 2. Validate readiness response details inside server/src/health/readinessRoutes.ts
const readinessRoutesPath = path.join(rootDir, 'server/src/health/readinessRoutes.ts');
if (fs.existsSync(readinessRoutesPath)) {
  const readinessContent = fs.readFileSync(readinessRoutesPath, 'utf-8');
  assert(!readinessContent.includes("status: 'READY'") && !readinessContent.includes('status: "READY"'), 'Readiness does not return plain READY status');
  assert(readinessContent.includes('CONDITIONALLY_READY'), 'Readiness correctly reports CONDITIONALLY_READY');
  assert(readinessContent.includes('BORDER_API_SURFACE_VERIFIED_PROVIDERS_REQUIRED'), 'Readiness has verified providers-required decision indicator');
} else {
  assert(false, 'Missing readinessRoutes.ts file');
}

// 3. Ensure general fiscal settlement routes are not mounted or active
const federalRoutesPath = path.join(rootDir, 'server/src/zones/federal/routes.ts');
if (fs.existsSync(federalRoutesPath)) {
  const content = fs.readFileSync(federalRoutesPath, 'utf-8');
  assert(!content.includes("settlementRoutes from './settlementRoutes"), 'Federal settlement routes import is disabled or removed');
  assert(!content.includes("router.use('/', settlementRoutes)"), 'Federal settlement routes mount is inactive');
  assert(!content.includes('/revenue/ledger') && !content.includes('/identity/records'), 'Out-of-scope broad paths removed from active fallback routing');
}

const krgRoutesPath = path.join(rootDir, 'server/src/zones/krg/routes.ts');
if (fs.existsSync(krgRoutesPath)) {
  const content = fs.readFileSync(krgRoutesPath, 'utf-8');
  assert(!content.includes("settlementRoutes from './settlementRoutes"), 'KRG settlement routes import is disabled or removed');
  assert(!content.includes("router.use('/', settlementRoutes)"), 'KRG settlement routes mount is inactive');
}

const jointRoutesPath = path.join(rootDir, 'server/src/zones/joint/routes.ts');
if (fs.existsSync(jointRoutesPath)) {
  const content = fs.readFileSync(jointRoutesPath, 'utf-8');
  assert(!content.includes("settlementRoutes from './settlementRoutes"), 'Joint settlement reconciliation mount is disabled');
}

// 4. Ensure joint-openapi.yaml does not expose general/raw fiscal settlement endpoints
const openapiPath = path.join(rootDir, 'docs/api-contracts/joint-openapi.yaml');
if (fs.existsSync(openapiPath)) {
  const content = fs.readFileSync(openapiPath, 'utf-8');
  // Should have marked general settlement reconciliation deprecated or removed it
  assert(content.includes('deprecated: true') || !content.includes('/joint/settlement/reconciliation:\n    get:\n      summary: Joint fiscal settlement reconciliation'), 'Joint general fiscal reconciliation endpoint is marked deprecated or pruned');
}

// 5. Ensure root server.ts has been quarantined with demo warnings
const rootServerPath = path.join(rootDir, 'server.ts');
if (fs.existsSync(rootServerPath)) {
  const content = fs.readFileSync(rootServerPath, 'utf-8');
  assert(content.includes('DEMO_ONLY_SERVER'), 'Root server.ts contains DEMO_ONLY_SERVER annotation');
  assert(content.includes('NOT_PRODUCTION_ENTRYPOINT'), 'Root server.ts contains NOT_PRODUCTION_ENTRYPOINT quarantine marker');
}

if (passed) {
  console.log('[+] BORDER-ONLY API SURFACE VERIFICATION COMPLETED SUCCESSFULLY WITH 0 VIOLATIONS.');
  process.exit(0);
} else {
  console.error('[-] VIOLATIONS DETECTED IN BORDER API SURFACE SPECIFICATION.');
  process.exit(1);
}
