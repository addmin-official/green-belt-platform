export interface DemoScriptSection {
  titleEn: string;
  titleAr: string;
  titleKu: string;
  targetStakeholder: string;
  briefingGoalEn: string;
  briefingGoalAr: string;
  briefingGoalKu: string;
  talkingPointsEn: string[];
  talkingPointsAr: string[];
  talkingPointsKu: string[];
  keyIndicatorsEn: string[];
  keyIndicatorsAr: string[];
  keyIndicatorsKu: string[];
}

export class ExecutiveDemoScript {
  private static scripts: DemoScriptSection[] = [
    {
      titleEn: "I. Federal Iraq Cabinet Speaking Script",
      titleAr: "أولاً: النص التوجيهي لمجلس الوزراء الاتحادي",
      titleKu: "یەکەم: دەقی ڕێنمایی بۆ ئەنجومەنی وەزیرانی فیدراڵ",
      targetStakeholder: "FEDERAL_STAKEHOLDERS",
      briefingGoalEn: "Confirm Baghdad central sovereignty, constitutional customs collection, and database isolation parity.",
      briefingGoalAr: "تأكيد السيادة الجمركية الموحدة لبغداد مع كفالة عدم تعدي البيانات الإقليمية الخاصة.",
      briefingGoalKu: "سەلماندنی دەسەڵاتی فیدراڵی بەسەر دەروازەکان و خەزێنەی ناوەندی بە بێ تێپەڕاندنی عزلەکە.",
      talkingPointsEn: [
        "Baghdad core systems verify 100% of national trade volumes and tariff matching indices.",
        "Raw local tax registries in Erbil remain isolated, proving compliance with decentralization laws.",
        "Zero biometric leaks recorded across active checkpoints, satisfying supreme federal security directives."
      ],
      talkingPointsAr: [
        "منظومة بغداد الاتحادية تدقق وتتحرى 100% من مؤشرات التعريفات والجمارك الوطنية.",
        "سجلات الضرائب المحلية الخاصة بأربيل تبقى معزولة تماماً بما يتوافق مع القوانين الاتحادية المرعية.",
        "لم يسجل أي تسريب للسمات الحيوية للبصمات في جميع النقاط والسيطرات الحدودية المشتركة."
      ],
      talkingPointsKu: [
        "سیستەمەکانی بەغدا ١٠٠٪ی ڕێژەی گومرگی نیشتمانی هاوتا دەکەن لەگەڵ لێپرسینەوەی یاسایی.",
        "تۆماری باج و داهاتی لۆکاڵی هەرێمی کوردستان لە چوارچێوەیەکی سەربەخۆ دایە.",
        "هیچ دەرکەوتنێکی بایۆمەتری دروست نەبووە لە دەروازەکان لەگەڵ پاراستنی باوەڕپێکراو."
      ],
      keyIndicatorsEn: ["Federal Registry Isolation: 100% Active", "Baghdad Key Certification Nodes: Secure"],
      keyIndicatorsAr: ["نسبة عزلم الحسابات الاتحادية: 100%", "مفاتيح توثيق مركزية بغداد: مأمنة بالكامل"],
      keyIndicatorsKu: ["ڕێژەی عزلکردنی فیدراڵی: ١٠٠٪ چالاکە", "کلیلەکانی پشتڕاستکردنەوەی بەغدا: پارێزراوە"]
    },
    {
      titleEn: "II. Kurdistan Regional Government Cabinet Briefing",
      titleAr: "ثانياً: الدليل الإرشادي لحكومة إقليم كوردستان",
      titleKu: "دووەم: ڕێبەرنامەی فەرمی بۆ حکومەتی هەرێمی کوردستان",
      targetStakeholder: "KRG_STAKEHOLDERS",
      briefingGoalEn: "Affirm regional administrative autonomy, HSM crypto keys, and data confidentiality limits.",
      briefingGoalAr: "ضمان حماية الخصوصية الدستورية والذاتية لإيرادات وجمارك الإقليم المبرمجة بالكامل.",
      briefingGoalKu: "دڵنیادان لە پاراستنی خۆبەڕێوەبەری دارایی و گومرگی هەرێم بەپێی یاساکانی هەرێمی کوردستان.",
      talkingPointsEn: [
        "Regional border gates run autonomous local clearance caches with fallback offline operations.",
        "Citizen records and personnel assignments are digitally locked inside Kurdish boundaries.",
        "Joint integration layer is strictly transactional—Baghdad has zero raw access to Erbil servers."
      ],
      talkingPointsAr: [
        "النقاط الجمركية للإقليم تدير تعاملاتها التخليصية ذاتياً في خوادم الإقليم الآمنة.",
        "سجلات المواطنين والتعيينات والروستر الأمني مشفرة ومغلقة تماماً داخل حدود كوردستان.",
        "منصة المطابقة المشتركة لا تستورد أو تطلع على أي قاعدة بيانات خاصة بوزارة دارایی الإقليم."
      ],
      talkingPointsKu: [
        "دەروازەکانی هەرێم کار دەکەن لە ڕێگەی سیستەمی لۆکاڵی سەربەخۆ لە کاتی پچڕانی هێڵەکاندا.",
        "زانیاری هاوڵاتیان و کارمەندانی هەرێم کۆدکراون لەناو بازنەی داتابەیسی لۆکاڵی هەولێردا.",
        "هاوئاهەنگی نێوانمان تەنیا بە گۆڕینەوەی مێتاداتا دەبێت بەبێ پێدانی هیچ داتایەکی خاو."
      ],
      keyIndicatorsEn: ["KRG HSM Crypto Signature: ACTIVE", "Citizen Personnel Privacy Audit: PASS"],
      keyIndicatorsAr: ["التوقيع الإلكتروني لمفاتيح الإقليم: نشط", "تدقيق خصوصية هويات المواطنين: ممتاز"],
      keyIndicatorsKu: ["کلیلی پارێزراوی هەرێم HSM: چالاکە", "تدقیقی تایبەتمەندی هاوڵاتیان: سەرکەوتووە"]
    },
    {
      titleEn: "III. Joint Operations Committee Alignment Script",
      titleAr: "ثالثاً: بروتوكول اللجنة العليا المشتركة للمنافذ والإيرادات",
      titleKu: "سێیەم: پڕۆتۆکۆلی لێژنەی باڵای هاوبەشی دەروازە و داهاتەکان",
      targetStakeholder: "JOINT_COMMITTEE",
      briefingGoalEn: "Confirm high-level indicators matching and trade corridors stats without data leaks.",
      briefingGoalAr: "عرض التماسك والشفافية وتجنب التهرب المالي اللحظي والتبادل المعلوماتي المشفر.",
      briefingGoalKu: "پیشاندانی شەفافیەتی نیشتمانی و هاوئاهەنگی بازرگانی بێ هاوتاکردنی لایەنە ناکۆکەکان.",
      talkingPointsEn: [
        "Automated trade corridor volumes and security alerts coordinate securely in real-time.",
        "Cryptographic hashes prove matching customs manifests from borders without sharing raw cargo logs.",
        "Cooperative reconciliation counters function with zero database exposure on either side."
      ],
      talkingPointsAr: [
        "تنسيق فوري للمؤشرات التجارية الوطنية والإنذارات الأمنية للحدود بشكل آمن وسريع.",
        "مطابقة البيانات جمركياً عبر مقارنة قيم الهاش المشفرة لبيانات الحمولة والشاحنات لتبديد الشكوك.",
        "تشغيل حاسبات التسوية للإيرادات دون أي تخزين عشوائي للبيانات التفصيلية لكلا الطرفين."
      ],
      talkingPointsKu: [
        "هەماهەنگی خێرا لە نێوان نیشاندەرە گشتییەکانی دەروازە سنورییەکان لە کاتی ڕاستەقینەدا.",
        "هاوتاکردنی گومرگی بارەکان لە ڕێگەی بەراوردکاری کۆدی کریپتۆگرافی بەبێ پێدانی زانیاری کاڵاکان.",
        "پڕۆسەی دارایی خێرا جێبەجێ دەبێت بێ ئەوەی لایەنێک داتابەیسی لۆکاڵی ئەوی تر بخوێنێتەوە."
      ],
      keyIndicatorsEn: ["Joint Corridor Mismatch Alarm: ENABLED", "Cryptographic Hash Validation Rate: 100%"],
      keyIndicatorsAr: ["منبه تفاوت حمولات المنافذ: مفعل", "معدل تطابق قيم الهاش الجمركي: 100%"],
      keyIndicatorsKu: ["هۆشداری جیاوازی بارەکان: چالاکە", "ڕێژەی هاوتاکردنی دەقە کۆدکراوەکان: ١٠٠٪"]
    },
    {
      titleEn: "IV. Technical Steering Committee Audit Playbook",
      titleAr: "رابعاً: دليل اللجنة التقنية الوطنية لتدقيق السيادة البرمجية",
      titleKu: "چوارەم: ڕێبەری هێڵی سەرەکی تدقیقی ئەمنی سیستەم",
      targetStakeholder: "TECHNICAL_COMMITTEE",
      briefingGoalEn: "Verify zero-trust microservice policies, circular import blocking, and static audit validation.",
      briefingGoalAr: "إثبات خلو الأنظمة من أي ربط مباشر أو تداخل برمجي عشوائي بين فروع ومكونات المنصة.",
      briefingGoalKu: "سەلماندنی عزلکردنی پڕۆگرامسازی لە ڕێگەی گفوگۆ لۆکاڵییەکان و نەبوونی لادان لە مەرجەکان.",
      talkingPointsEn: [
        "AST rules scan the shared workspace and prevent circular coupling with private sub-folders.",
        "A strict sovereign isolation policy checker forces raw requests into zero-trust validations.",
        "Programmatic verification evaluates all domains and triggers secure automatic cutoffs on leakage."
      ],
      talkingPointsAr: [
        "مسح الكود المصدري فوري لضمان عدم وجود ارتباطات برمجية عشوائية أو تبعية لملفات الإقليم والاتحاد.",
        "محرك فرض العزل (Policy Engine) يخضع أي طلب بيانات خام لتدقيق أمني صارم.",
        "التحقق البرمجي التلقائي يعطي تقريراً شاملاً ويقوم بالقطع الفوري عند رصد أي تسريب للمعلومات."
      ],
      talkingPointsKu: [
        "خوێندنەوەی کۆدی سەرەکی سیستەمەکە بۆ ڕێگریکردن لە هەر پەیوەندییەکی تێکەڵاوی پڕۆگرامسازی.",
        "فلتەرکردنی داواکارییەکان لە لایەن مۆدیولی بریار (Policy Engine) بە شێوازێکی تەواو دڵنیا.",
        "دۆزینەوە و پێدانی ڕاپۆرتی بێ مەرج لەسەر گونجانی گشت مۆدیولە گومرگی و داراییەکان."
      ],
      keyIndicatorsEn: ["Programmatic Sovereign Isolation: 100% SECURE", "Workspace Circular Imports: NONE"],
      keyIndicatorsAr: ["مستوى عزل السيادة البرمجي: امن 100%", "تداخل الكود الدائري المتبادل: صفر"],
      keyIndicatorsKu: ["ڕێژەی فەرمی عزلکردنی ئەپلیکەیشن: ١٠٠٪ بێ کێشە", "تێکەڵبوونی بازنەیی کۆدەکان: بوونی نییە"]
    }
  ];

  public static getScripts(): DemoScriptSection[] {
    return this.scripts;
  }

  public static getScriptByStakeholder(stakeholder: string): DemoScriptSection {
    return this.scripts.find(s => s.targetStakeholder === stakeholder) || this.scripts[2];
  }
}
