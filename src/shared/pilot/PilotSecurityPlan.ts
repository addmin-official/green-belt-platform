export interface SecurityPolicy {
  policyId: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
  ruleEn: string;
  ruleAr: string;
  ruleKu: string;
  mechanismEn: string;
  mechanismAr: string;
  mechanismKu: string;
}

export class PilotSecurityPlan {
  public static getPolicies(): SecurityPolicy[] {
    return [
      {
        policyId: "zero_trust_endpoints",
        titleEn: "Zero-Trust Endpoint Isolation Rule",
        titleAr: "قاعدة عزل الأطراف والشبكات الصفرية",
        titleKu: "یاسای سەربەخۆیی گشتی دەروازەکان",
        ruleEn: "Every terminal request from border stations must undergo multi-factor authentication with hardware security modules.",
        ruleAr: "يخضع كل اتصال وطلب صادر من المنافذ للتحقق اللامحدود بمصادقة أمنية متعددة تعتمد المفاتيح المشفرة.",
        ruleKu: "هەر جوڵەیەک لە کۆمپیوتەری دەروازەکانەوە پێویستی بە دڵنیابوونی بەهێزە لەگەڵ مۆری ئەلیکترۆنی فەرمی.",
        mechanismEn: "X.509 client certificates mapped dynamically to regional security parameters at the network border.",
        mechanismAr: "شهادات اتصال رقمية (X.509) مبرمجة ومطابقة لمعايير الأمان المعتمدة بمنافذ الإقليم لمكافحة الاختراق.",
        mechanismKu: "بەکارهێنانی بەڵگەنامەی ئەمنیی ڕاستەقینە (X.509 Client Certificates) بۆ پاراستنی هێڵەکان."
      },
      {
        policyId: "immutable_audit_logging",
        titleEn: "Immutable Cryptographic Hash Logging",
        titleAr: "التسجيل المالي والتوثيق غير القابل للحذف أو التغيير",
        titleKu: "تۆمارکردنی حیسابات بە کۆدی نەبڕاوە",
        ruleEn: "No user, administrator, or ministerial viewport may alter recorded custom manifests or historical trade balances.",
        ruleAr: "يمنع تلوين أو حذف أو تعديل أي قيد مالي أو جمركي معتتمد في دفتر الحسابات من قبل أي رتبة فنية أو إدارية.",
        ruleKu: "هیچ فەرمانبەر یان وەزیرێک ناتوانێت دەستکاری یان سڕینەوە لە دەقە مادییەکانی داهاتی دەروازەکە بکات.",
        mechanismEn: "SHA-256 block hashing chains verified automatically, sending alerts at the first sign of mismatch.",
        mechanismAr: "تكامل سلاسل الهاش (SHA-256) المشفرة تلقائياً مع رصد وإحباط أي محاولات لحذف القيود التاريخية.",
        mechanismKu: "بەستنەوەی زنجیرەیی گۆڕانکارییەکان بە کۆدی SHA-256 بۆ ڕێگری لە هەر جوڵەیەکی تێکدان."
      },
      {
        policyId: "zero_leak_reconciliation",
        titleEn: "Zero-Leak Metadata Integrity Check",
        titleAr: "المطابقة الثنائية الأمنية والميتاداتا دون تسريب الخصوصية",
        titleKu: "بەدواداچونی مێتاداتا بێ دزەکردنی زانیاری کەسی",
        ruleEn: "Inter-governmental checks operate exclusively via cryptographic metadata and numerical tallies. Raw citizen tables remain localized.",
        ruleAr: "تقتصر عمليات المطابقة والربط التجاري للمحافظة على السيادة الإدارية والبيانات الدستورية دون استعلام عن أفراد.",
        ruleKu: "بەراوردکاری تەنها لە ڕێگەی مێتاداتا جێبەجێ دەبێت بۆ پاراستنی بێ مەرجی زانیاری کەسی قوربانیان.",
        mechanismEn: "Tokenized message passing that filters confidential identities out before entering the shared joint network hub.",
        mechanismAr: "قنوات تراسل مشفرة ومؤتمتة لتصفية وفلترة الهويات والأسماء قبل ترحيل المستندات للجنة المشتركة.",
        mechanismKu: "فلتەرکردنی زانیارییەکان پێش گواستنەوەیان بۆ ئۆفیسی هاوبەشی بەغدا و هەولێر."
      }
    ];
  }
}
