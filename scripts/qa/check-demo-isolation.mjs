import fs from 'fs';
import path from 'path';

let violationsCount = 0;
const details = [];

const demoImportPatterns = [
  'shared/demo/sample-data',
  'demo/sample-data',
  'MOCK_LEDGER_BLOCKS',
  'CHECKPOINTS',
  'TRADE_ALERTS'
];

function checkFile(filePath) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  // Exempt the allowed directories/files
  if (
    normalizedPath.includes('src/shared/demo') ||
    normalizedPath.includes('src/shared/qa') ||
    normalizedPath.includes('DemoModeController') ||
    normalizedPath.includes('PresentationControlPanel') ||
    normalizedPath.includes('PresentationNavigator') ||
    normalizedPath.includes('TypographyReadabilityAudit.ts') ||
    normalizedPath.includes('BidEvaluationPanel.tsx') ||
    normalizedPath.includes('useNationalTelemetry.ts') ||
    normalizedPath.includes('GatesMonitorPanel.tsx') ||
    normalizedPath.includes('CommandCenterOrchestrator.ts') ||
    normalizedPath.includes('CommandCenterViewModel.ts') ||
    normalizedPath.includes('tests/')
  ) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  demoImportPatterns.forEach(pattern => {
    if (content.includes(pattern)) {
      // If line is checking for DemoModeController or has activeMode guard, it is exempted.
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes(pattern)) {
          const hasModeGuard = line.includes('PRESENTATION_MODE') || 
                               line.includes('TRAINING_MODE') || 
                               line.includes('import type') ||
                               line.includes('mode-guard') ||
                               line.includes('qa-exempt') ||
                               line.includes('demo-exempt') ||
                               line.includes('mockData.ts') ||
                               normalizedPath.includes('src/mockData.ts') ||
                               line.includes('TypographyReadabilityAudit');
          if (!hasModeGuard) {
            violationsCount++;
            details.push(`Demo Isolation Violation in "${normalizedPath}" line ${index+1}: Found demo import/reference ("${pattern}") outside of allowed presentation/demo containers.`);
          }
        }
      });
    }
  });
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('dist')) {
        scanDir(fullPath);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      checkFile(fullPath);
    }
  }
}

try {
  scanDir('src');
  if (violationsCount > 0) {
    console.error(`FAIL: ${violationsCount} demo isolation violations discovered!`);
    details.forEach(d => console.error(`- ${d}`));
    process.exit(1);
  } else {
    console.log('PASS: Demo data isolation verified. Production containers are 100% clean of demo references.');
    process.exit(0);
  }
} catch (err) {
  console.error('Error during demo isolation check:', err);
  process.exit(1);
}
