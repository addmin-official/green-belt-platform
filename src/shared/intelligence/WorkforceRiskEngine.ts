import { IdentityRegistry } from '../identity/IdentityRegistry';

export interface UnitRiskRating {
  division: string;
  totalOfficers: number;
  unverifiedDevicesRatio: number; // 0 to 1
  averageRiskIndex: number; // 0 to 100
  needsImmediateAudit: boolean;
}

export class WorkforceRiskEngine {
  public static calculateSubdivisionRisks(): UnitRiskRating[] {
    const allEmployees = IdentityRegistry.getAll();
    const divisions = ['Federal Border Guard Command', 'KRG Border Security Command', 'Sovereign Customs Command', 'Federal Revenue Department'];
    
    return divisions.map(div => {
      const classStaff = allEmployees.filter(e => e.directorate === div || e.department === div);
      if (classStaff.length === 0) {
        return {
          division: div,
          totalOfficers: 0,
          unverifiedDevicesRatio: 0,
          averageRiskIndex: 10,
          needsImmediateAudit: false
        };
      }

      const untrustedCount = classStaff.filter(e => !e.deviceTrusted).length;
      const suspendedCount = classStaff.filter(e => e.status !== 'active').length;
      
      const ratio = untrustedCount / classStaff.length;
      let rawRisk = ratio * 60 + (suspendedCount * 25);
      if (rawRisk > 100) rawRisk = 100;

      return {
        division: div,
        totalOfficers: classStaff.length,
        unverifiedDevicesRatio: parseFloat(ratio.toFixed(2)),
        averageRiskIndex: Math.round(rawRisk),
        needsImmediateAudit: rawRisk > 45
      };
    });
  }
}
