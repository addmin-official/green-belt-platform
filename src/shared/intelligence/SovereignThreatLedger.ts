import { ThreatEvent, WatchlistEntity, RelationshipEdge } from './NationalThreatTypes';

export interface LedgerBlock {
  index: number;
  timestamp: string;
  dataType: 'threat_event' | 'watchlist' | 'relationship' | 'reconciliation' | 'risk_forecast' | 'alert';
  payload: any;
  previousHash: string;
  hash: string;
}

export class SovereignThreatLedger {
  private static chain: LedgerBlock[] = [];

  private static calculateHash(index: number, timestamp: string, dataType: string, payload: string, previousHash: string): string {
    const dataStr = `${index}-${timestamp}-${dataType}-${payload}-${previousHash}`;
    let hash = 0;
    for (let i = 0; i < dataStr.length; i++) {
      const char = dataStr.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return `STL-SH-${Math.abs(hash).toString(16).toUpperCase()}-${Date.now().toString().slice(-4)}`;
  }

  public static sealAndPublish(dataType: LedgerBlock['dataType'], payload: any): LedgerBlock {
    const index = this.chain.length;
    const timestamp = new Date().toISOString();
    const previousHash = index > 0 ? this.chain[index - 1].hash : 'GENESIS-SOVEREIGN-SECURITY-ROOT-001002003';
    const payloadStr = JSON.stringify(payload);
    const hash = this.calculateHash(index, timestamp, dataType, payloadStr, previousHash);

    const block: LedgerBlock = {
      index,
      timestamp,
      dataType,
      payload,
      previousHash,
      hash
    };

    this.chain.push(block);
    return block;
  }

  public static getChain(): LedgerBlock[] {
    return [...this.chain];
  }
}
