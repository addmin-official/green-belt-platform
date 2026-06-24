export interface DataGovernanceRule {
  id: string;
  domainEn: string;
  domainAr: string;
  domainKu: string;
  classificationEn: string;
  classificationAr: string;
  classificationKu: string;
  ownerEn: string;
  ownerAr: string;
  ownerKu: string;
  governanceEn: string;
  governanceAr: string;
  governanceKu: string;
}

export class PilotDataGovernancePlan {
  public static getRules(): DataGovernanceRule[] {
    return [
      {
        id: "citizen_identifiers",
        domainEn: "Citizen & Personnel Identifiers",
        domainAr: "بيانات هويات وموظفي ومواطني كوردستان والعراق",
        domainKu: "پێناسە و زانیاری کەسی هاوڵاتیان",
        classificationEn: "Strictly Sovereign / Local Isolation",
        classificationAr: "سرية للغاية / سيادة محلية معزولة",
        classificationKu: "زۆر تایبەت / عزلکراوی نیشتمانی",
        ownerEn: "Respective Regional Authorities (Erbil / Baghdad)",
        ownerAr: "السلطات المحلية المختصة بكل إقليم (أربيل / بغداد)",
        ownerKu: "وەزارەتی پەیوەندیدار لۆکاڵی (هەولێر یان بەغدا)",
        governanceEn: "May never be copied, transferred, or queried across borders. Shared strictly as tokenized hashes for biometric deduplication.",
        governanceAr: "يمنع نسخها أو ترحيلها أو الاستعلام الفيدرالي المباشر عنها. يتم الربط التلقائي عبر هاشات مشفرة للنزاهة فقط.",
        governanceKu: "نابێت بە هیچ شێوازێک کۆپی بکرێت یان گواستنەوەی بۆ دەرەوەی دەروازە لۆکاڵییەکە بۆ بکرێت بۆ پاراستنی تایبەتمەندی."
      },
      {
        id: "customs_tariffs_and_receipts",
        domainEn: "Customs Tariffs & Financial Receipts",
        domainAr: "عائدات ووصولات الرسوم والتعرفات الجمركية",
        domainKu: "داهات و مۆرە فەرمییەکانی گومرگ",
        classificationEn: "Sovereign Audit Log / Append-Only",
        classificationAr: "سجلات مالية سيادية خاضعة للتجريم المالي / قيد دائم",
        classificationKu: "تۆماری دارایی پارێزراو / تەنها زیادکردن",
        ownerEn: "Joint Constitutional Reconciliation Council",
        ownerAr: "اللجنة التنسيقية المشتركة للتسوية الدستورية",
        ownerKu: "لێژنەی باڵای نیشتمانی هاوبەش",
        governanceEn: "Shared via automated metadata ledger matching. Verifies national treasury percentages without raw data exposures.",
        governanceAr: "يتم مشاركتها تلقائياً عبر ميتاداتا التوقيع المتبادل لإثبات سلامة الحصص الاتحادية دون تسريب الدفاتر الحرة.",
        governanceKu: "هاوبەشکردنی لە ڕێگەی مێتاداتای فەرمی بە خێرایی بۆ سەلماندنی داهاتی گشتی بێ بینینی تۆماری لۆکاڵی."
      },
      {
        id: "national_import_quotas",
        domainEn: "National Import Cootas & Trade Licencing",
        domainAr: "حصص الاستيراد ومطابقة رخص الاستيراد والتصدير",
        domainKu: "ڕێژەی کاڵاکان و مۆڵەتی بازرگانی گشتی",
        classificationEn: "Shared Sovereign Administrative",
        classificationAr: "بيانات إدارية مشتركة للسيادة الجمركية",
        classificationKu: "زانیاری گشتی بەشی بازرگانی",
        ownerEn: "Supreme Inter-Governmental Trade Board",
        ownerAr: "الهيئة الوطنية العليا للإشراف على التجارة والاستيراد",
        ownerKu: "لێژنەی باڵای هاوبەشی هەناردەکردن و هاوردەکردن",
        governanceEn: "Unified quotas mapped dynamically inside the shared hub to automatically prevent duplicate license submissions across ports.",
        governanceAr: "يتم تنسيق السقوف تلقائياً بداخل المنصة لحظر تزوير أو تكرار تقديم الرخص التجارية بمنافذ أخرى.",
        governanceKu: "دیاریکردنی ئۆتۆماتیکی ڕێژەی باری ناودەروازەکان بۆ ڕێگریکردن لە دووبارە بەکارهێنانی مۆڵەتی کاتی."
      }
    ];
  }
}
