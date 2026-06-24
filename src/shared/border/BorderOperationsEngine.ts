import { BorderGateRegistry } from './BorderGateRegistry';
import { BorderTrafficEngine } from './BorderTrafficEngine';
import { BorderInspectionEngine } from './BorderInspectionEngine';
import { BorderRiskEngine } from './BorderRiskEngine';
import { BorderTelemetryEngine } from './BorderTelemetryEngine';
import { BorderPolicyEngine } from './BorderPolicyEngine';

export interface BorderOperationsKPIs {
  activeGatesCount: number;
  totalGatesCount: number;
  totalTransitRecords: number;
  totalCargoValueUSD: number;
  totalWeightTons: number;
  totalFinesUSD: number;
  compliantInspectionRate: number;
  compositeRiskIndex: number;
}

export class BorderOperationsEngine {
  public static getOperationsKPIs(): BorderOperationsKPIs {
    const gates = BorderGateRegistry.getGates();
    const activeGates = gates.filter(g => g.status === 'ACTIVE');
    
    const trafficStats = BorderTrafficEngine.getTrafficStats();
    const inspectionStats = BorderInspectionEngine.getInspectionStats();
    const compositeRisk = BorderRiskEngine.calculateNationalRiskIndex();

    const totalInsps = inspectionStats.totalInspections;
    const compliantRate = totalInsps > 0 
      ? Math.round((inspectionStats.compliantCount / totalInsps) * 100) 
      : 100;

    return {
      activeGatesCount: activeGates.length,
      totalGatesCount: gates.length,
      totalTransitRecords: trafficStats.totalRecords,
      totalCargoValueUSD: trafficStats.totalCargoValueUSD,
      totalWeightTons: Math.round(trafficStats.totalWeightKg / 1000),
      totalFinesUSD: inspectionStats.totalFinesUSD,
      compliantInspectionRate: compliantRate,
      compositeRiskIndex: compositeRisk
    };
  }

  /**
   * Resets or triggers live random activity to keep the visualizer dynamic and realistic
   */
  public static triggerActivityPulse(actor: string): void {
    const gates = BorderGateRegistry.getGates().filter(g => g.status === 'ACTIVE');
    if (gates.length === 0) return;

    // Pick a random gate and append a traffic record
    const randomGate = gates[Math.floor(Math.random() * gates.length)];
    const types: ('VEHICLE' | 'CARGO' | 'PASSENGER')[] = ['VEHICLE', 'CARGO', 'PASSENGER'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    if (randomType === 'PASSENGER') {
      BorderTrafficEngine.recordTraffic({
        gateId: randomGate.id,
        trafficType: 'PASSENGER',
        passengerNationality: ['IQ', 'TR', 'DE', 'IR', 'UK'][Math.floor(Math.random() * 5)],
        passengerPassportHash: `sha256_${Math.floor(100000 + Math.random()*900000)}`,
        actionApplied: 'CLEAR',
        jurisdiction: randomGate.jurisdiction,
        ownership: randomGate.ownership,
        authority: randomGate.authority,
        visibility: randomGate.visibility,
        accessPolicy: randomGate.accessPolicy
      }, actor);
    } else if (randomType === 'CARGO') {
      const value = Math.floor(20000 + Math.random() * 800000);
      const weight = Math.floor(1000 + Math.random() * 45000);
      BorderTrafficEngine.recordTraffic({
        gateId: randomGate.id,
        trafficType: 'CARGO',
        cargoDeclarationValueUSD: value,
        cargoWeightKg: weight,
        cargoCategory: ['| کەرەستەی خاو', '| بەرهەمی خۆراکی', '| مەکینەی کارەبا', '| دەرمانی پزیشکی'][Math.floor(Math.random() * 4)],
        actionApplied: 'CLEAR',
        jurisdiction: randomGate.jurisdiction,
        ownership: randomGate.ownership,
        authority: randomGate.authority,
        visibility: randomGate.visibility,
        accessPolicy: randomGate.accessPolicy
      }, actor);
    } else {
      const plate = `IQ-${['ERB', 'SUL', 'BG', 'BAS', 'DUH'][Math.floor(Math.random() * 5)]}-${Math.floor(10000 + Math.random() * 90000)}`;
      const vtype = ['CAR', 'TRUCK', 'BUS'][Math.floor(Math.random() * 3)] as 'CAR' | 'TRUCK' | 'BUS';
      BorderTrafficEngine.recordTraffic({
        gateId: randomGate.id,
        trafficType: 'VEHICLE',
        vehiclePlate: plate,
        vehicleType: vtype,
        actionApplied: 'CLEAR',
        jurisdiction: randomGate.jurisdiction,
        ownership: randomGate.ownership,
        authority: randomGate.authority,
        visibility: randomGate.visibility,
        accessPolicy: randomGate.accessPolicy
      }, actor);
    }
  }
}
