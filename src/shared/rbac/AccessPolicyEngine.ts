import { SovereignRole } from './RoleRegistry';

export class AccessPolicyEngine {
  /**
   * Enforces strict sovereign data boundaries:
   * - Federal users can NEVER access KRG records.
   * - KRG users can NEVER access Federal records.
   * - Joint users can only access approved reconciled views.
   */
  public static evaluateDataBoundary(
    userRole: SovereignRole,
    recordJurisdiction: 'federal' | 'krg' | 'joint'
  ): { authorized: boolean; reason: string } {
    const userOrg = userRole.targetOrganization;

    // Rule 1: Federal users cannot access KRG records
    if (userOrg === 'FEDERAL_IRAQ' && recordJurisdiction === 'krg') {
      return {
        authorized: false,
        reason: 'SOVEREIGN_BOUNDARY_VIOLATION: Federal operators are prohibited from accessing Kurdistan Region raw telemetry.'
      };
    }

    // Rule 2: KRG users cannot access Federal records
    if (userOrg === 'KRG' && recordJurisdiction === 'federal') {
      return {
        authorized: false,
        reason: 'SOVEREIGN_BOUNDARY_VIOLATION: KRG regional operators are prohibited from accessing Federal sovereign telemetry.'
      };
    }

    // Rule 3: Joint users can only access approved reconciled views (e.g., joint or explicitly authorized records)
    if (userOrg === 'JOINT_OPERATIONS' && recordJurisdiction !== 'joint') {
      return {
        authorized: false,
        reason: 'COUNCIL_POLICY_VIOLATION: Joint Operations operators only hold clearance for reconciled and shared datasets.'
      };
    }

    return {
      authorized: true,
      reason: 'SOVEREIGN_POLICY_COMPLIANCE: Access conforms to jurisdictional data boundaries.'
    };
  }
}
