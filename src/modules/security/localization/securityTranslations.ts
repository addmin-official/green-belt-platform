import { Language } from '../../../types';

export const securityTranslations = {
  header: {
    title: {
      en: 'Sovereign Security & Identity Command Center',
      ar: 'مركز الأمن والتحكم السيادي - صفر ثقة (Zero-Trust)',
      ku: 'ناوەندی کۆنترۆڵ و ئاسایشی نیشتمانیی سەروەر - متمانەی سفر'
    },
    subtitle: {
      en: 'National enterprise-grade unified identity, dynamic RBAC/ABAC audits, AES-256 HSM vault controls, and Zero-Trust risk assessment pipelines.',
      ar: 'لوحة المراقبة الفيدرالية للتحقق من هوية الموظفين والتشفير وسجلات التتبع السيبرانية.',
      ku: 'سەکۆی کۆنترۆڵ بۆ دڵنیابوونەوە لە ناسنامەی فەرمانبەران، کۆدکردنی کلیلە نیشتمانییەکان، و هێڵە پارێزراوەکانی پشکنینی ناوەندی دژی هەڕەشە.'
    },
    badge: {
      en: 'NATIONAL SECURITY LEVEL 5',
      ar: 'الأمن القومي المركزي',
      ku: 'ئاستی ئاسایشی نیشتمانی توند'
    }
  },
  buttons: {
    syncChannel: {
      en: 'Sync Identity Channels',
      ar: 'فحص السجلات حياً',
      ku: 'هاوکاتکردنی ڕێڕەوەکانی ناسنامە'
    },
    rotateKeys: {
      en: 'Rotate HSM Keys',
      ar: 'تدوير مفاتيح التشفير',
      ku: 'خولانەوەی کلیلە پارێزراوەکان'
    }
  },
  stats: {
    readiness: {
      title: {
        en: 'Sovereign Security Readiness Score',
        ar: 'مؤشر جاهزية الأمن المركزي',
        ku: 'پێوانەی ئامادەیی نیشتمانی توندوتۆڵ'
      },
      subtitle: {
        en: 'Meets ISO 27001 Cryptographic Protocols',
        ar: 'متوافق مع بروتوكولات التجزئة التشفيرية ISO 27001',
        ku: 'هاوتای ڕێسا نێودەوڵەتییەکانی نهێننووسی ISO 27001'
      },
      trend: {
        en: '0.00%',
        ar: '٠.٠٠٪',
        ku: '٠.٠٠٪'
      }
    },
    sessions: {
      title: {
        en: 'Active Zero-Trust Sessions',
        ar: 'قنوات التحقق النشطة',
        ku: 'پیشاندەری گۆڕینەوەی چالاکی ژێرخانی متمانە'
      },
      subtitleSafe: {
        en: 'Secure • Risk Flags',
        ar: 'مؤمنة • علامات المخاطرة',
        ku: 'پارێزراوە • ئاگاداری مەترسی'
      },
      trend: {
        en: '1 Socket Active',
        ar: 'قناة نشطة واحدة',
        ku: 'هێڵێکی گۆڕینەوەی چالاک'
      }
    },
    keys: {
      title: {
        en: 'HMAC Active Encryptions',
        ar: 'مفاتيح التشفير النشطة بالخزنة',
        ku: 'کلیلەکانی کۆدکردنی گشتی لە خەزێنە'
      },
      subtitle: {
        en: 'Current Key ID',
        ar: 'رمز المفتاح النشط',
        ku: 'ناسنامەی کلیلی وەرگیراو'
      },
      trend: {
        en: 'Rotated',
        ar: 'تم التدوير',
        ku: 'گۆڕدراوە'
      }
    },
    audit: {
      title: {
        en: 'Append-Only Audit Chain Link',
        ar: 'السجل الوطني الموحد للتدقيق',
        ku: 'زنجیرەی کۆدکراوی پاراستنی نیشتمانی'
      },
      subtitle: {
        en: 'Tamper-proof block chain-link valid',
        ar: 'سلسلة الكتل المقومة للتلاعب صحيحة ومؤمنة',
        ku: 'زنجیرەی بلۆک بە تەواوی پشتڕاستکراوەتەوە'
      },
      trend: {
        en: 'Synced',
        ar: 'متزمن',
        ku: 'هاوکاتکراوە'
      }
    }
  },
  activeSockets: {
    section: {
      title: {
        en: 'Active Sockets & Hardware Profiles',
        ar: 'قنوات التحقق والأجهزة المشفرة النشطة',
        ku: 'دەروازە و ئامێرە تۆمارکراوە ئەمنییەکان'
      },
      desc: {
        en: 'Detailed threat evaluation over secure client terminals accessing IDG core database.',
        ar: 'مراقبة حية للأجهزة المسجلة للموظفين متضمنة مستوى السرية ودرجات المخاطرة.',
        ku: 'مەترسی و بەراوردکردنی ڕاستەوخۆ بۆ ناسنامەی ئامێرەکانی فەرمانبەران بەپێی دەسەڵات.'
      }
    },
    badge: {
      healthy: {
        en: 'HEALTHY GATEWAYS',
        ar: 'بوابات سليمة ومؤمنة',
        ku: 'دەروازە ساغەکان'
      },
      anomaly: {
        en: 'ANOMALY LOCK',
        ar: 'قفل أمني نشط',
        ku: 'داخرا بەهۆی هەڕەشە'
      }
    },
    table: {
      subject: { en: 'Subject Employee', ar: 'الموظف المسؤول', ku: 'فەرمانبەری دەسەڵاتدار' },
      division: { en: 'Tenant Division', ar: 'المؤسسة/الوزارة', ku: 'وەزارەت یان دامەزراوە' },
      clearance: { en: 'Clearance Level', ar: 'مستوى الترخيص', ku: 'ئاستی دەسەڵات' },
      device: { en: 'Terminals/Device', ar: 'الجهاز/البيئة المعتمدة', ku: 'ئامێر و ژێرخان' },
      location: { en: 'IP & Location', ar: 'العنوان والموقع', ku: 'ناونیشان و شوێن' },
      risk: { en: 'Anomalous Risk Index', ar: 'مؤشر المخاطر', ku: 'پێوانەی مەترسی فێڵ' },
      actions: { en: 'Administration Override', ar: 'إجراءات التحكم', ku: 'پەسەندکردن یان ڕەتکردنەوە' }
    },
    actions: {
      yes: { en: 'YES', ar: 'نعم', ku: 'بەڵێ' },
      no: { en: 'NO', ar: 'لا', ku: 'نەخێر' },
      revoke: { en: 'Revoke Socket', ar: 'إلغاء الاتصال فوراً', ku: 'وەستاندنی دەستبەجێ' },
      logout: { en: 'Logout Socket', ar: 'تسجيل خروج', ku: 'دەرچوون لە هێڵ' }
    }
  },
  abac: {
    section: {
      title: {
        en: 'Interactive Dynamic ABAC Policy Assessor',
        ar: 'المحاكاة اللامركزية لتقييم السياسات (ABAC Simulator)',
        ku: 'سیستەمی هەڵسەنگاندنی مۆڵەتەکان (ABAC)'
      },
      desc: {
        en: 'Federal validation engine evaluating exact multi-dimensional clearance attributes dynamically.',
        ar: 'اختبر الوصول وصلاحيات الموظفين حياً بمطابقة الوزارة والمنفذ والموقع الفعلي ونقاط المخاطرة.',
        ku: 'سەکۆی تاقیکردنەوەی دەستگەگەیشتنی فەرمانبەران بەپێی ئاستی دەسەڵات، شوێن و بارودۆخی دەروازەکان.'
      }
    },
    steps: {
      targetId: {
        en: '1. Select Target Identity Profile',
        ar: '١. اختر هوية الموظف المستهدف',
        ku: '١. ناسنامەی فەرمانبەرەکە دیاری بکە'
      },
      targetAsset: {
        en: '2. Target Custom Asset & Clearance Required',
        ar: '٢. الملف المطلوب ومستوى الحماية',
        ku: '٢. دیاریکردنی جۆری فرمان و دەسەڵات'
      },
      environment: {
        en: '3. Access Point Environment Telemetry',
        ar: '٣. القياسات الفنية والبيئة والشبكة',
        ku: '٣. زانیاری و تاقیکردنەوەی خێرایی هێڵ'
      }
    },
    profile: {
      role: { en: 'Role', ar: 'الدور الوظيفي', ku: 'پلە و پۆست' },
      clearance: { en: 'Clearance', ar: 'مستوى الترخيص', ku: 'ئاستی دەسەڵات' },
      lineage: { en: 'Lineage', ar: 'التبعية المؤسسية', ku: 'دامەزراوە' },
      hardwareMatch: { en: 'Trusted Hardware Enclave Match', ar: 'مطابقة تشفير معالج الجهاز الآمن', ku: 'هاوتای زانیاری ناسنامەی ئامێر' },
      threatScore: { en: 'Environmental Threat Score', ar: 'مؤشر المخاطر والتهديدات للبيئة', ku: 'پێوانەی چاودێری ئستای ئامێرەکە' }
    },
    outcome: {
      decision: { en: 'Decision Outcome', ar: 'قرار مجمع السياسات الفوري', ku: 'بڕیاری کۆتایی مێشکی ئەمنی' },
      granted: { en: 'POLICY GRANTED (SUCCESS)', ar: 'تمت الموافقة وتدقيق السياسة بنجاح', ku: 'ڕێگەپێدراو (سەرکەوتوو)' },
      blocked: { en: 'ACCESS POLICY BLOCKED (DENIED)', ar: 'تم حجب صلاحية الدخول لعدم طوابق الشروط', ku: 'دەستگەیشتن ڕەتکرایەوە (داخراو)' },
      reason: { en: 'Reason', ar: 'السبب', ku: 'مەترسی یان هۆکار' },
      blockHash: { en: 'Audit Block Hash', ar: 'كود التجزئة المشفر للتدقيق', ku: 'واژۆی دیجیتاڵی مۆرکردن' },
      syncedAt: { en: 'Trace Reconciled at', ar: 'تمت المزامنة في الساعة', ku: 'هاوکاتکرا لە کاتی' }
    }
  },
  audit: {
    section: {
      title: {
        en: 'Sovereign Tamper-Proof Audit Logging Stream',
        ar: 'سجل التدقيق والمتابعة السيادي المشفر (Append-Only)',
        ku: 'سجلی فەرمیی پشکنین و کۆنتڕۆڵی گشتی (بێ دەستکاری)'
      },
      desc: {
        en: 'Immutable cryptographic chronological audit ledger verifying complete trade compliance actions.',
        ar: 'الناقل البلوكي السيادي المتسلسل بالاعتماد على التجزئة التشفيرية لتسجيل الإجراءات.',
        ku: 'زنجیرەی کۆدکراوی هێڵی دەروازەکان بەپێی کات و جۆری کارە گومرگییەکان.'
      }
    },
    filters: {
      all: { en: 'All Logs', ar: 'جميع السجلات', ku: 'گشت تۆمارەکان' },
      auth: { en: 'Auth', ar: 'الدخول', ku: 'چوونەژورەوەکان' },
      rollover: { en: 'Rollover', ar: 'التدوير', ku: 'گۆڕینی کلیل' },
      alarms: { en: 'Alarms', ar: 'التهديدات', ku: 'مەترسییەکان' }
    },
    table: {
      logId: { en: 'Log ID', ar: 'رمز السجل', ku: 'ناسنامەی تۆمار' },
      timestamp: { en: 'Timestamp', ar: 'طابع الوقت', ku: 'کاتی تۆمارکردن' },
      category: { en: 'Event Category', ar: 'فئة الحدث', ku: 'پۆلي ڕووداوەکە' },
      user: { en: 'Subject User', ar: 'المستخدم المسؤول', ku: 'فەرمانبەري پەيوەنديدار' },
      desc: { en: 'Ledger Action Summary & Resource Metadata', ar: 'خلاصة العملية وتفاصيل الموارد', ku: 'وەسف و زانیاری ڕاپۆرتی فەرمی' },
      hash: { en: 'Backward Chain Block Hash', ar: 'توقيع التجزئة المتسلسل (Hash)', ku: 'واژۆی دیجیتاڵی کۆدکراو' },
      state: { en: 'Ledger State', ar: 'حالة السجل', ku: 'بارودۆخی زنجیرە' }
    },
    category: {
      violation: { en: 'Violation', ar: 'مخالفة أمنية', ku: 'هەڵەی یاسایی' },
      keyroll: { en: 'Key Roll', ar: 'تدوير مفتاح', ku: 'گۆڕینی کلیل' },
      login: { en: 'Auth Login', ar: 'تسجيل دخول', ku: 'چوونەژوورەوە' }
    },
    state: {
      chained: { en: 'CHAINED', ar: 'مربوط بالكتلة', ku: 'تۆمارکراو' },
      blocked: { en: 'BLOCKED', ar: 'محجوب/ممنوع', ku: 'داخراو' }
    }
  },
  sidebar: {
    breakdown: {
      title: { en: 'Active Sockets Breakdown', ar: 'تفاصيل القنوات النشطة', ku: 'پۆلێنکردنی دەروازە چالاکەکان' },
      chartTitle: { en: 'Zero-Trust Terminals Risk Audit', ar: 'تدقيق مخاطر الأجهزة المعتمدة', ku: 'پێوانەی چاودێری ئامێرە پارێزراوەکان' },
      chartSubtitle: { en: 'Relative proportion of devices sorted by continuous validation state', ar: 'توزيع نسب الأجهزة حسب حالة المحاكاة الأمنية اللحظية', ku: 'ڕێژەی سەرەکی دەروازەکان بەپێی ئاستی دەرکەوتنی جۆری مەترسی' },
      active: { en: 'Verified Active', ar: 'آمنة / نشطة', ku: 'سەلمێنراو یان چالاک' },
      challenge: { en: 'Step-up Challenge', ar: 'تحقق إضافي', ku: 'پشکنینی بەهێزکردنەوە' },
      locked: { en: 'Locked Threat', ar: 'مغلقة أمنياً', ku: 'داخراو پاش هەڕەشە' }
    },
    keychain: {
      title: { en: 'Sovereign Key Chain Registry', ar: 'سجل أرقام كود المفاتيح الاتحادية', ku: 'تۆماری فەرمی کلیلە سەروەرەکان' },
      active: { en: 'Active', ar: 'نشط ومؤمن', ku: 'چالاک' },
      expired: { en: 'Expired', ar: 'منتهي الصلاحية', ku: 'بەسەرچوون' },
      algo: { en: 'Algorithm', ar: 'خوارزمية التشفير', ku: 'جۆری كۆدکردن' },
      expiry: { en: 'Rollover Expiry', ar: 'تاريخ انتهاء الفحص الفعلي', ku: 'کاتی بەسەرچوون' }
    },
    compliance: {
      title: { en: 'Sovereign Compliance Index', ar: 'مؤشر موازنة ومعايير الامتثال', ku: 'تۆماری فەرمی یاسا و بەڵگەکانی پابەندبوون' },
      status: { en: 'COMPLIANT', ar: 'ممتثل ومطابق', ku: 'پابەندبووە' }
    },
    governance: {
      title: { en: 'Identity & Access Governance', ar: 'حوكمة بطاقات المعاملات والولوج', ku: 'ناوەندی ئاسایشی ناسنامەی دیجیتاڵیی' },
      desc: { en: 'Certified in alignment under Supreme National Cybersecurity Council supervision.', ar: 'مصادق بالكامل تحت إشراف المجلس الوطني للأمن السيبراني العراقي.', ku: 'پەسەندکراوە لە لایەن دەستەی باڵای ئاسایشی ئەلیکترۆنی عێراق.' },
      body: {
        en: 'Every system transaction is bound by cryptographical identity signature hashes. Standard key indexes rotate dynamically according to FIPS 140-3 protocol constraints.',
        ar: 'جميع المعاملات في النظام محمية وموثقة بواسطة تواقيع وتجزئات التشفير الرقمية، ويتم تدوير مفاتيح التشفير بالخزنة السيادية بشكل ديناميكي وفقاً لمعايير بروتوكول FIPS 140-3.',
        ku: 'هەموو کار و داتایەک لە نێو سیستەمدا بە واژۆی دیجیتاڵیی کلیلە گشتییەکان دەپارێزرێت و جۆری کلیلەکان بە شێوەیەکی خۆکار بەپێی ستانداردەکانی FIPS 140-3 ئەپدەیت دەکرێن.'
      }
    }
  },
  roles: {
    'Super Administrator': { en: 'Super Administrator', ar: 'مدير النظام الأعلى', ku: 'سەرپەرشتیاری گشتی سیستەم' },
    'Customs Administrator': { en: 'Customs Administrator', ar: 'مدير الجمارك', ku: 'ئەفسەری باڵای گومرگ' },
    'Border Officer': { en: 'Border Officer', ar: 'ضابط الحدود', ku: 'ئەفسەری پاسەوانی سنوور' },
    'Intelligence Analyst': { en: 'Intelligence Analyst', ar: 'محلل استخباراتي', ku: 'شیکەرەوەی زانیاری و هەواڵگری' },
    'Auditor': { en: 'Auditor', ar: 'مدقق حسابات', ku: 'پشکنەر' }
  },
  ministries: {
    'Prime Minister Office': { en: 'Prime Minister Office', ar: 'ديوان رئاسة الوزراء', ku: 'نوسینگەی سەرۆک وەزیران' },
    'Ministry of Finance': { en: 'Ministry of Finance', ar: 'وزارة المالية الاتحادية', ku: 'وەزارەتی دارایی فیدراڵ' },
    'Kurdish Region Security Council': { en: 'Kurdish Region Security Council', ar: 'مجلس أمن إقليم كوردستان', ku: 'ئەنجومەنی ئاسایشی هەرێمی کوردستان' },
    'National Security Agency': { en: 'National Security Agency', ar: 'جهاز الأمن الوطني الفيدرالي', ku: 'دەزگای ئاسایشی نیشتمانیی' },
    'Ministry of Defense': { en: 'Ministry of Defense (Dual-use)', ar: 'وزارة الدفاع الفيدرالية', ku: 'وەزارەتی بەرگری فیدراڵ' }
  },
  clearances: {
    'SOVEREIGN': { en: 'SOVEREIGN', ar: 'درجة سيادية', ku: 'سەروەر (نهێنی متمانەی باڵا)' },
    'SECRET': { en: 'SECRET', ar: 'درجة سرية للغاية', ku: 'نهێنی باڵا' },
    'CONFIDENTIAL': { en: 'CONFIDENTIAL', ar: 'درجة خاصة', ku: 'تایبەت' },
    'UNCLASSIFIED': { en: 'UNCLASSIFIED', ar: 'درجة عامة/مفتوحة', ku: 'ئاشکرا' }
  },
  denials: {
    rbac: {
      en: 'RBAC Violation: Role lack clearance token for action.',
      ar: 'انتهاك صلاحيات الأدوار: الدور الوظيفي لا يملك تصريحاً كافياً للقيام بهذا الإجراء.',
      ku: 'متمانەی دەسەڵات: ناسنامەی فەرمانبەر ڕێگەپێدراو نییە بۆ جێبەجێکردنی ئەم فرمانە.'
    },
    hardware: {
      en: 'Policy Denied: Client terminal is not registered as cryptographically verified.',
      ar: 'رفض السياسة: تم محاولة الدخول من جهاز غير معتمد أو مشفر بالخزنة السيادية.',
      ku: 'متمانەی ژێرخان: ئامێری تاقیکراوە بەشێک نییە لە ڕێکارە فەرمییەکانی متمانەی گۆڕینەوەی سێرڤەر.'
    },
    risk: {
      en: 'Policy Blocked: Environmental threat index exceeded terminal safety allowance.',
      ar: 'رفض السياسة: تم تجاوز مؤشر المخاطر القصوى للجهاز أو الموقع. تم غلق المنفذ فوراً.',
      ku: 'متمانەی ئاسایش: هێڵی دەروازە بەهۆی ئاستی بەرزی مەترسی ئامێر بە شێوەیەکی کاتی داخرا.'
    },
    clearance: {
      en: 'Policy Rejected: Subject clearance level is beneath target asset requirements.',
      ar: 'رفض السياسة: درجة ترخيص الموظف غير كافية للاطلاع على هذا الملف السيادي.',
      ku: 'ڕەتکردنەوە: ئاستی دەسەڵاتی فەرمانبەری داواکار لە لایەن مێشكي ئەمني يەكسان نەکرا بۆ بینینی ئەم بابەتە.'
    },
    isolation: {
      en: 'Policy Denied: Sovereign multi-tenant enclaves isolation contract broken.',
      ar: 'رفض السياسة: انتهاك مبدأ عزل الوزارات الفيدرالي. لا يمكن لوزارة التدخل في شؤون وزارة أخرى.',
      ku: 'ڕەتکردنەوە: پێشێلکردنی یاسای جیاکردنەوەی وەزارەتەکان. هیچ دامەزراوەیەک ناتوانێت دەستگەیشتنی بە مەلەفی فەرمی کێلەکانی وەزارەتی تر هەبێت.'
    }
  }
};

