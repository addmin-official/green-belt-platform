import fs from 'fs';
import path from 'path';

const EXPECTED_FILES = [
  'platform-training-manual.md',
  'dashboard-map-and-purpose.md',
  'admin-user-separation-guide.md',
  'demo-walkthrough-guide.md',
  'role-based-navigation-guide.md',
  'readiness-status-explainer.md',
  'operator-quick-start-guide.md',
  'founder-demo-coaching-guide.md'
];

const EXPECTED_REGISTRY_FILES = [
  'TrainingTopicRegistry.ts',
  'DashboardTrainingRegistry.ts',
  'AdminUserSeparationRegistry.ts',
  'TrainingReadinessReport.ts',
  'TrainingGuidePanel.tsx'
];

const MANDATORY_TERMS = [
  'isolation',
  'minimum-privilege',
  'minimum-viable',
  'Mustafa Jalal Khoshnaw'
];

async function runTrainingQA() {
  console.log('====================================================');
  console.log('IDG TECHNICAL AUDIT: PHASE 5.16 TRAINING PACKAGE INTEGRITY');
  console.log('====================================================');

  const docsDir = path.join(process.cwd(), 'docs', 'training');
  const srcDir = path.join(process.cwd(), 'src', 'shared', 'training');

  if (!fs.existsSync(docsDir)) {
    console.error(`❌ FAIL: Training manual directory missing at: ${docsDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(srcDir)) {
    console.error(`❌ FAIL: Training src registry directory missing at: ${srcDir}`);
    process.exit(1);
  }

  let failed = false;
  let allContent = '';

  // 1. Verify docs existence and classifications
  for (const fileName of EXPECTED_FILES) {
    const filePath = path.join(docsDir, fileName);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ FAIL: Missing training workbook file: ${fileName}`);
      failed = true;
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    allContent += '\n' + content;

    // Check classification headers
    const hasCorrectClass = content.includes('RESTRICTED TRAINING DOCUMENT') || content.includes('CONFIDENTIAL EXECUTIVE COACHING NOTE');
    if (!hasCorrectClass) {
      console.error(`❌ FAIL: ${fileName} does not contain required classification headers.`);
      failed = true;
    }

    // Guard against fake live approval claims, hardcoded override hacks, or fake production readiness claims
    if (content.match(/automatically approved|bypass verification checks|automatic credential validation/i)) {
      console.error(`❌ FAIL: ${fileName} contains unvetted claims of automatic credentials validation.`);
      failed = true;
    }

    if (content.match(/fully production ready|production ready validated|fully-approved-for-production/i)) {
      console.error(`❌ FAIL: ${fileName} contains unauthorized claims of full production readiness.`);
      failed = true;
    }

    // Verify Admin cannot bypass sovereignty in documentation
    if (fileName === 'admin-user-separation-guide.md') {
      if (!content.includes('Admins do not have bypass privileges') && !content.includes('Admins CANNOT:')) {
         console.error(`❌ FAIL: ${fileName} does not clearly specify that Admin cannot bypass sovereignty.`);
         failed = true;
      }
    }

    // Verify Joint remains metadata-only
    if (content.includes('Joint Operations') || content.includes('Joint Auditor')) {
      const mentionsMetadataOnly = content.toLowerCase().includes('metadata-only') || content.toLowerCase().includes('metadata only');
      if (!mentionsMetadataOnly) {
         console.error(`❌ FAIL: ${fileName} references Joint operations without specifying metadata-only isolation.`);
         failed = true;
      }
    }

    // Verify Users cannot access admin controls
    if (content.includes('User/Operator') || content.includes('Standard Operator')) {
      if (!content.includes('blocked from querying') && !content.includes('Operator interfaces completely exclude')) {
         console.error(`❌ FAIL: ${fileName} does not detail that users cannot access admin controls.`);
         failed = true;
      }
    }

    console.log(`✓ FILE FOUND & CLASSIFIED: ${fileName}`);
  }

  // 2. Verify registry and panel files exist
  for (const regFileName of EXPECTED_REGISTRY_FILES) {
    const regFilePath = path.join(srcDir, regFileName);
    if (!fs.existsSync(regFilePath)) {
      console.error(`❌ FAIL: Missing UI registry / panel file: ${regFileName}`);
      failed = true;
    } else {
      console.log(`✓ TRAINING REGISTRY FILE ACTIVE: ${regFileName}`);
    }
  }

  // 3. Verify TrainingGuidePanel integration in UI panel
  const panelPath = path.join(process.cwd(), 'src', 'shared', 'acquisition', 'AcquisitionReadinessPanel.tsx');
  if (!fs.existsSync(panelPath)) {
    console.error('❌ FAIL: Missing AcquisitionReadinessPanel.tsx target panel.');
    failed = true;
  } else {
    const panelContent = fs.readFileSync(panelPath, 'utf8');
    if (!panelContent.includes('TrainingGuidePanel')) {
      console.error('❌ FAIL: TrainingGuidePanel is not integrated into AcquisitionReadinessPanel.tsx.');
      failed = true;
    } else {
      console.log('✓ VERIFIED: TrainingGuidePanel is actively integrated into the UI (AcquisitionReadinessPanel).');
    }
  }

  if (failed) {
    console.error('❌ QA FAILED: Some training workbooks or registry files are missing, misclassified, or unintegrated.');
    process.exit(1);
  }

  // Validate required technical terms
  for (const term of MANDATORY_TERMS) {
    if (!allContent.toLowerCase().includes(term.toLowerCase())) {
      console.error(`❌ FAIL: Crucial design or strategic term missing from manual set: "${term}"`);
      failed = true;
    } else {
      console.log(`✓ TERM DETECTED: "${term}"`);
    }
  }

  if (failed) {
    console.error('❌ QA FAILED: Mandatory technical architectural safeguards missing.');
    process.exit(1);
  }

  console.log('\n🌟 SUCCESS: PHASE 5.16 TRAINING PACKAGE AND JURISDICTION COMPLIANCE PASS!');
  console.log('====================================================\n');
  process.exit(0);
}

runTrainingQA();
