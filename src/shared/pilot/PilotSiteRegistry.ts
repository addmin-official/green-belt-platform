export interface PilotSite {
  id: string;
  nameEn: string;
  nameAr: string;
  nameKu: string;
  typeEn: string;
  typeAr: string;
  typeKu: string;
  locationEn: string;
  locationAr: string;
  locationKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  status: 'ACTIVE' | 'PREPARING' | 'MAINTENANCE';
}

export class PilotSiteRegistry {
  public static getSites(): PilotSite[] {
    return [
      {
        id: "safra_federal_gate",
        nameEn: "Sovereign Federal Gate (Safra Customs Station)",
        nameAr: "منفذ الصفرة الاتحادي السيادي",
        nameKu: "دەروازەی ئەزموونی فیدراڵی سەفرە",
        typeEn: "Federal Border Control Gate",
        typeAr: "منفذ حدودي بري اتحادي",
        typeKu: "دەروازەی سنوری فیدراڵی کاتی",
        locationEn: "Diyala / Federal Control Zone",
        locationAr: "ديالى / منطقة الرقابة الاتحادية",
        locationKu: "دیالە / ناوچەی کۆنتڕۆڵی فیدراڵی",
        descriptionEn: "Primary gateway for south-bound transit tracking and unified federal tariff enforcement operations.",
        descriptionAr: "المنفذ الرئيسي لمتابعة حركة الترانزيت المتجه جنوباً وتطبيق التعرفة الاتحادية الموحدة.",
        descriptionKu: "دەروازەی سەرەکی بۆ بەدواداچوونی بارەکانی باشور و جێبەجێکردنی باجی گشتی.",
        status: "ACTIVE"
      },
      {
        id: "ibrahim_khalil_regional_gate",
        nameEn: "KRG Gate (Ibrahim Al-Khalil / Haji Omeran Link)",
        nameAr: "منفذ إبراهيم الخليل / حاج عمران الإقليمي",
        nameKu: "دەروازەی هەرێم (ئیبراهیم خەلیل / حاجی ئۆمەران)",
        typeEn: "KRG Regional Customs Post",
        typeAr: "منفذ رقابة جمركية إقليمي لـ كوردستان",
        typeKu: "دەروازەی گومرگی هەرێمی کوردستان",
        locationEn: "Duhok / Erbil Borders",
        locationAr: "دهوك / أربيل الحدودية",
        locationKu: "دهۆک / سنورەکانی أربيل",
        descriptionEn: "Handles regional cargo declarations, localized KRG HSM receipts, and citizen data isolation caching.",
        descriptionAr: "يتولى فحص وتخليص البضائع المحلية، إصدار التواقيع الأمنية للإقليم، وعزل بيانات المواطنين.",
        descriptionKu: "ڕێکخستنی مۆڵەتەکانی هەرێم، بەکارهێنانی مۆری ئەلیکترۆنی HSM، و عزلکردنی تایبەتمەندی ناسنامەکان.",
        status: "ACTIVE"
      },
      {
        id: "joint_coordination_point",
        nameEn: "Supreme Joint Command Center Integration View",
        nameAr: "منصة التسوية والعمليات المشتركة العليا",
        nameKu: "مەیدانی هاوبەشی لێژنەی باڵای هەماهەنگی دەروازەکان",
        typeEn: "Joint Metadata Reconciliation Hub",
        typeAr: "مركز تنسيق ومطابقة قيم الهاش المشفرة",
        typeKu: "ناوەندی هاوبەشی بەراوردکاری مێتاداتا",
        locationEn: "Joint Green Zone Office (Baghdad / Erbil)",
        locationAr: "المقر المشترك بالمنطقة الخضراء (بغداد / أربيل)",
        locationKu: "ئۆفیسی هاوبەش لە ناوچەی سەوز (بەغدا / هەولێر)",
        descriptionEn: "Provides cooperative dashboards for real-time trade monitoring without sharing raw database writes.",
        descriptionAr: "يوفر لوحات التحكم لمتابعة الإيرادات والإنذارات المتبادلة دون مشاركة السجلات الأصلية.",
        descriptionKu: "پێدانی زانیاری گشتی و هۆشدارییەکان لە کاتی ڕاستەقینەدا بە بێ تێکەڵکردنی داتابەیسی لۆکاڵی.",
        status: "ACTIVE"
      }
    ];
  }
}
