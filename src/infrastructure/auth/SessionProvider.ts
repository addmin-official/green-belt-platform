export interface SessionProvider {
  getSession(): unknown;
  updateSession(session: unknown): void;
}
