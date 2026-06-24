export interface TrainingTopic {
  id: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  category: 'architecture' | 'sovereignty' | 'operation' | 'reconciliation';
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  keyTakeawayEn: string;
  keyTakeawayAr: string;
  keyTakeawayKu: string;
}

export const TrainingTopicRegistry: TrainingTopic[] = [
  {
    id: 'architecture_overview',
    titleEn: 'Decoupled Multi-Enclave Architecture',
    titleAr: 'البنية الهيكلية المنفصلة متعددة الجيوب',
    titleKu: 'تەلارسازی جیاکراوەی فرە ئەنکلاڤ',
    category: 'architecture',
    descriptionEn: 'Isolation of raw Federal and KRG databases at the network and physical datastore layer to secure regional information enclaves.',
    descriptionAr: 'عزل قواعد تداول البيانات الاتحادية والإقليمية بالكامل ماديًا وبرمجيًا لتأمين سرية البيانات وسلطتها الإقليمية.',
    descriptionKu: 'جیاکردنەوەی تەواوی بنکەدراوەی فیدراڵ و هەرێم لەسەر ئاستی فیزیکی و هێڵ بۆ دەستەبەرکردنی سەروەری زانیارییەکان.',
    keyTakeawayEn: 'Physical separation replaces complex access controls, making data leakage technically impossible.',
    keyTakeawayAr: 'العزل المادي يمنع تسرب البيانات نهائياً بدلاً من الاعتماد على جدران الصلاحيات البسيطة.',
    keyTakeawayKu: 'جیاکردنەوەی فیزیکی ڕێگری لە دزەکردنی دراوەکان دەکات لە جیاتی بەدەسەڵاتکردنی کۆنترۆڵەکان.'
  },
  {
    id: 'sovereign_limits',
    titleEn: 'Regional Sovereign Borders',
    titleAr: 'حدود السيادة الإقليمية للبيانات',
    titleKu: 'سنوورەکانی سەروەری هەرێمی',
    category: 'sovereignty',
    descriptionEn: 'Strict routing limitations ensuring KRG raw citizen profiles (KRDPASS) and corporate books (BRS) reside strictly on regional systems.',
    descriptionAr: 'القيود البرمجية التي تضمن بقاء هويات المواطنين الكرد وسجلات الشركات ضمن خوادم أربيل الإقليمية بأمان.',
    descriptionKu: 'مەرجە توندەکانی پێوەست بە مانەوەی ناسنامە کاتییەکان و ناونیشانی کۆمپانیاکان لەناو خزمەتگوزارییەکانی هەولێر.',
    keyTakeawayEn: 'The platform cannot execute cross-border raw database queries by design.',
    keyTakeawayAr: 'المنصة لا تدعم الاستعلام العابر للحدود عن السجلات الأصلية والبيانات الديموغرافية.',
    keyTakeawayKu: 'سیستەمەکە لێپرسینەوەی دەرەکی بۆ بنکەدراوە ناوخۆییەکان جێبەجێ ناکات.'
  },
  {
    id: 'joint_metadata_model',
    titleEn: 'Metadata-Only Joint Consolidation',
    titleAr: 'التوحيد المشترك للميتا-داتا فقط',
    titleKu: 'کۆکردنەوەی هاوبەشی مێتاداتا',
    category: 'reconciliation',
    descriptionEn: 'The Joint Operations layer parses only SHA-256 fingerprint validation hashes and transaction status codes with zero personal details.',
    descriptionAr: 'منصة العمليات المشتركة لا تستقبل سوى بصمات التحقق المشفرة ومعاملات التتبع دون أي تفاصيل شخصية أو مالية.',
    descriptionKu: 'تەوەرەی هاوبەش تەنها کۆدی پشتڕاستکردنەوە کۆدکراوەکان SHA-256 و نیشانەکانی جێبەجێکردن وەردەگرێت بێ زانیاری کەسی.',
    keyTakeawayEn: 'Auditors evaluate validation tokens, ensuring clearance without looking at sensitive raw records.',
    keyTakeawayAr: 'يقوم المدققون بمطابقة بصمات التحقق فقط لضمان تدوير المعاملات الجمركية دون كشف المستندات الأصلية.',
    keyTakeawayKu: 'چاوپێکەوتنی هاوبەش متمانە بە کۆدە نهێنییەکان دەکات بێ پیشاندانی دۆسییە فەرمییەکان.'
  },
  {
    id: 'real_provider_wiring',
    titleEn: 'Staging Operational Provider Rule',
    titleAr: 'تصنيف جاهزية مزودي المرحلة الانتقالية',
    titleKu: 'یاسای گرێدانی دابینکەری ئەزموونی',
    category: 'operation',
    descriptionEn: 'All live administrative connections remain in unconfigured offline mode. Staging relies on local compliance checklists to protect borders.',
    descriptionAr: 'جميع خطوط الاتصال الفعلي مع النظم الحكومية تظل غير موصلة بمرحلة الاستعداد لتفادي تمرير عمليات وهمية.',
    descriptionKu: 'تەواوی هێڵەکانی گرێدانی فەرمی بە ناچالاکی دەمێننەوە بۆ ڕێگری لە بەکارهێنانی دراوی ڕاستەقینە لە کاتی ئەزمووندا.',
    keyTakeawayEn: 'We do not fake production readiness. Proper approval packages must precede real-world credential setups.',
    keyTakeawayAr: 'لا ندعي جاهزية النشر الفعلي دون الحصول على مفاتيح الاتصال الرسمية من قبل هيئة تكنولوجيا المعلومات.',
    keyTakeawayKu: 'ئێمە دۆخی جاهیزیەتی بێ مەرج تۆمار ناکەین چونکە پێویستمان بە واژۆی فەرمی هەیە.'
  }
];
