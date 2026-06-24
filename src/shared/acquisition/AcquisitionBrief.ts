export interface ProblemItem {
  id: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  descEn: string;
  descAr: string;
  descKu: string;
}

export interface SolutionModule {
  id: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  descEn: string;
  descAr: string;
  descKu: string;
  badgeEn: string;
  badgeAr: string;
  badgeKu: string;
}

export class AcquisitionBrief {
  public static getProblems(): ProblemItem[] {
    return [
      {
        id: "border_fragmentation",
        titleEn: "Border Fragmentation",
        titleAr: "تفتت إدارة المنافذ الحدودية",
        titleKu: "پەرتەوازەیی دەروازە سنورییەکان",
        descEn: "Lack of central technical alignment leads to disjointed enforcement of security, clearance, and safety guidelines across customs points.",
        descAr: "غياب التنسيق التقني والرقابي الموحد يؤدي لعدم تماثل إجراءات التخليص والأمن بين المنافذ المختلفة.",
        descKu: "نەبوونی هەماهەنگی تەکنیکی دەبێتە هۆی لاوازی و ناڕێکی لە پڕۆسەکانی دڵنیایی و پاسەوانی سنورەکان."
      },
      {
        id: "revenue_leakage",
        titleEn: "Sovereign Revenue Leakage",
        titleAr: "تسرب الإيرادات السيادية",
        titleKu: "دزەکردنی داهاتە سەروەرییەکان",
        descEn: "Non-standardized declaration records and tax evasion attempts deplete billions in national and regional treasury income.",
        descAr: "التلاعب بالفواتير والتهرب الضريبي يؤدي لضياع مليارات الدولارات من خزائن الدولة الاتحادية والإقليمية.",
        descKu: "تۆمارنەکردنی گومرگی دروست و التهرب الضريبي دەبێتە هۆی لەدەستدانی ملیارەها دۆلار لە داهاتی گشتی."
      },
      {
        id: "customs_opacity",
        titleEn: "Customs Tariffs Opacity",
        titleAr: "غياب الشفافية في التعرفة الجمركية",
        titleKu: "ناڕوونی لە کۆدی باج و گومرگ",
        descEn: "Uncoordinated HS-Code classifications create massive trade bottlenecks and lack of transparent audits for global shipping lines.",
        descAr: "عدم تطابق الأنظمة وتطبيق المعايير (HS-Codes) يولد اختناقات تجارية وصعوبة بالغة في الرقابة الدولية.",
        descKu: "نەبوونی تەنسیق لەسەر کۆدە نێودەوڵەتییەکان کێشە بۆ بازرگانان دروست دەکات."
      },
      {
        id: "federal_krg_mistrust",
        titleEn: "Federal / KRG Historical Mistrust",
        titleAr: "غياب الثقة التاريخية والبيانات المتبادلة",
        titleKu: "ناڕوونی و بێ متمانەیی مێژوویی",
        descEn: "Fears of unilateral overreach block federal consolidation, requiring automated, non-repudiation zero-trust boundaries.",
        descAr: "مخاوف التدخل الإداري الأحادي تعرقل التعاون المشترك، مما يتطلب بروتوكولات عزل تقنية تضمن السيادة للطرفين.",
        descKu: "مەترسییەکانی لادانی یەک لایەنە و تێکەڵبوونی داتا متمانە ناهێڵێت، ئەمەش پێویستی بە مۆدیولی زیرەک هەیە."
      },
      {
        id: "weak_joint_verification",
        titleEn: "Weak Joint Verification Tools",
        titleAr: "ضعف آليات التحقق والتدقيق المشترك",
        titleKu: "لاوازی سیستەمەکانی بەراوردکاری هاوبەش",
        descEn: "Manual reconciliation results in human errors and delays, blocking constitutional budgets and sharing ratios.",
        descAr: "عمليات التسوية الورقية واليدوية تؤدي لتأخير إقرار الموازنات وتطابق الإيرادات المالية الفعلية.",
        descKu: "بەراوردکاری بە شێوازی دەستی پڕە لە هەڵەی مرۆیی، ئەمەش بەشە بودجەی هاوڵاتیان ڕادەگرێت."
      }
    ];
  }

