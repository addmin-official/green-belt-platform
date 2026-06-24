import { IdentityRegistry } from '../identity/IdentityRegistry';

export interface MFACheckpoint {
  employeeId: string;
  activeChallenge: string; // One-time cryptographic token challenge
  issuedAt: number;
}

export class MFAEngine {
  private static activeChallenges: MFACheckpoint[] = [];
  private static CHALLENGE_TIMEOUT_MS = 60 * 1000; // 60 seconds

  /**
   * Generates a new hardware token challenge (e.g. secure TOTP simulate)
   */
  public static generateChallenge(employeeId: string): string {
    const employee = IdentityRegistry.getById(employeeId);
    if (!employee) throw new Error(`Cannot register challenge for unrecognized id ${employeeId}`);

    // Generate a secure unique digit-based challenge
    const challengeCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Remove old active challenge and save new
    this.activeChallenges = this.activeChallenges.filter(c => c.employeeId !== employeeId);
    this.activeChallenges.push({
      employeeId,
      activeChallenge: challengeCode,
      issuedAt: Date.now()
    });

    return challengeCode;
  }

  /**
   * Evaluates the response challenge submitted by the physical key
   */
  public static verifyMFAChallenge(employeeId: string, responseToken: string): boolean {
    const check = this.activeChallenges.find(c => c.employeeId === employeeId);
    if (!check) return false;

    const isCurrent = (Date.now() - check.issuedAt) < this.CHALLENGE_TIMEOUT_MS;
    if (!isCurrent) {
      this.activeChallenges = this.activeChallenges.filter(c => c.employeeId !== employeeId);
      return false; // Challenge timed out
    }

    const matches = check.activeChallenge === responseToken;
    if (matches) {
      // Clear challenge once verified successfully
      this.activeChallenges = this.activeChallenges.filter(c => c.employeeId !== employeeId);
      return true;
    }

    return false;
  }
}
