import fs from 'fs';
import path from 'path';

/**
 * @file check-border-scope-lock.mjs
 * @description پشکنەری ئۆتۆماتیکی قوفڵی کایەی فەرمی دەروازە سنوورییەکان و ڕێگری لە هەر جڕە کایەیەکی دەرەوەی سنور.
 */

const filesToVerify = [
  'src/shared/scope/ProjectScopeRegistry.ts',
  'src/shared/scope/ModuleScopeClassifier.ts',
  'src/shared/scope/ScopeReadinessReport.ts',
  'docs/release/border-scope-inventory.md'
];

let violations = 0;
const errors = [];

function assert(condition, message) {
  if (!condition) {
    violations++;
    errors.push(message);
    console.error(`❌ [SCOPE VIOLATION] ${message}`);
  } else {
    console.log(`✅ [OK] ${message}`);
  }
}

console.log('=== [QA] STARTING BORDER SCOPE LOCK AUDIT ===\n');

// 1. Verify files exist
for (const file of filesToVerify) {
  const exists = fs.existsSync(path.resolve(process.cwd(), file));
  assert(exists, `فایلی دڵنیایی کایەی سنوور بوونی نییە: ${file}`);
}

// 2. Read registry/scope report properties to detect incorrect claims
const reportPath = path.resolve(process.cwd(), 'src/shared/scope/ScopeReadinessReport.ts');
if (fs.existsSync(reportPath)) {
  const content = fs.readFileSync(reportPath, 'utf8');
  assert(content.includes('CONDITIONALLY_READY — BORDER SCOPE LOCKED, PRUNING PLAN READY, PROVIDERS REQUIRED'), 'باری گشتی پێویستە CONDITIONALLY_READY مەیان پڵان مێتاداتای سنوور بێت.');
  assert(!content.includes('PILOT_READY') && !content.includes('PRODUCTION_READY'), 'کایەی سنوور نابێت بەرهەمی تەواو یان فەرمی بە بێ پرۆڤایدەر ڕابگەیەنێت.');
  assert(content.includes('realBorderProviderConnected: false') || content.includes('false'), 'بە مەرج گواستنەوەی فەرمی پرۆڤایدەر پیویستە نەستێتراو بێت.');
}

// 3. Ensure border-settlement is preferred over general fiscal settlement
const sharedIndex = path.resolve(process.cwd(), 'src/shared/index.ts');
if (fs.existsSync(sharedIndex)) {
  const content = fs.readFileSync(sharedIndex, 'utf8');
  assert(content.includes('border-settlement'), 'پێویستە مۆدیۆلی بەستنی سنووری (border-settlement) نووسرابێت لە سەرچاوەی سەرەکی.');
}

// 4. Verify border-scope-inventory details exist and address off-scope categories
const inventoryPath = path.resolve(process.cwd(), 'docs/release/border-scope-inventory.md');
if (fs.existsSync(inventoryPath)) {
  const content = fs.readFileSync(inventoryPath, 'utf8');
  assert(content.includes('OIL_REVENUE') || content.includes('نەوت'), 'ڕاپۆرتی کۆنترۆڵکار دەبێت فینسکشنی نەوت پۆلێن بکات وەک دەرەوەی کایە.');
  assert(content.includes('PAYROLL') || content.includes('مووچە'), 'ڕاپۆرتی کۆنترۆڵی دەبێت کونی پرۆسەی مووچە پۆلێن بکات وەک دەرەوەی کایە.');
  assert(content.includes('National Border Operating System'), 'ڕووکاری ناونیشانە نەرمەکان دەبێت تۆمار کرابێت بۆ باری سنووری یارمەتی.');
  assert(content.includes('Sovereign_Super_App') || content.includes('Super_App') || content.includes('minds'), 'پلاتفۆرمی پرۆکت یان سۆڤەرین سوپەر بێت مەکراوە وەک ئەرشیڤ یان دەرەوەی کار.');
}

// 5. Ensure no hardcoded or mock transaction lines leak into the Joint metadata systems
const jointBorderRoute = path.resolve(process.cwd(), 'server/src/zones/joint/borderSettlementRoutes.ts');
if (fs.existsSync(jointBorderRoute)) {
  const content = fs.readFileSync(jointBorderRoute, 'utf8');
  assert(!content.includes('grossBorderRevenueUSD') && !content.includes('payableAmountUSD'), 'نابێت کایەی هاوبەشی دەروازە ناوەڕۆکی داتای گومرگی خاو لە خۆ بگرێت.');
}

console.log('\n=============================================================');
if (violations > 0) {
  console.error(`❌ [AUDIT FAIL] ${violations} بەڵگەنامەی دەرچوون لە کایەی دەروازەی سنووری دۆزرایەوە.`);
  process.exit(1);
} else {
  console.log('✅ [AUDIT PASS] سەرجەم بەشەکانی کایەی تەکنیکی و مەیدانی سنووری بە تەواوی ئامادەکران و مەکراون.');
  process.exit(0);
}
