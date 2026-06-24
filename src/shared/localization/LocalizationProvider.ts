import { common as commonEn } from './en/common';
import { common as commonKu } from './ku/common';
import { common as commonAr } from './ar/common';
import { Language } from '../../types';

export const localizations = {
  en: { common: commonEn },
  ku: { common: commonKu },
  ar: { common: commonAr },
};

export class LocalizationProvider {
  private static locale: Language = 'ku';

  public static setLocale(locale: Language) {
    this.locale = locale;
  }

  public static getLocale(): Language {
    return this.locale;
  }

  /**
   * Translates a key based on the active language.
   * Supports both explicit namespace keys ("common.overview") or flat keys ("overview").
   */
  public static t(key: string, lang?: Language): string {
    const resolvedLang = lang || this.locale;
    const dict = localizations[resolvedLang] || localizations['en'];
    
    const parts = key.split('.');
    let current: any = dict;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback or key not found
        current = undefined;
        break;
      }
    }
    
    if (typeof current === 'string') {
      return current;
    }

    // Secondary fallback: if key is flat e.g. "overview", look in common
    const flatKey = key as keyof typeof dict.common;
    if (dict.common && flatKey in dict.common) {
      return dict.common[flatKey];
    }
    
    return key;
  }
}
