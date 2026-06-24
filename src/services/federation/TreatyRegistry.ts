export type TreatyType = 
  | 'customs' 
  | 'data-sharing' 
  | 'identity-federation' 
  | 'border-cooperation' 
  | 'security-cooperation' 
  | 'economic-corridor';

export type TreatyStatus = 
  | 'DRAFT' 
  | 'NEGOTIATION' 
  | 'REVIEW' 
  | 'APPROVED' 
  | 'RATIFIED' 
  | 'ACTIVE' 
  | 'SUSPENDED' 
  | 'TERMINATED';

export interface LocalizedString {
  en: string;
  ar: string;
  ku: string;
}

export interface Treaty {
  id: string;
  title: LocalizedString;
  type: TreatyType;
  status: TreatyStatus;
  signingParties: string[];
  governingLaw: string;
  clauses: { id: string; title: string; content: string }[];
  dateSigned?: string;
  lastUpdated: string;
  complianceRatio: number;
}

const INITIAL_TREATIES: Treaty[] = [
  {
    id: 'TREATY-2026-CUST-01',
    title: {
      en: 'Bilateral Customs Tariff Harmonization Accords',
      ar: 'اتفاقية تنسيق التعريفات الجمركية المشتركة',
      ku: 'ڕێککەوتننامەی هاوتاکردنی گومرگی دوولایەنە'
    },
    type: 'customs',
    status: 'ACTIVE',
    signingParties: ['Federal Ministry of Finance', 'KRG Customs Commission'],
    governingLaw: 'Iraqi Federal Law No. 23 of 2026 & KRG Investment Code',
    clauses: [
      { id: 'C1', title: 'Uniform Border Levies', content: 'Standardizes joint customs procedures at international cross-points with 8% shared revenue distribution.' },
      { id: 'C2', title: 'Tariff Exemption Alignment', content: 'Requires mutual arbitration prior to granting any unilateral tariff exemptions for foreign goods.' }
    ],
    dateSigned: '2026-02-15',
    lastUpdated: '2026-06-08',
    complianceRatio: 92
  },
  {
    id: 'TREATY-2026-DATA-02',
    title: {
      en: 'National Data Fabric Mutual Synchronization Treaty',
      ar: 'معاهدة المزامنة المتبادلة لشبكة البيانات الوطنية',
      ku: 'پەیماننامەی هاوکاتکردنی دوولایەنەی زانیارییە نیشتمانییەکان'
    },
    type: 'data-sharing',
    status: 'ACTIVE',
    signingParties: ['Baghdad Digital Infrastructure Agency', 'KRG Information Technology Dept'],
    governingLaw: 'Unified Cyber-Security Protocol v1.4',
    clauses: [
      { id: 'D1', title: 'State-Level Sync Events', content: 'Provides synchronous AMQP messaging gates for customs declaration clearance and identity registry matching.' },
      { id: 'D2', title: 'Sovereign Cryptographic Keys', content: 'Mandates PKI trust link status exchange and root authority certificate security verification steps.' }
    ],
    dateSigned: '2026-03-10',
    lastUpdated: '2026-06-08',
    complianceRatio: 88
  },
  {
    id: 'TREATY-2026-ID-03',
    title: {
      en: 'Federated Citizen Identity Validation Compact',
      ar: 'ميثاق التحقق من الهوية الفيدرالية الموحدة للمواطنين',
      ku: 'پەیمانی کاراکردنی ناسنامەی فیدراڵیی هاوبەش بۆ هاوڵاتیان'
    },
    type: 'identity-federation',
    status: 'RATIFIED',
    signingParties: ['Federal Civil Status Directorate', 'Kurdistan Region Identity Registry'],
    governingLaw: 'National Identity Act (Law 74 of 2026)',
    clauses: [
      { id: 'I1', title: 'Biometric Handshake', content: 'Exchanges biometric confirmation proofs utilizing localized decentralized hashes without exposing raw databases.' }
    ],
    dateSigned: '2026-04-05',
    lastUpdated: '2026-06-08',
    complianceRatio: 80
  },
  {
    id: 'TREATY-2026-SEC-04',
    title: {
      en: 'Cross-Border Security Operations and Incident Coordination Joint Mandate',
      ar: 'التفويض الأمني المشترك لتنسيق الحدود والعمليات',
      ku: 'ڕاسپاردەی هاوبەشی ئەمنی بۆ هەماهەنگی ڕووداوەکان و پاراستنی سنوورەکان'
    },
    type: 'security-cooperation',
    status: 'NEGOTIATION',
    signingParties: ['Federal Joint Operations Command', 'KRG Ministry of Peshmerga Affairs'],
    governingLaw: 'National Reconciliation Framework Document',
    clauses: [
      { id: 'S1', title: 'Shared Strategic Airspace & Corridors', content: 'Authorizes Joint Command Desks to dispatch urgent incident teams across administrative borders.' }
    ],
    lastUpdated: '2026-06-08',
    complianceRatio: 65
  }
];

export class TreatyRegistry {
  private static treaties: Treaty[] = [...INITIAL_TREATIES];

  public static getTreaties(): Treaty[] {
    return this.treaties;
  }

  public static getTreatyById(id: string): Treaty | undefined {
    return this.treaties.find(t => t.id === id);
  }

  public static addTreaty(treaty: Omit<Treaty, 'id' | 'complianceRatio' | 'lastUpdated'>): Treaty {
    const newTreaty: Treaty = {
      ...treaty,
      id: `TREATY-2026-${treaty.type.toUpperCase().slice(0, 4)}-${Math.floor(Math.random() * 9000 + 1000)}`,
      complianceRatio: 100,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.treaties.push(newTreaty);
    return newTreaty;
  }

  public static updateTreatyStatus(id: string, status: TreatyStatus): Treaty | undefined {
    const treaty = this.treaties.find(t => t.id === id);
    if (treaty) {
      treaty.status = status;
      treaty.lastUpdated = new Date().toISOString().split('T')[0];
    }
    return treaty;
  }

  public static updateCompliance(id: string, ratio: number): Treaty | undefined {
    const treaty = this.treaties.find(t => t.id === id);
    if (treaty) {
      treaty.complianceRatio = Math.max(0, Math.min(100, ratio));
    }
    return treaty;
  }
}
