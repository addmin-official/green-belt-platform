export interface RepositoryRegistry {
  getRepository(name: string): unknown;
}
