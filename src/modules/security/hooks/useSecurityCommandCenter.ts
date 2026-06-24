import { useState, useEffect, useCallback } from 'react';
import { 
  SovereignIdentityProvider, 
  AccessControlEngine, 
  ZeroTrustSessionManager, 
  SovereignEncryptionService, 
  SovereignAuditTrailManager,
  ZeroTrustSession,
  AuditEvent,
  UserRole,
  ClearanceLevel
} from '../../../security';

export function useSecurityCommandCenter() {
  const idp = SovereignIdentityProvider.getInstance();
  const sessionManager = ZeroTrustSessionManager.getInstance();
  const encryptionService = SovereignEncryptionService.getInstance();
  const auditManager = SovereignAuditTrailManager.getInstance();
  const accessEngine = AccessControlEngine.getInstance();

  const [activeSessions, setActiveSessions] = useState<ZeroTrustSession[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);
  const [keysList, setKeysList] = useState(encryptionService.getKeyChainList());
  const [securityScore, setSecurityScore] = useState(99.42);

  const [simInputs, setSimInputs] = useState({
    subjectId: 'emp-customs-011',
    permission: 'APPROVE_CLEARANCE',
    resourceRequiredClearance: 'SECRET' as ClearanceLevel,
    resourceMinistry: 'Ministry of Finance',
    deviceVerified: true,
    riskScore: 12
  });
  const [simResult, setSimResult] = useState<any>(null);
  const [auditFilter, setAuditFilter] = useState<'ALL' | 'LOGIN' | 'KEY_ROTATION' | 'SECURITY_VIOLATION'>('ALL');

  useEffect(() => {
    setActiveSessions(sessionManager.getAllActiveSessions());
    setAuditLogs(auditManager.getLogs());
  }, []);

  const executePolicySimTest = useCallback(() => {
    const subjectProfile = idp.getEmployeeProfile(simInputs.subjectId);
    if (!subjectProfile) return;

    const accessSubject = {
      username: subjectProfile.fullName.en,
      role: subjectProfile.role as UserRole,
      ministry: subjectProfile.ministry,
      clearance: subjectProfile.clearance,
      region: simInputs.subjectId === 'emp-border-022' ? 'ERBIL' : 'BAGHDAD',
      borderOutpost: simInputs.subjectId === 'emp-border-022' ? 'Ibrahim Khalil Outpost' : undefined
    };

    const accessResource = {
      id: 'sim-resource-idg',
      type: 'cargo' as const,
      ownerMinistry: simInputs.resourceMinistry || undefined,
      requiredClearance: simInputs.resourceRequiredClearance,
      targetBorderOutpost: simInputs.subjectId === 'emp-border-022' ? 'Ibrahim Khalil Outpost' : undefined
    };

    const accessEnvironment = {
      ipAddress: simInputs.subjectId === 'emp-pmo-001' ? '10.100.1.5' : '10.240.40.11',
      geolocationRegion: 'BAGHDAD',
      deviceVerified: simInputs.deviceVerified,
      mfaAuthenticated: true,
      riskScore: simInputs.riskScore
    };

    const evalRes = accessEngine.evaluateAccess(accessSubject, simInputs.permission as any, accessResource, accessEnvironment);
    setSimResult(evalRes);

    auditManager.logEvent({
      eventType: 'PERMISSION_CHANGE',
      subjectUserId: 'sys-sim-validator',
      subjectUsername: `ABAC Simulator (${subjectProfile.fullName.en})`,
      subjectRole: 'Auditor',
      clearanceLevel: 'SECRET',
      actionSummary: `Simulated ABAC dry-run valuation: [${evalRes.allowed ? 'APPROVED' : 'BLOCKED'}].`,
      resourceDetails: `Permission target: ${simInputs.permission}. Applied policies: ${evalRes.appliedPolicies.join(', ')}`,
      ipAddress: '127.0.0.1',
      geolocation: 'SIMULATOR_SANDBOX',
      status: evalRes.allowed ? 'SUCCESS' : 'POLICY_DENIED'
    });
    setAuditLogs(auditManager.getLogs());
  }, [simInputs]);

  useEffect(() => {
    executePolicySimTest();
  }, [executePolicySimTest]);

  const triggerTelemetryAudit = useCallback(() => {
    sessionManager.executeGlobalThreadAudit();
    const updatedSess = sessionManager.getAllActiveSessions();
    setActiveSessions(updatedSess);
    setSecurityScore(updatedSess.some(s => s.status === 'LOCKED_BY_THREAT_DETECTION') ? 94.18 : 99.42);

    auditManager.logEvent({
      eventType: 'MUTATION',
      subjectUserId: 'sys-telemetry-engine',
      subjectUsername: 'Automated Global Health Assessor',
      subjectRole: 'Super Administrator',
      clearanceLevel: 'SOVEREIGN',
      actionSummary: 'Executed Zero-Trust global session threat recalculation.',
      resourceDetails: `Scanned ${updatedSess.length} endpoints. Active risk threshold index mapped perfectly.`,
      ipAddress: '127.0.0.1',
      geolocation: 'FEDERAL_MAIN_FRAME',
      status: 'SUCCESS'
    });
    setAuditLogs(auditManager.getLogs());
  }, []);

  const terminateSessionSocket = useCallback((sessionId: string, username: string) => {
    sessionManager.terminateSession(sessionId);
    setActiveSessions(sessionManager.getAllActiveSessions());

    auditManager.logEvent({
      eventType: 'SECURITY_VIOLATION',
      subjectUserId: 'emp-pmo-001',
      subjectUsername: 'Dr. Tariq Al-Jamil',
      subjectRole: 'Super Administrator',
      clearanceLevel: 'SOVEREIGN',
      actionSummary: `Forced Socket Termination on socket: [${sessionId}].`,
      resourceDetails: `Revoked access tokens and purged credentials for user [${username}] immediately.`,
      ipAddress: '10.100.1.5',
      geolocation: 'BAGHDAD',
      status: 'SUCCESS'
    });
    setAuditLogs(auditManager.getLogs());
  }, []);

  const triggerKeyRollover = useCallback(() => {
    const rolledKey = encryptionService.rotateActiveKey();
    setKeysList([...encryptionService.getKeyChainList()]);

    auditManager.logEvent({
      eventType: 'KEY_ROTATION',
      subjectUserId: 'emp-pmo-001',
      subjectUsername: 'Dr. Tariq Al-Jamil',
      subjectRole: 'Super Administrator',
      clearanceLevel: 'SOVEREIGN',
      actionSummary: 'Client triggered manual HSM Sovereign Cryptographic Key rotation.',
      resourceDetails: `Active Key rolled immediately on HSM partition. New active ID: [${rolledKey}].`,
      ipAddress: '10.100.1.5',
      geolocation: 'BAGHDAD',
      status: 'SUCCESS'
    });
    setAuditLogs(auditManager.getLogs());
  }, []);

  return {
    activeSessions, auditLogs, keysList, securityScore,
    simSubjectId: simInputs.subjectId,
    setSimSubjectId: (id: string) => setSimInputs(prev => ({ ...prev, subjectId: id })),
    simPermission: simInputs.permission,
    setSimPermission: (perm: string) => setSimInputs(prev => ({ ...prev, permission: perm })),
    simResourceRequiredClearance: simInputs.resourceRequiredClearance,
    setSimResourceRequiredClearance: (cl: ClearanceLevel) => setSimInputs(prev => ({ ...prev, resourceRequiredClearance: cl })),
    simResourceMinistry: simInputs.resourceMinistry,
    setSimResourceMinistry: (m: string) => setSimInputs(prev => ({ ...prev, resourceMinistry: m })),
    simDeviceVerified: simInputs.deviceVerified,
    setSimDeviceVerified: (v: boolean) => setSimInputs(prev => ({ ...prev, deviceVerified: v })),
    simRiskScore: simInputs.riskScore,
    setSimRiskScore: (r: number) => setSimInputs(prev => ({ ...prev, riskScore: r })),
    simResult, auditFilter, setAuditFilter,
    triggerTelemetryAudit, terminateSessionSocket, triggerKeyRollover,
    employeeProfiles: idp
  };
}
