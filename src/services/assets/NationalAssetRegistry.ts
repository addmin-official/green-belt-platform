import { CBIRegistry, SovereignAsset } from '../treasury/CBIRegistry';
import { NationalSettlementEngine } from '../treasury/NationalSettlementEngine';
import { AssetLifecycleState } from './AssetLifecycleEngine';

export type AssetCategory =
  | 'LAND'
  | 'BUILDING'
  | 'INFRASTRUCTURE'
  | 'ENERGY'
  | 'WATER'
  | 'TRANSPORT'
  | 'AIRPORT'
  | 'SEAPORT'
  | 'BORDER_GATE'
  | 'MILITARY'
  | 'DIGITAL'
  | 'TELECOM'
  | 'INDUSTRIAL'
  | 'AGRICULTURE'
  | 'MINERAL'
  | 'STRATEGIC';

export type AssetLifecycle = AssetLifecycleState;

export type OwnershipModel =
  | 'FEDERAL_IRAQ'
  | 'KRG'
  | 'JOINT'
  | 'MINISTRY'
  | 'GOVERNORATE'
  | 'MUNICIPALITY'
  | 'STATE_ENTERPRISE';

export interface SovereignPhysicalAsset {
  id: string;
  name: string;
  category: AssetCategory;
  lifecycle: AssetLifecycleState;
  lifecycleState: AssetLifecycleState;
  ownership: OwnershipModel;
  jurisdiction: 'federal' | 'krg' | 'joint';
  valuationUSD: number; // Millions USD
  depreciationRate: number; // e.g. 0.05 (5% annually)
  annualRevenueYieldUSD: number; // Millions USD
  riskScore: number; // 0 to 100
  lastAuditDate: string;
  auditHash: string;
  complianceScore: number; // 0 to 100
  description: string;
  isCustomRegistered?: boolean;
}


export const AssetCategoryLabels: Record<AssetCategory, string> = {
  LAND: '| زەوی',
  BUILDING: '| باڵەخانە',
  INFRASTRUCTURE: '| ژێرخان',
  ENERGY: '| وزە',
  WATER: '| ئاو',
  TRANSPORT: '| گواستنەوە',
  AIRPORT: '| فڕۆکەخانە',
  SEAPORT: '| بەندەر',
  BORDER_GATE: '| دەروازەی سنووری',
  MILITARY: '| سەربازی',
  DIGITAL: '| دیجیتاڵ',
  TELECOM: '| پەیوەندییەکان',
  INDUSTRIAL: '| پیشەسازی',
  AGRICULTURE: '| کشتوکاڵ',
  MINERAL: '| سامانی کانزایی',
  STRATEGIC: '| ستراتیژی'
};
export const AssetLifecycleLabels: Record<AssetLifecycle, string> = {
  REGISTERED: '| تۆمارکراو',
  VERIFIED: '| پشتڕاستکراو',
  ACTIVE: '| چالاک',
  MAINTENANCE: '| لە چاکسازیدا',
  SUSPENDED: '| هەڵپەسێردراو',
  TRANSFER_PENDING: '| لە پرۆسەی گواستنەوەدا',
  TRANSFERRED: '| گواستراوەتەوە',
  RETIRED: '| خانەنشینکراو'
};

export const OwnershipLabels: Record<OwnershipModel, string> = {
  FEDERAL_IRAQ: '| فیدراڵی عێراق',
  KRG: '| هەرێمی کوردستان',
  JOINT: '| هاوبەش',
  MINISTRY: '| وەزارەت',
  GOVERNORATE: '| پارێزگا',
  MUNICIPALITY: '| شارەوانی',
  STATE_ENTERPRISE: '| کۆمپانیای دەوڵەت'
};

export interface SHA256LedgerRecord {
  hash: string; // | مۆرکردنی دیجیتاڵیی (Hash)
  previousHash: string; // | مۆرکردنی پێشوو
  timestamp: string; // | کاتی تۆمارکردن
  assetId: string; // | ناسنامەی سەروەت
  eventType: 'REGISTRATION' | 'VALUATION' | 'DEPRECIATION' | 'TRANSFER' | 'AUDIT' | 'RISK_UPDATE'; // | جۆری ڕووداو
  actor: string; // | ئەنجامدەری کار
  details: string; // | وردەکارییەکان
}

