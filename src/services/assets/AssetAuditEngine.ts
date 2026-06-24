import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface AssetAuditRecord {
  auditId: string;
  assetId: string;
  timestamp: string;
  auditor: string;
  integrityHashOk: boolean;
  ownershipVerifiedOk: boolean;
  valuationAccurateOk: boolean;
  complianceRating: number; // 0-100
  notes: string;
}

export class AssetAuditEngine {
  private static auditLogs: AssetAuditRecord[] = [
    {
      auditId: 'AUD-AST-001', // | ناسنامەی وردبینی
      assetId: 'AST-KIRKUK-NORTHOIL', // | ناسنامەی سەروەت
      timestamp: '2026-05-15T09:00:00Z', // | کاتی تۆمارکردن
      auditor: '| ئەنجومەنی باڵای وردبینی هاوبەش',
      integrityHashOk: true, // | دروستی مۆرکردن
      ownershipVerifiedOk: true, // | پشتڕاستکردنەوەی خاوەندارێتی
      valuationAccurateOk: true, // | وردیی نرخاندن
      complianceRating: 94, // | ئاستی پابەندبوون
      notes: '| سنووری یەدەگی کاربۆن بەپێی تۆماری جیهانی پشتڕاستکراونەتەوە. دەستکارییە بچووکەکانی ژێرخان نەخشەکێشران.'
    }
  ];

  public static getAuditRecords(): AssetAuditRecord[] {
    return [...this.auditLogs];
  }

  public static runAssetAudit(
    assetId: string,
    auditor: string,
    notes: string
  ): { success: boolean; record?: AssetAuditRecord; message: string } {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return { success: false, message: '| سەروەتەکە لە بنکەدراوەی سەروەتی دەوڵەتدا نەدۆزرایەوە' };
    }

    const auditId = `AUD-AST-${String(this.auditLogs.length + 1).padStart(3, '0')}`;
    
    // | سیمولاسیۆنی پشتڕاستکردنەوەی یەکپارچەیی زنجیرەکە
    const stateLedger = NationalAssetRegistry.getLedger().filter(l => l.assetId === assetId);
    let integrityHashOk = true;
    
    // | پشتڕاستکردنەوەی زنجیرەی مۆرەکان (Hash)
    for (let i = 1; i < stateLedger.length; i++) {
      if (stateLedger[i].previousHash !== stateLedger[i - 1].hash) {
        integrityHashOk = false;
        break;
      }
    }

    const complianceScore = 85 + Math.floor(Math.random() * 16); // | ٨٥ بۆ ١٠٠
    
    const newRecord: AssetAuditRecord = {
      auditId,
      assetId,
      timestamp: new Date().toISOString(),
      auditor,
      integrityHashOk,
      ownershipVerifiedOk: true,
      valuationAccurateOk: asset.valuationUSD > 0,
      complianceRating: complianceScore,
      notes
    };

    this.auditLogs.push(newRecord);

    const updated: SovereignPhysicalAsset = {
      ...asset,
      complianceScore,
      lastAuditDate: new Date().toISOString().split('T')[0],
      lifecycle: 'VERIFIED' // | پشتڕاستکراو
    };
    NationalAssetRegistry.updateAsset(updated, auditor);

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'AUDIT', // | وردبینی
      auditor,
      `| وردبینی تەواوی فیزیکی ئەنجامدرا. یەکپارچەیی پشتڕاستکرایەوە: ${integrityHashOk ? 'بەڵێ' : 'شکست'}. نمرەی پابەندبوون دیاریکرا: ${complianceScore}٪.`
    );

    return {
      success: true,
      record: newRecord,
      message: `| وردبینییەکە بە سەرکەوتوویی تۆمارکرا. نمرەی پابەندبوون نوێکرایەوە بۆ ${complianceScore}٪.`
    };
  }
}
