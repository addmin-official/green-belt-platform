import { IdentityLifecycleEngine } from '../identity/IdentityLifecycleEngine';
import { IdentityRegistry } from '../identity/IdentityRegistry';
import { DigitalIdentity, LifecycleEvent } from '../identity/IdentityTypes';

export class EmployeeLifecycleEngine {
  /**
   * Executive Hire Command
   */
  public static hireEmployee(
    id: string,
    nationalId: string,
    fullName: string,
    email: string,
    org: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS',
    role: string,
    clearance: 'unclassified' | 'confidential' | 'secret' | 'top-secret',
    operator: string
  ): LifecycleEvent {
    const newIdentity: DigitalIdentity = {
      id,
      nationalId,
      fullName,
      email,
      organization: org,
      directorate: org === 'FEDERAL_IRAQ' ? 'General Directorate' : org === 'KRG' ? 'Regional Directorate' : 'Joint Affairs Office',
      department: 'Operations Section',
      unit: 'Sub-unit Alpha',
      position: role,
      grade: 'Grade-4',
      clearanceLevel: clearance,
      biometricStatus: 'verified',
      role,
      status: 'active',
      deviceTrusted: true,
    };

    IdentityRegistry.registerIdentity(newIdentity);

    return IdentityLifecycleEngine.executeLifecycleAction(
      id,
      'hire',
      'UNEMPLOYED',
      `${org}::${role}`,
      operator
    );
  }

  /**
   * Executive Transfer Command
   */
  public static transferEmployee(employeeId: string, targetOrg: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS', targetRole: string, operator: string): LifecycleEvent {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) throw new Error(`Staff member ${employeeId} unrecognized.`);

    const preState = `${identity.organization}::${identity.role}`;
    return IdentityLifecycleEngine.executeLifecycleAction(
      employeeId,
      'transfer',
      preState,
      `${targetOrg}::${targetRole}`,
      operator
    );
  }

  /**
   * Executive Promotion Command
   */
  public static promoteEmployee(employeeId: string, targetGrade: string, targetRole: string, operator: string): LifecycleEvent {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) throw new Error(`Staff member ${employeeId} unrecognized.`);

    const preState = `${identity.grade}::${identity.role}`;
    IdentityRegistry.updateIdentity(employeeId, { grade: targetGrade, role: targetRole });

    return IdentityLifecycleEngine.executeLifecycleAction(
      employeeId,
      'promote',
      preState,
      `${targetGrade}::${targetRole}`,
      operator
    );
  }

  /**
   * Executive Suspension Command
   */
  public static suspendEmployee(employeeId: string, reason: string, operator: string): LifecycleEvent {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) throw new Error(`Staff member ${employeeId} unrecognized.`);

    return IdentityLifecycleEngine.executeLifecycleAction(
      employeeId,
      'suspend',
      identity.status,
      `suspended::${reason}`,
      operator
    );
  }

  /**
   * Executive Termination Command
   */
  public static terminateEmployee(employeeId: string, reason: string, operator: string): LifecycleEvent {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) throw new Error(`Staff member ${employeeId} unrecognized.`);

    return IdentityLifecycleEngine.executeLifecycleAction(
      employeeId,
      'terminate',
      identity.status,
      `terminated::${reason}`,
      operator
    );
  }

  /**
   * Executive Retirement Command
   */
  public static retireEmployee(employeeId: string, operator: string): LifecycleEvent {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) throw new Error(`Staff member ${employeeId} unrecognized.`);

    return IdentityLifecycleEngine.executeLifecycleAction(
      employeeId,
      'retire',
      identity.status,
      'retired',
      operator
    );
  }

  /**
   * Executive Reassignment Command
   */
  public static reassignEmployee(employeeId: string, department: string, unit: string, operator: string): LifecycleEvent {
    const identity = IdentityRegistry.getById(employeeId);
    if (!identity) throw new Error(`Staff member ${employeeId} unrecognized.`);

    const preState = `${identity.department}::${identity.unit}`;
    IdentityRegistry.updateIdentity(employeeId, { department, unit });

    return IdentityLifecycleEngine.executeLifecycleAction(
      employeeId,
      'reassign',
      preState,
      `${department}::${unit}`,
      operator
    );
  }
}
