export type AssetLifecycleState =
  | 'REGISTERED'
  | 'VERIFIED'
  | 'ACTIVE'
  | 'MAINTENANCE'
  | 'SUSPENDED'
  | 'TRANSFER_PENDING'
  | 'TRANSFERRED'
  | 'RETIRED';

export const TRANSITIONS: Record<AssetLifecycleState, AssetLifecycleState[]> = {
  REGISTERED: [
    'VERIFIED',
    'SUSPENDED'
  ],
  VERIFIED: [
    'ACTIVE',
    'SUSPENDED'
  ],
  ACTIVE: [
    'MAINTENANCE',
    'TRANSFER_PENDING',
    'RETIRED',
    'SUSPENDED'
  ],
  MAINTENANCE: [
    'ACTIVE',
    'SUSPENDED',
    'RETIRED'
  ],
  SUSPENDED: [
    'VERIFIED',
    'ACTIVE',
    'RETIRED'
  ],
  TRANSFER_PENDING: [
    'TRANSFERRED',
    'ACTIVE'
  ],
  TRANSFERRED: [
    'ACTIVE'
  ],
  RETIRED: []
};

export class AssetLifecycleViolationError extends Error {
  constructor(current: string, next: string) {
    super(`سەرپێچی لە ڕێڕەوی ژیانی سەروەت کرا: گواستنەوەی نادروست لە ${current} بۆ ${next}`);
    this.name = 'AssetLifecycleViolationError';
  }
}

export function validateTransition(
  current: AssetLifecycleState,
  next: AssetLifecycleState
): boolean {
  const allowed = TRANSITIONS[current] || [];
  return allowed.includes(next);
}

export interface AssetLifecycleRecord {
  id: string;
  assetId: string;
  previousState: AssetLifecycleState;
  newState: AssetLifecycleState;
  timestamp: string;
  authorityId: string;
  reason: string;
}

import { NationalAssetRegistry } from './NationalAssetRegistry';

export class AssetLifecycleEngine {
  private static history: AssetLifecycleRecord[] = [];

  public static getAssetHistory(assetId: string): AssetLifecycleRecord[] {
    return this.history.filter(h => h.assetId === assetId);
  }

  public static addLifecycleRecord(record: Omit<AssetLifecycleRecord, 'id' | 'timestamp'>): AssetLifecycleRecord {
    const newRecord: AssetLifecycleRecord = {
      ...record,
      id: `LCR-${String(this.history.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString()
    };
    this.history.push(newRecord);
    return newRecord;
  }

  public static transitionAsset(
    assetId: string,
    nextState: AssetLifecycleState,
    authorityId: string,
    reason: string
  ): void {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      throw new Error(`Sovereign asset registry find error: ${assetId} not found`);
    }

    const current = asset.lifecycleState || 'REGISTERED';
    if (!validateTransition(current, nextState)) {
      throw new AssetLifecycleViolationError(current, nextState);
    }

    // Mutate state securely
    asset.lifecycle = nextState;
    asset.lifecycleState = nextState;

    this.addLifecycleRecord({
      assetId,
      previousState: current,
      newState: nextState,
      authorityId,
      reason
    });

    // Write to national audit ledger
    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'AUDIT',
      authorityId,
      `| گۆڕینی ڕێڕەوی ژیانی سەروەت لە ${current} بۆ ${nextState}. هۆکار: ${reason}`
    );
  }
}
