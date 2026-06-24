export interface PilotOperationPhase {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  timelineEn: string;
  timelineAr: string;
  timelineKu: string;
  objectivesEn: string[];
  objectivesAr: string[];
  objectivesKu: string[];
}

export class PilotOperationsPlan {
  public static getPhases(): PilotOperationPhase[] {
    return [
      {
        id: "phase_1_setup",
        nameEn: "Phase I: Node Deployment & Hardware Integration",
        nameAr: "المرحلة الأولى: تهيئة الخوادم وتكامل الأجهزة الميدانية",
        nameKu: "قۆناغی یەکەم: دانانی سێرڤەر و ئامادەکردنی مۆبایلەکان",
        timelineEn: "Day 1 - Day 15",
        timelineAr: "اليوم ١ - اليوم ١٥",
        timelineKu: "ڕۆژی ١ - ڕۆژی ١٥",
        objectivesEn: [
          "Deploy isolated Docker hosting nodes at Safra Customs point and Haji Omeran border station.",
          "Activate local cryptographic key rings authorized by central and Kurdish regional agencies.",
          "Perform test runs of biometric receipt printers and high-speed cargo weighing stations."
        ],
        objectivesAr: [
          "نشر بوابات النظام البرمجية المعزولة في نقطة الصفرة ومنفذ حاج عمران.",
          "تثبيت مفاتيح التشفير المعتمدة والمصدقة من هيئة الجمارك والمالية الكردية والاتحادية.",
          "إجراء فحص تجريبي لأجهزة الموازين الإلكترونية وبوابات فحص الحمولات وطابعات الوصولات المأمنة."
        ],
        objectivesKu: [
          "دانانی سیستەمی کۆد لۆکاڵ لە هەردوو دەروازەی سەفرە و حاجی ئۆمەران.",
          "ئامادەکردنی کلیلە فەرمییەکانی مەنفەز بەپێی یاسای مۆڵەتدانی هەرێم و بەغدا.",
          "تاقیکردنەوەی خێرایی بەراوردکردنی کێشی بارەکان و مەکینەی چاودێری."
        ]
      },
      {
        id: "phase_2_training",
        nameEn: "Phase II: Officer Onboarding & Trilingual Training Runs",
        nameAr: "المرحلة الثانية: تأهيل كوادر الميدان والتدقيق ثلاثي اللغات",
        nameKu: "قۆناغی دووەم: ڕاهێنانی فەرمانبەران بە هەر سێ زمانەکە",
        timelineEn: "Day 16 - Day 30",
        timelineAr: "اليوم ١٦ - اليوم ٣٠",
        timelineKu: "ڕۆژی ١٦ - ڕۆژی ٣٠",
        objectivesEn: [
          "Train border officers on checkpoint declaration queues and localized tariff lookup.",
          "Conduct simulated tax failure overrides with regional customs inspectors in Kurdish and Arabic.",
          "Train inter-governmental steering committees on reading joint metadata dashboards."
        ],
        objectivesAr: [
          "تدريب مفوضي المنافذ على إدخال البيانات ومطابقة حزم الحمولات لتقليل وقت التخليص.",
          "محاكاة استثناءات التلاعب بالتعرفات ورفض المعاملات المكررة باللغتين العربية والكوردية.",
          "توعية اللجان الفنية العليا على تفسير مؤشرات الخطر والإنذارات المتبادلة بلوحة الرقابة."
        ],
        objectivesKu: [
          "ڕاهێنانی پۆلیسی پاسەوانی سنور و گومرگ لەسەر بەشی ئاماری خێرا.",
          "تاقیکردنی کێشە کاتییەکانی وەک مۆڵەتنامەی دووبارە بە زمانەکانی عەرەبی و کوردی.",
          "ئاشناکردنی لێژنەی هاوبەش بە چۆنیەتی خوێندنەوەی کۆدەکانی مێتاداتا."
        ]
      },
      {
        id: "phase_3_live_ops",
        nameEn: "Phase III: Live Controlled Trade Operations",
        nameAr: "المرحلة الثالثة: الإطلاق الفعلي والتشغيل الحي المترابط للمنافذ",
        nameKu: "قۆناغی سێیەم: بەستنەوەی ڕاستەقینە و بەدواداچوونی بارەکان",
        timelineEn: "Day 31 - Day 60",
        timelineAr: "اليوم ٣١ - اليوم ٦٠",
        timelineKu: "ڕۆژی ٣١ - ڕۆژی ٦٠",
        objectivesEn: [
          "Process official transit declarations under the Border OS live controlled mode.",
          "Record every customs declaration in the append-only cryptographic ledger.",
          "Verify the absolute separation of regional Kurdish identifier details from central servers."
        ],
        objectivesAr: [
          "تسيير المعاملات التجارية الفعلية والحمولات العابرة بصفة رسمية تحت مظلة النظام.",
          "قيد وتثبيت كافة بيانات الاستيراد والرسوم المحصلة في دفتر الحسابات المحفوظ ذي المفتاح المشفر.",
          "التدقيق المستمر لخلو خوادم بغداد تماماً من أي تسريب للبيانات الشخصية لمواطني الإقليم."
        ],
        objectivesKu: [
          "بەڕێکردنی فەرمی بارەکان لەژێر چاودێری ڕاستەوخۆی هێڵی Border OS.",
          "تۆمارکردنی سەرجەم پارە کۆکراوەکانی گومرگ لەناو لیستە ئەمنییەکان.",
          "کۆنتڕۆڵکردنی بێ مەرجی عزلکردنی ناوە کوردییەکانی کارمەندان لە داتابەیسی ناوەندی بەغدا."
        ]
      },
      {
        id: "phase_4_review",
        nameEn: "Phase IV: Integrity Audits & Cabinet Acquisition Vet",
        nameAr: "المرحلة الرابعة: مراجعة معايير النزاهة وتصويت مجلس الوزراء",
        nameKu: "قۆناغی چوارەم: هەڵسەنگاندنی ئەمنی و پەرلەمانی",
        timelineEn: "Day 61 - Day 90",
        timelineAr: "اليوم ٦١ - اليوم ٩٠",
        timelineKu: "ڕۆژی ٦١ - ڕۆژی ٩٠",
        objectivesEn: [
          "Compile complete pilot trade reports to verify zero leakage across gateways.",
          "Perform automated sovereignty audits to prove no raw storage queries took place on joint databases.",
          "Present verified pilot uptime statistics and commercial SLA compliance metrics to prime ministers."
        ],
        objectivesAr: [
          "استخلاص تقارير المنافذ والسيادات البرمجة لتأكيد الكفاءة ومنع التهرب والفساد المالي.",
          "التحقق التقني المستقل لسلامة عمليات الحظر الذاتي على جداول البيانات الحساسة.",
          "عرض سجلات الاستجابة ومؤشرات الجاهزية والملف التجاري النهائي على رئاستي الوزراء للإقرار."
        ],
        objectivesKu: [
          "ئامادەکردنی ڕاپۆرتی کۆتایی بۆ پیشاندانی ڕێژەی سەرکەوتن لە کۆنترۆڵکردنی داهات.",
          "ئەنجامدانی پشکنینی پڕۆگرامسازی بۆ سەلماندنی جیاکاری داتاکان.",
          "پێشکەشکردنی داتای فەرمی ئامادەیی سیستەمەکە بە سەرۆک وەزیرانی هەردوو لایەن بۆ مۆرکردنی کڕینەوە."
        ]
      }
    ];
  }
}
