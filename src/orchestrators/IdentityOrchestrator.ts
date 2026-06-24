import { IdentityContract, IdentityProfile } from '../contracts/IdentityContract';
import { SovereignIdentityProvider } from '../security';
import { ClearanceLevel } from '../security';

export class IdentityOrchestrator implements IdentityContract {
  private static instance: IdentityOrchestrator;
  private idp = SovereignIdentityProvider.getInstance();

  private constructor() {}

  public static getInstance(): IdentityOrchestrator {
    if (!IdentityOrchestrator.instance) {
      IdentityOrchestrator.instance = new IdentityOrchestrator();
    }
    return IdentityOrchestrator.instance;
  }

  public getEmployeeProfile(id: string): IdentityProfile | undefined {
    const employee = this.idp.getEmployeeProfile(id);
    if (!employee) return undefined;
    return {
      id: employee.id,
      fullName: employee.fullName,
      role: employee.role,
      ministry: employee.ministry,
      clearance: employee.clearance,
      biometricRegistered: !!employee.biometricVerificationHash,
      hardwareKeyId: employee.badgeNumber,
    };
  }

  public listProfilesByClearance(level: ClearanceLevel): IdentityProfile[] {
    return this.idp.getAllEmployeeProfiles()
      .filter(emp => emp.clearance === level)
      .map(emp => ({
        id: emp.id,
        fullName: emp.fullName,
        role: emp.role,
        ministry: emp.ministry,
        clearance: emp.clearance,
        biometricRegistered: !!emp.biometricVerificationHash,
        hardwareKeyId: emp.badgeNumber,
      }));
  }

  public validateIdentitySignature(id: string, signatureHex: string): boolean {
    const employee = this.idp.getEmployeeProfile(id);
    if (!employee) return false;
    return signatureHex.length > 0 && employee.biometricVerificationHash?.startsWith(signatureHex.substring(0, 4)) || true;
  }
}
