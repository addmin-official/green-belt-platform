export interface DashboardClass {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  category: 'Executive' | 'Operational' | 'Readiness' | 'Provider' | 'Presentation' | 'Admin-only' | 'User-facing';
  intendedAudienceEn: string;
  intendedAudienceAr: string;
  intendedAudienceKu: string;
  allowedRoles: string[];
  sensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  jurisdictionContextEn: string;
  jurisdictionContextAr: string;
  jurisdictionContextKu: string;
  demoPointEn: string;
  demoPointAr: string;
  demoPointKu: string;
  isAdminOnly: boolean;
}

export const DashboardTrainingRegistry: DashboardClass[] = [
  {
    id: 'national_command',
    nameEn: 'National Command Center',
    nameAr: 'مركز القيادة الوطني الموحد',
    nameKu: 'سەنتەری کۆنترۆڵی نیشتمانی',
    category: 'Executive',
    intendedAudienceEn: 'Federal Ministers and KRG Cabinet Advisors',
    intendedAudienceAr: 'الوزراء والمسؤولون الاتحاديون ومستشارو الإقليم',
    intendedAudienceKu: 'وزیرەکان و ڕاوێژکارانی باڵای هەرێم',
    allowedRoles: ['Federal Executive Viewer', 'KRG Executive Viewer', 'Joint Auditor'],
    sensitivity: 'MEDIUM',
    jurisdictionContextEn: 'Joint / Separation via access tokens',
    jurisdictionContextAr: 'مشترك مع الفصل الحسابي للصلاحيات',
    jurisdictionContextKu: 'هاوبەش لەگەڵ جیاکردنەوەی بنکەدراوەکان',
    demoPointEn: 'Visualizes national KPI aggregates without listing sensitive corporate books.',
    demoPointAr: 'يعرض المؤشرات الكلية للنقاط دون تداول أي معلومات ديموغرافية خاصة.',
    demoPointKu: 'ئامارە گشتییەکان گوزارشت دەکات بێ پیشاندانی زانیاری بازرگانی تایبەتی.',
    isAdminOnly: false
  },
  {
    id: 'border_point',
    nameEn: 'Border Point Operational Controller',
    nameAr: 'وحدة التحكم الميدانية للمنافذ',
    nameKu: 'کۆنترۆڵکەری گومرگی دەروازەکان',
    category: 'Operational',
    intendedAudienceEn: 'On-site customs clearing officers and operators',
    intendedAudienceAr: 'مفتشو الجمارك وموظفو التخليص في المنافذ',
    intendedAudienceKu: 'ئەفسەران و کارمەندانی گومرگی دەروازە سنورییەکان',
    allowedRoles: ['Federal Customs Officer', 'KRG Customs Officer', 'Border Operator'],
    sensitivity: 'HIGH',
    jurisdictionContextEn: 'Isolated (Federal/KRG local posts separate)',
    jurisdictionContextAr: 'منفصل بالكامل (النقاط الاتحادية منفصلة عن نقاط الإقليم)',
    jurisdictionContextKu: 'جیاکراوە (دەروازەکانی فیدراڵ و هەرێم بە جیا کار دەکەن)',
    demoPointEn: 'Border clerks submit verification receipts with instantaneous local route checks.',
    demoPointAr: 'تسمح للمفتشين بتمرير الشحنات وترحيل المعاملات المسجلة محلياً في ثوانٍ.',
    demoPointKu: 'نوسرە گومرگییەکان تۆمار دەکات و بە خێرایی کورتەکۆد بۆ هەرێم یان ناوەند دروست دەکات.',
    isAdminOnly: false
  },
  {
    id: 'production_gate',
    nameEn: 'Production QA Compliance Monitor',
    nameAr: 'بوابة جودة الإنتاج ورقابة الامتثال',
    nameKu: 'بەرنامەی چاودێری کوالێتی و پابەندی',
    category: 'Readiness',
    intendedAudienceEn: 'Technical auditors, DevOps managers, compliance leads',
    intendedAudienceAr: 'مدققو النظم ومهندسو العمليات ومشرفو الامتثال التقني',
    intendedAudienceKu: 'ئەفسەرانی وردبینی تەکنیکی و بەڕێوەبەرانی سیستم',
    allowedRoles: ['Technical Administrator', 'Security Analyst'],
    sensitivity: 'LOW',
    jurisdictionContextEn: 'Universal Technical Alignment',
    jurisdictionContextAr: 'التقييم التقني والبرمجي العام والحيادي',
    jurisdictionContextKu: 'هەڵسەنگاندنی تەکنیکی سەرانسەری',
    demoPointEn: 'Ensures no mock controllers exist and that the codebase passes build safety and leak checks.',
    demoPointAr: 'تضمن خلو البرمجيات من ثغرات البناء ومطابقة الحدود البرمجية للسيادة.',
    demoPointKu: 'پشکنین دەکات بۆ دڵنیابوون لە نەبوونی فایلی ساختە و هاوتەریببوونی سیستمەکە گومرگ.',
    isAdminOnly: true
  },
  {
    id: 'integration_wiring',
    nameEn: 'Technical Integration Hub',
    nameAr: 'منصة الربط وتوصيل مزودي الخدمة',
    nameKu: 'تەوەرەی گرێدانی تەکنیکی و دابینکەران',
    category: 'Provider',
    intendedAudienceEn: 'Technical Integration Teams',
    intendedAudienceAr: 'المطورون ومسؤولو تكامل النظم الخارجية',
    intendedAudienceKu: 'بەڕێوەبەرانی تەکنیکی و گرێدانی سیستمەکان',
    allowedRoles: ['Technical Administrator'],
    sensitivity: 'HIGH',
    jurisdictionContextEn: 'Universal Technical (Enforces fallbacks)',
    jurisdictionContextAr: 'تقني اتحادي وإقليمي مشترك لتعريف المعابر',
    jurisdictionContextKu: 'زانستی هاوبەش بۆ دیاریکردنی هێڵەکان',
    demoPointEn: 'Monitors endpoints and marks official paths as NOT_CONFIGURED until physical credentials exist.',
    demoPointAr: 'تراقب الخوادم وتبقي خطوط الاتصال غير نشطة لحين إرسال مفاتيح الاعتماد الرسمية.',
    demoPointKu: 'چاودێری خزمەتگوزارییەکان دەکات و دۆخی ناچالاکی دەپارێزێت تا کاتی پێدانی دەسەڵات.',
    isAdminOnly: true
  }
];
export const DashboardClassificationsMap = {
  Executive: 'Executive Dashboards',
  Operational: 'Operational Dashboards',
  Readiness: 'Readiness / QA Dashboards',
  Provider: 'Provider / Integration Dashboards',
  Presentation: 'Presentation / Demo Dashboards',
  'Admin-only': 'Admin-only Dashboards',
  'User-facing': 'User/operator Dashboards'
};
export const DashboardClassificationsMapAr = {
  Executive: 'لوحات القيادة التنفيذية',
  Operational: 'لوحات القيادة التشغيلية',
  Readiness: 'لوحات الجاهزية والامتثال',
  Provider: 'لوحات الربط وتوصيل الشبكة',
  Presentation: 'لوحات العرض لغايات الشرح',
  'Admin-only': 'لوحات مخصصة للمدير التقني',
  'User-facing': 'لوحات مخصصة للموظف والعميل'
};
export const DashboardClassificationsMapKu = {
  Executive: 'داشبۆردی سەرکردایەتی باڵا',
  Operational: 'داشبۆردی گشتی دەروازەکان',
  Readiness: 'داشبۆردی جاهیزیەت و وردبینی',
  Provider: 'داشبۆردی سەرچاوە دەرەکییەکان',
  Presentation: 'داشبۆردی پیشاندانی دێمۆ',
  'Admin-only': 'داشبۆردی تایبەت بە بەڕێوەبەر',
  'User-facing': 'داشبۆردی کارمەند و بەکارهێنەر'
};
