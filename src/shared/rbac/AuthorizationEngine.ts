import { SovereignPermission } from './PermissionRegistry';
import { RoleRegistry } from './RoleRegistry';
import { AccessPolicyEngine } from './AccessPolicyEngine';

export class AuthorizationEngine {
  /**
   * Main gatekeeper checking permission and sovereign jurisdictional boundaries.
   */
  public static isAuthorized(
    userRoleName: string,
    requiredPermission: SovereignPermission,
    recordJurisdiction?: 'federal' | 'krg' | 'joint'
  ): { authorized: boolean; reason: string } {
    const role = RoleRegistry.getRole(userRoleName);
    if (!role) {
      return { authorized: false, reason: 'Security failure: Subject holds an unrecognized role descriptor.' };
    }

    // 1. Check permission matrix
    const hasPermission = role.allowedPermissions.includes(requiredPermission);
    if (!hasPermission) {
      return { 
        authorized: false, 
        reason: `MANDATORY_RBAC_FAILURE: Role [${userRoleName}] does not hold the required permission [${requiredPermission}].` 
      };
    }

    // 2. Check jurisdictional boundaries if a record is targeted
    if (recordJurisdiction) {
       return AccessPolicyEngine.evaluateDataBoundary(role, recordJurisdiction);
    }

    return { authorized: true, reason: 'AUTHORIZED: Role and organizational clearance verified.' };
  }
}
