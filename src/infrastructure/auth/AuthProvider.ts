export interface AuthProvider {
  login(credentials: unknown): Promise<unknown>;
  logout(): Promise<void>;
}
