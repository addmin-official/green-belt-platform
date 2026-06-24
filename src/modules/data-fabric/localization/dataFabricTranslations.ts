import { Language } from '../../../types';

export const dataFabricTranslations = {
  header: {
    title: {
      en: 'Sovereign National Data Fabric Architecture',
      ar: 'منصة ونسيج البيانات الوطني السيادي (Data Fabric)',
      ku: 'تۆڕی زانیارییە نیشتمانییە سەروەرەکان (نەسیجی داتا)'
    },
    subtitle: {
      en: 'Unified multi-tenant federal data assets discovery registry, Master Data resolution, end-to-end data lineage, and event-driven data quality orchestrations.',
      ar: 'محور التحكم ببيانات الدولة العراقية لربط الوزارات وتدقيق جودة السجلات وحوكمة المصادر.',
      ku: 'سەکۆی کۆنترۆڵ بۆ دابەشکردنی داتای نیشتمانی بە چاودێری وەزارەتەکان, چاکسازی جۆری زانیاری سنوورەکان و بڕیاری پێشوەختە.'
    },
    badge: {
      en: 'FABRIC GOVERNANCE CLASS L5',
      ar: 'حوكمة البيانات الفيدرالية',
      ku: 'ئاستی بەڕێوەبردنی زنجیرەی زانیاری باڵا'
    }
  },
  stats: {
    quality: {
      title: {
        en: 'National Data Quality Index',
        ar: 'مؤشر جودة البيانات الوطني الموحد',
        ku: 'پێوانەی پشتکردنەوەی جۆری زانیاری'
      },
      subtitle: {
        en: 'Precision Score across 6 Core Dimensions',
        ar: 'دقة مطابقة البيانات عبر ٦ معايير أساسية',
        ku: 'ئاستی جۆری داتا بەپێی ٦ پێوانەی بنەڕەتی'
      },
      trend: {
        en: '0.04% Live Recalc',
        ar: '0.04% فحص فوري',
        ku: '0.04% چاکسازی خۆکار'
      }
    },
    records: {
      title: {
        en: 'Sovereign Master Records',
        ar: 'مجموع السجلات المشفرة الفدرالية',
        ku: 'کۆی تۆمارە فەرمییە سەروەرەکان'
      },
      subtitle: {
        en: 'Enveloped under Triple Language Key',
        ar: 'مشفرة بالكامل تحت هويات لغوية متعددة',
        ku: 'پارێزراوە لە ژێر ناسنامەی زمانە فەرمییەکان'
      },
      trend: {
        en: 'Citizens & Businesses verified',
        ar: 'تم التحقق من المواطنين والشركات',
        ku: 'هاوڵاتیان و کۆمپانیاکان پشتڕاستکراونەتەوە'
      }
    },
    datasets: {
      title: {
        en: 'Governed National Datasets',
        ar: 'مجموعات البيانات الخاضعة للحوكمة',
        ku: 'دامەزراوە داتاییە فەرمییەکانی وڵات'
      },
      subtitle: {
        en: 'Distributed across 4 Federal Ministries',
        ar: 'موزعة تنظيمياً على ٤ وزارات فدرالية',
        ku: 'دابەشکراوە بەسەر ٤ وەزارەتی سەرەکیدا'
      },
      trend: {
        en: 'Fully Mapped',
        ar: 'مخططة بالكامل',
        ku: 'تەواوی نەخشەکە کێشراوە'
      }
    },
    eventbus: {
      title: {
        en: 'Decoupled Domain Event Bus',
        ar: 'الأحداث اللامركزية الموزعة حياً',
        ku: 'خەتی گواستنەوەی چالاکی زانیارییەکان'
      },
      activeBtn: {
        en: 'Broker Active',
        ar: 'وسيط نشط',
        ku: 'ناوەندەکە چالاکە'
      },
      trend: {
        en: 'Zero Packet Drops',
        ar: 'لا توجد خسارة في الإرسال',
        ku: 'تەواوی پاکەتەکان بە بێ کێشە گەیشتن'
      }
    }
  },
  catalog: {
    title: {
      en: 'National Governed Dataset Discovery Registry',
      ar: 'دليل ومستودع مجموعات البيانات السيادية (Data Catalog)',
      ku: 'تۆماری گشتی بۆ داتا کۆنترۆڵکراوە نیشتمانییەکان'
    },
    description: {
      en: 'Searchable and audit-proof catalog of federal master datasets, custodians, and classification tiers.',
      ar: 'قائمة تفصيلية بمجموعات البيانات الوطنية مع تحديد الوزارة المالكة ومستشعرات جودة البيانات.',
      ku: 'لینک و زانیاری گشتگیر بەپێی وەزارەت و ئاستی پاراستنی داتاکان.'
    },
    searchPlaceholder: {
      en: 'Search datasets, owners...',
      ar: 'بحث في البيانات المترابطة...',
      ku: 'گەڕان لە داتاکان و خاوەنەکان...'
    },
    headers: {
      name: {
        en: 'Dataset Name / Identification',
        ar: 'مجموعة البيانات / التعريف',
        ku: 'ناوی داتا / ناسنامەی سەرەکی'
      },
      custodian: {
        en: 'Sovereign Custodian Ministry',
        ar: 'الوزارة الحاضنة المشرفة',
        ku: 'وەزارەتی سەرپەرشتیار'
      },
      steward: {
        en: 'Data Steward Agent',
        ar: 'وكيل إدارة البيانات',
        ku: 'بەرپرسی بەڕێوەبردنی داتا'
      },
      classification: {
        en: 'Classification Tier',
        ar: 'مستوى السرية والخطورة',
        ku: 'پلەی پاراستنی زانیاری'
      },
      quality: {
        en: 'Quality Index',
        ar: 'مؤشر جودة البيانات',
        ku: 'نمرەی متمانەی داتا'
      },
      records: {
        en: 'Master Record Count',
        ar: 'عدد السجلات الموثقة',
        ku: 'ژمارەی نووسراوەکان'
      }
    },
    mappingsTitle: {
      en: 'Cross-Ministry Relational Interlock Mapping',
      ar: 'مخطط الربط والتبادل بين الوزارات',
      ku: 'نەخشەی بەستنەوەی گوازەرەوەی نێوان وەزارەتەکان'
    },
    destinationTarget: {
      en: 'Destination Target',
      ar: 'الجهة المستلمة المستهدفة',
      ku: 'مەبەستی جێگۆڕکێ'
    },
    ruleLabel: {
      en: 'Rule',
      ar: 'القاعدة الرياضية',
      ku: 'یاسا'
    },
    qualityTitle: {
      en: 'Dataset 6-Dimension Quality Assurance',
      ar: 'ضمان الجودة الفنية لستة أبعاد للبيانات',
      ku: 'پشکنینی جۆری داتا بەپێی ٦ ئاست'
    },
    dimensions: {
      completeness: {
        en: 'Completeness',
        ar: 'الاكتمال في السجلات',
        ku: 'تەواوەتی داتا'
      },
      accuracy: {
        en: 'Accuracy',
        ar: 'الدقة الرياضية',
        ku: 'ڕاستی زانیاری'
      },
      consistency: {
        en: 'Consistency',
        ar: 'الاتساق وعدم التناقض',
        ku: 'هاوسەنگی بێکێشە'
      },
      timeliness: {
        en: 'Timeliness',
        ar: 'سرعة التزامن والحداثة',
        ku: 'هاوکاتی خێرا'
      },
      uniqueness: {
        en: 'Uniqueness',
        ar: 'عدم التكرار (الفردية)',
        ku: 'تەواوی ناتەبایی'
      },
      validity: {
        en: 'Validity',
        ar: 'صحة الحقول ونوع البيانات',
        ku: 'یاسایی بوون'
      }
    },
    alertsTitle: {
      en: 'Platform Flagged Quality Alerts',
      ar: 'تنبهمات جودة البيانات المرصودة بالنظام',
      ku: 'ئاگادارکردنەوە فەرمییەکانی چاودێری جۆری داتا'
    },
    emptyAlerts: {
      en: 'Dual verification check complete. 0 structural integrity errors present on master golden fields.',
      ar: 'تم التدقيق المزدوج الموحد. صفر أخطاء فنية في سلامة الحقول البنيوية الذهبية المعتمدة.',
      ku: 'پشکنینی دوولایەنەی داتا تەواو بوو. هێچ کەموکوڕی و کێشەیەک لە پێکهاتەی داتاکاندا بەدی نەکرا.'
    }
  },
  lineage: {
    title: {
      en: 'End-to-End Dynamic Data Lineage Graph',
      ar: 'تتبع مسار سلاسل تداول البيانات والاعتمادية (Data Lineage Engine)',
      ku: 'هێڵکاری تێپەڕبوون و گواستنەوەی جۆراوجۆری زانیارییەکان'
    },
    description: {
      en: 'Comprehensive visualization of physical database systems mapped through dynamic middleware pipelines.',
      ar: 'تتبع مصادر البيانات، المسارات، والتحويلات الرياضية وصولاً إلى التقارير واللوحات الحكومية مع تحليل الأثر حياً.',
      ku: 'بینینی گشتگیر بۆ جووڵەی پایپلاینی زانیاری لە نێوان فەرمانگەکاندا بە شێوەیەکی خێرا.'
    },
    selectTitle: {
      en: '1. Select Lineage Source Entity',
      ar: '١. حدد الكيان المصدر للبيانات',
      ku: '١. سەرچاوەی دابەشبوونی زانیاری لێرە هەڵبژێرە'
    },
    telemetry: {
      en: 'Failsafe telemetry tracks data element transformations down to downstream executive decision platforms automatically.',
      ar: 'تتبع القياسات الفنية تلقائياً تحولات عناصر البيانات حتى منصات اتخاذ القرار التنفيذي لضمان عدم التناقض.',
      ku: 'پێوانەکەرە فەرمییەکان بە شێوەیەکی ئۆتۆماتیکی گۆڕانکاری داتاکان دەگوازنەوە بۆ سەکۆکانی تر بە بێ هیچ کێشەیەک یان لادانێک.'
    },
    impactTitle: {
      en: 'Live Downstream Dependency Impact Assessment',
      ar: 'تقييم الأثر المباشر للاعتمادية على الأنظمة التابعة',
      ku: 'هەڵسەنگاندنی ڕاستەوخۆی کاریگەری گۆڕانکاریی لەسەر جومگەکانی تر'
    },
    emptyImpact: {
      en: 'No downstream components impacted by this node. Isolated perimeter.',
      ar: 'لا توجد أنظمة تابعة تتأثر بهذا العنوان. النطاق معزول تماماً وحصين.',
      ku: 'هیچ کەرتی تر نییە کە بکەوێتە ژێر کاریگەری ئەم خاڵەوە. ناوەندەکە بە تەواوی جیاکراوەتەوە.'
    },
    headers: {
      impactedNode: {
        en: 'Impacted Node / Service System',
        ar: 'النظام أو الواجهة المتأثرة',
        ku: 'جگە یان واژەی کەوتوو لەژێر کاریگەری'
      },
      classificationType: {
        en: 'Classification Type',
        ar: 'نوع التصنيف الأمني',
        ku: 'پۆلێنکردنی ئاستی نهێنی'
      },
      criticalityRating: {
        en: 'Criticality Rating',
        ar: 'درجة الخطورة والحرج',
        ku: 'ڕێژەی مەترسی و گرنگی'
      },
      roleAffiliations: {
        en: 'Affected Role Affiliations',
        ar: 'الفئات الوظيفية المتأثرة بالصلاحية',
        ku: 'نازناوە فەرمییە تووشبووەکان بە گۆڕانکاری'
      }
    },
    routeMap: {
      title: {
        en: 'System Visual Pathway Route Map',
        ar: 'خارطة مسار تداول النظم الفنية للبيانات',
        ku: 'نەخشەی ڕێڕەوی گواستنەوەی جۆراوجۆری زانیارییەکان'
      },
      primaryDbs: {
        en: 'Primary DBs',
        ar: 'قواعد البيانات الأساسية',
        ku: 'قاعیدەکانی داتای سەرەکی'
      },
      rawEncrypted: {
        en: 'Raw Encrypted Sources',
        ar: 'المصادر المبدئية المشفرة',
        ku: 'سەرچاوە خاوە کۆدکراوەکانی داتا'
      },
      idgEtlNode: {
        en: 'IDG ETL Node',
        ar: 'عقدة معالجة البوابة IDG',
        ku: 'خاڵی پرۆسێسکردنی دەروازەی نیشتمانی'
      },
      resolutionEngine: {
        en: 'Resolution Engine',
        ar: 'بزوێنەري مطابقة السجلات',
        ku: 'مۆتۆڕی بڕیاردان و یەکخستن'
      },
      secureDatalake: {
        en: 'Secure Datalake',
        ar: 'بحيرة البيانات الآمنة',
        ku: 'دەریاچەی داتای پارێزراو'
      },
      goldMasterIndex: {
        en: 'Gold Master Index',
        ar: 'الفهرس الذهبي الموحد',
        ku: 'پێڕستی زێڕینی هاوبەش'
      },
      secureApi: {
        en: 'Secure API / Auth',
        ar: 'بوابة الواجهات والتصاريح',
        ku: 'سەرچاوەی دەروازەی کارپێکردن'
      },
      dualSignature: {
        en: 'Dual Signature Gate',
        ar: 'بوابة التوقيع الثنائي الموثوق',
        ku: 'دەروازەی مۆرکردنی دوولایەنە'
      }
    }
  },
  eventbus: {
    title: {
      en: 'Live Federated Event Streams',
      ar: 'تدفقات الأحداث الفيدرالية المباشرة',
      ku: 'ڕاپۆرتە ڕاستەوخۆکانی گواستنەوەی فیدراڵی'
    },
    sandboxTitle: {
      en: 'Event Broker Simulator Sandbox',
      ar: 'بيئة محاكاة موزع الأحداث المشفرة',
      ku: 'تاقیکردنەوەی خێرای ناردنی زانیاری دەروازە'
    },
    selectTopic: {
      en: 'Select Core Event Topic',
      ar: 'اختر موضوع الحدث الرئيسي للبث',
      ku: 'بابەتی گواستنەوەی سەرەکی لێرە دەستنیشان بکە'
    },
    payloadKeys: {
      en: 'Custom Payload Data Keys Structure',
      ar: 'هيكل حقول البيانات الإضافية',
      ku: 'پێکهاتەی زانیاری داتای نێو پەیڵۆد'
    },
    keyLabel: {
      en: 'Key (e.g. weight)',
      ar: 'المفتاح (مثال: الوزن)',
      ku: 'کلیل (وەکو کێش)'
    },
    valueLabel: {
      en: 'Value (e.g. 52.8)',
      ar: 'القيمة (مثال: ٥٢.٨)',
      ku: 'بەها (وەکو ٥٢.٨)'
    },
    publishBtn: {
      en: 'Publish Decoupled Event',
      ar: 'نشر وتوقيع الحدث الفيدرالي بالتوازي',
      ku: 'ناردن و بڵاوکردنەوەی زانیاری'
    },
    hmacSig: {
      en: 'HMAC Sig: ',
      ar: 'توقيع HMAC المشفر: ',
      ku: 'مۆری دیجیتاڵیی HMAC: '
    }
  },
  mdm: {
    title: {
      en: 'Golden Master Entity Resolution',
      ar: 'مطابقة البيانات وتوحيد السجلات الذهبية',
      ku: 'چارەسەرکردنی هاوتایی زانیارییە گشتییەکان'
    },
    successMessage: {
      en: '✓ 100% Resolved: All citizen and business identities reconciled successfully inside the Golden Record ledger.',
      ar: '✓ تم الحل بنسبة ١٠٠٪: تم دمج وتوحيد كافة السجلات المدنية والشركات في دفتر الحسابات الذهبي الفيدرالي المستقل بنجاح.',
      ku: '✓ بە ڕێژەی ١٠٠٪ چارەسەر کراوە: سەرجەم کۆمپانیا و ناسنامەکانی هاووڵاتیان بە سەرکەوتوویی یەکخران لە دەفتەری زێڕینی هاوبەش.'
    },
    conflictId: {
      en: 'Conflict ID: ',
      ar: 'رمز التناقض: ',
      ku: 'ناسنامەی ناکۆکی: '
    },
    matchSimilarity: {
      en: 'Match Similarity',
      ar: 'نسبة المطابقة والتشابه المشفر',
      ku: 'ڕێژەی هاوشێوەیی کۆدکراو'
    },
    conflictDetails: {
      en: 'Similarity resolution flagged potential company conflict details: ',
      ar: 'بزوێنەري مطابقة السجلات رصد تناقضاً محتملاً في التفاصيل: ',
      ku: 'سیستەمی گونجاندنی زانیاری گومان دەخاتە سەر هاوشێوەیی لە ناوی کۆمپانیاکان: '
    },
    unresolvedAttrs: {
      en: 'Unresolved attributes: ',
      ar: 'الحقول غير المطابقة المعلقة: ',
      ku: 'کەم و کوڕییەکانی نێو زانیارییەکان: '
    },
    mergeBtn: {
      en: 'Merge Golden Record',
      ar: 'دمج وتوثيق السجل الذهبي الفيدرالي',
      ku: 'یەکخستنی و تۆمارکردنی داتای فەرمی'
    },
    segregateBtn: {
      en: 'Keep Segregated',
      ar: 'إبقاء السجلات معزولة',
      ku: 'جیاکردنەوەی دۆکیومێنت'
    }
  },
  governance: {
    title: {
      en: 'Active Governance Workflows',
      ar: 'عمليات سير الحوكمة المنهجية النشطة',
      ku: 'ڕێڕەوە چالاکەکانی بەڕێوەبردنی گشتی'
    },
    requestor: {
      en: 'Requestor: ',
      ar: 'مقدّم الطلب: ',
      ku: 'داواکار: '
    },
    targeting: {
      en: 'Targeting: ',
      ar: 'المستهدف: ',
      ku: 'مەبەست: '
    },
    ministryChain: {
      en: 'Ministry Chain Sign-offs',
      ar: 'مسار التواقيع والمصادقة الوزارية',
      ku: 'ڕێڕەوی مۆرکردنی وەزارەتەکانی دەوڵەت'
    },
    signed: {
      en: '✓ Signed (',
      ar: '✓ تم التوقيع بواسطة (',
      ku: '✓ مۆرکرا لەلایەن ('
    },
    signBtn: {
      en: 'Sign Approval',
      ar: 'توقيع المصادقة',
      ku: 'مۆرکردنی ڕەزامەندی'
    }
  },
  classification: {
    TOP_SECRET: {
      en: 'Sovereign / TOP SECRET',
      ar: 'سيادي / سري للغاية',
      ku: 'سەروەر / زۆر نهێنی'
    },
    SECRET: {
      en: 'SECRET',
      ar: 'سري',
      ku: 'نهێنی'
    },
    CONFIDENTIAL: {
      en: 'CONFIDENTIAL',
      ar: 'جوانب خاصة',
      ku: 'تایبەت'
    },
    INTERNAL: {
      en: 'INTERNAL',
      ar: 'داخلي',
      ku: 'ناوخۆیی'
    }
  },
  ministry: {
    'Ministry of Finance': {
      en: 'Ministry of Finance',
      ar: 'وزارة المالية',
      ku: 'وەزارەتی دارایی'
    },
    'Prime Minister Office': {
      en: 'Prime Minister Office',
      ar: 'رئاسة الوزراء',
      ku: 'نووسینگەی سەرۆک وەزیران'
    },
    'National Security Agency': {
      en: 'National Security Agency',
      ar: 'مستشارية الأمن القومي',
      ku: 'دەزگای ئاسایشی نیشتمانی'
    },
    'Ministry of Defense': {
      en: 'Ministry of Defense',
      ar: 'وزارة الدفاع',
      ku: 'وەزارەتی بەرگری'
    },
    'Ministry of Interior': {
      en: 'Ministry of Interior',
      ar: 'وزارة الداخلية',
      ku: 'وەزارەتی ناوخۆ'
    },
    'Ministry of Trade': {
      en: 'Ministry of Trade',
      ar: 'وزارة التجارة',
      ku: 'وەزارەتی بازرگانی'
    }
  },
  role: {
    'Super Admin': {
      en: 'Super Admin',
      ar: 'مدير عام بالنظام',
      ku: 'سەرپەرشتیاری باڵا'
    },
    'Customs Admin': {
      en: 'Customs Admin',
      ar: 'مدير الجمارك',
      ku: 'سەرپەرشتیاری گومرگ'
    },
    'Border Officer': {
      en: 'Border Officer',
      ar: 'ضابط الحدود',
      ku: 'ئەفسەری سنووری'
    },
    'Intelligence Analyst': {
      en: 'Intelligence Analyst',
      ar: 'محلل استخبارات',
      ku: 'شیکەرەوەی زانیاری ئاسایشی'
    }
  },
  impactLevel: {
    CRITICAL: {
      en: 'CRITICAL',
      ar: 'حرج للغاية',
      ku: 'زۆر گرنگ و پێویست'
    },
    WARNING: {
      en: 'WARNING',
      ar: 'تحذير متوسط',
      ku: 'ئاگادارکردنەوە'
    }
  }
};

export function t(lang: Language, keyPath: string): string {
  const parts = keyPath.split('.');
  let current: any = dataFabricTranslations;
  
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

export function translateClassification(lang: Language, cls: string): string {
  if (cls in dataFabricTranslations.classification) {
    return (dataFabricTranslations.classification as any)[cls][lang];
  }
  return cls;
}

export function translateMinistry(lang: Language, ministry: string): string {
  if (ministry in dataFabricTranslations.ministry) {
    return (dataFabricTranslations.ministry as any)[ministry][lang];
  }
  return ministry;
}

export function translateRole(lang: Language, role: string): string {
  if (role in dataFabricTranslations.role) {
    return (dataFabricTranslations.role as any)[role][lang];
  }
  return role;
}
