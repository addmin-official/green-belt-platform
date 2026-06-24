import { NationalIntelligenceRegistry } from '../intelligence/NationalIntelligenceRegistry';
import { ThreatEvent } from '../intelligence/NationalThreatTypes';
import { SovereignThreatLedger } from '../intelligence/SovereignThreatLedger';

export interface JointThreatResolution {
  reconciliationId: string;
  associatedThreatIds: string[];
  resolvedActionKu: string;
  agreedByParties: string[];
  reconciledStatus: 'pending' | 'sealed';
  timestamp: string;
}

export class JointThreatReconciliationEngine {
  private static resolutions: JointThreatResolution[] = [];

  static {
    // Baseline seed
    this.resolutions.push({
      reconciliationId: "RECON-ST-001",
      associatedThreatIds: ["TE-FED-201", "TE-KRG-202"],
      resolvedActionKu: "ڕێککەوتنی گومرگی لە نێوان کەرتی دارایی فیدراڵ و نیشتمانی هەرێم بۆ باشترکردنی بڕینی باج",
      agreedByParties: ["حکومەتی فیدراڵ", "حکومەتی هەرێم"],
      reconciledStatus: "sealed",
      timestamp: new Date().toISOString()
    });
  }

  public static reconcileOverlappingThreats(threatIds: string[], resolvedActionKu: string, operator: string): JointThreatResolution {
    const reconciliationId = `RECON-${Math.floor(100 + Math.random() * 900)}`;
    const resolution: JointThreatResolution = {
      reconciliationId,
      associatedThreatIds: threatIds,
      resolvedActionKu,
      agreedByParties: ["FEDERAL_IRAQ", "KRG"],
      reconciledStatus: 'sealed',
      timestamp: new Date().toISOString()
    };

    this.resolutions.push(resolution);

    // Seal reconciliation in immutable threat ledger
    SovereignThreatLedger.sealAndPublish('reconciliation', {
      reconciliationId,
      threatIds,
      resolvedActionKu,
      sealedBy: operator
    });

    return resolution;
  }

  public static getResolutions(): JointThreatResolution[] {
    return [...this.resolutions];
  }
}
