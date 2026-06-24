export interface ProviderRegistry {
  register(name: string, provider: unknown): void;
  get(name: string): unknown;
}
