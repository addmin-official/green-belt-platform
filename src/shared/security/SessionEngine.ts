import { IdentityRegistry } from '../identity/IdentityRegistry';

export interface ActiveSession {
  sessionId: string;
  employeeId: string;
  fullName: string;
  role: string;
  createdAt: string;
  expiresAt: string;
  mfaVerified: boolean;
  deviceFingerprint: string;
  status: 'active' | 'expired' | 'revoked';
}

export class SessionEngine {
  private static activeSessions: ActiveSession[] = [];
  private static SESSION_DURATION_MS = 15 * 60 * 1000; // 15 Minutes session lifetime

  public static getSessions(): ActiveSession[] {
    return this.activeSessions;
  }

  public static initiateSession(employeeId: string, deviceFingerprint: string, mfaVerified: boolean): ActiveSession {
    const employee = IdentityRegistry.getById(employeeId);
    if (!employee) throw new Error(`Cannot start session for unknown employee ${employeeId}`);

    const now = new Date();
    const expiry = new Date(now.getTime() + this.SESSION_DURATION_MS);

    const session: ActiveSession = {
      sessionId: `SESS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      employeeId,
      fullName: employee.fullName,
      role: employee.role,
      createdAt: now.toISOString(),
      expiresAt: expiry.toISOString(),
      mfaVerified,
      deviceFingerprint,
      status: 'active'
    };

    // Revoke any previous active session for this employee to prevent concurrent sessions
    this.activeSessions = this.activeSessions.map(s => 
      s.employeeId === employeeId && s.status === 'active' ? { ...s, status: 'revoked' } : s
    );

    this.activeSessions.push(session);
    return session;
  }

  public static verifySession(id: string): boolean {
    const session = this.activeSessions.find(s => s.sessionId === id);
    if (!session) return false;
    if (session.status !== 'active') return false;

    const expired = new Date(session.expiresAt).getTime() < Date.now();
    if (expired) {
      session.status = 'expired';
      return false;
    }
    return true;
  }

  public static revokeSession(id: string): void {
    const session = this.activeSessions.find(s => s.sessionId === id);
    if (session) session.status = 'revoked';
  }

  public static forceLogoutSpecialist(employeeId: string): void {
    this.activeSessions = this.activeSessions.map(s => 
      s.employeeId === employeeId ? { ...s, status: 'revoked' as const } : s
    );
  }
}
