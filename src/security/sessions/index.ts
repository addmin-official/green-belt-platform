// IDG Security Sessions - Zero Trust Engine
// Compliant with NIST SP 800-207 Zero Trust Architecture

import { UserRole } from '../access';
import { ClearanceLevel } from '../identity';

export interface MicroDeviceTelemetry {
  deviceId: string;
  osName: string;
  secureEnclavePresent: boolean;
  tamperDetectionSignal: boolean;
  browserSignature: string;
  cpuArchitecture: string;
}

export interface NetworkLocationTelemetry {
  ipAddress: string;
  asnName: string;
  geographicRegion: string;
  isVpnOrProxy: boolean;
  requiresMfaStepUp: boolean;
}

export interface BehavioralTelemetry {
  averageKeyPressDelayMs: number;
  clickVelocityAnomalyRate: number; // 0.0 to 1.0 (anomalous sudden actions)
  requestFrequencyHz: number;
}

export interface ZeroTrustSession {
  sessionId: string;
  userId: string;
  username: string;
  userRole: UserRole;
  clearanceLevel: ClearanceLevel;
  associatedMinistry?: string;
  device: MicroDeviceTelemetry;
  location: NetworkLocationTelemetry;
  behavior: BehavioralTelemetry;
  riskScore: number; // 0 to 100
  createdAt: string;
  lastActiveAt: string;
  status: 'ACTIVE' | 'STEP_UP_CHALLENGE' | 'LOCKED_BY_THREAT_DETECTION' | 'EXPIRED';
}

export interface DeviceValidationReport {
  isValid: boolean;
  riskPoints: number;
  violations: string[];
}

export interface LocationValidationReport {
  isValid: boolean;
  riskPoints: number;
  violations: string[];
}

export class ZeroTrustSessionManager {
  private static instance: ZeroTrustSessionManager;
  private activeSessions: Map<string, ZeroTrustSession> = new Map();
  private auditCounter: number = 0;

  private constructor() {
    this.seedSessions();
  }

  public static getInstance(): ZeroTrustSessionManager {
    if (!ZeroTrustSessionManager.instance) {
      ZeroTrustSessionManager.instance = new ZeroTrustSessionManager();
    }
    return ZeroTrustSessionManager.instance;
  }

  private seedSessions() {
    // 1. Seed Active PMO Session (Secure)
    this.activeSessions.set('sess-pmo-001', {
      sessionId: 'sess-pmo-001',
      userId: 'emp-pmo-001',
      username: 'Dr. Tariq Al-Jamil',
      userRole: 'Super Administrator',
      clearanceLevel: 'SOVEREIGN',
      associatedMinistry: 'Prime Minister Office',
      device: {
        deviceId: 'dev-iraq-gov-secure-mac01',
        osName: 'SovereignLinux OS v1.2',
        secureEnclavePresent: true,
        tamperDetectionSignal: false,
        browserSignature: 'Mozilla/5.0 GovernmentSecureBrowser/4.1 (WebCrypto)',
        cpuArchitecture: 'ARM64'
      },
      location: {
        ipAddress: '10.100.1.5', // Secure Government Intranet Port
        asnName: 'Federal Telecom Authority Iraq',
        geographicRegion: 'BAGHDAD',
        isVpnOrProxy: false,
        requiresMfaStepUp: false
      },
      behavior: {
        averageKeyPressDelayMs: 140,
        clickVelocityAnomalyRate: 0.05,
        requestFrequencyHz: 0.5
      },
      riskScore: 4, // Very secure, validated state
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      lastActiveAt: new Date().toISOString(),
      status: 'ACTIVE'
    });

    // 2. Seed Customs Officer (Secure)
    this.activeSessions.set('sess-customs-011', {
      sessionId: 'sess-customs-011',
      userId: 'emp-customs-011',
      username: 'Colonel Haider Jasim',
      userRole: 'Customs Administrator',
      clearanceLevel: 'SECRET',
      associatedMinistry: 'Ministry of Finance',
      device: {
        deviceId: 'dev-iq-finance-workstation-18',
        osName: 'Windows 11 Enterprise (Gov Core Engrave)',
        secureEnclavePresent: true,
        tamperDetectionSignal: false,
        browserSignature: 'Edge/114.0.0.0 (Secure Government Enclave)',
        cpuArchitecture: 'x86_64'
      },
      location: {
        ipAddress: '10.240.40.11',
        asnName: 'Iraqi National Backbone Subnet L2',
        geographicRegion: 'BAGHDAD',
        isVpnOrProxy: false,
        requiresMfaStepUp: false
      },
      behavior: {
        averageKeyPressDelayMs: 220,
        clickVelocityAnomalyRate: 0.12,
        requestFrequencyHz: 0.8
      },
      riskScore: 12,
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      lastActiveAt: new Date().toISOString(),
      status: 'ACTIVE'
    });

    // 3. Seed Border Officer at Ibrahim Khalil (Secure)
    this.activeSessions.set('sess-border-022', {
      sessionId: 'sess-border-022',
      userId: 'emp-border-022',
      username: 'Aras Karwan',
      userRole: 'Border Officer',
      clearanceLevel: 'CONFIDENTIAL',
      associatedMinistry: 'Kurdish Region Security Council',
      device: {
        deviceId: 'dev-krg-boundary-tablet-04',
        osName: 'Android 14 (Knox Secure Custom)',
        secureEnclavePresent: true,
        tamperDetectionSignal: false,
        browserSignature: 'Sovereign WebView Gateway v2',
        cpuArchitecture: 'ARM64'
      },
      location: {
        ipAddress: '10.90.15.42', // Ibrahim Khalil Outpost local segment
        asnName: 'Kurdistan National Telecom Router',
        geographicRegion: 'ERBIL',
        isVpnOrProxy: false,
        requiresMfaStepUp: false
      },
      behavior: {
        averageKeyPressDelayMs: 95,
        clickVelocityAnomalyRate: 0.18,
        requestFrequencyHz: 1.2
      },
      riskScore: 19,
      createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
      lastActiveAt: new Date().toISOString(),
      status: 'ACTIVE'
    });

    // 4. Seed Threatened/Anomalous Session for Simulated Emergency
    this.activeSessions.set('sess-anomaly-004', {
      sessionId: 'sess-anomaly-004',
      userId: 'emp-extern-701',
      username: 'Contractor Ali Abbas',
      userRole: 'Developer',
      clearanceLevel: 'UNCLASSIFIED',
      associatedMinistry: 'Federal Trade Commission',
      device: {
        deviceId: 'dev-unknown-external-pc',
        osName: 'Linux Enterprise distro (unauthorized)',
        secureEnclavePresent: false, // Security Alarm trigger
        tamperDetectionSignal: true,  // Heavy breach signal
        browserSignature: 'Chrome/118.0.0.0 (Unrecognized agent header)',
        cpuArchitecture: 'x86_64'
      },
      location: {
        ipAddress: '185.190.140.22', // External ISP Block
        asnName: 'Commercial Public Wireless, Iraq Gateway Route',
        geographicRegion: 'BASRA', // Regional mismatch relative to home unit
        isVpnOrProxy: true,       // Proxy usage detected!
        requiresMfaStepUp: true
      },
      behavior: {
        averageKeyPressDelayMs: 15, // Blazing fast simulated scripts / non-human inputs!
        clickVelocityAnomalyRate: 0.88,
        requestFrequencyHz: 14.5   // Extreme query frequency!
      },
      riskScore: 84, // Security Anomaly Level Critical
      createdAt: new Date(Date.now() - 1200000).toISOString(), // 20 mins ago
      lastActiveAt: new Date().toISOString(),
      status: 'STEP_UP_CHALLENGE'
    });
  }

