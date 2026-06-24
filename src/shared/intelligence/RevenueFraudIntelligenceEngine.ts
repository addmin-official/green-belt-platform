import { ThreatEvent } from './NationalThreatTypes';

export class RevenueFraudIntelligenceEngine {
  public static scanTaxImbalances(records: Array<{
    taxId: string;
    reportedRevenueKuD: number;
    estimatedImportsKuD: number;
    declaredCustomsDutyKuD: number;
  }>): ThreatEvent[] {
    const threats: ThreatEvent[] = [];

    records.forEach(rec => {
      const estimatedMinimumDuty = rec.estimatedImportsKuD * 0.08;
      if (rec.declaredCustomsDutyKuD < estimatedMinimumDuty * 0.4) {
        threats.push({
          id: `TE-REV-FRAUD-${rec.taxId}`,
          sourceDomain: 'revenue',
          jurisdiction: 'federal',
          titleEn: "Vast Imbalance in Declared Customs Duties",
          titleKu: "ناتەبایی گەورە لە بەهای گومرگ و داهاتی تۆمارکراو",
          descriptionEn: `Importer ${rec.taxId} declared customs duty of ${rec.declaredCustomsDutyKuD} KuD, which is excessively lower than estimated ${estimatedMinimumDuty} KuD based on imports.`,
          descriptionKu: `کۆمپانیای بازرگانی بە ناسنامەی باج ${rec.taxId} بەهای گومرگی ${rec.declaredCustomsDutyKuD} دینار راگەیاندووە کە بە شێوەیەکی فێڵکارانە نزمە بە بەراورد بە هاوردەکردنی بەهای ${rec.estimatedImportsKuD} دینار.`,
          indicatorWeight: 65,
          timestamp: new Date().toISOString(),
          sealedHash: 'REVENUE_AUTO_SEAL',
          associatedEntities: [rec.taxId]
        });
      }
    });

    return threats;
  }
}