  public static getSolutions(): SolutionModule[] {
    return [
      {
        id: "border_os",
        titleEn: "Border Intelligence OS",
        titleAr: "نظام تشغيل الحدود الذكي (Border OS)",
        titleKu: "سیستەمی کارپێکردنی دەروازە سنورییەکان",
        descEn: "A unified platform for secure, digitalized e-gates, checkpoint queues, tracking, and localized scanning integration.",
        descAr: "منصة متطورة لإدارة البوابات الإلكترونية، تدفق الشاحنات، والمراسلات الأمنية المشفرة في الميدان.",
        descKu: "سیستەمێکی پێشکەوتوو بۆ بەڕێوەبردنی دەروازە ئەلیکترۆنییەکان و ڕێگاوبانی بارەکان.",
        badgeEn: "Operational Integrity",
        badgeAr: "سلامة العمليات",
        badgeKu: "سلامەتی جوڵەکان"
      },
      {
        id: "customs_core",
        titleEn: "Decentralized Customs Core",
        titleAr: "محرك الجمارك والتعرفة اللامركزي",
        titleKu: "کایەی گومرگی ناوەندی بێگەرد",
        descEn: "Ensures standardized HS-Code verification and tariff calculation locally near checkpoints to maximize trade flow.",
        descAr: "يقوم باحتساب التعرفة الجمركية الموحدة آلياً ويمنع التلاعب بالحمولة محلياً لتسريع حركة الاستيراد.",
        descKu: "هاوتاکردنی کۆدە جیهانییەکان و حیسابکردنی باج لە شوێنی دەروازەکە بۆ دڵنیابوون لە خێرایی بازرگانی.",
        badgeEn: "Trade Flow",
        badgeAr: "التدفق التجاري",
        badgeKu: "ڕەوتی بازرگانی"
      },
      {
        id: "revenue_core",
        titleEn: "Sovereign Revenue Core",
        titleAr: "سجل الإيرادات السيادية المؤمن",
        titleKu: "کایەی داهاتی سەروەری",
        descEn: "Tamper-proof ledger processing based on secure cryptographic hash chains that seal state income from checkpoints.",
        descAr: "سجلات مالية مشفرة بـ (Hash Chains) غير قابلة للتزوير أو الحذف تضمن صيانة الإيرادات العامة للدولة.",
        descKu: "تۆماری دارایی مأمن بە شێوازی کۆدکردنی زنجیرەیی کە ڕێگری دەکات لە هەر لادانێکی داتا.",
        badgeEn: "Zero Leakage",
        badgeAr: "صفر تسريب مالی",
        badgeKu: "سفر دزەکردنی داتا"
      },
      {
        id: "trade_core",
        titleEn: "Sovereign Trade License Core",
        titleAr: "منظومة رخص الاستيراد والتصدير السيادية",
        titleKu: "کایەی مۆڵەتدانی بازرگانی گشتی",
        descEn: "Allocates and monitors commercial trade licenses automatically within unified legal and sovereign quotas.",
        descAr: "تسيير الحصص والموافقات التجارية ضمن السقوف القانونية المقرة من الجهات العليا دون تداخل.",
        descKu: "ڕێکخستنی مۆڵەتە فەرمییەکان بە پێی ڕێژە دەستوورییەکان بە شێوازی ئۆتۆماتیکی.",
        badgeEn: "Quota Enforcement",
        badgeAr: "إنفاذ الحصص القانونية",
        badgeKu: "جێبەجێکردنی ڕێژەکان"
      },
      {
        id: "transparency_core",
        titleEn: "Transparency & Integrity Analyzer",
        titleAr: "محرك النزاهة وكشف التلاعب المالي",
        titleKu: "کایەی پاکی و دژە گەندەڵی",
        descEn: "AI-driven anomaly classifier mapping irregular transport routes, valuation deviations, and tariff inconsistencies.",
        descAr: "محاكاة ذكية لكشف الاختلاف في الموازين، تحوير الفواتير، والمسارات التجارية الملتوية للتهرب.",
        descKu: "پڕۆسێسی زیرەکی ئۆتۆماتیکی بۆ دیاریکردنی جیاوازی جوڵەی دەروازەکان و کێشی بارەکان.",
        badgeEn: "Leak Detection",
        badgeAr: "كشف التهرب",
        badgeKu: "دۆزینەوەی لادانەکان"
      },
      {
        id: "executive_separation",
        titleEn: "Executive Portals Separation",
        titleAr: "عزل البوابات التنفيذية للقيادة",
        titleKu: "جیاکاری کۆنترۆڵە سەرەکییەکان",
        descEn: "Ensures Baghdad and Erbil prime ministers possess dedicated, non-overlapping viewports tailored to national law.",
        descAr: "فصل مطلق لبوابات الرقابة التنفيذية لحكومة بغداد وحكومة كوردستان لضمان السيادة والاستقلالية.",
        descKu: "جیاکردنەوەی تەواوی کۆنترۆڵەکانی سەرۆکایەتی هەردوو حکومەت بەپێی دەسەڵاتە فەرمییەکان.",
        badgeEn: "Constitutional Safety",
        badgeAr: "الحماية الدستورية",
        badgeKu: "پاراستنی دەستووری"
      },
      {
        id: "data_isolation",
        titleEn: "Sovereign Data Isolation Layers",
        titleAr: "جدران عزل البيانات السيادية التامة",
        titleKu: "تەوەرەکانی جیاکاری داتای لۆکاڵی",
        descEn: "Strict database containment where citizen records are kept private. Integration communicates securely via metadata and public counts.",
        descAr: "عزل تام لبيانات المواطنين الحساسة مع قصر المطابقة في المنصة الوطنية على رموز الميتاداتا والأرقام الكلية.",
        descKu: "پاراستنی تایبەتمەندی ناسنامە و بەڵگەنامە گشتییەکانی هاوڵاتیان لە ڕێگەی عزلکردنی ناوەندی بەهێز.",
        badgeEn: "Zero-Trust Privacy",
        badgeAr: "خصوصية مطلقة",
        badgeKu: "سەربەخۆیی تەواو"
      }
    ];
  }
}
