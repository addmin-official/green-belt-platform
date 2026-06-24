import { LocalizedString } from './TreatyRegistry';

export interface CabinetMinister {
  id: string;
  name: LocalizedString;
  portfolio: LocalizedString;
  jurisdiction: 'federal' | 'krg' | 'joint';
  clearanceLevel: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
  activeSessionId?: string;
}

const MINISTER_ROSTER: CabinetMinister[] = [
  // Federal Iraqi Cabinet
  {
    id: 'MIN-FED-PM',
    name: {
      en: 'Dr. Muhammad S. Al-Sudani',
      ar: 'د. محمد شياع السوداني',
      ku: 'د. محەمەد شیاع سودانی'
    },
    portfolio: {
      en: 'Prime Minister of the Republic of Iraq',
      ar: 'رئيس مجلس وزراء جمهورية العراق',
      ku: 'سەرۆک وەزیرانی کۆماری عێراق'
    },
    jurisdiction: 'federal',
    clearanceLevel: 'top-secret',
    activeSessionId: 'FED-SESS-992'
  },
  {
    id: 'MIN-FED-FIN',
    name: {
      en: 'Taif Sami Al-Shakarji',
      ar: 'طيف سامي الشكرجي',
      ku: 'تەیف سامی شەکەرچی'
    },
    portfolio: {
      en: 'Minister of Finance',
      ar: 'وزير المالية الاتحادي',
      ku: 'وەزیری دارایی فیدراڵ'
    },
    jurisdiction: 'federal',
    clearanceLevel: 'secret',
    activeSessionId: 'FED-SESS-992'
  },
  {
    id: 'MIN-FED-INT',
    name: {
      en: 'Abdul Amir Al-Shammari',
      ar: 'عبد الأمير الشمري',
      ku: 'عەبدولئەمیر شەمەری'
    },
    portfolio: {
      en: 'Minister of Interior',
      ar: 'وزير الداخلية الاتحادي',
      ku: 'وەزیری ناوخۆی فیدراڵ'
    },
    jurisdiction: 'federal',
    clearanceLevel: 'top-secret',
    activeSessionId: 'FED-SESS-992'
  },

  // Kurdistan KRG Cabinet
  {
    id: 'MIN-KRG-PM',
    name: {
      en: 'Masrour Barzani',
      ar: 'مسرور بارزاني',
      ku: 'مەسرور بارزانی'
    },
    portfolio: {
      en: 'Prime Minister of the Kurdistan Region (KRG)',
      ar: 'رئيس وزراء إقليم كوردستان',
      ku: 'سەرۆکی ئەنجومەنی وەزیرانی هەرێمی کوردستان'
    },
    jurisdiction: 'krg',
    clearanceLevel: 'top-secret',
    activeSessionId: 'KRG-SESS-801'
  },
  {
    id: 'MIN-KRG-FIN',
    name: {
      en: 'Awat Janab Noori',
      ar: 'آوات جناب نوري',
      ku: 'ئاوات جەناب نووری'
    },
    portfolio: {
      en: 'Minister of Finance and Economy',
      ar: 'وزير المالية والاقتصاد في الإقليم',
      ku: 'وەزیری دارایی و ئابووری هەرێم'
    },
    jurisdiction: 'krg',
    clearanceLevel: 'secret',
    activeSessionId: 'KRG-SESS-801'
  },
  {
    id: 'MIN-KRG-INT',
    name: {
      en: 'Rebar Ahmed Khalid',
      ar: 'ريبر أحمد خالد',
      ku: 'ڕێبەر ئەحمەد خالد'
    },
    portfolio: {
      en: 'Minister of Interior',
      ar: 'وزير داخلية إقليم كوردستان',
      ku: 'وەزیری ناوخۆی هەرێمی کوردستان'
    },
    jurisdiction: 'krg',
    clearanceLevel: 'top-secret',
    activeSessionId: 'KRG-SESS-801'
  },

  // Joint Strategic Representatives
  {
    id: 'MIN-JOINT-COOR',
    name: {
      en: 'Maj. Gen. Tahsin Al-Khafaji',
      ar: 'اللواء تحسين الخفاجي',
      ku: 'لیوا تەحسین خەفاجی'
    },
    portfolio: {
      en: 'Joint Security Arbitrator & Coordinator',
      ar: 'المنسق الأمني المشترك للحدود الفيدرالية',
      ku: 'هەماهەنگیکار و ناوبژیوانی ئەمنی هاوبەش'
    },
    jurisdiction: 'joint',
    clearanceLevel: 'top-secret',
    activeSessionId: 'JOINT-BOARD-202'
  },
  {
    id: 'MIN-JOINT-INTEG',
    name: {
      en: 'Soran M. Qadir',
      ar: 'سوران م. قادر',
      ku: 'سۆران م. قادر'
    },
    portfolio: {
      en: 'Federation Integration Director',
      ar: 'مدير عام التكامل السيادي للبيانات الجمركية',
      ku: 'بڕیاردەری گشتی یەکگرتنی تەکنیکی و گومرگی'
    },
    jurisdiction: 'joint',
    clearanceLevel: 'secret',
    activeSessionId: 'JOINT-BOARD-202'
  }
];

export class CabinetRegistry {
  private static roster: CabinetMinister[] = [...MINISTER_ROSTER];

  public static getMinisterRoster(): CabinetMinister[] {
    return this.roster;
  }

  public static getMinistersByJurisdiction(jurisdiction: 'federal' | 'krg' | 'joint'): CabinetMinister[] {
    return this.roster.filter(m => m.jurisdiction === jurisdiction);
  }

  public static getMinisterById(id: string): CabinetMinister | undefined {
    return this.roster.find(m => m.id === id);
  }
}
