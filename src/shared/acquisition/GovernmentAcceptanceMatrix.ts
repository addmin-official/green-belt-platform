export interface AcceptanceCriterion {
  id: string;
  categoryEn: string;
  categoryAr: string;
  categoryKu: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  metricEn: string;
  metricAr: string;
  metricKu: string;
  status: 'COMPLIANT' | 'WARNING' | 'PENDING';
  verificationMethodEn: string;
  verificationMethodAr: string;
  verificationMethodKu: string;
}

export class GovernmentAcceptanceMatrix {
  public static getMatrix(): AcceptanceCriterion[] {
    return [
      {
        id: "no_raw_revenue_exposure",
        categoryEn: "Data Security",
        categoryAr: "أمن البيانات",
        categoryKu: "پاراستنی داتا",
        titleEn: "Zero Raw Revenue Ledger Exposure",
        titleAr: "حظر النفاذ المطلق أو المباشر لجداول الإيرادات",
        titleKu: "بینینی سەرچاوەی داهات تەنها بە هاوتاکراوی",
        metricEn: "Zero database link requests allowed. Communication restricted strictly to cryptographic metadata.",
        metricAr: "منع كافة حزم الاتصال المالي المباشر. يقتصر التراسل على ميتاداتا التوقيع المشفر.",
        metricKu: "سفر پێویستی ڕاستەوخۆی بەستنەوەی داتابەیس. گواستنەوە تەنیا لە ڕێگەی مێتاداتا کریپتۆ دڵنیا دەبێت.",
        status: 'COMPLIANT',
        verificationMethodEn: "Automated container boundary policy rules evaluation.",
        verificationMethodAr: "اختبار فحص جدران الاتصال والسيادة على مستوى الحاويات البرمجية.",
        verificationMethodKu: "بەدواداچوونی توند بۆ ڕێسا ئەمنییەکانی دەروازە ناوەندییەکانی پڕۆژە."
      },
      {
        id: "multilingual_run",
        categoryEn: "Operational Accessibility",
        categoryAr: "سهولة الاستخدام والوصول",
        categoryKu: "ئامادەیی بەکارهێنان",
        titleEn: "Unified Trilingual Runtime Support",
        titleAr: "التعریب والکردنة والترجمة الكاملة الآنية",
        titleKu: "هاوتاکردنی ڕووکاری زمانەوانی هەر سێ زمانەکە",
        metricEn: "Complete localized runtime dictionary with instant state changes across targets (EN, AR, KU).",
        metricAr: "ترجمة كاملة فورية متزامنة لجميع الشاشات والمسميات للغات (الإنجليزية، العربية، الكردية).",
        metricKu: "ڕێکخستنی ١٠٠٪ی ڕایەر سپەیس و فایلەکانی زمان بە شێوازی خێرا بۆ زمانەکانی ئینگلیزی، عەرەبی، و کوردی.",
        status: 'COMPLIANT',
        verificationMethodEn: "Interactive UI test checking translation dictionaries completeness.",
        verificationMethodAr: "مراجعة القاموس الموحد للمصطلحات القانونية في ملفات النشر السريع.",
        verificationMethodKu: "بەدواداچوونی سەرجەم کۆنتێکستە زمانەوانییەکانی بەشی زمان."
      },
      {
        id: "federal_krg_separation",
        categoryEn: "Constitutional Mandate",
        categoryAr: "الالتزام الدستوري والقانوني",
        categoryKu: "گوێتەگرتن لە یاساکانی دەستوور",
        titleEn: "Federal / KRG Executive Gate Separations",
        titleAr: "عزل تفعيل البوابات التنفيذية لبغداد وأربيل",
        titleKu: "جیاکاری کۆنترۆڵەکانی بەغدا و هەولێر",
        metricEn: "Separate Prime Minister viewports rendering different access roles without data overlap.",
        metricAr: "بوابات إلكترونية ومستقلة لرؤساء الوزراء تمنع تداخل الصلاحيات الإجرائية أو الجغرافية.",
        metricKu: "داشبۆردی سەربەخۆ بۆ سەرۆک وەزیرانی فیدراڵ و هەرێم بەبێ تێکەڵبوونی هێڵەکانی زانیاری.",
        status: 'COMPLIANT',
        verificationMethodEn: "Simulating access credentials and testing server boundary isolation filters.",
        verificationMethodAr: "محاكاة دخول المستخدمين واختبار حزم المنع التلقائي عند تبديل الصلاحية.",
        verificationMethodKu: "تاقیکردنەوەی چوونەژوورەوەی ئەندامان بەپێی کلیلە دیاریکراوەکانی بەستەرە."
      },
      {
        id: "joint_metadata_only",
        categoryEn: "Sovereignty Isolation",
        categoryAr: "استقلالية السيادة والبيانات",
        categoryKu: "عزلکردنی داتا",
        titleEn: "Joint Metadata Interchange Isolation Check",
        titleAr: "تبادل الميتاداتا لتبديد الشكوك وحماية قواعد البيانات الحساسة",
        titleKu: "گۆڕینەوەی مێتاداتا تەنها بۆ هاوتاکردن",
        metricEn: "Hash verification values match border declarations. Zero absolute storage of raw records in joint layer.",
        metricAr: "تطابق قيم الهامش المشفر (Hashes) لتمرير الحمولات. تخليص كامل دون حفظ أوراق حساسة بالمنصة المشتركة.",
        metricKu: "هاوتاکردنی مێتاداتا و کۆدەکان. سفر گواستنەوەی تۆماری خاوی بار بۆ خزمەتگوزاری هاوبەش.",
        status: 'COMPLIANT',
        verificationMethodEn: "Sovereign policy checker scans joint query transaction logs.",
        verificationMethodAr: "مراجعة وضمان خلو مخرجات الاستعلامات المشتركة من البيانات الشخصية.",
        verificationMethodKu: "پاکتاوکردنی سیستەمی بەراوردکاری بۆ چوونە دەرەوەی تەنیا زانیاری کۆدکراو."
      },
      {
        id: "audit_trail_enabled",
        categoryEn: "Governance & Transparency",
        categoryAr: "الحوكمة والشفافية التامة",
        categoryKu: "بەدواداچوون و شەفافیەت",
        titleEn: "Tamper-Proof Audit Trail Logging Engine",
        titleAr: "محرك السجل والمتابعة المشفر غير القابل للحذف",
        titleKu: "سیستەمی تۆماری بیرنەچووی لێپرسینەوە",
        metricEn: "Every system-wide state change writes an inalterable hash log for compliance auditing.",
        metricAr: "تسجيل فوري مشفر لكل تعديل أو تبديل في الحالات الجمركية مع كفالة عدم إمكانية تعديل السجل.",
        metricKu: "زیادکردنی هۆشداریدان و تۆماری فەرمی لە کاتی هەر جوڵەیەکی نوێ بۆ ڕێگریکردن لە ونبوونی داتا.",
        status: 'COMPLIANT',
        verificationMethodEn: "Programmatically reading append-only system transition logs.",
        verificationMethodAr: "اختبار الحماية ومحاولة تعديل القيد المالي المشفر لسلامة السجل.",
        verificationMethodKu: "هەوڵدان بۆ دەستکاریکردنی تۆمارەکان و سەلماندنی بلۆکبوونیان."
      },
      {
        id: "executive_dashboards_operational",
        categoryEn: "Leadership Decision Support",
        categoryAr: "لوحات دعم القرار للقيادة العليا",
        categoryKu: "پشتیوانی بڕیار لە سەر چاودێری",
        titleEn: "Erbil & Baghdad Executive Dashboards Core",
        titleAr: "تشغيل منصات رؤساء الوزراء التنفيذية والخرائط الفورية",
        titleKu: "ڕێگەپێدانی تەواو بە لووتکەی حکومەتی هەردوو لایەن",
        metricEn: "Dashboards fully operational in real-time, loading border maps to track joint state safely.",
        metricAr: "منصات القيادة جاهزة ومفعلة وتتلقى البيانات اللحظية للمنافذ والتعرفات بنسبة جاهزية كاملة.",
        metricKu: "داشبۆردی سەرۆک وەزیران کاردەکات و نەخشەی نوێبووەوە پیشان دەدات لەگەڵ ئامارە گشتییەکان لە دەستە جیاوازەکان.",
        status: 'COMPLIANT',
        verificationMethodEn: "Visual walkthrough and operational mock verification on the real-time canvas.",
        verificationMethodAr: "تدقيق واجهات القيادة وفحص سرعة الاستجابة للنوافذ واللوحات الإحصائية.",
        verificationMethodKu: "بینینی واژۆی بە دواداچون و خێرایی نیشاندانی داتا لەسەر کایەی سەرەکی."
      }
    ];
  }
}
