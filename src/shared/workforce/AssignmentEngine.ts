import { IdentityRegistry } from '../identity/IdentityRegistry';

export interface SiteAssignment {
  employeeId: string;
  fullName: string;
  siteName: string; // Ibrahim Khalil, Umm Qasr Port, etc.
  assignedRole: string;
  timestamp: string;
}

export const INITIAL_ASSIGNMENTS: SiteAssignment[] = [
  {
    employeeId: 'EMP-FED-003',
    fullName: 'General Ahmed Al-Abadi',
    siteName: 'Ibrahim Khalil Joint Gate',
    assignedRole: 'Border Command Liaison',
    timestamp: '2026-06-09T08:00:00Z',
  },
  {
    employeeId: 'EMP-KRG-003',
    fullName: 'General Sherwan Kurdish',
    siteName: 'Ibrahim Khalil Joint Gate',
    assignedRole: 'Northern Border Protection Chief',
    timestamp: '2026-06-09T08:00:00Z',
  },
  {
    employeeId: 'EMP-FED-004',
    fullName: 'Ali Abdul-Hussein',
    siteName: 'Umm Qasr Port',
    assignedRole: 'Customs Collector',
    timestamp: '2026-06-09T08:00:00Z',
  },
  {
    employeeId: 'EMP-KRG-004',
    fullName: 'Hiwa Rasool',
    siteName: 'Ibrahim Khalil Joint Gate',
    assignedRole: 'Customs Examiner',
    timestamp: '2026-06-09T08:00:00Z',
  }
];

export class AssignmentEngine {
  private static assignments: SiteAssignment[] = [...INITIAL_ASSIGNMENTS];

  public static getAssignments(): SiteAssignment[] {
    return this.assignments;
  }

  public static assignToSite(employeeId: string, siteName: string, assignedRole: string): SiteAssignment {
    const employee = IdentityRegistry.getById(employeeId);
    if (!employee) {
      throw new Error(`Employee ID ${employeeId} not found in Identity Registry.`);
    }

    const newAssignment: SiteAssignment = {
      employeeId,
      fullName: employee.fullName,
      siteName,
      assignedRole,
      timestamp: new Date().toISOString(),
    };

    // Remove old assignment if exists and push new
    this.assignments = this.assignments.filter(a => a.employeeId !== employeeId);
    this.assignments.push(newAssignment);

    return newAssignment;
  }

  public static getStaffBySite(siteName: string): SiteAssignment[] {
    return this.assignments.filter(a => a.siteName === siteName);
  }
}
