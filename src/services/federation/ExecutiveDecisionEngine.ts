import { LocalizedString } from './TreatyRegistry';

export interface ExecutiveDecision {
  id: string;
  title: LocalizedString;
  summary: LocalizedString;
  jurisdiction: 'federal' | 'krg' | 'joint';
  status: 'PROPOSED' | 'UNDER_REVIEW' | 'SIGNED' | 'ENFORCED' | 'VETOED';
  proposer: string;
  signers: string[];
  requiredSignersCount: number;
  dateCreated: string;
  lastUpdated: string;
  isEmergency: boolean;
  immutableSHA256: string;
  approvalHistory: { timestamp: string; actor: string; action: string; comment: string }[];
}

const INITIAL_DECISIONS: ExecutiveDecision[] = [
  {
    id: 'EXE-DEC-2026-001',
    title: {
      en: 'Immediate Border Tariff Offset Settlement',
      ar: 'تسوية المقاصة الفورية للتعريفة الجمركية الحدودية',
      ku: 'بڕیاری هاوتاییکردنی ڕاستەوخۆی باجی گومرگی سەر سنوورەکان'
    },
    summary: {
      en: 'Unifies customs fees and offset balances across Ibrahim Khalil with direct 12% central allocation.',
      ar: 'توحيد الرسوم الجمركية في معبر إبراهيم الخليل مع تخصيص مركزي فوري بنسبة ١٢٪.',
      ku: 'یەکخستنی تێچووە گومرگییەکان لە مەرزی ئیبراهیم خەلیل لەگەڵ دیاریکردنی ١٢٪ داهات بە شێوازی ناوەندی.'
    },
    jurisdiction: 'joint',
    status: 'SIGNED',
    proposer: 'Joint Customs Coordination Secretariat',
    signers: ['Dr. Muhammad S. Al-Sudani', 'Masrour Barzani'],
    requiredSignersCount: 2,
    dateCreated: '2026-06-01T10:00:00Z',
    lastUpdated: '2026-06-08T12:00:00Z',
    isEmergency: true,
    immutableSHA256: 'de2ad57c63fe120a7bcef56ab90d37c3ff113f8a234ce6e1920a7bcef56ab90d',
    approvalHistory: [
      { timestamp: '2026-06-01T10:15:00Z', actor: 'Soran M. Qadir', action: 'PROPOSED', comment: 'Drafted treaty synchronization protocol.' },
      { timestamp: '2026-06-05T14:30:22Z', actor: 'Taif Sami Al-Shakarji', action: 'REVIEWED', comment: 'Verified financial allocation parameter checks' },
      { timestamp: '2026-06-08T11:45:00Z', actor: 'Dr. Muhammad S. Al-Sudani', action: 'SIGNED', comment: 'Approved on behalf of Federal Cabinet.' },
      { timestamp: '2026-06-08T12:00:00Z', actor: 'Masrour Barzani', action: 'SIGNED', comment: 'Approved on behalf of Kurdistan Regional Government.' }
    ]
  },
  {
    id: 'EXE-DEC-2026-002',
    title: {
      en: 'Federal National ID Registry Sync Authorization',
      ar: 'تخويل مزامنة السجل المدني الفيدرالي الموحد',
      ku: 'مۆڵەتی بەکارخستنی متمانەی ناسنامەی فیدراڵیی هاوبەش'
    },
    summary: {
      en: 'Allows live cryptographic queries from Erbil checkpoint gates to the central Baghdad civil status registry databases.',
      ar: 'السماح بالاستعلام الكريبتوغرافي الفوري من بوابات أربيل الأمنية إلى قواعد السجل المدني الاتحادي في بغداد.',
      ku: 'ڕێگەدان بە گەڕانی کریپتۆگرافیی ڕاستەوخۆ لە بازگەکانی هەولێرەوە بۆ بنکەدراوەی تۆماری شارستانی ناوەندی بغداد.'
    },
    jurisdiction: 'federal',
    status: 'ENFORCED',
    proposer: 'Federal Ministry of Interior',
    signers: ['Dr. Muhammad S. Al-Sudani', 'Abdul Amir Al-Shammari'],
    requiredSignersCount: 2,
    dateCreated: '2026-06-03T09:00:00Z',
    lastUpdated: '2026-06-08T03:00:00Z',
    isEmergency: false,
    immutableSHA256: '9b4ce639aabf7d61a8ccdeb012f47e583b18cb4ab9ad781ee0a96dbcd321ac4b5',
    approvalHistory: [
      { timestamp: '2026-06-03T09:00:00Z', actor: 'Abdul Amir Al-Shammari', action: 'PROPOSED', comment: 'Submitted for secure border integrity enforcement.' },
      { timestamp: '2026-06-08T03:00:00Z', actor: 'Dr. Muhammad S. Al-Sudani', action: 'SIGNED', comment: 'Fully authorized and locked in. Digital distribution activated.' }
    ]
  }
];

