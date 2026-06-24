export interface TrainingCohort {
  id: string;
  groupNameEn: string;
  groupNameAr: string;
  groupNameKu: string;
  curriculumEn: string[];
  curriculumAr: string[];
  curriculumKu: string[];
  durationEn: string;
  durationAr: string;
  durationKu: string;
}

export class PilotTrainingPlan {
  public static getCohorts(): TrainingCohort[] {
    return [
      {
        id: "federal_operators",
        groupNameEn: "Federal Border Operators",
        groupNameAr: "موظفو المنافذ والسيطرات الاتحادية",
        groupNameKu: "کارمەندانی دەروازە فیدراڵییەکان",
        curriculumEn: [
          "Understanding unified tariff rules engine controls.",
          "Verifying HS-Code database declarations and cargo weighting logs.",
          "Dispatching federal biometric signatures and incident alerts."
        ],
        curriculumAr: [
          "فهم واستيعاب محرك احتساب التعرفة الجمركية الاتحادية الموحدة.",
          "التحقق من مطابقة فواتير الحمولة والرموز الدولية المنسقة بالميزان الميداني.",
          "إرسال وتوثيق البصمة الأمنية للمعاملات والتعامل مع حالات الاشتباه والإنذار."
        ],
        curriculumKu: [
          "تێگەیشتن لە چۆنێتی هاوتاکردنی باجی گومرگی فیدراڵی.",
          "کۆنتڕۆڵکردنی کێشی بارەکان و هاوتاکردنی کۆدە جیهانییەکانی کاڵا.",
          "ناردنی واژۆ ئەلیکترۆنییەکانی مۆڵەت و ئاگادارکردنەوەی هێزە ئەمنییەکان."
        ],
        durationEn: "5 Days (Intensive Classroom & Field Work)",
        durationAr: "٥ أيام (ورش عمل مكثفة وتدريب ميداني)",
        durationKu: "٥ ڕۆژ (کۆرسی مەشق و ڕاهێنانی مەیدانی)"
      },
      {
        id: "krg_operators",
        groupNameEn: "Kurdistan Region Customs Personnel",
        groupNameAr: "موظفو كمارك ومنافذ إقليم كوردستان",
        groupNameKu: "کارمەندانی گومرگی هەرێمی کوردستان",
        curriculumEn: [
          "Local cache override execution and offline verification workflows.",
          "Protecting regional databases and signing transactions using KRG HSM keys.",
          "Managing localized transit clearance records."
        ],
        curriculumAr: [
          "كيفية تشغيل المنصة في الوضع المحلي ومطابقة البيانات دون اتصال بالإنترنت.",
          "حماية جدران الاتصال والتوقيع الرقمي المعتمد بمفاتيح الإقليم الخاصة.",
          "تسيير وتوثيق المعاملات للشاحنات المفرزة جمركياً بداخل الأراضي الكردستانية."
        ],
        curriculumKu: [
          "چۆنیەتی کارپێکردنی مۆدیولی دەرەوەی هێڵ (Offline) لە کاتی پچڕان.",
          "پاراستنی داتابەیسی لۆکاڵی هەرێم و مۆرکردنی مۆڵەتەکان بە کلیلەکانی هەرێم HSM.",
          "ڕێکخستنی خێرای جوڵەی بازرگانی ناوخۆیی."
        ],
        durationEn: "5 Days (Erbil Training Center Modules)",
        durationAr: "٥ أيام (مركز تكنولوجيا المعلومات بـ أربيل)",
        durationKu: "٥ ڕۆژ (مەشق لە سەنتەری تەکنەلۆجیای هەولێر)"
      },
      {
        id: "joint_auditors",
        groupNameEn: "Joint Committee Legislative Auditors",
        groupNameAr: "مدققو لجان النزاهة والرقابة المالية المشتركة",
        groupNameKu: "لێژنەی هاوبەشی چاودێری پەرلەمانی و دارایی",
        curriculumEn: [
          "Traceability matrices analysis and tamper-proof ledger interrogation.",
          "Reviewing inter-governmental metadata hashes consistency.",
          "Zero backdoor access audits and isolation metrics monitoring."
        ],
        curriculumAr: [
          "تحليل وفحص سلاسل القيد المالي المشفرة للتأكد من انعدام التلاعب.",
          "التدقيق الحيد للتواقيع الثنائية ومطابقة مخرجات الميزانية التلقائية.",
          "التحقق الدوري من سلامة جدران عزل البيانات وعدم الاختراق المتبادل."
        ],
        curriculumKu: [
          "بەدواداچوونی تۆماری گۆڕانکارییە داراییەکانی پڕۆژە دژە تێکدان.",
          "کۆنتڕۆڵکردنی کلیلە کۆدکراوە گشتییەکان بۆ دڵنیابوون لە داهاتەکان.",
          "پشکنینی بەردەوامی فلتەری عزلکردنی زانیاری کەسی هاوڵاتیان."
        ],
        durationEn: "3 Days (Executive Standards Walkthrough)",
        durationAr: "٣ أيام (لقاءات تشريعية ورقابية في بغداد)",
        durationKu: "٣ ڕۆژ (سەردانی مەیدانی لێژنەی باڵا)"
      }
    ];
  }
}
