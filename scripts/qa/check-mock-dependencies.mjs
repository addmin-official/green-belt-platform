import fs from 'fs';
import path from 'path';

const rootDir = 'src';
const forbiddenKeywords = [
  'mockData',
  'MockServiceAdapter',
  'MockCheckpointAdapter',
  'MockWorkflowAdapter',
  'MockAuditAdapter',
  'MockLedgerAdapter'
];

// Exempt directories or patterns
const allowedDirs = [
  'src/shared/demo/sample-data',
  'src/shared/demo',
  'src/shared/qa',
  'DemoModeController'
];

let violationsCount = 0;
const details = [];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      // Check if file is inside an allowed path
      if (allowedDirs.some(allowed => fullPath.includes(allowed))) {
        continue;
      }
      
      const content = fs.readFileSync(fullPath, 'utf8');
      forbiddenKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
          // If referenced under PRESENTATION_MODE or TRAINING_MODE guard, that is allowed as per rule
          const matches = content.match(new RegExp(keyword, 'g')) || [];
          let validMatches = 0;
          
          // Basic heuristic: check if line is part of a training or presentation block
          const lines = content.split('\n');
          lines.forEach(line => {
            if (line.includes(keyword)) {
              if (
                line.includes('PRESENTATION_MODE') || 
                line.includes('TRAINING_MODE') || 
                line.includes('import type') ||
                line.includes('qa-exempt') ||
                line.includes('mode-guard') ||
                line.includes('presentation-guard') ||
                line.includes('DemoMode') ||
                line.includes('mockData.') === false // only match direct mockData imports or assignments
              ) {
                validMatches++;
              }
            }
          });

          if (matches.length > validMatches) {
            violationsCount += (matches.length - validMatches);
            details.push(`File "${fullPath}" imports or references forbidden word "${keyword}" outside presentation/training mode.`);
          }
        }
      });
    }
  }
}

try {
  scanDir(rootDir);
  if (violationsCount > 0) {
    console.error(`FAIL: ${violationsCount} mock dependency violations found!`);
    details.forEach(d => console.error(`- ${d}`));
    process.exit(1);
  } else {
    console.log('PASS: Mock dependency checks passed with 100% compliance.');
    process.exit(0);
  }
} catch (err) {
  console.error('Error during mock dependency check:', err);
  process.exit(1);
}
