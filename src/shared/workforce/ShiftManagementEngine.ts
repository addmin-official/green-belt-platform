export interface WorkShift {
  id: string;
  siteName: string; // Ibrahim Khalil, Umm Qasr, Baghdad Cent.
  shiftName: 'Day' | 'Night' | 'Emergency-Standby';
  officerCount: number;
  supervisorName: string;
  readinessRating: 'OPTIMAL' | 'MESSY' | 'CRITICAL_SHORTAGE';
}

export const INITIAL_SHIFTS: WorkShift[] = [
  {
    id: 'SHIFT-1',
    siteName: 'Ibrahim Khalil Joint Gate',
    shiftName: 'Day',
    officerCount: 34,
    supervisorName: 'General Sherwan Kurdish',
    readinessRating: 'OPTIMAL',
  },
  {
    id: 'SHIFT-2',
    siteName: 'Umm Qasr Port',
    shiftName: 'Day',
    officerCount: 48,
    supervisorName: 'Ali Abdul-Hussein',
    readinessRating: 'OPTIMAL',
  },
  {
    id: 'SHIFT-3',
    siteName: 'Parvizkhan Border Crossing',
    shiftName: 'Night',
    officerCount: 12,
    supervisorName: 'Media Sulaiman',
    readinessRating: 'OPTIMAL',
  }
];

export class ShiftManagementEngine {
  private static shifts: WorkShift[] = [...INITIAL_SHIFTS];

  public static getShifts(): WorkShift[] {
    return this.shifts;
  }

  public static updateShiftStaffing(id: string, count: number): void {
    const shift = this.shifts.find(s => s.id === id);
    if (shift) {
      shift.officerCount = count;
      if (count < 10) shift.readinessRating = 'CRITICAL_SHORTAGE';
      else if (count < 20) shift.readinessRating = 'MESSY';
      else shift.readinessRating = 'OPTIMAL';
    }
  }

  public static reportReadinessSummary() {
    const optimal = this.shifts.filter(s => s.readinessRating === 'OPTIMAL').length;
    const messy = this.shifts.filter(s => s.readinessRating === 'MESSY').length;
    const critical = this.shifts.filter(s => s.readinessRating === 'CRITICAL_SHORTAGE').length;
    return {
      optimalCount: optimal,
      warningCount: messy,
      criticalCount: critical,
      totalCount: this.shifts.length
    };
  }
}
