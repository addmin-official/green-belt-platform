export interface BehavioralProfile {
  actorId: string;
  loginDivergenceRatio: number; // 0 to 1
  overridesInDay: number;
  unusualVolumeTransferredMb: number;
  behaviorRiskScore: number; // 0 to 100
}

export class BehavioralIntelligenceEngine {
  public static assessOperatorBehavior(operatorId: string, overrides: number, downloadedMb: number): BehavioralProfile {
    // Normal limits: overrides < 3/day, downloadedMb < 50MB/day
    const unusualVolumeTransferredMb = Math.max(0, downloadedMb - 50);
    const loginDivergenceRatio = overrides > 4 ? 0.75 : 0.25;

    let behaviorRiskScore = (overrides * 8) + (unusualVolumeTransferredMb * 0.4);
    if (behaviorRiskScore > 100) behaviorRiskScore = 100;

    return {
      actorId: operatorId,
      loginDivergenceRatio,
      overridesInDay: overrides,
      unusualVolumeTransferredMb,
      behaviorRiskScore: Math.round(behaviorRiskScore)
    };
  }
}
