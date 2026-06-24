export interface PilotRisk {
  id: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  riskOwnerEn: string;
  riskOwnerAr: string;
  riskOwnerKu: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  mitigationEn: string;
  mitigationAr: string;
  mitigationKu: string;
}

export class PilotRiskRegister {
  public static getRisks(): PilotRisk[] {
    return [
      {
        id: "inter_governmental_mistrust",
        titleEn: "Inter-Governmental Sovereign Data Overreach",
        titleAr: "مخاوف التدخل الإداري وتداخل الصلاحيات السيادية",
        titleKu: "مەترسی تێکەڵبوونی هێڵە فەرمییەکانی متمانە",
        riskOwnerEn: "Supreme Constitutional Integration Council",
        riskOwnerAr: "المجلس الوطني الأعلى للمطابقة الدستورية",
        riskOwnerKu: "لێژنەی باڵای گومرگی فیدراڵ و هەرێم",
        threatLevel: "CRITICAL",
        descriptionEn: "Administrative friction arises if either capital suspects database tampering or backdoor retrieval of sensitive records.",
        descriptionAr: "ظهور عقبات إدارية أو اتهام متبادل بالتلاعب بقواعد البيانات أو جلب سجلات غير مصرح بها.",
        descriptionKu: "تێکچوونی ڕیککەوتنە فەرمییەکان ئەگەر لایەنێک متمانەی بە کۆپیکردنی داتابەیسەکە نەمێنێت.",
        mitigationEn: "Database containment. Federal and regional databases possess absolute hardware limits. Communication uses immutable hash verification strictly.",
        mitigationAr: "جدران عزل صلبة مع حدود حوسبة تمنع التلاعب المادي وتجعل التراسل منحصراً في ميتاداتا التوقيع المشفر.",
        mitigationKu: "دانانی هێڵی عزلکردنی بەهێز. بەکارهێنانی کۆد مۆری مێتاداتا بە بێ توانای گۆڕینی داتابەیسە لۆکاڵییەکان."
      },
      {
        id: "checkpoint_connectivity_dropouts",
        titleEn: "Checkpoint Fiber & Power Outages",
        titleAr: "انقطاع الكابل الضوئي والشبكات في الحدود الوعرة",
        titleKu: "پچڕانی هێڵی تەلەفۆن و فایبەر لە ناوچە شاخاوییەکان",
        riskOwnerEn: "On-Site Infrastructure Support Teams",
        riskOwnerAr: "فريق البنية التحتية والتشغيل الميداني للمنفذ",
        riskOwnerKu: "ئەندازیارانی لۆکاڵی پێگەی سنوری دەروازە",
        threatLevel: "HIGH",
        descriptionEn: "Severe winter storms or geological cutoffs isolate remote stations, threatening to freeze crucial trade routes.",
        descriptionAr: "العوامل الجوية في المناطق الجبلية كـ حاج عمران تتسبب بضعف الاتصال مما يهدد بتوقف حركة الحمولات.",
        descriptionKu: "کێشەی کارەبا یان پچڕانی هێڵی فایبەر بەهۆی زستانەوە لەو ناوچە دورە دەستانە بازرگانی ڕادەگرێت.",
        mitigationEn: "Automatic operational fallback using dynamic DB cache. Offline entries signed using authorized HSMs and forward lazily on connection.",
        mitigationAr: "بروتوكولات المعالجة السريعة دون اتصال بالإنترنت وحفظ البيانات محلياً مع توقيعها بالبصمة الأمنية لإرسالها فور المعالجة.",
        mitigationKu: "خەزنکردنی لۆکاڵی خێرا (Offline Dynamic Cache) تا گەڕانەوەی هێڵی ئینتەرنێت پاشان بەستنەوەی ئۆتۆماتیکی داتا."
      },
      {
        id: "officer_manual_override_resistance",
        titleEn: "Operator Resistance & Legacy Habits",
        titleAr: "مقاومة الكوادر الميدانية والتمسك بالعمل اليدوي الورقي",
        titleKu: "ڕێگری مرۆیی و بەردەوامی لە تێپەڕاندنی کاغەزی کۆن",
        riskOwnerEn: "National Training & Onboarding Cohort",
        riskOwnerAr: "هيئة التدريب والتأهيل المشتركة للمنافذ",
        riskOwnerKu: "ڕاهێنانی فەرمی و بەدواداچونی کارمەندان",
        threatLevel: "MEDIUM",
        descriptionEn: "Staff used to traditional paper waivers may attempt manual overrides or bypass digitized tariff parameters.",
        descriptionAr: "لجوء بعض الأفراد لاستخدام المعالجة الورقية لتجاوز التسويات المالية أو لتمرير استثناءات رسوم.",
        descriptionKu: "هەندێک لە کارمەندان نایانەوێت تەکنەلۆجیا بەکاربهێنن و دەیانەوێت بە شێوازی کاغەزی کۆن کار بکەن.",
        mitigationEn: "Automated alert pipelines. Any bypass attempt instantly emits high-priority alarms to leadership dashboard auditories.",
        mitigationAr: "كل تجاوز للمعالجات الرقمية يصدر إنذاراً فورياً ويقيد في سجل الرقابة لوحة قيادة رئيس الوزراء تلقائياً للنزاهة.",
        mitigationKu: "دانانی هۆشداری ئۆتۆماتیکی زیرەک. هەر هەوڵێکی لادان لە مۆدیولەکە هۆشدار دەدات بە مەکتبی سەرۆک وەزیران."
      }
    ];
  }
}
