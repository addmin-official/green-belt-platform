import { Jurisdiction } from './AuditTypes';

export interface BehaviorScore {
  subjectId: string;
  subjectName: string;
  roleType: 'OFFICER' | 'TRADER';
  clearanceSpeedMinutes: number;
  averageOverrideRatePercent: number;
  unusualShiftActivityScore: number; // 0-100
  overallRiskRating: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export class BehaviorAnalysisEngine {
  public static getBehaviorScores(jurisdiction: Jurisdiction): BehaviorScore[] {
    if (jurisdiction === 'federal') {
      return [
        {
          subjectId: 'FED-OFF-912',
          subjectName: 'Noori Kamal',
          roleType: 'OFFICER',
          clearanceSpeedMinutes: 4.2, // abnormally fast (average is 30 mins)
          averageOverrideRatePercent: 82.0,
          unusualShiftActivityScore: 92,
          overallRiskRating: 'CRITICAL'
        },
        {
          subjectId: 'TRD-904',
          subjectName: 'Al-Rafidain Freight Corp',
          roleType: 'TRADER',
          clearanceSpeedMinutes: 12.0,
          averageOverrideRatePercent: 44.0,
          unusualShiftActivityScore: 60,
          overallRiskRating: 'HIGH'
        }
      ];
    } else {
      return [
        {
          subjectId: 'KRG-OFF-302',
          subjectName: 'Rekawt Bakir',
          roleType: 'OFFICER',
          clearanceSpeedMinutes: 3.8, // suspicious clearance pace
          averageOverrideRatePercent: 64.0,
          unusualShiftActivityScore: 88,
          overallRiskRating: 'CRITICAL'
        },
        {
          subjectId: 'TRD-EBI',
          subjectName: 'Zagros Logistics Erbil',
          roleType: 'TRADER',
          clearanceSpeedMinutes: 28.0,
          averageOverrideRatePercent: 12.0,
          unusualShiftActivityScore: 19,
          overallRiskRating: 'LOW'
        }
      ];
    }
  }
}
