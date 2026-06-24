// IDG Security Access Governance - Combining RBAC and ABAC
// Designed to strict standards compliant with ISO 27001 Annex A.9 (Access Control)

import { ClearanceLevel } from '../identity';

export type UserRole =
  | 'Super Administrator'
  | 'National Administrator'
  | 'Ministry Administrator'
  | 'Customs Administrator'
  | 'Border Officer'
  | 'Financial Officer'
  | 'Auditor'
  | 'Intelligence Analyst'
  | 'Organization Manager'
  | 'Citizen'
  | 'Developer';

export type SecurityPermission =
  | 'READ_TELEMETRY'
  | 'MANAGE_IDENTITIES'
  | 'TRIGGER_AUDIT'
  | 'RECONCILE_LEDGER'
  | 'UPDATE_SYSTEM_CONFIG'
  | 'APPROVE_CLEARANCE'
  | 'OVERRIDE_RISK_HOLD'
  | 'EXPORT_AUDIT_LOGS'
  | 'VIEW_SECURITY_METRICS'
  | 'SOLVE_CRISIS_ALARM'
  | 'VIEW_INTEL_ALERTS'
  | 'DERIVE_ENCRYPTION_KEYS';

// RBAC: Roles to Permissions Matrix Map
export const RBAC_ROLE_MATRIX: Record<UserRole, SecurityPermission[]> = {
  'Super Administrator': [
    'READ_TELEMETRY',
    'MANAGE_IDENTITIES',
    'TRIGGER_AUDIT',
    'RECONCILE_LEDGER',
    'UPDATE_SYSTEM_CONFIG',
    'APPROVE_CLEARANCE',
    'OVERRIDE_RISK_HOLD',
    'EXPORT_AUDIT_LOGS',
    'VIEW_SECURITY_METRICS',
    'SOLVE_CRISIS_ALARM',
    'VIEW_INTEL_ALERTS',
    'DERIVE_ENCRYPTION_KEYS',
  ],
  'National Administrator': [
    'READ_TELEMETRY',
    'MANAGE_IDENTITIES',
    'TRIGGER_AUDIT',
    'RECONCILE_LEDGER',
    'APPROVE_CLEARANCE',
    'OVERRIDE_RISK_HOLD',
    'EXPORT_AUDIT_LOGS',
    'VIEW_SECURITY_METRICS',
    'SOLVE_CRISIS_ALARM',
    'VIEW_INTEL_ALERTS',
  ],
  'Ministry Administrator': [
    'READ_TELEMETRY',
    'TRIGGER_AUDIT',
    'APPROVE_CLEARANCE',
    'EXPORT_AUDIT_LOGS',
    'VIEW_SECURITY_METRICS',
    'SOLVE_CRISIS_ALARM',
  ],
  'Customs Administrator': [
    'READ_TELEMETRY',
    'RECONCILE_LEDGER',
    'APPROVE_CLEARANCE',
    'OVERRIDE_RISK_HOLD',
    'VIEW_SECURITY_METRICS',
  ],
  'Border Officer': [
    'READ_TELEMETRY',
    'APPROVE_CLEARANCE',
  ],
  'Financial Officer': [
    'READ_TELEMETRY',
    'RECONCILE_LEDGER',
    'EXPORT_AUDIT_LOGS',
  ],
  'Auditor': [
    'READ_TELEMETRY',
    'TRIGGER_AUDIT',
    'EXPORT_AUDIT_LOGS',
    'VIEW_SECURITY_METRICS',
  ],
  'Intelligence Analyst': [
    'READ_TELEMETRY',
    'VIEW_SECURITY_METRICS',
    'VIEW_INTEL_ALERTS',
  ],
  'Organization Manager': [
    'READ_TELEMETRY',
  ],
  'Citizen': [
    'READ_TELEMETRY',
  ],
  'Developer': [
    'READ_TELEMETRY',
    'VIEW_SECURITY_METRICS',
  ],
};

// Clearance weight scale to compare ABAC classification rules
export const CLEARANCE_SCALE: Record<ClearanceLevel, number> = {
  'SOVEREIGN': 5,
  'SECRET': 4,
  'CONFIDENTIAL': 3,
  'RESTRICTED': 2,
  'UNCLASSIFIED': 1,
};

// ABAC Context request interfaces
export interface AccessSubject {
  username: string;
  role: UserRole;
  ministry?: string;
  region?: string;
  borderOutpost?: string;
  department?: string;
  clearance: ClearanceLevel;
}

export interface AccessResource {
  id: string;
  type: 'cargo' | 'checkpoint' | 'audit_log' | 'currency_wire' | 'crisis_action';
  ownerMinistry?: string;
  requiredClearance: ClearanceLevel;
  targetRegion?: string;
  targetBorderOutpost?: string;
}

export interface AccessEnvironment {
  ipAddress: string;
  geolocationRegion: string;
  deviceVerified: boolean;
  mfaAuthenticated: boolean;
  riskScore: number; // 0 (Fully Trusted) to 100 (Critical Risk Warning)
}

