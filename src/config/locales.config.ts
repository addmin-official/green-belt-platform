import { Language } from '../types';

export interface LocaleDefinition {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleDefinition[] = [
  {
    code: 'ku',
    name: 'Kurdish',
    nativeName: 'کوردی (KRG)',
    dir: 'rtl',
    flag: '☀️'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية (العراق)',
    dir: 'rtl',
    flag: '🌴'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧'
  }
];
