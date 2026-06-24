import fs from 'fs';
import path from 'path';

const locales = ['en', 'ar', 'ku'];
let violationsCount = 0;
const details = [];

function getKeysAndMetadata(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  if (filePath.endsWith('.json')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    return data;
  } else if (filePath.endsWith('.ts')) {
    // Basic regex parser for TS export object
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(/export\s+const\s+\w+\s*=\s*({[\s\S]*?});/);
    if (matches) {
      try {
        // Safe-ish eval for standard simple key-value pairs
        const objText = matches[1].replace(/(\w+)\s*:/g, '"$1":');
        return JSON.parse(objText);
      } catch (e) {
        return {};
      }
    }
  }
  return null;
}

try {
  // We check for common.json or common.ts under localization Folders
  const checkFiles = ['common.json', 'common.ts'];
  
  checkFiles.forEach(fileName => {
    const maps = {};
    locales.forEach(lang => {
      const p = `src/localization/${lang}/${fileName.replace('.ts', lang === 'en' ? '.json' : '.json')}`; // maps to existing json
      const realPathExist = fs.existsSync(p) ? p : `src/localization/${lang}/${fileName}`;
      if (fs.existsSync(realPathExist)) {
        maps[lang] = getKeysAndMetadata(realPathExist);
      }
    });

    if (Object.keys(maps).length === 0) {
      return;
    }

    const enMap = maps['en'] || {};
    const enKeys = Object.keys(enMap);

    // Fail if English map is empty
    if (enKeys.length === 0) {
      violationsCount++;
      details.push(`English reference file "${fileName}" has 0 keys.`);
    }

    locales.forEach(lang => {
      const langMap = maps[lang];
      if (!langMap) {
        violationsCount++;
        details.push(`Language "${lang}" is missing completely for "${fileName}".`);
        return;
      }

      // Check missing/orphan keys
      enKeys.forEach(key => {
        if (!(key in langMap)) {
          violationsCount++;
          details.push(`Missing key: language "${lang}" does not contain key "${key}" from "${fileName}".`);
        } else {
          const val = langMap[key];
          if (val === undefined || val === null || val === '') {
            violationsCount++;
            details.push(`Empty value: key "${key}" in language "${lang}" is empty.`);
          }
        }
      });

      // Check orphan keys (exists in lang but not in en)
      Object.keys(langMap).forEach(key => {
        if (!(key in enMap)) {
          violationsCount++;
          details.push(`Orphan key: language "${lang}" contains extra key "${key}" not in English reference "${fileName}".`);
        }
      });
    });
  });

  if (violationsCount > 0) {
    console.error(`FAIL: ${violationsCount} localization coverage violations detected!`);
    details.forEach(d => console.error(`- ${d}`));
    process.exit(1);
  } else {
    console.log('PASS: Localization key trees are 100% matched across en, ar, and ku with zero orphan or missing keys.');
    process.exit(0);
  }
} catch (err) {
  console.error('Error during localization check:', err);
  process.exit(1);
}
