export interface CommandCenterGateway {
  getSystemStatus(): Promise<unknown>;
}
