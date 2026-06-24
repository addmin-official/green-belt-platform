export interface SuccessMetric {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  targetEn: string;
  targetAr: string;
  targetKu: string;
  verificationEn: string;
  verificationAr: string;
  verificationKu: string;
  status: 'COMPLIANT' | 'RISK' | 'ALERT';
}

export class PilotSuccessMetrics {
  public static getMetrics(): SuccessMetric[] {
    return [
      {
        id: "border_processing_time",
        nameEn: "Customs Clearance & Border Wait Reduction",
        nameAr: "تخفيض زمن الانتظار والتخليص الجمركي للشاحنات",
        nameKu: "کەمکردنەوەی کاتی چاوەڕوانی بارەکان لە سنور",
        targetEn: "Average wait time reduced below 45 minutes from prior manual 8-hour processing queues.",
        targetAr: "تقليل زمن الانتظار لأقل من ٤٥ دقيقة بدلاً من ٨ ساعات متبادلة للتدقيق الورقي.",
        targetKu: "کەمکردنەوەی کاتی وەستانی بارەکان بۆ ژێر ٤٥ خولەک لە کاتی بەراوردکاری کاغذە کۆنەکان.",
        verificationEn: "Calculated automatically using biometric digital check-in and checkout entry logs.",
        verificationAr: "يتم احتسابه فلياً بمقارنة الطابع الزمني للدخول والخروج من البوابات الذكية للمنفذ.",
        verificationKu: "حیسابکردنی ئۆتۆماتیکی پڕۆگرامی لە کاتی لێدانی واژۆ ئەلیکترۆنییەکانی دەروازەکان.",
        status: "COMPLIANT"
      },
      {
        id: "leakage_prevention_rate",
        nameEn: "Sovereign Revenue Leakage Prevention Share",
        nameAr: "معدل رصد التهرب ومنع تسرب الإيرادات السيادية",
        nameKu: "ڕێژەی ڕێگریکردن لە گەندەڵی و ونبوونی داهات",
        targetEn: "Zero unrecognized duplicate tariff attempts. Audit flags must address 100% of HS-Code valuation variances.",
        targetAr: "منع كامل لمحاولات تقديم الرخص المكررة مع معالجة كافة اختلافات تصنيف الرسوم تلقائياً.",
        targetKu: "پلەی سفر بۆ مۆڵەتنامە فێڵاوییەکان و کۆنتڕۆڵکردنی ١٠٠٪ی باجی دروست.",
        verificationEn: "Cross-checked monthly by comparing simulated trade flows against final audit trail balances.",
        verificationAr: "مطابقة شهرية لسجلات الرسوم المصدقة مع قيم مخرجات الميزانية لإنفاذ الشفافية.",
        verificationKu: "هاوتاکردنی مانگانەی داهاتی گشتی گومرگەکان لەگەڵ ژمێریاری ناوەندی پڕۆژە.",
        status: "COMPLIANT"
      },
      {
        id: "sovereign_data_integrity",
        nameEn: "Sovereign Citizen Personnel Access Isolation",
        nameAr: "سلامة جدران العزل للبيانات والمعلومات الشخصية لمواطني الإقليم",
        nameKu: "پەسەندکردنی ١٠٠٪ی مۆدیولی جیاکاری داتای کەسی",
        targetEn: "Zero unauthorized queries logged. Complete containment of regional personnel files inside Erbil systems.",
        targetAr: "انعدام مطلق لأي عمليات خرق أو استعلام عن تفاصيل الموظفين بوزارات الإقليم.",
        targetKu: "هیچ گواستنەوەیەکی زانیاری کەسی تۆمارنەکراوە بۆ دەرەوەی فلتەرە ئەمنییەکان.",
        verificationEn: "Automated network trace analyzers verify all inter-governmental APIs transmit metadata only.",
        verificationAr: "فحص تقني دوري للشبكة يؤكد اقتصار التراسل مع بغداد على الميتاداتا وحسابات الهاش.",
        verificationKu: "سیستەمی چاودێری تەکنیکی بەدواداچوونی پێکهاتەکان دەکات بۆ پاراستنی داتا.",
        status: "COMPLIANT"
      },
      {
        id: "trilingual_dictionary_operational",
        nameEn: "Trilingual System Interface Performance Support",
        nameAr: "جاهزية واستقرار تشغيل الواجهات والترجمات الحية",
        nameKu: "سەرکەوتوویی زمانەکانی ئامادەی کار لە سیستەمەکە",
        targetEn: "100% literal dictionary translation accuracy under fast state translation triggers.",
        targetAr: "جاهزية اللغات وتطابق دقيق للمسميات القانونية بنسبة استخدام كاملة في الواجهات.",
        targetKu: "هاوتاکردنی تەواوی زمانەکان بە بێ هیچ کێشەیەکی زمانەوانی فەرمی.",
        verificationEn: "Continuous interface unit testing with immediate logs on localized dictionary failures.",
        verificationAr: "أداة تدقيق وفحص اللغات ترصد تلقائياً مخرجات الترجمة لملفات النشر لضمان الدقة.",
        verificationKu: "سیستەمی تاقیکاری زمانەکان بە خێرایی کێشە کاتییەکانی ڕێزمانی دیاری دەکات.",
        status: "COMPLIANT"
      }
    ];
  }
}
