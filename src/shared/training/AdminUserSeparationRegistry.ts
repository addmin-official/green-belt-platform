export interface SeparationPolicyItem {
  id: string;
  scope: 'Admin' | 'User';
  actionType: 'allowed' | 'forbidden';
  descriptionEn: string;
  descriptionAr: string;
  descriptionKu: string;
  mitigationOrRuleEn: string;
  mitigationOrRuleAr: string;
  mitigationOrRuleKu: string;
}

export const AdminUserSeparationRegistry: SeparationPolicyItem[] = [
  // Admin Allowed
  {
    id: 'admin_sys_config',
    scope: 'Admin',
    actionType: 'allowed',
    descriptionEn: 'Access and monitor basic system configuration and endpoint latencies.',
    descriptionAr: 'معاينة ومراقبة النظم وخوادم المعابر مع قياس زمن الاستجابة للمنافذ.',
    descriptionKu: 'بینین و چاودێریکردنی کۆنفیگی سیستم و خێرایی وەڵامدانەوەی سێرڤەرەکان.',
    mitigationOrRuleEn: 'Limited to configuration metadata; does not contain sensitive raw freight profiles.',
    mitigationOrRuleAr: 'يقتصر على الميتا-داتا البرمجية وخالٍ تماماً من سجلات الشحنات التجارية الحساسة.',
    mitigationOrRuleKu: 'تەنها بۆ دراوە گشتییەکانە و هیچ زانیاری بازرگانی یان دەروازەیی تێدا نییە.'
  },
  {
    id: 'admin_qa_gate',
    scope: 'Admin',
    actionType: 'allowed',
    descriptionEn: 'Review automated QA tests compliance scorecard and onboarding draft packages.',
    descriptionAr: 'تدقيق ومراجعة نتائج فحوصات الامتثال الآلية وحزم أوراق الاعتماد المطلوبة للإقليم.',
    descriptionKu: 'تەماشاکردنی ئەنجامی پشکنینە ئۆتۆماتیکییەکانی فەرامۆشنەکردنی مەرجە گومرگییەکان.',
    mitigationOrRuleEn: 'Crucial for maintaining deployment checks without manual intervention.',
    mitigationOrRuleAr: 'مهم للتأكد من مواصلة الفحص البرمجي الدوري دون أي تدخل بشري مسيء.',
    mitigationOrRuleKu: 'گرنگە بۆ پابەندبوون بە مەرجەکانی سیستم بێ دەستێوەردانی فیزیکی کادری ناوەخۆ.'
  },
  // Admin Forbidden
  {
    id: 'admin_bypass_sovereignty',
    scope: 'Admin',
    actionType: 'forbidden',
    descriptionEn: 'Bypass physical database separation to query cross-boundary raw records.',
    descriptionAr: 'تجاوز حدود قواعد البيانات المقسمة للاستعلام المباشر عن معلومات الإقليم الأصلية.',
    descriptionKu: 'تێپەڕاندنی جیاکەرەوە فیزیكییەکانی بنکەدراوە بۆ گەڕان لە دراوە ئەسڵییەکانی هەرێم یان ناوەند.',
    mitigationOrRuleEn: 'Enforced at the connection-pool and middleware router logic. System will block query requests.',
    mitigationOrRuleAr: 'محظور برمجياً عند مستوى اتصال قاعدة البيانات. يرفض الخادم تلقائياً أي طلب استعلام مباشر.',
    mitigationOrRuleKu: 'لەسەر ئاستی کۆنترۆڵە سەرەکییەکان قفڵ کراوە و ئەدمین توانای تێپەڕاندنی نییە.'
  },
  {
    id: 'admin_fake_readiness',
    scope: 'Admin',
    actionType: 'forbidden',
    descriptionEn: 'Inject a false READY build score or mark PILOT_READY without active providers.',
    descriptionAr: 'افتعال تقارير وهمية تدعي جاهزية الاتصال الفعلي بالمنافذ تجنباً للتدقيق الإداري.',
    descriptionKu: 'تۆمارکردنی جاهیزیەتی بێ بەڵگە بە مەبەستی ڕاکردن لە وردبینی کارگێڕی.',
    mitigationOrRuleEn: 'Strict verification scans run on and drop active builds if credentials are mock/missing.',
    mitigationOrRuleAr: 'يفشل البناء البرمجي تلقائياً في حال رصد تعبئة يدوية لمعاملات وهمية بدلاً من الاتصال الآمن.',
    mitigationOrRuleKu: 'پرۆسەی بنیادنان ڕەت دەبێتەوە ئەگەر بەڵگەنامە و هێڵەکان ناچالاک بن.'
  },
  // User Allowed
  {
    id: 'user_assigned_workspace',
    scope: 'User',
    actionType: 'allowed',
    descriptionEn: 'Coordinate flows, submit local clearance receipts, and change client interface language.',
    descriptionAr: 'إدارة المعاملات المحلية للمنفذ، وتدقيق فواتير الشحنات، وتغيير لغة العرض.',
    descriptionKu: 'ڕێکخستنی کارە گومرگییە ناوخۆییەکان، نوسینی پێوەستکراو، و دیاریکردنی زمانی بەکارهێنەر.',
    mitigationOrRuleEn: 'Restricted purely to their assigned jurisdiction (Federal-only or KRG-only borders).',
    mitigationOrRuleAr: 'يقتصر على الولاية الجغرافية للموظف (منفذ اتحادي أو منفذ إقليمي بالكامل).',
    mitigationOrRuleKu: 'تەنها سنووردارە بە دەروازەی دیاریکراوی خۆیان لە هەولێر یان بەغدا.'
  },
  // User Forbidden
  {
    id: 'user_admin_policy',
    scope: 'User',
    actionType: 'forbidden',
    descriptionEn: 'Modify endpoint configurations, bypass QA gate checks, or view administration logs.',
    descriptionAr: 'تغيير خوادم الربط التقني، أو إلغاء قيود التدقيق التلقائي الفني لقواعد الامتثال.',
    descriptionKu: 'تێکدانی مەرجەکانی بەڕێوەبەری، گۆڕینی سێرڤەری گرێدان یان سڕینەوەی لۆگی ئەدمین.',
    mitigationOrRuleEn: 'These navigation paths and API gateways are fully locked down using cryptographically verified user tokens.',
    mitigationOrRuleAr: 'هذه النوافذ ملغاة تماماً من شاشة المستخدم العادي عبر تشفير رموز التحقق من الهوية.',
    mitigationOrRuleKu: 'ئەم دەسەڵاتانە قفڵکراون بۆ کاربەرانی ئاسایی و مەترسی گۆڕانکاری نییە لەلایەن کادرەوە.'
  }
];
export const SeparationRoleMapping = {
  adminOnly: ['Technical Administrator', 'Security Analyst'],
  userFacing: ['Federal Executive Viewer', 'KRG Executive Viewer', 'Joint Auditor', 'Federal Customs Officer', 'KRG Customs Officer', 'Border Operator']
};
