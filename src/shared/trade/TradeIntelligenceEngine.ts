import { TradeDeclaration, TradeIntelligenceRecord, Jurisdiction } from './TradeTypes';
import { ImportManagementEngine } from './ImportManagementEngine';
import { ExportManagementEngine } from './ExportManagementEngine';

export class TradeIntelligenceEngine {
  private static intelligenceIntel: TradeIntelligenceRecord[] = [
    {
      id: 'INTEL-001',
      headline: 'Heavy Petroleum Flow Mismatch Detected at Umm Qasr',
      category: 'FLOW_ANOMALY',
      severity: 'WARNING',
      details: 'Declared marine exports of diesel fuel mismatch Turkish port unlading logs by approximately 15% in mass. Investigating possible off-shore transshipment.',
      detectedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      sourceEnclave: 'Federal Port Customs Node 2',
      confidence: 94
    },
    {
      id: 'INTEL-002',
      headline: 'Under-declared Agricultural Transit Patterns on Khabur Route',
      category: 'TARIFF_EVASION',
      severity: 'CRITICAL',
      details: 'Recurring declarations of Durum Wheat below regional baseline prices detected. Subject entities flags: Sadr Logistics, Anatolia Black Sea Cargo.',
      detectedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      sourceEnclave: 'KRG Border Intelligence Desk',
      confidence: 88
    },
    {
      id: 'INTEL-003',
      headline: 'Unmonitored Dual-Use Heavy UAV Rotors Flight Plan Tracked',
      category: 'SMUGGLING_ALERT',
      severity: 'CRITICAL',
      details: 'UAV Survey drone components shipped via cargo flights triggered signature match on ABAC security ruleset for restricted payload equipment.',
      detectedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      sourceEnclave: 'Baghdad Airport Signal Bureau',
      confidence: 97
    }
  ];

  public static getIntelligenceList(jurisdiction: Jurisdiction): TradeIntelligenceRecord[] {
    if (jurisdiction === 'federal') {
      return this.intelligenceIntel.filter(intel => intel.sourceEnclave.toLowerCase().includes('federal') || intel.sourceEnclave.toLowerCase().includes('baghdad'));
    } else if (jurisdiction === 'krg') {
      return this.intelligenceIntel.filter(intel => intel.sourceEnclave.toLowerCase().includes('krg') || intel.sourceEnclave.toLowerCase().includes('khabur') || intel.sourceEnclave.toLowerCase().includes('erbil'));
    } else {
      return [...this.intelligenceIntel];
    }
  }

  public static addIntelRecord(record: Omit<TradeIntelligenceRecord, 'id' | 'detectedAt'>): TradeIntelligenceRecord {
    const id = `INTEL-${Math.floor(100 + Math.random() * 899)}`;
    const newRecord: TradeIntelligenceRecord = {
      id,
      detectedAt: new Date().toISOString(),
      ...record
    };
    this.intelligenceIntel.unshift(newRecord);
    return newRecord;
  }

  /**
   * Safe aggregated trade analytics that respect sovereignty:
   * Only returns sums, counts, and statistical profiles, NO RAW RECORDS!
   */
  public static calculateAggregatedAnalytics(jurisdiction: Jurisdiction | 'all') {
    const imports = jurisdiction === 'all' 
      ? [...ImportManagementEngine.getDeclarationsByJurisdiction('federal'), ...ImportManagementEngine.getDeclarationsByJurisdiction('krg')]
      : ImportManagementEngine.getDeclarationsByJurisdiction(jurisdiction);

    const exports = jurisdiction === 'all' 
      ? [...ExportManagementEngine.getDeclarationsByJurisdiction('federal'), ...ExportManagementEngine.getDeclarationsByJurisdiction('krg')]
      : ExportManagementEngine.getDeclarationsByJurisdiction(jurisdiction);

    const totalImportsValue = imports.reduce((sum, d) => sum + d.declaredValueUSD, 0);
    const totalExportsValue = exports.reduce((sum, d) => sum + d.declaredValueUSD, 0);
    const totalImportsWeight = imports.reduce((sum, d) => sum + d.weightTons, 0);
    const totalExportsWeight = exports.reduce((sum, d) => sum + d.weightTons, 0);

    // Commodity break-down (aggregated)
    const commodityAggregation: Record<string, { value: number; weight: number; count: number; category: string }> = {};
    [...imports, ...exports].forEach(d => {
      const key = d.commodity.name;
      if (!commodityAggregation[key]) {
        commodityAggregation[key] = { value: 0, weight: 0, count: 0, category: d.commodity.category };
      }
      commodityAggregation[key].value += d.declaredValueUSD;
      commodityAggregation[key].weight += d.weightTons;
      commodityAggregation[key].count += 1;
    });

    // Corridor break-down (aggregated)
    const corridorAggregation: Record<string, { value: number; weight: number; count: number }> = {};
    [...imports, ...exports].forEach(d => {
      const key = d.corridorId;
      if (!corridorAggregation[key]) {
        corridorAggregation[key] = { value: 0, weight: 0, count: 0 };
      }
      corridorAggregation[key].value += d.declaredValueUSD;
      corridorAggregation[key].weight += d.weightTons;
      corridorAggregation[key].count += 1;
    });

    // Partner break-down (aggregated)
    const partnerAggregation: Record<string, { value: number; count: number }> = {};
    [...imports, ...exports].forEach(d => {
      const key = d.partnerName;
      if (!partnerAggregation[key]) {
        partnerAggregation[key] = { value: 0, count: 0 };
      }
      partnerAggregation[key].value += d.declaredValueUSD;
      partnerAggregation[key].count += 1;
    });

    // Anomaly detection scanning
    const anomalies: string[] = [];
    imports.forEach(imp => {
      if (imp.riskScore > 75) {
        anomalies.push(`ALERT: High potential risk scanned on import ${imp.id} via ${imp.corridorId}. Risk Score: ${imp.riskScore}%.`);
      }
      if (imp.complianceScore < 60) {
        anomalies.push(`ALERT: Compliance alarm tripped on import ${imp.id} involving ${imp.partnerName}. Compliance Score: ${imp.complianceScore}%.`);
      }
    });
    exports.forEach(exp => {
      if (exp.riskScore > 75) {
        anomalies.push(`ALERT: Strategic export warning scanned on export ${exp.id} to ${exp.partnerName}. Risk Score: ${exp.riskScore}%.`);
      }
    });

    return {
      totalImportsValue,
      totalExportsValue,
      totalImportsWeight,
      totalExportsWeight,
      totalTradeValue: totalImportsValue + totalExportsValue,
      totalTradeWeight: totalImportsWeight + totalExportsWeight,
      importCount: imports.length,
      exportCount: exports.length,
      totalCount: imports.length + exports.length,
      commodityBreakdown: Object.entries(commodityAggregation).map(([name, data]) => ({ name, ...data })),
      corridorBreakdown: Object.entries(corridorAggregation).map(([id, data]) => ({ id, ...data })),
      partnerBreakdown: Object.entries(partnerAggregation).map(([name, data]) => ({ name, ...data })),
      anomalies
    };
  }
}
