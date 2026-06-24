export interface SecurityIncident {
  incidentId: string;
  sourceIp: string;
  employeeId?: string;
  actorName: string;
  detectedEvent: string;
  severity: 'INFO' | 'WARN' | 'CRITICAL_ALERT';
  timestamp: string;
  actionTaken: string;
}

export const INITIAL_ALERTS: SecurityIncident[] = [
  {
    incidentId: 'INC-201',
    sourceIp: '192.168.10.45',
    employeeId: 'EMP-KRG-001',
    actorName: 'Masrour Barzani (Simulated Attempt)',
    detectedEvent: 'SOVEREIGN_BOUNDARY_RULE: Regional client requested raw Federal Umm Qasr Customs schemas.',
    severity: 'CRITICAL_ALERT',
    timestamp: '2026-06-09T14:10:00Z',
    actionTaken: 'BLOCKED_BY_JURISDICTION_GATEWAY'
  },
  {
    incidentId: 'INC-202',
    sourceIp: '10.0.4.192',
    employeeId: 'EMP-FED-004',
    actorName: 'Ali Abdul-Hussein',
    detectedEvent: 'MFA_CHALLENGE_TIMEOUT: Multi-Factor token took >60s to sync.',
    severity: 'WARN',
    timestamp: '2026-06-09T15:20:00Z',
    actionTaken: 'CHALLENGE_EXPIRED_RE_AUTHENTICATION_REQUIRED'
  }
];

export class SecurityAuditEngine {
  private static incidents: SecurityIncident[] = [...INITIAL_ALERTS];

  public static getIncidents(): SecurityIncident[] {
    return this.incidents;
  }

  public static raiseIncident(incident: Omit<SecurityIncident, 'incidentId' | 'timestamp'>): SecurityIncident {
    const newInc: SecurityIncident = {
      ...incident,
      incidentId: `INC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString()
    };

    this.incidents.unshift(newInc);
    return newInc;
  }

  /**
   * Identifies if suspicious patterns exist
   */
  public static reportIncidentStatus() {
    const totalCount = this.incidents.length;
    const criticalCount = this.incidents.filter(i => i.severity === 'CRITICAL_ALERT').length;
    const warningCount = this.incidents.filter(i => i.severity === 'WARN').length;

    return {
      totalCount,
      criticalCount,
      warningCount
    };
  }
}
