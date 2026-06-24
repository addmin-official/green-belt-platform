export interface UATRoleProfile {
  id: string;
  name: string;
  jurisdiction: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS' | 'ALL_SYSTEM';
  description: string;
  allowedZones: string[];
  restrictedZones: string[];
}

export const UAT_ROLES: UATRoleProfile[] = [
  {
    id: 'fed-exec-viewer',
    name: 'Federal Executive Viewer',
    jurisdiction: 'FEDERAL_IRAQ',
    description: 'Federal-level policy overview and strategic analytics access.',
    allowedZones: ['Federal Zones', 'National Aggregates'],
    restrictedZones: ['KRG Regional Raw Records', 'Bilateral Private Zones']
  },
  {
    id: 'krg-exec-viewer',
    name: 'KRG Executive Viewer',
    jurisdiction: 'KRG',
    description: 'Regional Kurdistan overview viewer for local sector validation.',
    allowedZones: ['KRG Regional Zones', 'Regional Aggregates'],
    restrictedZones: ['Federal Private Raw Records', 'Bilateral Private Zones']
  },
  {
    id: 'joint-auditor',
    name: 'Joint Auditor',
    jurisdiction: 'JOINT_OPERATIONS',
    description: 'reconciliation reviewer verifying cross-border transactions and shared metadata hashes.',
    allowedZones: ['Bilateral Safe-Zones', 'Joint Metadata Audits', 'National Aggregates'],
    restrictedZones: ['Federal Raw Revenue', 'Federal Raw Intelligence', 'KRG Raw Revenue', 'KRG Raw Intelligence']
  },
  {
    id: 'fed-customs-officer',
    name: 'Federal Customs Officer',
    jurisdiction: 'FEDERAL_IRAQ',
    description: 'Operations supervisor at borders managed by the Federal Government.',
    allowedZones: ['Federal Customs Control', 'Transit Records'],
    restrictedZones: ['KRG Customs Control', 'KRG Finance Systems']
  },
  {
    id: 'krg-customs-officer',
    name: 'KRG Customs Officer',
    jurisdiction: 'KRG',
    description: 'Local sector operator managing regional cargo verifications.',
    allowedZones: ['KRG Customs Control', 'Regional Border Logs'],
    restrictedZones: ['Federal Customs Control', 'Federal Revenue vaults']
  },
  {
    id: 'border-operator',
    name: 'Border Operator',
    jurisdiction: 'JOINT_OPERATIONS',
    description: 'Joint checkpoint validation desk reviewing crossing manifests and license plates.',
    allowedZones: ['Joint Manifest Checks', 'Verification Desks'],
    restrictedZones: ['Federal Private Databases', 'KRG Secure Intelligence']
  },
  {
    id: 'security-analyst',
    name: 'Security Analyst',
    jurisdiction: 'JOINT_OPERATIONS',
    description: 'Technical monitor auditing system connection routes and integrity compliance certificates.',
    allowedZones: ['System Metrics', 'Security Assertions', 'Audit Safe Logs'],
    restrictedZones: ['Raw Financial Ledgers', 'Identity Registers']
  },
  {
    id: 'tech-administrator',
    name: 'Technical Administrator',
    jurisdiction: 'ALL_SYSTEM',
    description: 'Systems config supervisor responsible for wiring, routing tables, and env setup.',
    allowedZones: ['System Infrastructure Config', 'Registry Tables', 'Staging Scans'],
    restrictedZones: ['Raw Sovereign Revenue Records', 'Raw Sovereign Workforce Profiles']
  }
];

export class UATRoleRegistry {
  public static getRoles(): UATRoleProfile[] {
    return UAT_ROLES;
  }

  public static getRoleById(id: string): UATRoleProfile | undefined {
    return UAT_ROLES.find(r => r.id === id);
  }
}
