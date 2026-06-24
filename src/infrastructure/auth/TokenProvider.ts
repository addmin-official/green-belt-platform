export interface TokenProvider {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
}
