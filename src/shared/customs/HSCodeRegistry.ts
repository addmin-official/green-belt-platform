export interface HSCodeDefinition {
  code: string; // 8-digit standard HS Code
  descriptionEn: string;
  descriptionKu: string;
  categoryEn: string;
  categoryKu: string;
  defaultDutyRate: number; // decimal like 0.05, 0.15, 0.30
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH';
  isRestricted: boolean; // requires special ministerial permit
  isProhibited: boolean; // banned from importation completely
  restrictionNotesEn?: string;
  restrictionNotesKu?: string;
}

export const HS_CODE_REGISTRY: Record<string, HSCodeDefinition> = {
  '87032330': {
    code: '87032330',
    descriptionEn: 'Passenger Motor Vehicles (1.5L to 3.0L)',
    descriptionKu: 'ئۆتۆمبێلی نەفەرهەڵگری تایبەت (١.٥ تا ٣.٠ لیتر)',
    categoryEn: 'Vehicles & Machinery',
    categoryKu: 'ئۆتۆمبێل و ئامێرەکان',
    defaultDutyRate: 0.15,
    riskCategory: 'MEDIUM',
    isRestricted: false,
    isProhibited: false
  },
  '84713000': {
    code: '84713000',
    descriptionEn: 'Portable Digital Automatic Data Processing Machines (Laptops/Tablets)',
    descriptionKu: 'کۆمپیوتەری دەستی و تابلێت (لاپتۆپ)',
    categoryEn: 'Electronics & Computers',
    categoryKu: 'ئەلیکترۆنیات و کۆمپیوتەر',
    defaultDutyRate: 0.05,
    riskCategory: 'LOW',
    isRestricted: false,
    isProhibited: false
  },
  '30049000': {
    code: '30049000',
    descriptionEn: 'Medicaments consisting of mixed or unmixed products for therapeutic uses',
    descriptionKu: 'دەرمان و سەرچاوە پزیشكییەکان بۆ چارەسەری',
    categoryEn: 'Pharmaceuticals & Health',
    categoryKu: 'دەرمان و تەندروستی',
    defaultDutyRate: 0.02,
    riskCategory: 'HIGH',
    isRestricted: true,
    isProhibited: false,
    restrictionNotesEn: 'Requires MOH (Ministry of Health) clearance certificate',
    restrictionNotesKu: 'پێویستی بە بڕوانامەی مۆڵەتی وەزارەتی تەندروستی هەیە'
  },
  '10063020': {
    code: '10063020',
    descriptionEn: 'Semi-milled or wholly milled Basmati Rice',
    descriptionKu: 'برنجی باسماتی نیوە هاڕاو یان تەواو هاڕاو',
    categoryEn: 'Foodstuffs & Agriculture',
    categoryKu: 'خۆراک و کشتوکاڵ',
    defaultDutyRate: 0.05,
    riskCategory: 'LOW',
    isRestricted: false,
    isProhibited: false
  },
  '93019000': {
    code: '93019000',
    descriptionEn: 'Military Weapons (rifles, shotguns and carbines)',
    descriptionKu: 'چەکی سەربازی و تفەنگ',
    categoryEn: 'Arms & Ammunition',
    categoryKu: 'چەک و تەقەمەنی',
    defaultDutyRate: 0.50,
    riskCategory: 'HIGH',
    isRestricted: true,
    isProhibited: true,
    restrictionNotesEn: 'Sovereign Prohibited. Only allowed via National Ministry of Defense authorization.',
    restrictionNotesKu: 'قەدەغەکراوی فەرمی. تەنها لە ڕێگەی وەزارەتی بەرگری نیشتمانی ڕێگەپێدراوە.'
  },
  '27101211': {
    code: '27101211',
    descriptionEn: 'Motor Spirit / Gasoline (Octane Rating 95+)',
    descriptionKu: 'نزینی ئۆکتان بەرز (٩٥+)',
    categoryEn: 'Petroleum & Minerals',
    categoryKu: 'کەرەستەی نەوتی و کانزایی',
    defaultDutyRate: 0.20,
    riskCategory: 'MEDIUM',
    isRestricted: true,
    isProhibited: false,
    restrictionNotesEn: 'Import subject to SOMO / Ministry of Oil quota controls',
    restrictionNotesKu: 'هاوردەکردن بە مەرجی چاودێری وەزارەتی سامانە کانییەکانە'
  },
  '25232900': {
    code: '25232900',
    descriptionEn: 'Portland Cement (Gray and White)',
    descriptionKu: 'چیمەنتۆی پۆرتلاند (خۆڵەمێشی و سپی)',
    categoryEn: 'Construction Materials',
    categoryKu: 'کەرەستەی بیناسازی',
    defaultDutyRate: 0.10,
    riskCategory: 'LOW',
    isRestricted: false,
    isProhibited: false
  }
};

export class HSCodeRegistry {
  public static getHSDefinition(code: string): HSCodeDefinition | undefined {
    return HS_CODE_REGISTRY[code];
  }

  public static getAllDefinitions(): HSCodeDefinition[] {
    return Object.values(HS_CODE_REGISTRY);
  }

  public static searchByCodeOrName(query: string, lang: 'en' | 'ku' = 'ku'): HSCodeDefinition[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAllDefinitions();
    
    return this.getAllDefinitions().filter(def => 
      def.code.includes(q) ||
      def.descriptionEn.toLowerCase().includes(q) ||
      def.descriptionKu.includes(q) ||
      def.categoryEn.toLowerCase().includes(q) ||
      def.categoryKu.includes(q)
    );
  }
}
