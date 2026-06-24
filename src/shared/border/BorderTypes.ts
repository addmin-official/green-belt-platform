export type BorderJurisdiction = 'FEDERAL' | 'KRG' | 'JOINT';

export type BorderOwnership = 'FEDERAL_IRAQ' | 'KRG' | 'JOINT' | 'STATE_ENTERPRISE';

export type BorderVisibilityFlag = 'PUBLIC' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';

export type BorderGateType = 'LAND' | 'SEAPORT' | 'AIRPORT';

export type BorderGateStatus = 'ACTIVE' | 'SUSPENDED' | 'MAINTENANCE' | 'CLOSED';

export interface SovereignBorderEntity {
  jurisdiction: BorderJurisdiction;
  ownership: BorderOwnership;
  authority: string;
  visibility: BorderVisibilityFlag;
  accessPolicy: string;
}

export interface BorderGate extends SovereignBorderEntity {
  id: string;
  name: string;
  type: BorderGateType;
  status: BorderGateStatus;
  dailyCapacityCars: number;
  dailyCapacityTrucks: number;
  dailyCapacityPassengers: number;
  currentUtilization: number; // 0 to 100
  currentRiskScore: number; // 0 to 100
  lastInspectionTimestamp: string;
  geographicCoords: { lat: number; lng: number };
}

export interface BorderTrafficRecord extends SovereignBorderEntity {
  id: string;
  gateId: string;
  timestamp: string;
  trafficType: 'VEHICLE' | 'CARGO' | 'PASSENGER';
  vehiclePlate?: string;
  vehicleType?: 'CAR' | 'TRUCK' | 'BUS';
  cargoDeclarationValueUSD?: number;
  cargoWeightKg?: number;
  cargoCategory?: string;
  passengerNationality?: string;
  passengerPassportHash?: string;
  riskScore: number;
  actionApplied: 'CLEAR' | 'INSPECT' | 'REJECT';
}

export interface BorderInspectionRecord extends SovereignBorderEntity {
  id: string;
  gateId: string;
  trafficRecordId?: string;
  timestamp: string;
  inspectorName: string;
  inspectionType: 'XRAY' | 'MANUAL' | 'BIOMETRIC' | 'DOCUMENT';
  complianceStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'SUSPICIOUS';
  fineImposedUSD: number;
  notes: string;
}

export interface BorderRiskAlert extends SovereignBorderEntity {
  id: string;
  gateId: string;
  timestamp: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  source: string;
  description: string;
  isResolved: boolean;
}

export interface BorderTelemetryPing extends SovereignBorderEntity {
  id: string;
  gateId: string;
  timestamp: string;
  sensorType: 'CCTV' | 'ANPR_CAMERA' | 'RADIATION_DETECTOR' | 'WEIGH_SCALE';
  sensorStatus: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  reading: string;
}

export interface BorderAuditRecord extends SovereignBorderEntity {
  hash: string;
  previousHash: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
}
