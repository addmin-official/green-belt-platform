import { Language } from '../../../types';
import digitalIdentityEn from '../../../localization/en/digitalIdentity.json';
import digitalIdentityAr from '../../../localization/ar/digitalIdentity.json';
import digitalIdentityKu from '../../../localization/ku/digitalIdentity.json';

const fullTranslations: any = {
  en: {
    digitalIdentity: digitalIdentityEn
  },
  ar: {
    digitalIdentity: digitalIdentityAr
  },
  ku: {
    digitalIdentity: digitalIdentityKu
  }
};

export const identityTranslations = {
  header: {
    title: {
      en: 'Sovereign Identity & Digital Trust Framework',
      ar: 'بوابة الهوية الرقمية ومنصة الثقة الفدرالية',
      ku: 'بەرەی ناسنامەی نیشتمانیی و متمانەی دیجیتاڵیی'
    },
    subtitle: {
      en: 'Multi-tenant W3C Verifiable Credentials governance, cryptographic Public Key Infrastructure (PKI), document multi-signature approvals, and decentralized citizen consent registries.',
      ar: 'مستودع المفاتيح العامة (PKI)، والشهادات الموثوقة W3C، وتواقيع المعاملات الجمركية المتعددة الأطراف للوزارات.',
      ku: 'سەکۆی هاوبەشی بەڵگەنامە دیجیتاڵییە فەرمییەکان (W3C)، ژێرخانی کلیلە گشتییەکان (PKI)، و مۆرکردنی فرە-دەسەڵاتیی بازرگانی بۆ وەزارەتەکان.'
    },
    badge: {
      en: 'TRUST ARCHITECTURE L5',
      ar: 'أمن الثقة الفدرالي',
      ku: 'ئاسایشی متمانەی فیدراڵیی L5'
    }
  },
  buttons: {
    syncCryptological: {
      en: 'Sync Cryptological Nodes',
      ar: 'تحديث سلسلة ومسار الثقة',
      ku: 'هاوکاتکاری گرێی کریپتۆگرافی'
    }
  },
  stats: {
    trustScore: {
      title: {
        en: 'National Trust Readiness Score',
        ar: 'مؤشر جاهزية الثقة الأمنية الوطني',
        ku: 'پێوانەی ئامادەیی متمانەی ئاسایشی نیشتمانیی'
      },
      subtitle: {
        en: 'Measures PKI, Signing & Consent',
        ar: 'يقيس البنية التحتية والموافقات',
        ku: 'پێوانەی متمانەی گشتی کلیلەکان'
      }
    },
    biometric: {
      title: {
        en: 'Biometrically Bound DID Records',
        ar: 'إجمالي الهويات الموثقة بيومترياً',
        ku: 'کۆی گشتی فۆرمەکانی ناسنامەی بایۆمەتری'
      },
      subtitle: {
        en: 'Iris + Fingerprint Triple Salted keys',
        ar: 'بصمة العين واليد المشفرة',
        ku: 'ناسنامەی چاو و دەست'
      }
    },
    pki: {
      title: {
        en: 'PKI Certificates Enrolled',
        ar: 'سلسلة الشهادات المشعلة النشطة',
        ku: 'ژمارەی بڕوانامە تۆمارکراوەکانی PKI'
      },
      subtitle: {
        en: 'From Iraq Root CA G1 roots',
        ar: 'صادرة من جهة التصديق الوطنية',
        ku: 'لە سەنتەری باڵای بڕوانامەکان'
      }
    },
    w3c: {
      title: {
        en: 'Issuing W3C Credentials',
        ar: 'الشهادات الموثقة الموزعة (VC)',
        ku: 'پێشکەشکردنی بەڵگەنامە باوەڕپێکراوەکان'
      },
      subtitle: {
        en: 'Held securely inside digital wallets',
        ar: 'محفوظة بأمان بالمحفظة الرقمية',
        ku: 'لەناو محفەزەی دیجیتاڵیدا'
      }
    }
  },
  tabs: {
    registry: { en: 'Identity Registry', ar: 'مسجلات الهوية', ku: 'تۆماری گشتی ناسنامەکان' },
    wallet: { en: 'Sovereign Wallets', ar: 'المحفظة الرقمية', ku: 'محفەزەی نیشتمانیی سەروەر' },
    credentials: { en: 'Verifiable Credentials', ar: 'شهادات W3C الموثقة', ku: 'بەڵگەنامە باوەڕپێکراوەکان' },
    pki: { en: 'Sovereign PKI', ar: 'مستودع الشهادات PKI', ku: 'ڕێکخستنی کلیلەکانی PKI' },
    signatures: { en: 'Digital Signatures', ar: 'التواقيع الرقمية', ku: 'مۆری ئەلیکترۆنیی کۆدکراو' },
    consent: { en: 'Citizen Consent', ar: 'موافقة المواطنين', ku: 'مۆڵەتی بەکارهێنانی داتا' },
    federation: { en: 'Federated IAM', ar: 'الاتحاد الفدرالي IAM', ku: 'سازانی فیدراڵیی IAM' }
  }
};

export function t(lang: Language, keyPath: string): string {
  if (keyPath.startsWith('digitalIdentity.')) {
    const parts = keyPath.split('.');
    let current: any = fullTranslations[lang];
    
    for (const part of parts) {
      if (current && part in current) {
        current = current[part];
      } else {
        // Fallback to English
        let fallback: any = fullTranslations['en'];
        for (const fpart of parts) {
          if (fallback && fpart in fallback) {
            fallback = fallback[fpart];
          } else {
            fallback = undefined;
            break;
          }
        }
        return fallback || keyPath;
      }
    }
    return typeof current === 'string' ? current : keyPath;
  }

  const parts = keyPath.split('.');
  let current: any = identityTranslations;
  
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
