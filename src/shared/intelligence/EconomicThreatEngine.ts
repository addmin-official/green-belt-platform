import { ThreatEvent } from './NationalThreatTypes';

export class EconomicThreatEngine {
  public static assessEconomicSecurity(indicators: {
    currencyCapitalFlightRatePercent: number;
    unlicensedBasicCommoditiesDumpingPercent: number;
    subsidySiphonRatePercent: number;
  }): ThreatEvent[] {
    const threats: ThreatEvent[] = [];

    if (indicators.currencyCapitalFlightRatePercent > 20) {
      threats.push({
        id: `TE-Econ-Flight`,
        sourceDomain: 'trade',
        jurisdiction: 'federal',
        titleEn: "Macroeconomic Capital De-stabilization",
        titleKu: "مەترسی ناڕێکی دارایی و چوونەدەرەوەی سەرمایەی نەختینەیی",
        descriptionEn: `Significant outflow rate detected: ${indicators.currencyCapitalFlightRatePercent}% decrease in local financial asset reserve velocity.`,
        descriptionKu: `مەترسی بەرزبوونەوەی رێژەی چوونەدەرەوەی سەرمایە بە رێژەی یەکلاکەرەوەی %${indicators.currencyCapitalFlightRatePercent} لە فۆرمی دراوی دەرەکی.`,
        indicatorWeight: 60,
        timestamp: new Date().toISOString(),
        sealedHash: 'STL_AUTO_SEAL',
        associatedEntities: ['ECONOMIC_SEC_DEPT']
      });
    }

    return threats;
  }
}
