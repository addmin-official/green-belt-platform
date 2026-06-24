import { IntelligenceSummary } from './NationalThreatTypes';
import { NationalIntelligenceRegistry } from './NationalIntelligenceRegistry';
import { SovereignThreatLedger } from './SovereignThreatLedger';

export class IntelligenceCollectionEngine {
  private static mockSign(title: string): string {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = (hash << 5) - hash + title.charCodeAt(i);
      hash |= 0;
    }
    return `SIG-INT-${Math.abs(hash).toString(16).toUpperCase()}`;
  }

  public static collectAndSummarize(params: {
    sourceAgency: 'FEDERAL_GIS' | 'KRG_SECURITY_SERVICE' | 'JOINT_ANALYSIS_CELL';
    classification: IntelligenceSummary['classification'];
    titleEn: string;
    titleKu: string;
    rawSensitiveData: any; // Raw sensitive data isn't distributed, only summarized
    summaryEn: string;
    summaryKu: string;
  }): IntelligenceSummary {
    const summaryId = `INT-SUM-${Math.floor(1000 + Math.random() * 9000)}`;
    const signatureHash = this.mockSign(params.titleEn);

    const summary: IntelligenceSummary = {
      summaryId,
      titleEn: params.titleEn,
      titleKu: params.titleKu,
      analyzedBy: params.sourceAgency,
      classification: params.classification,
      contentEn: params.summaryEn,
      contentKu: params.summaryKu,
      timestamp: new Date().toISOString(),
      signatureHash
    };

    NationalIntelligenceRegistry.addSummary(summary);
    SovereignThreatLedger.sealAndPublish('threat_event', {
      summaryId,
      agency: params.sourceAgency,
      classification: params.classification,
      signatureHash
    });

    return summary;
  }
}
