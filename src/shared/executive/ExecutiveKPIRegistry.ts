export interface KPIDefinition {
  id: string;
  nameEn: string;
  nameKu: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  changeRate?: string;
  status: 'optimal' | 'warning' | 'critical';
}

export interface DomainKPISet {
  domainId: string;
  domainNameEn: string;
  domainNameKu: string;
  kpis: KPIDefinition[];
}

export const FEDERAL_KPI_REGISTRY: DomainKPISet[] = [
  {
    domainId: 'fed-border',
    domainNameEn: 'Border Operations',
    domainNameKu: 'ئۆپەراسیۆنەکانی سەر سنوور',
    kpis: [
      { id: 'fed-gate-cnt', nameEn: 'Active Checkpoints', nameKu: 'خاڵە پشکنینە چالاکەکان', value: 12, trend: 'stable', status: 'optimal' },
      { id: 'fed-scr-vol', nameEn: 'Live Cargo Scanned', nameKu: 'کۆنتێنەرە سکێنکراوەکان', value: '4,120 / ڕۆژ', trend: 'up', changeRate: '+5.4%', status: 'optimal' },
      { id: 'fed-seal-vol', nameEn: 'E-Seals Issued', nameKu: 'مۆرە ئەلیکترۆنییە دراوەکان', value: '8,321', trend: 'up', changeRate: '+12.1%', status: 'optimal' }
    ]
  },
  {
    domainId: 'fed-customs',
    domainNameEn: 'Customs Compliance',
    domainNameKu: 'پابەندبوونی گومرگی',
    kpis: [
      { id: 'fed-cst-pass', nameEn: 'Audit Pass Rate', nameKu: 'ڕێژەی دەربازبوونی وردبینی', value: '94.2%', trend: 'up', changeRate: '+2.1%', status: 'optimal' },
      { id: 'fed-cst-delay', nameEn: 'Average Duty Assessment Delay', nameKu: 'تێکڕای دواکەوتنی نرخاندنی گومرگ', value: '1.8 خولەک', trend: 'down', changeRate: '-14%', status: 'optimal' },
      { id: 'fed-cst-pend', nameEn: 'Pending Declarations', nameKu: 'بەیاننامە چاوەڕوانکراوەکان', value: 24, trend: 'down', changeRate: '-8%', status: 'optimal' }
    ]
  },
  {
    domainId: 'fed-revenue',
    domainNameEn: 'Revenue Control',
    domainNameKu: 'کۆنتڕۆڵکردنی داهات',
    kpis: [
      { id: 'fed-rev-saved', nameEn: 'Trapped Revenue Saved', nameKu: 'داهاتی ڕزگارکراو لە ڕاکردن', value: '$432,500', trend: 'up', changeRate: '+15.2%', status: 'optimal' },
      { id: 'fed-rev-tot', nameEn: 'Total Tariff Receipts', nameKu: 'کۆی داهاتی تاریفەی گومرگی', value: '$2.14B', trend: 'up', changeRate: '+8.7%', status: 'optimal' },
      { id: 'fed-rev-comp', nameEn: 'Tax Compliance Index', nameKu: 'نیشاندەری پابەندبوونی باج', value: '98.4%', trend: 'up', changeRate: '+0.5%', status: 'optimal' }
    ]
  },
  {
    domainId: 'fed-trade',
    domainNameEn: 'Trade Management',
    domainNameKu: 'بەڕێوەبردنی بازرگانی',
    kpis: [
      { id: 'fed-trd-corr', nameEn: 'Trade Corridors Managed', nameKu: 'مەودا بازرگانییە بەڕێوەبراوەکان', value: 4, trend: 'stable', status: 'optimal' },
      { id: 'fed-trd-harm', nameEn: 'Custom Tariff Harmonization', nameKu: 'هاوئاهەنگی تاریفەی گومرگی', value: '92.1%', trend: 'up', changeRate: '+1.8%', status: 'optimal' },
      { id: 'fed-trd-lic', nameEn: 'Approved Import Licenses', nameKu: 'مۆڵەتە پەسەندکراوەکانی هاوردە', value: '1,420', trend: 'up', changeRate: '+6.2%', status: 'optimal' }
    ]
  },
  {
    domainId: 'fed-audit',
    domainNameEn: 'Sovereign Audit',
    domainNameKu: 'وردبینی سەروەرانە',
    kpis: [
      { id: 'fed-aud-sign', nameEn: 'Blockchain Sign-Offs', nameKu: 'واژۆکانی سەر بلۆکچین', value: '11,490', trend: 'up', changeRate: '+18.5%', status: 'optimal' },
      { id: 'fed-aud-breach', nameEn: 'Zero-Trust Breaches Blocked', nameKu: 'هەوڵە بلۆککراوەکانی دزەکردن', value: 13, trend: 'down', changeRate: '-45%', status: 'optimal' },
      { id: 'fed-aud-seal', nameEn: 'Integrity Audits Sealed', nameKu: 'وردبینییە مۆرکراوەکانی سەلامەتی', value: 231, trend: 'up', changeRate: '+9.3%', status: 'optimal' }
    ]
  }
];

