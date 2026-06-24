import { IdentityRegistry } from '../identity/IdentityRegistry';
import { IdentityLifecycleEngine } from '../identity/IdentityLifecycleEngine';

export class RoleAssignmentEngine {
  /**
   * Securely assigns a sovereign role to a registered government employee
   */
  public static assignRole(employeeId: string, roleName: string, operator: string): void {
    const employee = IdentityRegistry.getById(employeeId);
    if (!employee) {
      throw new Error(`Sovereign Identity Registration missing for ${employeeId}.`);
    }

    const previousRole = employee.role;
    IdentityRegistry.updateIdentity(employeeId, { role: roleName });

    // Track state in the official Government Lifecycle logs
    IdentityLifecycleEngine.executeLifecycleAction(
      employeeId,
      'reassign',
      `ROLE[${previousRole}]`,
      `ROLE[${roleName}]`,
      operator
    );
  }
}
