export interface GatewayRegistry {
  getGateway(name: string): unknown;
}