// وەرگێڕانی جۆرەکانی ڕووداو بۆ UI
export const EventTypeLabels: Record<SHA256LedgerRecord['eventType'], string> = {
  REGISTRATION: '| تۆمارکردن',
  VALUATION: '| نرخاندن',
  DEPRECIATION: '| دابەزینی نرخ',
  TRANSFER: '| گواستنەوە',
  AUDIT: '| وردبینی',
  RISK_UPDATE: '| نوێکردنەوەی مەترسی'
};

export class NationalAssetRegistry {
  private static assets: SovereignPhysicalAsset[] = [
    {
      id: 'AST-KIRKUK-NORTHOIL',
      name: '| ژێرخانی کێڵگە نەوتییەکانی باکووری کەرکوک',
      category: 'ENERGY', // | وزە
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'JOINT', // | هاوبەش
      jurisdiction: 'joint', // | هاوبەش
      valuationUSD: 85200, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.02, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 8200, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 28, // | ئاستی مەترسی
      lastAuditDate: '2026-05-15', // | ڕێکەوتی کۆتا وردبینی
      auditHash: '8e4f5a31bc994019de82ab7fd20c99a8ea42bf20bce427cdde198f1a8c39abfd', // | مۆرکردنی وردبینی
      complianceScore: 94, // | ئاستی پابەندبوون
      description: '| سەروەتە ستراتیژییەکانی نەوتی باکوور, لەوانەش ئامێرەکانی پێوانی گواستنەوەی کەرکوک-جەیهان.'
    },
    {
      id: 'AST-GRANDFAW-PORT',
      name: '| کۆمەڵگەی بەندەری نێودەوڵەتی گەورەی فاو',
      category: 'SEAPORT', // | بەندەر
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'FEDERAL_IRAQ', // | فیدراڵی عێراق
      jurisdiction: 'federal', // | فیدراڵی
      valuationUSD: 32000, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.015, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 450, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 18, // | ئاستی مەترسی
      lastAuditDate: '2026-04-10', // | ڕێکەوتی کۆتا وردبینی
      auditHash: '3bf9dae3d0926e82a901ee2bf8cbd300de109ab7f9bc8d74edfa19293caed0a2', // | مۆرکردنی وردبینی
      complianceScore: 98, // | ئاستی پابەندبوون
      description: '| بنکەی سەرەکی نێودەوڵەتی گواستنەوەی دەریایی قووڵ, کە عێراق بە ڕێڕەوە دەریاییە جیهانییەکان دەبەستێتەوە.'
    },
    {
      id: 'AST-KHURMALA-DOME',
      name: '| کۆمەڵگەی پاڵاوتنی خورمەڵە و بنکەی بۆرییەکان',
      category: 'ENERGY', // | وزە
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'KRG', // | هەرێمی کوردستان
      jurisdiction: 'krg', // | هەرێمی کوردستان
      valuationUSD: 14500, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.025, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 1850, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 35, // | ئاستی مەترسی
      lastAuditDate: '2026-05-20', // | ڕێکەوتی کۆتا وردبینی
      auditHash: '2ae9dbbc302dfb8823485ac698aef220b30dfaef192bcf74bd28cf423c1092e1', // | مۆرکردنی وردبینی
      complianceScore: 91, // | ئاستی پابەندبوون
      description: '| دامەزراوە ستراتیژییەکانی پاڵاوتن و ناوەندەکانی گواستنەوەی هەرێمی لە ڕێڕەوی نەوتی باکووردا.'
    },
    {
      id: 'AST-DOKKAN-DAM',
      name: '| بەنداوی دووکان و وێستگەی کارەبای ئاوی',
      category: 'WATER', // | ئاو
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'JOINT', // | هاوبەش
      jurisdiction: 'joint', // | هاوبەش
      valuationUSD: 9800, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.01, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 120, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 15, // | ئاستی مەترسی
      lastAuditDate: '2026-03-01', // | ڕێکەوتی کۆتا وردبینی
      auditHash: 'f0c08ac149ba12be3f5c7198e39ad89bcf12019ab7d2fb89a912e55baef3c21a', // | مۆرکردنی وردبینی
      complianceScore: 96, // | ئاستی پابەندبوون
      description: '| ڕێکخەری سەرەکی دابەشکردنی ئاو لە ناوچەکە و وێستگەیەکی وزەی سەوز کە کارەبا بۆ تۆڕی فیدراڵی دابین دەکات.'
    },
    {
      id: 'AST-ERBIL-AIRPORT',
      name: '| تێرمیناڵی فڕۆکەخانەی نێودەوڵەتی هەولێر',
      category: 'AIRPORT', // | فڕۆکەخانە
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'KRG', // | هەرێمی کوردستان
      jurisdiction: 'krg', // | هەرێمی کوردستان
      valuationUSD: 6500, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.03, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 310, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 22, // | ئاستی مەترسی
      lastAuditDate: '2026-05-10', // | ڕێکەوتی کۆتا وردبینی
      auditHash: 'ee2fb9bc871cd2e6fca78d910a912eff820786cf81afca720de3bcfd1e2fbaef', // | مۆرکردنی وردبینی
      complianceScore: 95, // | ئاستی پابەندبوون
      description: '| سەروەتەکانی ڕێڕەوی فڕینی ناوچەیی و ژێرخانی گومرگی.'
    },
    {
      id: 'AST-IBRAHIMKHALIL-GATE',
      name: '| دەروازەی سنووری ئیبراهیم خەلیل',
      category: 'BORDER_GATE', // | دەروازەی سنووری
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'JOINT', // | هاوبەش
      jurisdiction: 'joint', // | هاوبەش
      valuationUSD: 4800, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.02, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 620, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 19, // | ئاستی مەترسی
      lastAuditDate: '2026-06-02', // | ڕێکەوتی کۆتا وردبینی
      auditHash: '5fc71092efbcd11ecf3bc99d912efc4ba30defbd8ea401c098abcfc382ea01da', // | مۆرکردنی وردبینی
      complianceScore: 97, // | ئاستی پابەندبوون
      description: '| دەروازەی گومرگی فیدراڵی و ناوچەکانی پشکنین کە گواستنەوەی وشکانی یاسایی مسۆگەر دەکەن.'
    },
    {
      id: 'AST-SOE-AIRLINES',
      name: '| کۆمپانیای هێڵی ئاسمانی عێراقی',
      category: 'TRANSPORT', // | گواستنەوە
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'STATE_ENTERPRISE', // | کۆمپانیای دەوڵەت
      jurisdiction: 'federal', // | فیدراڵی
      valuationUSD: 2400, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.05, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 180, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 30, // | ئاستی مەترسی
      lastAuditDate: '2026-05-01', // | ڕێکەوتی کۆتا وردبینی
      auditHash: 'de82bcf201ba7d42cfb20cfc39aefcae5efcaeefcdc2ba74edbac8df23baefcd', // | مۆرکردنی وردبینی
      complianceScore: 88, // | ئاستی پابەندبوون
      description: '| فڕۆکە، لۆجستیک و هەنگارەکانی فڕۆکەخانە کە لەلایەن وەزارەتی گواستنەوەوە بەڕێوەدەبرێن.'
    },
    {
      id: 'AST-SOVEREIGN-DIGITAL',
      name: '| دێڕە سەرەکییەکانی فایبەر ئۆپتیک و ناوەندە دیجیتاڵییە نیشتمانییەکان',
      category: 'DIGITAL', // | دیجیتاڵ
      lifecycle: 'ACTIVE', // | چالاک
      lifecycleState: 'ACTIVE',
      ownership: 'JOINT', // | هاوبەش
      jurisdiction: 'joint', // | هاوبەش
      valuationUSD: 11200, // | نرخاندن (ملیۆن دۆلار)
      depreciationRate: 0.07, // | ڕێژەی دابەزینی نرخ
      annualRevenueYieldUSD: 780, // | داهاتی ساڵانە (ملیۆن دۆلار)
      riskScore: 25, // | ئاستی مەترسی
      lastAuditDate: '2026-05-28', // | ڕێکەوتی کۆتا وردبینی
      auditHash: '2fb9ab7cfca8dfd9a12efb7cfec20cbaefcaeefcbd9abcfde82fca92fba23cad', // | مۆرکردنی وردبینی
      complianceScore: 93, // | ئاستی پابەندبوون
      description: '| ژێرخانی هەستیاری پەیوەندییەکان کە شوێنە کارەکانی حکومەتی عێراق و هەرێم و ناوەندەکانی ئاسایشی داتا بەیەکەوە دەبەستێتەوە.'
    }
  ];

