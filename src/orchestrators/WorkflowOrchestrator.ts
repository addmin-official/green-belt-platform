import { WorkflowContract, WorkflowItem } from '../contracts/WorkflowContract';

export interface WorkflowDef {
  id: string;
  title: Record<string, string>;
  actor: Record<string, string>;
  detail: Record<string, string>;
}

export class WorkflowOrchestrator implements WorkflowContract {
  private static instance: WorkflowOrchestrator;
  
  private activeWorkflows: WorkflowItem[] = [
    { id: 'WL-7701', importer: 'Sumer Logistics', hscode: '7304.22.00', duty: '8%', risk: 'low', status: 'CLEARED', step: 13 },
    { id: 'WL-7702', importer: 'Basra Oil Corp', hscode: '8413.70.20', duty: '5%', risk: 'medium', status: 'PENDING_COGNITIVE', step: 2 },
    { id: 'WL-7703', importer: 'Tigris Agro Traders', hscode: '1001.19.00', duty: '0%', risk: 'high', status: 'PENDING_CBI', step: 3 },
  ];

  private constructor() {}

  public static getInstance(): WorkflowOrchestrator {
    if (!WorkflowOrchestrator.instance) {
      WorkflowOrchestrator.instance = new WorkflowOrchestrator();
    }
    return WorkflowOrchestrator.instance;
  }

  public getActiveWorkflows(): WorkflowItem[] {
    return this.activeWorkflows;
  }

  public getWorkflowById(id: string): WorkflowItem | undefined {
    return this.activeWorkflows.find(w => w.id === id);
  }

  public transitionWorkflow(id: string, action: 'APPROVE' | 'REJECT' | 'HOLD'): void {
    const wf = this.activeWorkflows.find(w => w.id === id);
    if (!wf) return;
    if (action === 'APPROVE') {
      wf.status = 'CLEARED';
      wf.step = 13;
    } else if (action === 'REJECT') {
      wf.status = 'SUSPENDED';
    } else {
      wf.status = 'PENDING_LEDGER';
    }
  }

