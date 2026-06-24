import { ClearanceLevel, ZeroTrustSession } from '../security';

export interface SecurityDTO {
  // Define based on security mock usage
}

export interface SecurityRepository {
  // Define methods based on usage
}

export interface SecurityEvaluationRequest {
  subjectId: string;
  requiredClearance: ClearanceLevel;
  permission: string;
  deviceVerified: boolean;
  riskScore: number;
  ministry?: string;
}

export interface SecurityEvaluationResult {
  allowed: boolean;
  appliedPolicies: string[];
  evaluationTimeMs: number;
}

export interface SecurityContract {
  evaluateAccess(req: SecurityEvaluationRequest): SecurityEvaluationResult;
  getActiveSessions(): ZeroTrustSession[];
  terminateSession(sessionId: string): void;
  rotateCryptographicKeys(): string;
  getSecurityScore(): number;
}