export interface EvaluationResult {
  allowed: boolean;
  denialReason?: string;
  appliedPolicies: string[];
  evaluationTimestamp: string;
}

export class AccessControlEngine {
  private static instance: AccessControlEngine;

  public static getInstance(): AccessControlEngine {
    if (!AccessControlEngine.instance) {
      AccessControlEngine.instance = new AccessControlEngine();
    }
    return AccessControlEngine.instance;
  }

  /**
   * Evaluates if a subject has permission to access a specific resource in a given environment.
   * Concurrently processes standard RBAC filters and Attribute-Based Policy vectors (ABAC).
   */
  public evaluateAccess(
    subject: AccessSubject,
    permission: SecurityPermission,
    resource: AccessResource,
    environment: AccessEnvironment
  ): EvaluationResult {
    const timestamp = new Date().toISOString();
    const appliedPolicies: string[] = ['RBAC_ROLE_VALIDATION'];

    // 1. RBAC Check: Ensure user role is in the matrix with defined target permission
    const grantedPermissions = RBAC_ROLE_MATRIX[subject.role];
    if (!grantedPermissions || !grantedPermissions.includes(permission)) {
      return {
        allowed: false,
        denialReason: `RBAC Violation: Role [${subject.role}] does not hold permission [${permission}].`,
        appliedPolicies,
        evaluationTimestamp: timestamp,
      };
    }

    // 2. ABAC: Zero-Trust Environmental Checks
    appliedPolicies.push('ZERO_TRUST_ENVIRONMENT_POLICY');
    if (!environment.deviceVerified) {
      return {
        allowed: false,
        denialReason: 'ABAC Denial: Access attempted from unverified hardware signature.',
        appliedPolicies,
        evaluationTimestamp: timestamp,
      };
    }

    if (environment.riskScore > 80) {
      return {
        allowed: false,
        denialReason: `ABAC Denial: High-Risk Threshold Exceeded (Device risk: ${environment.riskScore}%). Axis locked.`,
        appliedPolicies,
        evaluationTimestamp: timestamp,
      };
    }

    // 3. ABAC: Clearance Level Policy (Hierarchy Constraint)
    appliedPolicies.push('CLASSIFICATION_LEVEL_POLICY');
    const userClearanceWeight = CLEARANCE_SCALE[subject.clearance];
    const resourceClearanceWeight = CLEARANCE_SCALE[resource.requiredClearance];
    if (userClearanceWeight < resourceClearanceWeight) {
      return {
        allowed: false,
        denialReason: `ABAC Denial: Insufficient security clearance level. Subject of level [${subject.clearance}] cannot access resource with classification [${resource.requiredClearance}].`,
        appliedPolicies,
        evaluationTimestamp: timestamp,
      };
    }

    // 4. ABAC: Ministry / Department Alignment Policy (Domain Interlock)
    // EXCEPTION: Super Administrators may cross-cut ministries for sovereign emergency controls
    if (subject.role !== 'Super Administrator' && subject.role !== 'National Administrator') {
      if (resource.ownerMinistry) {
        appliedPolicies.push('MINISTERIAL_ISOLATION_POLICY');
        if (!subject.ministry || subject.ministry.toLowerCase() !== resource.ownerMinistry.toLowerCase()) {
          return {
            allowed: false,
            denialReason: `ABAC Denial: Cabinet Isolation Violation. Subject affiliated with [${subject.ministry || 'N/A'}] cannot modify asset belonging to [${resource.ownerMinistry}].`,
            appliedPolicies,
            evaluationTimestamp: timestamp,
          };
        }
      }
    }

    // 5. ABAC: Regional boundary policy
    if (subject.role === 'Border Officer' && resource.targetBorderOutpost) {
      appliedPolicies.push('GEOGRAPHIC_OUTPOST_BOUNDARY_POLICY');
      if (subject.borderOutpost !== resource.targetBorderOutpost) {
        return {
          allowed: false,
          denialReason: `ABAC Denial: Outpost Bound Lock. Officer assigned to [${subject.borderOutpost}] is blocked from clearance actions at [${resource.targetBorderOutpost}].`,
          appliedPolicies,
          evaluationTimestamp: timestamp,
        };
      }
    }

    // 6. ABAC: Regional jurisdiction validation
    if (subject.role === 'Organization Manager' && resource.targetRegion) {
      appliedPolicies.push('REGIONAL_JURISDICTION_POLICY');
      if (subject.region !== resource.targetRegion) {
        return {
          allowed: false,
          denialReason: `ABAC Denial: Regional Jurisdiction Exclusion. Managed resource region [${resource.targetRegion}] does not match subject region [${subject.region}].`,
          appliedPolicies,
          evaluationTimestamp: timestamp,
        };
      }
    }

    // All controls passed, grant secure entrance parameters
    return {
      allowed: true,
      appliedPolicies,
      evaluationTimestamp: timestamp,
    };
  }
}