export class ExecutiveDecisionEngine {
  private static decisions: ExecutiveDecision[] = [...INITIAL_DECISIONS];

  public static getDecisions(): ExecutiveDecision[] {
    return this.decisions;
  }

  public static getDecisionsByJurisdiction(jurisdiction: 'federal' | 'krg' | 'joint'): ExecutiveDecision[] {
    return this.decisions.filter(d => d.jurisdiction === jurisdiction);
  }

  public static proposeDecision(decision: {
    title: LocalizedString;
    summary: LocalizedString;
    jurisdiction: 'federal' | 'krg' | 'joint';
    proposer: string;
    isEmergency: boolean;
    requiredSignersCount: number;
  }): ExecutiveDecision {
    const fresh: ExecutiveDecision = {
      id: `EXE-DEC-2026-${Math.floor(Math.random() * 900 + 100)}`,
      title: decision.title,
      summary: decision.summary,
      jurisdiction: decision.jurisdiction,
      status: 'PROPOSED',
      proposer: decision.proposer,
      signers: [],
      requiredSignersCount: decision.requiredSignersCount,
      dateCreated: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      isEmergency: decision.isEmergency,
      immutableSHA256: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      approvalHistory: [
        {
          timestamp: new Date().toISOString(),
          actor: decision.proposer,
          action: 'PROPOSED',
          comment: 'New sovereign resolution introduced.'
        }
      ]
    };

    this.decisions.unshift(fresh);
    return fresh;
  }

  public static signDecision(id: string, signerName: string): ExecutiveDecision | undefined {
    const dec = this.decisions.find(d => d.id === id);
    if (!dec) return undefined;

    if (dec.signers.includes(signerName)) return dec;

    dec.signers.push(signerName);
    dec.lastUpdated = new Date().toISOString();
    
    dec.approvalHistory.push({
      timestamp: new Date().toISOString(),
      actor: signerName,
      action: 'SIGNED',
      comment: 'Valid cryptographic signature appended to cabinet file.'
    });

    if (dec.signers.length >= dec.requiredSignersCount) {
      dec.status = 'SIGNED';
      dec.approvalHistory.push({
        timestamp: new Date().toISOString(),
        actor: 'SYSTEM',
        action: 'ENFORCED',
        comment: 'All requisite sigs gathered. Decision enforced dynamically.'
      });
    } else {
      dec.status = 'UNDER_REVIEW';
    }

    return dec;
  }

  public static vetoDecision(id: string, vetoActor: string, comment: string): ExecutiveDecision | undefined {
    const dec = this.decisions.find(d => d.id === id);
    if (!dec) return undefined;

    dec.status = 'VETOED';
    dec.lastUpdated = new Date().toISOString();
    dec.approvalHistory.push({
      timestamp: new Date().toISOString(),
      actor: vetoActor,
      action: 'VETOED',
      comment: `Vetoed: ${comment}`
    });

    return dec;
  }
}