export const KRG_KPI_REGISTRY: DomainKPISet[] = [
  {
    domainId: 'krg-border',
    domainNameEn: 'Border Operations',
    domainNameKu: 'ئۆپەراسیۆنەکانی سەر سنوور',
    kpis: [
      { id: 'krg-gate-cnt', nameEn: 'Land Border Gates', nameKu: 'دەروازە سنوورییە وشکانییەکان', value: 8, trend: 'stable', status: 'optimal' },
      { id: 'krg-freight', nameEn: 'Freight Handled', nameKu: 'باری مامەڵەپێکراو', value: '1,840 / ڕۆژ', trend: 'up', changeRate: '+4.1%', status: 'optimal' },
      { id: 'krg-man-reg', nameEn: 'Local Manifest Registries', nameKu: 'تۆماری مانیفێستی ناوخۆیی', value: '3,921', trend: 'up', changeRate: '+8.3%', status: 'optimal' }
    ]
  },
  {
    domainId: 'krg-customs',
    domainNameEn: 'Customs & Exemption',
    domainNameKu: 'گومرگ و لێخۆشباری',
    kpis: [
      { id: 'krg-exc-comp', nameEn: 'Regional Exemption Compliance', nameKu: 'پابەندبوونی لێخۆشبوونی هەرێمی', value: '97.5%', trend: 'up', changeRate: '+1.2%', status: 'optimal' },
      { id: 'krg-scn-perf', nameEn: 'Scanner Performance Index', nameKu: 'نیشاندەری کارایی سکێنەرەکان', value: '99.1%', trend: 'stable', status: 'optimal' },
      { id: 'krg-cst-flags', nameEn: 'Suspected Overvaluations', nameKu: 'خەمڵاندنە گوماناویەکان', value: 114, trend: 'down', changeRate: '-12%', status: 'optimal' }
    ]
  },
  {
    domainId: 'krg-revenue',
    domainNameEn: 'Revenue Control',
    domainNameKu: 'کۆنتڕۆڵکردنی داهات',
    kpis: [
      { id: 'krg-rev-saved', nameEn: 'Regional Duty Saved', nameKu: 'داهاتی پارێزراوی هەرێم لە فێڵ', value: '$125,400', trend: 'up', changeRate: '+9.4%', status: 'optimal' },
      { id: 'krg-rev-tot', nameEn: 'Tariff Fees Captured', nameKu: 'داهاتی کۆکراوەی تاریفەکان', value: '$540M', trend: 'up', changeRate: '+6.1%', status: 'optimal' },
      { id: 'krg-rev-reinv', nameEn: 'Economic Reinvestment Rate', nameKu: 'ڕێژەی دووبارە وەبەرهێنانەوە', value: '14.5%', trend: 'up', changeRate: '+1.1%', status: 'optimal' }
    ]
  },
  {
    domainId: 'krg-trade',
    domainNameEn: 'Trade & Logistics',
    domainNameKu: 'بازرگانی و لۆجستی',
    kpis: [
      { id: 'krg-trd-corr', nameEn: 'Regional Corridors', nameKu: 'مەودا بازرگانییەکانی هەرێم', value: 2, trend: 'stable', status: 'optimal' },
      { id: 'krg-trd-lic', nameEn: 'Import License Approvals', nameKu: 'مۆڵەتەکانی هاوردەی جێبەجێکراو', value: 642, trend: 'up', changeRate: '+3.5%', status: 'optimal' },
      { id: 'krg-trd-stream', nameEn: 'Logistics Streamlining Index', nameKu: 'ئاستی ئاسانکاریی لۆجستی', value: '88.4%', trend: 'up', changeRate: '+4.2%', status: 'optimal' }
    ]
  },
  {
    domainId: 'krg-audit',
    domainNameEn: 'Audit & Integrity',
    domainNameKu: 'وردبینی و دەستپاکیی',
    kpis: [
      { id: 'krg-aud-tamp', nameEn: 'Regional Tamper Prevented', nameKu: 'بەرگری لە گۆڕینی داتا', value: '4,122', trend: 'up', changeRate: '+11.2%', status: 'optimal' },
      { id: 'krg-aud-block', nameEn: 'Handshake Failures Blocked', nameKu: 'پچڕانی ڕاگیراوی پەیوەندی', value: 24, trend: 'down', changeRate: '-33%', status: 'optimal' },
      { id: 'krg-aud-recon', nameEn: 'Ledgers Reconciled', nameKu: 'تۆمارە هاوسەنگکراوەکان', value: '99.8%', trend: 'up', changeRate: '+0.2%', status: 'optimal' }
    ]
  }
];

