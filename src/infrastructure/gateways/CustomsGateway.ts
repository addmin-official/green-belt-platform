export interface CustomsGateway {
  validateManifest(manifest: unknown): Promise<unknown>;
}
