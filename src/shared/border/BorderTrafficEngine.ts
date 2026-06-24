import { BorderTrafficRecord, BorderGate, BorderJurisdiction, BorderOwnership } from './BorderTypes';
import { BorderGateRegistry } from './BorderGateRegistry';
import { BorderAuditEngine } from './BorderAuditEngine';

export class BorderTrafficEngine {
  private static trafficRecords: BorderTrafficRecord[] = [
    {
      id: 'TRF-VEH-82172',
      gateId: 'BG-IBRAHIMKHALIL',
      timestamp: '2026-06-09T08:15:00Z',
      trafficType: 'VEHICLE',
      vehiclePlate: 'IQ-ERB-92817',
      vehicleType: 'TRUCK',
      cargoDeclarationValueUSD: 145000,
      cargoWeightKg: 24000,
      cargoCategory: '| ئامێری تەکنەلۆژی',
      riskScore: 14,
      actionApplied: 'CLEAR',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Federal-Region Border Operations Committee',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT'
    },
    {
      id: 'TRF-VEH-12849',
      gateId: 'BG-PARWIZKHAN',
      timestamp: '2026-06-09T08:40:00Z',
      trafficType: 'VEHICLE',
      vehiclePlate: 'IR-TEH-749182',
      vehicleType: 'TRUCK',
      cargoDeclarationValueUSD: 68000,
      cargoWeightKg: 18500,
      cargoCategory: '| کەرەستەی ساختومانی',
      riskScore: 19,
      actionApplied: 'CLEAR',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Border Directorate / KRG-Federal',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT'
    },
    {
      id: 'TRF-PSG-94812',
      gateId: 'BG-ERBIL-AIRPORT',
      timestamp: '2026-06-09T09:10:00Z',
      trafficType: 'PASSENGER',
      passengerNationality: 'DE',
      passengerPassportHash: 'sha256_7bde8271bcdafeec9127acd',
      riskScore: 5,
      actionApplied: 'CLEAR',
      jurisdiction: 'KRG',
      ownership: 'KRG',
      authority: 'KRG Ministry of Interior - Airport Security Control',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-3-REGIONAL'
    },
    {
      id: 'TRF-CAR-90812',
      gateId: 'BG-UMMQASR',
      timestamp: '2026-06-09T07:22:00Z',
      trafficType: 'CARGO',
      cargoDeclarationValueUSD: 890000,
      cargoWeightKg: 120000,
      cargoCategory: '| ئۆتۆمبێلی هاوردەکراو',
      riskScore: 32,
      actionApplied: 'INSPECT',
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Basra',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-5-SECURE'
    },
    {
      id: 'TRF-VEH-38491',
      gateId: 'BG-ZURBATIYAH',
      timestamp: '2026-06-09T08:10:00Z',
      trafficType: 'VEHICLE',
      vehiclePlate: 'IQ-BG-28317',
      vehicleType: 'BUS',
      riskScore: 28,
      actionApplied: 'CLEAR',
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Wasit Sector',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-5-SECURE'
    }
  ];

  public static getTraffic(gateId?: string): BorderTrafficRecord[] {
    if (gateId) {
      return this.trafficRecords.filter(r => r.gateId === gateId);
    }
    return [...this.trafficRecords];
  }

  public static recordTraffic(
    record: Omit<BorderTrafficRecord, 'id' | 'timestamp' | 'riskScore'>,
    actor: string
  ): BorderTrafficRecord {
    const gate = BorderGateRegistry.getGateById(record.gateId);
    if (!gate) {
      throw new Error(`Invalid border gate ID: ${record.gateId}`);
    }

    const id = `TRF-${record.trafficType.substring(0,3)}-${Math.floor(10000 + Math.random() * 90000)}`;
    const timestamp = new Date().toISOString();
    
    // Simple baseline risk score computation based on traffic type and category
    let riskScore = 10;
    if (record.trafficType === 'CARGO' && (record.cargoDeclarationValueUSD || 0) > 500000) {
      riskScore = 30; // High value cargo gets prioritized
    }
    if (record.trafficType === 'VEHICLE' && record.vehicleType === 'TRUCK') {
      riskScore += 8;
    }

    const newRecord: BorderTrafficRecord = {
      ...record,
      id,
      timestamp,
      riskScore
    };

    this.trafficRecords.push(newRecord);

    // Dynamic utilization adjustment
    const gateTrafficCount = this.trafficRecords.filter(r => r.gateId === record.gateId).length;
    const computedUtilization = Math.min(100, Math.floor((gateTrafficCount / 10) * 100));
    BorderGateRegistry.updateUtilization(record.gateId, computedUtilization === 0 ? 30 : computedUtilization);

    // Audit Log entry
    BorderAuditEngine.appendRecord(
      'RECORD_TRAFFIC',
      actor,
      `Recorded border transit of type ${newRecord.trafficType} (ID: ${id}) at gate ${gate.name}. Action selected: ${newRecord.actionApplied}.`,
      newRecord.jurisdiction,
      newRecord.ownership,
      newRecord.authority,
      newRecord.visibility,
      newRecord.accessPolicy
    );

    return newRecord;
  }

  public static getTrafficStats(): {
    totalRecords: number;
    totalCargoValueUSD: number;
    totalWeightKg: number;
    passengerCount: number;
    vehicleCount: number;
  } {
    return this.trafficRecords.reduce(
      (acc, curr) => {
        acc.totalRecords += 1;
        if (curr.cargoDeclarationValueUSD) {
          acc.totalCargoValueUSD += curr.cargoDeclarationValueUSD;
        }
        if (curr.cargoWeightKg) {
          acc.totalWeightKg += curr.cargoWeightKg;
        }
        if (curr.trafficType === 'PASSENGER') {
          acc.passengerCount += 1;
        }
        if (curr.trafficType === 'VEHICLE') {
          acc.vehicleCount += 1;
        }
        return acc;
      },
      { totalRecords: 0, totalCargoValueUSD: 0, totalWeightKg: 0, passengerCount: 0, vehicleCount: 0 }
    );
  }
}
