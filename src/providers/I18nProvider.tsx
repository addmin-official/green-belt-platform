import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { LocalizationProvider } from '../shared/localization/LocalizationProvider';

// English imports
import { common as commonEn } from '../shared/localization/en/common';
import navigationEn from '../localization/en/navigation.json';
import dashboardEn from '../localization/en/dashboard.json';
import customsEn from '../localization/en/customs.json';
import logisticsEn from '../localization/en/logistics.json';
import financeEn from '../localization/en/finance.json';
import identityEn from '../localization/en/identity.json';
import aiEn from '../localization/en/ai.json';
import settingsEn from '../localization/en/settings.json';
import errorsEn from '../localization/en/errors.json';
import validationEn from '../localization/en/validation.json';
import notificationsEn from '../localization/en/notifications.json';
import digitalIdentityEn from '../localization/en/digitalIdentity.json';
import modulesEn from '../localization/en/modules.json';
import languagesEn from '../localization/en/languages.json';

// Arabic imports
import { common as commonAr } from '../shared/localization/ar/common';
import navigationAr from '../localization/ar/navigation.json';
import dashboardAr from '../localization/ar/dashboard.json';
import customsAr from '../localization/ar/customs.json';
import logisticsAr from '../localization/ar/logistics.json';
import financeAr from '../localization/ar/finance.json';
import identityAr from '../localization/ar/identity.json';
import aiAr from '../localization/ar/ai.json';
import settingsAr from '../localization/ar/settings.json';
import errorsAr from '../localization/ar/errors.json';
import validationAr from '../localization/ar/validation.json';
import notificationsAr from '../localization/ar/notifications.json';
import digitalIdentityAr from '../localization/ar/digitalIdentity.json';
import modulesAr from '../localization/ar/modules.json';
import languagesAr from '../localization/ar/languages.json';

// Kurdish imports
import { common as commonKu } from '../shared/localization/ku/common';
import navigationKu from '../localization/ku/navigation.json';
import dashboardKu from '../localization/ku/dashboard.json';
import customsKu from '../localization/ku/customs.json';
import logisticsKu from '../localization/ku/logistics.json';
import financeKu from '../localization/ku/finance.json';
import identityKu from '../localization/ku/identity.json';
import aiKu from '../localization/ku/ai.json';
import settingsKu from '../localization/ku/settings.json';
import errorsKu from '../localization/ku/errors.json';
import validationKu from '../localization/ku/validation.json';
import notificationsKu from '../localization/ku/notifications.json';
import digitalIdentityKu from '../localization/ku/digitalIdentity.json';
import modulesKu from '../localization/ku/modules.json';
import languagesKu from '../localization/ku/languages.json';

const translations = {
  en: {
    common: commonEn,
    navigation: navigationEn,
    dashboard: dashboardEn,
    customs: customsEn,
    logistics: logisticsEn,
    finance: financeEn,
    identity: identityEn,
    ai: aiEn,
    settings: settingsEn,
    errors: errorsEn,
    validation: validationEn,
    notifications: notificationsEn,
    digitalIdentity: digitalIdentityEn,
    modules: modulesEn,
    languages: languagesEn,
  },
  ar: {
    common: commonAr,
    navigation: navigationAr,
    dashboard: dashboardAr,
    customs: customsAr,
    logistics: logisticsAr,
    finance: financeAr,
    identity: identityAr,
    ai: aiAr,
    settings: settingsAr,
    errors: errorsAr,
    validation: validationAr,
    notifications: notificationsAr,
    digitalIdentity: digitalIdentityAr,
    modules: modulesAr,
    languages: languagesAr,
  },
  ku: {
    common: commonKu,
    navigation: navigationKu,
    dashboard: dashboardKu,
    customs: customsKu,
    logistics: logisticsKu,
    finance: financeKu,
    identity: identityKu,
    ai: aiKu,
    settings: settingsKu,
    errors: errorsKu,
    validation: validationKu,
    notifications: notificationsKu,
    digitalIdentity: digitalIdentityKu,
    modules: modulesKu,
    languages: languagesKu,
  },
};

interface I18nContextType {
  locale: Language;
  direction: 'ltr' | 'rtl';
  setLocale: (locale: Language) => void;
  t: (pathOrLang: string, path?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Load initial locale from localStorage persistence
  const [locale, setLocaleState] = useState<Language>(() => {
    const saved = localStorage.getItem('idg_locale');
    if (saved === 'en' || saved === 'ar' || saved === 'ku') {
      return saved as Language;
    }
    return 'ku'; // Default to Kurdish
  });

  const direction = (locale === 'en') ? 'ltr' : 'rtl';

  useEffect(() => {
    // Sync the localization providers
    LocalizationProvider.setLocale(locale);

    // Apply layout direction and lang attributes on the HTML root element globally
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', locale);
    
    // Add RTL / LTR class for specialized theme tweaks
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [locale, direction]);

  const setLocale = (newLocale: Language) => {
    if (newLocale === 'en' || newLocale === 'ar' || newLocale === 'ku') {
      setLocaleState(newLocale);
      localStorage.setItem('idg_locale', newLocale);
      LocalizationProvider.setLocale(newLocale);
    }
  };

  // Helper function to resolve dot notation paths, supporting t("key") and t(lang, "key")
  const t = (pathOrLang: string, path?: string): string => {
    let resolvedLocale = locale;
    let resolvedPath = pathOrLang;

    if (path !== undefined) {
      resolvedLocale = pathOrLang as Language;
      resolvedPath = path;
    }

    const dict = translations[resolvedLocale] || translations['en'];
    const keys = resolvedPath.split('.');
    let current: any = dict;

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English translation key if current language key not found
        let fallback: any = translations['en'];
        for (const fkey of keys) {
          if (fallback !== undefined && fallback[fkey] !== undefined) {
            fallback = fallback[fkey];
          } else {
            fallback = undefined;
            break;
          }
        }
        return fallback || resolvedPath; // Return path if fallback is missing
      }
    }

    return typeof current === 'string' ? current : resolvedPath;
  };

  return (
    <I18nContext.Provider value={{ locale, direction, setLocale, t }}>
      <div dir={direction} className={direction === 'rtl' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
