import fs from 'fs';
import path from 'path';

let violationsCount = 0;
const details = [];

function checkFileImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const normalizedPath = filePath.replace(/\\/g, '/');

  lines.forEach((line, lineNo) => {
    // Look for static imports
    if (line.trim().startsWith('import ') && line.includes('from ')) {
      const match = line.match(/from\s+['"]([^'"]+)['"]/);
      if (match) {
        const importPath = match[1];
        
        // Check rules:
        // 1. src/federal imports from src/krg
        if (normalizedPath.includes('src/federal') && (importPath.includes('/krg/') || importPath.endsWith('/krg'))) {
          violationsCount++;
          details.push(`Sovereign Violation [Federal -> KRG]: file "${normalizedPath}" at line ${lineNo+1} imports from KRG scope: "${line.trim()}"`);
        }
        
        // 2. src/krg imports from src/federal
        if (normalizedPath.includes('src/krg') && (importPath.includes('/federal/') || importPath.endsWith('/federal'))) {
          violationsCount++;
          details.push(`Sovereign Violation [KRG -> Federal]: file "${normalizedPath}" at line ${lineNo+1} imports from Federal scope: "${line.trim()}"`);
        }

        // 3. src/shared/ imports from src/federal
        if (normalizedPath.includes('src/shared') && (importPath.includes('/federal/') || importPath.endsWith('/federal'))) {
          const isMetadataOrReadOnly = line.includes('type ') || line.includes('metadata-only') || line.includes('read-only') || line.includes('sovereign-routing') || line.includes('joint-orchestration');
          if (!isMetadataOrReadOnly) {
            violationsCount++;
            details.push(`Sovereign Violation [Shared -> Federal]: file "${normalizedPath}" at line ${lineNo+1} imports from Federal scope: "${line.trim()}"`);
          }
        }
        
        // 4. src/shared/ imports from src/krg
        if (normalizedPath.includes('src/shared') && (importPath.includes('/krg/') || importPath.endsWith('/krg'))) {
          const isMetadataOrReadOnly = line.includes('type ') || line.includes('metadata-only') || line.includes('read-only') || line.includes('sovereign-routing') || line.includes('joint-orchestration');
          if (!isMetadataOrReadOnly) {
            violationsCount++;
            details.push(`Sovereign Violation [Shared -> KRG]: file "${normalizedPath}" at line ${lineNo+1} imports from KRG scope: "${line.trim()}"`);
          }
        }
      }
    }
  });
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      checkFileImports(fullPath);
    }
  }
}

try {
  if (fs.existsSync('src/federal')) scanDir('src/federal');
  if (fs.existsSync('src/krg')) scanDir('src/krg');
  if (fs.existsSync('src/shared')) scanDir('src/shared');

  if (violationsCount > 0) {
    console.error(`FAIL: ${violationsCount} sovereign boundary violations discovered!`);
    details.forEach(d => console.error(`- ${d}`));
    process.exit(1);
  } else {
    console.log('PASS: Sovereign boundaries verified. 100% compliance across KRG, Federal, and Shared spaces.');
    process.exit(0);
  }
} catch (err) {
  console.error('Error during sovereign boundary check:', err);
  process.exit(1);
}