export const JOINT_KPI_REGISTRY: DomainKPISet[] = [
  {
    domainId: 'joint-recon',
    domainNameEn: 'Ledger Reconciliation',
    domainNameKu: 'هاوتاکردنی تۆمارەکان',
    kpis: [
      { id: 'jnt-rec-match', nameEn: 'Matching Success Rate', nameKu: 'ڕێژەی هاوتایی سەرکەوتوو', value: '99.98%', trend: 'up', changeRate: '+0.02%', status: 'optimal' },
      { id: 'jnt-rec-unmatched', nameEn: 'Unmatched Custom Invoices', nameKu: 'پسوولە گومرگییە هاوتا نەکراوەکان', value: 12, trend: 'down', changeRate: '-25%', status: 'optimal' },
      { id: 'jnt-rec-freq', nameEn: 'Reconciliation Frequency', nameKu: 'خولەکانی هاوتاکردن', value: 'ڕاستەوخۆ (Real-Time)', trend: 'stable', status: 'optimal' }
    ]
  },
  {
    domainId: 'joint-rev',
    domainNameEn: 'Shared Revenue Control',
    domainNameKu: 'پشکی داهاتی هاوبەش',
    kpis: [
      { id: 'jnt-rev-saved', nameEn: 'Disputed Tariffs Mitigated Rate', nameKu: 'ڕێژەی چارەسەری کێشەی تاریفە گومرگییەکان', value: '100%', trend: 'up', changeRate: '+14.5%', status: 'optimal' },
      { id: 'jnt-rev-split', nameEn: 'Revenue Split Protocol State', nameKu: 'پڕۆتۆکۆڵی دابەشکاریی کریپتۆگرافی', value: 'چالاککراوی دەستووری', trend: 'stable', status: 'optimal' },
      { id: 'jnt-rev-proc', nameEn: 'Split Receipts Verification Index', nameKu: 'نیشاندەری ڕەسەنایەتی واژۆی پسوولە دابەشکراوەکان', value: '100% متمانەپێکراو', trend: 'up', changeRate: '+8.3%', status: 'optimal' }
    ]
  },
  {
    domainId: 'joint-border',
    domainNameEn: 'Shared Border Management',
    domainNameKu: 'بەڕێوەبردنی هاوبەشی سنوورەکان',
    kpis: [
      { id: 'jnt-brd-patrol', nameEn: 'Combined Patrol Missions', nameKu: 'ئەرکەکانی دەوریەی هاوبەش', value: 245, trend: 'up', changeRate: '+10.3%', status: 'optimal' },
      { id: 'jnt-brd-sync', nameEn: 'Interoperability DB Syncs', nameKu: 'هاوکاتیی داتابەیسی هاوبەش', value: '33 چرکه', trend: 'down', changeRate: '-15%', status: 'optimal' },
      { id: 'jnt-brd-train', nameEn: 'Training Protocols Ratified', nameKu: 'پرۆتۆکۆڵە واژۆکراوەکانی ڕاهێنان', value: 6, trend: 'stable', status: 'optimal' }
    ]
  },
  {
    domainId: 'joint-trade',
    domainNameEn: 'Shared Trade Corridors',
    domainNameKu: 'مەودا بازرگانییە هاوبەشەکان',
    kpis: [
      { id: 'jnt-trd-corr', nameEn: 'Joint Corridors Managed', nameKu: 'مەودا هاوبەشە بەڕێوەبراوەکان', value: 3, trend: 'stable', status: 'optimal' },
      { id: 'jnt-trd-latency', nameEn: 'Border Crossing Latency', nameKu: 'ماوەی هێشتنەوە لە سنوور', value: '< 5 خولەک', trend: 'down', changeRate: '-18%', status: 'optimal' },
      { id: 'jnt-trd-harm', nameEn: 'Weight Station Harmonization', nameKu: 'هاوتایی کێشەکان لە مەیدانی وزن', value: '99.2%', trend: 'up', changeRate: '+0.5%', status: 'optimal' }
    ]
  },
  {
    domainId: 'joint-audit',
    domainNameEn: 'Joint Integrity Audit',
    domainNameKu: 'وردبینی دەستپاکیی هاوبەش',
    kpis: [
      { id: 'jnt-aud-hand', nameEn: 'Multi-Party Handshakes', nameKu: 'هاوڕایی واژۆی دەزگا جیاوازەکان', value: 342, trend: 'up', changeRate: '+9.3%', status: 'optimal' },
      { id: 'jnt-aud-blocks', nameEn: 'Consolidated Blocks Sealed', nameKu: 'بلۆکە یەکخراوە گرێدراوەکان', value: '4,120', trend: 'up', changeRate: '+14.2%', status: 'optimal' },
      { id: 'jnt-aud-dispute', nameEn: 'Boundary Dispute Resolution', nameKu: 'ماوەی چارەسەری ناکۆکی دەمەدەمیی', value: '4.2 خولەک', trend: 'down', changeRate: '-22%', status: 'optimal' }
    ]
  }
];
