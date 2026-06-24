export interface PilotPhase {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  timeframeEn: string;
  timeframeAr: string;
  timeframeKu: string;
  activitiesEn: string[];
  activitiesAr: string[];
  activitiesKu: string[];
}

export class PilotImplementationPlan {
  public static getPilotPhases(): PilotPhase[] {
    return [
      {
        id: "federal_point_setup",
        nameEn: "1. Federal Gate Pilot Setup (Ibrahim Al-Khalil / Safra Core Link)",
        nameAr: "١. تهيئة المنفذ التجريبي الاتحادي (سيمالكا أو منفذ سفوان)",
        nameKu: "١. ئامادەکردنی دەروازەی ئەزموونی فیدراڵی نیشتمانی",
        timeframeEn: "Day 1 - Day 30",
        timeframeAr: "اليوم ١ - اليوم ٣٠",
        timeframeKu: "ڕۆژی ١ - ڕۆژی ٣٠",
        activitiesEn: [
          "Deploy the Border OS terminal container at the federal custom check post.",
          "Activate raw tariff calculations unified with Baghdad's Central Customs Board.",
          "Test live biometric scanners integrations with local HSM buffers.",
          "Verify logging of append-only audit trail records."
        ],
        activitiesAr: [
          "نشر نظام تشغيل الحدود (Border OS) في مركز التدقيق الجمركي الاتحادي.",
          "تفعيل محاكاة التعرفة الجمركية الاتحادية المقرة بالتكامل مع بغداد.",
          "فحص بوابات المسح الإلكتروني الذكي محلياً مع توفير السجلات الآمنة.",
          "تأكيد تقييد السجلات في أرشيف الحماية اللامتناهي غير القابل للتعديل."
        ],
        activitiesKu: [
          "بەستنەوەی کۆمپیوتەری دەروازەی فیدراڵی بە سیستەمی زیرەکی Border OS.",
          "ڕێکخستنی یاساکانی گومرگی بە شێوازێکی هاوتا لەگەڵ لیژنەی باڵا.",
          "تاقیکردنەوەی خزمەتگوزاری چاودێری دەروازە ئەلیکترۆنییەکان.",
          "دڵنیابوون لەوەی تۆمارەکان بە شێوازێکی گونجاو پارێزراون."
        ]
      },
      {
        id: "krg_point_setup",
        nameEn: "2. KRG Gate Autonomous Link (Haji Omeran / Bashmakh Setup)",
        nameAr: "٢. تهيئة منفذ إقليم كوردستان المستقل (حاج عمران أو باشماخ)",
        nameKu: "٢. ئامادەکردنی دەروازەی سەربەخۆی هەرێمی کوردستان",
        timeframeEn: "Day 31 - Day 60",
        timeframeAr: "اليوم ٣١ - اليوم ٦٠",
        timeframeKu: "ڕۆژی ٣١ - ڕۆژی ٦٠",
        activitiesEn: [
          "Establish isolated local database node at the Kurdish boundary point.",
          "Enforce regional custom encryption keys utilizing KRG hardware security credentials.",
          "Verify regional citizen details and personal data remain locked within Erbil networks.",
          "Simulate temporary internet line cutoffs to validate offline clearance caching."
        ],
        activitiesAr: [
          "تأسيس نقطة خادم وقاعدة بيانات جمركية معزولة ونشطة داخل حدود الإقليم.",
          "فرض مفاتيح التشفير التلقائي المعتمدة لدى وزارة مالية إقليم كوردستان.",
          "ضمان بقاء زوار وهويات أمن المنافذ مشفرة ومصانة كلياً غي فروع كوردستان.",
          "محاكاة قطع شبكة الاتصال والإنترنت لمدة ٢٤ ساعة لاختبار كفاءة التشغيل دون اتصال."
        ],
        activitiesKu: [
          "دانانی سێرڤەر و داتابەیسی لۆکاڵی هەرێم بۆ دڵنیابوون لە خۆبەڕێوەبەری.",
          "بەکارهێنانی کلیلە پارێزراوەکانی زاپ بۆ مۆرکردنی مۆڵەتەکانی گومرگی هەرێم.",
          "ڕێگریکردن لە هەر هەوڵێکی دەرەوە بۆ بینینی ناسنامەی هاوڵاتیانی هەرێم.",
          "تاقیکردنەوەی فلتەرکردنی جوڵەکان بە بێ بوونی هێڵی بەیەکبەستن بۆ ٢٤ کاتژمێر."
        ]
      },
      {
        id: "joint_dashboard_reconcile",
        nameEn: "3. Joint Sovereign Reconciliation Integration & Review",
        nameAr: "٣. تفعيل لوحة المطابقة السيادية والتسوية المالي اللحظية المشتركة",
        nameKu: "٣. بەستنەوەی داشبۆردی هاوبەش و تاقیکردنەوەی کۆتایی",
        timeframeEn: "Day 61 - Day 90",
        timeframeAr: "اليوم ٦١ - اليوم ٩٠",
        timeframeKu: "ڕۆژی ٦١ - ڕۆژی ٩٠",
        activitiesEn: [
          "Mount the supreme cooperative dashboard for joint operations delegates.",
          "Verify the matching logic parses only non-reversible cryptographic hashes.",
          "Complete real-time ledger consistency check with zero administrative leaks.",
          "Submit final pilot validation logs to the Technical Steering Committee."
        ],
        activitiesAr: [
          "تثبيت لوحة القيادة والمطابقة المشتركة لأعضاء لجنة التنسيق العليا.",
          "التحقق المخبري من عدم إمكانية استرجاع البيانات الأصلية من الهاش المشترك.",
          "إتمام مطابقة المبيعات والجمارك بشكل كامل دون الكشف عن السجلات الحساسة.",
          "رفع التقرير النهائي للجنة التقنية العليا لتسهيل الحصول على رخصة الاستحواذ."
        ],
        activitiesKu: [
          "دانانی داشبۆردی گشتی لێژنەی باڵا بۆ نوێنەرانی بەغدا و هەولێر.",
          "تاقیکردنەوەی هاوتاکردنی داهاتەکان تەنها لە ڕێگەی دەقە کۆدکراوەکانی پڕۆژە دڵنیا.",
          "هاوتەریبکردنی تۆمارەکان بە بێ دەرکەوتنی هیچ کێشەیەکی دزەکردنی داتا.",
          "ئامادەکردنی بەڵگەنامەی گرێبەستەکە بۆ کڕینەوەی فەرمی لەلایەن وەزارەتەکانەوە."
        ]
      }
    ];
  }
}
