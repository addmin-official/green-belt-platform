export interface ChecklistItem {
  id: string;
  categoryEn: string;
  categoryAr: string;
  categoryKu: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  taskEn: string;
  taskAr: string;
  taskKu: string;
  status: 'READY' | 'PENDING' | 'WARN';
}

export class PilotReadinessChecklist {
  public static getItems(): ChecklistItem[] {
    return [
      {
        id: "federal_hsm_key_sync",
        categoryEn: "Security",
        categoryAr: "الأمن السيبراني",
        categoryKu: "ئاسایشی ئەلیکترۆنی",
        titleEn: "Federal Cryptographic Key Integrations",
        titleAr: "ربط وتأمين مفاتيح التشفير الاتحادية",
        titleKu: "بەستنەوەی کلیلە کۆدکراوەکانی فیدراڵ",
        taskEn: "Confirm Baghdad HS-Code hash validators can read verified public keys on state networks.",
        taskAr: "تأكيد قدرة مدققي الهاش في بغداد على قراءة والتحقق من المفاتيح العمومية.",
        taskKu: "دڵنیابوون لەوەی بەغدا دەتوانێت کلیلی گشتی کۆدکراوی بارە مۆڵەتپێدراوەکان بخوێنێتەوە.",
        status: "READY"
      },
      {
        id: "krg_data_containment",
        categoryEn: "Isolation",
        categoryAr: "عزل البيانات",
        categoryKu: "عزلکردنی داتا",
        titleEn: "KRG Citizen Personal Records Separation",
        titleAr: "عزل أرشيف هوية مواطني إقليم كوردستان",
        titleKu: "پاراستنی زانیاری کەسانی هاوڵاتیانی هەرێم",
        taskEn: "Verify zero raw citizen identifiers leak beyond the localized Duhok/Erbil database node.",
        taskAr: "التحقق من منع تسرب أي بيانات شخصية أو هويات عسكرية خارج خوادم الإقليم.",
        taskKu: "تاقیکردنەوەی فلتەری داتاکان بۆ ڕێگریکردن لە دەرچوونی ناسنامەی هاوڵاتیان بۆ بەغدا.",
        status: "READY"
      },
      {
        id: "offline_terminal_fallback",
        categoryEn: "Infrastructure",
        categoryAr: "البنية التحتية",
        categoryKu: "بنیادنانی پێداویستییەکان",
        titleEn: "Local Storage Offline Fallback Testing",
        titleAr: "اختبار فحص العمل الميداني دون شبكة اتصال",
        titleKu: "تاقیکردنەوەی خزمەتگوزاری لۆکاڵی دەرەوەی هێڵ",
        taskEn: "Validate that border checkpoints write to secure localized storage cache when simulated fiber cut completes.",
        taskAr: "التحقق من صلاحية حفظ المعاملات المشفرة محلياً عند محاكاة انقطاع الاتصال.",
        taskKu: "سەلماندنی خەزنکردنی دروستی بارەکان لە کاتی پچڕانی هێڵی ئینتەرنێت.",
        status: "READY"
      },
      {
        id: "trilingual_dictionary_match",
        categoryEn: "Operations",
        categoryAr: "التدفق التشغيلي",
        categoryKu: "جوڵەی بەستنەوەی زمانەکان",
        titleEn: "Unified Trilingual Label Integrity Match",
        titleAr: "تطابق لغات واجهات مكاتب رؤساء الوزراء",
        titleKu: "هاوتاکردنی تەواوی هەر سێ زمانەکە لە لاپەڕەکاندا",
        taskEn: "Check EN, AR, and KU translations return matching titles for all pilot border post definitions.",
        taskAr: "ضمان دقة وتطابق المصطلحات والإنذارات الأمنية بين اللغات الثلاث في المنصة.",
        taskKu: "کۆنتڕۆڵکردنی نووسینی زمانەکانی عەرەبی، کوردی، و ئینگلیزی لەسەر نەخشەی بەدواداچوونەکە.",
        status: "READY"
      },
      {
        id: "append_only_audit_chain",
        categoryEn: "Transparency",
        categoryAr: "النزاهة والرقابة",
        categoryKu: "شەفافیەت و پاراستن",
        titleEn: "Append-Only Transaction Log Enforcer",
        titleAr: "محرك التوثيق الجرمعي غير القابل للإلغاء",
        titleKu: "سیستەمی شەفافیەتی بەڵگەنامەی وننەبوو",
        taskEn: "Confirm legislative auditors possess viewports to inspect tamper-proof transition log chains.",
        taskAr: "تأكيد قدرة لجان النزاهة والبرلمان على تفتيش سجل الحركات اللامحدود المقفل بتوقيع مشفر.",
        taskKu: "دڵنیابوون لە توانی لێژنەکانی پەرلەمان بۆ بینینی تۆماری گۆڕانکارییە داراییەکانی پڕۆژە.",
        status: "READY"
      }
    ];
  }
}