  private static ledger: SHA256LedgerRecord[] = [
    {
      hash: 'da5fbe2a09cb42df19abfec20387ba9bc2018faefcbde198cb82efcbd127acfb',
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      timestamp: '2026-01-01T00:00:00Z',
      assetId: 'AST-KIRKUK-NORTHOIL',
      eventType: 'REGISTRATION', // | تۆمارکردن
      actor: '| بڕیاری ئەنجومەنی وەزیرانی سەروەری ١٠١',
      details: '| یەکخستنی سەرەتایی تۆماری سەروەتە کاربۆنییە ستراتیژییە هاوبەشەکان.'
    }
  ];
  public static getAssets(): SovereignPhysicalAsset[] {
    // | هاوتاکردن لەگەڵ CBIRegistry. با دڵنیابین کە CBIیش بە شێوەیەکی داینامیکی هەیانە.
    const cbiSource = CBIRegistry.getSovereignAssets();
    this.assets.forEach(asset => {
      // Ensure both lifecycle and lifecycleState are initialized and synched
      if (!asset.lifecycleState) {
        asset.lifecycleState = asset.lifecycle || 'REGISTERED';
      }
      if (!asset.lifecycle) {
        asset.lifecycle = asset.lifecycleState || 'REGISTERED';
      }

      // | ئەگەر CBI ئەم سەروەتەی نەبوو، دەتوانین زیادیکەین بۆ ئەوەی SovereignFiscalSystem یەکخرابێت
      const existsInCBI = cbiSource.some(x => x.id === asset.id);
      if (!existsInCBI) {
        CBIRegistry.addSovereignAsset({
          id: asset.id,
          name: asset.name,
          category: asset.category === 'ENERGY' ? 'Energy' : 
                    asset.category === 'INFRASTRUCTURE' || asset.category === 'SEAPORT' || asset.category === 'AIRPORT' || asset.category === 'BORDER_GATE' ? 'Infrastructure' :
                    asset.category === 'STRATEGIC' ? 'Strategic' :
                    asset.ownership === 'STATE_ENTERPRISE' ? 'StateOwnedEnterprise' : 'TreasuryControlled',
          jurisdiction: asset.jurisdiction,
          valuation: asset.valuationUSD,
          annualRevenueYield: asset.annualRevenueYieldUSD,
          lastAuditDate: asset.lastAuditDate
        });
      }
    });

    return [...this.assets];
  }

