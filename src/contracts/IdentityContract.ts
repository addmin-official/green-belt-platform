import { ClearanceLevel } from '../security';

export interface IdentityDTO {
  // Define based on identity mock usage (e.g. citizens, businesses)
}

export interface IdentityRepository {
  // Define methods based on usage
}

export interface IdentityProfile {
  id: string;
  fullName: Record<string, string>;
  role: string;
  ministry: string;
  clearance: ClearanceLevel;
  biometricRegistered: boolean;
  hardwareKeyId: string;
}

export interface IdentityContract {
  getEmployeeProfile(id: string): IdentityProfile | undefined;
  listProfilesByClearance(level: ClearanceLevel): IdentityProfile[];
  validateIdentitySignature(id: string, signatureHex: string): boolean;
}
