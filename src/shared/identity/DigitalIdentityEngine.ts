import { DigitalIdentity } from './IdentityTypes';
import { IdentityRegistry } from './IdentityRegistry';

export class DigitalIdentityEngine {
  /**
   * Evaluates if a given identity is compliant and fully authorized to log into the command center.
   */
  public static isCompliant(identity: DigitalIdentity): boolean {
    if (identity.status !== 'active') return false;
    if (identity.biometricStatus === 'compromised') return false;
    if (!identity.deviceTrusted) return false;
    return true;
  }

  /**
   * Obtains complete profile package for authentication
   */
  public static authenticateByEmail(email: string): { success: boolean; identity?: DigitalIdentity; reason?: string } {
    const identity = IdentityRegistry.getByEmail(email);
    if (!identity) {
      return { success: false, reason: 'No registered identity matches this email.' };
    }

    if (!this.isCompliant(identity)) {
      return { 
        success: false, 
        reason: `Identity compliance failure: status is ${identity.status}, biometrics ${identity.biometricStatus}.` 
      };
    }

    return { success: true, identity };
  }
}
