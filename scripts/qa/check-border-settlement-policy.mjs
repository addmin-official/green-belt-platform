import fs from 'fs';
import path from 'path';

/**
 * @file check-border-settlement-policy.mjs
 * @description Automatic boundary, visibility, and scope auditor validating the border settlement layer.
 */

const filesToVerify = [
  'src/shared/border-settlement/BorderSettlementTypes.ts',
  'src/shared/border-settlement/BorderRevenuePolicyRegistry.ts',
  'src/shared/border-settlement/FederalKRGBorderRevenuePolicy.ts',
  'src/shared/border-settlement/BorderRevenueCalculationEngine.ts',
  'src/shared/border-settlement/BorderSettlementProofBuilder.ts',
  'src/shared/border-settlement/BorderSettlementVisibilityPolicy.ts',
  'src/shared/border-settlement/JointBorderReconciliationEngine.ts',
  'src/shared/border-settlement/BorderSettlementReadinessReport.ts'
];

let violations = 0;
const errors = [];

function assert(condition, message) {
  if (!condition) {
    violations++;
    errors.push(message);
    console.error(`❌ [VIOLATION] ${message}`);
  } else {
    console.log(`✅ [OK] ${message}`);
  }
}

console.log('=== [QA] STARTING BORDER REVENUE SETTLEMENT AUDIT ===\n');

// 1. Verify file existences
for (const file of filesToVerify) {
  const exists = fs.existsSync(path.resolve(process.cwd(), file));
  assert(exists, `فایلی بنەڕەتی پاراستنی سنوور بوونی نییە: ${file}`);
}

// 2. Validate registry parameters & 50% rule naming
const registryPath = path.resolve(process.cwd(), 'src/shared/border-settlement/BorderRevenuePolicyRegistry.ts');
if (fs.existsSync(registryPath)) {
  const content = fs.readFileSync(registryPath, 'utf8');
  assert(content.includes('KRG_TO_FEDERAL_BORDER_REVENUE_50_PERCENT'), 'ڕێسای ٥٠٪ گومرگی دەبێت بە فۆرمی KRG_TO_FEDERAL_BORDER_REVENUE_50_PERCENT تۆمار بکرێت.');
  assert(content.includes('AGREEMENT_DEFINED_BORDER_REVENUE') || content.includes('CUSTOMS_DUTIES'), 'ڕێسای ٥٠٪ دەبێت تایبەت بێت بە ماتیۆدی گومرگ یان دەروازە سنوورییەکان.');
  
  // Exclusivity Checks
  assert(!content.includes('GENERAL_REVENUE'), 'ناکرێت داهاتی ناوخۆیی یان گشتی تێکەڵ بە سیستمەکە بکرێت.');
  assert(!content.includes('OIL_REVENUE'), 'نابێت ماسیفەکانی نەوت جێگیر بکرێت لە مۆدیۆلی بەستنی سنوورەکان.');
  assert(!content.includes('PAYROLL') && !content.includes('SALARY'), 'هاوکۆلکەی مووچە یان باخی مووچە بە تەواوی دەرەوەی کارن لە کایەی دەروازەکان.');
}

// 3. Check Calculation Engine handles unconfigured providers safely without hardcoding
const enginePath = path.resolve(process.cwd(), 'src/shared/border-settlement/BorderRevenueCalculationEngine.ts');
if (fs.existsSync(enginePath)) {
  const content = fs.readFileSync(enginePath, 'utf8');
  assert(content.includes('REAL_BORDER_REVENUE_PROVIDER_REQUIRED'), 'بزوێنەری بیرکاری دەبێت پەیامی پێویستبوونی دابینکاری دەروازە بگەڕێنێتەوە.');
  assert(content.includes('status: \'PENDING_PROVIDER_DATA\''), 'بۆ داتای نەنێردراو، باری کار دەبێت بچێتە باری PENDING_PROVIDER_DATA.');
  assert(!content.includes('1000000') && !content.includes('500000'), 'نابێت ژمارەی جێگیری ساختە بۆ داهاتی گومرکی بەکار بێت.');
}

// 4. Verify Visibility Rules and No Admin Bypass
const visibilityPath = path.resolve(process.cwd(), 'src/shared/border-settlement/BorderSettlementVisibilityPolicy.ts');
if (fs.existsSync(visibilityPath)) {
  const content = fs.readFileSync(visibilityPath, 'utf8');
  assert(content.includes('canFederalViewRawKrgBorderRevenue()'), 'پێویستە میتۆدی ڕێگری لە بینینی داتای خاوی هەرێم لە لایەن بەغداوە بوونی هەبێت.');
  assert(content.includes('canAdminBypassSovereigntyRules()'), 'پێویستە یاسای ڕێگری لە دەستێوەردانی ئەدمین لە کایەکە نیشان بدات.');
}

// 5. OpenAPI compliance check (readiness/metadata-only reconciliation)
const openapiFiles = [
  'docs/api-contracts/krg-openapi.yaml',
  'docs/api-contracts/federal-openapi.yaml',
  'docs/api-contracts/joint-openapi.yaml'
];

for (const oFile of openapiFiles) {
  const oPath = path.resolve(process.cwd(), oFile);
  if (fs.existsSync(oPath)) {
    const content = fs.readFileSync(oPath, 'utf8');
    assert(content.includes('/border-settlement/readiness') || content.includes('/border-settlement/reconciliation'), `خاڵی پەیوەندی سنوورەکان لە ناو ${oFile} کارا نییە.`);
    assert(!content.includes('/joint/border-settlement/raw'), 'نابێت داتای خاوی تێپەڕین یان مۆدێلی مامەڵەی گومرگ بۆ مێتاداتای فێدراڵ لای جۆینت تێکەڵ بکرێت.');
  }
}

console.log('\n=============================================================');
if (violations > 0) {
  console.error(`❌ [AUDIT FAIL] ${violations} بەڵگەی سەرپێچیکردن ئاشکرا بوو لە مۆدیۆلی بەستنی سنوورەکان.`);
  process.exit(1);
} else {
  console.log('✅ [AUDIT PASS] هەموو نۆرم و سنوورەکانی پاراستنی سەروەری گومرگی بە سەرکەوتوویی جێجێ کراون.');
  process.exit(0);
}
