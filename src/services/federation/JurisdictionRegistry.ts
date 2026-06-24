import { JurisdictionType } from '../../providers/GovernmentProvider';

export interface GateInfo {
  id: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  type: 'air' | 'sea' | 'land';
  location: string;
  assignedAuthorityId: string;
}

export interface JurisdictionDetails {
  code: JurisdictionType;
  officialName: {
    en: string;
    ar: string;
    ku: string;
  };
  domainName: string;
  encryptionStandard: string;
  governessNodesCount: number;
  gates: GateInfo[];
}

export const JURISDICTION_REGISTRY: JurisdictionDetails[] = [
  {
    code: 'federal',
    officialName: {
      en: 'Federal Administrative Jurisdiction',
      ar: 'ولاية القضاء الإداري والمالي الاتحادي',
      ku: 'دەسەڵاتی جێبەجێکاریی فیدراڵ'
    },
    domainName: 'federal.idg.gov.iq',
    encryptionStandard: 'AES-256-GCM / SHA-256 RSA-4096',
    governessNodesCount: 12,
    gates: [
      {
        id: 'gate-umm-qasr',
        name: {
          en: 'Umm Qasr Southern Port',
          ar: 'منفذ ميناء أم قصر الجنوبي الكبير',
          ku: 'دەروازەی دەریایی ئوم قەسر لە باشوور'
        },
        type: 'sea',
        location: 'Basra Governorate',
        assignedAuthorityId: 'AUTH-CUSTOMS-FED'
      },
      {
        id: 'gate-trebil',
        name: {
          en: 'Trebil Border Crossing',
          ar: 'منفذ طريبيل الحدودي الغربي',
          ku: 'دەروازەی سنووری وشکانی تڕێبێل'
        },
        type: 'land',
        location: 'Anbar Governorate',
        assignedAuthorityId: 'AUTH-CUSTOMS-FED'
      },
      {
        id: 'gate-baghdad-air',
        name: {
          en: 'Baghdad International Cargo Terminal',
          ar: 'منفذ مطار بغداد الدولي لخدمات الشحن والجمارك',
          ku: 'دەروازەی بارهەڵگری ئاسمانی فڕۆکەخانەی بەغداد'
        },
        type: 'air',
        location: 'Baghdad Administrative Zone',
        assignedAuthorityId: 'AUTH-CUSTOMS-FED'
      }
    ]
  },
  {
    code: 'krg',
    officialName: {
      en: 'Kurdistan Regional Self-Governed Jurisdiction',
      ar: 'ولاية إقليم كوردستان المتمتع بالحكم الذاتي الإداري',
      ku: 'دەسەڵاتی جێبەجێکاریی هەرێمی کوردستان'
    },
    domainName: 'regional.krg.gov.krd',
    encryptionStandard: 'AES-256-GCM / SHA-256 ECDSA-384',
    governessNodesCount: 8,
    gates: [
      {
        id: 'gate-ibrahim-khalil',
        name: {
          en: 'Ibrahim Khalil Border Gate',
          ar: 'منفذ إبراهيم الخليل البري الدولي',
          ku: 'دەروازەی سنووری نێودەوڵەتیی ئیبراهیم خەلیل'
        },
        type: 'land',
        location: 'Duhok Governorate / Zacko',
        assignedAuthorityId: 'AUTH-CUSTOMS-KRG'
      },
      {
        id: 'gate-soran',
        name: {
          en: 'Soran Customs Railhead Hub',
          ar: 'محطة جمارك سوران البرية اللوجستية',
          ku: 'مەڵبەندی گومرگی وشکانی سۆران'
        },
        type: 'land',
        location: 'Erbil Governorate / Soran',
        assignedAuthorityId: 'AUTH-CUSTOMS-KRG'
      }
    ]
  },
  {
    code: 'joint',
    officialName: {
      en: 'Federated Joint Operations Jurisdiction',
      ar: 'الولاية المشتركة العليا لإدارة التنسيق الجمركي والبيئي',
      ku: 'دەسەڵاتی هاوبەشی بەڕێوەبردنی گومرگ و ئاسایش'
    },
    domainName: 'federation-mesh.idg.gov.iq',
    encryptionStandard: 'Dual Trust Handshake Certificate - ECDSA & RSA Hybrid',
    governessNodesCount: 4,
    gates: [] // Governs both sides via bridge
  }
];

export function getJurisdictionByCode(code: JurisdictionType): JurisdictionDetails {
  const jur = JURISDICTION_REGISTRY.find(j => j.code === code);
  if (!jur) {
    throw new Error(`Jurisdiction '${code}' is not documented in the JurisdictionRegistry.`);
  }
  return jur;
}
