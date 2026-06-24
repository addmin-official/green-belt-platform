import { Language } from '../types';

export function formatIQD(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}B IQD`;
  }
  return `${value.toLocaleString()}M IQD`;
}

export function truncateHash(hash: string, length = 8): string {
  if (hash.length <= length * 2) return hash;
  return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
}

export function translate<T extends Record<string, string>>(obj: T, lang: Language): string {
  return obj[lang] || obj['en'] || '';
}