  public static getAssetById(id: string): SovereignPhysicalAsset | undefined {
    return this.assets.find(a => a.id === id);
  }

  public static addAsset(asset: Omit<SovereignPhysicalAsset, 'auditHash' | 'complianceScore' | 'riskScore'>, actor: string): SovereignPhysicalAsset {
    const rawAsset = {
      ...asset,
      lifecycle: asset.lifecycle || 'REGISTERED',
      lifecycleState: asset.lifecycleState || asset.lifecycle || 'REGISTERED'
    };
    const auditHash = this.calculateSHA256(JSON.stringify(rawAsset) + Date.now());
    const complianceScore = 90 + Math.floor(Math.random() * 11); // | ٩٠ بۆ ١٠٠
    const riskScore = 10 + Math.floor(Math.random() * 31); // | ١٠ بۆ ٤٠
    
    const newAsset: SovereignPhysicalAsset = {
      ...rawAsset,
      auditHash,
      complianceScore,
      riskScore,
      isCustomRegistered: true // | تۆمارکردنی تایبەت
    };

    this.assets.push(newAsset);
    
    // | زیادکردن بۆ تۆماری داینامیکی CBI بۆ یەکخستن
    CBIRegistry.addSovereignAsset({
      id: newAsset.id,
      name: newAsset.name,
      category: newAsset.category === 'ENERGY' ? 'Energy' : 
                newAsset.category === 'INFRASTRUCTURE' || newAsset.category === 'SEAPORT' || newAsset.category === 'AIRPORT' || newAsset.category === 'BORDER_GATE' ? 'Infrastructure' :
                newAsset.category === 'STRATEGIC' ? 'Strategic' :
                newAsset.ownership === 'STATE_ENTERPRISE' ? 'StateOwnedEnterprise' : 'TreasuryControlled',
      jurisdiction: newAsset.jurisdiction,
      valuation: newAsset.valuationUSD,
      annualRevenueYield: newAsset.annualRevenueYieldUSD,
      lastAuditDate: newAsset.lastAuditDate
    });

    this.appendLedgerRecord(
      newAsset.id,
      'REGISTRATION',
      actor,
      `| سەروەتی دەوڵەت زیادکرا بۆ تۆماری سەروەری. ناو: ${newAsset.name}، نرخاندنی سەرەتایی: ${newAsset.valuationUSD} ملیۆن دۆلار.`
    );

    return newAsset;
  }