  /**
   * Evaluates the safety of a device based on hardware profiles and enclave keys.
   */
  public validateDevice(device: MicroDeviceTelemetry): DeviceValidationReport {
    const violations: string[] = [];
    let riskPoints = 0;

    if (!device.secureEnclavePresent) {
      violations.push('Missing Hardware Secure Enclave Cryptokey Layer.');
      riskPoints += 40;
    }
    if (device.tamperDetectionSignal) {
      violations.push('Hardware integrity error: Integrity/Sandbox Tamper Signal detected.');
      riskPoints += 60;
    }
    if (device.browserSignature.includes('Bot') || device.browserSignature.includes('PhantomJS')) {
      violations.push('Automated headless browser simulation detected.');
      riskPoints += 80;
    }

    return {
      isValid: riskPoints < 50,
      riskPoints,
      violations
    };
  }

  /**
   * Tracks and validates network boundaries to prevent IP spoofing or VPN routing breaches.
   */
  public validateLocation(location: NetworkLocationTelemetry): LocationValidationReport {
    const violations: string[] = [];
    let riskPoints = 0;

    if (location.isVpnOrProxy) {
      violations.push('Network traffic routed through unverified VPN/Proxy node.');
      riskPoints += 45;
    }
    // Strict Government IP segment constraint
    if (!location.ipAddress.startsWith('10.')) {
      violations.push('Connection origin outside the Private Federal Secure Cryptonet (10.0.0.0/8).');
      riskPoints += 30;
    }

    return {
      isValid: riskPoints < 50,
      riskPoints,
      violations
    };
  }

  /**
   * Aggregates device, location and behavioral telemetry vectors into a final 0-100 hazard index.
   */
  public computeRiskScore(session: ZeroTrustSession): number {
    let score = 5; // Baseline healthy score

    // 1. Device check contribution
    const devRep = this.validateDevice(session.device);
    score += devRep.riskPoints * 0.4;

    // 2. Location check contribution
    const locRep = this.validateLocation(session.location);
    score += locRep.riskPoints * 0.35;

    // 3. Behavioral speed anomaly contribution
    if (session.behavior.averageKeyPressDelayMs < 40) {
      score += 15; // script speed keys
    }
    if (session.behavior.clickVelocityAnomalyRate > 0.6) {
      score += 20; // robotic click rates
    }
    if (session.behavior.requestFrequencyHz > 10) {
      score += 15; // API scraping rates
    }

    // Constraint final boundaries
    return Math.min(Math.max(Math.round(score), 0), 100);
  }

  public getSession(id: string): ZeroTrustSession | undefined {
    return this.activeSessions.get(id);
  }

  public getAllActiveSessions(): ZeroTrustSession[] {
    return Array.from(this.activeSessions.values());
  }

  /**
   * Initiates dynamic risk evaluation across all elements. Locked profiles are flagged instantaneously.
   */
  public executeGlobalThreadAudit(): void {
    this.auditCounter++;
    this.activeSessions.forEach((session) => {
      // Re-evaluate risk score with simulated live changes
      const calculatedScore = this.computeRiskScore(session);
      session.riskScore = calculatedScore;
      session.lastActiveAt = new Date().toISOString();

      if (session.riskScore > 75) {
        session.status = 'LOCKED_BY_THREAT_DETECTION';
      } else if (session.riskScore > 40) {
        session.status = 'STEP_UP_CHALLENGE';
      } else {
        session.status = 'ACTIVE';
      }
    });
  }

  public registerSession(session: ZeroTrustSession): void {
    this.activeSessions.set(session.sessionId, session);
  }

  public terminateSession(id: string): void {
    this.activeSessions.delete(id);
  }
}
