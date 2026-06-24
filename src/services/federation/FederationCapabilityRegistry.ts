import { LocalizedString } from './TreatyRegistry';

export type CapabilityScope = 'FEDERAL_ONLY' | 'KRG_ONLY' | 'JOINT';

export interface FederationCapability {
  key: string;
  name: LocalizedString;
  scope: CapabilityScope;
  owner: string;
  delegationRules: string;
  escalationRules: string;
  minClearanceNeeded: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
}

const CAPABILITIES_DB: FederationCapability[] = [
  {
    key: 'CUSTOMS_TARIFF_MUTATION',
    name: {
      en: 'Tariff Rate Formulation & Adjustments',
      ar: 'صياغة وتعديل الرسوم الجمركية والضرائب',
      ku: 'ڕێکخستن و گۆڕینی ڕێژەی باجی گومرگی دەروازەکان'
    },
    scope: 'FEDERAL_ONLY',
    owner: 'Federal Ministry of Finance',
    delegationRules: 'Can delegate read-only reporting access to KRG counterparts only.',
    escalationRules: 'Unilateral gridlocks escalate to the Federal Joint Arbitrations Court.',
    minClearanceNeeded: 'secret'
  },
  {
    key: 'REGIONAL_SMART_CITY_TAX_EXEMPTION',
    name: {
      en: 'Regional Investment Tax Wave Exemption',
      ar: 'الإعفاءات الضريبية للاستثمار الإقليمي',
      ku: 'بەخشینی گومرگی و باجدان بۆ وەبەرهێنەرانی هەرێم'
    },
    scope: 'KRG_ONLY',
    owner: 'KRG Ministry of Finance & Economy',
    delegationRules: 'Strictly regional boundary control. No delegation allowed.',
    escalationRules: 'Federal overlaps require consensus settlement under Treaty-01.',
    minClearanceNeeded: 'secret'
  },
  {
    key: 'CROSS_BORDER_CORRIDOR_COORD',
    name: {
      en: 'Joint Economic Corridor Integration & Patrols',
      ar: 'إدارة وتسيير الممرات الاقتصادية المشتركة',
      ku: 'بەڕێوەبردن و هاوکاری متمانە لە دەروازە گشتییەکان'
    },
    scope: 'JOINT',
    owner: 'Joint Federal & KRG Cabinet Command',
    delegationRules: 'Co-governed by Baghdad Security Admin + Erbil Security Bureau.',
    escalationRules: 'Sovereign gridlock resolved via Prime Ministerial Handshake Protocol.',
    minClearanceNeeded: 'top-secret'
  },
  {
    key: 'NATIONAL_IDENTITY_BIOMETRIC_RESOLVE',
    name: {
      en: 'National Citizen Biometric Overlaps Matching',
      ar: 'مطابقة التداخلات الحيوية للهوية الوطنية للمواطن',
      ku: 'بەراوردکردنی زانیارییە بایۆمەترییەکان بۆ نەهێشتنی تداخل'
    },
    scope: 'JOINT',
    owner: 'Joint Executive Council',
    delegationRules: 'Can query decentralized indexes; raw database hashes stay isolated.',
    escalationRules: 'Unresolved biometric matches default to the resident regional bureau.',
    minClearanceNeeded: 'secret'
  }
];

export class FederationCapabilityRegistry {
  private static db: FederationCapability[] = [...CAPABILITIES_DB];

  public static getCapabilities(): FederationCapability[] {
    return this.db;
  }

  public static getCapability(key: string): FederationCapability | undefined {
    return this.db.find(c => c.key === key);
  }

  public static determineAuthority({
    capabilityKey,
    userRole,
    clearance
  }: {
    capabilityKey: string;
    userRole: string;
    clearance: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
  }): {
    canView: boolean;
    canApprove: boolean;
    canExecute: boolean;
    canOverride: boolean;
    reason: string;
  } {
    const cap = this.getCapability(capabilityKey);
    if (!cap) {
      return {
        canView: false,
        canApprove: false,
        canExecute: false,
        canOverride: false,
        reason: 'Unregistered capacity key.'
      };
    }

    const lowerRole = userRole.toLowerCase();
    const isPrimeMinister = lowerRole.includes('prime') || lowerRole.includes('pm') || lowerRole.includes('minister');
    const isDirector = lowerRole.includes('director') || lowerRole.includes('coordinator') || lowerRole.includes('authority') || lowerRole.includes('auditor');

    // System matches clearance level requirements
    const clearanceWeight = { 'unclassified': 0, 'confidential': 1, 'secret': 2, 'top-secret': 3 };
    const hasClearance = clearanceWeight[clearance] >= clearanceWeight[cap.minClearanceNeeded];

    if (!hasClearance) {
      return {
        canView: false,
        canApprove: false,
        canExecute: false,
        canOverride: false,
        reason: `Clearance deficiency. Requires [${cap.minClearanceNeeded.toUpperCase()}] status.`
      };
    }

    // Role execution matrix
    const canView = true;
    const canApprove = isPrimeMinister;
    const canExecute = isPrimeMinister || isDirector;
    const canOverride = isPrimeMinister && cap.scope === 'JOINT';

    return {
      canView,
      canApprove,
      canExecute,
      canOverride,
      reason: `Authenticated under ${cap.owner} policies. Scope: [${cap.scope}].`
    };
  }
}