  public static updateAsset(updated: SovereignPhysicalAsset, actor: string) {
    const idx = this.assets.findIndex(a => a.id === updated.id);
    if (idx !== -1) {
      this.assets[idx] = updated;
      
      this.appendLedgerRecord(
        updated.id,
        'VALUATION',
        actor,
        `| سەروەتی سەروەری نوێکرایەوە. پێوەرەکانی نرخاندن دووبارە هەژمارکرایەوە بۆ: ${updated.valuationUSD} ملیۆن دۆلار.`
      );
    }
  }

  public static getLedger(): SHA256LedgerRecord[] {
    return [...this.ledger];
  }

  public static appendLedgerRecord(
    assetId: string,
    eventType: SHA256LedgerRecord['eventType'],
    actor: string,
    details: string
  ): SHA256LedgerRecord {
    const previousRecord = this.ledger[this.ledger.length - 1];
    const previousHash = previousRecord ? previousRecord.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();
    
    const baseStr = `${previousHash}|${timestamp}|${assetId}|${eventType}|${actor}|${details}`;
    const hash = this.calculateSHA256(baseStr);

    const newRecord: SHA256LedgerRecord = {
      hash, // | مۆرکردنی دیجیتاڵیی
      previousHash, // | مۆرکردنی پێشوو
      timestamp, // | کاتی تۆمارکردن
      assetId, // | ناسنامەی سەروەت
      eventType, // | جۆری ڕووداو
      actor, // | ئەنجامدەری کار
      details // | وردەکارییەکان
    };

    this.ledger.push(newRecord);
    return newRecord;
  }

