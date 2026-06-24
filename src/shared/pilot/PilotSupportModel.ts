export interface SupportTier {
  tierIndex: number;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  responstibilityEn: string;
  responstibilityAr: string;
  responstibilityKu: string;
  responseTimeEn: string;
  responseTimeAr: string;
  responseTimeKu: string;
  escalationEn: string;
  escalationAr: string;
  escalationKu: string;
}

export class PilotSupportModel {
  public static getTiers(): SupportTier[] {
    return [
      {
        tierIndex: 1,
        nameEn: "Tier 1: On-Site Border Field Support Officers",
        nameAr: "الدعم الميداني المباشر في المنفذ (المستوى الأول)",
        nameKu: "ئەندازیارانی لۆکاڵی هێڵی سەرەتایی دەروازەکان",
        responstibilityEn: "Stationed locally at Safra and Ibrahim Al-Khalil ports to manage hardware, scanners, weigh and ticket printer outages.",
        responstibilityAr: "التعامل المالي الفوري مع أعطال أجهزة الميزان والشبكات الداخلية والمطبوعات والوصولات الميدانية.",
        responstibilityKu: "چارەسەرکردنی خێرای کێشە لۆکاڵییەکانی مادی وەک کۆمپیوتەر یان پڕینتەری گومرگی دەروازەکە.",
        responseTimeEn: "Immediate (Under 10 Minutes)",
        responseTimeAr: "فوري (خلال ١٠ دقائق كحد أقصى)",
        responseTimeKu: "خێرا (لە ژێر ١٠ خولەکدا)",
        escalationEn: "Escalates database or software crashes to Regional Devops Centers.",
        escalationAr: "يتم تصعيد أية مشكلة فنية أو انقطاع برمجي كلي إلى مركز العمليات الإقليمي.",
        escalationKu: "ناردنی کێشە گشتییەکانی داتابەیس بۆ سەنتەری تەکنیکی ناوەندی هەرێم یان بەغدا."
      },
      {
        tierIndex: 2,
        nameEn: "Tier 2: Regional Sovereign Command Engineers (Erbil & Baghdad)",
        nameAr: "مهندسو السيادة الفنية والشبكات السحابية (المستوى الثاني)",
        nameKu: "ئەندازیارانی لێژنەی تەکنیکی هەرێم و فیدراڵ (ئاستی دووەم)",
        responstibilityEn: "Direct maintenance of isolated database nodes, localized HSM signing algorithms, and API gateway routes.",
        responstibilityAr: "الإشراف والتشغيل لخوادم عزل البيانات، مفاتيح تشفير الإقليم، وقنوات تبادل الميتاداتا.",
        responstibilityKu: "پاراستنی داتابەیسی سەربەخۆ، بەستەرە کریپتۆگرافییەکان، و هێڵە ئەمنییەکانی دەروازە ناوەندییەکان.",
        responseTimeEn: "Under 30 Minutes",
        responseTimeAr: "خلال ٣٠ دقيقة أو أقل",
        responseTimeKu: "لە ژێر ٣٠ خولەکدا",
        escalationEn: "Escalates joint reconciliation bugs or inter-governmental mismatches to the Supreme Steering Committee.",
        escalationAr: "يتم الرفع إلى لجنة الرقابة والنزاهة العليا عند حدوث تباين غير معبر في مطابقة الحسابات.",
        escalationKu: "ڕەوانەکردنی کێشەکانی هاوتاکردنی دارایی هاوبەش بۆ لێژنەی باڵای وەزارەتەکان."
      },
      {
        tierIndex: 3,
        nameEn: "Tier 3: Supreme Steering & Constitutional Integrity Council",
        nameAr: "المجلس الأعلى للتكامل المالي المشترك والتحكيم (المستوى الثالث)",
        nameKu: "ئاستی باڵا: لێژنەی گشتی نیشتمانی هەولێر و بەغدا (ئاستی سێیەم)",
        responstibilityEn: "Judicial resolution of joint manifest discrepancies, quota adjustments, and high-level structural auditing overrides.",
        responstibilityAr: "الحل القانوني للتباينات الكبيرة، تعديل حصص الاستيراد السنوية، والتحقيق في إنذارات التزييف المالي.",
        responstibilityKu: "بڕیاردانی گشتی و یاسایی لەسەر کێشە گەورەکانی گومرگ و گۆڕینی ڕێژەی مۆڵەتەکان بەپێی دەستوور.",
        responseTimeEn: "Under 2 Hours (Executive Hotlines)",
        responseTimeAr: "في غضون ساعتين (خطوط الوزراء الاتصال التلقائي الساخن)",
        responseTimeKu: "لە ژێر ٢ کاتژمێردا (هێڵی خێرای وەزیران)",
        escalationEn: "Final sovereign executive authority.",
        escalationAr: "السلطة الرقابية والتنفيذية النهائية المعتمدة للبلاد.",
        escalationKu: "لووتکەی دەسەڵاتی بڕیاردانی بەستەرە تێکەڵبووەکان."
      }
    ];
  }
}
