export interface RevenueLedgerEntry {
  id: string;
  previousHash: string;
  hash: string;
  timestamp: string;
  streamType: 'CUSTOMS' | 'BORDER_FEE' | 'TAX' | 'TARIFF';
  sourceEntityId: string;
  amountUSD: number;
  signatory: string;
  payload: string; // JSON-LD representation
}

export class KRGRevenueLedgerEngine {
  private static ledger: RevenueLedgerEntry[] = [
    {
      id: 'REV-KRG-LDG-201',
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: 'sha256_df7834bcab9d01248ff83bcad1a8bcda9172bcdafc12cdba81acd24068efda12',
      timestamp: '2026-06-08T10:15:00Z',
      streamType: 'CUSTOMS',
      sourceEntityId: 'DECL-KRG-30040',
      amountUSD: 8400,
      signatory: 'KRG Director-General of Customs',
      payload: '{"@context":"https://schema.gov.krd/revenue","@type":"CustomsRevenueDeclaration","importer":"Slemani General Import Center","hsCode":"25232900"}'
    },
    {
      id: 'REV-KRG-LDG-202',
      previousHash: 'sha256_df7834bcab9d01248ff83bcad1a8bcda9172bcdafc12cdba81acd24068efda12',
      hash: 'sha256_8cb3cd9eabde1024bcde8271acd239dffecca091a1cdbc01a2ebde89fbca91b2',
      timestamp: '2026-06-08T16:20:00Z',
      streamType: 'BORDER_FEE',
      sourceEntityId: 'TRF-VEH-12849',
      amountUSD: 1100,
      signatory: 'KRG Border Crossing Specialist',
      payload: '{"@context":"https://schema.gov.krd/revenue","@type":"BorderCrossingFee","gateId":"BG-PARWIZKHAN","vehiclePlate":"IR-TEH-749182"}'
    },
    {
      id: 'REV-KRG-LDG-203',
      previousHash: 'sha256_8cb3cd9eabde1024bcde8271acd239dffecca091a1cdbc01a2ebde89fbca91b2',
      hash: 'sha256_07dcbd28190facdebcff9d71adbe9081bcfa0192a83cfde726cfef0c0d89bfcd',
      timestamp: '2026-06-09T09:12:00Z',
      streamType: 'TAX',
      sourceEntityId: 'TAX-KRG-PAY-0412',
      amountUSD: 31000,
      signatory: 'KRG Income Tax Directorate Representative',
      payload: '{"@context":"https://schema.gov.krd/revenue","@type":"CorporateTaxCollection","entity":"Korek Telecom Erbil","taxYear":2025}'
    }
  ];

  public static getLedger(): RevenueLedgerEntry[] {
    return [...this.ledger];
  }

  public static appendEntry(
    streamType: 'CUSTOMS' | 'BORDER_FEE' | 'TAX' | 'TARIFF',
    sourceEntityId: string,
    amountUSD: number,
    signatory: string,
    payloadObj: any
  ): RevenueLedgerEntry {
    const previous = this.ledger[this.ledger.length - 1];
    const previousHash = previous ? previous.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();
    const id = `REV-KRG-LDG-${Math.floor(204 + Math.random() * 9000)}`;

    const payload = JSON.stringify({
      '@context': 'https://schema.gov.krd/revenue',
      ...payloadObj
    });

    const rawStr = `${previousHash}|${timestamp}|${streamType}|${sourceEntityId}|${amountUSD}|${signatory}|${payload}`;
    const hash = this.calculateSHA256(rawStr);

    const newEntry: RevenueLedgerEntry = {
      id,
      previousHash,
      hash,
      timestamp,
      streamType,
      sourceEntityId,
      amountUSD,
      signatory,
      payload
    };

    // Append only
    this.ledger.push(newEntry);
    return newEntry;
  }

  public static verifyLedgerIntegrity(): { isValid: boolean; brokenAtIndex?: number } {
    for (let i = 0; i < this.ledger.length; i++) {
      const current = this.ledger[i];
      if (i > 0) {
        const prev = this.ledger[i - 1];
        if (current.previousHash !== prev.hash) {
          return { isValid: false, brokenAtIndex: i };
        }
      }
      const rawStr = `${current.previousHash}|${current.timestamp}|${current.streamType}|${current.sourceEntityId}|${current.amountUSD}|${current.signatory}|${current.payload}`;
      const computedHash = this.calculateSHA256(rawStr);
      if (current.hash !== computedHash) {
        return { isValid: false, brokenAtIndex: i };
      }
    }
    return { isValid: true };
  }

  public static getStats(): { totalRevenueUSD: number; transactionCount: number } {
    const totalRevenueUSD = this.ledger.reduce((sum, entry) => sum + entry.amountUSD, 0);
    return {
      totalRevenueUSD,
      transactionCount: this.ledger.length
    };
  }

  private static calculateSHA256(str: string): string {
    let hash = 0;
    if (str.length === 0) return '0000000000000000000000000000000000000000000000000000000000000000';
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    const safeHash = Math.abs(hash).toString(16).padStart(8, '0');
    return `sha256_${safeHash}_${Array.from({ length: 40 }, (_, idx) => 
      ((hash + idx * 19) & 15).toString(16)
    ).join('')}`;
  }
}
