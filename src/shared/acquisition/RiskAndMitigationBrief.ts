export interface RiskItem {
  id: string;
  riskTitleEn: string;
  riskTitleAr: string;
  riskTitleKu: string;
  threatLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  mitigationEn: string;
  mitigationAr: string;
  mitigationKu: string;
}

export class RiskAndMitigationBrief {
  public static getRisks(): RiskItem[] {
    return [
      {
        id: "sovereignty_distrust",
        riskTitleEn: "Loss of Sovereignty Fears (Baghdad / Erbil)",
        riskTitleAr: "التخوف من خسارة السيادة أو الخصوصية الإدارية",
        riskTitleKu: "مەترسی تێکەڵبوونی دەسەڵاتە فەرمییەکان",
        threatLevel: "HIGH",
        descriptionEn: "Both capitals fear administrative overreach or unauthorized modification of local customs ledger databases by the other party.",
        descriptionAr: "تخوف الطرفين من التدخل الإداري المباشر أو التعديل الأحادي للبيانات الجمركية والمالية والمستندات الحساسة.",
        descriptionKu: "مەترسی لادانی لایەنە ناکۆکەکان لە کاتی بەستنەوەی فەرمی گومرگی یاسایی لەناو پڕۆژەدا.",
        mitigationEn: "Complete physical and logical isolation. No write-access is shared. The reconciliation layer queries cryptographic metadata only.",
        mitigationAr: "عزل برمي تاييد تام للمستندات والطلب. يمنع تعديل أي سجل مالي للإقليم، وتمر العملية عبر مطابقة داتا مشفرة كلياً.",
        mitigationKu: "عزلکردنی تەواوی پڕۆگرامی داتابەیسی لۆکاڵی. گۆڕینەوەی مێتاداتا تەنیا بۆ بەدواداچوونی گومرگ بێ دەرکەوتنی ناوەکان."
      },
      {
        id: "offline_border_posts",
        riskTitleEn: "Unstable Network & Border Post Outages",
        riskTitleAr: "انقطاع شبكات الاتصال والإنترنت في المنافذ النائية",
        riskTitleKu: "پچڕانی هێڵی ئینتەرنێت لە دەروازە سنورییەکان",
        threatLevel: "MEDIUM",
        descriptionEn: "Remote border gates frequently experience connectivity dropouts, which would freeze standard centralized cloud platforms.",
        descriptionAr: "المنافذ الحدودية الجبلية والبعيدة تتعرض لضعف الشبكة بشكل متكرر، مما قد يعرقل حركة الشاحنات والتخليص.",
        descriptionKu: "هێڵەکانی ئینتەرنێت لەناو شاخەکاندا زوو زوو دەپچڕێن، ئەمەش کار دەروازە ناوەندییەکانی تر ڕادەگرێت.",
        mitigationEn: "A robust local cache fallback layer operationalizes the desktop app offline, storing ledger hash links to forward once connected.",
        mitigationAr: "تطوير مخزن محلي للمعالجة دون اتصال (Offline Fallback)، يتم ترحيل الحركات المفرزة تلقائياً فور عودة الشبكة.",
        mitigationKu: "هۆت باکەپی لۆکاڵی بۆ کارکردنی خێرای دەروازەکان و ڕێکخستنی داتا لەناو کۆمپیوتەری دەروازەکە تا هێڵەکە چاک دەبێتەوە."
      },
      {
        id: "smuggling_and_tariff_evasion",
        riskTitleEn: "Active Tariff Evasion & Document Tampering",
        riskTitleAr: "التهرب الضريبي النشط وتزييف مستندات التعرفة",
        riskTitleKu: "تەهروبکردنی گومرگی و لادان لە مۆڵەتەکان",
        threatLevel: "HIGH",
        descriptionEn: "Importers utilize fraudulent duplicate manifests across different jurisdictions to bypass unified customs rates.",
        descriptionAr: "لجوء بعض التجار لتقديم وثائق منقوصة أو رخص مكررة جمركياً بغرض تقليل التعرفة أو التهرب المالي.",
        descriptionKu: "پێشکەشکردنی داواکاری مۆڵەتی دووبارە لە دەروازە جیاوازەکان بۆ ڕزگاربوون لە دانی باج لەسەر کاڵاکان.",
        mitigationEn: "The real-time trilingual cross-check engine flags duplicate manifests and alerts auditors immediately on discrepancies.",
        mitigationAr: "محرك التحقق الفوري والذكي للمطابقة المشتركة يكتشف البيانات الثنائية المكررة ويرسل إنذارات أمنية فورا.",
        mitigationKu: "سیستەمی شەفافیەتی زیرەک لە کاتی ڕاستەقینەدا بە خێرایی کارتی مۆڵەتە دووبارەکان بلۆک دەکات و پۆلیس ئاگادار دەکاتەوە."
      }
    ];
  }
}
