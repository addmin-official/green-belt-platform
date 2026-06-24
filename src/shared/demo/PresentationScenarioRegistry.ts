export interface PresentationScenario {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  targetRole: 'FEDERAL_PM' | 'KRG_PM' | 'JOINT_COMMANDER' | 'ALL';
  associatedView: string;
}

export class PresentationScenarioRegistry {
  private static activeScenarioId = 'joint_view';

  private static scenarios: PresentationScenario[] = [
    {
      id: 'federal_view',
      nameEn: 'Federal PM View',
      nameAr: 'رؤية رئيس الوزراء الاتحادي',
      nameKu: 'بینینی سەرۆک وەزیرانی فیدراڵی',
      descriptionEn: 'Inspect absolute Federal-only revenue ledgers, intelligence, and border customs under Baghdad control.',
      descriptionAr: 'استعراض الحسابات الموحدة والإيرادات والجمارك التابعة لسيطرة بغداد المباشرة فقط.',
      descriptionKu: 'بینینی سەرجەم داهات و گومرگ و داتاکانی ژێر کۆنترۆڵی ڕاستەوخۆی بەغدا.',
      targetRole: 'FEDERAL_PM',
      associatedView: 'federal'
    },
    {
      id: 'krg_view',
      nameEn: 'KRG PM View',
      nameAr: 'رؤية رئيس وزراء الإقليم',
      nameKu: 'بینینی سەرۆک وەزیرانی هەرێم',
      descriptionEn: 'Inspect Kurdish autonomous regional custom points, regional revenue pools, and secure regional HSM status.',
      descriptionAr: 'استعراض نقاط الجمارك والإيرادات الذاتية لإقليم كوردستان تحت مظلة التشفير الإقليمي.',
      descriptionKu: 'بینینی داهات و گومرگەکانی هەرێمی کوردستان بەپێی دەسەڵاتی هەرێمی.',
      targetRole: 'KRG_PM',
      associatedView: 'krg'
    },
    {
      id: 'joint_view',
      nameEn: 'Joint View',
      nameAr: 'المنصة المشتركة',
      nameKu: 'بینینی هاوبەش',
      descriptionEn: 'Showcase unified statistics, cooperative matching indices, and cryptographic hashes of agreement without raw leaks.',
      descriptionAr: 'رؤية الإحصاءات المشتركة ومؤشرات المطابقة والرموز المشفرة المتفق عليها دون كشف البيانات الخام.',
      descriptionKu: 'نیشاندانی ئامار و هاوتاکردنی لایەنەکان تەنها بەپێدانی کۆدی متمانە بەبێ دزەکردنی داتا.',
      targetRole: 'JOINT_COMMANDER',
      associatedView: 'joint'
    },
    {
      id: 'revenue_isolation',
      nameEn: 'Revenue Isolation View',
      nameAr: 'رؤية عزل الإيرادات',
      nameKu: 'بینینی جیاکاری داهات',
      descriptionEn: 'Verify programmatic walls between federal tax registries and regional revenue pipelines.',
      descriptionAr: 'التحقق البرمجي التام من عزل سجلات الضرائب والجمارك الكلية بين بغداد وأربيل.',
      descriptionKu: 'سەلماندنی دیوار و جیاکاری نێوان داتاکانی باج و گومرگی بەغدا و هەولێر.',
      targetRole: 'ALL',
      associatedView: 'revenue_isolation'
    },
    {
      id: 'customs_flow',
      nameEn: 'Customs Flow View',
      nameAr: 'معالجة جمارك المنافذ',
      nameKu: 'ڕەوتی مامەڵەی گومرگی',
      descriptionEn: 'Walk through import declarations and HS-Code matching verification across decentralized points.',
      descriptionAr: 'متابعة دورة البيانات الجمركية ومطابقة التعرفة الجمركية الثنائية بشكل مباشر.',
      descriptionKu: 'بینینی ڕەوتی گومرگ و کۆدە نێودەوڵەتییەکان لە سەرجەم دەروازەکاندا.',
      targetRole: 'ALL',
      associatedView: 'customs'
    },
    {
      id: 'border_flow',
      nameEn: 'Border Flow View',
      nameAr: 'المراقبة الحدودية المتكاملة',
      nameKu: 'چاودێری دەروازە سنورییەکان',
      descriptionEn: 'Monitor live entry gates, security scans, biometric validation counts, and active threat alarms.',
      descriptionAr: 'مراقبة البوابات المباشرة، الفحص الذكي، مطابقة البصمات، والتنبيه الأمني الفوري.',
      descriptionKu: 'بینینی بڕینی دەروازەکان و ناسنامە دەرەکییەکان و هۆشدارییە ئەمنییەکان.',
      targetRole: 'ALL',
      associatedView: 'border'
    },
    {
      id: 'anti_corruption',
      nameEn: 'Anti-Corruption View',
      nameAr: 'مكافحة الفساد والشفافية',
      nameKu: 'ڕووبەڕووبوونەوەی گەندەڵی',
      descriptionEn: 'Display audit engines, automated leakage warnings, and cross-border customs declarations mismatch checks.',
      descriptionAr: 'استعراض محرك كشف التلاعب المالي، إنذارات النزاهة والتدقيق التلقائي التام.',
      descriptionKu: 'بینینی سیستەمی بڕیار لەسەر هۆکاری سەرپێچییەکان بە بەڵگەوە بەبێ لادان.',
      targetRole: 'ALL',
      associatedView: 'anti_corruption'
    },
    {
      id: 'lang_switching',
      nameEn: 'Language Switching View',
      nameAr: 'رؤية اللغات المتعددة',
      nameKu: 'بینینی زمانەکان',
      descriptionEn: 'Showcase real-time UI localization across Inter, Arabic, and Kurdish layout models.',
      descriptionAr: 'تغيير فوري وذكي للواجهة الرسومية بناءً على خيارات اللغة المختارة.',
      descriptionKu: 'گۆڕینی زمانەکان بە شێوازی داینامیکی بەپێی زمانی کۆمەڵەکان.',
      targetRole: 'ALL',
      associatedView: 'lang'
    }
  ];

  public static getScenarios(): PresentationScenario[] {
    return this.scenarios;
  }

  public static getActiveScenario(): PresentationScenario {
    return this.scenarios.find(s => s.id === this.activeScenarioId) || this.scenarios[2];
  }

  public static setActiveScenario(id: string): void {
    if (this.scenarios.some(s => s.id === id)) {
      this.activeScenarioId = id;
    }
  }
}
