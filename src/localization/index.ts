import { Language } from '../types';
import { workflow } from './namespaces/workflow';

const namespaces = {
  workflow,
  // Other namespaces will be added here
};

export function t(lang: Language, keyPath: string): string {
  const parts = keyPath.split('.');
  let current: any = namespaces;
  
  for (const part of parts) {
    if (current && part in current) {
      current = current[part];
    } else {
      return keyPath;
    }
  }
  
  if (current && typeof current === 'object' && lang in current) {
    return current[lang];
  }
  
  return typeof current === 'string' ? current : keyPath;
}
