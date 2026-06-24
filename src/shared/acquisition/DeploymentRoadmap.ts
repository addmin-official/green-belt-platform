export interface Milestone {
  phaseIndex: number;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  durationEn: string;
  durationAr: string;
  durationKu: string;
  goalsEn: string[];
  goalsAr: string[];
  goalsKu: string[];
}

export class DeploymentRoadmap {
  public static getMilestones(): Milestone[] {
    return [
      {
        phaseIndex: 1,
        titleEn: "Phase I: Pilot Integration & Security Audits",
        titleAr: "المرحلة الأولى: فحص النظم وتكامل البوابات التجريبية",
        titleKu: "قۆناغی یەکەم: تاقیکردنەوەی دەروازە ناوەندییە کاتییەکان",
        durationEn: "Day 1 - Day 90",
        durationAr: "اليوم ١ - اليوم ٩٠",
        durationKu: "ڕۆژی ١ - ڕۆژی ٩٠",
        goalsEn: [
          "Deploy test container sandbox networks for selected Customs points.",
          "Perform external cryptographic audits of KRG and Federal HSM keys.",
          "Verify the zero-trust data boundary prevents raw leak transactions.",
          "Train initial customs officers on trilingual borders dashboards."
        ],
        goalsAr: [
          "نشر حزمة اختبار أمني للأنظمة والجدران في بوابات ومنافذ تجريبية مختارة.",
          "إجراء التدقيق الخارجي للمفاتيح الأمنية (HSMs) للاتحاد والإقليم.",
          "التحقق من عمل حاجز الفلترة التلقائية لمنع أي عمليات استعلام غير مرخصة.",
          "تدريب الكوادر والضباط الأوائل في المنافذ على استخدام الواجهات الثلاثية."
        ],
        goalsKu: [
          "دروستکردنی بەشی ساندبۆکس بۆ دڵنیابوون لە کوالێتی دەروازە دیاریکراوەکان.",
          "ئەنجامدانی پشکنینی گشتی کلیلی پڕۆگرامسازی و کۆدەکانی هەولێر و بەغدا.",
          "سەلماندنی عزلکردنی تەواوی داتای هاوڵاتیان لە مۆدیولە فەرمییەکان.",
          "ڕاهێنانی سەرەتایی کارمەندانی دەروازەکان لەسەر بەکارهێنانی زمانەکان."
        ]
      },
      {
        phaseIndex: 2,
        titleEn: "Phase II: Scaled Border Posts Onboarding",
        titleAr: "المرحلة الثانية: تعميم الأنظمة وربط المنافذ والسيطرات",
        titleKu: "قۆناغی دووەم: بەستنەوەی سەرجەم دەروازە سنورییەکان",
        durationEn: "Day 91 - Day 180",
        durationAr: "اليوم ٩١ - اليوم ١٨٠",
        durationKu: "ڕۆژی ٩١ - ڕۆژی ١٨٠",
        goalsEn: [
          "Scale deployment to 12 active Federal and Kurdish regional border posts.",
          "Onboard national import shipping and logistics agencies to the portal.",
          "Incorporate live unified HS-Code matching into the customs workflow.",
          "Conduct sovereign audit review meetings via the joint committee."
        ],
        goalsAr: [
          "توسيع نطاق العمل ليشمل ١٢ منفذاً وسيطرة تابعة لبغداد وأربيل.",
          "تسجيل وكالات الشحن والخدمات اللوجستية الوطنية لتسهيل التخليص الرقمي.",
          "تكامل الرموز والتعرفات المنسقة (HS-Codes) لإتمام الاحتساب الجمركي تلقائياً.",
          "عقد مراجعات السيادة الدورية بين ممثلي اللجنة العليا للتنظيم المالي."
        ],
        goalsKu: [
          "فراوانکردنی بەستنەوەی مۆدیولەکان بۆ ١٢ دەروازەی فەرمی هەرێم و بەغدا.",
          "تۆمارکردنی کۆمپانیاکانی گواستنەوەی کاڵا و کۆگاکان لەناو سیستەمەکەدا.",
          "هاوتەریبکردنی یەکپارچەیی کۆدە نێودەوڵەتییەکان لەگەڵ باجی گومرگی دەروازەکە.",
          "ئەنجامدانی کۆبوونەوەکانی لێژنەی هاوبەش بۆ چاودێریکردنی جوڵەکان."
        ]
      },
      {
        phaseIndex: 3,
        titleEn: "Phase III: Direct Sovereign Cloud Rollout",
        titleAr: "المرحلة الثالثة: الإطلاق الوطني الشامل بالسحابة السيادية والربط الكامل",
        titleKu: "قۆناغی سێیەم: بەستنەوەی سەربەخۆ لە کایەی سحابی پارێزراودا",
        durationEn: "Day 181 - Day 360",
        durationAr: "اليوم ١٨١ - اليوم ٣٦٠",
        durationKu: "ڕۆژی ١٨١ - ڕۆژی ٣٦٠",
        goalsEn: [
          "Migrate all services to secure dedicated government-owned datacenters.",
          "Enforce absolute automated revenue reconciliation with final budget transfers.",
          "Implement national statistical forecasting engines for trade strategy.",
          "Incorporate secondary checkpoints and transit corridors under Border OS."
        ],
        goalsAr: [
          "نقل كامل المنصة والخدمات إلى مراكز البيانات السحابية المملوكة بالكامل للجمهورية.",
          "إنفاذ التسوية المالية المؤتمتة والشاملة لتغذية الموازنة العامة تلقائياً.",
          "تفعيل نماذج الاستشعار والتنبؤ بالإيرادات والاحتياجات الاستهلاكية للسلع.",
          "دمج السيطرات الفرعية وممرات الترانزيت تحت مظلة نظام الحدود الشامل."
        ],
        goalsKu: [
          "گواستنەوەی تەواوی کۆدەکان بۆ سێرڤەری گشتی حکومی پارێزراو بە بێ دزەکردن.",
          "هاوتاکردنی ئۆتۆماتیکی داهاتە کۆکراوەکان لە نێوان پێگە جیاوازەکاندا.",
          "ڕێکخستنی سیستەمی هۆشەمەند بۆ کۆنتڕۆڵکردنی کەمبوونەوەی کاڵاکان لە بازاڕدا.",
          "بەستنەوەی سەرجەم ڕێگاکانی بازرگانی ناوخۆیی و گواستنەوەی گشتی لەژێر چەتری Border OS."
        ]
      }
    ];
  }
}
