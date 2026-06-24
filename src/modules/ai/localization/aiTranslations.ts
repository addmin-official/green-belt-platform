import { Language } from '../../../types';

export const aiTranslations = {
  header: {
    overwatch: {
      en: 'REPUBLIC OF IRAQ • REVENUE SHIELD DIGITAL ASSETS',
      ar: 'جمهورية العراق - قصر حماية العائد المالي الوطني',
      ku: 'کۆماری عێراق - مۆری دیجیتاڵیی داهاتی نیشتمانیی'
    },
    title: {
      en: 'Sovereign AI Brain & Model Registry (IDG Cortex)',
      ar: 'العقل الاصطناعي السيادي وخادم سجلات النماذج العصبية',
      ku: 'مێشکی زیرەکی دەستکردی نیشتمانی عێراق (IDG Cortex)'
    },
    subtitle: {
      en: 'Centralized strategic artificial intelligence network executing statecraft-grade customs categorization, currency-drain audits, biological quarantine filtering, and intercorridor logistics orchestration.',
      ar: 'الشبكة العصبية المركزية المشفرة لحماية الإيرادات ومراقبة قيم تداول البضائع واكتشاف محاولات تبييض وتهريب العملات الصعبة.',
      ku: 'تۆڕی زانیارییە ناوەندییە نیشتمانییە پارێزراوەکان بۆ پاراستنی داهات، چاودێری جووڵەی کاڵاکان و ڕێگری لە سپیکردنەوەی زیانبەخشی دراوی قورس.'
    },
    latencyLabel: { en: 'Average Latency', ar: 'متوسط زمن الاستجابة', ku: 'تێکڕای وەڵامدانەوە' },
    precisionLabel: { en: 'Precision score', ar: 'درجة الدقة المعيارية', ku: 'ڕێژەی وردی گشتی' },
    nodesLabel: { en: 'Model Nodes', ar: 'عقد النمذجة الرياضية', ku: 'گرێی مۆدێلەکان' },
    nodesValue: { en: '32 Clustered', ar: '٣٢ عقدة متصلة', ku: '٣٢ گرێی پەیوەستکراو' }
  },
  cluster: {
    title: {
      en: 'Centralized AI Neural Cluster Map',
      ar: 'خارطة العناقيد العصبية الموحدة للذكاء الاصطناعي',
      ku: 'نەخشەی سەرەکی ععقڵی زیرەکی دەستکرد'
    },
    subtitle: {
      en: 'Interactive roster map of tactical-grade neural networks, pre-trained datasets, and sovereign statecraft APIs running across Iraq custom hubs.',
      ar: 'خريطة تفاعلية للشبكات العصبية، ومجموعات البيانات والاتصالات المبرمجة الجارية عبر منافذ العراق الاتحادية.',
      ku: 'نەخشەیەکی بەهێز بۆ مۆدێلەکانی زیرەکی دەستکرد و داتاکانی ڕاهێنراو لە سەرجەم دەروازە بازرگانییەکاندا بۆ بڕیاردان.'
    },
    dutyGrade: { en: 'Duty Grade: ', ar: 'فئة العمل: ', ku: 'پلەی ئەرک: ' },
    precision: { en: 'Precision: ', ar: 'الدقة: ', ku: 'وردی: ' },
    latency: { en: 'Lat: ', ar: 'الاستجابة: ', ku: 'کاتی ناردن: ' },
    reportPrefix: { en: 'CLUSTER REPORT: ', ar: 'تقرير العنقود الموحد: ', ku: 'ڕاپۆرتی سەرەکی گومرگی: ' },
    nodeHealth: { en: 'NODE HEALTH: OPTIMAL (100% SECURE)', ar: 'صحة العقدة: ممتازة (١٠٠٪ مؤمنة)', ku: 'تەندروستی گرێکان: بەرزترین ئاست (١٠٠٪ پارێزراو)' }
  },
  playground: {
    title: {
      en: 'Prompt Registry & Sovereign Playground',
      ar: 'سجل التوجيهات الحاكمة ومنصة التجارب السيادية',
      ku: 'سەکۆی ڕاستەوخۆی ڕاهێنان و چاکسازی فڕامەکان'
    },
    subtitle: {
      en: 'Edit system instructions directly inside the statecraft prompt register, then test-run inference simulation.',
      ar: 'قم بتعديل وتطوير التوجيهات البرمجية وحزم التعليمات مباشرة، ثم شغل محاكاة القرار المستقل عاجلاً.',
      ku: 'دەستکاری ناوەڕۆکی فڕامەکانی ڕێنمایی بکە بە شێوەیەکی ڕاستەوخۆ، پاشان پشکنینی کارامەیی ئەنجام بدە.'
    },
    systemLabel: {
      en: 'Prompt Template System Instructions:',
      ar: 'التعليمات والتوجيهات الحاكمة للنظام (Prompt Instructions):',
      ku: 'ڕێنمایی و فڕامەکانی سیستەمی فەرمی:'
    },
    variablesLabel: {
      en: 'Dynamic Cargo Variables:',
      ar: 'المتغيرات الديناميكية للشحنات والمواد:',
      ku: 'گۆڕاوە چاودێریکراوەکانی بارهەڵگرەکان:'
    },
    desc: { en: 'Description', ar: 'الوصف الفني', ku: 'شیکاری کاڵا' },
    origin: { en: 'Origin', ar: 'بلد المنشأ', ku: 'وڵاتی سەرچاوە' },
    cost: { en: 'Cost Value', ar: 'التكلفة لكل طن', ku: 'بەهای نرخ بۆ هەر تەن' },
    runBtn: { en: 'Test Run Inference', ar: 'شغل محاكاة التحليل الفوري', ku: 'پشکنینی خۆکار دەستپێبکە' },
    runningBtn: { en: 'Inference...', ar: 'جاري الاستدلال...', ku: 'لێکۆڵینەوە...' },
    streamLabel: {
      en: 'Sovereign Compiler Inference Stream:',
      ar: 'مسار نتائج محرك الاستدلال السيادي المركزي:',
      ku: 'سەرچاوەی لێکدانەوەی بڕیاردانی ژیری دەستکرد:'
    },
    connecting: {
      en: 'Accessing secure AI-Cluster Model UR-Cortex-V3...',
      ar: 'جاري الدخول إلى نماذج العنقود المركزي المؤمن...',
      ku: 'پەیوەستبوون بە مێشکی زیرەکی گومرگی فیدراڵی...'
    },
    resolving: {
      en: 'Resolving custom tariff index database matrices',
      ar: 'يحلل مصفوفات قاعدة بيانات التعريفة الجمركية',
      ku: 'ڕێکخستنی جۆری کۆدی تاریفەی گشتی وڵات'
    },
    waiting: {
      en: 'Waiting for prompt compilation sequence trigger...',
      ar: 'في انتظار تفعيل تسلسل برمجة التوجيه المركزي...',
      ku: 'سیستەمی چاودێڕی بیرۆکەی پێشوەختە چالاک نییە...'
    },
    promptHelp: {
      en: 'Select any template and click "Test Run" above.',
      ar: 'اختر نموذجاً ثم انقر على "شغل محاكاة التحليل" أعلاه.',
      ku: 'سەرچاوەی فڕامەکە دەستنیشان بکە و پشکنینی خۆکار داگیرسێنە.'
    },
    jwtResponse: { en: 'Response Token: JWT-ASS-0329', ar: 'رمز الاستجابة: JWT-ASS-0329', ku: 'ناسنامەی چاودێری: JWT-ASS-0329' },
    latencyLabel: { en: 'Latency: ', ar: 'زمن الاستجابة: ', ku: 'کاتی لێکۆڵینەوە: ' }
  },
  hitl: {
    title: {
      en: 'Human-in-the-Loop Audit Console',
      ar: 'منصة التدقيق البشري للتدخل والرقابة',
      ku: 'بەشی چاودێری و وردبینی فەرمانبەرانی باڵا (HITL)'
    },
    subtitle: {
      en: 'Audit low-confidence neural decisions and apply sovereign central government overrides.',
      ar: 'تدقيق القرارات العصيبة ذات الثقة المنخفضة وفرض الإلغاء السيادي المركزي من قبل الملاك البشري.',
      ku: 'وردبینی بڕیارە نادڵنیاکان و ڕێگەپێدانی فەرمی لەلایەن بەرپرسانی گومرگ.'
    },
    completed: { en: '✓ HUMAN OVERRIDES EXPENDED', ar: '✓ اكتمل التدقيق البشري بالكامل', ku: '✓ تەواوی وردبینییەکان جێبەجێ کران' },
    completedSub: {
      en: 'All low-confidence classifier assessments have been securely audited by central agencies.',
      ar: 'تمت مراجعة وتصفية كافة الشحنات المشتبه بها من قبل الجهات والأجهزة الحكومية المختصة.',
      ku: 'هەموو بڕیارە جومگەییەکان لە لایەن دەستەی فەرمی چاودێری بە سەرکەوتوویی پشتڕاستکراونەتەوە.'
    },
    incident: { en: 'INCIDENT:', ar: 'حالة مشتبه بها:', ku: 'کێشەی بەردەست:' },
    score: { en: 'Score: ', ar: 'نسبة الثقة: ', ku: 'ئاستی متمانە: ' },
    accept: { en: 'Accept Override', ar: 'الموافقة والتمرير', ku: 'ڕێگەپێدان و پاسدان' },
    reject: { en: 'Reject & Hold', ar: 'رفض واحتراض جمركي', ku: 'ڕەتکردنەوە و دەستبەسەر' },
    ledgerTitle: {
      en: 'Secure Human Overrides Ledger:',
      ar: 'سجل الموافقات والتجاوزات البشرية الموثقة:',
      ku: 'تۆماری فەرمی کار چالاکییەکانی بەکارهێنەران:'
    },
    mitigated: { en: 'MITIGATED: ', ar: 'تم تسويتها جمركياً: ', ku: 'چارەسەرکراو: ' },
    secured: { en: 'Secured', ar: 'مؤمن', ku: 'پارێزراوە' },
    resolutionAction: { en: 'Resolution Action: ', ar: 'إجراء التدقيق البشري: ', ku: 'بڕیاری فەرماندە: ' },
    approved: { en: 'APPROVED', ar: 'موافق عليها', ku: 'ڕێگەپێدراو' },
    rejected: { en: 'REJECTED', ar: 'مرفوض كلياُ', ku: 'ڕەتکراوە' },
    certLabel: { en: 'Authorizing Cert: CIPHER-JWT-SECURE3921', ar: 'شهادة التفويض الجمركي الموثقة: CIPHER-JWT-SECURE3921', ku: 'ناسنامەی واژۆی ئەلیکترۆنی: CIPHER-JWT-SECURE3921' }
  },
  governance: {
    title: {
      en: 'Sovereign Governance Framework',
      ar: 'ميثاق وإطار الحوكمة السيادي الموحد',
      ku: 'چوارچێوەی فەرمی بەڕێوەبردن و حووکمڕانی داتا'
    },
    subtitle: {
      en: 'Every artificial intelligence model deployed within the Iraq Digital Gateway ecosystem must strictly satisfy the Supreme Sovereign Auditing Accords of 2026.',
      ar: 'يجب أن تخضع كافة نماذج الذكاء الاصطناعي المفعلة في البوابة الرقمية المشتركة لبنود ميثاق تدقيق السيادة العليا لعام ٢٠٢٦ م.',
      ku: 'هەموو مۆدێلەکانی زیرەکی دەستکردی نێو پۆرتالەکە دەبێت بە پێی یاسای مۆری سیادی گومرگی فیدراڵی بۆ ساڵی ٢٠٢٦ لەژێر چاودێری فەرمیدا بن.'
    },
    rule1Title: { en: 'No External Cloud Dependencies', ar: 'انعدام الاعتماد على السحابة الخارجية', ku: 'پشت نەبەستن بە کۆگای دەرەکی' },
    rule1Desc: {
      en: 'AI models execute in secure local Baghdad micro-servers with offline fallback support.',
      ar: 'تنفذ النماذج الذكية بالكامل محلياً داخل بغداد على خوادم حكومية معزولة وآمنة.',
      ku: 'هەموو پشکنینەکان بە شێوازی ناوخۆیی لە بەغدا چارەسەر دەکرێن بە بێ بەستنەوە بە دەرەوە یان ئینتەرنێتی گشتی.'
    },
    rule2Title: { en: 'Zero-Bias Multi-Lingual Accord', ar: 'ميثاق حظر التحيز وتعدد اللغات المعتمدة', ku: 'بێلایەنی ته‌واوی زمانه‌ فه‌رمییه‌کان' },
    rule2Desc: {
      en: 'Kurdish, Arabic, and English trade entities are evaluated utilizing identical objective semantic parameters.',
      ar: 'تتم معاملة الشحنات الكردية، العربية والإنجليزية بالتساوي وفقاً لمعايير وثوق معتدلة عادلة.',
      ku: 'زمانەکانی کوردی، عەرەبی، و ئینگلیزی بە شێوازێکی بێلایەنانە و یەکسان هەڵسەنگاندنیان بۆ دەکرێت لە مۆدێلەکاندا.'
    },
    rule3Title: { en: 'Auditable Prompt Registers', ar: 'سجلات توجيه ومعالجة خاضعة للرقابة الفورية', ku: 'تۆماری فەرمی دانیشتنەکانی چاکسازی' },
    rule3Desc: {
      en: 'All dynamic statecraft prompts require electronic signatures before deploying into live gateway channels.',
      ar: 'تتطلب التوجيهات البرمجية توقيعاً جمركياً إلكترونياً مشفراً قبل إدراجها ضمن القنوات الحية للبوابة.',
      ku: 'سەرجەم دەستکاری و پێنووسینی ڕێنماییەکان پێویستیان بە واژۆی ئەلیکترۆنی فەرمی هەیە پێش جێبەجێکردنیان.'
    }
  }
};

export function t(lang: Language, keyPath: string): string {
  const parts = keyPath.split('.');
  let current: any = aiTranslations;
  
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
