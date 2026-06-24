export interface LedgerBlockDTO {
  id: string;
  sourceNode: string;
  timestamp: string;
  auditHash: string;
  payload: Record<string, any>;
  status: 'verified' | 'pending' | 'flagged';
}

export interface LedgerRepository {
  getRecentBlocks(limit: number): Promise<LedgerBlockDTO[]>;
  processTransaction(payload: any): Promise<LedgerBlockDTO>;
}
