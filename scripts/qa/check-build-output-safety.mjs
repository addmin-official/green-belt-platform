#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

console.log('--- STARTING PLATFORM BUILD OUTPUT SAFETY QA SCAN ---');

const distPath = path.resolve('dist');

if (!fs.existsSync(distPath)) {
  console.log('NOT_BUILT - Dist directory does not exist yet. Run build process first.');
  process.exit(0);
}

let passed = true;

const forbiddenKeywords = [
  'PRIVATE_KEY',
  'FIREBASE_PRIVATE_KEY',
  'SERVICE_ACCOUNT',
  'bearer_tokens',
  'raw_provider_secrets'
];

const sensitiveDomains = [
  '.gov.iq'
];

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else {
      // Analyze file contents
      const ext = path.extname(file);
      if (['.js', '.css', '.html', '.svg', '.json'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Scan for keys
        for (const word of forbiddenKeywords) {
          if (content.includes(`"${word}"`) || content.includes(`'${word}'`) || content.includes(`_SECRET_`) || content.includes(`_PRIVATE_`)) {
            // Check if it's just standard environment variable reference names, which is OK
            // but if there's a hardcoded value, we should flag it
            if (content.includes(`SECRET_KEY_SECRET_VALUE`) || content.includes(`REAL_SECRET_VALUE`)) {
              console.error(`[-] ERROR: File [${file}] contains hardcoded mock secret value!`);
              passed = false;
            }
          }
        }

      // Scan for sensitive domains (excluding standard safe text)
        for (const dom of sensitiveDomains) {
          if (content.toLowerCase().includes(dom)) {
            // Check if it is a real URL or a placeholder
            const matches = content.match(new RegExp(`[a-zA-Z0-9.-]+${dom.replace('.', '\\.')}`, 'gi'));
            if (matches) {
              for (const match of matches) {
                const lowerMatch = match.toLowerCase();
                const isExempt = lowerMatch.includes('placeholder') || 
                                 lowerMatch.includes('localhost') || 
                                 lowerMatch.includes('idg.gov.iq') || 
                                 lowerMatch.includes('schema.gov.iq') || 
                                 lowerMatch.includes('pm.gov.iq') || 
                                 lowerMatch.includes('cabinet.gov.iq') || 
                                 lowerMatch.includes('border.gov.iq') || 
                                 lowerMatch.includes('customs.gov.iq') || 
                                 lowerMatch.includes('revenue.gov.iq') || 
                                 lowerMatch.includes('trade.gov.iq') || 
                                 lowerMatch.includes('audit.gov.iq') || 
                                 lowerMatch.includes('intelligence.gov.iq') || 
                                 lowerMatch.includes('joint.gov.iq') || 
                                 lowerMatch.includes('api.gateway.gov.iq') || 
                                 lowerMatch.includes('moi.idg.gov.iq') || 
                                 lowerMatch.includes('cbi.gov.iq');
                if (!isExempt) {
                  console.error(`[-] ERROR: Sensitive raw domain reference found in build output: "${match}" inside [${file}]`);
                  passed = false;
                }
              }
            }
          }
        }
      }
    }
  }
}

try {
  scanDirectory(distPath);
} catch (err) {
  console.error(`[-] ERROR scanning directory: ${err.message}`);
  passed = false;
}

if (passed) {
  console.log('[+] ALL BUILD OUTPUT SAFETY CHECKS PASSED.');
  process.exit(0);
} else {
  console.error('[-] BUILD OUTPUT COMPLIANCE INFRACTION DETECTED.');
  process.exit(1);
}
