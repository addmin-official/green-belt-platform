import { BorderInspectionRecord, BorderGate } from './BorderTypes';
import { BorderGateRegistry } from './BorderGateRegistry';
import { BorderAuditEngine } from './BorderAuditEngine';

export class BorderInspectionEngine {
  private static inspections: BorderInspectionRecord[] = [
    {
      id: 'INSP-XRAY-29318',
      gateId: 'BG-IBRAHIMKHALIL',
      trafficRecordId: 'TRF-VEH-82172',
      timestamp: '2026-06-09T08:25:00Z',
      inspectorName: '| عەمید ڕێبین هادی',
      inspectionType: 'XRAY',
      complianceStatus: 'COMPLIANT',
      fineImposedUSD: 0,
      notes: '| پشکنینی تیشکی کارگۆ تەواو بوو. هیچ کێشەیەک یان لادان لە مانیفێست تۆمار نەکرا.',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Federal-Region Border Operations Committee',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT'
    },
    {
      id: 'INSP-MAN-48192',
      gateId: 'BG-UMMQASR',
      trafficRecordId: 'TRF-CAR-90812',
      timestamp: '2026-06-09T07:45:00Z',
      inspectorName: '| موقەدەم عومەر فاروق',
      inspectionType: 'MANUAL',
      complianceStatus: 'SUSPICIOUS',
      fineImposedUSD: 8500,
      notes: '| لادان لە کێشی مانیفێست دۆزرایەوە (زیادبوونی ١٢.٤ تۆن). غەرامە سەپێندرا و مۆڵەتەکە ڕاگیرا تا چارەسەر دەبێت.',
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Basra',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-5-SECURE'
    },
    {
      id: 'INSP-BIO-10823',
      gateId: 'BG-ERBIL-AIRPORT',
      trafficRecordId: 'TRF-PSG-94812',
      timestamp: '2026-06-09T09:12:00Z',
      inspectorName: '| ملازم هاوڕێ نەبەز',
      inspectionType: 'BIOMETRIC',
      complianceStatus: 'COMPLIANT',
      fineImposedUSD: 0,
      notes: '| ساتی چوونە ژوورەوەی گەشتیار بە بێ کێشە لە تاقیکردنەوەی چاو و ناسنامە تێپەڕی.',
      jurisdiction: 'KRG',
      ownership: 'KRG',
      authority: 'KRG Ministry of Interior - Airport Security Control',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-3-REGIONAL'
    }
  ];

  public static getInspections(gateId?: string): BorderInspectionRecord[] {
    if (gateId) {
      return this.inspections.filter(i => i.gateId === gateId);
    }
    return [...this.inspections];
  }

  public static performInspection(
    inspection: Omit<BorderInspectionRecord, 'id' | 'timestamp'>,
    actor: string
  ): BorderInspectionRecord {
    const gate = BorderGateRegistry.getGateById(inspection.gateId);
    if (!gate) {
      throw new Error(`Border gate not found for inspection: ${inspection.gateId}`);
    }

    const id = `INSP-${inspection.inspectionType}-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();

    const newRecord: BorderInspectionRecord = {
      ...inspection,
      id,
      timestamp
    };

    this.inspections.push(newRecord);

    // Adjust gate risk rating slightly downward if compliant, upwards if non_compliant
    let adjustRisk = gate.currentRiskScore;
    if (newRecord.complianceStatus === 'COMPLIANT') {
      adjustRisk = Math.max(5, adjustRisk - 1);
    } else if (newRecord.complianceStatus === 'NON_COMPLIANT' || newRecord.complianceStatus === 'SUSPICIOUS') {
      adjustRisk = Math.min(95, adjustRisk + 8);
    }
    BorderGateRegistry.updateRiskScore(gate.id, adjustRisk);
    gate.lastInspectionTimestamp = timestamp;

    BorderAuditEngine.appendRecord(
      'PERFORM_INSPECTION',
      actor,
      `Executed ${inspection.inspectionType} inspection (ID: ${id}) on gate ${gate.name}. Result: ${inspection.complianceStatus}.`,
      newRecord.jurisdiction,
      newRecord.ownership,
      newRecord.authority,
      newRecord.visibility,
      newRecord.accessPolicy
    );

    return newRecord;
  }

  public static getInspectionStats(): {
    totalInspections: number;
    compliantCount: number;
    suspiciousCount: number;
    nonCompliantCount: number;
    totalFinesUSD: number;
  } {
    return this.inspections.reduce(
      (acc, curr) => {
        acc.totalInspections += 1;
        if (curr.complianceStatus === 'COMPLIANT') {
          acc.compliantCount += 1;
        } else if (curr.complianceStatus === 'SUSPICIOUS') {
          acc.suspiciousCount += 1;
        } else if (curr.complianceStatus === 'NON_COMPLIANT') {
          acc.nonCompliantCount += 1;
        }
        acc.totalFinesUSD += curr.fineImposedUSD;
        return acc;
      },
      { totalInspections: 0, compliantCount: 0, suspiciousCount: 0, nonCompliantCount: 0, totalFinesUSD: 0 }
    );
  }
}
