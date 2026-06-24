export type RevenueContextType = 'FEDERAL' | 'KRG' | 'JOINT';

export interface RevenueDataRecord {
  id: string;
  streamType: 'CUSTOMS' | 'BORDER_FEE' | 'TAX';
  amountUSD: number;
  recordedBy: string;
  timestamp: string;
  hash: string;
}

export class SovereignRevenueVisibilityPolicy {
  /**
   * دڵنیابوونەوە لە دەسەڵاتی بینینی زانیارییە داراییەکانی داهات.
   * ڕێگە نادات کارمەند یان نوێنەری هیچ لایەنێک داهاتی لایەنەکەی تر ببینێت یان نیشان بدات.
   */
  public static authorizeAccess(callerKey: RevenueContextType, dataOwner: 'FEDERAL' | 'KRG'): boolean {
    if (callerKey === 'FEDERAL' && dataOwner === 'FEDERAL') {
      return true;
    }
    if (callerKey === 'KRG' && dataOwner === 'KRG') {
      return true;
    }
    // هەر بوارێکی تر یان ئاستی هاوبەش بێت، ڕێگەپێنەدراوە
    return false;
  }

  /**
   * پاڵاوتنی تۆمارەکانی داهات پاڵپشت بە سیاسەتی سەروەری دارایی نیشتمانی.
   */
  public static filterRecords(callerKey: RevenueContextType, records: RevenueDataRecord[], dataOwner: 'FEDERAL' | 'KRG'): RevenueDataRecord[] {
    if (this.authorizeAccess(callerKey, dataOwner)) {
      return records;
    }
    // ئەگەر دەسەڵاتی نەبوو، زنجیرەی داتا بە بەتاڵی دەگەڕێنێتەوە
    return [];
  }

  /**
   * بلۆککردنی نیشاندانی تێکرای نرخە مۆنێتاری داهاتەکان و دابینکردنی نیشاندەرە حکومییەکان لەجیاتی ئەوە.
   */
  public static enforceJointMetadataOnly<T extends object>(callerKey: RevenueContextType, originalData: T): Partial<T> | null {
    if (callerKey === 'JOINT') {
      // نیشاندانی تەنها مێتاداتای حکومڕانی بەبێ نووسینی بری پارە یان نرخاندنی جومگە داراییەکان
      return null;
    }
    return originalData;
  }
}
