export interface CommercialModel {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  descEn: string;
  descAr: string;
  descKu: string;
  costEn: string;
  costAr: string;
  costKu: string;
  benefitsEn: string[];
  benefitsAr: string[];
  benefitsKu: string[];
}

export class CommercialModelOptions {
  public static getModels(): CommercialModel[] {
    return [
      {
        id: "sovereign_saas",
        nameEn: "Sovereign Cloud Subscription (SaaS Licence)",
        nameAr: "اشتراك سحابي سيادي مخصص (SaaS)",
        nameKu: "مۆڵەتی بەکارهێنانی سحابی پارێزراو (SaaS Licence)",
        descEn: "Standard deployment over encrypted host containers with full regional isolation guarantees. Paid yearly per active state node.",
        descAr: "نشر سحابي مأمن ومحاط بالكامل بجدران الحماية لتوفير الاستقلالية. دفع سنوي لكل منفذ حدودي نشط.",
        descKu: "بەستنەوەی فەرمی کۆمەڵە سێرڤەرێکی پارێزراو بۆ دابینکردنی دڵنیایی. پێدانی ساڵانە بەپێی جوڵەی کاراکتەرەکە.",
        costEn: "Per-node subscription model",
        costAr: "نموذج اشتراك ميسر لكل منفذ حدودي",
        costKu: "سیستەمی ساڵانەی گونجاو بۆ هەر مۆدیولێک",
        benefitsEn: [
          "Regular trilingual security patch installations",
          "Automated ledger backup redundancy",
          "Access to updated international HS-Code catalog updates"
        ],
        benefitsAr: [
          "تثبيت فوري ومستمر لترقيعات الأمان ثلاثية اللغات.",
          "نسخ احتياطي مبرمج وقوي لكافة الدفاتر المالية المشفرة.",
          "تحديث تلقائي لقائمة الرموز والتعرفات المنسقة دولياً."
        ],
        benefitsKu: [
          "باشکردنی هێڵە ئەمنییەکان بە شێوازی مانگانە بۆ زمانە جیاوازەکان.",
          "وەرگرتنی پشتیوانی داتابەیس بە شێوازێکی ئۆتۆماتیکی زنجیرەیی.",
          "هاوتەریبکردنی فەرمی نوێترین کۆدە نێودەوڵەتییەکانی مۆڵەت."
        ]
      },
      {
        id: "annual_sla",
        nameEn: "24/7 National Support & SLA Contract",
        nameAr: "عقد الدعم الصيانة والتشغيل المركزي الدائم (SLA)",
        nameKu: "گرێبەستی پشتیوانی ٢٤ کاتژمێری و چاکسازی فەرمی",
        descEn: "Dedicated on-premise engineers stationed at Erbil and Baghdad leadership offices to guarantee 99.99% operational uptime.",
        descAr: "نشر فرق هندسية متخصصة ومقيمة في مكاتب رؤساء الوزراء لضمان استمراریة تشغيل المنصة بنسبة ٩٩٫٩٩٪.",
        descKu: "دابینکردنی ئەندازیارانی شارەزا لە هەردوو ئۆفیسی هەولێر و بەغدا بۆ چارەسەرکردنی خێرای درزەکانی کار.",
        costEn: "Fixed annual service contract",
        costAr: "عقد سنوي ثابت للدعم الفني الشامل",
        costKu: "گرێبەستی ساڵانەی جێگیر نیشتمانی",
        benefitsEn: [
          "Immediate emergency hotfix deployment within 30 minutes",
          "Custom dashboard adaptation based on legislative revisions",
          "Officer hardware integration tuning and calibration"
        ],
        benefitsAr: [
          "معالجة المشكلات والأعطال الطارئة فوراً خلال ٣٠ دقيقة كحد أقصى.",
          "تطوير وتعديل لوحات التحكم والتقارير عند تعديل القوانين المالية.",
          "معايرة الأجهزة الطرفية وتكامل بوابات الفحص الضوئي مع الحدود."
        ],
        benefitsKu: [
          "هۆت فیکسی خێرا لە کاتی هەر پچڕانێکدا لە ماوەی ٣٠ خولەکدا.",
          "دەستکاریکردنی تابلۆی ئامارەکان بەپێی گۆڕانکارییەکانی یاسا داراییەکان.",
          "هاوتاکردنی مەکینەکانی خوێندنەوەی کارتی ناسنامەی هاوڵاتی."
        ]
      },
      {
        id: "pilot_low_risk",
        nameEn: "Low-Risk 90-Day Pilot Engagement",
        nameAr: "العقد التجريبي محدود المخاطر (٩٠ يوماً)",
        nameKu: "گرێبەستی تاقیکاری گونجاو کلیلی ٩٠ ڕۆژە",
        descEn: "Targeted deployment at one federal gateway (Baghdad) and one regional gateway (Erbil) to validate constitutional metadata compliance.",
        descAr: "تكامل تجريبي محدود يشمل منفذاً اتحادياً واحداً وآخراً إقليمياً لتأكيد مطابقة البيانات وحماية الخصوصية الجمركية.",
        descKu: "بەستنەوە بۆ تاقیکردنەوەی یەک مۆدیولی ناوەندی بەغدا و یەک کایەی لۆکاڵی هەولێر بۆ سەلماندنی دڵنیایی.",
        costEn: "One-off pilot evaluation quote",
        costAr: "تكلفة تقييمية مقطوعة لمرة واحدة للجنة الفنية",
        costKu: "تێچووی یەکجارە بۆ هەڵسەنگاندنی ئەمنی سیستەمەکە",
        benefitsEn: [
          "Zero administrative long-term lock-in",
          "Complete programmatic access matrices demonstration",
          "Formal compliance evaluation report for legislative acquisition voting"
        ],
        benefitsAr: [
          "عدم وجود أي التزام إداري أو مالي طويل الأمد خلال الفحص.",
          "إتاحة العرض والتعريف للمطابقات على مستوى اللجان الفنية.",
          "تقديم تقرير رسمي مالي وأمني للجمهورية للتصديق البرلماني."
        ],
        benefitsKu: [
          "سفر کێشەی پابەندبوونی درێژخایەن لە کاتی دڵنیا نەبوون.",
          "پیشاندان و هەڵسەنگاندنی تەواوی ڕێڕەوەکانی داتابەیسی لۆکاڵی.",
          "ئامادەکردنی ڕاپۆتی کۆتایی ئەمنی بۆ پێشکەشکردن بە پەرلەمان."
        ]
      },
      {
        id: "public_private_ppp",
        nameEn: "Public-Private Partnership (PPP) Integration",
        nameAr: "خطة الشراكة بين القطاعين العام والخاص (PPP)",
        nameKu: "شێوازی گرێبەستی هاوبەشی لەگەڵ کەرتی تایبەت (PPP)",
        descEn: "Revenue-share contract where the infrastructure investment is pre-funded, offsetting setup costs through verified customs leak-prevention recovery shares.",
        descAr: "عقد مشاركة يعتمد تمويل البنية التحتية ذاتياً، لتسترد التكاليف كنسبة مئوية من الأموال المستردة للنزاهة المالية.",
        descKu: "پێدانی تێچووەکان لە ڕێگەی هاوبەشییەوە بەپێی بڕی زیادبوونی داهات کە لە ئەنجامی ڕێگری گەندەڵی بەدەست دێت.",
        costEn: "% of recovered leakages",
        costAr: "نسبة مستقطعة من الأموال المستردة للنزاهة فقط",
        costKu: "ڕێژەی دیاریکراو لە داهاتی گەڕاوەی ڕاستەقینە",
        benefitsEn: [
          "Zero upfront implementation capital required from government budgets",
          "Complete risk transfer of hosting and technology integration",
          "Fastest possible deployment timeline"
        ],
        benefitsAr: [
          "صفر تمويل مباشر مقدم من الموازنة الاتحادية أو الإقليمية.",
          "نقل كامل مخاطر التكنولوجيا والاستضافة الفنية للطرف المشغل.",
          "سرعة تنفيذ وإطلاق وطني فوري لضمان الكفاءة القصوى."
        ],
        benefitsKu: [
          "سفر بودجەی پێشوەختە لە خەزێنەی دارایی نیشتمانی لە قۆناغی سەرەتادا.",
          "گواستنەوەی سەرجەم مەترسییەکانی لۆجیستیک بۆ لایەنی پەرەپێدەر.",
          "خێراترین کاتی جێبەجێکردن بەمۆدێلی فرە زامنی."
        ]
      }
    ];
  }
}
