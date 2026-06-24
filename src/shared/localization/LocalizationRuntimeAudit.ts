import { common as commonEn } from './en/common';
import { common as commonKu } from './ku/common';
import { common as commonAr } from './ar/common';

import navigationEn from '../../localization/en/navigation.json';
import dashboardEn from '../../localization/en/dashboard.json';
import customsEn from '../../localization/en/customs.json';
import logisticsEn from '../../localization/en/logistics.json';
import financeEn from '../../localization/en/finance.json';
import identityEn from '../../localization/en/identity.json';
import aiEn from '../../localization/en/ai.json';
import settingsEn from '../../localization/en/settings.json';
import errorsEn from '../../localization/en/errors.json';
import validationEn from '../../localization/en/validation.json';
import notificationsEn from '../../localization/en/notifications.json';
import digitalIdentityEn from '../../localization/en/digitalIdentity.json';
import modulesEn from '../../localization/en/modules.json';
import languagesEn from '../../localization/en/languages.json';

import navigationAr from '../../localization/ar/navigation.json';
import dashboardAr from '../../localization/ar/dashboard.json';
import customsAr from '../../localization/ar/customs.json';
import logisticsAr from '../../localization/ar/logistics.json';
import financeAr from '../../localization/ar/finance.json';
import identityAr from '../../localization/ar/identity.json';
import aiAr from '../../localization/ar/ai.json';
import settingsAr from '../../localization/ar/settings.json';
import errorsAr from '../../localization/ar/errors.json';
import validationAr from '../../localization/ar/validation.json';
import notificationsAr from '../../localization/ar/notifications.json';
import digitalIdentityAr from '../../localization/ar/digitalIdentity.json';
import modulesAr from '../../localization/ar/modules.json';
import languagesAr from '../../localization/ar/languages.json';

import navigationKu from '../../localization/ku/navigation.json';
import dashboardKu from '../../localization/ku/dashboard.json';
import customsKu from '../../localization/ku/customs.json';
import logisticsKu from '../../localization/ku/logistics.json';
import financeKu from '../../localization/ku/finance.json';
import identityKu from '../../localization/ku/identity.json';
import aiKu from '../../localization/ku/ai.json';
import settingsKu from '../../localization/ku/settings.json';
import errorsKu from '../../localization/ku/errors.json';
import validationKu from '../../localization/ku/validation.json';
import notificationsKu from '../../localization/ku/notifications.json';
import digitalIdentityKu from '../../localization/ku/digitalIdentity.json';
import modulesKu from '../../localization/ku/modules.json';
import languagesKu from '../../localization/ku/languages.json';

export interface AuditResults {
  overallSuccess: boolean;
  kurdishCoverage: number;
  arabicCoverage: number;
  englishCoverage: number;
  missingKeysCount: number;
  orphanKeysCount: number;
  brokenNamespacesCount: number;
  inactiveTranslationsCount: number;
  details: {
    missingKeys: { [lang: string]: string[] };
    brokenNamespaces: string[];
    inactiveTranslations: string[];
  };
}

const auditTranslations = {
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

export class LocalizationRuntimeAudit {
  public static runAudit(): AuditResults {
    const langs = ['en', 'ar', 'ku'] as const;
    const namespaces = Object.keys(auditTranslations.en) as Array<keyof typeof auditTranslations.en>;

    const missingKeys: { [lang: string]: string[] } = { en: [], ar: [], ku: [] };
    const brokenNamespaces: string[] = [];
    const inactiveTranslations: string[] = [];

    let totalPossibleKeys = 0;
    let registeredEn = 0;
    let registeredAr = 0;
    let registeredKu = 0;

    namespaces.forEach((ns) => {
      const enNs = auditTranslations.en[ns] || {};
      const arNs = auditTranslations.ar[ns] || {};
      const kuNs = auditTranslations.ku[ns] || {};

      const enKeys = Object.keys(enNs);
      const arKeys = Object.keys(arNs);
      const kuKeys = Object.keys(kuNs);

      // Verify broken namespace structure
      if (enKeys.length === 0 && arKeys.length === 0 && kuKeys.length === 0) {
        brokenNamespaces.push(ns);
      }

      const allKeysInNs = Array.from(new Set([...enKeys, ...arKeys, ...kuKeys]));
      totalPossibleKeys += allKeysInNs.length;

      allKeysInNs.forEach((key) => {
        const keyPath = `${ns}.${key}`;

        const hasEn = key in enNs;
        const hasAr = key in arNs;
        const hasKu = key in kuNs;

        if (hasEn) registeredEn++; else missingKeys.en.push(keyPath);
        if (hasAr) registeredAr++; else missingKeys.ar.push(keyPath);
        if (hasKu) registeredKu++; else missingKeys.ku.push(keyPath);

        // Detect inactive/placeholder keys (e.g., empty string or default fallback value same as key)
        const enVal = (enNs as any)[key] || '';
        const arVal = (arNs as any)[key] || '';
        const kuVal = (kuNs as any)[key] || '';

        if (enVal === '' || enVal === key) {
          inactiveTranslations.push(`en:${keyPath}`);
        }
        if (arVal === '' || arVal === key) {
          inactiveTranslations.push(`ar:${keyPath}`);
        }
        if (kuVal === '' || kuVal === key) {
          inactiveTranslations.push(`ku:${keyPath}`);
        }
      });
    });

    const englishCoverage = totalPossibleKeys > 0 ? Math.round((registeredEn / totalPossibleKeys) * 100) : 100;
    const arabicCoverage = totalPossibleKeys > 0 ? Math.round((registeredAr / totalPossibleKeys) * 100) : 100;
    const kurdishCoverage = totalPossibleKeys > 0 ? Math.round((registeredKu / totalPossibleKeys) * 100) : 100;

    const missingKeysCount = missingKeys.en.length + missingKeys.ar.length + missingKeys.ku.length;

    const overallSuccess = missingKeysCount === 0 && brokenNamespaces.length === 0;

    return {
      overallSuccess,
      kurdishCoverage,
      arabicCoverage,
      englishCoverage,
      missingKeysCount,
      orphanKeysCount: 0,
      brokenNamespacesCount: brokenNamespaces.length,
      inactiveTranslationsCount: inactiveTranslations.length,
      details: {
        missingKeys,
        brokenNamespaces,
        inactiveTranslations,
      },
    };
  }
}
