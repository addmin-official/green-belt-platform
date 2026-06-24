import { SovereignPermission } from './PermissionRegistry';

export interface SovereignRole {
  roleName: string;
  allowedPermissions: SovereignPermission[];
  targetOrganization: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS';
}

export const SOVEREIGN_ROLE_MAP: Record<string, SovereignRole> = {
  // --- FEDERAL JURISDICTION ---
  'Federal Prime Minister': {
    roleName: 'Federal Prime Minister',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_CUSTOMS,
      SovereignPermission.WRITE_FEDERAL_CUSTOMS,
      SovereignPermission.APPROVE_FEDERAL_CUSTOMS,
      SovereignPermission.VIEW_FEDERAL_REVENUE,
      SovereignPermission.WRITE_FEDERAL_REVENUE,
      SovereignPermission.VIEW_FEDERAL_TRADE,
      SovereignPermission.WRITE_FEDERAL_TRADE,
      SovereignPermission.DECREE_ISSUANCE,
      SovereignPermission.WORKFORCE_HIRE_TRANSFER,
      SovereignPermission.SECURITY_INTEGRITY_VIEW,
      SovereignPermission.PERFORM_SOVEREIGN_AUDIT
    ]
  },
  'Federal Cabinet': {
    roleName: 'Federal Cabinet',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_CUSTOMS,
      SovereignPermission.VIEW_FEDERAL_REVENUE,
      SovereignPermission.VIEW_FEDERAL_TRADE,
      SovereignPermission.DECREE_ISSUANCE,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  },
  'Federal Border Director': {
    roleName: 'Federal Border Director',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_CUSTOMS,
      SovereignPermission.WRITE_FEDERAL_CUSTOMS,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  },
  'Federal Customs Director': {
    roleName: 'Federal Customs Director',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_CUSTOMS,
      SovereignPermission.WRITE_FEDERAL_CUSTOMS,
      SovereignPermission.APPROVE_FEDERAL_CUSTOMS
    ]
  },
  'Federal Revenue Director': {
    roleName: 'Federal Revenue Director',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_REVENUE,
      SovereignPermission.WRITE_FEDERAL_REVENUE
    ]
  },
  'Federal Trade Director': {
    roleName: 'Federal Trade Director',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_TRADE,
      SovereignPermission.WRITE_FEDERAL_TRADE
    ]
  },
  'Federal Auditor': {
    roleName: 'Federal Auditor',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_CUSTOMS,
      SovereignPermission.VIEW_FEDERAL_REVENUE,
      SovereignPermission.PERFORM_SOVEREIGN_AUDIT
    ]
  },
  'Federal Investigator': {
    roleName: 'Federal Investigator',
    targetOrganization: 'FEDERAL_IRAQ',
    allowedPermissions: [
      SovereignPermission.VIEW_FEDERAL_CUSTOMS,
      SovereignPermission.INITIATE_INVESTIGATION,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  },

  // --- KRG JURISDICTION ---
  'KRG Prime Minister': {
    roleName: 'KRG Prime Minister',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_CUSTOMS,
      SovereignPermission.WRITE_KRG_CUSTOMS,
      SovereignPermission.APPROVE_KRG_CUSTOMS,
      SovereignPermission.VIEW_KRG_REVENUE,
      SovereignPermission.WRITE_KRG_REVENUE,
      SovereignPermission.VIEW_KRG_TRADE,
      SovereignPermission.WRITE_KRG_TRADE,
      SovereignPermission.DECREE_ISSUANCE,
      SovereignPermission.WORKFORCE_HIRE_TRANSFER,
      SovereignPermission.SECURITY_INTEGRITY_VIEW,
      SovereignPermission.PERFORM_SOVEREIGN_AUDIT
    ]
  },
  'KRG Cabinet': {
    roleName: 'KRG Cabinet',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_CUSTOMS,
      SovereignPermission.VIEW_KRG_REVENUE,
      SovereignPermission.VIEW_KRG_TRADE,
      SovereignPermission.DECREE_ISSUANCE,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  },
  'KRG Border Director': {
    roleName: 'KRG Border Director',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_CUSTOMS,
      SovereignPermission.WRITE_KRG_CUSTOMS,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  },
  'KRG Customs Director': {
    roleName: 'KRG Customs Director',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_CUSTOMS,
      SovereignPermission.WRITE_KRG_CUSTOMS,
      SovereignPermission.APPROVE_KRG_CUSTOMS
    ]
  },
  'KRG Revenue Director': {
    roleName: 'KRG Revenue Director',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_REVENUE,
      SovereignPermission.WRITE_KRG_REVENUE
    ]
  },
  'KRG Trade Director': {
    roleName: 'KRG Trade Director',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_TRADE,
      SovereignPermission.WRITE_KRG_TRADE
    ]
  },
  'KRG Auditor': {
    roleName: 'KRG Auditor',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_CUSTOMS,
      SovereignPermission.VIEW_KRG_REVENUE,
      SovereignPermission.PERFORM_SOVEREIGN_AUDIT
    ]
  },
  'KRG Investigator': {
    roleName: 'KRG Investigator',
    targetOrganization: 'KRG',
    allowedPermissions: [
      SovereignPermission.VIEW_KRG_CUSTOMS,
      SovereignPermission.INITIATE_INVESTIGATION,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  },

  // --- JOINT JURISDICTION ---
  'Joint Coordinator': {
    roleName: 'Joint Coordinator',
    targetOrganization: 'JOINT_OPERATIONS',
    allowedPermissions: [
      SovereignPermission.VIEW_JOINT_DATA,
      SovereignPermission.RECONCILE_JOINT_DATA,
      SovereignPermission.SECURITY_INTEGRITY_VIEW,
      SovereignPermission.PERFORM_SOVEREIGN_AUDIT,
      SovereignPermission.WORKFORCE_HIRE_TRANSFER
    ]
  },
  'Joint Revenue Board': {
    roleName: 'Joint Revenue Board',
    targetOrganization: 'JOINT_OPERATIONS',
    allowedPermissions: [
      SovereignPermission.VIEW_JOINT_DATA,
      SovereignPermission.RECONCILE_JOINT_DATA
    ]
  },
  'Joint Border Committee': {
    roleName: 'Joint Border Committee',
    targetOrganization: 'JOINT_OPERATIONS',
    allowedPermissions: [
      SovereignPermission.VIEW_JOINT_DATA,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  },
  'Joint Trade Committee': {
    roleName: 'Joint Trade Committee',
    targetOrganization: 'JOINT_OPERATIONS',
    allowedPermissions: [
      SovereignPermission.VIEW_JOINT_DATA,
      SovereignPermission.RECONCILE_JOINT_DATA
    ]
  },
  'Joint Integrity Committee': {
    roleName: 'Joint Integrity Committee',
    targetOrganization: 'JOINT_OPERATIONS',
    allowedPermissions: [
      SovereignPermission.VIEW_JOINT_DATA,
      SovereignPermission.PERFORM_SOVEREIGN_AUDIT,
      SovereignPermission.INITIATE_INVESTIGATION,
      SovereignPermission.SECURITY_INTEGRITY_VIEW
    ]
  }
};

export class RoleRegistry {
  public static getRole(name: string): SovereignRole | undefined {
    return SOVEREIGN_ROLE_MAP[name];
  }

  public static getPermissionsForRole(name: string): SovereignPermission[] {
    const role = this.getRole(name);
    return role ? role.allowedPermissions : [];
  }
}