  // | سیمولاسیۆنێکی بەهێزی حیسابکردنی SHA256 کە کلیلە دەترمینستیکەکان دروست دەکات
  private static calculateSHA256(str: string): string {
    let hash = 0;
    if (str.length === 0) return '0000000000000000000000000000000000000000000000000000000000000000';
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // | گۆڕین بۆ ژمارەی ٣٢ بیت
    }
    const safePart = Math.abs(hash).toString(16).padStart(8, '0');
    // | دروستکردنی کلیلێکی جوان، جێگیر و ڕەسەنی سیمولاسیۆنی SHA-256
    return `sha256_${safePart}${Array.from({ length: 48 }, (_, idx) => 
      ((hash + idx * 7) & 15).toString(16)
    ).join('')}`;
  }

  /**
   * | هەژمارکردنەوەی پێوانەکان بۆ خەزێنە و تەندروستی سەروەری.
   */
  public static calculateStateHealthMetrics() {
    const list = this.getAssets();
    const totalAssetValuationUSD = list.reduce((sum, a) => sum + a.valuationUSD, 0);
    const strategicAssetsCount = list.filter(a => a.category === 'STRATEGIC' || a.category === 'ENERGY' || a.category === 'MILITARY').length;
    
    const obligations = CBIRegistry.getSovereignObligations();
    const totalPrincipalDebtUSD = obligations.reduce((sum, o) => sum + o.principalAmount, 0);

    // | پێوانە داینامیکییەکان
    // | پێنوێنی داپۆشینی سەروەتی نیشتمانی: کۆی سەروەتەکان بەرامبەر بە کۆی قەرز
    const assetCoverageIndex = totalPrincipalDebtUSD > 0 
      ? Math.round((totalAssetValuationUSD / totalPrincipalDebtUSD) * 100)
      : 100;

    // | پێنوێنی پاراستنی سەروەتە ستراتیژییەکان: تێکڕای پابەندبوونی سەروەتە گرنگەکان
    const highPri = list.filter(a => ['STRATEGIC', 'ENERGY', 'MILITARY', 'WATER', 'DIGITAL'].includes(a.category));
    const avgStrategicCompliance = highPri.length > 0
      ? Math.round(highPri.reduce((sum, a) => sum + a.complianceScore, 0) / highPri.length)
      : 95;

    // | پێنوێنی بینراویی ژێرخان: ڕێژەی سەروەتە ژێرخانییەکان کە پشتڕاستکراون یان چالاکن
    const infraTotal = list.filter(a => ['INFRASTRUCTURE', 'AIRPORT', 'SEAPORT', 'BORDER_GATE', 'TRANSPORT', 'TELECOM'].includes(a.category)).length;
    const infraVerified = list.filter(a => ['INFRASTRUCTURE', 'AIRPORT', 'SEAPORT', 'BORDER_GATE', 'TRANSPORT', 'TELECOM'].includes(a.category) && a.lifecycle !== 'REGISTERED').length;
    const visibilityIndex = infraTotal > 0 ? Math.round((infraVerified / infraTotal) * 100) : 100;

    // | ڕێژەی تەواوبوونی وردبینی سەروەتەکان: ئەو سەروەتانەی بەمدواییە وردبینییان بۆ کراوە
    const auditCount = list.filter(a => a.lifecycle !== 'REGISTERED' && a.lastAuditDate.startsWith('2026')).length;
    const auditRate = list.length > 0 ? Math.round((auditCount / list.length) * 100) : 100;

    // | نمرەی وردیی سەروەتی سەروەری
    const rawAccuracy = avgStrategicCompliance * 0.4 + visibilityIndex * 0.3 + auditRate * 0.3;
    const assetAccuracyScore = Math.min(100, Math.max(40, Math.round(rawAccuracy)));

    return {
      totalAssetValuationUSD, // | کۆی نرخاندنی سەروەتەکان (ملیۆن دۆلاری ئەمریکی)
      totalPrincipalDebtUSD, // | کۆی قەرزی بنەڕەتی (ملیۆن دۆلاری ئەمریکی)
      assetCoverageIndex, // | پێنوێنی داپۆشینی سەروەت
      strategicAssetProtectionIndex: avgStrategicCompliance, // | پێنوێنی پاراستنی سەروەتە ستراتیژییەکان
      infrastructureVisibilityIndex: visibilityIndex, // | پێنوێنی بینراویی ژێرخان
      assetAuditCompletionRate: auditRate, // | ڕێژەی تەواوبوونی وردبینی سەروەتەکان
      sovereignAssetAccuracyScore: assetAccuracyScore // | نمرەی وردیی سەروەتی سەروەری
    };
  }
}
