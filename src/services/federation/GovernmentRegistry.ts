import { Language } from '../../types';

export interface GovernmentInfo {
  id: string;
  code: 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS';
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  capital: {
    en: string;
    ar: string;
    ku: string;
  };
  governingLaw: {
    en: string;
    ar: string;
    ku: string;
  };
  primaryEndpoint: string;
  pkiRootCN: string;
  status: 'active' | 'standby' | 'unified';
}

export const GOVERNMENT_REGISTRY: GovernmentInfo[] = [
  {
    id: 'GOV-IQ-FED-01',
    code: 'FEDERAL_IRAQ',
    name: {
      en: 'Federal Government of Iraq',
      ar: 'حكومة جمهورية العراق الاتحادية',
      ku: 'حکومەتی فیدراڵی عێراق'
    },
    capital: {
      en: 'Baghdad',
      ar: 'بغداد',
      ku: 'بەغداد'
    },
    governingLaw: {
      en: 'Iraqi Constitution of 2005 & Customs Act No. 23 of 1984',
      ar: 'الدستور العراقي لعام 2005 وقانون الجمارك رقم 23 لسنة 1984',
      ku: 'دەستووری عێراقی ٢٠٠٥ و یاسای گومرگی ژمارە ٢٣ی ساڵی ١٩٨٤'
    },
    primaryEndpoint: 'https://api.federal.idg.gov.iq/v1',
    pkiRootCN: 'Federal Iraq Sovereign NID Root CA - G1',
    status: 'active'
  },
  {
    id: 'GOV-IQ-KRG-02',
    code: 'KURDISTAN_REGION',
    name: {
      en: 'Kurdistan Regional Government (KRG)',
      ar: 'حكومة إقليم كوردستان',
      ku: 'حکومەتی هەرێمی کوردستان'
    },
    capital: {
      en: 'Erbil',
      ar: 'أربيل',
      ku: 'هەولێر'
    },
    governingLaw: {
      en: 'KRG Council of Ministers Regulatory Framework Act',
      ar: 'الإطار التنظيمي لمجلس وزراء إقليم كوردستان',
      ku: 'یاسای جێبەجێکاری ئەنجومەنی وەزیرانی هەرێمی کوردستان'
    },
    primaryEndpoint: 'https://api.krg.gov.krd/v1',
    pkiRootCN: 'KRG National Identity Security CA - R1',
    status: 'active'
  },
  {
    id: 'GOV-IQ-JOINT-99',
    code: 'JOINT_OPERATIONS',
    name: {
      en: 'Joint Iraq-KRG Federal Coordination Desk',
      ar: 'مكتب التنسيق الاتحادي المشترك بين العراق والإقليم',
      ku: 'نووسینگەی هەماهەنگی هاوبەشی فیدراڵ-هەرێم'
    },
    capital: {
      en: 'Baghdad & Erbil Joint Commission',
      ar: 'اللجنة المشتركة بين بغداد وأربيل',
      ku: 'لیژنەی هاوبەشی بەغدا و هەولێر'
    },
    governingLaw: {
      en: 'Unified customs agreement & National Security Handshake Protocols',
      ar: 'الاتفاق الجمركي الموحد وبروتوكولات المصافحة للأمن الوطني',
      ku: 'ڕێککەوتنی یەکگرتووی گومرگی و پرۆتۆکۆلی ئاسایشی نیشتمانیی هاوبەش'
    },
    primaryEndpoint: 'https://federation-gateway.idg.gov.iq/v1',
    pkiRootCN: 'Joint Federated Trust Bridge Root CA - F1',
    status: 'active'
  }
];

export function getGovernmentTranslation(info: GovernmentInfo, lang: Language): { name: string; capital: string; governingLaw: string } {
  return {
    name: info.name[lang] || info.name.en,
    capital: info.capital[lang] || info.capital.en,
    governingLaw: info.governingLaw[lang] || info.governingLaw.en
  };
}
