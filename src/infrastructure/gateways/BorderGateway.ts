export interface BorderGateway {
  getCheckpointActivity(checkpointId: string): Promise<unknown>;
}
