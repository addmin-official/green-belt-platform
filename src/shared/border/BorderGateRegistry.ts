import { BorderGate, BorderGateStatus, BorderGateType, BorderJurisdiction, BorderOwnership, BorderVisibilityFlag } from './BorderTypes';
import { BorderAuditEngine } from './BorderAuditEngine';

export class BorderGateRegistry {
  private static gates: BorderGate[] = [
    {
      id: 'BG-IBRAHIMKHALIL',
      name: '| دەروازەی سنووری نێودەوڵەتی ئیبراهیم خەلیل',
      type: 'LAND',
      status: 'ACTIVE',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Federal-Region Border Operations Committee',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT',
      dailyCapacityCars: 5000,
      dailyCapacityTrucks: 3500,
      dailyCapacityPassengers: 12000,
      currentUtilization: 68,
      currentRiskScore: 12,
      lastInspectionTimestamp: '2026-06-09T08:30:00Z',
      geographicCoords: { lat: 37.135, lng: 42.569 }
    },
    {
      id: 'BG-PARWIZKHAN',
      name: '| دەروازەی سنووری نێودەوڵەتی پەروێزخان',
      type: 'LAND',
      status: 'ACTIVE',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Border Directorate / KRG-Federal',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT',
      dailyCapacityCars: 2500,
      dailyCapacityTrucks: 2200,
      dailyCapacityPassengers: 6000,
      currentUtilization: 52,
      currentRiskScore: 18,
      lastInspectionTimestamp: '2026-06-09T07:45:00Z',
      geographicCoords: { lat: 34.332, lng: 45.545 }
    },
    {
      id: 'BG-BASHMAKH',
      name: '| دەروازەی سنووری نێودەوڵەتی باشماخ',
      type: 'LAND',
      status: 'ACTIVE',
      jurisdiction: 'JOINT',
      ownership: 'JOINT',
      authority: 'Joint Border Directorate / Sulaymaniyah Operations',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-4-JOINT',
      dailyCapacityCars: 3000,
      dailyCapacityTrucks: 1800,
      dailyCapacityPassengers: 8000,
      currentUtilization: 44,
      currentRiskScore: 15,
      lastInspectionTimestamp: '2026-06-09T09:00:00Z',
      geographicCoords: { lat: 35.597, lng: 46.033 }
    },
    {
      id: 'BG-ERBIL-AIRPORT',
      name: '| دەروازەی فڕۆکەخانەی نێودەوڵەتی هەولێر',
      type: 'AIRPORT',
      status: 'ACTIVE',
      jurisdiction: 'KRG',
      ownership: 'KRG',
      authority: 'KRG Ministry of Interior - Airport Security Control',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-3-REGIONAL',
      dailyCapacityCars: 8000,
      dailyCapacityTrucks: 200,
      dailyCapacityPassengers: 15000,
      currentUtilization: 41,
      currentRiskScore: 8,
      lastInspectionTimestamp: '2026-06-09T09:15:00Z',
      geographicCoords: { lat: 36.241, lng: 43.964 }
    },
    {
      id: 'BG-UMMQASR',
      name: '| دەروازەی نێودەوڵەتی دەریاوانی بەندەری ئوم قەسر',
      type: 'SEAPORT',
      status: 'ACTIVE',
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Basra',
      visibility: 'RESTRICTED',
      accessPolicy: 'LEVEL-5-SECURE',
      dailyCapacityCars: 1500,
      dailyCapacityTrucks: 8000,
      dailyCapacityPassengers: 2000,
      currentUtilization: 82,
      currentRiskScore: 21,
      lastInspectionTimestamp: '2026-06-09T08:00:00Z',
      geographicCoords: { lat: 30.038, lng: 47.925 }
    },
    {
      id: 'BG-ZURBATIYAH',
      name: '| دەروازەی سنووری نێودەوڵەتی زوڕباتیە',
      type: 'LAND',
      status: 'ACTIVE',
      jurisdiction: 'FEDERAL',
      ownership: 'FEDERAL_IRAQ',
      authority: 'Federal Border Ports Commission / Wasit Sector',
      visibility: 'PUBLIC',
      accessPolicy: 'LEVEL-5-SECURE',
      dailyCapacityCars: 4000,
      dailyCapacityTrucks: 2500,
      dailyCapacityPassengers: 25000,
      currentUtilization: 70,
      currentRiskScore: 24,
      lastInspectionTimestamp: '2026-06-09T08:45:00Z',
      geographicCoords: { lat: 33.111, lng: 46.245 }
    }
  ];

  public static getGates(): BorderGate[] {
    return [...this.gates];
  }

  public static getGateById(id: string): BorderGate | undefined {
    return this.gates.find(g => g.id === id);
  }

  public static registerGate(
    gate: Omit<BorderGate, 'id' | 'currentRiskScore' | 'currentUtilization' | 'lastInspectionTimestamp'>,
    actor: string
  ): BorderGate {
    const id = `BG-${gate.type}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGate: BorderGate = {
      ...gate,
      id,
      currentRiskScore: 10,
      currentUtilization: 0,
      lastInspectionTimestamp: new Date().toISOString()
    };

    this.gates.push(newGate);

    BorderAuditEngine.appendRecord(
      'REGISTER_BORDER_GATE',
      actor,
      `Registered border gate: ${newGate.name} (${newGate.id}) of type ${newGate.type} under jurisdiction ${newGate.jurisdiction}.`,
      newGate.jurisdiction,
      newGate.ownership,
      newGate.authority,
      newGate.visibility,
      newGate.accessPolicy
    );

    return newGate;
  }

  public static updateGateStatus(id: string, status: BorderGateStatus, actor: string): BorderGate {
    const gate = this.gates.find(g => g.id === id);
    if (!gate) {
      throw new Error(`Border gate not found: ${id}`);
    }

    const previousStatus = gate.status;
    gate.status = status;

    BorderAuditEngine.appendRecord(
      'UPDATE_GATE_STATUS',
      actor,
      `State change of border gate ${gate.name} (${id}) from ${previousStatus} to ${status}.`,
      gate.jurisdiction,
      gate.ownership,
      gate.authority,
      gate.visibility,
      gate.accessPolicy
    );

    return gate;
  }

  public static updateUtilization(id: string, utilization: number): void {
    const gate = this.gates.find(g => g.id === id);
    if (gate) {
      gate.currentUtilization = Math.min(100, Math.max(0, utilization));
    }
  }

  public static updateRiskScore(id: string, riskScore: number): void {
    const gate = this.gates.find(g => g.id === id);
    if (gate) {
      gate.currentRiskScore = Math.min(100, Math.max(0, riskScore));
    }
  }
}
