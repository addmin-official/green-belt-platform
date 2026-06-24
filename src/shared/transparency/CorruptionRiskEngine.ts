import { Jurisdiction } from './AuditTypes';

export interface CorruptionIndex {
  elementId: string;
  elementName: string;
  discretionaryPowerRating: number; // 0-100
  automatedAuditCoveragePercent: number; // 0-100
  bypassesRecordedCount: number;
  briberyRiskScore: number; // 0-100
}

export class CorruptionRiskEngine {
  public static assessGateCorruptionRisks(jurisdiction: Jurisdiction): CorruptionIndex[] {
    if (jurisdiction === 'federal') {
      return [
        {
          elementId: 'GATE-UQ-SOUTH',
          elementName: 'Umm Qasr South Sea Terminal Entry',
          discretionaryPowerRating: 88, // Very high human override capacity
          automatedAuditCoveragePercent: 42, // Under-automated
          bypassesRecordedCount: 41,
          briberyRiskScore: 84
        },
        {
          elementId: 'GATE-BG-AIR',
          elementName: 'Baghdad Air Cargo Complex Gate A',
          discretionaryPowerRating: 45,
          automatedAuditCoveragePercent: 85,
          bypassesRecordedCount: 4,
          briberyRiskScore: 32
        }
      ];
    } else {
      return [
        {
          elementId: 'GATE-IK-MAIN',
          elementName: 'Ibrahim Khalil Main Cargo Lane 1',
          discretionaryPowerRating: 92,
          automatedAuditCoveragePercent: 50,
          bypassesRecordedCount: 38,
          briberyRiskScore: 81
        },
        {
          elementId: 'GATE-HO-PASS',
          elementName: 'Haji Omeran Transit Lane 3',
          discretionaryPowerRating: 70,
          automatedAuditCoveragePercent: 60,
          bypassesRecordedCount: 18,
          briberyRiskScore: 68
        }
      ];
    }
  }
}
