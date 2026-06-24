export interface PresentationFlowStep {
  id: string;
  keyName: string;
  titleEn: string;
  titleAr: string;
  titleKu: string;
}

export class StakeholderPresentationFlow {
  private static activeStepIndex = 0;

  private static steps: PresentationFlowStep[] = [
    {
      id: "platform_mission",
      keyName: "Platform Mission",
      titleEn: "Sovereign Border & Revenue Vision",
      titleAr: "رؤية المنافذ والإيرادات السيادية",
      titleKu: "خۆپیشاندانی سەروەری گشتی دەروازە و داهات"
    },
    {
      id: "fed_krg_separation",
      keyName: "Federal / KRG Separation",
      titleEn: "Constitutional Jurisdiction Isolation",
      titleAr: "عزل الصلاحيات الدستورية والقانونية",
      titleKu: "جیاکاری دەسەڵاتە دەستوورییەکان"
    },
    {
      id: "border_operations",
      keyName: "Border Operations",
      titleEn: "Smart Border Gate & Entry Control",
      titleAr: "إدارة ومراقبة المنافذ البرية الذكية",
      titleKu: "بەڕێوەبردن و چاودێری دەروازە سنورییەکان"
    },
    {
      id: "customs_flow",
      keyName: "Customs Flow",
      titleEn: "Decentralized Customs Declaration Pipeline",
      titleAr: "دورة البيانات الجمركية وتدقيق التعرفة",
      titleKu: "ڕەوتی ناوەندی گومرگ و دەروازەکان"
    },
    {
      id: "revenue_isolation",
      keyName: "Revenue Isolation",
      titleEn: "Sovereign Ledger Boundary Enforcement",
      titleAr: "فرض حدود السجلات المالية السيادية",
      titleKu: "جێبەجێکردنی کەرتی جیاکاری داهات"
    },
    {
      id: "trade_visibility",
      keyName: "Trade Visibility",
      titleEn: "Strategic Import/Export Quota Controls",
      titleAr: "رقابة حصص الاستيراد والتصدير المشتركة",
      titleKu: "کۆنترۆڵی بازرگانی و هاوردەکردن"
    },
    {
      id: "anti_corruption",
      keyName: "Transparency & Anti-Corruption",
      titleEn: "Automated Fraud & Audit Engine",
      titleAr: "كشف التلاعب والتسرب المالي اللحظي",
      titleKu: "سیستەمی چاودێری گەندەڵی و ڕوونی"
    },
    {
      id: "executive_dashboards",
      keyName: "Executive Dashboards",
      titleEn: "Erbil & Baghdad Leadership Viewports",
      titleAr: "لوحات القيادة المستقلة لرؤساء الوزراء",
      titleKu: "داشبۆردی سەرۆکایەتی هەولێر و بەغدا"
    },
    {
      id: "multilingual_runtime",
      keyName: "Multilingual Runtime",
      titleEn: "Dynamic Trilingual Localization",
      titleAr: "الترجمة الذكية الفورية للغات الثلاث",
      titleKu: "پێگەی زمانەوانی هەر سێ کاراکتەرەکە"
    },
    {
      id: "acceptance_checklist",
      keyName: "Acceptance Checklist",
      titleEn: "Sovereign Sign-off & Compliance Protocol",
      titleAr: "بروتوكول الاعتماد والتوقيع النهائي",
      titleKu: "پڕۆتۆکۆلی متمانەپێدان و واژۆی کۆتایی"
    }
  ];

  public static getSteps(): PresentationFlowStep[] {
    return this.steps;
  }

  public static getActiveStep(): PresentationFlowStep {
    return this.steps[this.activeStepIndex];
  }

  public static getActiveIndex(): number {
    return this.activeStepIndex;
  }

  public static setActiveIndex(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.activeStepIndex = index;
    }
  }

  public static nextStep(): boolean {
    if (this.activeStepIndex < this.steps.length - 1) {
      this.activeStepIndex++;
      return true;
    }
    return false;
  }

  public static previousStep(): boolean {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
      return true;
    }
    return false;
  }
}
