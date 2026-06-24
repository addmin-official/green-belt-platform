import { ThreatEvent } from './NationalThreatTypes';

export class InsiderThreatEngine {
  public static analyzeDeviceViolations(logs: Array<{
    operatorId: string;
    operatorName: string;
    jurisdiction: 'federal' | 'krg' | 'joint';
    failedVerifications: number;
    untrustedDeviceUsed: boolean;
  }>): ThreatEvent[] {
    const threats: ThreatEvent[] = [];

    logs.forEach(log => {
      if (log.untrustedDeviceUsed && log.failedVerifications > 3) {
        threats.push({
          id: `TE-INSIDER-${log.operatorId}`,
          sourceDomain: 'integrity',
          jurisdiction: log.jurisdiction,
          titleEn: "Potential Insider Administrative Misuse",
          titleKu: "مەترسی خراپ بەکارهێنانی کارگێڕی (Insider Risk)",
          descriptionEn: `Employee ${log.operatorName} (${log.operatorId}) attempted ${log.failedVerifications} critical system modifications from an unverified, non-trusted network device.`,
          descriptionKu: `فەرمانبەر ${log.operatorName} بە کۆدی کارمەند ${log.operatorId} زیاتر لە ${log.failedVerifications} جار هەوڵی گۆڕینی دەیتا و مۆڵەتەکانی داوە لە رێگەی ئامێرێکی نەناسراو و بێ بڕوانامە.`,
          indicatorWeight: 75,
          timestamp: new Date().toISOString(),
          sealedHash: 'INSIDER_AUTO_SEAL',
          associatedEntities: [log.operatorId]
        });
      }
    });

    return threats;
  }
}
