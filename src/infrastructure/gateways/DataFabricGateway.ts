export interface DataFabricGateway {
  queryDataset(datasetId: string, query: unknown): Promise<unknown>;
}
