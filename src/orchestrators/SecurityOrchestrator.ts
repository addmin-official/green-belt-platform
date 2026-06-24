import { SecurityContract, SecurityEvaluationRequest, SecurityEvaluationResult } from '../contracts/SecurityContract';
import { 
  AccessControlEngine, 
  ZeroTrustSessionManager, 
  SovereignEncryptionService, 
  SovereignIdentityProvider,
  ZeroTrustSession,
  UserRole
} from '../security';

export class SecurityOrchestrator implements SecurityContract {
  private static instance: SecurityOrchestrator;
  
  private idp = SovereignIdentityProvider.getInstance();
  private accessEngine = AccessControlEngine.getInstance();
  private sessionManager = ZeroTrustSessionManager.getInstance();
  private encryptionService = SovereignEncryptionService.getInstance();

  private constructor() {}

  public static getInstance(): SecurityOrchestrator {
    if (!SecurityOrchestrator.instance) {
      SecurityOrchestrator.instance = new SecurityOrchestrator();
    }
    return SecurityOrchestrator.instance;
  }

  public evaluateAccess(req: SecurityEvaluationRequest): SecurityEvaluationResult {
    const subjectProfile = this.idp.getEmployeeProfile(req.subjectId);
    if (!subjectProfile) {
      return { allowed: false, appliedPolicies: [], evaluationTimeMs: 0 };
    }

    const accessSubject = {
      username: subjectProfile.fullName.en,
      role: subjectProfile.role as UserRole,
      ministry: subjectProfile.ministry,
      clearance: subjectProfile.clearance,
      region: req.subjectId === 'emp-border-022' ? 'ERBIL' : 'BAGHDAD' as const,
      borderOutpost: req.subjectId === 'emp-border-022' ? 'Ibrahim Khalil Outpost' : undefined
    };

    const accessResource = {
      id: 'sim-resource-idg',
      type: 'cargo' as const,
      ownerMinistry: req.ministry || undefined,
      requiredClearance: req.requiredClearance,
      targetBorderOutpost: req.subjectId === 'emp-border-022' ? 'Ibrahim Khalil Outpost' : undefined
    };

    const accessEnvironment = {
      ipAddress: req.subjectId === 'emp-pmo-001' ? '10.100.1.5' : '10.240.40.11',
      geolocationRegion: 'BAGHDAD' as const,
      deviceVerified: req.deviceVerified,
      mfaAuthenticated: true,
      riskScore: req.riskScore
    };

    const start = performance.now();
    const result = this.accessEngine.evaluateAccess(
      accessSubject,
      req.permission as any,
      accessResource,
      accessEnvironment
    );
    const end = performance.now();

    return {
      allowed: result.allowed,
      appliedPolicies: result.appliedPolicies,
      evaluationTimeMs: Math.round(end - start),
    };
  }

  public getActiveSessions(): ZeroTrustSession[] {
    return this.sessionManager.getAllActiveSessions();
  }

  public terminateSession(sessionId: string): void {
    this.sessionManager.terminateSession(sessionId);
  }

  public rotateCryptographicKeys(): string {
    return this.encryptionService.rotateActiveKey();
  }

  public getSecurityScore(): number {
    const updatedSess = this.sessionManager.getAllActiveSessions();
    const isAnomalyActive = updatedSess.some(s => s.status === 'LOCKED_BY_THREAT_DETECTION');
    return isAnomalyActive ? 94.18 : 99.42;
  }
}
