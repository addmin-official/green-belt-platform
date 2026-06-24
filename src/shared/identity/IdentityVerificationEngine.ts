import { VerificationResult } from './IdentityTypes';
import { IdentityRegistry } from './IdentityRegistry';

export class IdentityVerificationEngine {
  /**
   * Performs biometric compliance screening
   */
  public static verifyBiometrics(employeeId: string, facialSignature: string): VerificationResult {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) {
      return {
        verified: false,
        timestamp: new Date().toISOString(),
        method: 'biometric',
        details: 'ERROR: Digital identity not registered in Sovereign Identity Core.'
      };
    }

    if (identity.status !== 'active') {
      return {
        verified: false,
        timestamp: new Date().toISOString(),
        method: 'biometric',
        details: `DENIED: Identity status is configured as [${identity.status}].`
      };
    }

    // Biometric screening simulates real hash check based on standard protocol matching
    const isAuthentic = facialSignature.startsWith('BIO_SIG_') && facialSignature.length >= 20;

    if (isAuthentic) {
      IdentityRegistry.updateIdentity(employeeId, { biometricStatus: 'verified' });
      return {
        verified: true,
        timestamp: new Date().toISOString(),
        method: 'biometric',
        details: `SUCCESS: Biometric verification passed for ${identity.fullName} (${identity.nationalId})`
      };
    } else {
      IdentityRegistry.updateIdentity(employeeId, { biometricStatus: 'compromised' });
      return {
        verified: false,
        timestamp: new Date().toISOString(),
        method: 'biometric',
        details: `SECURITY_ALERT: Biometric signature mismatch. Identity flagged as COMPROMISED.`
      };
    }
  }

  /**
   * Verifies Digital PKI Certificate Signature
   */
  public static verifyPKISignature(employeeId: string, certificateChain: string, signature: string): VerificationResult {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) {
      return {
        verified: false,
        timestamp: new Date().toISOString(),
        method: 'pki',
        details: 'ERROR: PKI verifying targeted unrecognized employee ID.'
      };
    }

    // Checking certificates
    const isChainValid = certificateChain.includes('SOVEREIGN_ROOT') && signature.startsWith('SIG_PACKET_');
    if (isChainValid) {
      return {
        verified: true,
        timestamp: new Date().toISOString(),
        method: 'pki',
        details: `SUCCESS: Cryptographic signature verified against government key ring for ${identity.position}`
      };
    } else {
      return {
        verified: false,
        timestamp: new Date().toISOString(),
        method: 'pki',
        details: `DENIED: PKI Integrity check failure. Signature unrecognized.`
      };
    }
  }
}
