export interface DataLineageNode {
  id: string;
  label: string;
  type: string;
  status: string;
}

export interface DataFabricContract {
  getLineageNodes(): DataLineageNode[];
  executeDataQualityAudit(): void;
  getSyncHealth(): { Basra: boolean; Baghdad: boolean; Erbil: boolean };
}
