import fs from 'fs';
import path from 'path';

/**
 * @file check-fiscal-settlement-policy.mjs
 * @description پشکنینی خۆکار و خێرای تەعبیر و سەیرکردنی بزوێنەری سیاسەتەکانی یەکلاییکردنەوەی بودجە لە ژێر کۆنترۆڵی فەیمانەکاندا.
 */

const filesToVerify = [
  'src/shared/revenue-settlement/FiscalSettlementTypes.ts',
  'src/shared/revenue-settlement/RevenueSharingPolicyRegistry.ts',
  'src/shared/revenue-settlement/FederalKRGSettlementPolicy.ts',
  'src/shared/revenue-settlement/SettlementCalculationEngine.ts',
  'src/shared/revenue-settlement/SettlementProofBuilder.ts',
  'src/shared/revenue-settlement/SettlementVisibilityPolicy.ts',
  'src/shared/revenue-settlement/JointSettlementReconciliation.ts',
  'src/shared/revenue-settlement/FiscalSettlementReadinessReport.ts'
];

let violationsCount = 0;
const errors = [];

function assert(condition, message) {
  if (!condition) {
    violationsCount++;
    errors.push(message);
    console.error(`❌ [VIOLATION] ${message}`);
  } else {
    console.log(`✅ [OK] ${message}`);
  }
}

console.log('=== [QA] STARTING FISCAL SETTLEMENT POLICY VERIFICATION ===\n');

// 1. Verify existence of files
for (const file of filesToVerify) {
  const exists = fs.existsSync(path.resolve(process.cwd(), file));
  assert(exists, `پرۆژە ناتوانێت دەست بە کار بکات بێ هەبوونی فایلی یەکلاییکردنەوەی: ${file}`);
}

// 2. Validate 50% Rule configuration in Registry file
const registryPath = path.resolve(process.cwd(), 'src/shared/revenue-settlement/RevenueSharingPolicyRegistry.ts');
if (fs.existsSync(registryPath)) {
  const content = fs.readFileSync(registryPath, 'utf8');
  assert(content.includes('KRG_TO_FEDERAL_REFERENCE_SHARE_50_PERCENT'), 'کلیل و ناونیشانی یاسای ٥٠٪ ناکرێت کەنار بخرێت لە فایلی تۆماری گونجاودا.');
  assert(content.includes('AGREEMENT_DEPENDENT'), 'یاسای پشکی ٥٠٪ پێویستە کەناری ڕێککەوتن بێت (AGREEMENT_DEPENDENT) نەک جێگیری ڕەقی هەمیشەیی.');
  assert(content.includes('providerRequired: true'), 'پێویستی بە مۆڵەت و دابینکەر هەیە (providerRequired) بۆ چالاککردنی داتاکان.');
}

// 3. Ensure no hardcoded raw amounts exist for calculation engine
const calcEnginePath = path.resolve(process.cwd(), 'src/shared/revenue-settlement/SettlementCalculationEngine.ts');
if (fs.existsSync(calcEnginePath)) {
  const content = fs.readFileSync(calcEnginePath, 'utf8');
  assert(content.includes('PENDING_PROVIDER_DATA'), 'بزوێنەری هەژمارکردن پێویستە باری چاوەڕوانی (PENDING_PROVIDER_DATA) بگەڕێنێتەوە ئەگەر لایەنە و داتای ڕاستەقینە پەیوەست نەبوو.');
  assert(!content.includes('total: 500000') && !content.includes('amount: 1000000'), 'بزوێنەری هەژمارکردن نابێت تێکەڵە یان ژمارەی سەرچاوەی خاوی ساختە بەکار بهێنێت.');
}

// 4. Ensure Sovereign Boundaries and isolation are maintained
const visibilityPath = path.resolve(process.cwd(), 'src/shared/revenue-settlement/SettlementVisibilityPolicy.ts');
if (fs.existsSync(visibilityPath)) {
  const content = fs.readFileSync(visibilityPath, 'utf8');
  assert(content.includes('canFederalViewRawKrgRevenue()'), 'پێویستە میتۆدی ڕاگرتنی خوێندنەوەی داتای گومرگی کەی جی بێ مۆڵەت لە فیدراڵ هەبێت.');
  assert(content.includes('canAdminBypassVisibility'), 'نابێت ئەدمینی گشتی دەسەڵاتی تێپەڕاندنی سەروەری زانیاری بینینی داتای خاوی کەی جی هەبێت.');
}

// 5. OpenAPI endpoints audit
const openapiFiles = [
  'docs/api-contracts/krg-openapi.yaml',
  'docs/api-contracts/federal-openapi.yaml',
  'docs/api-contracts/joint-openapi.yaml'
];

for (const oFile of openapiFiles) {
  const oPath = path.resolve(process.cwd(), oFile);
  if (fs.existsSync(oPath)) {
    const oContent = fs.readFileSync(oPath, 'utf8');
    assert(oContent.includes('/settlement/readiness') || oContent.includes('/settlement/reconciliation'), `مۆدێلی یەکلاییکردنەوە لە ڕاپۆرتی بڵاوکراوە لە ناو ${oFile} کارا نەکراوە.`);
  }
}

console.log('\n=============================================================');
if (violationsCount > 0) {
  console.error(`❌ [FAIL] ${violationsCount} پێشێلکاری لە یاساکانی سەروەری گومرگی و دارایی دۆزرایەوە.`);
  process.exit(1);
} else {
  console.log('✅ [PASS] هەموو پشکنینەکان بە سەرکەوتوویی تێپەڕین بەبێ هیچ پێشێلکارییەک.');
  process.exit(0);
}
