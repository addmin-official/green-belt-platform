export interface AccessBoundary {
  roleId: string;
  roleNameEn: string;
  roleNameAr: string;
  roleNameKu: string;
  jurisdictionEn: string;
  jurisdictionAr: string;
  jurisdictionKu: string;
  allowedModulesEn: string[];
  allowedModulesAr: string[];
  allowedModulesKu: string[];
  blockRuleEn: string;
  blockRuleAr: string;
  blockRuleKu: string;
}

export class StakeholderAccessMatrix {
  public static getMatrix(): AccessBoundary[] {
    return [
      {
        roleId: "federal_pm",
        roleNameEn: "Federal Iraq Prime Minister",
        roleNameAr: "دولة رئيس مجلس الوزراء الاتحادي",
        roleNameKu: "سەرۆک وەزیرانی فیدراڵی عێراق",
        jurisdictionEn: "Federal Authority, Baghdad Customs & Central Sovereign Revenues",
        jurisdictionAr: "سلطة بغداد الوطنية، التعريفات الجمركية الاتحادية والإيرادات السيادية",
        jurisdictionKu: "دەسەڵاتی گشتی فیدراڵ، دەروازەکانی بەغدا و داهاتی گشتی",
        allowedModulesEn: ["Federal Executive View", "Central Customs Tariffs", "Unified Active Trade Quotas", "National Air / Sea Checkpoints"],
        allowedModulesAr: ["لوحة الرقابة الاتحادية", "التعرفة الجمركية المركزية", "حصص الاستيراد الموحدة", "المنافذ البحرية والجوية الوطنية"],
        allowedModulesKu: ["داشبۆردی سەرۆکایەتی بەغدا", "کۆدی باجی فیدراڵی", "مۆڵەتنامەکانی بازرگانی", "دەروازە ئاسمانی و ئاوییەکان"],
        blockRuleEn: "Blocking: Strictly denied raw database queries into KRG regional offices.",
        blockRuleAr: "قاعدة المنع: حظر تام لقراءة قواعد البيانات والتعيينات الحساسة الخاصة بإقليم كوردستان.",
        blockRuleKu: "بلۆککردن: ڕێگری توند لە هەر داواکارییەکی داتای لۆکاڵی هاوڵاتیانی هەرێمی کوردستان."
      },
      {
        roleId: "krg_pm",
        roleNameEn: "Kurdistan Region Prime Minister",
        roleNameAr: "دولة رئيس وزراء إقليم كوردستان",
        roleNameKu: "سەرۆک وەزیرانی هەرێمی کوردستان",
        jurisdictionEn: "Kurdish Regional Authority, Erbil Customs & Region Autonomous Revenues",
        jurisdictionAr: "سلطة كوردستان الإقليمية، جمارك الإقليم والإيرادات الكردية المستقلة",
        jurisdictionKu: "دەسەڵاتی ناوچەیی هەرێم، پێگەی هەولێر و داهاتە سەربەخۆکانی هەرێم",
        allowedModulesEn: ["KRG Regional Executive View", "Regional Gate Customs", "Local Citizen Personnel Vault", "Kurdish HSM Key Signatures"],
        allowedModulesAr: ["لوحة رقابة الإقليم", "المنافذ والجمارك الكردية", "أرشيف الكوادر والمواطنين للإقليم", "مفاتيح توقيع كوردستان الإلكترونية"],
        allowedModulesKu: ["داشبۆردی سەرۆکایەتی هەولێر", "دەروازەکانی هەرێم", "سیستەمی ناسنامەی هاوڵاتیان", "کلیلە کۆدکراوەکانی هەرێم HSM"],
        blockRuleEn: "Blocking: strictly denied executive write-access to federal central ministries database.",
        blockRuleAr: "قاعدة المنع: حظر إجراء أي تعديلات مادية أو كتابية في سجلات وزارة المالية والجمارك في بغداد.",
        blockRuleKu: "بلۆککردن: بلۆکبوونی جوڵەی دەستکاری لە بەرنامەکانی داهات و دارایی وەزارەتەکانی بەغدا."
      },
      {
        roleId: "joint_operator",
        roleNameEn: "Joint Operations Center Officer",
        roleNameAr: "ضابط عمليات اللجنة الوطنية المشتركة",
        roleNameKu: "ئەفسەری لێژنەی باڵای هاوبەشی دەروازەکان",
        jurisdictionEn: "Cooperative Manifest Match, National Border Alerts Tracking Only",
        jurisdictionAr: "اللجنة التنسيقية المشتركة لمطابقة بيانات الحمولة وتتبع خطر التهرب والتزييف فقط",
        jurisdictionKu: "هاوتاکردنی گومرگی بارەکان لەنێوان هەردوو لایەن ڕاستین تەنیا",
        allowedModulesEn: ["Joint Cooperation Dashboard", "Cryptographic Manifest Hash Cross-Check", "National Multi-Gate Threat Counter"],
        allowedModulesAr: ["لوحة التنسيق المشتركة", "مطابقة قيم الهاش الجمركي للمستندات", "عداد قياس مؤشرات الخطر الوطني"],
        allowedModulesKu: ["داشبۆردی لێژنەی هاوبەش", "بەراوردکاری کلیلە کۆدکراوەکان", "تەوەرەی بینینی هۆشدارییە ئەمنییەکان"],
        blockRuleEn: "Blocking: Denied any direct database read/write on either Federal or KRG repositories.",
        blockRuleAr: "قاعدة المنع: يمنع قراءة البيانات الأصلية أو كتابتها على خوادم أربيل أو بغداد بشكل نهائي.",
        blockRuleKu: "بلۆککردن: ڕێگری تەواو لە خوێندنەوەی داتای لۆکاڵی تایبەتی هەر لایەنێک مۆر."
      }
    ];
  }
}
