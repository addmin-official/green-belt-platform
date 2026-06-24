export interface ValuePoint {
  id: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  pointsEn: string[];
  pointsAr: string[];
  pointsKu: string[];
  statEn: string;
  statAr: string;
  statKu: string;
}

export class ExecutiveValueProposition {
  public static getValueProps(): ValuePoint[] {
    return [
      {
        id: "federal_iraq_value",
        titleEn: "Federal Iraq Value Proposition",
        titleAr: "القيمة المضافة للحكومة الاتحادية العبّاسية",
        titleKu: "بەهای زێدە بۆ حکومەتی فیدراڵی عێراق",
        pointsEn: [
          "Constitutional reassurance: Central verification of every customs and trade entry record.",
          "Revenue consolidation: Real-time tracking of due border shares directly into Baghdad treasuries.",
          "Sovereignty enforcement: Full authority over international cargo quotas, unified tariff matching, and security alerts.",
          "Integrity safeguards: Real-time automated leakage tools prevent unauthorized customs waivers."
        ],
        pointsAr: [
          "طمأنينة دستورية: التحقق المركزي من مطابقة كل سجل وبيان جمركي في كافة منافذ العراق.",
          "تعزيز الخزينة الاتحادية: متابعة الإيرادات الجمركية المستحقة لبغداد بشكل فوري ولحظي.",
          "إنفاذ السيادة الوطنية: الإشراف الكامل على حصص الاستيراد والتعرفة الجمركية الثنائية ومنظومة الإنذار.",
          "مكافحة الهدر المالي: رصد مبرمج لأي استثناءات غير مبررة للرسوم والجمارك لمنع التلاعب."
        ],
        pointsKu: [
          "دڵنیایی دەستووری: کۆنترۆڵ و بەدواداچوونی هاوتاکردنی بڕی باج لە سەرجەم مۆدیولەکان.",
          "ڕێکخستنی داهاتی فیدراڵی: بینینی جوڵەی پارە جێگیربووەکانی دەروازەکان لە کاتی گونجاودا بۆ خەزێنەی بەغدا.",
          "جێبەجێکردنی دەسەڵاتەکان: سەرپەرشتی تەواوی مۆڵەتەکانی بازرگانی و کۆدە نێودەوڵەتییەکانی کاڵا.",
          "شەفافیەتی دژە گەندەڵی: ڕێگریکردنی پڕۆگرامسازی لە هەر هەوڵێکی لادان لە باج یان پێدانی لێبووشانی نایاسایی."
        ],
        statEn: "+32% Target Treasury Integration Rate",
        statAr: "+٣٢٪ زيادة متوقعة في ربط الإيرادات الاتحادية",
        statKu: "٪٣٢+ بەرزبوونەوەی دڵنیایی کۆکردنەوەی داهات"
      },
      {
        id: "krg_value",
        titleEn: "KRG Autonomy & Local Protection Value",
        titleAr: "حماية الخصوصية والاستقلال المالي وحكومة الإقليم",
        titleKu: "پاراستنی خۆبەڕێوەبەری و خزمەتگوزاری لۆکاڵی هەرێم",
        pointsEn: [
          "Sovereign data isolation: Zero backdoor federal reads of Kurdish personnel and citizen records.",
          "Local operation fallback: Complete border post processing speed independent of central connection state.",
          "Autonomous regional keying: Cryptographic receipts signed locally with Kurdistan KRG-authorized HSM keys.",
          "Budget stabilization triggers: Precise cooperative stats help unblock legitimate constitutional transfers."
        ],
        pointsAr: [
          "عزل مطلق للبيانات السيادية: منع النفاذ المركزي لكل بيانات هوية المواطنين وأفراد الأمن الكوردستانيين.",
          "مرونة تشغيلية محلية: استقلال تام في مراكز السيطرة الجمركية لضمان التدفق التجاري عند انقطاع الشبكات.",
          "مفاتيح إقليمية مأمنة: توقيع المعاملات محلياً بمفاتيح أمنية تصادق عليها حكومة كوردستان حصراً.",
          "مسرعات صرف الموازنة: دقة التقارير المشتركة تنهي الجدل السياسي وتدعم استئناف صرف المستحقات الدستورية."
        ],
        pointsKu: [
          "عزلکردنی داتای هاوڵاتیان: هیچ دەرکەوتنێک بۆ زانیاری کەسی کارمەند و هاوڵاتیانی هەرێم بوونی نییە بۆ بەغدا.",
          "بەردەوامی کارکردن: دەروازە گومرگییەکانی هەرێم سەربەخۆ کار دەکەن بێ وەستان لە کاتی نەمانی هێڵەکاندا.",
          "واژۆی ئەلیکترۆنی هەرێم: بەکارهێنانی کلیلە پارێزراوەکانی هەرێم HSM بۆ مۆرکردنی فەرمی بەڵگەنامە مامەڵەی گشتی.",
          "ڕێکخستنی شایستە داراییەکان: پێدانی داتای پشتڕاستکراوی بەراوردکاری بۆ ناردنی بەشە موازەنەی فەرمی."
        ],
        statEn: "100% Core Regional Database Protection Isolation",
        statAr: "١٠٠٪ حماية تامة لقواعد ومستندات الإقليم الحساسة",
        statKu: "١٠٠٪ پاراستنی بێ مەرجی داتابەیسی سەربەخۆی هەرێم"
      },
      {
        id: "joint_sovereign_cooperation",
        titleEn: "National Coordination & Anti-Leak Parity",
        titleAr: "التكامل الوطني ومكافحة التهرب المشترك",
        titleKu: "هاوئاهەنگی نیشتمانی و دڵنیایی بەراوردکاری هاوبەش",
        pointsEn: [
          "Shared cryptographic ledger consistency check ensures both parties recognize cargo state without zero leaks.",
          "Automatic mismatch alerts block importers trying to double-submit duplicate licenses or tariffs.",
          "Unified digital indicators enable objective inter-governmental monitoring dashboards."
        ],
        pointsAr: [
          "مطابقة حسابية مشفرة: تأكيد سلامة البضائع دون كشف الأوراق الثنائية الحساسة.",
          "منع التكرار الآلي: إيقاف محاولات تقديم مۆڵەت بازرگانی لۆکاڵی یان فیدراڵی مكرر في موانئ بغداد أو أربيل.",
          "مؤشرات رقمية يغلب عليها الحياد: تضمن حيادية أجهزة الرقابة لتغذية بوابات التطبیق الوطنية."
        ],
        pointsKu: [
          "هاوتاکردنی زنجیرەیی ڕێساکان: دڵنیابوون لەوەی هەردوو لایەن ڕێککەوتوون لەسەر ڕێژەی گومرگ بێ دزەکردنی زانیاری.",
          "بلۆککردنی سەرپێچییەکان: سیستەمەکە بە خێرایی ڕێگری دەکات لە هەر پێشکەشکردنێکی دووبارەی مۆڵەتدانە کاتییەکان.",
          "نیشانە گشتییە نەبڕاوەکان: پێدانی بڕیار لەسەر بنەمای زانیاری ڕوون کێ دەسەڵاتدار ڕەوتبوو."
        ],
        statEn: "0.00% Verification Leak Incident Vectors",
        statAr: "٠.٠٠٪ معدل حوادث تسريب البيانات خلال المطابقة",
        statKu: "٠.٠٠٪ ڕێژەی کێشە و دزەکردنی زانیاری بەراوردکاری هاوبەش"
      }
    ];
  }
}
