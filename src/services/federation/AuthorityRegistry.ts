import { Language } from '../../types';

export interface AuthorityInfo {
  id: string;
  governingGovernmentId: string;
  code: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  headOfAuthority: {
    en: string;
    ar: string;
    ku: string;
  };
  responsibilities: {
    en: string[];
    ar: string[];
    ku: string[];
  };
  clearanceRequired: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
  isFederationParticipant: boolean;
}

export const AUTHORITY_REGISTRY: AuthorityInfo[] = [
  {
    id: 'AUTH-CUSTOMS-FED',
    governingGovernmentId: 'GOV-IQ-FED-01',
    code: 'FEDERAL_CUSTOMS',
    name: {
      en: 'Federal Iraqi General Administration of Customs',
      ar: 'الهيئة العامة للجمارك الاتحادية العراقية',
      ku: 'بەڕێوەبەرایەتی گشتی گومرگی فیدراڵی عێراق'
    },
    headOfAuthority: {
      en: 'Director General of Customs',
      ar: 'مدير عام الهيئة العامة للجمارك',
      ku: 'بەڕێوەبەری گشتی گومرگ'
    },
    responsibilities: {
      en: ['Southern sea port compliance matching', 'HS Code database updates', 'National Tariff collections'],
      ar: ['مطابقة الشحنات في الموانئ البحرية الجنوبية', 'تحديثات قاعدة بيانات الرموز المنسقة الجمركية', 'تحصيل الرسوم الجمركية الموحدة'],
      ku: ['پشکنینی دەروازە دەریاییەکانی باشوور', 'نوێکردنەوەی جۆری کاڵاکان HS', 'کۆکردنەوەی باج لەسەر ئاستی نیشتمان']
    },
    clearanceRequired: 'secret',
    isFederationParticipant: true
  },
  {
    id: 'AUTH-CUSTOMS-KRG',
    governingGovernmentId: 'GOV-IQ-KRG-02',
    code: 'KRG_CUSTOMS',
    name: {
      en: 'Kurdistan Region Directorate General of Customs',
      ar: 'المديرية العامة للجمارك في إقليم كوردستان',
      ku: 'بەڕێوەبەرایەتی گشتی گومرگی هەرێمی کوردستان'
    },
    headOfAuthority: {
      en: 'KRG Customs Commissioner',
      ar: 'مدير عام جمارك الإقليم',
      ku: 'بەڕێوەبەری گشتی گومرگی هەرێم'
    },
    responsibilities: {
      en: ['Northern border land gates oversight', 'Regional tariff exemptions review', 'Erbil & Duhok custom audits'],
      ar: ['الإشراف على البوابات البرية للحدود الشمالية', 'مراجعة الإعفاءات الجمركية الإقليمية استثمارياً', 'تدقيق جمركي في أربيل ودهوك'],
      ku: ['سەرپەرشتیکردنی دەروازە وشکانییەکانی باکوور', 'پێداچوونەوەی بەخشینی باجی ناوچەیی', 'وردبینی گومرگی لە هەولێر و دهۆک']
    },
    clearanceRequired: 'secret',
    isFederationParticipant: true
  },
  {
    id: 'AUTH-NID-FED',
    governingGovernmentId: 'GOV-IQ-FED-01',
    code: 'FEDERAL_IDENTITY',
    name: {
      en: 'Federal National Iraqi Unified Identity Board',
      ar: 'مديرية شؤون البطاقة الوطنية الموحدة - بغداد',
      ku: 'بەڕێوەبەرایەتی کارتی نیشتمانیی یەکگرتوو - بەغداد'
    },
    headOfAuthority: {
      en: 'First Director of Identity Systems',
      ar: 'مدير عام الأحوال المدنية والجوازات والإقامة',
      ku: 'بەڕێوەبەری گشتی باری شارستانی و پاسپۆرت'
    },
    responsibilities: {
      en: ['Federal Unified ID issuing and biometric verification', 'Root authority public keys configuration', 'National Citizen Trust framework'],
      ar: ['إصدار البطاقة الوطنية الموحدة ومطابقة البصمات الحيوية', 'إعداد مفاتيح الهيئة العامة المعتمدة', 'إطار الثقة الوطني للمواطنين'],
      ku: ['دەرکردنی کارتی نیشتمانیی و پشکنینی بایۆمەتری', 'ڕێکخستنی کلیلە گشتییەکانی دەسەڵاتی سەرەکی', 'بونیادی باوەڕی نیشتمانیی هاووڵاتیان']
    },
    clearanceRequired: 'top-secret',
    isFederationParticipant: true
  },
  {
    id: 'AUTH-NID-KRG',
    governingGovernmentId: 'GOV-IQ-KRG-02',
    code: 'KRG_IDENTITY',
    name: {
      en: 'Kurdistan Regional Digital Identity and Citizenship Platform',
      ar: 'بلاتفورم الهوية الرقمية والمواطنة لإقليم كوردستان',
      ku: 'پلاتفۆرمی ناسنامەی دیجیتاڵیی و هاووڵاتیبوونی هەرێمی کوردستان'
    },
    headOfAuthority: {
      en: 'KRG High Registrar of Digital Affairs',
      ar: 'المسجل العام للشؤون الرقمية وهويات الإقليم',
      ku: 'تۆمارکەری گشتی کاروباری دیجیتاڵیی هۆیی تاقانە'
    },
    responsibilities: {
      en: ['KRG identity records verification', 'E-Service portal security bindings', 'Regional cryptographic keys generation'],
      ar: ['التحقق من سجلات هويات إقليم كوردستان', 'ربط الخدمات الإلكترونية الموحدة للأمان', 'توليد مفاتيح التشفير للحكم الذاتي الإقليمي'],
      ku: ['پشتڕاستکردنەوەی تۆمارەکانی ناسنامەی هەرێم', 'بەستنەوەی ئەمنیی پۆرتاڵی خزمەتگوزارییەکان', 'دروستکردنی کلیلە کریپتۆگرافییەکانی هەرێم']
    },
    clearanceRequired: 'top-secret',
    isFederationParticipant: true
  },
  {
    id: 'AUTH-JOINT-COMMITTEE',
    governingGovernmentId: 'GOV-IQ-JOINT-99',
    code: 'JOINT_RECONCILIATION_BOARD',
    name: {
      en: 'Federal-Regional Coordination Committee (FRCC)',
      ar: 'اللجنة التنسيقية المشتركة بين الحكومة الاتحادية والإقليم',
      ku: 'لیژنەی هەماهەنگی هاوبەشی نێوان حکومەتی فیدراڵ و هەرێم'
    },
    headOfAuthority: {
      en: 'Joint Council High Commissioner',
      ar: 'رئيس اللجنة المشتركة العليا لإدارة التنسيق ومبادلة البيانات',
      ku: 'سەرۆکی باڵای لیژنەی هاوبەشی هەماهەنگی و گۆڕینەوەی داتا'
    },
    responsibilities: {
      en: ['Customs tariff settlement auditing', 'Cross-boundary data handshakes arbitration', 'Crisis response oversight'],
      ar: ['تدقيق وتسوية نسب الرسوم الجمركية المشتركة', 'التحكيم ومطابقة البيانات العابرة للمنافذ', 'الإشراف التنسيقي على معالجة الطوارئ والحوادث'],
      ku: ['وردبینی و چارەسەری بەشە باجە گومرگییەکان', 'ناوبژیوانی لە گۆڕینەوەی داتا لە نێوان سنوورەکان', 'سەرپەرشتی چارەسەرکردنی کێشە کتوپڕەکان']
    },
    clearanceRequired: 'top-secret',
    isFederationParticipant: true
  }
];

export function getAuthorityById(id: string): AuthorityInfo | undefined {
  return AUTHORITY_REGISTRY.find(a => a.id === id);
}

export function getAuthoritiesByGov(govId: string): AuthorityInfo[] {
  return AUTHORITY_REGISTRY.filter(a => a.governingGovernmentId === govId);
}
