export interface AIGateway {
  predict(input: unknown): Promise<unknown>;
}
