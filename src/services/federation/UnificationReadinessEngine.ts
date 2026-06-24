import { FederationModeType } from './GovernmentFederationProvider';
import { IdentityRecord, CustomsRecord, PolicyRecord } from '../../providers/GovernmentProvider';

export interface ReadinessChecklistItem {
  id: string;
  category: 'data' | 'pki' | 'law' | 'identity';
  task: {
    en: string;
    ar: string;
    ku: string;
  };
  satisfied: boolean;
  blocker: boolean;
}

export interface ReadinessMetrics {
  dataAlignmentScore: number;
  identityResolutionDensity: number;
  pkiHandshakeStatus: 'untrusted' | 'partially-trusted' | 'fully-federated';
  treatyCompliancePercent: number;
  overallReadinessPercent: number;
  activeMode: FederationModeType;
  items: ReadinessChecklistItem[];
}

export class UnificationReadinessEngine {
  
  private static checklist: ReadinessChecklistItem[] = [
    {
      id: 'check-pki-01',
      category: 'pki',
      task: {
        en: 'Bilateral exchange of Root Certificate Authorities public keys on HSM keyrings',
        ar: 'التبادل الثنائي لمفاتيح هيئات التصديق الرقمي العليا على الحلقات الأمنية',
        ku: 'ئاڵوگۆڕی دوولایەنەی کلیلە گشتییەکانی دەسەڵاتی سەرەکی واژۆ دیجیتاڵییەکان'
      },
      satisfied: true,
      blocker: true
    },
    {
      id: 'check-data-02',
      category: 'data',
      task: {
        en: 'Map HS code classification differences on building materials and heavy processing units',
        ar: 'ترميز ومطابقة فروقات تصنيف البضائع والترميز الرمزي على مواد البناء والأجهزة الثقيلة',
        ku: 'نەخشەکردنی جیاوازییەکانی باجی سەر کاڵاکان بۆ کەرەستەکانی بیناسازی'
      },
      satisfied: true,
      blocker: true
    },
    {
      id: 'check-id-03',
      category: 'identity',
      task: {
        en: 'Synthesize FederatedCitizenID indexes matching Federal NID to Regional Civil registers',
        ar: 'توليد هويات المواطنة الاتحادية الموحدة المطابقة للرقم الوطني وسجلات الأحوال الإقليمية',
        ku: 'دروستکردنی ناسنامەی فیدراڵیی هاوبەش بە بەستنەوەی کارتی نیشتمانیی بە تۆمارە ناوچەییەکان'
      },
      satisfied: false,
      blocker: false
    },
    {
      id: 'check-law-04',
      category: 'law',
      task: {
        en: 'Formulate Joint Customs Reconciliation board protocols for dispute resolution',
        ar: 'صياغة بروتوكولات اللجنة المشتركة العليا لتسوية المنازعات وتعويض حصص الرسوم الجمركية',
        ku: 'داڕشتنی پرۆتۆکۆلی لیژنەی هەماهەنگی بۆ چارەسەرکردنی کێشە داراییەکان'
      },
      satisfied: true,
      blocker: true
    },
    {
      id: 'check-data-05',
      category: 'data',
      task: {
        en: 'Establish unified real-time event-streaming pipelines for cross-boundary cargo monitoring',
        ar: 'إنشاء قنوات بث الأحداث في الوقت الفعلي لمتابعة حركة بضائع الشحن العابرة للحدود',
        ku: 'سازکردنی هێڵی ڕاستەوخۆی هاتوچۆی زانیارییەکان بۆ چاودێریکردنی کاڵا گومرگکراوەکان'
      },
      satisfied: false,
      blocker: false
    }
  ];

  /**
   * Generates dynamic metrics calculated from active real data stored in our state provider
   */
  static evaluateCurrentReadiness({
    activeMode,
    identities,
    customs,
    policies
  }: {
    activeMode: FederationModeType;
    identities: IdentityRecord[];
    customs: CustomsRecord[];
    policies: PolicyRecord[];
  }): ReadinessMetrics {
    
    // Evaluate density ratios
    const totalIds = identities.length;
    const verifiedIds = identities.filter(i => i.biometricStatus === 'verified').length;
    const identityResolutionDensity = totalIds > 0 ? Math.round((verifiedIds / totalIds) * 100) : 100;

    // Evaluate customs alignment
    const auditedCustoms = customs.filter(c => c.status === 'audited' || c.status === 'approved').length;
    const dataAlignmentScore = customs.length > 0 ? Math.round((auditedCustoms / customs.length) * 100) : 80;

    // Evaluate policies context
    const policiesActive = policies.filter(p => p.status === 'active').length;
    const treatyCompliancePercent = policies.length > 0 ? Math.round((policiesActive / policies.length) * 100) : 90;

    // Define PKI Handshake based on mode
    let pkiHandshakeStatus: ReadinessMetrics['pkiHandshakeStatus'] = 'untrusted';
    if (activeMode === 'FEDERATED') {
      pkiHandshakeStatus = 'partially-trusted';
    } else if (activeMode === 'UNIFIED') {
      pkiHandshakeStatus = 'fully-federated';
    }

    // Adapt checklist satisfaction depending on mode
    const items = this.checklist.map(item => {
      if (activeMode === 'UNIFIED') {
        return { ...item, satisfied: true };
      }
      if (activeMode === 'SEPARATED') {
        if (item.category === 'identity' || item.category === 'data') {
          return { ...item, satisfied: false };
        }
      }
      return item;
    });

    const completedItems = items.filter(it => it.satisfied).length;
    const overallReadinessPercent = Math.round((completedItems / items.length) * 100);

    return {
      dataAlignmentScore,
      identityResolutionDensity,
      pkiHandshakeStatus,
      treatyCompliancePercent,
      overallReadinessPercent,
      activeMode,
      items
    };
  }
}
export { UnificationReadinessEngine as UnificationReadinessEngineClass };