  public getWorkflowSteps(): WorkflowDef[] {
    return [
      {
        id: 'step-1',
        title: { en: 'Secure Digital Manifest Submission', ar: 'تقديم بيان الشحنة الرقمي المشفر', ku: 'پێشکەشکردنی بەیاننامەی بارهەڵگری کۆدکراو' },
        actor: { en: 'Importer Trade Entity', ar: 'الجهة المستوردة المصرحة', ku: 'کۆمپانیای هاوردەکاری فەرمی' },
        detail: { en: 'The trader uploads the cargo manifest into IDG portal using cryptographic biosecurity signature verification.', ar: 'يقوم المستورد برفع تفاصيل الشحنة عبر البوابة بختم وبصمة إلكترونية بايومترية مشفرة صفر ثقة.', ku: 'هاوردەکار وەسفی گشتی شتوومەک پاشەکەوت دەکات لە ڕێگەی مۆری دیجیتاڵیی هێمن.' }
      },
      {
        id: 'step-2',
        title: { en: 'Autonomous HS-Code Translation Audit', ar: 'التدقيق الآلي لرمز النظام المنسق', ku: 'تدقیقی خودکاری کایەکانی کۆدی جیهانی HS' },
        actor: { en: 'Sovereign IDG Cortex', ar: 'العقل الاصطناعي السيادي (IDG Cortex)', ku: 'مێشکی زیرەکی نیشتمانیی (IDG Cortex)' },
        detail: { en: 'Gemini NLP parses description to verify correct HS Code classification representation, rejecting mismatches.', ar: 'يقوم محرك الذكاء الاصطناعي التابع للبوابة بمطابقة التوصيف اللفظي للتأكد من رمز السلعة ورسومها.', ku: 'مۆدێلی ژیری دەستکرد وەسفی بار بۆ کۆدی ستانداردی HS پۆلێن دەکات تا ڕێگری بکات لە هەڵە.' }
      },
      {
        id: 'step-3',
        title: { en: 'Central Bank (CBI) FX-Collateral Match', ar: 'مطابقة حوالة عملة البنك المركزي العراقي', ku: 'هاوتاکردنی حەواڵەی دارایی بانکی ناوەندی عێراق (CBI)' },
        actor: { en: 'Central Bank of Iraq (CBI)', ar: 'البنك المركزي العراقي (CBI)', ku: 'بانکی ناوەندی عێراق (CBI)' },
        detail: { en: 'Verifies matching legal purchase of foreign reserves against customs evaluation parameters, blocking capital flight.', ar: 'يتم التدقيق التلقائي لمطابقة الاعتماد المالي ومزاد العملة مع قيمة البضاعة لمنع التهرب المالي.', ku: 'پڕبوونی مۆڵەتی کڕینی دۆلاری فەرمی بەراورد دەکرێت لەگەڵ بەهای بار بۆ ڕاگرتنی سپیکردنەوەی پارە.' }
      },
      {
        id: 'step-4',
        title: { en: 'Quality & Standardization Interlock', ar: 'تدقيق التقييس والسيطرة النوعية الفيدرالي', ku: 'کۆنتڕۆڵی جۆری و مەرجی ستانداردەکانی عێراق' },
        actor: { en: 'COSQC Standardization Authority', ar: 'الجهاز المركزي للتقييس والسيطرة النوعية', ku: 'ناوةندي گشتي كۆنترۆڵي جۆري (COSQC)' },
        detail: { en: 'Cross checks electronic standardization certificates based on national quality protection guidelines.', ar: 'مطابقة الفحوصات الفنية لسلامة ومطابقة السلع للمواصفات العراقية المعتمدة إلكترونياً.', ku: 'پشکنینی بڕوانامەی تەندروستی و سەلامەتی بار بە پێی ڕێنمایی یەکگرتووي دەوڵەت.' }
      },
      {
        id: 'step-5',
        title: { en: 'Dual-Use Strategic Material Defense Gate', ar: 'بوابة تراخيص السلع الاستراتيجية والوزارية', ku: 'پشکنینی دەروازەی وەزارەتی ناوخۆ بۆ باری تایبەت' },
        actor: { en: 'Ministry of Defense & Civil Auth', ar: 'وزارة الدفاع الوطني واللجان المشتركة', ku: 'وەزارەتی فیدراڵ و لیژنەی باڵای ئەمنی' },
        detail: { en: 'Verifies dual-use industrial chemical reagents or alloys matching military security authorization registers.', ar: 'فحص مسبق للمواد الكيميائية والأجهزة الحساسة لمنع دخول المواد الخطرة دون تفويض.', ku: 'پشکنینی تەواوی ماددە جۆربەجۆرەکانی پیشەسازی پیش دانی ڕێپێدانی تێپەڕبوون.' }
      },
      {
        id: 'step-6',
        title: { en: 'Phytosanitary Medical Clearance Audit', ar: 'الفحص الطبي الزراعي والصحي للشحنة', ku: 'تدقیقی تەندروستی پزیشکی و کشتوکاڵی' },
        actor: { en: 'Ministry of Health & Agriculture', ar: 'وزارتا الصحة والزراعة الاتحادية', ku: 'وەزارەتی تەندروستی و وەزارەتی کشتوکاڵ' },
        detail: { en: 'Validates quarantine safety stamps, biological certifications, and expiry codes at entrance hubs.', ar: 'تدقيق شهادات الحجر الصحي الحيوانية والنباتية وصلاحيات اللقاحات ومطابقة المخازن المبردة.', ku: 'پشتڕاستکردنەوەی مۆری کەرەنتینە و مەرجەکانی سەلامەتی بایۆلۆجی بۆ باری خۆراک یان دەرمان.' }
      },
      {
        id: 'step-7',
        title: { en: 'Under-Invoicing Revenue Protection Audit', ar: 'التسعير الاستيرادي ومكافحة التهرب الفاتوري', ku: 'پشکینی فێڵی بەهەرزان نیشاندانی تێچووی هاوردە' },
        actor: { en: 'Federal Customs Anti-Fraud unit', ar: 'وحدة حماية الإيرادات ومكافحة التهرب الجمركي', ku: 'بەشی دەروازە بۆ چاودێری فێڵ و داگرتنی نرخ' },
        detail: { en: 'Correlates price profiles to prevent tariff losses from undervalued and misdeclared imports.', ar: 'يقوم الذكاء الاصطناعي بكشف كذب الفواتير الاستعراضية الرخيصة لإلزام المستورد بالقيمة العادلة الموحدة.', ku: 'بەراوردکردنی نرخی ڕاگەیەندراو لەگەڵ نرخی بازاڕ بۆ ڕاگرتنی تێکدانی هاوسەنگی باج.' }
      },
      {
        id: 'step-8',
        title: { en: 'Centralized Risk Scoring Vector Assessment', ar: 'محرك تقييم المخاطر الأمنية والجمركية', ku: 'بزوێنەری پۆلێنکردنی مەترسییە ئەمنییەکان' },
        actor: { en: 'Joint Intelligence Risk Hub', ar: 'المركز المشترك لتقدير المخاطر واستخبارات الحدود', ku: 'ناوەندی کێشانی نەخشەی مەترسی خاڵە سنوورییەکان' },
        detail: { en: 'Compiles custom behavioral data records to assign high, medium, or green speed audit lanes.', ar: 'تصنيف سلوك المستورد للتسهيل المباشر أو الالتزام بالتفتيش الميداني والأشعة الحية.', ku: 'دانانی نمرەی مەترسی گشتی بۆ گواستنەوەی بار بۆ ڕێڕەوی خێرا یان پشکنینی سۆنەر.' }
      },
      {
        id: 'step-9',
        title: { en: 'Physical Border X-Ray Scanner Match', ar: 'الفحص الميداني الفيزيائي وأجهزة السونار', ku: 'پشکنینی سۆنەر و سکێنەری تیشکی فورت' },
        actor: { en: 'Border Crossing Hardware Auth', ar: 'أجهزة السونار ومراقبة المنافذ الميدانية', ku: 'أجهزة السونار ومراقبة المنافذ الميدانية' },
        detail: { en: 'Schedules bulk container scanning. Computer vision identifies density anomalies inside cargo panels.', ar: 'مطابقة صور الأشعة السينية للحاويات بالذكاء الاصطناعي للتأكد من مطابقة اللوائح للواقع المادي.', ku: 'پێداچوونەوەی وێنەی سۆنەری کانتینەر لەگەڵ زانیاری دۆکیومێنتی باری هاتووە ژوورەوە.' }
      },
      {
        id: 'step-10',
        title: { en: 'Federal Tariff calculation & Assessment', ar: 'احتساب قيمة الرسوم الجمركية والرسوم الاتحادية', ku: 'محاسبەکردنی بڕی باجی فەرمی تاریفەی جومگەیی' },
        actor: { en: 'Unified General Customs Authority', ar: 'الهيئة الاتحادية للجمارك والتعرفة الموحدة', ku: 'ناوەندی باجی گومرگی فیدراڵی عێراقی' },
        detail: { en: 'Generates secure final ad-valorem duty calculations based on checked HS-code rules.', ar: 'إصدار التسعيرة الرسمية النهائية للضريبة والجمارك والرسوم الإضافية بموجب القانون الموحد.', ku: 'دروستکردنی فۆرمی کۆتایی تێچووی گومرگ بە پێی یاسای تاریفەی پەسەندکراوی دەوڵەت.' }
      },
      {
        id: 'step-11',
        title: { en: 'Human-in-the-Loop Override Approval', ar: 'المصادقة والتفويض البشري للمعاملة الجمركية', ku: 'پەسەندکردنی کۆتایی ئەفسەری ڕێپێدراو (مرۆیی)' },
        actor: { en: 'Authorized Customs Officer', ar: 'ضابط الجمارك المفوض (التوقيع البشري)', ku: 'ئەفسەری فەرمی بەرپرسی متمانەی کۆتایی' },
        detail: { en: 'The officer reviews compiled intelligence reports to click approval stamps, releasing cargo grids.', ar: 'مراجعة نهائية من قبل ضابط الإدخال للمصادقة وتمرير المعاملة أو تعليقها للتحقيق.', ku: 'ئەفسەری نیشتمانیی پێداچوونەوە دەکات بە گشت بەڵگەکان و مۆری کۆتایی تێپەڕبوون دەدات.' }
      },
      {
        id: 'step-12',
        title: { en: 'Blockchain Ledger Escrow Settlement', ar: 'تأمين الحوالة البنكية ومقاصة الضمان الإلكتروني', ku: 'پاشەکەوتکردنی ژمارەیی معاملەکە لە بلۆکچین' },
        actor: { en: 'Sovereign Clearing Ledger', ar: 'منظومة السجل والكتل المالية المشفرة', ku: 'سیستەمی تۆماری بلۆکچینی گومرگ' },
        detail: { en: 'Binds the transactional logs into a secure immutable state ledger block, verifying audit trail integrity.', ar: 'إرسال تفاصيل المعاملة والرسوم المقبوضة لسلسلة الكتل المشفرة غير القابلة للتلاعب.', ku: 'جێگیرکردنی داتاکانی گومرگ لەناو بلۆکچینی نیشتمانیی بێ ویستی دەستکاریکردن.' }
      },
      {
        id: 'step-13',
        title: { en: 'National Treasury Ledger Dispatch', ar: 'إيداع وتسوية أموال الرسوم في الخزينة المركزية', ku: 'ناردنی داهات بۆ خەزێنەی سەرەکی دەوڵەت' },
        actor: { en: 'Iraq Ministry of Finance', ar: 'وزارة المالية الاتحادية وخزينة الدولة', ku: 'وزارة المالية الاتحادية وخزينة الدولة' },
        detail: { en: 'Triggers dynamic payout settlements into the executive Central Treasury cash buffer account.', ar: 'تسوية الحوالة ونقل الأموال من حساب الضمان إلى الخزينة المركزية الفيدرالية رسمياً.', ku: 'ناردنی فەرمی پارەی باج بۆ ئەکاونتی گشتی خەزێنەی متمانەپێکراوی وەزارتی دارایی.' }
      }
    ];
  }
}
