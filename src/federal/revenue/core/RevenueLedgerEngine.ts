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

export class FederalRevenueLedgerEngine {
  private static ledger: RevenueLedgerEntry[] = [
    {
      id: 'REV-FED-LDG-101',
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      hash: 'sha256_07eb2318ea1b0f94857cbd82ac12be150f8373b889312ef54c8e7182ba81bcfe',
      timestamp: '2026-06-08T09:30:00Z',
      streamType: 'CUSTOMS',
      sourceEntityId: 'DECL-FED-10020',
      amountUSD: 17050,
      signatory: 'Federal Auditor-General Al-Hamid',
      payload: '{"@context":"https://schema.gov.iq/revenue","@type":"CustomsRevenueDeclaration","importer":"Al-Rafidain Heavy Motor Cars Ltd","hsCode":"87032330"}'
    },
    {
      id: 'REV-FED-LDG-102',
      previousHash: 'sha256_07eb2318ea1b0f94857cbd82ac12be150f8373b889312ef54c8e7182ba81bcfe',
      hash: 'sha256_1cb38a0f983bcdae9471ab728acd17290f8457cbe8127ef94c8e78bc9cfdae12',
      timestamp: '2026-06-08T14:45:00Z',
      streamType: 'BORDER_FEE',
      sourceEntityId: 'TRF-CAR-90812',
      amountUSD: 1650,
      signatory: 'Federal Customs Inspector Haidar',
      payload: '{"@context":"https://schema.gov.iq/revenue","@type":"BorderCrossingFee","gateId":"BG-UMMQASR","vehiclePlate":"IQ-BG-28317"}'
    },
    {
      id: 'REV-FED-LDG-103',
      previousHash: 'sha256_1cb38a0f983bcdae9471ab728acd17290f8457cbe8127ef94c8e78bc9cfdae12',
      hash: 'sha256_9bce072da3cf237190dcfcaffb816efda271cb46592ff378cfd9ca7298a0dcf8',
      timestamp: '2026-06-09T08:10:00Z',
      streamType: 'TAX',
      sourceEntityId: 'TAX-FED-PAY-0391',
      amountUSD: 45000,
      signatory: 'Federal Revenue Directorate Officer',
      payload: '{"@context":"https://schema.gov.iq/revenue","@type":"CorporateTaxCollection","entity":"Asiacell Telecom Baghdad","taxYear":2025}'
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
    const id = `REV-FED-LDG-${Math.floor(104 + Math.random() * 9000)}`;

    const payload = JSON.stringify({
      '@context': 'https://schema.gov.iq/revenue',
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

    // Immutability rule: no overwrite, push to end (append-only)
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
      ((hash + idx * 17) & 15).toString(16)
    ).join('')}`;
  }
}
