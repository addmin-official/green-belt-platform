import { DigitalIdentity } from '../identity/IdentityTypes';
import { IdentityRegistry } from '../identity/IdentityRegistry';

export class WorkforceRegistry {
  /**
   * Returns employees assigned to a specific organization
   */
  public static getEmployeesByOrg(org: 'FEDERAL_IRAQ' | 'KRG' | 'JOINT_OPERATIONS'): DigitalIdentity[] {
    return IdentityRegistry.getAll().filter(emp => emp.organization === org);
  }

  /**
   * Filter employees based on operational capability roles
   */
  public static getBorderStaffing(): DigitalIdentity[] {
    return IdentityRegistry.getAll().filter(emp => 
      emp.role.includes('Border') || emp.directorate.includes('Border')
    );
  }

  public static getCustomsStaffing(): DigitalIdentity[] {
    return IdentityRegistry.getAll().filter(emp => 
      emp.role.includes('Customs') || emp.directorate.includes('Customs')
    );
  }

  public static getRevenueStaffing(): DigitalIdentity[] {
    return IdentityRegistry.getAll().filter(emp => 
      emp.role.includes('Revenue') || emp.directorate.includes('Revenue') || emp.department.includes('Revenue')
    );
  }

  public static getTradeStaffing(): DigitalIdentity[] {
    return IdentityRegistry.getAll().filter(emp => 
      emp.role.includes('Trade') || emp.directorate.includes('Trade')
    );
  }

  public static getInvestigationStaffing(): DigitalIdentity[] {
    return IdentityRegistry.getAll().filter(emp => 
      emp.role.includes('Investigator') || emp.role.includes('Auditor') || emp.directorate.includes('Integrity') || emp.directorate.includes('Audit')
    );
  }
}