export function t(lang: Language, keyPath: string): string {
  const parts = keyPath.split('.');
  let current: any = securityTranslations;
  
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

export function translateRole(lang: Language, role: string): string {
  if (role in securityTranslations.roles) {
    return (securityTranslations.roles as any)[role][lang];
  }
  return role;
}

export function translateMinistry(lang: Language, ministry: string): string {
  if (ministry in securityTranslations.ministries) {
    return (securityTranslations.ministries as any)[ministry][lang];
  }
  return ministry;
}

export function translateClearance(lang: Language, clearance: string): string {
  if (clearance in securityTranslations.clearances) {
    return (securityTranslations.clearances as any)[clearance][lang];
  }
  return clearance;
}

export function translateDenialReason(lang: Language, reason: string | undefined): string {
  if (!reason) return '';
  if (reason.includes('RBAC Violation')) {
    return t(lang, 'denials.rbac');
  }
  if (reason.includes('unverified hardware')) {
    return t(lang, 'denials.hardware');
  }
  if (reason.includes('High-Risk Threshold')) {
    return t(lang, 'denials.risk');
  }
  if (reason.includes('Insufficient security clearance')) {
    return t(lang, 'denials.clearance');
  }
  if (reason.includes('Cabinet Isolation Violation')) {
    return t(lang, 'denials.isolation');
  }
  return reason;
}
