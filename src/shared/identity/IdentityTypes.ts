export interface DigitalIdentity {
  id: string;
  nationalId: string;
  fullName: string;
  email: string;
  organization: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS';
  directorate: string;
  department: string;
  unit: string;
  position: string;
  grade: string;
  clearanceLevel: 'unclassified' | 'confidential' | 'secret' | 'top-secret';
  biometricStatus: 'verified' | 'pending' | 'compromised';
  role: string;
  status: 'active' | 'suspended' | 'retired' | 'terminated' | 'on-leave';
  certificationId?: string;
  deviceTrusted: boolean;
}

export interface VerificationResult {
  verified: boolean;
  timestamp: string;
  method: 'biometric' | 'pki' | 'mfa';
  details: string;
}

export interface LifecycleEvent {
  eventId: string;
  employeeId: string;
  type: 'hire' | 'transfer' | 'promote' | 'suspend' | 'terminate' | 'retire' | 'reassign';
  fromDetails: string;
  toDetails: string;
  approvedBy: string;
  timestamp: string;
  auditHash: string;
}
