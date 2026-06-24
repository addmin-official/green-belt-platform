import { useGovernment } from '../../providers/GovernmentProvider';

export type DatasetClassification = 'PRIVATE_FEDERAL' | 'PRIVATE_KRG' | 'JOINT_SHARED' | 'PUBLIC_GOVERNMENT';

export interface FabricDataset {
  id: string;
  name: string;
  classification: DatasetClassification;
  ownerJurisdiction: 'federal' | 'krg' | 'joint';
  sizeBytes: number;
  recordsCount: number;
  lastUpdated: string;
  activeSharedJurisdictions: ('federal' | 'krg' | 'joint')[];
}

export interface ShareAuditLog {
  id: string;
  datasetId: string;
  action: 'request' | 'approve' | 'revoke' | 'access';
  actor: string;
  targetJurisdiction: string;
  verifiedTimestamp: string;
  systemAuthorized: boolean;
}

export class SharedDataFabric {
  private static datasets: FabricDataset[] = [
    {
      id: 'ds-fed-01',
      name: 'Southern Sea Ports Manifest Master',
      classification: 'PRIVATE_FEDERAL',
      ownerJurisdiction: 'federal',
      sizeBytes: 849000000,
      recordsCount: 42000,
      lastUpdated: '2026-06-08T08:00:00Z',
      activeSharedJurisdictions: ['federal']
    },
    {
      id: 'ds-krg-12',
      name: 'Erbil & Duhok Sub-National Trade Ledger',
      classification: 'PRIVATE_KRG',
      ownerJurisdiction: 'krg',
      sizeBytes: 310000000,
      recordsCount: 19000,
      lastUpdated: '2026-06-08T07:15:00Z',
      activeSharedJurisdictions: ['krg']
    },
    {
      id: 'ds-joint-99',
      name: 'Bilateral Customs Reconciled Statistics',
      classification: 'JOINT_SHARED',
      ownerJurisdiction: 'joint',
      sizeBytes: 120000000,
      recordsCount: 11000,
      lastUpdated: '2026-06-08T08:14:00Z',
      activeSharedJurisdictions: ['federal', 'krg', 'joint']
    },
    {
      id: 'ds-pub-100',
      name: 'National HS Nomenclature Tariffs Dictionary',
      classification: 'PUBLIC_GOVERNMENT',
      ownerJurisdiction: 'joint',
      sizeBytes: 45000000,
      recordsCount: 6500,
      lastUpdated: '2026-05-10T12:00:00Z',
      activeSharedJurisdictions: ['federal', 'krg', 'joint']
    }
  ];

  private static auditLogs: ShareAuditLog[] = [
    {
      id: 'sda-001',
      datasetId: 'ds-joint-99',
      action: 'access',
      actor: 'Joint Coordinator Team',
      targetJurisdiction: 'joint',
      verifiedTimestamp: '2026-06-08T09:00:00Z',
      systemAuthorized: true
    }
  ];

  static getDatasets(currentContext: 'FEDERAL_IRAQ' | 'KURDISTAN_REGION' | 'JOINT_OPERATIONS'): FabricDataset[] {
    const contextJur = currentContext === 'FEDERAL_IRAQ' ? 'federal' : currentContext === 'KURDISTAN_REGION' ? 'krg' : 'joint';
    
    // Always can view public or joint_shared or datasets owned by self, or datasets actively shared with self
    return this.datasets.filter(ds => {
      if (ds.classification === 'PUBLIC_GOVERNMENT') return true;
      if (ds.ownerJurisdiction === contextJur) return true;
      if (ds.activeSharedJurisdictions.includes(contextJur)) return true;
      return false;
    });
  }

  static getAllRawDatasets(): FabricDataset[] {
    return this.datasets;
  }

  static requestDataset({
    datasetId,
    actor,
    byJurisdiction
  }: {
    datasetId: string;
    actor: string;
    byJurisdiction: 'federal' | 'krg' | 'joint';
  }): { success: boolean; message: string } {
    const ds = this.datasets.find(d => d.id === datasetId);
    if (!ds) return { success: false, message: 'Dataset not found.' };

    this.auditLogs.push({
      id: `sda-${Date.now()}`,
      datasetId,
      action: 'request',
      actor,
      targetJurisdiction: byJurisdiction,
      verifiedTimestamp: new Date().toISOString(),
      systemAuthorized: true
    });

    return { 
      success: true, 
      message: `Inbound request filed for [${ds.name}] from [${byJurisdiction.toUpperCase()}]. Awaiting bilateral administrator clearance.` 
    };
  }

  static approveSharing({
    datasetId,
    targetJurisdiction,
    actor
  }: {
    datasetId: string;
    targetJurisdiction: 'federal' | 'krg' | 'joint';
    actor: string;
  }): { success: boolean; message: string } {
    const ds = this.datasets.find(d => d.id === datasetId);
    if (!ds) return { success: false, message: 'Dataset not found.' };

    if (!ds.activeSharedJurisdictions.includes(targetJurisdiction)) {
      ds.activeSharedJurisdictions.push(targetJurisdiction);
    }

    this.auditLogs.push({
      id: `sda-${Date.now()}`,
      datasetId,
      action: 'approve',
      actor,
      targetJurisdiction,
      verifiedTimestamp: new Date().toISOString(),
      systemAuthorized: true
    });

    return { 
      success: true, 
      message: `Successfully established cross-jurisdiction share path. [${ds.name}] is now accessible via secure endpoint query to [${targetJurisdiction.toUpperCase()}].` 
    };
  }

  static revokeSharing({
    datasetId,
    targetJurisdiction,
    actor
  }: {
    datasetId: string;
    targetJurisdiction: 'federal' | 'krg' | 'joint';
    actor: string;
  }): { success: boolean; message: string } {
    const ds = this.datasets.find(d => d.id === datasetId);
    if (!ds) return { success: false, message: 'Dataset not found.' };

    ds.activeSharedJurisdictions = ds.activeSharedJurisdictions.filter(j => j !== targetJurisdiction);

    this.auditLogs.push({
      id: `sda-${Date.now()}`,
      datasetId,
      action: 'revoke',
      actor,
      targetJurisdiction,
      verifiedTimestamp: new Date().toISOString(),
      systemAuthorized: true
    });

    return { 
      success: true, 
      message: `Access authorization revoked. Synchronized nodes updated to drop caching blocks.` 
    };
  }

  static getAuditLogs(): ShareAuditLog[] {
    return this.auditLogs;
  }
}
export { SharedDataFabric as SharedDataFabricClass };
export type { FabricDataset as FabricDatasetModel };
